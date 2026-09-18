import { PageLayout } from "@/components/page-layout"
import { ContactForm } from "@/components/contact-form"
import { profile, socials } from "@/data/portfolio"
import { ArrowUpRight, MapPin } from "lucide-react"

export default function ContactPage() {
  return <PageLayout><section className="contact-section page-container">
    <div className="contact-intro"><p className="section-kicker">Start a conversation</p>
      <h1>Good things start<br />with a hello.</h1>
      <p>Engineering opportunities, ambitious ideas, or a conversation about building something useful. My inbox is open.</p>
      <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={20} /></a>
      <p className="flex items-center gap-2"><MapPin size={16} />{profile.location}</p>
      <div className="contact-socials">{socials.filter(s => s.name !== "Email").map(s => <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">{s.name}<ArrowUpRight size={14} /></a>)}</div>
      <div className="contact-interests"><h2>Let’s build around</h2><p>Applied AI · Computer vision · Full-stack products · Open source & research</p></div>
    </div><ContactForm />
  </section></PageLayout>
}
