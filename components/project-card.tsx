import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import type { Project } from "@/data/portfolio"

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article className={`project-card project-${project.slug}`}>
    <Link className="project-visual" href={`/projects/${project.slug}/`} aria-label={`Read about ${project.title}`}>
      <Image src={project.images[0].src} alt={project.images[0].alt} width={960} height={600} className="project-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      <span className="project-open"><ArrowUpRight size={22} /></span>
    </Link>
    <div className="project-copy"><div className="project-meta"><span>{project.tags.slice(0, 2).join(" / ")}</span><span>{project.period || "Independent project"}</span></div>
      <h3><Link href={`/projects/${project.slug}/`}>{project.title}</Link></h3>
      <p>{project.summary}</p><div className="project-tech">{project.tech.slice(0, 4).map(tech => <span key={tech}>{tech}</span>)}</div>
      <div className="project-links">
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{project.liveLabel || "Visit project"}<ArrowUpRight size={15} /></a>}
        {project.repoUrl ? <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"><Github size={15} />Source</a> : <span>{project.sourceLabel || (project.slug === "llm-reasoning-system" ? "Industry research" : "Private source")}</span>}
        {project.links?.map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={14} /></a>)}
      </div>
    </div>
  </article>
}
