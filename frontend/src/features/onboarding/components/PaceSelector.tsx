"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { PACE_OPTIONS } from "../constants/preferenceOptions"
import { PaceType } from "../types/preferences"
import { cn } from "@/lib/utils"

interface PaceSelectorProps {
  value: PaceType | null
  onChange: (value: PaceType) => void
}

export function PaceSelector({ value, onChange }: PaceSelectorProps) {
  return (
    <div className="relative w-full max-w-lg bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-2xl flex items-center select-none border border-slate-200/20 dark:border-white/5">
      {PACE_OPTIONS.map((option) => {
        const isSelected = value === option.id

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "relative z-10 flex-1 py-2 text-xs sm:text-sm font-bold text-center cursor-pointer transition-colors duration-200 focus:outline-none",
              isSelected
                ? "text-primary-blue dark:text-blue-400"
                : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-350"
            )}
          >
            {/* Sliding Pill Indicator */}
            {isSelected && (
              <motion.div
                layoutId="pace-pill"
                className="absolute inset-0 bg-white dark:bg-[#141A2E] rounded-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-none border border-slate-100/50 dark:border-white/5 -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
