import { SCENE_BUILDERS, seeded, type SceneFn, type SceneFrame, type SceneId } from "@/lib/field-scenes"

const SEED = 20260317
const CAMERA_DISTANCE = 3.4
const FIELD_OF_VIEW = 2.6
const VIEW_SCALE = 0.4
const CENTER_Y = 0.56
const YAW_SPEED = 0.3
const YAW_SWING = 0.55
const BASE_PITCH = 0.32
const POINTER_YAW = 0.9
const POINTER_PITCH = 0.45
const POINTER_EASE = 0.06
const MIN_EASE = 0.035
const EASE_RANGE = 0.06
const SETTLED = 0.0005
const POINT_SIZE = 2.1
const MAX_DPR = 2
const MS_PER_SECOND = 1000
const MAX_FRAME_SECONDS = 0.05

export type FieldColors = { base: string; accent: string }

function makeFrame(count: number): SceneFrame {
  return { pos: new Float32Array(count * 3), tone: new Float32Array(count), alpha: new Float32Array(count) }
}

/** Canvas 2D point cloud that morphs between scenes with per-point easing. */
export class PointField {
  private context: CanvasRenderingContext2D
  private scenes: Record<SceneId, SceneFn>
  private scene: SceneId = "conveyor"
  private current: SceneFrame
  private target: SceneFrame
  private ease: Float32Array
  private time = 0
  private pointer = { x: 0, y: 0, easedX: 0, easedY: 0 }
  private frameId = 0
  private lastTick = 0
  private paused = false
  private visible = true
  private width = 0
  private height = 0

  constructor(private canvas: HTMLCanvasElement, private count: number, private colors: FieldColors) {
    const context = canvas.getContext("2d")
    if (!context) throw new Error("Canvas 2D is unavailable for the hero scene")
    this.context = context
    const random = seeded(SEED)
    this.scenes = Object.fromEntries(Object.entries(SCENE_BUILDERS).map(([id, build]) => [id, build(count, random)])) as Record<SceneId, SceneFn>
    this.current = makeFrame(count)
    this.target = makeFrame(count)
    this.ease = Float32Array.from({ length: count }, () => MIN_EASE + random() * EASE_RANGE)
    this.scenes[this.scene](0, this.current)
  }

  setScene(scene: SceneId) { this.scene = scene; this.wake() }
  setColors(colors: FieldColors) { this.colors = colors; this.wake() }
  setVisible(visible: boolean) { this.visible = visible; this.wake() }
  setPaused(paused: boolean) { this.paused = paused; this.wake() }

  setPointer(x: number, y: number) {
    this.pointer.x = x
    this.pointer.y = y
    this.wake()
  }

  /** Jump straight to the target scene: used for reduced motion. */
  snap() {
    this.scenes[this.scene](this.time, this.current)
    this.draw()
  }

  resize(width: number, height: number) {
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_DPR)
    this.width = width
    this.height = height
    this.canvas.width = Math.round(width * ratio)
    this.canvas.height = Math.round(height * ratio)
    this.context.setTransform(ratio, 0, 0, ratio, 0, 0)
    this.draw()
  }

  destroy() { cancelAnimationFrame(this.frameId); this.frameId = 0 }

  private wake() {
    if (this.frameId || !this.visible) return
    this.lastTick = performance.now()
    this.frameId = requestAnimationFrame(this.tick)
  }

  private tick = (now: number) => {
    this.frameId = 0
    const seconds = Math.min((now - this.lastTick) / MS_PER_SECOND, MAX_FRAME_SECONDS)
    this.lastTick = now
    if (!this.paused) this.time += seconds
    const moving = this.step()
    this.draw()
    if (this.visible && (!this.paused || moving)) this.frameId = requestAnimationFrame(this.tick)
  }

  private step() {
    this.scenes[this.scene](this.time, this.target)
    let largest = 0
    for (let index = 0; index < this.count; index++) {
      const ease = this.ease[index]
      for (let axis = index * 3; axis < index * 3 + 3; axis++) {
        const delta = this.target.pos[axis] - this.current.pos[axis]
        this.current.pos[axis] += delta * ease
        largest = Math.max(largest, Math.abs(delta))
      }
      this.current.tone[index] += (this.target.tone[index] - this.current.tone[index]) * ease * 2
      this.current.alpha[index] += (this.target.alpha[index] - this.current.alpha[index]) * ease * 2
    }
    const pointer = this.pointer
    pointer.easedX += (pointer.x - pointer.easedX) * POINTER_EASE
    pointer.easedY += (pointer.y - pointer.easedY) * POINTER_EASE
    return largest > SETTLED || Math.abs(pointer.x - pointer.easedX) > SETTLED || Math.abs(pointer.y - pointer.easedY) > SETTLED
  }

  private draw() {
    const { context, width, height } = this
    context.clearRect(0, 0, width, height)
    const unit = Math.min(width, height) * VIEW_SCALE
    const yaw = Math.sin(this.time * YAW_SPEED) * YAW_SWING + this.pointer.easedX * POINTER_YAW
    const pitch = BASE_PITCH + this.pointer.easedY * POINTER_PITCH
    const [cosYaw, sinYaw, cosPitch, sinPitch] = [Math.cos(yaw), Math.sin(yaw), Math.cos(pitch), Math.sin(pitch)]
    for (const accent of [false, true]) {
      context.fillStyle = accent ? this.colors.accent : this.colors.base
      for (let index = 0; index < this.count; index++) {
        if (this.current.tone[index] > 0.5 !== accent) continue
        const [x, y, z] = this.current.pos.subarray(index * 3, index * 3 + 3)
        const rotatedX = x * cosYaw + z * sinYaw
        const rotatedZ = -x * sinYaw + z * cosYaw
        const finalY = y * cosPitch - rotatedZ * sinPitch
        const depth = y * sinPitch + rotatedZ * cosPitch
        const scale = FIELD_OF_VIEW / (CAMERA_DISTANCE - depth)
        const size = POINT_SIZE * scale
        context.globalAlpha = Math.max(0, Math.min(1, this.current.alpha[index] * (0.3 + scale * 0.55)))
        context.fillRect(width / 2 + rotatedX * scale * unit - size / 2, height * CENTER_Y - finalY * scale * unit - size / 2, size, size)
      }
    }
    context.globalAlpha = 1
  }
}
