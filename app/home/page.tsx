import { Suspense } from "react";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeaturedMovie } from "@/components/featured-movie";
import { MovieRow } from "@/components/movie-row";
import { Header } from "@/app/header";

import { Flame, Clapperboard, Tv2 } from "lucide-react";

export const metadata: Metadata = {
  title: "JioStream - Home | Watch Movies, TV Shows, and more",
  description: "Stream the latest movies, TV shows, and premium content on JioStream.",
  keywords: "JioStream, movies, TV shows, streaming, watch online",
};
export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pb-8">
        <Suspense
          fallback={
            <div className="relative w-full max-w-[calc(100vw-32px)] h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-gray-900 rounded-xl sm:rounded-3xl overflow-hidden mx-auto animate-pulse" />
          }
        >
          <FeaturedMovie />
        </Suspense>

        <div className="w-full max-w-[calc(100vw-32px)] mx-auto mt-6 sm:mt-8 space-y-8 sm:space-y-10">
          <Tabs defaultValue="trending" className="w-full">
            <div className="overflow-x-auto pb-2 w-full mx-auto flex justify-center">
              <TabsList className="bg-gray-900 border border-gray-800 mb-6 inline-flex mx-auto gap-1">
                <TabsTrigger value="trending" className="flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="movies" className="flex items-center gap-2">
                  <Clapperboard className="w-4 h-4" />
                  Movies
                </TabsTrigger>
                <TabsTrigger value="shows" className="flex items-center gap-2">
                  <Tv2 className="w-4 h-4" />
                  TV Shows
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="trending" className="space-y-8">
              <Suspense fallback={<MovieRowSkeleton title="Trending Now" />}>
                <MovieRow
                  title="Trending Now"
                  endpoint="trending/all/day"
                  viewAllLink="/trending"
                />
              </Suspense>
              <Suspense fallback={<MovieRowSkeleton title="Popular Movies" />}>
                <MovieRow
                  title="Popular Movies"
                  endpoint="movie/popular"
                  viewAllLink="/movies"
                />
              </Suspense>
              <Suspense fallback={<MovieRowSkeleton title="Top Rated" />}>
                <MovieRow
                  title="Top Rated"
                  endpoint="movie/top_rated"
                  viewAllLink="/movies"
                />
              </Suspense>
            </TabsContent>
            <TabsContent value="movies" className="space-y-8">
              <Suspense fallback={<MovieRowSkeleton title="Popular Movies" />}>
                <MovieRow
                  title="Popular Movies"
                  endpoint="movie/popular"
                  viewAllLink="/movies"
                />
              </Suspense>
              <Suspense fallback={<MovieRowSkeleton title="Now Playing" />}>
                <MovieRow
                  title="Now Playing"
                  endpoint="movie/now_playing"
                  viewAllLink="/movies/now-playing"
                />
              </Suspense>
              <Suspense fallback={<MovieRowSkeleton title="Upcoming Movies" />}>
                <MovieRow
                  title="Upcoming Movies"
                  endpoint="movie/upcoming"
                  viewAllLink="/movies/upcoming"
                />
              </Suspense>
            </TabsContent>
            <TabsContent value="shows" className="space-y-8">
              <Suspense fallback={<MovieRowSkeleton title="Popular TV Shows" />}>
                <MovieRow
                  title="Popular TV Shows"
                  endpoint="tv/popular"
                  viewAllLink="/shows"
                />
              </Suspense>
              <Suspense fallback={<MovieRowSkeleton title="Top Rated Shows" />}>
                <MovieRow
                  title="Top Rated Shows"
                  endpoint="tv/top_rated"
                  viewAllLink="/shows/top-rated"
                />
              </Suspense>
              <Suspense fallback={<MovieRowSkeleton title="On Air Today" />}>
                <MovieRow
                  title="On Air Today"
                  endpoint="tv/airing_today"
                  viewAllLink="/shows/airing-today"
                />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

function MovieRowSkeleton({ title }: { title: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
        <Button variant="link" size="sm" className="text-blue-400 h-8 px-2">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4">
        {Array(16)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-[2/3] rounded-lg bg-gray-800" />
            </div>
          ))}
      </div>
    </div>
  );
}