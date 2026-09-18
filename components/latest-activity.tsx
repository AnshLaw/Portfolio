import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { activities } from "@/data/portfolio"

const recentActivities = [...activities].sort((first, second) => Date.parse(second.date) - Date.parse(first.date))

export function LatestActivity() {
  return <section className="activity-section page-container"><div className="section-heading"><div><p className="section-kicker">Recently</p><h2>What I’ve been up to.</h2></div><Link href="/experience">Full experience<ArrowUpRight size={18} /></Link></div>
    <div className="activity-list">{recentActivities.map(activity => <article key={activity.title}><time>{activity.date}</time><div><h3>{activity.title}</h3><p>{activity.description}</p></div><span className="activity-type">{activity.type}</span></article>)}</div>
  </section>
}
