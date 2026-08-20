"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Search,
  X,
  Loader2,
  Car,
  User,
  Bike,
  Fuel,
  Zap,
  Flame,
  Sparkles,
  MapPin,
  Tag,
} from "lucide-react";
import { useRouter } from "next/router";
import {
  getMakersByFuelOrBodyType,
  getAndSearchMakers,
  SearchCityAndState,
  getPopularCityAndState,
} from "@/services/filter";
import { getAllConsultService } from "@/services/consult.filter.service";
import { useUIStore } from "@/stores/useUIStore";
import CustomSelect from "@/components/ui/custom-select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  saveRecentSearch,
  getRecentSearches,
  deleteAllRecentSearches,
} from "@/services/user.service";

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

const MIN = 50000;
const MAX = 2000000;

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
  const [isSearching, setIsSearching] = useState(false);
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

  /* ================= RECENT SEARCHES API (NAVBAR EQUIVALENT) ================= */
  const queryClient = useQueryClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: recentSearchesData } = useQuery({
    queryKey: ["recentSearches"],
    queryFn: getRecentSearches,
    enabled: mobileOpen || activeTab !== null,
    retry: false,
  });

  const apiRecentSearches = useMemo(() => {
    const rawData = Array.isArray(recentSearchesData?.data)
      ? recentSearchesData.data
      : Array.isArray(recentSearchesData)
        ? recentSearchesData
        : [];

    return rawData
      .map((item) => {
        if (!item) return "";
        if (typeof item === "string") return item;
        if (typeof item === "object") {
          return (
            item.search ||
            item.searchTerm ||
            item.searchQuery ||
            item.label ||
            ""
          );
        }
        return String(item);
      })
      .filter((term) => Boolean(term) && term !== "[object Object]");
  }, [recentSearchesData]);

  const [localRecentSearches, setLocalRecentSearches] = useState([]);

  const displayRecentSearches = useMemo(() => {
    const combined = [...localRecentSearches, ...apiRecentSearches];
    const unique = [];
    const seen = new Set();
    for (const term of combined) {
      if (term && typeof term === "string") {
        const lower = term.trim().toLowerCase();
        if (lower && !seen.has(lower)) {
          seen.add(lower);
          unique.push(term.trim());
        }
      }
    }
    return unique.slice(0, 5);
  }, [apiRecentSearches, localRecentSearches]);

  const { data: popularMakersData } = useQuery({
    queryKey: ["popularBrandsList"],
    queryFn: () => getAndSearchMakers({ page: 1, limit: 100 }),
    staleTime: 5 * 60 * 1000,
  });

  const apiBrandsList = useMemo(() => {
    const list =
      popularMakersData?.data && Array.isArray(popularMakersData.data)
        ? popularMakersData.data
        : brandOptions.length > 0
          ? brandOptions
          : [];

    const sorted = [...list].sort((a, b) =>
      (a.makeDisplay || a.makeName || "").localeCompare(
        b.makeDisplay || b.makeName || "",
      ),
    );

    if (sorted.length > 0) return sorted;

    return [
      { makeName: "Maruti Suzuki", makeDisplay: "Maruti Suzuki", logo: "" },
      { makeName: "Hyundai", makeDisplay: "Hyundai", logo: "" },
      { makeName: "Tata", makeDisplay: "Tata", logo: "" },
      { makeName: "Mahindra", makeDisplay: "Mahindra", logo: "" },
      { makeName: "Toyota", makeDisplay: "Toyota", logo: "" },
      { makeName: "Honda", makeDisplay: "Honda", logo: "" },
    ];
  }, [popularMakersData, brandOptions]);

  const saveSearchMutation = useMutation({
    mutationFn: saveRecentSearch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recentSearches"] });
    },
  });

  const clearSearchesMutation = useMutation({
    mutationFn: deleteAllRecentSearches,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recentSearches"] });
    },
  });

  /* ================= VEHICLE & BRAND SEARCH SUGGESTIONS (NAVBAR EQUIVALENT) ================= */
  // Animated Placeholder State (Desktop Equivalent)
  const originalPlaceholderTexts = [
    "Search for brands...",
    "Search for consultants...",
    "Search for vehicles...",
    "Search by budget...",
  ];
  const placeholderTexts = [
    ...originalPlaceholderTexts,
    originalPlaceholderTexts[0],
  ];
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => {
        const next = prev + 1;
        setIsTransitioning(true);
        if (next === originalPlaceholderTexts.length) {
          setTimeout(() => {
            setIsTransitioning(false);
            setPlaceholderIdx(0);
          }, 500);
        }
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const [vehicleSearchQuery, setVehicleSearchQuery] = useState("");
  const [suggestionsData, setSuggestionsData] = useState([]);
  const [filteredVehicleSuggestions, setFilteredVehicleSuggestions] = useState(
    [],
  );
  const [isSuggestionsLoaded, setIsSuggestionsLoaded] = useState(false);

  const loadSearchSuggestions = async () => {
    if (isSuggestionsLoaded) return;
    try {
      const data = await import("@/data/searchSuggestions.json");
      const rawSuggestions = data.default || data;
      const loadedSuggestions = rawSuggestions.map((s) => {
        if (s.type === "brand" || s.type === "model") {
          const prefix = s.label.toLowerCase().startsWith("used")
            ? ""
            : "Used ";
          return { ...s, rawLabel: s.label, label: `${prefix}${s.label}` };
        }
        return s;
      });

      let consultantsList = [];
      try {
        const searchIndexRes = await fetch("/search_index.json");
        if (searchIndexRes.ok) {
          const indexData = await searchIndexRes.json();
          if (Array.isArray(indexData)) {
            consultantsList = indexData
              .filter((item) => item.type === "consultant" && item.params?.username)
              .map((item) => ({
                id: item.id,
                label: item.title || item.params.username || "",
                username: item.params.username || "",
                type: "consultant",
                link: `/auto-consultant/${item.params.username}`,
              }))
              .filter((c) => c.label && c.username);
          }
        }
      } catch (err) {
        console.error("Failed to load consultants list in filter bar", err);
      }

      setSuggestionsData([...loadedSuggestions, ...consultantsList]);
      setIsSuggestionsLoaded(true);
    } catch (err) {
      console.error("Failed to load search suggestions in filter bar", err);
    }
  };

  useEffect(() => {
    loadSearchSuggestions();
  }, []);

  useEffect(() => {
    if (!vehicleSearchQuery.trim()) {
      setFilteredVehicleSuggestions([]);
      return;
    }
    const q = vehicleSearchQuery.toLowerCase().trim();
    const matches = suggestionsData
      .filter((s) => {
        const labelMatch = s.label.toLowerCase().includes(q);
        const usernameMatch =
          s.username && s.username.toLowerCase().includes(q);
        return labelMatch || usernameMatch;
      })
      .slice(0, 8);

    setFilteredVehicleSuggestions(matches);
  }, [vehicleSearchQuery, suggestionsData]);

  const handleSelectVehicleSuggestion = (item) => {
    const searchLabel = item.label || item.rawLabel || vehicleSearchQuery;

    if (searchLabel) {
      saveSearchMutation.mutate(searchLabel);
      setLocalRecentSearches((prev) => {
        const filtered = prev.filter(
          (term) => term.toLowerCase() !== searchLabel.toLowerCase(),
        );
        return [searchLabel, ...filtered].slice(0, 5);
      });
    }

    setMobileOpen(false);
    setActiveTab(null);
    setVehicleSearchQuery("");

    if (item.link) {
      push(item.link);
      return;
    }
    if (item.username) {
      push(`/auto-consultant/${item.username}`);
      return;
    }
    if (item.type === "brand") {
      const brandName = item.rawLabel || item.brand || item.label;
      push(`/search?brand=${encodeURIComponent(brandName)}`);
      return;
    }
    if (item.type === "model") {
      const brandParam = item.brand
        ? `&brand=${encodeURIComponent(item.brand)}`
        : "";
      const modelIdParam = item.modelId
        ? `&modelId=${item.modelId}&model=${encodeURIComponent(item.model || item.rawLabel)}`
        : "";
      push(
        `/search?q=${encodeURIComponent(item.label || item.rawLabel)}${brandParam}${modelIdParam}`,
      );
      return;
    }
    push(`/search?q=${encodeURIComponent(searchLabel)}`);
  };

  const handleVehicleSearchSubmit = (queryStr = vehicleSearchQuery) => {
    if (!queryStr || !queryStr.trim()) return;
    const cleanQuery = queryStr.trim();

    saveSearchMutation.mutate(cleanQuery);
    setLocalRecentSearches((prev) => {
      const filtered = prev.filter(
        (term) => term.toLowerCase() !== cleanQuery.toLowerCase(),
      );
      return [cleanQuery, ...filtered].slice(0, 5);
    });

    setMobileOpen(false);
    setActiveTab(null);
    setVehicleSearchQuery("");
    push(`/search?q=${encodeURIComponent(cleanQuery)}`);
  };

  const [priceRange, setPriceRange] = useState("");
  const [minPrice, setMinPrice] = useState(50000);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [consultMinPrice, setConsultMinPrice] = useState(50000);
  const [consultMaxPrice, setConsultMaxPrice] = useState(2000000);
  const [service, setService] = useState("");
  const [availability, setAvailability] = useState("");
  const [serviceOptions, setServiceOptions] = useState([]);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const containerRef = useRef(null);
  const brandInputRef = useRef(null);
  const searchTimerRef = useRef(null);
  const mobileTriggerRef = useRef(null);
  const isFirstRender = useRef(true);
  const isConsultFirstRender = useRef(true);

  const getTrackBackground = () => {
    const minPercent = ((minPrice - MIN) / (MAX - MIN)) * 100;
    const maxPercent = ((maxPrice - MIN) / (MAX - MIN)) * 100;
    return `linear-gradient(
      to right,
      #333333 0%,
      #333333 ${minPercent}%,
      #3b82f6 ${minPercent}%,
      #3b82f6 ${maxPercent}%,
      #333333 ${maxPercent}%,
      #333333 100%
    )`;
  };

  const getConsultTrackBackground = () => {
    const minPercent = ((consultMinPrice - MIN) / (MAX - MIN)) * 100;
    const maxPercent = ((consultMaxPrice - MIN) / (MAX - MIN)) * 100;
    return `linear-gradient(
      to right,
      #333333 0%,
      #333333 ${minPercent}%,
      #3b82f6 ${minPercent}%,
      #3b82f6 ${maxPercent}%,
      #333333 ${maxPercent}%,
      #333333 100%
    )`;
  };

  // Sync range slider state to search budget state
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (minPrice === MIN && maxPrice === MAX) {
      setBudget("");
    } else {
      setBudget(`${minPrice / 100000} - ${maxPrice / 100000}`);
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (isConsultFirstRender.current) {
      isConsultFirstRender.current = false;
      return;
    }
    if (consultMinPrice === MIN && consultMaxPrice === MAX) {
      setPriceRange("");
    } else {
      setPriceRange(
        `${consultMinPrice / 100000} - ${consultMaxPrice / 100000}`,
      );
    }
  }, [consultMinPrice, consultMaxPrice]);

  const availableFuelTypes = useMemo(() => {
    const isTwoWheeler =
      vehicleType &&
      (vehicleType.toLowerCase().includes("2") ||
        vehicleType.toLowerCase().includes("two"));
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
          if (item.stateName && item.stateId && !seenStates.has(item.stateId)) {
            seenStates.add(item.stateId);

            // Check if search term matches the state name (e.g. "harya" matches "Haryana")
            if (
              item.stateName.toLowerCase().includes(term.toLowerCase().trim())
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

  useEffect(() => {
    fetchBrands(fuelType, bodyType);
  }, [fuelType, bodyType, vehicleType]);

  const locationOptions = useMemo(() => {
    return locationSuggestions.map((item, idx) => ({
      label: item.isStateOnly
        ? item.stateName
        : `${item.cityName}, ${item.stateName}`,
      value: item.isStateOnly
        ? `state-${item.stateId}-${idx}`
        : `city-${item.cityId}-${idx}`,
    }));
  }, [locationSuggestions]);

  const currentLocationValue = useMemo(() => {
    if (!location) return "";
    const foundOpt = locationOptions.find((opt) => opt.label === location);
    return foundOpt ? foundOpt.value : "";
  }, [location, locationOptions]);

  const handleLocationSelect = (val) => {
    if (!val) {
      setLocation("");
      setCityId(null);
      setStateId(null);
      return;
    }
    if (val.startsWith("state-")) {
      const parts = val.split("-");
      const idx = parseInt(parts[2]);
      const item = locationSuggestions[idx];
      if (item) {
        setLocation(item.stateName);
        setCityId(null);
        setStateId(item.stateId);
      }
    } else if (val.startsWith("city-")) {
      const parts = val.split("-");
      const idx = parseInt(parts[2]);
      const item = locationSuggestions[idx];
      if (item) {
        setLocation(`${item.cityName}, ${item.stateName}`);
        setCityId(item.cityId);
        setStateId(item.stateId);
      }
    }
  };

  const bodyTypeOptions = useMemo(() => {
    const types =
      vehicleType === "4 Wheeler" ? FOUR_WHEELER_TYPES : TWO_WHEELER_TYPES;
    return types.map((t) => ({ label: t.label, value: t.label }));
  }, [vehicleType]);

  const brandOptionsList = useMemo(() => {
    return brandOptions.map((b) => ({
      label: b.makeDisplay,
      value: b.makeName,
    }));
  }, [brandOptions]);

  /* ================= LOGIC HELPERS ================= */
  const fetchBrands = async (
    currentFuel = fuelType,
    currentBody = bodyType,
  ) => {
    try {
      const mappedBodyType =
        vehicleType &&
          (vehicleType.toLowerCase().includes("2") ||
            vehicleType.toLowerCase().includes("two"))
          ? "TWO_WHEELER"
          : "FOUR_WHEELER";
          
      if (currentFuel) {
        const res = await getMakersByFuelOrBodyType({
          fuelType: currentFuel.toUpperCase(),
          bodyType: mappedBodyType,
          page: 1,
          limit: 100,
        });
        setBrandOptions(res.data || []);
      } else {
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
  const [mobileTab, setMobileTab] = useState("location");
  const getNormalizedType = (type) => {
    if (!type) return "vehicle";
    return type.toLowerCase().startsWith("consult") ? "consult" : "vehicle";
  };

  const [internalActiveType, setInternalActiveType] = useState(() =>
    getNormalizedType(activeType),
  );
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      setActiveTab("location");
    }
  }, [mobileOpen]);

  // Keep internalActiveType in sync when the parent changes the activeType prop
  useEffect(() => {
    setInternalActiveType(getNormalizedType(activeType));
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

  const { setMobileBannerTempHidden, setIsSearchDropdownOpen } = useUIStore();

  useEffect(() => {
    setIsSearchDropdownOpen(mobileOpen || activeTab !== null);
    return () => {
      setIsSearchDropdownOpen(false);
    };
  }, [mobileOpen, activeTab, setIsSearchDropdownOpen]);

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

    // Cleanup to ensure banner comes back and body scroll unlocks if unmounted unexpectedly
    return () => {
      setMobileBannerTempHidden(false);
      if (typeof window !== "undefined") {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
      }
    };
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

  const handleSearch = async () => {
    if (!vehicleType) {
      setVehicleTypeError(true);
      return;
    }

    if (vehicleSearchQuery && vehicleSearchQuery.trim()) {
      saveSearchMutation.mutate(vehicleSearchQuery.trim());
    }

    setIsSearching(true);
    try {
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
        await push(`/consult/discovery${query ? `?${query}` : ""}`);
        setActiveTab(null);
        setMobileOpen(false);
      } else {
        const vtLower = vehicleType ? vehicleType.toLowerCase().replace(/_/g, " ") : "";
        const isTwoWheeler = vtLower.includes("2") || vtLower.includes("two");
        const vehicleKind = isTwoWheeler ? "two-wheelers" : "cars";

        // Generate SEO-friendly slug
        let slug = "buy-used-";
        if (brand) {
          slug += brand.toLowerCase().replace(/\s+/g, "-") + "-";
        }
        slug += vehicleKind;
        if (location) {
          const cityName = location
            .split(",")[0]
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-");
          slug += "-" + cityName;
        }

        // Other filters as query params
        const queryParams = new URLSearchParams({
          ...(bodyType && { bodyType: bodyType.toUpperCase() }),
          ...(fuelType && { fuelType: fuelType.toUpperCase() }),
          ...(budget && { budget }),
        }).toString();

        await push(`/search/${slug}${queryParams ? `?${queryParams}` : ""}`);
        setActiveTab(null);
        setMobileOpen(false);
      }
    } finally {
      setIsSearching(false);
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
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #fff;
          transform: scale(1.05);
          box-shadow:
            0 8px 28px rgba(0,0,0,0.30),
            0 1px 0 rgba(255,255,255,0.5) inset;
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

        .lg-clear-btn {
          padding: 4px;
          border-radius: 9999px;
          color: rgba(255, 255, 255, 0.4);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lg-clear-btn:hover {
          background-color: rgba(255, 255, 255, 0.15);
          color: #fff;
          transform: scale(1.1);
        }
      `}</style>
      <div className="hidden lg:flex absolute bottom-[20vh] left-0 right-0 z-30 justify-center items-center px-4">
        <div className="lg-glass-bar">
          <div ref={containerRef} className="lg-glass-inner">
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
                    <div className="flex justify-between items-center px-2 py-1 mb-1 border-b border-white/10">
                      <span className="text-xs font-semibold text-white/50">
                        Location
                      </span>
                      {location && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocation("");
                            setCityId(null);
                            setStateId(null);
                          }}
                          className="text-xs underline text-white hover:text-white/80 font-semibold transition-colors cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                      {locationSuggestions.length > 0 ? (
                        locationSuggestions.map((item) => (
                          <button
                            key={
                              item.isStateOnly
                                ? `state-${item.stateId}`
                                : item.cityId
                            }
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
                              {item.isStateOnly
                                ? item.stateName
                                : item.cityName}
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
                <div
                  className={
                    vehicleTypeError
                      ? "lg-value error"
                      : vehicleType
                        ? "lg-value"
                        : "lg-value placeholder"
                  }
                >
                  {vehicleTypeError
                    ? "* Required"
                    : vehicleType || "Select vehicle type"}
                </div>
                {activeTab === "vehicle" && (
                  <div className="absolute top-[110%] left-0 z-50 dropdown-active w-60 lg-glass-dropdown rounded-xl p-2">
                    <div className="flex justify-between items-center px-2 py-1 mb-1 border-b border-white/10">
                      <span className="text-xs font-semibold text-white/50">
                        Vehicle Type
                      </span>
                      {vehicleType && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setVehicleType("");
                            setVehicleTypeError(false);
                            setFuelType("");
                            setBodyType("");
                            setBrand("");
                            setMakerId(null);
                          }}
                          className="text-xs underline text-white hover:text-white/80 font-semibold transition-colors cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
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
                    <div
                      className={
                        priceRange ? "lg-value" : "lg-value placeholder"
                      }
                    >
                      {priceRange || "Select price"}
                    </div>
                    {activeTab === "priceRange" && (
                      <div className="absolute top-[110%] left-0 z-50 dropdown-active w-60 lg-glass-dropdown rounded-xl p-2">
                        <div className="flex justify-between items-center px-2 py-1 mb-1 border-b border-white/10">
                          <span className="text-xs font-semibold text-white/50">
                            Price Range
                          </span>
                          {priceRange && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPriceRange("");
                              }}
                              className="text-xs underline text-white hover:text-white/80 font-semibold transition-colors cursor-pointer"
                            >
                              Clear
                            </button>
                          )}
                        </div>
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
                    <div
                      className={service ? "lg-value" : "lg-value placeholder"}
                    >
                      {service || "Select service"}
                    </div>
                    {activeTab === "service" && (
                      <div className="absolute top-[110%] left-0 z-50 dropdown-active w-[280px] lg-glass-dropdown rounded-xl p-2">
                        <div className="flex justify-between items-center px-2 py-1 mb-1 border-b border-white/10">
                          <span className="text-xs font-semibold text-white/50">
                            Service
                          </span>
                          {service && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setService("");
                              }}
                              className="text-xs underline text-white hover:text-white/80 font-semibold transition-colors cursor-pointer"
                            >
                              Clear
                            </button>
                          )}
                        </div>
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
                    <div
                      className={
                        availability ? "lg-value" : "lg-value placeholder"
                      }
                    >
                      {availability || "Select availability"}
                    </div>
                    {activeTab === "availability" && (
                      <div className="absolute top-[110%] left-0 z-50 dropdown-active w-60 lg-glass-dropdown rounded-xl p-2">
                        <div className="flex justify-between items-center px-2 py-1 mb-1 border-b border-white/10">
                          <span className="text-xs font-semibold text-white/50">
                            Availability
                          </span>
                          {availability && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setAvailability("");
                              }}
                              className="text-xs underline text-white hover:text-white/80 font-semibold transition-colors cursor-pointer"
                            >
                              Clear
                            </button>
                          )}
                        </div>
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
                    <div
                      className={bodyType ? "lg-value" : "lg-value placeholder"}
                    >
                      {bodyType || "Select body type"}
                    </div>
                    {activeTab === "bodyType" && (
                      <div className="absolute top-[110%] left-0 z-50 dropdown-active w-60 lg-glass-dropdown rounded-xl p-2">
                        <div className="flex justify-between items-center px-2 py-1 mb-1 border-b border-white/10">
                          <span className="text-xs font-semibold text-white/50">
                            Body Type
                          </span>
                          {bodyType && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setBodyType("");
                              }}
                              className="text-xs underline text-white hover:text-white/80 font-semibold transition-colors cursor-pointer"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                        <div className="flex flex-col max-h-[200px] overflow-y-auto custom-scrollbar">
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
                    <div
                      className={fuelType ? "lg-value" : "lg-value placeholder"}
                    >
                      {fuelType || "Select fuel type"}
                    </div>
                    {activeTab === "fuel" && (
                      <div className="absolute top-[110%] left-0 z-50 dropdown-active w-60 lg-glass-dropdown rounded-xl p-2">
                        <div className="flex justify-between items-center px-2 py-1 mb-1 border-b border-white/10">
                          <span className="text-xs font-semibold text-white/50">
                            Fuel Type
                          </span>
                          {fuelType && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setFuelType("");
                              }}
                              className="text-xs underline text-white hover:text-white/80 font-semibold transition-colors cursor-pointer"
                            >
                              Clear
                            </button>
                          )}
                        </div>
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
                    {activeTab === "brand" ? (
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
                    ) : (
                      <div className={brand ? "lg-value" : "lg-value placeholder"}>
                        {brand || "Search brand"}
                      </div>
                    )}
                    {activeTab === "brand" && (
                      <div className="absolute top-[110%] left-0 z-50 dropdown-active w-[300px] lg-glass-dropdown rounded-xl p-2">
                        <div className="flex justify-between items-center px-2 py-1 mb-1 border-b border-white/10">
                          <span className="text-xs font-semibold text-white/50">
                            Brand
                          </span>
                          {(brand || brandSearch) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setBrand("");
                                setMakerId(null);
                                setBrandSearch("");
                              }}
                              className="text-xs underline text-white hover:text-white/80 font-semibold transition-colors cursor-pointer"
                            >
                              Clear
                            </button>
                          )}
                        </div>
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
                              className="w-full py-1.5 px-3 hover:bg-white/10 rounded-lg text-left text-sm font-semibold cursor-pointer flex items-center gap-2 text-white"
                            >
                              {b.logo && (
                                <img
                                  src={b.logo}
                                  alt={b.makeDisplay}
                                  className="w-5 h-5 object-contain rounded bg-white p-0.5 shrink-0"
                                />
                              )}
                              <span>{b.makeDisplay}</span>
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
                    <div
                      className={budget ? "lg-value" : "lg-value placeholder"}
                    >
                      {budget || "Select budget"}
                    </div>
                    {activeTab === "budget" && (
                      <div className="absolute top-[110%] left-0 z-50 dropdown-active w-60 lg-glass-dropdown rounded-xl p-2">
                        <div className="flex justify-between items-center px-2 py-1 mb-1 border-b border-white/10">
                          <span className="text-xs font-semibold text-white/50">
                            Budget
                          </span>
                          {budget && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setBudget("");
                              }}
                              className="text-xs underline text-white hover:text-white/80 font-semibold transition-colors cursor-pointer"
                            >
                              Clear
                            </button>
                          )}
                        </div>
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
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <Loader2
                      className="animate-spin"
                      size={20}
                      strokeWidth={2.5}
                    />
                  ) : (
                    <Search size={20} strokeWidth={2.5} />
                  )}
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
          <button
            onClick={() => {
              setMobileOpen(true);
              setActiveTab("location");
            }}
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

        <div
          id="mobile-drawer"
          className={`relative w-full sm:w-[90%] max-w-md bg-[#111111] rounded-t-3xl sm:rounded-3xl flex flex-col transition-transform duration-300 ${mobileOpen ? "translate-y-0" : "translate-y-full sm:scale-95"} h-[calc(100dvh-70px)] sm:h-[95vh] overflow-y-auto custom-scrollbar pb-6`}
        >
          {/* Header */}
          <div className="p-5 pb-1 flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Search Vehicles
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Filter inventory and find vehicles instantly
              </p>
            </div>
            <button
              onClick={() => {
                setMobileOpen(false);
                setActiveTab(null);
              }}
              className="p-2 bg-[#222] text-gray-400 hover:text-white cursor-pointer rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Tab Switcher (Vehicle / Consultant) */}
          <div className="flex px-5 mt-3 border-b border-[#222]">
            <button
              onClick={() => {
                setInternalActiveType("vehicle");
                setActiveTab("location");
              }}
              className={`flex-1 pb-2.5 text-[15px] font-semibold flex flex-col items-center gap-1.5 transition-colors relative cursor-pointer ${internalActiveType === "vehicle" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
            >
              <Car size={20} strokeWidth={1.5} />
              Vehicle
              {internalActiveType === "vehicle" && (
                <div className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-blue-500 rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => {
                setInternalActiveType("consult");
                setActiveTab("location");
              }}
              className={`flex-1 pb-2.5 text-[15px] font-semibold flex flex-col items-center gap-1.5 transition-colors relative cursor-pointer ${internalActiveType === "consult" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
            >
              <User size={20} strokeWidth={1.5} />
              Consultant
              {internalActiveType === "consult" && (
                <div className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-blue-500 rounded-t-full" />
              )}
            </button>
          </div>

          {/* Search Bar with live vehicle & city suggestions */}
          <div className="px-5 mt-4">
            <div className="relative">
              <div className="flex items-center w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-full overflow-hidden focus-within:border-blue-500/60 transition-colors h-[46px] relative">
                <div className="pl-4 text-blue-500 shrink-0 z-10">
                  <Search size={18} strokeWidth={2} />
                </div>

                {/* Animated Vertical Slider Placeholder (Desktop Equivalent) */}
                {!(vehicleSearchQuery || location) && (
                  <div className="absolute inset-y-0 left-[46px] right-[40px] pointer-events-none overflow-hidden">
                    <div
                      className={`flex flex-col ${isTransitioning
                          ? "transition-transform duration-500 ease-in-out"
                          : ""
                        }`}
                      style={{
                        transform: `translateY(-${placeholderIdx * 46}px)`,
                      }}
                    >
                      {placeholderTexts.map((text, idx) => (
                        <span
                          key={idx}
                          className="flex items-center h-[46px] shrink-0 text-[15px] text-gray-500"
                        >
                          {text}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <input
                  type="text"
                  placeholder=""
                  value={vehicleSearchQuery || location}
                  onChange={(e) => {
                    const val = e.target.value;
                    setVehicleSearchQuery(val);
                    handleLocationChange(e);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleVehicleSearchSubmit(vehicleSearchQuery || location);
                    }
                  }}
                  onFocus={() => {
                    loadSearchSuggestions();
                    if (locationSuggestions.length === 0) fetchPopularCities();
                  }}
                  className="flex-1 w-full h-full bg-transparent border-none outline-none text-white px-3 text-[15px] placeholder-transparent z-10 relative"
                />
                {(vehicleSearchQuery || location) && (
                  <button
                    onClick={() => {
                      setVehicleSearchQuery("");
                      setLocation("");
                      setCityId(null);
                      setStateId(null);
                      fetchPopularCities();
                    }}
                    className="pr-4 text-gray-500 hover:text-white transition-colors cursor-pointer shrink-0 z-10 relative"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Combined Suggestions dropdown (Vehicles, Brands, Models, Consultants, Cities) */}
              {((vehicleSearchQuery.trim() &&
                filteredVehicleSuggestions.length > 0) ||
                (location.trim() && locationSuggestions.length > 0)) && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#161616] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-[60] max-h-64 overflow-y-auto custom-scrollbar">
                    {/* Vehicle / Brand / Model / Consultant Suggestions */}
                    {filteredVehicleSuggestions.map((item, idx) => (
                      <button
                        key={item.id || `veh-${idx}`}
                        onClick={() => handleSelectVehicleSuggestion(item)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 text-left border-b border-neutral-800/40 last:border-none transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {item.type === "consultant" ? (
                            <User
                              size={16}
                              className="text-purple-400 shrink-0"
                            />
                          ) : item.type === "brand" ? (
                            <Car size={16} className="text-blue-400 shrink-0" />
                          ) : (
                            <Tag size={16} className="text-gray-400 shrink-0" />
                          )}
                          <span className="text-sm font-semibold text-white truncate">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-gray-400 shrink-0 ml-2">
                          {item.type || "search"}
                        </span>
                      </button>
                    ))}

                    {/* City / State Suggestions */}
                    {locationSuggestions.slice(0, 5).map((item, idx) => (
                      <button
                        key={
                          item.isStateOnly
                            ? `state-${item.stateId}-${idx}`
                            : `city-${item.cityId}-${idx}`
                        }
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
                          setVehicleSearchQuery("");
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 text-left border-b border-neutral-800/40 last:border-none transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <MapPin
                            size={16}
                            className="text-emerald-400 shrink-0"
                          />
                          <span className="text-sm font-semibold text-white truncate">
                            {item.isStateOnly ? item.stateName : item.cityName}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 shrink-0">
                          {item.isStateOnly ? "State" : item.stateName}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
            </div>
          </div>

          {/* Recent Searches */}
          <div className="px-5 mt-5">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-sm font-semibold text-white/90">
                Recent Searches
              </span>
              {displayRecentSearches.length > 0 && (
                <button
                  onClick={() => {
                    clearSearchesMutation.mutate();
                    setLocalRecentSearches([]);
                  }}
                  className="text-xs text-blue-500 hover:underline font-semibold cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
              {displayRecentSearches.length === 0 ? (
                <span className="text-xs text-gray-400 py-1">
                  No recent searches
                </span>
              ) : (
                displayRecentSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleVehicleSearchSubmit(term)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1A1A1A] hover:bg-[#252525] border border-neutral-800 rounded-full text-xs text-gray-300 font-medium shrink-0 cursor-pointer transition-colors"
                  >
                    <span className="text-gray-500">🕒</span>
                    {term}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Popular Brands */}
          <div className="px-5 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-fourth" />
              <span className="text-sm font-semibold text-white/90">
                Popular Brands
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {apiBrandsList.slice(0, 6).map((brand, idx) => (
                <button
                  key={`popular-${idx}`}
                  onClick={() => {
                    saveSearchMutation.mutate(brand.makeName);
                    setLocalRecentSearches((prev) => {
                      const filtered = prev.filter(
                        (term) =>
                          term.toLowerCase() !== brand.makeName.toLowerCase(),
                      );
                      return [brand.makeName, ...filtered].slice(0, 5);
                    });
                    setMobileOpen(false);
                    setActiveTab(null);
                    setVehicleSearchQuery("");
                    push(
                      `/search?brand=${encodeURIComponent(brand.makeName)}`,
                    );
                  }}
                  className="flex flex-col items-center justify-center gap-1.5 p-2 bg-[#161616] hover:bg-[#202020] border border-neutral-800/80 rounded-xl cursor-pointer transition-all group text-center"
                >
                  {brand.logo ? (
                    <div className="h-8 w-11 flex items-center justify-center p-0.5 bg-white rounded-lg">
                      <img
                        src={brand.logo}
                        alt={brand.makeDisplay}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                  ) : (
                    <div className="h-8 w-11 flex items-center justify-center bg-neutral-900 rounded-lg text-gray-400">
                      <Car className="w-4 h-4" />
                    </div>
                  )}
                  <span className="text-[10px] font-bold text-gray-300 text-center leading-tight transition-colors truncate w-full">
                    {brand.makeDisplay || brand.makeName}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="px-5 mt-5">
            <label className="block text-sm font-semibold text-white/90 mb-2">
              Location
            </label>
            <CustomSelect
              value={currentLocationValue}
              options={locationOptions}
              placeholder="Search destinations"
              variant="transparent"
              onSearch={(val) => {
                if (searchTimerRef.current)
                  clearTimeout(searchTimerRef.current);
                searchTimerRef.current = setTimeout(
                  () => searchCities(val),
                  350,
                );
              }}
              onChange={handleLocationSelect}
            />
          </div>

          {/* Vehicle Type */}
          <div className="px-5 mt-5">
            <label className="block text-sm font-semibold text-white/90 mb-3">
              Vehicle Type
            </label>
            <div className="grid grid-cols-2 gap-3.5">
              {/* 2 Wheeler Card */}
              <button
                type="button"
                onClick={() => {
                  setVehicleType("2 Wheeler");
                  setVehicleTypeError(false);
                  setFuelType("");
                  setBodyType("");
                }}
                className={`relative flex flex-col items-start p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 ${vehicleType === "2 Wheeler"
                    ? "border-blue-500 bg-blue-500/10 text-white"
                    : "border-neutral-800 bg-[#161616] text-gray-400 hover:text-white"
                  }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`p-2 rounded-xl flex items-center justify-center ${vehicleType === "2 Wheeler" ? "bg-blue-500/20 text-blue-500" : "bg-neutral-800 text-gray-400"}`}
                  >
                    <Bike className="w-5 h-5" />
                  </div>
                  <span
                    className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors ${vehicleType === "2 Wheeler"
                        ? "border-blue-500 bg-blue-500"
                        : "border-neutral-700"
                      }`}
                  >
                    {vehicleType === "2 Wheeler" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </span>
                </div>
                <span className="text-[15px] font-bold mt-4 leading-tight">
                  2 Wheeler
                </span>
                <span className="text-[11px] text-gray-500 mt-1">
                  Bike • Scooter
                </span>
              </button>

              {/* 4 Wheeler Card */}
              <button
                type="button"
                onClick={() => {
                  setVehicleType("4 Wheeler");
                  setVehicleTypeError(false);
                  setFuelType("");
                  setBodyType("");
                }}
                className={`relative flex flex-col items-start p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 ${vehicleType === "4 Wheeler"
                    ? "border-blue-500 bg-blue-500/10 text-white"
                    : "border-neutral-800 bg-[#161616] text-gray-400 hover:text-white"
                  }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`p-2 rounded-xl flex items-center justify-center ${vehicleType === "4 Wheeler" ? "bg-blue-500/20 text-blue-500" : "bg-neutral-800 text-gray-400"}`}
                  >
                    <Car className="w-5 h-5" />
                  </div>
                  <span
                    className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors ${vehicleType === "4 Wheeler"
                        ? "border-blue-500 bg-blue-500"
                        : "border-neutral-700"
                      }`}
                  >
                    {vehicleType === "4 Wheeler" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </span>
                </div>
                <span className="text-[15px] font-bold mt-4 leading-tight">
                  4 Wheeler
                </span>
                <span className="text-[11px] text-gray-500 mt-1">
                  Cars • SUVs • EV
                </span>
              </button>
            </div>
            {vehicleTypeError && (
              <span className="text-xs text-red-500 font-medium mt-1.5 block">
                * Please select a vehicle type
              </span>
            )}
          </div>

          {/* CONDITIONAL SECTIONS */}
          {internalActiveType === "consult" ? (
            <>
              {/* Consultant Price Range */}
              <div className="px-5 mt-5">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-white/90">
                    Price Range
                  </label>
                  <div className="flex gap-1.5 text-xs font-bold text-white bg-[#1A1A1A] border border-neutral-800 px-2.5 py-1 rounded-lg">
                    <span>₹{(consultMinPrice / 100000).toFixed(1)} L</span>
                    <span className="text-gray-500">-</span>
                    <span>₹{(consultMaxPrice / 100000).toFixed(1)} L</span>
                  </div>
                </div>

                <div className="p-4 bg-[#161616] border border-neutral-800/80 rounded-2xl">
                  <div className="relative h-6 flex items-center mt-1">
                    <div
                      className="absolute w-full h-1.5 rounded-full"
                      style={{ background: getConsultTrackBackground() }}
                    />
                    <input
                      type="range"
                      min={MIN}
                      max={MAX}
                      step={50000}
                      value={consultMinPrice}
                      onChange={(e) =>
                        setConsultMinPrice(
                          Math.min(+e.target.value, consultMaxPrice - 50000),
                        )
                      }
                      className="dual-range z-30"
                    />
                    <input
                      type="range"
                      min={MIN}
                      max={MAX}
                      step={50000}
                      value={consultMaxPrice}
                      onChange={(e) =>
                        setConsultMaxPrice(
                          Math.max(+e.target.value, consultMinPrice + 50000),
                        )
                      }
                      className="dual-range z-40"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500 font-semibold mt-1">
                    <span>₹{(MIN / 100000).toFixed(1)}L</span>
                    <span>₹{(MAX / 100000).toFixed(1)}L</span>
                  </div>
                </div>
              </div>

              {/* Service */}
              <div className="px-5 mt-5">
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Service
                </label>
                <CustomSelect
                  value={service}
                  options={serviceOptions}
                  placeholder="Select Service"
                  variant="transparent"
                  onChange={(val) => setService(val)}
                />
              </div>

              {/* Availability */}
              <div className="px-5 mt-5">
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Availability
                </label>
                <CustomSelect
                  value={availability}
                  options={AVAILABILITY_OPTIONS}
                  placeholder="Select Availability"
                  variant="transparent"
                  onChange={(val) => setAvailability(val)}
                />
              </div>
            </>
          ) : (
            <>
              {/* Body Type */}
              <div className="px-5 mt-5">
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Body Type
                </label>
                <CustomSelect
                  value={bodyType}
                  options={bodyTypeOptions}
                  placeholder={
                    vehicleType
                      ? "Select Body Type"
                      : "Select vehicle type first"
                  }
                  variant="transparent"
                  disabled={!vehicleType}
                  onChange={(val) => setBodyType(val)}
                />
              </div>

              {/* Fuel Type */}
              <div className="px-5 mt-5">
                <label className="block text-sm font-semibold text-white/90 mb-3">
                  Fuel Type
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  {availableFuelTypes.map((fuel) => {
                    const isSelected = fuelType === fuel;
                    let Icon = Fuel;
                    if (fuel.toLowerCase() === "electric") {
                      Icon = Zap;
                    } else if (
                      fuel.toLowerCase() === "cng" ||
                      fuel.toLowerCase() === "lpg"
                    ) {
                      Icon = Flame;
                    } else if (fuel.toLowerCase() === "hybrid") {
                      Icon = Sparkles;
                    }

                    return (
                      <button
                        key={fuel}
                        type="button"
                        onClick={() => {
                          setFuelType(isSelected ? "" : fuel);
                        }}
                        className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border text-center aspect-square cursor-pointer transition-all duration-200 ${isSelected
                            ? "border-blue-500 bg-blue-500/10 text-white"
                            : "border-neutral-800 bg-[#161616] text-gray-400 hover:text-white"
                          }`}
                      >
                        <div
                          className={`p-2 rounded-xl flex items-center justify-center mb-1.5 ${isSelected ? "bg-blue-500/20 text-blue-500" : "bg-neutral-900 border border-neutral-800 text-gray-400"}`}
                        >
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <span className="text-[10px] font-bold mt-1 leading-tight text-gray-300">
                          {fuel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brand */}
              <div className="px-5 mt-5">
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Brand
                </label>
                <CustomSelect
                  value={brand}
                  options={brandOptionsList}
                  placeholder="Select Brand"
                  variant="transparent"
                  onChange={(val) => {
                    const b = brandOptions.find((opt) => opt.makeName === val);
                    setBrand(val);
                    setMakerId(b ? b.makeId : null);
                  }}
                />
              </div>

              {/* Budget */}
              <div className="px-5 mt-5">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-white/90">
                    Budget
                  </label>
                  <div className="flex gap-1.5 text-xs font-bold text-white bg-[#1A1A1A] border border-neutral-800 px-2.5 py-1 rounded-lg">
                    <span>₹{(minPrice / 100000).toFixed(1)} L</span>
                    <span className="text-gray-500">-</span>
                    <span>₹{(maxPrice / 100000).toFixed(1)} L</span>
                  </div>
                </div>

                <div className="p-4 bg-[#161616] border border-neutral-800/80 rounded-2xl">
                  <div className="relative h-6 flex items-center mt-1">
                    <div
                      className="absolute w-full h-1.5 rounded-full"
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
                  <div className="flex justify-between text-[10px] text-gray-500 font-semibold mt-1">
                    <span>₹{(MIN / 100000).toFixed(1)}L</span>
                    <span>₹{(MAX / 100000).toFixed(1)}L</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Bottom Actions */}
          <div className="px-5 py-6 mt-6 border-t border-neutral-900 flex gap-3.5">
            <button
              onClick={() => {
                setVehicleType("");
                setFuelType("");
                setBodyType("");
                setBrand("");
                setLocation("");
                setBudget("");
                setPriceRange("");
                setMinPrice(50000);
                setMaxPrice(2000000);
                setConsultMinPrice(50000);
                setConsultMaxPrice(2000000);
                setService("");
                setAvailability("");
              }}
              className="flex-1 py-3.5 border border-neutral-800 hover:bg-[#1A1A1A] rounded-full text-sm font-bold text-white transition-colors cursor-pointer flex items-center justify-center"
            >
              Reset All
            </button>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="flex-[2] bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold text-sm py-3.5 rounded-full flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
            >
              {isSearching ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Searching...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Search Vehicles
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
