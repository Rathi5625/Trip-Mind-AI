"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  User, Settings, MapPin, Heart, Bell, Shield, CreditCard,
  ChevronRight, LogOut, Edit3, Globe2, Camera
} from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export default function ProfilePage() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const menuSections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Personal Information", href: "#" },
        { icon: Globe2, label: "Travel Preferences", href: "#" },
        { icon: MapPin, label: "Saved Places", href: "#" },
        { icon: Heart, label: "Wishlist", href: "#" },
      ]
    },
    {
      title: "Settings",
      items: [
        { icon: Bell, label: "Notifications", href: "#" },
        { icon: Shield, label: "Privacy & Security", href: "#" },
        { icon: CreditCard, label: "Billing & Subscription", href: "#" },
        { icon: Settings, label: "App Preferences", href: "#" },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#0B0F19] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-black/5 bg-white/60 px-4 backdrop-blur-md dark:border-white/5 dark:bg-slate-950/40 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-xl bg-primary-blue text-white">
            <Globe2 className="size-4.5" />
          </div>
          <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">Trip Mind AI</span>
        </Link>
        <ThemeToggle />
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Hero */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl border border-black/5 dark:border-white/5 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-sm p-6 text-center"
        >
          <div className="relative inline-block mb-4">
            <div className="size-20 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-500/20">
              {user?.name?.charAt(0) ?? "T"}
            </div>
            <button
              className="absolute -bottom-1 -right-1 size-7 rounded-full bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 shadow flex items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title="Change photo"
            >
              <Camera className="size-3.5 text-slate-500" />
            </button>
          </div>
          <h1 className="text-xl font-black text-slate-800 dark:text-slate-100">{user?.name ?? "Traveler"}</h1>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">{user?.email ?? "traveler@tripmind.ai"}</p>
          <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-blue/10 text-primary-blue dark:text-blue-400 text-xs font-bold">
            ✨ Pro Member
          </div>

          <button
            onClick={() => {}}
            className="mt-4 flex items-center gap-1.5 mx-auto px-4 py-2 rounded-xl border border-black/5 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Edit3 className="size-3.5" />
            Edit Profile
          </button>
        </motion.div>

        {/* Menu Sections */}
        {menuSections.map((section, sIdx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (sIdx + 1) }}
            className="rounded-3xl border border-black/5 dark:border-white/5 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-sm overflow-hidden"
          >
            <div className="px-5 pt-4 pb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {section.title}
              </span>
            </div>
            <div className="divide-y divide-black/5 dark:divide-white/5">
              {section.items.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <Icon className="size-4 text-slate-500 dark:text-slate-400" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.label}</span>
                    </div>
                    <ChevronRight className="size-4 text-slate-400 group-hover:text-primary-blue transition-colors" />
                  </Link>
                )
              })}
            </div>
          </motion.div>
        ))}

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-sm font-bold hover:bg-rose-100 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
        >
          <LogOut className="size-4" />
          Sign Out
        </motion.button>
      </div>
    </div>
  )
}
