import Image from "next/image"
import Link from "next/link"
import { Play, Star } from "lucide-react"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { fetchTMDB } from "@/lib/tmdb"
import { SearchBar } from "@/components/search-bar"
import { MobileNav } from "@/components/mobile-nav"

export async function generateMetadata({ searchParams }: { searchParams: { q: string } }): Promise<Metadata> {
  const query = searchParams.q || ""

  return {
    title: query ? `Search results for "${query}"` : "Search Movies and TV Shows",
    description: query
      ? `Browse search results for "${query}" - find movies, TV shows and more on JioStream`
      : "Search for your favorite movies, TV shows, actors and more on JioStream",
    openGraph: {
      title: query ? `Search results for "${query}" | JioStream` : "Search | JioStream",
      description: query
        ? `Browse search results for "${query}" - find movies, TV shows and more on JioStream`
        : "Search for your favorite movies, TV shows, actors and more on JioStream",
    },
    twitter: {
      title: query ? `Search results for "${query}" | JioStream` : "Search | JioStream",
      description: query
        ? `Browse search results for "${query}" - find movies, TV shows and more on JioStream`
        : "Search for your favorite movies, TV shows, actors and more on JioStream",
    },
  }
}

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q || ""

  if (!query) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
          <div className="container flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4">
            <div className="flex items-center gap-4">
              <MobileNav />
              <Link href="/" className="flex items-center">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  JioStream
                </h1>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/home" className="text-sm font-medium hover:text-blue-400 transition">
                Home
              </Link>
              <Link href="/movies" className="text-sm font-medium hover:text-blue-400 transition">
                Movies
              </Link>
              <Link href="/shows" className="text-sm font-medium hover:text-blue-400 transition">
                TV Shows
              </Link>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <SearchBar />
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 px-2 md:px-3 h-8">
                <span className="hidden sm:inline">Sign In</span>
                <span className="sm:hidden">Sign</span>
              </Button>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center px-4 max-w-lg mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Search for Movies and TV Shows</h1>
            <p className="text-gray-400 mb-8">Enter a search term to find your favorite movies, TV shows, and more</p>
            <div className="max-w-md mx-auto">
              <SearchBar initialQuery="" />
            </div>
            <div className="mt-8">
              <Link href="/home">
                <Button className="bg-blue-600 hover:bg-blue-700">Browse Content</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const data = await fetchTMDB("search/multi", { query })
  const results = data.results.filter(
    (item: any) =>
      (item.media_type === "movie" || item.media_type === "tv") && (item.poster_path || item.backdrop_path),
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4">
          <div className="flex items-center gap-4">
            <MobileNav />
            <Link href="/" className="flex items-center">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                JioStream
              </h1>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/home" className="text-sm font-medium hover:text-blue-400 transition">
              Home
            </Link>
            <Link href="/movies" className="text-sm font-medium hover:text-blue-400 transition">
              Movies
            </Link>
            <Link href="/shows" className="text-sm font-medium hover:text-blue-400 transition">
              TV Shows
            </Link>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <SearchBar initialQuery={query} />
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 px-2 md:px-3 h-8">
              <span className="hidden sm:inline">Sign In</span>
              <span className="sm:hidden">Sign</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-3 sm:px-4 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">Search Results for "{query}"</h1>

        {results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No results found for "{query}"</p>
            <p className="text-gray-500 mt-2">Try a different search term</p>
            <div className="mt-8">
              <Link href="/home">
                <Button className="bg-blue-600 hover:bg-blue-700">Browse Content</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-3 md:gap-4">
            {results.map((item: any) => (
              <Link
                key={item.id}
                href={`/${item.media_type === "tv" ? "show" : "movie"}/${item.id}`}
                className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-900/20"
              >
                <div className="aspect-[2/3] bg-gray-800 relative rounded-lg overflow-hidden">
                  {item.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title || item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      {(item.title || item.name || "").charAt(0)}
                    </div>
                  )}

                  {/* Gradient overlay that appears on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 h-8 w-8 sm:h-9 sm:w-9"
                    >
                      <Play className="h-4 w-4 fill-white" />
                    </Button>
                  </div>

                  {/* Content that appears on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-medium text-white truncate text-xs sm:text-sm">{item.title || item.name}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-300 mt-1">
                      <span>{new Date(item.release_date || item.first_air_date || "").getFullYear() || "New"}</span>
                      {item.vote_average && (
                        <span className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 mr-1 fill-yellow-400" />
                          {item.vote_average.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>

                  <Badge className="absolute top-1 left-1 bg-gray-800 hover:bg-gray-700 text-[10px] px-1.5 py-0.5">
                    {item.media_type === "tv" ? "TV" : "Movie"}
                  </Badge>
                  {item.vote_average > 7.5 && (
                    <Badge className="absolute top-1 right-1 bg-blue-600 hover:bg-blue-700 text-[10px] px-1.5 py-0.5">
                      Top
                    </Badge>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

