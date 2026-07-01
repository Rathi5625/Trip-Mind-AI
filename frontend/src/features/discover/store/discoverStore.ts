import { create } from "zustand"
import { DiscoverState } from "../types/discover"

export const useDiscoverStore = create<DiscoverState>((set) => ({
  searchQuery: "",
  activeCategory: "all",
  favorites: [],
  bookmarks: [],
  isAIChatOpen: false,

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  toggleFavorite: (id) => set((state) => ({
    favorites: state.favorites.includes(id)
      ? state.favorites.filter((favId) => favId !== id)
      : [...state.favorites, id]
  })),
  toggleBookmark: (id) => set((state) => ({
    bookmarks: state.bookmarks.includes(id)
      ? state.bookmarks.filter((bkId) => bkId !== id)
      : [...state.bookmarks, id]
  })),
  setAIChatOpen: (isAIChatOpen) => set({ isAIChatOpen }),
  resetDiscoverStore: () => set({
    searchQuery: "",
    activeCategory: "all",
    favorites: [],
    bookmarks: [],
    isAIChatOpen: false
  })
}))
