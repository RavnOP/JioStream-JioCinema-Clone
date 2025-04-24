"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VideoPlayer } from "@/components/video-player"
import { LoadingSpinner } from "@/components/loading-spinner"

interface Season {
  id: number
  name: string
  season_number: number
  episode_count: number
  poster_path: string | null
}

interface Episode {
  id: number
  name: string
  episode_number: number
  season_number: number
  still_path: string | null
  overview: string
  air_date: string
  runtime: number | null
}

interface SeasonSelectorProps {
  showId: number
  seasons: Season[]
  showName: string
  withPlayer?: boolean
  initialSeason?: number
  initialEpisode?: number
}

export function SeasonSelector({
  showId,
  seasons,
  showName,
  withPlayer = false,
  initialSeason = 1,
  initialEpisode = 1,
}: SeasonSelectorProps) {
  const [selectedSeason, setSelectedSeason] = useState<number>(
    initialSeason && seasons.some((s) => s.season_number === initialSeason)
      ? initialSeason
      : seasons[0]?.season_number || 1,
  )
  const [selectedEpisode, setSelectedEpisode] = useState<number>(initialEpisode || 1)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch episodes for the selected season
  useEffect(() => {
    setIsLoading(true)
    setError(null)

    fetch(`/api/tmdb/tv/${showId}/season/${selectedSeason}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch season data")
        return res.json()
      })
      .then((data) => {
        setEpisodes(data.episodes || [])
        // Only reset episode when a different season is selected manually
        if (selectedSeason !== initialSeason || !initialEpisode) {
          setSelectedEpisode(1)
        }
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching season:", err)
        setError("Failed to load episodes. Please try again.")
        setIsLoading(false)
      })
  }, [showId, selectedSeason, initialSeason, initialEpisode])

  if (seasons.length === 0) {
    return <div className="text-center py-8 text-gray-400">No season information available for this show.</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <Select
            value={selectedSeason.toString()}
            onValueChange={(value) => setSelectedSeason(Number.parseInt(value))}
          >
            <SelectTrigger className="w-full sm:w-[200px] bg-gray-900 border-gray-700">
              <SelectValue placeholder="Select Season" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              {seasons.map((season) => (
                <SelectItem key={season.id} value={season.season_number.toString()}>
                  {season.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {withPlayer && episodes.length > 0 && (
          <div className="flex-1">
            <Select
              value={selectedEpisode.toString()}
              onValueChange={(value) => setSelectedEpisode(Number.parseInt(value))}
            >
              <SelectTrigger className="w-full sm:w-[200px] bg-gray-900 border-gray-700">
                <SelectValue placeholder="Select Episode" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {episodes.map((episode) => (
                  <SelectItem key={episode.id} value={episode.episode_number.toString()}>
                    Episode {episode.episode_number}: {episode.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {withPlayer && episodes.length > 0 && (
        <div className="space-y-4">
          <VideoPlayer
            type="tv"
            tmdbId={showId}
            season={selectedSeason}
            episode={selectedEpisode}
            title={`${showName} - ${episodes.find((e) => e.episode_number === selectedEpisode)?.name || `Episode ${selectedEpisode}`}`}
          />
          <div className="mt-4">
            <h3 className="text-xl font-bold">
              {episodes.find((e) => e.episode_number === selectedEpisode)?.name || `Episode ${selectedEpisode}`}
            </h3>
            <p className="text-gray-300 mt-2">
              {episodes.find((e) => e.episode_number === selectedEpisode)?.overview || "No description available."}
            </p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-400">
          {error}
          <Button
            className="mt-4 bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              setIsLoading(true)
              setError(null)
              fetch(`/api/tmdb/tv/${showId}/season/${selectedSeason}`)
                .then((res) => res.json())
                .then((data) => {
                  setEpisodes(data.episodes || [])
                  setIsLoading(false)
                })
                .catch((err) => {
                  console.error("Error fetching season:", err)
                  setError("Failed to load episodes. Please try again.")
                  setIsLoading(false)
                })
            }}
          >
            Try Again
          </Button>
        </div>
      ) : episodes.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No episodes available for this season.</div>
      ) : (
        !withPlayer && (
          <div className="space-y-4">
            {episodes.map((episode) => (
              <div
                key={episode.id}
                className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-800 rounded-lg hover:bg-gray-900/50 transition-colors"
              >
                <div className="sm:w-48 h-28 relative flex-shrink-0 rounded-md overflow-hidden bg-gray-800">
                  {episode.still_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                      alt={episode.name}
                      width={192}
                      height={112}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Image
                      src="/placeholder.svg?height=112&width=192"
                      alt={episode.name}
                      width={192}
                      height={112}
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="icon"
                      className="rounded-full bg-black/50 hover:bg-black/70"
                      onClick={() => {
                        setSelectedEpisode(episode.episode_number)
                        if (!withPlayer) {
                          // Navigate to watch tab or update URL
                          const tabsElement = document.querySelector('[role="tablist"]')
                          if (tabsElement) {
                            const watchTab = Array.from(tabsElement.children).find(
                              (tab) => (tab as HTMLElement).textContent === "Watch",
                            )
                            if (watchTab) {
                              ;(watchTab as HTMLElement).click()
                            }
                          }
                        }
                      }}
                    >
                      <Play className="h-5 w-5 fill-white" />
                    </Button>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Episode {episode.episode_number}</h4>
                    <span className="text-sm text-gray-400">{episode.runtime ? `${episode.runtime} min` : ""}</span>
                  </div>
                  <h3 className="font-semibold text-lg">{episode.name}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                    {episode.overview || "No description available."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}

