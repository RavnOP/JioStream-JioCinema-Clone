"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

interface AuthProps {
  children: ReactNode
}

interface AuthContextType {
  session: Session | null
  isLoading: boolean
  signUp: (data: {
    email: string
    password: string
    options?: {
      data?: Record<string, any>
    }
  }) => Promise<{
    error: Error | null
  }>
  signIn: (data: {
    email: string
    password: string
  }) => Promise<{
    error: Error | null
  }>
  signOut: () => Promise<void>
  ensureProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: AuthProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)

      if (session) {
        // Try to ensure profile exists when session changes
        await ensureProfileExists(session.user.id)
      }

      setIsLoading(false)
    })

    // Initial session fetch
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session)

      if (session) {
        // Try to ensure profile exists on initial load
        await ensureProfileExists(session.user.id)
      }

      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const ensureProfileExists = async (userId: string) => {
    try {
      // First check if profile exists
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle()

      if (error) {
        console.error("Error checking profile:", error)
        return
      }

      // If profile doesn't exist, create it using the API route
      if (!data) {
        const username = session?.user?.email?.split("@")[0] || userId.substring(0, 8)

        const response = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            username,
          }),
        })

        if (!response.ok) {
          console.error("Failed to create profile via API")

          // Fallback: Try to create profile directly
          const { error: insertError } = await supabase.from("profiles").insert({
            id: userId,
            username: username,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })

          if (insertError) {
            console.error("Fallback profile creation failed:", insertError)
          }
        }
      }
    } catch (error) {
      console.error("Error ensuring profile exists:", error)
    }
  }

  const ensureProfile = async () => {
    if (session?.user.id) {
      await ensureProfileExists(session.user.id)
    }
  }

  const signUp = async ({
    email,
    password,
    options,
  }: {
    email: string
    password: string
    options?: { data?: Record<string, any> }
  }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options,
      })

      // If signup was successful and we have a user, ensure a profile exists
      if (!error && data.user) {
        const username = options?.data?.username || email.split("@")[0]

        // Use the API route to create the profile
        await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: data.user.id,
            username,
            fullName: options?.data?.full_name,
          }),
        })
      }

      return { error }
    } catch (error: any) {
      return { error }
    }
  }

  const signIn = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      // If sign in was successful, ensure profile exists
      if (!error && data.user) {
        await ensureProfileExists(data.user.id)
      }

      return { error }
    } catch (error: any) {
      return { error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = {
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    ensureProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

