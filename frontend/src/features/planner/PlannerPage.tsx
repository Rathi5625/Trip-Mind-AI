"use client"

import * as React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Globe2, Sparkles, BookOpen } from "lucide-react"
import { usePlannerStore } from "./store/plannerStore"
import { usePlanner } from "./hooks/usePlanner"
import { PlannerSidebar } from "./components/PlannerSidebar"
import { PromptSuggestions } from "./components/PromptSuggestions"
import { AIInput } from "./components/AIInput"
import { AIMessage } from "./components/AIMessage"
import { InsightPanel } from "./components/InsightPanel"
import { SmartPromptBuilder } from "./components/SmartPromptBuilder"
import { AIThinkingPanel } from "./components/AIThinkingPanel"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { GradientButton } from "@/components/ui/GradientButton"
import { useDashboardStore } from "@/features/dashboard/hooks/useDashboard"
import { cn } from "@/lib/utils"

// Query client for planner
const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  })

function PlannerContent() {
  const { messages, isGenerating, isStreaming, isThinking } = usePlanner()
  const { isSidebarOpen, setSidebarOpen } = useDashboardStore()
  const [activeHeaderTab, setActiveHeaderTab] = React.useState("AI Planner")

  const headerLinks = [
    { label: "Home", href: "/dashboard" },
    { label: "Discover", href: "/discover" },
    { label: "AI Planner", href: "/planner" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
  ]

  const handleHeaderLinkClick = (e: React.MouseEvent, label: string, href: string) => {
    if (href.startsWith("/")) {
      // Allow standard route redirection or tab update
      setActiveHeaderTab(label)
    } else {
      e.preventDefault()
      alert(`Navigating to ${label} landing section...`)
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-bg-cloud dark:bg-background text-foreground overflow-hidden">
      {/* 1. Global Workspace Top Navigation Bar */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-black/5 bg-slate-50/40 px-4 backdrop-blur-md dark:border-white/5 dark:bg-slate-950/40 md:px-6 select-none shrink-0">
        <div className="flex items-center gap-3">
          {/* Hamburger for mobile view */}
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

        {/* Header Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {headerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleHeaderLinkClick(e, link.label, link.href)}
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
                  layoutId="activeHeaderIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-blue dark:bg-blue-400 rounded-full"
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <button
            onClick={() => alert("Sign In modal triggered!")}
            className="hidden sm:inline-flex text-xs font-bold text-slate-600 hover:text-slate-800 dark:text-slate-450 dark:hover:text-slate-200 px-3 py-2 cursor-pointer"
          >
            Sign In
          </button>
          <GradientButton
            variant="primary"
            size="sm"
            onClick={() => alert("Redirecting to onboarding subscription plans...")}
            className="shadow-sm font-extrabold"
          >
            Get Started
          </GradientButton>
        </div>
      </header>

      {/* 2. Main Page Layout (Sidebar + Center Chat + Right Insights) */}
      <div className="flex flex-1 overflow-hidden w-full relative">
        {/* Left Sidebar (Desktop) */}
        <SidebarWrapper className="hidden md:flex" />

        {/* Mobile Drawer Sidebar */}
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
                className="fixed inset-y-0 left-0 z-50 w-64 md:hidden shadow-2xl"
              >
                <SidebarWrapper isMobile />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Center Panel (Chat Workspace & Greeting Panel) */}
        <div className="flex flex-1 flex-col overflow-hidden bg-slate-50/20 dark:bg-inherit">
          <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 no-scrollbar">
            <div className="mx-auto max-w-3xl h-full flex flex-col justify-between min-h-[70vh]">
              {messages.length === 0 ? (
                /* Welcoming Home screen */
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex-1 flex flex-col justify-center items-center text-center space-y-6 max-w-xl mx-auto my-auto"
                >
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary-blue/10 dark:bg-blue-900/30 text-primary-blue dark:text-blue-400 shadow-inner">
                    <Sparkles className="size-6.5 fill-blue-500/5 animate-[pulse_2s_infinite]" />
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight select-none">
                      Where Would You Like <br />
                      To <span className="text-primary-blue dark:text-blue-400">Go Next?</span>
                    </h2>
                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 leading-relaxed">
                      Describe your dream trip, or pick a starting point below. I&apos;ll craft a personalized itinerary instantly.
                    </p>
                  </div>

                  {/* Suggestion Cards Grid */}
                  <PromptSuggestions />
                </motion.div>
              ) : (
                /* Chat message lists */
                <div className="flex-1 w-full pr-1">
                  {messages.map((msg) => (
                    <AIMessage key={msg.id} message={msg} />
                  ))}
                  
                  {/* Dynamic checklist step thinking panel */}
                  {isThinking && <AIThinkingPanel />}
                </div>
              )}
            </div>
          </div>

          {/* Sticky AI Input Bar Container */}
          <div className="p-4 md:p-6 shrink-0 bg-gradient-to-t from-slate-50/40 via-slate-50/20 to-transparent dark:from-background dark:via-background/50 dark:to-transparent max-w-3xl w-full mx-auto">
            {/* Smart Prompt Builder Chips */}
            <SmartPromptBuilder />
            <AIInput />
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 text-center mt-3 select-none">
              Trip Mind AI can make mistakes. Verify important info.
            </p>
          </div>
        </div>

        {/* Right Insight Panel (Desktop Only) */}
        <InsightPanel className="hidden lg:flex" />
      </div>
    </div>
  )
}

function SidebarWrapper({ className, isMobile = false }: { className?: string; isMobile?: boolean }) {
  return <PlannerSidebar className={className} isMobile={isMobile} />
}

export function PlannerPage() {
  const [queryClient] = React.useState(makeQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <PlannerContent />
    </QueryClientProvider>
  )
}
