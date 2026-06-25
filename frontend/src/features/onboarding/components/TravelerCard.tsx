"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { AnimatedCard } from "@/components/ui/AnimatedCard"
import { TravelerType } from "../types/traveler"

interface TravelerCardProps {
  type: TravelerType
  selected: boolean
  onClick: () => void
}

export function TravelerCard({ type, selected, onClick }: TravelerCardProps) {
  return (
    <AnimatedCard
      selected={selected}
      onClick={onClick}
      className="h-[150px] sm:h-[170px]"
    >
      {/* Floating Checkmark (Top-Right) */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="absolute top-3 right-3 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm"
          >
            <Check className="size-3 stroke-[3]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Large Emoji / Icon */}
      <span className="text-3xl sm:text-4xl select-none" role="img" aria-label={type.title}>
        {type.emoji}
      </span>

      {/* Card Content */}
      <h3 className="text-sm font-bold tracking-tight text-slate-800 dark:text-white mt-3.5">
        {type.title}
      </h3>
      <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 leading-normal max-w-[140px] mt-1 select-none font-medium">
        {type.description}
      </p>
    </AnimatedCard>
  )
}
