"use client"

import { motion } from "framer-motion"
import { Calendar, Trophy, BookOpen, Briefcase } from "lucide-react"
import { SiGithub} from "react-icons/si"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/section-header"
import { awards, experience, projects } from "@/data/portfolio"

// Generate activities from portfolio.ts data
const activities = [
  {
    icon: Trophy,
    title: awards.find(a => a.title.includes("Hack Dearborn"))?.title || "Won Hack Dearborn 2023",
    description: "Automotive Track Winner + ZF Challenge for developing an ML-powered vehicle entertainment system",
    date: awards.find(a => a.title.includes("Hack Dearborn"))?.date || "Oct 2023",
    type: "achievement",
  },
  {
    icon: SiGithub,
    title: projects.find(p => p.slug === "gigs-for-pi")?.highlights.find(h => h.includes("GitHub")) || "Featured on Pi Network GitHub",
    description: "Gigs for Pi platform achieved 20,000+ likes and featured on official Pi Network GitHub",
    date: awards.find(a => a.title.includes("Gigs for Pi"))?.date || "2024",
    type: "contribution",
  },
  {
    icon: BookOpen,
    title: projects.find(p => p.slug === "llm-reasoning-system")?.title || "Undergraduate Co-op Thesis",
    description: "LLM-based In-Cabin Comfort System in collaboration with Hyundai Mobis and Kettering University",
    date: "2024",
    type: "writing",
  },
  {
    icon: Briefcase,
    title: `Completed AI/ML Engineering Co-op`,
    description: `${experience[0]?.company || "Hyundai Mobis"} - Working on cutting-edge automotive AI systems`,
    date: experience[0]?.end || "Jun 2025",
    type: "experience",
  },
]

const typeColors = {
  achievement: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  contribution: "bg-green-500/10 text-green-600 border-green-500/20",
  writing: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  experience: "bg-purple-500/10 text-purple-600 border-purple-500/20",
}

export function LatestActivity() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Latest Activity"
          description="Recent achievements, contributions, and milestones"
          className="mb-16"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group h-full border-0 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <activity.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{activity.title}</h3>
                        <Badge variant="outline" className={typeColors[activity.type as keyof typeof typeColors]}>
                          {activity.date}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
