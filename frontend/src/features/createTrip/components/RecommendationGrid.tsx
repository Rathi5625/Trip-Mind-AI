"use client"

import * as React from "react"
import { Destination } from "../types/createTrip"
import { DestinationCard } from "./DestinationCard"
import { motion } from "framer-motion"

interface RecommendationGridProps {
  destinations: Destination[]
  onSelect: (dest: Destination) => void
}

export function RecommendationGrid({ destinations, onSelect }: RecommendationGridProps) {
  if (destinations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-slate-200 rounded-3xl dark:border-white/5 bg-slate-50/20 dark:bg-slate-900/10 select-none">
        <span className="text-3xl mb-2">🏝️</span>
        <h4 className="text-xs font-black text-slate-850 dark:text-slate-100 uppercase tracking-wider">
          No matches found
        </h4>
        <p className="text-[10px] font-bold text-slate-500 max-w-xs leading-relaxed mt-1">
          Try expanding your search query or select from one of our popular quick start destinations.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
      {destinations.map((dest, index) => (
        <motion.div
          key={dest.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <DestinationCard destination={dest} onSelect={onSelect} />
        </motion.div>
      ))}
    </div>
  )
}
