/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import InputField from "@/components/ui/inputField";
import Button from "@/components/ui/button";
import ChipGroup from "@/components/ui/chipGroup";
import PromoCardRow from "./PromoCardRow";
import Chip from "@/components/ui/chip";
import { FilterIcon } from "lucide-react";

/* ================= MOBILE DETECTION ================= */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    setIsMobile(media.matches);

    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  return isMobile;
}

export default function SearchWithCard() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState("Suggested Filters");
  const [selectedMobileChips, setSelectedMobileChips] = useState([]);
  const [avxAssumed, setAvxAssumed] = useState(true);

  const isMobile = useIsMobile();

  const toggleMobileChip = (chip) => {
    setSelectedMobileChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  /* ================= DATA ================= */
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

  const mobileFilterMap = {
    "Suggested Filters": [
      "⭐ 4 & Up",
      "Under ₹5L",
      "₹5L - ₹10L",
      "SUV",
      "Diesel",
    ],
    Brand: brands.map((b) => b.label),
    Model: models.map((m) => m.label),
    "Fuel Type": fuelTypes.map((f) => f.label),
    Transmission: transmissionTypes.map((t) => t.label),
    Variant: variants.map((v) => v.label),
    "Vehicle Type": vehicleTypes.map((v) => v.label),
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-secondary text-secondary font-sans">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex relative w-[340px] bg-secondary/90 border border-third/40 p-6 flex-col gap-6 overflow-y-auto shrink-0 rounded-2xl h-fit">
        <div className="absolute inset-0 bg-[url('/bg_blur.jpg')] bg-cover opacity-40 blur-lg z-0" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Filter Your Result
          </h2>

          <div className="flex flex-col gap-2">
            <InputField placeholder="Enter your location" variant="colored" />

            <div className="hidden lg:flex items-center justify-between px-4 py-3 rounded-xl border border-white/20 backdrop-blur-md bg-transparent">
              <span className="text-primary font-semibold text-sm">
                AVX Assumed
              </span>

              <button
                onClick={() => setAvxAssumed(!avxAssumed)}
                className={`relative w-12 h-6 rounded-full transition cursor-pointer ${
                  avxAssumed ? "bg-primary/90" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-secondary transition-transform ${
                    avxAssumed ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <ChipGroup title="Brand" items={brands} showMore searchable />
            <ChipGroup title="Model" items={models} showMore searchable />
            <ChipGroup title="Fuel Type" items={fuelTypes} />
            <ChipGroup title="Transmission" items={transmissionTypes} />
            <ChipGroup title="Variant" items={variants} />
            <ChipGroup title="Vehicle Type" items={vehicleTypes} />

            <Button className="mt-4" variant="outline" showIcon={false}>
              Apply filter
            </Button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 bg-secondary">
        <div className="w-full grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3  gap-4 sm:gap-5 auto-rows-max sm:px-5 md:px-0  lg:px-6 py-4 sm:py-5 lg:py-0">
          <div className="col-span-full  relative bottom-8 sm:top-2">
            <PromoCardRow />
          </div>
          {/* MOBILE FILTER BAR */}
          <div className="col-span-full">
            <div className="flex lg:hidden items-center gap-3 overflow-x-auto scrollbar-hide">
              <Button
                variant="ghost"
                showIcon={false}
                className="gap-2 shrink-0"
                onClick={() => setMobileFilterOpen(true)}
              >
                <FilterIcon className="h-4 w-4" />
                Filter
              </Button>

              {/* ✅ AVX TOGGLE — MOBILE ONLY */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-third/40 shrink-0">
                <span className="text-sm text-primary font-semibold">
                  AVX Assumed
                </span>
                <button
                  onClick={() => setAvxAssumed(!avxAssumed)}
                  className={`relative w-9 h-5 rounded-full ${
                    avxAssumed ? "bg-primary" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 h-3 w-3 rounded-full bg-secondary transition-transform ${
                      avxAssumed ? "translate-x-4" : ""
                    }`}
                  />
                </button>
              </div>

              {["Under ₹5L", "SUV", "Diesel", "⭐ 4+"].map((chip) => (
                <Chip
                  key={chip}
                  label={chip}
                  selected={selectedMobileChips.includes(chip)}
                  variant="outline"
                  onClick={() => toggleMobileChip(chip)}
                />
              ))}
            </div>
          </div>

          {Array.from({ length: 9 }).map((_, i) => (
            <VehicleCard key={i} data={cardData} />
          ))}
        </div>
      </main>

      {/* MOBILE FILTER DRAWER (unchanged) */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-primary lg:hidden">
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-third/40">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button
              variant="ghost"
              showIcon={false}
              onClick={() => setMobileFilterOpen(false)}
            >
              ✕
            </Button>
          </div>

          {/* BODY */}
          <div className="flex h-[calc(100vh-120px)]">
            {/* LEFT PANEL */}
            <div className="w-[40%] border-r border-third/40 overflow-y-auto">
              {Object.keys(mobileFilterMap).map((item) => (
                <div
                  key={item}
                  onClick={() => setActiveFilterTab(item)}
                  className={`px-4 py-3 cursor-pointer text-sm ${
                    activeFilterTab === item
                      ? "bg-secondary/10 font-semibold"
                      : "hover:bg-secondary/5"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* RIGHT PANEL */}
            <div className="flex-1 p-4 overflow-y-auto">
              <h3 className="text-sm font-semibold mb-3">{activeFilterTab}</h3>

              <div className="flex flex-wrap gap-3">
                {(mobileFilterMap[activeFilterTab] || []).map((chip) => (
                  <Chip
                    key={chip}
                    label={chip}
                    selected={selectedMobileChips.includes(chip)}
                    variant={isMobile ? "outlineDark" : "outline"}
                    onClick={() => toggleMobileChip(chip)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-third/40 bg-primary">
            <Button
              variant="default"
              showIcon={false}
              className="w-full"
              onClick={() => setMobileFilterOpen(false)}
            >
              Show results
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
