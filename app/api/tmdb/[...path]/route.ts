import { type NextRequest, NextResponse } from "next/server";

// Simple in-memory cache
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // Cache for 5 minutes

export async function GET(request: NextRequest, context: { params: { path: string[] } }) {
  try {
    // Await and extract params
    const { params } = context;
    const path = params.path.join("/");

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();

    // Create cache key
    const cacheKey = `${path}?${queryString}`;

    // Check cache
    const cachedData = cache[cacheKey];
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json(cachedData.data);
    }

    // Construct TMDB API URL
    const tmdbBaseUrl = "https://api.themoviedb.org/3";
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API
    let url = `${tmdbBaseUrl}/${path}?api_key=${apiKey}`;

    for (const [key, value] of searchParams.entries()) {
      if (key !== "api_key") url += `&${key}=${value}`;
    }

    // Fetch data from TMDB API
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Moviesnation/1.0",
      },
      next: { revalidate: 3600 }, // Cache server-side for 1 hour
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();

    // Store response in cache
    cache[cacheKey] = { data, timestamp: Date.now() };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in TMDB Proxy:", error);
    return NextResponse.json(
      { error: "Failed to fetch data", message: (error as Error).message },
      { status: 500 }
    );
  }
}