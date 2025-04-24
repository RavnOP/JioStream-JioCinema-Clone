import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API
    const response = await fetch(`https://api.themoviedb.org/3/configuration/countries?api_key=${apiKey}`, {
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
    console.error("Error fetching countries:", error)
    return NextResponse.json({ error: "Failed to fetch countries" }, { status: 500 })
  }
}

