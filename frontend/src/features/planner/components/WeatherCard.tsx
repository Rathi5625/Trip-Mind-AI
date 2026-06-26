"use client"

import * as React from "react"
import { Sun, Users, ThermometerSun } from "lucide-react"

interface WeatherCardProps {
  temp: string
  weather: string
  crowdLevel: string
}

export function WeatherCard({ temp, weather, crowdLevel }: WeatherCardProps) {
  return (
    <div className="grid grid-cols-2 gap-3.5 select-none w-full">
      {/* Weather Card */}
      <div className="flex flex-col justify-between p-4 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/60 h-28">
        <div className="flex size-7.5 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950/20 text-orange-500 shrink-0">
          <ThermometerSun className="size-4.5 stroke-[2.5]" />
        </div>
        
        <div className="space-y-0.5 mt-2">
          <span className="block text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none">
            {temp}
          </span>
          <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500">
            {weather}
          </span>
        </div>
      </div>

      {/* Crowd Level Card */}
      <div className="flex flex-col justify-between p-4 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/60 h-28">
        <div className="flex size-7.5 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40 text-primary-blue dark:text-blue-400 shrink-0">
          <Users className="size-4.5 stroke-[2.5]" />
        </div>
        
        <div className="space-y-0.5 mt-2">
          <span className="block text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none">
            {crowdLevel}
          </span>
          <span className="block text-[10px] font-bold text-slate-450 dark:text-slate-500">
            Crowd Lvl
          </span>
        </div>
      </div>
    </div>
  )
}
