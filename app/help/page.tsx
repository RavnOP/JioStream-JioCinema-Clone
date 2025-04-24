import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { MobileNav } from "@/components/mobile-nav"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: "Help Center | JioStream",
  description: "Get help with JioStream streaming service",
}

export default function HelpPage() {
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
            <Link href="/" className="text-sm font-medium hover:text-blue-400 transition">
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

      <div className="container px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-2 text-gray-400 hover:text-white">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold">Help Center</h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">How can we help you?</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help topics..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="absolute right-1 top-1 bg-blue-600 hover:bg-blue-700">Search</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900 rounded-lg p-6 text-center hover:bg-gray-800 transition">
              <h3 className="font-bold mb-2">Account & Billing</h3>
              <p className="text-sm text-gray-400">Manage your account, subscription, and payment methods</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 text-center hover:bg-gray-800 transition">
              <h3 className="font-bold mb-2">Streaming Issues</h3>
              <p className="text-sm text-gray-400">Troubleshoot playback, quality, and device compatibility</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 text-center hover:bg-gray-800 transition">
              <h3 className="font-bold mb-2">Content Questions</h3>
              <p className="text-sm text-gray-400">Find information about movies, shows, and upcoming releases</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-gray-800 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 bg-gray-900 hover:bg-gray-800">
                  How do I create an account?
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 bg-gray-900/50">
                  <p className="text-gray-300">
                    Creating an account is easy! Click on the "Sign In" button at the top of the page, then select
                    "Create Account". Fill in your details, verify your email address, and you're ready to start
                    streaming.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border border-gray-800 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 bg-gray-900 hover:bg-gray-800">
                  What devices can I watch JioStream on?
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 bg-gray-900/50">
                  <p className="text-gray-300">
                    JioStream is available on a wide range of devices including smartphones (iOS and Android), tablets,
                    web browsers, smart TVs, and streaming devices like Amazon Fire Stick, Roku, and Apple TV.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border border-gray-800 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 bg-gray-900 hover:bg-gray-800">
                  How do I access all content?
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 bg-gray-900/50">
                  <p className="text-gray-300">
                    All content on JioStream is free to access. Simply create an account and start watching your
                    favorite movies and shows.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border border-gray-800 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 bg-gray-900 hover:bg-gray-800">
                  Why am I experiencing buffering issues?
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 bg-gray-900/50">
                  <p className="text-gray-300">
                    Buffering can be caused by several factors including internet speed, device performance, or network
                    congestion. Try these steps:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-gray-300 space-y-1">
                    <li>Check your internet connection speed</li>
                    <li>Close other applications or devices using your network</li>
                    <li>Restart your streaming device</li>
                    <li>Lower the video quality in settings</li>
                    <li>Connect to a wired network if possible</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border border-gray-800 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 bg-gray-900 hover:bg-gray-800">
                  How many devices can I stream on simultaneously?
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 bg-gray-900/50">
                  <p className="text-gray-300">
                    You can stream JioStream on up to 2 devices simultaneously with a single account.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Still need help?</h2>
            <p className="text-gray-400 mb-4">Our support team is available 24/7 to assist you</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700">Contact Support</Button>
              <Button variant="outline" className="border-gray-700">
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}

