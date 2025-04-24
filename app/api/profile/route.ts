import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create a Supabase client with the service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate environment variables
if (!supabaseUrl) {
  console.error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL")
}

if (!serviceRoleKey) {
  console.error("Missing environment variable: SUPABASE_SERVICE_ROLE_KEY")
}

const supabaseAdmin = createClient(
  supabaseUrl || "https://placeholder-url.supabase.co", // Fallback to prevent construction errors
  serviceRoleKey || "placeholder-key", // Fallback to prevent construction errors
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)

export async function POST(request: Request) {
  try {
    const { userId, username, fullName } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Check if profile already exists
    const { data: existingProfile, error: checkError } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking for existing profile:", checkError)
      return NextResponse.json({ error: checkError.message }, { status: 500 })
    }

    // If profile already exists, return it
    if (existingProfile) {
      return NextResponse.json({ profile: existingProfile, message: "Profile already exists" })
    }

    // Create or update the profile using the admin client (bypasses RLS)
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: userId,
        username: username || userId.substring(0, 8),
        full_name: fullName || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating profile:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ profile: data, message: "Profile created successfully" })
  } catch (error) {
    console.error("Error in profile API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

