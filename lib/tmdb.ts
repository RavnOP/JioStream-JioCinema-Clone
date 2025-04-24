const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000;
const FETCH_TIMEOUT = 8000;

export async function fetchTMDB(endpoint: string, params: Record<string, string> = {}) {
  const isClient = typeof window !== "undefined";
  let url: URL;

  if (isClient) {
    url = new URL(`/api/tmdb/${endpoint}`, window.location.origin);
  } else {
    url = new URL(`https://api.themoviedb.org/3/${endpoint}`);
    url.searchParams.append("api_key", process.env.NEXT_PUBLIC_TMDB_API || "");
  }

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const cacheKey = url.toString();
  const cachedData = cache[cacheKey];
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data;
  }

  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Request timeout")), FETCH_TIMEOUT);
    });

    const fetchPromise = fetch(url.toString(), {
      next: { revalidate: 3600 },
      headers: isClient
        ? {}
        : {
            Accept: "application/json",
            "User-Agent": "JioCinema/1.0",
          },
    });

    const response = (await Promise.race([fetchPromise, timeoutPromise])) as Response;

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    cache[cacheKey] = { data, timestamp: Date.now() };
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    if (cachedData) {
      return cachedData.data;
    }

    if (endpoint.includes("season")) {
      return { episodes: [] };
    } else if (endpoint.includes("credits")) {
      return { cast: [], crew: [] };
    } else if (endpoint.includes("videos")) {
      return { results: [] };
    } else if (endpoint.includes("movie/") && !endpoint.includes("/similar") && !endpoint.includes("/recommendations")) {
      return {
        title: "Movie information unavailable",
        overview: "Could not load movie details at this time.",
        genres: [],
        release_date: "",
        poster_path: "",
        backdrop_path: "",
      };
    } else if (endpoint.includes("tv/") && !endpoint.includes("/similar") && !endpoint.includes("/recommendations")) {
      return {
        name: "Show information unavailable",
        overview: "Could not load show details at this time.",
        genres: [],
        seasons: [],
        first_air_date: "",
        poster_path: "",
        backdrop_path: "",
      };
    } else {
      return { results: [] };
    }
  }
}