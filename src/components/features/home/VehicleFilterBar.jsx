"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/router";
import {
  getMakersByFuelOrBodyType,
  getAndSearchMakers,
  SearchCityAndState,
  getPopularCityAndState,
} from "@/services/filter";
import { getAllConsultService } from "@/services/consult.filter.service";
import { useUIStore } from "@/stores/useUIStore";

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
  { key: "scooter", label: "Scooters" },
  { key: "commuter_bikes", label: "Commuter Bikes" },
  { key: "sports_bikes", label: "Sports Bikes" },
  { key: "cruiser_retro", label: "Cruiser & Retro" },
  { key: "adventure_touring", label: "Adventure & Touring" },
  { key: "electric_2w", label: "Electric 2W" },
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
  const { push } = useRouter();

  /* ================= SHARED STATE ================= */
  const [activeTab, setActiveTab] = useState(null);
  const [location, setLocation] = useState("");
  const [cityId, setCityId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleTypeError, setVehicleTypeError] = useState(false);
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

  const availableFuelTypes = useMemo(() => {
    const isTwoWheeler = vehicleType && (vehicleType.toLowerCase().includes("2") || vehicleType.toLowerCase().includes("two"));
    if (isTwoWheeler) {
      return ["Petrol", "Diesel", "CNG", "Electric"];
    }
    return ["Petrol", "Diesel", "CNG", "Electric", "Hybrid", "LPG"];
  }, [vehicleType]);

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
        const suggestions = [...res.data];
        const seenStates = new Set();

        res.data.forEach((item) => {
          if (
            item.stateName &&
            item.stateId &&
            !seenStates.has(item.stateId)
          ) {
            seenStates.add(item.stateId);

            // Check if search term matches the state name (e.g. "harya" matches "Haryana")
            if (
              item.stateName
                .toLowerCase()
                .includes(term.toLowerCase().trim())
            ) {
              // Add the State as a top suggestion
              suggestions.unshift({
                isStateOnly: true,
                cityId: null,
                cityName: "",
                stateId: item.stateId,
                stateName: item.stateName,
              });
            }
          }
        });

        setLocationSuggestions(suggestions);
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
    try {
      if (currentFuel && currentBody) {
        const res = await getMakersByFuelOrBodyType({
          fuelType: currentFuel.toUpperCase(),
          bodyType: currentBody.toUpperCase(),
          page: 1,
          limit: 100,
        });
        setBrandOptions(res.data || []);
      } else {
        const mappedBodyType = vehicleType && (vehicleType.toLowerCase().includes("2") || vehicleType.toLowerCase().includes("two"))
          ? "TWO_WHEELER"
          : "FOUR_WHEELER";
        const res = await getAndSearchMakers({
          searchTerm: "",
          page: 1,
          limit: 100,
          bodyType: mappedBodyType,
        });
        setBrandOptions(res.data || []);
      }
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
      if (
        mobileTriggerRef.current &&
        !mobileTriggerRef.current.contains(e.target)
      ) {
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
    window.addEventListener("scroll", handleScroll, { passive: true });
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

  const { setMobileBannerTempHidden } = useUIStore();

  // Scroll-lock only for mobile drawer, NOT for desktop dropdown tabs
  // Also hide the mobile app download banner temporarily while drawer is open
  useEffect(() => {
    if (mobileOpen) {
      setMobileBannerTempHidden(true);
      if (typeof window !== "undefined") {
        const scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";
      }
    } else {
      setMobileBannerTempHidden(false);
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

    // Cleanup to ensure banner comes back if unmounted unexpectedly
    return () => setMobileBannerTempHidden(false);
  }, [mobileOpen, setMobileBannerTempHidden]);

  // Close desktop dropdown tabs when user scrolls
  // useEffect(() => {
  //   const handleScrollClose = () => {
  //     if (activeTab !== null) {
  //       setActiveTab(null);
  //     }
  //   };
  //   window.addEventListener("scroll", handleScrollClose);
  //   return () => window.removeEventListener("scroll", handleScrollClose);
  // }, [activeTab]);

  // Handle keyboard navigation for dropdowns
  useEffect(() => {
    if (!activeTab && !showTypeDropdown) return;

    const handleKeyDown = (e) => {
      if (["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) {
        const containers = Array.from(
          document.querySelectorAll(".dropdown-active"),
        );
        const container = containers.find((c) => c.offsetParent !== null);
        if (!container) return;

        const items = Array.from(container.querySelectorAll("button"));
        if (items.length === 0) return;

        const currentIndex = items.indexOf(document.activeElement);

        if (e.key === "ArrowDown") {
          e.preventDefault();
          const next = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          items[next]?.focus();
          items[next]?.scrollIntoView({ block: "nearest" });
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          const next = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          items[next]?.focus();
          items[next]?.scrollIntoView({ block: "nearest" });
        } else if (e.key === "Enter") {
          if (currentIndex !== -1) {
            e.preventDefault();
            items[currentIndex].click();
          } else if (
            items.length > 0 &&
            document.activeElement.tagName === "INPUT"
          ) {
            e.preventDefault();
            items[0].click();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, showTypeDropdown]);

  const handleSearch = () => {
    if (!vehicleType) {
      setVehicleTypeError(true);
      return;
    }

    const isConsult = internalActiveType === "consult";

    // Save/overwrite selected location to localStorage
    if (stateId && cityId && location) {
      const [cityName, stateName] = location
        .split(", ")
        .map((str) => str.trim());
      if (cityName && stateName) {
        const locationData = {
          stateId,
          stateName,
          cityId,
          cityName,
        };
        localStorage.setItem(
          "avx_saved_location",
          JSON.stringify(locationData),
        );
      }
    } else if (locationSuggestions?.length > 0 && location) {
      // In case they just typed an exact match but didn't click the dropdown
      const locMatch = locationSuggestions.find(
        (l) =>
          `${l.cityName}, ${l.stateName}`.toLowerCase() ===
          location.toLowerCase(),
      );
      if (locMatch) {
        const locationData = {
          stateId: locMatch.stateId,
          stateName: locMatch.stateName,
          cityId: locMatch.cityId,
          cityName: locMatch.cityName,
        };
        localStorage.setItem(
          "avx_saved_location",
          JSON.stringify(locationData),
        );
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
      push(`/consult/discovery${query ? `?${query}` : ""}`);
    } else {
      const vtLower = vehicleType.toLowerCase().replace(/_/g, " ");
      const isCar = vtLower.includes("car") || vtLower.includes("4 wheeler") || vtLower.includes("four wheeler") || vtLower.includes("4-wheeler") || vtLower.includes("four-wheeler");

      if (isCar) {
        // Generate SEO-friendly slug
        let slug = "buy-used-";
        if (brand) {
          slug += brand.toLowerCase().replace(/\s+/g, "-") + "-";
        }
        slug += "cars";
        if (location) {
          const cityName = location
            .split(",")[0]
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-");
          slug += "-" + cityName;
        }

        // Other filters as query params (excluding brand/model/city IDs as they are resolved from the slug)
        const queryParams = new URLSearchParams({
          ...(bodyType && { bodyType: bodyType.toUpperCase() }),
          ...(fuelType && { fuelType: fuelType.toUpperCase() }),
          ...(budget && { budget }),
        }).toString();

        setActiveTab(null);
        setMobileOpen(false);
        push(`/search/${slug}${queryParams ? `?${queryParams}` : ""}`);
      } else {
        const query = new URLSearchParams({
          ...(location && { location }),
          ...(cityId && { cityId }),
          ...(stateId && { stateId }),
          ...(vehicleType && { vehicleType }),
          ...(bodyType && { bodyType: bodyType.toUpperCase() }),
          ...(fuelType && { fuelType: fuelType.toUpperCase() }),
          ...(brand && { brand }),
          ...(makerId && { makerId }),
          ...(budget && { budget }),
        }).toString();
        setActiveTab(null);
        setMobileOpen(false);
        push(`/search?${query}`);
      }
    }
  };

  return (
    <>
      <style>{`
        .dropdown-active button:focus {
          background-color: rgba(255, 255, 255, 0.1) !important;
          outline: 1px solid rgba(255, 255, 255, 0.2) !important;
          outline-offset: -1px;
        }

        .lg-glass-dropdown {
          background: rgba(20, 20, 20, 0.75);
          backdrop-filter: blur(32px) saturate(180%);
          -webkit-backdrop-filter: blur(32px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow:
            0 24px 64px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.08);
        }

        /* ====== LIQUID GLASS SEARCH BAR – DESKTOP ====== */
        .lg-glass-bar {
          position: relative;
          width: 100%;
          max-width: 1400px;
          border-radius: 56px;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.22) 0%,
            rgba(255,255,255,0.10) 40%,
            rgba(255,255,255,0.06) 70%,
            rgba(255,255,255,0.14) 100%
          );
          backdrop-filter: blur(32px) saturate(180%);
          -webkit-backdrop-filter: blur(32px) saturate(180%);
          border: 1.5px solid rgba(255,255,255,0.28);
          box-shadow:
            0 2px 0 0 rgba(255,255,255,0.35) inset,
            0 -1px 0 0 rgba(0,0,0,0.10) inset,
            0 24px 64px rgba(0,0,0,0.28),
            0 8px 24px rgba(0,0,0,0.20),
            0 0 0 0.5px rgba(255,255,255,0.12);
          overflow: visible;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        /* Glossy top-shine reflection */
        .lg-glass-bar::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 56px;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.30) 0%,
            rgba(255,255,255,0.08) 40%,
            transparent 60%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Animated light-sweep reflection – uses opacity pulse, no horizontal overflow */
        .lg-glass-bar::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 56px;
          background: linear-gradient(
            105deg,
            transparent 0%,
            rgba(255,255,255,0.10) 50%,
            transparent 100%
          );
          animation: glassPulse 5s ease-in-out infinite;
          pointer-events: none;
          z-index: 2;
        }

        @keyframes glassPulse {
          0%, 100% { opacity: 0; }
          50%       { opacity: 1; }
        }

        .lg-glass-inner {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 70px;
        }

        /* Filter section hover glass highlight */
        .lg-filter-section {
          flex: 1;
          position: relative;
          padding-left: 1rem;
          padding-right: 1rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-radius: 52px;
          cursor: pointer;
          transition: background 0.25s ease;
          min-width: 0;
        }

        .lg-filter-section:first-child {
          padding-left: 1.25rem;
        }

        .lg-filter-section:hover {
          background: rgba(255,255,255,0.14);
        }

        .lg-filter-section.active {
          background: rgba(255,255,255,0.20);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.05);
        }

        /* Labels – original style: medium-weight, normal case, primary color */
        .lg-label {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          white-space: nowrap;
          line-height: 1.2;
        }

        /* Values – original style: text-sm font-medium */
        .lg-value {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .lg-value.placeholder {
          font-weight: 400;
          color: rgba(255,255,255,0.45);
        }

        .lg-value.error {
          color: #f87171;
          font-weight: 500;
        }

        /* Thin translucent divider */
        .lg-divider {
          width: 1px;
          height: 36px;
          background: rgba(255,255,255,0.20);
          flex-shrink: 0;
          margin: 0 2px;
          border-radius: 1px;
        }

        /* Search button */
        .lg-search-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(255,255,255,0.96);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          box-shadow:
            0 4px 16px rgba(0,0,0,0.22),
            0 1px 0 rgba(255,255,255,0.9) inset;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
          color: #111;
        }

        .lg-search-btn:hover {
          transform: scale(1.05);
          box-shadow:
            0 8px 28px rgba(0,0,0,0.30),
            0 1px 0 rgba(255,255,255,0.9) inset;
        }

        .lg-search-btn:active {
          transform: scale(0.95);
        }

        /* Input inside glass bar – matches .lg-value style */
        .lg-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
        }

        .lg-input::placeholder {
          color: rgba(255,255,255,0.40);
          font-weight: 500;
        }
      `}</style>
      <div className="hidden lg:flex absolute bottom-[20vh] left-0 right-0 z-30 justify-center items-center px-4">
        <div className="lg-glass-bar">
          <div
            ref={containerRef}
            className="lg-glass-inner"
          >
            <div className="relative z-10 flex items-center w-full h-full pr-2 pl-0 text-primary gap-0">
              {/* SECTION: LOCATION */}
              <div
                className={`lg-filter-section${activeTab === "location" ? " active" : ""}`}
                onClick={() => handleActiveTabChange("location")}
              >
                <div className="lg-label">Location</div>
                <input
                  type="text"
                  placeholder="Search city"
                  className="lg-input"
                  value={location}
                  onChange={handleLocationChange}
                />
                {activeTab === "location" && (
                  <div className="absolute top-[110%] left-0 z-50 dropdown-active w-[360px] lg-glass-dropdown rounded-xl p-2">
                    <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                      {locationSuggestions.length > 0 ? (
                        locationSuggestions.map((item) => (
                          <button
                            key={item.isStateOnly ? `state-${item.stateId}` : item.cityId}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.isStateOnly) {
                                setLocation(item.stateName);
                                setCityId(null);
                                setStateId(item.stateId);
                              } else {
                                setLocation(
                                  `${item.cityName}, ${item.stateName}`,
                                );
                                setCityId(item.cityId);
                                setStateId(item.stateId);
                              }
                              openNextAvailableTab("location");
                            }}
                            className="flex items-center justify-between gap-4 py-2 px-3 hover:bg-white/10 rounded-lg text-left cursor-pointer"
                          >
                            <span className="text-sm font-semibold text-white">
                              {item.isStateOnly ? item.stateName : item.cityName}
                            </span>
                            <span className="text-xs text-white/60">
                              {item.isStateOnly ? "State" : item.stateName}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="py-3 px-3 text-sm text-white/60 text-center">
                          {location.length > 0
                            ? "No cities found"
                            : "Loading..."}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg-divider" />

              {/* SECTION: VEHICLE TYPE */}
              <div
                className={`lg-filter-section${activeTab === "vehicle" ? " active" : ""}`}
                onClick={() => handleActiveTabChange("vehicle")}
              >
                <div className="lg-label">Vehicle Type</div>
                <div className={vehicleTypeError ? "lg-value error" : (vehicleType ? "lg-value" : "lg-value placeholder")}>
                  {vehicleTypeError ? "* Required" : vehicleType || "Add type"}
                </div>
                {activeTab === "vehicle" && (
                  <div className="absolute top-[110%] left-0 z-50 dropdown-active w-60 lg-glass-dropdown rounded-xl p-2">
                    {VEHICLE_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setVehicleType(type.label);
                          setVehicleTypeError(false);
                          setFuelType("");
                          setBodyType("");
                          openNextAvailableTab("vehicle");
                        }}
                        className="w-full py-2 px-3 hover:bg-white/10 rounded-lg text-left text-sm font-semibold cursor-pointer"
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg-divider" />

              {/* CONDITIONAL SECTIONS */}
              {internalActiveType === "consult" ? (
                <>
                  {/* PRICE RANGE */}
                  <div
                    className={`lg-filter-section${activeTab === "priceRange" ? " active" : ""}`}
                    onClick={() => handleActiveTabChange("priceRange")}
                  >
                    <div className="lg-label">Price Range</div>
                    <div className={priceRange ? "lg-value" : "lg-value placeholder"}>
                      {priceRange || "Select price"}
                    </div>
                    {activeTab === "priceRange" && (
                      <div className="absolute top-[110%] left-0 z-50 dropdown-active w-60 lg-glass-dropdown rounded-xl p-2">
                        {CONSULT_PRICE_RANGE.map((range) => (
                          <button
                            key={range}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPriceRange(range);
                              openNextAvailableTab("priceRange");
                            }}
                            className="w-full py-2 px-3 hover:bg-white/10 rounded-lg text-left text-sm font-semibold cursor-pointer"
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="lg-divider" />
                  {/* SERVICE */}
                  <div
                    className={`lg-filter-section${activeTab === "service" ? " active" : ""}`}
                    onClick={() => handleActiveTabChange("service")}
                  >
                    <div className="lg-label">Service</div>
                    <div className={service ? "lg-value" : "lg-value placeholder"}>
                      {service || "Select service"}
                    </div>
                    {activeTab === "service" && (
                      <div className="absolute top-[110%] left-0 z-50 dropdown-active w-[280px] lg-glass-dropdown rounded-xl p-2">
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
                                className="w-full py-2 px-3 hover:bg-white/10 rounded-lg text-left text-sm font-semibold cursor-pointer"
                              >
                                {svc.label}
                              </button>
                            ))
                          ) : (
                            <div className="py-3 px-3 text-sm text-white/60 text-center">
                              Loading...
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="lg-divider" />
                  {/* AVAILABILITY */}
                  <div
                    className={`lg-filter-section${activeTab === "availability" ? " active" : ""}`}
                    onClick={() => handleActiveTabChange("availability")}
                  >
                    <div className="lg-label">Availability</div>
                    <div className={availability ? "lg-value" : "lg-value placeholder"}>
                      {availability || "Select availability"}
                    </div>
                    {activeTab === "availability" && (
                      <div className="absolute top-[110%] left-0 z-50 dropdown-active w-60 lg-glass-dropdown rounded-xl p-2">
                        {AVAILABILITY_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={(e) => {
                              e.stopPropagation();
                              setAvailability(opt.label);
                              openNextAvailableTab("availability");
                            }}
                            className="w-full py-2 px-3 hover:bg-white/10 rounded-lg text-left text-sm font-semibold cursor-pointer"
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
                    className={`lg-filter-section${activeTab === "bodyType" ? " active" : ""}`}
                    onClick={() => {
                      if (!vehicleType) {
                        handleActiveTabChange("vehicle");
                        return;
                      }
                      handleActiveTabChange("bodyType");
                    }}
                  >
                    <div className="lg-label">Body Type</div>
                    <div className={bodyType ? "lg-value" : "lg-value placeholder"}>
                      {bodyType || "Add type"}
                    </div>
                    {activeTab === "bodyType" && (
                      <div className="absolute top-[110%] left-0 z-50 dropdown-active w-60 lg-glass-dropdown rounded-xl p-2 max-h-[250px] overflow-y-auto custom-scrollbar">
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
                            className="w-full py-2 px-3 hover:bg-white/10 rounded-lg text-left text-sm font-semibold cursor-pointer"
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="lg-divider" />
                  {/* FUEL TYPE */}
                  <div
                    className={`lg-filter-section${activeTab === "fuel" ? " active" : ""}`}
                    onClick={() => handleActiveTabChange("fuel")}
                  >
                    <div className="lg-label">Fuel Type</div>
                    <div className={fuelType ? "lg-value" : "lg-value placeholder"}>
                      {fuelType || "Select fuel"}
                    </div>
                    {activeTab === "fuel" && (
                      <div className="absolute top-[110%] left-0 z-50 dropdown-active w-60 lg-glass-dropdown rounded-xl p-2">
                        {availableFuelTypes.map((f) => (
                          <button
                            key={f}
                            onClick={(e) => {
                              e.stopPropagation();
                              setFuelType(f);
                              openNextAvailableTab("fuel", f);
                            }}
                            className="w-full py-2 px-3 hover:bg-white/10 rounded-lg text-left text-sm font-semibold cursor-pointer"
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="lg-divider" />
                  {/* BRAND (INLINE SEARCH) */}
                  <div
                    className={`lg-filter-section${activeTab === "brand" ? " active" : ""}`}
                    onClick={() => handleActiveTabChange("brand")}
                  >
                    <div className="lg-label">Brand</div>
                    <input
                      ref={brandInputRef}
                      type="text"
                      placeholder={brand || "Search brand"}
                      className="lg-input"
                      value={brandSearch}
                      onChange={(e) => setBrandSearch(e.target.value)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActiveTabChange("brand");
                      }}
                    />
                    {activeTab === "brand" && (
                      <div className="absolute top-[110%] left-0 z-50 dropdown-active w-[300px] lg-glass-dropdown rounded-xl p-2">
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
                              className="w-full py-1.5 px-3 hover:bg-white/10 rounded-lg text-left text-sm font-semibold cursor-pointer"
                            >
                              {b.makeDisplay}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="lg-divider" />
                  {/* BUDGET */}
                  <div
                    className={`lg-filter-section${activeTab === "budget" ? " active" : ""}`}
                    onClick={() => handleActiveTabChange("budget")}
                  >
                    <div className="lg-label">Budget</div>
                    <div className={budget ? "lg-value" : "lg-value placeholder"}>
                      {budget || "Select budget"}
                    </div>
                    {activeTab === "budget" && (
                      <div className="absolute top-[110%] left-0 z-50 dropdown-active w-60 lg-glass-dropdown rounded-xl p-2">
                        {BUDGET_RANGE.map((range) => (
                          <button
                            key={range}
                            onClick={(e) => {
                              e.stopPropagation();
                              setBudget(range);
                              openNextAvailableTab("budget");
                            }}
                            className="w-full py-2 px-3 hover:bg-white/10 rounded-lg text-left text-sm font-semibold cursor-pointer"
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="pl-2 pr-2 flex items-center">
                <button
                  onClick={handleSearch}
                  className="lg-search-btn"
                >
                  <Search size={20} strokeWidth={2.5} />
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
          : "bottom-4 right-4 w-[calc(100%-2rem)] md:right-[calc(50%-14rem)] md:w-[28rem]"
          }`}
      >
        <div className="relative">
          {showTypeDropdown && (
            <div
              className={`absolute bottom-[110%] mb-4 backdrop-blur-2xl rounded-2xl p-2 animate-in slide-in-from-bottom-4 duration-300 dropdown-active ${isScrolled
                ? "right-0 w-[280px] bg-black/70 border border-white/10 shadow-2xl"
                : "left-0 right-0 bg-gradient-to-br from-white/20 to-white/5 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.3)]"
                }`}
            >
              <button
                onClick={() => {
                  setInternalActiveType("vehicle");
                  setMobileOpen(true);
                  setShowTypeDropdown(false);
                }}
                className="w-full flex items-center gap-3 p-4 hover:bg-white/10 transition-colors rounded-xl text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary">
                  <Search size={18} />
                </div>
                <div>
                  <div className="text-white font-bold">Search Vehicle</div>
                  <div className="text-gray-400 text-xs mt-0.5">
                    Find your dream car or bike
                  </div>
                </div>
              </button>
              <div className="h-px bg-white/20 mx-2 my-1" />
              <button
                onClick={() => {
                  setInternalActiveType("consult");
                  setMobileOpen(true);
                  setShowTypeDropdown(false);
                }}
                className="w-full flex items-center gap-3 p-4 hover:bg-white/10 transition-colors rounded-xl text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary">
                  <Search size={18} />
                </div>
                <div>
                  <div className="text-white font-bold">
                    Search Consultation
                  </div>
                  <div className="text-gray-400 text-xs mt-0.5">
                    Expert advice for your vehicle
                  </div>
                </div>
              </button>
            </div>
          )}
          <button
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className={`w-full flex items-center justify-center transition-all duration-500 ease-in-out cursor-pointer whitespace-nowrap overflow-hidden rounded-full ${isScrolled
              ? "h-14 bg-fourth shadow-lg"
              : "h-14 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.3)]"
              }`}
          >
            <Search size={22} className="text-white shrink-0" />
            <span
              className={`font-medium text-white transition-all duration-500 ease-in-out overflow-hidden ${isScrolled
                ? "max-w-0 opacity-0 ml-0 pointer-events-none"
                : "max-w-[150px] opacity-100 ml-2"
                }`}
            >
              Start your search
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE FULLSCREEN DRAWER -> NOW A PROPER MODAL BOX */}
      <div
        className={`lg:hidden fixed inset-0 z-[100] flex items-end sm:items-center justify-center transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
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
          className={`relative w-full sm:w-[90%] max-w-md bg-secondary rounded-t-3xl sm:rounded-3xl flex flex-col transition-transform duration-300 ${mobileOpen ? "translate-y-0" : "translate-y-full sm:scale-95"} max-h-[85vh]`}
        >
          {/* Header */}
          <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-secondary rounded-t-3xl sm:rounded-3xl shrink-0">
            <h2 className="text-xl font-bold text-primary">Search Filters</h2>
            <button
              onClick={() => {
                setMobileOpen(false);
                setActiveTab(null);
              }}
              className="p-1 bg-white cursor-pointer rounded-full hover:opacity-70 text-secondary"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 space-y-3 overflow-y-auto flex-1 text-primary custom-scrollbar pb-6">
            {/* Location */}
            <div
              className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "location" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}
            >
              <button
                onClick={() =>
                  handleActiveTabChange(
                    activeTab === "location" ? null : "location",
                  )
                }
                className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
              >
                <div className="flex flex-col items-start w-full">
                  <span className="text-xs font-semibold text-primary">
                    Location
                  </span>
                  <span
                    className={`font-medium text-sm mt-1 truncate w-full ${location ? "text-white" : "text-gray-500"}`}
                  >
                    {location || "Search destinations"}
                  </span>
                </div>
              </button>
              {activeTab === "location" && (
                <div className="p-4 pt-0 border-t border-neutral-800 border-opacity-50 dropdown-active">
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
                          key={item.isStateOnly ? `state-${item.stateId}` : item.cityId}
                          onClick={() => {
                            if (item.isStateOnly) {
                              setLocation(item.stateName);
                              setCityId(null);
                              setStateId(item.stateId);
                            } else {
                              setLocation(`${item.cityName}, ${item.stateName}`);
                              setCityId(item.cityId);
                              setStateId(item.stateId);
                            }
                            setLocationSuggestions([]);
                            openNextAvailableTab("location");
                          }}
                          className="w-full flex items-center justify-between gap-4 py-3 px-4 border-b border-neutral-700 last:border-0 hover:bg-neutral-700 text-left cursor-pointer"
                        >
                          <span className="text-sm font-semibold text-white">
                            {item.isStateOnly ? item.stateName : item.cityName}
                          </span>
                          <span className="text-xs text-gray-400">
                            {item.isStateOnly ? "State" : item.stateName}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Vehicle Type */}
            <div
              className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "vehicle" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}
            >
              <button
                onClick={() =>
                  handleActiveTabChange(
                    activeTab === "vehicle" ? null : "vehicle",
                  )
                }
                className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
              >
                <div className="flex flex-col items-start w-full">
                  <span className="text-xs font-semibold text-primary">
                    Vehicle Type
                  </span>
                  <span
                    className={`font-medium text-sm mt-1 truncate w-full ${vehicleTypeError ? "text-red-500" : vehicleType ? "text-white" : "text-gray-500"}`}
                  >
                    {vehicleTypeError ? "*Required" : vehicleType || "Add type"}
                  </span>
                </div>
              </button>
              {activeTab === "vehicle" && (
                <div className="p-4 pt-0 border-t border-neutral-800 border-opacity-50 flex gap-2 dropdown-active">
                  {VEHICLE_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setVehicleType(type.label);
                        setVehicleTypeError(false);
                        setFuelType("");
                        setBodyType("");
                        openNextAvailableTab("vehicle");
                      }}
                      className={`flex-1 mt-3 py-3 text-sm font-bold rounded-lg transition-colors cursor-pointer ${vehicleType === type.label ? "bg-white text-black" : "bg-neutral-800 text-gray-400 hover:text-white"}`}
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
                <div
                  className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "priceRange" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}
                >
                  <button
                    onClick={() =>
                      handleActiveTabChange(
                        activeTab === "priceRange" ? null : "priceRange",
                      )
                    }
                    className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                  >
                    <div className="flex flex-col items-start w-full">
                      <span className="text-xs font-semibold text-primary">
                        Price Range
                      </span>
                      <span
                        className={`font-medium text-sm mt-1 truncate w-full ${priceRange ? "text-white" : "text-gray-500"}`}
                      >
                        {priceRange || "Select price"}
                      </span>
                    </div>
                  </button>
                  {activeTab === "priceRange" && (
                    <div className="p-2 border-t border-neutral-800 border-opacity-50 dropdown-active">
                      {CONSULT_PRICE_RANGE.map((range) => (
                        <button
                          key={range}
                          onClick={() => {
                            setPriceRange(range);
                            openNextAvailableTab("priceRange");
                          }}
                          className={`w-full py-3 px-4 rounded-lg text-left text-sm font-semibold mt-1 cursor-pointer ${priceRange === range ? "bg-white text-black" : "hover:bg-neutral-800 text-white"}`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Service */}
                <div
                  className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "service" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}
                >
                  <button
                    onClick={() =>
                      handleActiveTabChange(
                        activeTab === "service" ? null : "service",
                      )
                    }
                    className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                  >
                    <div className="flex flex-col items-start w-full">
                      <span className="text-xs font-semibold text-primary">
                        Service
                      </span>
                      <span
                        className={`font-medium text-sm mt-1 truncate w-full ${service ? "text-white" : "text-gray-500"}`}
                      >
                        {service || "Select service"}
                      </span>
                    </div>
                  </button>
                  {activeTab === "service" && (
                    <div className="p-2 border-t border-neutral-800 border-opacity-50 max-h-64 overflow-y-auto dropdown-active">
                      {serviceOptions.length > 0 ? (
                        serviceOptions.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setService(opt.value);
                              openNextAvailableTab("service");
                            }}
                            className={`w-full py-3 px-4 rounded-lg text-left text-sm font-semibold mt-1 cursor-pointer ${service === opt.value ? "bg-white text-black" : "hover:bg-neutral-800 text-white"}`}
                          >
                            {opt.label}
                          </button>
                        ))
                      ) : (
                        <div className="p-4 text-sm text-center text-gray-400">
                          Loading...
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Availability */}
                <div
                  className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "availability" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}
                >
                  <button
                    onClick={() =>
                      handleActiveTabChange(
                        activeTab === "availability" ? null : "availability",
                      )
                    }
                    className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                  >
                    <div className="flex flex-col items-start w-full">
                      <span className="text-xs font-semibold text-primary">
                        Availability
                      </span>
                      <span
                        className={`font-medium text-sm mt-1 truncate w-full ${availability ? "text-white" : "text-gray-500"}`}
                      >
                        {availability || "Select availability"}
                      </span>
                    </div>
                  </button>
                  {activeTab === "availability" && (
                    <div className="p-2 border-t border-neutral-800 border-opacity-50 dropdown-active">
                      {AVAILABILITY_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setAvailability(opt.label);
                            openNextAvailableTab("availability");
                          }}
                          className={`w-full py-3 px-4 rounded-lg text-left text-sm font-semibold mt-1 cursor-pointer ${availability === opt.label ? "bg-white text-black" : "hover:bg-neutral-800 text-white"}`}
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
                <div
                  className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "bodyType" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}
                >
                  <button
                    onClick={() =>
                      handleActiveTabChange(
                        activeTab === "bodyType" ? null : "bodyType",
                      )
                    }
                    className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                  >
                    <div className="flex flex-col items-start w-full">
                      <span className="text-xs font-semibold text-primary">
                        Body Type
                      </span>
                      <span
                        className={`font-medium text-sm mt-1 truncate w-full ${bodyType ? "text-white" : "text-gray-500"}`}
                      >
                        {bodyType || "Add type"}
                      </span>
                    </div>
                  </button>
                  {activeTab === "bodyType" && (
                    <div className="p-2 border-t border-neutral-800 border-opacity-50 max-h-64 overflow-y-auto custom-scrollbar dropdown-active">
                      {(vehicleType === "4 Wheeler"
                        ? FOUR_WHEELER_TYPES
                        : TWO_WHEELER_TYPES
                      ).map((type) => (
                        <button
                          key={type.key}
                          onClick={() => {
                            setBodyType(type.label);
                            openNextAvailableTab("bodyType", type.label);
                          }}
                          className={`w-full py-3 px-4 rounded-lg text-left text-sm font-semibold mt-1 cursor-pointer ${bodyType === type.label ? "bg-white text-black" : "hover:bg-neutral-800 text-white"}`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fuel Type */}
                <div
                  className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "fuel" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}
                >
                  <button
                    onClick={() =>
                      handleActiveTabChange(
                        activeTab === "fuel" ? null : "fuel",
                      )
                    }
                    className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                  >
                    <div className="flex flex-col items-start w-full">
                      <span className="text-xs font-semibold text-primary">
                        Fuel Type
                      </span>
                      <span
                        className={`font-medium text-sm mt-1 truncate w-full ${fuelType ? "text-white" : "text-gray-500"}`}
                      >
                        {fuelType || "Select fuel"}
                      </span>
                    </div>
                  </button>
                  {activeTab === "fuel" && (
                    <div className="p-2 border-t border-neutral-800 border-opacity-50 dropdown-active">
                      {availableFuelTypes.map((fuel) => (
                        <button
                          key={fuel}
                          onClick={() => {
                            setFuelType(fuel);
                            openNextAvailableTab("fuel", fuel);
                          }}
                          className={`w-full py-3 px-4 rounded-lg text-left text-sm font-semibold mt-1 cursor-pointer ${fuelType === fuel ? "bg-white text-black" : "hover:bg-neutral-800 text-white"}`}
                        >
                          {fuel}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Brand Search */}
                <div
                  className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "brand" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}
                >
                  <button
                    onClick={() =>
                      handleActiveTabChange(
                        activeTab === "brand" ? null : "brand",
                      )
                    }
                    className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                  >
                    <div className="flex flex-col items-start w-full">
                      <span className="text-xs font-semibold text-primary">
                        Brand
                      </span>
                      <span
                        className={`font-medium text-sm mt-1 truncate w-full ${brand ? "text-white" : "text-gray-500"}`}
                      >
                        {brand || "Search brand"}
                      </span>
                    </div>
                  </button>
                  {activeTab === "brand" && (
                    <div className="p-4 pt-0 border-t border-neutral-800 border-opacity-50 flex flex-col items-center dropdown-active">
                      <input
                        type="text"
                        placeholder="Search brand"
                        className="w-full bg-neutral-800 outline-none text-white py-3 px-4 rounded-xl mt-3 text-sm"
                        value={brandSearch || brand}
                        onChange={(e) => {
                          setBrandSearch(e.target.value);
                          if (!e.target.value) {
                            setBrand("");
                            setMakerId(null);
                          }
                        }}
                      />
                      <div className="mt-2 w-full max-h-48 overflow-y-auto rounded-xl">
                        {filteredBrands.map((b) => (
                          <button
                            key={b.makeId}
                            onClick={() => {
                              setBrand(b.makeName);
                              setMakerId(b.makeId);
                              setBrandSearch("");
                              openNextAvailableTab("brand");
                            }}
                            className={`w-full py-3 px-4 border-b border-neutral-700 last:border-none text-left text-sm font-semibold text-white cursor-pointer ${brand === b.makeName ? "bg-white text-black" : "hover:bg-neutral-800"}`}
                          >
                            {b.makeDisplay}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Budget */}
                <div
                  className={`border rounded-xl overflow-hidden transition-colors ${activeTab === "budget" ? "border-primary bg-neutral-900" : "border-neutral-800 bg-neutral-900/50"}`}
                >
                  <button
                    onClick={() =>
                      handleActiveTabChange(
                        activeTab === "budget" ? null : "budget",
                      )
                    }
                    className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                  >
                    <div className="flex flex-col items-start w-full">
                      <span className="text-xs font-semibold text-primary">
                        Budget
                      </span>
                      <span
                        className={`font-medium text-sm mt-1 truncate w-full ${budget ? "text-white" : "text-gray-500"}`}
                      >
                        {budget || "Select budget"}
                      </span>
                    </div>
                  </button>
                  {activeTab === "budget" && (
                    <div className="p-2 border-t border-neutral-800 border-opacity-50 dropdown-active">
                      {BUDGET_RANGE.map((range) => (
                        <button
                          key={range}
                          onClick={() => {
                            setBudget(range);
                            openNextAvailableTab("budget");
                          }}
                          className={`w-full py-3 px-4 rounded-lg text-left text-sm font-semibold mt-1 cursor-pointer ${budget === range ? "bg-white text-black" : "hover:bg-neutral-800 text-white"}`}
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
              className="w-full bg-primary text-secondary font-bold text-lg py-4 rounded-full flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer"
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
