"use client"

import * as React from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { useBudgetStore } from "../store/budgetStore"
import { useCurrency } from "../hooks/useCurrency"
import { BOOKING_TIMELINE_DATA } from "../constants/budgetPresets"

export function BookingTimeline() {
  const sliderValue = useBudgetStore((state) => state.sliderValue)
  const { formatValue, convertFromUSD } = useCurrency()

  // Calculate actual cost points dynamically
  const chartData = BOOKING_TIMELINE_DATA.map((pt) => ({
    label: pt.label,
    cost: Math.round(sliderValue * pt.priceIndex)
  }))

  return (
    <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl select-none space-y-3.5 w-full">
      
      <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-white/5">
        <h4 className="text-[10px] font-black uppercase text-slate-805 dark:text-slate-100 tracking-wider">
          🔮 AI Booking Cost Timeline
        </h4>
        <span className="text-[8px] font-bold text-slate-400">Cost by Booking Date</span>
      </div>

      <div className="w-full h-28">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
            <XAxis dataKey="label" tick={{ fontSize: 7, fontWeight: 700 }} tickLine={false} axisLine={false} />
            <YAxis tickFormatter={(val) => `₹${Math.round(convertFromUSD(val)/1000)}k`} tick={{ fontSize: 7, fontWeight: 700 }} tickLine={false} axisLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="p-2 rounded-xl bg-slate-900 border border-white/10 text-[9px] font-bold text-white shadow-md">
                      <span>Booking: {data.label}</span>
                      <div className="text-blue-400 font-extrabold mt-0.5">Est. Cost: {formatValue(data.cost)}</div>
                    </div>
                  )
                }
                return null
              }}
            />
            {/* Highlights "Now" marker line */}
            <ReferenceLine x="Now" stroke="#2563EB" strokeDasharray="3 3" opacity={0.6} />
            <Line
              type="monotone"
              dataKey="cost"
              stroke="#2563EB"
              strokeWidth={2.5}
              dot={{ r: 3, strokeWidth: 1, stroke: "#2563EB" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-[8.5px] font-bold text-slate-400 dark:text-slate-500 leading-normal text-center mt-1">
        💡 Tip: Booking flights 3 months ahead saves ~12% on average.
      </p>

    </div>
  )
}
