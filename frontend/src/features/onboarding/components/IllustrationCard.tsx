"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

export function IllustrationCard() {
  return (
    <div className="w-full aspect-[4/3.2] sm:aspect-[4/3] md:h-full min-h-[220px] bg-[#709E96]/20 dark:bg-emerald-950/20 rounded-2xl border border-teal-500/5 relative overflow-hidden flex items-center justify-center p-6">
      {/* Soft background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      {/* Floating Mockup Tablet Image */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-[85%] h-[85%] flex items-center justify-center"
      >
        <Image
          src="/images/onboarding_mockup.png"
          alt="Trip Mind AI Travel Dashboard Tablet Mockup"
          fill
          className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
          priority
        />
      </motion.div>

      {/* Floating Verification Badge (Bottom-Left) */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-5 left-5 bg-white/90 border border-white/30 dark:bg-slate-900/90 dark:border-white/5 shadow-md shadow-slate-200/50 dark:shadow-none backdrop-blur-md rounded-xl p-2.5 flex items-center gap-2 z-10"
      >
        <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="size-3 stroke-[3]" />
        </div>
        <div className="space-y-1">
          <div className="w-14 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="w-8 h-1.5 bg-slate-100 dark:bg-slate-850 rounded-full" />
        </div>
      </motion.div>
    </div>
  )
}
