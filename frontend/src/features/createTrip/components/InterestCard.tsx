"use client"

import * as React from "react"
import { motion } from "framer-motion"
import * as Lucide from "lucide-react"
import { Interest } from "../types/preferences"
import { cn } from "@/lib/utils"

interface InterestCardProps {
  interest: Interest
  isSelected: boolean
  onClick: () => void
}

export function InterestCard({ interest, isSelected, onClick }: InterestCardProps) {
  // Dynamically resolve icon from Lucide library
  const IconComponent = (Lucide as any)[interest.icon] || Lucide.Compass

  return (
    <div className="flex flex-col gap-2 select-none">
      {/* Top indicator checkbox */}
      <div className="flex items-center pl-1">
        <button
          onClick={onClick}
          className={cn(
            "size-4 rounded flex items-center justify-center transition-all cursor-pointer border",
            isSelected
              ? "bg-blue-600 border-blue-600 text-white"
              : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
          )}
          aria-label={`Toggle interest ${interest.label}`}
        >
          {isSelected && <Lucide.Check className="size-3 stroke-[3]" />}
        </button>
      </div>

      {/* Main Card Container */}
      <motion.div
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={cn(
          "relative flex flex-col justify-between p-5 h-36 rounded-2xl border bg-white dark:bg-slate-900 shadow-sm cursor-pointer transition-all duration-200",
          isSelected
            ? "border-blue-600 dark:border-blue-500 shadow-blue-500/5 ring-1 ring-blue-500/20"
            : "border-black/5 hover:border-black/10 dark:border-white/5 dark:hover:border-white/10"
        )}
      >
        {/* Top Icon and Circular Indicator */}
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "flex size-11 items-center justify-center rounded-xl transition-colors",
              isSelected
                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
            )}
          >
            <IconComponent className="size-5.5 stroke-[2]" />
          </div>

          <div
            className={cn(
              "size-5.5 rounded-full border transition-all flex items-center justify-center",
              isSelected
                ? "border-blue-600 bg-blue-600 text-white dark:border-blue-400 dark:bg-blue-400"
                : "border-slate-200 dark:border-slate-800"
            )}
          >
            {isSelected && <Lucide.Check className="size-3 stroke-[2.5]" />}
          </div>
        </div>

        {/* Text descriptions */}
        <div className="space-y-0.5 mt-4">
          <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none">
            {interest.label}
          </h4>
          <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 truncate leading-tight">
            {interest.subtitle}
          </p>
        </div>
      </motion.div>
    </div>
  )
}
