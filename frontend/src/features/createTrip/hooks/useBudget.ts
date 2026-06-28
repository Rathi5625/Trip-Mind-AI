import { useBudgetStore } from "../store/budgetStore"

export function useBudget() {
  const store = useBudgetStore()
  return {
    ...store
  }
}
