"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { ArrowRight, Loader2, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "react-hot-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authService } from "@/services/auth.service"

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address."),
})

type FormData = z.infer<typeof schema>

export function ForgotPasswordForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      await authService.resetPassword(data.email)
      toast.success("Verification code sent to your email!")
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}&source=forgot-password`)
    } catch (err: any) {
      toast.error(err.message || "Failed to send verification code. Please make sure the email is registered.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 font-sans text-sm">
      {/* Email input */}
      <div className="space-y-1">
        <div className={cn(
          "relative border rounded-xl bg-slate-50/50 dark:bg-slate-900/40 px-4 pt-2.5 pb-1.5 focus-within:ring-2 focus-within:ring-primary-blue/30 focus-within:border-primary-blue transition-all",
          errors.email ? "border-rose-500 focus-within:border-rose-500" : "border-slate-200 dark:border-slate-800"
        )}>
          <label
            htmlFor="email"
            className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            disabled={isLoading}
            className="w-full bg-transparent border-0 p-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-sm mt-0.5"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-[10px] font-semibold text-rose-500 pl-1">{errors.email.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3 mt-2 rounded-xl bg-primary-blue text-white font-semibold shadow-lg shadow-blue-500/20 dark:shadow-none hover:shadow-blue-500/30 transition-all cursor-pointer disabled:opacity-50",
          isLoading && "pointer-events-none"
        )}
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            <span>Send Reset Code</span>
            <ArrowRight className="size-4 ml-1" />
          </>
        )}
      </motion.button>

      {/* Back to Login */}
      <div className="flex items-center justify-center mt-4">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary-blue dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Login</span>
        </Link>
      </div>
    </form>
  )
}
