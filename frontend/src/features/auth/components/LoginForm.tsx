"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function LoginForm() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic Validation
    if (!email || !password) {
      setError("Please fill in all fields.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.")
      return
    }

    setIsLoading(true)

    // Simulate login request
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 font-sans text-sm">
      {/* Error Alert */}
      {error && (
        <div className="p-3 text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/20 dark:text-rose-400 rounded-xl border border-rose-100 dark:border-rose-950/40">
          {error}
        </div>
      )}

      {/* Email Stacked Input Container */}
      <div className="relative border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 px-4 pt-2.5 pb-1.5 focus-within:ring-2 focus-within:ring-primary-blue/30 focus-within:border-primary-blue transition-all">
        <label
          htmlFor="email"
          className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          disabled={isLoading}
          className="w-full bg-transparent border-0 p-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-sm mt-0.5"
        />
      </div>

      {/* Password Stacked Input Container */}
      <div className="relative border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 px-4 pt-2.5 pb-1.5 focus-within:ring-2 focus-within:ring-primary-blue/30 focus-within:border-primary-blue transition-all">
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
            className="w-full bg-transparent border-0 p-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-sm mt-0.5"
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

      {/* Row: Remember Me & Forgot Password */}
      <div className="flex items-center justify-between text-xs mt-1">
        <label className="flex items-center gap-2 text-slate-500 dark:text-slate-400 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading}
            className="size-4 rounded border-slate-300 dark:border-slate-800 text-primary-blue focus:ring-primary-blue/30 cursor-pointer"
          />
          <span>Remember Me</span>
        </label>
        <Link
          href="/reset-password"
          className="font-bold text-primary-blue dark:text-blue-400 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-blue text-white font-semibold shadow-lg shadow-blue-500/20 dark:shadow-none hover:shadow-blue-500/30 transition-all cursor-pointer disabled:opacity-50",
          isLoading && "pointer-events-none"
        )}
      >
        {isLoading ? (
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
