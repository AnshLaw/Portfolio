"use client"

import { motion } from "framer-motion"
import { ExternalLink, ArrowRight } from "lucide-react"
import { SiGithub} from "react-icons/si"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { projects } from "@/data/portfolio"

type Project = (typeof projects)[0]

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Card className="h-full overflow-hidden border-0 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
        {/* Project Image */}
        <div className="relative overflow-hidden">
          <Image
            src={project.images[0].src || "/placeholder.svg"}
            alt={project.images[0].alt}
            width={400}
            height={240}
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Overlay Actions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              {project.repoUrl ? (
                <Button size="sm" variant="secondary" asChild className="bg-background/90 backdrop-blur-sm">
                  <Link href={project.repoUrl!} target="_blank">
                    <SiGithub className="h-4 w-4 mr-1" />
                    Code
                  </Link>
                </Button>
              ) : (
                <Button size="sm" variant="secondary" disabled className="bg-background/90 backdrop-blur-sm cursor-not-allowed">
                  <SiGithub className="h-4 w-4 mr-1" />
                  Confidential
                </Button>
              )}
              {project.liveUrl && (
                <Button size="sm" variant="secondary" asChild className="bg-background/90 backdrop-blur-sm">
                  <Link href={project.liveUrl} target="_blank">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Live
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Impact Badge */}
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm font-medium">
              {project.highlights[0].split(" ")[0]} {project.highlights[0].split(" ")[1]}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Title and Summary */}
          <div className="space-y-2">
            <h3 className="font-bold text-xl group-hover:text-primary transition-colors line-clamp-1">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{project.summary}</p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.tech.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.tech.length - 4}
              </Badge>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs capitalize">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Learn More Button */}
          <div className="pt-2">
            <Button variant="ghost" asChild className="group/btn w-full justify-between p-0 h-auto">
              <Link href={`/projects/${project.slug}`} className="flex items-center justify-between w-full py-2">
                <span className="font-medium">Learn more</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
