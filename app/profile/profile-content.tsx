"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Edit2, Loader2, UserCircle, History, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthModal } from "@/components/auth/auth-modal"
import { useAuth } from "@/hooks/use-auth"
import { supabase } from "@/lib/supabase"
import type { Profile } from "@/lib/supabase"
import { WatchHistoryList } from "@/components/watch-history-list"
import { LikedContentList } from "@/components/liked-content-list"

const profileFormSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  full_name: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileContent() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { session } = useAuth()
  const { toast } = useToast()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      full_name: "",
    },
  })

  useEffect(() => {
    if (session) {
      fetchProfile()
    } else {
      setIsLoading(false)
    }
  }, [session])

  const fetchProfile = async () => {
    if (!session?.user.id) return

    try {
      setIsLoading(true)

      // Try to get the profile
      const { data, error } = await supabase.from("profiles").select("*").eq("id", session.user.id).maybeSingle()

      if (error) {
        console.error("Error fetching profile:", error)
        throw error
      }

      // If profile exists, use it
      if (data) {
        setProfile(data)
        form.reset({
          username: data.username || "",
          full_name: data.full_name || "",
        })
      } else {
        // If no profile exists, use default values
        // We won't try to create one here - it should be created by the auth hook or trigger
        const defaultUsername = session.user.email?.split("@")[0] || "user"
        setProfile({
          id: session.user.id,
          username: defaultUsername,
          full_name: null,
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        form.reset({
          username: defaultUsername,
          full_name: "",
        })

        // Show a message to the user
        toast({
          title: "Profile not found",
          description: "Please save your profile information to complete setup.",
        })
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
      toast({
        title: "Error",
        description: "Failed to load profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (values: ProfileFormValues) => {
    if (!session?.user.id) return

    setIsSaving(true)
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: session.user.id,
        username: values.username,
        full_name: values.full_name,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })

      await fetchProfile()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!session) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-xl font-bold mb-4">Sign in to view your profile</h2>
        <p className="text-gray-400 mb-6">You need to be signed in to view and edit your profile</p>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setAuthModalOpen(true)}>
          Sign In
        </Button>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center">
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url || "/placeholder.svg"}
                alt="Profile avatar"
                width={96}
                height={96}
                className="rounded-full"
              />
            ) : (
              <UserCircle className="h-16 w-16 text-gray-600" />
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold">{profile?.username || "User"}</h2>
            <p className="text-gray-400 mb-4">{profile?.full_name || "JioCinema User"}</p>
            <p className="text-gray-400 text-sm">
              Member since {new Date(profile?.created_at || "").toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-gray-900 border border-gray-800 mb-6">
          <TabsTrigger value="profile" className="gap-2">
            <UserCircle className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="h-4 w-4" /> Watch History
          </TabsTrigger>
          <TabsTrigger value="likes" className="gap-2">
            <Heart className="h-4 w-4" /> Liked Content
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Edit2 className="h-5 w-5 mr-2 text-blue-500" /> Edit Profile
            </h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="username"
                          {...field}
                          disabled={isSaving}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your full name"
                          {...field}
                          disabled={isSaving}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <History className="h-5 w-5 mr-2 text-blue-500" /> Watch History
            </h3>
            <WatchHistoryList />
          </div>
        </TabsContent>

        <TabsContent value="likes" className="space-y-6">
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-500" /> Liked Content
            </h3>
            <LikedContentList />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

