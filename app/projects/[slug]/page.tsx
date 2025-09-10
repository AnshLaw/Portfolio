import type { Metadata } from "next"
import { projects } from "@/data/portfolio"
import ProjectPageClient from "./ProjectPageClient"

interface ProjectPageProps {
  params: { slug: string }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params
  return <ProjectPageClient params={resolvedParams} />
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: project.title,
    description: project.summary,
  }
}
