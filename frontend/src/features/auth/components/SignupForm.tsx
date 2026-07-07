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
import { TermsCheckbox } from "./TermsCheckbox"

import { authService } from "@/services/auth.service"
import { useAuthStore } from "@/store/authStore"

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  confirmPassword: z.string().min(1, "Please confirm your password."),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms & Conditions.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
})

type SignupValues = z.infer<typeof signupSchema>

export function SignupForm() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  })

  const agreeToTermsValue = watch("agreeToTerms")

  const onSubmit = async (data: SignupValues) => {
    try {
      await authService.signup(data)
      toast.success("Account created! Please check your email for the verification code.")
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}&source=signup`)
    } catch (err: any) {
      toast.error(err.message || "Failed to create account")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 font-sans text-sm">
      {/* Full Name Input */}
      <div className={cn(
        "relative border rounded-xl bg-slate-50/50 dark:bg-slate-900/40 px-4 pt-2.5 pb-1.5 focus-within:ring-2 focus-within:ring-primary-blue/30 transition-all",
        errors.fullName ? "border-rose-500 focus-within:border-rose-500" : "border-slate-200 dark:border-slate-800 focus-within:border-primary-blue"
      )}>
        <label htmlFor="fullName" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          {...register("fullName")}
          placeholder="John Doe"
          disabled={isSubmitting}
          className="w-full bg-transparent border-0 p-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-sm mt-0.5"
        />
      </div>
      {errors.fullName && <span className="text-xs text-rose-500 px-1 -mt-2">{errors.fullName.message}</span>}

      {/* Email Input */}
      <div className={cn(
        "relative border rounded-xl bg-slate-50/50 dark:bg-slate-900/40 px-4 pt-2.5 pb-1.5 focus-within:ring-2 focus-within:ring-primary-blue/30 transition-all",
        errors.email ? "border-rose-500 focus-within:border-rose-500" : "border-slate-200 dark:border-slate-800 focus-within:border-primary-blue"
      )}>
        <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
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

      {/* Password Input */}
      <div className={cn(
        "relative border rounded-xl bg-slate-50/50 dark:bg-slate-900/40 px-4 pt-2.5 pb-1.5 focus-within:ring-2 focus-within:ring-primary-blue/30 transition-all",
        errors.password ? "border-rose-500 focus-within:border-rose-500" : "border-slate-200 dark:border-slate-800 focus-within:border-primary-blue"
      )}>
        <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
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

      {/* Confirm Password Input */}
      <div className={cn(
        "relative border rounded-xl bg-slate-50/50 dark:bg-slate-900/40 px-4 pt-2.5 pb-1.5 focus-within:ring-2 focus-within:ring-primary-blue/30 transition-all",
        errors.confirmPassword ? "border-rose-500 focus-within:border-rose-500" : "border-slate-200 dark:border-slate-800 focus-within:border-primary-blue"
      )}>
        <label htmlFor="confirmPassword" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Confirm Password
        </label>
        <div className="flex items-center justify-between">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder="••••••••"
            disabled={isSubmitting}
            className="w-full bg-transparent border-0 p-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-sm mt-0.5"
          />
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors ml-2 cursor-pointer"
          >
            {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>
      {errors.confirmPassword && <span className="text-xs text-rose-500 px-1 -mt-2">{errors.confirmPassword.message}</span>}

      {/* TermsCheckbox Component */}
      <div className="my-1 flex flex-col">
        <TermsCheckbox
          checked={agreeToTermsValue}
          onChange={(val) => setValue("agreeToTerms", val, { shouldValidate: true })}
          disabled={isSubmitting}
        />
        {errors.agreeToTerms && <span className="text-xs text-rose-500 mt-1">{errors.agreeToTerms.message}</span>}
      </div>

      {/* Create Account Submit Button */}
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
            <span>Create Account</span>
            <ArrowRight className="size-4 ml-1" />
          </>
        )}
      </motion.button>

      {/* Traveler setup timeline note */}
      <div className="text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
        Traveler Profile Setup takes less than 2 minutes
      </div>

      {/* Redirection link back to sign in */}
      <div className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-primary-blue dark:text-blue-400 hover:underline"
        >
          Sign In
        </Link>
      </div>
    </form>
  )
}
