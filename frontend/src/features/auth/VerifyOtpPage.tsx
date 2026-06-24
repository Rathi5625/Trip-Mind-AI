"use client"

import * as React from "react"
import { Compass } from "lucide-react"
import Link from "next/link"
import { SecurityCards } from "./components/SecurityCards"
import { VerificationCard } from "./components/VerificationCard"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export default function VerifyOtpPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col md:flex-row bg-[#F8F9FB] dark:bg-[#0B0F19] transition-colors duration-300 font-sans">
      {/* Floating Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Left Column: Branding and Security cards */}
      <div className="hidden md:flex md:w-[45%] lg:w-[50%] xl:w-[55%] min-h-screen relative flex-col justify-between p-12 overflow-hidden border-r border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/20">
        {/* Faint ambient glow/dots background instead of heavy image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full bg-blue-500/5 dark:bg-blue-500/5 blur-[100px] pointer-events-none -z-10" />

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary-blue text-white shadow-md shadow-blue-500/25">
            <Compass className="size-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white select-none">
            Trip Mind AI
          </span>
        </div>

        {/* Floating Security Cards (centered vertically) */}
        <div className="relative z-10 my-auto">
          <div className="mb-6 max-w-sm">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-200">
              Verify your identity.
            </h2>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We take security seriously. Please complete the verification step to authenticate your access.
            </p>
          </div>
          <SecurityCards />
        </div>
      </div>

      {/* Right Column: Verification Card */}
      <div className="w-full md:w-[55%] lg:w-[50%] xl:w-[45%] min-h-screen flex flex-col justify-between py-12 px-6 sm:px-12 md:px-16 lg:px-20 z-10 bg-slate-55/30 dark:bg-dark-navy/10 backdrop-blur-sm border-l border-black/5 dark:border-white/5">
        
        {/* Mobile Header Logo (Visible on mobile only) */}
        <div className="flex md:hidden items-center justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
            <div className="flex size-7 items-center justify-center rounded-xl bg-primary-blue text-white">
              <Compass className="size-4" />
            </div>
            <span className="tracking-tight">Trip Mind AI</span>
          </Link>
        </div>

        {/* Verification Card Centered Container */}
        <div className="my-auto flex flex-col items-center justify-center w-full max-w-md mx-auto">
          <React.Suspense fallback={
            <div className="w-full bg-white dark:bg-slate-900/60 rounded-3xl p-8 sm:p-10 border border-black/5 dark:border-white/5 flex items-center justify-center">
              <span className="text-xs text-slate-400">Loading verification details...</span>
            </div>
          }>
            <VerificationCard />
          </React.Suspense>
        </div>
      </div>
    </div>
  )
}
