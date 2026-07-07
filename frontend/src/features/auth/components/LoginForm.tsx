"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "react-hot-toast"
import { cn } from "@/lib/utils"

import { authService } from "@/services/auth.service"
import { useAuthStore } from "@/store/authStore"

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [showPassword, setShowPassword] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginValues) => {
    try {
      const response = await authService.login(data.email, data.password)
      login(response.user, response.token)
      toast.success("Successfully logged in!")
      router.push("/dashboard") // Redirect to Dashboard on success
    } catch (err: any) {
      toast.error(err.message || "Failed to log in")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 font-sans text-sm">
      {/* Email Stacked Input Container */}
      <div className={cn(
        "relative border rounded-xl bg-slate-50/50 dark:bg-slate-900/40 px-4 pt-2.5 pb-1.5 focus-within:ring-2 focus-within:ring-primary-blue/30 transition-all",
        errors.email ? "border-rose-500 focus-within:border-rose-500" : "border-slate-200 dark:border-slate-800 focus-within:border-primary-blue"
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
          {...register("email")}
          placeholder="name@example.com"
          disabled={isSubmitting}
          className="w-full bg-transparent border-0 p-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-sm mt-0.5"
        />
      </div>
      {errors.email && <span className="text-xs text-rose-500 px-1 -mt-2">{errors.email.message}</span>}

      {/* Password Stacked Input Container */}
      <div className={cn(
        "relative border rounded-xl bg-slate-50/50 dark:bg-slate-900/40 px-4 pt-2.5 pb-1.5 focus-within:ring-2 focus-within:ring-primary-blue/30 transition-all",
        errors.password ? "border-rose-500 focus-within:border-rose-500" : "border-slate-200 dark:border-slate-800 focus-within:border-primary-blue"
      )}>
        <label
          htmlFor="password"
          className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"
        >
          Password
        </label>
        <div className="flex items-center justify-between">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="••••••••"
            disabled={isSubmitting}
            className="w-full bg-transparent border-0 p-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-sm mt-0.5"
          />
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors ml-2 cursor-pointer"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>
      {errors.password && <span className="text-xs text-rose-500 px-1 -mt-2">{errors.password.message}</span>}

      {/* Row: Remember Me & Forgot Password */}
      <div className="flex items-center justify-between text-xs mt-1">
        <label className="flex items-center gap-2 text-slate-500 dark:text-slate-400 cursor-pointer select-none">
          <input
            type="checkbox"
            {...register("rememberMe")}
            disabled={isSubmitting}
            className="size-4 rounded border-slate-300 dark:border-slate-800 text-primary-blue focus:ring-primary-blue/30 cursor-pointer"
          />
          <span>Remember Me</span>
        </label>
        <Link
          href="/forgot-password"
          className="font-bold text-primary-blue dark:text-blue-400 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-blue text-white font-semibold shadow-lg shadow-blue-500/20 dark:shadow-none hover:shadow-blue-500/30 transition-all cursor-pointer disabled:opacity-50",
          isSubmitting && "pointer-events-none"
        )}
      >
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            <span>Sign In</span>
            <ArrowRight className="size-4 ml-1" />
          </>
        )}
      </motion.button>

      {/* Signup Redirection footer link */}
      <div className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-bold text-primary-blue dark:text-blue-400 hover:underline"
        >
          Create Account
        </Link>
      </div>
    </form>
  )
}
