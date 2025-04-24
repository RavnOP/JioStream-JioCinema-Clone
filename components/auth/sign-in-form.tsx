"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
})

type FormValues = z.infer<typeof formSchema>

interface SignInFormProps {
  onSuccess?: () => void
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, ensureProfile } = useAuth()
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsLoading(true)
    try {
      // Try demo user first if credentials match
      if (values.email === "admin@gmail.com" && values.password === "admin@123") {
        const { error } = await signIn({
          email: values.email,
          password: values.password,
        })

        if (error) {
          toast({
            title: "Error",
            description: error.message || "Something went wrong. Please try again.",
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }

        // Ensure profile exists
        await ensureProfile()

        toast({
          title: "Success",
          description: "You have successfully signed in!",
        })

        if (onSuccess) {
          onSuccess()
        }
        return
      }

      // Regular sign in
      const { error } = await signIn({
        email: values.email,
        password: values.password,
      })

      if (error) {
        toast({
          title: "Error",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        })
        return
      }

      // Ensure profile exists
      await ensureProfile()

      toast({
        title: "Success",
        description: "You have successfully signed in!",
      })

      if (onSuccess) {
        onSuccess()
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="your.email@example.com"
                  {...field}
                  type="email"
                  disabled={isLoading}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="******"
                  {...field}
                  type="password"
                  disabled={isLoading}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  )
}

