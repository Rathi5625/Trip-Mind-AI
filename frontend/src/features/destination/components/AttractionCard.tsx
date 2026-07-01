"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Bookmark, Sparkles, Clock } from "lucide-react"

interface AttractionCardProps {
  id: string
  name: string
  category: string
  duration: string
  imageUrl: string
  description: string
  popularityScore: number
}

export function AttractionCard({
  id,
  name,
  category,
  duration,
  imageUrl,
  description,
  popularityScore
}: AttractionCardProps) {
  const [isBookmarked, setIsBookmarked] = React.useState(false)

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl overflow-hidden select-none text-left flex flex-col group"
    >
      
      {/* Image container */}
      <div className="relative h-44 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />

        {/* Category overlay top-left */}
        <div className="absolute top-4 left-4 bg-slate-950/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1 text-[8.5px] font-black text-white uppercase tracking-wider">
          <span>{category}</span>
        </div>

        {/* Duration overlay top-right */}
        <div className="absolute top-4 right-4 bg-slate-950/40 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20 flex items-center gap-1 text-[8.5px] font-black text-white uppercase tracking-wider">
          <Clock className="size-2.5" />
          <span>{duration}</span>
        </div>

        {/* Save Bookmark overlay bottom-right */}
        <button
          type="button"
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="absolute bottom-4 right-4 size-7 rounded-full bg-slate-900/40 hover:bg-slate-900/60 text-white backdrop-blur-md flex items-center justify-center cursor-pointer transition-colors focus:outline-none"
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark attraction"}
        >
          <Bookmark
            className={`size-3.5 transition-colors
              ${isBookmarked ? "fill-blue-500 text-blue-505" : "text-white"}
            `}
          />
        </button>
      </div>

      {/* Details bottom */}
      <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          <h4 className="text-sm font-black text-slate-805 dark:text-slate-100 tracking-tight leading-none group-hover:text-blue-500 transition-colors">
            {name}
          </h4>
          <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-455 leading-relaxed line-clamp-2 pt-1">
            {description}
          </p>
        </div>

        {/* Popularity indicator */}
        <div className="border-t border-black/5 dark:border-white/5 pt-3 flex items-center justify-between text-[9px] font-black uppercase text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-1">
            <Sparkles className="size-3 text-blue-500 fill-blue-500/10" />
            <span>AI Rank</span>
          </div>
          <span className="text-blue-600 dark:text-blue-400">
            {popularityScore}% Popularity
          </span>
        </div>
      </div>

    </motion.div>
  )
}
