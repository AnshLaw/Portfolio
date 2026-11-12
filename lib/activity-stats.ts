// Client for the public Discord Activity stats feed. Type-only imports: tests load this file in a bare vm.

export const ACTIVITY_STATS_URL = "https://stats.132-145-134-25.sslip.io/public.json"
export const FETCH_TIMEOUT_MS = 4000

export type AppId = "taboo" | "thoughtmatch" | "tictactoe" | "guessthedistrict" | "amalgummy"
export type PublicWindows = { d7: number; d30: number; allTime: number }
export type PublicTotals = {
  name: string; games: PublicWindows; players: PublicWindows; servers: { allTime: number }
  discordInstalls: number | null; trend: { day: string; games: number }[]; trackingSince: string | null
}
export type PublicApp = PublicTotals & { id: AppId; discordOnly: boolean }
export type PublicStats = { generatedAt: string; total: PublicTotals; apps: PublicApp[] }

export const APP_SLUGS: Record<AppId, string> = {
  taboo: "taboo-party",
  thoughtmatch: "thoughtmatch",
  tictactoe: "tic-tac-toe",
  guessthedistrict: "guess-the-district",
  amalgummy: "cosmix",
}

const THOUSAND = 1_000
const MILLION = 1_000_000
const DECIMAL = 10

type Obj = Record<string, unknown>
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v)
const isCount = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v) && v >= 0
const isWindows = (v: unknown) => isObj(v) && isCount(v.d7) && isCount(v.d30) && isCount(v.allTime)
const isTrend = (v: unknown) => Array.isArray(v) && v.every(t => isObj(t) && typeof t.day === "string" && isCount(t.games))

/** Rounds down so a compact number never overstates the real one. */
export function formatCompact(n: number): string {
  const scale = n >= MILLION ? [MILLION, "M"] as const : n >= THOUSAND ? [THOUSAND, "K"] as const : null
  if (!scale) return String(Math.floor(n))
  return `${Math.floor((n / scale[0]) * DECIMAL) / DECIMAL}${scale[1]}`
}

function isTotals(v: unknown): v is PublicTotals {
  return isObj(v) && typeof v.name === "string" && isWindows(v.games) && isWindows(v.players)
    && isObj(v.servers) && isCount(v.servers.allTime)
    && (v.discordInstalls === null || isCount(v.discordInstalls)) && isTrend(v.trend)
    && (v.trackingSince === null || typeof v.trackingSince === "string")
}

const isKnownApp = (v: unknown): v is Obj & { id: AppId } => isObj(v) && typeof v.id === "string" && v.id in APP_SLUGS

/** Returns null for anything that isn't a well-formed feed; unknown games are dropped, not fatal. */
export function parseActivityStats(json: unknown): PublicStats | null {
  if (!isObj(json) || typeof json.generatedAt !== "string" || !isTotals(json.total) || !Array.isArray(json.apps)) return null
  const known = json.apps.filter(isKnownApp)
  if (!known.every(app => isTotals(app) && typeof app.discordOnly === "boolean")) return null
  return { generatedAt: json.generatedAt, total: json.total, apps: known as unknown as PublicApp[] }
}

export function mergeStats(fallback: PublicStats, live: PublicStats | null): PublicStats {
  if (!live) return fallback
  const apps = fallback.apps.map(app => live.apps.find(l => l.id === app.id) ?? app)
  return { generatedAt: live.generatedAt, total: live.total, apps }
}

export async function fetchActivityStats(fetchImpl: typeof fetch = fetch): Promise<PublicStats | null> {
  try {
    const res = await fetchImpl(ACTIVITY_STATS_URL, { cache: "no-store", signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) })
    if (!res.ok) return null
    return parseActivityStats(await res.json())
  } catch {
    // Network, timeout or bad JSON: the fallback snapshot is the designed degradation, so no error surfaces.
    return null
  }
}
