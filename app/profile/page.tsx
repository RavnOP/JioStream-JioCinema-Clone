import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Header } from "@/app/header"
import { ProfileContent } from "@/app/profile/profile-content"

export const metadata = {
  title: "My Profile | JioStream",
  description: "Manage your JioStream profile",
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="container px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-2 text-gray-400 hover:text-white">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold">My Profile</h1>
        </div>

        <ProfileContent />
      </div>
    </div>
  )
}

