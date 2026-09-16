import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLocationStore = create(
  persist(
    (set) => ({
      selectedCity: "Palanpur",
      cityId: null,
      stateId: null,
      stateName: "",
      setLocation: ({ cityName, cityId, stateId, stateName }) =>
        set((state) => ({
          selectedCity: cityName || state.selectedCity || "Palanpur",
          cityId: cityId !== undefined ? cityId : state.cityId,
          stateId: stateId !== undefined ? stateId : state.stateId,
          stateName: stateName !== undefined ? stateName : state.stateName,
        })),
    }),
    {
      name: "user-location-storage",
    }
  )
);
