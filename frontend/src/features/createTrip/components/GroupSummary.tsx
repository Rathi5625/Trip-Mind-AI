"use client"
import * as React from "react"
import { Users, Check, AlertTriangle, Sparkles, Building2, Car } from "lucide-react"
import { useTravelers } from "../hooks/useTravelers"
import { useCurrency } from "../hooks/useCurrency"
import { useTravelDates } from "../hooks/useTravelDates"
import { TOKYO_COMPATIBILITY, SMART_RECOMMENDATIONS, GROUP_SUMMARY_RECOMMENDATIONS } from "../constants/travelerOptions"
import { motion, AnimatePresence } from "framer-motion"

export function GroupSummary() {
  const { groupType, headcount, getTotalTravelersCount } = useTravelers()
  const { formatValue } = useCurrency()
  const { getSelectedDaysCount } = useTravelDates()
  
  const comp = TOKYO_COMPATIBILITY[groupType]
  const recs = GROUP_SUMMARY_RECOMMENDATIONS[groupType]
  const smartActs = SMART_RECOMMENDATIONS[groupType]
  const totalCount = getTotalTravelersCount()

  // Calculate nights from dates (default to 7 days if not set)
  const daysCount = getSelectedDaysCount()
  const nights = daysCount > 0 ? Math.max(1, daysCount - 1) : 7

  // Dynamic cost parameters (in USD)
  const flightCostPerAdult = 800
  const flightCostPerChild = 600
  const flightCostPerInfant = 150

  const roomRates = {
    solo: { rate: 75, room: "Capsule or Single Bed Room", type: "Capsule / Hostels" },
    couple: { rate: 160, room: "Superior Double Bed Suite", type: "Boutique Stays & Ryokans" },
    friends: { rate: 220, room: "Triple or Quad Private Rooms", type: "Shared Apartments / Hostels" },
    family: { rate: 280, room: "Spacious Family Suites", type: "3-4 Star Family Hotels" },
    business: { rate: 140, room: "Executive King Room", type: "Business Hotels" },
    group: { rate: 500, room: "Entire Traditional Villa", type: "Vacation Rentals / Villas" }
  }

  const transitRates = {
    solo: { base: 120, perPerson: 0 },
    couple: { base: 200, perPerson: 0 },
    friends: { base: 150, perPerson: 40 },
    family: { base: 250, perPerson: 30 },
    business: { base: 220, perPerson: 0 },
    group: { base: 500, perPerson: 20 }
  }

  const diningRates = {
    solo: 45,
    couple: 90,
    friends: 65,
    family: 45,
    business: 80,
    group: 50
  }

  const selectedRoom = roomRates[groupType]
  const selectedTransit = transitRates[groupType]

  // Calculate totals
  const flightsTotalUSD = (headcount.adults * flightCostPerAdult) + (headcount.children * flightCostPerChild) + (headcount.infants * flightCostPerInfant)
  
  const peopleForRooms = headcount.adults + headcount.children
  let roomsNeeded = 1
  if (groupType === "friends" || groupType === "group") {
    roomsNeeded = Math.max(1, Math.ceil(peopleForRooms / 3))
  } else if (groupType === "solo") {
    roomsNeeded = headcount.adults
  } else if (groupType === "business") {
    roomsNeeded = headcount.adults
  }
  const accommodationTotalUSD = selectedRoom.rate * nights * roomsNeeded

  const transportationTotalUSD = selectedTransit.base + (totalCount * selectedTransit.perPerson)
  
  const dailySpendPerPersonUSD = diningRates[groupType] + 35 // food + activities
  const dailySpendTotalUSD = dailySpendPerPersonUSD * (headcount.adults + headcount.children * 0.5) * nights

  const totalBudgetUSD = flightsTotalUSD + accommodationTotalUSD + transportationTotalUSD + dailySpendTotalUSD

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 select-none w-full">
      
      {/* Widget 1: AI Group Profile */}
      <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
          <span className="text-sm">🤖</span>
          <span className="text-[9.5px] font-black uppercase tracking-wider">AI Group Profile</span>
        </div>

        <div className="space-y-1">
          <span className="block text-[8px] font-black uppercase text-slate-400">Travel Style</span>
          <span className="text-xs font-black text-slate-800 dark:text-slate-100 capitalize">
            {groupType}
          </span>
        </div>

        <div className="space-y-1">
          <span className="block text-[8px] font-black uppercase text-slate-400">Travelers</span>
          <span className="text-[10px] font-bold text-slate-700 dark:text-slate-350">
            {headcount.adults} {headcount.adults === 1 ? "Adult" : "Adults"}
            {headcount.children > 0 && `, ${headcount.children} ${headcount.children === 1 ? "Child" : "Children"}`}
            {headcount.infants > 0 && `, ${headcount.infants} ${headcount.infants === 1 ? "Infant" : "Infants"}`}
          </span>
        </div>

        <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
          <span className="block text-[8px] font-black uppercase text-slate-400">Recommended</span>
          <div className="space-y-1 text-[9.5px] font-semibold text-slate-600 dark:text-slate-400">
            {recs.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="text-emerald-500 font-extrabold">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
          <span className="block text-[8px] font-black uppercase text-slate-400 text-blue-600 dark:text-blue-400">Smart Activities</span>
          <div className="flex flex-wrap gap-1">
            {smartActs.map((act, idx) => (
              <span key={idx} className="text-[8.5px] font-bold bg-blue-500/5 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/10">
                ✦ {act}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Widget 2: AI Compatibility Meter */}
      <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl flex flex-col gap-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-white/5">
          <div className="flex flex-col">
            <span className="text-[9.5px] font-black uppercase text-slate-400 tracking-wider">Destination Match</span>
            <span className="text-xs font-black text-slate-850 dark:text-slate-100">Tokyo</span>
          </div>
          <span className="text-xs font-black text-blue-600 dark:text-blue-450 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
            {comp.score}%
          </span>
        </div>

        <div className="space-y-2 pt-1 text-[9.5px] font-semibold text-slate-600 dark:text-slate-400">
          <div className="text-[8.5px] font-black uppercase text-slate-400 tracking-wider">
            Suitability Checklist
          </div>
          
          <div className={`flex items-center gap-1.5 transition-colors ${groupType === "couple" || groupType === "solo" ? "text-slate-800 dark:text-slate-100 font-extrabold" : "text-slate-400 dark:text-slate-600"}`}>
            <span className={groupType === "couple" || groupType === "solo" ? "text-emerald-500 font-extrabold" : "text-slate-300 dark:text-slate-700"}>✓</span>
            <span>Great for Couples</span>
          </div>

          <div className={`flex items-center gap-1.5 transition-colors ${groupType === "family" ? "text-slate-800 dark:text-slate-100 font-extrabold" : "text-slate-400 dark:text-slate-600"}`}>
            <span className={groupType === "family" ? "text-emerald-500 font-extrabold" : "text-slate-300 dark:text-slate-700"}>✓</span>
            <span>Great for Families</span>
          </div>

          <div className={`flex items-center gap-1.5 transition-colors ${groupType === "group" || groupType === "friends" ? "text-amber-600 dark:text-amber-450 font-extrabold" : "text-slate-400 dark:text-slate-600"}`}>
            {groupType === "group" || groupType === "friends" ? (
              <AlertTriangle className="size-3.5 shrink-0 text-amber-500 animate-pulse" />
            ) : (
              <span className="text-slate-300 dark:text-slate-700 font-extrabold">⚠</span>
            )}
            <span>Crowded with Large Groups</span>
          </div>
        </div>

        <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
          <span className="block text-[8px] font-black uppercase text-slate-400">Scan Reason</span>
          <p className="text-[9px] font-semibold text-slate-500 dark:text-slate-500 leading-relaxed italic">
            Tokyo is a match because of its safe subways, excellent local infrastructure, and {groupType === "family" ? "diverse amusement theme parks." : groupType === "couple" ? "private dining & romantic viewpoints." : "efficient walkable neighborhoods."}
          </p>
        </div>
      </div>

      {/* Widget 3: Live Cost Adjustment estimates */}
      <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-450">
          <Users className="size-4 fill-emerald-500/10" />
          <span className="text-[9.5px] font-black uppercase tracking-wider">Live Cost Adjustment</span>
        </div>

        <div className="space-y-1">
          <span className="block text-[8px] font-black uppercase text-slate-400">Total Estimated Budget</span>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={totalBudgetUSD}
              initial={{ y: -4, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 4, opacity: 0 }}
              className="text-sm font-black text-emerald-600 dark:text-emerald-400 block"
            >
              {formatValue(totalBudgetUSD)}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5 text-[9.5px] font-semibold text-slate-650 dark:text-slate-450">
          <div className="flex items-center gap-2">
            <Building2 className="size-4 text-slate-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[7.5px] font-black uppercase text-slate-400">Hotel Room Recommendation</span>
              <span>{selectedRoom.room}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Building2 className="size-4 text-slate-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[7.5px] font-black uppercase text-slate-400">Suggested Accommodation Type</span>
              <span>{selectedRoom.type}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Car className="size-4 text-slate-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[7.5px] font-black uppercase text-slate-400">Transportation Costs</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={transportationTotalUSD}
                  initial={{ y: -3, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 3, opacity: 0 }}
                >
                  {formatValue(transportationTotalUSD)}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
