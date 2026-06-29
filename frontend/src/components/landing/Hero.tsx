"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { GradientButton } from "@/components/ui/GradientButton"
import { Container } from "@/components/layout/Container"
import { TrustedBy } from "./TrustedBy"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Background Glow Blobs */}
      <div className="absolute top-0 left-[-10%] w-[45%] aspect-square rounded-full bg-accent-pink/20 blur-[130px] -z-10 dark:bg-accent-pink/10" />
      <div className="absolute top-[-10%] right-[-5%] w-[50%] aspect-square rounded-full bg-primary-blue/15 blur-[150px] -z-10 dark:bg-primary-blue/10" />

      <Container className="flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white/40 border border-white/40 shadow-sm backdrop-blur-md dark:bg-white/5 dark:border-white/10 text-slate-800 dark:text-slate-200 mb-6 cursor-default"
        >
          <span className="text-primary-blue animate-pulse">✨</span>
          <span>AI-Powered Travel Intelligence</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
        >
          Plan Your Perfect Journey With{" "}
          <span className="block mt-2 bg-gradient-to-r from-primary-blue via-[#A855F7] to-[#D6A89C] bg-clip-text text-transparent">
            Trip Mind AI
          </span>
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 md:mb-10"
        >
          Experience the world's most advanced travel concierge. Trip Mind AI crafts
          personalized, highly-optimized itineraries in seconds, perfectly balanced
          for your budget, style, and dreams.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 md:mb-20 w-full max-w-md sm:max-w-none"
        >
          <Link href="/planner/create-trip" className="w-full sm:w-auto">
            <GradientButton variant="primary" size="lg" className="w-full sm:w-auto cursor-pointer">
              Start Planning Free
              <ArrowRight className="size-4 ml-1 transition-transform group-hover/button:translate-x-1" />
            </GradientButton>
          </Link>
          <GradientButton variant="secondary" size="lg" className="w-full sm:w-auto">
            <Play className="size-4 mr-1 text-primary-blue fill-primary-blue/20" />
            Watch Demo
          </GradientButton>
        </motion.div>

        {/* Trusted By logo section */}
        <TrustedBy />
      </Container>
    </section>
  )
}
