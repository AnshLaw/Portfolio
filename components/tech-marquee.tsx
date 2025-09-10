"use client"

import { motion } from "framer-motion"
import { skills } from "@/data/portfolio"

const allTechStack = skills.flatMap((category) => category.items)

export function TechMarquee() {
  return (
    <section className="py-12 overflow-hidden border-y border-border/50 bg-muted/20">
      <div className="relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="flex gap-8 whitespace-nowrap"
        >
          {/* First set */}
          {allTechStack.map((tech, index) => (
            <div
              key={`first-${index}`}
              className="flex items-center gap-3 px-4 py-2 bg-background/50 backdrop-blur-sm rounded-full border border-border/50 hover:border-primary/50 transition-colors group"
            >
              <div className="w-2 h-2 bg-primary rounded-full group-hover:animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {tech}
              </span>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {allTechStack.map((tech, index) => (
            <div
              key={`second-${index}`}
              className="flex items-center gap-3 px-4 py-2 bg-background/50 backdrop-blur-sm rounded-full border border-border/50 hover:border-primary/50 transition-colors group"
            >
              <div className="w-2 h-2 bg-primary rounded-full group-hover:animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {tech}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
