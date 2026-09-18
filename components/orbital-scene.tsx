"use client"

import { useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent } from "react"
import { Pause, Play } from "lucide-react"

const RING_COUNT = 9
const ROTATION_LIMIT = 16
const RING_STEP = 20
const CENTER_OFFSET = 0.5
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

function subscribeToMotionPreference(callback: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY)
  media.addEventListener("change", callback)
  return () => media.removeEventListener("change", callback)
}

function getMotionPreference() { return window.matchMedia(REDUCED_MOTION_QUERY).matches }
function getServerMotionPreference() { return false }

export function OrbitalScene() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useSyncExternalStore(subscribeToMotionPreference, getMotionPreference, getServerMotionPreference)
  const [paused, setPaused] = useState(false)
  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || paused || event.pointerType === "touch") return
    const bounds = event.currentTarget.getBoundingClientRect()
    ref.current?.style.setProperty("--tilt-y", `${((event.clientX - bounds.left) / bounds.width - CENTER_OFFSET) * ROTATION_LIMIT}deg`)
    ref.current?.style.setProperty("--tilt-x", `${-((event.clientY - bounds.top) / bounds.height - CENTER_OFFSET) * ROTATION_LIMIT}deg`)
  }
  function resetTilt() {
    ref.current?.style.setProperty("--tilt-y", "0deg")
    ref.current?.style.setProperty("--tilt-x", "0deg")
  }
  return <div className="orbital-stage" ref={ref} data-paused={paused || !!reducedMotion} onPointerMove={followPointer} onPointerLeave={resetTilt}>
    <div className="scene-grid" aria-hidden="true" />
    <div className="scene-caption"><span className="signal-dot" />The intersection of intelligence & interaction</div>
    <div className="orbital-perspective" aria-hidden="true"><div className="orbital-tilt"><div className="orbital-assembly">
      {Array.from({ length: RING_COUNT }, (_, index) => <div key={index} className="orbital-ring" style={{ "--angle": `${index * RING_STEP}deg` } as CSSProperties} />)}
      <div className="orbital-core"><div /><div /><div /></div>
      <div className="orbit-path orbit-path-one"><span /></div><div className="orbit-path orbit-path-two"><span /></div>
    </div></div></div>
    <div className="scene-label scene-label-ai"><span />Applied AI<small>Perceive. Reason. Act.</small></div>
    <div className="scene-label scene-label-web"><span />Connected products<small>Built for people.</small></div>
    <div className="scene-footer"><span>Interactive field / move to explore</span><button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play 3D animation" : "Pause 3D animation"} aria-pressed={paused} disabled={!!reducedMotion}>{paused ? <Play size={14} /> : <Pause size={14} />}</button></div>
  </div>
}
