"use client"

import * as React from "react"
import { Popup } from "react-map-gl/maplibre"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Navigation, Star, Sparkles, X, DollarSign, MapPin, Calendar, HelpCircle } from "lucide-react"
import { useMapStore } from "../store/mapStore"
import { popupVariants } from "../utils/animation"
import type { MarkerPopup as MarkerPopupData } from "../types/marker"

interface DestinationPopupProps {
  popup: MarkerPopupData
  onClose?: () => void
  onGenerateItinerary?: (id: string) => void
  onSaveToWishlist?: (id: string) => void
  onEstimateBudget?: (id: string) => void
  onFindAttractions?: (id: string) => void
}

export function DestinationPopup({
  popup,
  onClose,
  onGenerateItinerary,
  onSaveToWishlist,
  onEstimateBudget,
  onFindAttractions
}: DestinationPopupProps) {
  const setSelectedMarkerId = useMapStore((s) => s.setSelectedMarkerId)
  const savedPlaceIds = useMapStore((s) => s.savedPlaceIds)
  const toggleSavedPlace = useMapStore((s) => s.toggleSavedPlace)

  const [activeTab, setActiveTab] = React.useState<"info" | "ai-actions">("info")

  const isSaved = savedPlaceIds.has(popup.markerId)

  const handleClose = () => {
    setSelectedMarkerId(null)
    onClose?.()
  }

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleSavedPlace(popup.markerId)
    onSaveToWishlist?.(popup.markerId)
  }

  return (
    <Popup
      longitude={popup.coordinates.lng}
      latitude={popup.coordinates.lat}
      anchor="top"
      onClose={handleClose}
      closeButton={false}
      closeOnClick={false}
      maxWidth="280px"
      offset={[0, 10]}
      className="z-50 select-none"
    >
      <motion.div
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-[250px] rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
      >
        {/* Destination Image header */}
        {popup.imageUrl && (
          <div className="relative h-28 overflow-hidden">
            <img
              src={popup.imageUrl}
              alt={popup.title}
              className="size-full object-cover"
            />
            {/* Shading overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2.5 right-2.5 size-6 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 cursor-pointer border-0 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
              aria-label="Close details"
            >
              <X className="size-3" />
            </button>

            {/* AI Match Badge */}
            {popup.matchScore !== undefined && (
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-violet-600/90 text-white text-[9px] font-black tracking-wider uppercase">
                <Sparkles className="size-2.5 animate-pulse" />
                <span>{popup.matchScore}% Match</span>
              </div>
            )}
          </div>
        )}

        {/* Tab Selector */}
        <div className="flex border-b border-slate-100 dark:border-slate-800/80 text-[10px] font-black text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={() => setActiveTab("info")}
            className={`flex-1 py-2 text-center transition-colors cursor-pointer border-0 outline-none
              ${activeTab === "info" 
                ? "text-blue-600 dark:text-blue-400 font-black border-b-2 border-blue-500 bg-white dark:bg-slate-900" 
                : "hover:text-slate-800 dark:hover:text-slate-100"
              }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab("ai-actions")}
            className={`flex-1 py-2 text-center transition-colors cursor-pointer border-0 outline-none flex items-center justify-center gap-1
              ${activeTab === "ai-actions" 
                ? "text-blue-600 dark:text-blue-400 font-black border-b-2 border-blue-500 bg-white dark:bg-slate-900" 
                : "hover:text-slate-800 dark:hover:text-slate-100"
              }`}
          >
            <Sparkles className="size-3 text-violet-500" />
            <span>AI Actions</span>
          </button>
        </div>

        {/* Dynamic Content based on active tab */}
        <div className="p-3.5 min-h-[100px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {activeTab === "info" ? (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-2.5 flex-grow"
              >
                <div>
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 leading-tight truncate">
                    {popup.title}
                  </h4>
                  {popup.subtitle && (
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold leading-none mt-0.5 truncate">
                      {popup.subtitle}
                    </p>
                  )}
                </div>

                {popup.description && (
                  <p className="text-[10px] font-medium leading-normal text-slate-500 dark:text-slate-400 line-clamp-3">
                    {popup.description}
                  </p>
                )}

                {/* Rating & reviews */}
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-2 text-[10px] font-bold">
                  {popup.price && (
                    <span className="text-blue-600 dark:text-blue-400 font-black">
                      {popup.price}
                    </span>
                  )}
                  
                  {popup.rating !== undefined && (
                    <div className="flex items-center gap-0.5 text-amber-500">
                      <Star className="size-3 fill-amber-500" />
                      <span>{popup.rating.toFixed(1)}</span>
                      {popup.reviewCount !== undefined && (
                        <span className="text-slate-400 font-semibold">({popup.reviewCount})</span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="ai-actions"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="grid grid-cols-1 gap-1.5 w-full"
              >
                {/* 1. Generate Itinerary */}
                <button
                  onClick={() => onGenerateItinerary?.(popup.markerId)}
                  className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-left hover:bg-violet-50 dark:hover:bg-violet-950/20 text-slate-700 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors border-0 outline-none cursor-pointer focus:ring-1 focus:ring-violet-500"
                >
                  <Calendar className="size-3.5 shrink-0" />
                  <span className="text-[10px] font-black">Generate Itinerary</span>
                </button>

                {/* 2. Save to Wishlist */}
                <button
                  onClick={handleSaveToggle}
                  className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-left transition-colors border-0 outline-none cursor-pointer focus:ring-1 focus:ring-red-500
                    ${isSaved
                      ? "bg-red-50/50 dark:bg-red-950/20 text-red-500"
                      : "hover:bg-red-50/30 dark:hover:bg-red-950/10 text-slate-700 dark:text-slate-200 hover:text-red-500"
                    }`}
                >
                  <Heart className={`size-3.5 shrink-0 ${isSaved ? "fill-red-500" : ""}`} />
                  <span className="text-[10px] font-black">{isSaved ? "Saved to Wishlist" : "Save to Wishlist"}</span>
                </button>

                {/* 3. Estimate Budget */}
                <button
                  onClick={() => onEstimateBudget?.(popup.markerId)}
                  className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors border-0 outline-none cursor-pointer focus:ring-1 focus:ring-emerald-500"
                >
                  <DollarSign className="size-3.5 shrink-0" />
                  <span className="text-[10px] font-black">Estimate Budget</span>
                </button>

                {/* 4. Find Nearby Attractions */}
                <button
                  onClick={() => onFindAttractions?.(popup.markerId)}
                  className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-left hover:bg-blue-50 dark:hover:bg-blue-950/20 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-0 outline-none cursor-pointer focus:ring-1 focus:ring-blue-500"
                >
                  <MapPin className="size-3.5 shrink-0" />
                  <span className="text-[10px] font-black">Nearby Attractions</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Popup>
  )
}
