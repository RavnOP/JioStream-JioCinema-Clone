"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface WatchButtonProps {
  title?: string
  contentId?: string
  contentType?: "movie" | "tv"
  seasonNumber?: number
  episodeNumber?: number
  scrollToPlayer?: boolean
}

export function WatchButton({
  title = "Watch Now",
  contentId,
  contentType,
  seasonNumber,
  episodeNumber,
  scrollToPlayer = true,
}: WatchButtonProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Function to handle watch button click
  const handleWatch = () => {
    setIsLoading(true)

    try {
      // If we're already on the detail page
      if (pathname.includes(`/${contentType}/${contentId}`)) {
        // Find the watch tab and click it
        const tabsElement = document.querySelector('[role="tablist"]')
        if (tabsElement) {
          const watchTab = Array.from(tabsElement.children).find(
            (tab) =>
              (tab as HTMLElement).getAttribute("data-value") === "watch" ||
              (tab as HTMLElement).textContent?.trim() === "Watch",
          )

          if (watchTab) {
            ;(watchTab as HTMLElement).click()

            // Wait for tab content to be visible
            setTimeout(() => {
              // Find the video player element
              const videoPlayerElement = document.querySelector(".video-player-container")

              if (videoPlayerElement && scrollToPlayer) {
                // Scroll to the video player with smooth animation
                videoPlayerElement.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                })

                // Add a visual indication that the player is active
                videoPlayerElement.classList.add("ring-2", "ring-blue-500")
                setTimeout(() => {
                  videoPlayerElement.classList.remove("ring-2", "ring-blue-500")
                }, 2000)
              }

              setIsLoading(false)
            }, 300)
          } else {
            // If watch tab not found, navigate to the page with the watch tab parameter
            navigateToContent()
          }
        } else {
          // If tablist not found, navigate to the page with the watch tab parameter
          navigateToContent()
        }
      } else {
        // If we're not on the detail page, navigate to it
        navigateToContent()
      }
    } catch (error) {
      console.error("Error playing video:", error)
      toast({
        title: "Playback Error",
        description: "An error occurred while trying to play the video.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Function to navigate to the content page with appropriate parameters
  const navigateToContent = () => {
    let url = ""

    if (contentType === "tv" && contentId) {
      url = `/show/${contentId}?tab=watch`
      if (seasonNumber) url += `&season=${seasonNumber}`
      if (episodeNumber) url += `&episode=${episodeNumber}`
    } else if (contentType === "movie" && contentId) {
      url = `/movie/${contentId}?tab=watch`
    } else {
      // Default case if we don't have enough information
      url = pathname + "?tab=watch"
    }

    router.push(url)
  }

  return (
    <Button
      onClick={handleWatch}
      disabled={isLoading}
      size="lg"
      className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-md px-6 py-2 flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-red-700/20"
    >
      <Play className="h-5 w-5 fill-current" />
      <span>{isLoading ? "Loading..." : title}</span>
    </Button>
  )
}

