"use client"
import { Search, X } from "lucide-react"

type Props = { searchQuery: string; onSearchChange: (value: string) => void; selectedTags: string[]; onTagToggle: (tag: string) => void; availableTags: string[]; onClearFilters: () => void }
export function ProjectFilters({ searchQuery, onSearchChange, selectedTags, onTagToggle, availableTags, onClearFilters }: Props) {
  const active = searchQuery || selectedTags.length > 0
  return <div className="project-filters"><div className="project-search"><Search size={18} /><input aria-label="Search projects" value={searchQuery} onChange={event => onSearchChange(event.target.value)} placeholder="Search by project, technology, or idea…" />{searchQuery && <button aria-label="Clear search" onClick={() => onSearchChange("")}><X size={16} /></button>}</div>
    <div className="filter-tags" aria-label="Filter by category">{availableTags.map(tag => <button key={tag} type="button" aria-pressed={selectedTags.includes(tag)} onClick={() => onTagToggle(tag)}>{tag}</button>)}{active && <button className="clear-filters" onClick={onClearFilters}>Clear all</button>}</div>
  </div>
}
