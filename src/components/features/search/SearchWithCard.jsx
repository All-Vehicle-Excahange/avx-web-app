"use client";

import CustomSelect from "@/components/ui/custom-select";
import VehicleCard from "@/components/ui/const/VehicleCard";
import InputField from "@/components/ui/inputField";

export default function SearchWithCard() {
  const cardData = {
    id: "featured-1",
    title: "BMW 8-serie 2-door coupe grey",
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
  ];

  const fuelTypes = [
    { value: "petrol", label: "Petrol" },
    { value: "diesel", label: "Diesel" },
    { value: "electric", label: "Electric" },
  ];

  const transmissionTypes = [
    { value: "manual", label: "Manual" },
    { value: "automatic", label: "Automatic" },
  ];

  const models = [
    { value: "fortuner", label: "Fortuner" },
    { value: "corolla", label: "Corolla" },
    { value: "fronx", label: "Fronx" },
  ];

  const variants = [
    { value: "fortuner", label: "Fortuner" },
    { value: "corolla", label: "Corolla" },
    { value: "fronx", label: "Fronx" },
  ];

  return (
    <div className="w-full min-h-screen flex bg-primary text-primary font-sans">
      <aside
        className="
          w-[340px]
          bg-primary
          border border-third
          p-6
          flex flex-col gap-7
          overflow-y-auto
        "
      >
        <h2 className="text-xl font-bold text-secondary">Filter Your Result</h2>

        {/* Price Range */}
        <div className="flex flex-col gap-2">
          <label className="text-secondary text-sm font-semibold">
            Price Range
          </label>
          <input type="range" className="w-full accent-black" />
          <div className="flex justify-between text-secondary text-xs">
            <span>₹0</span>
            <span>₹1,00,00,000</span>
          </div>
        </div>

        {/* Brand */}
        <div className="flex flex-col gap-2">
          <label className="text-secondary text-sm font-semibold">Brand</label>
          <CustomSelect
            variant="default"
            placeholder="Select brand"
            options={brands}
          />
        </div>

        {/* Model */}
        <div className="flex flex-col gap-2">
          <label className="text-secondary text-sm font-semibold">Model</label>
          <CustomSelect
            variant="default"
            placeholder="Select model"
            options={models}
          />
        </div>

        {/* Model Year */}
        <div className="flex flex-col gap-2">
          <label className="text-secondary text-sm font-semibold">
            Model Year
          </label>
          <input type="range" className="w-full accent-black" />
          <div className="flex justify-between text-secondary text-xs">
            <span>2000</span>
            <span>2025</span>
          </div>
        </div>

        {/* Fuel Type */}
        <div className="flex flex-col gap-2">
          <label className="text-secondary text-sm font-semibold">
            Fuel Type
          </label>
          <CustomSelect
            variant="default"
            placeholder="Select fuel type"
            options={fuelTypes}
          />
        </div>

        {/* KM Driven */}
        <div className="flex flex-col gap-2">
          <label className="text-secondary text-sm font-semibold">
            Km Driven
          </label>
          <input type="range" className="w-full accent-black" />
          <div className="flex justify-between text-secondary text-xs">
            <span>10,000</span>
            <span>3,50,000</span>
          </div>
        </div>

        {/* Transmission */}
        <div className="flex flex-col gap-2">
          <label className="text-secondary text-sm font-semibold">
            Transmission
          </label>
          <CustomSelect
            variant="default"
            placeholder="Select transmission"
            options={transmissionTypes}
          />
        </div>

        {/* Variant */}
        <div className="flex flex-col gap-2">
          <label className="text-secondary text-sm font-semibold">
            Variant
          </label>
          <CustomSelect
            variant="default"
            placeholder="Select variant"
            options={variants}
          />
        </div>

        {/* Location */}
        <div className="flex flex-col gap-2">
          <label className="text-secondary text-sm font-semibold">
            Location
          </label>
          <InputField placeholder="Enter your location" />
        </div>
      </aside>

      <main
        className="
          flex-1
          p-5
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
          auto-rows-max
        "
      >
        {Array.from({ length: 1 }).map((_, i) => (
          <div key={i} className="h-max">
            {" "}
            <VehicleCard data={cardData} />
          </div>
        ))}
      </main>
    </div>
  );
}
