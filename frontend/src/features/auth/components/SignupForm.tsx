"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { TermsCheckbox } from "./TermsCheckbox"

export function SignupForm() {
  const [fullName, setFullName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [agreeToTerms, setAgreeToTerms] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Input Validations
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (!agreeToTerms) {
      setError("You must agree to the Terms & Conditions and Privacy Policy.")
      return
    }

    setIsLoading(true)

    // Simulate signup request
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

      {/* Full Name Input */}
      <div className="relative border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 px-4 pt-2.5 pb-1.5 focus-within:ring-2 focus-within:ring-primary-blue/30 focus-within:border-primary-blue transition-all">
        <label
          htmlFor="fullName"
          className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"
        >
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Doe"
          disabled={isLoading}
          className="w-full bg-transparent border-0 p-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-sm mt-0.5"
        />
      </div>

      {/* Email Input */}
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

      {/* Password Input */}
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

      {/* Confirm Password Input */}
      <div className="relative border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 px-4 pt-2.5 pb-1.5 focus-within:ring-2 focus-within:ring-primary-blue/30 focus-within:border-primary-blue transition-all">
        <label
          htmlFor="confirmPassword"
          className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"
        >
          Confirm Password
        </label>
        <div className="flex items-center justify-between">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
            className="w-full bg-transparent border-0 p-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-sm mt-0.5"
          />
          <button
            type="button"
            disabled={isLoading}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors ml-2 cursor-pointer"
          >
            {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {/* TermsCheckbox Component */}
      <div className="my-1">
        <TermsCheckbox
          checked={agreeToTerms}
          onChange={setAgreeToTerms}
          disabled={isLoading}
        />
      </div>

      {/* Create Account Submit Button */}
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
            <span>Create Account</span>
            <ArrowRight className="size-4 ml-1" />
          </>
        )}
      </motion.button>

      {/* Traveler setup setup timeline note */}
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
