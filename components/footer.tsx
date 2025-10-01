"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Mail, Heart } from "lucide-react"
// Import brand icons from simple-icons
import { SiGithub, SiLinkedin, SiX } from "react-icons/si"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { profile, socials } from "@/data/portfolio"
import { copyToClipboard } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
const iconMap = {
  Github: SiGithub,
  Linkedin: SiLinkedin,
  Twitter: SiX,
  Mail,
}

export function Footer() {
  const { toast } = useToast()
  const currentYear = new Date().getFullYear()

  const handleEmailCopy = async () => {
    try {
      await copyToClipboard(profile.email)
      toast({
        title: "Email copied!",
        description: "Email address copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/20">
                <Image
                  src={profile.avatarUrl}
                  alt={profile.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-lg">{profile.name}</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">{profile.aboutShort}</p>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Projects
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/experience" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Experience
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="grid grid-cols-2 gap-x-0 gap-y-2 min-w-0">
              {socials.map((social) => {
                const Icon = iconMap[social.icon as keyof typeof iconMap]
                const isEmail = social.name === "Email"

                return (
                  <motion.div key={social.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    {isEmail ? (
                      <Button variant="outline" size="sm" onClick={handleEmailCopy} className="h-9 w-auto bg-transparent justify-start px-3">
                        <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{social.name}</span>
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" asChild className="h-9 w-auto bg-transparent justify-start px-3">
                        <Link href={social.url} target="_blank" rel="noopener noreferrer">
                          <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{social.name}</span>
                        </Link>
                      </Button>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>
              © {currentYear} {profile.name}. All rights reserved.
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs text-muted-foreground">Theme:</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
