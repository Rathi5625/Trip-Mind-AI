"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { Destination } from "../types/createTrip"
import { RecommendationBadge } from "./RecommendationBadge"
import { useTripWizardStore } from "../store/tripWizardStore"
import { motion } from "framer-motion"

interface DestinationCardProps {
  destination: Destination
  onSelect: (dest: Destination) => void
}

export function DestinationCard({ destination, onSelect }: DestinationCardProps) {
  const { setHoveredDestination } = useTripWizardStore()

  return (
    <motion.div
      onClick={() => onSelect(destination)}
      onMouseEnter={() => setHoveredDestination(destination)}
      onMouseLeave={() => setHoveredDestination(null)}
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

        <p className="text-[10px] font-semibold text-slate-300 leading-relaxed max-w-[90%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto overflow-hidden">
          {destination.description}
        </p>
      </div>

    </motion.div>
  )
}
