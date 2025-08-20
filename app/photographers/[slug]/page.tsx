"use client"

import { useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Waves, MapPin, Calendar, User, Share2, Instagram, Facebook } from "lucide-react"

// Available surf images
const surfImages = [
  "jeremy-bishop-_CFv3bntQlQ-unsplash.jpg",
  "jeremy-bishop-pikyGuAmwpM-unsplash.jpg",
  "jeremy-bishop-zam3m6W2npM-unsplash.jpg",
  "tim-marshall-vn59e-3J2oo-unsplash.jpg",
  "thomas-ashlock-7G5dkthFyxA-unsplash.jpg",
  "linus-nylund-SfdwxMA5VIM-unsplash.jpg",
  "joseph-greve-TII6axq3eo4-unsplash.jpg",
  "tim-marshall-hIHh4E4_OGA-unsplash.jpg",
  "sincerely-media-oC32cy4x-ZA-unsplash.jpg",
  "jeremy-bishop-b_wcdJKZw0A-unsplash.jpg",
  "jeremy-bishop-cmt3JdS5MC4-unsplash.jpg",
  "delfi-de-la-rua-Sj5efgWguDs-unsplash.jpg",
  "vladimir-kudinov-RKiMg1bwsMY-unsplash.jpg"
]

// Mock data for albums (same structure as gallery)
const generateMockAlbums = (count: number) => {
  const locations = [
    "Malibu Beach",
    "Bondi Beach",
    "Pipeline",
    "Mavericks",
    "Gold Coast",
    "Jeffreys Bay",
    "Ericeira",
    "Nazaré",
  ]
  const photographers = [
    "John Doe",
    "Sarah Smith",
    "Mike Johnson",
    "Lisa Brown",
    "Tom Wilson",
    "Emma Davis",
    "Chris Taylor",
    "Amy White",
  ]
  const beaches = [
    "Sunset Beach",
    "Surfrider Beach",
    "Manhattan Beach",
    "Venice Beach",
    "Huntington Beach",
    "Laguna Beach",
    "Capitola Beach",
    "Santa Cruz",
  ]

  const deterministicRandom = (seed: number, max: number) => {
    return ((seed * 9301 + 49297) % 233280) % max
  }

  return Array.from({ length: count }, (_, i) => {
    const monthSeed = deterministicRandom(i * 3, 12)
    const daySeed = deterministicRandom(i * 5, 28) + 1
    const hourStart = deterministicRandom(i * 7, 12) + 1
    const minuteStart = deterministicRandom(i * 11, 60)
    const hourEnd = deterministicRandom(i * 13, 12) + 1
    const minuteEnd = deterministicRandom(i * 17, 60)

    return {
      id: i + 1,
      title: beaches[i % beaches.length],
      location: locations[i % locations.length],
      photographer: photographers[i % photographers.length],
      date: new Date(2025, monthSeed, daySeed),
      time: `${String(hourStart).padStart(2, "0")}:${String(minuteStart).padStart(2, "0")} - ${String(hourEnd).padStart(2, "0")}:${String(minuteEnd).padStart(2, "0")}`,
      photoCount: deterministicRandom(i * 19, 50) + 5,
      image: `/images/surf/${surfImages[i % surfImages.length]}`,
    }
  })
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function PhotographerPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const allAlbums = useMemo(() => generateMockAlbums(120), [])
  // Try to infer the photographer name from slug
  const photographers = Array.from(
    new Set(allAlbums.map((a) => a.photographer))
  )
  const photographerName =
    photographers.find((name) => slugify(name) === slug) ?? "Photographer"

  const photographerAlbums = allAlbums.filter(
    (a) => slugify(a.photographer) === slug
  )

  return (
    <div className="pt-20 pb-20">
      <div className="w-full px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="inline-block rounded-full border-2 border-[#EEEEEE] p-0.5 bg-white">
              <img
                src="/images/surf/jeremy-bishop-cmt3JdS5MC4-unsplash.jpg"
                alt={`${photographerName} avatar`}
                className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover"
              />
            </span>
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-[#163F69] font-neulis">
                {photographerName}
              </h1>
              <p className="text-sm text-gray-500">Nickname</p>
              <div className="flex items-center gap-1 text-[#163F69] py-1">
                <MapPin className="w-5 h-5" />
                <span>Location</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-xl border-2 border-[#EEEEEE]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-[#163F69]" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-xl border-2 border-[#EEEEEE]"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-[#163F69]" />
                </Button>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="h-10 w-10 p-0 rounded-xl border-2 border-[#EEEEEE]"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(window.location.href)
              } catch {
                // ignore
              }
            }}
            aria-label="Share profile"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-bold text-[#163F69] font-neulis mb-6">
          {photographerName.split(" ")[0]}'s albums
        </h2>

        {/* Albums Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {photographerAlbums.map((album) => (
            <div
              key={album.id}
              className="bg-white p-3.5 rounded-3xl border-2 border-[#EEEEEE] hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => router.push(`/gallery/${album.id}`)}
            >
              <div className="h-52 p-2.5 rounded-xl mb-3 relative overflow-hidden">
                <img
                  src={album.image}
                  alt={`${album.title} surf session`}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="relative z-0 inline-flex items-center gap-3 px-1.5 py-0.5 bg-[#FAF9F6]/40 rounded-lg border-2 border-gray-300/60 backdrop-blur-sm">
                  <span className="text-[#163F69] font-semibold">{album.photoCount}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Waves className="w-5 h-5 text-[#163F69] flex-shrink-0" />
                  <span className="text-xl font-bold text-[#163F69]">{album.title}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5 text-[#163F69] flex-shrink-0" />
                  <span className="text-sm text-[#163F69]">{album.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-5 h-5 text-[#163F69] flex-shrink-0" />
                  <span className="text-sm text-[#163F69]">{formatDate(album.date)} | {album.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-5 h-5 text-[#163F69] flex-shrink-0" />
                  <span className="text-sm text-[#163F69]">{album.photographer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


