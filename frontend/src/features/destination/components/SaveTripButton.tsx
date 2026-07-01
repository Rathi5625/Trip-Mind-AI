"use client"

import * as React from "react"
import { Heart } from "lucide-react"

interface SaveTripButtonProps {
  isSaved: boolean
  onClick: () => void
}

export function SaveTripButton({ isSaved, onClick }: SaveTripButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow-md focus:outline-none
        ${
          isSaved
            ? "bg-rose-600 hover:bg-rose-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/10"
        }
      `}
    >
      <Heart className={`size-4.5 ${isSaved ? "fill-white" : ""}`} />
      <span>{isSaved ? "Saved to Itinerary" : "Save to Trip"}</span>
    </button>
  )
}
