import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Moviesnation
            </h3>
            <p className="text-gray-400 text-sm md:text-base mb-4">
              Your one-stop destination for movies, TV shows, and more. Watch anytime, anywhere.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4 text-base md:text-lg">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/movies" className="text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/shows" className="text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/watchlist" className="text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base">
                  My Watchlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4 text-base md:text-lg">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4 text-base md:text-lg">Newsletter</h3>
            <p className="text-gray-400 text-sm md:text-base mb-4">
              Subscribe to our newsletter for updates on new releases and features.
            </p>
            <form className="flex flex-col space-y-2 max-w-xs mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-2 text-sm md:text-base transition-colors w-full"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-400 text-sm md:text-base">© 2023 Moviesnation. All rights reserved.</p>
          <p className="text-gray-500 text-xs md:text-sm mt-2 md:mt-0">
            This is an app created for testing purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}