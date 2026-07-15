"use client"

import * as React from "react"
import Link from "next/link"
import { Bell, Settings, Menu, Plus, ChevronRight } from "lucide-react"
import { useWorkspaceStore } from "../hooks/useWorkspace"
import { useAuthStore } from "@/store/authStore"

interface WorkspaceTopNavbarProps {
  tripTitle?: string
}

export function WorkspaceTopNavbar({ tripTitle = "Trip Workspace" }: WorkspaceTopNavbarProps) {
  const { setSidebarOpen } = useWorkspaceStore()
  const { user } = useAuthStore()

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 backdrop-blur-md bg-white/90 dark:bg-slate-900/90">
      {/* Upper Navigation Row */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 cursor-pointer"
          >
            <Menu className="size-5" />
          </button>

          {/* Logo Name */}
          <Link href="/dashboard" className="text-base font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-1.5">
            <span className="bg-gradient-to-r from-primary-blue to-violet-600 bg-clip-text text-transparent">
              Aetheric Explorer
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 ml-8">
            <Link
              href="/dashboard"
              className="text-xs font-bold text-slate-400 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-200 transition-colors"
            >
              Explorer
            </Link>
            <span className="text-xs font-bold text-primary-blue border-b-2 border-primary-blue pb-1.5">
              Workspace
            </span>
            <Link
              href="/dashboard"
              className="text-xs font-bold text-slate-400 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-200 transition-colors"
            >
              Concierge
            </Link>
          </nav>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <Link href="/planner/create-trip">
            <button className="bg-blue-50 hover:bg-blue-100 text-primary-blue dark:bg-blue-950/40 dark:hover:bg-blue-900/40 dark:text-blue-400 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all shadow-sm hover:scale-[1.01] cursor-pointer">
              <Plus className="size-4" />
              New Mission
            </button>
          </Link>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
            <Bell className="size-4.5" />
            <span className="absolute top-2 right-2 size-1.5 bg-red-500 rounded-full" />
          </button>

          {/* Settings */}
          <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
            <Settings className="size-4.5" />
          </button>

          {/* Profile Avatar */}
          <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden ring-2 ring-primary-blue/10">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="size-full object-cover" />
            ) : (
              <div className="size-full flex items-center justify-center bg-gradient-to-tr from-primary-blue to-violet-500 text-white text-xs font-black">
                {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Breadcrumb Row */}
      <div className="px-6 py-2 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-50 dark:border-slate-800 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500">
        <Link href="/dashboard" className="hover:text-slate-600 dark:hover:text-slate-350 transition-colors">
          Home
        </Link>
        <ChevronRight className="size-3 text-slate-300" />
        <Link href="/dashboard" className="hover:text-slate-600 dark:hover:text-slate-350 transition-colors">
          My Trips
        </Link>
        <ChevronRight className="size-3 text-slate-300" />
        <span className="text-primary-blue dark:text-blue-400">
          {tripTitle}
        </span>
      </div>
    </header>
  )
}
