"use client"

import type React from "react"

import { useState } from "react"
import { Copy, Check, Share2, Facebook, Twitter, PhoneIcon as WhatsApp, Link2 } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface ShareModalProps {
  title: string
  url?: string
  children?: React.ReactNode
}

export function ShareModal({ title, url, children }: ShareModalProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = url || typeof window !== "undefined" ? window.location.href : ""

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: shareUrl,
        })
        toast({
          title: "Shared successfully",
          description: "Content has been shared",
        })
        setOpen(false)
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      setOpen(true)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast({
      title: "Link copied",
      description: "Link has been copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const shareToSocial = (platform: string) => {
    let shareLink = ""

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`
        break
      case "whatsapp":
        shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + shareUrl)}`
        break
      default:
        return
    }

    window.open(shareLink, "_blank", "width=600,height=400")
    setOpen(false)
  }

  return (
    <>
      {children ? (
        <DialogTrigger asChild onClick={() => handleShare()}>
          {children}
        </DialogTrigger>
      ) : (
        <Button variant="outline" className="border-gray-700 gap-2" onClick={() => handleShare()}>
          <Share2 className="h-4 w-4" /> Share
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
            <DialogDescription className="text-gray-400">
              Share this content with your friends and family
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-4 gap-4 py-4">
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-3 border-gray-700 hover:bg-gray-800"
              onClick={() => shareToSocial("facebook")}
            >
              <Facebook className="h-6 w-6 text-blue-500" />
              <span className="text-xs">Facebook</span>
            </Button>

            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-3 border-gray-700 hover:bg-gray-800"
              onClick={() => shareToSocial("twitter")}
            >
              <Twitter className="h-6 w-6 text-blue-400" />
              <span className="text-xs">Twitter</span>
            </Button>

            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-3 border-gray-700 hover:bg-gray-800"
              onClick={() => shareToSocial("whatsapp")}
            >
              <WhatsApp className="h-6 w-6 text-green-500" />
              <span className="text-xs">WhatsApp</span>
            </Button>

            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-3 border-gray-700 hover:bg-gray-800"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-6 w-6 text-green-500" /> : <Link2 className="h-6 w-6 text-gray-400" />}
              <span className="text-xs">{copied ? "Copied" : "Copy Link"}</span>
            </Button>
          </div>

          <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-md">
            <div className="truncate flex-1 text-sm text-gray-300">{shareUrl}</div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

