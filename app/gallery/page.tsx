"use client"

import { useState, useMemo } from "react"
import { MapPin, Calendar, User, Waves, ChevronLeft, ChevronRight, X, CalendarDays, Clock, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Slider } from "@/components/ui/slider"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock data for albums - in a real app, this would come from an API
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
      image: "/images/card.jpg"
    }
  })
}

export default function GalleryPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("date-desc")
  const [photographerSearch, setPhotographerSearch] = useState("")
  const [locationSearch, setLocationSearch] = useState("")
  const [selectedPhotographers, setSelectedPhotographers] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [showPhotographerSuggestions, setShowPhotographerSuggestions] = useState(false)
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [timeRange, setTimeRange] = useState<[number, number]>([0, 24])
  const albumsPerPage = 12
  
  // Generate mock albums
  const allAlbums = generateMockAlbums(120)
  
  // Get unique photographers and locations for suggestions
  const allPhotographers = useMemo(() => {
    return Array.from(new Set(allAlbums.map(album => album.photographer))).sort()
  }, [allAlbums])
  
  const allLocations = useMemo(() => {
    return Array.from(new Set(allAlbums.map(album => album.location))).sort()
  }, [allAlbums])
  
  // Filter suggestions based on search input
  const photographerSuggestions = useMemo(() => {
    if (!photographerSearch) return []
    return allPhotographers
      .filter(photographer => 
        photographer.toLowerCase().includes(photographerSearch.toLowerCase()) &&
        !selectedPhotographers.includes(photographer)
      )
      .slice(0, 5)
  }, [photographerSearch, allPhotographers, selectedPhotographers])
  
  const locationSuggestions = useMemo(() => {
    if (!locationSearch) return []
    return allLocations
      .filter(location => 
        location.toLowerCase().includes(locationSearch.toLowerCase()) &&
        !selectedLocations.includes(location)
      )
      .slice(0, 5)
  }, [locationSearch, allLocations, selectedLocations])
  
  // Filter albums based on selected filters
  const filteredAlbums = useMemo(() => {
    return allAlbums.filter(album => {
      const photographerMatch = selectedPhotographers.length === 0 || 
        selectedPhotographers.includes(album.photographer)
      const locationMatch = selectedLocations.length === 0 || 
        selectedLocations.includes(album.location)
      
      // Date filtering
      let dateMatch = true
      if (dateRange?.from || dateRange?.to) {
        const albumDate = album.date
        if (dateRange?.from) {
          if (albumDate < dateRange.from) {
            dateMatch = false
          }
        }
        if (dateRange?.to && dateMatch) {
          const toDate = new Date(dateRange.to)
          // Set to end of day for inclusive comparison
          toDate.setHours(23, 59, 59, 999)
          if (albumDate > toDate) {
            dateMatch = false
          }
        }
      }
      
      // Time filtering (extract time from album.time string)
      let timeMatch = true
      if (timeRange[0] > 0 || timeRange[1] < 24) {
        // Parse the start time from album.time (format: "HH:MM - HH:MM")
        const timeRangeParts = album.time.split(" - ")
        const albumStartTime = timeRangeParts[0]
        const albumStartHour = parseInt(albumStartTime.split(":")[0])
        
        if (albumStartHour < timeRange[0] || albumStartHour > timeRange[1]) {
          timeMatch = false
        }
      }
      
      return photographerMatch && locationMatch && dateMatch && timeMatch
    })
  }, [allAlbums, selectedPhotographers, selectedLocations, dateRange, timeRange])
  
  // Sort albums based on selected option
  const sortedAlbums = [...filteredAlbums].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return b.date.getTime() - a.date.getTime()
      case "date-asc":
        return a.date.getTime() - b.date.getTime()
      case "location":
        return a.location.localeCompare(b.location)
      case "photographer":
        return a.photographer.localeCompare(b.photographer)
      case "photos-desc":
        return b.photoCount - a.photoCount
      case "photos-asc":
        return a.photoCount - b.photoCount
      default:
        return 0
    }
  })
  
  // Calculate pagination
  const totalPages = Math.ceil(sortedAlbums.length / albumsPerPage)
  const startIndex = (currentPage - 1) * albumsPerPage
  const endIndex = startIndex + albumsPerPage
  const currentAlbums = sortedAlbums.slice(startIndex, endIndex)
  
  // Reset to page 1 when filters change
  const resetPagination = () => setCurrentPage(1)
  
  // Handler functions for filters
  const addPhotographer = (photographer: string) => {
    setSelectedPhotographers(prev => [...prev, photographer])
    setPhotographerSearch("")
    setShowPhotographerSuggestions(false)
    resetPagination()
  }
  
  const removePhotographer = (photographer: string) => {
    setSelectedPhotographers(prev => prev.filter(p => p !== photographer))
    resetPagination()
  }
  
  const addLocation = (location: string) => {
    setSelectedLocations(prev => [...prev, location])
    setLocationSearch("")
    setShowLocationSuggestions(false)
    resetPagination()
  }
  
  const removeLocation = (location: string) => {
    setSelectedLocations(prev => prev.filter(l => l !== location))
    resetPagination()
  }
  
  const clearAllFilters = () => {
    setSelectedPhotographers([])
    setSelectedLocations([])
    setPhotographerSearch("")
    setLocationSearch("")
    setDateRange(undefined)
    setTimeRange([0, 24])
    resetPagination()
  }
  
  const clearDateFilters = () => {
    setDateRange(undefined)
    setTimeRange([0, 24])
    resetPagination()
  }
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Header */}
      <header className="w-full py-3 bg-[#FAF9F6]/60 border-b border-[#E5E8EB] backdrop-blur-sm fixed top-0 left-0 right-0 z-50" style={{ 
        WebkitBackdropFilter: 'blur(8px)',
        backdropFilter: 'blur(8px)'
      } as React.CSSProperties}>
        <div className="w-full flex items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <div className="relative">
            <a href="/">
              <img
                src="/images/logo-blue.svg"
                alt="ShootMySurf"
                className="h-10 md:h-12 w-auto"
              />
            </a>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 md:gap-8">
            <nav className="hidden md:flex items-center gap-6 lg:gap-9">
              <a href="/#how-it-works" className="text-[#163F69] font-semibold text-sm hover:opacity-80">
                How it works
              </a>
              <a href="/#contact" className="text-[#163F69] font-semibold text-sm hover:opacity-80">
                Contact us
              </a>
            </nav>

            <div className="flex items-center gap-2">
              <Button className="bg-[#163F69] hover:bg-[#163F69]/90 text-white px-3 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold">
                Create account
              </Button>
              <Button
                variant="secondary"
                className="bg-[#EEEEEE] hover:bg-[#EEEEEE]/90 text-[#163F69] px-3 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-10">
        {/* Page Header */}
        <div className="w-full px-4 md:px-8 py-8">
          <div className="flex flex-col gap-6 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#163F69] leading-7 font-neulis mb-2">
                All Albums
              </h1>
              <p className="text-sm md:text-base text-gray-600">
                Browse through all surf photo albums from our community
              </p>
            </div>

            {/* Filter Section */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between sm:items-start gap-4">
                                 <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                  {/* Photographer Filter */}
                  <div>
                    {/* <label className="block text-sm font-semibold text-[#163F69] mb-2">
                      Filter by Photographer
                    </label> */}
                    <div className="relative">
                      <div className="relative">
                                                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#163F69]" />
                        <Input
                          type="text"
                          placeholder="Search photographers..."
                          value={photographerSearch}
                          onChange={(e) => {
                            setPhotographerSearch(e.target.value)
                            setShowPhotographerSuggestions(true)
                          }}
                          onFocus={() => setShowPhotographerSuggestions(true)}
                          onBlur={() => setTimeout(() => setShowPhotographerSuggestions(false), 200)}
                          className="pl-10 border-2 border-[#EEEEEE] rounded-xl w-full sm:w-64 h-12"
                        />
                      </div>
                      
                      {/* Photographer Suggestions */}
                      {showPhotographerSuggestions && photographerSuggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border-2 border-[#EEEEEE] rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {photographerSuggestions.map((photographer) => (
                            <button
                              key={photographer}
                              onClick={() => addPhotographer(photographer)}
                              className="w-full px-3 py-2 text-left hover:bg-[#FAF9F6] border-b border-[#EEEEEE] last:border-b-0"
                            >
                              {photographer}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div>
                    {/* <label className="block text-sm font-semibold text-[#163F69] mb-2">
                      Filter by Location
                    </label> */}
                    <div className="relative">
                      <div className="relative">
                                                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#163F69]" />
                        <Input
                          type="text"
                          placeholder="Search locations..."
                          value={locationSearch}
                          onChange={(e) => {
                            setLocationSearch(e.target.value)
                            setShowLocationSuggestions(true)
                          }}
                          onFocus={() => setShowLocationSuggestions(true)}
                          onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                          className="pl-10 border-2 border-[#EEEEEE] rounded-xl w-full sm:w-64 h-12"
                        />
                      </div>
                      
                      {/* Location Suggestions */}
                      {showLocationSuggestions && locationSuggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border-2 border-[#EEEEEE] rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {locationSuggestions.map((location) => (
                            <button
                              key={location}
                              onClick={() => addLocation(location)}
                              className="w-full px-3 py-2 text-left hover:bg-[#FAF9F6] border-b border-[#EEEEEE] last:border-b-0"
                            >
                              {location}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Date Range Filter */}
                  <div>
                    {/* <label className="block text-sm font-semibold text-[#163F69] mb-2">
                      Date Range
                    </label> */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full sm:w-64 justify-start text-left font-normal border-2 border-[#EEEEEE] rounded-xl text-sm h-12",
                            !dateRange && "text-muted-foreground"
                          )}
                        >
                                                      <CalendarDays className="mr-2 h-4 w-4 text-[#163F69]" />
                          {dateRange?.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "LLL dd, y")} -{" "}
                                {format(dateRange.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(dateRange.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date range</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          initialFocus
                          mode="range"
                          defaultMonth={dateRange?.from}
                          selected={dateRange}
                          onSelect={(range) => {
                            setDateRange(range)
                            resetPagination()
                          }}
                          numberOfMonths={1}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Range Filter */}
                  <div>
                    {/* <label className="block text-sm font-semibold text-[#163F69] mb-2">
                      Time Range
                    </label> */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full sm:w-64 justify-start text-left font-normal border-2 border-[#EEEEEE] rounded-xl text-sm h-12",
                            (timeRange[0] === 0 && timeRange[1] === 24) && "text-muted-foreground"
                          )}
                        >
                                                      <Clock className="mr-2 h-4 w-4 text-[#163F69]" />
                          {timeRange[0] === 0 && timeRange[1] === 24 ? (
                            <span>Any time</span>
                          ) : (
                            <span>
                              {String(timeRange[0]).padStart(2, '0')}:00 - {String(timeRange[1]).padStart(2, '0')}:00
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-4" align="start">
                        <div className="space-y-4">
                          <div className="text-sm font-medium text-[#163F69]">Select time range</div>
                          <div className="px-3">
                            <Slider
                              value={timeRange}
                              onValueChange={(value) => {
                                setTimeRange(value as [number, number])
                                resetPagination()
                              }}
                              max={24}
                              min={0}
                              step={1}
                              minStepsBetweenThumbs={1}
                              className="w-full"
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>00:00</span>
                            <span>12:00</span>
                            <span>24:00</span>
                          </div>
                          <div className="text-center text-sm">
                            {timeRange[0] === 0 && timeRange[1] === 24 ? (
                              <span className="text-muted-foreground">Any time</span>
                            ) : (
                              <span className="font-medium">
                                {String(timeRange[0]).padStart(2, '0')}:00 - {String(timeRange[1]).padStart(2, '0')}:00
                              </span>
                            )}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                                  {/* Sorting Controls */}
                  <div className="flex items-center gap-3">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-48 h-12 rounded-xl pl-12 relative">
                        <ArrowUpDown className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#163F69]" />
                        <SelectValue placeholder="Sort by..." />
                      </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-desc">Newest first</SelectItem>
                      <SelectItem value="date-asc">Oldest first</SelectItem>
                      <SelectItem value="location">Location A-Z</SelectItem>
                      <SelectItem value="photographer">Photographer A-Z</SelectItem>
                      <SelectItem value="photos-desc">Most photos</SelectItem>
                      <SelectItem value="photos-asc">Least photos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Selected Filters */}
              {(selectedPhotographers.length > 0 || selectedLocations.length > 0 || dateRange || (timeRange[0] > 0 || timeRange[1] < 24)) && (
                <div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPhotographers.map((photographer) => (
                      <Badge
                        key={photographer}
                        variant="secondary"
                        className="bg-[#163F69] text-white hover:bg-[#163F69]/90 pr-1"
                      >
                        <User className="w-3 h-3 mr-1" />
                        {photographer}
                        <button
                          onClick={() => removePhotographer(photographer)}
                          className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                    {selectedLocations.map((location) => (
                      <Badge
                        key={location}
                        variant="secondary"
                        className="bg-[#163F69] text-white hover:bg-[#163F69]/90 pr-1"
                      >
                        <MapPin className="w-3 h-3 mr-1" />
                        {location}
                        <button
                          onClick={() => removeLocation(location)}
                          className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                    {dateRange && (
                      <Badge
                        variant="secondary"
                        className="bg-[#163F69] text-white hover:bg-[#163F69]/90 pr-1"
                      >
                        <CalendarDays className="w-3 h-3 mr-1" />
                        Date: {dateRange.from ? format(dateRange.from, "MMM dd") : "Any"} - {dateRange.to ? format(dateRange.to, "MMM dd") : "Any"}
                        <button
                          onClick={() => {
                            setDateRange(undefined)
                            resetPagination()
                          }}
                          className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {(timeRange[0] > 0 || timeRange[1] < 24) && (
                      <Badge
                        variant="secondary"
                        className="bg-[#163F69] text-white hover:bg-[#163F69]/90 pr-1"
                      >
                        <Calendar className="w-3 h-3 mr-1" />
                        Time: {String(timeRange[0]).padStart(2, '0')}:00 - {String(timeRange[1]).padStart(2, '0')}:00
                        <button
                          onClick={() => {
                            setTimeRange([0, 24])
                            resetPagination()
                          }}
                          className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    
                    {/* Clear All Filters Link */}
                    <button
                      onClick={clearAllFilters}
                      className="text-gray-500 hover:text-gray-700 text-sm underline cursor-pointer"
                    >
                      Clear All Filters
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Showing {sortedAlbums.length} of {allAlbums.length} albums
                  </p>
                </div>
              )}
          </div>

          {/* Albums Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
            {currentAlbums.map((album) => (
              <div key={album.id} className="bg-white p-3.5 rounded-3xl border-2 border-[#EEEEEE] hover:shadow-lg transition-shadow duration-200">
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

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, sortedAlbums.length)} of {sortedAlbums.length} albums
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 border-2 border-[#EEEEEE] hover:border-[#EEEEEE]/80 rounded-xl"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {(() => {
                  const pages = []
                  
                  if (totalPages <= 5) {
                    // Show all pages if 5 or fewer
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(
                        <Button
                          key={i}
                          variant={currentPage === i ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(i)}
                          className={`min-w-10 ${
                            currentPage === i 
                              ? "bg-[#163F69] hover:bg-[#163F69]/90 text-white border-2 border-[#5A7793] rounded-xl h-10" 
                              : "border-2 border-[#EEEEEE] hover:border-[#EEEEEE]/80 rounded-xl h-10"
                          }`}
                        >
                          {i}
                        </Button>
                      )
                    }
                  } else {
                    // Always show exactly 5 buttons with ellipsis
                    let startPage, endPage
                    
                    if (currentPage <= 3) {
                      // Near the beginning: 1 2 3 ... 10
                      startPage = 1
                      endPage = 3
                      
                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                          <Button
                            key={i}
                            variant={currentPage === i ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(i)}
                            className={`min-w-10 ${
                              currentPage === i 
                                ? "bg-[#163F69] hover:bg-[#163F69]/90 text-white border-2 border-[#5A7793] rounded-xl h-10" 
                                : "border-2 border-[#EEEEEE] hover:border-[#EEEEEE]/80 rounded-xl h-10"
                            }`}
                          >
                            {i}
                          </Button>
                        )
                      }
                      
                      pages.push(
                        <span key="ellipsis" className="px-2 text-gray-500">
                          ...
                        </span>
                      )
                      
                      pages.push(
                        <Button
                          key={totalPages}
                          variant={currentPage === totalPages ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(totalPages)}
                          className={`min-w-10 ${
                            currentPage === totalPages 
                              ? "bg-[#163F69] hover:bg-[#163F69]/90 text-white border-2 border-[#5A7793] rounded-xl h-10" 
                              : "border-2 border-[#EEEEEE] hover:border-[#EEEEEE]/80 rounded-xl h-10"
                          }`}
                        >
                          {totalPages}
                        </Button>
                      )
                    } else if (currentPage >= totalPages - 2) {
                      // Near the end: 1 ... 8 9 10
                      pages.push(
                        <Button
                          key={1}
                          variant={currentPage === 1 ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(1)}
                          className={`min-w-10 ${
                            currentPage === 1 
                              ? "bg-[#163F69] hover:bg-[#163F69]/90 text-white border-2 border-[#5A7793] rounded-xl h-10" 
                              : "border-2 border-[#EEEEEE] hover:border-[#EEEEEE]/80 rounded-xl h-10"
                          }`}
                        >
                          1
                        </Button>
                      )
                      
                      pages.push(
                        <span key="ellipsis" className="px-2 text-gray-500">
                          ...
                        </span>
                      )
                      
                      startPage = totalPages - 2
                      endPage = totalPages
                      
                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                          <Button
                            key={i}
                            variant={currentPage === i ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(i)}
                            className={`min-w-10 ${
                              currentPage === i 
                                ? "bg-[#163F69] hover:bg-[#163F69]/90 text-white border-2 border-[#5A7793] rounded-xl h-10" 
                                : "border-2 border-[#EEEEEE] hover:border-[#EEEEEE]/80 rounded-xl h-10"
                            }`}
                          >
                            {i}
                          </Button>
                        )
                      }
                    } else {
                      // In the middle: Mobile shows 1 ... 5 ... 10, Desktop shows 1 ... 4 5 6 ... 10
                      pages.push(
                        <Button
                          key={1}
                          variant={currentPage === 1 ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(1)}
                          className={`min-w-10 ${
                            currentPage === 1 
                              ? "bg-[#163F69] hover:bg-[#163F69]/90 text-white border-2 border-[#5A7793] rounded-xl h-10" 
                              : "border-2 border-[#EEEEEE] hover:border-[#EEEEEE]/80 rounded-xl h-10"
                          }`}
                        >
                          1
                        </Button>
                      )
                      
                      pages.push(
                        <span key="ellipsis-start" className="px-2 text-gray-500">
                          ...
                        </span>
                      )
                      
                      // Mobile: Show only current page, Desktop: Show current page and neighbors
                      pages.push(
                        <Button
                          key={currentPage - 1}
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="min-w-10 border-2 border-[#EEEEEE] hover:border-[#EEEEEE]/80 rounded-xl h-10 hidden sm:block"
                        >
                          {currentPage - 1}
                        </Button>
                      )
                      
                      pages.push(
                        <Button
                          key={currentPage}
                          variant="default"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage)}
                          className="min-w-10 bg-[#163F69] hover:bg-[#163F69]/90 text-white border-2 border-[#5A7793] rounded-xl h-10"
                        >
                          {currentPage}
                        </Button>
                      )
                      
                      pages.push(
                        <Button
                          key={currentPage + 1}
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="min-w-10 border-2 border-[#EEEEEE] hover:border-[#EEEEEE]/80 rounded-xl h-10 hidden sm:block"
                        >
                          {currentPage + 1}
                        </Button>
                      )
                      
                      pages.push(
                        <span key="ellipsis-end" className="px-2 text-gray-500">
                          ...
                        </span>
                      )
                      
                      pages.push(
                        <Button
                          key={totalPages}
                          variant={currentPage === totalPages ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(totalPages)}
                          className={`min-w-10 ${
                            currentPage === totalPages 
                              ? "bg-[#163F69] hover:bg-[#163F69]/90 text-white border-2 border-[#5A7793] rounded-xl h-10" 
                              : "border-2 border-[#EEEEEE] hover:border-[#EEEEEE]/80 rounded-xl h-10"
                          }`}
                        >
                          {totalPages}
                        </Button>
                      )
                    }
                  }
                  
                  return pages
                })()}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 border-2 border-[#EEEEEE] hover:border-[#EEEEEE]/80 rounded-xl"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 