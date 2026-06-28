"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { X } from "lucide-react"

import { AIConciergePanel } from "./components/AIConciergePanel"
import { Calendar } from "./components/Calendar"
import { CalendarLegend } from "./components/CalendarLegend"
import { ContinueFooter } from "./components/ContinueFooter"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
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

function TravelDatesPageContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* 1. Top Bar Header */}
      <header className="sticky top-0 z-50 w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full border border-black/5 bg-white/40 backdrop-blur-xl shadow-sm dark:border-white/5 dark:bg-slate-900/40">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 select-none">
            <span className="text-xl">✈️</span>
            <span className="text-sm font-black text-slate-805 dark:text-slate-100 tracking-tight">
              Trip Mind AI
            </span>
          </Link>

          {/* Stepper Center Indicator */}
          <div className="flex items-center gap-4 select-none">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <div
                  key={s}
                  className={`h-1 w-8 rounded-full transition-all duration-300 ${
                    s <= 2
                      ? "bg-blue-600 dark:bg-blue-450"
                      : "bg-slate-200 dark:bg-slate-800"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Step 2 of 6
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/planner/create-trip"
              className="p-1.5 rounded-full border border-black/5 bg-white/40 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-500 dark:text-slate-400"
              aria-label="Close Wizard"
            >
              <X className="size-4" />
            </Link>
          </div>

        </div>
      </header>

      {/* 2. Main Page Grid */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-6 md:py-10 flex flex-col gap-6">
        
        {/* Stepper Header */}
        <div className="text-center space-y-2 select-none">
          <h1 className="text-2xl md:text-3xl font-black text-slate-850 dark:text-slate-100 tracking-tight leading-none">
            When Are You Planning To Travel?
          </h1>
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 max-w-md leading-relaxed mx-auto">
            Select your dates to find the best conditions and pricing for Tokyo.
          </p>
        </div>

        {/* Workspace Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Left AI Concierge sidebar */}
          <div className="lg:col-span-1">
            <AIConciergePanel />
          </div>

          {/* Center Calendar layout */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <Calendar />
            <CalendarLegend />
          </div>

        </div>

      </main>

      {/* 3. Navigation Footer */}
      <footer className="max-w-7xl w-full mx-auto px-6 pb-8">
        <ContinueFooter />
      </footer>

    </div>
  )
}

export function TravelDatesPage() {
  const [queryClient] = React.useState(makeQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <TravelDatesPageContent />
    </QueryClientProvider>
  )
}
