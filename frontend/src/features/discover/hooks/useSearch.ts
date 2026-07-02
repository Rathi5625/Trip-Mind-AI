import { useDiscoverStore } from "../store/discoverStore"
import { SEARCH_SUGGESTION_CHIPS } from "../constants/discoverConstants"
import { useRouter } from "next/navigation"

export function useSearch() {
  const { searchQuery, setSearchQuery } = useDiscoverStore()
  const router = useRouter()

  const handleChipClick = (chip: string) => {
    setSearchQuery(chip)
    router.push(`/discover/search?q=${encodeURIComponent(chip)}`)
  }

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/discover/search?q=${encodeURIComponent(searchQuery)}`)
    }
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
