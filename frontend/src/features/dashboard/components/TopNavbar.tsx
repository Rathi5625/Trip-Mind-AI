"use client"

import * as React from "react"
import { Menu, Plus } from "lucide-react"
import { SearchBar } from "./SearchBar"
import { NotificationBell } from "./NotificationBell"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { GradientButton } from "@/components/ui/GradientButton"
import { useDashboardStore } from "../hooks/useDashboard"
import { useRouter } from "next/navigation"

export function TopNavbar() {
  const { setSidebarOpen } = useDashboardStore()
  const router = useRouter()

  const handleCreateTrip = () => {
    router.push("/planner/create-trip/dates")
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-black/5 bg-slate-50/40 px-4 backdrop-blur-md dark:border-white/5 dark:bg-slate-950/40 md:px-6 select-none">
      {/* Left side: Hamburger menu for smaller viewports */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex p-2.5 rounded-xl border border-black/5 bg-white/40 shadow-sm md:hidden text-slate-500 hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 cursor-pointer"
          aria-label="Open Sidebar"
        >
          <Menu className="size-4.5" />
        </button>
        
        {/* Hide SearchBar on small mobile, show on tablet and up */}
        <div className="hidden sm:block w-full sm:w-96 md:w-[480px]">
          <SearchBar />
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2.5">
        <NotificationBell />
        <ThemeToggle />
        
        <GradientButton
          variant="primary"
          size="sm"
          onClick={handleCreateTrip}
          className="flex items-center gap-1.5 shadow-md shadow-blue-500/10 font-bold"
        >
          <Plus className="size-3.5 stroke-[3]" />
          <span className="hidden xs:inline">Create Trip</span>
        </GradientButton>
      </div>
    </header>
  )
}
