const stats = [
  { value: "72", label: "AI cameras", detail: "Deployment across 38 conveyors at GM" },
  { value: "35%", label: "Lower inference latency", detail: "Agentic RAG for in-vehicle edge AI" },
  { value: "52K+", label: "Taboo Party visits", detail: "800+ registered players" },
  { value: "2", label: "Hackathon wins", detail: "Hack Dearborn, 2023 & 2025" },
]
export function QuickStats() {
  return <section className="impact-section page-container" aria-label="Engineering impact">{stats.map(stat => <div key={stat.label}><strong>{stat.value}</strong><h2>{stat.label}</h2><p>{stat.detail}</p></div>)}</section>
}
