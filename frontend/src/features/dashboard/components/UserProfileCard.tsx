"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, LogOut } from "lucide-react"

interface UserProfileCardProps {
  name: string
  role: string
  avatarInitials: string
  isCollapsed?: boolean
}

export function UserProfileCard({
  name,
  role,
  avatarInitials,
  isCollapsed = false,
}: UserProfileCardProps) {
  return (
    <div className="relative w-full rounded-2xl border border-black/5 bg-white/60 p-3 shadow-sm backdrop-blur-md transition-all dark:border-white/5 dark:bg-slate-900/60">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-blue text-sm font-bold text-white shadow-md shadow-blue-500/20">
          {avatarInitials}
        </div>

        {/* User Details */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex flex-1 flex-col overflow-hidden text-left"
          >
            <span className="truncate text-sm font-bold text-slate-800 dark:text-slate-200">
              {name}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
              <ShieldCheck className="size-3 text-blue-500 shrink-0" />
              {role}
            </span>
          </motion.div>
        )}

        {/* Action Toggle (Logout/Settings shortcut) */}
        {!isCollapsed && (
          <button
            aria-label="Logout"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-colors"
          >
            <LogOut className="size-4" />
          </button>
        )}
      </div>
    </div>
  )
}
