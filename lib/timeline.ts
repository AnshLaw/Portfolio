export type YearMonth = { year: number; month: number }
export type Span = { start: string; end: string }

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const MONTHS_PER_YEAR = 12
const ONGOING = "Present"

export function currentMonth(date = new Date()): YearMonth {
  return { year: date.getFullYear(), month: date.getMonth() }
}

export function parseMonth(label: string, now: YearMonth): YearMonth {
  if (label.trim() === ONGOING) return now
  const [monthName, year] = label.trim().split(/\s+/)
  const month = MONTHS.indexOf(monthName.slice(0, 3))
  if (month < 0 || !Number(year)) throw new Error(`Unrecognized timeline date: "${label}"`)
  return { year: Number(year), month }
}

export function toIndex({ year, month }: YearMonth) {
  return year * MONTHS_PER_YEAR + month
}

/** Inclusive month count, so a single-month event spans 1. */
export function monthSpan(start: string, end: string, now: YearMonth) {
  return toIndex(parseMonth(end, now)) - toIndex(parseMonth(start, now)) + 1
}

export function formatTenure(months: number) {
  const years = Math.floor(months / MONTHS_PER_YEAR)
  const rest = months % MONTHS_PER_YEAR
  return [years && `${years} yr`, rest && `${rest} mo`].filter(Boolean).join(" ")
}

/** Greedy lane packing: overlapping spans get stacked on separate rows. */
export function assignLanes(spans: Span[], now: YearMonth) {
  const laneEnds: number[] = []
  const order = spans.map((span, index) => ({ index, start: toIndex(parseMonth(span.start, now)), end: toIndex(parseMonth(span.end, now)) }))
    .sort((first, second) => first.start - second.start)
  const lanes = new Array<number>(spans.length)
  for (const item of order) {
    const lane = laneEnds.findIndex(end => end < item.start)
    const target = lane < 0 ? laneEnds.length : lane
    laneEnds[target] = item.end
    lanes[item.index] = target
  }
  return lanes
}
