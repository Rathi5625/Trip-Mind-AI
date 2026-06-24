"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import { Container } from "@/components/layout/Container"

interface Destination {
  id: string
  title: string
  subtitle: string
  image: string
  badges?: string[]
  badgeStyles?: string[]
  heightClass: string
}

const leftDestinations: Destination[] = [
  {
    id: "tokyo",
    title: "Tokyo, Japan",
    subtitle: "Neon lights, ancient temples, and unparalleled culinary experiences.",
    image: "/images/tokyo.png",
    badges: ["All Season 9.8/10", "Best in Spring"],
    badgeStyles: [
      "bg-primary-blue/90 text-white backdrop-blur-sm",
      "bg-white/90 text-slate-900 backdrop-blur-sm",
    ],
    heightClass: "h-[450px]",
  },
  {
    id: "paris",
    title: "Paris, France",
    subtitle: "Art, romance, and timeless elegance.",
    image: "/images/paris.png",
    badges: ["Couples Choice"],
    badgeStyles: ["bg-[#E9E2D0]/90 text-slate-900 backdrop-blur-sm"],
    heightClass: "h-[300px]",
  },
]

const rightDestinations: Destination[] = [
  {
    id: "bali",
    title: "Bali, Indonesia",
    subtitle: "Spiritual retreats & beaches.",
    image: "/images/bali.png",
    heightClass: "h-[230px]",
  },
  {
    id: "zermatt",
    title: "Zermatt, Switzerland",
    subtitle: "Winter sports & alpine beauty.",
    image: "/images/zermatt.png",
    heightClass: "h-[230px]",
  },
  {
    id: "iceland",
    title: "Iceland",
    subtitle: "Raw natural wonders.",
    image: "/images/iceland.png",
    heightClass: "h-[230px]",
  },
]

export function DestinationShowcase() {
  return (
    <section id="discover" className="py-20 md:py-28 relative overflow-hidden bg-slate-50/30 dark:bg-slate-900/5">
      <Container>
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary-blue/5 text-primary-blue dark:bg-primary-blue/10 dark:text-blue-400 mb-4 border border-primary-blue/10 dark:border-blue-500/10">
              Curated by Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Discover destinations perfectly matched to current trends and seasonal optimals.
            </h2>
          </div>
          <Link
            href="#"
            className="group flex items-center gap-1 text-sm font-semibold text-primary-blue dark:text-blue-400 hover:underline shrink-0"
          >
            View all destinations
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
          {/* Left Column (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {leftDestinations.map((dest) => (
              <DestinationCard key={dest.id} dest={dest} />
            ))}
          </div>

          {/* Right Column (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {rightDestinations.map((dest) => (
              <DestinationCard key={dest.id} dest={dest} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-2xl ${dest.heightClass} cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.02)]`}
    >
      {/* Background Image */}
      <Image
        src={dest.image}
        alt={dest.title}
        fill
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

      {/* Badges Overlay */}
      {dest.badges && dest.badges.length > 0 && (
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          {dest.badges.map((badge, index) => (
            <span
              key={badge}
              className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                dest.badgeStyles?.[index] || "bg-white/80 text-slate-900"
              }`}
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end text-white">
        <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary-blue/10 dark:group-hover:text-blue-300/10 transition-colors">
          {dest.title}
        </h3>
        <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
          {dest.subtitle}
        </p>
      </div>
    </motion.div>
  )
}
