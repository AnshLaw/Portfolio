const WIDTH = 120
const HEIGHT = 32
const PAD = 2
const MIN_POINTS = 2

/** Tiny trend line; renders nothing when there's no shape to show. */
export function Sparkline({ points }: { points: number[] }) {
  const max = Math.max(...points, 0)
  if (points.length < MIN_POINTS || max === 0) return null
  const step = WIDTH / (points.length - 1)
  const y = (v: number) => HEIGHT - PAD - (v / max) * (HEIGHT - 2 * PAD)
  const line = points.map((v, i) => `${(i * step).toFixed(1)},${y(v).toFixed(1)}`).join(" ")
  return <svg className="sparkline" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" aria-hidden="true">
    <polyline points={`0,${HEIGHT} ${line} ${WIDTH},${HEIGHT}`} fill="var(--primary)" fillOpacity="0.12" stroke="none" />
    <polyline points={line} fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
  </svg>
}
