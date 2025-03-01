"use client"

import type { Track } from "@/lib/data"
import { createContext, useContext, useState, useRef, useEffect, useCallback, type ReactNode } from "react"

type RepeatMode = "none" | "all" | "one"

type PlayerContextType = {
  currentTrack: Track | null
  isPlaying: boolean
  volume: number
  repeatMode: RepeatMode
  playTrack: (track: Track) => void
  togglePlayPause: () => void
  setVolume: (volume: number) => void
  nextTrack: () => void
  prevTrack: () => void
  progress: number
  duration: number
  seekTo: (time: number) => void
  queue: Track[]
  addToQueue: (track: Track) => void
  clearQueue: () => void
  toggleRepeatMode: () => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.7)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [queue, setQueue] = useState<Track[]>([])
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("none")

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playTrack = useCallback((track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }, [])

  const nextTrack = useCallback(() => {
    if (queue.length > 0) {
      const nextTrack = queue[0]
      setQueue((prev) => prev.slice(1))
      setCurrentTrack(nextTrack)
      setIsPlaying(true)
    } else if (repeatMode === "all" && currentTrack) {
      // If repeat all is on and queue is empty, restart from current track
      playTrack(currentTrack)
    } else {
      setIsPlaying(false)
    }
  }, [queue, repeatMode, currentTrack, playTrack])

  useEffect(() => {
    audioRef.current = new Audio()

    const audio = audioRef.current

    const handleTimeUpdate = () => {
      if (audio) {
        setProgress(audio.currentTime)
      }
    }

    const handleLoadedMetadata = () => {
      if (audio) {
        setDuration(audio.duration)
      }
    }

    const handleEnded = () => {
      if (repeatMode === "one") {
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play()
        }
      } else if (repeatMode === "all") {
        if (queue.length > 0) {
          nextTrack()
        } else if (currentTrack) {
          playTrack(currentTrack)
        }
      } else {
        nextTrack()
      }
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
      audio.pause()
    }
  }, [repeatMode, queue.length, currentTrack, nextTrack, playTrack])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    console.log("Current Track:", currentTrack);
    console.log("Is Playing:", isPlaying);
    console.log("Volume:", volume);
    console.log("Queue:", queue);
    console.log("Repeat Mode:", repeatMode);
  }, [currentTrack, isPlaying, volume, queue, repeatMode]);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.audioUrl
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error)
          alert("Failed to play audio. Please check the console for more details.")
        })
      }
    }
  }, [currentTrack, isPlaying])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
  }

  const prevTrack = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      // If current time is more than 3 seconds, restart the current track
      audioRef.current.currentTime = 0
    } else if (queue.length > 0) {
      // Otherwise go to previous track if available
      const prevTrack = queue[queue.length - 1]
      setQueue((prev) => prev.slice(0, -1))
      if (currentTrack) {
        setQueue((prev) => [currentTrack, ...prev])
      }
      setCurrentTrack(prevTrack)
      setIsPlaying(true)
    }
  }

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const addToQueue = (track: Track) => {
    setQueue((prev) => [...prev, track])
  }

  const clearQueue = () => {
    setQueue([])
  }

  const toggleRepeatMode = () => {
    setRepeatMode((current) => {
      switch (current) {
        case "none":
          return "all"
        case "all":
          return "one"
        case "one":
          return "none"
      }
    })
  }

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        repeatMode,
        playTrack,
        togglePlayPause,
        setVolume,
        nextTrack,
        prevTrack,
        progress,
        duration,
        seekTo,
        queue,
        addToQueue,
        clearQueue,
        toggleRepeatMode,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return context
}

