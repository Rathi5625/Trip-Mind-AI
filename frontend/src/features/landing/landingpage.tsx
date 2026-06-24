"use client"

import * as React from "react"
import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { AIPlannerShowcase } from "@/components/landing/AIPlannerShowcase"
import { FeaturesGrid } from "@/components/landing/FeaturesGrid"
import { DestinationShowcase } from "@/components/landing/DestinationShowcase"
import { Footer } from "@/components/landing/Footer"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-bg-cloud dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans flex flex-col">
      {/* Background radial overlays for a premium feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none -z-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent-pink/5 via-transparent to-transparent pointer-events-none -z-20" />

      {/* Floating Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Live Planner Split Showcase */}
        <AIPlannerShowcase />

        {/* Detailed Grid Features */}
        <FeaturesGrid />

        {/* Destination Collage Showcase */}
        <DestinationShowcase />
      </main>

      {/* Sticky/Standard Footer */}
      <Footer />
    </div>
  )
}
