"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Star, Calendar, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import { Destination } from "../types/destination"

interface DestinationCardProps {
  destination: Destination
  selected: boolean
  onClick: () => void
  tabIndex?: number
}

export function DestinationCard({
  destination,
  selected,
  onClick,
  tabIndex = 0,
}: DestinationCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <motion.div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={tabIndex}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className={cn(
        "relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] cursor-pointer select-none border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 group shadow-md",
        selected
          ? "border-primary-blue shadow-[0_12px_30px_rgba(37,99,235,0.18)]"
          : "border-slate-100 dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
      )}
      role="checkbox"
      aria-checked={selected}
    >
      {/* Zoomable Background Travel Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <motion.img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover"
          animate={{ scale: selected ? 1.05 : 1 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Glass overlay & light highlighting when selected */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-blue-500/10 dark:bg-blue-950/20 backdrop-blur-[0.5px] z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Dark gradient overlay for typography readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5 z-10 pointer-events-none" />

      {/* Top Badges (AI Match & Rating) */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-1.5">
          {/* Match % */}
          <div className="flex items-center px-2 py-1 rounded-xl bg-emerald-500/95 dark:bg-emerald-600/95 backdrop-blur-md shadow-sm border border-emerald-400/20 text-white text-[10px] font-extrabold tracking-tight">
            {destination.aiMatch}% Match
          </div>
          {/* Rating */}
          <div className="flex items-center gap-0.5 px-2 py-1 rounded-xl bg-black/40 dark:bg-slate-900/50 backdrop-blur-md shadow-sm border border-white/10 text-white text-[10px] font-extrabold">
            <Star className="size-2.5 text-amber-400 fill-amber-400" />
            <span>{destination.rating}</span>
          </div>
        </div>

        {/* Checked Badge */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              className="flex size-6 items-center justify-center rounded-full bg-primary-blue text-white shadow-md border border-white/20"
            >
              <Check className="size-3.5 stroke-[3]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Details at the Bottom */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none select-none text-left space-y-1.5">
        {/* Name and flag */}
        <div className="flex items-center gap-1.5">
          <span className="text-base sm:text-lg font-extrabold text-white tracking-tight drop-shadow-sm truncate">
            {destination.name}
          </span>
          <span className="text-lg sm:text-xl leading-none shrink-0 drop-shadow-sm">{destination.flag}</span>
        </div>

        {/* Upgraded Info: Season & Budget */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] sm:text-[11px] font-bold text-slate-300 tracking-wide">
          <div className="flex items-center gap-1">
            <Calendar className="size-3 text-slate-400 shrink-0" />
            <span>{destination.bestSeason}</span>
          </div>
          <div className="h-2.5 w-px bg-slate-500/50" />
          <div className="flex items-center gap-1">
            <CreditCard className="size-3 text-slate-400 shrink-0" />
            <span>{destination.averageBudget}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
