"use client"

import * as React from "react"
import { CheckCircle2, Sun, ShieldAlert, Clock, Sparkles, Star, CloudRain, HelpCircle } from "lucide-react"
import { AIOutlook } from "../types/review"

interface AIOutlookCardProps {
  outlook?: AIOutlook
  isLoading?: boolean
  tripSummary?: {
    type: string
    duration: string
    accommodation: string
    vibes: string
    pace: string
    cost: string
  }
}

export function AIOutlookCard({ outlook, isLoading, tripSummary }: AIOutlookCardProps) {
  const data = outlook || {
    matchScore: 98,
    matchDescription: "Highly aligned to interests",
    weatherForecast: {
      month: "September",
      temp: "23°C",
      condition: "Sunny",
      rainStatus: "Low Rain",
      season: "Perfect Season"
    },
    crowds: "Low tourist crowds",
    readiness: 98,
    confidence: 98,
    warnings: ["Museums are closed on Mondays. We'll automatically adjust your itinerary."],
    estimatedTimeSeconds: 18
  }

  const summary = tripSummary || {
    type: "Luxury Couple Trip",
    duration: "12 Days",
    accommodation: "Boutique Hotels",
    vibes: "Food + Culture",
    pace: "Balanced Pace",
    cost: "$4,500"
  }

  return (
    <div className="space-y-6">
      
      {/* 1. AI Travel Confidence (Readiness Score) */}
      <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-3.5 select-none">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
          <Sparkles className="size-3.5 text-blue-500 fill-blue-500/10" />
          <span>AI Travel Confidence</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-805 dark:text-slate-100 tracking-tight">
              {data.confidence}%
            </span>
          </div>

          <div className="flex flex-col items-end gap-1">
            {/* Stars row */}
            <div className="flex items-center gap-0.5 text-amber-500 text-sm">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="size-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[9px] font-black uppercase text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Ready to Generate
            </span>
          </div>
        </div>
      </div>

      {/* 2. AI Trip Summary */}
      <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-3.5 select-none">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
          <span>🤖</span>
          <span>AI Summary</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {[summary.type, summary.duration, summary.accommodation, summary.vibes, summary.pace].map((item) => (
            <span
              key={item}
              className="text-[10px] font-bold px-3 py-1.5 bg-blue-500/5 dark:bg-slate-900 border border-black/5 dark:border-white/5 text-slate-700 dark:text-slate-350 rounded-xl"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="border-t border-black/5 dark:border-white/5 pt-3.5 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
            Estimated Cost
          </span>
          <span className="text-sm font-black text-slate-805 dark:text-slate-100">
            {summary.cost}
          </span>
        </div>
      </div>

      {/* 3. Live Destination Weather */}
      <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-3.5 select-none">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
          <Sun className="size-4 text-amber-500" />
          <span>{data.weatherForecast.month} Weather</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 shrink-0">
              <Sun className="size-5" />
            </div>
            <div>
              <span className="block text-xl font-black text-slate-805 dark:text-slate-100 leading-none">
                {data.weatherForecast.temp}
              </span>
              <span className="text-[10px] font-bold text-slate-455 dark:text-slate-400 block mt-1">
                {data.weatherForecast.condition} • {data.weatherForecast.rainStatus}
              </span>
            </div>
          </div>

          <span className="text-[9.5px] font-black uppercase text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full shrink-0">
            {data.weatherForecast.season}
          </span>
        </div>
      </div>

      {/* 4. Estimated Timeline */}
      <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-3.5 select-none">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
          <Clock className="size-4 text-blue-500" />
          <span>AI Generation</span>
        </div>

        {/* Timeline checkpoints */}
        <div className="grid grid-cols-2 gap-2 text-[10px] font-black uppercase text-slate-550 dark:text-slate-400 tracking-wider">
          {["Flights", "Hotels", "Attractions", "Restaurants", "Budget"].map((task) => (
            <div
              key={task}
              className="flex items-center gap-1.5 p-2 rounded-xl bg-white/50 border border-black/5 dark:bg-slate-900/40 dark:border-white/5"
            >
              <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
              <span>{task}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-black/5 dark:border-white/5 pt-3 flex items-center justify-between text-xs">
          <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
            Estimated Time
          </span>
          <span className="font-black text-slate-805 dark:text-slate-100">
            {data.estimatedTimeSeconds} seconds
          </span>
        </div>
      </div>

      {/* 5. AI Warnings */}
      {data.warnings.length > 0 && (
        <div className="p-4 rounded-3xl border border-amber-500/10 bg-amber-500/5 select-none space-y-2">
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-450 text-xs font-black uppercase tracking-wider">
            <ShieldAlert className="size-4 shrink-0" />
            <span>Travel Notice</span>
          </div>
          <div className="space-y-1 pl-1">
            {data.warnings.map((warn, i) => (
              <p key={i} className="text-[10px] font-semibold text-slate-655 dark:text-slate-355 leading-relaxed">
                {warn}
              </p>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
