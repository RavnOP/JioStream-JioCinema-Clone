import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { SearchBar } from "@/components/search-bar"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Terms of Use | JioStream",
  description: "Terms and conditions for using JioStream",
}

export default function TermsPage() {
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
          <h1 className="text-2xl sm:text-3xl font-bold">Terms of Use</h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 text-gray-300">
          <div className="bg-gray-900 p-4 rounded-lg text-sm">
            <p>Last Updated: March 18, 2025</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">1. Introduction</h2>
            <p>
              Welcome to JioStream. These Terms of Use govern your use of the JioStream service and website. By using,
              visiting, or browsing the JioStream service, you accept and agree to be bound by these Terms of Use.
            </p>
            <p>
              The JioStream service is provided by Viacom18 Media Private Limited, and its affiliates and subsidiaries
              (collectively "JioStream").
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">2. Membership</h2>
            <p>
              2.1 <strong>Free Access:</strong> JioStream offers free access to all content. You need to create an
              account to access the service.
            </p>
            <p>
              2.2 <strong>Account Creation:</strong> To access content, you must create an account with valid
              information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">3. JioStream Service</h2>
            <p>
              3.1 <strong>Content Availability:</strong> The availability of movies, TV shows, and other content may
              change from time to time. The quality of the display may vary from device to device and may be affected by
              various factors, including your location, internet bandwidth, and the device you are using.
            </p>
            <p>
              3.2 <strong>Compatible Devices:</strong> You can access JioStream through various devices, including smart
              TVs, streaming media players, mobile phones, tablets, and computers. Not all content is available in all
              formats or on all devices.
            </p>
            <p>
              3.3 <strong>Internet Service and Data Usage:</strong> You are responsible for any internet access or data
              charges. The quality of the display may vary depending on your internet connection.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">4. Passwords and Account Access</h2>
            <p>
              4.1 <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your account. You agree to notify JioStream
              immediately of any unauthorized use of your account.
            </p>
            <p>
              4.2 <strong>Multiple Profiles:</strong> Depending on your subscription plan, you may create multiple
              profiles within your account. Each profile should be used by only one person.
            </p>
            <p>
              4.3 <strong>Account Sharing:</strong> Your account is for personal, non-commercial use only and may not be
              shared with individuals beyond your household.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">5. Intellectual Property</h2>
            <p>
              5.1 <strong>Copyright and Trademarks:</strong> The JioStream service, including all content, features, and
              functionality, is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              5.2 <strong>Restrictions:</strong> You agree not to reproduce, distribute, modify, display, perform,
              publish, license, create derivative works from, or sell any information, software, products, or services
              obtained from the JioStream service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">6. Use of the Service</h2>
            <p>
              6.1 <strong>Prohibited Activities:</strong> You agree not to use the service for any illegal purpose or in
              violation of any applicable laws or regulations.
            </p>
            <p>
              6.2 <strong>Content Restrictions:</strong> You agree not to archive, download, reproduce, distribute,
              modify, display, perform, publish, license, create derivative works from, offer for sale, or use content
              and information contained on or obtained from the JioStream service.
            </p>
            <p>
              6.3 <strong>Service Interference:</strong> You agree not to circumvent, remove, alter, deactivate,
              degrade, or thwart any of the content protections in the JioStream service or use any robot, spider,
              scraper, or other automated means to access the JioStream service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">7. Disclaimers and Limitations of Liability</h2>
            <p>
              7.1 <strong>Service "As Is":</strong> The JioStream service is provided "as is" and without warranty or
              condition. JioStream does not guarantee, represent, or warrant that your use of the service will be
              uninterrupted or error-free.
            </p>
            <p>
              7.2 <strong>Limitation of Liability:</strong> To the extent permitted by law, in no event shall JioStream
              be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">8. Governing Law</h2>
            <p>
              These Terms of Use shall be governed by and construed in accordance with the laws of India. Any dispute
              arising out of or in connection with these Terms of Use shall be subject to the exclusive jurisdiction of
              the courts in Mumbai, India.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">9. Changes to Terms of Use</h2>
            <p>
              JioStream may, from time to time, change these Terms of Use. We will notify you of any material changes by
              posting the new Terms of Use on the JioStream website and, if you have provided us with your email
              address, by sending an email to that address.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">10. Contact Information</h2>
            <p>If you have any questions about these Terms of Use, please contact us at support@JioStream.com.</p>
          </section>
        </div>
      </div>

     
    </div>
  )
}

