"use client"

import Link from "next/link"
import { SearchBar } from "@/components/search-bar"
import { MobileNav } from "@/components/mobile-nav"
import { AuthButton } from "@/components/auth/auth-button"
import { Home, Film, Tv, Flame } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container flex items-center justify-between h-14 sm:h-16 px-4">
        {/* Left side - Logo and Mobile Nav */}
        <div className="flex items-center gap-2 sm:gap-4">
          <MobileNav />
          <Link href="/" className="flex items-center">
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              MoviesNation
            </h1>
          </Link>
        </div>

        {/* Center - Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-4 lg:space-x-6">
            <Link href="/home" className="flex items-center gap-1.5 text-sm font-medium hover:text-blue-400 transition">
              <Home className="w-4 h-4" />
              <span className="hidden lg:inline">Home</span>
            </Link>
            <Link href="/movies" className="flex items-center gap-1.5 text-sm font-medium hover:text-blue-400 transition">
              <Film className="w-4 h-4" />
              <span className="hidden lg:inline">Movies</span>
            </Link>
            <Link href="/shows" className="flex items-center gap-1.5 text-sm font-medium hover:text-blue-400 transition">
              <Tv className="w-4 h-4" />
              <span className="hidden lg:inline">TV Shows</span>
            </Link>
            <Link href="/trending" className="flex items-center gap-1.5 text-sm font-medium hover:text-blue-400 transition">
              <Flame className="w-4 h-4" />
              <span className="hidden lg:inline">Trending</span>
            </Link>
          </div>
        </nav>

        {/* Right side - Search and Auth */}
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          {/* Search Bar - visible on all screens */}
          <div className="hidden md:block md:w-[180px] lg:w-[220px] xl:w-[260px]">
            <SearchBar />
          </div>
          <div className="md:hidden">
            <SearchBar />
          </div>
          
          <AuthButton />
        </div>
      </div>
    </header>
  )
}