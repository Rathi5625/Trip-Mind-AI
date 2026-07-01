"use client"

import * as React from "react"
import { ShieldCheck, Wallet, Users, Sparkles } from "lucide-react"

interface AITravelScoreProps {
  overallScore: number
  safetyScore: number
  crowdForecast: string
  avgDailyCost: string
  recommendedDuration: string
}

export function AITravelScore({
  overallScore,
  safetyScore,
  crowdForecast,
  avgDailyCost,
  recommendedDuration
}: AITravelScoreProps) {
  
  // Custom mock data for bar charts
  const crowdBars = [25, 45, 60, 90, 75, 40, 30]

  return (
    <div className="w-full select-none text-left max-w-6xl mx-auto space-y-4">
      
      {/* Title */}
      <div className="flex items-center gap-1.5 text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
        <Sparkles className="size-4 text-blue-500 fill-blue-500/10" />
        <span>Travel Intelligence</span>
      </div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Overall score large card */}
        <div className="lg:col-span-1 p-6 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between items-center text-center space-y-4">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
            Overall AI Travel Score
          </span>
          <div className="space-y-1">
            <span className="text-5xl font-black text-blue-600 dark:text-blue-500">
              {overallScore}
            </span>
            <span className="text-xl font-bold text-slate-400">/100</span>
          </div>
          
          {/* Bottom gradient custom progress indicator */}
          <div className="w-full h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-yellow-500 to-rose-500" />
        </div>

        {/* Right Column: Three stack status cards + Recommended length of stay */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Safe */}
            <div className="p-4 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 flex items-start gap-3">
              <ShieldCheck className="size-5 text-emerald-505 shrink-0" />
              <div className="space-y-1 text-[11px] leading-tight">
                <div className="flex items-center justify-between">
                  <span className="font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Safe</span>
                  <span className="font-black text-slate-700 dark:text-slate-200">{safetyScore}%</span>
                </div>
                <p className="text-[10px] font-bold text-slate-450 dark:text-slate-400">
                  Safety Score based on real-time city data.
                </p>
              </div>
            </div>

            {/* Moderate cost */}
            <div className="p-4 rounded-3xl border border-yellow-500/30 bg-yellow-500/5 dark:bg-yellow-500/10 flex items-start gap-3">
              <Wallet className="size-5 text-yellow-600 dark:text-yellow-405 shrink-0" />
              <div className="space-y-1 text-[11px] leading-tight">
                <div className="flex items-center justify-between">
                  <span className="font-black text-yellow-600 dark:text-yellow-405 uppercase tracking-wide">Moderate</span>
                  <span className="font-black text-slate-700 dark:text-slate-200">$$$</span>
                </div>
                <p className="text-[10px] font-bold text-slate-450 dark:text-slate-400">
                  Average daily spending is higher than usual.
                </p>
              </div>
            </div>

            {/* Busy crowds */}
            <div className="p-4 rounded-3xl border border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/10 flex items-start gap-3">
              <Users className="size-5 text-rose-505 shrink-0" />
              <div className="space-y-1 text-[11px] leading-tight">
                <div className="flex items-center justify-between">
                  <span className="font-black text-rose-600 dark:text-rose-400 uppercase tracking-wide">Busy</span>
                  <span className="font-black text-slate-700 dark:text-slate-200">{crowdForecast}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-455 dark:text-slate-400">
                  Crowd forecast indicates peak tourist season.
                </p>
              </div>
            </div>

          </div>

          {/* Recommended stay duration bar chart */}
          <div className="p-4 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl flex items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="block text-[9px] font-black uppercase text-slate-400 tracking-wider">
                Recommended Length of Stay
              </span>
              <span className="block text-sm font-black text-slate-755 dark:text-slate-100">
                {recommendedDuration}
              </span>
            </div>

            {/* Mock vertical bar charts */}
            <div className="flex items-end gap-1 h-8">
              {crowdBars.map((val, idx) => (
                <div
                  key={idx}
                  className="w-1.5 rounded-full bg-blue-500/20 overflow-hidden h-full flex items-end"
                >
                  <div
                    className="w-full bg-blue-600 dark:bg-blue-500 rounded-full"
                    style={{ height: `${val}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
