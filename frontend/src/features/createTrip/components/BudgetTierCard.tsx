"use client"

import * as React from "react"
import { PiggyBank, Bed, Gem, Star, Check } from "lucide-react"
import { useBudgetStore } from "../store/budgetStore"
import { useCurrency } from "../hooks/useCurrency"
import { BUDGET_PRESETS } from "../constants/budgetPresets"
import { BudgetPreset } from "../types/budget"
import { cn } from "@/lib/utils"

const iconMap = {
  piggy: PiggyBank,
  bed: Bed,
  gem: Gem,
  star: Star
}

export function BudgetTierCard() {
  const { selectedTier, setSelectedTier } = useBudgetStore()
  const { formatValue } = useCurrency()

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 select-none">
      {BUDGET_PRESETS.map((preset: BudgetPreset) => {
        const IconComponent = iconMap[preset.iconName]
        const isActive = selectedTier === preset.id

        return (
          <button
            key={preset.id}
            onClick={() => setSelectedTier(preset.id)}
            className={cn(
              "relative flex flex-col items-start p-5 rounded-3xl border text-left transition-all cursor-pointer w-full gap-3.5 group",
              isActive
                ? "border-blue-600 bg-blue-600/5 ring-1 ring-blue-600/10 dark:bg-blue-900/10"
                : "border-black/5 bg-white hover:bg-slate-50 dark:border-white/5 dark:bg-slate-900/60 dark:hover:bg-slate-800"
            )}
          >
            {/* Selected Badge */}
            {isActive && (
              <span className="absolute top-3.5 right-3.5 flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[7.5px] font-black uppercase bg-blue-600 text-white shadow-sm tracking-wider">
                <Check className="size-2 shrink-0" />
                <span>Selected</span>
              </span>
            )}

            {/* Icon Box */}
            <div className={cn(
              "flex size-9 items-center justify-center rounded-2xl border transition-colors",
              isActive
                ? "bg-blue-600/10 border-blue-600/20 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                : "bg-slate-50 border-black/5 text-slate-400 dark:bg-slate-850 dark:border-white/5"
            )}>
              <IconComponent className="size-4.5" />
            </div>

            {/* Text details */}
            <div className="space-y-1">
              <h4 className="text-xs font-black text-slate-805 dark:text-slate-105 group-hover:text-blue-600 transition-colors">
                {preset.label}
              </h4>
              
              {/* Localized Price Representation */}
              <span className="block text-[10px] font-black text-slate-500 dark:text-slate-400">
                {preset.id === "budget" && `< ${formatValue(1500)}`}
                {preset.id === "comfort" && `${formatValue(1500)} - ${formatValue(3000)}`}
                {preset.id === "premium" && `${formatValue(3000)} - ${formatValue(6000)}`}
                {preset.id === "luxury" && `${formatValue(6000)}+`}
              </span>

              <p className="text-[8.5px] font-bold text-slate-400 dark:text-slate-500 leading-relaxed mt-1">
                {preset.description}
              </p>
            </div>

          </button>
        )
      })}
    </div>
  )
}
