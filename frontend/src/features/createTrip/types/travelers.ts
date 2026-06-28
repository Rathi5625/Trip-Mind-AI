export type GroupType = "solo" | "couple" | "friends" | "family" | "business" | "group"

export interface Headcount {
  adults: number
  children: number
  infants: number
}

export interface TravelersState {
  groupType: GroupType
  headcount: Headcount
  requirements: string[]

  setGroupType: (type: GroupType) => void
  updateHeadcount: (field: keyof Headcount, offset: number) => void
  toggleRequirement: (req: string) => void
  resetTravelersStore: () => void
}
