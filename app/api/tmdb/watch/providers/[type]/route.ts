import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { type: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const watchRegion = searchParams.get("watch_region") || "US"

    const type = params.type
    if (type !== "movie" && type !== "tv") {
      return NextResponse.json({ error: "Invalid type. Must be 'movie' or 'tv'" }, { status: 400 })
    }

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API
    const response = await fetch(
      `https://api.themoviedb.org/3/watch/providers/${type}?api_key=${apiKey}&watch_region=${watchRegion}`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "JioStream/1.0",
        },
        next: { revalidate: 86400 }, // Cache for 24 hours
      },
    )

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching providers:", error)
    return NextResponse.json({ error: "Failed to fetch providers" }, { status: 500 })
  }
}

