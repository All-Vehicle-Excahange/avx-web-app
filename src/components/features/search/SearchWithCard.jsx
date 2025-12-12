"use client";

import CustomSelect from "@/components/ui/custom-select";
import VehicleCard from "@/components/ui/const/VehicleCard";
import InputField from "@/components/ui/inputField";
import Button from "@/components/ui/button";
import { Search } from "lucide-react";
import CheckListPanel from "@/components/ui/checkListPanel";
import ChipGroup from "@/components/ui/chipGroup";

export default function SearchWithCard() {
  const cardData = {
    id: "featured-1",
    title: "BMW 8-serie 2-door",
    subtitle: "35 D6 Powerful lorem isump",
    year: "2022",
    transmission: "Manual",
    fuel: "Diesel",
    seats: "5",
    drivetrain: "Front Wheel Drive",
    rating: "4.3",
    price: "6,75,998",
    image: "/big_card_car.jpg",
    sponsored: false,
  };

  const brands = [
    { value: "toyota", label: "Toyota" },
    { value: "maruti", label: "Maruti" },
    { value: "kia", label: "Kia" },
    { value: "bmw", label: "BMW" },
    { value: "tata", label: "Tata" },
    { value: "mahindra", label: "Mahindra" },
    { value: "honda", label: "Honda" },
    { value: "hyundai", label: "Hyundai" },
  ];

  const fuelTypes = [
    { value: "petrol", label: "Petrol" },
    { value: "diesel", label: "Diesel" },
    { value: "electric", label: "Electric" },
    { value: "cng", label: "CNG" },
    { value: "hybrid", label: "Hybrid" },
  ];

  const transmissionTypes = [
    { value: "manual", label: "Manual" },
    { value: "automatic", label: "Automatic" },
    { value: "amt", label: "AMT" },
    { value: "cvt", label: "CVT" },
    { value: "dct", label: "DCT" },
  ];

  const models = [
    { value: "fortuner", label: "Fortuner" },
    { value: "corolla", label: "Corolla" },
    { value: "fronx", label: "Fronx" },
    { value: "creta", label: "Creta" },
    { value: "harrier", label: "Harrier" },
    { value: "seltos", label: "Seltos" },
    { value: "innova", label: "Innova" },
    { value: "swift", label: "Swift" },
    { value: "baleno", label: "Baleno" },
    { value: "hector", label: "Hector" },
    { value: "venue", label: "Venue" },
    { value: "sonet", label: "Sonet" },
    { value: "xuv700", label: "XUV700" },
    { value: "thar", label: "Thar" },
    { value: "glanza", label: "Glanza" },
  ];

  const variants = [
    { value: "base", label: "Base" },
    { value: "mid", label: "Mid Variant" },
    { value: "top", label: "Top Variant" },
    { value: "sports", label: "Sports Edition" },
    { value: "premium", label: "Premium" },
    { value: "limited", label: "Limited Edition" },
  ];

  const vehicleTypes = [
    { value: "suv", label: "SUV" },
    { value: "sedan", label: "Sedan" },
    { value: "hatchback", label: "Hatchback" },
    { value: "muv", label: "MUV" },
    { value: "truck", label: "Truck" },
    { value: "coupe", label: "Coupe" },
    { value: "convertible", label: "Convertible" },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-white text-slate-900 font-sans">
      <aside
        className="
    relative
    w-full lg:w-[340px]
    bg-secondary/90
    border-b lg:border-b-0 lg:border-r border-slate-200
    p-6
    flex flex-col gap-6
    overflow-y-auto
    shrink-0
  "
      >
        {/* BACKGROUND IMAGE BEHIND CONTENT */}
        <div
          className="
      absolute inset-0
      bg-[url('/bg_blur.jpg')]
      bg-cover bg-fit
      opacity-40
      blur-lg
      pointer-events-none
      z-0
    "
        ></div>

        {/* CONTENT (NOW ABOVE BACKGROUND) */}
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-primary ">
            Filter Your Result
          </h2>

          {/* Location */}
          <div className="flex flex-col my-4">
            <label className="text-primary text-md mb-2 font-semibold">
              Location
            </label>
            <InputField
              type="text"
              variant="colored"
              placeholder={"Enter your location"}
            />
          </div>

          {/* Brand */}
          <div className="flex flex-col gap-2">
            <ChipGroup
              title="Brand"
              items={brands}
              variant="outline"
              showMore={true}
              searchable={true}
              limit={6}
            />
          </div>

          {/* Model */}
          <div className="flex flex-col gap-2">
            <ChipGroup
              title="Model"
              items={models}
              variant="outline"
              showMore={true}
              searchable={true}
              limit={6}
            />
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-2">
            <label className="text-primary text-sm font-semibold">
              Price Range
            </label>
            <input type="range" className="w-full accent-primary" />
            <div className="flex justify-between text-primary/70 text-xs">
              <span>₹0</span>
              <span>₹1,00,00,000</span>
            </div>
          </div>

          {/* Model Year */}
          <div className="flex flex-col gap-2">
            <label className="text-primary text-sm font-semibold">
              Model Year
            </label>
            <input type="range" className="w-full accent-white" />
            <div className="flex justify-between text-primary/70 text-xs">
              <span>2000</span>
              <span>2025</span>
            </div>
          </div>

          {/* Fuel Type */}
          <div className="flex flex-col gap-2">
            <ChipGroup
              title="Fuel Type"
              items={fuelTypes}
              variant="outline"
              showMore={true}
              searchable={true}
              limit={6}
            />
          </div>

          {/* KM Driven */}
          <div className="flex flex-col gap-2">
            <label className="text-primary text-sm font-semibold">
              Km Driven
            </label>
            <input type="range" className="w-full accent-white" />
            <div className="flex justify-between text-primary/70 text-xs">
              <span>10,000</span>
              <span>3,50,00,000</span>
            </div>
          </div>

          {/* Transmission */}
          <div className="flex flex-col gap-2">
            <ChipGroup
              title="Transmission"
              items={transmissionTypes}
              variant="outline"
              showMore={true}
              searchable={true}
              limit={6}
            />
          </div>

          {/* Variant */}
          <div className="flex flex-col gap-2">
            <ChipGroup
              title="Variant"
              items={variants}
              variant="outline"
              showMore={true}
              searchable={true}
              limit={6}
            />
          </div>

          {/* Vehicle Type */}
          <div className="flex flex-col gap-2">
            <ChipGroup
              title="Vehicle Type"
              items={vehicleTypes}
              variant="outline"
              showMore={true}
              searchable={true}
              limit={6}
            />
          </div>

          {/* Apply Filter */}
          <div className="flex flex-col justify-end gap-2 mt-4">
            <Button variant="outline" showIcon={false}>
              Apply filter
            </Button>
          </div>
        </div>
      </aside>

      <main
        className="
          flex-1
          sm:p-5
          grid
          grid-cols-1
          lg:grid-cols-2
          xl:grid-cols-3
          gap-4 sm:gap-5
          auto-rows-max
          bg-gray-50
        "
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="h-max">
            {" "}
            <VehicleCard data={cardData} />
          </div>
        ))}
      </main>
    </div>
  );
}
