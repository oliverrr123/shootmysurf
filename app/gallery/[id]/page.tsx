"use client"

import { useState, useMemo, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { MapPin, Calendar, User, Share2 } from "lucide-react"
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
  
  // Create photo stacks - some photos will be grouped together
  const photos = []
  let currentId = albumId * 1000
  let stackCounter = 0
  
  // Create stacks every 3rd photo for testing
  for (let i = 0; i < photoCount; i++) {
    const photoSeed = currentId + i
    const likesCount = deterministicRandom(photoSeed * 2, 500) + 10
    const viewsCount = deterministicRandom(photoSeed * 3, 2000) + 100
    
    // Create a stack every 3rd photo
    const shouldCreateStack = (i % 3 === 0)
    
    if (shouldCreateStack) {
      // Create a stack - only show 1 photo in grid but store all 3 for carousel
      console.log(`Creating stack ${stackCounter} with 3 photos starting at index ${i}`)
      
      // Only add the first photo to the grid display
      photos.push({
        id: currentId + i,
        url: `/images/surf/${surfImages[photoSeed % surfImages.length]}`,
        alt: `Surf photo ${i + 1} from album ${albumId}`,
        likes: likesCount,
        views: viewsCount,
        caption: `Epic wave action captured at the perfect moment #${i + 1}`,
        stackId: stackCounter,
        stackSize: 3,
        stackIndex: 0,
        // Store the additional stack photos for carousel
        stackPhotos: [
          {
            id: currentId + i,
            url: `/images/surf/${surfImages[photoSeed % surfImages.length]}`,
            alt: `Surf photo ${i + 1} from album ${albumId}`,
            likes: likesCount,
            views: viewsCount,
            caption: `Epic wave action captured at the perfect moment #${i + 1}`,
          },
          {
            id: currentId + i + 1,
            url: `/images/surf/${surfImages[(photoSeed + 1) % surfImages.length]}`,
            alt: `Surf photo ${i + 2} from album ${albumId}`,
            likes: deterministicRandom((photoSeed + 1) * 2, 500) + 10,
            views: deterministicRandom((photoSeed + 1) * 3, 2000) + 100,
            caption: `Epic wave action captured at the perfect moment #${i + 2}`,
          },
          {
            id: currentId + i + 2,
            url: `/images/surf/${surfImages[(photoSeed + 2) % surfImages.length]}`,
            alt: `Surf photo ${i + 3} from album ${albumId}`,
            likes: deterministicRandom((photoSeed + 2) * 2, 500) + 10,
            views: deterministicRandom((photoSeed + 2) * 3, 2000) + 100,
            caption: `Epic wave action captured at the perfect moment #${i + 3}`,
          }
        ]
      })
      stackCounter++
      currentId += 3
    } else {
      // Single photo
      photos.push({
        id: currentId + i,
        url: `/images/surf/${surfImages[photoSeed % surfImages.length]}`,
        alt: `Surf photo ${i + 1} from album ${albumId}`,
        likes: likesCount,
        views: viewsCount,
        caption: `Epic wave action captured at the perfect moment #${i + 1}`,
        stackId: null,
        stackSize: 1,
        stackIndex: 0,
        stackPhotos: null
      })
      currentId += 1
    }
  }
  
  return photos
}

export default function CollectionPage() {
  const params = useParams()
  const router = useRouter()
  const albumId = parseInt(params.id as string)
  const photosSectionRef = useRef<HTMLDivElement>(null)
  
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [currentStackIndex, setCurrentStackIndex] = useState<number>(0)
  
  // Get all albums to find the current one
  const allAlbums = generateMockAlbums(120)
  const currentAlbum = allAlbums.find(album => album.id === albumId)
  
  // Generate photos for this album
  const photos = useMemo(() => {
    if (!currentAlbum) return []
    const generatedPhotos = generateMockPhotos(albumId, currentAlbum.photoCount)
    console.log('Generated photos:', generatedPhotos)
    console.log('Photos with stacks:', generatedPhotos.filter(p => p.stackSize > 1))
    return generatedPhotos
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
              <div className="relative rounded-2xl overflow-hidden">
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
                  <h1 className="text-3xl md:text-4xl font-bold text-[#163F69] leading-7 font-neulis">
                    {currentAlbum.title}
                  </h1>
                </div>
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0 rounded-xl"
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
                    
                    {/* Stack indicator */}
                    {photo.stackSize > 1 && photo.stackIndex === 0 && (
                      <div className="absolute top-2 right-2 bg-[#163F69] text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {photo.stackSize} photos
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Photo Carousel Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col lg:flex-row h-full">
              {/* Left: Photo */}
              <div className="lg:w-2/3 h-64 lg:h-full">
                <div className="relative h-full">
                  <img
                    src={(() => {
                      const currentPhoto = photos.find(p => p.id === selectedPhoto)
                      if (currentPhoto?.stackSize > 1 && currentPhoto.stackPhotos) {
                        return currentPhoto.stackPhotos[currentStackIndex]?.url || currentPhoto.url
                      }
                      return currentPhoto?.url
                    })()}
                    alt={(() => {
                      const currentPhoto = photos.find(p => p.id === selectedPhoto)
                      if (currentPhoto?.stackSize > 1 && currentPhoto.stackPhotos) {
                        return currentPhoto.stackPhotos[currentStackIndex]?.alt || currentPhoto.alt
                      }
                      return currentPhoto?.alt
                    })()}
                    className="w-full h-full object-cover"
                  />
                  {/* Navigation arrows */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      const currentIndex = photos.findIndex(p => p.id === selectedPhoto)
                      const prevIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1
                      setSelectedPhoto(photos[prevIndex].id)
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#163F69] p-2 rounded-full shadow-lg transition-all hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      const currentIndex = photos.findIndex(p => p.id === selectedPhoto)
                      const nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0
                      setSelectedPhoto(photos[nextIndex].id)
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#163F69] p-2 rounded-full shadow-lg transition-all hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Photo stack miniatures */}
                  {(() => {
                    const currentPhoto = photos.find(p => p.id === selectedPhoto)
                    console.log('Current photo in carousel:', currentPhoto)
                    
                    // Only show miniatures if this photo is part of a stack
                    if (currentPhoto && currentPhoto.stackSize > 1 && currentPhoto.stackPhotos) {
                      console.log('Stack photos found:', currentPhoto.stackPhotos)
                      return (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {currentPhoto.stackPhotos.map((stackPhoto, index) => (
                            <div
                              key={stackPhoto.id}
                              className={`w-16 h-12 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                                index === currentPhoto.stackIndex
                                  ? 'border-white shadow-lg scale-110' 
                                  : 'border-white/50 hover:border-white/80'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation()
                                // Update the current stack index to show the clicked miniature
                                setCurrentStackIndex(index)
                              }}
                            >
                              <img
                                src={stackPhoto.url}
                                alt={stackPhoto.alt}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )
                    }
                    console.log('No stack found for current photo')
                    return null
                  })()}
                </div>
              </div>

              {/* Right: Text Details */}
              <div className="lg:w-1/3 p-6 lg:p-8 flex flex-col">
                {/* Close button */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 lg:top-6 lg:right-6 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Photo info */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#163F69] font-neulis mb-2">
                      {currentAlbum.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Photo {photos.findIndex(p => p.id === selectedPhoto) + 1} of {photos.length}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-[#163F69]" />
                      <span className="text-[#163F69]">{currentAlbum.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#163F69]" />
                      <span className="text-[#163F69]">
                        {formatDate(currentAlbum.date)} | {currentAlbum.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-[#163F69]" />
                      <button
                        className="text-[#163F69] underline-offset-2 hover:underline font-semibold"
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

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-sm">{photos.find(p => p.id === selectedPhoto)?.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="text-sm">{photos.find(p => p.id === selectedPhoto)?.views}</span>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[#163F69] font-semibold">Price</span>
                        <span className="text-2xl font-bold text-[#163F69]">5.00 €</span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-4 space-y-3">
                    <Button className="w-full bg-[#163F69] hover:bg-[#163F69]/90 text-white rounded-full">
                      Add to Cart
                    </Button>
                    <Button className="w-full bg-white border-2 border-[#163F69] text-[#163F69] hover:bg-[#163F69]/5 rounded-full">
                      Download Preview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
