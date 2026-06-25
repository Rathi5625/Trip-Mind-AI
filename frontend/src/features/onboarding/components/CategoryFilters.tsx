"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type CategoryId = "all" | "beaches" | "mountains" | "cities" | "food" | "luxury" | "backpacking" | "nature"

interface Category {
  id: CategoryId
  label: string
  emoji: string
}

const CATEGORIES: Category[] = [
  { id: "all", label: "All", emoji: "🌍" },
  { id: "beaches", label: "Beaches", emoji: "🏖" },
  { id: "mountains", label: "Mountains", emoji: "🏔" },
  { id: "cities", label: "Cities", emoji: "🏙" },
  { id: "food", label: "Food", emoji: "🍜" },
  { id: "luxury", label: "Luxury", emoji: "💎" },
  { id: "backpacking", label: "Backpacking", emoji: "🎒" },
  { id: "nature", label: "Nature", emoji: "🌿" },
]

interface CategoryFiltersProps {
  activeCategory: CategoryId
  onSelectCategory: (id: CategoryId) => void
}

export function CategoryFilters({
  activeCategory,
  onSelectCategory,
}: CategoryFiltersProps) {
  return (
    <div className="w-full flex justify-center mb-8 select-none">
      <div className="flex items-center gap-1.5 p-1.5 overflow-x-auto no-scrollbar max-w-full bg-slate-100/60 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-inner">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={cn(
                "relative flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue",
                isActive
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              )}
            >
              {/* Active Background Pill */}
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200/40 dark:border-white/5"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              
              <span className="relative z-10 text-sm leading-none">{category.emoji}</span>
              <span className="relative z-10">{category.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
