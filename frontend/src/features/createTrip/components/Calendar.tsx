"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Sun, Wallet, Users, Cloud } from "lucide-react"
import { useCalendar } from "../hooks/useCalendar"
import { useTravelDates } from "../hooks/useTravelDates"
import { usePricingForecast } from "../hooks/usePricingForecast"
import { DATE_EVENT_BADGES, AIRFARE_HEATMAP, TOKYO_COST_TIMELINE } from "../constants/seasonData"
import { DateEventBadge } from "../types/travelDates"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function Calendar() {
  const { days, currentMonth } = useCalendar()
  const { selectedRange, setSelectedRange, hoveredDate, setHoveredDate, setCurrentMonth } = useTravelDates()
  
  // Fetch dynamic pricing / stats
  const { data: insights, isLoading } = usePricingForecast()
  const [selectedEvent, setSelectedEvent] = React.useState<DateEventBadge | null>(null)

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDateClick = (date: Date) => {
    const { start, end } = selectedRange

    // Prevent selecting dates in the past (e.g. before today)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (date < today) return

    if (!start || (start && end)) {
      setSelectedRange({ start: date, end: null })
    } else if (start && !end) {
      if (date < start) {
        setSelectedRange({ start: date, end: null })
      } else {
        setSelectedRange({ start, end: date })
      }
    }
  }

  const handleDateMouseEnter = (date: Date) => {
    if (selectedRange.start && !selectedRange.end) {
      setHoveredDate(date)
    }
  }

  const isSelectedStart = (date: Date) => {
    return selectedRange.start?.toDateString() === date.toDateString()
  }

  const isSelectedEnd = (date: Date) => {
    return selectedRange.end?.toDateString() === date.toDateString()
  }

  const isBetweenRange = (date: Date) => {
    const { start, end } = selectedRange
    if (!start) return false
    
    const compareEnd = end || hoveredDate
    if (!compareEnd) return false

    return date > start && date < compareEnd
  }

  const isToday = (date: Date) => {
    return new Date().toDateString() === date.toDateString()
  }

  const isSameMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth()
  }

  const formatDateKey = (date: Date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const d = String(date.getDate()).padStart(2, "0")
    return `${y}-${m}-${d}`
  }

  return (
    <div className="flex flex-col p-6 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl w-full select-none gap-6">
      
      {/* Month Navigation Row */}
      <div className="flex items-center justify-between pb-2">
        <button
          onClick={handlePrevMonth}
          className="p-1.5 rounded-xl border border-black/5 hover:bg-slate-100 dark:border-white/10 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Previous Month"
        >
          <ChevronLeft className="size-4 text-slate-655 dark:text-slate-400" />
        </button>
        
        <h3 className="text-xs font-black text-slate-805 dark:text-slate-100 uppercase tracking-widest">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>

        <button
          onClick={handleNextMonth}
          className="p-1.5 rounded-xl border border-black/5 hover:bg-slate-100 dark:border-white/10 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Next Month"
        >
          <ChevronRight className="size-4 text-slate-655 dark:text-slate-400" />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] font-black uppercase text-slate-400 tracking-wider">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
      </div>

      {/* Days Month Grid */}
      <div className="grid grid-cols-7 gap-y-2 text-center relative">
        {days.map((date, index) => {
          const startPin = isSelectedStart(date)
          const endPin = isSelectedEnd(date)
          const inRange = isBetweenRange(date)
          const current = isSameMonth(date)
          const activeEvent = DATE_EVENT_BADGES.find(b => b.dateStr === formatDateKey(date))
          const past = date < new Date(new Date().setHours(0,0,0,0))

          return (
            <div
              key={index}
              onMouseEnter={() => handleDateMouseEnter(date)}
              onClick={() => handleDateClick(date)}
              className={cn(
                "relative py-3 flex items-center justify-center cursor-pointer transition-all",
                !current && "opacity-30",
                past && "cursor-not-allowed opacity-20 pointer-events-none"
              )}
            >
              {/* Range Highlights background */}
              {inRange && (
                <div className="absolute inset-y-0.5 left-0 right-0 bg-blue-500/10 dark:bg-blue-500/20" />
              )}
              {startPin && (
                <div className="absolute inset-y-0.5 left-1/2 right-0 bg-blue-500/10 dark:bg-blue-500/20" />
              )}
              {endPin && (
                <div className="absolute inset-y-0.5 left-0 right-1/2 bg-blue-500/10 dark:bg-blue-500/20" />
              )}

              {/* Day Circle Button */}
              <div
                className={cn(
                  "relative z-10 flex flex-col items-center justify-center size-9.5 rounded-full text-xs font-bold transition-all",
                  startPin || endPin
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : inRange
                    ? "text-blue-600 dark:text-blue-400 font-extrabold"
                    : isToday(date)
                    ? "border border-blue-500 text-blue-600 dark:text-blue-400"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <span className={cn(startPin || endPin ? "" : "translate-y-0.5")}>{date.getDate()}</span>
                {/* Airfare Heatmap indicator dot */}
                {current && !past && (
                  <span className={cn(
                    "block size-1 rounded-full mt-0.5",
                    startPin || endPin ? "bg-white" : "",
                    !(startPin || endPin) && AIRFARE_HEATMAP[date.getDate()] === "cheapest" && "bg-emerald-500",
                    !(startPin || endPin) && AIRFARE_HEATMAP[date.getDate()] === "average" && "bg-amber-500",
                    !(startPin || endPin) && AIRFARE_HEATMAP[date.getDate()] === "expensive" && "bg-rose-500"
                  )} />
                )}
              </div>

              {/* Floating Event Badges */}
              {activeEvent && current && (
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedEvent(activeEvent)
                  }}
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-auto cursor-pointer whitespace-nowrap shadow-sm hover:scale-105 transition-all"
                >
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] font-black border uppercase tracking-wider bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-sm",
                    activeEvent.type === "autumn" && "text-orange-650 border-orange-500/20 dark:text-orange-400",
                    activeEvent.type === "weather" && "text-blue-650 border-blue-500/20 dark:text-blue-400",
                    activeEvent.type === "price" && "text-emerald-650 border-emerald-500/20 dark:text-emerald-400",
                    activeEvent.type === "festival" && "text-purple-650 border-purple-500/20 dark:text-purple-400"
                  )}>
                    <span>{activeEvent.emoji}</span>
                    <span>{activeEvent.label}</span>
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Bottom AI Insight Cards Row */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-white/5 text-[9.5px] font-bold text-slate-500 dark:text-slate-400">
        
        {/* Weather Card */}
        <div className="flex items-center gap-2.5 p-3 rounded-2xl border border-black/5 bg-slate-50/50 dark:border-white/5 dark:bg-slate-950/20">
          <Cloud className="size-4 text-blue-500 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[7.5px] font-black uppercase text-slate-400">Weather Preview</span>
            <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 mt-0.5 whitespace-nowrap truncate max-w-[80px]">
              {insights?.weatherTemp || "22°C / 14°C"}
            </span>
          </div>
        </div>

        {/* Cost Index Card */}
        <div className="flex items-center gap-2.5 p-3 rounded-2xl border border-black/5 bg-slate-50/50 dark:border-white/5 dark:bg-slate-950/20">
          <Wallet className="size-4 text-emerald-500 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[7.5px] font-black uppercase text-slate-400">Cost Index</span>
            <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 mt-0.5 truncate max-w-[80px]">
              {insights?.costIndex || "Mid-Range (Avg)"}
            </span>
          </div>
        </div>

        {/* Crowd Level Card */}
        <div className="flex items-center gap-2.5 p-3 rounded-2xl border border-black/5 bg-slate-50/50 dark:border-white/5 dark:bg-slate-950/20">
          <Users className="size-4 text-purple-500 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[7.5px] font-black uppercase text-slate-400">Crowd Level</span>
            <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 mt-0.5 truncate max-w-[80px]">
              {insights?.crowdLevel || "Moderate"}
            </span>
          </div>
        </div>

      </div>

      {/* 5. Trip Cost Timeline (Estimated budget by departure date) */}
      <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-2.5">
        <span className="block text-[8.5px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
          📈 Trip Cost Timeline (Estimated flight + hotel budget by departure date)
        </span>
        
        <div className="w-full h-24 select-none">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={TOKYO_COST_TIMELINE} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
              <XAxis dataKey="dateLabel" tick={{ fontSize: 8, fontWeight: 700 }} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(val) => `₹${val/1000}k`} tick={{ fontSize: 8, fontWeight: 700 }} tickLine={false} axisLine={false} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="p-2 rounded-xl bg-slate-900 border border-white/10 text-[9px] font-bold text-white shadow-md">
                        <span>Departure: {data.dateLabel}</span>
                        <div className="text-blue-400 font-extrabold mt-0.5">Est. Cost: ₹{data.cost.toLocaleString()}</div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="cost" radius={[4, 4, 0, 0]}>
                {TOKYO_COST_TIMELINE.map((entry, index) => {
                  const isCheapest = entry.category === "cheapest"
                  const isExpensive = entry.category === "expensive"
                  const color = isCheapest ? "#10B981" : isExpensive ? "#EF4444" : "#F59E0B"
                  return <Cell key={`cell-${index}`} fill={color} opacity={0.8} />
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6. Event popover modal overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-x-6 top-1/4 z-50 p-5 rounded-3xl border border-blue-500/20 bg-white/95 dark:bg-slate-900/95 shadow-2xl backdrop-blur-md space-y-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedEvent.emoji}</span>
                <div>
                  <h4 className="text-xs font-black text-slate-805 dark:text-slate-100 uppercase tracking-widest leading-none">
                    {selectedEvent.label}
                  </h4>
                  <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 block mt-1">
                    Occurs on {selectedEvent.dateStr}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-655 dark:hover:text-slate-200 text-xs font-black cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <p className="text-[10px] font-semibold text-slate-650 dark:text-slate-350 leading-relaxed font-sans">
              {selectedEvent.description}
            </p>

            {selectedEvent.whyVisit && (
              <div className="p-3 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-[9.5px] font-semibold text-blue-700 dark:text-blue-400 leading-relaxed font-sans">
                <span className="font-black text-[8px] uppercase tracking-wider block text-blue-500 mb-0.5">Why Visit:</span>
                {selectedEvent.whyVisit}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
