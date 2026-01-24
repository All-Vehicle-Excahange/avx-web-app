"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

/* ================= MOCK DATA ================= */
const LOCATION_SUGGESTIONS = [
  {
    id: 1,
    city: "Mumbai, Maharashtra",
    subtitle: "For luxury & premium cars",
    icon: "🏙️",
  },
  { id: 2, city: "Delhi NCR", subtitle: "Largest used-car market", icon: "🚗" },
  {
    id: 3,
    city: "Bangalore, Karnataka",
    subtitle: "EV-friendly city",
    icon: "⚡",
  },
  { id: 4, city: "Pune, Maharashtra", subtitle: "Two-wheeler hub", icon: "🏍️" },
];

const VEHICLE_TYPES = [
  { id: "sedan", label: "Sedan", desc: "Comfort & Style" },
  { id: "suv", label: "SUV", desc: "Space & Power" },
  { id: "hatchback", label: "Hatchback", desc: "City Drive" },
  { id: "luxury", label: "Luxury", desc: "Premium Feel" },
];

const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
const BRANDS = [
  "Toyota",
  "Hyundai",
  "Maruti",
  "Honda",
  "Kia",
  "Tata",
  "BMW",
  "Audi",
];

export default function VehicleFilterBar() {
  /* ================= SHARED STATE ================= */
  const [activeTab, setActiveTab] = useState(null);
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [brand, setBrand] = useState("");
  const [budget, setBudget] = useState([1, 10]);

  const MIN_LIMIT = 1;
  const MAX_LIMIT = 10;
  const STEP = 1;

  const containerRef = useRef(null);
  const [activeThumb, setActiveThumb] = useState(null);
  const [minInput, setMinInput] = useState(String(budget[0]));
  const [maxInput, setMaxInput] = useState(String(budget[1]));

  useEffect(() => {
    setMinInput(String(budget[0]));
    setMaxInput(String(budget[1]));
  }, [budget]);

  const handleMinInputChange = (e) => setMinInput(e.target.value);
  const handleMaxInputChange = (e) => setMaxInput(e.target.value);
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

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

  useEffect(() => {
    const clear = () => setActiveThumb(null);
    document.addEventListener("mouseup", clear);
    document.addEventListener("touchend", clear);
    return () => {
      document.removeEventListener("mouseup", clear);
      document.removeEventListener("touchend", clear);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveTab(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= MOBILE STATE ================= */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState("location");

  const handleSearch = () => {
    console.log({ location, vehicleType, fuelType, brand, budget });
    setActiveTab(null);
    setMobileOpen(false);
  };

  return (
    <>
    

      <div className="hidden md:flex absolute bottom-[20vh] left-0 right-0 z-30 justify-center items-center px-4">
        {/* Wrapper for Width Constraint */}
        <div className="w-full max-w-6xl animated-gradient-border shadow-2xl">
          <div ref={containerRef} className="inner-container w-full h-16">
            {/* BACKGROUND IMAGE INSIDE SEARCH BAR */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[url('/bg_blur_2.jpg')] bg-cover bg-center bg-no-repeat" />
              <div className="absolute backdrop-blur-xl inset-0 bg-secondary" />
            </div>

            {/* CONTENT (Relative + z-10 to sit ON TOP of the image) */}
            <div className="relative z-10 flex items-center w-full h-full p-2 text-primary">
              {/* ----- SECTION 1: LOCATION ----- */}
              <div
                className={`flex-1 relative px-4 py-3 rounded-full transition-colors cursor-pointer ${
                  activeTab === "location" ? "bg-white/20" : "hover:bg-white/10"
                }`}
                onClick={() => setActiveTab("location")}
              >
                <div className="text-lg font-bold text-primary tracking-wide">
                  Location
                </div>
                <input
                  type="text"
                  placeholder="Search destinations"
                  className="w-full bg-transparent border-none outline-none text-sm text-gray-200 placeholder-gray-400 font-medium text-left truncate"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                {/* POPUP */}
                {activeTab === "location" && (
                  <div className="absolute top-[130%] left-0 w-[350px] bg-neutral-900 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden z-50 p-4 border border-neutral-800 animate-in fade-in zoom-in-95 duration-200">
                    <div className="text-xs font-semibold text-gray-500 mb-3 px-2">
                      SUGGESTED REGIONS
                    </div>
                    <div className="flex flex-col gap-1 max-h-56 overflow-y-auto">
                      {LOCATION_SUGGESTIONS.filter((i) =>
                        i.city.toLowerCase().includes(location.toLowerCase()),
                      ).map((item) => (
                        <button
                          key={item.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocation(item.city);
                            setActiveTab("vehicle");
                          }}
                          className="flex items-center gap-4 p-3 hover:bg-neutral-800 rounded-2xl transition-all text-left group"
                        >
                          <div className="text-2xl">{item.icon}</div>
                          <div>
                            <div className="font-bold text-gray-100 text-sm">
                              {item.city}
                            </div>
                            <div className="text-xs text-gray-500">
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
              <div className="w-px h-8 bg-white/30 my-auto mx-1" />

              {/* ----- SECTION 2: VEHICLE TYPE ----- */}
              <div
                className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${
                  activeTab === "vehicle" ? "bg-white/20" : "hover:bg-white/10"
                }`}
                onClick={() => setActiveTab("vehicle")}
              >
                <div className="text-lg font-bold text-primary tracking-wide">
                  Vehicle Type
                </div>
                <div
                  className={`text-sm font-medium truncate ${
                    vehicleType ? "text-gray-200" : "text-gray-400"
                  }`}
                >
                  {vehicleType || "Add type"}
                </div>

                {activeTab === "vehicle" && (
                  <div className="absolute top-[130%] left-[-50px] w-[300px] bg-neutral-900 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden z-50 p-2 border border-neutral-800 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex flex-col max-h-56 overflow-y-auto">
                      {VEHICLE_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setVehicleType(type.label);
                            setActiveTab("fuel");
                          }}
                          className="w-full flex items-center justify-between p-4 hover:bg-neutral-800 rounded-2xl transition-all border-b border-neutral-800 last:border-0"
                        >
                          <div className="text-left">
                            <div className="font-bold text-gray-100">
                              {type.label}
                            </div>
                            <div className="text-xs text-gray-500">
                              {type.desc}
                            </div>
                          </div>
                          {vehicleType === type.label && (
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* DIVIDER */}
              <div className="w-px h-8 bg-white/30 my-auto mx-1" />

              {/* ----- SECTION 3: FUEL TYPE ----- */}
              <div
                className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${
                  activeTab === "fuel" ? "bg-white/20" : "hover:bg-white/10"
                }`}
                onClick={() => setActiveTab("fuel")}
              >
                <div className="text-lg font-bold text-primary tracking-wide">
                  Fuel Type
                </div>
                <div
                  className={`text-sm font-medium truncate ${
                    fuelType ? "text-gray-200" : "text-gray-400"
                  }`}
                >
                  {fuelType || "Select fuel"}
                </div>

                {activeTab === "fuel" && (
                  <div className="absolute top-[130%] left-[-50px] w-[260px] bg-neutral-900 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden z-50 p-2 border border-neutral-800 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex flex-col max-h-56 overflow-y-auto">
                      {FUEL_TYPES.map((f) => (
                        <button
                          key={f}
                          onClick={(e) => {
                            e.stopPropagation();
                            setFuelType(f);
                            setActiveTab("brand");
                          }}
                          className="w-full text-left p-3 hover:bg-neutral-800 rounded-2xl transition-all border-b border-neutral-800 last:border-0"
                        >
                          <div className="font-bold text-gray-100">{f}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* DIVIDER */}
              <div className="w-px h-8 bg-white/30 my-auto mx-1" />

              {/* ----- SECTION 4: BRAND ----- */}
              <div
                className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${
                  activeTab === "brand" ? "bg-white/20" : "hover:bg-white/10"
                }`}
                onClick={() => setActiveTab("brand")}
              >
                <div className="text-lg font-bold text-primary tracking-wide">
                  Brand
                </div>
                <div
                  className={`text-sm font-medium truncate ${
                    brand ? "text-gray-200" : "text-gray-400"
                  }`}
                >
                  {brand || "Select brand"}
                </div>

                {activeTab === "brand" && (
                  <div className="absolute top-[130%] right-0 w-[320px] bg-neutral-900 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden z-50 p-2 border border-neutral-800 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex flex-col max-h-56 overflow-y-auto">
                      {BRANDS.map((b, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setBrand(b);
                            setActiveTab("budget");
                          }}
                          className="w-full text-left p-3 hover:bg-neutral-800 rounded-2xl transition-all border-b border-neutral-800 last:border-0"
                        >
                          <div className="font-bold text-gray-100">{b}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* DIVIDER */}
              <div className="w-px h-8 bg-white/30 my-auto mx-1" />

              {/* ----- SECTION 5: BUDGET ----- */}
              <div
                className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${
                  activeTab === "budget" ? "bg-white/20" : "hover:bg-white/10"
                }`}
                onClick={() => setActiveTab("budget")}
              >
                <div className="text-lg font-bold text-primary tracking-wide">
                  Budget
                </div>
                <div className="text-sm font-medium text-gray-400 truncate">
                  {budget[0]}L - {budget[1]}L
                </div>

                {activeTab === "budget" && (
                  <div
                    className="absolute top-[130%] right-0 w-[350px] bg-neutral-900 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden z-50 p-6 border border-neutral-800 animate-in fade-in zoom-in-95 duration-200 cursor-default"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-bold text-gray-100">
                        Price Range
                      </span>
                      <span className="text-sm text-gray-500">Lakhs</span>
                    </div>

                    <div className="relative h-2 bg-neutral-700 rounded-full mb-8">
                      <div
                        className="absolute h-full bg-blue-500 rounded-full opacity-80"
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
                        className="absolute w-full h-full opacity-0 cursor-pointer z-20"
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
                        className="absolute w-full h-full opacity-0 cursor-pointer z-30"
                      />
                      <div
                        className="absolute top-1/2 -mt-3 w-6 h-6 bg-neutral-900 border-2 border-blue-500 shadow-md rounded-full flex items-center justify-center pointer-events-none"
                        style={{
                          left: `calc(${
                            (budget[0] / MAX_LIMIT) * 100
                          }% - 12px)`,
                        }}
                      />
                      <div
                        className="absolute top-1/2 -mt-3 w-6 h-6 bg-neutral-900 border-2 border-blue-500 shadow-md rounded-full flex items-center justify-center pointer-events-none"
                        style={{
                          left: `calc(${
                            (budget[1] / MAX_LIMIT) * 100
                          }% - 12px)`,
                        }}
                      />
                    </div>

                    <div className="flex justify-between items-center gap-4">
                      <div className="border border-neutral-700 rounded-xl px-4 py-2 w-full">
                        <label className="text-xs text-gray-500 block">
                          Min
                        </label>
                        <input
                          type="number"
                          value={minInput}
                          onChange={handleMinInputChange}
                          onBlur={commitMinInput}
                          className="w-full bg-transparent outline-none text-gray-100 font-bold"
                        />
                      </div>
                      <div className="text-gray-500">-</div>
                      <div className="border border-neutral-700 rounded-xl px-4 py-2 w-full">
                        <label className="text-xs text-gray-500 block">
                          Max
                        </label>
                        <input
                          type="number"
                          value={maxInput}
                          onChange={handleMaxInputChange}
                          onBlur={commitMaxInput}
                          className="w-full bg-transparent outline-none text-gray-100 font-bold text-right"
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
                  className="bg-white hover:bg-gray-200 text-black p-3 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <Search size={20} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE SEARCH TRIGGER (ONLY FOR SMALL SCREENS)
         ========================================================= */}
      <div className="md:hidden fixed bottom-4 left-0 right-0 px-4 z-40">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-full py-4 flex items-center justify-center gap-2 shadow-lg"
        >
          <Search size={18} className="text-white" />
          <span className="font-medium text-white">Start your search</span>
        </button>
      </div>

      {/* =========================================================
          MOBILE FULL SCREEN MODAL
         ========================================================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black text-white">
          <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-800">
            <div className="font-bold text-white text-lg">Search</div>
            <button onClick={() => setMobileOpen(false)}>
              <X size={20} className="text-white" />
            </button>
          </div>
          <div className="px-4 pt-3 border-b border-neutral-800">
            <div className="flex gap-6 overflow-x-auto">
              {["location", "vehicle", "fuel", "brand"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMobileTab(tab)}
                  className={`pb-2 font-semibold whitespace-nowrap border-b-2 ${
                    mobileTab === tab
                      ? "border-white text-white"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  {tab === "location"
                    ? "Location"
                    : tab === "vehicle"
                      ? "Vehicle Type"
                      : tab === "fuel"
                        ? "Fuel Type"
                        : "Brand"}
                </button>
              ))}
            </div>
          </div>
          <div className="pb-28">
            {mobileTab === "location" && (
              <div className="px-4 py-4 space-y-3">
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Search destinations"
                  className="w-full border border-neutral-800 bg-neutral-900 rounded-xl px-4 py-3 text-white placeholder-gray-500"
                />
                {LOCATION_SUGGESTIONS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setLocation(l.city);
                      setMobileTab("vehicle");
                    }}
                    className="w-full flex gap-3 p-3 rounded-2xl border border-neutral-800 hover:bg-neutral-900"
                  >
                    <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center text-xl">
                      {l.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-200">{l.city}</div>
                      <div className="text-xs text-gray-500">{l.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {mobileTab === "vehicle" && (
              <div className="px-4 py-4 space-y-2">
                {VEHICLE_TYPES.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setVehicleType(v.label);
                      setMobileTab("fuel");
                    }}
                    className="w-full p-4 border border-neutral-800 bg-neutral-900 rounded-2xl text-left hover:bg-neutral-800"
                  >
                    <div className="font-semibold text-gray-200">{v.label}</div>
                    <div className="text-xs text-gray-500">{v.desc}</div>
                  </button>
                ))}
              </div>
            )}
            {mobileTab === "fuel" && (
              <div className="px-4 py-4 space-y-2">
                {FUEL_TYPES.map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setFuelType(f);
                      setMobileTab("brand");
                    }}
                    className="w-full p-4 border border-neutral-800 bg-neutral-900 rounded-2xl text-left hover:bg-neutral-800 text-gray-200"
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}
            {mobileTab === "brand" && (
              <div className="px-4 py-4 space-y-2">
                {BRANDS.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBrand(b)}
                    className="w-full p-4 border border-neutral-800 bg-neutral-900 rounded-2xl text-left hover:bg-neutral-800 text-gray-200"
                  >
                    {b}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-neutral-800 bg-black">
            <button
              onClick={handleSearch}
              className="w-full bg-white text-black py-4 rounded-xl font-bold"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </>
  );
}
