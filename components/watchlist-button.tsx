"use client"

import { useState, useEffect } from "react"
import { Plus, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { supabase } from "@/lib/supabase"
import { AuthModal } from "@/components/auth/auth-modal"

interface WatchlistButtonProps {
  contentId: string
  contentType: "movie" | "tv"
  className?: string
}

export function WatchlistButton({ contentId, contentType, className }: WatchlistButtonProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { session } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (session) {
      checkWatchlistStatus()
    }
  }, [session, contentId, contentType])

  const checkWatchlistStatus = async () => {
    if (!session?.user.id) return

    try {
      const { data, error } = await supabase
        .from("watchlist")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("content_id", contentId)
        .eq("content_type", contentType)
        .single()

      if (error && error.code !== "PGRST116") {
        console.error("Error checking watchlist status:", error)
        return
      }

      setIsInWatchlist(!!data)
    } catch (error) {
      console.error("Error checking watchlist:", error)
    }
  }

  const toggleWatchlist = async () => {
    if (!session) {
      setAuthModalOpen(true)
      return
    }

    setIsLoading(true)
    try {
      if (isInWatchlist) {
        // Remove from watchlist
        const { error } = await supabase
          .from("watchlist")
          .delete()
          .eq("user_id", session.user.id)
          .eq("content_id", contentId)
          .eq("content_type", contentType)

        if (error) throw error

        setIsInWatchlist(false)
        toast({
          title: "Removed from watchlist",
          description: "The title has been removed from your watchlist.",
        })
      } else {
        // Add to watchlist
        const { error } = await supabase.from("watchlist").insert({
          user_id: session.user.id,
          content_id: contentId,
          content_type: contentType,
        })

        if (error) throw error

        setIsInWatchlist(true)
        toast({
          title: "Added to watchlist",
          description: "The title has been added to your watchlist.",
        })
      }
    } catch (error: any) {
      console.error("Error toggling watchlist:", error)
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        className={`border-gray-700 gap-2 ${className || ""}`}
        onClick={toggleWatchlist}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isInWatchlist ? (
          <Check className="h-4 w-4" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
        {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
      </Button>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  )
}

