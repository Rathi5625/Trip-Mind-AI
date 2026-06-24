"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight, Loader2, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { PasswordStrength } from "./PasswordStrength"
import { BackToLogin } from "./BackToLogin"

// Zod Validation Schema
const schema = z
  .object({
    password: z
      .string()
      .min(8, "Must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain a special character"),
    confirmPassword: z.string().min(1, "Please re-enter your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type FormData = z.infer<typeof schema>

export function ResetPasswordForm() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  // Watch password field to update strength meter dynamically
  const passwordValue = watch("password")

  const onSubmit = (data: FormData) => {
    setIsLoading(true)
    // Simulate API update
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full flex flex-col items-center justify-center text-center p-4 font-sans text-sm"
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 mb-4">
          <CheckCircle2 className="size-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Password Updated
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xs">
          Your credentials have been securely reset. You can now sign in using your new password.
        </p>
        <div className="mt-6 w-full max-w-xs">
          <BackToLogin />
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 font-sans text-sm">
      {/* New Password input */}
      <div className="space-y-1">
        <div className="relative border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 px-4 pt-2.5 pb-1.5 focus-within:ring-2 focus-within:ring-primary-blue/30 focus-within:border-primary-blue transition-all">
          <label
            htmlFor="password"
            className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"
          >
            New Password
          </label>
          <div className="flex items-center justify-between">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              disabled={isLoading}
              className="w-full bg-transparent border-0 p-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-sm mt-0.5"
              {...register("password")}
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors ml-2 cursor-pointer"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>
        {errors.password && (
          <p className="text-[10px] font-semibold text-rose-500 pl-1">{errors.password.message}</p>
        )}
      </div>

      {/* Dynamic strength bar & checklists */}
      <PasswordStrength password={passwordValue} />

      {/* Confirm Password input */}
      <div className="space-y-1">
        <div className="relative border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 px-4 pt-2.5 pb-1.5 focus-within:ring-2 focus-within:ring-primary-blue/30 focus-within:border-primary-blue transition-all">
          <label
            htmlFor="confirmPassword"
            className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter new password"
            disabled={isLoading}
            className="w-full bg-transparent border-0 p-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-sm mt-0.5"
            {...register("confirmPassword")}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-[10px] font-semibold text-rose-500 pl-1">{errors.confirmPassword.message}</p>
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
            <span>Update Password</span>
            <ArrowRight className="size-4 ml-1" />
          </>
        )}
      </motion.button>

      {/* Redirection link back to sign in */}
      <BackToLogin />
    </form>
  )
}
