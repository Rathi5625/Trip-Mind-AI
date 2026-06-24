"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles, Wallet, Map, Users, PlaneTakeoff, LucideIcon } from "lucide-react"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Container } from "@/components/layout/Container"

interface FeatureItem {
  icon: LucideIcon
  title: string
  description: string
  iconBg: string
  iconColor: string
}

const features: FeatureItem[] = [
  {
    icon: Sparkles,
    title: "AI Itinerary Generation",
    description: "Our core engine analyzes millions of travel data points, reviews, and logistical constraints to build the perfect day-by-day plan tailored specifically to your preferences and pace.",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Wallet,
    title: "Smart Budget Optimization",
    description: "Real-time cost tracking and dynamic suggestions to stretch your travel budget further without sacrificing experience.",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Map,
    title: "Interactive Travel Maps",
    description: "Visual, interactive routing that ensures logical travel flow between destinations.",
    iconBg: "bg-orange-500/10 dark:bg-orange-500/20",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    icon: Users,
    title: "Collaborative Planning",
    description: "Invite friends and family to view, edit, and vote on itinerary items in real-time.",
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: PlaneTakeoff,
    title: "Booking Management",
    description: "Centralize all your flights, hotels, and tour confirmations in one easy-to-access dashboard.",
    iconBg: "bg-pink-500/10 dark:bg-pink-500/20",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
]

export function FeaturesGrid() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  }

  return (
    <section id="features" className="py-20 md:py-28 relative overflow-hidden">
      <Container>
        <SectionHeading
          badge="Beyond Basic Planning"
          title="A comprehensive suite of tools designed to make every aspect of your journey seamless and intelligent."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {features.slice(0, 3).map((feature, idx) => (
            <motion.div key={idx} variants={cardVariants}>
              <GlassPanel hoverEffect={true} className="h-full border-black/5 dark:border-white/5 bg-white/50 dark:bg-slate-950/30 flex flex-col justify-start">
                <div className={`flex size-10 items-center justify-center rounded-xl ${feature.iconBg} ${feature.iconColor} mb-6`}>
                  <feature.icon className="size-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </GlassPanel>
            </motion.div>
          ))}

          {/* Centering the bottom two cards on desktop */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col md:flex-row gap-8 justify-center">
            {features.slice(3, 5).map((feature, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="w-full md:w-[calc(50%-16px)] lg:max-w-[368px]"
              >
                <GlassPanel hoverEffect={true} className="h-full border-black/5 dark:border-white/5 bg-white/50 dark:bg-slate-950/30 flex flex-col justify-start">
                  <div className={`flex size-10 items-center justify-center rounded-xl ${feature.iconBg} ${feature.iconColor} mb-6`}>
                    <feature.icon className="size-5" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
