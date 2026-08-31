"use client";

import { useState, useEffect, useRef } from "react";
import InputField from "@/components/ui/inputField";
import Button from "@/components/ui/button";
import ChipGroup from "@/components/ui/chipGroup";
import Chip from "@/components/ui/chip";
import { FilterIcon, MapPin, X } from "lucide-react";
import FilterSection from "../../search/FilterSection";
import CustomSelect from "@/components/ui/custom-select";
import {
  getAllConsultService,
  getUserCityAndStateByLatLong,
  getPremiumConsult,
} from "@/services/consult.filter.service";
import { getCities, getState, getAllTown } from "@/services/user.service";
import ConsultantGridSection from "../search/ConsultantGridSection";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Pagination from "@/components/ui/Pagination";

/* ================= MOBILE DETECTION ================= */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 1023px)").matches;
  });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");

    const listener = (e) => setIsMobile(e.matches);

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  return isMobile;
}

export default function FilterWithCard({
  onFilterChange,
  onPageResponseChange,
  onRemoveFilterHandlerChange,
  onClearAllHandlerChange,
}) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState("Location");
  const [avxAssumed, setAvxAssumed] = useState(false);

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const sort = searchParams.get("sort");

  // ── Services chips (from API) ──
  const [services, setServices] = useState([]);

  // ── State & City states ──
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [selectedStateName, setSelectedStateName] = useState("");
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [selectedCityName, setSelectedCityName] = useState("");
  const [towns, setTowns] = useState([]);
  const [selectedTownId, setSelectedTownId] = useState(null);
  const [selectedTownName, setSelectedTownName] = useState("");

  const prevPageRef = useRef(1);
  const prevSortRef = useRef(sort);
  const autoFetchTimerRef = useRef(null);
  const isInitializingFilters = useRef(true);

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
  const [consultantsLoading, setConsultantsLoading] = useState(true);

  // Add these two lines
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);


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
        ? [
          item.address.town || "",
          item.address.city || "",
          item.address.state || "",
        ]
          .filter(Boolean)
          .join(", ") || "-"
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
      tierTitle: item.tierTitle || item.tierTille,
      isActiveTier: item.isActiveTier,
    }));
  };

  // ── Lock body scroll when mobile filter is open ──
  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFilterOpen]);

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

  // Load towns when city changes
  useEffect(() => {
    const fetchTowns = async () => {
      if (!selectedCityId) {
        setTowns([]);
        setSelectedTownId(null);
        setSelectedTownName("");
        return;
      }
      try {
        const res = await getAllTown(selectedCityId);
        if (res?.data) {
          setTowns(res.data.map((t) => ({ label: t.name, value: t.id })));
        }
      } catch (err) {
        console.error("Failed to load towns:", err);
        setTowns([]);
      }
    };
    fetchTowns();
  }, [selectedCityId]);

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
    setConsultantsLoading(true);
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
    } finally {
      setConsultantsLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchConsultants(1, buildPayload());
    setTimeout(() => {
      isInitializingFilters.current = false;
    }, 100);
  }, []);

  const buildPayload = () => {
    const payload = {};

    if (selectedCityId) payload.cityId = selectedCityId;
    if (selectedStateId) payload.stateId = selectedStateId;
    if (selectedTownId) payload.townId = selectedTownId;

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
    const safeMin = isNaN(minPrice) ? 0 : minPrice;
    const safeMax = isNaN(maxPrice) ? MAX : maxPrice;
    const minPercent = ((safeMin - MIN) / (MAX - MIN)) * 100;
    const maxPercent = ((safeMax - MIN) / (MAX - MIN)) * 100;
    return `linear-gradient(
      to right,
      #e5e7eb 0%,
      #e5e7eb ${minPercent}%,
      #3b82f6 ${minPercent}%,
      #3b82f6 ${maxPercent}%,
      #e5e7eb ${maxPercent}%,
      #e5e7eb 100%
    )`;
  };

  const handleTrackClick = (e) => {
    if (e.target.type === "range") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, offsetX / rect.width));
    const rawValue = MIN + percentage * (MAX - MIN);
    const clickedValue = Math.round(rawValue / 50000) * 50000;

    const distToMin = Math.abs(clickedValue - minPrice);
    const distToMax = Math.abs(clickedValue - maxPrice);

    if (distToMin < distToMax) {
      setMinPrice(Math.min(clickedValue, maxPrice - 50000));
    } else {
      setMaxPrice(Math.max(clickedValue, minPrice + 50000));
    }
  };

  // Re-fetch when page changes
  useEffect(() => {
    if (prevPageRef.current === currentPage) return;
    prevPageRef.current = currentPage;
    const payload = buildPayload();
    fetchConsultants(currentPage, payload);
  }, [currentPage]);

  useEffect(() => {
    if (prevSortRef.current === sort) return;
    prevSortRef.current = sort;
    const payload = buildPayload();
    setCurrentPage(1);
    fetchConsultants(1, payload);
  }, [sort]);
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
    replace(pathname, { scroll: false });

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
    setSelectedTownId(null);
    setSelectedTownName("");
    setTowns([]);

    // Reset pagination
    setCurrentPage(1);

    // Fetch will be handled automatically by the useEffect watching filter states
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (onClearAllHandlerChange) {
      onClearAllHandlerChange(() => handleClearFilters);
    }
  }, [onClearAllHandlerChange]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ── Auto-fetch when any filter changes ──
  useEffect(() => {
    if (isInitializingFilters.current) return;
    if (autoFetchTimerRef.current) clearTimeout(autoFetchTimerRef.current);
    autoFetchTimerRef.current = setTimeout(() => {
      const payload = buildPayload();
      setCurrentPage(1);
      fetchConsultants(1, payload);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
    return () => {
      if (autoFetchTimerRef.current) clearTimeout(autoFetchTimerRef.current);
    };
  }, [
    selectedVehicleTypes,
    selectedServices,
    selectedRating,
    selectedInventory,
    selectedDistance,
    selectedCityId,
    selectedStateId,
    selectedTownId,
    minPrice,
    maxPrice,
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

  // ── Real-time filter tag emission ──
  useEffect(() => {
    const tags = [];
    const vtLabels = {
      TWO_WHEELER: "Two-Wheeler",
      FOUR_WHEELER: "Four-Wheeler",
    };
    if (selectedVehicleTypes.length > 0)
      tags.push(...selectedVehicleTypes.map((v) => vtLabels[v] || v));
    if (selectedServices.length > 0)
      tags.push(
        ...selectedServices.map((s) =>
          s
            .split("_")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" "),
        ),
      );
    if (selectedRating.length > 0) tags.push(`${selectedRating[0]}+ ⭐`);
    if (selectedInventory.length > 0)
      tags.push(
        inventorySizes.find((d) => d.value === selectedInventory[0])?.label ||
        selectedInventory[0],
      );
    if (selectedDistance.length > 0)
      tags.push(
        distances.find((d) => d.value === selectedDistance[0])?.label ||
        selectedDistance[0],
      );
    if (selectedCityName || selectedStateName || selectedTownName) {
      const locationParts = [];
      if (selectedCityName) locationParts.push(selectedCityName);
      if (selectedStateName) locationParts.push(selectedStateName);
      if (selectedTownName) locationParts.push(selectedTownName);
      tags.push(locationParts.join(", "));
    }
    if (minPrice !== MIN || maxPrice !== MAX)
      tags.push(
        `₹${(minPrice / 100000).toFixed(1)}L–₹${(maxPrice / 100000).toFixed(1)}L`,
      );
    onFilterChange?.(tags);
  }, [
    selectedVehicleTypes,
    selectedServices,
    selectedRating,
    selectedInventory,
    selectedDistance,
    selectedCityName,
    selectedStateName,
    selectedTownName,
    minPrice,
    maxPrice,
  ]);

  const handleRemoveFilter = (tag) => {
    if (!tag) return;
    const lower = tag.toLowerCase();

    // 1. Price
    if (lower.includes("₹") || lower.includes("l–")) {
      setMinPrice(MIN);
      setMaxPrice(MAX);
      return;
    }
    // 2. Rating
    if (lower.includes("⭐") || lower.includes("rating")) {
      setSelectedRating([]);
      return;
    }
    // 3. Distance
    if (
      lower.includes("km") ||
      lower.includes("≤") ||
      lower.includes("distance")
    ) {
      setSelectedDistance([]);
      return;
    }
    // 4. Inventory
    if (inventorySizes.some((s) => s.label.toLowerCase() === lower)) {
      setSelectedInventory([]);
      return;
    }
    // 5. Location
    if (
      lower.includes(",") ||
      (selectedCityName && lower.includes(selectedCityName.toLowerCase())) ||
      (selectedStateName && lower.includes(selectedStateName.toLowerCase())) ||
      (selectedTownName && lower.includes(selectedTownName.toLowerCase()))
    ) {
      setSelectedCityId(null);
      setSelectedCityName("");
      setSelectedStateId(null);
      setSelectedStateName("");
      setSelectedTownId(null);
      setSelectedTownName("");
      return;
    }
    // 6. Vehicle Type
    const vtLabels = {
      TWO_WHEELER: "Two-Wheeler",
      FOUR_WHEELER: "Four-Wheeler",
    };
    const foundVt = Object.entries(vtLabels).find(
      ([k, v]) => v.toLowerCase() === lower || k.toLowerCase() === lower,
    );
    if (foundVt) {
      setSelectedVehicleTypes((prev) =>
        prev.filter((item) => item !== foundVt[0]),
      );
      return;
    }
    // 7. Services
    setSelectedServices((prev) =>
      prev.filter(
        (s) =>
          s
            .split("_")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ")
            .toLowerCase() !== lower,
      ),
    );
  };

  useEffect(() => {
    if (onRemoveFilterHandlerChange) {
      onRemoveFilterHandlerChange(() => handleRemoveFilter);
    }
  }, [
    onRemoveFilterHandlerChange,
    selectedVehicleTypes,
    selectedServices,
    selectedRating,
    selectedInventory,
    selectedDistance,
    selectedCityName,
    selectedStateName,
    selectedTownName,
    minPrice,
    maxPrice,
  ]);

  const activeFilterCount =
    selectedVehicleTypes.length +
    selectedServices.length +
    selectedRating.length +
    selectedInventory.length +
    selectedDistance.length +
    (selectedCityName || selectedStateName || selectedTownName ? 1 : 0) +
    (minPrice !== MIN || maxPrice !== MAX ? 1 : 0);

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row relative text-secondary mt-[20px] gap-4">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className="
          hidden lg:flex
          w-[328px]
          border border-third/40
          p-4
          flex-col
          gap-6
          shrink-0
          rounded-xl
          max-h-[calc(100vh-100px)]
          overflow-y-auto
          custom-scrollbar
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
            <div className="relative">
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
              <CustomSelect
                value={selectedStateId}
                options={states}
                placeholder="Select State"
                variant="transparent"
                onChange={(val) => {
                  const s = states.find((st) => st.value === val);
                  setSelectedStateId(val);
                  setSelectedStateName(s ? s.label : "");
                  setSelectedCityId(null);
                  setSelectedCityName("");
                }}
              />
            </div>

            {/* City Dropdown */}
            <div className="relative">
              <label className="text-xs text-third block mb-1">City</label>
              <CustomSelect
                value={selectedCityId}
                options={cities}
                placeholder={
                  selectedStateId ? "Select City" : "Select state first"
                }
                variant="transparent"
                disabled={!selectedStateId}
                onChange={(val) => {
                  const c = cities.find((ct) => ct.value === val);
                  setSelectedCityId(val);
                  setSelectedCityName(c ? c.label : "");
                }}
              />
            </div>

            {/* Town Dropdown */}
            <div className="relative">
              <label className="text-xs text-third block mb-1">Town</label>
              <CustomSelect
                value={selectedTownId}
                options={towns}
                placeholder={
                  selectedCityId ? "Select Town" : "Select city first"
                }
                variant="transparent"
                disabled={!selectedCityId}
                onChange={(val) => {
                  const t = towns.find((tn) => tn.value === val);
                  setSelectedTownId(val);
                  setSelectedTownName(t ? t.label : "");
                }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <FilterSection
              title={"Distance"}
              selectedCount={selectedDistance.length}
            >
              <ChipGroup
                title=""
                items={distances}
                selected={selectedDistance}
                onChange={setSelectedDistance}
                allowMultiple={false}
              />
            </FilterSection>

            <FilterSection
              title="Inventory Size"
              selectedCount={selectedInventory.length}
            >
              <ChipGroup
                title=""
                items={inventorySizes}
                selected={selectedInventory}
                onChange={setSelectedInventory}
                allowMultiple={false}
              />
            </FilterSection>

            <FilterSection
              title="Vehicle Type"
              selectedCount={selectedVehicleTypes.length}
            >
              <ChipGroup
                title=""
                items={vehicleTypes}
                selected={selectedVehicleTypes}
                onChange={setSelectedVehicleTypes}
              />
            </FilterSection>

            <FilterSection title="Rating" selectedCount={selectedRating.length}>
              <ChipGroup
                title=""
                items={ratings}
                selected={selectedRating}
                onChange={setSelectedRating}
                allowMultiple={false}
              />
            </FilterSection>

            <FilterSection
              title={"Services Provided"}
              selectedCount={selectedServices.length}
            >
              <ChipGroup
                title=""
                items={services}
                selected={selectedServices}
                onChange={setSelectedServices}
              />
            </FilterSection>

            <FilterSection title="Budget" defaultOpen={true}>
              <div className="flex flex-col gap-2 mt-3">
                <div className="flex justify-between text-xs text-primary/70 mb-1">
                  <span>Min Price</span>
                  <span>Max Price</span>
                </div>

                <div className="relative h-6 flex items-center cursor-pointer" onPointerDown={handleTrackClick}>
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
                  <span>₹{minPrice.toLocaleString("en-IN")}</span>
                  <span>{isNaN(maxPrice) || maxPrice >= MAX ? `₹${MAX.toLocaleString("en-IN")}+` : `₹${maxPrice.toLocaleString("en-IN")}`}</span>
                </div>
              </div>
            </FilterSection>
          </div>

          {/* <div className="mt-4 flex items-center justify-between gap-3">
            <Button
              variant="outline"
              className="text-primary px-5 py-2"
              showIcon={false}
              onClick={handleApplyFilter}
            >
              Apply Filter
            </Button>
          </div> */}
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 min-w-0">
        <div
          className="lg:hidden sticky top-16 z-40 py-2 mb-4"
          style={{
            background:
              "linear-gradient(90deg, #313131 0%, #1a1919 45%, #000000 100%)",
          }}
        >
          <div className="flex lg:hidden items-center gap-3 overflow-x-auto scrollbar-hide [&>*]:shrink-0">
            <div className="shrink-0 h-10">
              <Button
                variant="ghost"
                className="rounded-xl h-full py-0"
                showIcon={false}
                onClick={() => setMobileFilterOpen(true)}
              >
                <FilterIcon className="h-4 w-4 mr-1" />
                Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
              </Button>
            </div>

            <div className="flex items-center gap-2 px-3 h-10 rounded-xl border border-third/40 shrink-0">
              <span className="text-sm text-primary font-semibold whitespace-nowrap">
                Reecomm Premium Consultants
              </span>
              <button
                onClick={() => setAvxAssumed(!avxAssumed)}
                className={`relative w-9 h-5 rounded-full cursor-pointer ${avxAssumed ? "bg-primary" : "bg-white/20"}`}
              >
                <span
                  className={`absolute top-1 left-1 h-3 w-3 rounded-full bg-secondary transition-transform ${avxAssumed ? "translate-x-4" : ""}`}
                />
              </button>
            </div>

            <div className="shrink-0">
              <Chip
                className="h-10"
                label="Four-Wheeler"
                selected={selectedVehicleTypes.includes("FOUR_WHEELER")}
                variant="outline"
                onClick={() => {
                  setSelectedVehicleTypes((prev) =>
                    prev.includes("FOUR_WHEELER")
                      ? prev.filter((v) => v !== "FOUR_WHEELER")
                      : [...prev, "FOUR_WHEELER"],
                  );
                }}
              />
            </div>
            <div className="shrink-0">
              <Chip
                className="h-10"
                label="⭐ 4.5+ Rating"
                selected={selectedRating.includes("4.5")}
                variant="outline"
                onClick={() => {
                  setSelectedRating((prev) =>
                    prev.includes("4.5")
                      ? prev.filter((r) => r !== "4.5")
                      : ["4.5"],
                  );
                }}
              />
            </div>
            <div className="shrink-0">
              <Chip
                className="h-10"
                label="30+ Vehicles"
                selected={selectedInventory.includes("30+")}
                variant="outline"
                onClick={() => {
                  setSelectedInventory((prev) =>
                    prev.includes("30+")
                      ? prev.filter((i) => i !== "30+")
                      : ["30+"],
                  );
                }}
              />
            </div>
          </div>
        </div>

        <ConsultantGridSection
          title="Featured Premium Consultant"
          data={premiumConsultants}
          showIsSponsored={false}
          i={itemsPerPage}
          loading={consultantsLoading}
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
        className={`fixed top-[64px] inset-x-0 bottom-0 z-100 bg-primary text-secondary flex flex-col lg:hidden transition-transform duration-300 ease-in-out ${mobileFilterOpen ? "translate-y-0" : "translate-y-full"
          }`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-third/40 shrink-0">
          <h2 className="text-lg font-semibold">
            Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </h2>
          <Button
            variant="ghost"
            showIcon={false}
            onClick={() => setMobileFilterOpen(false)}
            className="text-primary bg-secondary hover:bg-secondary/50 hover:text-primary/80 text-xl font-bold p-1"
          >
            <X size={20} />
          </Button>
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-1 overflow-hidden">
          {/* ── Left Tabs ── */}
          <div className="w-[40%] border-r border-third/40 overflow-y-auto">
            {[
              {
                name: "Location",
                count: selectedStateId
                  ? selectedCityId
                    ? selectedTownId
                      ? 3
                      : 2
                    : 1
                  : 0,
              },
              { name: "Vehicle Type", count: selectedVehicleTypes.length },
              { name: "Distance", count: selectedDistance.length },
              { name: "Inventory Size", count: selectedInventory.length },
              { name: "Rating", count: selectedRating.length },
              { name: "Services", count: selectedServices.length },
              { name: "Budget", count: 0 },
            ].map((tab) => (
              <div
                key={tab.name}
                onClick={() => setActiveFilterTab(tab.name)}
                className={`px-4 py-3 cursor-pointer text-sm flex items-center justify-between ${activeFilterTab === tab.name
                  ? "bg-secondary/10 font-semibold"
                  : "hover:bg-secondary/5"
                  }`}
              >
                <span>{tab.name}</span>
                {tab.count > 0 && (
                  <span className="flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-primary text-secondary text-[10px] font-bold leading-none">
                    {tab.count}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* ── Right Content ── */}
          <div className="flex-1 p-4 overflow-y-auto">
            <h3 className="text-sm font-semibold mb-3">{activeFilterTab}</h3>

            {/* ── LOCATION ── */}
            {activeFilterTab === "Location" && (
              <div className="space-y-4">
                <div className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-secondary/60">State</label>
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      className="flex items-center gap-1 text-xs text-secondary/70 hover:text-secondary cursor-pointer transition-colors"
                    >
                      <MapPin size={14} />
                      <span>Detect</span>
                    </button>
                  </div>
                  <CustomSelect
                    value={selectedStateId}
                    options={states}
                    placeholder="Select State"
                    variant="default"
                    onChange={(val) => {
                      const s = states.find((st) => st.value === val);
                      setSelectedStateId(val);
                      setSelectedStateName(s ? s.label : "");
                      setSelectedCityId(null);
                      setSelectedCityName("");
                    }}
                  />
                </div>

                <div className="relative">
                  <label className="text-xs text-secondary/60 block mb-1">
                    City
                  </label>
                  <CustomSelect
                    value={selectedCityId}
                    options={cities}
                    placeholder={
                      selectedStateId ? "Select City" : "Select state first"
                    }
                    variant="default"
                    disabled={!selectedStateId}
                    onChange={(val) => {
                      const c = cities.find((ct) => ct.value === val);
                      setSelectedCityId(val);
                      setSelectedCityName(c ? c.label : "");
                    }}
                  />
                </div>
              </div>
            )}

            {/* ── VEHICLE TYPE ── */}
            {activeFilterTab === "Vehicle Type" && (
              <ChipGroup
                title=""
                items={vehicleTypes}
                selected={selectedVehicleTypes}
                onChange={setSelectedVehicleTypes}
                variant="outlineDark"
              />
            )}

            {/* ── DISTANCE ── */}
            {activeFilterTab === "Distance" && (
              <ChipGroup
                title=""
                items={distances}
                selected={selectedDistance}
                onChange={setSelectedDistance}
                allowMultiple={false}
                variant="outlineDark"
              />
            )}

            {/* ── INVENTORY SIZE ── */}
            {activeFilterTab === "Inventory Size" && (
              <ChipGroup
                title=""
                items={inventorySizes}
                selected={selectedInventory}
                onChange={setSelectedInventory}
                allowMultiple={false}
                variant="outlineDark"
              />
            )}

            {/* ── RATING ── */}
            {activeFilterTab === "Rating" && (
              <ChipGroup
                title=""
                items={ratings}
                selected={selectedRating}
                onChange={setSelectedRating}
                allowMultiple={false}
                variant="outlineDark"
              />
            )}

            {/* ── SERVICES ── */}
            {activeFilterTab === "Services" && (
              <ChipGroup
                title=""
                items={services}
                selected={selectedServices}
                onChange={setSelectedServices}
                variant="outlineDark"
              />
            )}

            {/* ── BUDGET ── */}
            {activeFilterTab === "Budget" && (
              <div className="flex flex-col gap-2 mt-3">
                <div className="flex justify-between text-xs text-secondary/70 mb-1">
                  <span>Min Price</span>
                  <span>Max Price</span>
                </div>
                <div className="relative h-6 flex items-center cursor-pointer" onPointerDown={handleTrackClick}>
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
                    onTouchEnd={() => {
                      const p = buildPayload();
                      setCurrentPage(1);
                      fetchConsultants(1, p);
                    }}
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
                    onTouchEnd={() => {
                      const p = buildPayload();
                      setCurrentPage(1);
                      fetchConsultants(1, p);
                    }}
                    className="dual-range z-40"
                  />
                </div>
                <div className="flex justify-between text-xs text-secondary/70 mb-1">
                  <span>₹{minPrice.toLocaleString("en-IN")}</span>
                  <span>{isNaN(maxPrice) || maxPrice >= MAX ? `₹${MAX.toLocaleString("en-IN")}+` : `₹${maxPrice.toLocaleString("en-IN")}`}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="w-full p-4 border-t border-third/40 bg-primary shrink-0 flex gap-3">
          <Button
            variant="outline"
            showIcon={false}
            className="flex-1 text-secondary border-secondary/40 hover:bg-secondary/10"
            onClick={() => {
              handleClearFilters();
              setMobileFilterOpen(false);
            }}
          >
            Clear All
          </Button>
          <Button
            variant="default"
            showIcon={false}
            className="flex-1"
            onClick={() => setMobileFilterOpen(false)}
          >
            Show Results
          </Button>
        </div>
      </div>
    </div>
  );
}
