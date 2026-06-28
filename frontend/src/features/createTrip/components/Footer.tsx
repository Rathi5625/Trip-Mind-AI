"use client"

import * as React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-white/5 py-12 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">✈️</span>
            <span className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight">
              Trip Mind AI
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 leading-relaxed max-w-xs">
            Your intelligent companion for crafting unforgettable luxury journeys with ease and precision.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-3">
          <h5 className="text-[9.5px] font-black uppercase text-slate-850 dark:text-slate-200 tracking-wider">
            Product
          </h5>
          <ul className="space-y-2 text-[10px] font-bold text-slate-500 dark:text-slate-455">
            <li>
              <Link href="#features" className="hover:text-blue-500 transition-colors">Features</Link>
            </li>
            <li>
              <Link href="#pricing" className="hover:text-blue-500 transition-colors">Pricing</Link>
            </li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-3">
          <h5 className="text-[9.5px] font-black uppercase text-slate-850 dark:text-slate-200 tracking-wider">
            Company
          </h5>
          <ul className="space-y-2 text-[10px] font-bold text-slate-500 dark:text-slate-455">
            <li>
              <Link href="#about" className="hover:text-blue-500 transition-colors">About</Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-blue-500 transition-colors">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Links Column 3 */}
        <div className="space-y-3">
          <h5 className="text-[9.5px] font-black uppercase text-slate-850 dark:text-slate-200 tracking-wider">
            Legal
          </h5>
          <ul className="space-y-2 text-[10px] font-bold text-slate-500 dark:text-slate-455">
            <li>
              <Link href="#privacy" className="hover:text-blue-500 transition-colors">Privacy</Link>
            </li>
            <li>
              <Link href="#terms" className="hover:text-blue-500 transition-colors">Terms</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[9px] font-bold text-slate-400 dark:text-slate-550">
        <span>© 2026 Trip Mind AI. All rights reserved.</span>
      </div>
    </footer>
  )
}
