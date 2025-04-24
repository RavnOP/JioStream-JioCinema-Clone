import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database.types"

// Check if environment variables are defined and properly formatted
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl) {
  console.error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL")
}

if (!supabaseAnonKey) {
  console.error("Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

// Create client with validation
export const supabase = createClient<Database>(
  supabaseUrl || "https://placeholder-url.supabase.co", // Fallback to prevent construction errors
  supabaseAnonKey || "placeholder-key", // Fallback to prevent construction errors
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  },
)

export type Tables = Database["public"]["Tables"]
export type Profile = Tables["profiles"]["Row"]
export type Watchlist = Tables["watchlist"]["Row"]
export type ContinueWatching = Tables["continue_watching"]["Row"]
export type Like = Tables["likes"]["Row"]
export type WatchHistory = Tables["watch_history"]["Row"]
export type Comment = Tables["comments"]["Row"]

