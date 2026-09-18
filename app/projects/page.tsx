"use client"
import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { ProjectFilters } from "@/components/project-filters"
import { ProjectCard } from "@/components/project-card"
import { projects } from "@/data/portfolio"

const availableTags = Array.from(new Set(projects.flatMap(project => project.tags))).sort()
export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const query = searchQuery.trim().toLowerCase()
  const filtered = projects.filter(project => {
    const text = [project.title, project.summary, ...project.tech].join(" ").toLowerCase()
    return text.includes(query) && (!selectedTags.length || selectedTags.some(tag => project.tags.includes(tag)))
  })
  function toggleTag(tag: string) { setSelectedTags(tags => tags.includes(tag) ? tags.filter(item => item !== tag) : [...tags, tag]) }
  function clearFilters() { setSearchQuery(""); setSelectedTags([]) }
  return <PageLayout><section className="page-container projects-page"><header className="inner-heading"><p className="section-kicker">Projects</p><h1>Everything I’ve built.</h1><p>Industry research, hackathon entries, and side projects people actually use. Filter by type or search by name.</p></header>
    <ProjectFilters searchQuery={searchQuery} onSearchChange={setSearchQuery} selectedTags={selectedTags} onTagToggle={toggleTag} availableTags={availableTags} onClearFilters={clearFilters} />
    <p className="project-count" aria-live="polite">{filtered.length} of {projects.length} projects</p>
    <div className="projects-grid">{filtered.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
    {!filtered.length && <div className="empty-projects"><h2>No projects found.</h2><p>Try another keyword or category.</p><button className="secondary-link" onClick={clearFilters}>Clear filters</button></div>}
  </section></PageLayout>
}
