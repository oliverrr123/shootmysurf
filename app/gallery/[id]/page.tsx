"use client"

import { useState, useMemo, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { MapPin, Calendar, User, Waves, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

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

// Mock data generator - same as in gallery page
const generateMockAlbums = (count: number) => {
  const locations = ["Malibu Beach", "Bondi Beach", "Pipeline", "Mavericks", "Gold Coast", "Jeffreys Bay", "Ericeira", "Nazaré"]
  const photographers = ["John Doe", "Sarah Smith", "Mike Johnson", "Lisa Brown", "Tom Wilson", "Emma Davis", "Chris Taylor", "Amy White"]
  const beaches = ["Sunset Beach", "Surfrider Beach", "Manhattan Beach", "Venice Beach", "Huntington Beach", "Laguna Beach", "Capitola Beach", "Santa Cruz"]
  
  // Simple deterministic "random" function based on index
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
      time: `${String(hourStart).padStart(2, '0')}:${String(minuteStart).padStart(2, '0')} - ${String(hourEnd).padStart(2, '0')}:${String(minuteEnd).padStart(2, '0')}`,
      photoCount: deterministicRandom(i * 19, 50) + 5,
      image: `/images/surf/${surfImages[i % surfImages.length]}`
    }
  })
}

// Generate mock photos for an album
const generateMockPhotos = (albumId: number, photoCount: number) => {
  const deterministicRandom = (seed: number, max: number) => {
    return ((seed * 9301 + 49297) % 233280) % max
  }
  
  return Array.from({ length: photoCount }, (_, i) => {
    const photoSeed = albumId * 1000 + i
    const likesCount = deterministicRandom(photoSeed * 2, 500) + 10
    const viewsCount = deterministicRandom(photoSeed * 3, 2000) + 100
    
    return {
      id: photoSeed,
      url: `/images/surf/${surfImages[photoSeed % surfImages.length]}`,
      alt: `Surf photo ${i + 1} from album ${albumId}`,
      likes: likesCount,
      views: viewsCount,
      caption: `Epic wave action captured at the perfect moment #${i + 1}`
    }
  })
}

export default function CollectionPage() {
  const params = useParams()
  const router = useRouter()
  const albumId = parseInt(params.id as string)
  const photosSectionRef = useRef<HTMLDivElement>(null)
  
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  
  // Get all albums to find the current one
  const allAlbums = generateMockAlbums(120)
  const currentAlbum = allAlbums.find(album => album.id === albumId)
  
  // Generate photos for this album
  const photos = useMemo(() => {
    if (!currentAlbum) return []
    return generateMockPhotos(albumId, currentAlbum.photoCount)
  }, [albumId, currentAlbum])
  
  const heroImageUrl = useMemo(() => {
    if (photos.length > 0) return photos[0].url
    return currentAlbum?.image ?? "/images/surf/jeremy-bishop-cmt3JdS5MC4-unsplash.jpg"
  }, [photos, currentAlbum])
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    })
  }
  
  // If album not found, show error
  if (!currentAlbum) {
    return (
      <div className="pt-20 pb-20">
        <div className="w-full px-4 md:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#163F69] mb-4">Album Not Found</h1>
            <p className="text-gray-600 mb-6">The album you're looking for doesn't exist.</p>
            <Button onClick={() => router.push('/gallery')} className="bg-[#163F69] hover:bg-[#163F69]/90">
              Back to Gallery
            </Button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <>
      {/* Main Content */}
      <div className="pt-20 pb-20">
        {/* Page Header */}
        <div className="w-full px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Hero image */}
            <div className="w-full">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#EEEEEE]">
                <div className="aspect-video">
                  <img
                    src={heroImageUrl}
                    alt={`${currentAlbum.title} cover image`}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            {/* Album details */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Waves className="w-6 h-6 text-[#163F69]" />
                  <h1 className="text-3xl md:text-4xl font-bold text-[#163F69] leading-7 font-neulis">
                    {currentAlbum.title}
                  </h1>
                </div>
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0 rounded-xl border-2 border-[#EEEEEE]"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(window.location.href)
                    } catch (e) {
                      // no-op
                    }
                  }}
                  aria-label="Share album"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-col gap-3 text-[#163F69]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span> {currentAlbum.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDate(currentAlbum.date)} <span className="mx-2">|</span> {currentAlbum.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <button
                    className="underline-offset-2 hover:underline"
                    onClick={() => {
                      const slug = currentAlbum.photographer
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '')
                      router.push(`/photographers/${slug}`)
                    }}
                  >
                    {currentAlbum.photographer}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => photosSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#163F69] hover:bg-[#163F69]/90 rounded-full px-5"
                >
                  View all photos
                </Button>
              </div>
            </div>
          </div>

          {/* Photos Section */}
          <div className="w-full mt-6 scroll-mt-28 md:scroll-mt-32" ref={photosSectionRef}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#163F69] font-neulis mb-4">Album photos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
              {photos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-2xl border-2 border-[#EEEEEE] overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-full object-cover cursor-pointer"
                      loading="lazy"
                      onClick={() => setSelectedPhoto(photo.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
          <div className="relative max-w-4xl max-h-full">
            <img
              src={photos.find(p => p.id === selectedPhoto)?.url}
              alt={photos.find(p => p.id === selectedPhoto)?.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
