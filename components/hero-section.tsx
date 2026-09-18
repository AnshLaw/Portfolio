import Image from "next/image"
import Link from "next/link"
import type { CSSProperties } from "react"
import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react"
import { profile } from "@/data/portfolio"
import { FieldScene } from "@/components/field-scene"

const HEADLINE = ["I take machine", "learning out of", "the notebook."]

function HeroIdentity() {
  return <div className="hero-identity hero-rise" style={{ "--i": 0 } as CSSProperties}>
    <Image src={profile.avatarUrl} alt={profile.name} width={48} height={48} priority />
    <div><p>Ansh Raj Suryavanshi</p><span>Software engineer, General Motors</span></div>
  </div>
}

export function HeroSection() {
  return <section className="hero-section">
    <div className="hero-grid page-container">
      <div className="hero-copy"><HeroIdentity />
        <h1>{HEADLINE.map((line, index) => <span className="hero-line" key={line}><span style={{ "--i": index + 1 } as CSSProperties}>{line}</span>{" "}</span>)}</h1>
        <p className="hero-description hero-rise" style={{ "--i": 4 } as CSSProperties}>Right now that means computer vision on GM’s plant floor. Before that, gesture controls and an on-device LLM for Hyundai cars. On weekends, a party game 800 people signed up to play.</p>
        <div className="hero-actions hero-rise" style={{ "--i": 5 } as CSSProperties}>
          <Link className="primary-link" href="#projects">See the projects<ArrowUpRight size={18} /></Link>
          <a className="secondary-link" href={profile.resumeUrl} download>Download resume<Download size={17} /></a>
        </div>
      </div>
      <FieldScene />
    </div>
    <div className="hero-bottom page-container"><span><MapPin size={14} />{profile.location}</span><a href="#projects">Scroll to projects <ArrowDown size={15} /></a><span>Kettering University, B.S. Computer Science ’25</span></div>
  </section>
}
