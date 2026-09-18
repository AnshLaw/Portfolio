import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { activities } from "@/data/portfolio"

const recentActivities = [...activities].sort((first, second) => Date.parse(second.date) - Date.parse(first.date))

export function LatestActivity() {
  return <section className="activity-section page-container"><div className="section-heading"><div><p className="section-kicker">Along the way</p><h2>Always building.</h2></div><Link href="/experience">The full story<ArrowUpRight size={18} /></Link></div>
    <div className="activity-list">{recentActivities.map(activity => <article key={activity.title}><time>{activity.date}</time><div><h3>{activity.title}</h3><p>{activity.description}</p></div><span className="activity-type">{activity.type}</span></article>)}</div>
  </section>
}
