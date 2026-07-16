import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUIStore = create(
  persist(
    (set) => ({
      // Persistent state
      isMobileBannerVisible: true,
      hideMobileBanner: () => set({ isMobileBannerVisible: false }),

      // Temporary state (not persisted)
      isMobileBannerTempHidden: false,
      setMobileBannerTempHidden: (isHidden) =>
        set({ isMobileBannerTempHidden: isHidden }),

      isSearchDropdownOpen: false,
      setIsSearchDropdownOpen: (isOpen) => set({ isSearchDropdownOpen: isOpen }),
    }),
    {
      name: "ui-storage",
      partialize: (state) => ({
        // Only persist isMobileBannerVisible
        isMobileBannerVisible: state.isMobileBannerVisible,
      }),
    }
  )
);
