"use client"

import * as React from "react"
import Link from "next/link"
import { X, Sparkles } from "lucide-react"

import { MarketInsightCard } from "./components/MarketInsightCard"
import { BudgetSlider } from "./components/BudgetSlider"
import { BudgetTierCard } from "./components/BudgetTierCard"
import { ForecastChart } from "./components/ForecastChart"
import { ExpenseBreakdown } from "./components/ExpenseBreakdown"
import { NavigationFooter } from "./components/NavigationFooter"
import { BudgetHealthMeter } from "./components/BudgetHealthMeter"
import { BudgetComparison } from "./components/BudgetComparison"
import { BookingTimeline } from "./components/BookingTimeline"
import { BUDGET_TIPS } from "./constants/budgetPresets"
import { useCurrency } from "./hooks/useCurrency"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { useBudgetStore } from "./store/budgetStore"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  })

function BudgetForecastPageContent() {
  const { destination, selectedTier } = useBudgetStore()
  const { formatValue } = useCurrency()

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-50 w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full border border-black/5 bg-white/40 backdrop-blur-xl shadow-sm dark:border-white/5 dark:bg-slate-900/40">
          
          {/* Logo - Matching VoyageAI mockup logo exactly */}
          <Link href="/" className="flex items-center gap-2 select-none">
            <span className="text-xl">✈️</span>
            <span className="text-sm font-black text-blue-600 dark:text-blue-400 tracking-tight">
              VoyageAI
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/planner/create-trip/dates"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/5 bg-white/40 hover:bg-slate-50 text-[10px] font-black uppercase text-slate-500 dark:border-white/10 dark:bg-white/5 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors cursor-pointer"
            >
              <X className="size-3.5" />
              <span>Exit Wizard</span>
            </Link>
          </div>

        </div>
      </header>
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Sidebar Info Cards Column */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          
          {/* Stepper Card */}
          <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl select-none space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                Step 3 of 6
              </span>
              <span className="text-xs font-black text-blue-600 dark:text-blue-450">
                50%
              </span>
            </div>
            
            {/* Progress bar container */}
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-blue-600 dark:bg-blue-450 rounded-full" />
            </div>
            
            <span className="block text-[9.5px] font-black text-slate-700 dark:text-slate-205">
              Budget Forecasting
            </span>
          </div>

          {/* Travel AI Concierge card */}
          <div className="p-6 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl select-none gap-4 flex flex-col">
            <div className="flex items-center gap-3">
              <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 dark:bg-blue-900/30 border border-blue-500/20">
                <span className="text-lg">🤖</span>
                <span className="absolute bottom-0 right-0 block size-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">Travel AI Concierge</h4>
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500">Active intelligence</span>
              </div>
            </div>

            <div className="relative p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-[10.5px] font-semibold text-slate-700 dark:text-slate-350 leading-relaxed font-sans mt-1">
              <div className="absolute top-4 -left-1.5 size-3 bg-blue-500/5 border-l border-b border-blue-500/10 rotate-45 dark:bg-slate-900/50" />
              Your selected dates for <span className="font-extrabold text-blue-600 dark:text-blue-450">{destination}</span> work well with a <span className="font-extrabold text-blue-600 dark:text-blue-450 capitalize">{selectedTier}</span> budget. I can help you find hidden gems that feel luxury without the price tag.
            </div>
          </div>

          {/* Dynamic Budget Health Meter */}
          <BudgetHealthMeter />

        </div>

        {/* Center Main forecasting workspace */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Header Title Section */}
          <div className="space-y-1.5 select-none">
            <h1 className="text-2xl md:text-3xl font-black text-slate-850 dark:text-slate-100 tracking-tight leading-none">
              Travel Budget Forecasting
            </h1>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
              Model your ideal {destination} experience with real-time market intelligence.
            </p>
          </div>

          {/* Market price warnings banner */}
          <MarketInsightCard />

          {/* Forecasted Spend interactive slider */}
          <BudgetSlider />

          {/* Presets/Tiers grid row */}
          <BudgetTierCard />

          {/* Budget Comparison List with detail popovers */}
          <BudgetComparison />

          {/* Pie allocation chart & expense cards split */}
          <div className="p-6 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl flex flex-col md:flex-row items-center gap-8">
            
            {/* Recharts Pie donut segment */}
            <div className="flex flex-col items-center gap-2 border-b md:border-b-0 md:border-r border-slate-100 dark:border-white/5 pb-6 md:pb-0 md:pr-8">
              <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                Forecasting Split
              </span>
              <ForecastChart />
            </div>

            {/* List details category cards */}
            <div className="flex-1 w-full">
              <ExpenseBreakdown />
            </div>

          </div>

          {/* Booking timeline predictions */}
          <BookingTimeline />

          {/* AI Savings Suggestions tips */}
          <div className="p-6 rounded-3xl border border-amber-500/10 bg-amber-500/5 select-none space-y-3 shadow-sm">
            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-450">
              <span className="text-sm">💡</span>
              <span className="text-[10px] font-black uppercase tracking-wider">AI Budget Tips</span>
            </div>
            <div className="space-y-2 text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
              {BUDGET_TIPS.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-extrabold text-xs">✓</span>
                  <span>{tip.text.replace("$180", formatValue(180)).replace("$240", formatValue(240)).replace("$95", formatValue(95))}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* 3. Bottom actions footer navigation */}
      <footer className="max-w-7xl w-full mx-auto px-6 pb-8">
        <NavigationFooter />
      </footer>

    </div>
  )
}

export function BudgetForecastPage() {
  const [queryClient] = React.useState(makeQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <BudgetForecastPageContent />
    </QueryClientProvider>
  )
}
