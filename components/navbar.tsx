"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [{ label: "Work", href: "/projects" }, { label: "About", href: "/about" }, { label: "Experience", href: "/experience" }, { label: "Contact", href: "/contact" }]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  return <header className="site-header"><div className="page-container nav-inner">
    <Link href="/" className="wordmark" aria-label="Ansh Raj Suryavanshi home">ansh<span>.</span><span className="wordmark-role">Software engineer</span></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname.startsWith(item.href) ? "page" : undefined}>{item.label}</Link>)}</nav>
    <div className="nav-actions"><ThemeToggle /><Link className="nav-contact" href="/contact">Let’s talk<ArrowUpRight size={16} /></Link><button className="mobile-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
  </div>{open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" onKeyDown={event => { if (event.key === "Escape") setOpen(false) }}>{navigation.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={pathname.startsWith(item.href) ? "page" : undefined}>{item.label}<ArrowUpRight size={16} /></Link>)}</nav>}</header>
}
