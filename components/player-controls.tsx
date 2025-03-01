"use client"

import type React from "react"
import Image from "next/image"

import { usePlayer } from "@/lib/player-context"
import { useCart } from "@/lib/cart-context"
import { Play, Pause, SkipBack, SkipForward, Volume2, List, Share2, Repeat, Repeat1, RefreshCw } from "lucide-react"

export default function PlayerControls() {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    nextTrack,
    prevTrack,
    progress,
    duration,
    seekTo,
    volume,
    setVolume,
    repeatMode,
    toggleRepeatMode,
    queue,
  } = usePlayer()

  const { addToCart, isInCart } = useCart()

  if (!currentTrack) return null

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seekTo(Number.parseFloat(e.target.value))
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number.parseFloat(e.target.value))
  }

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case "one":
        return <Repeat1 className="w-5 h-5" />
      case "all":
        return <RefreshCw className="w-5 h-5" />
      default:
        return <Repeat className="w-5 h-5" />
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-40">
      {/* Progress Bar */}
      <div className="px-4 pt-2">
        <div className="flex items-center w-full space-x-2">
          <span className="text-xs text-gray-400 min-w-[40px] text-right">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={progress}
            onChange={handleSeek}
            className="flex-1 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-400 min-w-[40px] text-left">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3">
        {/* Desktop Track Info */}
        <div className="hidden sm:flex items-center w-1/4">
          <div className="flex items-center">
            <Image
              src={currentTrack.image || "/placeholder.svg"}
              alt={currentTrack.title}
              width={48}
              height={48}
              className="w-12 h-12 rounded"
            />
            <div className="ml-3 mr-3">
              <div className="flex items-center">
                <span className="text-primary mr-1">$</span>
                <span className="font-medium text-white truncate max-w-[150px]">{currentTrack.title}</span>
              </div>
              {currentTrack.artist && (
                <div className="text-sm text-gray-400 truncate max-w-[150px]">{currentTrack.artist}</div>
              )}
            </div>
            <button className="text-gray-400 hover:text-white">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex sm:hidden items-center justify-between w-full">
          {/* Left Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleRepeatMode}
              className={`text-gray-400 hover:text-white ${repeatMode !== "none" ? "text-primary" : ""}`}
            >
              {getRepeatIcon()}
            </button>

            <button onClick={prevTrack} className="text-gray-400 hover:text-white">
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlayPause}
              className="flex items-center justify-center w-10 h-10 text-white bg-primary rounded-full hover:bg-red-700"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
            </button>

            <button onClick={nextTrack} className="text-gray-400 hover:text-white">
              <SkipForward className="w-5 h-5" />
            </button>

            <button className={`text-gray-400 hover:text-white ${queue.length > 0 ? "text-primary" : ""}`}>
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Center - Track Info */}
          <div className="flex-1 px-4 text-center">
            <div className="flex items-center justify-center">
              <span className="text-primary mr-1">$</span>
              <span className="font-medium text-white truncate">{currentTrack.title}</span>
            </div>
            {currentTrack.artist && <div className="text-sm text-gray-400 truncate">{currentTrack.artist}</div>}
          </div>

          {/* Right - Buy Button */}
          <button
            className={`px-3 py-1 text-white text-sm rounded ${
              isInCart(currentTrack.id) ? "bg-gray-700" : "bg-primary hover:bg-red-700"
            }`}
            onClick={() => addToCart(currentTrack)}
            disabled={isInCart(currentTrack.id)}
          >
            ${currentTrack.price.toFixed(2)}+
          </button>
        </div>

        {/* Desktop Playback Controls */}
        <div className="hidden sm:flex items-center justify-center space-x-4">
          <button
            onClick={toggleRepeatMode}
            className={`text-gray-400 hover:text-white ${repeatMode !== "none" ? "text-primary" : ""}`}
          >
            {getRepeatIcon()}
          </button>

          <button onClick={prevTrack} className="text-gray-400 hover:text-white">
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlayPause}
            className="flex items-center justify-center w-10 h-10 text-white bg-primary rounded-full hover:bg-red-700"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
          </button>

          <button onClick={nextTrack} className="text-gray-400 hover:text-white">
            <SkipForward className="w-5 h-5" />
          </button>

          <button className={`text-gray-400 hover:text-white ${queue.length > 0 ? "text-primary" : ""}`}>
            <List className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Volume and Cart */}
        <div className="hidden sm:flex items-center justify-end w-1/4 space-x-4">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer volume-slider"
            />
          </div>

          <button
            className={`px-3 py-1 text-white text-sm rounded ${
              isInCart(currentTrack.id) ? "bg-gray-700" : "bg-primary hover:bg-red-700"
            }`}
            onClick={() => addToCart(currentTrack)}
            disabled={isInCart(currentTrack.id)}
          >
            ${currentTrack.price.toFixed(2)}+
          </button>
        </div>
      </div>
    </div>
  )
}

