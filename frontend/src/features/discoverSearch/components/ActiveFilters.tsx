"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface ActiveFiltersProps {
  query: string
  chips: string[]
  onRemoveChip: (chip: string) => void
}

export function ActiveFilters({ query, chips, onRemoveChip }: ActiveFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 select-none text-left w-full max-w-6xl mx-auto">
      
      {/* Search results count summary */}
      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
        Showing <span className="font-black text-slate-805 dark:text-white">248</span> destinations related to <span className="font-black text-slate-805 dark:text-white">"{query}"</span>
      </div>

      {/* Active chips list */}
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {chips.map((chip) => (
            <motion.div
              key={chip}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/60 text-[9.5px] font-black uppercase text-slate-655 dark:text-slate-355 tracking-wider"
            >
              <span>{chip}</span>
              <button
                onClick={() => onRemoveChip(chip)}
                className="p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                aria-label={`Remove filter ${chip}`}
              >
                <X className="size-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  )
}
