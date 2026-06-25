"use client"

import * as React from "react"
import { useDestinationSelection } from "./hooks/useDestinationSelection"
import { ProgressBar } from "./components/ProgressBar"
import { PageHeader } from "./components/PageHeader"
import { SearchDestination } from "./components/SearchDestination"
import { SelectedDestinations } from "./components/SelectedDestinations"
import { DestinationGrid } from "./components/DestinationGrid"
import { AIRecommendationCard } from "./components/AIRecommendationCard"
import { BottomNavigation } from "./components/BottomNavigation"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { CategoryFilters } from "./components/CategoryFilters"
import { RecommendationStrip } from "./components/RecommendationStrip"
import { motion } from "framer-motion"

export default function DestinationSelectionPage() {
  const {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    recommendations,
    filteredDestinations,
    hasExactMatch,
    selectedDestinations,
    selectedDestinationsData,
    toggleDestination,
    handleAddCustomDestination,
    isValid,
    handleNext,
    handleBack,
  } = useDestinationSelection()

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between py-8 px-6 sm:px-12 md:px-16 lg:px-20 bg-[#F8F9FB] dark:bg-[#0B0F19] transition-colors duration-300 font-sans overflow-y-auto pb-28 md:pb-8">
      {/* Ambient gradient blobs */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] dark:bg-blue-500/2" />
        <div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-rose-500/5 rounded-full blur-[120px] dark:bg-rose-500/2" />
      </div>

      {/* Dynamic Dotted Wavy Lines SVG Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-70 dark:opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wavy-pattern-step4" width="200" height="120" patternUnits="userSpaceOnUse">
              <path
                d="M 0 60 Q 50 30, 100 60 T 200 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                className="text-slate-250 dark:text-slate-800"
              />
              <path
                d="M 0 100 Q 50 70, 100 100 T 200 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                className="text-slate-250 dark:text-slate-800"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wavy-pattern-step4)" />
        </svg>
      </div>

      {/* Floating Theme Toggle */}
      <div className="absolute top-6 right-6 z-30">
        <ThemeToggle />
      </div>

      {/* Top Progress Bar (Step 4 of 5, 80% progress) */}
      <ProgressBar currentStep={4} totalSteps={5} progressPercent={80} />

      {/* Main Content Layout Container */}
      <div className="my-auto w-full max-w-5xl mx-auto z-10 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Destinations Search & Selection Grid */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-8 bg-white dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.25)] backdrop-blur-sm"
          >
            {/* Title & Subtitle Page Headers */}
            <PageHeader
              title="Where would you love to travel?"
              subtitle="Select destinations that inspire you. We'll use this to tailor your perfect AI-generated itinerary."
            />

            {/* Destination category filters */}
            <CategoryFilters
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />

            {/* Premium search bar filter */}
            <SearchDestination
              query={query}
              onChangeQuery={setQuery}
              onAddCustomDestination={handleAddCustomDestination}
              hasExactMatch={hasExactMatch}
            />

            {/* Smart AI recommendations strip */}
            <RecommendationStrip
              recommendations={recommendations}
              selectedDestinations={selectedDestinations}
              onToggleDestination={toggleDestination}
            />

            {/* Wishlist selected tags display */}
            <SelectedDestinations
              selectedNames={selectedDestinationsData}
              onRemove={toggleDestination}
            />

            {/* Custom 4-column destinations selection grid */}
            <div className="mt-6">
              <DestinationGrid
                destinations={filteredDestinations}
                selectedDestinations={selectedDestinations}
                onToggleDestination={toggleDestination}
              />
            </div>
          </motion.div>

          {/* Right Column - Real-time AI Destination Insights Card */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-4 lg:sticky lg:top-8"
          >
            <AIRecommendationCard variant="destinations" />
          </motion.div>

        </div>
      </div>

      {/* Sticky Bottom Navigation Actions */}
      <BottomNavigation
        isValid={isValid}
        selectedCount={selectedDestinations.length}
        onNext={handleNext}
        onBack={handleBack}
      />
    </div>
  )
}
