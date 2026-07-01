"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles, Utensils, Heart, Palmtree, Compass, Users, Flower2, Map } from "lucide-react"

interface SearchSuggestionsProps {
  chips: string[]
  onSelect: (chip: string) => void
}

const CHIP_ICONS: Record<string, any> = {
  "Weekend Getaways": Sparkles,
  "Culinary Tours": Utensils,
  "Wellness Retreats": Flower2,
  "Adventure Escapes": Compass,
  "Luxury Resorts": Palmtree,
  "Family Trips": Users,
  "Honeymoon": Heart,
  "Road Trips": Map
}

export function SearchSuggestions({ chips, onSelect }: SearchSuggestionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 select-none">
      {chips.map((chip) => {
        const IconComp = CHIP_ICONS[chip] || Sparkles
        return (
          <motion.button
            key={chip}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(chip)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-slate-900/40 text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors shadow-sm text-[10.5px] font-black uppercase tracking-wider cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <IconComp className="size-3.5 text-slate-400 shrink-0" />
            <span>{chip}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
