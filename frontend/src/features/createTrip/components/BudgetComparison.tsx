"use client"

import * as React from "react"
import { useBudgetStore } from "../store/budgetStore"
import { useCurrency } from "../hooks/useCurrency"
import { BUDGET_PRESETS } from "../constants/budgetPresets"
import { BudgetPreset } from "../types/budget"
import { motion, AnimatePresence } from "framer-motion"
import { HelpCircle, ChevronRight } from "lucide-react"

export function BudgetComparison() {
  const { selectedTier, setSelectedTier } = useBudgetStore()
  const { formatValue } = useCurrency()
  const [hoveredTier, setHoveredTier] = React.useState<BudgetPreset | null>(null)

  // Hardcode comparison baseline values as requested
  const tierCostMap = {
    budget: 1500,
    comfort: 3000,
    premium: 4800,
    luxury: 7200
  }

  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl select-none space-y-4 relative w-full">
      
      <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-white/5">
        <h4 className="text-[10px] font-black uppercase text-slate-805 dark:text-slate-100 tracking-wider">
          ⚖️ Compare Budget Tiers
        </h4>
        <span className="text-[8px] font-bold text-slate-400">Hover for details</span>
      </div>

      <div className="flex flex-col gap-2 relative">
        {BUDGET_PRESETS.map((preset) => {
          const isSelected = selectedTier === preset.id
          const cost = tierCostMap[preset.id]

          return (
            <div
              key={preset.id}
              onMouseEnter={() => setHoveredTier(preset)}
              onMouseLeave={() => setHoveredTier(null)}
              onClick={() => setSelectedTier(preset.id)}
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? "border-blue-500 bg-blue-500/5 dark:bg-blue-900/10"
                  : "border-black/5 bg-white/50 hover:bg-slate-100/50 dark:border-white/5 dark:bg-slate-950/20 dark:hover:bg-slate-800/40"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black capitalize ${isSelected ? "text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-350"}`}>
                  {preset.label}
                </span>
                {isSelected && (
                  <span className="text-[8px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-450 bg-blue-500/10 px-1.5 py-0.5 rounded-md">
                    Selected
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-1.5">
                <span className="text-[10.5px] font-black text-slate-805 dark:text-slate-100">
                  {formatValue(cost)}
                </span>
                <ChevronRight className="size-3 text-slate-400 shrink-0" />
              </div>
            </div>
          )
        })}

        {/* Hover details overlay card */}
        <AnimatePresence>
          {hoveredTier && hoveredTier.hoverDetails && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute left-0 right-0 -top-40 z-30 p-4 rounded-3xl border border-blue-500/20 bg-white/95 dark:bg-slate-900/95 shadow-xl backdrop-blur-md space-y-2.5"
            >
              <div className="flex items-center gap-1.5 pb-1.5 border-b border-slate-100 dark:border-white/5">
                <span className="text-[10px] font-black text-blue-650 dark:text-blue-400 uppercase tracking-widest">
                  {hoveredTier.label} Inclusions
                </span>
              </div>

              <div className="space-y-1.5 text-[9px] font-semibold text-slate-650 dark:text-slate-350">
                <div>
                  <span className="font-black text-slate-400 block text-[7.5px] uppercase">🏨 Accommodation:</span>
                  <p className="leading-snug mt-0.5">{hoveredTier.hoverDetails.accommodation}</p>
                </div>
                <div>
                  <span className="font-black text-slate-400 block text-[7.5px] uppercase">🍜 Dining:</span>
                  <p className="leading-snug mt-0.5">{hoveredTier.hoverDetails.dining}</p>
                </div>
                <div>
                  <span className="font-black text-slate-400 block text-[7.5px] uppercase">🎒 Activities:</span>
                  <p className="leading-snug mt-0.5">{hoveredTier.hoverDetails.activities}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}
