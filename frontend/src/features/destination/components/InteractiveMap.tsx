"use client"

import * as React from "react"
import { Compass, Plus, Minus, Info } from "lucide-react"

export function InteractiveMap() {
  const [zoom, setZoom] = React.useState(12)

  return (
    <div className="w-full select-none text-left max-w-6xl mx-auto space-y-4">
      
      {/* Title */}
      <h3 className="text-sm font-black text-slate-805 dark:text-white uppercase tracking-wider">
        Explore the Arrondissements
      </h3>

      {/* Styled premium mockup map canvas container */}
      <div className="relative h-72 rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 bg-slate-100 dark:bg-slate-900 shadow-md">
        
        {/* Simple canvas design mockup of Paris map */}
        <div className="absolute inset-0 bg-cover bg-center opacity-60 dark:opacity-40" style={{ backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/2.3376,48.8606,${zoom},0/800x300?access_token=mock')` }}>
          {/* Fallback pattern representing streets & river */}
          <div className="size-full bg-gradient-to-br from-blue-500/5 to-emerald-500/5 relative">
            
            {/* Mock River Seine */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-10 bg-blue-400/20 dark:bg-blue-900/10 blur-[1px] rotate-[-5deg]" />
            
            {/* Custom Marker 1 (Louvre) */}
            <div className="absolute left-[40%] top-[45%] flex flex-col items-center">
              <div className="size-3.5 rounded-full bg-blue-600 border-2 border-white shadow animate-pulse cursor-pointer" title="Louvre Museum" />
            </div>

            {/* Custom Marker 2 (Le Marais) */}
            <div className="absolute left-[60%] top-[55%] flex flex-col items-center">
              <div className="size-3.5 rounded-full bg-orange-500 border-2 border-white shadow animate-pulse cursor-pointer" title="Le Marais Hub" />
            </div>

          </div>
        </div>

        {/* Top-left Info Panel overlay */}
        <div className="absolute top-4 left-4 p-4 max-w-[240px] rounded-2xl border border-white/20 bg-white/70 dark:bg-slate-900/90 backdrop-blur-md shadow-lg space-y-2 text-left">
          <div className="flex items-center gap-1.5 text-[8.5px] font-black uppercase text-slate-400 tracking-wider">
            <Info className="size-3 text-blue-500" />
            <span>Suggested Hub</span>
          </div>
          <div className="space-y-0.5">
            <h5 className="text-[11px] font-black text-slate-805 dark:text-white leading-none">
              Le Marais (District 4)
            </h5>
            <p className="text-[9.5px] font-semibold text-slate-500 dark:text-slate-400 leading-relaxed pt-0.5">
              Top-rated for boutique hotels & classic art galleries.
            </p>
          </div>
        </div>

        {/* Right zoom controls +/- */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => setZoom((z) => Math.min(z + 1, 16))}
            className="p-2 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-black/5 dark:border-white/5 shadow-md cursor-pointer"
            aria-label="Zoom in"
          >
            <Plus className="size-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 1, 8))}
            className="p-2 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-black/5 dark:border-white/5 shadow-md cursor-pointer"
            aria-label="Zoom out"
          >
            <Minus className="size-4" />
          </button>
        </div>

        {/* Center crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <Compass className="size-10 text-slate-400" />
        </div>

      </div>

    </div>
  )
}
