"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, MapPin, Car, Wallet, ChevronDown } from "lucide-react";

/* ================= MOCK DATA ================= */
const LOCATION_SUGGESTIONS = [
  {
    id: 1,
    city: "Mumbai, Maharashtra",
    subtitle: "For luxury & premium cars",
    icon: "🏙️",
  },
  {
    id: 2,
    city: "Delhi NCR",
    subtitle: "For the largest used-car market",
    icon: "🚗",
  },
  {
    id: 3,
    city: "Bangalore, Karnataka",
    subtitle: "For tech-savvy EV deals",
    icon: "⚡",
  },
  {
    id: 4,
    city: "Pune, Maharashtra",
    subtitle: "Great for two-wheelers",
    icon: "🏍️",
  },
  {
    id: 5,
    city: "Manali, HP",
    subtitle: "Best for 4x4 off-roaders",
    icon: "🏔️",
  },
];

const VEHICLE_TYPES = [
  { id: "sedan", label: "Sedan", desc: "Comfort & Style" },
  { id: "suv", label: "SUV", desc: "Space & Power" },
  { id: "hatchback", label: "Hatchback", desc: "City Drive" },
  { id: "luxury", label: "Luxury", desc: "Premium Experience" },
];

const FUEL_TYPES = [
  { id: "petrol", label: "Petrol" },
  { id: "diesel", label: "Diesel" },
  { id: "cng", label: "CNG" },
  { id: "ev", label: "Electric" },
  { id: "hybrid", label: "Hybrid" },
];

// Example brand list (expandable) to test scrolling
const BRANDS = [
  "Toyota",
  "Hyundai",
  "Maruti",
  "Honda",
  "Ford",
  "Mahindra",
  "Kia",
  "Tata",
  "Volkswagen",
  "BMW",
  "Mercedes",
  "Audi",
  "Skoda",
  "Renault",
  "MG",
  "Nissan",
  "Suzuki",
  "Isuzu",
];

export default function VehicleFilterBar() {
  /* ================= STATE ================= */
  const [activeTab, setActiveTab] = useState(null); // 'location', 'vehicle', 'fuel', 'brand', 'budget'
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [brand, setBrand] = useState("");

  // Budget State (1L to 10L)
  const MIN_LIMIT = 1; // 1L
  const MAX_LIMIT = 10; // 10L
  const STEP = 1; // 1L step
  const [budget, setBudget] = useState([1, 10]);

  const containerRef = useRef(null);

  // Active thumb being dragged: 'min' | 'max' | null
  const [activeThumb, setActiveThumb] = useState(null);

  // Buffered inputs so users can freely type before committing
  const [minInput, setMinInput] = useState(String(budget[0]));
  const [maxInput, setMaxInput] = useState(String(budget[1]));

  useEffect(() => {
    setMinInput(String(budget[0]));
    setMaxInput(String(budget[1]));
  }, [budget]);

  const handleMinInputChange = (e) => setMinInput(e.target.value);
  const handleMaxInputChange = (e) => setMaxInput(e.target.value);

  const commitMinInput = () => {
    const num =
      minInput === ""
        ? MIN_LIMIT
        : clamp(Number(minInput), MIN_LIMIT, budget[1] - STEP);
    setBudget([num, budget[1]]);
  };

  const commitMaxInput = () => {
    const num =
      maxInput === ""
        ? MAX_LIMIT
        : clamp(Number(maxInput), budget[0] + STEP, MAX_LIMIT);
    setBudget([budget[0], num]);
  };

  // Clear active thumb on mouse/touch end so z-index resets
  useEffect(() => {
    const clear = () => setActiveThumb(null);
    document.addEventListener("mouseup", clear);
    document.addEventListener("touchend", clear);
    return () => {
      document.removeEventListener("mouseup", clear);
      document.removeEventListener("touchend", clear);
    };
  }, []);

  /* ================= HELPERS ================= */
  // Close popups on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveTab(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    console.log("Searching:", {
      location,
      vehicleType,
      fuelType,
      brand,
      budget,
    });
    setActiveTab(null);
  };

  useEffect(() => {
    console.log("VehicleFilterBar mounted");
  }, []);

  return (
    <div className="absolute max-w-screen-2xl mx-auto bottom-30 left-0 right-0 z-30 px-4 md:px-8 flex justify-center items-center pointer-events-auto">
      {/* ================= MAIN SEARCH PILL ================= */}
      <div
        ref={containerRef}
        className="bg-primary rounded-full shadow-2xl border border-secondary/30 flex items-center p-2 relative max-w-6xl w-full"
      >
        {/* ----- SECTION 1: LOCATION ----- */}
        <div
          className={`flex-1 relative px-4 py-3 rounded-full transition-colors cursor-pointer ${
            activeTab === "location" ? "bg-primary/10" : "hover:bg-primary/5"
          }`}
          onClick={() => setActiveTab("location")}
        >
          <div className="text-lg font-bold text-secondary tracking-wide">
            Location
          </div>
          <input
            type="text"
            placeholder="Search destinations"
            className="w-full bg-transparent border-none outline-none text-sm text-secondary placeholder-secondary/70 font-medium text-left truncate"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {/* === POPUP: LOCATION === */}
          {activeTab === "location" && (
            <div className="absolute top-[130%] left-0 w-[350px] bg-primary rounded-4xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] overflow-hidden z-50 p-4 border border-secondary/30 animate-in fade-in zoom-in-95 duration-200">
              <div className="text-xs font-semibold text-secondary/70 mb-3 px-2">
                SUGGESTED REGIONS
              </div>
              <div className="flex flex-col gap-1 max-h-56 overflow-y-auto">
                {LOCATION_SUGGESTIONS.filter((i) =>
                  i.city.toLowerCase().includes(location.toLowerCase())
                ).map((item) => (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocation(item.city);
                      setActiveTab("vehicle"); // Auto-move to next tab
                    }}
                    className="flex items-center gap-4 p-3 hover:bg-primary/10 rounded-2xl transition-all text-left group"
                  >
                   
                    <div>
                      <div className="font-bold text-secondary text-sm">
                        {item.city}
                      </div>
                      <div className="text-xs text-secondary/70">
                        {item.subtitle}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className="w-px h-8 bg-gray-200 my-auto" />

        {/* ----- SECTION 2: VEHICLE TYPE ----- */}
        <div
          className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${
            activeTab === "vehicle" ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("vehicle")}
        >
          <div className="text-lg font-bold text-gray-800 tracking-wide">
            Vehicle Type
          </div>
          <div
            className={`text-sm font-medium truncate ${
              vehicleType ? "text-gray-800" : "text-gray-400"
            }`}
          >
            {vehicleType || "Add type"}
          </div>

          {/* === POPUP: VEHICLE === */}
          {activeTab === "vehicle" && (
            <div className="absolute top-[130%] left-[-50px] w-[300px] bg-primary rounded-4xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] overflow-hidden z-50 p-2 border border-secondary/30 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col max-h-56 overflow-y-auto">
                {VEHICLE_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setVehicleType(type.label);
                      setActiveTab("budget"); // Auto-move to next tab
                    }}
                    className="w-full flex items-center justify-between p-4 hover:bg-primary/10 rounded-2xl transition-all border-b border-primary/10 last:border-0"
                  >
                    <div className="text-left">
                      <div className="font-bold text-secondary">
                        {type.label}
                      </div>
                      <div className="text-xs text-secondary/70">
                        {type.desc}
                      </div>
                    </div>
                    {vehicleType === type.label && (
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className="w-px h-8 bg-secondary/30 my-auto" />

        {/* ----- SECTION 3: FUEL TYPE ----- */}
        <div
          className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${
            activeTab === "fuel" ? "bg-primary/10" : "hover:bg-primary/5"
          }`}
          onClick={() => setActiveTab("fuel")}
        >
          <div className="text-lg font-bold text-secondary tracking-wide">
            Fuel Type
          </div>
          <div
            className={`text-sm font-medium truncate ${
              fuelType ? "text-secondary" : "text-secondary/70"
            }`}
          >
            {fuelType || "Select fuel"}
          </div>

          {activeTab === "fuel" && (
            <div className="absolute top-[130%] left-[-50px] w-[260px] bg-primary rounded-4xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] overflow-hidden z-50 p-2 border border-secondary/30 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col max-h-56 overflow-y-auto">
                {FUEL_TYPES.map((f) => (
                  <button
                    key={f.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setFuelType(f.label);
                      setActiveTab("brand");
                    }}
                    className="w-full text-left p-3 hover:bg-primary/10 rounded-2xl transition-all border-b border-primary/5 last:border-0"
                  >
                    <div className="font-bold text-secondary">{f.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className="w-px h-8 bg-secondary/30 my-auto" />

        {/* ----- SECTION 4: BRAND ----- */}
        <div
          className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${
            activeTab === "brand" ? "bg-primary/10" : "hover:bg-primary/5"
          }`}
          onClick={() => setActiveTab("brand")}
        >
          <div className="text-lg font-bold text-secondary tracking-wide">
            Brand
          </div>
          <div
            className={`text-sm font-medium truncate ${
              brand ? "text-secondary" : "text-secondary/70"
            }`}
          >
            {brand || "Select brand"}
          </div>

          {activeTab === "brand" && (
            <div className="absolute top-[130%] right-0 w-[320px] bg-primary rounded-4xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] overflow-hidden z-50 p-2 border border-secondary/30 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col max-h-56 overflow-y-auto">
                {BRANDS.map((b, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setBrand(b);
                      setActiveTab("budget");
                    }}
                    className="w-full text-left p-3 hover:bg-primary/10 rounded-2xl transition-all border-b border-primary/5 last:border-0"
                  >
                    <div className="font-bold text-secondary">{b}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className="w-px h-8 bg-secondary/30 my-auto" />

        {/* ----- SECTION 3: BUDGET ----- */}
        <div
          className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${
            activeTab === "budget" ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("budget")}
        >
          <div className="text-lg font-bold text-gray-800 tracking-wide">
            Budget
          </div>
          <div className="text-sm font-medium text-gray-400 truncate">
            {budget[0]}L - {budget[1]}L
          </div>

          {/* === POPUP: BUDGET === */}
          {activeTab === "budget" && (
            <div
              className="absolute top-[130%] right-0 w-[350px] bg-primary rounded-4xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] overflow-hidden z-50 p-6 border border-secondary/30 animate-in fade-in zoom-in-95 duration-200 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-800">
                  Price Range
                </span>
                <span className="text-sm text-gray-500">Lakhs</span>
              </div>

              {/* Visual Bar */}

              {/* Dual Sliders */}
              <div className="relative h-2 bg-primary/20 rounded-full mb-8">
                <div
                  className="absolute h-full bg-secondary rounded-full opacity-80"
                  style={{
                    left: `${(budget[0] / MAX_LIMIT) * 100}%`,
                    right: `${100 - (budget[1] / MAX_LIMIT) * 100}%`,
                  }}
                />
                <input
                  type="range"
                  min={MIN_LIMIT}
                  max={MAX_LIMIT}
                  step={STEP}
                  value={budget[0]}
                  onChange={(e) =>
                    setBudget([
                      Math.min(+e.target.value, budget[1] - STEP),
                      budget[1],
                    ])
                  }
                  onMouseDown={() => setActiveThumb("min")}
                  onTouchStart={() => setActiveThumb("min")}
                  onFocus={() => setActiveThumb("min")}
                  className={`absolute w-full h-full opacity-0 cursor-pointer ${activeThumb === "min" ? "z-30" : "z-10"}`}
                />
                <input
                  type="range"
                  min={MIN_LIMIT}
                  max={MAX_LIMIT}
                  step={STEP}
                  value={budget[1]}
                  onChange={(e) =>
                    setBudget([
                      budget[0],
                      Math.max(+e.target.value, budget[0] + STEP),
                    ])
                  }
                  onMouseDown={() => setActiveThumb("max")}
                  onTouchStart={() => setActiveThumb("max")}
                  onFocus={() => setActiveThumb("max")}
                  className={`absolute w-full h-full opacity-0 cursor-pointer ${activeThumb === "max" ? "z-30" : "z-20"}`}
                />

                {/* Thumbs (Visual Only) with live tooltips */}
                <div
                  className="absolute top-1/2 -mt-3 w-6 h-6 bg-primary border border-secondary/30 shadow-md rounded-full flex items-center justify-center pointer-events-none"
                  style={{
                    left: `calc(${(budget[0] / MAX_LIMIT) * 100}% - 12px)`,
                  }}
                >
                 
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                </div>
                <div
                  className="absolute top-1/2 -mt-3 w-6 h-6 bg-primary border border-secondary/30 shadow-md rounded-full flex items-center justify-center pointer-events-none"
                  style={{
                    left: `calc(${(budget[1] / MAX_LIMIT) * 100}% - 12px)`,
                  }}
                >
                 
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                </div>
              </div>

              <div className="flex justify-between items-center gap-4">
                <div className="border rounded-xl px-4 py-2 w-full">
                  <label className="text-xs text-secondary/70 block">Min</label>
                  <input
                    type="number"
                    min={MIN_LIMIT}
                    max={Math.max(MIN_LIMIT, budget[1] - STEP)}
                    step={STEP}
                    value={minInput}
                    onChange={handleMinInputChange}
                    onBlur={commitMinInput}
                    onKeyDown={(e) => e.key === "Enter" && commitMinInput()}
                    className="w-full bg-transparent outline-none text-secondary font-bold"
                  />
                </div>
                <div className="text-secondary/70">-</div>
                <div className="border rounded-xl px-4 py-2 w-full">
                  <label className="text-xs text-secondary/70 block">Max</label>
                  <input
                    type="number"
                    min={Math.min(MAX_LIMIT, budget[0] + STEP)}
                    max={MAX_LIMIT}
                    step={STEP}
                    value={maxInput}
                    onChange={handleMaxInputChange}
                    onBlur={commitMaxInput}
                    onKeyDown={(e) => e.key === "Enter" && commitMaxInput()}
                    className="w-full bg-transparent outline-none text-secondary font-bold text-right"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ----- SEARCH BUTTON ----- */}
        <div className="pl-2 pr-2">
          <button
            onClick={handleSearch}
            className="bg-secondary hover:bg-secondary/90 text-white p-4 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <Search size={20} strokeWidth={3} />
            <span className="font-bold pr-2 hidden md:block">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}
