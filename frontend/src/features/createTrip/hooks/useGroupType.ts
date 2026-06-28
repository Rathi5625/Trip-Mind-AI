import { useTravelersStore } from "../store/travelersStore"
import { GroupType } from "../types/travelers"

export function useGroupType() {
  const groupType = useTravelersStore((state) => state.groupType)
  const setGroupType = useTravelersStore((state) => state.setGroupType)

  return {
    groupType,
    setGroupType
  }
}
