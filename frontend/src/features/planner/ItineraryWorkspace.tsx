"use client"

import * as React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Globe2, Sparkles, MessageSquare, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

import { useItinerary } from "./hooks/useItinerary"
import { useAIEditing } from "./hooks/useAIEditing"
import { useTimeline } from "./hooks/useTimeline"

import { PlannerSidebar } from "./components/PlannerSidebar"
import { HeroBanner } from "./components/HeroBanner"
import { DayTimeline } from "./components/DayTimeline"
import { AIEditBox } from "./components/AIEditBox"
import { IntelligencePanel } from "./components/IntelligencePanel"
import { FloatingAIButton } from "./components/FloatingAIButton"

import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { GradientButton } from "@/components/ui/GradientButton"
import { useDashboardStore } from "@/features/dashboard/hooks/useDashboard"
import { cn } from "@/lib/utils"

function ItineraryWorkspaceContent() {
  const { itineraryData, isLoading, error, activeDayNumber, setActiveDayNumber } = useItinerary()
  const { messages, isEditing, isStreaming } = useAIEditing()
  const { selectDay } = useTimeline()
  const { isSidebarOpen, setSidebarOpen } = useDashboardStore()
  const [activeHeaderTab, setActiveHeaderTab] = React.useState("AI Planner")

  const headerLinks = [
    { label: "Home", href: "/dashboard" },
    { label: "Discover", href: "/discover" },
    { label: "AI Planner", href: "/planner" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
  ]

  // Filter activities corresponding to active day to pass to Live Map Preview
  const activeDayPlan = React.useMemo(() => {
    if (!itineraryData) return null
    return itineraryData.itinerary.days.find((d) => d.dayNumber === activeDayNumber) || itineraryData.itinerary.days[0]
  }, [itineraryData, activeDayNumber])

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="size-8 text-blue-600 animate-spin mb-3" />
        <span className="text-xs font-bold text-slate-500">Retrieving travel intelligence...</span>
      </div>
    )
  }

  if (error || !itineraryData) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-4 p-4 text-center">
        <p className="text-sm font-bold text-rose-500">Failed to load the generated itinerary.</p>
        <Link href="/planner">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer">
            Return to Planner
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-bg-cloud dark:bg-background text-foreground overflow-hidden">
      {/* 1. Global Navigation Header */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-black/5 bg-slate-50/40 px-4 backdrop-blur-md dark:border-white/5 dark:bg-slate-950/40 md:px-6 select-none shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex p-2.5 rounded-xl border border-black/5 bg-white/40 shadow-sm md:hidden text-slate-500 hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 cursor-pointer"
            aria-label="Open Sidebar"
          >
            <Menu className="size-4.5" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary-blue text-white shadow-lg shadow-blue-500/10">
              <Globe2 className="size-4.5" />
            </div>
            <span className="text-sm font-extrabold tracking-tight text-slate-800 dark:text-slate-100 hidden sm:inline">
              Trip Mind AI
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {headerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-xs font-bold transition-all relative py-1",
                activeHeaderTab === link.label
                  ? "text-primary-blue dark:text-blue-400"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              )}
            >
              {link.label}
              {activeHeaderTab === link.label && (
                <motion.span
                  layoutId="activeItineraryTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-blue dark:bg-blue-400 rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <GradientButton
            variant="primary"
            size="sm"
            onClick={() => alert("Ready to save and print PDF export...!")}
            className="shadow-sm font-extrabold"
          >
            Export Plan
          </GradientButton>
        </div>
      </header>

      {/* 2. Main Page Content Layout */}
      <div className="flex flex-1 overflow-hidden w-full relative">
        
        {/* Left Desktop Sidebar */}
        <aside className="hidden md:flex">
          <PlannerSidebar className="h-full" />
        </aside>

        {/* Left Mobile Drawer Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 z-40 bg-black md:hidden"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 left-0 z-50 w-64 md:hidden shadow-2xl bg-white dark:bg-slate-950"
              >
                <PlannerSidebar isMobile className="h-full w-full" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Center Panel (Itinerary Timeline & Conversation Panel) */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/20 dark:bg-inherit relative">
          
          {/* Back/Overview Bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-black/5 dark:border-white/5 select-none shrink-0 bg-white/30 dark:bg-slate-950/20 backdrop-blur-sm">
            <Link href="/planner">
              <button className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-550 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer">
                <ArrowLeft className="size-3.5" />
                Back to Workspace
              </button>
            </Link>

            {/* Horizontal Day Tabs Selector */}
            <div className="flex items-center gap-1">
              {itineraryData.itinerary.days.map((day) => (
                <button
                  key={day.id}
                  onClick={() => selectDay(day.dayNumber)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[10px] font-black tracking-tight cursor-pointer transition-all border",
                    activeDayNumber === day.dayNumber
                      ? "bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-950 shadow-sm"
                      : "border-black/5 bg-white/60 text-slate-600 hover:bg-slate-100 dark:border-white/5 dark:bg-slate-900/40 dark:text-slate-400 dark:hover:bg-slate-800"
                  )}
                >
                  Day {day.dayNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Center Scrollable Content area */}
          <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 space-y-6 scrollbar-thin no-scrollbar">
            <div className="max-w-3xl mx-auto space-y-6 pb-28">
              
              {/* Hero Banner Component */}
              <HeroBanner itinerary={itineraryData.itinerary} />

              {/* Active Day Timeline component */}
              {activeDayPlan && (
                <DayTimeline
                  dayPlan={activeDayPlan}
                  isMobile={false}
                />
              )}

              {/* Conversational Adjustments Feed Overlay */}
              {messages.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
                  <span className="text-[10px] font-black text-slate-450 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5 select-none">
                    <MessageSquare className="size-3 text-blue-500" />
                    AI Conversation Log
                  </span>

                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "p-4 rounded-3xl text-xs font-semibold max-w-[85%] shadow-sm leading-relaxed border select-none",
                          msg.sender === "user"
                            ? "bg-slate-100 border-slate-100/50 text-slate-800 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 ml-auto rounded-tr-none"
                            : "bg-blue-50 border-blue-100 text-slate-800 dark:bg-blue-950/20 dark:border-blue-900/30 dark:text-slate-200 mr-auto rounded-tl-none"
                        )}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky AI Prompt Edit panel container */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-slate-50/90 via-slate-50/60 to-transparent dark:from-slate-950/90 dark:via-slate-950/60 dark:to-transparent z-25">
            <div className="max-w-3xl mx-auto relative">
              <AIEditBox />
              <p className="text-[9px] font-bold text-slate-400 dark:text-slate-550 text-center mt-2.5 select-none">
                Trip Mind AI can make mistakes. Verify important info.
              </p>
            </div>
          </div>
        </div>

        {/* Right Desktop Intelligence Insights Panel */}
        {activeDayPlan && (
          <aside className="hidden lg:flex">
            <IntelligencePanel
              data={itineraryData}
              activeActivities={activeDayPlan.activities}
              className="h-full"
            />
          </aside>
        )}
      </div>

      {/* Floating Sparkle Assist Trigger for mobile devices */}
      <FloatingAIButton
        onClick={() => {
          const text = prompt("Ask AI to adjust the itinerary:")
          if (text && text.trim()) {
            // Focus or submit trigger
            const textarea = document.querySelector("textarea") as HTMLTextAreaElement
            if (textarea) {
              textarea.value = text
              // Trigger input event
              const event = new Event("input", { bubbles: true })
              textarea.dispatchEvent(event)
              textarea.focus()
            }
          }
        }}
      />
    </div>
  )
}

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  })

export function ItineraryWorkspace() {
  const [queryClient] = React.useState(makeQueryClient)
  return (
    <QueryClientProvider client={queryClient}>
      <ItineraryWorkspaceContent />
    </QueryClientProvider>
  )
}
