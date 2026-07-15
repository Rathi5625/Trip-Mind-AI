"use client"

import * as React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Loader2, AlertCircle } from "lucide-react"

import {
  useWorkspaceStore,
  useWorkspaceOverviewQuery,
  useWorkspaceTimelineQuery,
  useWorkspaceBookingsQuery,
  useWorkspaceAnalyticsQuery
} from "./hooks/useWorkspace"

import { WorkspaceSidebar } from "./components/WorkspaceSidebar"
import { WorkspaceTopNavbar } from "./components/WorkspaceTopNavbar"
import { WorkspaceHero } from "./components/WorkspaceHero"
import { WorkspaceOverview } from "./components/WorkspaceOverview"
import { WorkspaceItinerary } from "./components/WorkspaceItinerary"
import { WorkspaceBookings } from "./components/WorkspaceBookings"
import { WorkspaceExpenses } from "./components/WorkspaceExpenses"
import { WorkspaceAnalytics } from "./components/WorkspaceAnalytics"
import { WorkspaceSettings } from "./components/WorkspaceSettings"
import { FloatingAIAssistant } from "../dashboard/components/FloatingAIAssistant"
import { SkeletonLoader } from "@/components/ui/SkeletonLoader"

// Self-contained query client for workspace module
const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1
      }
    }
  })

interface WorkspacePageProps {
  tripId: string
}

function WorkspaceContent({ tripId }: WorkspacePageProps) {
  // Query state hooks
  const { data: overview, isLoading: isOverviewLoading, error: overviewError } = useWorkspaceOverviewQuery(tripId)
  const { data: timeline, isLoading: isTimelineLoading } = useWorkspaceTimelineQuery(tripId)
  const { data: bookings, isLoading: isBookingsLoading } = useWorkspaceBookingsQuery(tripId)
  const { data: analytics, isLoading: isAnalyticsLoading } = useWorkspaceAnalyticsQuery(tripId)

  // Zustand Store
  const { isSidebarOpen, setSidebarOpen, activeTab, setActiveTab } = useWorkspaceStore()

  const tabs = [
    "Overview",
    "Itinerary",
    "Bookings",
    "Expenses",
    "Analytics",
    "Settings"
  ] as const

  const renderActiveSection = () => {
    const isLoading = isOverviewLoading || isTimelineLoading || isBookingsLoading || isAnalyticsLoading
    if (isLoading) {
      return (
        <div className="space-y-6">
          <SkeletonLoader variant="rect" className="h-44 w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <SkeletonLoader variant="rect" className="h-64 w-full" />
            </div>
            <div className="lg:col-span-8">
              <SkeletonLoader variant="rect" className="h-64 w-full" />
            </div>
          </div>
        </div>
      )
    }

    if (overviewError || !overview) {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-3xl">
          <AlertCircle className="size-10 text-red-500 mb-4" />
          <h3 className="text-sm font-black text-red-650 dark:text-red-400">
            Error loading your Travel Workspace command center.
          </h3>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1 max-w-sm">
            Please make sure your database migrations are fully active and the Spring Boot backend is running.
          </p>
        </div>
      )
    }

    switch (activeTab) {
      case "Overview":
        return (
          <WorkspaceOverview
            overview={overview}
            timeline={timeline || []}
            onTabChange={setActiveTab}
          />
        )
      case "Itinerary":
        return <WorkspaceItinerary timeline={timeline || []} />
      case "Bookings":
        return <WorkspaceBookings bookings={bookings || []} />
      case "Expenses":
        return <WorkspaceExpenses analytics={analytics || { tripId, totalSpent: 0, categoryBreakdown: {}, expenses: [] }} />
      case "Analytics":
        return <WorkspaceAnalytics analytics={analytics || { tripId, totalSpent: 0, categoryBreakdown: {}, expenses: [] }} />
      case "Settings":
        return <WorkspaceSettings overview={overview} />
      default:
        return null
    }
  }

  const tripTitle = overview?.title || "Tokyo Adventure"

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg-cloud dark:bg-background text-foreground animate-[fadeIn_0.5s_ease-out]">
      {/* 1. Desktop sidebar */}
      <WorkspaceSidebar className="hidden md:flex" />

      {/* 2. Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop click closer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black md:hidden"
            />
            {/* Drawer Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 md:hidden shadow-2xl"
            >
              <WorkspaceSidebar isMobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. Main content body */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <WorkspaceTopNavbar tripTitle={tripTitle} />

        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6 md:py-8 no-scrollbar bg-[#F8F9FB]/60 dark:bg-inherit">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Hero Card */}
            {overview && !isOverviewLoading && (
              <WorkspaceHero
                title={overview.title}
                destinationName={overview.destinationName}
                startDate={overview.startDate}
                endDate={overview.endDate}
                duration={overview.stats.countdownDays} // Display countdown/duration details
                travelersCount={overview.travelersCount}
              />
            )}

            {/* Tab Navigation Menu */}
            {overview && (
              <div className="flex items-center bg-slate-100/60 dark:bg-slate-800/40 p-1.5 rounded-2xl w-fit border border-black/5 dark:border-white/5">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all relative cursor-pointer ${
                        isActive
                          ? "text-white bg-primary-blue shadow-sm"
                          : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeWorkspaceTabPill"
                          className="absolute inset-0 bg-primary-blue rounded-xl -z-10"
                        />
                      )}
                      {tab}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Main Segment Content */}
            <div className="pt-2">{renderActiveSection()}</div>
          </div>
        </main>
      </div>

      {/* 4. Floating AI Copilot assistant */}
      <FloatingAIAssistant />
    </div>
  )
}

export function WorkspacePage({ tripId }: WorkspacePageProps) {
  const [queryClient] = React.useState(makeQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <WorkspaceContent tripId={tripId} />
    </QueryClientProvider>
  )
}
export default WorkspacePage
