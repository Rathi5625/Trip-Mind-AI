"use client"

import * as React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useForecast } from "../hooks/useForecast"
import { useCurrency } from "../hooks/useCurrency"

export function ForecastChart() {
  const { breakdown, total } = useForecast()
  const { formatValue } = useCurrency()

  const data = [
    { name: "Flights", value: breakdown.flights, color: "#2563EB" },
    { name: "Stays", value: breakdown.accommodation, color: "#10B981" },
    { name: "Dining", value: breakdown.dining, color: "#F59E0B" },
    { name: "Activities", value: breakdown.activities, color: "#D6A89C" }
  ]

  return (
    <div className="relative size-48 select-none flex items-center justify-center">
      {/* Center Label hole */}
      <div className="absolute flex flex-col items-center justify-center text-center z-10 select-none">
        <span className="text-[7.5px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
          Total
        </span>
        <span className="text-sm font-black text-slate-805 dark:text-slate-105 mt-0.5">
          {formatValue(total)}
        </span>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={70}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
