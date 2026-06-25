"use client"

import * as React from "react"
import { useTravelPreferences } from "./hooks/useTravelPreferences"
import { ProgressBar } from "./components/ProgressBar"
import { SectionHeader } from "./components/SectionHeader"
import { BudgetSelector } from "./components/BudgetSelector"
import { DurationSelector } from "./components/DurationSelector"
import { GroupSelector } from "./components/GroupSelector"
import { PaceSelector } from "./components/PaceSelector"
import { AIRecommendationCard } from "./components/AIRecommendationCard"
import { PreferenceSummary } from "./components/PreferenceSummary"
import { NavigationButtons } from "./components/NavigationButtons"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { Wallet, Compass } from "lucide-react"
import { motion } from "framer-motion"

export default function TravelPreferencesPage() {
  const {
    budgetValue,
    durationValue,
    groupValue,
    paceValue,
    selectedSummary,
    isValid,
    setPreferenceValue,
    handleSubmit,
    handleBack,
  } = useTravelPreferences()

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between py-8 px-6 sm:px-12 md:px-16 lg:px-20 bg-[#F8F9FB] dark:bg-[#0B0F19] transition-colors duration-300 font-sans overflow-y-auto pb-28 md:pb-8">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] dark:bg-blue-500/2" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-rose-500/5 rounded-full blur-[120px] dark:bg-rose-500/2" />
      </div>

      {/* Dynamic Dotted Wavy Lines SVG Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-70 dark:opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wavy-pattern-step3" width="200" height="120" patternUnits="userSpaceOnUse">
              <path
                d="M 0 60 Q 50 30, 100 60 T 200 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                className="text-slate-200 dark:text-slate-800"
              />
              <path
                d="M 0 100 Q 50 70, 100 100 T 200 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                className="text-slate-200 dark:text-slate-800"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wavy-pattern-step3)" />
        </svg>
      </div>

      {/* Floating Theme Toggle */}
      <div className="absolute top-6 right-6 z-30">
        <ThemeToggle />
      </div>

      {/* Top Progress bar */}
      <ProgressBar currentStep={3} totalSteps={5} progressPercent={60} />

      {/* Main Content Layout Container */}
      <div className="my-auto w-full max-w-5xl mx-auto z-10 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Travel Preferences Selection Form */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 bg-white dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.25)] backdrop-blur-sm"
          >
            {/* Title & Subtitle Headers */}
            <div className="mb-8 select-none">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Shape your journey
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-450 font-medium mt-2 leading-relaxed">
                Tell us more about how you like to travel, and our AI will tailor the perfect itinerary.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              {/* Section 1 - Travel Budget */}
              <div>
                <SectionHeader icon={Wallet} title="Travel Budget" />
                <BudgetSelector
                  value={budgetValue}
                  onChange={(val) => setPreferenceValue("budget", val)}
                />
              </div>

              <div className="h-px bg-slate-100 dark:bg-white/5 w-full" />

              {/* Section 2 - Trip Duration */}
              <div className="space-y-4">
                <span className="text-[10px] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase block select-none">
                  Trip Duration
                </span>
                <DurationSelector
                  value={durationValue}
                  onChange={(val) => setPreferenceValue("duration", val)}
                />
              </div>

              {/* Section 3 - Travel Group */}
              <div className="space-y-4">
                <span className="text-[10px] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase block select-none">
                  Travel Group
                </span>
                <GroupSelector
                  value={groupValue}
                  onChange={(val) => setPreferenceValue("group", val)}
                />
              </div>

              {/* Section 4 - Travel Pace */}
              <div className="space-y-4">
                <span className="text-[10px] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase block select-none">
                  Pace
                </span>
                <PaceSelector
                  value={paceValue}
                  onChange={(val) => setPreferenceValue("pace", val)}
                />
              </div>

              <div className="h-px bg-slate-100 dark:bg-white/5 w-full" />

              {/* Preferences Summary alert text */}
              <PreferenceSummary summaryText={selectedSummary} />
            </form>
          </motion.div>

          {/* Right Column - Real-time AI Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 lg:sticky lg:top-8"
          >
            <AIRecommendationCard
              budget={budgetValue}
              duration={durationValue}
              group={groupValue}
              pace={paceValue}
            />
          </motion.div>

        </div>
      </div>

      {/* Bottom Sticky Navigation CTA Buttons */}
      <NavigationButtons
        isValid={isValid}
        onNext={handleSubmit}
        onSkip={handleBack}
        prevLabel="Back"
        nextLabel="Continue to Final Step"
        showArrow={true}
      />
    </div>
  )
}
