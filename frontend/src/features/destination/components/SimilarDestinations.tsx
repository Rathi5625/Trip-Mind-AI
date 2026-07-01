"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { ComparisonVibe } from "../types/destination"

interface SimilarDestinationsProps {
  similar: ComparisonVibe[]
}

export function SimilarDestinations({ similar }: SimilarDestinationsProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const offset = direction === "left" ? -300 : 300
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" })
  }

  return (
    <div className="w-full select-none text-left max-w-6xl mx-auto space-y-4">
      
      {/* Header */}
      <div className="flex items-end justify-between">
        <h3 className="text-sm font-black text-slate-805 dark:text-white uppercase tracking-wider">
          Similar Vibes
        </h3>
        
        {/* Navigation arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-1.5 rounded-full border border-black/5 bg-white hover:bg-slate-50 text-slate-450 hover:text-slate-805 dark:border-white/5 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1.5 rounded-full border border-black/5 bg-white hover:bg-slate-50 text-slate-450 hover:text-slate-805 dark:border-white/5 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Swipeable Container */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-6 overflow-x-auto pb-4 scrollbar-none -mx-1 px-1"
      >
        {similar.map((dest) => (
          <motion.div
            key={dest.id}
            whileHover={{ y: -3 }}
            className="w-[280px] rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl overflow-hidden shrink-0 flex flex-col group cursor-pointer"
            onClick={() => alert(`Exploring similar vibe: ${dest.name}`)}
          >
            
            {/* Image container */}
            <div className="relative h-44 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${dest.image})` }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Similarity score overlay top-right */}
              <div className="absolute top-4 right-4 bg-slate-950/40 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20 flex items-center gap-1 text-[8.5px] font-black text-white uppercase tracking-wider">
                <Sparkles className="size-2.5 text-blue-300 fill-blue-300/10" />
                <span>{dest.similarityScore}% Similar</span>
              </div>
            </div>

            {/* Details bottom */}
            <div className="p-4 flex-grow flex flex-col justify-between space-y-3.5">
              <div className="space-y-1">
                <h4 className="text-sm font-black text-slate-805 dark:text-slate-100 tracking-tight leading-none group-hover:text-blue-500 transition-colors">
                  {dest.name}
                </h4>
                <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-455 leading-relaxed pt-0.5">
                  {dest.description}
                </p>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  )
}
