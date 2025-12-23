"use client";

import React, { useState, useEffect } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";
import CustomSelect from "@/components/ui/custom-select";
import { useRouter } from "next/router";

// 🔥 FIX — use stable formatter (avoids hydration mismatch)
const formatINR = (num) => {
  if (typeof window === "undefined") return num;
  return num.toLocaleString("en-IN");
};

export default function VehicleFilterBar() {
  const [vehicleType, setVehicleType] = useState("");
  const [fuelType1, setFuelType1] = useState("");
  const [fuelType2, setFuelType2] = useState("");
  // Default range: 0 to 1 Crore
  const [budget, setBudget] = useState([0, 10000000]);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("4w");

  const handleClick = () => {
    router.push("/search");
  };

  const categories = [
    { id: "4w", label: "4-Wheelers" },
    { id: "2w", label: "2-Wheelers" },
  ];

  // === Dual Slider Logic ===
  const minLimit = 0;
  const maxLimit = 10000000;
  const gap = 100000; // Minimum gap between handles

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), budget[1] - gap);
    setBudget([value, budget[1]]);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), budget[0] + gap);
    setBudget([budget[0], value]);
  };

  // Calculate percentages for the visual progress bar
  const getPercent = (value) =>
    Math.round(((value - minLimit) / (maxLimit - minLimit)) * 100);

  return (
    <div className="absolute max-w-screen-2xl mx-auto bottom-6 left-0 right-0 z-20 px-4 md:px-8 lg:px-8 xl:px-8 ">
      {/* CSS for Dual Range Slider Thumbs */}
      <style jsx>{`
        .thumb-z-index::-webkit-slider-thumb {
          pointer-events: auto;
          position: relative;
          z-index: 50;
        }
        .thumb-z-index::-moz-range-thumb {
          pointer-events: auto;
          position: relative;
          z-index: 50;
        }
      `}</style>

      {/* 🔥 FIX: Changed className to use backticks {` `} for multiline support */}
      <div
        className={`
        relative w-full bg-transparent backdrop-blur-md border border-white/30 
        rounded-xl shadow-2xl 
        px-5 md:px-6 
        pt-10 pb-4 
        overflow-visible
        `}
      >
        <div className="absolute inset-0 bg-secondary/80 bg-cover bg-center opacity-40 blur-lg" />
        {/* Category Selector */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-3 bg-primary  text-black border border-white/20 px-4 py-1.5 rounded-full shadow-md">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap cursor-pointer ${
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
            <label className="text-xs font-medium text-primary">Location</label>
            <CustomSelect
              variant="transparent"
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
            <label className="text-xs font-medium text-primary">
              Vehicle Type
            </label>
            <CustomSelect
              variant="transparent"
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
            <label className="text-xs font-medium text-primary">
              Fuel Type
            </label>
            <CustomSelect
              variant="transparent"
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
            <label className="text-xs font-medium text-primary">
              Fuel Type
            </label>
            <CustomSelect
              variant="transparent"
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

        {/* Budget Slider (Dual Range) */}
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-3 mb-4">
          <div className="col-span-2 space-y-1">
            <div className="flex justify-between text-xs font-medium text-primary">
              <span>Min Budget</span>
              <span>Max Budget</span>
            </div>

            {/* Range Slider Container */}
            <div className="relative w-full h-6 flex items-center">
              {/* 1. Background Track (Gray) */}
              <div className="absolute w-full h-1 bg-third/30 rounded-full z-0"></div>

              {/* 2. Active Track (Black - Dynamic Width) */}
              <div
                className="absolute h-1 bg-third20 rounded-full z-10"
                style={{
                  left: `${getPercent(budget[0])}%`,
                  width: `${getPercent(budget[1]) - getPercent(budget[0])}%`,
                }}
              ></div>

              {/* 3. Min Range Input */}
              <input
                type="range"
                min={minLimit}
                max={maxLimit}
                value={budget[0]}
                onChange={handleMinChange}
                className="thumb-z-index absolute w-full h-full appearance-none bg-transparent pointer-events-none z-20 accent-third/90"
              />

              {/* 4. Max Range Input */}
              <input
                type="range"
                min={minLimit}
                max={maxLimit}
                value={budget[1]}
                onChange={handleMaxChange}
                className="thumb-z-index absolute w-full h-full appearance-none bg-transparent pointer-events-none z-30 accent-third/90"
              />
            </div>

            <div className="flex justify-between text-xs text-secondary/80 ">
              <span>₹{budget[0]}</span>
              <span>₹{budget[1]}</span>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleClick}
            size="md"
            variant="outlineAnimated"
            showIcon={true}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
