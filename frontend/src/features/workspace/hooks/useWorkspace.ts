import { create } from "zustand"
import { useQuery } from "@tanstack/react-query"
import { workspaceService } from "../services/workspace.service"

interface WorkspaceStore {
  isSidebarOpen: boolean
  isSidebarCollapsed: boolean
  activeMenu: "Command" | "Atlas" | "Nexus" | "Archive" | "Intelligence"
  activeTab: "Overview" | "Itinerary" | "Bookings" | "Expenses" | "Analytics" | "Settings"
  setSidebarOpen: (open: boolean) => void
  toggleSidebarCollapsed: () => void
  setActiveMenu: (menu: "Command" | "Atlas" | "Nexus" | "Archive" | "Intelligence") => void
  setActiveTab: (tab: "Overview" | "Itinerary" | "Bookings" | "Expenses" | "Analytics" | "Settings") => void
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  isSidebarOpen: false,
  isSidebarCollapsed: false,
  activeMenu: "Atlas",
  activeTab: "Overview",
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  toggleSidebarCollapsed: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setActiveMenu: (menu) => set({ activeMenu: menu }),
  setActiveTab: (tab) => set({ activeTab: tab })
}))

export function useWorkspaceOverviewQuery(tripId: string) {
  return useQuery({
    queryKey: ["workspaceOverview", tripId],
    queryFn: () => workspaceService.getOverview(tripId),
    enabled: !!tripId,
    staleTime: 2 * 60 * 1000
  })
}

export function useWorkspaceTimelineQuery(tripId: string) {
  return useQuery({
    queryKey: ["workspaceTimeline", tripId],
    queryFn: () => workspaceService.getTimeline(tripId),
    enabled: !!tripId,
    staleTime: 2 * 60 * 1000
  })
}

export function useWorkspaceProgressQuery(tripId: string) {
  return useQuery({
    queryKey: ["workspaceProgress", tripId],
    queryFn: () => workspaceService.getProgress(tripId),
    enabled: !!tripId,
    staleTime: 2 * 60 * 1000
  })
}

export function useWorkspaceForecastQuery(tripId: string) {
  return useQuery({
    queryKey: ["workspaceForecast", tripId],
    queryFn: () => workspaceService.getForecast(tripId),
    enabled: !!tripId,
    staleTime: 2 * 60 * 1000
  })
}

export function useWorkspaceBookingsQuery(tripId: string) {
  return useQuery({
    queryKey: ["workspaceBookings", tripId],
    queryFn: () => workspaceService.getBookings(tripId),
    enabled: !!tripId,
    staleTime: 2 * 60 * 1000
  })
}

export function useWorkspaceAnalyticsQuery(tripId: string) {
  return useQuery({
    queryKey: ["workspaceAnalytics", tripId],
    queryFn: () => workspaceService.getAnalytics(tripId),
    enabled: !!tripId,
    staleTime: 2 * 60 * 1000
  })
}
