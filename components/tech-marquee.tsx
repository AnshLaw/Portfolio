const technologies = ["Python", "TypeScript", "React", "Next.js", "PyTorch", "LangChain", "OpenCV", "Socket.IO", "Vulkan", "Docker"]

export function TechMarquee() {
  return <section className="technology-strip" aria-label="Selected technologies"><div className="page-container"><p>Day-to-day stack</p>
    <div className="marquee"><div className="marquee-track">
      <ul>{technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
      <ul aria-hidden="true">{technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
    </div></div>
  </div></section>
}
