"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles, Sun, Cloud, Landmark } from "lucide-react"
import { HoverTripPreview } from "./HoverTripPreview"

interface DestinationCardProps {
  id: string
  name: string
  country: string
  imageUrl: string
  matchScore: number
  description: string
  budgetPerPerson: number
  duration: string
  weatherText: string
  weatherTemp: string
  weatherIcon: string
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
  
  restaurantsCount?: number
  attractionsCount?: number
  hotelsCount?: number
}

const WEATHER_ICONS: Record<string, any> = {
  sunny: Sun,
  cloudy: Cloud,
  landmark: Landmark
}

export function DestinationCard({
  id,
  name,
  country,
  imageUrl,
  matchScore,
  description,
  budgetPerPerson,
  duration,
  weatherText,
  weatherTemp,
  weatherIcon,
  isFavorite,
  onToggleFavorite,
  restaurantsCount = 12,
  attractionsCount = 8,
  hotelsCount = 4
}: DestinationCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const WeatherIconComp = WEATHER_ICONS[weatherIcon] || (name === "Tokyo" ? Landmark : Sun)

  const formatCurrency = (val: number) => {
    return `₹${(val / 1000).toFixed(0)}k`
  }

  return (
    <div className="relative">
      
      {/* Absolute Hover Tooltip Preview Bubble */}
      <AnimatePresence>
        {isHovered && (
          <HoverTripPreview
            name={name}
            duration={duration}
            restaurantsCount={restaurantsCount}
            attractionsCount={attractionsCount}
            hotelsCount={hotelsCount}
            budget={budgetPerPerson}
            matchScore={matchScore}
          />
        )}
      </AnimatePresence>

      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
          
          {/* Match score badge overlay top-right */}
          <div className="absolute top-4 right-4 bg-slate-950/40 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20 flex items-center gap-1">
            <Sparkles className="size-3 text-white fill-white/10" />
            <span className="text-[9px] font-black text-white uppercase tracking-wide">
              {matchScore}% Match
            </span>
          </div>

          {/* Favorite heart overlay top-left */}
          <button
            type="button"
            onClick={() => onToggleFavorite(id)}
            className="absolute top-4 left-4 size-8 rounded-full bg-slate-900/40 hover:bg-slate-900/60 text-white backdrop-blur-md flex items-center justify-center cursor-pointer transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
          >
            <Heart
              className={`size-4.5 transition-colors
                ${isFavorite ? "fill-rose-500 text-rose-500" : "text-white"}
              `}
            />
          </button>
        </div>

        {/* Details bottom */}
        <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-805 dark:text-slate-100 tracking-tight leading-none group-hover:text-blue-500 transition-colors">
                {name}
              </h4>
              <WeatherIconComp className="size-4 text-slate-400 shrink-0" />
            </div>
            <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-455 leading-relaxed line-clamp-2 pt-1">
              {description}
            </p>
          </div>

          {/* Card Footer Metrics Row */}
          <div className="border-t border-black/5 dark:border-white/5 pt-3 flex items-center justify-between text-[10px] font-black uppercase text-slate-455 dark:text-slate-500">
            <div>
              <span className="block text-[8px] font-semibold text-slate-400">Est. Budget</span>
              <span className="text-slate-700 dark:text-slate-300 font-black">
                {formatCurrency(budgetPerPerson)} <span className="text-[8px] text-slate-400 font-semibold">/person</span>
              </span>
            </div>

            {/* Duration badge */}
            <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-655 dark:text-slate-400">
              {duration}
            </span>
          </div>
        </div>

      </motion.div>
    </div>
  )
}
