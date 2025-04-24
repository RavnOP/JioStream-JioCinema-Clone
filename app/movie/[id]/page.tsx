import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Clock, Play } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MovieRow } from "@/components/movie-row"
import { ShareModal } from "@/components/share-modal"
import { WatchlistButton } from "@/components/watchlist-button"
import { LikeButton } from "@/components/like-button"
import { Header } from "@/app/header"
import { fetchTMDB } from "@/lib/tmdb"
import { VideoPlayer } from "@/components/video-player"
import { VideoProgressTracker } from "@/components/video-progress-tracker"
import { CommentSection } from "@/components/comments/comment-section"
import { LoadingSpinner } from "@/components/loading-spinner"

// Metadata generation with proper error handling
export async function generateMetadata({ params }: { params: { id: string } }) {
  if (!params.id) {
    return {
      title: "Movie | JioStream",
      description: "Watch movies on JioStream",
    }
  }

  const id = params.id

  try {
    const movie = await fetchTMDB(`movie/${id}`)
    return {
      title: `${movie.title} | JioStream`,
      description: movie.overview,
      openGraph: {
        title: `${movie.title} | JioStream`,
        description: movie.overview,
        images: [
          {
            url: movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
              : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            width: 1280,
            height: 720,
            alt: movie.title,
          },
        ],
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Movie | JioStream",
      description: "Watch movies on JioStream",
    }
  }
}

// Format runtime to hours and minutes
function formatRuntime(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}m`
}

export default async function MoviePage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { tab?: string }
}) {
  // Early validation of params
  if (!params.id) {
    notFound()
  }

  const id = params.id
  const tabParam = searchParams.tab || "about" // Default to about tab if not specified

  try {
    // Fetch data with proper error handling and timeouts
    const [movie, credits, videos] = await Promise.all([
      fetchTMDB(`movie/${id}`).catch((error) => {
        console.error(`Error fetching movie data for ID ${id}:`, error)
        return {
          title: "Unknown Movie",
          overview: "Information unavailable",
          genres: [],
          release_date: "",
          poster_path: "",
          backdrop_path: "",
        }
      }),
      fetchTMDB(`movie/${id}/credits`).catch((error) => {
        console.error(`Error fetching credits for ID ${id}:`, error)
        return { cast: [], crew: [] }
      }),
      fetchTMDB(`movie/${id}/videos`).catch((error) => {
        console.error(`Error fetching videos for ID ${id}:`, error)
        return { results: [] }
      }),
    ])

    const trailer =
      videos.results?.find((video: any) => video.type === "Trailer" && video.site === "YouTube") || videos.results?.[0]

    const director = credits.crew?.find((person: any) => person.job === "Director")
    const cast = credits.cast?.slice(0, 8) || []

    return (
      <div className="min-h-screen bg-black text-white pb-16 md:pb-0">
        <Header />

        {/* Hero section with optimized images */}
        <div className="relative h-[60vh] sm:h-[70vh] min-h-[400px] w-full">
          <div className="absolute inset-0">
            {movie.backdrop_path || movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
                alt={movie.title}
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

          <div className="relative h-full container flex items-end pb-8 sm:pb-12 px-4">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <div className="hidden md:block w-56 lg:w-64 h-80 lg:h-96 relative flex-shrink-0 rounded-md overflow-hidden">
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 256px"
                    className="object-cover"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">{movie.title?.charAt(0) || "?"}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 sm:space-y-4 max-w-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">{movie.title}</h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-300">
                  {movie.release_date && <span>{new Date(movie.release_date).getFullYear()}</span>}
                  {movie.vote_average && (
                    <span className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                      {movie.vote_average.toFixed(1)}
                    </span>
                  )}
                  {movie.runtime && (
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatRuntime(movie.runtime)}
                    </span>
                  )}
                  <span>{movie.adult ? "18+" : "13+"}</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-1 sm:mt-2">
                  {movie.genres &&
                    movie.genres.map((genre: any) => (
                      <Badge key={genre.id} variant="outline" className="rounded-sm">
                        {genre.name}
                      </Badge>
                    ))}
                </div>

                <p className="text-gray-300 text-sm sm:text-base line-clamp-3 md:line-clamp-none">{movie.overview}</p>

                <div className="pt-1 sm:pt-2 hidden md:block">
                  {director && (
                    <p className="text-gray-400 mb-1">
                      <span className="font-medium text-gray-300">Director:</span> {director.name}
                    </p>
                  )}
                  {cast.length > 0 && (
                    <p className="text-gray-400">
                      <span className="font-medium text-gray-300">Cast:</span>{" "}
                      {cast.map((person: any) => person.name).join(", ")}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-md px-4 sm:px-6 py-2 flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-red-700/20"
                    asChild
                  >
                    <Link href={`/movie/${id}?tab=watch`}>
                      <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                      <span>Watch Now</span>
                    </Link>
                  </Button>
                  <WatchlistButton contentId={id} contentType="movie" />
                  <div className="flex items-center gap-2">
                    <ShareModal title={movie.title} />
                    <LikeButton contentId={id} contentType="movie" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content tabs with lazy loading - improved for mobile */}
        <div className="container px-4 py-12 mx-auto">
  <Tabs defaultValue={tabParam} className="w-full">
    <div className="overflow-x-auto pb-2 w-full flex justify-center">
      <TabsList className="bg-gray-900 border border-gray-800 mb-6 inline-flex mx-auto">
                <TabsTrigger value="watch" data-value="watch" className="text-xs sm:text-sm">
                  Watch
                </TabsTrigger>
                <TabsTrigger value="about" className="text-xs sm:text-sm">
                  About
                </TabsTrigger>
                <TabsTrigger value="trailer" className="text-xs sm:text-sm">
                  Trailer
                </TabsTrigger>
                <TabsTrigger value="more" className="text-xs sm:text-sm">
                  Similar
                </TabsTrigger>
                <TabsTrigger value="comments" className="text-xs sm:text-sm">
                  Comments
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="watch" className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold">Watch {movie.title}</h2>
                <p className="text-gray-400">Enjoy your movie!</p>
                <Suspense
                  fallback={
                    <div className="text-center py-8 flex flex-col items-center">
                      <LoadingSpinner size="large" />
                      <p className="mt-4">Loading player...</p>
                    </div>
                  }
                >
                  <div className="video-player-container">
                    <VideoPlayer type="movie" tmdbId={Number.parseInt(id, 10)} title={movie.title} />
                    <VideoProgressTracker
                      contentId={id}
                      contentType="movie"
                      title={movie.title}
                      poster_path={movie.poster_path}
                    />
                  </div>
                </Suspense>
              </div>
            </TabsContent>

            <TabsContent value="about" className="space-y-6 sm:space-y-8">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Synopsis</h3>
                  <p className="text-gray-300">{movie.overview}</p>

                  <div className="mt-5 sm:mt-6 space-y-2 sm:space-y-3">
                    <p className="text-gray-400">
                      <span className="font-medium text-gray-300">Original Title:</span>{" "}
                      {movie.original_title || movie.title}
                    </p>
                    {movie.release_date && (
                      <p className="text-gray-400">
                        <span className="font-medium text-gray-300">Release Date:</span> {movie.release_date}
                      </p>
                    )}
                    {movie.original_language && (
                      <p className="text-gray-400">
                        <span className="font-medium text-gray-300">Original Language:</span>{" "}
                        {movie.original_language.toUpperCase()}
                      </p>
                    )}
                    {movie.budget > 0 && (
                      <p className="text-gray-400">
                        <span className="font-medium text-gray-300">Budget:</span> ${movie.budget.toLocaleString()}
                      </p>
                    )}
                    {movie.revenue > 0 && (
                      <p className="text-gray-400">
                        <span className="font-medium text-gray-300">Revenue:</span> ${movie.revenue.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Cast & Crew</h3>
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

            <TabsContent value="trailer">
              {trailer ? (
                <div className="aspect-video w-full max-w-3xl mx-auto">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={trailer.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                    loading="lazy"
                  ></iframe>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">No trailer available</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="more" className="space-y-6 sm:space-y-8">
              <Suspense fallback={<div className="h-40 w-full bg-gray-800 animate-pulse rounded-lg"></div>}>
                <MovieRow title="Similar Movies" endpoint={`movie/${id}/similar`} />
              </Suspense>
              <Suspense fallback={<div className="h-40 w-full bg-gray-800 animate-pulse rounded-lg"></div>}>
                <MovieRow title="Recommended" endpoint={`movie/${id}/recommendations`} />
              </Suspense>
            </TabsContent>

            <TabsContent value="comments" className="space-y-6 sm:space-y-8">
              <Suspense fallback={<div className="h-40 w-full bg-gray-800 animate-pulse rounded-lg"></div>}>
                <CommentSection contentId={id} contentType="movie" />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading movie:", error)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Failed to load movie</h1>
          <p className="text-gray-400 mb-6">We couldn't load the movie information. Please try again later.</p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    )
  }
}

