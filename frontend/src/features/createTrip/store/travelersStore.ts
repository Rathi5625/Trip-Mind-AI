import { create } from "zustand"
import { TravelersState, GroupType, Headcount } from "../types/travelers"

export const useTravelersStore = create<TravelersState>((set) => ({
  groupType: "solo",
  headcount: {
    adults: 1,
    children: 0,
    infants: 0
  },
  requirements: [],

  setGroupType: (groupType) => set((state) => {
    // Automatically set default headcounts based on selected type
    const newHeadcount = { ...state.headcount }
    if (groupType === "solo") {
      newHeadcount.adults = 1
      newHeadcount.children = 0
      newHeadcount.infants = 0
    } else if (groupType === "couple") {
      newHeadcount.adults = 2
      newHeadcount.children = 0
      newHeadcount.infants = 0
    } else if (groupType === "family") {
      newHeadcount.adults = 2
      newHeadcount.children = 1
      newHeadcount.infants = 0
    } else if (groupType === "group") {
      newHeadcount.adults = 6
      newHeadcount.children = 2
      newHeadcount.infants = 0
    }
    return { groupType, headcount: newHeadcount }
  }),
  
  updateHeadcount: (field, offset) => set((state) => {
    const val = state.headcount[field] + offset
    // Constraints: Adults cannot be less than 1, others cannot be less than 0
    const minVal = field === "adults" ? 1 : 0
    const newVal = Math.max(minVal, val)
    
    // Automatically adjust group dynamic if headcounts grow
    let calculatedGroup = state.groupType
    const totalPeople = newVal + (field === "adults" ? state.headcount.children + state.headcount.infants : state.headcount.adults + (field === "children" ? state.headcount.infants : state.headcount.children))
    
    if (totalPeople === 1) {
      calculatedGroup = "solo"
    } else if (totalPeople === 2 && newVal === 2 && field === "adults") {
      calculatedGroup = "couple"
    } else if (totalPeople >= 8) {
      calculatedGroup = "group"
    }
    
    return {
      headcount: {
        ...state.headcount,
        [field]: newVal
      },
      groupType: calculatedGroup
    }
  }),

  toggleRequirement: (req) => set((state) => {
    const isSelected = state.requirements.includes(req)
    const newRequirements = isSelected
      ? state.requirements.filter((r) => r !== req)
      : [...state.requirements, req]
    return { requirements: newRequirements }
  }),

  resetTravelersStore: () => set({
    groupType: "solo",
    headcount: {
      adults: 1,
      children: 0,
      infants: 0
    },
    requirements: []
  })
}))
