import type { PublicApp, PublicStats, PublicWindows } from "@/lib/activity-stats"

// Real values from the public stats feed, read 2026-11-12 22:15 UTC.
// Shown until the live feed answers, and kept if it never does.
const SNAPSHOT_AT = "2026-11-12T22:15:02Z"
const TRACKING_SINCE = "2026-10-06"
const TABOO_VISITS = 71736 // tabooparty.online public counter, 2026-11-12

const w = (d7: number, d30: number, allTime: number): PublicWindows => ({ d7, d30, allTime })

const apps: PublicApp[] = [
  { id: "taboo", name: "Taboo Party", discordOnly: false, games: w(323, 1443, 4774), players: w(379, 379, 2988), servers: { allTime: 3 }, discordInstalls: 29, trend: [], trackingSince: "2026-10-06", visits: TABOO_VISITS },
  { id: "thoughtmatch", name: "ThoughtMatch", discordOnly: false, games: w(4, 24, 24), players: w(11, 18, 18), servers: { allTime: 2 }, discordInstalls: 4, trend: [], trackingSince: "2026-10-24", visits: null },
  { id: "tictactoe", name: "Tic Tac Toe", discordOnly: true, games: w(1199, 1199, 1199), players: w(141, 141, 141), servers: { allTime: 25 }, discordInstalls: 6, trend: [], trackingSince: "2026-11-09", visits: null },
  { id: "guessthedistrict", name: "Guess the District", discordOnly: false, games: w(1633, 1673, 1673), players: w(882, 882, 1301), servers: { allTime: 4 }, discordInstalls: 1, trend: [], trackingSince: "2026-11-04", visits: null },
  { id: "amalgummy", name: "Cosmix", discordOnly: true, games: w(12, 12, 12), players: w(0, 0, 10), servers: { allTime: 0 }, discordInstalls: 1, trend: [], trackingSince: "2026-10-14", visits: null },
]

export const FALLBACK_STATS: PublicStats = {
  generatedAt: SNAPSHOT_AT,
  total: { name: "All Activities", games: w(3171, 4351, 7682), players: w(1413, 1420, 4458), servers: { allTime: 34 }, discordInstalls: 41, trend: [], trackingSince: TRACKING_SINCE, visits: TABOO_VISITS },
  apps,
}
