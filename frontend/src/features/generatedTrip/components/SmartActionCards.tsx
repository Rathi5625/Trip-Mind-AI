"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { FileText, Calendar, Share2, Map, Plane, Hotel } from "lucide-react"

export function SmartActionCards() {
  const actions = [
    { label: "Export PDF", icon: FileText, action: () => alert("PDF itinerary export complete!") },
    { label: "Add to Calendar", icon: Calendar, action: () => alert("Itinerary slots synced to Google/Apple Calendar!") },
    { label: "Share Trip", icon: Share2, action: () => alert("Copied private sharing link to clipboard!") },
    { label: "Interactive Map", icon: Map, action: () => alert("Opening full interactive routes...") },
    { label: "Book Flights", icon: Plane, action: () => alert("Opening airline checkout options...") },
    { label: "Book Hotels", icon: Hotel, action: () => alert("Syncing partner hotel comparisons...") }
  ]

  return (
    <div className="space-y-3.5 select-none text-left w-full">
      
      {/* Header */}
      <span className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
        Quick Actions
      </span>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {actions.map((act) => {
          const IconComp = act.icon
          return (
            <motion.button
              key={act.label}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={act.action}
              className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-black/5 dark:bg-slate-900/60 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm text-left focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                <IconComp className="size-3.5" />
              </div>
              <span className="text-[10px] font-black uppercase text-slate-655 dark:text-slate-205 tracking-wide truncate">
                {act.label}
              </span>
            </motion.button>
          )
        })}
      </div>

    </div>
  )
}
