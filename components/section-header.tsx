"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  description?: string
  icon?: LucideIcon
  className?: string
}

export function SectionHeader({ title, description, icon: Icon, className }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("text-center space-y-4", className)}
    >
      {Icon && (
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      )}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        {description && <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{description}</p>}
      </div>
      <div className="flex justify-center">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>
    </motion.div>
  )
}
