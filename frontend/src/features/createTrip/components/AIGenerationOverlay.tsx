"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Loader2 } from "lucide-react"

interface AIGenerationOverlayProps {
  isVisible: boolean
  progress: number
}

export function AIGenerationOverlay({ isVisible, progress }: AIGenerationOverlayProps) {
  const currentMsg = React.useMemo(() => {
    if (progress < 12) return "Analyzing destination..."
    if (progress < 25) return "Finding optimal flights..."
    if (progress < 38) return "Scouting curated hotels..."
    if (progress < 50) return "Optimizing budget allocations..."
    if (progress < 63) return "Matching unique attractions..."
    if (progress < 76) return "Selecting top-rated dining spots..."
    if (progress < 88) return "Assembling personalized itinerary..."
    return "Creating final draft... Almost ready!"
  }, [progress])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0F19]/80 dark:bg-[#000000]/85 backdrop-blur-2xl px-6 text-white"
        >
          {/* Ambient colored background lights */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 size-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 size-96 bg-amber-500/10 rounded-full blur-3xl" />

          {/* Dialog Container */}
          <div className="relative max-w-md w-full text-center space-y-8 select-none">
            
            {/* Pulsing rotating loading ring & icon */}
            <div className="relative flex justify-center items-center">
              <div className="size-24 rounded-full border-2 border-white/5 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-t-2 border-r-2 border-blue-500 border-l-transparent border-b-transparent"
                  style={{ width: "96px", height: "96px", margin: "auto" }}
                />
                
                {/* Center Sparks Icon */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="flex size-14 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-450 shadow-lg shadow-blue-500/10"
                >
                  <Sparkles className="size-6 fill-blue-500/20" />
                </motion.div>
              </div>
            </div>

            {/* Title / Description */}
            <div className="space-y-2">
              <h2 className="text-xl font-black uppercase tracking-widest text-slate-200">
                ✨ Generating Your Trip...
              </h2>
              
              {/* Cycling message display with slide up animation */}
              <div className="h-8 flex justify-center items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentMsg}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-semibold text-blue-400"
                  >
                    {currentMsg}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Progress readout */}
            <div className="space-y-3">
              <div className="w-full h-1.5 bg-white/5 border border-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-amber-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
                {progress}% Loaded
              </span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
