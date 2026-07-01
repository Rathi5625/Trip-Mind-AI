"use client"

import * as React from "react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Bell, Settings } from "lucide-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { HeroGallery } from "./components/HeroGallery"
import { DestinationOverview } from "./components/DestinationOverview"
import { QuickInfoCards } from "./components/QuickInfoCards"
import { AITravelScore } from "./components/AITravelScore"
import { BestSeasonCards } from "./components/BestSeasonCards"
import { AttractionsSection } from "./components/AttractionsSection"
import { InteractiveMap } from "./components/InteractiveMap"
import { BudgetProfiles } from "./components/BudgetProfiles"
import { LocalSecrets } from "./components/LocalSecrets"
import { MoneySavingTips } from "./components/MoneySavingTips"
import { SimilarDestinations } from "./components/SimilarDestinations"
import { FloatingAI } from "./components/FloatingAI"
import { Footer } from "./components/Footer"

// Hooks
import { useDestination } from "./hooks/useDestination"
import { useTravelIntelligence } from "./hooks/useTravelIntelligence"
import { useAttractions } from "./hooks/useAttractions"
import { useLocalSecrets } from "./hooks/useLocalSecrets"

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  })

function DestinationPageContent({ destinationId }: { destinationId: string }) {
  const destHook = useDestination(destinationId)
  const intelHook = useTravelIntelligence()
  const attrHook = useAttractions()
  const secretsHook = useLocalSecrets()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const fadeUpItem: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
  }

  if (destHook.isLoading || !destHook.destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] dark:bg-[#0B0F19] text-slate-400">
        <div className="size-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mr-2" />
        <span className="text-xs uppercase tracking-wider font-black">Analyzing destination data...</span>
      </div>
    )
  }

  const { destination } = destHook

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-105 transition-colors duration-305">
      
      {/* 1. Global Navigation Bar */}
      <header className="sticky top-0 z-50 w-full px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-full border border-black/5 bg-white/40 backdrop-blur-xl shadow-sm dark:border-white/5 dark:bg-slate-900/40">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 select-none shrink-0">
            <span className="text-xl">✈️</span>
            <span className="text-sm font-black text-slate-805 dark:text-slate-100 tracking-tight">
              Trip Mind AI
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-[11px] font-black uppercase tracking-wider text-slate-400">
            <Link href="/dashboard" className="hover:text-slate-700 dark:hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/planner/create-trip/dates" className="hover:text-slate-700 dark:hover:text-white transition-colors">
              AI Planner
            </Link>
            <Link href="/discover" className="text-slate-805 dark:text-white border-b-2 border-blue-500 pb-0.5">
              Discover
            </Link>
            <Link href="/planner/itinerary" className="hover:text-slate-700 dark:hover:text-white transition-colors">
              Trips
            </Link>
            <Link href="/planner/itinerary" className="hover:text-slate-700 dark:hover:text-white transition-colors">
              Map Explorer
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <button
              type="button"
              className="p-1.5 rounded-full border border-black/5 bg-white/40 text-slate-400 hover:text-slate-605 dark:border-white/10 dark:bg-white/5 dark:hover:bg-slate-800 transition-all cursor-pointer"
              title="Notifications"
            >
              <Bell className="size-4" />
            </button>

            {/* Profile Avatar */}
            <div className="size-8 rounded-full overflow-hidden border border-black/5 dark:border-white/20 shadow-md cursor-pointer bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Profile Avatar"
                className="size-full object-cover"
              />
            </div>
          </div>

        </div>
      </header>

      {/* 2. Main Page Layout Workspace */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-6 flex flex-col gap-10">
        
        {/* Gallery */}
        <HeroGallery
          name={destination.name}
          country={destination.country}
          rating={destination.rating}
          matchScore={destination.matchScore}
          images={destination.imageUrls}
          isSaved={destHook.isSaved}
          onToggleSaved={destHook.toggleSaved}
        />

        {/* Fact cards grid */}
        <QuickInfoCards
          language={destination.facts.language}
          currency={destination.facts.currency}
          timezone={destination.facts.timezone}
          visaStatus={destination.facts.visaStatus}
        />

        {/* Dynamic page columns animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-12"
        >
          
          {/* Overview text details */}
          <motion.section variants={fadeUpItem}>
            <DestinationOverview name={destination.name} />
          </motion.section>

          {/* AI Intelligence Score */}
          <motion.section variants={fadeUpItem}>
            <AITravelScore
              overallScore={destination.intelligence.overallScore}
              safetyScore={destination.intelligence.safetyScore}
              crowdForecast={destination.intelligence.crowdForecast}
              avgDailyCost={destination.intelligence.avgDailyCost}
              recommendedDuration={destination.intelligence.recommendedDuration}
            />
          </motion.section>

          {/* Best season cards */}
          <motion.section variants={fadeUpItem}>
            <BestSeasonCards
              seasons={intelHook.seasons}
              selectedSeason={intelHook.selectedSeason}
              onSelectSeason={intelHook.setSelectedSeason}
            />
          </motion.section>

          {/* Curated attractions section */}
          <motion.section variants={fadeUpItem}>
            <AttractionsSection attractions={attrHook.attractions} />
          </motion.section>

          {/* Interactive mockup map */}
          <motion.section variants={fadeUpItem}>
            <InteractiveMap />
          </motion.section>

          {/* Budget style profiles */}
          <motion.section variants={fadeUpItem}>
            <BudgetProfiles
              profiles={intelHook.budgets}
              activeProfile={destHook.selectedBudgetStyle}
              onSelectProfile={destHook.setSelectedBudgetStyle}
            />
          </motion.section>

          {/* Side-by-side: Local secrets & saving tips */}
          <motion.section variants={fadeUpItem} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <LocalSecrets secrets={secretsHook.secrets} />
            <MoneySavingTips tips={secretsHook.savings} />
          </motion.section>

          {/* Similar cities list carousel */}
          <motion.section variants={fadeUpItem}>
            <SimilarDestinations similar={secretsHook.similar} />
          </motion.section>

        </motion.div>

      </main>

      {/* Floating chatbot assistant */}
      <FloatingAI />

      {/* Footer */}
      <Footer />

    </div>
  )
}

export function DestinationPage({ destinationId }: { destinationId: string }) {
  const [queryClient] = React.useState(makeQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <DestinationPageContent destinationId={destinationId} />
    </QueryClientProvider>
  )
}
