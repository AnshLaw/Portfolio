const technologies = ["Python", "TypeScript", "React", "Next.js", "PyTorch", "LangChain", "OpenCV", "Socket.IO"]
export function TechMarquee() {
  return <section className="technology-strip" aria-label="Selected technologies"><div className="page-container"><p>The tools behind the work</p><div>{technologies.map(tech => <span key={tech}>{tech}</span>)}</div></div></section>
}
