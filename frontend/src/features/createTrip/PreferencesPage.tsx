"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { AIConciergePanel } from "./components/AIConciergePanel"
import { InterestCard } from "./components/InterestCard"
import { AccommodationCard } from "./components/AccommodationCard"
import { PaceSelector } from "./components/PaceSelector"
import { NavigationFooter } from "./components/NavigationFooter"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

import { INTEREST_OPTIONS, ACCOMMODATION_OPTIONS, PACE_OPTIONS } from "./constants/preferenceOptions"
import { usePreferences } from "./hooks/usePreferences"
import { useAccommodation } from "./hooks/useAccommodation"
import { useTravelPace } from "./hooks/useTravelPace"

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  })

function PreferencesPageContent() {
  const { selectedInterests, toggleInterest } = usePreferences()
  const { selectedAccommodation, setSelectedAccommodation } = useAccommodation()
  const { travelPace, setTravelPace } = useTravelPace()

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

          {/* Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/planner/create-trip/travelers"
              className="p-1.5 rounded-full border border-black/5 bg-white/40 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-500 dark:text-slate-400"
              aria-label="Back to Travelers"
            >
              <X className="size-4" />
            </Link>
          </div>

        </div>
      </header>

      {/* 2. Main Page Grid */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-6 md:py-8 flex flex-col gap-6">
        
        {/* Progress bar at the top */}
        <div className="w-full max-w-4xl mx-auto space-y-2 select-none">
          <div className="flex justify-between text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
            <span>Step 5 of 6</span>
            <span>83%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-850 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "83%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Stepper Header */}
        <div className="max-w-4xl w-full mx-auto space-y-1.5 mt-4 select-none">
          <h1 className="text-3xl md:text-4xl font-black text-slate-850 dark:text-slate-100 tracking-tight leading-tight">
            Crafting your experience.
          </h1>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-450 leading-relaxed max-w-xl">
            Tell us what kind of vibe you're looking for, and our AI will curate the perfect itinerary components.
          </p>
        </div>

        {/* Workspace Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start max-w-4xl w-full mx-auto mt-4">
          
          {/* Center Main preferences workspace */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            
            {/* Interests Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 tracking-wide uppercase">
                What are your primary interests?
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {INTEREST_OPTIONS.map((interest) => (
                  <InterestCard
                    key={interest.id}
                    interest={interest}
                    isSelected={selectedInterests.includes(interest.id)}
                    onClick={() => toggleInterest(interest.id)}
                  />
                ))}
              </div>

              {selectedInterests.length === 0 && (
                <p className="text-[10px] text-amber-500 font-semibold pl-1">
                  ⚠️ Select at least one interest to customize your recommendations.
                </p>
              )}
            </div>

            {/* Accommodation section */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 tracking-wide uppercase">
                Accommodation Preference
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {ACCOMMODATION_OPTIONS.map((accommodation) => (
                  <AccommodationCard
                    key={accommodation.id}
                    accommodation={accommodation}
                    isSelected={selectedAccommodation === accommodation.id}
                    onClick={() => setSelectedAccommodation(accommodation.id)}
                  />
                ))}
              </div>
            </div>

            {/* Travel Pace section */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 tracking-wide uppercase">
                Travel Pace
              </h3>

              <PaceSelector
                options={PACE_OPTIONS}
                selectedId={travelPace}
                onChange={setTravelPace}
              />
            </div>

          </div>

          {/* Right AI Concierge sidebar */}
          <div className="lg:col-span-1 h-full min-h-[500px]">
            <AIConciergePanel />
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

export function PreferencesPage() {
  const [queryClient] = React.useState(makeQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <PreferencesPageContent />
    </QueryClientProvider>
  )
}
