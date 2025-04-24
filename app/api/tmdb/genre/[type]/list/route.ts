import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { type: string } }) {
  try {
    const type = params.type
    if (type !== "movie" && type !== "tv") {
      return NextResponse.json({ error: "Invalid type. Must be 'movie' or 'tv'" }, { status: 400 })
    }

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API
    const response = await fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "JioStream/1.0",
      },
      next: { revalidate: 86400 }, // Cache for 24 hours
    })

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching genres:", error)
    return NextResponse.json({ error: "Failed to fetch genres" }, { status: 500 })
  }
}

