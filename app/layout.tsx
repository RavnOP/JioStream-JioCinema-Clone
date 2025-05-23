import type React from "react"
import { AuthProvider } from "@/hooks/use-auth"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Footer } from "@/components/footer"
import { MobileNavigation } from "@/components/mobile-navigation"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
        <Footer />
<MobileNavigation />
      </body>
    </html>
  )
}
