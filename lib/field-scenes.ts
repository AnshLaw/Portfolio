/**
 * Point-cloud targets for the hero scene. Each scene writes, per point:
 * xyz into `pos`, 0..1 copper tint into `tone`, 0..1 opacity into `alpha`.
 */
export type SceneId = "conveyor" | "cabin" | "cards"
export type SceneFrame = { pos: Float32Array; tone: Float32Array; alpha: Float32Array }
export type SceneFn = (time: number, frame: SceneFrame) => void

const TAU = Math.PI * 2
const BELT_HALF_LENGTH = 1.5
const BELT_Y = -0.38
const BELT_HALF_WIDTH = 0.42
const BOX_COUNT = 4
const BOX_SIZE = 0.26
const BELT_SPEED = 0.22
const LENS_WINDOW = 0.28
const WHEEL_RADIUS = 0.72
const WHEEL_TUBE = 0.055
const WHEEL_TILT = -0.2
const RIPPLE_RINGS = 3
const RIPPLE_SPREAD = 0.75
const RIPPLE_SPEED = 0.28
const CARD_COUNT = 5
const CARD_WIDTH = 0.5
const CARD_HEIGHT = 0.76
const CARD_FAN_STEP = 0.24
const CARD_PIVOT_Y = -1.05
const FORBIDDEN_WORDS = [0.3, 0.22, 0.27, 0.18, 0.25]

export function seeded(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

function write(frame: SceneFrame, index: number, x: number, y: number, z: number, tone = 0, alpha = 1) {
  frame.pos[index * 3] = x
  frame.pos[index * 3 + 1] = y
  frame.pos[index * 3 + 2] = z
  frame.tone[index] = tone
  frame.alpha[index] = alpha
}

function wrap(value: number, half: number) {
  return ((((value + half) % (half * 2)) + half * 2) % (half * 2)) - half
}

function cubeSurface(random: () => number, size: number) {
  const face = Math.floor(random() * 6)
  const u = (random() - 0.5) * size
  const v = (random() - 0.5) * size
  const side = (face % 2 ? 0.5 : -0.5) * size
  if (face < 2) return [side, u, v]
  if (face < 4) return [u, side, v]
  return [u, v, side]
}

type ConveyorPoint = { kind: "belt" | "box" | "lens"; x: number; y?: number; z?: number; center?: number; tone?: number; alpha?: number }

/** GM Flint: parts ride a conveyor under a camera; whatever is in view lights up. */
export function conveyorScene(count: number, random: () => number): SceneFn {
  const points = Array.from({ length: count }, (_, index): ConveyorPoint => {
    const share = index / count
    if (share < 0.28) return { kind: "belt", x: (random() * 2 - 1) * BELT_HALF_LENGTH, z: (random() * 2 - 1) * BELT_HALF_WIDTH }
    if (share < 0.38) return { kind: "belt", x: (random() * 2 - 1) * BELT_HALF_LENGTH, z: random() > 0.5 ? BELT_HALF_WIDTH : -BELT_HALF_WIDTH }
    if (share < 0.7) {
      const [x, y, z] = cubeSurface(random, BOX_SIZE)
      const box = index % BOX_COUNT
      return { kind: "box", center: -BELT_HALF_LENGTH + (box + 0.5) * (BELT_HALF_LENGTH * 2 / BOX_COUNT), x, y, z }
    }
    return { kind: "lens", ...lensPoint(random) }
  })
  return (time, frame) => points.forEach((point, index) => {
    if (point.kind === "belt") return write(frame, index, point.x, BELT_Y, point.z!, 0, 0.55)
    if (point.kind === "lens") return write(frame, index, point.x, point.y!, point.z!, point.tone ?? 0, point.alpha ?? 0.8)
    const center = wrap(point.center! + time * BELT_SPEED, BELT_HALF_LENGTH)
    const seen = Math.abs(center) < LENS_WINDOW ? 1 : 0
    const edgeFade = Math.min(1, (BELT_HALF_LENGTH - Math.abs(center)) * 4)
    write(frame, index, center + point.x, BELT_Y + BOX_SIZE / 2 + point.y!, point.z!, seen, edgeFade)
  })
}

function lensPoint(random: () => number) {
  const apex = [0, 0.95, 0]
  const baseY = BELT_Y + BOX_SIZE + 0.02
  const corners = [[-0.42, 0.3], [0.42, 0.3], [0.42, -0.3], [-0.42, -0.3]]
  const pick = random()
  if (pick < 0.2) {
    const [x, y, z] = cubeSurface(random, 0.16)
    return { x: apex[0] + x, y: apex[1] + 0.08 + y, z: apex[2] + z, alpha: 1 }
  }
  const corner = corners[Math.floor(random() * 4)]
  const t = random()
  if (pick < 0.75) return { x: corner[0] * t, y: apex[1] + (baseY - apex[1]) * t, z: corner[1] * t, alpha: 0.35 + 0.5 * (1 - t) }
  const next = corners[(corners.indexOf(corner) + 1) % 4]
  return { x: corner[0] + (next[0] - corner[0]) * t, y: baseY, z: corner[1] + (next[1] - corner[1]) * t, tone: 1, alpha: 0.7 }
}

/** Hyundai Mobis: a steering wheel with voice alerts rippling out of the cabin. */
export function cabinScene(count: number, random: () => number): SceneFn {
  const cos = Math.cos(WHEEL_TILT)
  const sin = Math.sin(WHEEL_TILT)
  const points = Array.from({ length: count }, (_, index) => {
    const share = index / count
    const angle = random() * TAU
    if (share < 0.45) {
      const tube = random() * TAU
      const radius = WHEEL_RADIUS + WHEEL_TUBE * Math.cos(tube)
      return { x: radius * Math.cos(angle), y: radius * Math.sin(angle), z: WHEEL_TUBE * Math.sin(tube) }
    }
    if (share < 0.53) {
      const radius = Math.sqrt(random()) * 0.2
      return { x: radius * Math.cos(angle), y: radius * Math.sin(angle), z: 0.04, tone: 1 }
    }
    if (share < 0.65) {
      const spoke = [Math.PI, 0, Math.PI * 1.5][index % 3]
      const radius = 0.2 + random() * (WHEEL_RADIUS - 0.22)
      return { x: radius * Math.cos(spoke), y: radius * Math.sin(spoke), z: 0 }
    }
    const arc = (random() - 0.5) * 1.1 + (random() > 0.5 ? 0 : Math.PI)
    return { ripple: index % RIPPLE_RINGS, arc, jitter: random() * 0.03 }
  })
  return (time, frame) => points.forEach((point, index) => {
    if (point.ripple === undefined) {
      return write(frame, index, point.x!, point.y! * cos - point.z! * sin, point.y! * sin + point.z! * cos, point.tone ?? 0, 0.95)
    }
    const phase = (point.ripple / RIPPLE_RINGS + time * RIPPLE_SPEED) % 1
    const radius = WHEEL_RADIUS + 0.2 + phase * RIPPLE_SPREAD + point.jitter!
    const y = radius * Math.sin(point.arc!) * 0.8
    write(frame, index, radius * Math.cos(point.arc!), y * cos, y * sin, 1, (1 - phase) * 0.9)
  })
}

function cardLocal(random: () => number) {
  const pick = random()
  if (pick < 0.42) {
    const edge = random() * 2 * (CARD_WIDTH + CARD_HEIGHT)
    if (edge < CARD_WIDTH) return { x: edge - CARD_WIDTH / 2, y: CARD_HEIGHT / 2 }
    if (edge < CARD_WIDTH * 2) return { x: edge - CARD_WIDTH * 1.5, y: -CARD_HEIGHT / 2 }
    const side = edge - CARD_WIDTH * 2
    return { x: side < CARD_HEIGHT ? -CARD_WIDTH / 2 : CARD_WIDTH / 2, y: (side % CARD_HEIGHT) - CARD_HEIGHT / 2 }
  }
  if (pick < 0.58) return { x: (random() - 0.5) * 0.34, y: 0.26 + (random() - 0.5) * 0.03, title: true }
  if (pick < 0.64) return { x: (random() - 0.5) * 0.4, y: 0.17 }
  const row = Math.floor(random() * FORBIDDEN_WORDS.length)
  return { x: (random() - 0.5) * FORBIDDEN_WORDS[row], y: 0.07 - row * 0.085 + (random() - 0.5) * 0.015 }
}

/** Taboo Party: a fanned hand of cards — one guess word, five forbidden ones. */
export function cardsScene(count: number, random: () => number): SceneFn {
  const points = Array.from({ length: count }, (_, index) => ({ card: index % CARD_COUNT, ...cardLocal(random) }))
  const middle = (CARD_COUNT - 1) / 2
  return (time, frame) => {
    const breath = 1 + Math.sin(time * 0.9) * 0.12
    points.forEach((point, index) => {
      const angle = (point.card - middle) * CARD_FAN_STEP * breath
      const lift = point.card === middle ? 0.08 + Math.sin(time * 1.4) * 0.03 : 0
      const localY = point.y + CARD_HEIGHT / 2 - CARD_PIVOT_Y + 0.1 + lift
      const x = point.x * Math.cos(angle) - localY * Math.sin(angle)
      const y = point.x * Math.sin(angle) + localY * Math.cos(angle) + CARD_PIVOT_Y - 0.35
      const tone = point.title && point.card === middle ? 1 : 0
      write(frame, index, x, y, (point.card - middle) * 0.07, tone, point.title ? 1 : 0.8)
    })
  }
}

export const SCENE_BUILDERS: Record<SceneId, (count: number, random: () => number) => SceneFn> = {
  conveyor: conveyorScene,
  cabin: cabinScene,
  cards: cardsScene,
}
