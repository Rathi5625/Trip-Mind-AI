"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { geocodePlace, type GeocodingResult } from "../services/geocoding.service"

export interface UseSearchOptions {
  debounceMs?: number
  limit?: number
}

export function useSearch(options?: UseSearchOptions) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<GeocodingResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const debounceMs = options?.debounceMs ?? 300
  const limit = options?.limit ?? 5
  
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const triggerSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery || searchQuery.trim().length < 2) {
        setResults([])
        return
      }

      setIsLoading(true)
      setError(null)
      try {
        const data = await geocodePlace(searchQuery, { limit })
        setResults(data)
      } catch (err: any) {
        setError(err.message ?? "Search failed")
        setResults([])
      } finally {
        setIsLoading(false)
      }
    },
    [limit]
  )

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    if (!query) {
      setResults([])
      return
    }

    timerRef.current = setTimeout(() => {
      triggerSearch(query)
    }, debounceMs)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query, debounceMs, triggerSearch])

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    clearSearch: () => {
      setQuery("")
      setResults([])
      setError(null)
    }
  }
}
