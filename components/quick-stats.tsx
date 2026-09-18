"use client"

import { useEffect, useRef } from "react"

const COUNT_DURATION_MS = 1400
const VISIBLE_THRESHOLD = 0.6
const stats = [
  { value: "72", label: "AI cameras", detail: "Deployment across 38 conveyors at GM" },
  { value: "35%", label: "Lower inference latency", detail: "Agentic RAG for in-vehicle edge AI" },
  { value: "52K+", label: "Taboo Party visits", detail: "800+ registered players" },
  { value: "2", label: "Hackathon wins", detail: "Hack Dearborn, 2023 & 2025" },
]

function countUp(element: HTMLElement) {
  const final = element.dataset.value ?? ""
  const [, number = "", suffix = ""] = final.match(/^(\d+)(.*)$/) ?? []
  const target = Number(number)
  if (!target || matchMedia("(prefers-reduced-motion: reduce)").matches) return
  const start = performance.now()
  const frame = (now: number) => {
    const progress = Math.min((now - start) / COUNT_DURATION_MS, 1)
    const eased = 1 - Math.pow(1 - progress, 4)
    element.textContent = `${Math.round(target * eased)}${suffix}`
    if (progress < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

export function QuickStats() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return
      countUp(entry.target as HTMLElement)
      observer.unobserve(entry.target)
    }), { threshold: VISIBLE_THRESHOLD })
    ref.current?.querySelectorAll<HTMLElement>("strong[data-value]").forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])
  return <section ref={ref} className="impact-section page-container" aria-label="Engineering impact">{stats.map(stat => <div key={stat.label}><strong data-value={stat.value} aria-label={stat.value}>{stat.value}</strong><h2>{stat.label}</h2><p>{stat.detail}</p></div>)}</section>
}
