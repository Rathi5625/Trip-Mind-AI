"use client"

import * as React from "react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { X } from "lucide-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { SuccessHero } from "./components/SuccessHero"
import { TripOverviewCard } from "./components/TripOverviewCard"
import { BudgetSummaryCard } from "./components/BudgetSummaryCard"
import { AIInsightsCard } from "./components/AIInsightsCard"
import { CTAButtons } from "./components/CTAButtons"

// Upgraded component imports
import { GenerationTimeline } from "./components/GenerationTimeline"
import { PersonalizedMessage } from "./components/PersonalizedMessage"
import { TripStatsGrid } from "./components/TripStatsGrid"
import { PreviewCarousel } from "./components/PreviewCarousel"
import { SmartActionCards } from "./components/SmartActionCards"

import { useGeneratedTrip } from "./hooks/useGeneratedTrip"

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  })

function GeneratedTripPageContent() {
  const {
    tripInfo,
    isLoading,
    handleViewPlan,
    handleReturnDashboard
  } = useGeneratedTrip()

  // Stagger wrapper for list fade-in
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
  }

  if (isLoading || !tripInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-400">Loading plan details...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-105 transition-colors duration-305">
      
      {/* 1. Top Bar Header */}
      <header className="sticky top-0 z-50 w-full px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-full border border-black/5 bg-white/40 backdrop-blur-xl shadow-sm dark:border-white/5 dark:bg-slate-900/40">
          
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
              href="/dashboard"
              className="p-1.5 rounded-full border border-black/5 bg-white/40 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-500 dark:text-slate-400"
              aria-label="Close success screen"
            >
              <X className="size-4" />
            </Link>
          </div>

        </div>
      </header>

      {/* 2. Main Page Grid */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-8 flex flex-col gap-10">
        
        {/* Success Hero */}
        <SuccessHero />

        {/* 2-Column Content Layout (wraps to 1 column on mobile/tablet) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full mx-auto"
        >
          {/* Left Column (takes 6 cols on large screens) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <motion.div variants={itemVariants}>
              <TripOverviewCard
                destinationName={tripInfo.destinationName}
                duration={tripInfo.duration}
                description={tripInfo.description}
                imageUrl={tripInfo.imageUrl}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <PreviewCarousel />
            </motion.div>

            <motion.div variants={itemVariants}>
              <PersonalizedMessage message={tripInfo.personalizedMessage} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <SmartActionCards />
            </motion.div>
          </div>

          {/* Right Column (takes 6 cols on large screens) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <motion.div variants={itemVariants}>
              <GenerationTimeline />
            </motion.div>

            <motion.div variants={itemVariants}>
              <TripStatsGrid
                placesCount={tripInfo.placesCount}
                restaurantsCount={tripInfo.restaurantsCount}
                hotelsCompared={tripInfo.hotelsComparedCount}
                transportRoutes={tripInfo.transportRoutesCount}
                savedAmount={tripInfo.savedAmount}
                matchScore={tripInfo.matchScore}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <BudgetSummaryCard
                totalBudget={tripInfo.totalBudget}
                flightsPercentage={tripInfo.flightsPercentage}
                staysPercentage={tripInfo.staysPercentage}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <AIInsightsCard
                weatherAlert={tripInfo.weatherAlert}
                diningSuggestion={tripInfo.diningSuggestion}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Primary Action buttons at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="w-full pb-8 pt-4"
        >
          <CTAButtons
            onViewPlan={handleViewPlan}
            onReturnDashboard={handleReturnDashboard}
          />
        </motion.div>

      </main>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="md:hidden sticky bottom-0 z-40 w-full p-4 bg-white/80 border-t border-black/5 dark:bg-slate-950/80 dark:border-white/5 backdrop-blur-md">
        <CTAButtons
          onViewPlan={handleViewPlan}
          onReturnDashboard={handleReturnDashboard}
        />
      </div>

    </div>
  )
}

export function GeneratedTripPage() {
  const [queryClient] = React.useState(makeQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <GeneratedTripPageContent />
    </QueryClientProvider>
  )
}
