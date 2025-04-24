"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Play, X, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/hooks/use-auth"

export function WatchHistoryList() {
  const [history, setHistory] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [contentDetails, setContentDetails] = useState<Record<string, any>>({})
  const { session } = useAuth()

  useEffect(() => {
    if (session) {
      fetchWatchHistory()
    } else {
      setIsLoading(false)
    }
  }, [session])

  const fetchWatchHistory = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from("watch_history")
        .select("*")
        .eq("user_id", session?.user.id)
        .order("watched_at", { ascending: false })
        .limit(20)

      if (error) throw error

      setHistory(data || [])

      // Fetch details for each item
      if (data && data.length > 0) {
        await Promise.all(
          data.map(async (item) => {
            await fetchContentDetails(item.content_id, item.content_type)
          }),
        )
      }
    } catch (error) {
      console.error("Error fetching watch history:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchContentDetails = async (contentId: string, contentType: string) => {
    try {
      const endpoint = contentType === "tv" ? `tv/${contentId}` : `movie/${contentId}`
      const response = await fetch(`/api/tmdb/${endpoint}`)

      if (!response.ok) throw new Error("Failed to fetch content details")

      const data = await response.json()
      setContentDetails((prev) => ({
        ...prev,
        [`${contentType}-${contentId}`]: data,
      }))
    } catch (error) {
      console.error("Error fetching content details:", error)
    }
  }

  const removeFromHistory = async (id: string) => {
    try {
      const { error } = await supabase.from("watch_history").delete().eq("id", id)

      if (error) throw error

      setHistory(history.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Error removing from history:", error)
    }
  }

  const clearHistory = async () => {
    try {
      const { error } = await supabase.from("watch_history").delete().eq("user_id", session?.user.id)

      if (error) throw error

      setHistory([])
    } catch (error) {
      console.error("Error clearing history:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 mb-4">Your watch history is empty</p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/">Discover Content</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          className="border-gray-700 text-red-400 hover:text-red-300 hover:bg-gray-800"
          onClick={clearHistory}
        >
          Clear History
        </Button>
      </div>

      <div className="space-y-4">
        {history.map((item) => {
          const contentKey = `${item.content_type}-${item.content_id}`
          const details = contentDetails[contentKey]
          const title = details ? details.title || details.name : item.title
          const posterPath = details?.poster_path || item.poster_path
          const watchedDate = new Date(item.watched_at).toLocaleDateString()

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border border-gray-800 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              <Link
                href={`/${item.content_type === "tv" ? "show" : "movie"}/${item.content_id}`}
                className="flex-shrink-0 w-16 h-24 relative rounded overflow-hidden"
              >
                {posterPath ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${posterPath}`}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500">{title.charAt(0)}</span>
                  </div>
                )}
              </Link>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/${item.content_type === "tv" ? "show" : "movie"}/${item.content_id}`}
                  className="hover:text-blue-400"
                >
                  <h4 className="font-medium truncate">{title}</h4>
                </Link>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <Badge className="bg-gray-800 text-xs">{item.content_type === "tv" ? "TV Show" : "Movie"}</Badge>
                  <span>Watched on {watchedDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-8 w-8 bg-blue-600/10 border-blue-600/30 hover:bg-blue-600/20"
                  asChild
                >
                  <Link href={`/${item.content_type === "tv" ? "show" : "movie"}/${item.content_id}`}>
                    <Play className="h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-8 w-8 border-gray-700"
                  onClick={() => removeFromHistory(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

