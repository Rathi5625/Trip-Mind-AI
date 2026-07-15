"use client"

import * as React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  MapPin,
  Sparkles,
  Map,
  Clock,
  Plus,
  Trash2,
  Copy,
  ChevronRight,
  TrendingDown,
  Sun,
  Users,
  Compass,
  DollarSign,
  Info,
  Footprints,
  Train,
  CloudRain,
  Shield,
  Edit2,
  X,
  PlusCircle,
  Eye,
  CheckCircle2,
  FileText
} from "lucide-react"

import {
  useItineraryQuery,
  useAddActivityMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
  useOptimizeMutation,
  useAskAiMutation,
  useWeatherQuery,
  useCrowdsQuery,
  useBudgetQuery,
  useTransportQuery
} from "./hooks/useItinerary"

import { useWorkspaceOverviewQuery } from "./hooks/useWorkspace"
import { ItineraryMap } from "./components/ItineraryMap"
import { SkeletonLoader } from "@/components/ui/SkeletonLoader"

const queryClient = new QueryClient()

interface ItineraryPageProps {
  tripId: string
}

function ItineraryContent({ tripId }: ItineraryPageProps) {
  // Query operations
  const { data: overview, isLoading: isOverviewLoading } = useWorkspaceOverviewQuery(tripId)
  const { data: itineraryDays, isLoading: isItineraryLoading } = useItineraryQuery(tripId)
  const { data: weather } = useWeatherQuery(tripId)
  const { data: crowds } = useCrowdsQuery(tripId)
  const { data: budget } = useBudgetQuery(tripId)
  const { data: transport } = useTransportQuery(tripId)

  // Mutations
  const addActivityMut = useAddActivityMutation(tripId)
  const updateActivityMut = useUpdateActivityMutation(tripId)
  const deleteActivityMut = useDeleteActivityMutation(tripId)
  const optimizeMut = useOptimizeMutation(tripId)
  const askAiMut = useAskAiMutation(tripId)

  // UI States
  const [selectedDayIndex, setSelectedDayIndex] = React.useState(1) // Day 2 is default selected in prompt screenshot
  const [isMapView, setIsMapView] = React.useState(false)
  const [showAddModal, setShowAddModal] = React.useState(false)
  const [showEditModal, setShowEditModal] = React.useState<any>(null)
  const [aiCommand, setAiCommand] = React.useState("")
  const [expandedNotesId, setExpandedNotesId] = React.useState<number | null>(null)

  // Add activity form state
  const [newActName, setNewActName] = React.useState("")
  const [newActTime, setNewActTime] = React.useState("09:00 AM")
  const [newActCategory, setNewActCategory] = React.useState("Sightseeing")
  const [newActDuration, setNewActDuration] = React.useState("1.5h")
  const [newActBudget, setNewActBudget] = React.useState("0")
  const [newActAddress, setNewActAddress] = React.useState("")
  const [newActDescription, setNewActDescription] = React.useState("")

  const activeDay = itineraryDays?.find((d) => d.dayNumber === selectedDayIndex)
  const activeActivities = activeDay?.activities || []

  // Day list helper matching seeder
  const daysList = itineraryDays || [
    { dayNumber: 1, description: "Arrival", date: "15 Oct" },
    { dayNumber: 2, description: "Tokyo City Tour", date: "16 Oct" },
    { dayNumber: 3, description: "Shibuya & Harajuku", date: "17 Oct" },
    { dayNumber: 4, description: "Mount Fuji Trip", date: "18 Oct" }
  ]

  const handleAddActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addActivityMut.mutate({
      name: newActName,
      time: newActTime,
      category: newActCategory,
      duration: newActDuration,
      budget: parseFloat(newActBudget) || 0,
      address: newActAddress,
      description: newActDescription,
      imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80"
    }, {
      onSuccess: () => {
        setShowAddModal(false)
        setNewActName("")
        setNewActAddress("")
        setNewActDescription("")
      }
    })
  }

  const handleEditActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!showEditModal) return
    updateActivityMut.mutate({
      activityId: showEditModal.id,
      dto: {
        name: showEditModal.name,
        time: showEditModal.time,
        category: showEditModal.category,
        duration: showEditModal.duration,
        budget: parseFloat(showEditModal.budget) || 0,
        address: showEditModal.address,
        description: showEditModal.description
      }
    }, {
      onSuccess: () => {
        setShowEditModal(null)
      }
    })
  }

  const handleDuplicateActivity = (act: any) => {
    addActivityMut.mutate({
      name: act.name + " (Copy)",
      time: act.time,
      category: act.category,
      duration: act.duration,
      budget: act.budget,
      address: act.address,
      description: act.description,
      imageUrl: act.imageUrl
    })
  }

  const handleAskAiSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!aiCommand.trim()) return
    askAiMut.mutate(aiCommand, {
      onSuccess: (res) => {
        alert(res.response)
        setAiCommand("")
      }
    })
  }

  const formatDateString = (dateStr: any) => {
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })
    } catch (e) {
      return String(dateStr)
    }
  }

  const isLoading = isOverviewLoading || isItineraryLoading

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] dark:bg-background p-8 flex flex-col gap-6 max-w-7xl mx-auto">
        <SkeletonLoader variant="rect" className="h-10 w-64" />
        <SkeletonLoader variant="rect" className="h-32 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <SkeletonLoader variant="rect" className="h-96 w-full" />
          </div>
          <div className="lg:col-span-6">
            <SkeletonLoader variant="rect" className="h-96 w-full" />
          </div>
          <div className="lg:col-span-3">
            <SkeletonLoader variant="rect" className="h-96 w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-slate-950 text-foreground pb-12 animate-[fadeIn_0.5s_ease-out]">
      {/* 1. TOP NAV Sticky Header */}
      <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500">
            <span>Home</span>
            <ChevronRight className="size-3" />
            <span>My Trips</span>
            <ChevronRight className="size-3" />
            <span>{overview?.title || "Tokyo Adventure"}</span>
            <ChevronRight className="size-3" />
            <span className="text-slate-800 dark:text-slate-200">Itinerary</span>
          </div>
          <div className="size-8 rounded-full bg-primary-blue text-white flex items-center justify-center font-black text-xs">
            AT
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        {/* 2. TRIP HERO HEADER */}
        <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4.5">
            <div className="size-16 rounded-2xl bg-blue-50 dark:bg-blue-950/20 text-primary-blue flex items-center justify-center shadow-inner shrink-0">
              <Compass className="size-8 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-800 dark:text-slate-100">
                  {overview?.title || "Tokyo Adventure"}
                </h1>
                <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/30 uppercase">
                  Ready to Travel
                </span>
              </div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                <span>15 Oct – 22 Oct • 8 Days</span>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-850 border border-black/5 dark:border-white/5 text-slate-700 dark:text-slate-200 text-xs font-black rounded-2xl shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="size-4" />
              Add Activity
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("ai-ask-input")
                element?.focus()
              }}
              className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-850 border border-black/5 dark:border-white/5 text-slate-700 dark:text-slate-200 text-xs font-black rounded-2xl shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="size-4 text-amber-500 animate-pulse" />
              Ask AI
            </button>
            <button
              onClick={() => optimizeMut.mutate()}
              disabled={optimizeMut.isPending}
              className="px-5 py-2.5 bg-primary-blue hover:bg-blue-600 disabled:opacity-55 text-white text-xs font-black rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="size-4 animate-spin-slow" />
              {optimizeMut.isPending ? "Optimizing..." : "Optimize"}
            </button>
          </div>
        </div>

        {/* 3. THREE-COLUMN RESPONSIVE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT SIDEBAR: Day Navigator */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-5 shadow-sm space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Day Navigator
            </h3>
            <div className="space-y-2">
              {daysList.map((day: any) => {
                const isSelected = day.dayNumber === selectedDayIndex
                return (
                  <button
                    key={day.dayNumber}
                    onClick={() => setSelectedDayIndex(day.dayNumber)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? "bg-blue-50/50 border-primary-blue text-primary-blue dark:bg-blue-950/20 dark:border-blue-500"
                        : "bg-transparent border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <div className={`size-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-primary-blue text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                    }`}>
                      <Calendar className="size-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black">
                        Day {day.dayNumber}: {day.description}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                        {formatDateString(day.date)}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* CENTER CONTENT: Daily Timeline & Cards */}
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-slate-850 dark:text-slate-150">
                  {formatDateString(activeDay?.date || "16 Oct")} - {activeDay?.description || "Tokyo City Tour"}
                </h2>
              </div>

              {/* Map/Timeline View Selector */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setIsMapView(false)}
                  className={`px-3.5 py-1.5 text-[10px] font-black rounded-lg transition-all cursor-pointer ${
                    !isMapView
                      ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm"
                      : "text-slate-400 dark:text-slate-500 hover:text-slate-600"
                  }`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setIsMapView(true)}
                  className={`px-3.5 py-1.5 text-[10px] font-black rounded-lg transition-all cursor-pointer ${
                    isMapView
                      ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm"
                      : "text-slate-400 dark:text-slate-500 hover:text-slate-600"
                  }`}
                >
                  Map View
                </button>
              </div>
            </div>

            {isMapView ? (
              <ItineraryMap activities={activeActivities} />
            ) : (
              <div className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800 space-y-6 pt-2">
                {activeActivities.length === 0 ? (
                  <div className="py-12 text-center">
                    <Info className="size-8 text-slate-350 dark:text-slate-600 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                      No activities added for this day yet.
                    </p>
                  </div>
                ) : (
                  activeActivities.map((act: any, idx: number) => {
                    const isNotesExpanded = expandedNotesId === act.id

                    return (
                      <div key={act.id} className="relative group">
                        {/* Timeline Node */}
                        <div className="absolute -left-[31px] top-1.5 size-4 rounded-full border-2 border-white dark:border-slate-900 bg-primary-blue shadow-sm shrink-0" />

                        {/* Activity Card */}
                        <div className="bg-[#F8F9FB] dark:bg-slate-850 border border-black/5 dark:border-white/5 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all space-y-4">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex gap-3.5">
                              <img
                                src={act.imageUrl}
                                alt={act.name}
                                className="size-14 rounded-2xl object-cover border border-black/5 dark:border-white/5 shrink-0"
                              />
                              <div>
                                <span className="text-[9px] font-black tracking-wider uppercase text-slate-400">
                                  {act.category || "Sightseeing"}
                                </span>
                                <h3 className="text-sm font-black text-slate-800 dark:text-slate-150 mt-0.5">
                                  {act.name}
                                </h3>
                                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-450 dark:text-slate-500 mt-1">
                                  <span className="flex items-center gap-1">
                                    <Clock className="size-3" />
                                    {act.time} ({act.duration})
                                  </span>
                                  {act.budget > 0 ? (
                                    <span className="text-slate-700 dark:text-slate-300 font-extrabold">
                                      ¥{act.budget.toLocaleString()}
                                    </span>
                                  ) : (
                                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                                      Free
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Top right card actions */}
                            <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => setExpandedNotesId(isNotesExpanded ? null : act.id)}
                                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 cursor-pointer"
                                title="Notes"
                              >
                                <FileText className="size-3.5" />
                              </button>
                              <button
                                onClick={() => setShowEditModal(act)}
                                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 cursor-pointer"
                                title="Edit"
                              >
                                <Edit2 className="size-3.5" />
                              </button>
                              <button
                                onClick={() => handleDuplicateActivity(act)}
                                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 cursor-pointer"
                                title="Duplicate"
                              >
                                <Copy className="size-3.5" />
                              </button>
                              <button
                                onClick={() => deleteActivityMut.mutate(act.id)}
                                className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg text-red-500 cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Address & Description */}
                          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 space-y-1.5">
                            <p>{act.description}</p>
                            {act.address && (
                              <p className="text-[10px] text-slate-400 flex items-center gap-1">
                                <MapPin className="size-3" />
                                {act.address}
                              </p>
                            )}
                          </div>

                          {/* Expandable Notes */}
                          {isNotesExpanded && (
                            <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 p-3 rounded-2xl text-[11px] font-bold text-slate-555 dark:text-slate-400">
                              <span className="uppercase text-[9px] tracking-wide text-slate-400 block mb-1">
                                AI Notes & Recommendations
                              </span>
                              Try to avoid visiting during local holidays. Ideal photography spot near the main entrance.
                            </div>
                          )}

                          {/* Transit element after card */}
                          {idx < activeActivities.length - 1 && (
                            <div className="absolute left-[8px] -bottom-[32px] z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[9px] font-black text-slate-500 dark:text-slate-400 border border-black/5 dark:border-white/5">
                              <Train className="size-3" />
                              <span>Metro • 15m</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR: AI Optimization, Weather, Crowd, Budget */}
          <div className="lg:col-span-3 space-y-6">
            {/* AI Optimization Card */}
            <div className="bg-white dark:bg-slate-900 border-l-4 border-l-orange-500 border-y border-r border-black/5 dark:border-white/5 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <Sparkles className="size-4 animate-pulse" />
                <h4 className="text-[11px] font-black uppercase tracking-wider">
                  AI Optimization
                </h4>
              </div>
              <p className="text-xs font-semibold text-slate-550 dark:text-slate-400 leading-relaxed">
                Reorder Skytree to 05:00 PM for sunset views and swap transit to avoid rush hour. Saves <span className="font-extrabold text-orange-500">40 mins</span>.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => optimizeMut.mutate()}
                  className="flex-1 py-2 bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 text-[10px] font-black rounded-xl transition-all cursor-pointer"
                >
                  Apply Update
                </button>
                <button
                  onClick={() => alert("Recommendation dismissed.")}
                  className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-450 text-[10px] font-black rounded-xl border border-black/5 dark:border-white/5 transition-all cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>

            {/* Weather Card */}
            <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-5 shadow-sm flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide">
                  Weather
                </span>
                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">
                  {weather?.temperature || 18}°C
                </h3>
                <p className="text-[10px] font-bold text-slate-450 dark:text-slate-500 mt-0.5">
                  {weather?.conditionText || "Cool & Clear"}
                </p>
              </div>
              <div className="size-11 rounded-2xl bg-blue-50 dark:bg-blue-950/20 text-primary-blue flex items-center justify-center shrink-0">
                <Sun className="size-5.5 animate-spin-slow" />
              </div>
            </div>

            {/* Crowd Density Card */}
            <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-5 shadow-sm flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide">
                  Crowd Density
                </span>
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mt-1">
                  {crowds?.densityLevel || "Medium"}
                </h3>
                <p className="text-[10px] font-bold text-slate-450 dark:text-slate-500 mt-0.5">
                  Manageable
                </p>
              </div>
              <div className="size-11 rounded-2xl bg-violet-50 dark:bg-violet-950/20 text-violet-500 flex items-center justify-center shrink-0">
                <Users className="size-5.5" />
              </div>
            </div>

            {/* Budget Card */}
            <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide block">
                    Budget
                  </span>
                  <span className="text-sm font-black text-slate-800 dark:text-slate-150 block mt-0.5">
                    ¥{(budget?.spentBudget || 124000).toLocaleString()} <span className="text-[10px] text-slate-400">/ ¥{(budget?.totalBudget || 200000).toLocaleString()}</span>
                  </span>
                </div>
                <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/25 dark:text-emerald-450 py-1 px-2.5 rounded-full">
                  On Track
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-primary-blue h-full rounded-full transition-all duration-300"
                  style={{ width: `${((budget?.spentBudget || 124000) / (budget?.totalBudget || 200000)) * 100}%` }}
                />
              </div>
              <span className="text-[9px] font-bold text-slate-400 block">
                {((budget?.spentBudget || 124000) / (budget?.totalBudget || 200000) * 100).toFixed(0)}% Spent
              </span>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM PANEL: Daily Summary */}
        <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">
            Daily Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-6 text-center">
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase block">
                Walking Distance
              </span>
              <span className="text-sm font-black text-slate-850 dark:text-slate-150 mt-1 block">
                6.4 km
              </span>
            </div>
            <div className="h-10 w-px bg-slate-100 dark:bg-slate-800 hidden md:block" />
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase block">
                Travel Time
              </span>
              <span className="text-sm font-black text-slate-850 dark:text-slate-150 mt-1 block">
                55 min
              </span>
            </div>
            <div className="h-10 w-px bg-slate-100 dark:bg-slate-800 hidden md:block" />
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase block">
                Activities
              </span>
              <span className="text-sm font-black text-slate-850 dark:text-slate-150 mt-1 block">
                {activeActivities.length}
              </span>
            </div>
            <div className="h-10 w-px bg-slate-100 dark:bg-slate-800 hidden md:block" />
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase block">
                Estimated Spend
              </span>
              <span className="text-sm font-black text-slate-850 dark:text-slate-150 mt-1 block">
                ¥{activeActivities.reduce((acc, act) => acc + act.budget, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* 5. ASK AI Panel dialog */}
        <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary-blue animate-pulse" />
            <h3 className="text-sm font-black text-slate-850 dark:text-slate-150">
              Ask AI Assistant
            </h3>
          </div>
          <form onSubmit={handleAskAiSubmit} className="flex gap-3">
            <input
              id="ai-ask-input"
              type="text"
              placeholder="e.g. Move Skytree to sunset, Add sushi dinner nearby..."
              value={aiCommand}
              onChange={(e) => setAiCommand(e.target.value)}
              className="flex-1 bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-primary-blue"
            />
            <button
              type="submit"
              className="bg-primary-blue hover:bg-blue-600 text-white rounded-2xl px-6 text-xs font-black shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Ask
            </button>
          </form>
        </div>
      </div>

      {/* 6. MODALS / FORMS POPUPS */}
      <AnimatePresence>
        {/* ADD ACTIVITY MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-2xl w-full max-w-md relative z-10 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-100">
                  Add Activity to Day {selectedDayIndex}
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400"
                >
                  <X className="size-4" />
                </button>
              </div>

              <form onSubmit={handleAddActivitySubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    Activity Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newActName}
                    onChange={(e) => setNewActName(e.target.value)}
                    className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-primary-blue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">
                      Time
                    </label>
                    <input
                      type="text"
                      value={newActTime}
                      onChange={(e) => setNewActTime(e.target.value)}
                      className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-primary-blue"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={newActDuration}
                      onChange={(e) => setNewActDuration(e.target.value)}
                      className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-primary-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">
                      Category
                    </label>
                    <input
                      type="text"
                      value={newActCategory}
                      onChange={(e) => setNewActCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-primary-blue"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">
                      Budget Amount
                    </label>
                    <input
                      type="number"
                      value={newActBudget}
                      onChange={(e) => setNewActBudget(e.target.value)}
                      className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-primary-blue"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    Location Address
                  </label>
                  <input
                    type="text"
                    value={newActAddress}
                    onChange={(e) => setNewActAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-primary-blue"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    Description
                  </label>
                  <textarea
                    value={newActDescription}
                    onChange={(e) => setNewActDescription(e.target.value)}
                    className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-primary-blue h-16 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-blue hover:bg-blue-600 text-white rounded-xl py-3 text-xs font-black shadow-md hover:shadow-lg transition-all"
                >
                  Create Activity
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* EDIT ACTIVITY MODAL */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(null)}
              className="absolute inset-0 bg-black"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-2xl w-full max-w-md relative z-10 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-100">
                  Edit Activity details
                </h3>
                <button
                  onClick={() => setShowEditModal(null)}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400"
                >
                  <X className="size-4" />
                </button>
              </div>

              <form onSubmit={handleEditActivitySubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    Activity Name
                  </label>
                  <input
                    type="text"
                    required
                    value={showEditModal.name}
                    onChange={(e) => setShowEditModal({ ...showEditModal, name: e.target.value })}
                    className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-primary-blue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">
                      Time
                    </label>
                    <input
                      type="text"
                      value={showEditModal.time}
                      onChange={(e) => setShowEditModal({ ...showEditModal, time: e.target.value })}
                      className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-primary-blue"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={showEditModal.duration}
                      onChange={(e) => setShowEditModal({ ...showEditModal, duration: e.target.value })}
                      className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-primary-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">
                      Category
                    </label>
                    <input
                      type="text"
                      value={showEditModal.category}
                      onChange={(e) => setShowEditModal({ ...showEditModal, category: e.target.value })}
                      className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-primary-blue"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">
                      Budget Amount
                    </label>
                    <input
                      type="number"
                      value={showEditModal.budget}
                      onChange={(e) => setShowEditModal({ ...showEditModal, budget: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-primary-blue"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    Location Address
                  </label>
                  <input
                    type="text"
                    value={showEditModal.address}
                    onChange={(e) => setShowEditModal({ ...showEditModal, address: e.target.value })}
                    className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-primary-blue"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    Description
                  </label>
                  <textarea
                    value={showEditModal.description}
                    onChange={(e) => setShowEditModal({ ...showEditModal, description: e.target.value })}
                    className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-primary-blue h-16 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-blue hover:bg-blue-600 text-white rounded-xl py-3 text-xs font-black shadow-md hover:shadow-lg transition-all"
                >
                  Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ItineraryPage({ tripId }: ItineraryPageProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ItineraryContent tripId={tripId} />
    </QueryClientProvider>
  )
}
export default ItineraryPage
