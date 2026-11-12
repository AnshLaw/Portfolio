"use client"

import { useEffect, useRef, useState } from "react"
import { useActivityStats } from "@/hooks/use-activity-stats"
import { formatCompact } from "@/lib/activity-stats"

const COUNT_DURATION_MS = 1400
const VISIBLE_THRESHOLD = 0.6
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"
const plain = (n: number) => String(Math.round(n))
const percent = (n: number) => `${Math.round(n)}%`

type Stat = { value: number; format: (n: number) => string; label: string; detail: string }

function animate(target: number, onFrame: (n: number) => void): () => void {
  const start = performance.now()
  let frameId = 0
  const frame = (now: number) => {
    const progress = Math.min((now - start) / COUNT_DURATION_MS, 1)
    onFrame(target * (1 - Math.pow(1 - progress, 4)))
    if (progress < 1) frameId = requestAnimationFrame(frame)
  }
  frameId = requestAnimationFrame(frame)
  return () => cancelAnimationFrame(frameId)
}

/** Counts up once when first visible; later value changes (live data) apply without re-animating. */
function CountUp({ value, format }: Pick<Stat, "value" | "format">) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(value)
  const counted = useRef(false)
  useEffect(() => {
    const element = ref.current
    if (counted.current || !element || matchMedia(REDUCED_MOTION).matches) return setShown(value)
    let cancel = () => {}
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      observer.disconnect()
      counted.current = true
      cancel = animate(value, setShown)
    }, { threshold: VISIBLE_THRESHOLD })
    observer.observe(element)
    return () => { observer.disconnect(); cancel() }
  }, [value])
  return <strong ref={ref} aria-label={format(value)}>{format(shown)}</strong>
}

export function QuickStats() {
  const { stats } = useActivityStats()
  const { games, players } = stats.total
  const items: Stat[] = [
    { value: 72, format: plain, label: "AI cameras", detail: "Deployment across 38 conveyors at GM" },
    { value: 35, format: percent, label: "Lower inference latency", detail: "Agentic RAG for in-vehicle edge AI" },
    { value: games.allTime, format: formatCompact, label: "Games played", detail: `${formatCompact(players.allTime)} players across ${stats.apps.length} Discord Activities · tracked since Oct 2026` },
    { value: 2, format: plain, label: "Hackathon wins", detail: "Hack Dearborn, 2023 & 2025" },
  ]
  return <section className="impact-section page-container" aria-label="Engineering impact">{items.map(stat => <div key={stat.label}><CountUp value={stat.value} format={stat.format} /><h2>{stat.label}</h2><p>{stat.detail}</p></div>)}</section>
}
