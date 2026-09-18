"use client"

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { experience } from "@/data/portfolio"
import { assignLanes, currentMonth, formatTenure, monthSpan, parseMonth, splitMetrics, toIndex, type YearMonth } from "@/lib/timeline"

type Job = (typeof experience)[number]
type Placement = { job: Job; left: number; width: number; lane: number; point: boolean; tenure: string }

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const MONTHS_PER_YEAR = 12
const ACTIVE_LINE = 0.45
const REVEAL_LINE = 0.85
const JUMP_OFFSET = 0.3
const PERCENT = 100
const END_ALIGN_AFTER = 80

const entryId = (job: Job) => `role-${job.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`

function useRange(now: YearMonth) {
  return useMemo(() => {
    const first = Math.min(...experience.map(job => toIndex(parseMonth(job.start, now))))
    const rangeStart = Math.floor(first / MONTHS_PER_YEAR) * MONTHS_PER_YEAR
    const rangeEnd = toIndex(now) + 1
    const lanes = assignLanes(experience, now)
    const toPercent = (index: number) => ((index - rangeStart) / (rangeEnd - rangeStart)) * PERCENT
    const placements: Placement[] = experience.map((job, index) => {
      const start = toIndex(parseMonth(job.start, now))
      const months = monthSpan(job.start, job.end, now)
      return { job, left: toPercent(start), width: toPercent(start + months) - toPercent(start), lane: lanes[index], point: months === 1, tenure: months === 1 ? "Single event" : formatTenure(months) }
    })
    const years = Array.from({ length: Math.ceil((rangeEnd - rangeStart) / MONTHS_PER_YEAR) }, (_, index) => rangeStart / MONTHS_PER_YEAR + index)
    return { placements, years, rangeStart, rangeEnd, toPercent }
  }, [now])
}

/** Maps scroll position through the entries to progress, active role, and a rewinding date. */
function useScrollProgress(bodyRef: React.RefObject<HTMLDivElement | null>, onChange: (progress: number, active: number, seen: number) => void) {
  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const body = bodyRef.current
      if (!body) return
      const line = innerHeight * ACTIVE_LINE
      const bounds = body.getBoundingClientRect()
      const progress = Math.min(Math.max((line - bounds.top) / bounds.height, 0), 1)
      const entries = Array.from(body.querySelectorAll<HTMLElement>(".work-entry"))
      const lastAbove = (limit: number) => entries.reduce((last, entry, index) => entry.getBoundingClientRect().top <= limit ? index : last, 0)
      onChange(progress, lastAbove(line), lastAbove(innerHeight * REVEAL_LINE))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure) }
    measure()
    addEventListener("scroll", schedule, { passive: true })
    addEventListener("resize", schedule)
    return () => { cancelAnimationFrame(frame); removeEventListener("scroll", schedule); removeEventListener("resize", schedule) }
  }, [bodyRef, onChange])
}

function jumpTo(job: Job) {
  const entry = document.getElementById(entryId(job))
  if (!entry) return
  const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches
  scrollTo({ top: entry.getBoundingClientRect().top + scrollY - innerHeight * JUMP_OFFSET, behavior: smooth ? "smooth" : "auto" })
  entry.focus({ preventScroll: true })
}

type Range = ReturnType<typeof useRange>

function TimelineRuler({ range, active, playheadRef }: { range: Range; active: number; playheadRef: React.RefObject<HTMLElement> }) {
  const { placements, years, toPercent } = range
  const lanes = Math.max(...placements.map(placement => placement.lane)) + 1
  return <div className="career-ruler" style={{ "--lanes": lanes } as CSSProperties}>
    <div className="ruler-years" aria-hidden="true">{years.map(year => <span key={year} style={{ left: `${toPercent(year * MONTHS_PER_YEAR)}%` }}>{year}</span>)}</div>
    <div className="ruler-track">
      {placements.map((placement, index) => <button key={placement.job.company} type="button" className="ruler-bar" data-point={placement.point || undefined} data-align={placement.left + placement.width > END_ALIGN_AFTER ? "end" : undefined} data-active={index === active}
        style={{ left: `${placement.left}%`, width: `${placement.width}%`, "--lane": placement.lane } as CSSProperties}
        aria-label={`Jump to ${placement.job.company}`} onClick={() => jumpTo(placement.job)}><span>{placement.job.company}</span></button>)}
      <span className="ruler-playhead" aria-hidden="true"><b ref={playheadRef} /></span>
    </div>
  </div>
}

function TimelineEntry({ placement, index, active, seen }: { placement: Placement; index: number; active: number; seen: number }) {
  const { job, tenure } = placement
  return <article id={entryId(job)} tabIndex={-1} className="work-entry" data-active={index === active} data-passed={index <= active} data-seen={index <= seen}>
    <div className="entry-when"><span className="entry-dates">{job.start}{job.start !== job.end && <> — {job.end}</>}</span><span>{tenure} · {job.location}</span></div>
    <span className="entry-node" aria-hidden="true" />
    <div className="entry-card">
      <p className="section-kicker">{job.company}</p>
      <h2>{job.role}</h2>
      <ul>{job.bullets.map((bullet, bulletIndex) => <li key={bullet} style={{ "--i": bulletIndex } as CSSProperties}>
        {splitMetrics(bullet).map((part, partIndex) => part.metric ? <mark key={partIndex}>{part.text}</mark> : part.text)}
      </li>)}</ul>
    </div>
  </article>
}

export function WorkTimeline() {
  // Static export renders at build time; re-measure "Present" against the visitor's clock.
  const [now, setNow] = useState(() => currentMonth())
  useEffect(() => setNow(previous => {
    const today = currentMonth()
    return toIndex(today) === toIndex(previous) ? previous : today
  }), [])
  const range = useRange(now)
  const { placements, rangeStart, rangeEnd, toPercent } = range
  const [active, setActive] = useState(0)
  const [seen, setSeen] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const playheadRef = useRef<HTMLElement>(null)
  const onChange = useMemo(() => (progress: number, activeIndex: number, seenIndex: number) => {
    const month = Math.round(rangeEnd - 1 - progress * (rangeEnd - 1 - rangeStart))
    sectionRef.current?.style.setProperty("--progress", String(progress))
    const playhead = toPercent(month + 0.5)
    sectionRef.current?.style.setProperty("--playhead", `${playhead}%`)
    sectionRef.current?.style.setProperty("--playhead-fraction", String(playhead / PERCENT))
    if (playheadRef.current) playheadRef.current.textContent = `${MONTH_NAMES[month % MONTHS_PER_YEAR]} ${Math.floor(month / MONTHS_PER_YEAR)}`
    setActive(activeIndex)
    setSeen(previous => Math.max(previous, seenIndex))
  }, [rangeStart, rangeEnd, toPercent])
  useScrollProgress(bodyRef, onChange)

  return <section ref={sectionRef} className="career" aria-label="Professional experience">
    <TimelineRuler range={range} active={active} playheadRef={playheadRef} />
    <div ref={bodyRef} className="career-body">
      <div className="career-spine" aria-hidden="true"><span /></div>
      {placements.map((placement, index) => <TimelineEntry key={placement.job.company} placement={placement} index={index} active={active} seen={seen} />)}
    </div>
  </section>
}
