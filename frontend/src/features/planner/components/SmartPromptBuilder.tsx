"use client"

import * as React from "react"
import { Sparkles, MapPin, Calendar, Wallet, Users, Heart, Compass } from "lucide-react"
import { usePlannerStore } from "../store/plannerStore"

export function SmartPromptBuilder() {
  const { inputPrompt, setInputPrompt } = usePlannerStore()

  const chips = [
    { label: "Quick Start", icon: Sparkles, text: "Plan a detailed 5-day trip to " },
    { label: "Destination", icon: MapPin, text: "Tokyo, Japan " },
    { label: "Dates", icon: Calendar, text: "in October during the autumn season " },
    { label: "Budget", icon: Wallet, text: "on a budget of ₹1,20,000 " },
    { label: "Group", icon: Users, text: "for 2 travelers " },
    { label: "Interests", icon: Heart, text: "focusing on local food tour, tea ceremonies, and shrines " },
    { label: "Travel Style", icon: Compass, text: "in a balanced, backpacking style " },
  ]

  const handleChipClick = (text: string) => {
    // Append structured text to prompt
    setInputPrompt(inputPrompt + text)
    
    // Focus the main textarea if present
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    if (textarea) {
      textarea.focus()
    }
  }

  return (
    <div className="w-full select-none mb-3 overflow-x-auto no-scrollbar py-1">
      <div className="flex items-center gap-2 w-max">
        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Sparkles className="size-3 text-amber-500" />
          Smart Builder:
        </span>
        
        {chips.map((chip) => {
          const ChipIcon = chip.icon
          return (
            <button
              key={chip.label}
              onClick={() => handleChipClick(chip.text)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/5 bg-white/70 hover:bg-slate-50 dark:border-white/5 dark:bg-slate-900/60 dark:hover:bg-slate-800/60 text-[10px] font-bold text-slate-600 dark:text-slate-350 cursor-pointer shadow-sm shrink-0 transition-colors"
            >
              <ChipIcon className="size-3 text-slate-400 dark:text-slate-500" />
              <span>{chip.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
