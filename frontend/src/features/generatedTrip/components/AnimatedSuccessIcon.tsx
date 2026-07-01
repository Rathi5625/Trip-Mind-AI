"use client"

import * as React from "react"
import { motion } from "framer-motion"

export function AnimatedSuccessIcon() {
  return (
    <div className="relative size-44 flex items-center justify-center select-none perspective-800">
      
      {/* Outer pulsing ring 1 */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full border border-blue-500/10 dark:border-blue-400/10 bg-blue-500/5 dark:bg-blue-400/5 blur-sm"
      />

      {/* Outer pulsing ring 2 */}
      <motion.div
        animate={{ scale: [1.08, 0.95, 1.08], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute inset-2 rounded-full border border-blue-500/20 dark:border-blue-400/20"
      />

      {/* Main glassmorphic circle container with 3D tilt hover */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ rotateY: 10, rotateX: -10, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="relative size-32 rounded-full border border-white/40 dark:border-white/5 bg-gradient-to-tr from-slate-200/50 to-white/70 dark:from-slate-800/40 dark:to-slate-900/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl flex items-center justify-center overflow-hidden transform-style-3d cursor-grab active:cursor-grabbing"
      >
        {/* Glow inner reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

        {/* Floating Travel Planner Tablet / Map illustration with parallax translateZ */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative size-20 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/15 border border-white/20 shadow-inner flex flex-col justify-between p-2 translate-z-10"
        >
          {/* Tablet Header / Map lines */}
          <div className="space-y-1">
            <div className="h-1 w-8 bg-blue-500/20 rounded-full" />
            <div className="h-1 w-12 bg-blue-500/15 rounded-full" />
          </div>

          {/* Tablet Compass graphic overlay */}
          <div className="self-end size-8 rounded-full bg-white/10 dark:bg-black/10 border border-white/20 flex items-center justify-center text-[9px] font-black text-blue-500">
            🧭
          </div>
        </motion.div>

        {/* Superimposed Animated Checkmark Bubble with drawing SVG path checkmark */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 12 }}
          className="absolute flex size-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-500/20 translate-z-20"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
            />
          </svg>
        </motion.div>

      </motion.div>

    </div>
  )
}
