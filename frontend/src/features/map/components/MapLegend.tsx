"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { MapPin, Flame, Gem, TrendingUp } from "lucide-react"

const LEGEND_ITEMS = [
  { color: "bg-blue-500", label: "AI Recommended", icon: MapPin },
  { color: "bg-orange-500", label: "Trending", icon: TrendingUp },
  { color: "bg-emerald-500", label: "Hidden Gems", icon: Gem },
  { color: "bg-rose-500", label: "Peak Season", icon: Flame }
]

export function MapLegend() {
  const [isExpanded, setIsExpanded] = React.useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-black/8 dark:border-white/8 shadow-xl overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full px-3 py-2.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Legend</span>
        <span className="text-[9px] text-slate-400">{isExpanded ? "▲" : "▼"}</span>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          className="px-3 pb-3 space-y-2"
        >
          {LEGEND_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex items-center gap-2">
                <div className={`size-2.5 rounded-full ${item.color} shrink-0`} />
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{item.label}</span>
              </div>
            )
          })}
        </motion.div>
      )}
    </motion.div>
  )
}
