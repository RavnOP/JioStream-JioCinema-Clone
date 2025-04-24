import { Skeleton } from "@/components/ui/skeleton"
import { Header } from "@/app/header"

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="h-[300px] sm:h-[400px] bg-gray-900 animate-pulse" />

      <div className="container px-3 sm:px-4 py-6 sm:py-8">
        <div className="space-y-3 mb-8">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-48 bg-gray-800" />
            <Skeleton className="h-8 w-24 bg-gray-800" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-[2/3] rounded-lg bg-gray-800" />
                </div>
              ))}
          </div>
        </div>

        <Skeleton className="h-10 w-64 mb-6 bg-gray-800" />

        <div className="space-y-8">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-7 w-48 bg-gray-800" />
                  <Skeleton className="h-8 w-24 bg-gray-800" />
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
                  {Array(6)
                    .fill(0)
                    .map((_, j) => (
                      <div key={j}>
                        <Skeleton className="aspect-[2/3] rounded-lg bg-gray-800" />
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

