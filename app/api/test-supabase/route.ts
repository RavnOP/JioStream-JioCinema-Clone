import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    // Simple test query to check if Supabase connection is working
    const { data, error } = await supabase.from("profiles").select("count").limit(1)

    if (error) {
      console.error("Supabase connection error:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Supabase connection successful",
      data,
    })
  } catch (error) {
    console.error("Error testing Supabase connection:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to connect to Supabase",
      },
      { status: 500 },
    )
  }
}

