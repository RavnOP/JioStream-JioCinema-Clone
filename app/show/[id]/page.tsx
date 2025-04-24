import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Play } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MovieRow } from "@/components/movie-row"
import { SeasonSelector } from "@/components/season-selector"
import { ShareModal } from "@/components/share-modal"
import { WatchlistButton } from "@/components/watchlist-button"
import { LikeButton } from "@/components/like-button"
import { Header } from "@/app/header"
import { fetchTMDB } from "@/lib/tmdb"
import { VideoProgressTracker } from "@/components/video-progress-tracker"
import { CommentSection } from "@/components/comments/comment-section"
import { LoadingSpinner } from "@/components/loading-spinner"

// Define types for better type safety
interface ShowPageProps {
  params: {
    id: string
  }
  searchParams: {
    season?: string
    episode?: string
    tab?: string
  }
}

// Metadata generation with proper error handling
export async function generateMetadata({ params }: { params: { id: string } }) {
  if (!params.id) {
    return {
      title: "TV Show | JioStream",
      description: "Watch TV shows on JioStream",
    }
  }

  const id = params.id

  try {
    const show = await fetchTMDB(`tv/${id}`)
    return {
      title: `${show.name} | JioStream`,
      description: show.overview,
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "TV Show | JioStream",
      description: "Watch TV shows on JioStream",
    }
  }
}

// Main component with proper error handling and optimizations
export default async function ShowPage({ params, searchParams }: ShowPageProps) {
  // Early validation of params
  if (!params.id) {
    notFound()
  }

  const id = params.id
  const seasonParam = searchParams.season
  const episodeParam = searchParams.episode
  const tabParam = searchParams.tab || "about" // Default to about tab if not specified

  // Default to first season and episode if not specified
  const seasonNumber = seasonParam ? Number.parseInt(seasonParam, 10) : 1
  const episodeNumber = episodeParam ? Number.parseInt(episodeParam, 10) : 1

  try {
    // Fetch data with proper error handling and timeouts
    const [show, credits, videos] = await Promise.all([
      fetchTMDB(`tv/${id}`).catch((error) => {
        console.error(`Error fetching show data for ID ${id}:`, error)
        return {
          name: "Unknown Show",
          overview: "Information unavailable",
          seasons: [],
          first_air_date: "",
          genres: [],
          poster_path: "",
          backdrop_path: "",
        }
      }),
      fetchTMDB(`tv/${id}/credits`).catch((error) => {
        console.error(`Error fetching credits for ID ${id}:`, error)
        return { cast: [] }
      }),
      fetchTMDB(`tv/${id}/videos`).catch((error) => {
        console.error(`Error fetching videos for ID ${id}:`, error)
        return { results: [] }
      }),
    ])

    

    const creator = show.created_by?.[0]
    const cast = credits.cast?.slice(0, 8) || []

    // Get all seasons (excluding season 0 which is usually specials)
    const seasons = show.seasons?.filter((season: any) => season.season_number > 0) || []

    return (
      <div className="min-h-screen bg-black text-white pb-16 md:pb-0">
        <Header />

        {/* Hero section with optimized images */}
        <div className="relative h-[70vh] min-h-[500px] w-full">
          <div className="absolute inset-0">
            {show.backdrop_path || show.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/original${show.backdrop_path || show.poster_path}`}
                alt={show.name}
                fill
                sizes="100vw"
                className="object-cover"
                priority
                loading="eager"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHq4C7ygAAAABJRU5ErkJggg=="
              />
            ) : (
              <div className="w-full h-full bg-gray-900"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          </div>

          <Link href="/" className="absolute top-4 left-4 z-10 bg-black/50 p-2 rounded-full backdrop-blur-sm">
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div className="relative h-full container flex items-end pb-12 px-4">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="hidden md:block w-64 h-96 relative flex-shrink-0 rounded-md overflow-hidden">
                {show.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path || show.backdrop_path}`}
                    alt={show.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 256px"
                    className="object-cover"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">{show.name?.charAt(0) || "?"}</span>
                  </div>
                )}
              </div>

              <div className="space-y-4 max-w-2xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{show.name}</h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-300">
                  {show.first_air_date && <span>{new Date(show.first_air_date).getFullYear()}</span>}
                  {show.vote_average && (
                    <span className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                      {show.vote_average.toFixed(1)}
                    </span>
                  )}
                  <span>
                    {show.number_of_seasons || 0} Season{show.number_of_seasons !== 1 ? "s" : ""}
                  </span>
                  <span>{show.adult ? "18+" : "13+"}</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {show.genres &&
                    show.genres.map((genre: any) => (
                      <Badge key={genre.id} variant="outline" className="rounded-sm">
                        {genre.name}
                      </Badge>
                    ))}
                </div>

                <p className="text-gray-300 line-clamp-3 md:line-clamp-none">{show.overview}</p>

                <div className="pt-2 hidden md:block">
                  {creator && (
                    <p className="text-gray-400 mb-1">
                      <span className="font-medium text-gray-300">Creator:</span> {creator.name}
                    </p>
                  )}
                  {cast.length > 0 && (
                    <p className="text-gray-400">
                      <span className="font-medium text-gray-300">Cast:</span>{" "}
                      {cast.map((person: any) => person.name).join(", ")}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-md px-6 py-2 flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-red-700/20"
                    asChild
                  >
                    <Link href={`/show/${id}?tab=watch`}>
                      <Play className="h-5 w-5 fill-current" />
                      <span>Watch Now</span>
                    </Link>
                  </Button>
                  <WatchlistButton contentId={id} contentType="tv" />
                  <div className="flex items-center gap-2">
                    <ShareModal title={show.name} />
                    <LikeButton contentId={id} contentType="tv" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content tabs with lazy loading */}
        <div className="container px-4 py-12 mx-auto">
  <Tabs defaultValue={tabParam} className="w-full">
    <div className="overflow-x-auto pb-2 w-full flex justify-center">
      <TabsList className="bg-gray-900 border border-gray-800 mb-6 inline-flex mx-auto">
                <TabsTrigger value="episodes" className="text-sm">
                  Episodes
                </TabsTrigger>
                <TabsTrigger value="watch" data-value="watch" className="text-sm">
                  Watch
                </TabsTrigger>
                <TabsTrigger value="about" className="text-sm">
                  About
                </TabsTrigger>
                
                <TabsTrigger value="more" className="text-sm">
                  Similar
                </TabsTrigger>
                <TabsTrigger value="comments" className="text-sm">
                  Comments
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="episodes" className="space-y-8">
              <Suspense
                fallback={
                  <div className="text-center py-8 flex flex-col items-center">
                    <LoadingSpinner size="large" />
                    <p className="mt-4">Loading seasons...</p>
                  </div>
                }
              >
                <SeasonSelector showId={Number.parseInt(id, 10)} seasons={seasons} showName={show.name} />
              </Suspense>
            </TabsContent>

            <TabsContent value="watch" className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold">Watch {show.name}</h2>
                <p className="text-gray-400">Select a season and episode below to start watching.</p>
                <Suspense
                  fallback={
                    <div className="text-center py-8 flex flex-col items-center">
                      <LoadingSpinner size="large" />
                      <p className="mt-4">Loading player...</p>
                    </div>
                  }
                >
                  <div className="video-player-container">
                    <SeasonSelector
                      showId={Number.parseInt(id, 10)}
                      seasons={seasons}
                      showName={show.name}
                      withPlayer={true}
                      initialSeason={seasonNumber}
                      initialEpisode={episodeNumber}
                    />
                    <VideoProgressTracker
                      contentId={id}
                      contentType="tv"
                      title={show.name}
                      poster_path={show.poster_path}
                      seasonNumber={seasonNumber}
                      episodeNumber={episodeNumber}
                    />
                  </div>
                </Suspense>
              </div>
            </TabsContent>

            <TabsContent value="about" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Synopsis</h3>
                  <p className="text-gray-300">{show.overview}</p>

                  <div className="mt-6 space-y-3">
                    <p className="text-gray-400">
                      <span className="font-medium text-gray-300">Original Name:</span>{" "}
                      {show.original_name || show.name}
                    </p>
                    {show.first_air_date && (
                      <p className="text-gray-400">
                        <span className="font-medium text-gray-300">First Air Date:</span> {show.first_air_date}
                      </p>
                    )}
                    {show.original_language && (
                      <p className="text-gray-400">
                        <span className="font-medium text-gray-300">Original Language:</span>{" "}
                        {show.original_language.toUpperCase()}
                      </p>
                    )}
                    <p className="text-gray-400">
                      <span className="font-medium text-gray-300">Number of Seasons:</span>{" "}
                      {show.number_of_seasons || 0}
                    </p>
                    <p className="text-gray-400">
                      <span className="font-medium text-gray-300">Number of Episodes:</span>{" "}
                      {show.number_of_episodes || 0}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Cast & Crew</h3>
                  {cast.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {cast.map((person: any) => (
                        <div key={person.id} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800">
                            {person.profile_path ? (
                              <Image
                                src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                                alt={person.name}
                                width={48}
                                height={48}
                                className="object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-500">
                                {person.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{person.name}</p>
                            <p className="text-sm text-gray-400">{person.character}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No cast information available</p>
                  )}
                </div>
              </div>
            </TabsContent>

           

            <TabsContent value="more" className="space-y-8">
              <Suspense fallback={<div className="h-40 w-full bg-gray-800 animate-pulse rounded-lg"></div>}>
                <MovieRow title="Similar Shows" endpoint={`tv/${id}/similar`} />
              </Suspense>
              <Suspense fallback={<div className="h-40 w-full bg-gray-800 animate-pulse rounded-lg"></div>}>
                <MovieRow title="Recommended" endpoint={`tv/${id}/recommendations`} />
              </Suspense>
            </TabsContent>

            <TabsContent value="comments" className="space-y-8">
              <Suspense fallback={<div className="h-40 w-full bg-gray-800 animate-pulse rounded-lg"></div>}>
                <CommentSection contentId={id} contentType="tv" />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading show:", error)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Failed to load TV show</h1>
          <p className="text-gray-400 mb-6">We couldn't load the TV show information. Please try again later.</p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    )
  }
}

