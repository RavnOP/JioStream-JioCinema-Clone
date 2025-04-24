import Link from "next/link"
import type { Metadata } from "next"
import { Home, Search } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page Not Found | JioStream",
  description:
    "The page you're looking for doesn't exist. Return to JioStream homepage to continue streaming movies and TV shows.",
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Go to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-gray-700 hover:bg-gray-800">
            <Link href="/search">
              <Search className="mr-2 h-4 w-4" /> Search Content
            </Link>
          </Button>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-500">
            Looking for something specific? Try searching for your favorite movie or TV show.
          </p>
        </div>
      </div>
    </div>
  )
}

