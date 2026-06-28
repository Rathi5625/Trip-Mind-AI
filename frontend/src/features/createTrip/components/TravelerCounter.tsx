"use client"

import * as React from "react"
import { Plus, Minus } from "lucide-react"
import { useTravelersStore } from "../store/travelersStore"
import { motion, AnimatePresence } from "framer-motion"

export function TravelerCounter() {
  const { headcount, updateHeadcount } = useTravelersStore()

  const categories = [
    { key: "adults" as const, label: "Adults", desc: "Age 13+", min: 1 },
    { key: "children" as const, label: "Children", desc: "Ages 2-12", min: 0 },
    { key: "infants" as const, label: "Infants", desc: "Under 2", min: 0 }
  ]

  return (
    <div className="p-6 rounded-3xl border border-black/5 bg-white/45 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl select-none space-y-5">
      {categories.map((cat) => {
        const count = headcount[cat.key]
        const isMin = count <= cat.min

        return (
          <div key={cat.key} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0 dark:border-white/5 last:pb-0">
            <div>
              <h4 className="text-xs font-black text-slate-805 dark:text-slate-105">{cat.label}</h4>
              <p className="text-[9px] font-bold text-slate-400 dark:text-slate-550 mt-0.5">{cat.desc}</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Minus Button */}
              <button
                onClick={() => updateHeadcount(cat.key, -1)}
                disabled={isMin}
                className="flex size-8 items-center justify-center rounded-xl border border-black/5 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed dark:bg-slate-950 dark:border-white/5 dark:hover:bg-slate-900 text-slate-500 transition-colors cursor-pointer"
                aria-label={`Decrease ${cat.label}`}
              >
                <Minus className="size-3.5" />
              </button>

              {/* Counter Display with number animation */}
              <div className="w-6 text-center text-sm font-black text-slate-850 dark:text-slate-105">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={count}
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="inline-block"
                  >
                    {count}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Plus Button */}
              <button
                onClick={() => updateHeadcount(cat.key, 1)}
                className="flex size-8 items-center justify-center rounded-xl border border-black/5 bg-white hover:bg-slate-50 dark:bg-slate-950 dark:border-white/5 dark:hover:bg-slate-900 text-slate-500 transition-colors cursor-pointer"
                aria-label={`Increase ${cat.label}`}
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
