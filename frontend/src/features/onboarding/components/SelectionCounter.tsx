"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SelectionCounterProps {
  count: number
}

export function SelectionCounter({ count }: SelectionCounterProps) {
  return (
    <div className="h-6 flex items-center justify-center text-xs font-semibold text-slate-500 dark:text-slate-400 select-none">
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          {count === 0 ? (
            <span className="text-slate-400 dark:text-slate-500 italic">No destinations selected</span>
          ) : count === 1 ? (
            <span>
              <span className="text-[#2563EB] dark:text-blue-400 font-bold">1</span> destination selected
            </span>
          ) : (
            <span>
              <span className="text-[#2563EB] dark:text-blue-400 font-bold">{count}</span> destinations selected
            </span>
          )}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
