"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/hooks/use-auth"

export function ContinueWatchingRow() {
  const [continueWatching, setContinueWatching] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { session } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        
        const { data, error: supabaseError } = await supabase
          .from("continue_watching")
          .select("*")
          .eq("user_id", session.user.id)
          .order("last_watched", { ascending: false })
          .limit(10)

        if (supabaseError) {
          throw supabaseError
        }

        setContinueWatching(data || [])
      } catch (err) {
        console.error("Error fetching continue watching:", err)
        setError("Failed to load continue watching list")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [session])

  const removeItem = async (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      const { error: deleteError } = await supabase
        .from("continue_watching")
        .delete()
        .eq("id", id)

      if (deleteError) throw deleteError

      setContinueWatching(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      console.error("Error removing item:", err)
      setError("Failed to remove item")
    }
  }

  if (!session) {
    return null
  }

  if (error) {
    return (
      <div className="space-y-3">
        <h2 className="text-lg md:text-xl font-bold">Continue Watching</h2>
        <div className="text-red-400 text-sm">{error}</div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        <h2 className="text-lg md:text-xl font-bold">Continue Watching</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (continueWatching.length === 0) {
    return (
      <div className="space-y-3">
        <h2 className="text-lg md:text-xl font-bold">Continue Watching</h2>
        <div className="text-gray-400 text-sm">No items to continue watching</div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-bold">Continue Watching</h2>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
        {continueWatching.map((item) => {
          const progressPercent = item.duration_seconds > 0 
            ? Math.min(100, (item.progress_seconds / item.duration_seconds) * 100)
            : 0
          
          const path = item.content_type === "tv" ? "show" : "movie"
          const watchUrl = `/${path}/${item.content_id}`
          const episodeParams = item.content_type === "tv" && item.season_number && item.episode_number
            ? `?season=${item.season_number}&episode=${item.episode_number}`
            : ""

          return (
            <Link
              key={item.id}
              href={`${watchUrl}${episodeParams}`}
              className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-900/20"
            >
              <div className="aspect-[2/3] bg-gray-800 relative rounded-lg overflow-hidden">
                {item.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    unoptimized // Added to prevent potential image loading issues
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    {item.title?.charAt(0) || "?"}
                  </div>
                )}

                <button
                  className="absolute top-1 right-1 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={(e) => removeItem(item.id, e)}
                >
                  <X className="h-3 w-3 text-white" />
                </button>

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
                    {item.title || "Untitled"}
                  </h3>
                  {item.content_type === "tv" && item.season_number && item.episode_number && (
                    <p className="text-xs text-gray-400">
                      S{item.season_number} E{item.episode_number}
                    </p>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                  <Progress 
                    value={progressPercent} 
                    className="h-1 rounded-none bg-gray-700" 
                  />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}