"use client"

import * as React from "react"
import { Map, MoreHorizontal } from "lucide-react"
import { Activity } from "../types/itinerary"

interface ActivityCardProps {
  activity: Activity
  onViewOnMap?: (act: Activity) => void
}

export function ActivityCard({ activity, onViewOnMap }: ActivityCardProps) {
  const { time, category, title, description, cost } = activity

  const getCategoryStyles = () => {
    switch (category) {
      case "Dining":
        return "bg-orange-55/80 text-orange-600 border-orange-100 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30"
      case "Transit":
        return "bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-800/30 dark:text-slate-400 dark:border-slate-800/50"
      case "Hotel":
        return "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30"
      default: // Activity
        return "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30"
    }
  }

  const handleViewMap = () => {
    if (onViewOnMap) {
      onViewOnMap(activity)
    } else {
      alert(`Highlighting coordinates: [x: ${activity.coordinates.x}, y: ${activity.coordinates.y}] for ${title}`)
    }
  }

  return (
    <div className="flex-1 flex flex-col p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/60 transition-transform duration-300 hover:scale-[1.01] select-none">
      
      {/* Top row with Time, Pill, Cost */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-50 dark:border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-blue-600 dark:text-blue-400">
            {time}
          </span>
          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${
            getCategoryStyles()
          }`}>
            {category}
          </span>
        </div>
        
        <span className="text-xs font-black text-slate-800 dark:text-slate-100">
          {cost > 0 ? `¥${cost.toLocaleString()}` : "Free"}
        </span>
      </div>

      {/* Main Title and Description */}
      <div className="space-y-1.5 flex-1">
        <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
          {title}
        </h4>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
          {description}
        </p>
      </div>

      {/* Actions Row */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-50 dark:border-white/5 shrink-0">
        <button
          onClick={handleViewMap}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/5 bg-slate-50 hover:bg-slate-100 text-[10px] font-bold text-slate-600 dark:border-white/10 dark:bg-slate-800/40 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Map className="size-3" />
          <span>View on Map</span>
        </button>

        <button
          onClick={() => alert(`More options for activity: ${title}`)}
          className="p-1.5 rounded-xl border border-black/5 bg-slate-50 hover:bg-slate-100 text-slate-400 dark:border-white/10 dark:bg-slate-800/40 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="More options"
        >
          <MoreHorizontal className="size-3.5" />
        </button>
      </div>
    </div>
  )
}
