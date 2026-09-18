"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { milestones, type Milestone, type MilestoneKind } from "@/data/portfolio"
import { assignLanes, currentMonth, formatTenure, monthSpan, parseMonth, splitMetrics, toIndex, type YearMonth } from "@/lib/timeline"

type Filter = MilestoneKind | "all"
type Placement = { item: Milestone; left: number; width: number; lane: number; point: boolean; month: number; tenure: string | null }
type ScrollState = { activeId: string; seenId: string; month: number; progress: number }

const ROWS: { kind: MilestoneKind; label: string; filter: string }[] = [
  { kind: "work", label: "Work", filter: "Roles" },
  { kind: "study", label: "Study", filter: "Study" },
  { kind: "project", label: "Build", filter: "Projects" },
  { kind: "win", label: "Wins", filter: "Wins" },
]
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const MONTHS_PER_YEAR = 12
const ACTIVE_LINE = 0.45
const REVEAL_LINE = 0.85
const JUMP_OFFSET = 0.3
const PERCENT = 100
const ORDER = milestones.map(item => item.id)

const entryId = (item: Milestone) => `milestone-${item.id}`
const jumpName = (item: Milestone) => (item.kind === "work" ? item.org : `${item.title}, ${item.start}`)
const last = <T,>(items: T[]) => items[items.length - 1]

function useRange(now: YearMonth) {
  return useMemo(() => {
    const first = Math.min(...milestones.map(item => toIndex(parseMonth(item.start, now))))
    const rangeStart = Math.floor(first / MONTHS_PER_YEAR) * MONTHS_PER_YEAR
    const rangeEnd = toIndex(now) + 1
    const toPercent = (index: number) => ((index - rangeStart) / (rangeEnd - rangeStart)) * PERCENT
    let laneOffset = 0
    const rows = ROWS.map(row => {
      const items = milestones.filter(item => item.kind === row.kind)
      const lanes = assignLanes(items, now)
      const placed = items.map((item, index): Placement => {
        const start = toIndex(parseMonth(item.start, now))
        const months = monthSpan(item.start, item.end, now)
        const point = item.start === item.end
        return { item, left: toPercent(start), width: toPercent(start + months) - toPercent(start), lane: laneOffset + lanes[index], point, month: start, tenure: point ? null : formatTenure(months) }
      })
      const result = { ...row, firstLane: laneOffset, laneCount: Math.max(1, ...lanes.map(lane => lane + 1)), placed }
      laneOffset += result.laneCount
      return result
    })
    const years = Array.from({ length: Math.ceil((rangeEnd - rangeStart) / MONTHS_PER_YEAR) }, (_, index) => rangeStart / MONTHS_PER_YEAR + index)
    const placements = new Map(rows.flatMap(row => row.placed).map(placement => [placement.item.id, placement]))
    return { rows, years, placements, laneTotal: laneOffset, toPercent }
  }, [now])
}
type Range = ReturnType<typeof useRange>

/** Reads visible entries against a reading line; the playhead interpolates between their start dates. */
function measureTimeline(body: HTMLElement, nowIndex: number): ScrollState | null {
  const entries = Array.from(body.querySelectorAll<HTMLElement>(".work-entry:not([hidden])"))
  if (!entries.length) return null
  const line = innerHeight * ACTIVE_LINE
  const bounds = body.getBoundingClientRect()
  const anchors = [{ top: bounds.top, month: nowIndex, id: entries[0].dataset.id! }, ...entries.map(entry => ({ top: entry.getBoundingClientRect().top, month: Number(entry.dataset.month), id: entry.dataset.id! }))]
  const current = last(anchors.filter(anchor => anchor.top <= line)) ?? anchors[0]
  const next = anchors[anchors.indexOf(current) + 1]
  const fraction = next ? Math.min(Math.max((line - current.top) / (next.top - current.top), 0), 1) : 0
  const month = next ? current.month + (next.month - current.month) * fraction : current.month
  const seen = last(anchors.filter(anchor => anchor.top <= innerHeight * REVEAL_LINE)) ?? anchors[0]
  const progress = Math.min(Math.max((line - bounds.top) / bounds.height, 0), 1)
  return { activeId: current.id, seenId: seen.id, month, progress }
}

function useScrollState(bodyRef: React.RefObject<HTMLDivElement>, nowIndex: number, filter: Filter, onChange: (state: ScrollState) => void) {
  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const state = bodyRef.current && measureTimeline(bodyRef.current, nowIndex)
      if (state) onChange(state)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure) }
    measure()
    addEventListener("scroll", schedule, { passive: true })
    addEventListener("resize", schedule)
    return () => { cancelAnimationFrame(frame); removeEventListener("scroll", schedule); removeEventListener("resize", schedule) }
  }, [bodyRef, nowIndex, filter, onChange])
}

function jumpTo(item: Milestone) {
  const entry = document.getElementById(entryId(item))
  if (!entry) return
  const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches
  scrollTo({ top: entry.getBoundingClientRect().top + scrollY - innerHeight * JUMP_OFFSET, behavior: smooth ? "smooth" : "auto" })
  entry.focus({ preventScroll: true })
}

function RulerBar({ placement, active, dimmed }: { placement: Placement; active: boolean; dimmed: boolean }) {
  const { item } = placement
  return <button type="button" className="ruler-bar" data-kind={item.kind} data-point={placement.point || undefined} data-active={active} data-dimmed={dimmed || undefined}
    style={{ left: `${placement.left}%`, width: `${placement.width}%`, "--lane": placement.lane } as CSSProperties}
    aria-label={`Jump to ${jumpName(item)}`} title={`${item.title} · ${item.start}`} onClick={() => jumpTo(item)} />
}

function TimelineRuler({ range, activeId, filter, playheadRef }: { range: Range; activeId: string; filter: Filter; playheadRef: React.RefObject<HTMLElement> }) {
  const { rows, years, toPercent, laneTotal } = range
  return <div className="ruler-frame" style={{ "--lanes": laneTotal } as CSSProperties}>
    <div className="ruler-rows" aria-hidden="true">{rows.map(row => <span key={row.kind} data-kind={row.kind} style={{ "--first": row.firstLane, "--count": row.laneCount } as CSSProperties}>{row.label}</span>)}</div>
    <div className="ruler-canvas">
      <div className="ruler-years" aria-hidden="true">{years.map(year => <span key={year} style={{ left: `${toPercent(year * MONTHS_PER_YEAR)}%` }}>{year}</span>)}</div>
      <div className="ruler-track">
        {rows.map(row => <span key={row.kind} className="ruler-band" data-kind={row.kind} style={{ "--first": row.firstLane, "--count": row.laneCount } as CSSProperties} aria-hidden="true" />)}
        {rows.flatMap(row => row.placed).map(placement => <RulerBar key={placement.item.id} placement={placement} active={placement.item.id === activeId} dimmed={filter !== "all" && filter !== placement.item.kind} />)}
        <span className="ruler-playhead" aria-hidden="true"><b ref={playheadRef} /></span>
      </div>
    </div>
  </div>
}

function TimelineFilters({ filter, onChange, activeTitle }: { filter: Filter; onChange: (filter: Filter) => void; activeTitle: string }) {
  const options: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: "Everything", count: milestones.length },
    ...ROWS.map(row => ({ value: row.kind, label: row.filter, count: milestones.filter(item => item.kind === row.kind).length })),
  ]
  return <div className="career-toolbar">
    <div className="career-filters">{options.map(option => <button key={option.value} type="button" data-kind={option.value} aria-pressed={filter === option.value} onClick={() => onChange(option.value)}>{option.label}<span>{option.count}</span></button>)}</div>
    <p className="career-now"><span>Reading</span><b key={activeTitle}>{activeTitle}</b></p>
  </div>
}

function Emphasized({ text }: { text: string }) {
  return <>{splitMetrics(text).map((part, index) => part.metric ? <mark key={index}>{part.text}</mark> : part.text)}</>
}

function TimelineEntry({ placement, state, hidden }: { placement: Placement; state: { active: boolean; passed: boolean; seen: boolean }; hidden: boolean }) {
  const { item, tenure } = placement
  const details = [tenure, item.location].filter(Boolean).join(" · ")
  return <article id={entryId(item)} tabIndex={-1} className="work-entry" hidden={hidden} data-id={item.id} data-kind={item.kind} data-month={placement.month}
    data-active={state.active} data-passed={state.passed} data-seen={state.seen}>
    <div className="entry-when"><span className="entry-dates">{item.start}{item.start !== item.end && <> — {item.end}</>}</span>{details && <span>{details}</span>}</div>
    <span className="entry-node" aria-hidden="true" />
    <div className="entry-card">
      <p className="entry-kicker"><span>{item.label}</span>{item.org}</p>
      <h2>{item.title}</h2>
      {item.summary && <p className="entry-summary" style={{ "--i": 0 } as CSSProperties}><Emphasized text={item.summary} /></p>}
      {item.bullets && <ul>{item.bullets.map((bullet, index) => <li key={bullet} style={{ "--i": index } as CSSProperties}><Emphasized text={bullet} /></li>)}</ul>}
      {item.href && <Link className="entry-link" href={item.href}>Read the project write-up<ArrowUpRight size={15} /></Link>}
    </div>
  </article>
}

function usePlayhead(range: Range) {
  const sectionRef = useRef<HTMLElement>(null)
  const playheadRef = useRef<HTMLElement>(null)
  const paint = useCallback((month: number, progress: number) => {
    const rounded = Math.round(month)
    const playhead = range.toPercent(month + 0.5)
    sectionRef.current?.style.setProperty("--progress", String(progress))
    sectionRef.current?.style.setProperty("--playhead", `${playhead}%`)
    sectionRef.current?.style.setProperty("--playhead-fraction", String(playhead / PERCENT))
    if (playheadRef.current) playheadRef.current.textContent = `${MONTH_NAMES[rounded % MONTHS_PER_YEAR]} ${Math.floor(rounded / MONTHS_PER_YEAR)}`
  }, [range])
  return { sectionRef, playheadRef, paint }
}

export function WorkTimeline() {
  // Static export renders at build time; re-measure "Present" against the visitor's clock.
  const [now, setNow] = useState(() => currentMonth())
  useEffect(() => setNow(previous => (toIndex(currentMonth()) === toIndex(previous) ? previous : currentMonth())), [])
  const range = useRange(now)
  const [filter, setFilter] = useState<Filter>("all")
  const [activeId, setActiveId] = useState(ORDER[0])
  const [seenUpTo, setSeenUpTo] = useState(0)
  const bodyRef = useRef<HTMLDivElement>(null)
  const { sectionRef, playheadRef, paint } = usePlayhead(range)
  const visible = milestones.filter(item => filter === "all" || item.kind === filter)

  const onChange = useCallback((state: ScrollState) => {
    paint(state.month, state.progress)
    setActiveId(state.activeId)
    setSeenUpTo(previous => Math.max(previous, ORDER.indexOf(state.seenId)))
  }, [paint])
  useScrollState(bodyRef, toIndex(now), filter, onChange)

  const activeIndex = visible.findIndex(item => item.id === activeId)
  return <section ref={sectionRef} className="career" aria-label="Timeline of work, study, projects, and wins">
    <div className="career-ruler"><TimelineFilters filter={filter} onChange={setFilter} activeTitle={milestones.find(item => item.id === activeId)?.title ?? ""} /><TimelineRuler range={range} activeId={activeId} filter={filter} playheadRef={playheadRef} /></div>
    <div ref={bodyRef} className="career-body">
      <div className="career-spine" aria-hidden="true"><span /></div>
      {milestones.map((item, order) => {
        const index = visible.indexOf(item)
        const state = { active: item.id === activeId, passed: index >= 0 && index <= activeIndex, seen: filter !== "all" || order <= seenUpTo }
        return <TimelineEntry key={item.id} placement={range.placements.get(item.id)!} state={state} hidden={index < 0} />
      })}
    </div>
  </section>
}
