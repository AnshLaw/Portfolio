"use client"
import { PageLayout } from "@/components/page-layout"
import { SectionHeader } from "@/components/section-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { profile, socials } from "@/data/portfolio"
import { motion } from "framer-motion"
import { Calendar, Github, Linkedin, Mail, MapPin, MessageSquare, Sparkles, Twitter } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
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

export default function ContactPage() {
  // Contact form removed; mailto CTA provided below.

  // Get contact info from portfolio.ts
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "Send Email",
      href: `mailto:${profile.email}`,
      color: "text-blue-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: null,
      color: "text-green-500",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "View Profile",
      href: socials.find(s => s.name === "GitHub")?.url || "https://github.com/AnshLaw",
      color: "text-purple-500",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect with me",
      href: socials.find(s => s.name === "LinkedIn")?.url || "https://linkedin.com/in/anshsuryavanshi",
      color: "text-blue-600",
    },
    {
      icon: Twitter,
      label: "Twitter",
      value: "Follow me",
      href: socials.find(s => s.name === "Twitter")?.url || "https://twitter.com/ansh_law",
      color: "text-sky-500",
    },
  ]

  return (
    <PageLayout>
      <div className="relative py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.05),transparent_50%)]" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => {
            // Use deterministic values based on index to avoid hydration mismatch
            const seed = i * 137.508; // Use prime number for better distribution
            const x = Math.round((Math.sin(seed) * 0.5 + 0.5) * 1200 * 100) / 100; // Deterministic x position, rounded
            const y = Math.round((Math.cos(seed) * 0.5 + 0.5) * 800 * 100) / 100;  // Deterministic y position, rounded
            const duration = 15 + (i % 3) * 7; // Deterministic duration
            const delay = (i % 2) * 5; // Deterministic delay

            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full"
                initial={{ x, y }}
                animate={{
                  y: [y, y - 100, y],
                  x: [x, x + 50, x],
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

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Let's Connect"
            description="Ready to collaborate on something amazing? I'd love to hear from you and discuss how we can work together to bring your ideas to life."
            icon={MessageSquare}
            className="mb-16 text-center"
          />

          {/* Availability Status */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="flex items-center justify-center gap-3 p-6 bg-green-500/10 border border-green-500/20 rounded-xl mb-12"
          >
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <div className="text-center">
              <p className="font-medium text-green-700 dark:text-green-400">Available for new opportunities</p>
              <p className="text-sm text-muted-foreground">Open to collaborations and exciting projects</p>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Introduction */}
            <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3">
                <Sparkles className="h-8 w-8 text-primary" />
                Get In Touch
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                I'm always excited to connect with fellow developers, potential collaborators, and companies
                interested in innovative AI and web development solutions. Whether you have a project in mind,
                want to discuss emerging technologies, or just want to chat about computer science, I'd love to hear from you!
              </p>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full min-h-[120px]">
                      <CardContent className="p-6 flex items-center">
                        <div className="flex items-center gap-4 w-full">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0`}>
                            <info.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground">{info.label}</h3>
                            {info.href ? (
                              <a
                                href={info.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline transition-colors break-all"
                              >
                                {info.value}
                              </a>
                            ) : (
                              <p className="text-muted-foreground">{info.value}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Collaboration Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Areas of Interest</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                I'm passionate about pushing the boundaries of AI/ML and creating impactful software solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "AI & Machine Learning",
                  description: "LLM applications, computer vision, and intelligent systems development",
                  icon: Sparkles,
                },
                {
                  title: "Full-Stack Development",
                  description: "Modern web applications with scalable architectures and clean code",
                  icon: MessageSquare,
                },
                {
                  title: "Open Source & Research",
                  description: "Contributing to the community and exploring cutting-edge technologies",
                  icon: Github,
                },
              ].map((interest, index) => (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-8 text-center">
                      <div className="flex justify-center mb-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                          <interest.icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-semibold mb-3 text-lg">{interest.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{interest.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}
