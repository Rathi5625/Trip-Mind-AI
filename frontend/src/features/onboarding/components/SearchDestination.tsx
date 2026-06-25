"use client"

import * as React from "react"
import { Search, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface SearchDestinationProps {
  query: string
  onChangeQuery: (q: string) => void
  onAddCustomDestination?: (name: string) => void
  hasExactMatch: boolean
}

export function SearchDestination({
  query,
  onChangeQuery,
  onAddCustomDestination,
  hasExactMatch,
}: SearchDestinationProps) {
  const handleAdd = () => {
    if (query.trim() && onAddCustomDestination) {
      onAddCustomDestination(query.trim())
      onChangeQuery("") // Reset query after adding
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto mb-8 space-y-3 select-none">
      {/* Search Input Box */}
      <div className="relative rounded-2xl border border-slate-200/60 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl shadow-sm focus-within:ring-2 focus-within:ring-primary-blue/30 focus-within:border-primary-blue transition-all duration-300">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
          <Search className="size-4 stroke-[2.5]" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => onChangeQuery(e.target.value)}
          placeholder="Search for your dream destination..."
          className="w-full pl-11 pr-4 py-3 text-sm bg-transparent outline-none border-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-semibold"
        />
      </div>

      {/* Suggestion addition overlay when query matches no default list items */}
      <AnimatePresence>
        {query.trim().length > 1 && !hasExactMatch && onAddCustomDestination && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between p-3.5 bg-blue-50/30 border border-blue-100/30 dark:bg-blue-950/10 dark:border-blue-900/20 rounded-2xl shadow-sm"
          >
            <div className="text-xs font-semibold text-slate-650 dark:text-slate-400">
              Don&apos;t see it? Add <span className="text-primary-blue dark:text-blue-400 font-bold">&quot;{query.trim()}&quot;</span> to your wishlist.
            </div>
            <motion.button
              type="button"
              onClick={handleAdd}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-blue text-white text-xs font-bold hover:bg-blue-600 shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="size-3 stroke-[3]" />
              <span>Add Custom</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
