import { useBudgetStore } from "../store/budgetStore"
import { CURRENCY_CONFIGS } from "../constants/budgetPresets"

export function useCurrency() {
  const currency = useBudgetStore((state) => state.currency)
  const config = CURRENCY_CONFIGS[currency]

  const convertFromUSD = (usdValue: number): number => {
    return Math.round(usdValue * config.rate)
  }

  const convertToUSD = (localValue: number): number => {
    return Math.round(localValue / config.rate)
  }

  const formatValue = (usdValue: number): string => {
    const converted = convertFromUSD(usdValue)
    return `${config.symbol}${converted.toLocaleString()}`
  }

  return {
    currency,
    symbol: config.symbol,
    rate: config.rate,
    convertFromUSD,
    convertToUSD,
    formatValue
  }
}
