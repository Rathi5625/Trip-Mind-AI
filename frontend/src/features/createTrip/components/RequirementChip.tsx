"use client"

import * as React from "react"
import { useRequirements } from "../hooks/useRequirements"
import { SPECIAL_REQUIREMENTS } from "../constants/travelerOptions"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function RequirementChip() {
  const { requirements, toggleRequirement } = useRequirements()

  return (
    <div className="flex flex-wrap gap-2.5 select-none">
      {SPECIAL_REQUIREMENTS.map((req) => {
        const isSelected = requirements.includes(req)

        return (
          <motion.button
            key={req}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleRequirement(req)}
            className={cn(
              "px-4 py-2 rounded-full border text-[9.5px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm",
              isSelected
                ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/10"
                : "bg-white hover:bg-slate-50 border-black/5 text-slate-655 dark:bg-slate-900 dark:border-white/5 dark:text-slate-350 dark:hover:bg-slate-800"
            )}
          >
            {req}
          </motion.button>
        )
      })}
    </div>
  )
}
