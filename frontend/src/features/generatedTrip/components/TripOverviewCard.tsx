"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

interface TripOverviewCardProps {
  destinationName: string
  duration: string
  description: string
  imageUrl: string
}

export function TripOverviewCard({
  destinationName,
  duration,
  description,
  imageUrl
}: TripOverviewCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push("/planner/itinerary")
  }

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onClick={handleCardClick}
      className="p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl flex flex-col md:flex-row gap-5 items-center select-none cursor-pointer group"
    >
      
      {/* Thumbnail Image left */}
      <div className="relative w-full md:w-44 h-32 rounded-2xl overflow-hidden shrink-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

        {/* Days badge overlay */}
        <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20 flex items-center gap-1">
          <Calendar className="size-3 text-white" />
          <span className="text-[9px] font-black text-white uppercase tracking-wide">
            {duration}
          </span>
        </div>
      </div>

      {/* Details right */}
      <div className="flex-grow space-y-2 text-left w-full">
        {/* Badges */}
        <div className="flex items-center gap-1 text-[9px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
          <Sparkles className="size-3 fill-blue-500/10 text-blue-500" />
          <span>AI Optimized</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-black text-slate-805 dark:text-slate-100 tracking-tight leading-tight">
          {destinationName}
        </h3>

        {/* Description summary */}
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* View full itinerary Link */}
        <div className="flex items-center gap-1.5 text-xs font-black uppercase text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 pt-1 group-hover:translate-x-0.5 transition-transform">
          <span>View full itinerary</span>
          <ArrowRight className="size-3.5" />
        </div>
      </div>

    </motion.div>
  )
}
