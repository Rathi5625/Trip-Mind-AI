import { useTravelDatesStore } from "../store/travelDatesStore"

export function useCalendar() {
  const { currentMonth } = useTravelDatesStore()

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear()
    const month = date.getMonth()
    
    // First day of active month
    const firstDay = new Date(year, month, 1)
    const firstDayIndex = firstDay.getDay() // 0 = Sunday, 1 = Monday etc.

    // Last day of active month
    const lastDay = new Date(year, month + 1, 0)
    const daysCount = lastDay.getDate()

    const days: Date[] = []

    // Padding from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i))
    }

    // Current month days
    for (let i = 1; i <= daysCount; i++) {
      days.push(new Date(year, month, i))
    }

    // Padding for next month to complete 6 rows (42 grid items)
    const remaining = 42 - days.length
    for (let i = 1; i <= remaining; i++) {
      days.push(new Date(year, month + 1, i))
    }

    return days
  }

  return {
    days: getDaysInMonth(currentMonth),
    currentMonth,
  }
}
