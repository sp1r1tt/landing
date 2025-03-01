"use client"

import { useState } from "react"
import { Tag, Sparkles } from "lucide-react"
import TrackList from "./track-list"
import FilterPanel from "./filter-panel"
import PlayerControls from "./player-controls"
import { tracks } from "@/lib/data"

export default function PlayerSection() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [bpmRange, setBpmRange] = useState<[number, number]>([0, 999])
  const [showFilters, setShowFilters] = useState(false)

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  const clearAllTags = () => {
    setSelectedTags([])
    setBpmRange([0, 999])
  }

  const handleBpmChange = (range: [number, number]) => {
    setBpmRange(range)
  }

  return (
    <section className="py-12" id="player">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Browse Our Beats</h2>
          <div className="flex space-x-4">
            <button
              className="flex items-center px-6 py-2.5 text-sm bg-secondary rounded-md hover:bg-secondary/80"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Tag className="w-4 h-4 mr-2" />
              Filters {showFilters ? "↑" : "↓"}
            </button>

            <button className="flex items-center px-6 py-2.5 text-sm bg-secondary rounded-md hover:bg-secondary/80">
              <Sparkles className="w-4 h-4 mr-2" />
              Deals
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-12">
          {showFilters && (
            <div className="lg:col-span-1">
              <FilterPanel
                selectedTags={selectedTags}
                bpmRange={bpmRange}
                onTagSelect={handleTagSelect}
                onTagRemove={handleTagRemove}
                onClearAll={clearAllTags}
                onBpmChange={handleBpmChange}
              />
            </div>
          )}

          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            <TrackList tracks={tracks} filteredTags={selectedTags} bpmRange={bpmRange} />
          </div>
        </div>
      </div>

      <PlayerControls />
    </section>
  )
}

