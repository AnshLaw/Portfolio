"use client"

import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Zap } from "lucide-react"
import { SiGithub } from "react-icons/si"
import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectImageGallery } from "@/components/project-image-gallery"
import { projects } from "@/data/portfolio"

interface ProjectPageProps {
  params: { slug: string }
}

export default function ProjectPageClient({ params }: ProjectPageProps) {
  const { slug } = params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <PageLayout>
      <div className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="group">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Projects
              </Link>
            </Button>
          </div>

          {/* Project Header */}
          <div className="mb-12 space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="capitalize">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">{project.summary}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <Button asChild>
                  <Link href={project.liveUrl} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Demo
                  </Link>
                </Button>
              )}
              {project.repoUrl ? (
                <Button variant="outline" asChild>
                  <Link href={project.repoUrl!} target="_blank">
                    <SiGithub className="mr-2 h-4 w-4" />
                    View Source Code
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" disabled className="cursor-not-allowed">
                  <SiGithub className="mr-2 h-4 w-4" />
                  Confidential
                </Button>
              )}
            </div>
          </div>

          {/* Project Images */}
          <div className="mb-12">
            <ProjectImageGallery images={project.images} title={project.title} />
          </div>

          {/* Project Details */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Problem */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-red-500 rounded-full" />
                    The Problem
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
                </CardContent>
              </Card>

              {/* Solution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full" />
                    The Solution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
                </CardContent>
              </Card>

              {/* Impact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                    Impact & Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">{project.impact}</p>
                  <div className="space-y-2">
                    {project.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Zap className="h-4 w-4 text-primary" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tech Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Project Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.liveUrl && (
                    <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                      <Link href={project.liveUrl} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                  {project.repoUrl ? (
                    <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                      <Link href={project.repoUrl!} target="_blank">
                        <SiGithub className="mr-2 h-4 w-4" />
                        Source Code
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" disabled className="w-full justify-start bg-transparent cursor-not-allowed">
                      <SiGithub className="mr-2 h-4 w-4" />
                      Confidential
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation to Other Projects */}
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-6">Other Projects</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {projects
                .filter((p) => p.slug !== project.slug)
                .slice(0, 2)
                .map((otherProject) => (
                  <Card key={otherProject.slug} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <Link href={`/projects/${otherProject.slug}`} className="block space-y-2">
                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                          {otherProject.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{otherProject.summary}</p>
                        <div className="flex flex-wrap gap-1">
                          {otherProject.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
