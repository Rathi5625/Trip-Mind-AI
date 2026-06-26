"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles, Calendar, Wallet, Star } from "lucide-react"
import { Recommendation } from "../types/dashboard"

interface RecommendationCardProps {
  recommendation: Recommendation
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const handleCardClick = () => {
    alert(`Redirection to discover insights for ${recommendation.destination}...`)
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      onClick={handleCardClick}
      className="group relative flex flex-col justify-end h-80 rounded-3xl overflow-hidden cursor-pointer select-none border border-black/5 shadow-md dark:border-white/5 dark:shadow-black/40"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={recommendation.image}
          alt={recommendation.destination}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Apple liquid-glass dark vignette gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10" />
      </div>

      {/* AI Match Badge (Top Right) */}
      <div className="absolute top-4 right-4 z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black text-white bg-primary-blue shadow-lg shadow-blue-500/35"
        >
          <Sparkles className="size-3 fill-white/20" />
          <span>{recommendation.matchScore}% Match</span>
        </motion.div>
      </div>

      {/* Content Overlay (Bottom) */}
      <div className="relative z-20 p-5 text-white w-full space-y-2.5">
        <div>
          <h4 className="text-lg font-black tracking-tight text-white leading-tight">
            {recommendation.destination}, {recommendation.country}
          </h4>
          <p className="text-[11px] font-semibold text-slate-300 leading-normal line-clamp-2 mt-1">
            {recommendation.description}
          </p>
        </div>

        {/* Hidden Details that reveal/animate on hover */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-bold text-slate-300">
          {recommendation.bestSeason && (
            <div className="flex items-center gap-1">
              <Calendar className="size-3 text-blue-300 shrink-0" />
              <span>{recommendation.bestSeason}</span>
            </div>
          )}
          {recommendation.avgBudget && (
            <div className="flex items-center gap-1">
              <Wallet className="size-3 text-emerald-300 shrink-0" />
              <span>{recommendation.avgBudget}</span>
            </div>
          )}
          {recommendation.rating && (
            <div className="flex items-center gap-0.5 text-amber-400">
              <Star className="size-3 fill-amber-400 shrink-0" />
              <span>{recommendation.rating}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
