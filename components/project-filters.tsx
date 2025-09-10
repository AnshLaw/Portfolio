"use client"

import { motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  availableTags: string[]
  onClearFilters: () => void
}

export function ProjectFilters({
  searchQuery,
  onSearchChange,
  selectedTags,
  onTagToggle,
  availableTags,
  onClearFilters,
}: ProjectFiltersProps) {
  const hasActiveFilters = searchQuery || selectedTags.length > 0

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSearchChange("")}
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Filter Tags */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Filter by category</h3>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-auto p-0 text-xs">
              Clear all
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => {
            const isSelected = selectedTags.includes(tag)
            return (
              <motion.div key={tag} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Badge
                  variant={isSelected ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-sm",
                    isSelected && "bg-primary text-primary-foreground",
                  )}
                  onClick={() => onTagToggle(tag)}
                >
                  {tag}
                </Badge>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="rounded-lg border border-border/50 bg-muted/20 p-3"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {searchQuery && `Search: "${searchQuery}"`}
              {searchQuery && selectedTags.length > 0 && " • "}
              {selectedTags.length > 0 && `${selectedTags.length} tag${selectedTags.length > 1 ? "s" : ""} selected`}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
