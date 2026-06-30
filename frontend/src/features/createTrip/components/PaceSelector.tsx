"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Coffee, Accessibility, Activity } from "lucide-react"
import { Pace } from "../types/preferences"
import { cn } from "@/lib/utils"

interface PaceSelectorProps {
  options: Pace[]
  selectedId: string
  onChange: (id: string) => void
}

export function PaceSelector({ options, selectedId, onChange }: PaceSelectorProps) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    relaxed: Coffee,
    balanced: Accessibility,
    fast: Activity
  }

  const selectedOption = options.find(o => o.id === selectedId)

  return (
    <div className="space-y-4 select-none w-full">
      {/* Segmented Buttons Container */}
      <div className="grid grid-cols-3 gap-3.5 p-1 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-black/5 dark:border-white/5">
        {options.map((opt) => {
          const Icon = iconMap[opt.id] || Coffee
          const isSelected = selectedId === opt.id

          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={cn(
                "relative flex flex-col items-center justify-center py-4 rounded-xl text-xs font-black transition-all cursor-pointer",
                isSelected
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/40"
              )}
            >
              {/* Highlight Slide for active tab */}
              {isSelected && (
                <motion.div
                  layoutId="activePaceSelector"
                  className="absolute inset-0 bg-blue-600 rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              
              <Icon className={cn("size-4.5 mb-1.5", isSelected ? "text-white" : "text-slate-400 dark:text-slate-500")} />
              <span>{opt.label}</span>
            </button>
          )
        })}
      </div>

      {/* Helpful Description display */}
      {selectedOption && (
        <motion.p
          key={selectedOption.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] font-semibold text-slate-450 dark:text-slate-500 italic text-center"
        >
          💡 {selectedOption.description}
        </motion.p>
      )}
    </div>
  )
}
