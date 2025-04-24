"use client"

import { X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useRef } from "react"

export function MobileSearchModal({
  isOpen,
  onClose,
  query,
  setQuery,
  handleSearch,
}: {
  isOpen: boolean
  onClose: () => void
  query: string
  setQuery: (query: string) => void
  handleSearch: (e: React.FormEvent) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Search</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search movies, shows..."
          className="w-full pl-10 bg-gray-800 border-gray-700 text-white h-12 text-base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  )
}