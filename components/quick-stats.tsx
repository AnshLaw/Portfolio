"use client"

import { motion } from "framer-motion"
import { Code, Users, Award, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    icon: Code,
    value: "25+",
    label: "Projects Built",
    description: "Full-stack applications and machine learning models",
  },
  {
    icon: Users,
    value: "1000+",
    label: "Users Impacted",
    description: "Through applications and tools I've developed",
  },
  {
    icon: Award,
    value: "1",
    label: "Hackathon Wins",
    description: "Including Automotive Track Winner at Hack Dearborn",
  },
  {
    icon: Zap,
    value: "∞",
    label: "Energy Drinks",
    description: "Powering through all-nighters and intense coding sessions",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
}

export function QuickStats() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group h-full border-0 bg-gradient-to-br from-background to-muted/20 hover:from-background hover:to-muted/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="font-semibold">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
