"use client"

import { useState } from "react"
import { allTags } from "@/lib/data"
import { X } from "lucide-react"
import * as Slider from "@radix-ui/react-slider"

interface FilterPanelProps {
  selectedTags: string[]
  bpmRange: [number, number]
  onTagSelect: (tag: string) => void
  onTagRemove: (tag: string) => void
  onClearAll: () => void
  onBpmChange: (range: [number, number]) => void
}

export default function FilterPanel({
  selectedTags,
  bpmRange,
  onTagSelect,
  onTagRemove,
  onClearAll,
  onBpmChange,
}: FilterPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTags = searchQuery
    ? allTags.filter((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    : allTags

  return (
    <div className="p-4 bg-secondary rounded-md">
      {/* Tags Section */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-medium">Tags</h3>
        <input
          type="text"
          placeholder="Search tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 bg-black border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium">Selected Tags</h4>
            <button onClick={onClearAll} className="text-xs text-primary hover:underline">
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <div key={tag} className="flex items-center px-2 py-1 text-xs bg-muted rounded-md">
                {tag}
                <button onClick={() => onTagRemove(tag)} className="ml-1 text-gray-400 hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Tags */}
      <div className="mb-6">
        <h4 className="mb-2 text-sm font-medium">Available Tags</h4>
        <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
          {filteredTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagSelect(tag)}
              disabled={selectedTags.includes(tag)}
              className={`px-2 py-1 text-xs rounded-md ${
                selectedTags.includes(tag)
                  ? "bg-primary text-white cursor-not-allowed"
                  : "bg-muted text-gray-300 hover:bg-muted/80"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* BPM Range Section */}
      <div>
        <h4 className="mb-2 text-sm font-medium">BPM Range</h4>
        <div className="px-2">
          <div className="relative pt-2 pb-6">
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[bpmRange[0], bpmRange[1]]}
              min={0}
              max={999}
              step={1}
              minStepsBetweenThumbs={1}
              onValueChange={(value) => onBpmChange(value as [number, number])}
            >
              <Slider.Track className="bg-gray-700 relative grow rounded-full h-[3px]">
                <Slider.Range className="absolute bg-primary rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary hover:bg-gray-50"
                aria-label="Min BPM"
              />
              <Slider.Thumb
                className="block w-5 h-5 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary hover:bg-gray-50"
                aria-label="Max BPM"
              />
            </Slider.Root>
            <div className="absolute left-0 right-0 -bottom-1 flex justify-between text-xs text-gray-400">
              <span>{bpmRange[0]} BPM</span>
              <span>{bpmRange[1]} BPM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

