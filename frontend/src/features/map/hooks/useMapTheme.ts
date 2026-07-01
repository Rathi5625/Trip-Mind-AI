"use client"

import { useCallback, useEffect } from "react"
import { useMapStore } from "../store/mapStore"
import type { ThemeId } from "../types/map"
import { MAP_THEMES, DEFAULT_THEME_ID, DEFAULT_DARK_THEME_ID } from "../constants/mapStyles"

export function useMapTheme() {
  const themeId = useMapStore((s) => s.themeId)
  const setThemeId = useMapStore((s) => s.setThemeId)

  // Watch systemic theme changes (if application uses a dark mode helper)
  const syncWithSystemTheme = useCallback(() => {
    if (typeof window === "undefined") return
    const isDark = document.documentElement.classList.contains("dark")
    const targetTheme: ThemeId = isDark ? DEFAULT_DARK_THEME_ID : DEFAULT_THEME_ID
    setThemeId(targetTheme)
  }, [setThemeId])

  const toggleTheme = useCallback(() => {
    const currentTheme = MAP_THEMES.find((t) => t.id === themeId)
    const nextTheme = MAP_THEMES.find((t) => t.isDark !== currentTheme?.isDark)
    if (nextTheme) {
      setThemeId(nextTheme.id)
    }
  }, [themeId, setThemeId])

  const getTheme = useCallback((id: ThemeId) => {
    return MAP_THEMES.find((t) => t.id === id) ?? MAP_THEMES[0]
  }, [])

  const currentTheme = getTheme(themeId)

  return {
    themeId,
    currentTheme,
    themes: MAP_THEMES,
    setThemeId,
    toggleTheme,
    syncWithSystemTheme
  }
}
