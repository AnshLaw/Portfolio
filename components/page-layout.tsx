"use client"
import type { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { usePageMotion } from "@/hooks/use-page-motion"

const MAIN_ID = "main-content"

export function PageLayout({ children, className }: { children: ReactNode; className?: string }) {
  usePageMotion(MAIN_ID)
  return <div className="site-shell"><a className="skip-link" href={`#${MAIN_ID}`}>Skip to content</a><Navbar /><main id={MAIN_ID} className={className}>{children}</main><Footer /></div>
}
