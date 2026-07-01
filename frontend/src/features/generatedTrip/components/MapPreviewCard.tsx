"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { MapPin, Compass } from "lucide-react"
import { useRouter } from "next/navigation"

interface MapPreviewCardProps {
  savedLocationsCount: number
}

export function MapPreviewCard({ savedLocationsCount }: MapPreviewCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push("/planner/itinerary") // Redirection opens interactive map / itinerary view
  }

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className="relative h-[180px] rounded-3xl overflow-hidden shadow-sm select-none cursor-pointer group"
    >
      
      {/* Map Background image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80)` // Map styled image
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Light Glass overlay */}
      <div className="absolute inset-0 bg-slate-100/10 group-hover:bg-slate-100/0 transition-colors" />

      {/* Floating details badge left bottom */}
      <div className="absolute bottom-4 left-4 p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-black/5 dark:border-white/5 shadow-md max-w-[160px] text-left">
        <span className="block text-[8px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
          Interactive Map
        </span>
        <h4 className="text-xs font-black text-slate-805 dark:text-slate-100 mt-0.5 leading-none">
          {savedLocationsCount} Saved Locations
        </h4>
      </div>

      {/* Floating compass pin bottom right */}
      <div className="absolute bottom-4 right-4 p-3 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-500/20 group-hover:rotate-12 transition-transform">
        <Compass className="size-4.5" />
      </div>

    </motion.div>
  )
}
