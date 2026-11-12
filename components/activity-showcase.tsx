"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Sparkline } from "@/components/sparkline"
import { useActivityStats } from "@/hooks/use-activity-stats"
import { APP_SLUGS, formatCompact, type PublicApp } from "@/lib/activity-stats"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const MINUTE_MS = 60_000
const HOUR_MS = 60 * MINUTE_MS

function monthYear(isoDay: string): string {
  const [year, month] = isoDay.split("-")
  return `${MONTHS[Number(month) - 1]} ${year}`
}

function updatedAgo(iso: string, now = Date.now()): string {
  const elapsed = Math.max(now - Date.parse(iso), 0)
  if (elapsed < MINUTE_MS) return "just now"
  if (elapsed < HOUR_MS) return `${Math.floor(elapsed / MINUTE_MS)} min ago`
  return `${Math.floor(elapsed / HOUR_MS)} h ago`
}

/** Zero or unknown numbers are hidden rather than shown as "0". */
function visibleStats(app: PublicApp): { label: string; value: number }[] {
  const all = [
    { label: "Site visits", value: app.visits ?? 0 },
    { label: "Games played", value: app.games.allTime },
    { label: "Players", value: app.players.allTime },
    { label: "Servers", value: app.servers.allTime },
    { label: "Discord installs", value: app.discordInstalls ?? 0 },
  ]
  return all.filter(stat => stat.value > 0)
}

function ActivityCard({ app }: { app: PublicApp }) {
  const stats = app.games.allTime > 0 ? visibleStats(app) : []
  return <article className="activity-card">
    <div className="activity-card-top">
      <h3><Link href={`/projects/${APP_SLUGS[app.id]}/`}>{app.name}<ArrowUpRight size={16} aria-hidden="true" /></Link></h3>
      {app.discordOnly && <span className="activity-tag">Discord only</span>}
    </div>
    {stats.length > 0
      ? <dl className="activity-stats">{stats.map(stat => <div className="activity-stat" key={stat.label}><dt>{stat.label}</dt><dd><strong>{formatCompact(stat.value)}</strong></dd></div>)}</dl>
      : <p className="activity-new">Just launched</p>}
    <Sparkline points={app.trend.map(day => day.games)} />
    {app.trackingSince && <p className="activity-since">Tracked since {monthYear(app.trackingSince)}</p>}
  </article>
}

export function ActivityShowcase() {
  const { stats, live } = useActivityStats()
  return <section id="discord-activities" className="discord-section page-container" aria-labelledby="discord-activities-title">
    <div className="section-heading">
      <div><p className="section-kicker">Discord Activities</p><h2 id="discord-activities-title">Games people play every day.</h2></div>
      <div><p>Real-time multiplayer games running inside Discord voice calls, all on one self-hosted server. Numbers come straight from my stats service.</p>
        <span className={`activity-badge${live ? " is-live" : ""}`}>{live ? `Live · updated ${updatedAgo(stats.generatedAt)}` : "Snapshot · Nov 2026"}</span></div>
    </div>
    <div className="activity-grid">{stats.apps.map(app => <ActivityCard key={app.id} app={app} />)}</div>
  </section>
}
