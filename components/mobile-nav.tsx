"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Menu,
  Home,
  Film,
  Tv,
  Flame,
  List,
  User,
  Info,
  HelpCircle,
  FileText,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden" aria-label="Open Menu">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-gray-900 border-gray-800 text-white p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                JioCinema
              </h1>
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 overflow-auto py-4">
            <ul className="space-y-1 px-2">
              <li>
                <Link
                  href="/home"
                  className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-800 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Home className="h-5 w-5 text-blue-400" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/movies"
                  className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-800 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Film className="h-5 w-5 text-purple-400" />
                  <span>Movies</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/shows"
                  className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-800 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Tv className="h-5 w-5 text-green-400" />
                  <span>TV Shows</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/trending"
                  className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-800 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Flame className="h-5 w-5 text-orange-400" />
                  <span>Trending</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/watchlist"
                  className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-800 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <List className="h-5 w-5 text-yellow-400" />
                  <span>My Watchlist</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-800 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <User className="h-5 w-5 text-pink-400" />
                  <span>Profile</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer Links */}
          <div className="p-4 border-t border-gray-800">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Info className="h-4 w-4" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Help Center</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <FileText className="h-4 w-4" />
                  <span>Terms of Use</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}