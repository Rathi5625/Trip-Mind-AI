"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Bell, Settings, Diamond, HelpCircle } from "lucide-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { SearchHero } from "./components/SearchHero"
import { ActiveFilters } from "./components/ActiveFilters"
import { FilterSidebar } from "./components/FilterSidebar"
import { AIInsightCard } from "./components/AIInsightCard"
import { DestinationCard } from "./components/DestinationCard"
import { ResultsGrid } from "./components/ResultsGrid"
import { AIComparisonTable } from "./components/AIComparisonTable"
import { HiddenGemCard } from "./components/HiddenGemCard"
import { SortDropdown } from "./components/SortDropdown"
import { Pagination } from "./components/Pagination"
import { FloatingAIAssistant } from "./components/FloatingAIAssistant"
import { DiscoverFooter } from "../discover/components/DiscoverFooter"

// New Upgraded AI widgets
import { AIFilterChips } from "./components/AIFilterChips"
import { AISearchExplanation } from "./components/AISearchExplanation"
import { PriceForecastCard } from "./components/PriceForecastCard"
import { SimilarDestinations } from "./components/SimilarDestinations"

// Hooks
import { useSearchResults } from "./hooks/useSearchResults"
import { useFilters } from "./hooks/useFilters"
import { useComparison } from "./hooks/useComparison"
import { useHiddenGems } from "./hooks/useHiddenGems"
import { SORT_OPTIONS } from "./constants/searchFilters"

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  })

function SearchResultsPageContent() {
  const resultsHook = useSearchResults()
  const filterHook = useFilters()
  const compareHook = useComparison()
  const gemsHook = useHiddenGems()

  // Staggers
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

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-105 transition-colors duration-305">
      
      {/* 1. Global Glassmorphism Top Navigation */}
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
              className="p-1.5 rounded-full border border-black/5 bg-white/40 text-slate-400 hover:text-slate-600 dark:border-white/10 dark:bg-white/5 dark:hover:bg-slate-800 transition-all cursor-pointer"
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

      {/* 2. Hero Search Section */}
      <SearchHero
        value={resultsHook.activeSearchQuery}
        onChange={resultsHook.setSortBy} // dummy action or search action
        onSubmit={(e) => {
          e?.preventDefault()
          alert(`Searching: ${resultsHook.activeSearchQuery}`)
        }}
      />

      {/* 3. Page workspace content */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-6 md:py-8 flex flex-col gap-6">
        
        {/* Active Filters Row */}
        <ActiveFilters
          query={resultsHook.activeSearchQuery}
          chips={resultsHook.activeChips}
          onRemoveChip={resultsHook.removeChip}
        />

        {/* Sidebar + Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full mx-auto mt-2">
          
          {/* Left Column: Filter Sidebar */}
          <FilterSidebar
            budgetRange={filterHook.budgetRange}
            setBudgetRange={filterHook.setBudgetRange}
            duration={filterHook.duration}
            setDuration={filterHook.setDuration}
            travelStyles={filterHook.travelStyles}
            toggleTravelStyle={filterHook.toggleTravelStyle}
            minMatchScore={filterHook.minMatchScore}
            setMinMatchScore={filterHook.setMinMatchScore}
            resetFilters={filterHook.resetFilters}
            durationOptions={filterHook.durationOptions}
            travelStyleOptions={filterHook.travelStyleOptions}
          />

          {/* Right Column: Search Results Feed */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex-grow w-full space-y-8"
          >
            
            {/* AI Filter Chips */}
            <motion.div variants={fadeUpItem}>
              <AIFilterChips />
            </motion.div>

            {/* AI Insight Card */}
            <motion.div variants={fadeUpItem}>
              <AIInsightCard />
            </motion.div>

            {/* AI Intelligence Multi-column stack */}
            <motion.div variants={fadeUpItem} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AISearchExplanation />
              <PriceForecastCard />
              <SimilarDestinations />
            </motion.div>

            {/* Sort options bar */}
            <div className="flex justify-end select-none">
              <SortDropdown
                value={resultsHook.sortBy}
                onChange={resultsHook.setSortBy}
                options={SORT_OPTIONS}
              />
            </div>

            {/* Search results grid list */}
            {resultsHook.isLoading ? (
              <div className="py-12 flex justify-center items-center text-slate-400">
                <div className="size-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mr-2" />
                <span className="text-xs uppercase tracking-wider font-black">Ranking destinations...</span>
              </div>
            ) : (
              <motion.div variants={fadeUpItem}>
                <ResultsGrid>
                  {resultsHook.destinations.map((dest) => (
                    <DestinationCard
                      key={dest.id}
                      id={dest.id}
                      name={dest.name}
                      country={dest.country}
                      imageUrl={dest.imageUrl}
                      matchScore={dest.matchScore}
                      description={dest.description}
                      budgetPerPerson={dest.budgetPerPerson}
                      duration={dest.duration}
                      weatherText={dest.weatherText}
                      weatherTemp={dest.weatherTemp}
                      weatherIcon={dest.weatherIcon}
                      isFavorite={resultsHook.favorites.includes(dest.id)}
                      onToggleFavorite={resultsHook.toggleFavorite}
                    />
                  ))}
                </ResultsGrid>
              </motion.div>
            )}

            {/* AI Comparison table */}
            <motion.div variants={fadeUpItem}>
              <AIComparisonTable cities={compareHook.comparisonCities} />
            </motion.div>

            {/* Hidden Gems Section */}
            <motion.div variants={fadeUpItem} className="space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase text-orange-500 tracking-wider text-left">
                <Diamond className="size-4 text-orange-500 fill-orange-500/10" />
                <span>Hidden Gems</span>
              </div>

              {gemsHook.isLoading ? (
                <div className="py-8 flex justify-center text-slate-400">
                  <span className="text-[10px] font-black uppercase tracking-wider">Uncovering secrets...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {gemsHook.hiddenGems.map((gem) => (
                    <HiddenGemCard
                      key={gem.id}
                      id={gem.id}
                      name={gem.name}
                      country={gem.country}
                      imageUrl={gem.imageUrl}
                      description={gem.description}
                      discoveryScore={gem.discoveryScore}
                      cost={gem.cost}
                      duration={gem.duration}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Pagination Controls */}
            <motion.div variants={fadeUpItem}>
              <Pagination />
            </motion.div>

          </motion.div>

        </div>

      </main>

      {/* Floating AI assistant button */}
      <FloatingAIAssistant />

      {/* Bottom Footer */}
      <DiscoverFooter />

    </div>
  )
}

export function SearchResultsPage() {
  const [queryClient] = React.useState(makeQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <SearchResultsPageContent />
    </QueryClientProvider>
  )
}
