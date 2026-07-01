"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Bookmark, Sparkles, Clock, DollarSign } from "lucide-react"

interface HiddenGemCardProps {
  id: string
  name: string
  country: string
  imageUrl: string
  description: string
  discoveryScore: number
  cost: number
  duration: string
  isBookmarked: boolean
  onToggleBookmark: (id: string) => void
}

export function HiddenGemCard({
  id,
  name,
  country,
  imageUrl,
  description,
  discoveryScore,
  cost,
  duration,
  isBookmarked,
  onToggleBookmark
}: HiddenGemCardProps) {
  
  const formatVal = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(val)
  }

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="w-[280px] rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/60 backdrop-blur-xl overflow-hidden shrink-0 select-none text-left flex flex-col group"
    >
      
      {/* Image container with badges */}
      <div className="relative h-44 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Hidden Gem badge overlay top-left */}
        <div className="absolute top-4 left-4 bg-orange-500/90 dark:bg-orange-500/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-orange-400/20 flex items-center gap-1">
          <Sparkles className="size-3 text-white fill-white/10" />
          <span className="text-[9.5px] font-black text-white uppercase tracking-wider">
            Hidden Gem ({discoveryScore}%)
          </span>
        </div>

        {/* Bookmark overlay top-right */}
        <button
          type="button"
          onClick={() => onToggleBookmark(id)}
          className="absolute top-4 right-4 size-8 rounded-full bg-slate-900/40 hover:bg-slate-900/60 text-white backdrop-blur-md flex items-center justify-center cursor-pointer transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Bookmark
            className={`size-4.5 transition-colors
              ${isBookmarked ? "fill-orange-500 text-orange-500" : "text-white"}
            `}
          />
        </button>
      </div>

      {/* Details bottom */}
      <div className="p-4 flex-grow flex flex-col justify-between space-y-3.5">
        <div className="space-y-1">
          <div className="flex items-baseline gap-1 text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
            <span>{country}</span>
          </div>
          <h4 className="text-sm font-black text-slate-805 dark:text-slate-100 tracking-tight leading-none group-hover:text-orange-500 transition-colors">
            {name}
          </h4>
          <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-450 leading-relaxed line-clamp-2 pt-0.5">
            {description}
          </p>
        </div>

        {/* Metrics Row */}
        <div className="border-t border-black/5 dark:border-white/5 pt-3 flex items-center justify-between">
          {/* Cost */}
          <div className="flex items-center gap-0.5">
            <DollarSign className="size-3 text-slate-400 shrink-0" />
            <span className="text-[10px] font-black text-slate-700 dark:text-slate-200">
              {formatVal(cost)} est.
            </span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-1 text-[9.5px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
            <Clock className="size-3 text-slate-400" />
            <span>{duration}</span>
          </div>
        </div>
      </div>

    </motion.div>
  )
}
