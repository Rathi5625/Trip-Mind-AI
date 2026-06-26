"use client"

import * as React from "react"
import { Calendar, Compass, FileText, Trash2 } from "lucide-react"
import { SavedTrip } from "../types/planner"
import { SAVED_TRIPS } from "../constants/plannerPrompts"

interface SavedTripsProps {
  onSelectTrip?: (title: string) => void
}

export function SavedTrips({ onSelectTrip }: SavedTripsProps) {
  const [trips, setTrips] = React.useState<SavedTrip[]>(SAVED_TRIPS)

  const handleTripClick = (title: string) => {
    if (onSelectTrip) {
      onSelectTrip(title)
    } else {
      alert(`Loading planning context for: ${title}...`)
    }
  }

  const handleDeleteTrip = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setTrips((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-1.5 w-full select-none">
      <p className="px-3 text-[10px] font-bold tracking-wider text-slate-450 dark:text-slate-500 uppercase">
        Saved Trips
      </p>
      
      <div className="space-y-1 w-full">
        {trips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => handleTripClick(trip.title)}
            className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800/40 dark:hover:text-slate-200 transition-all cursor-pointer w-full"
          >
            <div className="flex items-center gap-2.5 truncate">
              {trip.id.includes("tokyo") ? (
                <Compass className="size-4 text-blue-500 shrink-0" />
              ) : trip.id.includes("bali") ? (
                <FileText className="size-4 text-emerald-500 shrink-0" />
              ) : (
                <Calendar className="size-4 text-amber-500 shrink-0" />
              )}
              <span className="truncate">{trip.title}</span>
            </div>

            {/* Trash button */}
            <button
              onClick={(e) => handleDeleteTrip(e, trip.id)}
              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 p-1 rounded transition-opacity cursor-pointer shrink-0"
              aria-label={`Delete ${trip.title}`}
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        ))}

        {trips.length === 0 && (
          <p className="px-3 text-[10px] font-medium text-slate-400 dark:text-slate-500 italic mt-1">
            No saved plans yet.
          </p>
        )}
      </div>
    </div>
  )
}
