"use client"
import type { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function PageLayout({ children, className }: { children: ReactNode; className?: string }) {
  return <div className="site-shell"><a className="skip-link" href="#main-content">Skip to content</a><Navbar /><main id="main-content" className={className}>{children}</main><Footer /></div>
}
