"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"
import { useRequirements } from "../hooks/useRequirements"
import { motion, AnimatePresence } from "framer-motion"

export function AccessibilityAdvisor() {
  const { requirements } = useRequirements()

  // Only display if accessibility / dietary / preference tags are active
  const hasAccessibilityReqs = requirements.length > 0

  if (!hasAccessibilityReqs) return null

  // Map each selected requirement to its priority items
  const priorityItems: string[] = []

  if (requirements.includes("Wheelchair Accessible")) {
    priorityItems.push("Wheelchair-accessible hotels")
    priorityItems.push("Accessible public transport")
    priorityItems.push("Attractions with step-free access")
  }
  if (requirements.includes("Vegetarian / Vegan")) {
    priorityItems.push("Vegetarian-friendly restaurants")
  }
  if (requirements.includes("Gluten Free")) {
    priorityItems.push("Gluten-free menu translations")
  }
  if (requirements.includes("Halal Food")) {
    priorityItems.push("Halal-certified meal recommendations")
  }
  if (requirements.includes("Kosher Meals")) {
    priorityItems.push("Kosher food sourcing guides")
  }
  if (requirements.includes("Hearing Assistance")) {
    priorityItems.push("Visual tour guides & subtitles")
  }
  if (requirements.includes("Pet Friendly")) {
    priorityItems.push("Pet-friendly hotels & parks")
  }
  if (requirements.includes("Kid Friendly")) {
    priorityItems.push("Child-friendly pacing & attractions")
  }
  if (requirements.includes("Low Walking")) {
    priorityItems.push("Minimal walking routes & cab points")
  }
  if (requirements.includes("Luxury Only")) {
    priorityItems.push("Premium 5-star venue selections")
  }

  // Fallback in case none of the matches occur
  if (priorityItems.length === 0) {
    priorityItems.push("Priority access lane assistance")
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="p-5 rounded-3xl border border-blue-500/10 bg-blue-500/5 select-none space-y-3 shadow-sm w-full"
      >
        <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
          <span className="text-lg">🤖</span>
          <span className="text-[10px] font-black uppercase tracking-wider">Atlas Suggestion</span>
        </div>

        <p className="text-[10.5px] font-semibold text-slate-655 dark:text-slate-350 leading-relaxed font-sans">
          We'll prioritize:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[9.5px] font-bold text-slate-600 dark:text-slate-400">
          {priorityItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-extrabold">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

