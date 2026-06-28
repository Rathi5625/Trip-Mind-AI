import { useTravelersStore } from "../store/travelersStore"

export function useRequirements() {
  const requirements = useTravelersStore((state) => state.requirements)
  const toggleRequirement = useTravelersStore((state) => state.toggleRequirement)

  return {
    requirements,
    toggleRequirement
  }
}
