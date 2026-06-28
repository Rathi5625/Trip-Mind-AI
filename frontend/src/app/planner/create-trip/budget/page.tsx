"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, X, Wallet, DollarSign, Euro, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export default function BudgetPage() {
  const router = useRouter()
  const [budgetType, setBudgetType] = React.useState("medium") // economy, medium, luxury

  const handleBack = () => {
    router.push("/planner/create-trip/dates")
  }

  const handleNext = () => {
    // Redirect to final planner itinerary
    router.push("/planner/itinerary")
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full border border-black/5 bg-white/40 backdrop-blur-xl shadow-sm dark:border-white/5 dark:bg-slate-900/40">
          
          <Link href="/" className="flex items-center gap-2 select-none">
            <span className="text-xl">✈️</span>
            <span className="text-sm font-black text-slate-805 dark:text-slate-100 tracking-tight">
              Trip Mind AI
            </span>
          </Link>

          {/* Stepper progress */}
          <div className="flex items-center gap-4 select-none">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <div
                  key={s}
                  className={`h-1 w-8 rounded-full transition-all duration-300 ${
                    s <= 3
                      ? "bg-blue-600 dark:bg-blue-450"
                      : "bg-slate-200 dark:bg-slate-800"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Step 3 of 6
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/planner/create-trip/dates"
              className="p-1.5 rounded-full border border-black/5 bg-white/40 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-500 dark:text-slate-400"
            >
              <X className="size-4" />
            </Link>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-xl w-full mx-auto px-6 py-10 flex flex-col justify-center gap-6">
        
        <div className="text-center space-y-2 select-none">
          <h1 className="text-2xl md:text-3xl font-black text-slate-850 dark:text-slate-100 tracking-tight leading-none">
            Set Your Target Budget
          </h1>
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
            AI custom-tunes hotel suggestions and activity tiers based on your preference.
          </p>
        </div>

        {/* Budget options */}
        <div className="grid grid-cols-1 gap-4">
          {[
            { id: "low", label: "Economy Range", icon: DollarSign, desc: "Chic hostels & local hidden gems", price: "₹65,000 - ₹95,000" },
            { id: "medium", label: "Mid-Range Budget", icon: Wallet, desc: "Boutique stays & curated restaurants", price: "₹1,10,000 - ₹1,85,000" },
            { id: "luxury", label: "Elite Luxury", icon: Sparkles, desc: "Five-star retreats & private drivers", price: "₹2,50,000+" }
          ].map((opt) => {
            const Icon = opt.icon
            const isActive = budgetType === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => setBudgetType(opt.id)}
                className={`flex items-center justify-between p-5 rounded-3xl border transition-all cursor-pointer text-left ${
                  isActive
                    ? "border-blue-500 bg-blue-500/5 ring-1 ring-blue-500/10"
                    : "border-black/5 bg-white hover:bg-slate-50 dark:border-white/5 dark:bg-slate-900/60 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex size-10 items-center justify-center rounded-2xl border ${
                    isActive ? "bg-blue-500/10 border-blue-500/20 text-blue-500" : "bg-slate-50 border-black/5 text-slate-400 dark:bg-slate-850 dark:border-white/5"
                  }`}>
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-850 dark:text-slate-150">{opt.label}</h4>
                    <p className="text-[9px] font-bold text-slate-500 mt-0.5">{opt.desc}</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-blue-600 dark:text-blue-400">{opt.price}</span>
              </button>
            )
          })}
        </div>

      </main>

      {/* Navigation Footer */}
      <footer className="max-w-xl w-full mx-auto px-6 pb-8">
        <div className="flex items-center justify-between w-full p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl select-none">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10.5px] font-black uppercase tracking-widest text-slate-655 bg-white hover:bg-slate-50 border border-black/5 dark:bg-slate-950 dark:hover:bg-slate-900 dark:border-white/5 dark:text-slate-350 transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[10.5px] font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors cursor-pointer"
          >
            <span>Finish and Generate</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </footer>

    </div>
  )
}
