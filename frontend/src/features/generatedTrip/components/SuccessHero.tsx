"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { AnimatedSuccessIcon } from "./AnimatedSuccessIcon"

export function SuccessHero() {
  return (
    <div className="flex flex-col items-center text-center space-y-4 max-w-xl mx-auto select-none">
      
      {/* Animated Icon */}
      <AnimatedSuccessIcon />

      {/* Main Titles */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-2.5"
      >
        <h1 className="text-3xl md:text-4xl font-black text-slate-850 dark:text-slate-100 tracking-tight leading-tight">
          Your AI Travel Plan Is Ready
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-450 leading-relaxed">
          We've analyzed your preferences and generated a personalized itinerary tailored specifically for you. Your journey awaits.
        </p>
      </motion.div>

    </div>
  )
}
