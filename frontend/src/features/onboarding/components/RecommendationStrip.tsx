"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Destination } from "../types/destination"

interface RecommendationStripProps {
  recommendations: Destination[]
  selectedDestinations: string[]
  onToggleDestination: (id: string) => void
}

export function RecommendationStrip({
  recommendations,
  selectedDestinations,
  onToggleDestination,
}: RecommendationStripProps) {
  if (recommendations.length === 0) return null

  return (
    <div className="w-full max-w-xl mx-auto mb-8 text-left select-none bg-blue-50/20 dark:bg-slate-900/30 border border-blue-100/30 dark:border-white/5 p-4 sm:p-5 rounded-3xl backdrop-blur-sm relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-1.5">
        <Sparkles className="size-4 text-blue-500 animate-pulse" />
        <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200">
          Recommended For You
        </h3>
      </div>
      <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 font-medium mb-4">
        Based on your travel personality, these destinations match your interests.
      </p>

      <div className="grid grid-cols-3 gap-3">
        {recommendations.map((dest) => {
          const isSelected = selectedDestinations.includes(dest.id)
          return (
            <motion.button
              key={dest.id}
              onClick={() => onToggleDestination(dest.id)}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue",
                isSelected
                  ? "bg-white dark:bg-slate-800 border-primary-blue shadow-sm"
                  : "bg-white/40 dark:bg-slate-900/40 border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10"
              )}
            >
              {/* Highlight background when selected */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Selection Badge top right */}
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 size-4 bg-primary-blue text-white rounded-full flex items-center justify-center">
                  <Check className="size-2.5 stroke-[3.5]" />
                </div>
              )}

              {/* Flag Emoji */}
              <span className="text-2xl mb-1.5 leading-none">{dest.flag}</span>
              
              {/* Destination Name */}
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 text-center truncate w-full">
                {dest.name}
              </span>
              
              {/* Match Percentage */}
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {dest.aiMatch}% Match
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
