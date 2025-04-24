"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Play, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface MovieRowProps {
  title: string
  endpoint: string
  viewAllLink?: string
}

export function MovieRow({ title, endpoint, viewAllLink }: MovieRowProps) {
  const [data, setData] = useState<any>({ results: [] })
  const [isLoading, setIsLoading] = useState(true)
  const isTV = endpoint.includes("tv") || endpoint.includes("show")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/tmdb/${endpoint}`)
        if (!response.ok) throw new Error("Failed to fetch data")
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [endpoint])

  return (
    <div className="w-full max-w-[calc(100vw-32px)] mx-auto space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
        <Button variant="link" size="sm" className="text-blue-400 h-8 px-2" asChild>
          <Link href={viewAllLink || (isTV ? "/shows" : "/movies")}>
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9 gap-3 md:gap-4">
        {isLoading
          ? Array(16)
              .fill(0)
              .map((_, i) => <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse" />)
          : data.results && data.results.length > 0
            ? data.results.slice(0,18).map((item: any) => {
                const contentType = isTV || item.media_type === "tv" ? "show" : "movie"
                const path = `/${contentType}/${item.id}`

                return (
                  <Link
                    key={item.id}
                    href={path}
                    className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-900/20"
                  >
                    <div className="aspect-[2/3] bg-gray-800 relative rounded-lg overflow-hidden">
                      {item.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          alt={item.title || item.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          {(item.title || item.name || "").charAt(0)}
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="icon"
                          className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 h-8 w-8 sm:h-9 sm:w-9"
                        >
                          <Play className="h-4 w-4 fill-white" />
                        </Button>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-medium text-white truncate text-xs sm:text-sm">
                          {item.title || item.name}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-gray-300 mt-1">
                          <span>{new Date(item.release_date || item.first_air_date || "").getFullYear() || "New"}</span>
                          {item.vote_average && (
                            <span className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 mr-1 fill-yellow-400" />
                              {item.vote_average.toFixed(1)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })
            : Array(18)
                .fill(0)
                .map((_, i) => <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg" />)}
      </div>
    </div>
  )
}