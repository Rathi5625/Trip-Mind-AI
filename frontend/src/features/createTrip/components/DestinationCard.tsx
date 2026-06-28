"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { Destination } from "../types/createTrip"
import { RecommendationBadge } from "./RecommendationBadge"
import { useTripWizardStore } from "../store/tripWizardStore"
import { motion, AnimatePresence } from "framer-motion"

interface DestinationCardProps {
  destination: Destination
  onSelect: (dest: Destination) => void
}

export function DestinationCard({ destination, onSelect }: DestinationCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const setHoveredDestination = useTripWizardStore((state) => state.setHoveredDestination)

  return (
    <motion.div
      onClick={() => onSelect(destination)}
      onMouseEnter={() => {
        setHoveredDestination(destination)
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setHoveredDestination(null)
        setIsHovered(false)
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative flex flex-col justify-end h-72 rounded-3xl overflow-hidden border border-black/5 bg-slate-900 shadow-sm cursor-pointer group dark:border-white/5 select-none"
    >
      {/* Background Image with Zoom hover */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={destination.image}
          alt={destination.name}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90"
        />
        {/* Dark overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent z-10" />
      </div>

      {/* Badges container */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <RecommendationBadge score={destination.matchScore} />
        <RecommendationBadge category={destination.category} />
      </div>

      {/* Content drawer overlay */}
      <div className="relative z-20 p-5 space-y-2 text-white">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-[9.5px] font-black text-slate-350 dark:text-slate-400 uppercase tracking-widest leading-none">
              {destination.country}
            </span>
            <h4 className="text-base font-black tracking-tight leading-tight mt-0.5">
              {destination.name}
            </h4>
          </div>

          {/* Circle Arrow CTA */}
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/20 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
            <ArrowRight className="size-4.5 text-white" />
          </div>
        </div>

        <p className="text-[10px] font-semibold text-slate-300 leading-relaxed max-w-[90%]">
          {destination.description}
        </p>
      </div>

      {/* Interactive Floating Preview Panel (Triggered on hover) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0 bg-slate-950/95 z-30 p-5 flex flex-col justify-between text-white border border-white/10 rounded-3xl backdrop-blur-md"
          >
            {/* Top row: Match details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-400 uppercase tracking-widest">
                  ✨ {destination.matchScore}% Match
                </span>
                <span className="text-[9px] font-black uppercase text-slate-400">
                  {destination.category}
                </span>
              </div>
              
              {/* Match reasons explanation list */}
              <div className="space-y-1.5">
                <span className="block text-[8px] font-black uppercase text-slate-450 tracking-wider">
                  Because you like:
                </span>
                <div className="grid grid-cols-2 gap-1 text-[9px] font-bold text-slate-300">
                  {destination.matchReasons.map((reason) => (
                    <div key={reason} className="flex items-center gap-1">
                      <span className="text-emerald-500 text-[10px]">✓</span>
                      <span className="truncate">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom details: Metrics panel grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-3.5 border-t border-white/5 text-[9px] font-bold text-slate-400">
              <div className="flex flex-col">
                <span className="text-[7.5px] font-black uppercase text-slate-500">Avg Temperature</span>
                <span className="text-xs font-extrabold text-slate-205 mt-0.5">{destination.tempRange}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[7.5px] font-black uppercase text-slate-500">Estimated Cost</span>
                <span className="text-xs font-extrabold text-slate-205 mt-0.5">{destination.priceRange}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[7.5px] font-black uppercase text-slate-500">Flight Duration</span>
                <span className="text-xs font-extrabold text-slate-205 mt-0.5">{destination.flightDuration}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[7.5px] font-black uppercase text-slate-500">Best Travel Months</span>
                <span className="text-xs font-extrabold text-slate-205 mt-0.5">{destination.bestMonths.split(",")[0]}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
