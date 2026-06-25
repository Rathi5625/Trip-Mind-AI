"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { motion } from "framer-motion"

export function AIHint() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto mt-6 px-4"
    >
      <GlassPanel
        glowColor="blue"
        className="p-4 flex items-start gap-3 bg-blue-50/20 border-blue-100/50 dark:bg-slate-900/30 dark:border-white/5 shadow-sm text-left rounded-2xl"
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
          <Sparkles className="size-4 animate-pulse" />
        </div>
        <div className="space-y-0.5 mt-0.5 select-none">
          <h4 className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
            AI Personalization Powered
          </h4>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium leading-normal">
            Based on your selections, Trip Mind AI will recommend personalized destinations, restaurants, activities, and itineraries.
          </p>
        </div>
      </GlassPanel>
    </motion.div>
  )
}
