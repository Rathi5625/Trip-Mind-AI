"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles, Loader2 } from "lucide-react"

interface GenerateButtonProps {
  onClick: () => void
  isLoading: boolean
  progress: number
}

export function GenerateButton({ onClick, isLoading, progress }: GenerateButtonProps) {
  return (
    <div className="relative w-full">
      {/* Background glow shadow effect when active/hovered */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-600 to-amber-600 opacity-60 blur-md group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
      
      <motion.button
        onClick={onClick}
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-amber-600 hover:from-blue-700 hover:to-amber-700 text-white font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-colors shadow-lg disabled:opacity-85 disabled:cursor-not-allowed select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>Generating Plan ({progress}%)</span>
          </>
        ) : (
          <>
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
              <Sparkles className="size-4 fill-white/20" />
            </motion.span>
            <span>Generate My AI Travel Plan</span>
          </>
        )}
      </motion.button>
    </div>
  )
}
