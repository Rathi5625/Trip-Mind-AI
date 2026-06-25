"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { SelectionCounter } from "./SelectionCounter"

interface BottomNavigationProps {
  isValid: boolean
  selectedCount: number
  onNext: () => void
  onBack: () => void
}

export function BottomNavigation({
  isValid,
  selectedCount,
  onNext,
  onBack,
}: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-black/5 dark:border-white/5 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg p-4 z-20 flex items-center justify-between gap-4 md:static md:bg-transparent md:border-none md:p-0 md:mt-12 md:backdrop-blur-none md:shadow-none w-full max-w-4xl mx-auto select-none">
      {/* Back Button (Left-aligned) */}
      <motion.button
        type="button"
        onClick={onBack}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors py-2.5 px-4 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-300"
      >
        Back
      </motion.button>

      {/* Selection Counter (Center-aligned, hidden on small mobile if space is tight, or centered) */}
      <div className="hidden sm:block">
        <SelectionCounter count={selectedCount} />
      </div>

      {/* Continue Button (Right-aligned) */}
      <motion.button
        type="button"
        onClick={onNext}
        disabled={!isValid}
        whileHover={isValid ? { scale: 1.02 } : undefined}
        whileTap={isValid ? { scale: 0.98 } : undefined}
        className="flex-1 sm:flex-initial py-2.5 px-7 rounded-xl bg-primary-blue text-white font-semibold hover:bg-blue-600 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 disabled:bg-[#2563EB]/40 disabled:text-white/60 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-blue"
      >
        <span>Continue</span>
        <ArrowRight className="size-4 shrink-0" />
      </motion.button>
    </div>
  )
}
