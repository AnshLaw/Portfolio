const WIDTH = 120
const HEIGHT = 32
const PAD = 2
const MIN_POINTS = 2

/** Tiny trend line. With no shape to show it still reserves its slot, so live data can't shift the layout. */
export function Sparkline({ points }: { points: number[] }) {
  const max = Math.max(...points, 0)
  if (points.length < MIN_POINTS || max === 0) return <div className="sparkline" aria-hidden="true" />

  const step = WIDTH / (points.length - 1)
  const y = (v: number) => HEIGHT - PAD - (v / max) * (HEIGHT - 2 * PAD)
  const line = points.map((v, i) => `${(i * step).toFixed(1)},${y(v).toFixed(1)}`).join(" ")
  return <svg className="sparkline" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" aria-hidden="true">
    <polyline points={`0,${HEIGHT} ${line} ${WIDTH},${HEIGHT}`} fill="var(--primary)" fillOpacity="0.12" stroke="none" />
    <polyline points={line} fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
  </svg>
}
