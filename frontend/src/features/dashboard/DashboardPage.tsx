"use client"

import * as React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import { X, LayoutDashboard, Sparkles, Compass, Map, LogOut, Settings } from "lucide-react"
import { useDashboardStore, useDashboardQuery } from "./hooks/useDashboard"
import { Sidebar } from "./components/Sidebar"
import { TopNavbar } from "./components/TopNavbar"
import { WelcomeBanner } from "./components/WelcomeBanner"
import { AIInsights } from "./components/AIInsights"
import { BudgetOverview } from "./components/BudgetOverview"
import { UpcomingTrips } from "./components/UpcomingTrips"
import { RecommendationSection } from "./components/RecommendationSection"
import { StatisticsCard } from "./components/StatisticsCard"
import { FloatingAIAssistant } from "./components/FloatingAIAssistant"
import { SkeletonLoader } from "@/components/ui/SkeletonLoader"

// Create query client specifically for the dashboard module (self-contained layout)
const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  })

function DashboardContent() {
  const { data, isLoading, error } = useDashboardQuery()
  const { isSidebarOpen, setSidebarOpen, activeTab } = useDashboardStore()

  // Dynamic content mapping based on active navigation tab
  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-6">
          <SkeletonLoader variant="rect" className="h-36 w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <SkeletonLoader variant="rect" className="h-64 w-full" />
              <SkeletonLoader variant="rect" className="h-64 w-full" />
            </div>
            <div className="lg:col-span-4 space-y-6">
              <SkeletonLoader variant="rect" className="h-96 w-full" />
              <div className="grid grid-cols-3 gap-3">
                <SkeletonLoader variant="rect" className="h-24 w-full" />
                <SkeletonLoader variant="rect" className="h-24 w-full" />
                <SkeletonLoader variant="rect" className="h-24 w-full" />
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (error || !data) {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center select-none bg-red-50/50 dark:bg-red-950/10 border border-red-150 dark:border-red-900/30 rounded-3xl">
          <p className="text-sm font-bold text-red-650 dark:text-red-400">
            Error loading your Travel Workspace dashboard. Please refresh.
          </p>
        </div>
      )
    }

    // If active tab is not Dashboard, render a coming soon placeholder
    if (activeTab !== "Dashboard") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center min-h-[50vh] text-center select-none border border-black/5 dark:border-white/5 rounded-3xl bg-white/40 dark:bg-slate-900/40 p-8 backdrop-blur-md"
        >
          <div className="size-16 rounded-full bg-primary-blue/10 dark:bg-blue-900/30 text-primary-blue dark:text-blue-400 flex items-center justify-center mb-4">
            <Sparkles className="size-8" />
          </div>
          <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-1">
            {activeTab} Workspace
          </h3>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 max-w-md">
            This module is being personalized by our travel AI model. Real-time maps, budget tracking, and booking caches will appear shortly.
          </p>
        </motion.div>
      )
    }

    // Default: Dashboard page content (spans left & right sections)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Section (Welcome, Insights, Trips, Recommendations) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Welcome Banner */}
          <WelcomeBanner
            travelerName={data.travelerName}
            upcomingTrip={data.upcomingTrip}
          />

          {/* AI Travel Insights */}
          <AIInsights insights={data.insights} />

          {/* Upcoming Trips */}
          <UpcomingTrips trips={data.trips} />

          {/* Discover Recommendations */}
          <RecommendationSection recommendations={data.recommendations} />
        </div>

        {/* Right Section (Budget, Stats) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Budget Overview */}
          <BudgetOverview budget={data.budget} />

          {/* Statistics Grid */}
          <div className="grid grid-cols-3 gap-3">
            {data.stats.map((stat) => (
              <StatisticsCard
                key={stat.id}
                label={stat.label}
                value={stat.value}
                iconName={stat.icon}
                description={stat.description}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg-cloud dark:bg-background text-foreground">
      {/* 1. Desktop permanent sidebar */}
      <Sidebar className="hidden md:flex" />

      {/* 2. Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Drawer Backdrop click closer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black md:hidden"
            />
            {/* Drawer Content wrapper */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 md:hidden shadow-2xl"
            >
              <Sidebar isMobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. Main content page container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Sticky top navbar header */}
        <TopNavbar />

        {/* Page body body */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6 md:py-8 no-scrollbar bg-[#F8F9FB]/60 dark:bg-inherit">
          <div className="mx-auto max-w-7xl">
            {renderMainContent()}
          </div>
        </main>
      </div>

      {/* 4. Floating AI Copilot assistant */}
      <FloatingAIAssistant />
    </div>
  )
}

export function DashboardPage() {
  const [queryClient] = React.useState(makeQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent />
    </QueryClientProvider>
  )
}
