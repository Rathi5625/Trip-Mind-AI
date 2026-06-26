"use client"

import * as React from "react"
import { Map, MoreHorizontal, ChevronDown, ChevronUp, Link as LinkIcon, Compass, BookOpen, Clock } from "lucide-react"
import { Activity } from "../types/itinerary"
import { useItineraryStore } from "../store/itineraryStore"
import { motion, AnimatePresence } from "framer-motion"

interface ActivityCardProps {
  activity: Activity
  onViewOnMap?: (act: Activity) => void
}

export function ActivityCard({ activity, onViewOnMap }: ActivityCardProps) {
  const { time, category, title, description, cost, duration, distanceToNext, aiTips, bookingUrl, notes } = activity
  const [isExpanded, setIsExpanded] = React.useState(false)
  
  const { highlightedActivityId, setHighlightedActivityId, updateActivityNotes } = useItineraryStore()
  const isHighlighted = highlightedActivityId === activity.id

  const getCategoryStyles = () => {
    switch (category) {
      case "Dining":
        return "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30"
      case "Transit":
        return "bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-800/30 dark:text-slate-400 dark:border-slate-800/50"
      case "Hotel":
        return "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30"
      default: // Activity
        return "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30"
    }
  }

  const handleCardClick = () => {
    setHighlightedActivityId(activity.id)
    setIsExpanded(!isExpanded)
  }

  const handleViewMap = (e: React.MouseEvent) => {
    e.stopPropagation()
    setHighlightedActivityId(activity.id)
    if (onViewOnMap) {
      onViewOnMap(activity)
    } else {
      // Highlight on map preview
      const mapNode = document.getElementById("map-overview-panel")
      if (mapNode) {
        mapNode.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateActivityNotes(activity.id, e.target.value)
  }

  return (
    <div
      onClick={handleCardClick}
      className={`flex-1 flex flex-col p-5 rounded-3xl border transition-all duration-350 cursor-pointer select-none ${
        isHighlighted
          ? "border-blue-500 bg-blue-500/5 shadow-md shadow-blue-500/5 ring-1 ring-blue-500/20"
          : "border-black/5 bg-white shadow-sm hover:border-black/10 dark:border-white/5 dark:bg-slate-900/60 dark:hover:border-white/10"
      }`}
    >
      {/* Top row with Time, Pill, Cost */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-50 dark:border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-blue-600 dark:text-blue-400">
            {time}
          </span>
          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${
            getCategoryStyles()
          }`}>
            {category}
          </span>
        </div>
        
        <span className="text-xs font-black text-slate-800 dark:text-slate-100">
          {cost > 0 ? `¥${cost.toLocaleString()}` : "Free"}
        </span>
      </div>

      {/* Main Title and Description */}
      <div className="space-y-1.5 flex-1">
        <div className="flex items-start justify-between gap-4">
          <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            {title}
          </h4>
          <div className="text-slate-400 dark:text-slate-500 shrink-0">
            {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </div>
        </div>
        
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
          {description}
        </p>
      </div>

      {/* Expandable Info Drawer */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-3 border-t border-slate-100 dark:border-white/5 space-y-3.5" onClick={(e) => e.stopPropagation()}>
              
              {/* Duration and Distance details */}
              <div className="grid grid-cols-2 gap-3 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-slate-400" />
                  <span>Est. Duration: {duration}</span>
                </div>
                {distanceToNext && (
                  <div className="flex items-center gap-1.5">
                    <Compass className="size-3.5 text-slate-400" />
                    <span>Next Stop: {distanceToNext}</span>
                  </div>
                )}
              </div>

              {/* AI Tips */}
              {aiTips && (
                <div className="p-3 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-[10px] font-semibold text-amber-700 dark:text-amber-400 leading-relaxed">
                  {aiTips}
                </div>
              )}

              {/* Booking Link & Actions */}
              {bookingUrl && (
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[9px] font-black text-blue-600 hover:text-blue-700 dark:text-blue-450 dark:hover:text-blue-400 uppercase tracking-widest bg-blue-500/5 px-3 py-1.5 rounded-xl border border-blue-500/10 cursor-pointer"
                >
                  <LinkIcon className="size-3" />
                  <span>Book Tickets / Reserve</span>
                </a>
              )}

              {/* User Notes Area */}
              <div className="space-y-1.5">
                <label htmlFor={`notes-${activity.id}`} className="block text-[9px] font-black text-slate-400 dark:text-slate-550 uppercase tracking-wider">
                  Personal Notes
                </label>
                <textarea
                  id={`notes-${activity.id}`}
                  rows={2}
                  value={notes || ""}
                  onChange={handleNotesChange}
                  placeholder="Tap to add your reminders, confirmation codes, or items to bring..."
                  className="w-full resize-none rounded-xl border border-slate-100 bg-slate-50/50 p-2.5 text-[10px] font-semibold text-slate-700 outline-none placeholder-slate-400 focus:border-blue-500 focus:ring-0 dark:border-white/5 dark:bg-slate-950/20 dark:text-slate-350 dark:placeholder-slate-550"
                />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions Row */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-50 dark:border-white/5 shrink-0">
        <button
          onClick={handleViewMap}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/5 bg-slate-50 hover:bg-slate-100 text-[10px] font-bold text-slate-600 dark:border-white/10 dark:bg-slate-800/40 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Map className="size-3" />
          <span>View on Map</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            alert(`More options for activity: ${title}`)
          }}
          className="p-1.5 rounded-xl border border-black/5 bg-slate-50 hover:bg-slate-100 text-slate-400 dark:border-white/10 dark:bg-slate-800/40 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="More options"
        >
          <MoreHorizontal className="size-3.5" />
        </button>
      </div>
    </div>
  )
}
