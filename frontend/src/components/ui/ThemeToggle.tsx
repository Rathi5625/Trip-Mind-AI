"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    // Check initial theme from localStorage or document class
    const initialTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
    setTheme(initialTheme)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light"
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
    setTheme(nextTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full border border-black/5 bg-white/40 shadow-sm backdrop-blur-md transition-all hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 180 : 0, scale: theme === "dark" ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-amber-500"
      >
        {theme === "light" && <Sun className="size-4" />}
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: theme === "light" ? -180 : 0, scale: theme === "light" ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute inset-2 text-indigo-400"
      >
        {theme === "dark" && <Moon className="size-4" />}
      </motion.div>
    </button>
  )
}
