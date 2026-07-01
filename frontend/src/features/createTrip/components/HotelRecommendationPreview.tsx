"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Hotel, Star, Award } from "lucide-react"
import { usePreferences } from "../hooks/usePreferences"
import { useTravelDatesStore } from "../store/travelDatesStore"

interface HotelOption {
  name: string
  price: string
  stars: number
  tier: string
  tags: string[]
  matchPercent: number
}

export function HotelRecommendationPreview() {
  const { selectedAccommodation } = usePreferences()
  const destination = useTravelDatesStore((state) => state.destination) || "Tokyo"

  const hotel = React.useMemo<HotelOption>(() => {
    const isTokyo = destination.toLowerCase().includes("tokyo")
    const isParis = destination.toLowerCase().includes("paris")
    const isRome = destination.toLowerCase().includes("rome")
    const tier = selectedAccommodation || "boutique"

    if (isTokyo) {
      if (tier === "budget") {
        return {
          name: "Nine Hours Capsule Shinjuku",
          price: "₹2,500/night",
          stars: 3,
          tier: "Budget Stays",
          tags: ["Capsule Experience", "Minimalist"],
          matchPercent: 91
        }
      } else if (tier === "luxury") {
        return {
          name: "Park Hyatt Tokyo",
          price: "₹28,000/night",
          stars: 5,
          tier: "Premium Luxury",
          tags: ["Skyline Views", "Bespoke Service"],
          matchPercent: 98
        }
      } else {
        return {
          name: "Trunk Hotel Cat Street",
          price: "₹11,000/night",
          stars: 4,
          tier: "Unique Boutique",
          tags: ["Design-first", "Locals Favorite"],
          matchPercent: 95
        }
      }
    } else if (isParis) {
      if (tier === "budget") {
        return {
          name: "Generator Hostel Paris",
          price: "₹3,200/night",
          stars: 3,
          tier: "Budget Stays",
          tags: ["Rooftop terrace", "Social Cafe"],
          matchPercent: 90
        }
      } else if (tier === "luxury") {
        return {
          name: "Le Bristol Paris",
          price: "₹34,000/night",
          stars: 5,
          tier: "Premium Luxury",
          tags: ["Palace Status", "Michelin Dining"],
          matchPercent: 99
        }
      } else {
        return {
          name: "Hotel Caron de Beaumarchais",
          price: "₹14,500/night",
          stars: 4,
          tier: "Unique Boutique",
          tags: ["Charming Marais", "French Antiques"],
          matchPercent: 96
        }
      }
    } else if (isRome) {
      if (tier === "budget") {
        return {
          name: "The Beehive Hostel Rome",
          price: "₹2,800/night",
          stars: 3,
          tier: "Budget Stays",
          tags: ["Cozy Garden", "Eco-friendly"],
          matchPercent: 89
        }
      } else if (tier === "luxury") {
        return {
          name: "Hotel de Russie",
          price: "₹31,000/night",
          stars: 5,
          tier: "Premium Luxury",
          tags: ["Historic Gardens", "World Class Spa"],
          matchPercent: 97
        }
      } else {
        return {
          name: "Elizabeth Unique Hotel",
          price: "₹13,800/night",
          stars: 4,
          tier: "Unique Boutique",
          tags: ["Art-focused", "Design hotel"],
          matchPercent: 94
        }
      }
    } else {
      // General fallbacks
      if (tier === "budget") {
        return {
          name: "Central Backpacker Hostel",
          price: "₹2,200/night",
          stars: 3,
          tier: "Budget Stays",
          tags: ["Social Atmosphere", "Central"],
          matchPercent: 88
        }
      } else if (tier === "luxury") {
        return {
          name: "Grand Ambassador Plaza Hotel",
          price: "₹25,000/night",
          stars: 5,
          tier: "Premium Luxury",
          tags: ["5-Star Comfort", "Top Rated"],
          matchPercent: 96
        }
      } else {
        return {
          name: "Metro Design Boutique Hotel",
          price: "₹10,500/night",
          stars: 4,
          tier: "Unique Boutique",
          tags: ["Trendy Design", "Bespoke Feel"],
          matchPercent: 93
        }
      }
    }
  }, [destination, selectedAccommodation])

  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
          <Hotel className="size-4 text-blue-500" />
          <span>Recommended Hotels</span>
        </div>
      </div>

      {/* Hotel Display Card with Framer Motion AnimatePresence for smooth tier shifts */}
      <AnimatePresence mode="wait">
        <motion.div
          key={hotel.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="p-4 rounded-2xl bg-white border border-black/5 dark:bg-slate-900/80 dark:border-white/5 space-y-3 shadow-inner"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {hotel.tier}
              </span>
              <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-snug mt-0.5">
                🏨 {hotel.name}
              </h4>
            </div>
            
            <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[9px] font-black uppercase shrink-0">
              <Award className="size-3" />
              <span>Perfect Match</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-b border-black/5 dark:border-white/5 py-2 text-xs">
            <span className="font-extrabold text-slate-800 dark:text-slate-200">
              {hotel.price}
            </span>
            
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`size-3 ${
                    s <= hotel.stars ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-800"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {hotel.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-bold px-2 py-0.5 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md border border-black/5 dark:border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
