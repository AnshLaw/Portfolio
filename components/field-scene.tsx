"use client"

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent } from "react"
import { Pause, Play } from "lucide-react"
import { PointField } from "@/lib/point-field"
import type { SceneId } from "@/lib/field-scenes"

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"
const SCENE_DURATION_MS = 7000
const DESKTOP_POINTS = 1600
const MOBILE_POINTS = 950
const MOBILE_WIDTH = 640

const SCENES: { id: SceneId; tab: string; where: string; title: string; detail: string }[] = [
  { id: "conveyor", tab: "GM Flint", where: "General Motors · now", title: "72 cameras watching 38 conveyor lines", detail: "Real-time vision on the plant floor, plus the pipeline that cut camera setup from weeks to days." },
  { id: "cabin", tab: "Hyundai cabin", where: "Hyundai Mobis · 2022–25", title: "Gestures and a language model, inside the car", detail: "Gesture controls shown at CES 2023. An on-device LLM with 35% lower latency, driving real-time voice alerts." },
  { id: "cards", tab: "Taboo Party", where: "Side project · Dec 2025", title: "Taboo, rebuilt for Discord and the browser", detail: "One word to guess, five you can’t say. 52K+ visits, 800+ players." },
]

function subscribeToMotionPreference(callback: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY)
  media.addEventListener("change", callback)
  return () => media.removeEventListener("change", callback)
}
const getMotionPreference = () => window.matchMedia(REDUCED_MOTION_QUERY).matches
const getServerMotionPreference = () => false

function readColors(element: HTMLElement) {
  const styles = getComputedStyle(element)
  return { base: styles.getPropertyValue("--field-base").trim(), accent: styles.getPropertyValue("--field-accent").trim() }
}

function useField(stageRef: React.RefObject<HTMLDivElement | null>, canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const fieldRef = useRef<PointField | null>(null)
  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return
    const field = new PointField(canvas, innerWidth < MOBILE_WIDTH ? MOBILE_POINTS : DESKTOP_POINTS, readColors(stage))
    fieldRef.current = field
    const resize = new ResizeObserver(([entry]) => field.resize(entry.contentRect.width, entry.contentRect.height))
    const visibility = new IntersectionObserver(([entry]) => field.setVisible(entry.isIntersecting))
    const theme = new MutationObserver(() => field.setColors(readColors(stage)))
    resize.observe(canvas)
    visibility.observe(stage)
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => { resize.disconnect(); visibility.disconnect(); theme.disconnect(); field.destroy(); fieldRef.current = null }
  }, [stageRef, canvasRef])
  return fieldRef
}

export function FieldScene() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fieldRef = useField(stageRef, canvasRef)
  const reducedMotion = useSyncExternalStore(subscribeToMotionPreference, getMotionPreference, getServerMotionPreference)
  const [userPaused, setUserPaused] = useState(false)
  const [sceneIndex, setSceneIndex] = useState(0)
  const paused = userPaused || reducedMotion
  const scene = SCENES[sceneIndex]

  useEffect(() => {
    fieldRef.current?.setScene(scene.id)
    fieldRef.current?.setPaused(paused)
    if (reducedMotion) fieldRef.current?.snap()
  }, [fieldRef, scene.id, paused, reducedMotion])

  useEffect(() => {
    if (paused) return
    const timer = window.setTimeout(() => setSceneIndex((sceneIndex + 1) % SCENES.length), SCENE_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [paused, sceneIndex])

  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (paused || event.pointerType === "touch") return
    const bounds = event.currentTarget.getBoundingClientRect()
    fieldRef.current?.setPointer((event.clientX - bounds.left) / bounds.width - 0.5, (event.clientY - bounds.top) / bounds.height - 0.5)
  }

  return <div className="field-stage" ref={stageRef} data-paused={paused} data-scene={scene.id} onPointerMove={followPointer} onPointerLeave={() => fieldRef.current?.setPointer(0, 0)} style={{ "--scene-duration": `${SCENE_DURATION_MS}ms` } as CSSProperties}>
    <canvas ref={canvasRef} aria-hidden="true" />
    <div className="field-caption" key={scene.id}><p>{scene.where}</p><strong>{scene.title}</strong><span>{scene.detail}</span></div>
    <div className="field-controls">
      <div className="field-tabs">{SCENES.map((item, index) => <button key={item.id} type="button" aria-pressed={index === sceneIndex} aria-label={`Show ${item.tab} scene`} onClick={() => setSceneIndex(index)}>{item.tab}<i key={`${item.id}-${sceneIndex}`} /></button>)}</div>
      <button type="button" className="field-pause" onClick={() => setUserPaused(!userPaused)} aria-label={paused ? "Play 3D animation" : "Pause 3D animation"} aria-pressed={paused} disabled={reducedMotion}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
    </div>
  </div>
}
