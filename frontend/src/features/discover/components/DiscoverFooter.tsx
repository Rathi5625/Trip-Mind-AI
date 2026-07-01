"use client"

import * as React from "react"
import Link from "next/link"

export function DiscoverFooter() {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Travel Blog", href: "/blog" },
        { label: "Destinations Map", href: "/map" },
        { label: "Guides & Guides", href: "/guides" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Safety Advice", href: "/safety" },
        { label: "Privacy Policy", href: "/privacy" }
      ]
    }
  ]

  return (
    <footer className="w-full border-t border-black/5 bg-white/40 dark:border-white/5 dark:bg-slate-900/10 backdrop-blur-md select-none text-left py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Leftmost Column logo */}
        <div className="space-y-3.5 col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">✈️</span>
            <span className="text-sm font-black text-slate-805 dark:text-slate-100 tracking-tight">
              VoyageAI
            </span>
          </Link>
          <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-550 leading-relaxed max-w-[200px]">
            Building the future of personalized AI-curated travel and dynamic itinerary planning.
          </p>
        </div>

        {/* Dynamic columns */}
        {footerLinks.map((col) => (
          <div key={col.title} className="space-y-4">
            <h4 className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-550 tracking-wider">
              {col.title}
            </h4>
            <ul className="space-y-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-blue-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* Copy bottom */}
      <div className="max-w-6xl mx-auto border-t border-black/5 dark:border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] font-semibold text-slate-400 dark:text-slate-550 gap-4">
        <span>© {new Date().getFullYear()} VoyageAI Inc. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/terms" className="hover:text-blue-500">Terms of Service</Link>
          <Link href="/cookies" className="hover:text-blue-500">Cookie Settings</Link>
        </div>
      </div>

    </footer>
  )
}
