import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Github, Code, Database, Film } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/app/header"
import { SearchBar } from "@/components/search-bar"
import { MobileNav } from "@/components/mobile-nav"

export const metadata = {
  title: "About JioStream | Open Source Streaming Platform",
  description:
    "Learn about JioStream, an open source educational project that nstrates streaming platform functionality using Next.js, TMDB API, and Supabase.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="container px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-2 text-gray-400 hover:text-white">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold">About JioStream</h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
            <Image src="https://github.com/user-attachments/assets/fb3ec91d-8f18-43ef-8bed-6a7af77ed73f" alt="JioStream Project" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-sm mb-2">
                <Code size={14} />
                <span>Open Source Project</span>
              </div>
              <h2 className="text-2xl font-bold"> Streaming Platform </h2>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-gray-300">
              JioStream is an open source educational project that nstrates how to build a modern streaming platform
              using Next.js, TMDB API, and Supabase. This project is designed for learning purposes only and is not
              affiliated with any commercial streaming service.
            </p>

            <p className="text-gray-300">
              Created as a nstration of web development techniques and best practices, JioStream showcases how to
              build a responsive, feature-rich application with authentication, data fetching, and user experience
              features similar to popular streaming platforms.
            </p>

            <h3 className="text-xl font-bold mt-8">Project Goals</h3>
            <p className="text-gray-300">
              The primary goal of JioStream is to provide a learning resource for developers interested in building
              complex web applications. By exploring the source code, developers can learn about:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-4">
              <li>Building responsive UIs with Next.js and Tailwind CSS</li>
              <li>Implementing authentication with Supabase</li>
              <li>Fetching and displaying data from external APIs (TMDB)</li>
              <li>Creating a seamless user experience with modern web techniques</li>
              <li>Implementing features like watchlists, continue watching, and user profiles</li>
            </ul>

            <h3 className="text-xl font-bold mt-8">Technology Stack</h3>
            <div className="grid sm:grid-cols-3 gap-6 mt-4">
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <Code className="h-5 w-5 mr-2 text-blue-400" />
                  <h4 className="font-bold">Frontend</h4>
                </div>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>Next.js (React Framework)</li>
                  <li>Tailwind CSS</li>
                  <li>Shadcn UI Components</li>
                  <li>TypeScript</li>
                </ul>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <Database className="h-5 w-5 mr-2 text-blue-400" />
                  <h4 className="font-bold">Backend</h4>
                </div>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>Supabase (Authentication)</li>
                  <li>Next.js API Routes</li>
                  <li>PostgreSQL (via Supabase)</li>
                  <li>Vercel Hosting</li>
                </ul>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <Film className="h-5 w-5 mr-2 text-blue-400" />
                  <h4 className="font-bold">Data Sources</h4>
                </div>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>TMDB API (Movie & TV Data)</li>
                  <li>Embedded Video URLs</li>
                  <li>User-generated content (comments, ratings)</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-bold mt-8">Important Disclaimer</h3>
            <div className="bg-gray-900 p-6 rounded-lg mt-4">
              <p className="text-gray-300">
                JioStream is an <strong>educational project</strong> and is not intended for commercial use. This
                application:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-2">
                <li>Is not affiliated with any commercial streaming service</li>
                <li>Does not host or distribute any copyrighted content</li>
                <li>Uses TMDB API for movie and TV show data, but is not endorsed by TMDB</li>
                <li>Only stores minimal user data required for authentication and user experience features</li>
                <li>Uses embedded URLs for video playback nstration purposes only</li>
              </ul>
              <p className="text-gray-300 mt-4">
                All movie and TV show data is the property of their respective owners. This project respects copyright
                laws and is designed solely for educational and nstration purposes.
              </p>
            </div>

            <h3 className="text-xl font-bold mt-8">Our Team</h3>
            <p className="text-gray-300">
              JioStream is an open source project maintained by a community of developers passionate about web
              development and learning. We welcome contributions from anyone interested in improving the project or
              learning from it.
            </p>

            <div className="flex justify-center mt-8">
              <Link href="https://github.com/RavnOP/Jio-Cinema-Clone-Webapp-Using-TMDB-API-and-Supabase-Database" target="_blank" rel="noopener noreferrer">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

