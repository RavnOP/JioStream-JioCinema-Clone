"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut, UserCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"
import { AuthModal } from "@/components/auth/auth-modal"

interface AuthButtonProps {
  landingPage?: boolean
  size?: "default" | "sm" | "lg"
}

export function AuthButton({ landingPage = false, size = "sm" }: AuthButtonProps) {
  const { session, signOut, isLoading } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.refresh()

    // If on landing page, stay there
    if (!landingPage) {
      router.push("/")
    }
  }

  // Don't show anything while loading to prevent flashing
  if (isLoading) {
    return (
      <Button
        size={size}
        className={`${landingPage ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700 px-2 md:px-3 h-8"}`}
        disabled
      >
        <span className="hidden sm:inline">Sign In</span>
        <span className="sm:hidden">Sign</span>
      </Button>
    )
  }

  if (!session) {
    return (
      <>
        <Button
          size={size}
          className={`${landingPage ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700 px-2 md:px-3 h-8"}`}
          onClick={() => setAuthModalOpen(true)}
        >
          <span className="hidden sm:inline">Sign In</span>
          <span className="sm:hidden">Sign</span>
        </Button>

        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full p-0 relative">
          <UserCircle className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800 text-white">
        <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer hover:bg-gray-800">
          <UserCircle className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/watchlist")} className="cursor-pointer hover:bg-gray-800">
          <span>My Watchlist</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-800" />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer hover:bg-gray-800">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

