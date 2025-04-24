"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, MessageSquare, Trash2, Edit2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { AuthModal } from "@/components/auth/auth-modal"
import { useAuth } from "@/hooks/use-auth"
import { supabase } from "@/lib/supabase"
import type { Comment } from "@/lib/supabase"

const commentFormSchema = z.object({
  comment: z.string().min(1, { message: "Comment cannot be empty" }).max(500, {
    message: "Comment is too long - should be 500 characters or less",
  }),
})

type CommentFormValues = z.infer<typeof commentFormSchema>

interface CommentSectionProps {
  contentId: string
  contentType: "movie" | "tv"
}

export function CommentSection({ contentId, contentType }: CommentSectionProps) {
  const [comments, setComments] = useState<(Comment & { username: string; avatar_url: string | null })[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const { session } = useAuth()
  const { toast } = useToast()

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: "",
    },
  })

  const editForm = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: "",
    },
  })

  useEffect(() => {
    fetchComments()
  }, [contentId, contentType])

  const fetchComments = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from("comments")
        .select(`*, profiles:profiles(username, avatar_url)`)
        .eq("content_id", contentId)
        .eq("content_type", contentType)
        .order("created_at", { ascending: false })

      if (error) throw error

      // Transform the data to match our expected format
      const formattedComments = data.map((comment) => ({
        ...comment,
        username: (comment.profiles as any)?.username || "Unknown User",
        avatar_url: (comment.profiles as any)?.avatar_url,
      }))

      setComments(formattedComments)
    } catch (error) {
      console.error("Error fetching comments:", error)
      toast({
        title: "Error",
        description: "Failed to load comments. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (values: CommentFormValues) => {
    if (!session) {
      setAuthModalOpen(true)
      return
    }

    setIsSending(true)
    try {
      const { error } = await supabase.from("comments").insert({
        user_id: session.user.id,
        content_id: contentId,
        content_type: contentType,
        comment: values.comment,
      })

      if (error) throw error

      form.reset()
      toast({
        title: "Comment posted",
        description: "Your comment has been posted successfully.",
      })
      fetchComments()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to post comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  const startEditing = (comment: Comment) => {
    editForm.reset({ comment: comment.comment })
    setEditingCommentId(comment.id)
  }

  const cancelEditing = () => {
    setEditingCommentId(null)
  }

  const updateComment = async (values: CommentFormValues) => {
    if (!editingCommentId || !session) return

    setIsSending(true)
    try {
      const { error } = await supabase
        .from("comments")
        .update({ comment: values.comment, updated_at: new Date().toISOString() })
        .eq("id", editingCommentId)
        .eq("user_id", session.user.id)

      if (error) throw error

      toast({
        title: "Comment updated",
        description: "Your comment has been updated successfully.",
      })
      setEditingCommentId(null)
      fetchComments()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  const deleteComment = async (commentId: string) => {
    if (!session) return

    if (!confirm("Are you sure you want to delete this comment?")) return

    try {
      const { error } = await supabase.from("comments").delete().eq("id", commentId).eq("user_id", session.user.id)

      if (error) throw error

      toast({
        title: "Comment deleted",
        description: "Your comment has been deleted successfully.",
      })
      fetchComments()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-blue-500" />
        <h3 className="text-xl font-bold">Comments</h3>
        <span className="text-sm text-gray-400">({comments.length})</span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Add a comment..."
                    className="bg-gray-800 border-gray-700 text-white resize-none min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSending}>
              {isSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Post Comment
            </Button>
          </div>
        </form>
      </Form>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border border-gray-800 rounded-lg p-4 bg-gray-900/50">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                  {comment.avatar_url ? (
                    <Image
                      src={comment.avatar_url || "/placeholder.svg"}
                      alt={comment.username}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      {comment.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{comment.username}</h4>
                      <p className="text-xs text-gray-400">{formatDate(comment.created_at)}</p>
                    </div>
                    {session?.user.id === comment.user_id && (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                          onClick={() => startEditing(comment)}
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                          onClick={() => deleteComment(comment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    )}
                  </div>

                  {editingCommentId === comment.id ? (
                    <Form {...editForm}>
                      <form onSubmit={editForm.handleSubmit(updateComment)} className="mt-2 space-y-2">
                        <FormField
                          control={editForm.control}
                          name="comment"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  className="bg-gray-800 border-gray-700 text-white resize-none min-h-[80px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" onClick={cancelEditing} className="border-gray-700">
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSending}>
                            {isSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Update
                          </Button>
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <p className="mt-2 text-gray-300 whitespace-pre-wrap">{comment.comment}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  )
}

