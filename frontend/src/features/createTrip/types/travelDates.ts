export interface DateRange {
  start: Date | null
  end: Date | null
}

export interface DateEventBadge {
  dateStr: string // YYYY-MM-DD format
  label: string
  emoji: string
  type: "weather" | "price" | "festival" | "autumn"
  description?: string
  whyVisit?: string
}

export interface SeasonStats {
  weatherTemp: string
  weatherDesc: string
  costIndex: string
  crowdLevel: string
}

export interface TravelDatesState {
  selectedRange: DateRange
  hoveredDate: Date | null
  currentMonth: Date // Active calendar month
  destination: string
  
  setSelectedRange: (range: DateRange) => void
  setHoveredDate: (date: Date | null) => void
  setCurrentMonth: (month: Date) => void
  setDestination: (dest: string) => void
  resetDatesStore: () => void
}
