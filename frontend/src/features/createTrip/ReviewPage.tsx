"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles } from "lucide-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { DestinationHero } from "./components/DestinationHero"
import { AIOutlookCard } from "./components/AIOutlookCard"
import { SummaryCard } from "./components/SummaryCard"
import { BudgetBreakdown } from "./components/BudgetBreakdown"
import { InterestTags } from "./components/InterestTags"
import { GenerateButton } from "./components/GenerateButton"
import { ProgressBar } from "./components/ProgressBar"
import { ReviewFooter } from "./components/ReviewFooter"
import { AIGenerationOverlay } from "./components/AIGenerationOverlay"

import { useTripReview } from "./hooks/useTripReview"

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  })

function ReviewPageContent() {
  const {
    reviewData,
    aiOutlook,
    isInsightsLoading,
    isGenerating,
    progress,
    handleGeneratePlan
  } = useTripReview()

  // Calculate dynamic trip summary text
  const tripSummary = React.useMemo(() => {
    const accTier = reviewData.accommodation.split(" ")[0] // e.g. "Boutique"
    const typeLabel = reviewData.travelersType // e.g. "Couple Trip"
    const combinedType = `${accTier} ${typeLabel}` // e.g. "Boutique Couple Trip"

    const formattedVibes = reviewData.interests
      .slice(0, 2)
      .map((i) => {
        if (i === "culinary") return "Food"
        return i.charAt(0).toUpperCase() + i.slice(1)
      })
      .join(" + ") || "Food + Culture"

    const formattedCost = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(reviewData.budgetTotal)

    return {
      type: combinedType,
      duration: reviewData.duration,
      accommodation: reviewData.accommodation,
      vibes: formattedVibes,
      pace: `${reviewData.pace} Pace`,
      cost: formattedCost
    }
  }, [reviewData])

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-105 transition-colors duration-305">
      
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
              href="/planner/create-trip/preferences"
              className="p-1.5 rounded-full border border-black/5 bg-white/40 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-500 dark:text-slate-400"
              aria-label="Back to Preferences"
            >
              <X className="size-4" />
            </Link>
          </div>

        </div>
      </header>

      {/* 2. Main Page Grid */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-6 md:py-8 flex flex-col gap-6">
        
        {/* Progress bar at the top */}
        <div className="w-full max-w-7xl mx-auto space-y-2 select-none">
          <div className="flex justify-between text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
            <span>Step 6 of 6</span>
            <span>100%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-850 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
              initial={{ width: "83%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Stepper Header */}
        <div className="max-w-7xl w-full mx-auto space-y-1.5 mt-4 select-none">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
            <Sparkles className="size-3 text-blue-500 fill-blue-500/10" />
            <span>Step 6 of 6</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-850 dark:text-slate-100 tracking-tight leading-tight">
            Review Your Trip
          </h1>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-450 leading-relaxed max-w-xl">
            Confirm your details before our AI concierge crafts your personalized itinerary. Everything is looking perfectly aligned.
          </p>
        </div>

        {/* Workspace Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl w-full mx-auto mt-4">
          
          {/* Left Column (Takes 7 columns on desktop) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Destination Hero Image Card */}
            <DestinationHero
              destination={reviewData.destination}
              imageUrl={reviewData.imageUrl}
              region={reviewData.region}
              country={reviewData.country}
            />

            {/* Quick Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SummaryCard
                iconName="Calendar"
                title="Travel Dates"
                value={reviewData.dates}
                description={reviewData.duration}
                editUrl="/planner/create-trip/dates"
              />
              <SummaryCard
                iconName="Users"
                title="Travelers"
                value={reviewData.travelersCount}
                description={reviewData.travelersType}
                editUrl="/planner/create-trip/travelers"
              />
              <SummaryCard
                iconName="Bed"
                title="Stay Style"
                value={reviewData.accommodation}
                description="4-Star Preferred"
                editUrl="/planner/create-trip/preferences"
              />
              <SummaryCard
                iconName="Compass"
                title="Pace"
                value={reviewData.pace}
                description="Mix of tours & free time"
                editUrl="/planner/create-trip/preferences"
              />
            </div>

            {/* Budget Breakdown */}
            <BudgetBreakdown
              total={reviewData.budgetTotal}
              slices={reviewData.budgetBreakdown}
            />

            {/* Interest Tags */}
            <InterestTags interests={reviewData.interests} />
          </div>

          {/* Right Column (Takes 5 columns on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-[90px]">
            {/* AI Outlook insights */}
            <AIOutlookCard
              outlook={aiOutlook}
              isLoading={isInsightsLoading}
              tripSummary={tripSummary}
            />

            {/* Action buttons */}
            <div className="p-5 rounded-3xl border border-black/5 bg-white/40 shadow-sm dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl space-y-4">
              {isGenerating && <ProgressBar progress={progress} />}
              <GenerateButton
                onClick={handleGeneratePlan}
                isLoading={isGenerating}
                progress={progress}
              />
              <p className="text-[10px] text-center font-semibold text-slate-455 dark:text-slate-500 leading-snug px-2">
                ⚡ Plan generation takes about 5-10 seconds. We'll build a detailed, personalized day-by-day itinerary tailored to your selections.
              </p>
            </div>
          </div>

        </div>

      </main>

      {/* 3. Bottom actions footer navigation */}
      <footer className="w-full pb-8">
        <ReviewFooter onGenerate={handleGeneratePlan} isGenerating={isGenerating} />
      </footer>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="lg:hidden sticky bottom-0 z-40 w-full p-4 bg-white/80 border-t border-black/5 dark:bg-slate-950/80 dark:border-white/5 backdrop-blur-md flex items-center justify-between gap-4">
        <div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Est. Cost</span>
          <span className="block text-xs font-black text-slate-805 dark:text-slate-100">${reviewData.budgetTotal}</span>
        </div>
        <div className="w-[200px]">
          <GenerateButton
            onClick={handleGeneratePlan}
            isLoading={isGenerating}
            progress={progress}
          />
        </div>
      </div>

      {/* Premium Full-screen AI Generation Overlay */}
      <AIGenerationOverlay isVisible={isGenerating} progress={progress} />

    </div>
  )
}

export function ReviewPage() {
  const [queryClient] = React.useState(makeQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <ReviewPageContent />
    </QueryClientProvider>
  )
}
