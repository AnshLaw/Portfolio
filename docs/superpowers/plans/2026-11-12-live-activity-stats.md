# Live Discord Activity Stats Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A public stats feed on `activity-stats` and a portfolio that shows those numbers live, plus project pages for every Discord Activity.

**Architecture:** `activity-stats` gains an unauthenticated `GET /public.json` that maps `summarize()` through an allowlist and caches it for 5 minutes. The static Netlify portfolio renders a hardcoded fallback snapshot, then fetches the feed in the browser and swaps in live values. No server-side rendering, no new dependencies.

**Tech Stack:** activity-stats: Node 22 (type stripping), `node:sqlite`, vitest. Portfolio: Next.js static export, React client components, global CSS in `app/globals.css`, `node --test` + Playwright.

**Spec:** `docs/superpowers/specs/2026-11-12-live-activity-stats-design.md`

## Global Constraints

- Repos: `C:\Users\anshr\activity-stats` (branch `feat/public-stats` off `main`, no remote) and Portfolio (branch `feat/live-activity-stats`).
- Feed URL: `https://stats.132-145-134-25.sslip.io/public.json`.
- The public payload is built field by field from an allowlist. It never includes `today` windows, `split30`, `liveSince`, guild ids, player hashes, or `guildsDelta7`.
- Feed headers: `access-control-allow-origin: *`, `cache-control: public, max-age=300`, `content-type: application/json; charset=utf-8`. In-process cache TTL: 300 000 ms.
- Live only: the "52K+ visits" and "800+ registered" claims are removed from every file.
- Any stat whose value is 0 or null is hidden, never rendered as "0". A game with 0 all-time games shows "Just launched".
- Every live number has a "tracked since Oct 2026" note nearby.
- A failed or slow fetch never throws, never logs an error, and never blanks a value. Fetch timeout: 4000 ms.
- AppId → project slug: `taboo→taboo-party`, `thoughtmatch→thoughtmatch`, `guessthedistrict→guess-the-district`, `tictactoe→tic-tac-toe`, `amalgummy→cosmix`.
- No deploy (`deploy/ship.sh`) and no merge to Portfolio `main` until the owner says go.
- Owner rules: functions under 40 lines, named constants, no swallowed errors (a caught fetch error returns `null` *by design* and is commented as such), tests first, conventional commits.

## Review Focus

1. **Feed down, slow, or returning HTML/garbage.** The page renders the fallback with no console error. Owned by Task 3 (parser test) and Task 5 (browser test with the route aborted).
2. **Feed shape drift.** For example, a missing `apps` entry or a new unknown app id. The parser rejects a bad top level. Unknown apps are ignored, and a missing app keeps its fallback. Owned by Task 3.
3. **Live data arriving after the count-up already ran.** The text updates to the live value with no second animation and no layout shift. Owned by Task 4.
4. **Leaking private fields through the feed.** A test asserts the exact key set. Owned by Task 1.
5. **Narrow viewport (390px).** The new section causes no horizontal overflow, which the existing browser test already checks once the section is on the home page. Owned by Task 5.

---

## Part A — activity-stats

### Task 1: Public allowlist mapper

**Files:**
- Create: `src/public.ts`
- Test: `test/public.test.ts`

**Interfaces:**
- Consumes: `Summary`, `AppSummary` from `src/summary.ts`; `AppId` from `src/apps.ts`.
- Produces:
  ```ts
  export type PublicWindows = { d7: number; d30: number; allTime: number };
  export type PublicTotals = { name: string; games: PublicWindows; players: PublicWindows;
    servers: { allTime: number }; discordInstalls: number | null;
    trend: { day: string; games: number }[]; trackingSince: string | null };
  export type PublicApp = PublicTotals & { id: AppId; discordOnly: boolean };
  export type PublicStats = { generatedAt: string; total: PublicTotals; apps: PublicApp[] };
  export function toPublic(summary: Summary): PublicStats;
  ```

- [ ] **Step 1: Write failing tests** in `test/public.test.ts`. Seed `openStore(':memory:')` the way `test/store.test.ts` does (`recordGame`, `recordDiscord`, fixed `NOW`), then run `toPublic(summarize(store, NOW))`.
  - `it('exposes only allowlisted keys')`:
    - `Object.keys(p).sort()` equals `['apps','generatedAt','total']`.
    - The keys of every app equal `['discordInstalls','discordOnly','games','id','name','players','servers','trackingSince','trend']`.
    - `Object.keys(app.games)` equals `['allTime','d30','d7']` once sorted.
    - `Object.keys(app.trend[0])` equals `['day','games']` once sorted.
  - `it('sums Discord guilds and user installs')`: after `recordDiscord` with guilds 16 and userInstalls 13 for taboo, `discordInstalls` is `29`. An app with no snapshot has `null`.
  - `it('keeps 30 trend days and one entry per app')`: `trend.length === 30` and `apps.length === APPS.length`.
  - `it('never serializes hashed player ids')`: `JSON.stringify(p)` does not contain any `game_players.player` value read from the store.
- [ ] **Step 2: Run** `npx vitest run test/public.test.ts`. Expected: FAIL, because `toPublic` is not defined.
- [ ] **Step 3: Implement** `toPublic` with small helpers: `windows(w: Windows): PublicWindows` and `installs(d: DiscordReach | null): number | null`.
- [ ] **Step 4: Run** `npm test && npm run typecheck`. Expected: all pass, 0 type errors.
- [ ] **Step 5: Commit** with `feat: add public stats allowlist mapper`.

### Task 2: `GET /public.json` route with 5-minute cache

**Files:**
- Modify: `src/public.ts` (add the cache), `src/http.ts` (the `Deps` type and `handleDashboard`, before the session check), `src/main.ts` (wire the cache into deps)
- Test: `test/http.test.ts` (extend the `setup()` helper and add a `describe('public feed')`)

**Interfaces:**
- Consumes: `toPublic` (Task 1), `summarize` (`src/summary.ts`).
- Produces:
  - `export function makePublicStats(deps: { store: Store; now: () => number; ttlMs?: number }): { get(): PublicStats }` in `src/public.ts`. It holds `PUBLIC_CACHE_TTL_MS = 300_000` and recomputes only when the cached value is at least TTL old.
  - `Deps` gains `publicStats: { get(): PublicStats }`.

- [ ] **Step 1: Write failing tests:**
  - `it('serves public.json without a session')`:
    - GET returns 200.
    - `content-type` starts with `application/json`.
    - `access-control-allow-origin` is `*`.
    - `cache-control` is `public, max-age=300`.
    - The body parses, and `body.apps.length === 5`.
  - `it('reuses the cached feed inside the TTL')`: build `makePublicStats` with a mutable fake clock. Call `get()`, then `recordGame` a new game, then call `get()` again at +299 999 ms: games are unchanged. Call again at +300 000 ms: games went up by 1.
  - `it('rejects non-GET on public.json')`: POST returns 405, with or without an `Origin` header.
  - `it('still guards the dashboard')`: unauthenticated `GET /` still returns 303 to `/login`. This is a regression guard.
- [ ] **Step 2: Run** `npx vitest run test/http.test.ts`. Expected: the new tests FAIL with 404.
- [ ] **Step 3: Implement.**
  - In `handleDashboard`, handle `/public.json` right after the `/login` GET route and before the `crossSite` check.
  - Send it with the dashboard's existing headers (CSP and `nosniff`, both harmless on JSON) plus the three feed headers.
  - Any other method returns 405.
  - `main.ts` builds `makePublicStats({ store, now: Date.now })`.
- [ ] **Step 4: Run** `npm test && npm run typecheck`. Expected: all pass.
- [ ] **Step 5: Smoke test locally.** Run `STATS_HOME=$(mktemp -d) node src/main.ts` with a temp password file, or reuse the test setup, then `curl -i localhost:4300/public.json`. Expected: 200 with JSON and CORS headers.
- [ ] **Step 6: Commit** with `feat: serve public aggregate stats at /public.json`. Then document the route in the README's routes section in a `docs:` commit.

## Part B — Portfolio

### Task 3: Stats client library and fallback snapshot

**Files:**
- Create: `lib/activity-stats.ts`. It may only import types, because `tests/*.test.cjs` load files with `vm` and no `require`.
- Create: `data/activity-stats-fallback.ts`
- Test: `tests/activity-stats.test.cjs`, using the same `readModule` helper as `tests/portfolio.test.cjs`

**Interfaces:**
- Produces, from `lib/activity-stats.ts`:
  ```ts
  export const ACTIVITY_STATS_URL = "https://stats.132-145-134-25.sslip.io/public.json"
  export const FETCH_TIMEOUT_MS = 4000
  export type AppId = "taboo" | "thoughtmatch" | "tictactoe" | "guessthedistrict" | "amalgummy"
  export type PublicWindows / PublicTotals / PublicApp / PublicStats  // identical to activity-stats Task 1
  export const APP_SLUGS: Record<AppId, string>          // mapping from Global Constraints
  export function parseActivityStats(json: unknown): PublicStats | null
  export function mergeStats(fallback: PublicStats, live: PublicStats | null): PublicStats
  export function formatCompact(n: number): string
  export async function fetchActivityStats(fetchImpl?: typeof fetch): Promise<PublicStats | null>
  ```
- Produces, from `data/activity-stats-fallback.ts`: `export const FALLBACK_STATS: PublicStats`. `generatedAt` is `"2026-11-12T00:00:00Z"` and `trend` is empty (`[]`). The values come from the spec's "Fallback snapshot" line. `discordInstalls` values: total 39, taboo 29, thoughtmatch 4, tictactoe 5, guessthedistrict 1, amalgummy null. `servers.allTime` values: total 31, taboo 3, thoughtmatch 2, tictactoe 23, guessthedistrict 3, amalgummy 0. Use `allTime` for the `d7`/`d30` windows too.

- [ ] **Step 1: Write failing tests:**
  - `formatCompact`: `7546 → "7.5K"`, `1814 → "1.8K"`, `374 → "374"`, `52100 → "52.1K"`, `1000 → "1K"`, `1_250_000 → "1.2M"`. It rounds down, so it never overstates.
  - `parseActivityStats` returns `null` for `null`, `"<html>"`, `{}`, `{apps: "x"}`, and a negative or `NaN` count. It returns the object for a valid fixture. It drops an app with an unknown id.
  - `mergeStats(FALLBACK, null)` deep-equals the fallback. `mergeStats(FALLBACK, liveWithOnlyTaboo)` takes taboo and total from live and keeps the other four apps from the fallback.
  - `fetchActivityStats` resolves `null`, without throwing, when `fetchImpl` rejects, returns a 500, or returns non-JSON.
- [ ] **Step 2: Run** `pnpm install` (once), then `pnpm test`. Expected: the new tests FAIL.
- [ ] **Step 3: Implement.** `fetchActivityStats` uses `AbortSignal.timeout(FETCH_TIMEOUT_MS)` and `cache: "no-store"`. Its catch returns `null`, with a one-line comment that the fallback is the designed degradation.
- [ ] **Step 4: Run** `pnpm test && pnpm lint`. Expected: pass.
- [ ] **Step 5: Commit** with `feat: add activity stats client and fallback snapshot`.

### Task 4: Live headline stats

**Files:**
- Create: `hooks/use-activity-stats.ts`
- Modify: `components/quick-stats.tsx`

**Interfaces:**
- Consumes: `fetchActivityStats`, `mergeStats`, `formatCompact` (Task 3); `FALLBACK_STATS`.
- Produces: `export function useActivityStats(): { stats: PublicStats; live: boolean }`. It starts from `FALLBACK_STATS`, fetches once on mount, and ignores the result after unmount.

- [ ] **Step 1: Write a failing browser test** in `tests/browser/portfolio.spec.cjs`:
  - `test('headline shows live activity totals')`: use `page.route(ACTIVITY_STATS_URL, …)` to fulfill a fixture with total games 9876 and players 2345. Expect `.impact-section` to contain `9.8K` and `2.3K`.
  - `test('headline falls back when the feed is down')`: abort the route. Expect `7.5K` and no page errors.
- [ ] **Step 2: Run** `pnpm build && pnpm test:browser`. Expected: the new tests FAIL.
- [ ] **Step 3: Change the tiles.** They become: `72` AI cameras (unchanged), `35%` (unchanged), `{games}` "Games played" with detail `{players} players across 5 Discord Activities · tracked since Oct 2026`, and `2` hackathon wins (unchanged).
- [ ] **Step 4: Rework the count-up** to animate a number and format each frame with `formatCompact`, so decimals like `7.5K` count correctly. If live data lands after the count-up has run, set the text directly with no second animation. Reserve width with `font-variant-numeric: tabular-nums` so nothing shifts.
- [ ] **Step 5: Run** `pnpm test && pnpm lint && pnpm build && pnpm test:browser`. Expected: all pass.
- [ ] **Step 6: Commit** with `feat: show live activity totals in headline stats`.

### Task 5: Discord Activities section

**Files:**
- Create: `components/activity-showcase.tsx`, `components/sparkline.tsx`
- Modify: `app/page.tsx` (insert `<ActivityShowcase />` after `<QuickStats />`), `app/globals.css` (new section styles next to `.impact-section`, including the existing 640px breakpoint)
- Test: `tests/browser/portfolio.spec.cjs`

**Interfaces:**
- Consumes: `useActivityStats` (Task 4), `APP_SLUGS`, `formatCompact`.
- Produces: `export function Sparkline({ points }: { points: number[] }): JSX.Element | null`. It returns `null` when there are fewer than 2 points or all points are 0. The SVG uses `viewBox="0 0 120 32"`, `stroke="var(--primary)"`, `aria-hidden`.

- [ ] **Step 1: Write failing browser tests:**
  - `test('activities section lists every game')`, using the fixture route:
    - `.activity-card` has a count of 5.
    - Each card links to `/projects/<slug>/`.
    - The Cosmix card (fixture with 0 games) contains "Just launched" and no `.activity-stat`.
  - `test('activities section survives a dead feed')`, with the route aborted: 5 cards, no page errors, and the live badge reads "Snapshot".
  - `test('hides zero and null stats')`: the fixture gives thoughtmatch `discordInstalls: null`, and that card has no installs stat.
- [ ] **Step 2: Run** the browser tests. Expected: FAIL.
- [ ] **Step 3: Build the section.** It contains:
  - `section-kicker` "Discord Activities" and an h2.
  - A badge: "Live · updated {relative time}" when `live` is true, otherwise "Snapshot · Nov 2026".
  - A `.activity-grid` of `.activity-card`s, each holding:
    - the name and a Discord-only tag when `discordOnly`;
    - up to four `.activity-stat`s (games, players, servers, Discord installs), each hidden when 0 or null;
    - the sparkline of `trend.map(t => t.games)`;
    - the "tracked since" note.
  Follow the existing tokens (`--card`, `--border`, `--ice`, `--copper`, `--muted-foreground`). Use no new libraries.
- [ ] **Step 4: Run** the full suite (`pnpm test && pnpm lint && pnpm build && pnpm test:browser`). Expected: pass, including the existing 390px no-overflow check.
- [ ] **Step 5: Commit** with `feat: add live Discord Activities section`.

### Task 6: Project pages and copy

**Files:**
- Modify: `data/portfolio.ts`. Refresh `taboo-party`. Add the `thoughtmatch`, `guess-the-district`, `tic-tac-toe` and `cosmix` projects, following the `songchat` entry style. Add milestones and activities. Remove every 52K/800 claim. Update the bio line about Taboo.
- Modify: `scripts/capture-projects.cjs` (add `[slug, url]` pairs to `liveProjects`)
- Create: `public/projects/{thoughtmatch,guess-the-district,tic-tac-toe,cosmix}.jpg`
- Modify: `tests/portfolio.test.cjs`, `tests/browser/portfolio.spec.cjs` (`/projects/` count 8 → 12, plus any changed tag counts)

- [ ] **Step 1: Write failing unit tests:**
  - `test('every Discord Activity has a project page')`: each slug in `APP_SLUGS` exists in `projects`, and each has the `games` tag.
  - `test('no stale visit claims')`: `JSON.stringify(readModule('data/portfolio.ts'))` and the source of `components/quick-stats.tsx` contain neither `52K` nor `52,000` nor `800+`.
- [ ] **Step 2: Run** `pnpm test`. Expected: FAIL.
- [ ] **Step 3: Write the entries.** Use facts from each game's repo (URL, stack, two or three engineering highlights, start period). Prose numbers quote the fallback, rounded down: "4,700+ games", "1,800+ players across 5 Activities".
  - Tags must reuse existing values (`games`, `real-time`, `web`, `full-stack`) plus at most one new tag, `discord`.
  - Milestones stay sorted newest-first with unique ids. The existing test enforces this.
- [ ] **Step 4: Make the images.** Convert existing cover art to 1440x900 JPEGs. Where there is no art, capture the live site with `node scripts/capture-projects.cjs <slug>`, adding `[slug, url]` to `liveProjects`. Image sources are listed in the game facts below.

**Game facts.** All repos are private, so `repoUrl: null`. All five servers run on one Oracle A1 VM behind nginx.

| slug | live / links | stack | highlights (source) | period | image source |
|---|---|---|---|---|---|
| taboo-party | tabooparty.online · existing Discord links | Next.js 16, React 19, Socket.IO, Express, Supabase, Stripe | Discord IAP and Stripe billing; self-serve ad marketplace with moderation; age gate enforced at the socket layer | Oct 2025 – Present | keep the existing jpg |
| thoughtmatch | thoughtmatch.online | React 19, Vite, Socket.IO, zod, TS monorepo, pm2 | server-authoritative engine with per-player views that hide secret words; room snapshots survive restarts; paid word packs through Discord SKUs and Stripe | Oct 2026 – Present | `thoughtmatch/docs/discord-assets/cover.png` |
| guess-the-district | guessthedistrict.in | Next.js 16, MapLibre GL, Hono, Redis, Postgres (Supabase), PWA | 784 districts, bilingual EN/HI; atomic Redis guesses and a transactional result write; HMAC daily picks that can't be predicted | Oct 2026 – Present | `guessthedistrict/docs/screenshots/desktop-round.jpg` |
| tic-tac-toe | Discord install: `discord.com/oauth2/authorize?client_id=1270915316787970069` | React 19, Vite, Socket.IO, zod | minimax AI on 3 levels; knockout tournament brackets; health-checked deploys with auto-rollback | Nov 2026 – Present | concept card (no art exists) |
| cosmix | cosmix.132-145-134-25.sslip.io · Discord install: `client_id=1570242472401961101` | React 19, Fastify 5, Socket.IO, Postgres, astronomy-engine | deterministic birth-chart engine; LLM fallback chain (Groq, Cloudflare, Gemini, local Gemma) with quota ledger and leak scan; field-level envelope encryption with key rotation | Nov 2026 – Present | `C:\Users\anshr\amalgummy-marketing\discord-activity-art\cover-2x.png` |

Taboo cover alternative: `C:\Users\anshr\taboo-marketing\discord-activity-art\cover-1024x576.png`.
- [ ] **Step 5: Update** the browser-test counts. Run the full suite. Expected: pass.
- [ ] **Step 6: Commit** with `feat: add Discord Activity project pages and live-only copy`.

### Task 7: Verify end to end, then ask before shipping

- [ ] **Step 1:** Run `pnpm preview` against `out/` and open it in the browser pane with the route unmocked. The feed is not deployed yet, so the page should show fallback values with no console errors. Take screenshots at desktop and 390px widths.
- [ ] **Step 2:** In activity-stats, merge `feat/public-stats` into `main`. Then **ask the owner**. On their yes, run `deploy/ship.sh` and `curl -i https://stats.132-145-134-25.sslip.io/public.json`. Expected: 200, JSON, CORS header, and no private keys.
- [ ] **Step 3:** Reload the preview. Expected: the badge reads "Live" and the numbers match the feed.
- [ ] **Step 4:** **Ask the owner** whether to merge Portfolio `feat/live-activity-stats` into `main`. Netlify deploys on merge.
