export type Track = {
  id: string
  title: string
  artist: string
  duration: string
  bpm: number
  tags: string[]
  price: number
  image: string
  audioUrl: string
}

export const tracks: Track[] = [
  {
    id: "1",
    title: "100+ | BANG",
    artist: "Memphis Phonk",
    duration: "01:49",
    bpm: 140,
    tags: ["free beat", "beat", "type beat"],
    price: 190.0,
    image: "/placeholder.svg?height=60&width=60",
    audioUrl: "/audio/sword.mp3",
  },
  {
    id: "2",
    title: "100+ | Da Ghetto",
    artist: "Detroit x Rio Da Yung Og x Flint",
    duration: "02:09",
    bpm: 100,
    tags: ["free beat", "beat", "type beat"],
    price: 140.0,
    image: "/placeholder.svg?height=60&width=60",
    audioUrl: "/audio/vibes.mp3",
  },
  {
    id: "3",
    title: "100+ | Aura",
    artist: "Gunna x Roddy Ricch",
    duration: "02:20",
    bpm: 124,
    tags: ["Roddy Ricch", "Gunna"],
    price: 150.0,
    image: "/placeholder.svg?height=60&width=60",
    audioUrl: "/placeholder.mp3",
  },
  {
    id: "4",
    title: "100+ | Witch",
    artist: "Trap",
    duration: "03:19",
    bpm: 160,
    tags: ["rap", "hard", "trap"],
    price: 170.0,
    image: "/placeholder.svg?height=60&width=60",
    audioUrl: "/placeholder.mp3",
  },
  {
    id: "5",
    title: "100+ | SPIN",
    artist: "Tana x Lucki x Ambient",
    duration: "02:42",
    bpm: 156,
    tags: ["free beat", "beat", "type beat"],
    price: 140.0,
    image: "/placeholder.svg?height=60&width=60",
    audioUrl: "/placeholder.mp3",
  },
  {
    id: "6",
    title: "100+ | Pure Water",
    artist: "",
    duration: "02:29",
    bpm: 100,
    tags: ["mustard", "offset", "tyga"],
    price: 160.0,
    image: "/placeholder.svg?height=60&width=60",
    audioUrl: "/placeholder.mp3",
  },
  {
    id: "7",
    title: "100+ | SAY MY NAME",
    artist: "Hard Trap Beat",
    duration: "03:17",
    bpm: 148,
    tags: ["rap", "hard", "trap"],
    price: 120.0,
    image: "/placeholder.svg?height=60&width=60",
    audioUrl: "/placeholder.mp3",
  },
  {
    id: "8",
    title: "100+ | Summer Bummer",
    artist: "",
    duration: "03:30",
    bpm: 128,
    tags: ["playboi carti", "type beat"],
    price: 160.0,
    image: "/placeholder.svg?height=60&width=60",
    audioUrl: "/placeholder.mp3",
  },
  {
    id: "9",
    title: "100+ | CHopstix",
    artist: "",
    duration: "03:40",
    bpm: 126,
    tags: ["hard trap", "schoolboy q"],
    price: 160.0,
    image: "/placeholder.svg?height=60&width=60",
    audioUrl: "/placeholder.mp3",
  },
  {
    id: "10",
    title: "100+ | Planes",
    artist: "",
    duration: "04:22",
    bpm: 118,
    tags: ["instrumental", "beat", "beats"],
    price: 190.0,
    image: "/placeholder.svg?height=60&width=60",
    audioUrl: "/placeholder.mp3",
  },
  {
    id: "11",
    title: "100+ | Valet",
    artist: "",
    duration: "02:57",
    bpm: 160,
    tags: ["21 savage", "travis scott"],
    price: 180.0,
    image: "/placeholder.svg?height=60&width=60",
    audioUrl: "/placeholder.mp3",
  },
]

export const allTags = Array.from(new Set(tracks.flatMap((track) => track.tags))).sort()

