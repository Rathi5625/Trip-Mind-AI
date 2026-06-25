"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PreferenceSummaryProps {
  summaryText: string
}

export function PreferenceSummary({ summaryText }: PreferenceSummaryProps) {
  return (
    <div className="h-6 flex items-center justify-center text-xs font-semibold text-slate-500 dark:text-slate-400 mt-4 select-none">
      <AnimatePresence mode="wait">
        {summaryText ? (
          <motion.p
            key="summary"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            Preferences: <span className="text-[#2563EB] dark:text-blue-400 font-bold">{summaryText}</span>
          </motion.p>
        ) : (
          <motion.p
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-slate-400 dark:text-slate-500 font-medium italic"
          >
            Complete selections to configure your AI profile.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
