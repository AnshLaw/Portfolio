import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { WorkTimeline } from "@/components/work-timeline"
import { projects } from "@/data/portfolio"

function ProjectTimeline() {
  return <section className="activity-section"><div className="section-heading"><h2>Outside the day job.</h2><p>Side projects, research, and hackathons.</p></div><div className="activity-list">{projects.map(project => <article key={project.slug}><time>{project.period || "Independent project"}</time><div><h3><Link href={`/projects/${project.slug}/`}>{project.title}</Link></h3><p>{project.impact}</p></div><Link href={`/projects/${project.slug}/`} aria-label={`Read about ${project.title}`}><ArrowUpRight size={18} /></Link></article>)}</div></section>
}

export default function ExperiencePage() {
  return <PageLayout><div className="page-container experience-page"><header className="inner-heading"><p className="section-kicker">Experience</p><h1>Where I’ve worked.</h1><p>Production computer vision at General Motors. Edge AI at Hyundai Mobis. Scroll to rewind, or pick a role on the ruler.</p></header><WorkTimeline /><ProjectTimeline /></div></PageLayout>
}
