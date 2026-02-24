"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/router";
import { getMakersByFuelOrBodyType } from "@/services/filter";

/* ================= MOCK DATA ================= */
const LOCATION_SUGGESTIONS = [
  { id: 1, city: "Mumbai, Maharashtra", subtitle: "For luxury & premium cars" },
  { id: 2, city: "Delhi NCR", subtitle: "Largest used-car market" },
  { id: 3, city: "Bangalore, Karnataka", subtitle: "EV-friendly city" },
  { id: 4, city: "Pune, Maharashtra", subtitle: "Two-wheeler hub" },
];

const VEHICLE_TYPES = [
  { id: "two-wheeler", label: "2 Wheeler" },
  { id: "four-wheeler", label: "4 Wheeler" },
];

export const FOUR_WHEELER_TYPES = [
  { key: "Sedan", label: "Sedan" },
  { key: "Hatchback", label: "Hatchback" },
  { key: "suv", label: "SUV" },
  { key: "Luxury SUV", label: "Luxury SUV" },
  { key: "Luxury Sedan", label: "Luxury Sedan" },
];
export const TWO_WHEELER_TYPES = [
  { key: "bike", label: "Bike" },
  { key: "scooter", label: "Scooter" },
  { key: "electric_scooter", label: "Electric Scooter" },
  { key: "moped", label: "Moped" },
];

const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid", "LPG"];
const BUDGET_RANGE = [
  "0 - 1 L",
  "1 L - 2 L",
  "2 L - 3 L",
  "4 L - 5 L",
  "5 L - Above",
];

export default function VehicleFilterBar({ activeType = "vehicle" }) {
  const router = useRouter();

  /* ================= SHARED STATE ================= */
  const [activeTab, setActiveTab] = useState(null);
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [brand, setBrand] = useState("");
  const [budget, setBudget] = useState("");
  const [brandOptions, setBrandOptions] = useState([]);
  const [brandSearch, setBrandSearch] = useState("");

  const [priceRange, setPriceRange] = useState("");
  const [service, setService] = useState("");
  const [availability, setAvailability] = useState("");

  const containerRef = useRef(null);
  const brandInputRef = useRef(null);

  /* ================= LOGIC HELPERS ================= */
  const fetchBrands = async (
    currentFuel = fuelType,
    currentBody = bodyType,
  ) => {
    if (!currentFuel || !currentBody) return;
    try {
      const res = await getMakersByFuelOrBodyType({
        fuelType: currentFuel,
        bodyType: currentBody,
        page: 1,
        limit: 100,
      });
      setBrandOptions(res.data || []);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleActiveTabChange = (
    tabName,
    forceFuel = null,
    forceBody = null,
  ) => {
    setActiveTab(tabName);
    if (tabName === "brand") {
      const f = forceFuel || fuelType;
      const b = forceBody || bodyType;
      fetchBrands(f, b);
      setTimeout(() => brandInputRef.current?.focus(), 100);
    }
  };

  const filteredBrands = useMemo(() => {
    return brandOptions.filter((b) =>
      b.makeDisplay.toLowerCase().includes(brandSearch.toLowerCase()),
    );
  }, [brandOptions, brandSearch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveTab(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= NAVIGATION LOGIC ================= */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState("location");

  const TAB_ORDER =
    activeType === "consult"
      ? ["location", "vehicle", "priceRange", "service", "availability"]
      : ["location", "vehicle", "bodyType", "fuel", "brand", "budget"];

  const openNextAvailableTab = (currentTab, latestValue = null) => {
    const currentIndex = TAB_ORDER.indexOf(currentTab);

    let f = fuelType;
    let b = bodyType;
    if (currentTab === "fuel") f = latestValue;
    if (currentTab === "bodyType") b = latestValue;

    for (let i = currentIndex + 1; i < TAB_ORDER.length; i++) {
      const tab = TAB_ORDER[i];
      handleActiveTabChange(tab, f, b);
      return;
    }
    handleActiveTabChange(null);
  };

useEffect(() => {
    if (activeTab !== null) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [activeTab]);

  const handleSearch = () => {
    const query = new URLSearchParams({
      ...(location && { location }),
      ...(vehicleType && { vehicleType }),
      ...(activeType === "consult"
        ? { priceRange, service, availability }
        : { bodyType, fuelType, brand, budget }),
    }).toString();
    setActiveTab(null);
    setMobileOpen(false);
    router.push(`/search?${query}`);
  };

  return (
    <>
      <div className="hidden md:flex absolute bottom-[20vh] left-0 right-0 z-30 justify-center items-center px-4">
        <div className="w-full max-w-[1400px] animated-gradient-border shadow-2xl relative overflow-visible">
          <div
            ref={containerRef}
            className="inner-container w-full h-16 relative"
          >
            <div className="clip-layer absolute inset-0 rounded-full overflow-hidden z-0">
              <div className="absolute inset-0 bg-[url('/bg_blur_2.jpg')] bg-cover bg-center bg-no-repeat" />
              <div className="absolute inset-0 backdrop-blur-xl bg-secondary" />
            </div>

            <div className="relative z-10 flex items-center w-full h-full p-2 text-primary">
              {/* SECTION: LOCATION */}
              <div
                className={`flex-1 relative px-4 py-3 rounded-full transition-colors cursor-pointer ${activeTab === "location" ? "bg-white/20" : "hover:bg-white/10"}`}
                onClick={() => handleActiveTabChange("location")}
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
                {activeTab === "location" && (
                  <div className="absolute top-[110%] left-0 z-50 w-[320px] bg-neutral-900 rounded-xl shadow-2xl p-2 border border-neutral-800">
                    <div className="flex flex-col gap-1 max-h-[250px] overflow-y-auto custom-scrollbar">
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
                          className="flex items-center gap-4 py-2 px-3 hover:bg-neutral-800 rounded-lg text-left"
                        >
                          {item.city}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="w-px h-8 bg-white/30 my-auto mx-1" />

              {/* SECTION: VEHICLE TYPE */}
              <div
                className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${activeTab === "vehicle" ? "bg-white/20" : "hover:bg-white/10"}`}
                onClick={() => handleActiveTabChange("vehicle")}
              >
                <div className="text-md font-semibold text-primary tracking-wide">
                  Vehicle Type
                </div>
                <div className="text-sm font-medium text-gray-200">
                  {vehicleType || "Add type"}
                </div>
                {activeTab === "vehicle" && (
                  <div className="absolute top-[110%] left-0 z-50 w-[240px] bg-neutral-900 rounded-xl shadow-2xl p-2 border border-neutral-800">
                    {VEHICLE_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setVehicleType(type.label);
                          openNextAvailableTab("vehicle");
                        }}
                        className="w-full py-2 px-3 hover:bg-neutral-800 rounded-lg text-left text-sm font-semibold"
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-px h-8 bg-white/30 my-auto mx-1" />

              {/* CONDITIONAL SECTIONS */}
              {activeType === "consult" ? (
                <>
                  {/* PRICE RANGE */}
                  <div
                    className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${activeTab === "priceRange" ? "bg-white/20" : "hover:bg-white/10"}`}
                    onClick={() => handleActiveTabChange("priceRange")}
                  >
                    <div className="text-md font-semibold text-primary tracking-wide">
                      Price Range
                    </div>
                    <div className="text-sm font-medium text-gray-400 truncate">
                      {priceRange || "Select price"}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-white/30 my-auto mx-1" />
                  {/* SERVICE */}
                  <div
                    className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${activeTab === "service" ? "bg-white/20" : "hover:bg-white/10"}`}
                    onClick={() => handleActiveTabChange("service")}
                  >
                    <div className="text-md font-semibold text-primary tracking-wide">
                      Service
                    </div>
                    <div className="text-sm font-medium text-gray-400 truncate">
                      {service || "Select service"}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-white/30 my-auto mx-1" />
                  {/* AVAILABILITY */}
                  <div
                    className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${activeTab === "availability" ? "bg-white/20" : "hover:bg-white/10"}`}
                    onClick={() => handleActiveTabChange("availability")}
                  >
                    <div className="text-md font-semibold text-primary tracking-wide">
                      Availability
                    </div>
                    <div className="text-sm font-medium text-gray-400 truncate">
                      {availability || "Select availability"}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* BODY TYPE */}
                  <div
                    className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${activeTab === "bodyType" ? "bg-white/20" : "hover:bg-white/10"}`}
                    onClick={() => handleActiveTabChange("bodyType")}
                  >
                    <div className="text-md font-semibold text-primary tracking-wide">
                      Body Type
                    </div>
                    <div className="text-sm font-medium text-gray-200">
                      {bodyType || "Add type"}
                    </div>
                    {activeTab === "bodyType" && (
                      <div className="absolute top-[110%] left-0 z-50 w-[240px] bg-neutral-900 rounded-xl shadow-2xl p-2 border border-neutral-800 max-h-[250px] overflow-y-auto custom-scrollbar">
                        {(vehicleType === "4 Wheeler"
                          ? FOUR_WHEELER_TYPES
                          : TWO_WHEELER_TYPES
                        ).map((type) => (
                          <button
                            key={type.key}
                            onClick={(e) => {
                              e.stopPropagation();
                              setBodyType(type.label);
                              openNextAvailableTab("bodyType", type.label);
                            }}
                            className="w-full py-2 px-3 hover:bg-neutral-800 rounded-lg text-left text-sm font-semibold"
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="w-px h-8 bg-white/30 my-auto mx-1" />
                  {/* FUEL TYPE */}
                  <div
                    className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${activeTab === "fuel" ? "bg-white/20" : "hover:bg-white/10"}`}
                    onClick={() => handleActiveTabChange("fuel")}
                  >
                    <div className="text-md font-semibold text-primary tracking-wide">
                      Fuel Type
                    </div>
                    <div className="text-sm font-medium text-gray-200">
                      {fuelType || "Select fuel"}
                    </div>
                    {activeTab === "fuel" && (
                      <div className="absolute top-[110%] left-0 z-50 w-[240px] bg-neutral-900 rounded-xl shadow-2xl p-2 border border-neutral-800">
                        {FUEL_TYPES.map((f) => (
                          <button
                            key={f}
                            onClick={(e) => {
                              e.stopPropagation();
                              setFuelType(f);
                              openNextAvailableTab("fuel", f);
                            }}
                            className="w-full py-2 px-3 hover:bg-neutral-800 rounded-lg text-left text-sm font-semibold"
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="w-px h-8 bg-white/30 my-auto mx-1" />
                  {/* BRAND (INLINE SEARCH) */}
                  <div
                    className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${activeTab === "brand" ? "bg-white/20" : "hover:bg-white/10"}`}
                    onClick={() => handleActiveTabChange("brand")}
                  >
                    <div className="text-md font-semibold text-primary tracking-wide">
                      Brand
                    </div>
                    <input
                      ref={brandInputRef}
                      type="text"
                      placeholder={brand || "Search brand"}
                      className="w-full bg-transparent border-none outline-none text-sm text-gray-200 placeholder-gray-400 font-medium truncate"
                      value={brandSearch}
                      onChange={(e) => setBrandSearch(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    {activeTab === "brand" && (
                      <div className="absolute top-[110%] left-0 z-50 w-[300px] bg-neutral-900 rounded-xl shadow-2xl p-2 border border-neutral-800">
                        <div className="flex flex-col max-h-[250px] overflow-y-auto custom-scrollbar">
                          {filteredBrands.map((b) => (
                            <button
                              key={b.makeId}
                              onClick={(e) => {
                                e.stopPropagation();
                                setBrand(b.makeName);
                                setBrandSearch("");
                                openNextAvailableTab("brand");
                              }}
                              className="w-full py-1.5 px-3 hover:bg-neutral-800 rounded-lg text-left text-sm font-semibold"
                            >
                              {b.makeDisplay}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-px h-8 bg-white/30 my-auto mx-1" />
                  {/* BUDGET */}
                  <div
                    className={`flex-1 relative px-6 py-3 rounded-full transition-colors cursor-pointer ${activeTab === "budget" ? "bg-white/20" : "hover:bg-white/10"}`}
                    onClick={() => handleActiveTabChange("budget")}
                  >
                    <div className="text-md font-semibold text-primary tracking-wide">
                      Budget
                    </div>
                    <div className="text-sm font-medium text-gray-400 truncate">
                      {budget || "Select budget"}
                    </div>
                    {activeTab === "budget" && (
                      <div className="absolute top-[110%] left-0 z-50 w-[240px] bg-neutral-900 rounded-xl shadow-2xl p-2 border border-neutral-800">
                        {BUDGET_RANGE.map((range) => (
                          <button
                            key={range}
                            onClick={(e) => {
                              e.stopPropagation();
                              setBudget(range);
                              openNextAvailableTab("budget");
                            }}
                            className="w-full py-2 px-3 hover:bg-neutral-800 rounded-lg text-left text-sm font-semibold"
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="pl-2 pr-2">
                <button
                  onClick={handleSearch}
                  className="bg-white hover:bg-gray-200 text-black p-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  <Search size={20} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE TRIGGER */}
      <div className="md:hidden fixed bottom-4 left-0 right-0 px-4 z-40">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-full py-4 flex items-center justify-center gap-2 shadow-lg"
        >
          <Search size={18} className="text-white" />
          <span className="font-medium text-white">Start your search</span>
        </button>
      </div>
    </>
  );
}
