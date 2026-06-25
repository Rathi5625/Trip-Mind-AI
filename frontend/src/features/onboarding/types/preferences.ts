export type BudgetType = "budget" | "comfort" | "premium" | "luxury"
export type DurationType = "weekend" | "1-week" | "2-weeks" | "1-month"
export type GroupType = "solo" | "couple" | "friends" | "family"
export type PaceType = "relaxed" | "balanced" | "fast-paced"

export interface TravelPreferences {
  budget: BudgetType | null
  duration: DurationType | null
  group: GroupType | null
  pace: PaceType | null
}
