import { PageLayout } from "@/components/page-layout"
import { HeroSection } from "@/components/hero-section"
import { TechMarquee } from "@/components/tech-marquee"
import { FeaturedProjects } from "@/components/featured-projects"
import { QuickStats } from "@/components/quick-stats"
import { LatestActivity } from "@/components/latest-activity"

export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <TechMarquee />
      <FeaturedProjects />
      <QuickStats />
      <LatestActivity />
    </PageLayout>
  )
}
