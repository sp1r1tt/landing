"use client"

import type { Track } from "@/lib/data"
import { useCart } from "@/lib/cart-context"
import { usePlayer } from "@/lib/player-context"
import { Share2, Download } from "lucide-react"
import Image from "next/image"

interface TrackListProps {
  tracks: Track[]
  filteredTags: string[]
  bpmRange: [number, number]
}

export default function TrackList({ tracks, filteredTags, bpmRange }: TrackListProps) {
  const { addToCart, isInCart } = useCart()
  const { playTrack } = usePlayer()

  const filteredTracks = tracks.filter((track) => {
    // Filter by tags
    const matchesTags = filteredTags.length === 0 || track.tags.some((tag) => filteredTags.includes(tag))

    // Filter by BPM range
    const matchesBpm = track.bpm >= bpmRange[0] && track.bpm <= bpmRange[1]

    return matchesTags && matchesBpm
  })

  const handlePlayTrack = (track: Track) => {
    playTrack(track)
  }

  const handleAddToCart = (track: Track) => {
    addToCart(track)
  }

  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="grid items-center grid-cols-[minmax(300px,2fr)_80px_60px_minmax(200px,1fr)_100px_120px] gap-2 px-6 py-3 text-sm text-gray-400 border-b border-gray-800">
        <div className="pl-[60px]">TITLE</div>
        <div className="text-center pr-2">TIME</div>
        <div className="text-center pr-2">BPM</div>
        <div className="pl-2">TAGS</div>
        <div className="text-right pr-2">PRICE</div>
        <div className="text-right">ACTIONS</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-800">
        {filteredTracks.map((track) => (
          <div
            key={track.id}
            className="grid items-center grid-cols-[minmax(300px,2fr)_80px_60px_minmax(200px,1fr)_100px_120px] gap-2 px-6 py-3 hover:bg-secondary"
          >
            {/* Title Column */}
            <div className="flex items-center min-w-0">
              <div
                className="w-12 h-12 flex-shrink-0 mr-3 overflow-hidden rounded cursor-pointer"
                onClick={() => handlePlayTrack(track)}
              >
                <Image
                  src={track.image || "/placeholder.svg"}
                  alt={track.title}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center cursor-pointer truncate" onClick={() => handlePlayTrack(track)}>
                  <span className="text-primary mr-2">$</span>
                  <span className="font-medium text-white truncate">{track.title}</span>
                </div>
                {track.artist && <div className="text-sm text-gray-400 truncate">{track.artist}</div>}
              </div>
            </div>

            {/* Time Column */}
            <div className="text-center text-gray-400 pr-2">{track.duration}</div>

            {/* BPM Column */}
            <div className="text-center text-blue-500 pr-2">{track.bpm}</div>

            {/* Tags Column */}
            <div className="flex items-center flex-wrap gap-1 min-w-0 pl-2">
              {track.tags.map((tag, index) => (
                <span key={index} className="text-sm text-gray-400 truncate">
                  {tag}
                  {index < track.tags.length - 1 ? " " : ""}
                </span>
              ))}
            </div>

            {/* Price Column */}
            <div className="text-right text-gray-200 pr-2">${track.price.toFixed(2)}</div>

            {/* Actions Column */}
            <div className="flex items-center justify-end space-x-2">
              <button className="p-1 text-gray-400 hover:text-white">
                <Share2 className="w-4 h-4" />
              </button>

              <button className="p-1 text-gray-400 hover:text-white">
                <Download className="w-4 h-4" />
              </button>

              <button
                className={`px-3 py-1 text-white text-sm rounded ${
                  isInCart(track.id) ? "bg-gray-700" : "bg-primary hover:bg-red-700"
                }`}
                onClick={() => handleAddToCart(track)}
                disabled={isInCart(track.id)}
              >
                {isInCart(track.id) ? "ADDED" : "ADD"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

