import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Play, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchTMDB } from "@/lib/tmdb"
import { Header } from "@/app/header"
import { SearchBar } from "@/components/search-bar"
import { MobileNav } from "@/components/mobile-nav"

export const metadata = {
  title: "Trending | JioStream",
  description: "Browse trending content on JioStream",
}

export default function TrendingPage({ searchParams }: { searchParams: { page?: string; time?: string } }) {
  const currentPage = Number(searchParams.page) || 1
  const timeWindow = searchParams.time === "week" ? "week" : "day"

  return (
  <div className="min-h-screen bg-black text-white">
        <Header />

      <div className="container px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex items-center mb-4 sm:mb-6">
          <Link href="/" className="mr-2 text-gray-400 hover:text-white">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold">Trending</h1>
          <div className="ml-auto flex gap-2">
            <Link
              href="/trending?time=day"
              className={`text-sm px-3 py-1 rounded-full ${timeWindow === "day" ? "bg-blue-600" : "bg-gray-800"}`}
            >
              Today
            </Link>
            <Link
              href="/trending?time=week"
              className={`text-sm px-3 py-1 rounded-full ${timeWindow === "week" ? "bg-blue-600" : "bg-gray-800"}`}
            >
              This Week
            </Link>
          </div>
        </div>

        <Suspense fallback={<TrendingGridSkeleton />}>
          <TrendingGrid timeWindow={timeWindow} page={currentPage} />
        </Suspense>
      </div>
    </div>
  )
}
async function TrendingGrid({ timeWindow, page = 1 }: { timeWindow: string; page: number }) {
  // Calculate the actual API pages we need to fetch
  const firstPage = Math.ceil(page * 2 - 1);
  const secondPage = firstPage + 1;

  // Fetch two pages in parallel
  const [firstPageData, secondPageData] = await Promise.all([
    fetchTMDB(`trending/all/${timeWindow}`, { page: firstPage.toString() }),
    fetchTMDB(`trending/all/${timeWindow}`, { page: secondPage.toString() })
  ]);

  // Combine results from both pages
  const combinedResults = [
    ...(firstPageData.results || []),
    ...(secondPageData.results || [])
  ];

  // Calculate total pages (divide by 2 since we're showing 2 pages worth of content)
  const totalPages = Math.ceil((firstPageData.total_pages || 1) / 2);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3 md:gap-4">
        {combinedResults.length > 0 ? (
          combinedResults.map((item: any) => {
            const isTV = item.media_type === "tv"
            return (
              <Link
                key={item.id}
                href={`/${isTV ? "show" : "movie"}/${item.id}`}
                className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-900/20"
              >
                <div className="aspect-[2/3] bg-gray-800 relative rounded-lg overflow-hidden">
                  {item.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title || item.name}
                      fill
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
                    {isTV ? "TV" : "Movie"}
                  </Badge>
                </div>
              </Link>
            )
          })
        ) : (
          <div className="col-span-full text-center py-12 text-gray-400">No trending content found</div>
        )}
      </div>

      <Pagination currentPage={page} totalPages={Math.min(totalPages, 20)} timeWindow={timeWindow} />
    </div>
  )
}

function Pagination({
  currentPage,
  totalPages,
  timeWindow,
}: { currentPage: number; totalPages: number; timeWindow: string }) {
  return (
    <div className="flex justify-center items-center gap-1 py-4 sm:py-6 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        className="border-gray-700 h-8 px-2 text-xs"
        asChild
      >
        <Link href={`/trending?page=${Math.max(1, currentPage - 1)}&time=${timeWindow}`}>Prev</Link>
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNum = i + 1
          const isActive = pageNum === currentPage

          return (
            <Button
              key={i}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className={`${isActive ? "bg-blue-600 hover:bg-blue-700" : "border-gray-700"} h-8 w-8 p-0 text-xs`}
              asChild
            >
              <Link href={`/trending?page=${pageNum}&time=${timeWindow}`}>{pageNum}</Link>
            </Button>
          )
        })}

        {totalPages > 5 && (
          <>
            <span className="text-gray-500">...</span>
            <Button variant="outline" size="sm" className="border-gray-700 h-8 w-8 p-0 text-xs" asChild>
              <Link href={`/trending?page=${totalPages}&time=${timeWindow}`}>{totalPages}</Link>
            </Button>
          </>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage >= totalPages}
        className="border-gray-700 h-8 px-2 text-xs"
        asChild
      >
        <Link href={`/trending?page=${Math.min(totalPages, currentPage + 1)}&time=${timeWindow}`}>Next</Link>
      </Button>
    </div>
  )
}

function TrendingGridSkeleton() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3 md:gap-4">
      {Array(40)
        .fill(0)
        .map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-[2/3] rounded-lg bg-gray-800" />
          </div>
        ))}
    </div>
  )
}

