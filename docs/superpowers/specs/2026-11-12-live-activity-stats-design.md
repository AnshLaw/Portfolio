# Live Discord Activity stats on the portfolio — design

Date: 2026-11-12 · Status: approved in chat

## Intent

The portfolio undersells the Discord Activities. It shows one stale, hand-typed number
("52K+ Taboo Party visits") and none of the newer games. The owner already runs a private
stats service (`activity-stats`, `stats.132-145-134-25.sslip.io`, password-gated) that tracks
every Activity. The goal: the portfolio shows real, current numbers from that service and
lists every Activity as a project, so a recruiter sees live proof of shipped, used software.

## Goals

- A public, read-only JSON feed of aggregate numbers from `activity-stats`.
- Portfolio fetches it in the browser so numbers update without a redeploy.
- Quick-stats band shows live totals across all Activities.
- New "Discord Activities" section: one card per game with live numbers and a 30-day sparkline.
- Project pages for Taboo Party, ThoughtMatch, Guess the District, Tic Tac Toe, Cosmix.

## Non-goals

- No change to the password dashboard, ingest, or refresh logic.
- No server-side rendering or Netlify functions; the site stays a static export.
- Identity Deception and the minigames hub are not listed until they launch.

## Anti-goals (failure even if it "works")

- Leaking anything per-player: hashed ids, guild ids, raw events, the web-vs-Discord split.
- Exposing the password-gated routes or weakening their auth/CSRF checks.
- A blank or "0" stat when the API is down or slow. The page must look complete without it.
- Layout shift or janky count-up when live data arrives after first paint.

## Decided

### activity-stats (`C:\Users\anshr\activity-stats`, branch off `main`)

- New route `GET /public.json` in the dashboard server, handled **before** the auth check.
- Computes `summarize(store)` live (SQLite, cheap), cached in-process for 5 minutes.
- Response shape (allowlist — built field by field, never spread from `Summary`):

  ```ts
  type PublicWindows = { d7: number; d30: number; allTime: number }
  type PublicApp = {
    id: AppId; name: string; discordOnly: boolean
    games: PublicWindows; players: PublicWindows; servers: { allTime: number }
    discordInstalls: number | null   // guilds + userInstalls from latest snapshot
    trend: { day: string; games: number }[]   // 30 days
    trackingSince: string | null
  }
  type PublicStats = { generatedAt: string; total: Omit<PublicApp, 'id' | 'discordOnly'>; apps: PublicApp[] }
  ```
- Headers: `access-control-allow-origin: *`, `cache-control: public, max-age=300`,
  `content-type: application/json`, existing `nosniff`. GET only; other methods 405.
- nginx: unchanged. `/public.json` falls under the existing `location /` (`as_pages`, 2r/s,
  burst 20), which is ample for one fetch per portfolio visit. `ship.sh` does not redeploy nginx,
  so avoiding an nginx edit keeps the release a normal `deploy/ship.sh` run.
- Test-first with vitest in the repo's existing style (`test/http.test.ts` helpers,
  `openStore(':memory:')`, seed via `recordGame`/`recordDiscord`).
- Release: commit on a feature branch, merge to `main` locally (no remote), `deploy/ship.sh`
  — only after the owner says go.

### Portfolio (`AnshLaw/Portfolio`, branch `feat/live-activity-stats`)

- `lib/activity-stats.ts`: endpoint constant, types, `fetchActivityStats()` with a timeout,
  shape validation, and a compact number formatter (`52.1K`).
- `data/portfolio.ts`: hardcoded fallback numbers (current known values) used until/unless
  live data arrives; four new project entries (ThoughtMatch, Guess the District, Tic Tac Toe,
  Cosmix) and the existing `taboo-party` entry refreshed. Each new project needs a
  `public/projects/<slug>.jpg` (tests require it); add live sites to `scripts/capture-projects.cjs`.
- Browser tests have hardcoded card counts (`/projects/` = 8); update them with the new totals.
- A failed or slow fetch must not throw or log a page error (browser tests fail on page errors).
- `components/quick-stats.tsx`: live all-Activity games and players replace the Taboo visits
  stat; fallback first, then swap to live and count up once.
- `components/activity-showcase.tsx`: new home-page section, one card per game with
  games / players / servers, a "live" indicator with `generatedAt`, and an inline SVG sparkline.
- Visual style follows the existing site tokens and classes; no new UI libraries.

### Owner decisions (2026-11-12)

- **Live only.** The "52K+ visits / 800+ registered players" claims are removed everywhere
  (quick stats, bio, Taboo project, timeline milestone, activities). They are replaced by the
  games/players metrics the stats server tracks.
- **Cosmix** is listed (card + project page). Stats that are 0 or null are hidden; the card says
  "Just launched" until it has recorded games. Numbers appear automatically once they exist.

### Calls made by the designer (owner can override)

- Prose in `data/portfolio.ts` cannot fetch, so it quotes the fallback snapshot, rounded down
  ("4,700+ games"), and the live widgets show the exact current values.
- Fallback snapshot = real values read from the production DB on 2026-11-12 (read-only):
  all Activities 7,546 games · 1,814 players · 31 servers · 39 Discord installs;
  Taboo 4,772 / 374; Tic Tac Toe 1,095 / 135; Guess the District 1,655 / 1,287;
  ThoughtMatch 24 / 18; Cosmix 0 / 0. Tracking began 2026-10-06.
- Any live value that is 0 or null hides that stat for that game (no "0" tiles anywhere).
  Live values are shown truthfully, never floored to the fallback.
- Every live number carries a "tracked since Oct 2026" note so totals aren't read as lifetime.
- Deploying (`ship.sh`, merging Portfolio to `main` which Netlify deploys) waits for the owner's go.

## Left to the builder

- Exact card layout and sparkline styling within the existing design language.
- Which stats appear in the quick-stats band (must include at least all-time games and players).
- Project copy, tech tags, and images per game, sourced from each game's repo and live site.
