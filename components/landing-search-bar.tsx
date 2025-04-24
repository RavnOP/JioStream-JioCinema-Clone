"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function LandingSearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          <Input
            type="search"
            placeholder="Search for movies, TV shows, actors..."
            className="w-full bg-gray-800/80 backdrop-blur-sm border-gray-700 text-white h-12 pl-10 pr-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search for content"
          />
        </div>
        <Button
          type="submit"
          className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 rounded-lg font-medium"
        >
          Search
        </Button>
      </div>
    </form>
  )
}

