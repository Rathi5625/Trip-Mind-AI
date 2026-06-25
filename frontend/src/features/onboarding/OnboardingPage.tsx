"use client"

import * as React from "react"
import { useOnboarding } from "./hooks/useOnboarding"
import { ProgressBar } from "./components/ProgressBar"
import { WelcomeCard } from "./components/WelcomeCard"
import { PrivacyNotice } from "./components/PrivacyNotice"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export default function OnboardingPage() {
  const { currentStep, totalSteps, progressPercent, nextStep } = useOnboarding()

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between py-8 px-6 sm:px-12 md:px-16 lg:px-20 bg-[#F8F9FB] dark:bg-[#0B0F19] transition-colors duration-300 font-sans overflow-hidden">
      {/* Dynamic Dotted Wavy Lines SVG Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-70 dark:opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wavy-pattern" width="200" height="120" patternUnits="userSpaceOnUse">
              <path
                d="M 0 60 Q 50 30, 100 60 T 200 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                className="text-slate-250 dark:text-slate-800"
              />
              <path
                d="M 0 100 Q 50 70, 100 100 T 200 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                className="text-slate-250 dark:text-slate-800"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wavy-pattern)" />
        </svg>
      </div>

      {/* Floating Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Top Section: Progress Bar */}
      <div className="w-full flex justify-center pt-4">
        <ProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          progressPercent={progressPercent}
        />
      </div>

      {/* Center Section: Welcome Card */}
      <div className="my-auto flex flex-col items-center justify-center w-full max-w-4xl mx-auto z-10 py-6">
        <WelcomeCard onNext={nextStep} />
      </div>

      {/* Bottom Section: Privacy notice */}
      <div className="w-full flex justify-center pb-2">
        <PrivacyNotice />
      </div>
    </div>
  )
}
