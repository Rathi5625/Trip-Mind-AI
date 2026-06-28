"use client"

import * as React from "react"
import { useForecast } from "../hooks/useForecast"
import { useCurrency } from "../hooks/useCurrency"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

export function ExpenseBreakdown() {
  const { breakdown } = useForecast()
  const { formatValue } = useCurrency()
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null)

  const toggleExpand = (cat: string) => {
    setExpandedCategory(expandedCategory === cat ? null : cat)
  }

  const categories = [
    {
      key: "flights",
      label: "Flights",
      value: breakdown.flights,
      color: "bg-blue-600",
      details: [
        { name: "Airlines Base Fare", percent: 0.75 },
        { name: "Taxes & Airport Fees", percent: 0.15 },
        { name: "Baggage Allowance", percent: 0.10 }
      ]
    },
    {
      key: "accommodation",
      label: "Stays",
      value: breakdown.accommodation,
      color: "bg-emerald-500",
      details: [
        { name: "Hotel Nightly Rate", percent: 0.85 },
        { name: "Local Lodging Taxes", percent: 0.15 }
      ]
    },
    {
      key: "dining",
      label: "Dining",
      value: breakdown.dining,
      color: "bg-amber-500",
      details: [
        { name: "Daily Breakfast Buffets", percent: 0.20 },
        { name: "Lunch & Cafe Snacks", percent: 0.35 },
        { name: "Gourmet Dinners", percent: 0.45 }
      ]
    },
    {
      key: "activities",
      label: "Activities",
      value: breakdown.activities,
      color: "bg-[#D6A89C]",
      details: [
        { name: "Attraction Entry Tickets", percent: 0.40 },
        { name: "Local Trains & Pass", percent: 0.30 },
        { name: "Guided Tours", percent: 0.30 }
      ]
    }
  ]

  return (
    <div className="flex flex-col gap-3 select-none w-full">
      
      <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-white/5">
        <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
          🔍 Detailed Estimates Breakdown
        </span>
        <span className="text-[8px] font-bold text-slate-400">Click card to expand</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {categories.map((cat) => {
          const isExpanded = expandedCategory === cat.key

          return (
            <div
              key={cat.key}
              onClick={() => toggleExpand(cat.key)}
              className={`flex flex-col p-4 rounded-2xl border transition-all cursor-pointer ${
                isExpanded
                  ? "border-blue-500 bg-blue-500/5 ring-1 ring-blue-500/10 dark:bg-blue-900/10"
                  : "border-black/5 bg-slate-50/50 hover:bg-slate-100 dark:border-white/5 dark:bg-slate-950/20 dark:hover:bg-slate-900/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className={`size-2 rounded-full ${cat.color}`} />
                  <span className="text-[8.5px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                    {cat.label}
                  </span>
                </div>
                {isExpanded ? <ChevronUp className="size-3.5 text-slate-400" /> : <ChevronDown className="size-3.5 text-slate-400" />}
              </div>

              <span className="text-sm font-black text-slate-805 dark:text-slate-105 mt-1.5">
                {formatValue(cat.value)}
              </span>

              {/* Accordion Expandable panel */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 mt-3 border-t border-slate-100 dark:border-white/5 space-y-2 text-[9px] font-bold text-slate-500 dark:text-slate-400">
                      {cat.details.map((sub, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span>{sub.name}</span>
                          <span className="text-slate-700 dark:text-slate-350">
                            {formatValue(Math.round(cat.value * sub.percent))}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

    </div>
  )
}
