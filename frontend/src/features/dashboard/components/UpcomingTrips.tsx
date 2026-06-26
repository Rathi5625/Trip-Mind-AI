"use client"

import * as React from "react"
import { Calendar } from "lucide-react"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { TripCard } from "./TripCard"
import { Trip } from "../types/dashboard"

interface UpcomingTripsProps {
  trips: Trip[]
}

export function UpcomingTrips({ trips }: UpcomingTripsProps) {
  const viewAllAction = (
    <button
      onClick={() => alert("Loading all historical and future trips...")}
      className="text-xs font-bold text-primary-blue hover:underline cursor-pointer"
    >
      View All
    </button>
  )

  return (
    <div className="w-full">
      <SectionHeader icon={Calendar} title="Upcoming Trips" action={viewAllAction} />
      
      {/* Grid of trips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  )
}
