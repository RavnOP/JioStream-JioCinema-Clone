"use client"

import { useState, useRef, useEffect } from "react"
import { Server, RefreshCw, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface VideoPlayerProps {
  title: string
  className?: string
  type?: "movie" | "tv"
  tmdbId?: number
  season?: number
  episode?: number
}

// Define available streaming servers
const STREAMING_SERVERS = [
  { id: "vidsrc-dev", name: "Pro", active: true, envVar: "NEXT_PUBLIC_SERVER1" },
  { id: "vidsrc-wtf", name: "Multi", active: true, envVar: "NEXT_PUBLIC_SERVER3" },
  { id: "2embed", name: "Hindi", active: true, envVar: "NEXT_PUBLIC_SERVER4" },
  { id: "Smashy", name: "Hindi 2", active: true, envVar: "NEXT_PUBLIC_SERVER5" },
]

export function VideoPlayer({ title, className, type = "movie", tmdbId, season, episode }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedServer, setSelectedServer] = useState(STREAMING_SERVERS[0].id)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Get the streaming URL based on the content type, parameters, and selected server
  const getStreamingUrl = () => {
    if (!tmdbId) return ""

    if (selectedServer === "vidsrc-dev") {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER1
      if (type === "tv" && season && episode) {
        return `${baseUrl}/tv/${tmdbId}/${season}/${episode}?nextbutton=true`
      } else if (type === "movie") {
        return `${baseUrl}/movie/${tmdbId}`
      }
    } else if (selectedServer === "vidsrc-wtf") {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER3
      if (type === "tv" && season && episode) {
        return `${baseUrl}/tv/?id=${tmdbId}&s=${season}&e=${episode}`
      } else if (type === "movie") {
        return `${baseUrl}/movie/?id=${tmdbId}`
      }
    } else if (selectedServer === "2embed") {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER4
      if (type === "tv" && season && episode) {
        return `${baseUrl}/embed/tv/${tmdbId}/${season}/${episode}?server=5`
      } else if (type === "movie") {
        return `${baseUrl}/embed/movie/${tmdbId}?server=5`
      }
    } else if (selectedServer === "Smashy") {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER5
      if (type === "tv" && season && episode) {
        return `${baseUrl}/tv/${tmdbId}?s=${season}&e=${episode}?playerList=D|SU|F`
      } else if (type === "movie") {
        return `${baseUrl}/movie/${tmdbId}`
      }
    }
    return ""
  }

  const streamingUrl = getStreamingUrl()

  // Rest of the component remains the same...
  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleServerChange = (serverId: string) => {
    setIsLoading(true)
    setSelectedServer(serverId)
    toast({
      title: "Changing server",
      description: `Switching to ${STREAMING_SERVERS.find((s) => s.id === serverId)?.name}`,
    })
  }

  const handleRefresh = () => {
    setIsLoading(true)
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src
      iframeRef.current.src = currentSrc
    }
    toast({
      title: "Refreshing player",
      description: "Reloading the current stream",
    })
  }

  useEffect(() => {
    return () => {
      if (iframeRef.current) {
        iframeRef.current.src = ""
      }
    }
  }, [])

  return (
    <div className="space-y-3">
      {/* Server selection controls above the player - now with dropdown for mobile */}
      <div className="flex flex-wrap items-center justify-between bg-gray-900 p-3 rounded-lg border border-gray-800 gap-2">
        <h3 className="text-white font-medium truncate mr-2 text-sm sm:text-base">{title}</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="h-8 px-2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Refresh</span>
          </Button>

          {/* Dropdown menu for server selection - better for mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
              >
                <Server className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs mr-1">
                  {STREAMING_SERVERS.find((server) => server.id === selectedServer)?.name || "Server"}
                </span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
              {STREAMING_SERVERS.filter((server) => server.active).map((server) => (
                <DropdownMenuItem
                  key={server.id}
                  onClick={() => handleServerChange(server.id)}
                  className={cn(
                    "cursor-pointer",
                    selectedServer === server.id ? "bg-blue-600 text-white" : "hover:bg-gray-800",
                  )}
                >
                  <Server className="h-3.5 w-3.5 mr-2" />
                  {server.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Video player */}
      <div
        ref={playerRef}
        className={cn("relative overflow-hidden rounded-lg bg-black aspect-video video-player-container", className)}
        id="video-player"
      >
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
            <LoadingSpinner size="large" />
            <p className="mt-4 text-gray-400">Loading video...</p>
          </div>
        )}

        {streamingUrl ? (
          <iframe
            ref={iframeRef}
            src={streamingUrl}
            title={title}
            className="w-full h-full border-0"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture"
            onLoad={handleIframeLoad}
            id="video-iframe"
            loading="lazy"
          ></iframe>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-900">
            <p className="text-gray-400">No video source available</p>
          </div>
        )}
      </div>
    </div>
  )
}