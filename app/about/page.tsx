"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { PageLayout } from "@/components/page-layout"
import { SectionHeader } from "@/components/section-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, GraduationCap, Award, Users, Code, Brain, Rocket, Heart, Sparkles } from "lucide-react"
import { profile, skills, awards, education } from "@/data/portfolio"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
}

const cardHoverVariants = {
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
}

const floatingVariants = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 2, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
    },
  },
}

export default function AboutPage() {
  const featuredSkills = skills.slice(0, 3).flatMap(category => category.items.slice(0, 4))
  
  // Extract coursework from education data
  const courseworkText = education[0]?.details || ""
  const courseworkMatch = courseworkText.match(/Relevant Coursework: ([^•]+)/)
  const courseworkList = courseworkMatch 
    ? courseworkMatch[1].split(',').map(s => s.trim())
    : ["AI", "Machine Learning", "Operating Systems", "Cloud Computing", "Data Structures & Algorithms"]
  
  // Extract activities from education data
  const activitiesMatch = courseworkText.match(/Activities: ([^•]+)/)
  const activitiesList = activitiesMatch 
    ? activitiesMatch[1].split(',').map(s => s.trim())
    : ["Facility Manager at Rec Center", "Volleyball Club", "VP at International Club"]
  
  // Map activities to structured format
  const activities = [
    { title: "Facility Manager", org: "Rec Center, Kettering University", icon: "🏢" },
    { title: "Volleyball Club", org: "Member, Kettering University", icon: "🏐" },
    { title: "VP, International Club", org: "Kettering University", icon: "🌍" }
  ]
  
  // Extract honors from education data
  const honorsMatch = courseworkText.match(/Honors: ([^$]+)/)
  const honorsList = honorsMatch
    ? honorsMatch[1].split(',').map(s => s.trim())
    : awards.map(a => a.title)

  return (
    <PageLayout>
      <div className="relative py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,119,198,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(120,119,198,0.06),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_90%,rgba(120,119,198,0.04),transparent_50%)]" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }, (_, i) => {
            // Use deterministic values based on index to avoid hydration mismatch
            const seed = i * 137.508; // Use prime number for better distribution
            const x = Math.round((Math.sin(seed) * 0.5 + 0.5) * 1200 * 100) / 100; // Deterministic x position, rounded
            const y = Math.round((Math.cos(seed) * 0.5 + 0.5) * 800 * 100) / 100;  // Deterministic y position, rounded
            const duration = 15 + (i % 5) * 5; // Deterministic duration
            const delay = (i % 3) * 3; // Deterministic delay

            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                initial={{ x, y }}
                animate={{
                  y: [y, y - 200, y],
                  x: [x, x + 50, x],
                  opacity: [0.3, 0.8, 0.3],
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
            title="About Me"
            description="Get to know the person behind the code - my journey, passions, and what drives me to create innovative solutions"
            icon={User}
            className="mb-16 text-center"
          />

          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-20"
          >
            {/* Hero Introduction */}
            <motion.div variants={itemVariants} className="text-center space-y-6">
              <div className="relative inline-block">
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/20 overflow-hidden"
                >
                  <Image
                    src={profile.avatarUrl}
                    alt={profile.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 text-primary" />
                </motion.div>
              </div>

              <div className="prose prose-lg max-w-4xl mx-auto text-center">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {profile.aboutLong}
                </p>
              </div>
            </motion.div>

            {/* Story Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={itemVariants}>
                <Card className="h-full bg-background/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      My Journey
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      My journey in tech has been driven by a passion for solving complex problems through
                      intelligent systems. From optimizing LLMs for real-time drowsiness detection to developing
                      ML-powered in-cabin entertainment systems, I love creating technology that makes a
                      tangible impact on people's lives.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full bg-background/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      Current Focus
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      I'm proficient in a wide range of technologies including Python, C/C++, Java, React,
                      and various AI/ML frameworks. My experience spans from developing Web3 platforms to
                      creating computer vision applications for automotive systems.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Education Section */}
            <motion.div variants={itemVariants}>
              <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <GraduationCap className="h-4 w-4 text-primary" />
                    </div>
                    Education
                  </CardTitle>
                  <CardDescription>
                    Building a strong foundation in Computer Science with a focus on AI and Mathematics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{education[0]?.degree || "B.S. Computer Science"}</h3>
                      <p className="text-sm text-muted-foreground">{education[0]?.school || "Kettering University"}</p>
                    </div>
                    <Badge variant="secondary" className="w-fit mt-2 sm:mt-0">
                      {education[0]?.period || "Oct 2021 - Sep 2025"}
                    </Badge>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Relevant Coursework</h4>
                    <div className="flex flex-wrap gap-2">
                      {courseworkList.map((course) => (
                        <Badge key={course} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements Section */}
            <motion.div variants={itemVariants}>
              <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    Key Achievements
                  </CardTitle>
                  <CardDescription>
                    Recognition and accomplishments that highlight my dedication and skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {awards.map((a, index) => (
                      <motion.div
                        key={a.title + index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.06 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 mt-1">
                          <Award className="h-3 w-3 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{a.title}</span>
                          {(a.issuer || a.date) && (
                            <span className="text-xs text-muted-foreground mt-0.5">{[a.issuer, a.date].filter(Boolean).join(' • ')}</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Activities & Leadership */}
            <motion.div variants={itemVariants}>
              <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    Activities & Leadership
                  </CardTitle>
                  <CardDescription>
                    Beyond academics, contributing to campus life and community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                      { title: "Facility Manager", org: "Rec Center, Kettering University", icon: "🏢" },
                      { title: "Volleyball Club", org: "Member, Kettering University", icon: "🏐" },
                      { title: "VP, International Club", org: "Kettering University", icon: "🌍" }
                    ].map((activity, index) => (
                      <motion.div
                        key={activity.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 transition-all duration-300"
                      >
                        <div className="text-3xl mb-3">{activity.icon}</div>
                        <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>
                        <p className="text-sm text-muted-foreground">{activity.org}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Closing Statement */}
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                When I'm not coding, you can find me exploring new technologies or working on personal projects that push
                the boundaries of what's possible with AI. I'm always excited to connect with fellow developers and
                collaborate on innovative solutions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}
