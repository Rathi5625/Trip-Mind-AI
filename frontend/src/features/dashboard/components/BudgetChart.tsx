"use client"

import * as React from "react"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface BudgetChartProps {
  spent: number
  total: number
}

export function BudgetChart({ spent, total }: BudgetChartProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="relative flex size-44 items-center justify-center rounded-full border-4 border-slate-100 dark:border-slate-800 animate-pulse">
        <div className="text-center">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            Spent
          </span>
          <span className="text-2xl font-black text-slate-800 dark:text-slate-200">
            ${spent.toLocaleString()}
          </span>
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 block mt-0.5">
            of ${total.toLocaleString()}
          </span>
        </div>
      </div>
    )
  }

  // Calculate percentage
  const percentage = Math.min((spent / total) * 100, 100)
  
  // Data for the donut/progress ring
  // Slice 1: Spent, Slice 2: Remaining
  const data = [
    { name: "Spent", value: spent, color: "#2563EB" },
    { name: "Remaining", value: total - spent, color: "rgba(37, 99, 235, 0.08)" }, // light blue border/bg track
  ]

  return (
    <div className="relative size-48 flex items-center justify-center select-none">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={68}
            outerRadius={82}
            startAngle={90}
            endAngle={-270}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell fill="#2563EB" className="stroke-none rounded-full" />
            <Cell
              fill="rgba(15, 23, 42, 0.06)"
              className="stroke-none dark:fill-white/5"
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center Label Overlay */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Spent
        </span>
        <span className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
          ${spent.toLocaleString()}
        </span>
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-0.5">
          of ${total.toLocaleString()}
        </span>
      </div>
    </div>
  )
}
