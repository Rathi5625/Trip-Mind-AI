"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface TimelineNodeProps {
  category?: "Activity" | "Dining" | "Transit" | "Hotel"
  isLast?: boolean
}

export function TimelineNode({ category = "Activity", isLast = false }: TimelineNodeProps) {
  const getNodeColor = () => {
    switch (category) {
      case "Dining":
        return "bg-orange-500 shadow-orange-500/30"
      case "Transit":
        return "bg-slate-400 shadow-slate-400/30"
      case "Hotel":
        return "bg-amber-500 shadow-amber-500/30"
      default: // Activity
        return "bg-blue-600 shadow-blue-500/30"
    }
  }

  const getPingColor = () => {
    switch (category) {
      case "Dining":
        return "bg-orange-400"
      case "Transit":
        return "bg-slate-300"
      case "Hotel":
        return "bg-amber-400"
      default:
        return "bg-blue-400"
    }
  }

  return (
    <div className="flex flex-col items-center shrink-0 w-8 select-none relative h-full">
      {/* Node Dot */}
      <div className="relative z-10 flex size-5.5 items-center justify-center rounded-full bg-white dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-800 shadow-sm mt-5">
        <span className="absolute flex size-3">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${
            getPingColor()
          }`} />
        </span>
        <div className={`size-2.5 rounded-full ${getNodeColor()}`} />
      </div>

      {/* Vertical Line Link */}
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-0.5 bg-slate-100 dark:bg-slate-800 origin-top flex-1 mt-1.5"
          style={{ minHeight: "100px" }}
        />
      )}
    </div>
  )
}
