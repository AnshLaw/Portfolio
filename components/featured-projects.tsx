import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/data/portfolio"
import { ProjectCard } from "@/components/project-card"

const FEATURED_SLUGS = ["taboo-party", "llm-reasoning-system", "givvy"]
export function FeaturedProjects() {
  const featured = FEATURED_SLUGS.map(slug => projects.find(project => project.slug === slug)!)
  return <section id="projects" className="work-section page-container">
    <div className="section-heading"><div><p className="section-kicker">Selected projects</p><h2>Things I’ve shipped.</h2></div><div><p>A word game with 800+ players, reasoning research<br className="hidden sm:block" /> for in-car AI, and a hackathon-winning gift card.</p><Link href="/projects">All {projects.length} projects <ArrowUpRight size={18} /></Link></div></div>
    <div className="featured-grid">{featured.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
  </section>
}
