"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles, Calendar, Utensils, Compass, Home, Landmark } from "lucide-react"

interface HoverTripPreviewProps {
  name: string
  duration: string
  restaurantsCount: number
  attractionsCount: number
  hotelsCount: number
  budget: number
  matchScore: number
}

export function HoverTripPreview({
  name,
  duration,
  restaurantsCount,
  attractionsCount,
  hotelsCount,
  budget,
  matchScore
}: HoverTripPreviewProps) {
  
  const formatCurrency = (val: number) => {
    return `₹${(val / 1000).toFixed(0)}k`
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-64 p-4 rounded-3xl border border-white/20 bg-slate-900/90 text-white shadow-2xl backdrop-blur-xl space-y-3 pointer-events-none select-none text-left"
    >
      
      {/* Target Triangle Arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900/95" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="space-y-0.5">
          <h5 className="text-xs font-black tracking-tight">{name}</h5>
          <div className="flex items-center gap-1 text-[9px] font-semibold text-slate-400">
            <Calendar className="size-2.5" />
            <span>{duration}</span>
          </div>
        </div>
        <div className="bg-blue-500/20 border border-blue-450/30 px-2 py-0.5 rounded-lg flex items-center gap-0.5 text-[8.5px] font-black text-blue-300 uppercase tracking-wide">
          <Sparkles className="size-2.5 fill-blue-300/10" />
          <span>{matchScore}% Match</span>
        </div>
      </div>

      {/* Details list */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 text-[10px] font-bold text-slate-300">
        
        {/* Restaurants */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs">🍣</span>
          <span>{restaurantsCount} Dining Spots</span>
        </div>

        {/* Attractions */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs">🏯</span>
          <span>{attractionsCount} Landmarks</span>
        </div>

        {/* Hotels */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs">🏨</span>
          <span>{hotelsCount} Hotel Deals</span>
        </div>

        {/* Budget */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs">💰</span>
          <span>Est. {formatCurrency(budget)}</span>
        </div>

      </div>

      {/* Concierge tag overlay */}
      <div className="pt-2 border-t border-white/10 text-[8px] font-black uppercase text-slate-405 tracking-wider flex items-center gap-1 justify-center">
        <span>🤖</span>
        <span>Atlas AI Live Itinerary Preview</span>
      </div>

    </motion.div>
  )
}
