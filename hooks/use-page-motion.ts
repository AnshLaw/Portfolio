"use client"

import { useEffect } from "react"

const REVEAL_SELECTOR = [
  ".section-heading", ".inner-heading", ".about-intro > div", ".about-panel", ".skills-grid > div", ".awards-list > div",
  ".activity-list > article", ".project-card", ".impact-section > div", ".contact-intro", ".contact-form", ".project-search", ".filter-tags",
].join(",")
const TILT_SELECTOR = ".project-visual"
const MAX_STAGGER = 5
const TILT_DEGREES = 7
const REVEAL_MARGIN = "0px 0px -8% 0px"
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"
const FINE_POINTER = "(hover: hover) and (pointer: fine)"

function staggerIndex(element: Element) {
  const siblings = Array.from(element.parentElement?.children ?? []).filter(sibling => sibling.matches(REVEAL_SELECTOR))
  return Math.min(siblings.indexOf(element), MAX_STAGGER)
}

function observeReveals(root: HTMLElement) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return
    entry.target.setAttribute("data-revealed", "")
    observer.unobserve(entry.target)
  }), { rootMargin: REVEAL_MARGIN })
  const track = (element: HTMLElement) => {
    if (element.hasAttribute("data-reveal")) return
    element.setAttribute("data-reveal", "")
    element.style.setProperty("--reveal-index", String(staggerIndex(element)))
    if (element.getBoundingClientRect().top < innerHeight) element.setAttribute("data-revealed", "")
    else observer.observe(element)
  }
  const scan = () => root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach(track)
  scan()
  // Filtered project lists render new cards after mount.
  let pending = 0
  const mutations = new MutationObserver(() => { if (!pending) pending = requestAnimationFrame(() => { pending = 0; scan() }) })
  mutations.observe(root, { childList: true, subtree: true })
  document.documentElement.classList.add("motion-ready")
  return () => { cancelAnimationFrame(pending); observer.disconnect(); mutations.disconnect() }
}

function tiltCards(root: HTMLElement) {
  const move = (event: PointerEvent) => {
    const card = (event.target as Element).closest<HTMLElement>(TILT_SELECTOR)
    if (!card) return
    const bounds = card.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    card.style.setProperty("--tilt-x", `${(0.5 - y) * TILT_DEGREES}deg`)
    card.style.setProperty("--tilt-y", `${(x - 0.5) * TILT_DEGREES}deg`)
    card.style.setProperty("--glare-x", `${x * 100}%`)
    card.style.setProperty("--glare-y", `${y * 100}%`)
  }
  const leave = (event: PointerEvent) => {
    const card = (event.target as Element).closest<HTMLElement>(TILT_SELECTOR)
    if (card && !card.contains(event.relatedTarget as Node)) ["--tilt-x", "--tilt-y"].forEach(name => card.style.setProperty(name, "0deg"))
  }
  root.addEventListener("pointermove", move)
  root.addEventListener("pointerout", leave)
  return () => { root.removeEventListener("pointermove", move); root.removeEventListener("pointerout", leave) }
}

/** Scroll reveals and card tilt for every page, applied by selector so content stays server-rendered. */
export function usePageMotion(rootId: string) {
  useEffect(() => {
    const root = document.getElementById(rootId)
    if (!root || matchMedia(REDUCED_MOTION).matches) return
    const cleanups = [observeReveals(root)]
    if (matchMedia(FINE_POINTER).matches) cleanups.push(tiltCards(root))
    return () => cleanups.forEach(cleanup => cleanup())
  }, [rootId])
}
