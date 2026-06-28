"use client"

import * as React from "react"
import { useBudgetStore } from "../store/budgetStore"
import { useCurrency } from "../hooks/useCurrency"
import { CurrencySelector } from "./CurrencySelector"

export function BudgetSlider() {
  const { sliderValue, setSliderValue } = useBudgetStore()
  const { formatValue, convertFromUSD, convertToUSD, symbol } = useCurrency()

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value))
  }

  const [isDark, setIsDark] = React.useState(false)
  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  // Calculate local currency limits
  const localMin = convertFromUSD(500)
  const localMax = convertFromUSD(10000)

  return (
    <div className="flex flex-col p-6 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl select-none gap-6">
      
      {/* Label and currency row */}
      <div className="flex items-start justify-between">
        <div>
          <span className="block text-[8px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
            Forecasted Spend
          </span>
          <h2 className="text-3xl font-black text-blue-600 dark:text-blue-450 tracking-tight mt-1">
            {formatValue(sliderValue)}
          </h2>
        </div>

        {/* Currency Switcher widget */}
        <CurrencySelector />
      </div>

      {/* Slider range input control */}
      <div className="space-y-2">
        <input
          type="range"
          min={500}
          max={10000}
          step={100}
          value={sliderValue}
          onChange={handleSliderChange}
          className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          style={{
            background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((sliderValue - 500) / 9500) * 100}%, ${
              isDark ? "#1e293b" : "#f1f5f9"
            } ${((sliderValue - 500) / 9500) * 100}%, ${
              isDark ? "#1e293b" : "#f1f5f9"
            } 100%)`
          }}
        />

        {/* Tick labels */}
        <div className="flex justify-between text-[9px] font-black text-slate-400 dark:text-slate-550 uppercase tracking-widest px-0.5">
          <span>{symbol}{localMin.toLocaleString()}</span>
          <span>{symbol}{(localMax / 2).toLocaleString()}</span>
          <span>{symbol}{localMax.toLocaleString()}+</span>
        </div>
      </div>

    </div>
  )
}
