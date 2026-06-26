"use client"

import * as React from "react"
import { Sparkles, Compass, Hotel, Clock, Utensils, Moon, ShieldAlert } from "lucide-react"
import { useAIEditing } from "../hooks/useAIEditing"

export function AICopilotSuggestions() {
  const { submitEdit, isEditing, isStreaming } = useAIEditing()

  const suggestions = [
    { label: "Add Hidden Gems", icon: Compass, prompt: "Add local hidden gems and bars to Day 1" },
    { label: "Replace Expensive Hotel", icon: Hotel, prompt: "Optimize hotel budget and replace with cheaper rates" },
    { label: "Shorten Travel Time", icon: Clock, prompt: "Shorten travel time and slow down Day 1 pacing" },
    { label: "Optimize Food Stops", icon: Utensils, prompt: "Optimize food stops and add specialty coffee spots to Day 1" },
    { label: "Add Nightlife", icon: Moon, prompt: "Add nightlife and local izakayas to Tokyo itinerary" },
    { label: "Add Family Activities", icon: ShieldAlert, prompt: "Add family-friendly museums and sights to the schedule" },
  ]

  const handleSuggestionClick = (promptText: string) => {
    if (isEditing || isStreaming) return
    submitEdit(promptText)
  }

  return (
    <div className="flex flex-col p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/60 w-full select-none gap-4.5">
      {/* Header */}
      <div className="flex items-center gap-1.5">
        <Sparkles className="size-4 text-blue-500 fill-blue-500/20" />
        <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">
          ✨ AI Suggestions
        </h4>
      </div>

      {/* Button suggestions list */}
      <div className="flex flex-col gap-2">
        {suggestions.map((s) => {
          const Icon = s.icon
          return (
            <button
              key={s.label}
              disabled={isEditing || isStreaming}
              onClick={() => handleSuggestionClick(s.prompt)}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/5 bg-slate-50 hover:bg-slate-100 dark:border-white/5 dark:bg-slate-800/30 dark:hover:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-left cursor-pointer"
            >
              <Icon className="size-3.5 text-slate-450 dark:text-slate-550 shrink-0" />
              <span>{s.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
