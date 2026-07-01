"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface CTAButtonsProps {
  onViewPlan: () => void
  onReturnDashboard: () => void
}

export function CTAButtons({ onViewPlan, onReturnDashboard }: CTAButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 select-none w-full max-w-md mx-auto">
      
      {/* Primary: View Travel Plan (with delayed breathing glow) */}
      <motion.button
        onClick={onViewPlan}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={{
          boxShadow: [
            "0 10px 15px -3px rgba(37, 99, 235, 0.1), 0 4px 6px -4px rgba(37, 99, 235, 0.1)",
            "0 0 24px 6px rgba(37, 99, 235, 0.45)",
            "0 10px 15px -3px rgba(37, 99, 235, 0.1), 0 4px 6px -4px rgba(37, 99, 235, 0.1)"
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 3500 / 1000,
          ease: "easeInOut",
          delay: 1.5 // Breathing starts after stagger finishes
        }}
        className="w-full sm:w-[180px] py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest transition-colors cursor-pointer border border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
      >
        View Travel Plan
      </motion.button>

      {/* Secondary: Return to Dashboard */}
      <motion.button
        onClick={onReturnDashboard}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-[180px] py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 border border-black/5 text-slate-655 dark:bg-slate-950 dark:hover:bg-slate-900 dark:border-white/5 dark:text-slate-355 text-xs font-black uppercase tracking-widest transition-colors shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
      >
        Return To Dashboard
      </motion.button>

    </div>
  )
}
