import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface SearchStore {
  searchQuery: string;
  searchOriginPath: string | null;

  isCommandPaletteOpen: boolean;

  setSearchQuery: (query: string) => void;
  setSearchOriginPath: (path: string | null) => void;
  clearSearch: () => void;

  openCommandPalette: () => void;
  closeCommandPalette: () => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: "",
  searchOriginPath: null,

  isCommandPaletteOpen: false,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchOriginPath: (path) => set({ searchOriginPath: path }),
  clearSearch: () => set({ searchQuery: "", searchOriginPath: null }),

  openCommandPalette: () => set({ isCommandPaletteOpen: true }),
  closeCommandPalette: () => set({ isCommandPaletteOpen: false }),
}));

export const useSearchState = () =>
  useSearchStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      searchOriginPath: state.searchOriginPath,
      isCommandPaletteOpen: state.isCommandPaletteOpen,
      setSearchQuery: state.setSearchQuery,
      setSearchOriginPath: state.setSearchOriginPath,
      openCommandPalette: state.openCommandPalette,
      closeCommandPalette: state.closeCommandPalette,
      clearSearch: state.clearSearch,
    }))
  );
