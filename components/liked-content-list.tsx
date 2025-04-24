"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Play, Heart, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/hooks/use-auth"

export function LikedContentList() {
  const [likes, setLikes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [contentDetails, setContentDetails] = useState<Record<string, any>>({})
  const { session } = useAuth()

  useEffect(() => {
    if (session) {
      fetchLikedContent()
    } else {
      setIsLoading(false)
    }
  }, [session])

  const fetchLikedContent = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from("likes")
        .select("*")
        .eq("user_id", session?.user.id)
        .order("created_at", { ascending: false })

      if (error) throw error

      setLikes(data || [])

      // Fetch details for each item
      if (data && data.length > 0) {
        await Promise.all(
          data.map(async (item) => {
            await fetchContentDetails(item.content_id, item.content_type)
          }),
        )
      }
    } catch (error) {
      console.error("Error fetching liked content:", error)
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

  const unlikeContent = async (contentId: string, contentType: string) => {
    try {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("user_id", session?.user.id)
        .eq("content_id", contentId)
        .eq("content_type", contentType)

      if (error) throw error

      setLikes(likes.filter((item) => !(item.content_id === contentId && item.content_type === contentType)))
    } catch (error) {
      console.error("Error removing like:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (likes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 mb-4">You haven't liked any content yet</p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/">Browse Content</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {likes.map((item) => {
        const contentKey = `${item.content_type}-${item.content_id}`
        const details = contentDetails[contentKey]
        const title = details ? details.title || details.name : "Loading..."
        const posterPath = details?.poster_path

        return (
          <div
            key={`${item.content_type}-${item.content_id}`}
            className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-900/20"
          >
            <Link href={`/${item.content_type === "tv" ? "show" : "movie"}/${item.content_id}`}>
              <div className="aspect-[2/3] bg-gray-800 relative rounded-lg overflow-hidden">
                {posterPath ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">{title.charAt(0)}</div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="icon"
                    className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 h-8 w-8 sm:h-9 sm:w-9"
                  >
                    <Play className="h-4 w-4 fill-white" />
                  </Button>
                </div>

                {/* Content info */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-medium text-white truncate text-xs sm:text-sm">{title}</h3>
                </div>

                {/* Type badge */}
                <Badge className="absolute top-1 left-1 bg-gray-800 text-[10px] px-1.5 py-0.5">
                  {item.content_type === "tv" ? "TV" : "Movie"}
                </Badge>

                {/* Unlike button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-1 right-1 rounded-full h-6 w-6 border-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.preventDefault()
                    unlikeContent(item.content_id, item.content_type)
                  }}
                >
                  <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                </Button>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

