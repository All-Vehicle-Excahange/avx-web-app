/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/router";
import { getMakersByFuelOrBodyType, SearchCityAndState, getPopularCityAndState } from "@/services/filter";
import { getAllConsultService } from "@/services/consult.filter.service";

/* ================= CONSTANTS ================= */

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

const CONSULT_PRICE_RANGE = [
  "0 - 1 L",
  "1 L - 2 L",
  "2 L - 3 L",
  "4 L - 5 L",
  "5 L - Above",
];

const AVAILABILITY_OPTIONS = [
  { label: "1 - 10", value: "1-10" },
  { label: "10 - 25", value: "10-25" },
  { label: "25 - 50", value: "25-50" },
  { label: "50+", value: "50+" },
];

export default function VehicleFilterBar({ activeType = "vehicle" }) {
  const router = useRouter();

  /* ================= SHARED STATE ================= */
  const [activeTab, setActiveTab] = useState(null);
  const [location, setLocation] = useState("");
  const [cityId, setCityId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [vehicleType, setVehicleType] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [brand, setBrand] = useState("");
  const [makerId, setMakerId] = useState(null);
  const [budget, setBudget] = useState("");
  const [brandOptions, setBrandOptions] = useState([]);
  const [brandSearch, setBrandSearch] = useState("");

  const [priceRange, setPriceRange] = useState("");
  const [service, setService] = useState("");
  const [availability, setAvailability] = useState("");
  const [serviceOptions, setServiceOptions] = useState([]);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);


  const containerRef = useRef(null);
  const brandInputRef = useRef(null);
  const searchTimerRef = useRef(null);
  const mobileTriggerRef = useRef(null);

  /* ================= CITY / STATE API ================= */
  const fetchPopularCities = async () => {
    try {
      const res = await getPopularCityAndState();
      if (res?.data && Array.isArray(res.data)) {
        setLocationSuggestions(res.data);
      }
    } catch (err) {
      console.error("Error fetching popular cities:", err);
    }
  };

  const searchCities = async (term) => {
    if (!term || term.trim().length < 2) {
      fetchPopularCities();
      return;
    }
    try {
      const res = await SearchCityAndState({ searchTerm: term.trim() });
      if (res?.data && Array.isArray(res.data)) {
        setLocationSuggestions(res.data);
      }
    } catch (err) {
      console.error("Error searching cities:", err);
    }
  };

  const handleLocationChange = (e) => {
    const val = e.target.value;
    setLocation(val);
    setCityId(null);
    setStateId(null);

    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => searchCities(val), 350);
  };

  useEffect(() => {
    fetchPopularCities();
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, []);

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
    if (tabName === "service" && serviceOptions.length === 0) {
      fetchServices();
    }
  };

  const fetchServices = async () => {
    try {
      const res = await getAllConsultService({ pageNo: 1, size: 20 });
      if (res.success && Array.isArray(res.data)) {
        const apiServices = res.data.map((svc) => ({
          value: svc,
          label: svc
            .split("_")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
            )
            .join(" "),
        }));
        setServiceOptions(apiServices);
      }
    } catch (err) {
      console.error("Failed to load services:", err);
    }
  };

  const filteredBrands = useMemo(() => {
    return brandOptions.filter((b) =>
      b.makeDisplay.toLowerCase().includes(brandSearch.toLowerCase()),
    );
  }, [brandOptions, brandSearch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Do not close tabs if the user is interacting with the mobile proper box modal
      if (document.getElementById("mobile-drawer")?.contains(e.target)) {
        return;
      }
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveTab(null);
      }
      if (mobileTriggerRef.current && !mobileTriggerRef.current.contains(e.target)) {
        setShowTypeDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= NAVIGATION LOGIC ================= */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState("location");
  const [internalActiveType, setInternalActiveType] = useState(activeType);
  const [isScrolled, setIsScrolled] = useState(false);

  // Keep internalActiveType in sync when the parent changes the activeType prop
  useEffect(() => {
    setInternalActiveType(activeType);
  }, [activeType]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const TAB_ORDER =
    internalActiveType === "consult"
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
    if (activeTab !== null || mobileOpen) {
      if (typeof window !== "undefined") {
        const scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";
      }
    } else {
      if (typeof window !== "undefined") {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        if (scrollY) {
          const top = parseInt(scrollY || "0") * -1;
          window.scrollTo(0, top);
        }
      }
    }
  }, [activeTab, mobileOpen]);

  const handleSearch = () => {
    // Save/overwrite selected location to localStorage
    if (stateId && cityId && location) {
      const [cityName, stateName] = location.split(", ").map((str) => str.trim());
      if (cityName && stateName) {
        const locationData = {
          stateId,
          stateName,
          cityId,
          cityName,
        };
        localStorage.setItem("avx_saved_location", JSON.stringify(locationData));
      }
    } else if (locationSuggestions?.length > 0 && location) {
      // In case they just typed an exact match but didn't click the dropdown
      const locMatch = locationSuggestions.find(
        (l) => `${l.cityName}, ${l.stateName}`.toLowerCase() === location.toLowerCase()
      );
      if (locMatch) {
        const locationData = {
          stateId: locMatch.stateId,
          stateName: locMatch.stateName,
          cityId: locMatch.cityId,
          cityName: locMatch.cityName,
        };
        localStorage.setItem("avx_saved_location", JSON.stringify(locationData));
      }
    }

    if (internalActiveType === "consult") {
      const query = new URLSearchParams({
        ...(location && { location }),
        ...(cityId && { cityId }),
        ...(stateId && { stateId }),
        ...(vehicleType && { vehicleType }),
        ...(priceRange && { priceRange }),
        ...(service && { service }),
        ...(availability && { availability }),
      }).toString();
      setActiveTab(null);
      setMobileOpen(false);
      router.push(`/consult/discovery${query ? `?${query}` : ""}`);
    } else {
      const query = new URLSearchParams({
        ...(location && { location }),
        ...(cityId && { cityId }),
        ...(stateId && { stateId }),
        ...(vehicleType && { vehicleType }),
        ...(bodyType && { bodyType }),
        ...(fuelType && { fuelType }),
        ...(brand && { brand }),
        ...(makerId && { makerId }),
        ...(budget && { budget }),
      }).toString();
      setActiveTab(null);
      setMobileOpen(false);
      router.push(`/search?${query}`);
    }
  };

  return (
    <>
      <div className="hidden lg:flex absolute bottom-[20vh] left-0 right-0 z-30 justify-center items-center px-4">
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
                  onChange={handleLocationChange}
                />
                {activeTab === "location" && (
                  <div className="absolute top-[110%] left-0 z-50 w-[360px] bg-neutral-900 rounded-xl shadow-2xl p-2 border border-neutral-800">
                    <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                      {locationSuggestions.length > 0 ? (
                        locationSuggestions.map((item) => (
                          <button
                            key={item.cityId}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLocation(`${item.cityName}, ${item.stateName}`);
                              setCityId(item.cityId);
                              setStateId(item.stateId);
                              openNextAvailableTab("location");
                            }}
                            className="flex items-center justify-between gap-4 py-2 px-3 hover:bg-neutral-800 rounded-lg text-left"
                          >
                            <span className="text-sm font-semibold text-white">{item.cityName}</span>
                            <span className="text-xs text-gray-400">{item.stateName}</span>
                          </button>
                        ))
                      ) : (
                        <div className="py-3 px-3 text-sm text-gray-400 text-center">
                          {location.length > 0 ? "No cities found" : "Loading..."}
                        </div>
                      )}
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
                  <div className="absolute top-[110%] left-0 z-50 w-60 bg-neutral-900 rounded-xl shadow-2xl p-2 border border-neutral-800">
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
              {internalActiveType === "consult" ? (
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
                    {activeTab === "priceRange" && (
                      <div className="absolute top-[110%] left-0 z-50 w-60 bg-neutral-900 rounded-xl shadow-2xl p-2 border border-neutral-800">
                        {CONSULT_PRICE_RANGE.map((range) => (
                          <button
                            key={range}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPriceRange(range);
                              openNextAvailableTab("priceRange");
                            }}
                            className="w-full py-2 px-3 hover:bg-neutral-800 rounded-lg text-left text-sm font-semibold"
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    )}
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
                    {activeTab === "service" && (
                      <div className="absolute top-[110%] left-0 z-50 w-[280px] bg-neutral-900 rounded-xl shadow-2xl p-2 border border-neutral-800">
                        <div className="flex flex-col max-h-[250px] overflow-y-auto custom-scrollbar">
                          {serviceOptions.length > 0 ? (
                            serviceOptions.map((svc) => (
                              <button
                                key={svc.value}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setService(svc.value);
                                  openNextAvailableTab("service");
                                }}
                                className="w-full py-2 px-3 hover:bg-neutral-800 rounded-lg text-left text-sm font-semibold"
                              >
                                {svc.label}
                              </button>
                            ))
                          ) : (
                            <div className="py-3 px-3 text-sm text-gray-400 text-center">
                              Loading...
                            </div>
                          )}
                        </div>
                      </div>
                    )}
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
                    {activeTab === "availability" && (
                      <div className="absolute top-[110%] left-0 z-50 w-60 bg-neutral-900 rounded-xl shadow-2xl p-2 border border-neutral-800">
                        {AVAILABILITY_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={(e) => {
                              e.stopPropagation();
                              setAvailability(opt.label);
                              openNextAvailableTab("availability");
                            }}
                            className="w-full py-2 px-3 hover:bg-neutral-800 rounded-lg text-left text-sm font-semibold"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
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
                      <div className="absolute top-[110%] left-0 z-50 w-60 bg-neutral-900 rounded-xl shadow-2xl p-2 border border-neutral-800 max-h-[250px] overflow-y-auto custom-scrollbar">
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
                      <div className="absolute top-[110%] left-0 z-50 w-60 bg-neutral-900 rounded-xl shadow-2xl p-2 border border-neutral-800">
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
                                setMakerId(b.makeId);
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
                      <div className="absolute top-[110%] left-0 z-50 w-60 bg-neutral-900 rounded-xl shadow-2xl p-2 border border-neutral-800">
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
                  className="bg-white cursor-pointer hover:bg-gray-200 text-black p-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  <Search size={20} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE FILTER SEARCH BAR */}
      <div
        ref={mobileTriggerRef}
        className={`lg:hidden fixed z-40 transition-all duration-500 ease-in-out ${isScrolled
          ? "bottom-4 right-4 w-14"
          : "bottom-4 left-0 right-0 px-4 w-full md:max-w-md md:left-1/2 md:-translate-x-1/2"
          }`}
      >
        <div className="relative">
          {showTypeDropdown && (
            <div className={`absolute bottom-[110%] mb-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-2 shadow-2xl animate-in slide-in-from-bottom-4 duration-300 ${isScrolled ? "right-0 w-[280px]" : "left-0 right-0"}`}>
              <button
                onClick={() => {
                  setInternalActiveType("vehicle");
                  setMobileOpen(true);
                  setShowTypeDropdown(false);
                }}
                className="w-full flex items-center gap-3 p-4 hover:bg-neutral-800 rounded-xl text-left"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary">
                  <Search size={18} />
                </div>
                <div>
                  <div className="text-white font-bold">Buy Vehicle</div>
                  <div className="text-gray-400 text-xs mt-0.5">Find your dream car or bike</div>
                </div>
              </button>
              <div className="h-px bg-neutral-800 mx-2 my-1" />
              <button
                onClick={() => {
                  setInternalActiveType("consult");
                  setMobileOpen(true);
                  setShowTypeDropdown(false);
                }}
                className="w-full flex items-center gap-3 p-4 hover:bg-neutral-800 rounded-xl text-left"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary">
                  <Search size={18} />
                </div>
                <div>
                  <div className="text-white font-bold">Search Consultation</div>
                  <div className="text-gray-400 text-xs mt-0.5">Expert advice for your vehicle</div>
                </div>
              </button>
            </div>
          )}
          <button
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className={`flex items-center justify-center gap-2 shadow-lg transition-all duration-500 ease-in-out cursor-pointer ${isScrolled
              ? "w-14 h-14 bg-fourth rounded-full"
              : "w-full py-4 bg-neutral-900 border border-neutral-800 rounded-full"
              }`}
          >
            <Search size={22} className="text-white" />
            {!isScrolled && <span className="font-medium text-white transition-opacity duration-300">Start your search</span>}
          </button>
        </div>
      </div>

      {/* MOBILE FULLSCREEN DRAWER -> NOW A PROPER MODAL BOX */}
      <div
        className={`lg:hidden fixed inset-0 z-[100] flex items-end sm:items-center justify-center transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop for click-outside to close */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => {
            setMobileOpen(false);
            setActiveTab(null);
          }}
        />

        {/* Proper Box */}
        <div
          id="mobile-drawer"
          className={`relative w-full sm:w-[90%] max-w-md bg-secondary rounded-t-3xl sm:rounded-3xl flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-y-0' : 'translate-y-full sm:scale-95'} max-h-[85vh]`}
        >
          {/* Header */}
          <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-secondary rounded-t-3xl sm:rounded-3xl shrink-0">
            <h2 className="text-xl font-bold text-primary">Search Filters</h2>
            <button onClick={() => { setMobileOpen(false); setActiveTab(null); }} className="p-1 bg-white cursor-pointer rounded-full hover:opacity-70 text-secondary">
              <X size={20} />
            </button>
          </div>

          <div className="p-4 space-y-3 overflow-y-auto flex-1 text-primary custom-scrollbar pb-6">
            {/* Location */}
            <div className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "location" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}>
              <button
                onClick={() => handleActiveTabChange(activeTab === "location" ? null : "location")}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex flex-col items-start w-full">
                  <span className="text-xs font-semibold text-primary">Location</span>
                  <span className={`font-medium text-sm mt-1 truncate w-full ${location ? "text-white" : "text-gray-500"}`}>{location || "Search destinations"}</span>
                </div>
              </button>
              {activeTab === "location" && (
                <div className="p-4 pt-0 border-t border-neutral-800 border-opacity-50">
                  <input
                    type="text"
                    placeholder="Search destinations"
                    className="w-full bg-neutral-800 outline-none text-white py-3 px-4 rounded-xl mt-3 text-sm"
                    value={location}
                    onChange={handleLocationChange}
                    autoFocus
                  />
                  {locationSuggestions.length > 0 && location && (
                    <div className="mt-2 bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700">
                      {locationSuggestions.map((item) => (
                        <button
                          key={item.cityId}
                          onClick={() => {
                            setLocation(`${item.cityName}, ${item.stateName}`);
                            setCityId(item.cityId);
                            setStateId(item.stateId);
                            setLocationSuggestions([]);
                            openNextAvailableTab("location");
                          }}
                          className="w-full flex items-center justify-between gap-4 py-3 px-4 border-b border-neutral-700 last:border-0 hover:bg-neutral-700 text-left"
                        >
                          <span className="text-sm font-semibold text-white">{item.cityName}</span>
                          <span className="text-xs text-gray-400">{item.stateName}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Vehicle Type */}
            <div className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "vehicle" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}>
              <button
                onClick={() => handleActiveTabChange(activeTab === "vehicle" ? null : "vehicle")}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex flex-col items-start w-full">
                  <span className="text-xs font-semibold text-primary">Vehicle Type</span>
                  <span className={`font-medium text-sm mt-1 truncate w-full ${vehicleType ? "text-white" : "text-gray-500"}`}>{vehicleType || "Add type"}</span>
                </div>
              </button>
              {activeTab === "vehicle" && (
                <div className="p-4 pt-0 border-t border-neutral-800 border-opacity-50 flex gap-2">
                  {VEHICLE_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => { setVehicleType(type.label); openNextAvailableTab("vehicle"); }}
                      className={`flex-1 mt-3 py-3 text-sm font-bold rounded-lg transition-colors ${vehicleType === type.label ? 'bg-white text-black' : 'bg-neutral-800 text-gray-400 hover:text-white'}`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {internalActiveType === "consult" ? (
              <>
                {/* Price Range */}
                <div className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "priceRange" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}>
                  <button onClick={() => handleActiveTabChange(activeTab === "priceRange" ? null : "priceRange")} className="w-full flex items-center justify-between p-4 text-left">
                    <div className="flex flex-col items-start w-full">
                      <span className="text-xs font-semibold text-primary">Price Range</span>
                      <span className={`font-medium text-sm mt-1 truncate w-full ${priceRange ? "text-white" : "text-gray-500"}`}>{priceRange || "Select price"}</span>
                    </div>
                  </button>
                  {activeTab === "priceRange" && (
                    <div className="p-2 border-t border-neutral-800 border-opacity-50">
                      {CONSULT_PRICE_RANGE.map(range => (
                        <button
                          key={range}
                          onClick={() => { setPriceRange(range); openNextAvailableTab("priceRange"); }}
                          className={`w-full py-3 px-4 rounded-lg text-left text-sm font-semibold mt-1 ${priceRange === range ? 'bg-white text-black' : 'hover:bg-neutral-800 text-white'}`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Service */}
                <div className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "service" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}>
                  <button onClick={() => handleActiveTabChange(activeTab === "service" ? null : "service")} className="w-full flex items-center justify-between p-4 text-left">
                    <div className="flex flex-col items-start w-full">
                      <span className="text-xs font-semibold text-primary">Service</span>
                      <span className={`font-medium text-sm mt-1 truncate w-full ${service ? "text-white" : "text-gray-500"}`}>{service || "Select service"}</span>
                    </div>
                  </button>
                  {activeTab === "service" && (
                    <div className="p-2 border-t border-neutral-800 border-opacity-50 max-h-64 overflow-y-auto">
                      {serviceOptions.length > 0 ? serviceOptions.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => { setService(opt.value); openNextAvailableTab("service"); }}
                          className={`w-full py-3 px-4 rounded-lg text-left text-sm font-semibold mt-1 ${service === opt.value ? 'bg-white text-black' : 'hover:bg-neutral-800 text-white'}`}
                        >
                          {opt.label}
                        </button>
                      )) : <div className="p-4 text-sm text-center text-gray-400">Loading...</div>}
                    </div>
                  )}
                </div>

                {/* Availability */}
                <div className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "availability" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}>
                  <button onClick={() => handleActiveTabChange(activeTab === "availability" ? null : "availability")} className="w-full flex items-center justify-between p-4 text-left">
                    <div className="flex flex-col items-start w-full">
                      <span className="text-xs font-semibold text-primary">Availability</span>
                      <span className={`font-medium text-sm mt-1 truncate w-full ${availability ? "text-white" : "text-gray-500"}`}>{availability || "Select availability"}</span>
                    </div>
                  </button>
                  {activeTab === "availability" && (
                    <div className="p-2 border-t border-neutral-800 border-opacity-50">
                      {AVAILABILITY_OPTIONS.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => { setAvailability(opt.label); openNextAvailableTab("availability"); }}
                          className={`w-full py-3 px-4 rounded-lg text-left text-sm font-semibold mt-1 ${availability === opt.label ? 'bg-white text-black' : 'hover:bg-neutral-800 text-white'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Body Type */}
                <div className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "bodyType" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}>
                  <button onClick={() => handleActiveTabChange(activeTab === "bodyType" ? null : "bodyType")} className="w-full flex items-center justify-between p-4 text-left">
                    <div className="flex flex-col items-start w-full">
                      <span className="text-xs font-semibold text-primary">Body Type</span>
                      <span className={`font-medium text-sm mt-1 truncate w-full ${bodyType ? "text-white" : "text-gray-500"}`}>{bodyType || "Add type"}</span>
                    </div>
                  </button>
                  {activeTab === "bodyType" && (
                    <div className="p-2 border-t border-neutral-800 border-opacity-50 max-h-64 overflow-y-auto custom-scrollbar">
                      {(vehicleType === "4 Wheeler" ? FOUR_WHEELER_TYPES : TWO_WHEELER_TYPES).map(type => (
                        <button
                          key={type.key}
                          onClick={() => { setBodyType(type.label); openNextAvailableTab("bodyType", type.label); }}
                          className={`w-full py-3 px-4 rounded-lg text-left text-sm font-semibold mt-1 ${bodyType === type.label ? 'bg-white text-black' : 'hover:bg-neutral-800 text-white'}`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fuel Type */}
                <div className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "fuel" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}>
                  <button onClick={() => handleActiveTabChange(activeTab === "fuel" ? null : "fuel")} className="w-full flex items-center justify-between p-4 text-left">
                    <div className="flex flex-col items-start w-full">
                      <span className="text-xs font-semibold text-primary">Fuel Type</span>
                      <span className={`font-medium text-sm mt-1 truncate w-full ${fuelType ? "text-white" : "text-gray-500"}`}>{fuelType || "Select fuel"}</span>
                    </div>
                  </button>
                  {activeTab === "fuel" && (
                    <div className="p-2 border-t border-neutral-800 border-opacity-50">
                      {FUEL_TYPES.map(fuel => (
                        <button
                          key={fuel}
                          onClick={() => { setFuelType(fuel); openNextAvailableTab("fuel", fuel); }}
                          className={`w-full py-3 px-4 rounded-lg text-left text-sm font-semibold mt-1 ${fuelType === fuel ? 'bg-white text-black' : 'hover:bg-neutral-800 text-white'}`}
                        >
                          {fuel}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Brand Search */}
                <div className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "brand" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}>
                  <button onClick={() => handleActiveTabChange(activeTab === "brand" ? null : "brand")} className="w-full flex items-center justify-between p-4 text-left">
                    <div className="flex flex-col items-start w-full">
                      <span className="text-xs font-semibold text-primary">Brand</span>
                      <span className={`font-medium text-sm mt-1 truncate w-full ${brand ? "text-white" : "text-gray-500"}`}>{brand || "Search brand"}</span>
                    </div>
                  </button>
                  {activeTab === "brand" && (
                    <div className="p-4 pt-0 border-t border-neutral-800 border-opacity-50 flex flex-col items-center">
                      <input
                        type="text"
                        placeholder="Search brand"
                        className="w-full bg-neutral-800 outline-none text-white py-3 px-4 rounded-xl mt-3 text-sm"
                        value={brandSearch || brand}
                        onChange={(e) => {
                          setBrandSearch(e.target.value);
                          if (!e.target.value) { setBrand(''); setMakerId(null); }
                        }}
                      />
                      <div className="mt-2 w-full max-h-48 overflow-y-auto rounded-xl">
                        {filteredBrands.map(b => (
                          <button
                            key={b.makeId}
                            onClick={() => {
                              setBrand(b.makeName);
                              setMakerId(b.makeId);
                              setBrandSearch("");
                              openNextAvailableTab("brand");
                            }}
                            className={`w-full py-3 px-4 border-b border-neutral-700 last:border-none text-left text-sm font-semibold text-white ${brand === b.makeName ? 'bg-white text-black' : 'hover:bg-neutral-800'}`}
                          >
                            {b.makeDisplay}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Budget */}
                <div className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "budget" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}>
                  <button onClick={() => handleActiveTabChange(activeTab === "budget" ? null : "budget")} className="w-full flex items-center justify-between p-4 text-left">
                    <div className="flex flex-col items-start w-full">
                      <span className="text-xs font-semibold text-primary">Budget</span>
                      <span className={`font-medium text-sm mt-1 truncate w-full ${budget ? "text-white" : "text-gray-500"}`}>{budget || "Select budget"}</span>
                    </div>
                  </button>
                  {activeTab === "budget" && (
                    <div className="p-2 border-t border-neutral-800 border-opacity-50">
                      {BUDGET_RANGE.map(range => (
                        <button
                          key={range}
                          onClick={() => { setBudget(range); openNextAvailableTab("budget"); }}
                          className={`w-full py-3 px-4 rounded-lg text-left text-sm font-semibold mt-1 ${budget === range ? 'bg-white text-black' : 'hover:bg-neutral-800 text-white'}`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Bottom Search Button inside the proper box */}
          <div className="p-4 border-t border-neutral-800 shrink-0 bg-secondary sm:rounded-b-3xl">
            <button
              onClick={handleSearch}
              className="w-full bg-primary text-secondary font-bold text-lg py-4 rounded-full flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 transition-transform"
            >
              <Search size={20} />
              Search Vehicles
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
