"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Calendar, Map, Hotel, Utensils, DollarSign, Award, Sun } from "lucide-react"

interface CarouselItem {
  id: string
  title: string
  subtitle: string
  emoji: string
  bgGradient: string
  icon: any
}

const ITEMS: CarouselItem[] = [
  { id: "day1", title: "Day 1 Preview", subtitle: "Arrival & Sushi Tasting Tour", emoji: "🍣", bgGradient: "from-blue-500/10 to-indigo-500/10", icon: Calendar },
  { id: "map", title: "Interactive Map", subtitle: "12 Custom Saved Landmarks", emoji: "🗺️", bgGradient: "from-emerald-500/10 to-teal-500/10", icon: Map },
  { id: "hotels", title: "Hotels", subtitle: "Trunk Hotel Cat Street Stay", emoji: "🏨", bgGradient: "from-purple-500/10 to-pink-500/10", icon: Hotel },
  { id: "restaurants", title: "Restaurants", subtitle: "Reserve 'Locavore' in Ubud", emoji: "🍜", bgGradient: "from-orange-500/10 to-red-500/10", icon: Utensils },
  { id: "budget", title: "Budget Breakdown", subtitle: "$2,450 Total allocation", emoji: "💰", bgGradient: "from-amber-500/10 to-yellow-500/10", icon: DollarSign },
  { id: "events", title: "Local Events", subtitle: "Ubud Temple Dance Show", emoji: "🎭", bgGradient: "from-fuchsia-500/10 to-rose-500/10", icon: Award },
  { id: "weather", title: "Weather Forecast", subtitle: "September Sunny averages", emoji: "🌤️", bgGradient: "from-cyan-500/10 to-sky-500/10", icon: Sun }
]

export function PreviewCarousel() {
  return (
    <div className="space-y-3.5 select-none text-left w-full">
      
      {/* Header */}
      <span className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
        Quick Preview Carousel
      </span>

      {/* Horizontally scrollable flex row container */}
      <div className="flex items-center gap-4 overflow-x-auto pb-3 scrollbar-none -mx-1 px-1">
        {ITEMS.map((item) => {
          const IconComp = item.icon
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              className={`w-[190px] p-4.5 rounded-2xl border border-black/5 bg-white dark:border-white/5 dark:bg-slate-900/60 shadow-sm shrink-0 flex flex-col justify-between min-h-[140px]`}
            >
              
              {/* Icon / Emoji top row */}
              <div className="flex items-center justify-between">
                <div className="flex size-8 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
                  <IconComp className="size-4" />
                </div>
                <span className="text-lg">{item.emoji}</span>
              </div>

              {/* Title & description */}
              <div className="space-y-0.5 mt-4">
                <h4 className="text-xs font-black text-slate-805 dark:text-slate-100 truncate leading-none">
                  {item.title}
                </h4>
                <p className="text-[10px] font-semibold text-slate-455 dark:text-slate-450 truncate leading-tight mt-1">
                  {item.subtitle}
                </p>
              </div>

            </motion.div>
          )
        })}
      </div>

    </div>
  )
}
