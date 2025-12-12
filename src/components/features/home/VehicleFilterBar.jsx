"use client";

import React, { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";
import CustomSelect from "@/components/ui/custom-select";

// 🔥 FIX — use stable formatter (avoids hydration mismatch)
const formatINR = (num) => {
  if (typeof window === "undefined") return num;
  return num.toLocaleString("en-IN");
};

export default function VehicleFilterBar() {
  const [vehicleType, setVehicleType] = useState("");
  const [fuelType1, setFuelType1] = useState("");
  const [fuelType2, setFuelType2] = useState("");
  const [budget, setBudget] = useState([0, 10000000]);

  const [selectedCategory, setSelectedCategory] = useState("4w");

  const categories = [
    { id: "4w", label: "4-Wheelers" },
    { id: "2w", label: "2-Wheelers" },
    { id: "commercial", label: "Commercial" },
  ];

  return (
    <div className="absolute bottom-6 left-0 right-0 z-20 px-4 md:px-8 lg:px-12 xl:px-16">
      <div
        className="
        relative w-full bg-primary  border border-white/20 
        rounded-xl shadow-2xl 
        px-5 md:px-6 
        pt-10 pb-4 
        overflow-visible
      "
      >
        {/* Category Selector */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-3 bg-white text-black border border-white/20 px-4 py-1.5 rounded-full shadow-md">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === cat.id
                    ? "bg-black text-white font-medium"
                    : "text-black/70 hover:bg-black/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {/* Location */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-secondary">Location</label>
            <CustomSelect
              variant="default"
              value={vehicleType}
              onChange={setVehicleType}
              placeholder="Select"
              options={[
                { value: "bike", label: "Bike" },
                { value: "car", label: "Car" },
                { value: "scooter", label: "Scooter" },
                { value: "suv", label: "SUV" },
                { value: "luxury", label: "Luxury" },
              ]}
            />
          </div>

          {/* Vehicle Type */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-secondary">
              Vehicle Type
            </label>
            <CustomSelect
              variant="default"
              value={vehicleType}
              onChange={setVehicleType}
              options={[
                { value: "bike", label: "Bike" },
                { value: "car", label: "Car" },
                { value: "scooter", label: "Scooter" },
                { value: "suv", label: "SUV" },
                { value: "luxury", label: "Luxury" },
              ]}
            />
          </div>

          {/* Fuel Type 1 */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-secondary">
              Fuel Type
            </label>
            <CustomSelect
              variant="default"
              value={fuelType1}
              onChange={setFuelType1}
              options={[
                { value: "petrol", label: "Petrol" },
                { value: "diesel", label: "Diesel" },
                { value: "electric", label: "Electric" },
                { value: "hybrid", label: "Hybrid" },
              ]}
            />
          </div>

          {/* Fuel Type 2 */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-secondary">
              Fuel Type
            </label>
            <CustomSelect
              variant="default"
              value={fuelType2}
              onChange={setFuelType2}
              options={[
                { value: "petrol", label: "Petrol" },
                { value: "diesel", label: "Diesel" },
                { value: "electric", label: "Electric" },
                { value: "hybrid", label: "Hybrid" },
              ]}
            />
          </div>
        </div>

        {/* Budget Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-3 mb-4">
          <div className="col-span-2 space-y-1">
            <div className="flex justify-between text-xs font-medium text-secondary">
              <span>Min Budget</span>
              <span>Max Budget</span>
            </div>

            <input
              type="range"
              min="0"
              max="10000000"
              value={budget[1]}
              onChange={(e) => setBudget([budget[0], Number(e.target.value)])}
              className="w-full accent-black"
            />

            <div className="flex justify-between text-xs text-secondary/80">
              <span>₹{budget[0]}</span>
              <span>₹{budget[1]}</span>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-end">
          <Button size="md" variant="default" showIcon={false}>
            Search
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
