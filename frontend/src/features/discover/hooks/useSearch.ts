import { useDiscoverStore } from "../store/discoverStore"
import { SEARCH_SUGGESTION_CHIPS } from "../constants/discoverConstants"

export function useSearch() {
  const { searchQuery, setSearchQuery } = useDiscoverStore()

  const handleChipClick = (chip: string) => {
    setSearchQuery(chip)
  }

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    alert(`Searching for: "${searchQuery}"`)
  }

  const handleVoiceSearch = () => {
    alert("Voice Search is listening... Try saying 'Take me to a beach in Italy'")
  }

  return {
    searchQuery,
    setSearchQuery,
    suggestionChips: SEARCH_SUGGESTION_CHIPS,
    handleChipClick,
    handleSearchSubmit,
    handleVoiceSearch
  }
}
