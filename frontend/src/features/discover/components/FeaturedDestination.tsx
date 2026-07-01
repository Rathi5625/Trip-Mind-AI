"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Compass, Waves, Sparkles, ArrowRight } from "lucide-react"

export function FeaturedDestination() {
  
  const handleFeaturedClick = (label: string) => {
    alert(`Discovering ${label} packages curated by VoyageAI...`)
  }

  return (
    <div className="space-y-6 select-none text-left w-full">
      
      {/* Section Header */}
      <div className="space-y-1">
        <span className="block text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
          Handpicked Highlights
        </span>
        <h3 className="text-xl font-black text-slate-805 dark:text-slate-100 tracking-tight">
          Featured Collections
        </h3>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Large featured card (left) */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => handleFeaturedClick("Coastal Escapes")}
          className="relative h-[340px] lg:h-[400px] rounded-3xl overflow-hidden shadow-sm group cursor-pointer"
        >
          {/* Cover image */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80)`
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

          {/* Bottom left details badge */}
          <div className="absolute bottom-5 left-5 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 max-w-[240px] text-left">
            <div className="flex items-center gap-1 text-[9px] font-black uppercase text-blue-450 tracking-wider">
              <Waves className="size-3.5" />
              <span>Coastal Escapes</span>
            </div>
            <h4 className="text-sm font-black text-white mt-1 leading-none">
              Pristine Beaches
            </h4>
            <p className="text-[10px] font-semibold text-slate-350 mt-1 leading-normal">
              Pristine beaches and ocean views
            </p>
          </div>
        </motion.div>

        {/* Nested secondary cards (right side) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:h-[400px]">
          
          {/* Alpine Peaks */}
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => handleFeaturedClick("Alpine Peaks")}
            className="relative h-[160px] sm:h-auto lg:h-[188px] rounded-3xl overflow-hidden shadow-sm group cursor-pointer"
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80)`
              }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs font-black text-white uppercase tracking-wider">
              Alpine Peaks
            </span>
          </motion.div>

          {/* Urban Energy */}
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => handleFeaturedClick("Urban Energy")}
            className="relative h-[160px] sm:h-auto lg:h-[188px] rounded-3xl overflow-hidden shadow-sm group cursor-pointer"
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80)`
              }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs font-black text-white uppercase tracking-wider">
              Urban Energy
            </span>
          </motion.div>

          {/* Cultural Heritage (spans across the bottom) */}
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => handleFeaturedClick("Cultural Heritage")}
            className="relative h-[160px] sm:col-span-2 lg:col-span-2 lg:h-[188px] rounded-3xl overflow-hidden shadow-sm group cursor-pointer"
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80)`
              }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/30 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-xs font-black text-white uppercase tracking-wider">
                Cultural Heritage
              </span>
              <div className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 group-hover:bg-white group-hover:text-slate-950 transition-colors">
                <ArrowRight className="size-4" />
              </div>
            </div>
          </motion.div>

        </div>

      </div>

    </div>
  )
}
