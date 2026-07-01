"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface CategoryChipProps {
  label: string
  emoji: string
  count: number
  isActive: boolean
  onClick: () => void
}

export function CategoryChip({ label, emoji, count, isActive, onClick }: CategoryChipProps) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-4 rounded-2xl border text-left flex flex-col justify-between min-w-[130px] transition-all cursor-pointer shadow-sm select-none focus:outline-none focus:ring-1 focus:ring-blue-500
        ${
          isActive
            ? "border-blue-500/20 bg-blue-600/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400"
            : "border-black/5 bg-white dark:border-white/5 dark:bg-slate-900/60 text-slate-805 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"
        }
      `}
    >
      <span className="text-2xl mb-3">{emoji}</span>
      <div className="space-y-0.5">
        <span className="block text-[11px] font-black uppercase tracking-wide">
          {label}
        </span>
        <span className="block text-[9px] font-semibold text-slate-400 dark:text-slate-500">
          {count} spots
        </span>
      </div>
    </motion.button>
  )
}
