"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Rocket, Sparkles, Check, Loader2 } from "lucide-react"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { ProgressBar } from "./components/ProgressBar"
import { ProfileSummaryCard } from "./components/ProfileSummaryCard"
import { DestinationShowcase } from "./components/DestinationShowcase"
import { AIConfidencePanel } from "./components/AIConfidencePanel"
import { TravelDNACard } from "./components/TravelDNACard"
import { FirstTripPreview } from "./components/FirstTripPreview"
import { WhatsNextCard } from "./components/WhatsNextCard"
import { ConfettiCanvas } from "./components/ConfettiCanvas"
import { useOnboardingCompletion } from "./hooks/useOnboardingCompletion"

// ─── Loading Analysis Overlay ──────────────────────────────────────────────────
const ANALYSIS_STEPS = [
  "Analysing your travel personality…",
  "Mapping budget to destinations…",
  "Calibrating AI recommendations…",
  "Building your itinerary profile…",
  "Finalising your travel DNA…",
]

function AILoadingOverlay() {
  const [stepIndex, setStepIndex] = React.useState(0)
  const [progressVal, setProgressVal] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, ANALYSIS_STEPS.length - 1))
    }, 400)
    return () => clearInterval(interval)
  }, [])

  // Animate progress bar 0 → 100 over ~2s
  React.useEffect(() => {
    const start = performance.now()
    const dur = 2000
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1)
      setProgressVal(Math.round(t * 100))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-xl"
    >
      {/* Pulsing orb */}
      <div className="relative mb-8">
        <div className="absolute inset-0 w-24 h-24 rounded-full bg-blue-500/20 animate-ping" />
        <div className="relative flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl shadow-blue-500/30">
          <Sparkles className="size-10 text-white animate-pulse" />
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 text-center px-8">
        Personalizing Your Travel AI
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 text-center px-8">
        Hang tight — crafting your unique travel DNA.
      </p>

      {/* Progress bar */}
      <div className="w-72 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
          style={{ width: `${progressVal}%` }}
        />
      </div>

      {/* Analysis steps list */}
      <div className="space-y-2 w-72">
        {ANALYSIS_STEPS.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: i <= stepIndex ? 1 : 0.2, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2.5 text-sm font-medium text-slate-600 dark:text-slate-400"
          >
            {i < stepIndex ? (
              <Check className="size-4 text-emerald-500 shrink-0" />
            ) : i === stepIndex ? (
              <Loader2 className="size-4 text-blue-500 shrink-0 animate-spin" />
            ) : (
              <div className="size-4 rounded-full border-2 border-slate-200 dark:border-slate-700 shrink-0" />
            )}
            {step}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Main CompletionPage ───────────────────────────────────────────────────────
export default function CompletionPage() {
  const {
    isLoading,
    animationPhase,
    travelerTypeLabels,
    travelerTypeEmojis,
    budgetLabel,
    budgetRange,
    durationLabel,
    groupLabel,
    paceLabel,
    selectedDestinationsData,
    estimatedBudget,
    aiConfidence,
    focusAreas,
    explorerScore,
    dnaDimensions,
    firstTrip,
    handleGoToDashboard,
    handleEditProfile,
  } = useOnboardingCompletion()

  // Show confetti 2.2s after page mounts (when loading overlay disappears)
  const [showConfetti, setShowConfetti] = React.useState(false)
  React.useEffect(() => {
    const t = setTimeout(() => setShowConfetti(true), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {/* Confetti particles — fires when loading overlay exits */}
      {showConfetti && <ConfettiCanvas duration={2500} />}

      {/* AI Loading overlay */}
      <AnimatePresence>{isLoading && <AILoadingOverlay />}</AnimatePresence>

      <div className="relative min-h-screen w-full flex flex-col py-8 px-6 sm:px-12 md:px-16 lg:px-20 bg-[#F8F9FB] dark:bg-[#0B0F19] transition-colors duration-300 font-sans overflow-y-auto pb-28 md:pb-12">
        {/* Ambient gradient blobs */}
        <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden">
          <div className="absolute top-[5%] right-[3%] w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] dark:bg-blue-500/3" />
          <div className="absolute bottom-[15%] left-[5%] w-96 h-96 bg-indigo-500/5 rounded-full blur-[140px] dark:bg-indigo-500/2" />
          <div className="absolute top-[40%] left-[40%] w-64 h-64 bg-emerald-500/4 rounded-full blur-[100px] dark:bg-emerald-500/2" />
        </div>

        {/* Dotted wavy background pattern */}
        <div className="absolute inset-0 pointer-events-none -z-10 opacity-60 dark:opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wavy-step5" width="200" height="120" patternUnits="userSpaceOnUse">
                <path d="M 0 60 Q 50 30, 100 60 T 200 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" className="text-slate-300 dark:text-slate-800" />
                <path d="M 0 100 Q 50 70, 100 100 T 200 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" className="text-slate-300 dark:text-slate-800" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wavy-step5)" />
          </svg>
        </div>

        {/* Theme toggle */}
        <div className="absolute top-6 right-6 z-30">
          <ThemeToggle />
        </div>

        {/* Step progress */}
        <ProgressBar currentStep={5} totalSteps={5} progressPercent={100} />

        {/* Main content — slides in with spring after loading overlay */}
        <AnimatePresence>
          {animationPhase !== "loading" && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="my-auto w-full max-w-6xl mx-auto z-10 py-4"
            >
              {/* ── Hero Header ── */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.05 }}
                  className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/40 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm"
                >
                  <span className="text-base">🎉</span>
                  Profile Complete — AI Ready
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.12 }}
                  className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3 leading-tight tracking-tight"
                >
                  Your Travel Profile Is Ready
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    AI Concierge Activated ✨
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.22 }}
                  className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed"
                >
                  We&apos;ve built your personalized travel DNA. Every recommendation,
                  itinerary and budget insight will be tailored just for you.
                </motion.p>
              </div>

              {/* ── Three-column layout ── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

                {/* Left column — profile + DNA */}
                <div className="lg:col-span-4 space-y-5">
                  {/* Profile Summary */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.28, ease: "easeOut" }}
                  >
                    <ProfileSummaryCard
                      travelerTypeLabels={travelerTypeLabels}
                      travelerTypeEmojis={travelerTypeEmojis}
                      budgetLabel={budgetLabel}
                      budgetRange={budgetRange}
                      durationLabel={durationLabel}
                      groupLabel={groupLabel}
                      paceLabel={paceLabel}
                      onEdit={handleEditProfile}
                    />
                  </motion.div>

                  {/* Travel DNA Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.36, ease: "easeOut" }}
                  >
                    <TravelDNACard
                      explorerScore={explorerScore}
                      dimensions={dnaDimensions}
                    />
                  </motion.div>
                </div>

                {/* Centre column — first trip + destinations */}
                <div className="lg:col-span-5 space-y-5">
                  {/* First Trip AI Preview */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32, ease: "easeOut" }}
                  >
                    <FirstTripPreview trip={firstTrip} />
                  </motion.div>

                  {/* Destinations Showcase */}
                  {selectedDestinationsData.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.42, ease: "easeOut" }}
                    >
                      <DestinationShowcase destinations={selectedDestinationsData} />
                    </motion.div>
                  )}

                  {/* What's Next */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.50, ease: "easeOut" }}
                  >
                    <WhatsNextCard />
                  </motion.div>
                </div>

                {/* Right column — AI confidence */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.38, ease: "easeOut" }}
                  className="lg:col-span-3 lg:sticky lg:top-8"
                >
                  <AIConfidencePanel
                    estimatedBudget={estimatedBudget}
                    aiConfidence={aiConfidence}
                    focusAreas={focusAreas}
                  />
                </motion.div>
              </div>

              {/* ── CTA Buttons ── */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              >
                <button
                  id="go-to-dashboard-btn"
                  onClick={handleGoToDashboard}
                  className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98]"
                >
                  <Rocket className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  Start Exploring
                  <span className="text-blue-200">→</span>
                </button>

                <button
                  id="edit-profile-btn"
                  onClick={handleEditProfile}
                  className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-semibold text-sm px-6 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-800/60 transition-all duration-200"
                >
                  Edit My Profile
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                className="text-center text-[11px] text-slate-400 dark:text-slate-600 mt-5"
              >
                🔒 Your data is private and never shared. You can update your profile anytime.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
