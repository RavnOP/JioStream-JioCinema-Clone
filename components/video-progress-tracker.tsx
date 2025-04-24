"use client"

import { useEffect, useRef, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { supabase } from "@/lib/supabase"

interface VideoProgressTrackerProps {
  contentId: string
  contentType: "movie" | "tv"
  title: string
  poster_path?: string | null
  seasonNumber?: number | null
  episodeNumber?: number | null
  duration?: number // video duration in seconds
}

export function VideoProgressTracker({
  contentId,
  contentType,
  title,
  poster_path,
  seasonNumber = null,
  episodeNumber = null,
  duration = 0,
}: VideoProgressTrackerProps) {
  const { session } = useAuth()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [initialProgress, setInitialProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastSavedProgressRef = useRef(0)
  const [isTracking, setIsTracking] = useState(false)

  // Connect to the video element
  useEffect(() => {
    const findVideoElement = () => {
      // For iframe video player, we can look for the iframe element
      const iframe = document.getElementById("video-iframe") as HTMLIFrameElement
      if (iframe) {
        if (iframe.contentDocument) {
          const video = iframe.contentDocument.querySelector("video")
          if (video) {
            videoRef.current = video
            return true
          }
        }
      }

      // For HTML5 video element
      const video = document.querySelector("video")
      if (video) {
        videoRef.current = video
        return true
      }

      return false
    }

    // Try to find the video element immediately
    if (!findVideoElement()) {
      // If not found, try again after a delay
      const checkVideoInterval = setInterval(() => {
        if (findVideoElement()) {
          clearInterval(checkVideoInterval)
          setupVideoListeners()
        }
      }, 1000)

      return () => {
        clearInterval(checkVideoInterval)
      }
    } else {
      setupVideoListeners()
    }
  }, [contentId, contentType, seasonNumber, episodeNumber])

  // Fetch initial progress when component mounts
  useEffect(() => {
    if (session?.user.id) {
      fetchProgress()
    }
  }, [session, contentId, contentType, seasonNumber, episodeNumber])

  // Setup tracking on play/pause events
  const setupVideoListeners = () => {
    if (!videoRef.current) return

    // Set initial time
    if (initialProgress > 0 && videoRef.current) {
      videoRef.current.currentTime = initialProgress
    }

    // Start tracking progress
    videoRef.current.addEventListener("play", startProgressTracking)
    videoRef.current.addEventListener("pause", stopProgressTracking)

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("play", startProgressTracking)
        videoRef.current.removeEventListener("pause", stopProgressTracking)
      }
      stopProgressTracking()
    }
  }

  const fetchProgress = async () => {
    if (!session?.user.id) return

    try {
      const { data, error } = await supabase
        .from("continue_watching")
        .select("progress_seconds")
        .eq("user_id", session.user.id)
        .eq("content_id", contentId)
        .eq("content_type", contentType)
        .eq("season_number", seasonNumber)
        .eq("episode_number", episodeNumber)
        .single()

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching progress:", error)
        return
      }

      if (data) {
        setInitialProgress(data.progress_seconds)
      }
    } catch (error) {
      console.error("Error fetching progress:", error)
    }
  }

  const startProgressTracking = () => {
    if (intervalRef.current) return
    setIsTracking(true)

    // Save watch history when playback starts
    saveWatchHistory()

    // Update continue watching every 5 seconds
    intervalRef.current = setInterval(() => {
      if (videoRef.current) {
        const currentTime = Math.floor(videoRef.current.currentTime)
        const videoDuration = Math.floor(videoRef.current.duration || duration)

        // Only save if progress changed by at least 5 seconds
        if (Math.abs(currentTime - lastSavedProgressRef.current) >= 5) {
          lastSavedProgressRef.current = currentTime
          saveProgress(currentTime, videoDuration)
        }
      }
    }, 5000)
  }

  const stopProgressTracking = () => {
    setIsTracking(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    // Save final progress
    if (videoRef.current) {
      const currentTime = Math.floor(videoRef.current.currentTime)
      const videoDuration = Math.floor(videoRef.current.duration || duration)
      saveProgress(currentTime, videoDuration)
    }
  }

  const saveProgress = async (progress: number, totalDuration: number) => {
    if (!session?.user.id) return

    try {
      const { error } = await supabase.from("continue_watching").upsert({
        user_id: session.user.id,
        content_id: contentId,
        content_type: contentType,
        season_number: seasonNumber,
        episode_number: episodeNumber,
        progress_seconds: progress,
        duration_seconds: totalDuration,
        last_watched: new Date().toISOString(),
        poster_path: poster_path || null,
        title,
      })

      if (error) throw error
    } catch (error) {
      console.error("Error saving progress:", error)
    }
  }

  const saveWatchHistory = async () => {
    if (!session?.user.id) return

    try {
      const { error } = await supabase.from("watch_history").upsert({
        user_id: session.user.id,
        content_id: contentId,
        content_type: contentType,
        title,
        poster_path,
        watched_at: new Date().toISOString(),
      })

      if (error) throw error
    } catch (error) {
      console.error("Error saving watch history:", error)
    }
  }

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      stopProgressTracking()
    }
  }, [])

  // This component doesn't render anything
  return null
}

