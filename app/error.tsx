"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertCircle, Home } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center space-y-6">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="text-gray-400">
          We encountered an error while loading this page. Please try again or return to the home page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="bg-blue-600 hover:bg-blue-700">
            Try again
          </Button>
          <Button variant="outline" className="border-gray-700" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Go to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

