import React, { useState } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import { Bike, Car } from "lucide-react";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";
import { useDebounceValue } from "@/hooks/useDebounce";

// --- Utility for Tailwind classes ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

const DUMMY_VEHICLES = {
  "4-Wheeler": [
    {
      id: "dummy-car-1",
      makerName: "Mercedes-Benz",
      modelName: "C-Class",
      variantName: "C 200 Avantgarde",
      yearOfMfg: 2021,
      transmissionType: "Automatic",
      fuelType: "Petrol",
      ownership: "1st Owner",
      seats: 5,
      avxInspectionRating: "4.8",
      consultantName: "Elite Motors",
      address: { city: "Mumbai", country: "India" },
      price: 4250000,
      sponsored: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: "dummy-car-2",
      makerName: "Hyundai",
      modelName: "Creta",
      variantName: "SX (O) Turbo",
      yearOfMfg: 2022,
      transmissionType: "Automatic",
      fuelType: "Petrol",
      ownership: "1st Owner",
      seats: 5,
      avxInspectionRating: "4.6",
      consultantName: "Apex Auto",
      address: { city: "Delhi", country: "India" },
      price: 1680000,
      sponsored: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: "dummy-car-3",
      makerName: "Tata",
      modelName: "Nexon EV",
      variantName: "Max XZ+ Lux",
      yearOfMfg: 2023,
      transmissionType: "Automatic",
      fuelType: "Electric",
      ownership: "1st Owner",
      seats: 5,
      avxInspectionRating: "4.7",
      consultantName: "Green Drive",
      address: { city: "Bangalore", country: "India" },
      price: 1545000,
      sponsored: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: "dummy-car-4",
      makerName: "Mahindra",
      modelName: "Thar",
      variantName: "LX 4-Wheel Drive",
      yearOfMfg: 2022,
      transmissionType: "Manual",
      fuelType: "Diesel",
      ownership: "2nd Owner",
      seats: 4,
      avxInspectionRating: "4.5",
      consultantName: "Adventure Rides",
      address: { city: "Pune", country: "India" },
      price: 1390000,
      sponsored: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&auto=format&fit=crop&q=60"
    }
  ],
  "2-Wheeler": [
    {
      id: "dummy-bike-1",
      makerName: "Royal Enfield",
      modelName: "Classic 350",
      variantName: "Chrome Red",
      yearOfMfg: 2022,
      transmissionType: "Manual",
      fuelType: "Petrol",
      ownership: "1st Owner",
      seats: 2,
      avxInspectionRating: "4.9",
      consultantName: "Bullet Junction",
      address: { city: "Chennai", country: "India" },
      price: 195000,
      sponsored: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: "dummy-bike-2",
      makerName: "KTM",
      modelName: "RC 390",
      variantName: "GP Edition",
      yearOfMfg: 2023,
      transmissionType: "Manual",
      fuelType: "Petrol",
      ownership: "1st Owner",
      seats: 2,
      avxInspectionRating: "4.7",
      consultantName: "Speed Wheelz",
      address: { city: "Kochi", country: "India" },
      price: 310000,
      sponsored: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: "dummy-bike-3",
      makerName: "Ather",
      modelName: "450X",
      variantName: "Gen 3",
      yearOfMfg: 2023,
      transmissionType: "Automatic",
      fuelType: "Electric",
      ownership: "1st Owner",
      seats: 2,
      avxInspectionRating: "4.8",
      consultantName: "Eco Moto",
      address: { city: "Bangalore", country: "India" },
      price: 125000,
      sponsored: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: "dummy-bike-4",
      makerName: "Yamaha",
      modelName: "YZF R15",
      variantName: "V4 Metallic Red",
      yearOfMfg: 2022,
      transmissionType: "Manual",
      fuelType: "Petrol",
      ownership: "1st Owner",
      seats: 2,
      avxInspectionRating: "4.6",
      consultantName: "Yamaha Hub",
      address: { city: "Hyderabad", country: "India" },
      price: 175000,
      sponsored: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&auto=format&fit=crop&q=60"
    }
  ]
};

export default function ReecommSponcerSection() {
  const [activeType, setActiveType] = useState("4-Wheeler");
  const debouncedType = useDebounceValue(activeType, 400);

  const cardData = DUMMY_VEHICLES[debouncedType] || [];
  const showSkeleton = activeType !== debouncedType;

  return (
    <div className="w-full h-full flex flex-col  text-primary">
      {/* Header Section */}
      <div className="shrink-0 flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
        <div className="flex flex-col items-start gap-2">
          <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
            Sponsored
            <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
            <span className="text-fourth"> Sponsored</span> Vehicle For You
          </h2>

          <p className="text-third w-full max-w-2xl">
            Sponsored vehicles across all India — updated every day.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex gap-1 sm:gap-2 mt-auto justify-end w-full sm:w-fit">
          <button
            onClick={() => setActiveType("4-Wheeler")}
            className={cn(
              "px-3 py-1 text-xs sm:text-sm font-medium rounded-full border cursor-pointer flex items-center justify-center gap-1 transition-all whitespace-nowrap shrink-0",
              activeType === "4-Wheeler"
                ? "bg-fourth text-primary border-fourth shadow-sm"
                : "text-primary border-white/20 hover:border-primary/40",
            )}
          >
            <Car size={18} /> 4-Wheeler
          </button>
          <button
            onClick={() => setActiveType("2-Wheeler")}
            className={cn(
              "px-3 py-1 text-xs sm:text-sm font-medium rounded-full border cursor-pointer flex items-center justify-center gap-1 transition-all whitespace-nowrap shrink-0",
              activeType === "2-Wheeler"
                ? "bg-fourth text-primary border-fourth shadow-sm"
                : "text-primary border-white/20 hover:border-primary/40",
            )}
          >
            <Bike size={18} /> 2-Wheeler
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="flex-1 min-h-0 grid sm:items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-1">
        {showSkeleton ? (
          [...Array(4)].map((_, i) => (
            <div
              key={`skel-${i}`}
              className="lg:col-span-1 lg:row-span-1 h-full"
            >
              <VehicleCardSkeleton />
            </div>
          ))
        ) : cardData.length === 0 ? (
          <div className="col-span-full flex justify-center py-16">
            <h3 className="text-lg font-semibold text-primary/40">
              No vehicles found
            </h3>
          </div>
        ) : (
          cardData.map((vehicle) => (
            <div
              key={vehicle.id}
              className="lg:col-span-1 lg:row-span-1 h-full"
            >
              <VehicleCard data={vehicle} source="home" />
            </div>
          ))
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <Button href="/search" variant="outlineAnimated" size="md">
          Explore All Vehicles
        </Button>
      </div>
    </div>
  );
}
