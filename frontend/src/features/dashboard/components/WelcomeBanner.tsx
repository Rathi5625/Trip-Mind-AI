"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Plane, CalendarCheck } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { GradientButton } from "@/components/ui/GradientButton"

interface WelcomeBannerProps {
  travelerName: string
  upcomingTrip: {
    destination: string
    daysToGo: number
  } | null
}

export function WelcomeBanner({ travelerName, upcomingTrip }: WelcomeBannerProps) {
  const handleViewItinerary = () => {
    alert("Loading your Tokyo itinerary with offline map caches and AI recommendation list...")
  }

  return (
    <GlassPanel
      glowColor="blue"
      className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white shadow-2xl border-white/10 dark:border-white/5"
    >
      {/* Premium Glass reflection and lighting */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -left-24 size-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 size-48 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 z-10">
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            Welcome Back, {travelerName.split(" ")[0]} 👋
          </motion.h2>
          
          {upcomingTrip ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-2 text-sm text-slate-300 font-semibold"
            >
              <div className="flex size-6 items-center justify-center rounded-lg bg-white/10 text-blue-300">
                <Plane className="size-3.5 rotate-45" />
              </div>
              <span>Upcoming:</span>
              <span className="text-white font-bold">{upcomingTrip.destination}</span>
              <span className="text-slate-400 font-normal">—</span>
              <span className="text-amber-300 font-bold">{upcomingTrip.daysToGo} Days to go</span>
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="text-sm text-slate-300 font-medium"
            >
              You don't have any upcoming trips planned yet. Let's design your next adventure!
            </motion.p>
          )}
        </div>

        {upcomingTrip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.25 }}
            className="shrink-0"
          >
            <GradientButton
              variant="secondary"
              size="md"
              onClick={handleViewItinerary}
              className="bg-white/15 hover:bg-white/25 border-white/20 text-white font-extrabold px-6 rounded-2xl shadow-lg shadow-black/10 transition-all select-none"
            >
              <CalendarCheck className="size-4 shrink-0" />
              View Itinerary
            </GradientButton>
          </motion.div>
        )}
      </div>
    </GlassPanel>
  )
}
