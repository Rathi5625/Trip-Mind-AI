"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Sparkles,
  Compass,
  Map,
  Plane,
  FileText,
  Ticket,
  CreditCard,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Globe2,
} from "lucide-react"
import { useDashboardStore } from "../hooks/useDashboard"
import { UserProfileCard } from "./UserProfileCard"

interface SidebarProps {
  className?: string
  isMobile?: boolean
}

export function Sidebar({ className, isMobile = false }: SidebarProps) {
  const {
    isSidebarCollapsed,
    toggleSidebarCollapsed,
    activeTab,
    setActiveTab,
    setSidebarOpen,
  } = useDashboardStore()

  const mainNavItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "AI Planner", icon: Sparkles },
    { label: "Discover", icon: Compass },
    { label: "Map", icon: Map },
  ]

  const travelItems = [
    { label: "My Trips", icon: Plane },
    { label: "Itineraries", icon: FileText },
    { label: "Bookings", icon: Ticket },
  ]

  const managementItems = [
    { label: "Expenses", icon: CreditCard },
    { label: "Analytics", icon: BarChart3 },
  ]

  const handleNavClick = (label: string) => {
    setActiveTab(label)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  // Render a group of nav items
  const renderNavGroup = (title: string | null, items: typeof mainNavItems) => (
    <div className="space-y-1.5 w-full">
      {title && !isSidebarCollapsed && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-3 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase select-none"
        >
          {title}
        </motion.p>
      )}
      <div className="space-y-1 w-full">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.label

          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.label)}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-primary-blue text-white shadow-md shadow-blue-500/10"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
              )}
            >
              <Icon className={cn("size-4.5 shrink-0", isActive ? "stroke-[2.5]" : "stroke-[2]")} />
              
              {!isSidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="truncate"
                >
                  {item.label}
                </motion.span>
              )}

              {/* Tooltip for collapsed sidebar */}
              {isSidebarCollapsed && !isMobile && (
                <div className="absolute left-full ml-4 z-50 invisible opacity-0 translate-x-[-10px] group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 transition-all px-2.5 py-1 text-xs font-bold text-white bg-slate-900 rounded-lg dark:bg-slate-850 whitespace-nowrap shadow-md pointer-events-none">
                  {item.label}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r border-black/5 bg-white/40 dark:border-white/5 dark:bg-slate-950/40 p-4 transition-all duration-300 backdrop-blur-xl shrink-0 select-none",
        isSidebarCollapsed && !isMobile ? "w-20" : "w-64",
        className
      )}
    >
      {/* Sidebar Collapse Toggle Button (Desktop Only) */}
      {!isMobile && (
        <button
          onClick={toggleSidebarCollapsed}
          className="absolute -right-3 top-6 z-40 hidden md:flex size-6 items-center justify-center rounded-full border border-black/5 bg-white shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="size-3.5" />
          ) : (
            <ChevronLeft className="size-3.5" />
          )}
        </button>
      )}

      {/* Header Logo */}
      <div className={cn("flex items-center gap-2 px-2.5 py-3 mb-6", isSidebarCollapsed && !isMobile ? "justify-center" : "")}>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-blue text-white shadow-lg shadow-blue-500/20">
          <Globe2 className="size-5" />
        </div>
        {!isSidebarCollapsed && (
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-base font-extrabold tracking-tight text-slate-800 dark:text-slate-100"
          >
            Trip Mind AI
          </motion.h1>
        )}
      </div>

      {/* Nav Groups Container */}
      <div className="flex-1 space-y-6 overflow-y-auto w-full no-scrollbar">
        {renderNavGroup(null, mainNavItems)}
        {renderNavGroup("Your Travel", travelItems)}
        {renderNavGroup("Management", managementItems)}
      </div>

      {/* Footer Profile & Settings */}
      <div className="mt-auto space-y-4 pt-4 border-t border-black/5 dark:border-white/5">
        <button
          onClick={() => handleNavClick("Settings")}
          className={cn(
            "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200 cursor-pointer",
            activeTab === "Settings" && "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
          )}
        >
          <Settings className="size-4.5 stroke-[2] shrink-0" />
          {!isSidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Settings
            </motion.span>
          )}

          {isSidebarCollapsed && !isMobile && (
            <div className="absolute left-full ml-4 z-50 invisible opacity-0 translate-x-[-10px] group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 transition-all px-2.5 py-1 text-xs font-bold text-white bg-slate-900 rounded-lg dark:bg-slate-850 whitespace-nowrap shadow-md pointer-events-none">
              Settings
            </div>
          )}
        </button>

        <UserProfileCard
          name="Alex Traveler"
          role="Pro Member"
          avatarInitials="AT"
          isCollapsed={isSidebarCollapsed && !isMobile}
        />
      </div>
    </aside>
  )
}
