"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface SelectedDestinationsProps {
  selectedNames: { id: string; name: string; flag: string }[]
  onRemove: (id: string) => void
}

export function SelectedDestinations({
  selectedNames,
  onRemove,
}: SelectedDestinationsProps) {
  if (selectedNames.length === 0) return null

  return (
    <div className="w-full max-w-xl mx-auto mb-6 select-none text-left">
      <div className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-2">
        Your Wishlist:
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {selectedNames.map((dest) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/30 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-350 shadow-sm"
            >
              <span>{dest.flag}</span>
              <span>{dest.name}</span>
              <button
                type="button"
                onClick={() => onRemove(dest.id)}
                className="hover:bg-slate-200 dark:hover:bg-white/10 p-0.5 rounded-full text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 cursor-pointer"
              >
                <X className="size-3 stroke-[2.5]" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
