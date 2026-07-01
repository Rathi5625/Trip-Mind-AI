"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Star, Sparkles, X, Heart } from "lucide-react"

interface HeroGalleryProps {
  name: string
  country: string
  rating: number
  matchScore: number
  images: string[]
  isSaved: boolean
  onToggleSaved: () => void
}

export function HeroGallery({
  name,
  country,
  rating,
  matchScore,
  images,
  isSaved,
  onToggleSaved
}: HeroGalleryProps) {
  const [activePhotoIndex, setActivePhotoIndex] = React.useState<number | null>(null)

  return (
    <div className="w-full select-none">
      
      {/* Visual gallery layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto text-left">
        
        {/* Left main image (covers 2 columns in width) */}
        <div className="md:col-span-2 relative h-[380px] rounded-3xl overflow-hidden shadow-md group">
          <motion.div
            className="absolute inset-0 bg-cover bg-center cursor-pointer"
            style={{ backgroundImage: `url(${images[0]})` }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            onClick={() => setActivePhotoIndex(0)}
          />
          
          {/* Bottom frosted details card overlay */}
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl border border-white/20 bg-white/20 backdrop-blur-xl flex items-center justify-between shadow-lg">
            <div className="space-y-1 text-white">
              <div className="flex items-center gap-1">
                <MapPin className="size-4.5 text-blue-500 fill-blue-500/20" />
                <h2 className="text-lg font-black tracking-tight leading-none">
                  {name}, {country}
                </h2>
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <div className="bg-slate-900/40 border border-white/10 px-2 py-0.5 rounded-lg flex items-center gap-1 text-[8.5px] font-black tracking-wide">
                  <Star className="size-2.5 text-yellow-450 fill-yellow-450" />
                  <span>{rating} Rating</span>
                </div>
                <div className="bg-blue-650/40 border border-blue-500/20 px-2 py-0.5 rounded-lg flex items-center gap-1 text-[8.5px] font-black tracking-wide">
                  <Sparkles className="size-2.5 text-blue-300 fill-blue-300/10" />
                  <span>{matchScore}% AI Match</span>
                </div>
              </div>
            </div>

            {/* Save to Trip Button */}
            <button
              onClick={onToggleSaved}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow
                ${
                  isSaved
                    ? "bg-rose-600 hover:bg-rose-700 text-white"
                    : "bg-blue-605 hover:bg-blue-700 text-white"
                }
              `}
            >
              {isSaved ? "Saved" : "Save to Trip"}
            </button>
          </div>
        </div>

        {/* Right smaller images stacked (2 columns of 2 rows) */}
        <div className="grid grid-cols-2 md:col-span-2 gap-4 h-[380px]">
          
          {/* Cafe Paris */}
          <div className="relative rounded-3xl overflow-hidden shadow-sm group h-full">
            <motion.div
              className="absolute inset-0 bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url(${images[1]})` }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActivePhotoIndex(1)}
            />
          </div>

          {/* Macarons */}
          <div className="relative rounded-3xl overflow-hidden shadow-sm group h-full">
            <motion.div
              className="absolute inset-0 bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url(${images[2]})` }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActivePhotoIndex(2)}
            />
          </div>

          {/* Louvre Pyramid */}
          <div className="relative rounded-3xl overflow-hidden shadow-sm group h-full">
            <motion.div
              className="absolute inset-0 bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url(${images[3]})` }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActivePhotoIndex(3)}
            />
          </div>

          {/* Seine River (+12 Photos overlay) */}
          <div className="relative rounded-3xl overflow-hidden shadow-sm group h-full">
            <div
              className="absolute inset-0 bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url(${images[4]})` }}
              onClick={() => setActivePhotoIndex(4)}
            />
            {/* Overlay */}
            <div
              onClick={() => setActivePhotoIndex(4)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center text-white text-xs font-black uppercase tracking-wider cursor-pointer hover:bg-slate-950/50 transition-colors"
            >
              +12 Photos
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox full-screen gallery modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-6 text-white"
          >
            {/* Close button */}
            <div className="flex justify-end">
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="size-6" />
              </button>
            </div>

            {/* Main image viewport */}
            <div className="flex-grow flex items-center justify-center max-w-4xl mx-auto">
              <motion.img
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                src={images[activePhotoIndex]}
                alt="Selected Destination gallery photo"
                className="max-h-[70vh] rounded-3xl shadow-2xl object-contain"
              />
            </div>

            {/* Photo Index Indicator footer */}
            <div className="text-center text-xs font-black uppercase text-slate-400 tracking-wider">
              Photo {activePhotoIndex + 1} of {images.length}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
