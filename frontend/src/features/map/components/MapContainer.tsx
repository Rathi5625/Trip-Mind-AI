"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMapStore } from "../store/mapStore"
import { sidebarVariants } from "../utils/animation"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"

interface MapContainerProps {
  sidebarContent?: React.ReactNode
  children: React.ReactNode
  topBarContent?: React.ReactNode
}

/**
 * Enterprise MapContainer wrapper.
 * Manages sidebars, fluid desktop/mobile transitions, overlay positioning, fullscreens, and focus flows.
 */
export function MapContainer({
  sidebarContent,
  children,
  topBarContent
}: MapContainerProps) {
  const isSidebarOpen = useMapStore((s) => s.isSidebarOpen)
  const isFullscreen = useMapStore((s) => s.isFullscreen)
  const toggleSidebar = useMapStore((s) => s.toggleSidebar)

  return (
    <div
      className={`relative w-full h-full flex overflow-hidden bg-slate-50 dark:bg-slate-950 transition-all duration-300
        ${isFullscreen ? "fixed inset-0 z-[9999]" : "h-[calc(100vh-64px)]"}
      `}
    >
      {/* ── Collapsible Sidebar ── */}
      <AnimatePresence initial={false}>
        {sidebarContent && isSidebarOpen && (
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-[280px] shrink-0 h-full border-r border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl z-20 flex flex-col overflow-hidden"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Map Canvas Area ── */}
      <main className="flex-grow h-full relative flex flex-col overflow-hidden">
        {/* Optional Topbar Overlay */}
        {topBarContent && (
          <header className="absolute top-4 left-4 right-4 z-20 pointer-events-none">
            <div className="pointer-events-auto flex items-center justify-between w-full">
              {topBarContent}
            </div>
          </header>
        )}

        {/* Sidebar Toggle Tab */}
        {sidebarContent && (
          <button
            onClick={toggleSidebar}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-5 h-12
              bg-white dark:bg-slate-900 border border-l-0 border-slate-200 dark:border-slate-800 rounded-r-2xl
              shadow-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={isSidebarOpen}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="size-3.5 text-slate-400" />
            ) : (
              <ChevronRight className="size-3.5 text-slate-400" />
            )}
          </button>
        )}

        {/* Interactive Map Slot */}
        <div className="flex-grow w-full h-full relative z-10">
          {children}
        </div>
      </main>
    </div>
  )
}
