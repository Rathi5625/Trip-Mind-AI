"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SelectionSummaryProps {
  selectedNames: string
}

export function SelectionSummary({ selectedNames }: SelectionSummaryProps) {
  return (
    <div className="h-6 flex items-center justify-center text-xs font-semibold text-slate-500 dark:text-slate-400 mt-6 select-none">
      <AnimatePresence mode="wait">
        {selectedNames ? (
          <motion.p
            key="summary"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            You&apos;ve selected: <span className="text-[#2563EB] dark:text-blue-400">{selectedNames}</span>
          </motion.p>
        ) : (
          <motion.p
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-slate-400 dark:text-slate-500 font-medium italic"
          >
            Please choose at least one option to continue.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
