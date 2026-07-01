"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { BudgetOption } from "../types/destination"

interface BudgetProfilesProps {
  profiles: BudgetOption[]
  activeProfile: "Economy" | "Premium" | "Ultra Luxury"
  onSelectProfile: (style: "Economy" | "Premium" | "Ultra Luxury") => void
}

export function BudgetProfiles({
  profiles,
  activeProfile,
  onSelectProfile
}: BudgetProfilesProps) {
  return (
    <div className="w-full select-none text-center max-w-6xl mx-auto space-y-6">
      
      {/* Title */}
      <div className="space-y-1 text-center">
        <h3 className="text-sm font-black text-slate-805 dark:text-white uppercase tracking-wider">
          Travel Your Way
        </h3>
      </div>

      {/* Grid containing 3 budget profiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {profiles.map((p) => {
          const isActive = activeProfile === p.style
          return (
            <div
              key={p.style}
              onClick={() => onSelectProfile(p.style)}
              className={`p-6 rounded-3xl border flex flex-col justify-between space-y-6 cursor-pointer transition-all duration-300 relative
                ${
                  isActive
                    ? "border-blue-650 bg-blue-500/5 shadow-md ring-1 ring-blue-500/30"
                    : "border-black/5 bg-white shadow-sm hover:border-black/10 dark:border-white/5 dark:bg-slate-900/40"
                }
              `}
            >
              
              {/* Popular overlay overlay badge */}
              {p.isPopular && (
                <div className="absolute top-4 right-4 bg-blue-600 px-2 py-0.5 rounded text-[8px] font-black text-white uppercase tracking-wider">
                  Popular
                </div>
              )}

              {/* Header style facts */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="block text-[10px] font-black uppercase text-slate-400">
                    {p.style}
                  </span>
                  <span
                    className={`block text-xs font-black
                      ${isActive ? "text-blue-550 dark:text-blue-400" : "text-slate-500"}
                    `}
                  >
                    {p.style === "Economy" ? "Authentic & Grounded" : p.style === "Premium" ? "Curated & Balanced" : "Bespoke & Exclusive"}
                  </span>
                </div>

                {/* Pricing daily cost */}
                <div className="space-y-0.5">
                  <span className="text-3xl font-black text-slate-805 dark:text-white">
                    {p.dailyBudget}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400"> /day</span>
                </div>

                {/* Checklist options */}
                <div className="space-y-2 border-t border-black/5 dark:border-white/5 pt-4">
                  {p.hotelSuggestions.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-[10.5px] font-bold text-slate-700 dark:text-slate-300">
                      <div className="flex size-4.5 items-center justify-center rounded-full bg-blue-500/10 text-blue-605">
                        <Check className="size-3 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-[10.5px] font-bold text-slate-700 dark:text-slate-300">
                    <div className="flex size-4.5 items-center justify-center rounded-full bg-blue-500/10 text-blue-605">
                      <Check className="size-3 stroke-[3]" />
                    </div>
                    <span>{p.transportStyle}</span>
                  </div>
                  {p.foodSuggestions.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-[10.5px] font-bold text-slate-700 dark:text-slate-300">
                      <div className="flex size-4.5 items-center justify-center rounded-full bg-blue-500/10 text-blue-605">
                        <Check className="size-3 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selection Button */}
              <button
                type="button"
                className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer text-center
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-black/5 dark:bg-slate-900 dark:text-slate-305 dark:border-white/5"
                  }
                `}
              >
                Select Profile
              </button>

            </div>
          )
        })}
      </div>

    </div>
  )
}
