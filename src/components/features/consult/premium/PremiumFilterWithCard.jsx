/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useRef } from "react";
import InputField from "@/components/ui/inputField";
import Button from "@/components/ui/button";
import ChipGroup from "@/components/ui/chipGroup";
import Chip from "@/components/ui/chip";
import {
  FilterIcon,
  ChevronDown,
  Search,
  ChevronRight,
  ChevronLeft,
  MapPin,
} from "lucide-react";
import FilterSection from "../../search/FilterSection";
import {
  getAllConsultService,
  getUserCityAndStateByLatLong,
  getPremiumConsult,
} from "@/services/consult.filter.service";
import { getCities, getState } from "@/services/user.service";
import ConsultantGridSection from "../search/ConsultantGridSection";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Pagination from "@/components/ui/Pagination";

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

export default function FilterWithCard({ onFilterChange }) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState("Vehicle Type");
  const [selectedMobileChips, setSelectedMobileChips] = useState([]);
  const [avxAssumed, setAvxAssumed] = useState(false);

  // ── Services chips (from API) ──
  const [services, setServices] = useState([]);

  // ── State & City states ──
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [selectedStateName, setSelectedStateName] = useState("");
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [selectedCityName, setSelectedCityName] = useState("");

  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const autoFetchTimerRef = useRef(null);
  const hasMountedForAutoFetch = useRef(false);

  const [highlightedStateIndex, setHighlightedStateIndex] = useState(-1);
  const [highlightedCityIndex, setHighlightedCityIndex] = useState(-1);

  const isMobile = useIsMobile();

  // ── Filter values ──
  const [selectedDistance, setSelectedDistance] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState([]);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  // ── Price range slider ──
  const [minPrice, setMinPrice] = useState(50000);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const MIN = 50000;
  const MAX = 2000000;

  // ── Pagination ──
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 9;

  // ── Result data ──
  const [premiumConsultants, setPremiumConsultants] = useState([]); // from getPremiumConsult

  // Add these two lines
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const sort = searchParams.get("sort");

  const getSortConfig = (sortValue) => {
    switch (sortValue) {
      case "price_low_high":
        return { sortBy: "minVehiclePrice", direction: "asc" };

      case "price_high_low":
        return { sortBy: "minVehiclePrice", direction: "desc" };

      case "subscribers_low_high":
        return { sortBy: "followersCount", direction: "asc" };

      case "subscribers_high_low":
        return { sortBy: "followersCount", direction: "desc" };

      case "recommended":
      default:
        return { sortBy: "minVehiclePrice", direction: "desc" };
    }
  };

  // ── Transform API data to match what ConsultantCard expects ──
  const mapToCardFormat = (items = []) => {
    return items.map((item) => ({
      id: item.id,
      username: item.username || "",
      name: item.consultationName || "Unknown Consultant",

      location: item.address
        ? `${item.address.city || ""}${item.address.city && item.address.state ? ", " : ""
        }${item.address.state || ""}`
        : "-",

      rating: item.averageRating || 0,
      reviews: item.totalReviews || 0,

      vehicleTypes: item.vehicleTypes || [],
      services: item.services || [],

      vehicleCount: item.availableVehicles || 0,

      priceRange:
        item.minVehiclePrice != null && item.maxVehiclePrice != null
          ? `${(item.minVehiclePrice / 100000).toFixed(1)}L - ${(item.maxVehiclePrice / 100000).toFixed(1)}L`
          : "-",

      image: item.bannerUrl || "/default-banner.jpg",
      logo: item.logoUrl || "/default-logo.png",

      isSponsored: item.tierTitle === "PRO",
    }));
  };

  const toggleMobileChip = (chip) => {
    setSelectedMobileChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip],
    );
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (stateRef.current && !stateRef.current.contains(e.target)) {
        setStateOpen(false);
        setStateSearch("");
      }
      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setCityOpen(false);
        setCitySearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load states
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await getState();
        if (res?.data) {
          setStates(res.data.map((s) => ({ label: s.name, value: s.id })));
        }
      } catch (err) {
        console.error("Failed to load states:", err);
      }
    };
    fetchStates();
  }, []);

  // Auto-detect location on mount
  useEffect(() => {
    // On mount: only check localStorage for saved location
    try {
      const saved = localStorage.getItem("avx_saved_location");
      if (saved) {
        const { stateId, stateName, cityId, cityName } = JSON.parse(saved);
        if (stateId && stateName) {
          setSelectedStateId(stateId);
          setSelectedStateName(stateName);
          setSelectedCityId(cityId || null);
          setSelectedCityName(cityName || "");
        }
      }
    } catch (e) {
      console.warn("Failed to read saved location:", e);
    }
  }, []);

  // Detect location via geolocation — only when user clicks the icon
  const handleDetectLocation = async () => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by this browser.");
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 0,
        });
      });

      const { latitude: lat, longitude: lon } = position.coords;

      setLatitude(lat);
      setLongitude(lon);

      const res = await getUserCityAndStateByLatLong({
        latitude: lat,
        longitude: lon,
      });

      if (res?.status === "OK" && res?.data) {
        const { cityId, cityName, stateId, stateName } = res.data;

        setSelectedStateId(stateId);
        setSelectedStateName(stateName);
        setSelectedCityId(cityId);
        setSelectedCityName(cityName);
      }
    } catch (err) {
      console.error("Geolocation error:", err);
    }
  };

  // Load cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedStateId) {
        setCities([]);
        return;
      }

      try {
        const res = await getCities(selectedStateId);
        if (res?.data) {
          setCities(
            res.data.map((c) => ({
              label: c.name,
              value: c.id,
            })),
          );
        }
      } catch (err) {
        console.error("Failed to load cities:", err);
        setCities([]);
      }
    };
    fetchCities();
  }, [selectedStateId]);

  // Load services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getAllConsultService({ pageNo: 1, size: 20 });
        if (res.success && Array.isArray(res.data)) {
          const apiServices = res.data.map((service) => ({
            value: service,
            label: service
              .split("_")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
              )
              .join(" "),
          }));
          setServices(apiServices);
        }
      } catch (err) {
        console.error("Failed to load services:", err);
      }
    };
    fetchServices();
  }, []);

  // ── Fetch both APIs ──
  const fetchConsultants = async (page = currentPage, payload = {}) => {
    try {
      const { sortBy, direction } = getSortConfig(sort);

      const requestData = {
        pageNo: page,
        size: itemsPerPage,
        sortBy,
        direction,
      };

      const premiumRes = await getPremiumConsult(requestData, payload);

      if (premiumRes?.pagination?.totalPages) {
        setTotalPages(premiumRes.pagination.totalPages);
      }

      const premiumData =
        premiumRes?.success && Array.isArray(premiumRes?.data)
          ? premiumRes.data
          : [];

      setPremiumConsultants(mapToCardFormat(premiumData));
    } catch (err) {
      console.error("Failed to fetch consultants:", err);
      setPremiumConsultants([]);
    }
  };

  // Initial fetch on mount (empty payload = default results)
  useEffect(() => {
    fetchConsultants(currentPage);
  }, [currentPage, sort]);

  const buildPayload = () => {
    const payload = {};

    if (selectedCityId) payload.cityId = selectedCityId;
    if (selectedStateId) payload.stateId = selectedStateId;

    if (latitude !== null && longitude !== null) {
      payload.latitude = latitude;
      payload.longitude = longitude;
    }

    if (selectedDistance.length > 0) {
      const val = selectedDistance[0];
      if (val === "0-10") {
        payload.minDistanceKm = 0;
        payload.maxDistanceKm = 10;
      } else if (val === "10-30") {
        payload.minDistanceKm = 10;
        payload.maxDistanceKm = 30;
      } else if (val === "30-50") {
        payload.minDistanceKm = 30;
        payload.maxDistanceKm = 50;
      } else if (val === "50") {
        payload.minDistanceKm = 50;
      }
    }

    if (selectedInventory.length > 0) {
      const val = selectedInventory[0];
      if (val === "1-10") {
        payload.minInventory = 1;
        payload.maxInventory = 10;
      } else if (val === "10-30") {
        payload.minInventory = 10;
        payload.maxInventory = 30;
      } else if (val === "30+") {
        payload.minInventory = 30;
      }
    }

    if (selectedVehicleTypes.length > 0) {
      payload.vehicleTypes = selectedVehicleTypes;
    }

    if (selectedRating.length > 0) {
      const val = selectedRating[0];
      if (val === "4.5") payload.minAvgRating = 4.5;
      if (val === "4.0") payload.minAvgRating = 4.0;
      if (val === "3.0") payload.minAvgRating = 3.0;
    }

    if (selectedServices.length > 0) {
      payload.services = selectedServices;
    }

    // Price range (vehicle price) — only include when not at full range
    if (minPrice !== MIN || maxPrice !== MAX) {
      payload.minVehiclePrice = minPrice;
      payload.maxVehiclePrice = maxPrice;
    }

    return payload;
  };

  const getTrackBackground = () => {
    const minPercent = ((minPrice - MIN) / (MAX - MIN)) * 100;
    const maxPercent = ((maxPrice - MIN) / (MAX - MIN)) * 100;
    return `linear-gradient(
      to right,
      #e5e7eb 0%,
      #e5e7eb ${minPercent}%,
      var(--color-fourth) ${minPercent}%,
      var(--color-fourth) ${maxPercent}%,
      #e5e7eb ${maxPercent}%,
      #e5e7eb 100%
    )`;
  };

  // Re-fetch when page changes
  useEffect(() => {
    const payload = buildPayload();
    fetchConsultants(currentPage, payload);
  }, [currentPage]);
  const handleApplyFilter = async () => {
    if (selectedStateId && selectedStateName) {
      const locationData = {
        stateId: selectedStateId,
        stateName: selectedStateName,
        cityId: selectedCityId,
        cityName: selectedCityName,
      };
      localStorage.setItem("avx_saved_location", JSON.stringify(locationData));
    }

    const payload = buildPayload();
    setCurrentPage(1);
    await fetchConsultants(1, payload);
  };

  const handleClearFilters = async () => {
    // Remove query parameters from URL to clear top search bar
    router.replace(pathname, { scroll: false });

    // Remove saved location from localStorage
    localStorage.removeItem("avx_saved_location");

    // Reset filter states
    setSelectedDistance([]);
    setSelectedInventory([]);
    setSelectedVehicleTypes([]);
    setSelectedRating([]);
    setSelectedServices([]);

    // Reset price range to full range
    setMinPrice(MIN);
    setMaxPrice(MAX);

    // Reset location filters
    setSelectedStateId(null);
    setSelectedStateName("");
    setSelectedCityId(null);
    setSelectedCityName("");

    // Reset mobile chips
    setSelectedMobileChips([]);

    // Reset pagination
    setCurrentPage(1);

    // Fetch default results and scroll to top
    await fetchConsultants(1, {});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ── Auto-fetch when any filter changes ──
  useEffect(() => {
    if (!hasMountedForAutoFetch.current) {
      hasMountedForAutoFetch.current = true;
      return;
    }
    if (autoFetchTimerRef.current) clearTimeout(autoFetchTimerRef.current);
    autoFetchTimerRef.current = setTimeout(() => {
      const payload = buildPayload();
      setCurrentPage(1);
      fetchConsultants(1, payload);
    }, 300);
    return () => { if (autoFetchTimerRef.current) clearTimeout(autoFetchTimerRef.current); };
  }, [
    selectedVehicleTypes, selectedServices, selectedRating,
    selectedInventory, selectedDistance,
    selectedCityId, selectedStateId,
    minPrice, maxPrice,
  ]);


  /* ================= FILTER CHIP DATA ================= */
  const distances = [
    { value: "0-10", label: "0–10 Km" },
    { value: "10-30", label: "10–30 Km" },
    { value: "30-50", label: "30–50 Km" },
    { value: "50", label: "50+ Km" },
  ];

  const inventorySizes = [
    { value: "1-10", label: "1–10 vehicles" },
    { value: "10-30", label: "10–30 vehicles" },
    { value: "30+", label: "30+ vehicles" },
  ];

  const vehicleTypes = [
    { value: "TWO_WHEELER", label: "Two-Wheeler" },
    { value: "FOUR_WHEELER", label: "Four-Wheeler" },
  ];

  const ratings = [
    { value: "4.5", label: "⭐ 4.5+ Rating" },
    { value: "4.0", label: "⭐ 4.0+ Rating" },
    { value: "3.0", label: "⭐ 3.0+ Rating" },
  ];

  const mobileFilterMap = {
    "Vehicle Type": vehicleTypes.map((v) => v.label),
    "Consultant Type": [], // not implemented yet
    Rating: ratings.map((r) => r.label),
    "Inventory Size": inventorySizes.map((i) => i.label),
    Services: services.map((s) => s.label),
    Distance: distances.map((d) => d.label),
  };

  // ── Real-time filter tag emission ──
  useEffect(() => {
    const tags = [];
    const vtLabels = { TWO_WHEELER: 'Two-Wheeler', FOUR_WHEELER: 'Four-Wheeler' };
    if (selectedVehicleTypes.length > 0) tags.push(...selectedVehicleTypes.map(v => vtLabels[v] || v));
    if (selectedServices.length > 0) tags.push(...selectedServices.map(s => s.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')));
    if (selectedRating.length > 0) tags.push(`${selectedRating[0]}+ ⭐`);
    if (selectedInventory.length > 0) tags.push(inventorySizes.find(d => d.value === selectedInventory[0])?.label || selectedInventory[0]);
    if (selectedDistance.length > 0) tags.push(distances.find(d => d.value === selectedDistance[0])?.label || selectedDistance[0]);
    if (selectedCityName || selectedStateName) {
      const locationParts = [];
      if (selectedCityName) locationParts.push(selectedCityName);
      if (selectedStateName) locationParts.push(selectedStateName);
      tags.push(locationParts.join(', '));
    }
    if (minPrice !== MIN || maxPrice !== MAX) tags.push(`₹${(minPrice / 100000).toFixed(1)}L–₹${(maxPrice / 100000).toFixed(1)}L`);
    onFilterChange?.(tags);
  }, [
    selectedVehicleTypes, selectedServices, selectedRating,
    selectedInventory, selectedDistance, selectedCityName, selectedStateName,
    minPrice, maxPrice
  ]);

  const filteredStates = states.filter((s) =>
    s.label.toLowerCase().includes(stateSearch.toLowerCase()),
  );

  const filteredCities = cities.filter((c) =>
    c.label.toLowerCase().includes(citySearch.toLowerCase()),
  );

  const handleStateKeyDown = (e) => {
    if (!filteredStates.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedStateIndex((prev) =>
        prev < filteredStates.length - 1 ? prev + 1 : prev,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedStateIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedStateIndex >= 0) {
        const selected = filteredStates[highlightedStateIndex];
        setSelectedStateId(selected.value);
        setSelectedStateName(selected.label);
        setSelectedCityId(null);
        setSelectedCityName("");
        setStateSearch("");
        setStateOpen(false);
        setHighlightedStateIndex(-1);
      }
    }
  };

  const handleCityKeyDown = (e) => {
    if (!filteredCities.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedCityIndex((prev) =>
        prev < filteredCities.length - 1 ? prev + 1 : prev,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedCityIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedCityIndex >= 0) {
        const selected = filteredCities[highlightedCityIndex];
        setSelectedCityId(selected.value);
        setSelectedCityName(selected.label);
        setCitySearch("");
        setCityOpen(false);
        setHighlightedCityIndex(-1);
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row relative text-secondary mt-[20px]">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className="
          hidden lg:flex
          w-[340px]
          border border-third/40
          p-4
          flex-col
          gap-6
          shrink-0
          rounded-xl
          h-fit
          sticky
          top-[84px]
          self-start
        "
      >
        <div className="relative z-10">

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-primary mb-4">
              Filter Your Result
            </h2>

            <button
              className="flex items-center gap-2 mb-4 px-2 py-2 underline
    text-sm font-semibold
    text-primary/60 hover:text-primary
    transition-all duration-200
    cursor-pointer"
              onClick={handleClearFilters}
            >
              Clear All
            </button>
          </div>

          {/* State & City Dropdowns */}
          <div className="space-y-4 mb-6">
            {/* State Dropdown */}
            <div ref={stateRef} className="relative">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-third">State</label>
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  className="flex items-center gap-1 text-xs text-primary/70 hover:text-primary cursor-pointer transition-colors"
                  title="Use my current location"
                >
                  <MapPin size={14} />
                  <span>Detect</span>
                </button>
              </div>

              {stateOpen ? (
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/70 z-10"
                  />
                  <input
                    type="text"
                    value={stateSearch}
                    onKeyDown={handleStateKeyDown}
                    onChange={(e) => {
                      setStateSearch(e.target.value);
                      setHighlightedStateIndex(0);
                    }}
                    placeholder={
                      selectedStateName || "Search or select state..."
                    }
                    className="w-full pl-10 pr-10 py-2.5 bg-transparent border border-primary/60 rounded-md text-primary placeholder:text-primary/60 focus:outline-none focus:border-primary text-sm"
                    autoFocus
                  />
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/70 cursor-pointer"
                    onClick={() => setStateOpen(false)}
                  />
                </div>
              ) : (
                <div
                  onClick={() => setStateOpen(true)}
                  className="h-10 px-3 flex items-center justify-between rounded-md border border-primary/60 bg-transparent text-primary cursor-pointer backdrop-blur-sm"
                >
                  <span className="truncate">
                    {selectedStateName || "Select State"}
                  </span>
                  <ChevronDown size={16} />
                </div>
              )}

              {stateOpen && (
                <div className="absolute z-50 mt-1 w-full border border-primary/60 rounded-md bg-black/40 backdrop-blur-md text-primary shadow-xl max-h-64 overflow-hidden">
                  <div className="max-h-52 overflow-y-auto pt-1">
                    {filteredStates.length > 0 ? (
                      filteredStates.map((s, index) => (
                        <div
                          key={s.value}
                          onClick={() => {
                            setSelectedStateId(s.value);
                            setSelectedStateName(s.label);
                            setSelectedCityId(null);
                            setSelectedCityName("");
                            setStateSearch("");
                            setStateOpen(false);
                          }}
                          className={`px-4 py-2.5 cursor-pointer text-sm ${highlightedStateIndex === index
                            ? "bg-primary/30"
                            : "hover:bg-primary/20"
                            }`}
                        >
                          {s.label}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-sm text-primary/60">
                        No states found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* City Dropdown */}
            <div ref={cityRef} className="relative">
              <label className="text-xs text-third block mb-1">City</label>

              {cityOpen && selectedStateId ? (
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/70 z-10"
                  />
                  <input
                    type="text"
                    value={citySearch}
                    onKeyDown={handleCityKeyDown}
                    onChange={(e) => {
                      setCitySearch(e.target.value);
                      setHighlightedCityIndex(0);
                    }}
                    placeholder={selectedCityName || "Search or select city..."}
                    className="w-full pl-10 pr-10 py-2.5 bg-transparent border border-primary/60 rounded-md text-primary placeholder:text-primary/60 focus:outline-none focus:border-primary text-sm"
                    autoFocus
                  />
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/70 cursor-pointer"
                    onClick={() => setCityOpen(false)}
                  />
                </div>
              ) : (
                <div
                  onClick={() => selectedStateId && setCityOpen(true)}
                  className={`h-10 px-3 flex items-center justify-between rounded-md border border-primary/60 bg-transparent text-primary ${!selectedStateId
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                    } backdrop-blur-sm`}
                >
                  <span className="truncate">
                    {selectedCityName ||
                      (selectedStateId ? "Select City" : "Select state first")}
                  </span>
                  <ChevronDown size={16} />
                </div>
              )}

              {cityOpen && selectedStateId && (
                <div className="absolute z-50 mt-1 w-full border border-primary/60 rounded-md bg-black/40 backdrop-blur-md text-primary shadow-xl max-h-64 overflow-hidden">
                  <div className="max-h-52 overflow-y-auto pt-1">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((c, index) => (
                        <div
                          key={c.value}
                          onClick={() => {
                            setSelectedCityId(c.value);
                            setSelectedCityName(c.label);
                            setCitySearch("");
                            setCityOpen(false);
                          }}
                          className={`px-4 py-2.5 cursor-pointer text-sm ${highlightedCityIndex === index
                            ? "bg-primary/30"
                            : "hover:bg-primary/20"
                            }`}
                        >
                          {c.label}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-sm text-primary/60">
                        No cities found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <FilterSection title={"Distance"}>
              <ChipGroup
                title=""
                items={distances}
                selected={selectedDistance}
                onChange={setSelectedDistance}
                allowMultiple={false}
              />
            </FilterSection>

            <FilterSection title="Inventory Size">
              <ChipGroup
                title=""
                items={inventorySizes}
                selected={selectedInventory}
                onChange={setSelectedInventory}
                allowMultiple={false}
              />
            </FilterSection>

            <FilterSection title="Vehicle Type">
              <ChipGroup
                title=""
                items={vehicleTypes}
                selected={selectedVehicleTypes}
                onChange={setSelectedVehicleTypes}
              />
            </FilterSection>

            <FilterSection title="Rating">
              <ChipGroup
                title=""
                items={ratings}
                selected={selectedRating}
                onChange={setSelectedRating}
                allowMultiple={false}
              />
            </FilterSection>

            <FilterSection title={"Services Provided"}>
              <ChipGroup
                title=""
                items={services}
                selected={selectedServices}
                onChange={setSelectedServices}
              />
            </FilterSection>
          </div>

          <FilterSection title="Budget" defaultOpen={true}>
            <div className="flex flex-col gap-2 mt-3">
              <div className="flex justify-between text-xs text-primary/70 mb-1">
                <span>Min Price</span>
                <span>Max Price</span>
              </div>

              <div className="relative h-6 flex items-center">
                <div
                  className="absolute w-full h-1.5 rounded-full transition-all duration-300 ease-out"
                  style={{ background: getTrackBackground() }}
                />

                <input
                  type="range"
                  min={MIN}
                  max={MAX}
                  step={50000}
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(Math.min(+e.target.value, maxPrice - 50000))
                  }
                  className="dual-range z-30"
                />

                <input
                  type="range"
                  min={MIN}
                  max={MAX}
                  step={50000}
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(Math.max(+e.target.value, minPrice + 50000))
                  }
                  className="dual-range z-40"
                />
              </div>

              <div className="flex justify-between text-xs text-primary/70 mb-1">
                <span>₹{minPrice.toLocaleString()}</span>
                <span>₹{maxPrice.toLocaleString()}</span>
              </div>
            </div>
          </FilterSection>

          <div className="mt-4 flex items-center justify-between gap-3">
            <Button
              variant="outline"
              className="text-primary px-5 py-2"
              showIcon={false}
              onClick={handleApplyFilter}
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 lg:pl-6 min-w-0">
        <div className="flex lg:hidden items-center gap-3 mb-4 overflow-x-auto scrollbar-hide pb-2">
          <div className="shrink-0">
            <Button
              variant="ghost"
              showIcon={false}
              onClick={() => setMobileFilterOpen(true)}
            >
              <FilterIcon className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 bg-white/5">
            <span className="text-xs text-white font-semibold whitespace-nowrap">
              AVX Premium Consultants
            </span>
            <button
              onClick={() => setAvxAssumed(!avxAssumed)}
              className={`relative w-9 h-5 rounded-full ${avxAssumed ? "bg-primary" : "bg-white/20"
                }`}
            >
              <span
                className={`absolute top-1 left-1 h-3 w-3 rounded-full bg-secondary transition-transform ${avxAssumed ? "translate-x-4" : ""
                  }`}
              />
            </button>
          </div>

          {[
            "Premium Consultant",
            "⭐ 4.5+ Rating",
            "Car",
            "AVX Certified Inspection",
          ].map((chip) => (
            <div key={chip} className="shrink-0">
              <Chip
                label={chip}
                selected={selectedMobileChips.includes(chip)}
                variant="outline"
                onClick={() => toggleMobileChip(chip)}
              />
            </div>
          ))}
        </div>

        <ConsultantGridSection
          title="Featured Premium Consultant"
          data={premiumConsultants}
          showIsSponsored={true}
          i={itemsPerPage}
        />

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      {/* ================= MOBILE FILTER DRAWER ================= */}
      <div
        className={`fixed top-[64px] inset-x-0 bottom-0 z-[100] bg-primary text-secondary flex flex-col lg:hidden transition-transform duration-300 ease-in-out ${mobileFilterOpen ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-third/40 shrink-0">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            variant="ghost"
            showIcon={false}
            onClick={() => setMobileFilterOpen(false)}
            className="text-secondary text-xl font-bold p-2"
          >
            ✕
          </Button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-[40%] border-r border-third/40 overflow-y-auto">
            {Object.keys(mobileFilterMap).map((item) => (
              <div
                key={item}
                onClick={() => setActiveFilterTab(item)}
                className={`px-4 py-3 text-sm cursor-pointer ${activeFilterTab === item
                  ? "bg-secondary/10 font-semibold"
                  : "hover:bg-secondary/5"
                  }`}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex flex-wrap gap-3">
              {mobileFilterMap[activeFilterTab]?.map((chip) => (
                <Chip
                  key={chip}
                  label={chip}
                  selected={selectedMobileChips.includes(chip)}
                  variant="outlineDark"
                  onClick={() => toggleMobileChip(chip)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full p-4 border-t border-third/40 bg-primary shrink-0">
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
    </div>
  );
}
