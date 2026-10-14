"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
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
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  saveRecentSearch,
  getRecentSearches,
  deleteAllRecentSearches,
  getHomeFeedConsult,
} from "@/services/user.service";
import { getAndSearchMakers } from "@/services/filter";
import { GlobalSearchService } from "@/services/globalSearch.service";
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
          .filter((s) => s.type === "brand" || s.type === "model")
          .map((s) => {
            const prefix = s.label.toLowerCase().startsWith("used") ? "" : "Used ";
            return { ...s, rawLabel: s.label, label: `${prefix}${s.label}` };
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
  const { data: homeConsultantsData } = useQuery({
    queryKey: ["homeFeedConsultantsNavbar"],
    queryFn: () => getHomeFeedConsult({ pageNo: 1, size: 100 }),
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

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
      } catch {}
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

  // ── Suggestions Formatting: API Response with Local Fallback ──
  const displaySections = useMemo(() => {
    if (!searchQuery.trim()) return [];

    // 1. If backend API returned sections with items, use them!
    const apiSections =
      apiSuggestResponse?.sections || apiSuggestResponse?.data?.sections;
    if (Array.isArray(apiSections) && apiSections.length > 0) {
      const validSections = apiSections.filter(
        (sec) => Array.isArray(sec.items) && sec.items.length > 0
      );
      if (validSections.length > 0) {
        return validSections;
      }
    }

    // 2. Fallback to local suggestions JSON (BRANDS & MODELS ONLY - NO JSON CONSULTANTS)
    const query = searchQuery.toLowerCase().trim();
    if (!query) return [];

    const directMatches = suggestionsData
      .filter((s) => {
        if (s.type !== "brand" && s.type !== "model") return false;
        const labelMatch = (s.label || "").toLowerCase().includes(query);
        const tokenMatch = Array.isArray(s.searchTokens)
          ? s.searchTokens.some((t) => t.includes(query))
          : false;
        return labelMatch || tokenMatch;
      })
      .slice(0, 10);

    if (directMatches.length > 0) {
      return [
        {
          sectionTitle: "Suggestions",
          icon: "search",
          items: directMatches.map((s) => ({
            id: s.id || s.slug || s.label,
            title: s.label,
            subtitle: null,
            type: "VEHICLE",
            link: s.link,
          })),
        },
      ];
    }

    return [];
  }, [searchQuery, apiSuggestResponse, suggestionsData]);

  const isSearchingSuggestions =
    isSuggestLoading ||
    isSuggestFetching ||
    (searchQuery.trim().length >= 2 && debouncedQuery !== searchQuery.trim());

  // Flattened items for keyboard arrow navigation
  const flatSuggestionItems = useMemo(() => {
    return displaySections.flatMap((s) => s.items || []);
  }, [displaySections]);

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
    saveSearchMutation.mutate(item.title);
    trackMetaProductSearch(item.title);

    const isConsultant =
      item.type === "CONSULTATION" || item.type === "consultant";

    if (isConsultant) {
      const targetUsername =
        item.username ||
        item.consultantUsername ||
        item.consultationUsername ||
        item.userName ||
        (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]/g, "") : "");

      saveKnownConsultant({
        id: item.id,
        title: item.title,
        username: targetUsername,
        badge: item.badge || "CONSULTANT",
        type: "CONSULTATION",
      });

      if (targetUsername) {
        router.push(`/auto-consultant/${targetUsername}`);
      } else if (item.link) {
        router.push(item.link);
      } else {
        router.push(`/search?consultant=${encodeURIComponent(item.title || "")}`);
      }
      closeDropdown();
      return;
    }

    if (item.link) {
      router.push(item.link);
    } else if (item.type === "VEHICLE") {
      router.push(`/vehicle/details/${item.id}`);
    } else {
      executeSearch(item.title);
    }
    closeDropdown();
  };

  // ── Handle Click on Brand from Mega Menu ──
  const handleBrandClick = (brandName) => {
    if (!brandName) return;
    saveSearchMutation.mutate(brandName);
    trackMetaProductSearch(brandName);
    const slugBrand = brandName.toLowerCase().replace(/\s+/g, "-");
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
        className={`absolute top-[120%] left-1/2 -translate-x-1/2 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-gray-100 rounded-3xl overflow-hidden overscroll-contain transition-all duration-300 origin-top ${showDropdown
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
          } ${!searchQuery ? "h-[480px]" : "max-h-[400px]"}`}
        style={{
          width: !searchQuery ? "1000px" : "600px",
          maxWidth: "95vw",
        }}
      >
        {!searchQuery ? (
          /* Mega Menu Layout for Empty State (EXACT ORIGINAL DESIGN) */
          <div className="flex flex-col md:flex-row w-full h-full bg-white overscroll-contain">
            {/* Left Side - Brands */}
            <div className="flex-[2.2] border-r border-gray-100 flex flex-col overflow-hidden shrink-0 overscroll-contain">
              <div className="p-5 pb-0 flex-1 overflow-y-auto scrollbar-hide relative overscroll-contain">
                {/* Popular Brands Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-fourth font-bold">
                    <Flame className="w-4 h-4 text-fourth" />
                    <span className="text-[13px]">Popular Brands</span>
                  </div>
                </div>

                {/* Popular Brands Grid */}
                <div className="grid grid-cols-6 gap-2 mb-4">
                  {apiBrandsList.length === 0 ? (
                    [...Array(6)].map((_, idx) => (
                      <div
                        key={`popular-skeleton-${idx}`}
                        className="flex flex-col items-center justify-center gap-1.5 p-1.5 rounded-xl border border-gray-100 bg-gray-50/50 animate-pulse"
                      >
                        <div className="h-9 w-12 rounded-lg bg-gray-200/80" />
                        <div className="h-2 w-10 bg-gray-200/80 rounded-full" />
                      </div>
                    ))
                  ) : (
                    popularBrands.map((brand, idx) => (
                      <div
                        key={`popular-${idx}`}
                        onClick={() => handleBrandClick(brand.makeName)}
                        className="flex flex-col items-center justify-center gap-1 p-1.5 rounded-xl border border-gray-100 cursor-pointer hover:border-fourth hover:shadow-sm transition-all group"
                      >
                        {brand.logo ? (
                          <div className="h-9 w-12 flex items-center justify-center">
                            <img
                              src={brand.logo}
                              alt={brand.makeDisplay}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="h-9 w-12 flex items-center justify-center bg-gray-50 rounded text-gray-400">
                            <CarFront className="w-5 h-5" />
                          </div>
                        )}
                        <span className="text-[10px] font-bold text-gray-900 text-center leading-tight transition-colors">
                          {brand.makeDisplay}
                        </span>
                      </div>
                    )))
                  }
                </div>

                {/* All Brands Header */}
                <div className="flex items-center gap-2 text-fourth font-bold mb-2">
                  <CarFront className="w-4 h-4 text-fourth" />
                  <span className="text-[13px]">All Brands</span>
                </div>

                {/* All Brands List with Alphabet Letters */}
                <div className="flex flex-col pb-2">
                  {apiBrandsList.length === 0 ? (
                    [...Array(7)].map((_, idx) => (
                      <div
                        key={`all-brand-skeleton-${idx}`}
                        className="flex items-center justify-between py-1.5 px-2 border-b border-gray-50 animate-pulse"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-6 h-6 rounded bg-gray-200/60" />
                          <div className="w-9 h-9 rounded-full bg-gray-200/80 shrink-0" />
                          <div
                            className="h-3.5 bg-gray-200/80 rounded-full"
                            style={{ width: `${80 + (idx % 4) * 25}px` }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2.5 w-8 bg-gray-100 rounded-full" />
                          <div className="w-3.5 h-3.5 rounded-full bg-gray-100" />
                        </div>
                      </div>
                    ))
                  ) : (
                    apiBrandsList.map((brand, idx) => {
                      const currentLetter = (
                        brand.makeDisplay ||
                        brand.makeName ||
                        "A"
                      )
                        .charAt(0)
                        .toUpperCase();
                      const prevLetter =
                        idx > 0
                          ? (
                            apiBrandsList[idx - 1].makeDisplay ||
                            apiBrandsList[idx - 1].makeName ||
                            "A"
                          )
                            .charAt(0)
                            .toUpperCase()
                          : "";
                      const showLetter = currentLetter !== prevLetter;

                      return (
                        <div
                          key={`all-${idx}`}
                          onClick={() => handleBrandClick(brand.makeName)}
                          className="flex items-center justify-between py-1 px-2 border-b border-gray-50 hover:bg-fourth/5 cursor-pointer group transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            {/* Letter indicator */}
                            <div
                              className={`w-6 h-6 flex items-center justify-center text-[11px] font-bold rounded ${showLetter
                                  ? "bg-gray-100 text-gray-600"
                                  : "opacity-0"
                                }`}
                            >
                              {currentLetter}
                            </div>

                            {/* Brand Logo */}
                            {brand.logo ? (
                              <div className="w-9 h-9 flex items-center justify-center bg-white rounded-full border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-1.5 shrink-0 group-hover:border-gray-300 transition-colors">
                                <img
                                  src={brand.logo}
                                  alt={brand.makeDisplay}
                                  className="max-w-full max-h-full object-contain"
                                />
                              </div>
                            ) : (
                              <div className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-full text-gray-400 shrink-0">
                                <CarFront className="w-4 h-4" />
                              </div>
                            )}

                            {/* Brand Name */}
                            <span className="font-semibold text-gray-900 text-[13px] transition-colors">
                              {brand.makeDisplay || brand.makeName}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-gray-400 font-medium group-hover:text-gray-600 transition-colors">
                              Explore
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-600 transition-colors" />
                          </div>
                        </div>
                      );
                    }))
                  }
                </div>
              </div>
            </div>

            {/* Right Side - Recent & Trending */}
            <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide relative border-l border-gray-100/50 overscroll-contain">
              <div className="p-5 space-y-5 flex-1">
                {/* Recent Searches */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-fourth font-bold">
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
                    {recentSearches.map((item, idx) => {
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
                          {isConsultant && (
                            <span className="text-[9px] font-semibold text-fourth uppercase tracking-wider bg-fourth/10 px-1.5 py-0.5 rounded shrink-0">
                              {badgeText}
                            </span>
                          )}
                        </div>
                      );
                    })}
                    {recentSearches.length === 0 && (
                      <span className="text-[11px] text-gray-400 p-1.5">
                        No recent searches
                      </span>
                    )}
                  </div>
                </div>

                {/* Trending Brands */}
                <div>
                  <div className="flex items-center gap-2 text-fourth font-bold mb-2">
                    <TrendingUp className="w-4 h-4 text-fourth" />
                    <span className="text-[12px]">Trending Brands</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {apiBrandsList.length === 0 ? (
                      [...Array(5)].map((_, idx) => (
                        <div
                          key={`trending-skeleton-${idx}`}
                          className="flex items-center justify-between p-1.5 rounded-lg animate-pulse"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200/80 shrink-0" />
                            <div className="h-3 w-20 bg-gray-200/80 rounded-full" />
                          </div>
                          <div className="h-2.5 w-8 bg-gray-100 rounded-full" />
                        </div>
                      ))
                    ) : (
                      apiBrandsList.slice(0, 5).map((brand, idx) => (
                        <div
                          key={`trending-${idx}`}
                          onClick={() => handleBrandClick(brand.makeName)}
                          className="flex items-center justify-between p-1.5 hover:bg-gray-50 cursor-pointer rounded-lg transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            {brand.logo ? (
                              <div className="w-8 h-8 flex items-center justify-center p-1.5 bg-white rounded-full border border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.03)] shrink-0 group-hover:border-gray-200 transition-colors">
                                <img
                                  src={brand.logo}
                                  alt={brand.makeDisplay}
                                  className="max-w-full max-h-full object-contain"
                                />
                              </div>
                            ) : (
                              <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-400 shrink-0">
                                <CarFront className="w-4 h-4" />
                              </div>
                            )}
                            <span className="font-semibold text-gray-900 text-[12px] transition-colors">
                              {brand.makeDisplay}
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-400 font-medium group-hover:text-gray-600 transition-colors">
                            Explore
                          </span>
                        </div>
                      )))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Suggestions Section for Active Search (EXACT OLD DESIGN MATCHED WITH API CONTRACT) */
          <div className="w-full bg-white overflow-y-auto max-h-[350px] p-4 scrollbar-hide h-full overscroll-contain">
            {isSearchingSuggestions && displaySections.length === 0 ? (
              /* Search Suggestions Skeleton */
              <div className="space-y-4">
                <div className="px-3 py-1 flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-3 w-24 bg-gray-200 rounded-full animate-pulse" />
                </div>
                <div className="flex flex-col gap-1">
                  {[...Array(4)].map((_, idx) => (
                    <div
                      key={`suggest-skeleton-${idx}`}
                      className="flex items-center justify-between py-2 px-2 border-b border-gray-50 rounded-lg animate-pulse"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Vehicle Image / Icon box skeleton */}
                        <div className="w-9 h-9 rounded-lg bg-gray-200/90 shrink-0" />

                        {/* Title and details skeleton */}
                        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-3.5 bg-gray-200/90 rounded-full"
                              style={{ width: `${55 + (idx % 3) * 15}%`, maxWidth: '220px' }}
                            />
                            {idx === 0 && (
                              <div className="h-3 w-14 bg-fourth/10 rounded-full" />
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2.5 w-32 bg-gray-100 rounded-full" />
                            <div className="h-2.5 w-16 bg-gray-200/70 rounded-full" />
                          </div>
                        </div>
                      </div>

                      {/* Explore Button skeleton */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="h-2.5 w-10 bg-gray-100 rounded-full" />
                        <div className="w-3.5 h-3.5 rounded-full bg-gray-100" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : displaySections.length > 0 ? (
              displaySections.map((sec, secIdx) => (
                <div key={`sec-${secIdx}`} className="mb-3 last:mb-0">
                  <div className="px-3 py-1.5 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                      {sec.sectionTitle?.toLowerCase().includes("vehicle") ||
                        sec.icon === "VEHICLE" ||
                        sec.icon === "car" ? (
                        <CarFront className="w-3.5 h-3.5 text-fourth" />
                      ) : (
                        <User className="w-3.5 h-3.5 text-fourth" />
                      )}
                      {sec.sectionTitle}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {sec.items.map((item, itemIdx) => {
                      const flatIndex = flatSuggestionItems.findIndex(
                        (fi) => fi.id === item.id
                      );
                      const isSelected =
                        selectedIndex >= 0 && selectedIndex === flatIndex;

                      return (
                        <div
                          key={item.id || itemIdx}
                          onClick={() => handleItemClick(item)}
                          className={`group flex items-center justify-between py-1.5 px-2 cursor-pointer transition-colors border-b border-gray-50 rounded-lg ${isSelected
                              ? "bg-fourth/5 border-l-2 border-fourth"
                              : "hover:bg-fourth/5"
                            }`}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {item.thumbnailUrl ? (
                              <img
                                src={item.thumbnailUrl}
                                alt={item.title}
                                className="w-9 h-9 object-cover rounded-lg border border-gray-100 shrink-0"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-colors shadow-sm shrink-0">
                                {item.type === "CONSULTATION" ? (
                                  <User className="w-4 h-4 text-fourth" />
                                ) : (
                                  <Car className="w-4 h-4 text-gray-400" />
                                )}
                              </div>
                            )}

                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900 text-[13px] transition-colors truncate">
                                  {item.title}
                                </span>
                                {(item.badge && item.badge !== "NOT_INSPECTED"
                                  ? item.badge
                                  : item.type === "CONSULTATION"
                                  ? "CONSULTANT"
                                  : null) && (
                                  <span className="text-[9px] font-semibold text-fourth uppercase tracking-wider bg-fourth/10 px-1.5 py-0.5 rounded shrink-0">
                                    {item.badge && item.badge !== "NOT_INSPECTED"
                                      ? item.badge
                                      : "CONSULTANT"}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 truncate">
                                {item.subtitle && <span>{item.subtitle}</span>}
                                {item.price && (
                                  <span className="font-semibold text-gray-900">
                                    • ₹{Number(item.price).toLocaleString("en-IN")}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
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
              searchQuery && (
                <div className="p-6 text-center text-gray-400">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
                  <p className="text-[12px] font-medium">
                    No results found for &quot;{searchQuery}&quot;
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
