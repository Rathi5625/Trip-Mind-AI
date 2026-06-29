"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Compass } from "lucide-react"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { GradientButton } from "@/components/ui/GradientButton"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/", active: true },
  { name: "Discover", href: "/discover" },
  { name: "AI Planner", href: "/planner" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
]


export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl rounded-full border transition-all duration-300",
          isScrolled
            ? "bg-white/70 border-white/40 shadow-lg shadow-black/5 backdrop-blur-xl dark:bg-[#0B0F19]/70 dark:border-white/5 dark:shadow-white/5"
            : "bg-white/40 border-white/20 shadow-sm backdrop-blur-md dark:bg-dark-navy/40 dark:border-white/5"
        )}
      >
        <div className="flex h-14 items-center justify-between px-6 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white group">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary-blue text-white group-hover:rotate-12 transition-transform duration-300">
              <Compass className="size-4" />
            </div>
            <span className="tracking-tight">Trip Mind AI</span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200",
                  item.active
                    ? "bg-primary-blue/5 text-primary-blue dark:bg-primary-blue/10 dark:text-blue-400 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-500/5 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link href="/planner/create-trip">
              <GradientButton variant="primary" size="sm" className="cursor-pointer">
                Get Started
              </GradientButton>
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full text-slate-700 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[92%] rounded-2xl border border-white/20 bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:border-white/5 dark:bg-dark-navy/95 md:hidden"
          >
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-base font-medium py-2 px-3 rounded-lg transition-colors",
                    item.active
                      ? "bg-primary-blue/5 text-primary-blue dark:bg-primary-blue/10 dark:text-blue-400 font-semibold"
                      : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="my-2 border-black/5 dark:border-white/5" />
              <div className="flex flex-col gap-3 mt-1">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-base font-medium text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                >
                  Sign In
                </Link>
                <Link href="/planner/create-trip" onClick={() => setMobileMenuOpen(false)}>
                  <GradientButton variant="primary" size="md" className="cursor-pointer">
                    Get Started
                  </GradientButton>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
