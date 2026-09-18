import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { experience, projects } from "@/data/portfolio"

function WorkTimeline() {
  return <section className="work-timeline" aria-label="Professional experience">{experience.map(job => <article key={job.company}><div className="timeline-date"><span>{job.start} — {job.end}</span><p>{job.location}</p></div><div><p className="section-kicker">{job.company}</p><h2>{job.role}</h2><ul>{job.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></div></article>)}</section>
}

function ProjectTimeline() {
  return <section className="activity-section"><div className="section-heading"><h2>Beyond the day job.</h2><p>Independent builds, research, and hackathons.</p></div><div className="activity-list">{projects.map(project => <article key={project.slug}><time>{project.period || "Independent project"}</time><div><h3><Link href={`/projects/${project.slug}/`}>{project.title}</Link></h3><p>{project.impact}</p></div><Link href={`/projects/${project.slug}/`} aria-label={`Read about ${project.title}`}><ArrowUpRight size={18} /></Link></article>)}</div></section>
}

export default function ExperiencePage() {
  return <PageLayout><div className="page-container experience-page"><header className="inner-heading"><p className="section-kicker">Experience & impact</p><h1>From the lab.<br />Into the real world.</h1><p>Production computer vision at General Motors. Edge AI at Hyundai Mobis. Independent products in the hands of real users.</p></header><WorkTimeline /><ProjectTimeline /></div></PageLayout>
}
