import { BudgetType, DurationType, GroupType, PaceType } from "../types/preferences"
import { User, Heart, Users, Home } from "lucide-react"

export interface BudgetOption {
  id: BudgetType
  title: string
  priceRange: string
}

export interface ChipOption<T> {
  id: T
  label: string
}

export interface GroupOption extends ChipOption<GroupType> {
  icon: any
}

export const BUDGET_OPTIONS: BudgetOption[] = [
  {
    id: "budget",
    title: "Budget Traveler",
    priceRange: "₹20K – ₹50K",
  },
  {
    id: "comfort",
    title: "Comfort Traveler",
    priceRange: "₹50K – ₹150K",
  },
  {
    id: "premium",
    title: "Premium Traveler",
    priceRange: "₹150K – ₹300K",
  },
  {
    id: "luxury",
    title: "Luxury Traveler",
    priceRange: "₹300K+",
  },
]

export const DURATION_OPTIONS: ChipOption<DurationType>[] = [
  { id: "weekend", label: "Weekend" },
  { id: "1-week", label: "1 Week" },
  { id: "2-weeks", label: "2 Weeks" },
  { id: "1-month", label: "1 Month+" },
]

export const GROUP_OPTIONS: GroupOption[] = [
  { id: "solo", label: "Solo", icon: User },
  { id: "couple", label: "Couple", icon: Heart },
  { id: "friends", label: "Friends", icon: Users },
  { id: "family", label: "Family", icon: Home },
]

export const PACE_OPTIONS: ChipOption<PaceType>[] = [
  { id: "relaxed", label: "Relaxed" },
  { id: "balanced", label: "Balanced" },
  { id: "fast-paced", label: "Fast-Paced" },
]
