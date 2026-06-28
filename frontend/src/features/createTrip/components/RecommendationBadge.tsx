"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface RecommendationBadgeProps {
  score?: number
  category?: string
  className?: string
}

export function RecommendationBadge({ score, category, className }: RecommendationBadgeProps) {
  if (score !== undefined) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black text-slate-100 bg-black/40 backdrop-blur-md border border-white/10 shadow-sm uppercase tracking-wider",
          className
        )}
      >
        <span className="text-amber-400">★</span>
        <span>{score}% Match</span>
      </span>
    )
  }

  const getCategoryColor = () => {
    switch (category?.toLowerCase()) {
      case "culinary":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "wellness":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "romance":
        return "bg-rose-500/20 text-rose-400 border-rose-500/30"
      case "adventure":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-widest",
        getCategoryColor(),
        className
      )}
    >
      {category}
    </span>
  )
}
