import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/data/portfolio"
import { ProjectCard } from "@/components/project-card"

const FEATURED_SLUGS = ["taboo-party", "llm-reasoning-system", "givvy"]
export function FeaturedProjects() {
  const featured = FEATURED_SLUGS.map(slug => projects.find(project => project.slug === slug)!)
  return <section id="projects" className="work-section page-container">
    <div className="section-heading"><div><p className="section-kicker">Selected work</p><h2>Built to make<br />a difference.</h2></div><div><p>From on-device intelligence to a game night<br className="hidden sm:block" /> with thousands of players. Ideas, shipped.</p><Link href="/projects">All {projects.length} projects <ArrowUpRight size={18} /></Link></div></div>
    <div className="featured-grid">{featured.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
  </section>
}
