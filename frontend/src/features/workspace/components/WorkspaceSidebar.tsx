"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Compass,
  Command,
  Activity,
  Archive,
  Brain,
  Cpu,
  HelpCircle,
  History,
  Map,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { useWorkspaceStore } from "../hooks/useWorkspace"

export function WorkspaceSidebar({ isMobile = false, className = "" }: { isMobile?: boolean; className?: string }) {
  const {
    activeMenu,
    setActiveMenu,
    isSidebarCollapsed,
    toggleSidebarCollapsed
  } = useWorkspaceStore()

  const menuItems = [
    { id: "Command", label: "Command", icon: Command },
    { id: "Atlas", label: "Atlas", icon: Compass },
    { id: "Nexus", label: "Nexus", icon: Activity },
    { id: "Archive", label: "Archive", icon: Archive },
    { id: "Intelligence", label: "Intelligence", icon: Brain }
  ] as const

  return (
    <div
      className={`h-full bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 relative ${
        isMobile
          ? "w-64"
          : isSidebarCollapsed
          ? "w-20"
          : "w-64"
      } ${className}`}
    >
      {/* Top Header */}
      <div>
        <div className="p-6 flex items-center gap-3 border-b border-slate-50 dark:border-slate-800">
          <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-primary-blue shrink-0 shadow-sm">
            <Map className="size-5" />
          </div>
          {(!isSidebarCollapsed || isMobile) && (
            <div className="animate-[fadeIn_0.2s_ease-out]">
              <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 leading-tight">
                Trip Mind AI
              </h2>
              <span className="text-[9px] font-black tracking-wider text-emerald-550 dark:text-emerald-400">
                PRECISION NAVIGATION ACTIVE
              </span>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeMenu === item.id

            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-xs font-bold transition-all relative group cursor-pointer ${
                  isActive
                    ? "text-primary-blue bg-blue-50/70 dark:bg-blue-950/20"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                }`}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div
                    layoutId="activeWorkspaceMenuLine"
                    className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-primary-blue"
                  />
                )}
                <Icon className={`size-4.5 transition-transform group-hover:scale-105 ${isActive ? "text-primary-blue" : "text-slate-400"}`} />
                {(!isSidebarCollapsed || isMobile) && (
                  <span className="animate-[fadeIn_0.2s_ease-out]">{item.label}</span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Bottom Footer & Action */}
      <div className="p-4 space-y-4">
        {/* Deploy AI Agent Button */}
        <button className="w-full bg-primary-blue hover:bg-blue-600 text-white rounded-xl py-3 px-3 flex items-center justify-center gap-2 text-xs font-black shadow-md hover:shadow-lg transition-all cursor-pointer">
          <Cpu className="size-4 animate-pulse" />
          {(!isSidebarCollapsed || isMobile) && (
            <span className="animate-[fadeIn_0.2s_ease-out]">Deploy AI Agent</span>
          )}
        </button>

        {/* Support & Logs */}
        <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
            <HelpCircle className="size-4.5" />
            {(!isSidebarCollapsed || isMobile) && <span>Support</span>}
          </button>
          <button className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
            <History className="size-4.5" />
            {(!isSidebarCollapsed || isMobile) && <span>Logs</span>}
          </button>
        </div>

        {/* Desktop Collapse Toggle */}
        {!isMobile && (
          <button
            onClick={toggleSidebarCollapsed}
            className="absolute -right-3 top-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 size-6 rounded-full flex items-center justify-center shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors z-10 cursor-pointer"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="size-3.5 text-slate-500" />
            ) : (
              <ChevronLeft className="size-3.5 text-slate-500" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}
