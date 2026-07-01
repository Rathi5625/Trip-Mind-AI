"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Check } from "lucide-react"
import { usePreferences } from "../hooks/usePreferences"
import { useTravelDatesStore } from "../store/travelDatesStore"

interface ItineraryItem {
  id: string
  label: string
  interest: string
}

export function LiveItineraryPreview() {
  const { selectedInterests } = usePreferences()
  const destination = useTravelDatesStore((state) => state.destination) || "Tokyo"

  const itinerary = React.useMemo(() => {
    const isTokyo = destination.toLowerCase().includes("tokyo")
    const isParis = destination.toLowerCase().includes("paris")
    const isRome = destination.toLowerCase().includes("rome")

    // Define potential items for Day 1
    const day1Pool: ItineraryItem[] = []
    const day2Pool: ItineraryItem[] = []

    if (isTokyo) {
      day1Pool.push(
        { id: "t1_culinary", label: "Sushi Tasting Tour 🍣", interest: "culinary" },
        { id: "t1_culture", label: "Senso-ji Temple Visit 🏯", interest: "culture" },
        { id: "t1_nightlife", label: "Shibuya Night Walk 🌃", interest: "nightlife" },
        { id: "t1_shopping", label: "Ginza Luxury Shopping 🛍️", interest: "shopping" },
        { id: "t1_nature", label: "Yoyogi Park Stroll 🌲", interest: "nature" },
        { id: "t1_museums", label: "teamLab Borderless 🎨", interest: "museums" }
      )
      day2Pool.push(
        { id: "t2_nature", label: "Mount Fuji Day Trip 🗻", interest: "nature" },
        { id: "t2_wellness", label: "Onsen Experience ♨️", interest: "wellness" },
        { id: "t2_culinary", label: "Kaiseki Multi-course Dinner 🍱", interest: "culinary" },
        { id: "t2_adventure", label: "Shinjuku VR Experience 🎮", interest: "adventure" },
        { id: "t2_history", label: "Meiji Shrine Historic Walk ⛩️", interest: "history" }
      )
    } else if (isParis) {
      day1Pool.push(
        { id: "p1_culinary", label: "Pastry & Croissant Walk 🥐", interest: "culinary" },
        { id: "p1_culture", label: "Eiffel Tower Sunset View 🗼", interest: "culture" },
        { id: "p1_nightlife", label: "Seine River Cruise & Drinks 🚢", interest: "nightlife" },
        { id: "p1_museums", label: "Louvre Guided Art Tour 🏛️", interest: "museums" }
      )
      day2Pool.push(
        { id: "p2_nature", label: "Versailles Palace Gardens 🌳", interest: "nature" },
        { id: "p2_wellness", label: "Bespoke Hammam Spa Session 🧖‍♀️", interest: "wellness" },
        { id: "p2_culinary", label: "Traditional French Bistro Dinner 🍷", interest: "culinary" },
        { id: "p2_adventure", label: "Montmartre Hidden Stair Walk ⛰️", interest: "adventure" }
      )
    } else if (isRome) {
      day1Pool.push(
        { id: "r1_culinary", label: "Trastevere Street Food Tour 🍝", interest: "culinary" },
        { id: "r1_culture", label: "Colosseum & Roman Forum Tour 🏛️", interest: "culture" },
        { id: "r1_nightlife", label: "Piazza Navona Evening Wine Tasting 🍷", interest: "nightlife" },
        { id: "r1_museums", label: "Vatican Museum Gallery Visit 🖼️", interest: "museums" }
      )
      day2Pool.push(
        { id: "r2_nature", label: "Villa Borghese Gardens Bike Ride 🚲", interest: "nature" },
        { id: "r2_wellness", label: "Thermal Baths Relaxation ♨️", interest: "wellness" },
        { id: "r2_culinary", label: "Authentic Neapolitan Pizza Masterclass 🍕", interest: "culinary" },
        { id: "r2_adventure", label: "Appian Way Ancient Road Hike 🥾", interest: "adventure" }
      )
    } else {
      // Fallback for general destinations
      day1Pool.push(
        { id: "g1_culinary", label: "Local Culinary Secrets Tour 🍛", interest: "culinary" },
        { id: "g1_culture", label: "Historic Old Town Walking Tour 🏛️", interest: "culture" },
        { id: "g1_nightlife", label: "Downtown Evening Skyline Walk 🌃", interest: "nightlife" }
      )
      day2Pool.push(
        { id: "g2_nature", label: "Scenic Scenic Nature Excursion 🏞️", interest: "nature" },
        { id: "g2_wellness", label: "Traditional Aromatherapy Massage 🧖", interest: "wellness" },
        { id: "g2_culinary", label: "Fine Dining Regional Cuisine Dinner 🍲", interest: "culinary" },
        { id: "g2_adventure", label: "Outdoor Landmark Trekking Activity 🥾", interest: "adventure" }
      )
    }

    // Filter items based on selected interests
    let day1Selected = day1Pool.filter((item) => selectedInterests.includes(item.interest))
    let day2Selected = day2Pool.filter((item) => selectedInterests.includes(item.interest))

    // Fallbacks if no interest matches
    if (day1Selected.length === 0) {
      day1Selected = [{ id: "d1_fallback", label: "Arrival & Scenic Hotel Check-in 🏨", interest: "" }]
    }
    if (day2Selected.length === 0) {
      day2Selected = [{ id: "d2_fallback", label: "City Highlights Hop-on Bus Tour 🚌", interest: "" }]
    }

    return {
      day1: day1Selected.slice(0, 3),
      day2: day2Selected.slice(0, 3)
    }
  }, [destination, selectedInterests])

  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
        <span className="text-sm">🤖</span>
        <span>Your AI Trip</span>
      </div>

      <div className="space-y-4">
        {/* Day 1 */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-650 dark:text-blue-400">Day 1</span>
          <div className="space-y-1.5 pl-1.5 border-l border-blue-500/20">
            <AnimatePresence mode="popLayout">
              {itinerary.day1.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  <div className="flex size-4 items-center justify-center rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
                    <Check className="size-3 stroke-[3]" />
                  </div>
                  <span className="truncate">{item.label}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Day 2 */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-650 dark:text-blue-400">Day 2</span>
          <div className="space-y-1.5 pl-1.5 border-l border-blue-500/20">
            <AnimatePresence mode="popLayout">
              {itinerary.day2.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  <div className="flex size-4 items-center justify-center rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
                    <Check className="size-3 stroke-[3]" />
                  </div>
                  <span className="truncate">{item.label}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
