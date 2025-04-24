"use client"

import Link from "next/link"
import { SearchBar } from "@/components/search-bar"
import { MobileNav } from "@/components/mobile-nav"
import { AuthButton } from "@/components/auth/auth-button"
import { Home, Film, Tv, Flame, List, Search } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export function ClientHeader() {
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-black backdrop-blur-sm border-b border-gray-800">
      <div className="container flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4">
        <div className="flex items-center gap-4">
          <MobileNav />
          <Link href="/" className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              JioStream
            </h1>
          </Link>
        </div>
        
        {/* Desktop Navigation with Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="flex items-center gap-1 text-sm font-medium hover:text-blue-400 transition-colors duration-200">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link href="/movies" className="flex items-center gap-1 text-sm font-medium hover:text-blue-400 transition-colors duration-200">
            <Film className="w-4 h-4" />
            Movies
          </Link>
          <Link href="/shows" className="flex items-center gap-1 text-sm font-medium hover:text-blue-400 transition-colors duration-200">
            <Tv className="w-4 h-4" />
            TV Shows
          </Link>
          <Link href="/trending" className="flex items-center gap-1 text-sm font-medium hover:text-blue-400 transition-colors duration-200">
            <Flame className="w-4 h-4" />
            Trending
          </Link>
          <Link href="/watchlist" className="flex items-center gap-1 text-sm font-medium hover:text-blue-400 transition-colors duration-200">
            <List className="w-4 h-4" />
            Watchlist
          </Link>
        </div>
        
        {/* Search and Auth Section */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Desktop Search Bar (always visible) */}
          <div className="hidden md:block">
            <SearchBar />
          </div>
          
          {/* Mobile Search Icon (opens dialog) */}
          <button 
            onClick={() => setShowMobileSearch(true)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <AuthButton />
        </div>
      </div>
      
      {/* Mobile Search Dialog */}
      <Dialog open={showMobileSearch} onOpenChange={setShowMobileSearch}>
        <DialogContent className="sm:max-w-[425px] top-20 border-0 bg-gray-900 p-4">
          <SearchBar />
        </DialogContent>
      </Dialog>
    </header>
  )
}