"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { GROUP_OPTIONS } from "../constants/preferenceOptions"
import { GroupType } from "../types/preferences"
import { cn } from "@/lib/utils"

interface GroupSelectorProps {
  value: GroupType | null
  onChange: (value: GroupType) => void
}

export function GroupSelector({ value, onChange }: GroupSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3 select-none">
      {GROUP_OPTIONS.map((option) => {
        const isSelected = value === option.id
        const Icon = option.icon

        return (
          <motion.button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative px-5 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-blue/50 flex items-center gap-2",
              isSelected
                ? "bg-primary-blue border-primary-blue text-white shadow-md shadow-blue-500/10"
                : "bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:text-slate-800 dark:bg-slate-900/60 dark:border-white/5 dark:text-slate-300 dark:hover:border-white/10"
            )}
          >
            <Icon className={cn("size-3.5", isSelected ? "text-white" : "text-slate-400 dark:text-slate-500")} />
            <span>{option.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
