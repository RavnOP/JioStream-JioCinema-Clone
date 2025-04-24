"use client"

import { useState, useEffect } from "react"
import { Heart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { supabase } from "@/lib/supabase"
import { AuthModal } from "@/components/auth/auth-modal"

interface LikeButtonProps {
  contentId: string
  contentType: "movie" | "tv"
  className?: string
}

export function LikeButton({ contentId, contentType, className }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { session } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (session) {
      checkLikeStatus()
    }
  }, [session, contentId, contentType])

  const checkLikeStatus = async () => {
    if (!session?.user.id) return

    try {
      const { data, error } = await supabase
        .from("likes")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("content_id", contentId)
        .eq("content_type", contentType)
        .single()

      if (error && error.code !== "PGRST116") {
        console.error("Error checking like status:", error)
        return
      }

      setIsLiked(!!data)
    } catch (error) {
      console.error("Error checking like:", error)
    }
  }

  const toggleLike = async () => {
    if (!session) {
      setAuthModalOpen(true)
      return
    }

    setIsLoading(true)
    try {
      if (isLiked) {
        // Remove like
        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("user_id", session.user.id)
          .eq("content_id", contentId)
          .eq("content_type", contentType)

        if (error) throw error

        setIsLiked(false)
      } else {
        // Add like
        const { error } = await supabase.from("likes").insert({
          user_id: session.user.id,
          content_id: contentId,
          content_type: contentType,
        })

        if (error) throw error

        setIsLiked(true)
        toast({
          title: "Liked",
          description: "You liked this title.",
        })
      }
    } catch (error: any) {
      console.error("Error toggling like:", error)
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
        size="icon"
        className={`border-gray-700 rounded-full h-9 w-9 ${className || ""}`}
        onClick={toggleLike}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
        )}
      </Button>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  )
}

