"use client"

import * as React from "react"
import { motion } from "framer-motion"

const partners = [
  { name: "airbnb", font: "font-sans font-bold tracking-tight text-xl text-rose-500" },
  { name: "Booking.com", font: "font-sans font-black tracking-tight text-xl text-blue-600" },
  { name: "Expedia", font: "font-serif italic font-extrabold text-xl text-amber-500" },
  { name: "KAYAK", font: "font-sans font-extrabold uppercase tracking-tighter text-xl text-orange-500" },
]

export function TrustedBy() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="w-full max-w-4xl border-t border-black/5 dark:border-white/5 pt-10"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
        Trusted by Travelers Worldwide
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 md:gap-x-16">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className={`${partner.font} opacity-60 hover:opacity-100 transition-opacity duration-300 select-none cursor-default`}
          >
            {partner.name}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
