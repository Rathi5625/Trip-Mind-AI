import * as React from "react"

const stats = [
  { value: "10k+", label: "Trips Planned" },
  { value: "120+", label: "Countries Covered" },
  { value: "95%", label: "Satisfaction Rate" },
]

export function StatsBar() {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`text-center ${
              index < stats.length - 1 ? "border-r border-white/10" : ""
            } px-2`}
          >
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {stat.value}
            </div>
            <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-slate-400 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
