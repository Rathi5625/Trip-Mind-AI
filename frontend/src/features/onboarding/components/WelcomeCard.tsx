"use client"

import * as React from "react"
import { Plane, Check } from "lucide-react"
import { motion } from "framer-motion"
import { IllustrationCard } from "./IllustrationCard"
import { NextButton } from "./NextButton"
import { StepContainer } from "./StepContainer"

interface WelcomeCardProps {
  onNext: () => void
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function WelcomeCard({ onNext }: WelcomeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white dark:bg-slate-900/60 border border-black/5 dark:border-white/5 rounded-3xl p-8 sm:p-10 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] backdrop-blur-xl font-sans"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Right side illustration container (placed first on mobile, second on desktop) */}
        <div className="order-first md:order-last w-full flex justify-center">
          <IllustrationCard />
        </div>

        {/* Left side onboarding welcome content */}
        <div className="order-last md:order-first flex flex-col justify-center items-start text-left">
          <StepContainer>
            {/* Top airplane badge */}
            <motion.div
              variants={itemVariants}
              className="flex size-11 items-center justify-center rounded-full bg-primary-blue text-white shadow-md shadow-blue-500/20"
            >
              <Plane className="size-5 rotate-45" />
            </motion.div>

            {/* Typography Headers */}
            <motion.div variants={itemVariants} className="space-y-1.5 mt-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Welcome to <br />
                <span className="text-primary-blue dark:text-blue-400">Trip Mind AI</span>
              </h1>
            </motion.div>

            {/* AI Concierge Introduction Card */}
            <motion.div
              variants={itemVariants}
              className="w-full max-w-md bg-[#F0F4FF]/40 border border-blue-500/5 dark:bg-slate-900/30 dark:border-white/5 rounded-2xl p-4.5 space-y-1.5"
            >
              <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 select-none">
                <span>🤖</span> Meet Your AI Travel Concierge
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                We&apos;ll learn about your travel style in under 60 seconds and create personalized itineraries, budget insights, and destination recommendations tailored just for you.
              </p>
            </motion.div>

            {/* Upcoming Steps Preview */}
            <motion.div variants={itemVariants} className="w-full max-w-md space-y-2">
              <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 select-none">
                Onboarding Overview
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-0.5">
                {[
                  "Travel Style",
                  "Budget Preferences",
                  "Favorite Destinations",
                  "AI Personalization",
                  "Ready to Explore",
                ].map((step) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                      <Check className="size-2.5 stroke-[3.5]" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA action button */}
            <motion.div variants={itemVariants} className="pt-2 w-full sm:w-auto">
              <NextButton onClick={onNext} />
            </motion.div>
          </StepContainer>
        </div>
      </div>
    </motion.div>
  )
}
