import type { PublicApp, PublicStats, PublicWindows } from "@/lib/activity-stats"

// Real values read (read-only) from the production stats DB on 2026-11-12.
// Shown until the live feed answers, and kept if it never does.
const SNAPSHOT_AT = "2026-11-12T00:00:00Z"
const TRACKING_SINCE = "2026-10-06"

const w = (d7: number, d30: number, allTime: number): PublicWindows => ({ d7, d30, allTime })

const apps: PublicApp[] = [
  { id: "taboo", name: "Taboo Party", discordOnly: false, games: w(320, 1440, 4772), players: w(374, 374, 374), servers: { allTime: 3 }, discordInstalls: 29, trend: [], trackingSince: "2026-10-06" },
  { id: "thoughtmatch", name: "ThoughtMatch", discordOnly: false, games: w(4, 24, 24), players: w(11, 18, 18), servers: { allTime: 2 }, discordInstalls: 4, trend: [], trackingSince: "2026-10-24" },
  { id: "tictactoe", name: "Tic Tac Toe", discordOnly: true, games: w(1095, 1095, 1095), players: w(135, 135, 135), servers: { allTime: 23 }, discordInstalls: 5, trend: [], trackingSince: "2026-11-09" },
  { id: "guessthedistrict", name: "Guess the District", discordOnly: false, games: w(1615, 1655, 1655), players: w(871, 871, 1287), servers: { allTime: 3 }, discordInstalls: 1, trend: [], trackingSince: "2026-11-04" },
  { id: "amalgummy", name: "Cosmix", discordOnly: true, games: w(0, 0, 0), players: w(0, 0, 0), servers: { allTime: 0 }, discordInstalls: null, trend: [], trackingSince: null },
]

export const FALLBACK_STATS: PublicStats = {
  generatedAt: SNAPSHOT_AT,
  total: { name: "All Activities", games: w(3034, 4214, 7546), players: w(1391, 1398, 1814), servers: { allTime: 31 }, discordInstalls: 39, trend: [], trackingSince: TRACKING_SINCE },
  apps,
}
