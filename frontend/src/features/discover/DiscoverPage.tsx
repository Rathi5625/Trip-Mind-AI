"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Bell, Settings, ChevronLeft, ChevronRight, Compass } from "lucide-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { HeroSearch } from "./components/HeroSearch"
import { DestinationCard } from "./components/DestinationCard"
import { FeaturedDestination } from "./components/FeaturedDestination"
import { HiddenGemCard } from "./components/HiddenGemCard"
import { CategoryChip } from "./components/CategoryChip"
import { FloatingAIButton } from "./components/FloatingAIButton"
import { DiscoverFooter } from "./components/DiscoverFooter"

// Hooks
import { useSearch } from "./hooks/useSearch"
import { useRecommendations } from "./hooks/useRecommendations"
import { useHiddenGems } from "./hooks/useHiddenGems"
import { useDiscover } from "./hooks/useDiscover"

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  })

function DiscoverPageContent() {
  const searchHook = useSearch()
  const recommendHook = useRecommendations()
  const gemHook = useHiddenGems()
  const discoverHook = useDiscover()

  // Carousel ref scrolls
  const recommendRef = React.useRef<HTMLDivElement>(null)
  const trendingRef = React.useRef<HTMLDivElement>(null)

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (!ref.current) return
    const offset = direction === "left" ? -300 : 300
    ref.current.scrollBy({ left: offset, behavior: "smooth" })
  }

  // Animation variants
  const staggerContainer: Variants = {
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
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-slate-105 transition-colors duration-305">
      
      {/* 1. Frosted Glass Top Navigation */}
      <header className="sticky top-0 z-50 w-full px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-full border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-lg">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 select-none shrink-0">
            <span className="text-xl">✈️</span>
            <span className="text-sm font-black text-white tracking-tight">
              VoyageAI
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-[11px] font-black uppercase tracking-wider text-slate-400">
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/planner/create-trip/dates" className="hover:text-white transition-colors">
              AI Planner
            </Link>
            <Link href="/discover" className="text-white border-b-2 border-blue-500 pb-0.5">
              Discover
            </Link>
            <Link href="/planner/itinerary" className="hover:text-white transition-colors">
              Trips
            </Link>
            <Link href="/planner/itinerary" className="hover:text-white transition-colors">
              Map Explorer
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <button
              type="button"
              className="p-1.5 rounded-full border border-white/10 bg-slate-900/40 text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              title="Notifications"
            >
              <Bell className="size-4" />
            </button>

            <button
              type="button"
              className="p-1.5 rounded-full border border-white/10 bg-slate-900/40 text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              title="Settings"
            >
              <Settings className="size-4" />
            </button>

            {/* Profile Avatar */}
            <div className="size-8 rounded-full overflow-hidden border border-white/20 shadow-md cursor-pointer bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Profile Avatar"
                className="size-full object-cover"
              />
            </div>
          </div>

        </div>
      </header>

      {/* 2. Main Page Body */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-6 flex flex-col gap-14">
        
        {/* Search Hero Header Section */}
        <HeroSearch
          searchQuery={searchHook.searchQuery}
          setSearchQuery={searchHook.setSearchQuery}
          suggestionChips={searchHook.suggestionChips}
          onSelectChip={searchHook.handleChipClick}
          onSubmit={searchHook.handleSearchSubmit}
          onVoice={searchHook.handleVoiceSearch}
        />

        {/* Section Wrapper */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-14"
        >
          
          {/* Section 1: Recommended For You Carousel */}
          <motion.section variants={fadeUpItem} className="space-y-5">
            <div className="flex items-end justify-between">
              <div className="space-y-1 text-left">
                <span className="block text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                  Tailored Curations
                </span>
                <h3 className="text-xl font-black text-white tracking-tight">
                  Recommended For You
                </h3>
                <p className="text-[10px] font-semibold text-slate-450 leading-none">
                  Curated matches based on your recent searches.
                </p>
              </div>

              {/* Slider Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCarousel(recommendRef, "left")}
                  className="p-1.5 rounded-full border border-white/10 bg-slate-900/40 hover:bg-slate-800 text-slate-455 hover:text-white transition-colors cursor-pointer"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={() => scrollCarousel(recommendRef, "right")}
                  className="p-1.5 rounded-full border border-white/10 bg-slate-900/40 hover:bg-slate-800 text-slate-455 hover:text-white transition-colors cursor-pointer"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Carousel Content */}
            <div
              ref={recommendRef}
              className="flex items-stretch gap-6 overflow-x-auto pb-4 scrollbar-none -mx-1 px-1"
            >
              {recommendHook.recommendations.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  id={dest.id}
                  name={dest.name}
                  country={dest.country}
                  imageUrl={dest.imageUrl}
                  matchScore={dest.matchScore}
                  description={dest.description}
                  budget={dest.budget}
                  bestSeason={dest.bestSeason}
                  isFavorite={dest.isFavorite || false}
                  onToggleFavorite={recommendHook.toggleFavorite}
                />
              ))}
            </div>
          </motion.section>

          {/* Section 2: Featured Destinations Grid */}
          <motion.section variants={fadeUpItem}>
            <FeaturedDestination />
          </motion.section>

          {/* Section 3: Hidden Gems Horizontal List */}
          <motion.section variants={fadeUpItem} className="space-y-5 text-left">
            <div className="space-y-1">
              <span className="block text-[10px] font-black uppercase text-orange-500 tracking-wider">
                Off the Beaten Path
              </span>
              <h3 className="text-xl font-black text-white tracking-tight">
                Hidden Gems
              </h3>
              <p className="text-[10px] font-semibold text-slate-400 leading-none">
                Off-the-beaten-path destinations curated by our AI from millions of travel logs.
              </p>
            </div>

            {/* Horizontal view */}
            <div className="flex items-stretch gap-6 overflow-x-auto pb-4 scrollbar-none -mx-1 px-1">
              {gemHook.hiddenGems.map((gem) => (
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
                  isBookmarked={gem.isBookmarked || false}
                  onToggleBookmark={gemHook.toggleBookmark}
                />
              ))}
            </div>
          </motion.section>

          {/* Section 4: Explore by Category Grid */}
          <motion.section variants={fadeUpItem} className="space-y-5 text-left">
            <div className="space-y-1">
              <span className="block text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                Vibe Categorization
              </span>
              <h3 className="text-xl font-black text-white tracking-tight">
                Explore by Category
              </h3>
            </div>

            {/* Grid display */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {discoverHook.categories.map((cat) => (
                <CategoryChip
                  key={cat.id}
                  label={cat.label}
                  emoji={cat.emoji}
                  count={cat.destinationCount}
                  isActive={discoverHook.activeCategory === cat.id}
                  onClick={() => discoverHook.setActiveCategory(cat.id)}
                />
              ))}
            </div>
          </motion.section>

          {/* Section 5: Trending This Month Carousel */}
          <motion.section variants={fadeUpItem} className="space-y-5">
            <div className="flex items-end justify-between">
              <div className="space-y-1 text-left">
                <span className="block text-[10px] font-black uppercase text-rose-500 tracking-wider">
                  Rising Stars
                </span>
                <h3 className="text-xl font-black text-white tracking-tight">
                  Trending This Month
                </h3>
              </div>

              {/* Slider Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCarousel(trendingRef, "left")}
                  className="p-1.5 rounded-full border border-white/10 bg-slate-900/40 hover:bg-slate-800 text-slate-455 hover:text-white transition-colors cursor-pointer"
                  aria-label="Scroll trending left"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={() => scrollCarousel(trendingRef, "right")}
                  className="p-1.5 rounded-full border border-white/10 bg-slate-900/40 hover:bg-slate-800 text-slate-455 hover:text-white transition-colors cursor-pointer"
                  aria-label="Scroll trending right"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Carousel Content */}
            <div
              ref={trendingRef}
              className="flex items-stretch gap-6 overflow-x-auto pb-4 scrollbar-none -mx-1 px-1"
            >
              {discoverHook.trendingDestinations.map((trend) => (
                <motion.div
                  key={trend.id}
                  whileHover={{ y: -3 }}
                  className="w-[280px] rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl overflow-hidden shrink-0 select-none text-left flex flex-col group"
                >
                  
                  {/* Image container */}
                  <div className="relative h-44 overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${trend.imageUrl})` }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    
                    {/* Growth badge overlay top-left */}
                    <div className="absolute top-4 left-4 bg-rose-500/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-rose-400/20 flex items-center gap-1">
                      <Compass className="size-3 text-white" />
                      <span className="text-[9.5px] font-black text-white uppercase tracking-wider">
                        Trending (+{trend.growthPercentage}%)
                      </span>
                    </div>
                  </div>

                  {/* Details bottom */}
                  <div className="p-4 flex-grow flex flex-col justify-between space-y-3.5">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">
                        {trend.country}
                      </span>
                      <h4 className="text-sm font-black text-slate-100 tracking-tight leading-none group-hover:text-rose-500 transition-colors">
                        {trend.name}
                      </h4>
                    </div>

                    {/* Stats Row */}
                    <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      <span>Avg: {trend.avgTemp}</span>
                      <span>Best: {trend.bestMonth}</span>
                    </div>
                  </div>

                </motion.div>
              ))}
            </div>
          </motion.section>

        </motion.div>

      </main>

      {/* 3. Floating AI Assistant Chat Ball */}
      <FloatingAIButton />

      {/* 4. Multi-column footer */}
      <DiscoverFooter />

    </div>
  )
}

export function DiscoverPage() {
  const [queryClient] = React.useState(makeQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <DiscoverPageContent />
    </QueryClientProvider>
  )
}
