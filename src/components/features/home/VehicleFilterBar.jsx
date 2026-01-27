"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/router";

/* ================= MOCK DATA ================= */
const LOCATION_SUGGESTIONS = [
  {
    id: 1,
    city: "Mumbai, Maharashtra",
    subtitle: "For luxury & premium cars",
  },
  { id: 2, city: "Delhi NCR", subtitle: "Largest used-car market" },
  {
    id: 3,
    city: "Bangalore, Karnataka",
    subtitle: "EV-friendly city",
  },
  { id: 4, city: "Pune, Maharashtra", subtitle: "Two-wheeler hub" },
];

const VEHICLE_TYPES = [
  { id: "two-wheeler", label: "2 Wheeler" },
  { id: "four-wheeler", label: "4 Wheeler" },
];

export const FOUR_WHEELER_TYPES = [
  { key: "sedan", label: "Sedan" },
  { key: "hatchback", label: "Hatchback" },
  { key: "suv", label: "SUV" },
  { key: "mpv", label: "MPV" },
  { key: "van", label: "Van" },
];
export const TWO_WHEELER_TYPES = [
  { key: "bike", label: "Bike" },
  { key: "scooter", label: "Scooter" },
  { key: "electric_scooter", label: "Electric Scooter" },
  { key: "moped", label: "Moped" },
];

const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
const BUDGET_RANGE = ["0 - 1 L", "1 L - 2 L", "2 L - 3 L", "3 L - 4 L", "4 L - 5 L", "5 L - 6 L", "5 L - Above"]
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

const TAB_ORDER = [
  "location",
  "vehicle",
  "bodyType",
  "fuel",
  "brand",
  "budget",
];

export default function VehicleFilterBar() {
  const router = useRouter();
  /* ================= SHARED STATE ================= */
  const [activeTab, setActiveTab] = useState(null);
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [brand, setBrand] = useState("");
  const [budget, setBudget] = useState("");

  const containerRef = useRef(null);
  const locationRef = useRef(null);
  const vehicleRef = useRef(null);
  const bodyRef = useRef(null);
  const fuelRef = useRef(null);
  const brandRef = useRef(null);
  const budgetRef = useRef(null);

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

  const TAB_STATE_MAP = {
    location: location,
    vehicle: vehicleType,
    bodyType: bodyType,
    fuel: fuelType,
    brand: brand,
    budget: budget,
  };

  const openNextAvailableTab = (currentTab) => {
    const currentIndex = TAB_ORDER.indexOf(currentTab);

    for (let i = currentIndex + 1; i < TAB_ORDER.length; i++) {
      const tab = TAB_ORDER[i];
      if (!TAB_STATE_MAP[tab]) {
        setActiveTab(tab);
        return;
      }
    }

    setActiveTab(null);
  };

  const handleSearch = () => {
    const query = new URLSearchParams({
      ...(location && { location }),
      ...(vehicleType && { vehicleType }),
      ...(bodyType && { bodyType }),
      ...(fuelType && { fuelType }),
      ...(brand && { brand }),
      ...(budget && { budget }),
    }).toString();

    setActiveTab(null);
    setMobileOpen(false);

    router.push(`/search?${query}`);
  };


  return (
    <>


      <div className="hidden md:flex absolute bottom-[20vh] left-0 right-0 z-30 justify-center items-center px-4">
        {/* Wrapper for Width Constraint */}
        <div className="w-full max-w-[1400px] animated-gradient-border shadow-2xl relative overflow-visible">
          <div
            ref={containerRef}
            className="inner-container w-full h-16 relative"
          >
            {/* BACKGROUND IMAGE INSIDE SEARCH BAR */}
            {/* CLIPPED AREA */}
            <div className="clip-layer absolute inset-0 rounded-full overflow-hidden z-0">
              <div className="absolute inset-0 bg-[url('/bg_blur_2.jpg')] bg-cover bg-center bg-no-repeat" />
              <div className="absolute inset-0 backdrop-blur-xl bg-secondary" />
            </div>

            {/* CONTENT (Relative + z-10 to sit ON TOP of the image) */}
            <div className="relative z-10 flex items-center w-full h-full p-2 text-primary">
              {/* ----- SECTION 1: LOCATION ----- */}
              <div
                ref={locationRef}
                className={`flex-1 relative px-4 py-3 rounded-full transition-colors cursor-pointer ${activeTab === "location" ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                onClick={() => setActiveTab("location")}
              >
                <div className="text-md font-semibold text-primary tracking-wide">
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
                  <div
                    className="absolute top-[110%] left-0 z-50 w-[350px]
             bg-neutral-900 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
             overflow-hidden p-3 border border-neutral-800
             animate-in fade-in zoom-in-95 duration-200"
                  >
                    <div className="text-xs font-semibold text-gray-500 mb-3 px-2">
                      SUGGESTED REGIONS
                    </div>
                    <div className="flex flex-col gap-1 max-h-56 overflow-y-auto custom-scrollbar">
                      {LOCATION_SUGGESTIONS.filter((i) =>
                        i.city.toLowerCase().includes(location.toLowerCase()),
                      ).map((item) => (
                        <button
                          key={item.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocation(item.city);
                            openNextAvailableTab("location");
                          }}
                          className="flex items-center gap-4 py-2 px-3 hover:bg-neutral-800 rounded-lg transition-all text-left group cursor-pointer"
                        >
                          <div>
                            <div className="font-semibold text-gray-100 text-sm">
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
                ref={vehicleRef}
                className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${activeTab === "vehicle" ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                onClick={() => setActiveTab("vehicle")}
              >
                <div className="text-md font-semibold text-primary tracking-wide">
                  Vehicle Type
                </div>
                <div
                  className={`text-sm font-medium truncate ${vehicleType ? "text-gray-200" : "text-gray-400"
                    }`}
                >
                  {vehicleType || "Add type"}
                </div>

                {activeTab === "vehicle" && (
                  <div
                    className="absolute top-[110%] left-0 z-50 w-[350px]
             bg-neutral-900 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
             overflow-hidden p-3 border border-neutral-800
             animate-in fade-in zoom-in-95 duration-200"
                  >
                    <div className="flex flex-col max-h-56 overflow-y-auto custom-scrollbar">
                      {VEHICLE_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setVehicleType(type.label);
                            openNextAvailableTab("vehicle");
                          }}
                          className="w-full flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-neutral-800 rounded-lg transition-all"
                        >
                          <div className="text-left">
                            <div className="font-semibold text-gray-100 text-sm">
                              {type.label}
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

              {/* ----- SECTION 3: VEHICLE SUB TYPE ----- */}
              <div
                ref={bodyRef}
                className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${activeTab === "bodyType" ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                onClick={() => setActiveTab("bodyType")}
              >
                <div className="text-md font-semibold text-primary tracking-wide">
                  Body Type
                </div>
                <div
                  className={`text-sm font-medium truncate ${bodyType ? "text-gray-200" : "text-gray-400"
                    }`}
                >
                  {bodyType || "Add type"}
                </div>

                {activeTab === "bodyType" && (
                  <div
                    className="absolute top-[110%] left-0 z-50 w-[350px]
             bg-neutral-900 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
             overflow-hidden p-3 border border-neutral-800
             animate-in fade-in zoom-in-95 duration-200"
                  >
                    <div className="flex flex-col max-h-56 overflow-y-auto custom-scrollbar">
                      {vehicleType === "4 Wheeler" ?
                        FOUR_WHEELER_TYPES.map((type) => (
                          <button
                            key={type.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setBodyType(type.label);
                              openNextAvailableTab("bodyType");
                            }}
                            className="w-full flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-neutral-800 rounded-lg transition-all"
                          >
                            <div className="text-left">
                              <div className="font-semibold text-gray-100 text-sm">
                                {type.label}
                              </div>
                            </div>
                          </button>
                        )) : (
                          TWO_WHEELER_TYPES.map((type) => (
                            <button
                              key={type.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setBodyType(type.label);
                                openNextAvailableTab("bodyType");
                              }}
                              className="w-full flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-neutral-800 rounded-lg transition-all"
                            >
                              <div className="text-left">
                                <div className="font-semibold text-gray-100 text-sm">
                                  {type.label}
                                </div>
                              </div>
                            </button>
                          ))
                        )
                      }
                    </div>
                  </div>
                )}
              </div>

              {/* DIVIDER */}
              <div className="w-px h-8 bg-white/30 my-auto mx-1" />

              {/* ----- SECTION 3: FUEL TYPE ----- */}
              <div
                ref={fuelRef}
                className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${activeTab === "fuel" ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                onClick={() => setActiveTab("fuel")}
              >
                <div className="text-md font-semibold text-primary tracking-wide">
                  Fuel Type
                </div>
                <div
                  className={`text-sm font-medium truncate ${fuelType ? "text-gray-200" : "text-gray-400"
                    }`}
                >
                  {fuelType || "Select fuel"}
                </div>

                {activeTab === "fuel" && (
                  <div
                    className="absolute top-[110%] left-0 z-50 w-[350px]
             bg-neutral-900 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
             overflow-hidden p-3 border border-neutral-800
             animate-in fade-in zoom-in-95 duration-200"
                  >
                    <div className="flex flex-col max-h-56 overflow-y-auto custom-scrollbar">
                      {FUEL_TYPES.map((f) => (
                        <button
                          key={f}
                          onClick={(e) => {
                            e.stopPropagation();
                            setFuelType(f);
                            openNextAvailableTab("fuel");
                          }}
                          className="w-full text-left py-2 px-3 cursor-pointer hover:bg-neutral-800 rounded-lg transition-all"
                        >
                          <div className="font-semibold text-gray-100 text-sm">{f}</div>
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
                ref={brandRef}
                className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${activeTab === "brand" ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                onClick={() => setActiveTab("brand")}
              >
                <div className="text-md font-semibold text-primary tracking-wide">
                  Brand
                </div>
                <div
                  className={`text-sm font-medium truncate ${brand ? "text-gray-200" : "text-gray-400"
                    }`}
                >
                  {brand || "Select brand"}
                </div>

                {activeTab === "brand" && (
                  <div
                    className="absolute top-[110%] left-0 z-50 w-[350px]
             bg-neutral-900 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
             overflow-hidden p-3 border border-neutral-800
             animate-in fade-in zoom-in-95 duration-200"
                  >
                    <div className="flex flex-col max-h-56 overflow-y-auto custom-scrollbar">
                      {BRANDS.map((b, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setBrand(b);
                            openNextAvailableTab("brand");
                          }}
                          className="w-full text-left py-2 px-3 cursor-pointer hover:bg-neutral-800 rounded-lg transition-all"
                        >
                          <div className="font-semibold text-gray-100 text-sm">{b}</div>
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
                ref={budgetRef}
                className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${activeTab === "budget" ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                onClick={() => setActiveTab("budget")}
              >
                <div className="text-md font-semibold text-primary tracking-wide">
                  Budget
                </div>
                <div className="text-sm font-medium text-gray-400 truncate">
                  {budget || "Select budget"}
                </div>

                {activeTab === "budget" && (
                  <div
                    className="absolute top-[110%] left-0 z-50 w-[350px]
             bg-neutral-900 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
             overflow-hidden p-3 border border-neutral-800
             animate-in fade-in zoom-in-95 duration-200"
                  >
                    <div className="flex flex-col max-h-56 overflow-y-auto custom-scrollbar">
                      {BUDGET_RANGE.map((range) => (
                        <button
                          key={range}
                          onClick={(e) => {
                            e.stopPropagation();
                            setBudget(range);     // ✅ correct
                            openNextAvailableTab("budget");
                          }}
                          className="w-full text-left py-2 px-3 cursor-pointer
                     hover:bg-neutral-800 rounded-lg transition-all"
                        >
                          <div className="font-semibold text-gray-100 text-sm">{range}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ----- SEARCH BUTTON ----- */}
              <div className="pl-2 pr-2">
                <button
                  onClick={handleSearch}
                  className="bg-white hover:bg-gray-200 text-black p-3 rounded-full shadow-lg cursor-pointer flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
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
                  className={`pb-2 font-semibold whitespace-nowrap border-b-2 ${mobileTab === tab
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
