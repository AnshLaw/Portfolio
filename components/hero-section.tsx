"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react"
import { profile } from "@/data/portfolio"
import { OrbitalScene } from "@/components/orbital-scene"

function HeroIdentity() {
  return <div className="hero-identity">
    <Image src={profile.avatarUrl} alt={profile.name} width={48} height={48} priority />
    <div><p>Ansh Raj Suryavanshi</p><span>Software Engineer / AI Engineer</span></div>
  </div>
}

export function HeroSection() {
  return <section className="hero-section">
    <div className="hero-grid page-container">
      <div className="hero-copy"><HeroIdentity />
        <h1>Intelligence.<br />Engineered for<br />the real world.</h1>
        <p className="hero-description">I build AI that sees, systems that reason, and products that bring people together.</p>
        <p className="hero-current"><span />Currently engineering at <strong>General Motors</strong></p>
        <div className="hero-actions">
          <Link className="primary-link" href="#projects">Explore my work<ArrowUpRight size={18} /></Link>
          <a className="secondary-link" href={profile.resumeUrl} download>Resume<Download size={17} /></a>
        </div>
      </div>
      <OrbitalScene />
    </div>
    <div className="hero-bottom page-container"><span><MapPin size={14} />{profile.location}</span><a href="#projects">From idea to impact <ArrowDown size={15} /></a><span>AI systems. Human experiences.</span></div>
  </section>
}
