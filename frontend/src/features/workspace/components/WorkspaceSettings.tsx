"use client"

import * as React from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/services/apiClient"
import { WorkspaceOverview } from "../types/workspace"

interface WorkspaceSettingsProps {
  overview: WorkspaceOverview
}

export function WorkspaceSettings({ overview }: WorkspaceSettingsProps) {
  const queryClient = useQueryClient()

  const [title, setTitle] = React.useState(overview.title)
  const [budgetCategory, setBudgetCategory] = React.useState(overview.budgetCategory)
  const [pace, setPace] = React.useState(overview.pace)
  const [travelersCount, setTravelersCount] = React.useState(overview.travelersCount)

  // Save changes mutation
  const mutation = useMutation({
    mutationFn: (data: any) => apiClient.put(`/api/trips/${overview.tripId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaceOverview", overview.tripId] })
      alert("Trip preferences updated successfully!")
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({
      title,
      startDate: overview.startDate,
      endDate: overview.endDate,
      budgetCategory,
      pace,
      travelersCount,
      isPublic: false
    })
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">
          Trip Settings & Control
        </h2>
        <p className="text-xs font-semibold text-slate-450 dark:text-slate-500 mt-0.5">
          Configure trip metadata, travelers, pace, and sharing controls.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-sm space-y-4">
        {/* Trip Title */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400">
            Trip Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-primary-blue"
          />
        </div>

        {/* Budget Category */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400">
            Budget Category
          </label>
          <select
            value={budgetCategory}
            onChange={(e) => setBudgetCategory(e.target.value)}
            className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-3 text-xs font-bold text-slate-850 dark:text-slate-200 focus:outline-primary-blue"
          >
            <option value="budget">Budget</option>
            <option value="comfort">Comfort</option>
            <option value="premium">Premium</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>

        {/* Travel Pace */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400">
            Travel Pace
          </label>
          <select
            value={pace}
            onChange={(e) => setPace(e.target.value)}
            className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-3 text-xs font-bold text-slate-850 dark:text-slate-200 focus:outline-primary-blue"
          >
            <option value="relaxed">Relaxed</option>
            <option value="balanced">Balanced</option>
            <option value="fast">Fast-Paced</option>
          </select>
        </div>

        {/* Travelers Count */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400">
            Travelers Count
          </label>
          <input
            type="number"
            value={travelersCount}
            onChange={(e) => setTravelersCount(parseInt(e.target.value) || 1)}
            className="w-full bg-slate-50 border border-black/5 dark:bg-slate-850 dark:border-white/5 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-primary-blue"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-primary-blue hover:bg-blue-600 text-white rounded-xl py-3 px-6 text-xs font-black shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            {mutation.isPending ? "Saving..." : "Save Preferences"}
          </button>
        </div>
      </form>
    </div>
  )
}
