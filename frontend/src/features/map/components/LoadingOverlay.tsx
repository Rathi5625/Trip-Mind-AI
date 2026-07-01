"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fadeVariants } from "../utils/animation"

interface LoadingOverlayProps {
  isLoading: boolean
}

export function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center z-50 pointer-events-auto"
        >
          <div className="relative size-16 flex items-center justify-center">
            {/* Spinning indicator */}
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 border-t-blue-600 animate-spin" />
            {/* Inner pulsing AI core */}
            <div className="size-8 rounded-full bg-blue-500/20 animate-ping" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Loading AI Map
            </h3>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-1">
              Optimizing Viewport
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
