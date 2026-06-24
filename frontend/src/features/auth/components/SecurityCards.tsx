"use client"

import * as React from "react"
import { ShieldCheck } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { motion } from "framer-motion"

export function SecurityCards() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-lg mx-auto md:mx-0">
      {/* Card 1: Secure Authentication */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <GlassPanel
          hoverEffect={true}
          className="p-5 flex items-start gap-4 bg-white/70 border-white/40 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border text-slate-800 dark:bg-slate-900/40 dark:border-white/5 dark:text-white max-w-sm sm:max-w-md"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm">
            <ShieldCheck className="size-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              Secure Authentication
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Multi-factor security powered by neural encryption.
            </p>
          </div>
        </GlassPanel>
      </motion.div>

      {/* Card 2: Protected Travel Data - Indented/Offset to the right */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
        className="ml-6 sm:ml-12"
      >
        <GlassPanel
          hoverEffect={true}
          className="p-5 flex items-start gap-4 bg-white/70 border-white/40 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border text-slate-800 dark:bg-slate-900/40 dark:border-white/5 dark:text-white max-w-sm sm:max-w-md"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 shadow-sm">
            <ShieldCheck className="size-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              Protected Travel Data
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Your itineraries and preferences stay strictly private.
            </p>
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  )
}
