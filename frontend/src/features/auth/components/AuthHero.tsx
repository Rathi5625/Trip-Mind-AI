"use client"

import * as React from "react"
import Image from "next/image"
import { Compass, Sparkles, Navigation, Coins } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { StatsBar } from "./StatsBar"
import { SecurityHighlights } from "./SecurityHighlights"

interface AuthHeroProps {
  variant?: "default" | "security"
  showStats?: boolean
}

export function AuthHero({ variant = "default", showStats = true }: AuthHeroProps) {
  if (variant === "security") {
    return (
      <div className="absolute inset-0 flex flex-col justify-between p-12 overflow-hidden bg-gradient-to-b from-[#1E293B] to-[#0F172A] dark:from-[#0B0F19] dark:to-[#020617] text-white">
        {/* World map background trace overlay or ambient blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square rounded-full bg-blue-500/5 blur-[120px] pointer-events-none -z-10" />
        
        {/* Top Branding Section */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white backdrop-blur-md shadow-sm">
            <Compass className="size-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">Trip Mind AI</span>
        </div>

        {/* Middle Branding/Security info */}
        <div className="relative z-10 space-y-4 max-w-md my-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
            Secure your journey into intelligent travel.
          </h2>
          <p className="text-sm text-slate-300 dark:text-slate-400 leading-relaxed">
            Your personalized AI concierge awaits. Update your credentials to
            maintain seamless access to your curated itineraries.
          </p>
        </div>

        {/* Bottom Section: Three Security highlights */}
        <div className="relative z-10 mt-auto">
          <SecurityHighlights />
        </div>
      </div>
    )
  }

  // Default Login/Signup Layout
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-12 overflow-hidden bg-slate-950 text-white">
      {/* Background Image of Paris sunset */}
      <Image
        src="/images/paris.png"
        alt="Paris Eiffel Tower Sunset"
        fill
        className="object-cover object-center opacity-40 select-none pointer-events-none"
        priority
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/45 to-slate-950/85 pointer-events-none" />

      {/* Top Section */}
      <div className="relative z-10 space-y-8">
        {/* Badge */}
        <div>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white/10 border border-white/10 text-white backdrop-blur-md shadow-sm">
            <Sparkles className="size-3.5 text-blue-400" />
            <span>AI-Powered Travel Intelligence</span>
          </span>
        </div>

        {/* Brand/Slogan */}
        <div className="space-y-4 max-w-lg">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]">
            Plan Smarter. <br />
            Travel Better.
          </h2>
          <p className="text-sm lg:text-base text-slate-300 leading-relaxed">
            Create personalized itineraries, optimize budgets, discover hidden gems,
            and manage every trip through one intelligent platform.
          </p>
        </div>
      </div>

      {/* Middle Section: Overlapping Floating Glass Cards */}
      <div className="relative w-full h-[280px] my-auto z-10 flex items-center justify-center">
        {/* Card 1: AI Generated Paris Itinerary (Top Left) */}
        <GlassPanel
          hoverEffect={true}
          className="absolute top-0 left-6 max-w-[240px] p-4 bg-white/10 border-white/10 backdrop-blur-md rounded-2xl flex items-center gap-3 shadow-xl"
        >
          <div className="flex size-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Navigation className="size-4 rotate-45" />
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-wider uppercase text-white/50">AI Generated</div>
            <div className="text-xs font-bold text-white mt-0.5">Paris Itinerary</div>
          </div>
        </GlassPanel>

        {/* Card 2: Insights Budget Optimized (Middle Right) */}
        <GlassPanel
          hoverEffect={true}
          className="absolute top-20 right-6 max-w-[240px] p-4 bg-white/10 border-white/10 backdrop-blur-md rounded-2xl flex items-center gap-3 shadow-xl"
        >
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
            <Coins className="size-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-wider uppercase text-white/50">Insights</div>
            <div className="text-xs font-bold text-white mt-0.5">Budget Optimized</div>
          </div>
        </GlassPanel>

        {/* Card 3: Recommendations Hidden Gems Found (Bottom Left) */}
        <GlassPanel
          hoverEffect={true}
          className="absolute bottom-6 left-16 max-w-[250px] p-4 bg-white/10 border-white/10 backdrop-blur-md rounded-2xl flex items-center gap-3 shadow-xl"
        >
          <div className="flex size-9 items-center justify-center rounded-xl bg-orange-600 text-white shadow-md shadow-orange-500/20">
            <Compass className="size-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-wider uppercase text-white/50">Recommendations</div>
            <div className="text-xs font-bold text-white mt-0.5">Hidden Gems Found</div>
          </div>
        </GlassPanel>
      </div>

      {/* Bottom Section: StatsBar (Conditionally Rendered) */}
      {showStats && (
        <div className="relative z-10 mt-auto animate-fade-in">
          <StatsBar />
        </div>
      )}
    </div>
  )
}
