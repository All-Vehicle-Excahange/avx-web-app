"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  X,
  Flame,
  Clock,
  History,
  TrendingUp,
  ChevronRight,
  CarFront,
  Car,
  User,
  Tag,
  MapPin,
  Fuel,
  Zap,
  Star,
  Sparkles,
  Bike,
  Users,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  saveRecentSearch,
  getRecentSearches,
  deleteAllRecentSearches,
  deleteRecentSearchById,
  getHomeFeedConsult,
} from "@/services/user.service";
import { getAndSearchMakers } from "@/services/filter";
import { GlobalSearchService } from "@/services/globalSearch.service";
import { getTopPicsQuery } from "@/queries/user.queries";
import { useLocationStore } from "@/stores/useLocationStore";
import { resolveVehicleImageSrc, VEHICLE_IMAGE_FALLBACK } from "@/lib/vehicleImage";
import { generateVehicleUrl } from "@/lib/helper";
import useEscapeKey from "@/hooks/useEscapeKey";
import { event as metaEvent } from "@/lib/fpixel";
import { trackSearchResults } from "@/lib/gtag";
import { trackSearchSubmitted } from "@/lib/amplitude";
import { MAKER_NAME_MAPPING } from "@/data/makers";
import { resolveSearchSlugRedirect } from "@/lib/searchLandingSeo";
import { useUIStore } from "@/stores/useUIStore";

const TWO_WHEELER_MAKERS = {
  15005: "Bajaj",
  15010: "Hero",
  15017: "OLA",
  15019: "Royal Enfield",
  15021: "TVS",
  15024: "Yamaha",
};

const ALL_MAKERS = { ...MAKER_NAME_MAPPING, ...TWO_WHEELER_MAKERS };

const MODEL_CANONICAL_SLUGS = {
  swift: "maruti-suzuki-swift",
  baleno: "maruti-suzuki-baleno",
  brezza: "maruti-suzuki-brezza",
  creta: "hyundai-creta",
  venue: "hyundai-venue",
  i20: "hyundai-i20",
  city: "honda-city",
  amaze: "honda-amaze",
  nexon: "tata-nexon",
  punch: "tata-punch",
  harrier: "tata-harrier",
  thar: "mahindra-thar",
  scorpio: "mahindra-scorpio",
  xuv700: "mahindra-xuv700",
  innova: "toyota-innova",
  fortuner: "toyota-fortuner",
  seltos: "kia-seltos",
  sonet: "kia-sonet",
};

const KNOWN_CITIES = [
  "Ahmedabad", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
  "Pune", "Jaipur", "Surat", "Rajkot", "Vadodara", "Palanpur", "Lucknow", "Indore",
  "Chandigarh", "Gandhinagar", "Visnagar", "Kanodar", "Siddhpur", "Mehsana",
  "Chhota Udepur", "Nashik", "Bhopal", "Patna", "Ludhiana", "Nagpur", "Coimbatore",
  "Latur", "Hansi", "Agra",
];


export const formatSearchBadge = (badge, isConsultant = false) => {
  if (!badge && !isConsultant) return null;
  const raw = String(badge || (isConsultant ? "CONSULTANT" : "")).trim();
  const upper = raw.toUpperCase();
  if (!upper || upper === "NOT_INSPECTED") return null;
  if (upper === "SELF_INSPECTED") return "Self Inspected";
  if (upper === "AVX_INSPECTED") return "Reecomm Inspected";
  if (upper === "CONSULTANT") return "Consultant";
  if (upper === "PREMIUM") return "Premium";
  if (upper === "PRO") return "Pro";
  if (upper === "BASIC") return "Basic";
  return raw
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const formatSearchSubtitle = (subtitle) => {
  if (!subtitle) return "";
  return String(subtitle)
    .split("•")
    .map((segment) => {
      const trimmed = segment.trim();
      const upper = trimmed.toUpperCase();
      if (upper === "PETROL_PLUS_CNG" || upper === "PETROL_CNG") return "Petrol + CNG";
      if (upper === "PETROL_PLUS_LPG" || upper === "PETROL_LPG") return "Petrol + LPG";
      if (upper === "DIESEL_PLUS_CNG") return "Diesel + CNG";
      if (upper === "CNG") return "CNG";
      if (upper === "LPG") return "LPG";
      if (upper === "EV" || upper === "ELECTRIC") return "Electric";
      if (upper === "PETROL") return "Petrol";
      if (upper === "DIESEL") return "Diesel";
      if (upper.includes("_")) {
        return trimmed
          .split("_")
          .map((w) => {
            const wUpper = w.toUpperCase();
            if (wUpper === "CNG" || wUpper === "LPG") return wUpper;
            if (wUpper === "PLUS") return "+";
            return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
          })
          .join(" ")
          .replace(/\s*\+\s*/g, " + ");
      }
      return trimmed;
    })
    .join(" • ");
};

const ORIGINAL_PLACEHOLDER_TEXTS = [
  "Search for brands...",
  "Search for consultants...",
  "Search for vehicles...",
  "Search by budget...",
];

const PLACEHOLDER_TEXTS = [
  ...ORIGINAL_PLACEHOLDER_TEXTS,
  ORIGINAL_PLACEHOLDER_TEXTS[0],
];

// Global caches to prevent multiple API calls across component re-mounts
let globalSuggestionsData = [];
let globalApiBrandsList = [];
let isGlobalSuggestionsLoaded = false;
let globalLoadPromise = null;

const trackMetaProductSearch = (searchString) => {
  const query = String(searchString || "").trim() || "vehicle_search";
  metaEvent("Search", { search_string: query });
  trackSearchResults({
    search_string: query,
    search_type: "navbar",
  });
  trackSearchSubmitted({
    search_string: query,
    source: "navbar",
  });
};

export default function NavbarSearch({ heroMode = false, scrolled = false }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isSearchDropdownOpen, setIsSearchDropdownOpen } = useUIStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [suggestionsData, setSuggestionsData] = useState([]);
  const [apiBrandsList, setApiBrandsList] = useState([]);
  const [isSuggestionsLoaded, setIsSuggestionsLoaded] = useState(isGlobalSuggestionsLoaded);

  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  // ── Debounce typing query by 300ms ──
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // ── Animated Vertical Carousel Placeholder ──
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => {
        const next = prev + 1;
        setIsTransitioning(true);
        if (next === ORIGINAL_PLACEHOLDER_TEXTS.length) {
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

  // ── Preload Suggestions JSON & Brands ──
  const loadSuggestions = useCallback(async () => {
    if (isSuggestionsLoaded || isGlobalSuggestionsLoaded) {
      if (suggestionsData.length === 0 && globalSuggestionsData.length > 0) {
        setSuggestionsData(globalSuggestionsData);
      }
      if (apiBrandsList.length === 0 && globalApiBrandsList.length > 0) {
        setApiBrandsList(globalApiBrandsList);
      }
      setIsSuggestionsLoaded(true);
      return;
    }

    if (globalLoadPromise) {
      await globalLoadPromise;
      if (isGlobalSuggestionsLoaded) {
        setSuggestionsData(globalSuggestionsData);
        setApiBrandsList(globalApiBrandsList);
        setIsSuggestionsLoaded(true);
      }
      return;
    }

    globalLoadPromise = (async () => {
      try {
        const data = await import("@/data/searchSuggestions.json");
        const rawSuggestions = data.default || data;
        const loadedSuggestions = (Array.isArray(rawSuggestions) ? rawSuggestions : [])
          .filter((s) => s.type === "brand" || s.type === "model" || s.type === "popular")
          .map((s) => {
            const rawLabel = s.label || "";
            let formattedLabel = rawLabel;
            if (!formattedLabel.toLowerCase().startsWith("used")) {
              formattedLabel = `Used ${formattedLabel}`;
            }
            if (s.type === "brand" && !formattedLabel.toLowerCase().includes("car")) {
              formattedLabel = `${formattedLabel} Cars`;
            }
            return {
              ...s,
              rawLabel,
              label: formattedLabel,
            };
          });

        globalSuggestionsData = loadedSuggestions;

        // Fetch brands from API for logos
        try {
          const makersRes = await getAndSearchMakers({ page: 1, limit: 100 });
          if (makersRes?.data && Array.isArray(makersRes.data)) {
            const sortedMakers = makersRes.data.sort((a, b) =>
              (a.makeDisplay || a.makeName || "").localeCompare(a.makeDisplay || a.makeName || "")
            );
            globalApiBrandsList = sortedMakers;
          }
        } catch (err) {
          console.error("Failed to load makers API", err);
        }

        isGlobalSuggestionsLoaded = true;
      } catch (e) {
        console.error("Failed to load search suggestions", e);
      }
    })();

    await globalLoadPromise;
    if (isGlobalSuggestionsLoaded) {
      setSuggestionsData(globalSuggestionsData);
      setApiBrandsList(globalApiBrandsList);
      setIsSuggestionsLoaded(true);
    }
  }, [isSuggestionsLoaded, suggestionsData.length, apiBrandsList.length]);

  // Preload gracefully in the background after initial paint
  useEffect(() => {
    const timer = setTimeout(() => {
      loadSuggestions();
    }, 1500);
    return () => clearTimeout(timer);
  }, [loadSuggestions]);

  // ── Recent Searches ──
  const { data: recentSearchesData, isLoading: isRecentLoading } = useQuery({
    queryKey: ["recentSearches"],
    queryFn: getRecentSearches,
    enabled: showDropdown,
    retry: false,
  });
  const recentSearches = Array.isArray(recentSearchesData?.data) ? recentSearchesData.data : [];

  const saveSearchMutation = useMutation({
    mutationFn: saveRecentSearch,
    onMutate: async (searchStr) => {
      const clean = String(searchStr || "")
        .replace(/\//g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (!clean) return;

      await queryClient.cancelQueries({ queryKey: ["recentSearches"] });
      const previousSearches = queryClient.getQueryData(["recentSearches"]);

      queryClient.setQueryData(["recentSearches"], (old) => {
        const list = Array.isArray(old?.data) ? old.data : Array.isArray(old) ? old : [];
        const filtered = list.filter(
          (item) => (item.search || "").toLowerCase().trim() !== clean.toLowerCase()
        );
        const updated = [{ id: `temp-${Date.now()}`, search: clean }, ...filtered].slice(0, 10);
        return Array.isArray(old?.data) ? { ...old, data: updated } : updated;
      });

      return { previousSearches };
    },
    onError: (err, newSearch, context) => {
      if (context?.previousSearches) {
        queryClient.setQueryData(["recentSearches"], context.previousSearches);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["recentSearches"] });
    },
  });

  const clearSearchesMutation = useMutation({
    mutationFn: deleteAllRecentSearches,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recentSearches"] });
    },
  });

  const deleteSingleSearchMutation = useMutation({
    mutationFn: deleteRecentSearchById,
    onMutate: async (idToDelete) => {
      await queryClient.cancelQueries({ queryKey: ["recentSearches"] });
      const previousSearches = queryClient.getQueryData(["recentSearches"]);
      queryClient.setQueryData(["recentSearches"], (old) => {
        if (!old) return old;
        const list = Array.isArray(old?.data) ? old.data : Array.isArray(old) ? old : [];
        const filtered = list.filter((item) => item.id !== idToDelete);
        return Array.isArray(old?.data) ? { ...old, data: filtered } : filtered;
      });
      return { previousSearches };
    },
    onError: (err, idToDelete, context) => {
      if (context?.previousSearches) {
        queryClient.setQueryData(["recentSearches"], context.previousSearches);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["recentSearches"] });
    },
  });

  // ── REAL-TIME BACKEND SUGGEST API QUERY (per Contract) ──
  const {
    data: apiSuggestResponse,
    isLoading: isSuggestLoading,
    isFetching: isSuggestFetching,
  } = useQuery({
    queryKey: ["global-search-suggest", debouncedQuery],
    queryFn: () => GlobalSearchService.suggest(debouncedQuery),
    enabled: Boolean(debouncedQuery && debouncedQuery.length >= 2),
    staleTime: 1000 * 60 * 2,
  });

  // ── HomeFeed Consultants Query (Dynamically recognize real active consultants from API) ──
  const { data: homeConsultantsData, isLoading: isHomeConsultantsLoading } = useQuery({
    queryKey: ["homeFeedConsultantsNavbar"],
    queryFn: () => getHomeFeedConsult({ pageNo: 1, size: 100 }),
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

  // ── Top Picks: Cars & Bikes Queries (reusing homepage query & cache) ──
  const { cityId, stateId } = useLocationStore();
  const topPicsPayload = useMemo(
    () => ({
      pageNo: 1,
      size: 4,
      ...(cityId ? { cityId } : {}),
      ...(stateId ? { stateId } : {}),
    }),
    [cityId, stateId]
  );

  const { data: topCarsData = [], isLoading: isTopCarsLoading } = useQuery(
    getTopPicsQuery("4-Wheeler", topPicsPayload)
  );

  const { data: topBikesData = [], isLoading: isTopBikesLoading } = useQuery(
    getTopPicsQuery("2-Wheeler", topPicsPayload)
  );

  const topCars = useMemo(() => {
    return Array.isArray(topCarsData) ? topCarsData : [];
  }, [topCarsData]);

  const topBikes = useMemo(() => {
    return Array.isArray(topBikesData) ? topBikesData : [];
  }, [topBikesData]);

  const topConsultants = useMemo(() => {
    const list = Array.isArray(homeConsultantsData?.data)
      ? homeConsultantsData.data
      : Array.isArray(homeConsultantsData)
        ? homeConsultantsData
        : [];
    return list.slice(0, 4);
  }, [homeConsultantsData]);

  const [knownConsultants, setKnownConsultants] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("avx_known_consultants");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const saveKnownConsultant = useCallback((consultant) => {
    if (!consultant || (!consultant.title && !consultant.name)) return;
    const title = consultant.title || consultant.name;
    setKnownConsultants((prev) => {
      const exists = prev.some(
        (c) =>
          (c.title || "").toLowerCase().trim() === title.toLowerCase().trim() ||
          (c.username && consultant.username && c.username.toLowerCase() === consultant.username.toLowerCase())
      );
      if (exists) return prev;
      const updated = [{ ...consultant, title }, ...prev].slice(0, 100);
      try {
        localStorage.setItem("avx_known_consultants", JSON.stringify(updated));
      } catch { }
      return updated;
    });
  }, []);

  // Register consultants discovered in real-time Suggest API
  useEffect(() => {
    const apiSections =
      apiSuggestResponse?.sections || apiSuggestResponse?.data?.sections;
    if (Array.isArray(apiSections)) {
      apiSections.forEach((sec) => {
        const isConsultSec =
          sec.icon === "CONSULTATION" ||
          sec.sectionTitle?.toLowerCase().includes("consult");
        (sec.items || []).forEach((item) => {
          if (item.type === "CONSULTATION" || isConsultSec) {
            saveKnownConsultant({
              id: item.id,
              title: item.title,
              username:
                item.username ||
                item.consultantUsername ||
                (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]/g, "") : ""),
              badge: item.badge || "CONSULTANT",
              type: "CONSULTATION",
            });
          }
        });
      });
    }
  }, [apiSuggestResponse, saveKnownConsultant]);

  // Helper to find consultant details (badge, username, id) by search term
  const findConsultant = useCallback(
    (searchTerm) => {
      if (!searchTerm) return null;
      const clean = searchTerm.toLowerCase().trim();
      const cleanNoSpaces = clean.replace(/[^a-z0-9]/g, "");

      // 1. Check knownConsultants registry (from Suggest API & user clicks)
      const fromKnown = knownConsultants.find((c) => {
        const cTitle = (c.title || c.label || "").toLowerCase().trim();
        const cUser = (c.username || "").toLowerCase().trim();
        const cUserClean = cUser.replace(/\d+$/, "");
        return (
          cTitle === clean ||
          cUser === clean ||
          cUserClean === clean ||
          cTitle.replace(/[^a-z0-9]/g, "") === cleanNoSpaces
        );
      });
      if (fromKnown) return fromKnown;

      // 2. Check real-time homeFeedConsultants list
      const homeList = Array.isArray(homeConsultantsData?.data)
        ? homeConsultantsData.data
        : [];
      const fromHome = homeList.find((c) => {
        const cName = (c.consultationName || "").toLowerCase().trim();
        const cUser = (c.username || "").toLowerCase().trim();
        const cUserClean = cUser.replace(/\d+$/, "");
        return (
          cName === clean ||
          cUser === clean ||
          cUserClean === clean ||
          cName.replace(/[^a-z0-9]/g, "") === cleanNoSpaces
        );
      });
      if (fromHome) {
        return {
          id: fromHome.id,
          title: fromHome.consultationName?.trim(),
          username: fromHome.username,
          badge: fromHome.badge || fromHome.tierTitle || "CONSULTANT",
          tierTitle: fromHome.tierTitle,
          type: "CONSULTATION",
        };
      }

      return null;
    },
    [knownConsultants, homeConsultantsData]
  );

  // ── JSON Suggestions from searchSuggestions.json ──
  const jsonSuggestions = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return [];

    const rawMatches = suggestionsData.filter((s) => {
      if (s.type !== "brand" && s.type !== "model" && s.type !== "popular") return false;
      const labelMatch = (s.label || "").toLowerCase().includes(query) || (s.rawLabel || "").toLowerCase().includes(query);
      const modelMatch = (s.model || "").toLowerCase().includes(query);
      const brandMatch = (s.brand || "").toLowerCase().includes(query);
      const tokenMatch = Array.isArray(s.searchTokens)
        ? s.searchTokens.some((t) => t.includes(query))
        : false;
      return labelMatch || modelMatch || brandMatch || tokenMatch;
    });

    // Location-based suggestion synthesis if user typed a city
    const cleanNoUsed = query.replace(/\bused\b/g, "").replace(/\bsecond\s*hand\b/g, "").trim();
    const matchedCity = KNOWN_CITIES.find((c) =>
      new RegExp(`\\b${c.toLowerCase()}\\b`, "i").test(cleanNoUsed)
    );

    let synthesized = [];
    if (matchedCity) {
      const citySlug = matchedCity.toLowerCase().replace(/\s+/g, "-");
      const isTwoWheeler = /\b(bike|bikes|two[- ]?wheelers?|motorcycles?|scooters?)\b/i.test(query);
      const vehicleKind = isTwoWheeler ? "two-wheelers" : "cars";
      const vehicleLabel = isTwoWheeler ? "Bikes" : "Cars";

      let matchedBrand = null;
      let brandSlug = "";
      for (const [id, brandName] of Object.entries(ALL_MAKERS)) {
        const bLower = brandName.toLowerCase();
        if (bLower === "maruti suzuki") {
          if (/\bmaruti(?:\s+suzuki)?\b/i.test(cleanNoUsed)) {
            matchedBrand = brandName;
            brandSlug = "maruti-suzuki";
            break;
          }
        } else if (new RegExp(`\\b${bLower}\\b`, "i").test(cleanNoUsed)) {
          matchedBrand = brandName;
          brandSlug = brandName.toLowerCase().replace(/\s+/g, "-");
          break;
        }
      }

      if (matchedBrand) {
        synthesized.push({
          id: `loc_${brandSlug}_${vehicleKind}_${citySlug}`,
          label: `Used ${matchedBrand} ${vehicleLabel} in ${matchedCity}`,
          type: "location",
          link: `/search/buy-used-${brandSlug}-${vehicleKind}-${citySlug}`,
        });
        if (!isTwoWheeler) {
          synthesized.push({
            id: `loc_${brandSlug}_bikes_${citySlug}`,
            label: `Used ${matchedBrand} Bikes in ${matchedCity}`,
            type: "location",
            link: `/search/buy-used-${brandSlug}-two-wheelers-${citySlug}`,
          });
        }
      }

      synthesized.push({
        id: `loc_all_${vehicleKind}_${citySlug}`,
        label: `Used ${vehicleLabel} in ${matchedCity}`,
        type: "location",
        link: `/search/buy-used-${vehicleKind}-${citySlug}`,
      });
    }

    const allMatches = [...rawMatches, ...synthesized];

    // Priority sorting: Brand first, Model second, Location third, Popular fourth
    const typeOrder = { brand: 1, model: 2, location: 3, popular: 4 };
    allMatches.sort((a, b) => (typeOrder[a.type] || 5) - (typeOrder[b.type] || 5));

    // Deduplicate by label
    const seen = new Set();
    const unique = [];
    for (const item of allMatches) {
      const key = (item.label || "").toLowerCase().trim();
      if (key && !seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }

    return unique.slice(0, 20);
  }, [searchQuery, suggestionsData]);

  // ── API Sections from Backend Suggest API ──
  const apiSections = useMemo(() => {
    const sections =
      apiSuggestResponse?.sections || apiSuggestResponse?.data?.sections;
    if (!Array.isArray(sections)) return [];
    return sections.filter(
      (sec) => Array.isArray(sec.items) && sec.items.length > 0
    );
  }, [apiSuggestResponse]);

  const totalApiItemsCount = useMemo(() => {
    return apiSections.reduce((acc, sec) => acc + (sec.items?.length || 0), 0);
  }, [apiSections]);

  const hasApiData = totalApiItemsCount > 0;

  const isSearchingSuggestions =
    Boolean(searchQuery.trim().length >= 2) &&
    (isSuggestLoading ||
      isSuggestFetching ||
      debouncedQuery !== searchQuery.trim());

  const hasSuggestions = jsonSuggestions.length > 0;
  const hasApiOrLoading = hasApiData || isSearchingSuggestions;

  const isTwoColumnLayout = !searchQuery.trim()
    ? true
    : hasSuggestions && hasApiOrLoading;

  // Flattened items for keyboard arrow navigation
  const flatSuggestionItems = useMemo(() => {
    const leftItems = jsonSuggestions.map((item) => ({ ...item, isJson: true }));
    const rightItems = apiSections.flatMap((s) => s.items || []).map((item) => ({ ...item, isApi: true }));
    return [...leftItems, ...rightItems];
  }, [jsonSuggestions, apiSections]);

  const openDropdown = useCallback(() => {
    loadSuggestions();
    setShowDropdown(true);
  }, [loadSuggestions]);

  const closeDropdown = useCallback(() => {
    setShowDropdown(false);
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
    if (
      typeof document !== "undefined" &&
      document.activeElement &&
      typeof document.activeElement.blur === "function"
    ) {
      document.activeElement.blur();
    }
  }, []);

  // Sync state to UI store
  useEffect(() => {
    if (setIsSearchDropdownOpen) {
      setIsSearchDropdownOpen(showDropdown);
    }
    return () => {
      if (setIsSearchDropdownOpen) {
        setIsSearchDropdownOpen(false);
      }
    };
  }, [showDropdown, setIsSearchDropdownOpen]);

  useEscapeKey(showDropdown, closeDropdown);

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  // Prevent background scrolling while dropdown is open
  useEffect(() => {
    if (!showDropdown) return;

    const preventBackgroundScroll = (e) => {
      if (
        searchContainerRef.current &&
        searchContainerRef.current.contains(e.target)
      ) {
        return;
      }
      if (e.cancelable) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener("wheel", preventBackgroundScroll, { passive: false, capture: true });
    window.addEventListener("touchmove", preventBackgroundScroll, { passive: false, capture: true });
    document.addEventListener("wheel", preventBackgroundScroll, { passive: false, capture: true });
    document.addEventListener("touchmove", preventBackgroundScroll, { passive: false, capture: true });

    return () => {
      window.removeEventListener("wheel", preventBackgroundScroll, { capture: true });
      window.removeEventListener("touchmove", preventBackgroundScroll, { capture: true });
      document.removeEventListener("wheel", preventBackgroundScroll, { capture: true });
      document.removeEventListener("touchmove", preventBackgroundScroll, { capture: true });
    };
  }, [showDropdown]);

  // ── CORE CANONICAL SEARCH ROUTER ──
  const executeSearch = (searchTerm) => {
    const queryText = (searchTerm || "").trim();
    if (!queryText) return;

    setIsSearching(true);
    saveSearchMutation.mutate(queryText);
    trackMetaProductSearch(queryText);

    const cleanTerm = queryText.toLowerCase().trim();

    // 1. Consultant Match via API / Known Consultants
    const matchedConsultant = findConsultant(queryText);
    if (matchedConsultant) {
      const targetUsername =
        matchedConsultant.username ||
        (matchedConsultant.title
          ? matchedConsultant.title.toLowerCase().replace(/[^a-z0-9]/g, "")
          : "");
      if (targetUsername) {
        router.push(`/auto-consultant/${targetUsername}`);
        closeDropdown();
        setIsSearching(false);
        return;
      }
    }

    // 2. Check if an existing suggestion directly matches this search term
    if (flatSuggestionItems.length > 0) {
      const directSuggestion = flatSuggestionItems.find((item) => {
        const title = (item.label || item.title || "").toLowerCase();
        return title === cleanTerm || title.includes(cleanTerm) || cleanTerm.includes(title);
      });
      if (directSuggestion?.link) {
        router.push(directSuggestion.link);
        closeDropdown();
        setIsSearching(false);
        return;
      }
    }

    // 3. Location-aware SEO Search Match (e.g. "used honda in palanpur", "cars in ahmedabad")
    const cleanNoUsed = cleanTerm
      .replace(/\bused\b/g, "")
      .replace(/\bsecond\s*hand\b/g, "")
      .trim();

    const matchedCity = KNOWN_CITIES.find((c) =>
      new RegExp(`\\b${c.toLowerCase()}\\b`, "i").test(cleanNoUsed)
    );

    if (matchedCity) {
      const citySlug = matchedCity.toLowerCase().replace(/\s+/g, "-");
      const isTwoWheeler = /\b(bike|bikes|two[- ]?wheelers?|motorcycles?|scooters?)\b/i.test(cleanTerm);
      const vehicleKind = isTwoWheeler ? "two-wheelers" : "cars";

      // Detect Brand
      let detectedBrand = null;
      let brandSlug = "";
      for (const [id, brandName] of Object.entries(ALL_MAKERS)) {
        const bLower = brandName.toLowerCase();
        if (bLower === "maruti suzuki") {
          if (/\bmaruti(?:\s+suzuki)?\b/i.test(cleanNoUsed)) {
            detectedBrand = brandName;
            brandSlug = "maruti-suzuki";
            break;
          }
        } else if (new RegExp(`\\b${bLower}\\b`, "i").test(cleanNoUsed)) {
          detectedBrand = brandName;
          brandSlug = brandName.toLowerCase().replace(/\s+/g, "-");
          break;
        }
      }

      if (detectedBrand) {
        // Detect Model if any
        let detectedModelSlug = "";
        for (const [modelKey, modelCanon] of Object.entries(MODEL_CANONICAL_SLUGS)) {
          if (new RegExp(`\\b${modelKey}\\b`, "i").test(cleanNoUsed)) {
            detectedModelSlug = modelCanon;
            break;
          }
        }

        if (detectedModelSlug) {
          router.push(`/search/buy-used-${detectedModelSlug}-${vehicleKind}-${citySlug}`);
          closeDropdown();
          setIsSearching(false);
          return;
        }

        router.push(`/search/buy-used-${brandSlug}-${vehicleKind}-${citySlug}`);
        closeDropdown();
        setIsSearching(false);
        return;
      }

      // Model without brand (e.g. "creta in palanpur")
      for (const [modelKey, modelCanon] of Object.entries(MODEL_CANONICAL_SLUGS)) {
        if (new RegExp(`\\b${modelKey}\\b`, "i").test(cleanNoUsed)) {
          router.push(`/search/buy-used-${modelCanon}-${vehicleKind}-${citySlug}`);
          closeDropdown();
          setIsSearching(false);
          return;
        }
      }

      // Generic cars/bikes in city (e.g. "used cars in palanpur")
      router.push(`/search/buy-used-${vehicleKind}-${citySlug}`);
      closeDropdown();
      setIsSearching(false);
      return;
    }

    // 2. Known Brand Match & Brand + Model Validation
    for (const [id, brandName] of Object.entries(ALL_MAKERS)) {
      const bLower = brandName.toLowerCase();
      const cleanNoUsed = cleanTerm.replace(/\bused\b/g, "").trim();
      const isMarutiPrefix =
        bLower === "maruti suzuki" &&
        (cleanNoUsed === "maruti" || cleanNoUsed.startsWith("maruti "));
      const isBrandPrefix =
        cleanNoUsed === bLower || cleanNoUsed.startsWith(bLower + " ");

      if (isMarutiPrefix || isBrandPrefix) {
        let remainder = cleanNoUsed;
        if (isMarutiPrefix) {
          remainder = cleanNoUsed.replace(/^(?:maruti\s+suzuki|maruti)\s*/i, "").trim();
        } else {
          remainder = cleanNoUsed.slice(bLower.length).trim();
        }

        const slugBrand = brandName.toLowerCase().replace(/\s+/g, "-");

        if (!remainder) {
          router.push(`/search/buy-used-${slugBrand}-cars`);
          closeDropdown();
          setIsSearching(false);
          return;
        }

        // Check if remainder is a known model (e.g. swift, sonet, baleno, creta)
        const isKnownModel =
          MODEL_CANONICAL_SLUGS[remainder] ||
          (suggestionsData || []).some(
            (s) =>
              (s.type === "model" || s.type === "brand") &&
              (s.label || "").toLowerCase().includes(remainder)
          );

        if (isKnownModel) {
          const modelCanonical = MODEL_CANONICAL_SLUGS[remainder];
          if (modelCanonical) {
            router.push(`/search/buy-used-${modelCanonical}-cars`);
          } else {
            const cleanModelSlug = remainder.replace(/\s+/g, "-");
            router.push(`/search/buy-used-${slugBrand}-${cleanModelSlug}-cars`);
          }
          closeDropdown();
          setIsSearching(false);
          return;
        }

        // Remainder is NOT a known model (e.g. "asfagfweg mewsdng") -> Route cleanly to canonical brand page
        router.push(`/search/buy-used-${slugBrand}-cars`);
        closeDropdown();
        setIsSearching(false);
        return;
      }
    }

    // 3. Known Model Shortcut Match
    if (MODEL_CANONICAL_SLUGS[cleanTerm]) {
      router.push(`/search/buy-used-${MODEL_CANONICAL_SLUGS[cleanTerm]}-cars`);
      closeDropdown();
      setIsSearching(false);
      return;
    }

    // 4. Construct search slug (e.g. "kia sonet" -> "buy-used-kia-sonet-cars")
    const searchSlug = cleanTerm
      .replace(/\bused\b/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const finalSlug = searchSlug
      ? `buy-used-${searchSlug}-cars`.replace(/-+/g, "-")
      : "buy-used-cars";

    const resolvedRedirect = resolveSearchSlugRedirect(finalSlug);
    router.push(`/search/${resolvedRedirect || finalSlug}`);

    closeDropdown();
    setIsSearching(false);
  };

  // ── Handle Click on a Suggestion Item ──
  const handleItemClick = (item) => {
    if (!item) return;
    const titleOrLabel = item.label || item.title || "";
    saveSearchMutation.mutate(titleOrLabel);
    trackMetaProductSearch(titleOrLabel);

    const isConsultant =
      item.type === "CONSULTATION" || item.type === "consultant";

    if (isConsultant) {
      const targetUsername =
        item.username ||
        item.consultantUsername ||
        item.consultationUsername ||
        item.userName ||
        (titleOrLabel ? titleOrLabel.toLowerCase().replace(/[^a-z0-9]/g, "") : "");

      saveKnownConsultant({
        id: item.id,
        title: titleOrLabel,
        username: targetUsername,
        badge: item.badge || "CONSULTANT",
        type: "CONSULTATION",
      });

      if (targetUsername) {
        router.push(`/auto-consultant/${targetUsername}`);
      } else if (item.link) {
        router.push(item.link);
      } else {
        router.push(`/search?consultant=${encodeURIComponent(titleOrLabel)}`);
      }
      closeDropdown();
      return;
    }

    if (item.link) {
      router.push(item.link);
    } else if (item.type === "VEHICLE" && item.id) {
      router.push(`/vehicle/details/${item.id}`);
    } else {
      executeSearch(titleOrLabel);
    }
    closeDropdown();
  };

  // ── Handle Click on Brand from Mega Menu ──
  const handleBrandClick = (brandName) => {
    if (!brandName) return;
    const cleanBrand = String(brandName).trim();
    saveSearchMutation.mutate(cleanBrand);
    trackMetaProductSearch(cleanBrand);
    const slugBrand = cleanBrand.toLowerCase().replace(/\s+/g, "-");
    router.push(`/search/buy-used-${slugBrand}-cars`);
    closeDropdown();
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < flatSuggestionItems.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && flatSuggestionItems[selectedIndex]) {
        handleItemClick(flatSuggestionItems[selectedIndex]);
      } else if (searchQuery.trim()) {
        executeSearch(searchQuery);
      }
    } else if (e.key === "Escape") {
      closeDropdown();
    }
  };

  // Popular brands selection for 6-grid (matching old Navbar)
  const popularBrands = useMemo(() => {
    const popularNames = ["maruti", "hyundai", "tata", "mahindra", "toyota", "honda"];
    const matched = apiBrandsList.filter((b) => {
      const makeName = b.makeName?.toLowerCase() || "";
      if (makeName === "mahindra renault") return false;
      return popularNames.some((name) => makeName.includes(name));
    });
    return matched.length > 0 ? matched.slice(0, 6) : apiBrandsList.slice(0, 6);
  }, [apiBrandsList]);

  // ── Render Suggestions Column Content ──
  const renderSuggestionsContent = () => (
    <div className="flex flex-col w-full h-full bg-white overscroll-contain">
      {/* Header */}
      <div className="p-4 pb-3 border-b border-gray-100/80 bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-fourth font-bold">
          <Search className="w-4 h-4 text-fourth" />
          <span className="text-[12px] uppercase tracking-wider">
            Suggestions
          </span>
        </div>
        {jsonSuggestions.length > 0 && (
          <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {jsonSuggestions.length}
          </span>
        )}
      </div>

      {/* Suggestions List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-3 space-y-1 overscroll-contain">
        {jsonSuggestions.length > 0 ? (
          jsonSuggestions.map((item, idx) => {
            const isSelected =
              selectedIndex >= 0 &&
              (flatSuggestionItems[selectedIndex]?.id === item.id ||
                flatSuggestionItems[selectedIndex]?.label === item.label);

            return (
              <div
                key={item.id || `json-sug-${idx}`}
                onClick={() => handleItemClick(item)}
                className={`group flex items-center justify-between py-2 px-3 rounded-xl cursor-pointer transition-colors border-b border-gray-50/80 ${isSelected ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors">
                    {item.type === "brand" ? (
                      <CarFront className="w-4 h-4" />
                    ) : item.type === "model" ? (
                      <Car className="w-4 h-4" />
                    ) : item.type === "location" ? (
                      <MapPin className="w-4 h-4" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[13px] font-semibold text-gray-900 truncate">
                      {item.label}
                    </span>
                    {item.type && (
                      <span className="text-[10px] text-gray-400 capitalize">
                        {item.type === "brand"
                          ? "Brand"
                          : item.type === "model"
                            ? "Model"
                            : item.type === "location"
                              ? "Location"
                              : "Popular Search"}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-2 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center text-gray-400">
            <Search className="w-7 h-7 mx-auto mb-2 opacity-30 text-gray-400" />
            <p className="text-[12px] font-medium text-gray-500">
              No suggestions found
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Try another keyword
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // ── Render API Live Results Column Content ──
  const renderApiResultsContent = () => (
    <div className="flex flex-col w-full h-full bg-white overscroll-contain">
      {/* Header */}
      <div className="p-4 pb-3 border-b border-gray-100/80 bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-fourth font-bold">
          <CarFront className="w-4 h-4 text-fourth" />
          <span className="text-[12px] uppercase tracking-wider">
            Vehicles & Live Results
          </span>
        </div>
        {isSearchingSuggestions ? (
          <div className="flex items-center gap-1.5 text-[11px] text-fourth font-medium">
            <div className="w-3 h-3 border-2 border-fourth border-t-transparent rounded-full animate-spin" />
            <span>Searching vehicles...</span>
          </div>
        ) : totalApiItemsCount > 0 ? (
          <span className="text-[11px] font-medium text-gray-400">
            {totalApiItemsCount} {totalApiItemsCount === 1 ? "result" : "results"}
          </span>
        ) : null}
      </div>

      {/* API Results Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-3 overscroll-contain">
        {isSearchingSuggestions && !hasApiData ? (
          /* Loading Skeletons */
          <div className="space-y-3">
            {[...Array(4)].map((_, idx) => (
              <div
                key={`api-skeleton-${idx}`}
                className="flex items-center justify-between p-2.5 rounded-2xl border border-gray-100 bg-white animate-pulse"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0" />
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3.5 bg-gray-200 rounded-full"
                        style={{
                          width: `${55 + (idx % 3) * 15}%`,
                          maxWidth: "200px",
                        }}
                      />
                      {idx === 0 && (
                        <div className="h-3 w-16 bg-fourth/10 rounded-full" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-32 bg-gray-100 rounded-full" />
                      <div className="h-2.5 w-16 bg-gray-200 rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="h-2.5 w-10 bg-gray-100 rounded-full" />
                  <div className="w-3.5 h-3.5 rounded-full bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        ) : apiSections.length > 0 ? (
          /* Render API Sections */
          apiSections.map((sec, secIdx) => (
            <div key={`api-sec-${secIdx}`} className="space-y-2">
              {apiSections.length > 1 && (
                <div className="px-1 py-0.5 flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  {sec.icon === "CONSULTATION" ||
                    sec.sectionTitle?.toLowerCase().includes("consult") ? (
                    <User className="w-3.5 h-3.5 text-fourth" />
                  ) : (
                    <CarFront className="w-3.5 h-3.5 text-fourth" />
                  )}
                  <span>{sec.sectionTitle}</span>
                </div>
              )}

              <div className="space-y-2">
                {sec.items.map((item, itemIdx) => {
                  const isSelected =
                    selectedIndex >= 0 &&
                    flatSuggestionItems[selectedIndex]?.id === item.id;

                  return (
                    <div
                      key={item.id || `api-item-${itemIdx}`}
                      onClick={() => handleItemClick(item)}
                      className={`group flex items-center justify-between p-2.5 rounded-2xl border transition-all cursor-pointer shadow-xs ${isSelected
                        ? "bg-gray-100 border-gray-200 shadow-sm"
                        : "bg-white hover:bg-gray-50/80 border-gray-100 hover:border-gray-200"
                        }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0 flex-1">
                        {item.thumbnailUrl ? (
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-xl border border-gray-100 shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                            {item.type === "CONSULTATION" ? (
                              <User className="w-5 h-5 text-fourth" />
                            ) : (
                              <CarFront className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        )}

                        <div className="flex flex-col min-w-0 flex-1 pr-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-900 text-[13px] transition-colors truncate">
                              {item.title}
                            </span>
                            {formatSearchBadge(
                              item.badge,
                              item.type === "CONSULTATION"
                            ) && (
                                <span className="text-[9.5px] font-semibold text-fourth tracking-wider bg-fourth/10 px-2 py-0.5 rounded-full shrink-0">
                                  {formatSearchBadge(
                                    item.badge,
                                    item.type === "CONSULTATION"
                                  )}
                                </span>
                              )}
                          </div>

                          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5 truncate">
                            {item.subtitle && (
                              <span>
                                {formatSearchSubtitle(item.subtitle)}
                              </span>
                            )}
                            {item.price && (
                              <span className="font-bold text-gray-900">
                                • ₹{Number(item.price).toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 pl-2">
                        <span className="text-[11px] text-gray-400 font-medium group-hover:text-gray-600 transition-colors">
                          {item.type === "CONSULTATION"
                            ? "View Store"
                            : "Explore"}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-600 transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-400">
            <CarFront className="w-9 h-9 mx-auto mb-2 opacity-25 text-gray-400" />
            <p className="text-[13px] font-semibold text-gray-600">
              No vehicles found
            </p>
            <p className="text-[11px] text-gray-400 mt-1 max-w-[260px]">
              Select a search suggestion or press Enter to search
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    /* Exact Search Bar Container as original root element */
    <div
      ref={searchContainerRef}
      className={`relative flex items-center h-[44px] md:h-[46px] w-[340px] lg:w-[440px] xl:w-[530px] 2xl:w-[580px] rounded-full transition-all duration-300 group pointer-events-auto ${heroMode && !scrolled
        ? "bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.3)] text-white"
        : "bg-gray-100 border border-gray-200/80 focus-within:border-gray-300 focus-within:shadow-sm"
        }`}
    >
      {/* Search Input */}
      <div className="flex-1 flex items-center h-full relative pl-2">
        <Search
          className={`w-4 h-4 ml-3 mr-2 shrink-0 ${heroMode && !scrolled ? "text-white/80" : "text-gray-400"
            }`}
        />

        {/* Animated Vertical Slider Placeholder */}
        {!searchQuery && (
          <div className="absolute inset-y-0 left-[44px] right-[40px] pointer-events-none overflow-hidden">
            <div
              className={`flex flex-col ${isTransitioning
                ? "transition-transform duration-500 ease-in-out"
                : ""
                }`}
              style={{
                transform: `translateY(-${placeholderIdx * 46}px)`,
              }}
            >
              {PLACEHOLDER_TEXTS.map((text, idx) => (
                <span
                  key={idx}
                  className={`flex items-center h-[46px] shrink-0 text-[13px] font-medium ${heroMode && !scrolled
                    ? "text-white/70"
                    : "text-gray-400"
                    }`}
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
        )}

        <input
          ref={searchInputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onMouseEnter={loadSuggestions}
          onFocus={openDropdown}
          onKeyDown={handleKeyDown}
          className={`w-full h-full bg-transparent focus:outline-none text-[13px] font-medium z-10 relative cursor-text ${heroMode && !scrolled
            ? "text-white caret-white"
            : "text-gray-800 caret-black [caret-color:#000000]"
            }`}
          placeholder=""
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedIndex(-1);
            }}
            className={`mr-2 p-1.5 rounded-full transition-colors absolute right-0 cursor-pointer z-20 ${heroMode && !scrolled
              ? "text-white/80 hover:text-white hover:bg-white/20"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              }`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Search Button */}
      <div
        onClick={() => {
          if (searchQuery.trim()) {
            executeSearch(searchQuery.trim());
          }
        }}
        className="ml-auto mr-1.5 w-[34px] h-[34px] rounded-full bg-fourth text-white flex items-center justify-center cursor-pointer hover:bg-fourth/90 hover:shadow-md transition-all shrink-0"
      >
        {isSearching ? (
          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Search size={15} />
        )}
      </div>

      {/* Search Mega Menu Dropdown */}
      <div
        className={`absolute top-[120%] left-1/2 -translate-x-1/2 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-gray-100 rounded-3xl overflow-hidden overscroll-contain transition-all duration-300 origin-top ${!searchQuery
          ? "h-auto max-h-[calc(100dvh-85px)] md:max-h-[calc(100vh-115px)]"
          : "h-[480px] max-h-[calc(100dvh-85px)] md:max-h-[calc(100vh-115px)]"
          } ${showDropdown
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
          }`}
        style={{
          width: isTwoColumnLayout ? "1000px" : "560px",
          maxWidth: "95vw",
        }}
      >
        {!searchQuery ? (
          /* Mega Menu Layout for Empty State */
          <div className="flex flex-col md:flex-row w-full h-full max-h-[calc(100dvh-85px)] md:max-h-[calc(100vh-115px)] overflow-y-auto md:overflow-hidden overflow-x-hidden bg-white overscroll-contain">
            {/* Left Side - Popular Brands, Top Cars & Top Bikes */}
            <div className="flex-none md:flex-[1.8] border-b md:border-b-0 md:border-r border-gray-100 flex flex-col md:overflow-hidden shrink-0 overscroll-contain">
              <div className="p-3.5 sm:p-4 flex-1 md:overflow-y-auto scrollbar-hide relative overscroll-contain space-y-3">
                {/* 1. Popular Brands Header */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-fourth font-bold">
                      <Flame className="w-4 h-4 text-fourth" />
                      <span className="text-[12px]">Popular Brands</span>
                    </div>
                  </div>

                  {/* Popular Brands Grid */}
                  <div className="grid grid-cols-6 gap-2">
                    {apiBrandsList.length === 0 ? (
                      [...Array(6)].map((_, idx) => (
                        <div
                          key={`popular-skeleton-${idx}`}
                          className="flex flex-col items-center justify-center gap-1.5 p-1.5 rounded-xl border border-gray-100 bg-gray-50/50 animate-pulse"
                        >
                          <div className="h-8 w-11 rounded-lg bg-gray-200/80" />
                          <div className="h-2 w-9 bg-gray-200/80 rounded-full" />
                        </div>
                      ))
                    ) : (
                      popularBrands.map((brand, idx) => (
                        <div
                          key={`popular-${idx}`}
                          onClick={() => handleBrandClick(brand.makeDisplay || brand.makeName)}
                          className="flex flex-col items-center justify-center gap-1 p-1.5 rounded-xl border border-gray-100 cursor-pointer hover:border-gray-200 hover:bg-gray-50/80 hover:shadow-xs transition-all group bg-white"
                        >
                          {brand.logo ? (
                            <div className="h-8 w-11 flex items-center justify-center">
                              <img
                                src={brand.logo}
                                alt={brand.makeDisplay}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="h-8 w-11 flex items-center justify-center bg-gray-50 rounded text-gray-400">
                              <CarFront className="w-4 h-4" />
                            </div>
                          )}
                          <span className="text-[10px] font-bold text-gray-900 text-center leading-tight transition-colors truncate w-full">
                            {brand.makeDisplay}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* 2. Top Picks — Cars */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-fourth font-bold">
                      <Car className="w-4 h-4 text-fourth" />
                      <span className="text-[12px]">Top Picks — Cars</span>
                    </div>
                    <Link
                      href="/search?vehicleType=FOUR_WHEELER"
                      onClick={() => closeDropdown()}
                      className="text-[11px] font-semibold text-fourth hover:text-fourth/80 flex items-center gap-0.5 cursor-pointer transition-colors"
                    >
                      View All Cars
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* Cars Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {isTopCarsLoading ? (
                      [...Array(4)].map((_, idx) => (
                        <div
                          key={`car-skel-${idx}`}
                          className="flex gap-2 p-2 rounded-xl border border-gray-100 bg-gray-50/50 animate-pulse"
                        >
                          <div className="w-[80px] h-[58px] rounded-lg bg-gray-200/80 shrink-0" />
                          <div className="flex-1 space-y-1.5 py-1">
                            <div className="h-3 w-20 bg-gray-200/80 rounded" />
                            <div className="h-3 w-14 bg-gray-200/80 rounded" />
                            <div className="h-2 w-16 bg-gray-200/60 rounded" />
                          </div>
                        </div>
                      ))
                    ) : topCars.length === 0 ? (
                      <div className="col-span-2 py-3 text-center text-xs text-gray-400">
                        No cars found in top picks
                      </div>
                    ) : (
                      topCars.slice(0, 4).map((vehicle) => {
                        const title =
                          vehicle.title ||
                          `${vehicle.yearOfMfg || vehicle.year || ""} ${vehicle.makerName || vehicle.makeName || ""} ${vehicle.modelName || ""}`.trim() ||
                          "Vehicle";
                        const imageSrc =
                          resolveVehicleImageSrc(vehicle) || VEHICLE_IMAGE_FALLBACK;
                        const formattedPrice = (() => {
                          const p = Number(vehicle.price);
                          if (!p || isNaN(p)) return vehicle.price || "₹-";
                          if (p >= 100000) {
                            return `₹${(p / 100000).toFixed(2).replace(/\.00$/, "")} Lakh`;
                          }
                          return `₹${p.toLocaleString("en-IN")}`;
                        })();

                        const city = (
                          vehicle.address?.city ||
                          vehicle.cityName ||
                          vehicle.city ||
                          vehicle.location ||
                          ""
                        )
                          .split(",")[0]
                          .trim();

                        const keyDetails = [
                          vehicle.yearOfMfg || vehicle.year,
                          vehicle.fuelType || vehicle.fuel,
                          city,
                        ]
                          .filter(Boolean)
                          .join(" • ");

                        return (
                          <div
                            key={`car-${vehicle.id}`}
                            onClick={() => {
                              saveSearchMutation.mutate(title);
                              trackMetaProductSearch(title);
                              const url = generateVehicleUrl(vehicle);
                              router.push(url);
                              closeDropdown();
                            }}
                            className="flex gap-2.5 p-2 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/80 hover:shadow-xs cursor-pointer transition-all group bg-white"
                          >
                            {/* Thumbnail */}
                            <div className="w-[80px] h-[58px] rounded-lg overflow-hidden bg-gray-100 shrink-0 relative">
                              <img
                                src={imageSrc}
                                alt={title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = VEHICLE_IMAGE_FALLBACK;
                                }}
                              />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <h4 className="text-[12px] font-semibold text-gray-900 truncate">
                                {title}
                              </h4>
                              <div className="text-[12px] font-bold text-gray-900 mt-0.5">
                                {formattedPrice}
                              </div>
                              {keyDetails && (
                                <p className="text-[10px] text-gray-500 truncate mt-0.5 flex items-center gap-1">
                                  {keyDetails}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* 3. Top Picks — Bikes */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-fourth font-bold">
                      <Bike className="w-4 h-4 text-fourth" />
                      <span className="text-[12px]">Top Picks — Bikes</span>
                    </div>
                    <Link
                      href="/search?vehicleType=TWO_WHEELER"
                      onClick={() => closeDropdown()}
                      className="text-[11px] font-semibold text-fourth hover:text-fourth/80 flex items-center gap-0.5 cursor-pointer transition-colors"
                    >
                      View All Bikes
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* Bikes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {isTopBikesLoading ? (
                      [...Array(4)].map((_, idx) => (
                        <div
                          key={`bike-skel-${idx}`}
                          className="flex gap-2 p-2 rounded-xl border border-gray-100 bg-gray-50/50 animate-pulse"
                        >
                          <div className="w-[80px] h-[58px] rounded-lg bg-gray-200/80 shrink-0" />
                          <div className="flex-1 space-y-1.5 py-1">
                            <div className="h-3 w-20 bg-gray-200/80 rounded" />
                            <div className="h-3 w-14 bg-gray-200/80 rounded" />
                            <div className="h-2 w-16 bg-gray-200/60 rounded" />
                          </div>
                        </div>
                      ))
                    ) : topBikes.length === 0 ? (
                      <div className="col-span-2 py-3 text-center text-xs text-gray-400">
                        No bikes found in top picks
                      </div>
                    ) : (
                      topBikes.slice(0, 4).map((vehicle) => {
                        const title =
                          vehicle.title ||
                          `${vehicle.yearOfMfg || vehicle.year || ""} ${vehicle.makerName || vehicle.makeName || ""} ${vehicle.modelName || ""}`.trim() ||
                          "Vehicle";
                        const imageSrc =
                          resolveVehicleImageSrc(vehicle) || VEHICLE_IMAGE_FALLBACK;
                        const formattedPrice = (() => {
                          const p = Number(vehicle.price);
                          if (!p || isNaN(p)) return vehicle.price || "₹-";
                          if (p >= 100000) {
                            return `₹${(p / 100000).toFixed(2).replace(/\.00$/, "")} Lakh`;
                          }
                          return `₹${p.toLocaleString("en-IN")}`;
                        })();

                        const city = (
                          vehicle.address?.city ||
                          vehicle.cityName ||
                          vehicle.city ||
                          vehicle.location ||
                          ""
                        )
                          .split(",")[0]
                          .trim();

                        const keyDetails = [
                          vehicle.yearOfMfg || vehicle.year,
                          vehicle.fuelType || vehicle.fuel,
                          city,
                        ]
                          .filter(Boolean)
                          .join(" • ");

                        return (
                          <div
                            key={`bike-${vehicle.id}`}
                            onClick={() => {
                              saveSearchMutation.mutate(title);
                              trackMetaProductSearch(title);
                              const url = generateVehicleUrl(vehicle);
                              router.push(url);
                              closeDropdown();
                            }}
                            className="flex gap-2.5 p-2 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/80 hover:shadow-xs cursor-pointer transition-all group bg-white"
                          >
                            {/* Thumbnail */}
                            <div className="w-[80px] h-[58px] rounded-lg overflow-hidden bg-gray-100 shrink-0 relative">
                              <img
                                src={imageSrc}
                                alt={title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = VEHICLE_IMAGE_FALLBACK;
                                }}
                              />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <h4 className="text-[12px] font-semibold text-gray-900 truncate">
                                {title}
                              </h4>
                              <div className="text-[12px] font-bold text-gray-900 mt-0.5">
                                {formattedPrice}
                              </div>
                              {keyDetails && (
                                <p className="text-[10px] text-gray-500 truncate mt-0.5 flex items-center gap-1">
                                  {keyDetails}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Recent Searches & Top Auto Consultants */}
            <div className="flex-1 flex flex-col md:overflow-y-auto scrollbar-hide relative overscroll-contain">
              <div className="p-3.5 sm:p-4 space-y-4 flex-1">
                {/* 1. Recent Searches */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-fourth font-bold">
                      <History className="w-4 h-4 text-fourth" />
                      <span className="text-[12px]">Recent Searches</span>
                    </div>
                    {recentSearches.length > 0 && (
                      <button
                        onClick={() => clearSearchesMutation.mutate()}
                        className="text-fourth text-[10px] font-semibold hover:text-fourth/80 cursor-pointer"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {recentSearches.slice(0, 6).map((item, idx) => {
                      const consultantInfo = findConsultant(item.search);
                      const isConsultant = Boolean(consultantInfo);
                      const badgeText =
                        consultantInfo?.badge &&
                          consultantInfo.badge !== "NOT_INSPECTED"
                          ? consultantInfo.badge
                          : consultantInfo?.tierTitle
                            ? consultantInfo.tierTitle
                            : "CONSULTANT";

                      return (
                        <div
                          key={item.id || `recent-${idx}`}
                          onClick={() => {
                            if (isConsultant && consultantInfo?.username) {
                              saveSearchMutation.mutate(item.search);
                              trackMetaProductSearch(item.search);
                              router.push(
                                `/auto-consultant/${consultantInfo.username}`
                              );
                              closeDropdown();
                            } else {
                              executeSearch(item.search);
                            }
                          }}
                          className="flex items-center gap-2 p-1.5 hover:bg-gray-50 cursor-pointer rounded-lg transition-all text-[11px] font-semibold text-gray-700 group"
                        >
                          {isConsultant ? (
                            <User className="w-3.5 h-3.5 text-fourth shrink-0" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          )}
                          <span className="flex-1 truncate">
                            {item.search}
                          </span>
                          {isConsultant && formatSearchBadge(badgeText, true) && (
                            <span className="text-[9px] font-semibold text-fourth tracking-wider bg-fourth/10 px-1.5 py-0.5 rounded shrink-0">
                              {formatSearchBadge(badgeText, true)}
                            </span>
                          )}
                          {item.id && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteSingleSearchMutation.mutate(item.id);
                              }}
                              className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-colors shrink-0 cursor-pointer"
                              title="Remove from history"
                              aria-label="Remove recent search"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                    {recentSearches.length === 0 && (
                      <span className="text-[11px] text-gray-400 py-1">
                        No recent searches
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Top Auto Consultants */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-fourth font-bold">
                      <Users className="w-4 h-4 text-fourth" />
                      <span className="text-[12px]">Top Auto Consultants</span>
                    </div>
                    <Link
                      href="/consult/discovery"
                      onClick={() => closeDropdown()}
                      className="text-[11px] font-semibold text-fourth hover:text-fourth/80 flex items-center gap-0.5 cursor-pointer transition-colors"
                    >
                      Explore All Consultants
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {isHomeConsultantsLoading && topConsultants.length === 0 ? (
                      [...Array(3)].map((_, idx) => (
                        <div
                          key={`consultant-skel-${idx}`}
                          className="flex items-center gap-2.5 p-2 rounded-xl border border-gray-100 bg-gray-50/50 animate-pulse"
                        >
                          <div className="w-9 h-9 rounded-full bg-gray-200/80 shrink-0" />
                          <div className="flex-1 space-y-1">
                            <div className="h-3 w-28 bg-gray-200/80 rounded" />
                            <div className="h-2 w-20 bg-gray-200/60 rounded" />
                          </div>
                        </div>
                      ))
                    ) : topConsultants.length === 0 ? (
                      <span className="text-[11px] text-gray-400 py-2 text-center">
                        No consultants found
                      </span>
                    ) : (
                      topConsultants.map((consultant, idx) => {
                        const name =
                          consultant.consultationName ||
                          consultant.name ||
                          "Auto Consultant";
                        const logo =
                          consultant.logoUrl || consultant.logo || "/cs.webp";
                        const city =
                          consultant.address?.city ||
                          consultant.address?.town ||
                          "";
                        const rating =
                          consultant.averageRating ?? consultant.rating ?? 0;
                        const vehicleCount =
                          consultant.availableVehicles ??
                          consultant.vehicleCount ??
                          0;

                        return (
                          <div
                            key={consultant.id || `consultant-${idx}`}
                            onClick={() => {
                              saveKnownConsultant({
                                id: consultant.id,
                                title: name,
                                username: consultant.username,
                                badge:
                                  consultant.tierTitle || "CONSULTANT",
                                type: "CONSULTATION",
                              });
                              saveSearchMutation.mutate(name);
                              trackMetaProductSearch(name);
                              router.push(
                                `/auto-consultant/${consultant.username}`
                              );
                              closeDropdown();
                            }}
                            className="flex items-center gap-2.5 p-2 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/80 cursor-pointer transition-all group bg-white"
                          >
                            {/* Avatar */}
                            <div className="w-9 h-9 rounded-full border border-gray-100 overflow-hidden bg-white shrink-0 flex items-center justify-center shadow-xs">
                              <img
                                src={logo}
                                alt={name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = "/cs.webp";
                                }}
                              />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[12px] font-semibold capitalize text-gray-900 truncate">
                                  {name}
                                </span>
                                {consultant.tierTitle && (
                                  <span className="text-[9px] font-medium text-fourth bg-fourth/10 px-1.5 py-0.2 rounded shrink-0">
                                    {formatSearchBadge(
                                      consultant.tierTitle,
                                      true
                                    )}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                                {city && (
                                  <span className="flex items-center gap-0.5 truncate">
                                    <MapPin className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                                    {city}
                                  </span>
                                )}
                                {rating > 0 && (
                                  <span className="flex items-center gap-0.5 shrink-0 text-amber-600 font-medium">
                                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                                    {rating}
                                  </span>
                                )}
                                {vehicleCount > 0 && (
                                  <span className="text-gray-400 shrink-0">
                                    {vehicleCount} cars
                                  </span>
                                )}
                              </div>
                            </div>

                            <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-600 transition-colors shrink-0" />
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : isTwoColumnLayout ? (
          /* Two-Column Search State: Left Side = JSON Suggestions, Right Side = Live API Vehicles */
          <div className="flex flex-col md:flex-row w-full h-full bg-white overscroll-contain">
            {/* Left Column - JSON Suggestions */}
            <div className="w-full md:w-[380px] lg:w-[400px] border-r border-gray-100 flex flex-col shrink-0 h-full overflow-hidden bg-gray-50/40 overscroll-contain">
              {renderSuggestionsContent()}
            </div>

            {/* Right Column - API Live Vehicles & Results */}
            <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-white overscroll-contain">
              {renderApiResultsContent()}
            </div>
          </div>
        ) : hasApiOrLoading ? (
          /* Single-Column Search State: Only Live API Results (e.g. consultant "elite motor") */
          <div className="w-full h-full bg-white overscroll-contain">
            {renderApiResultsContent()}
          </div>
        ) : hasSuggestions ? (
          /* Single-Column Search State: Only Suggestions when API has 0 vehicles */
          <div className="w-full h-full bg-white overscroll-contain">
            {renderSuggestionsContent()}
          </div>
        ) : (
          /* Single-Column Empty State: When neither side has results */
          <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-400 bg-white">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-30 text-gray-400" />
            <p className="text-[13px] font-semibold text-gray-700">
              No results found for &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-[11px] text-gray-400 mt-1 max-w-[260px]">
              Try searching for a vehicle brand, model, city, or auto consultant
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
