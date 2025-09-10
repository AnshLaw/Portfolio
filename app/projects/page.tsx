"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { PageLayout } from "@/components/page-layout"
import { SectionHeader } from "@/components/section-header"
import { ProjectFilters } from "@/components/project-filters"
import { ProjectCard } from "@/components/project-card"
import { projects } from "@/data/portfolio"
import { Folder } from "lucide-react"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Get all unique tags
  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => project.tags.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [searchQuery, selectedTags])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
  }

  return (
    <PageLayout>
      <div className="relative py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(120,119,198,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(120,119,198,0.06),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(120,119,198,0.04),transparent_50%)]" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }, (_, i) => {
            // Use deterministic values based on index to avoid hydration mismatch
            const seed = i * 137.508; // Use prime number for better distribution
            const x = (Math.sin(seed) * 0.5 + 0.5) * 1200; // Deterministic x position
            const y = (Math.cos(seed) * 0.5 + 0.5) * 800;  // Deterministic y position
            const duration = 15 + (i % 5) * 5; // Deterministic duration
            const delay = (i % 3) * 3; // Deterministic delay

            return (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-primary/25 rounded-full"
                initial={{ x, y }}
                animate={{
                  y: [y, y - 200, y],
                  x: [x, x + 50, x],
                  opacity: [0.25, 0.6, 0.25],
                }}
                transition={{
                  duration,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "linear",
                  delay,
                }}
              />
            );
          })}
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Projects"
            description="A collection of my work showcasing technical skills, problem-solving abilities, and passion for building impactful solutions"
            icon={Folder}
            className="mb-16 text-center"
          />

          {/* Filters */}
          <div className="mb-12">
            <ProjectFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              availableTags={availableTags}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Results Count */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </motion.div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
              <div className="space-y-4">
                <div className="text-6xl">🔍</div>
                <h3 className="text-xl font-semibold">No projects found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Try adjusting your search terms or clearing the filters to see more projects.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
