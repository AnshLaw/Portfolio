"use client"

import { useEffect, useState } from "react"
import { FALLBACK_STATS } from "@/data/activity-stats-fallback"
import { fetchActivityStats, mergeStats, type PublicStats } from "@/lib/activity-stats"

/** Fallback snapshot first, then live numbers once the public feed answers. */
export function useActivityStats(): { stats: PublicStats; live: boolean } {
  const [state, setState] = useState({ stats: FALLBACK_STATS, live: false })
  useEffect(() => {
    let active = true
    fetchActivityStats().then(live => {
      if (active && live) setState({ stats: mergeStats(FALLBACK_STATS, live), live: true })
    })
    return () => { active = false }
  }, [])
  return state
}
