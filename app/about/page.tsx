import Image from "next/image"
import { PageLayout } from "@/components/page-layout"
import { profile, skills, awards, education } from "@/data/portfolio"

function Education() {
  const school = education[0]
  const coursework = school.details.split("Relevant Coursework: ")[1]?.split("•")[0] || ""
  return <section className="about-panel"><p className="section-kicker">Education</p><h2>{school.school}</h2><p>{school.degree}</p><div className="education-meta"><span>{school.period}</span><strong>GPA {school.gpa} / 4.00</strong></div><h3>Coursework</h3><p>{coursework}</p><h3>Beyond the classroom</h3><p>Facility Manager at the Recreation Center, Volleyball Club member, and Vice President of the International Club.</p></section>
}

function Skills() {
  return <section className="skills-section"><div className="section-heading"><h2>What I work with.</h2></div><div className="skills-grid">{skills.map(category => <div key={category.category}><h3>{category.category}</h3><div className="project-tech">{category.items.map(skill => <span key={skill}>{skill}</span>)}</div></div>)}</div></section>
}

function Achievements() {
  return <section className="awards-section"><div className="section-heading"><h2>Awards and honors.</h2></div><div className="awards-list">{awards.map(award => <div key={award.title}><span>{award.date}</span><div><h3>{award.link ? <a href={award.link} target="_blank" rel="noopener noreferrer">{award.title}</a> : award.title}</h3><p>{award.issuer}</p></div></div>)}</div></section>
}

export default function AboutPage() {
  return <PageLayout><div className="page-container about-page">
    <section className="about-intro"><div><p className="section-kicker">About</p><h1>Hi, I’m Ansh.</h1><p>{profile.aboutLong}</p><p>My work spans factory-floor computer vision, local language models, Web3, and social products. I’m drawn to the point where a technical idea becomes something people can actually use.</p><a className="secondary-link" href={profile.resumeUrl} download>Download my resume</a></div><div className="portrait-frame"><Image src={profile.avatarUrl} alt={profile.name} width={600} height={720} priority /><span>{profile.name}<small>{profile.location}</small></span></div></section>
    <Education /><Skills /><Achievements />
  </div></PageLayout>
}
