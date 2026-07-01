"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, MessageSquare } from "lucide-react"
import { usePreferences } from "../hooks/usePreferences"
import { useTravelDatesStore } from "../store/travelDatesStore"

export function AtlasConcierge() {
  const { selectedInterests, selectedAccommodation, travelPace } = usePreferences()
  const destination = useTravelDatesStore((state) => state.destination) || "Tokyo"

  const conversationText = React.useMemo(() => {
    if (selectedInterests.length === 0) {
      return `Welcome! I'm Atlas, your AI Travel Concierge. Tell me what kind of experience you are looking for by selecting interests below. I will instantly build your travel DNA profile, compatibility scores, and itinerary previews!`
    }

    // Capitalize list
    const interestLabels = selectedInterests.map(
      (id) => id.charAt(0).toUpperCase() + id.slice(1)
    )
    const accLabel = selectedAccommodation
      ? selectedAccommodation.charAt(0).toUpperCase() + selectedAccommodation.slice(1)
      : "Boutique"

    const selectedList = [
      ...interestLabels.slice(0, 3),
      `${accLabel} Lodging`
    ]

    let customTip = ""
    const isTokyo = destination.toLowerCase().includes("tokyo")
    const isParis = destination.toLowerCase().includes("paris")
    const isRome = destination.toLowerCase().includes("rome")

    if (isTokyo) {
      if (selectedInterests.includes("culinary") && selectedInterests.includes("culture")) {
        customTip = "I recommend exploring Kyoto for two days as well—it pairs perfectly with your culinary and cultural interests."
      } else if (selectedInterests.includes("nature")) {
        customTip = "Since you love nature, adding a night at a traditional Ryokan in Hakone near Mount Fuji would be a magical addition."
      } else if (selectedInterests.includes("luxury")) {
        customTip = "To maximize your luxury preferences, let's reserve a private helicopter flight over Mount Fuji."
      } else {
        customTip = `Tokyo is fantastic for your vibe! We've adjusted your schedule to match a ${travelPace} pace.`
      }
    } else if (isParis) {
      if (selectedInterests.includes("culinary")) {
        customTip = "I've added a wine tasting day-trip to the Champagne region. It matches your culinary preferences perfectly!"
      } else if (selectedInterests.includes("museums")) {
        customTip = "I strongly suggest booking a Museum Pass in advance to bypass lines at the Louvre and Orsay."
      } else {
        customTip = `Paris matches your selections beautifully. Enjoying it at a ${travelPace} pace will feel wonderful.`
      }
    } else if (isRome) {
      if (selectedInterests.includes("history")) {
        customTip = "You should definitely add a day trip to Pompeii; the ruins perfectly match your deep interest in history."
      } else {
        customTip = `Rome is an open-air museum. Let's arrange a private tour of the Vatican to fit your boutique preference.`
      }
    } else {
      customTip = `I recommend adding a 2-day regional tour near ${destination} to truly appreciate the matching local vibe.`
    }

    return {
      selections: selectedList,
      tip: customTip
    }
  }, [selectedInterests, selectedAccommodation, travelPace, destination])

  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-4">
      {/* Concierge Head */}
      <div className="flex items-center gap-3">
        <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 dark:bg-blue-900/30 border border-blue-500/20">
          <span className="text-lg">🤖</span>
          <span className="absolute bottom-0 right-0 block size-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
        </div>
        <div>
          <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">Atlas</h4>
          <span className="text-[9px] font-bold text-slate-450 dark:text-slate-500 flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Active Concierge
          </span>
        </div>
      </div>

      {/* Reactive Dialogue Bubble */}
      <div className="relative p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-3">
        <div className="absolute top-4 -left-1.5 size-3 bg-blue-500/5 border-l border-b border-blue-500/10 rotate-45 dark:bg-slate-900/50" />
        
        <div className="space-y-2">
          {typeof conversationText === "string" ? (
            <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
              {conversationText}
            </p>
          ) : (
            <div className="space-y-2.5">
              <div className="space-y-1">
                <span className="block text-[8.5px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                  I noticed you selected:
                </span>
                <div className="flex flex-col gap-0.5">
                  {conversationText.selections.map((sel) => (
                    <span
                      key={sel}
                      className="text-[10px] font-black text-blue-650 dark:text-blue-450 flex items-center gap-1"
                    >
                      ✓ {sel}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[10.5px] font-semibold text-slate-700 dark:text-slate-300 leading-relaxed border-t border-blue-500/10 pt-2">
                {conversationText.tip}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
