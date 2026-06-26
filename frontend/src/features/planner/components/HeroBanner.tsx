"use client"

import * as React from "react"
import { Sparkles, Calendar, Clock } from "lucide-react"
import { ItineraryDetails } from "../types/itinerary"

interface HeroBannerProps {
  itinerary: ItineraryDetails
}

export function HeroBanner({ itinerary }: HeroBannerProps) {
  const { title, duration, dates, image, summary } = itinerary

  return (
    <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-lg select-none border border-black/5 dark:border-white/5">
      {/* Background Hero Image */}
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover"
      />
      
      {/* Premium Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-900/10 z-10" />

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
        
        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-[9px] font-black tracking-widest text-white uppercase bg-blue-600 border border-blue-500 px-2.5 py-1 rounded-full shadow-sm">
            <Sparkles className="size-2.5 fill-white" />
            AI Choice
          </span>
          <span className="inline-flex items-center gap-1 text-[9px] font-black tracking-widest text-slate-200 uppercase bg-slate-900/60 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
            <Clock className="size-2.5" />
            {duration}
          </span>
          <span className="inline-flex items-center gap-1 text-[9px] font-black tracking-widest text-slate-200 uppercase bg-slate-900/60 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
            <Calendar className="size-2.5" />
            {dates}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
          {title}
        </h2>

        {/* Description Summary */}
        <p className="text-xs text-slate-200 font-semibold max-w-xl mt-2 leading-relaxed opacity-90 drop-shadow-sm">
          {summary}
        </p>
      </div>
    </div>
  )
}
