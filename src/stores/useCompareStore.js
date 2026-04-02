import { create } from "zustand";

export const useCompareStore = create((set) => ({
    isOpen: false,
    selectedVehicle: null,
    isVehicleDetails: false,
    
    // Actions
    openCompare: (isDetails = false, vehicle = null) => set((state) => ({ 
        isOpen: true, 
        isVehicleDetails: isDetails,
        selectedVehicle: vehicle || state.selectedVehicle 
    })),
    closeCompare: () => set({ isOpen: false }),
    toggleCompare: () => set((state) => ({ isOpen: !state.isOpen })),
    setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
}));
