"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Calendar, Users, Sliders, MapPin, Compass, ArrowRight } from "lucide-react"

import { useTripWizard } from "./hooks/useTripWizard"
import { useDestinationSearch } from "./hooks/useDestinationSearch"
import { WizardProgress } from "./components/WizardProgress"
import { AtlasAssistant } from "./components/AtlasAssistant"
import { DestinationSearch } from "./components/DestinationSearch"
import { TrendingTags } from "./components/TrendingTags"
import { RecommendationGrid } from "./components/RecommendationGrid"
import { RecommendationSidebar } from "./components/RecommendationSidebar"
import { NavigationActions } from "./components/NavigationActions"
import { Footer } from "./components/Footer"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Destination } from "./types/createTrip"

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  })

export function CreateTripPageContent() {
  const {
    step,
    setStep,
    searchQuery,
    selectedDestination,
    setSelectedDestination,
    dates,
    setDates,
    travelers,
    setTravelers,
    preferences,
    togglePreference
  } = useTripWizard()

  // React Query for destination list filtering
  const { data: destinations = [], isLoading } = useDestinationSearch(searchQuery)

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest)
    setStep(2) // Automatically transition to Dates Step
  }

  // Pre-fill dates helper
  const handleSetQuickDates = (days: number) => {
    const today = new Date()
    const future = new Date()
    future.setDate(today.getDate() + days)
    
    setDates({
      start: today.toISOString().split("T")[0],
      end: future.toISOString().split("T")[0],
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-50 w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full border border-black/5 bg-white/40 backdrop-blur-xl shadow-sm dark:border-white/5 dark:bg-slate-900/40">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 select-none">
            <span className="text-xl">✈️</span>
            <span className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight">
              Trip Mind AI
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-wider">
            <Link href="/" className="text-slate-500 hover:text-slate-850 dark:hover:text-slate-200">
              Home
            </Link>
            <Link href="/discover" className="text-slate-500 hover:text-slate-850 dark:hover:text-slate-200">
              Discover
            </Link>
            <Link href="/planner" className="text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-450 pb-0.5">
              AI Planner
            </Link>
            <Link href="#features" className="text-slate-500 hover:text-slate-850 dark:hover:text-slate-200">
              Features
            </Link>
            <Link href="#pricing" className="text-slate-500 hover:text-slate-850 dark:hover:text-slate-200">
              Pricing
            </Link>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login" className="hidden sm:inline-block text-[11.5px] font-black text-slate-650 hover:text-slate-850 dark:text-slate-350 dark:hover:text-slate-205 cursor-pointer uppercase tracking-wider">
              Sign In
            </Link>
            <Link href="/signup" className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main content container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 md:py-10 flex flex-col gap-6">
        
        {/* Wizard progress step list */}
        <WizardProgress />

        {/* Dynamic Wizard Steps Switcher */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: DESTINATION DISCOVERY */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start"
              >
                {/* Left Sidebar: Atlas Assistant */}
                <div className="lg:col-span-1 flex flex-col gap-5">
                  <AtlasAssistant />
                </div>

                {/* Center Content: Search & Grid */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  {/* Title Headers */}
                  <div className="space-y-2 select-none">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-850 dark:text-slate-100 tracking-tight leading-none">
                      Where would you like to escape to?
                    </h1>
                    <p className="text-[11.5px] font-semibold text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                      Describe your dream destination in natural language, or pick from our curated collection below.
                    </p>
                  </div>

                  {/* AI Search input */}
                  <DestinationSearch />

                  {/* Trending tags chips */}
                  <TrendingTags />

                  {/* Recommended destinations header */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2 select-none">
                    <h3 className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">
                      Recommended For You
                    </h3>
                    <button
                      onClick={() => setSelectedDestination(destinations[0] || null)}
                      className="text-[9.5px] font-black text-blue-600 hover:text-blue-750 dark:text-blue-450 dark:hover:text-blue-400 uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                    >
                      <span>View all</span>
                      <ArrowRight className="size-3" />
                    </button>
                  </div>

                  {/* Destinations list grid */}
                  <RecommendationGrid destinations={destinations} onSelect={handleSelectDestination} />

                  {/* Footer Actions */}
                  <NavigationActions />
                </div>

                {/* Right Sidebar: AI Analytics Insights */}
                <div className="lg:col-span-1 flex flex-col gap-5">
                  <RecommendationSidebar />
                </div>
              </motion.div>
            )}

            {/* STEP 2: TRAVEL DATES */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl mx-auto w-full p-8 rounded-3xl border border-black/5 bg-white dark:border-white/5 dark:bg-slate-900/60 shadow-sm space-y-6 select-none"
              >
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-blue-600 dark:text-blue-450 tracking-widest">
                    Step 2
                  </span>
                  <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                    When are you planning to travel?
                  </h2>
                  <p className="text-[10px] font-semibold text-slate-500 leading-relaxed">
                    Select your departure and return dates for {selectedDestination?.name || "your trip"}.
                  </p>
                </div>

                {/* Date Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-550 tracking-wider">
                      Departure Date
                    </label>
                    <input
                      type="date"
                      value={dates.start}
                      onChange={(e) => setDates({ ...dates, start: e.target.value })}
                      className="w-full p-3.5 rounded-2xl border border-black/5 bg-slate-50 dark:border-white/5 dark:bg-slate-800/30 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-550 tracking-wider">
                      Return Date
                    </label>
                    <input
                      type="date"
                      value={dates.end}
                      onChange={(e) => setDates({ ...dates, end: e.target.value })}
                      className="w-full p-3.5 rounded-2xl border border-black/5 bg-slate-50 dark:border-white/5 dark:bg-slate-800/30 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Quick select buttons */}
                <div className="space-y-2">
                  <span className="block text-[8px] font-black uppercase text-slate-400 dark:text-slate-550 tracking-wider">
                    Quick Selection Guides
                  </span>
                  <div className="flex gap-2">
                    {[
                      { label: "5 Days Escape", days: 5 },
                      { label: "10 Days Journey", days: 10 },
                      { label: "2 Weeks Voyage", days: 14 }
                    ].map((btn) => (
                      <button
                        key={btn.label}
                        onClick={() => handleSetQuickDates(btn.days)}
                        className="px-3.5 py-2 rounded-xl border border-black/5 bg-slate-50 hover:bg-slate-100 dark:border-white/5 dark:bg-slate-800/30 dark:hover:bg-slate-800 text-[10px] font-bold text-slate-650 dark:text-slate-350 cursor-pointer"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                <NavigationActions />
              </motion.div>
            )}

            {/* STEP 3: TRAVELERS */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl mx-auto w-full p-8 rounded-3xl border border-black/5 bg-white dark:border-white/5 dark:bg-slate-900/60 shadow-sm space-y-6 select-none"
              >
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-blue-600 dark:text-blue-450 tracking-widest">
                    Step 3
                  </span>
                  <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                    Who is traveling with you?
                  </h2>
                  <p className="text-[10px] font-semibold text-slate-500 leading-relaxed">
                    AI adjusts pacing, activities, and hotel sizing based on your group dynamic.
                  </p>
                </div>

                {/* Profiles selection grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Solo", icon: "🧍", desc: "Mindful individual exploration" },
                    { label: "Couple", icon: "👫", desc: "Romance and shared discoveries" },
                    { label: "Family", icon: "👨‍👩‍👧", desc: "Kids-friendly events & options" },
                    { label: "Friends", icon: "👥", desc: "Active nightlife & group adventures" }
                  ].map((p) => {
                    const isActive = travelers === p.label
                    return (
                      <button
                        key={p.label}
                        onClick={() => setTravelers(p.label)}
                        className={`flex flex-col items-center text-center p-5 rounded-2xl border transition-all cursor-pointer ${
                          isActive
                            ? "border-blue-500 bg-blue-500/5 ring-1 ring-blue-500/10"
                            : "border-black/5 bg-slate-50 hover:bg-slate-100 dark:border-white/5 dark:bg-slate-800/30 dark:hover:bg-slate-800"
                        }`}
                      >
                        <span className="text-2xl mb-1.5">{p.icon}</span>
                        <span className="text-xs font-black text-slate-850 dark:text-slate-150">{p.label}</span>
                        <span className="text-[8.5px] font-bold text-slate-450 dark:text-slate-500 mt-1">{p.desc}</span>
                      </button>
                    )
                  })}
                </div>

                <NavigationActions />
              </motion.div>
            )}

            {/* STEP 4: PREFERENCES */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl mx-auto w-full p-8 rounded-3xl border border-black/5 bg-white dark:border-white/5 dark:bg-slate-900/60 shadow-sm space-y-6 select-none"
              >
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-blue-600 dark:text-blue-450 tracking-widest">
                    Step 4
                  </span>
                  <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                    What is your travel style?
                  </h2>
                  <p className="text-[10px] font-semibold text-slate-500 leading-relaxed">
                    Select interests below to tailor activities and custom destination highlights.
                  </p>
                </div>

                {/* Preference tags list */}
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { label: "Luxury Luxury", icon: "💎", tag: "Luxury" },
                    { label: "Culinary Highlights", icon: "🍜", tag: "Food" },
                    { label: "Heritage & History", icon: "🏛️", tag: "Culture" },
                    { label: "Glaciers & Nature", icon: "🏔️", tag: "Nature" },
                    { label: "Active Exploration", icon: "🧗", tag: "Adventure" },
                    { label: "Resorts & Beaches", icon: "🏝️", tag: "Beaches" },
                    { label: "Spa & Wellness", icon: "🌿", tag: "Wellness" }
                  ].map((p) => {
                    const isActive = preferences.includes(p.tag)
                    return (
                      <button
                        key={p.tag}
                        onClick={() => togglePreference(p.tag)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-[10.5px] font-bold transition-all cursor-pointer ${
                          isActive
                            ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                            : "border-black/5 bg-slate-50 hover:bg-slate-100 dark:border-white/5 dark:bg-slate-800/30 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        <span>{p.icon}</span>
                        <span>{p.label}</span>
                      </button>
                    )
                  })}
                </div>

                <NavigationActions />
              </motion.div>
            )}

            {/* STEP 5: REVIEW & SUMMARY */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl mx-auto w-full p-8 rounded-3xl border border-black/5 bg-white dark:border-white/5 dark:bg-slate-900/60 shadow-sm space-y-6 select-none"
              >
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-blue-600 dark:text-blue-450 tracking-widest font-sans">
                    Step 5
                  </span>
                  <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight font-sans">
                    Confirm your luxury itinerary blueprint
                  </h2>
                  <p className="text-[10px] font-semibold text-slate-500 leading-relaxed font-sans">
                    Your AI Travel DNA profile is prepared. Click Generate to build your interactive timeline workspace.
                  </p>
                </div>

                {/* Summary Box */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 dark:bg-slate-950/20 dark:border-white/5 space-y-4">
                  {/* Destination */}
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-450 dark:text-slate-500 font-bold flex items-center gap-1.5">
                      <MapPin className="size-3.5" /> Destination
                    </span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">
                      {selectedDestination?.name || "Not selected"} ({selectedDestination?.country})
                    </span>
                  </div>

                  {/* Dates */}
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-450 dark:text-slate-500 font-bold flex items-center gap-1.5">
                      <Calendar className="size-3.5" /> Dates
                    </span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">
                      {dates.start} to {dates.end}
                    </span>
                  </div>

                  {/* Travelers */}
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-450 dark:text-slate-500 font-bold flex items-center gap-1.5">
                      <Users className="size-3.5" /> Travelers
                    </span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">
                      {travelers}
                    </span>
                  </div>

                  {/* Style Preferences */}
                  <div className="flex justify-between items-start text-xs font-semibold">
                    <span className="text-slate-450 dark:text-slate-500 font-bold flex items-center gap-1.5 mt-0.5">
                      <Sliders className="size-3.5" /> Preferred Styles
                    </span>
                    <div className="flex flex-wrap justify-end gap-1.5 max-w-xs">
                      {preferences.length > 0 ? (
                        preferences.map((p) => (
                          <span
                            key={p}
                            className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          >
                            {p}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 font-bold">Standard Mix</span>
                      )}
                    </div>
                  </div>
                </div>

                <NavigationActions />
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </main>

      {/* 3. Footer Section */}
      <Footer />

    </div>
  )
}

export function CreateTripPage() {
  const [queryClient] = React.useState(makeQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <CreateTripPageContent />
    </QueryClientProvider>
  )
}
