import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import {
  ChevronRight,
  Globe,
  SmartphoneIcon as DeviceMobile,
  Award,
  Github,
  Code,
  Film,
  Tv,
  Search,
  Heart,
  Star,
  Users,
  Bookmark,
  Play,
  Zap,
  Database,
  Shield,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { LandingSearchBar } from "@/components/landing-search-bar"
import { AuthButton } from "@/components/auth/auth-button"

// Add these imports
import { FAQSection } from "./faq-section"
import { DisclaimerSection } from "./disclaimer-section"

export const metadata: Metadata = {
  title: 'MoviesNation -Streaming Platform | Watch Movies & TV Shows',
  description: 'Open Source Streaming Platform',
  icons: {
    icon: [
      {
        url: '/play.png',
        sizes: 'any',
      },
      {
        url: '/play(1).png',
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    apple: {
      url: '/play.png',
      sizes: '180x180',
    },
  },

  keywords:
    "MoviesNation, open source, streaming platform, TMDB API, Supabase, Next.js, React, testing project, movie database, TV shows, streaming service, free movies, watch online",
  openGraph: {
    title: "Moviesnation - Open Source Streaming Platform | Watch Movies & TV Shows",
    description:
      "Moviesnation is an open source streaming platform demo built with Next.js, TMDB API, and Supabase. Explore movies and TV shows in this testing project.",
    url: "movienations.me",
    siteName: "Moviesnation",
    images: [
      {
        url: "/play.png",
        width: 1200,
        height: 630,
        alt: "MoviesNation - Open Source Streaming Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moviesnation - Open Source Streaming Platform | Watch Movies & TV Shows",
    description:
      "MoviesNation is an open source streaming platform demo built with Next.js, TMDB API, and Supabase. Explore movies and TV shows in this testing project.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/US-en-20250317-TRIFECTA-perspective_46e2ea88-09df-4e34-8e0c-2a2e8a2cda94_large.jpg-1QadysCtqt5zBwcjLYLXQi4aOUQub6.jpeg",
    ],
  },
  alternates: {
    canonical: "movienations.me",
    languages: {
      "en-US": "movienations.me/en-US",
    },
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="fixed w-full z-50 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              MoviesNation
            </h1>
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/home">
              <Button
                variant="outline"
                className="border-gray-700 hover:bg-gray-800 hover:text-white text-xs md:text-sm h-8 md:h-9"
              >
                <Film className="mr-2 h-4 w-4" /> Explore Content
              </Button>
            </Link>
            <AuthButton landingPage={true} />
          </div>
        </div>
      </header>

      {/* Hero Section with the provided image */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-purple-900/20 to-transparent z-20" />
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/US-en-20250317-TRIFECTA-perspective_46e2ea88-09df-4e34-8e0c-2a2e8a2cda94_large.jpg-1QadysCtqt5zBwcjLYLXQi4aOUQub6.jpeg"
            alt="Moviesnation streaming library with popular movies and TV shows"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={90}
          />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 pt-24 pb-16 md:py-0 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-sm mb-6">
              <Code size={14} />
              <span>Open Source Project</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Explore Movies & Shows with{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Moviesnation
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
              An open source streaming platform demo built with Next.js, TMDB API, and Supabase. For testing
              purposes only.
            </p>

            <div className="max-w-xl mx-auto mb-8 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
              </div>
              <LandingSearchBar />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/home">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto group">
                  Explore <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link
                href="https://github.com/RavnOP/Jio-Cinema-Clone-Webapp-Using-TMDB-API-and-Supabase-Database"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800 hover:text-white w-full sm:w-auto"
                >
                  <Github className="mr-2 h-4 w-4" /> GitHub Repo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

   

      {/* Explore Our Other Websites */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/10 via-purple-900/10 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">Explore Our Other Websites</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We also manage other exciting platforms related to movies and entertainment. Explore these sites for more
            content.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 text-center transition-all hover:scale-105 hover:shadow-xl border border-gray-700/50 hover:border-blue-500/30 group">
              <div className="mb-4 relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black/50 border-white/20 text-white hover:bg-white hover:text-black"
                  >
                    <Play className="mr-1 h-4 w-4" /> Preview
                  </Button>
                </div>
                <Image
                  src="/Screenshot 2025-04-24 125450.png"
                  alt="Movinations"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
                <Film className="h-5 w-5 text-blue-500" /> Movinations
              </h3>
              <p className="text-gray-300 mb-4">Discover an exciting world of movies with Movinations.</p>
              <Link href="https://app.movienations.me" target="_blank">
                <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
                  Visit Movinations
                </Button>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 text-center transition-all hover:scale-105 hover:shadow-xl border border-gray-700/50 hover:border-blue-500/30 group">
              <div className="mb-4 relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black/50 border-white/20 text-white hover:bg-white hover:text-black"
                  >
                    <Play className="mr-1 h-4 w-4" /> Preview
                  </Button>
                </div>
                <Image
                  src="/Screenshot 2025-04-24 135224.png"
                  alt="MovFlix"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
                <Tv className="h-5 w-5 text-blue-500" /> MovFlix
              </h3>
              <p className="text-gray-300 mb-4">Your favorite streaming platform for on-demand TV shows and movies.</p>
              <Link href="https://movflixnew.netlify.app" target="_blank">
                <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
                  Visit MovFlix
                </Button>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 text-center transition-all hover:scale-105 hover:shadow-xl border border-gray-700/50 hover:border-blue-500/30 group">
              <div className="mb-4 relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black/50 border-white/20 text-white hover:bg-white hover:text-black"
                  >
                    <Play className="mr-1 h-4 w-4" /> Preview
                  </Button>
                </div>
                <Image
                  src="/Screenshot 2025-04-23 113845.png"
                  alt="CinemaHub"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
                <Star className="h-5 w-5 text-blue-500" /> CinemaHub
              </h3>
              <p className="text-gray-300 mb-4">An awesome platform to explore more content related to movies and Tv Show with Download Feature.</p>
              <Link href="https://watch.movienations.me" target="_blank">
                <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
                  Visit CinemaHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
         {/* Features Highlight Section - New */}
         <section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-purple-900/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Premium Features
            </span>{" "}
            Without The Premium Price
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Film className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Extensive Library</h3>
              <p className="text-gray-300">Access thousands of movies and TV shows from various genres and eras.</p>
            </div>

            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bookmark className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Watchlist</h3>
              <p className="text-gray-300">
                Save your favorite content to watch later with our personalized watchlist feature.
              </p>
            </div>

            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Streaming</h3>
              <p className="text-gray-300">Experience smooth playback with our optimized streaming technology.</p>
            </div>

            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">User Profiles</h3>
              <p className="text-gray-300">Create multiple profiles for different members of your household.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Info Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-purple-900/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">About This Project</h2>
            <p className="text-gray-300">
              Moviesnation is an open source testing project that demonstrates how to build a streaming platform using
              modern web technologies. It uses TMDB API for movie and TV show data, Supabase for authentication, and
              embedded streaming URLs for video playback.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-xl p-6 text-center transition-all hover:scale-105 border border-gray-700/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">TMDB Integration</h3>
              <p className="text-gray-300">
                All movie and TV show data is sourced from The Movie Database (TMDB) API. No content is stored locally.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-xl p-6 text-center transition-all hover:scale-105 border border-gray-700/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <DeviceMobile className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Supabase Auth</h3>
              <p className="text-gray-300">
                User authentication is handled by Supabase. Only basic user information is stored for authentication
                purposes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-xl p-6 text-center transition-all hover:scale-105 border border-gray-700/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">testing Purpose</h3>
              <p className="text-gray-300">
                This project is for testing purposes only. It demonstrates modern web development techniques and
                best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/10 via-purple-900/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">Built With Modern Technologies</h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-700/50 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/10 group">
              <div className="h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
                  Next.js
                </span>
              </div>
              <p className="text-sm text-gray-300">React framework for production</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-700/50 hover:border-green-500/30 transition-all hover:shadow-lg hover:shadow-green-500/10 group">
              <div className="h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
                  TMDB API
                </span>
              </div>
              <p className="text-sm text-gray-300">Movie and TV show data</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-700/50 hover:border-yellow-500/30 transition-all hover:shadow-lg hover:shadow-yellow-500/10 group">
              <div className="h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
                  Supabase
                </span>
              </div>
              <p className="text-sm text-gray-300">Authentication and user data</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-700/50 hover:border-cyan-500/30 transition-all hover:shadow-lg hover:shadow-cyan-500/10 group">
              <div className="h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
                  Tailwind CSS
                </span>
              </div>
              <p className="text-sm text-gray-300">Utility-first CSS framework</p>
            </div>
          </div>

          {/* Additional Technologies */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-700/50 hover:border-red-500/30 transition-all hover:shadow-lg hover:shadow-red-500/10 group">
              <div className="h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
                  TypeScript
                </span>
              </div>
              <p className="text-sm text-gray-300">Type-safe JavaScript</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-700/50 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/10 group">
              <div className="h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
                  Vercel
                </span>
              </div>
              <p className="text-sm text-gray-300">Deployment platform</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-700/50 hover:border-orange-500/30 transition-all hover:shadow-lg hover:shadow-orange-500/10 group">
              <div className="h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
                  React
                </span>
              </div>
              <p className="text-sm text-gray-300">UI component library</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-700/50 hover:border-teal-500/30 transition-all hover:shadow-lg hover:shadow-teal-500/10 group">
              <div className="h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-green-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
                  SWR
                </span>
              </div>
              <p className="text-sm text-gray-300">Data fetching library</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-purple-900/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">How Moviesnation Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-24 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-xl p-6 text-center h-full border border-gray-700/50 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
                  <Search className="h-5 w-5 text-blue-500" /> Browse Content
                </h3>
                <p className="text-gray-300">
                  Browse movies and TV shows fetched from the TMDB API. Filter by genre, rating, and more.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-xl p-6 text-center h-full border border-gray-700/50 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" /> Create Account
                </h3>
                <p className="text-gray-300">
                  Sign up with Supabase authentication to save your watchlist, track progress, and personalize your
                  experience.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-xl p-6 text-center h-full border border-gray-700/50 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5 text-blue-500" /> Explore Features
                </h3>
                <p className="text-gray-300">
                  Discover how a modern streaming platform works with features like watchlist, continue watching, and
                  more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy Section - New */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/10 via-purple-900/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">Security & Privacy</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shrink-0">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Data Protection</h3>
                  <p className="text-gray-300 mb-4">
                    We take your privacy seriously. Moviesnation only stores minimal user data required for authentication
                    and user experience features through Supabase.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500/20 p-1 mt-0.5">
                        <Check className="h-3 w-3 text-blue-500" />
                      </div>
                      <span>No personal data is shared or sold to third parties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500/20 p-1 mt-0.5">
                        <Check className="h-3 w-3 text-blue-500" />
                      </div>
                      <span>All authentication is handled securely through Supabase</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500/20 p-1 mt-0.5">
                        <Check className="h-3 w-3 text-blue-500" />
                      </div>
                      <span>You can delete your account and data at any time</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shrink-0">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Technical Implementation</h3>
                  <p className="text-gray-300 mb-4">
                    Moviesnation is built with security in mind, using modern web development best practices.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500/20 p-1 mt-0.5">
                        <Check className="h-3 w-3 text-blue-500" />
                      </div>
                      <span>Secure API endpoints with proper authentication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500/20 p-1 mt-0.5">
                        <Check className="h-3 w-3 text-blue-500" />
                      </div>
                      <span>HTTPS encryption for all data transmission</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500/20 p-1 mt-0.5">
                        <Check className="h-3 w-3 text-blue-500" />
                      </div>
                      <span>Regular security updates and maintenance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DisclaimerSection />

      <FAQSection />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Moviesnation",
            url: "movienations.me",
            potentialAction: {
              "@type": "SearchAction",
              target: "movienations.me/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
            description:
              "Moviesnation is an open source streaming platform demo built with Next.js, TMDB API, and Supabase. Explore movies and TV shows in this testing project.",
          }),
        }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Moviesnation",
            url: "movienations.me",
            logo: "/play (1).png",
            description: "An open source testing project demonstrating streaming platform functionality",
            sameAs: ["https://github.com/RavnOP/Jio-Cinema-Clone-Webapp-Using-TMDB-API-and-Supabase-Database"],
          }),
        }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Moviesnation",
            applicationCategory: "WebApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description: "An open source testing project demonstrating streaming platform functionality",
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Moviesnation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Moviesnation is an open source testing project that demonstrates how to build a streaming platform using Next.js, TMDB API, and Supabase. It's designed for learning purposes only.",
                },
              },
              {
                "@type": "Question",
                name: "Is this a real streaming service?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No, Moviesnation is not a real streaming service. It's an testing project that simulates the functionality of a streaming platform. No actual content is hosted or distributed.",
                },
              },
              {
                "@type": "Question",
                name: "Where does the movie data come from?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All movie and TV show data is sourced from The Movie Database (TMDB) API. Moviesnation does not store any content data locally.",
                },
              },
              {
                "@type": "Question",
                name: "What data is stored about users?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Moviesnation only stores minimal user data required for authentication and user experience features (watchlist, continue watching, etc.) through Supabase. No personal data is shared or sold.",
                },
              },
              {
                "@type": "Question",
                name: "Can I contribute to this project?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! Moviesnation is an open source project. You can find the source code on GitHub and contribute by submitting pull requests or reporting issues.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  )
}

