"use client"

import * as React from "react"
import { AuthHero } from "./components/AuthHero"
import { SignupForm } from "./components/SignupForm"
import { SocialLogin } from "./components/SocialLogin"
import { SecurityFooter } from "./components/SecurityFooter"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import Link from "next/link"
import { Compass } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col md:flex-row bg-[#F8F9FB] dark:bg-[#0B0F19] transition-colors duration-300 font-sans">
      {/* Floating Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Left Column: Travel Image Hero without StatsBar (Hidden on Mobile) */}
      <div className="hidden md:flex md:w-[45%] lg:w-[50%] xl:w-[55%] min-h-screen relative flex-col justify-between p-12 overflow-hidden border-r border-black/5 dark:border-white/5">
        <AuthHero showStats={false} />
      </div>

      {/* Right Column: Centered Registration Panel */}
      <div className="w-full md:w-[55%] lg:w-[50%] xl:w-[45%] min-h-screen flex flex-col justify-between py-12 px-6 sm:px-12 md:px-16 lg:px-20 z-10 bg-white/40 dark:bg-dark-navy/10 backdrop-blur-sm">
        
        {/* Mobile Header Logo (Visible on mobile only) */}
        <div className="flex md:hidden items-center justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary-blue text-white">
              <Compass className="size-4" />
            </div>
            <span className="tracking-tight">Trip Mind AI</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="my-auto flex flex-col items-center justify-center w-full max-w-md mx-auto">
          {/* Card Wrapper */}
          <div className="w-full bg-white dark:bg-slate-900/60 border border-black/5 dark:border-white/5 rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] backdrop-blur-xl">
            {/* Header branding logo */}
            <div className="flex justify-center mb-6">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-black/5 dark:border-white/5">
                <Compass className="size-6 text-slate-900 dark:text-white" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Join Trip Mind AI
              </h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Start your AI-powered travel journey today.
              </p>
            </div>

            {/* Social logins */}
            <SocialLogin />

            {/* Separator */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/5 dark:border-white/5" />
              </div>
              <span className="relative px-3 bg-white dark:bg-slate-900 text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                Or Continue With Email
              </span>
            </div>

            {/* Registration credentials form */}
            <SignupForm />
          </div>

          {/* Secure Trust indicators */}
          <div className="mt-8 w-full">
            <SecurityFooter />
          </div>
        </div>
      </div>
    </div>
  )
}
