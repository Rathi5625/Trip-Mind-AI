"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"

interface DestinationHeroProps {
  destination: string
  imageUrl: string
  region: string
  country: string
}

export function DestinationHero({ destination, imageUrl, region, country }: DestinationHeroProps) {
  const router = useRouter()

  const handleEdit = () => {
    // Step 1: Destination Selection
    router.push("/planner/create-trip")
  }

  return (
    <div className="relative w-full h-[320px] rounded-3xl overflow-hidden shadow-sm group">
      
      {/* Zoom Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />

      {/* Destination badge top left */}
      <div className="absolute top-6 left-6 select-none bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
        <span className="text-[10px] font-black uppercase text-white/90 tracking-widest">
          Destination
        </span>
      </div>

      {/* Destination Titles bottom left */}
      <div className="absolute bottom-6 left-6 text-white select-none">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight drop-shadow-md">
          {destination}
        </h2>
        {region && (
          <span className="text-xs font-semibold text-white/70 drop-shadow-sm flex items-center gap-1.5 mt-1">
            <span>📍</span> {region}
          </span>
        )}
      </div>

      {/* Floating pencil edit button bottom right */}
      <button
        onClick={handleEdit}
        className="absolute bottom-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-md text-white transition-all shadow-lg hover:scale-105 cursor-pointer"
        aria-label="Edit Destination"
      >
        <Pencil className="size-4" />
      </button>

    </div>
  )
}
