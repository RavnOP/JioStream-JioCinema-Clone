"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Loader2 } from "lucide-react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignInForm } from "@/components/auth/sign-in-form"
import { SignUpForm } from "@/components/auth/sign-up-form"
import { useAuth } from "@/hooks/use-auth"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { session } = useAuth()

  // Close modal if user is already signed in
  useEffect(() => {
    if (session) {
      onClose()
    }
  }, [session, onClose])

  const handleAfterSignIn = () => {
    setIsProcessing(true)
    // Short delay to allow session to be established
    setTimeout(() => {
      onClose()
      router.refresh()
      setIsProcessing(false)
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isProcessing && onClose()}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white sm:max-w-[425px]">
        {isProcessing ? (
          <div className="py-8 flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
            <p className="text-gray-300">Processing your request...</p>
          </div>
        ) : (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center">
                <User className="h-6 w-6 text-blue-500" />
              </div>
              <DialogTitle className="text-xl">Welcome to JioStream</DialogTitle>
              <DialogDescription className="text-gray-400">Sign in or create an account to continue</DialogDescription>
            </DialogHeader>

            <Tabs
              defaultValue="signin"
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "signin" | "signup")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger value="signin" className="data-[state=active]:bg-gray-700">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-gray-700">
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="signin" className="mt-4">
                <SignInForm onSuccess={handleAfterSignIn} />
              </TabsContent>
              <TabsContent value="signup" className="mt-4">
                <SignUpForm
                  onSuccess={() => {
                    setActiveTab("signin")
                  }}
                />
              </TabsContent>
            </Tabs>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

