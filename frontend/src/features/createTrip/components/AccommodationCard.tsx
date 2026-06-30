"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Accommodation } from "../types/preferences"
import { cn } from "@/lib/utils"

interface AccommodationCardProps {
  accommodation: Accommodation
  isSelected: boolean
  onClick: () => void
}

export function AccommodationCard({ accommodation, isSelected, onClick }: AccommodationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col rounded-2xl border bg-white dark:bg-slate-900 overflow-hidden shadow-sm cursor-pointer transition-all duration-200 w-full select-none",
        isSelected
          ? "border-blue-600 dark:border-blue-500 ring-1 ring-blue-500/20"
          : "border-black/5 hover:border-black/10 dark:border-white/5 dark:hover:border-white/10"
      )}
    >
      {/* Cover Image */}
      <div className="h-32 w-full relative overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={accommodation.imageUrl}
          alt={accommodation.type}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {isSelected && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-1 size-5.5 flex items-center justify-center border border-white/20">
            <span className="text-[8px] font-black">✓</span>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="p-4 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 leading-none">
            {accommodation.type}
          </h4>
          <span
            className={cn(
              "text-[10px] font-black uppercase tracking-wider",
              isSelected ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"
            )}
          >
            {accommodation.priceIndicator}
          </span>
        </div>
        <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 leading-normal">
          {accommodation.description}
        </p>
      </div>
    </motion.div>
  )
}
