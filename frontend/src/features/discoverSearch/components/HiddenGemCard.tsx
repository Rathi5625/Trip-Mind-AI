"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface HiddenGemCardProps {
  id: string
  name: string
  country: string
  imageUrl: string
  description: string
  discoveryScore: number
  cost: number
  duration: string
}

export function HiddenGemCard({
  id,
  name,
  country,
  imageUrl,
  description,
  discoveryScore,
  cost,
  duration
}: HiddenGemCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl overflow-hidden select-none text-left flex flex-col group cursor-pointer"
      onClick={() => alert(`Exploring hidden gem: ${name}`)}
    >
      
      {/* Image container */}
      <div className="relative h-40 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Hidden Gem Badge */}
        <div className="absolute top-4 left-4 bg-orange-500/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-orange-400/20 flex items-center gap-1">
          <Sparkles className="size-3 text-white fill-white/10" />
          <span className="text-[9.5px] font-black text-white uppercase tracking-wider">
            Hidden Gem ({discoveryScore}%)
          </span>
        </div>
      </div>

      {/* Details bottom */}
      <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <h4 className="text-sm font-black text-slate-805 dark:text-slate-100 tracking-tight leading-none group-hover:text-orange-555 transition-colors">
            {name}
          </h4>
          <p className="text-[10px] font-semibold text-slate-505 dark:text-slate-450 leading-relaxed line-clamp-2 pt-0.5">
            {description}
          </p>
        </div>

        {/* Cost & duration */}
        <div className="border-t border-black/5 dark:border-white/5 pt-2.5 flex items-center justify-between text-[9px] font-black uppercase text-slate-400 dark:text-slate-500">
          <span>Est. Cost: ₹{(cost / 1000).toFixed(0)}k</span>
          <span>{duration}</span>
        </div>
      </div>

    </motion.div>
  )
}
