"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Plane, Compass } from "lucide-react"
import { SuccessCard } from "./components/SuccessCard"
import { TravelQuote } from "./components/TravelQuote"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export default function PasswordSuccessPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col md:flex-row bg-[#F8F9FB] dark:bg-[#0B0F19] transition-colors duration-300 font-sans">
      {/* Floating Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Left Column: Travel Destination Image & Quote (Hidden on Mobile/Tablet) */}
      <div className="hidden md:flex md:w-[45%] lg:w-[50%] xl:w-[55%] min-h-screen relative flex-col justify-between p-12 overflow-hidden border-r border-black/5 dark:border-white/5">
        {/* Eiffel Tower Background */}
        <Image
          src="/images/paris.png"
          alt="Paris Eiffel Tower Sunset"
          fill
          className="object-cover object-center opacity-90 select-none pointer-events-none"
          priority
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/20 to-slate-950/60 pointer-events-none" />

        {/* Top Logo Section */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-white/15 border border-white/15 text-white backdrop-blur-md shadow-sm">
            <Plane className="size-5 rotate-45 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white select-none">Trip Mind AI</span>
        </div>

        {/* Bottom Quote Section */}
        <div className="relative z-10 mt-auto">
          <TravelQuote />
        </div>
      </div>

      {/* Right Column: Success Card */}
      <div className="w-full md:w-[55%] lg:w-[50%] xl:w-[45%] min-h-screen flex flex-col justify-between py-12 px-6 sm:px-12 md:px-16 lg:px-20 z-10 bg-slate-50/30 dark:bg-dark-navy/10 backdrop-blur-sm">
        
        {/* Mobile Header Logo (Visible on mobile only) */}
        <div className="flex md:hidden items-center justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
            <div className="flex size-7 items-center justify-center rounded-full bg-primary-blue text-white">
              <Compass className="size-4 text-white" />
            </div>
            <span className="tracking-tight">Trip Mind AI</span>
          </Link>
        </div>

        {/* Success Card Centered Container */}
        <div className="my-auto flex flex-col items-center justify-center w-full max-w-md mx-auto">
          <SuccessCard />
        </div>
      </div>
    </div>
  )
}
