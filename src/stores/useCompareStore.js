import { create } from "zustand";

export const useCompareStore = create((set, get) => ({
    isOpen: false,
    selectedVehicle: null,
    isVehicleDetails: false,
    compareVehicles: [],
    
    // Actions
    openCompare: (isDetails = false, vehicle = null) => set((state) => ({ 
        isOpen: true, 
        isVehicleDetails: isDetails,
        selectedVehicle: vehicle || state.selectedVehicle 
    })),
    closeCompare: () => set({ isOpen: false, compareVehicles: [] }),
    toggleCompare: () => set((state) => ({ isOpen: !state.isOpen })),
    setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
    
    addToCompare: (vehicle) => {
        const { compareVehicles } = get();
        const exists = compareVehicles.find(v => v.id === vehicle.id);
        
        if (exists) {
            // Remove if already added
            set({ compareVehicles: compareVehicles.filter(v => v.id !== vehicle.id) });
            return;
        }

        const newVehicles = [...compareVehicles, vehicle];
        set({ compareVehicles: newVehicles });

        if (newVehicles.length === 2) {
            set({ isOpen: true, isVehicleDetails: false });
        }
    }
}));
