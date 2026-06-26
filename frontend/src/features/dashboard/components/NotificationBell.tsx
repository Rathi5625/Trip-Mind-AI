"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Flame, CloudSun, CalendarCheck } from "lucide-react"

export function NotificationBell() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      title: "Price Drop Alert",
      message: "Flights to Bali are 18% cheaper right now.",
      time: "2 hours ago",
      icon: Flame,
      iconColor: "text-amber-500 bg-amber-100 dark:bg-amber-950/40",
      unread: true,
    },
    {
      id: 2,
      title: "Weather Insight",
      message: "Best weather in Switzerland starts next month.",
      time: "1 day ago",
      icon: CloudSun,
      iconColor: "text-blue-500 bg-blue-100 dark:bg-blue-950/40",
      unread: false,
    },
    {
      id: 3,
      title: "Booking Completed",
      message: "Tokyo hotel booking confirmed by agent.",
      time: "3 days ago",
      icon: CalendarCheck,
      iconColor: "text-emerald-500 bg-emerald-100 dark:bg-emerald-950/40",
      unread: false,
    },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-full border border-black/5 bg-white/40 shadow-sm backdrop-blur-md transition-all hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="size-4.5 text-slate-600 dark:text-slate-300" />
        
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click closer */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="absolute right-0 mt-2.5 w-80 sm:w-96 rounded-2xl border border-black/5 bg-white/95 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95 z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-2.5 mb-2.5">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  AI Notifications
                </h3>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-xs font-semibold text-primary-blue hover:underline cursor-pointer"
                  >
                    Mark read
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto no-scrollbar">
                {notifications.map((notif) => {
                  const Icon = notif.icon
                  return (
                    <div
                      key={notif.id}
                      className={`flex gap-3 p-2.5 rounded-xl transition-colors cursor-pointer ${
                        notif.unread
                          ? "bg-blue-50/40 hover:bg-blue-50/80 dark:bg-blue-950/10 dark:hover:bg-blue-950/20"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      <div className={`flex size-9 items-center justify-center rounded-lg shrink-0 ${notif.iconColor}`}>
                        <Icon className="size-4.5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                            {notif.title}
                          </p>
                          <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500 shrink-0 ml-2">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
