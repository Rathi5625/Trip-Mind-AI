import {
  PARIS_DETAILS,
  PARIS_ATTRACTIONS,
  PARIS_BUDGETS,
  PARIS_SECRETS,
  PARIS_SAVINGS,
  PARIS_SEASONS,
  PARIS_SIMILAR
} from "../constants/destinationData"
import {
  DestinationDetails,
  Attraction,
  BudgetOption,
  SecretItem,
  SavingTip,
  TimeSeason,
  ComparisonVibe
} from "../types/destination"

export const getDestinationById = async (
  id: string
): Promise<DestinationDetails> => {
  await new Promise((resolve) => setTimeout(resolve, 150))
  // Default to Paris details if not found
  return PARIS_DETAILS
}

export const getAttractions = async (): Promise<Attraction[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return PARIS_ATTRACTIONS
}

export const getBudgetProfiles = async (): Promise<BudgetOption[]> => {
  return PARIS_BUDGETS
}

export const getLocalSecrets = async (): Promise<SecretItem[]> => {
  return PARIS_SECRETS
}

export const getSavingTips = async (): Promise<SavingTip[]> => {
  return PARIS_SAVINGS
}

export const getSeasons = async (): Promise<TimeSeason[]> => {
  return PARIS_SEASONS
}

export const getSimilarDestinations = async (): Promise<ComparisonVibe[]> => {
  return PARIS_SIMILAR
}
