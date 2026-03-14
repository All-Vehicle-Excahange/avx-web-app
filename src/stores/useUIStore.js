import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUIStore = create(
  persist(
    (set) => ({
      isMobileBannerVisible: true,
      hideMobileBanner: () => set({ isMobileBannerVisible: false }),
    }),
    {
      name: "ui-storage",
    }
  )
);
