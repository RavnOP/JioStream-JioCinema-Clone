"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading-spinner"

export function FeaturedMovie() {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([])
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/tmdb/movie/popular")
        if (!response.ok) throw new Error("Failed to fetch trending movies")
        const data = await response.json()
        if (data.results && data.results.length > 0) {
          setTrendingMovies(data.results.slice(0, 5))
        }
      } catch (error) {
        console.error("Error fetching trending movies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrendingMovies()
  }, [])

  useEffect(() => {
    if (trendingMovies.length <= 1) return
    const interval = setInterval(() => {
      setCurrentMovieIndex((prev) => (prev + 1) % trendingMovies.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [trendingMovies.length])

  if (isLoading || trendingMovies.length === 0) {
    return (
      <div className="relative w-full max-w-[calc(100vw-32px)] h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-3xl overflow-hidden mx-auto mt-2 ">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  const movie = trendingMovies[currentMovieIndex]

  return (
    <div className="relative w-full max-w-[calc(100vw-32px)] h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-xl sm:rounded-3xl overflow-hidden group mx-auto mt-2">
      <div className="absolute inset-0">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1625] via-[#1a1625]/50 to-transparent" />
      </div>

      {trendingMovies.length > 1 && (
        <div className="absolute bottom-8 right-4 flex gap-2 z-20">
          {trendingMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentMovieIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${index === currentMovieIndex ? 'bg-pink-500 sm:w-6 w-4' : 'bg-white/30'}`}
              aria-label={`Go to movie ${index + 1}`}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-8 md:p-10 z-10">
        <div className="max-w-3xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">{movie.title}</h1>

          <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4 text-sm sm:text-base">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 font-bold">IMDb</span>
              <span>{movie.vote_average.toFixed(1)}/10</span>
            </div>
            <div>{new Date(movie.release_date).getFullYear()}</div>
          </div>

          <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
            {movie.overview}
          </p>

          <div className="flex gap-3 sm:gap-4">
            <Link href={`/movie/${movie.id}`}>
              <Button className="bg-pink-500 hover:bg-pink-600 rounded-full px-5 sm:px-6 h-9 sm:h-10 text-sm sm:text-base">
                <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 fill-white" />
                Watch Now
              </Button>
            </Link>
            {/* <Button variant="outline" className="border-white/20 rounded-full px-5 sm:px-6 h-9 sm:h-10 text-sm sm:text-base">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Add to Watchlist
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  )
}