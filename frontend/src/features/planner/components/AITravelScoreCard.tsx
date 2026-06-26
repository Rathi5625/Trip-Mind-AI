"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Star, Shield, CloudSun, BadgeDollarSign, Users, Sparkles } from "lucide-react"
import { AITravelScoreDetail } from "../types/planner"

interface AITravelScoreCardProps {
  scoreDetail: AITravelScoreDetail
}

export function AITravelScoreCard({ scoreDetail }: AITravelScoreCardProps) {
  const { score, weather, budget, safety, crowdLevel, recommendation } = scoreDetail

  // Function to render stars based on value
  const renderStars = (value: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`size-3 stroke-[2] ${
              star <= value
                ? "fill-amber-400 text-amber-400 dark:fill-amber-400"
                : "text-slate-200 dark:text-slate-800"
            }`}
          />
        ))}
      </div>
    )
  }

  // Circular progress SVG variables
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col p-5 rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900/60 w-full select-none gap-4">
      {/* Header with Title and Premium Sparkle Badge */}
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-blue-500 fill-blue-500/20" />
          AI Travel Score
        </h4>
        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 px-2 py-0.5 rounded-full shadow-sm animate-pulse">
          {recommendation}
        </span>
      </div>

      {/* Main Score Area */}
      <div className="flex items-center gap-4">
        {/* Animated Circular Progress Bar */}
        <div className="relative size-16 shrink-0 flex items-center justify-center">
          <svg className="size-full transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx="32"
              cy="32"
              r={radius}
              className="stroke-slate-100 dark:stroke-slate-800"
              strokeWidth="5"
              fill="transparent"
            />
            {/* Animated Front Circle */}
            <motion.circle
              cx="32"
              cy="32"
              r={radius}
              className="stroke-blue-500 dark:stroke-blue-400"
              strokeWidth="5.5"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          {/* Central Score Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight">
              {score}%
            </span>
            <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Ready
            </span>
          </div>
        </div>

        {/* Score description explanation */}
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-tight">
            High Readiness Score
          </p>
          <p className="text-[10px] text-slate-450 dark:text-slate-500 leading-normal">
            This destination perfectly matches your profile. Ready to export to dashboard.
          </p>
        </div>
      </div>

      {/* Star Ratings Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-2 border-t border-slate-50 dark:border-white/5">
        {/* Weather */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <CloudSun className="size-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span className="text-[10px] font-bold text-slate-505 dark:text-slate-400">Weather</span>
          </div>
          {renderStars(weather)}
        </div>

        {/* Budget */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <BadgeDollarSign className="size-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span className="text-[10px] font-bold text-slate-505 dark:text-slate-400">Budget</span>
          </div>
          {renderStars(budget)}
        </div>

        {/* Safety */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Shield className="size-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span className="text-[10px] font-bold text-slate-505 dark:text-slate-400">Safety</span>
          </div>
          {renderStars(safety)}
        </div>

        {/* Crowd Levels */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Users className="size-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span className="text-[10px] font-bold text-slate-505 dark:text-slate-400">Crowds</span>
          </div>
          {renderStars(crowdLevel)}
        </div>
      </div>
    </div>
  )
}
