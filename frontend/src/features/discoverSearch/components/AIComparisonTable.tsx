"use client"

import * as React from "react"
import { Compass, Sparkles } from "lucide-react"
import { ComparisonCity } from "../types/search"

interface AIComparisonTableProps {
  cities?: ComparisonCity[]
}

export function AIComparisonTable({ cities }: AIComparisonTableProps) {
  const defaultCities: ComparisonCity[] = [
    {
      name: "Tokyo",
      budget: "Higher (₹120k)",
      budgetScore: 60,
      weather: "18°C, Clear",
      weatherScore: 78,
      popularity: "Very High",
      popularityScore: 95,
      food: "Exceptional",
      foodScore: 98,
      safety: "Outstanding",
      safetyScore: 96,
      nightlife: "Excellent",
      nightlifeScore: 92,
      crowds: "Dense",
      crowdsScore: 88,
      bestSeason: "Spring / Autumn"
    },
    {
      name: "Seoul",
      budget: "Lower (₹85k)",
      budgetScore: 85,
      weather: "15°C, Cloudy",
      weatherScore: 68,
      popularity: "High",
      popularityScore: 82,
      food: "Amazing",
      foodScore: 90,
      safety: "Excellent",
      safetyScore: 92,
      nightlife: "Vibrant",
      nightlifeScore: 88,
      crowds: "Moderate",
      crowdsScore: 60,
      bestSeason: "Autumn"
    }
  ]

  const list = cities || defaultCities

  // Define metrics rows to compare visually
  const metrics = [
    { label: "Budget Value (Higher is better savings)", key: "budgetScore", emoji: "💸" },
    { label: "Weather Quality", key: "weatherScore", emoji: "🌤️" },
    { label: "Crowd Control (Higher is less crowded)", key: "crowdsScore", emoji: "👥" },
    { label: "Food Score", key: "foodScore", emoji: "🍜" },
    { label: "Activities Count", key: "popularityScore", emoji: "🎯" },
    { label: "Safety Rating", key: "safetyScore", emoji: "🛡️" },
    { label: "AI Match Score", key: "nightlifeScore", emoji: "🤖" }
  ]

  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-4 select-none text-left w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
          <Compass className="size-4.5 text-blue-500" />
          <span>Interactive Comparison Chart</span>
        </div>
        <span className="text-[9.5px] font-black uppercase text-blue-600 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full shrink-0">
          Suggested based on your history
        </span>
      </div>

      {/* Comparison Grid representation (Table styled columns) */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-xs font-semibold text-slate-505 dark:text-slate-400">
          <thead>
            <tr className="border-b border-black/5 dark:border-white/5 text-[10px] uppercase text-slate-400 tracking-wider">
              <th className="py-2.5 text-left font-black">Metric</th>
              {list.map((c) => (
                <th key={c.name} className="py-2.5 text-center font-black text-slate-805 dark:text-white w-1/3">
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            
            {metrics.map((m) => (
              <tr key={m.label} className="border-b border-black/5 dark:border-white/5">
                <td className="py-3 font-semibold text-slate-500 flex items-center gap-1">
                  <span>{m.emoji}</span> {m.label}
                </td>
                {list.map((c) => {
                  const score = (c as any)[m.key] || 75
                  return (
                    <td key={c.name} className="py-3 px-4 text-center">
                      <div className="space-y-1 max-w-[150px] mx-auto">
                        <div className="flex justify-between text-[9px] font-black text-slate-655 dark:text-slate-355 leading-none">
                          <span>Score:</span>
                          <span>{score}%</span>
                        </div>
                        {/* Custom visual progress bar chart */}
                        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500
                              ${score >= 90 ? "bg-emerald-500" : "bg-blue-600 dark:bg-blue-500"}
                            `}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}

            {/* Best Season text row */}
            <tr>
              <td className="py-3 font-semibold text-slate-500 flex items-center gap-1">
                <span>🍂</span> Best Season
              </td>
              {list.map((c) => (
                <td key={c.name} className="py-3 text-center text-slate-700 dark:text-slate-300 font-bold">
                  {c.bestSeason}
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  )
}
