import { Calculator, Check } from "lucide-react"
import { BudgetBreakdown, BudgetSavings } from "../types/planner"

interface BudgetEstimatorProps {
  budget: BudgetBreakdown
  savings?: BudgetSavings
}

export function BudgetEstimator({ budget, savings }: BudgetEstimatorProps) {
  const handleTipsClick = () => {
    alert("Retrieving AI optimization recommendations for cheaper hotels and off-peak flight dates...")
  }

  // Calculate percentages relative to the total budget
  const total = budget.total || 1
  const flightPercentage = (budget.flights / total) * 100
  const hotelPercentage = (budget.hotels / total) * 100
  const dailyPercentage = (budget.daily / total) * 100

  return (
    <div className="flex flex-col p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/60 w-full select-none">
      {/* Header Row */}
      <div className="flex items-center justify-between border-b border-slate-50 dark:border-white/5 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Calculator className="size-4 text-slate-400 dark:text-slate-500" />
          <span className="text-xs font-black text-slate-700 dark:text-slate-200">
            Est. Budget
          </span>
        </div>
        <span className="text-sm font-black text-primary-blue dark:text-blue-400">
          ₹{budget.total.toLocaleString()}
        </span>
      </div>

      {/* Breakdown progress rows */}
      <div className="space-y-4 mb-4">
        {/* Flights */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-450">
            <span>Flights</span>
            <span className="text-slate-800 dark:text-slate-200">₹{budget.flights.toLocaleString()}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-500"
              style={{ width: `${flightPercentage}%` }}
            />
          </div>
        </div>

        {/* Hotels */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-450">
            <span>Hotel</span>
            <span className="text-slate-800 dark:text-slate-200">₹{budget.hotels.toLocaleString()}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-600"
              style={{ width: `${hotelPercentage}%` }}
            />
          </div>
        </div>

        {/* Daily spending */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-450">
            <span>Daily</span>
            <span className="text-slate-800 dark:text-slate-200">₹{budget.daily.toLocaleString()}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${dailyPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Savings Breakdown Upgrade */}
      {savings && (
        <div className="mt-2 pt-4 border-t border-slate-50 dark:border-white/5 space-y-3.5 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Potential Savings
            </span>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
              ₹{savings.savings.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            {/* Flights checkbox */}
            <div className="flex items-center gap-2">
              <div className={`flex size-4 items-center justify-center rounded border transition-colors ${
                savings.cheaperFlights
                  ? "bg-emerald-50 border-emerald-300 text-emerald-650 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400"
                  : "border-slate-200 dark:border-slate-800 text-transparent"
              }`}>
                <Check className="size-2.5 stroke-[3]" />
              </div>
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-450">
                Cheaper Flights
              </span>
            </div>

            {/* Hotels checkbox */}
            <div className="flex items-center gap-2">
              <div className={`flex size-4 items-center justify-center rounded border transition-colors ${
                savings.betterHotels
                  ? "bg-emerald-50 border-emerald-300 text-emerald-650 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400"
                  : "border-slate-200 dark:border-slate-800 text-transparent"
              }`}>
                <Check className="size-2.5 stroke-[3]" />
              </div>
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-450">
                Better Hotels
              </span>
            </div>

            {/* Restaurant Deals checkbox */}
            <div className="flex items-center gap-2">
              <div className={`flex size-4 items-center justify-center rounded border transition-colors ${
                savings.restaurantDeals
                  ? "bg-emerald-50 border-emerald-300 text-emerald-650 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400"
                  : "border-slate-200 dark:border-slate-800 text-transparent"
              }`}>
                <Check className="size-2.5 stroke-[3]" />
              </div>
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-450">
                Restaurant Deals
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Optimization Tips Button */}
      <button
        onClick={handleTipsClick}
        className="w-full text-center py-2.5 rounded-xl border border-blue-500/10 hover:bg-blue-500/5 text-[10px] font-bold text-primary-blue dark:border-blue-500/20 dark:hover:bg-blue-500/10 dark:text-blue-400 transition-all cursor-pointer animate-none"
      >
        View Optimization Tips
      </button>
    </div>
  )
}
