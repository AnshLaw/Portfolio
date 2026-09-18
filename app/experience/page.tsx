import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { WorkTimeline } from "@/components/work-timeline"

export default function ExperiencePage() {
  return <PageLayout><div className="page-container experience-page">
    <header className="inner-heading"><p className="section-kicker">Experience</p><h1>Five years, in order.</h1><p>Roles, school, side projects, and the wins along the way, from starting at Kettering in 2021 to General Motors today. Scroll to rewind, filter by type, or pick any mark on the ruler.</p></header>
    <WorkTimeline />
    <Link className="secondary-link" href="/projects">Browse every project, including undated ones<ArrowUpRight size={16} /></Link>
  </div></PageLayout>
}
