"use client"

import { motion } from "framer-motion"
import { PageLayout } from "@/components/page-layout"
import { SectionHeader } from "@/components/section-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Trophy, Code, Zap, Sparkles, TrendingUp } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
}

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
    },
  },
}

export default function ExperiencePage() {
  const experiences = [
    {
      id: "hyundai",
      title: "Hyundai Mobis - AI Engineering Co-op Intern",
      company: "Hyundai Mobis",
      location: "Plymouth, MI",
      period: "October 2022 - June 2025",
      type: "work",
      icon: Briefcase,
      achievements: [
        "Optimized a local LLM with agentic RAG for real-time drowsiness detection warning system, integrated into the Cruden simulator to enable reasoning-based alerts and efficient edge deployment using Agno, LangChain, Ollama, and Hugging Face",
        "Developed an ML-based Hand Gesture Detection Model for Hyundai's in-cabin system that controls fan speed and cabin temperature, showcased at CES 2023 and set for deployment in 5M+ vehicles by 2025",
        "Developed company-wide reusable backend libraries for Math, Vector and Matrix operations, along with OpenCV, OpenGL, and Vulkan-based implementations",
        "Designed CI/CD automation workflow pipeline for streamlining builds and running simulation tests efficiently"
      ]
    },
    {
      id: "thesis",
      title: "Undergraduate Co-op Thesis",
      company: "Kettering University & Hyundai Mobis",
      location: "Flint, MI",
      period: "2023-2024",
      type: "academic",
      icon: GraduationCap,
      achievements: [
        "Designed a scalable local LLM-based reasoning system for real-time in-cabin comfort prediction and entertainment suggestions using multi-modal sensor data",
        "Integrated agentic Retrieval-Augmented Generation (RAG) techniques to enable on-device inference and generate actionable, context-aware recommendations",
        "Deployed on Cruden Simulator using Python and Ollama, integrating context-aware memory and vector databases for scalable backend performance"
      ]
    },
    {
      id: "hackathon",
      title: "Hack Dearborn 2023 Winner",
      company: "Hack Dearborn",
      location: "Dearborn, MI",
      period: "October 2023",
      type: "competition",
      icon: Trophy,
      achievements: [
        "Built an ML-powered in-cabin recommendation system using trip ETA, age detection, and user genres to suggest media with 89% accuracy",
        "Integrated with Google Maps API and hand gesture controls for collaboration tools (whiteboard & online meeting apps) and volume adjustments",
        "Won both Automotive Track and ZF Challenge at Hack Dearborn 2023"
      ]
    },
    {
      id: "rec-it",
      title: "REC-IT Recreation Center App",
      company: "Kettering University",
      location: "Flint, MI",
      period: "2023",
      type: "project",
      icon: Code,
      achievements: [
        "Built REC-IT, a full-stack web app for Kettering University's Rec Center, adding in-app check-in, swipe-card equipment checkouts, and events scheduling",
        "Developed using TypeScript/React + Supabase/Firebase, replacing manual Google Sheets workflows",
        "Streamlined recreation center operations with digital solutions"
      ]
    },
    {
      id: "transcripto",
      title: "Transcripto App",
      company: "Kettering University",
      location: "Flint, MI",
      period: "2023",
      type: "project",
      icon: Code,
      achievements: [
        "Developed Transcripto, a cloud-based React application with Firebase authentication and AWS S3/Amplify integration",
        "Enables users to upload audio/video files, generate AI-powered transcriptions, and automatically create study resources such as summaries, quizzes, and flashcards",
        "Built to help students efficiently transcribe content and generate study materials"
      ]
    },
    {
      id: "gigs-pi",
      title: "Gigs for Pi",
      company: "Web3 Freelancing Platform",
      location: "Remote",
      period: "2023",
      type: "project",
      icon: Zap,
      achievements: [
        "Developed a Web3 freelancing platform using TypeScript and Supabase, powered by Pi cryptocurrency",
        "Enables secure and decentralized transactions where clients post gigs and freelancers submit bids to earn and complete tasks",
        "Achieved 20,000+ likes, 4.78/5 star rating, 37,000+ rating reviews and featured on the official Pi Network GitHub"
      ]
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "work": return "bg-background/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl"
      case "academic": return "bg-background/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl"
      case "competition": return "bg-background/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl"
      case "project": return "bg-background/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl"
      default: return "bg-background/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl"
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "work": return { text: "Work Experience", variant: "default" as const }
      case "academic": return { text: "Academic Project", variant: "secondary" as const }
      case "competition": return { text: "Competition", variant: "outline" as const }
      case "project": return { text: "Personal Project", variant: "outline" as const }
      default: return { text: "Experience", variant: "secondary" as const }
    }
  }

  return (
    <PageLayout>
      <div className="relative py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(120,119,198,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_80%,rgba(120,119,198,0.06),transparent_50%)]" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 10 }, (_, i) => {
            // Use deterministic values based on index to avoid hydration mismatch
            const seed = i * 137.508; // Use prime number for better distribution
            const x = (Math.sin(seed) * 0.5 + 0.5) * 1200; // Deterministic x position
            const y = (Math.cos(seed) * 0.5 + 0.5) * 800;  // Deterministic y position
            const duration = 12 + (i % 4) * 6; // Deterministic duration
            const delay = (i % 4) * 2; // Deterministic delay

            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full"
                initial={{ x, y }}
                animate={{
                  y: [y, y - 150, y],
                  x: [x, x + 80, x],
                  opacity: [0.2, 0.6, 0.2],
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
            title="Experience & Projects"
            description="A timeline of my professional journey, academic achievements, and personal projects that showcase my growth and expertise"
            icon={Briefcase}
            className="mb-16 text-center"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block" />

            <div className="space-y-12">
              {experiences.map((experience, index) => {
                const IconComponent = experience.icon
                const badgeInfo = getTypeBadge(experience.type)

                return (
                  <motion.div
                    key={experience.id}
                    variants={itemVariants}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 top-8 w-4 h-4 bg-primary/20 rounded-full border-2 border-primary hidden md:block" />

                    <Card className={`ml-0 md:ml-20 h-full ${getTypeColor(experience.type)} transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group`}>
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                              className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"
                            >
                              <IconComponent className="h-6 w-6 text-primary" />
                            </motion.div>
                            <div>
                              <CardTitle className="text-xl mb-1">{experience.title}</CardTitle>
                              <CardDescription className="text-base">
                                {experience.company} • {experience.location}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex flex-col items-start sm:items-end gap-2">
                            <Badge variant={badgeInfo.variant} className="w-fit">
                              {badgeInfo.text}
                            </Badge>
                            <span className="text-sm text-muted-foreground font-medium">
                              {experience.period}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {experience.achievements.map((achievement, achievementIndex) => (
                            <motion.li
                              key={achievementIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: achievementIndex * 0.1 }}
                              className="flex items-start gap-3 text-muted-foreground"
                            >
                              <div className="flex h-2 w-2 items-center justify-center rounded-full bg-primary/40 mt-2 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: "2+", label: "Years Experience", icon: "💼", color: "from-blue-500/20 to-blue-600/20" },
              { number: "5+", label: "Major Projects", icon: "🚀", color: "from-purple-500/20 to-purple-600/20" },
              { number: "10+", label: "Technologies", icon: "⚡", color: "from-yellow-500/20 to-yellow-600/20" },
              { number: "1", label: "Hackathon Win", icon: "🏆", color: "from-green-500/20 to-green-600/20" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  className="text-4xl mb-3"
                >
                  {stat.icon}
                </motion.div>
                <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
                <motion.div
                  className="mt-3 h-1 bg-gradient-to-r from-primary/50 to-primary rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Always learning, always growing</span>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My journey is just beginning. I'm excited to take on new challenges and collaborate on innovative projects that push the boundaries of technology.
            </p>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}
