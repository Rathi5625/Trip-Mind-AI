"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { AnimatedCard } from "@/components/ui/AnimatedCard"
import { BudgetOption } from "../constants/preferenceOptions"

interface BudgetCardProps {
  option: BudgetOption
  selected: boolean
  onClick: () => void
}

export function BudgetCard({ option, selected, onClick }: BudgetCardProps) {
  return (
    <AnimatedCard
      selected={selected}
      onClick={onClick}
      className="h-[90px] sm:h-[105px] !p-5 flex flex-col justify-center items-start text-left relative overflow-hidden"
    >
      {/* Floating Checkmark Badge on Top-Right */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
            className="absolute top-4 right-4 flex size-5 items-center justify-center rounded-full bg-primary-blue text-white shadow-sm"
          >
            <Check className="size-3 stroke-[3]" />
          </motion.div>
        )}
      </AnimatePresence>

      <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white select-none">
        {option.title}
      </span>
      <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-semibold select-none mt-1">
        {option.priceRange}
      </span>
    </AnimatedCard>
  )
}
