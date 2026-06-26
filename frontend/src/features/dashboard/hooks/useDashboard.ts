"use client"

import { create } from "zustand"
import { useQuery } from "@tanstack/react-query"
import { dashboardService } from "../services/dashboard.service"

interface DashboardStore {
  isSidebarOpen: boolean // Mobile drawer state
  isSidebarCollapsed: boolean // Desktop collapse state
  activeTab: string
  searchQuery: string
  isAIOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebarCollapsed: () => void
  setActiveTab: (tab: string) => void
  setSearchQuery: (query: string) => void
  setAIOpen: (open: boolean) => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  isSidebarOpen: false,
  isSidebarCollapsed: false,
  activeTab: "Dashboard",
  searchQuery: "",
  isAIOpen: false,
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  toggleSidebarCollapsed: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setAIOpen: (open) => set({ isAIOpen: open }),
}))

export function useDashboardQuery() {
  return useQuery({
    queryKey: ["dashboardData"],
    queryFn: dashboardService.getDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes stale time
  })
}
