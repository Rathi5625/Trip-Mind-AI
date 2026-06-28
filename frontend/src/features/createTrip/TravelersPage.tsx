"use client"

import * as React from "react"
import Link from "next/link"
import { X } from "lucide-react"

import { ProgressSidebar } from "./components/ProgressSidebar"
import { GroupCard } from "./components/GroupCard"
import { TravelerCounter } from "./components/TravelerCounter"
import { RequirementChip } from "./components/RequirementChip"
import { AccessibilityAdvisor } from "./components/AccessibilityAdvisor"
import { GroupSummary } from "./components/GroupSummary"
import { NavigationFooter } from "./components/NavigationFooter"
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

function TravelersPageContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-50 w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full border border-black/5 bg-white/40 backdrop-blur-xl shadow-sm dark:border-white/5 dark:bg-slate-900/40">
          
          <Link href="/" className="flex items-center gap-2 select-none">
            <span className="text-xl">✈️</span>
            <span className="text-sm font-black text-slate-805 dark:text-slate-100 tracking-tight">
              Trip Mind AI
            </span>
          </Link>

          {/* Stepper center details */}
          <div className="flex items-center gap-4 select-none">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <div
                  key={s}
                  className={`h-1 w-8 rounded-full transition-all duration-300 ${
                    s <= 4
                      ? "bg-blue-600 dark:bg-blue-450"
                      : "bg-slate-200 dark:bg-slate-800"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Step 4 of 6
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/planner/create-trip/budget"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/5 bg-white/40 hover:bg-slate-50 text-[10px] font-black uppercase text-slate-500 dark:border-white/10 dark:bg-white/5 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors cursor-pointer"
            >
              <X className="size-3.5" />
              <span>Close Wizard</span>
            </Link>
          </div>

        </div>
      </header>

      {/* 2. Main Page Grid */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Sidebar Info Cards Column */}
        <div className="lg:col-span-1">
          <ProgressSidebar />
        </div>

        {/* Center Main travelers workspace */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Header Title Section */}
          <div className="space-y-1.5 select-none">
            <h1 className="text-2xl md:text-3xl font-black text-slate-850 dark:text-slate-100 tracking-tight leading-none">
              Who Are You Traveling With?
            </h1>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
              Select the type of group and specific numbers so we can tailor the perfect pace and venue recommendations.
            </p>
          </div>

          {/* Group Dynamic cards section */}
          <div className="space-y-3">
            <span className="block text-[9.5px] font-black uppercase text-slate-400 dark:text-slate-550 tracking-wider">
              Group Dynamic
            </span>
            <GroupCard />
          </div>

          {/* Headcount section */}
          <div className="space-y-3">
            <span className="block text-[9.5px] font-black uppercase text-slate-400 dark:text-slate-550 tracking-wider">
              Headcount
            </span>
            <TravelerCounter />
          </div>

          {/* Special Requirements section */}
          <div className="space-y-3">
            <span className="block text-[9.5px] font-black uppercase text-slate-400 dark:text-slate-550 tracking-wider">
              Special Requirements
            </span>
            <RequirementChip />
          </div>

          {/* Accessibility Advisor Popover Suggestions */}
          <AccessibilityAdvisor />

          {/* Dynamic summaries split (AI Group profile, Compatibility, Cost Adjuster) */}
          <div className="space-y-3">
            <span className="block text-[9.5px] font-black uppercase text-slate-400 dark:text-slate-550 tracking-wider">
              📊 Dynamic Profiles & Fit Indexes
            </span>
            <GroupSummary />
          </div>

        </div>

      </main>

      {/* 3. Bottom actions footer navigation */}
      <footer className="w-full pb-8">
        <NavigationFooter />
      </footer>

    </div>
  )
}

export function TravelersPage() {
  const [queryClient] = React.useState(makeQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <TravelersPageContent />
    </QueryClientProvider>
  )
}
