"use client";
import {
  Menu,
  Search,
  User,
  Settings,
  MapPin,
  ChevronRight,
  Tag,
  Car,
  Fuel,
  Zap,
  Star,
  X,
  Flame,
  CarFront,
  TrendingUp,
  Clock,
  History,
  LayoutGrid,
  ArrowRight,
  Store,
  Smartphone,
} from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect, useRef, useMemo } from "react";
import Button from "../ui/button";
import HamburgerDrawer from "../features/home/HamburgerDrawer";
import AccountPopup from "../features/home/AccountPopup";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/stores/useAuthStore";
import PreferencesPopup from "../features/user/PreferencesPopup";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useUIStore } from "@/stores/useUIStore";
import MobileAppDownloadBanner from "../ui/MobileAppDownloadBanner";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileStrengthQuery } from "@/queries/user.queries";
import { getAndSearchMakers } from "@/services/filter";

const MAKER_NAME_MAPPING = {
  1: "Ashok Leyland",
  2: "Aston Martin",
  3: "Audi",
  4: "Bentley",
  5: "BMW",
  6: "Bugatti",
  7: "Chevrolet",
  8: "Datsun",
  9: "Ferrari",
  10: "Fiat",
  11: "Force Motors",
  12: "Ford",
  13: "Hindustan Motors",
  14: "Honda",
  15: "Hyundai",
  16: "ICML",
  17: "Jaguar",
  18: "Lamborghini",
  19: "Land Rover",
  20: "Mahindra",
  21: "Maruti Suzuki",
  22: "Maserati",
  23: "Maybach",
  24: "Mercedes Benz",
  25: "Mitsubishi",
  26: "Nissan",
  27: "Porsche",
  28: "Premier",
  29: "Renault",
  30: "Rolls Royce",
  31: "San",
  32: "Skoda",
  33: "Ssangyong",
  34: "Tata",
  35: "Toyota",
  36: "Volkswagen",
  37: "Volvo",
  38: "Mahindra Renault",
  39: "Opel",
  40: "Daewoo",
  41: "Jeep",
  42: "ISUZU",
  43: "DC",
  44: "Subaru",
  49: "CRYSLER",
  50: "MG",
  51: "KIA",
  52: "BAJAJ",
  53: "EICHER",
  55: "CADILLAC",
  57: "SMPIL",
  58: "HUMMER",
  59: "WILLYS",
  60: "ROVAR",
  61: "CITROEN",
  62: "BYD",
  64: "PMV",
};

export default function Navbar({ heroMode = false, scrolled = false, insideDrawer = false, onClose = () => { } }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [isComeFromPhone, setIsComeFromPhone] = useState(false);
  const [sellDropdownOpen, setSellDropdownOpen] = useState(false);

  const { user, isLoggedIn } = useAuthStore();
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsSearching(false);
  }, [pathname, searchParams]);

  /* ================= BANNER STATES & UI STATES ================= */
  const { isMobileBannerVisible, hideMobileBanner, isMobileBannerTempHidden, setIsSearchDropdownOpen } =
    useUIStore();

  /* ================= SEARCH STATES ================= */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);

  const combinedItems = useMemo(() => {
    return filteredSuggestions;
  }, [filteredSuggestions]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery, showDropdown, combinedItems]);

  // Lock body scroll when mega menu is open and sync global state
  useEffect(() => {
    if (showDropdown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Update global state for other components like Compare Button
    setIsSearchDropdownOpen(showDropdown);
    return () => {
      document.body.style.overflow = "unset";
      setIsSearchDropdownOpen(false);
    };
  }, [showDropdown]);

  const searchRef = useRef(null);

  // Click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const sellDropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sellDropdownOpen && sellDropdownRef.current && !sellDropdownRef.current.contains(event.target)) {
        setSellDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sellDropdownOpen]);

  const accountRef = useRef(null);
  const accountTimeoutRef = useRef(null);
  const [persisAccountOpen, setPersisAccountOpen] = useState(false);
  const { data: strengthRes } = useQuery({
    ...getUserProfileStrengthQuery(),
    enabled: isLoggedIn,
  });
  const profileStrength = strengthRes?.data || null;

  // Dynamic Import States for Search Suggestions
  const [suggestionsData, setSuggestionsData] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [apiBrandsList, setApiBrandsList] = useState([]);
  const [isSuggestionsLoaded, setIsSuggestionsLoaded] = useState(false);

  const loadSuggestions = async () => {
    if (isSuggestionsLoaded) return;
    try {
      const data = await import("@/data/searchSuggestions.json");
      const rawSuggestions = data.default || data;
      const loadedSuggestions = rawSuggestions.map((s) => {
        if (s.type === "brand" || s.type === "model") {
          const prefix = s.label.toLowerCase().startsWith("used") ? "" : "Used ";
          return { ...s, rawLabel: s.label, label: `${prefix}${s.label}` };
        }
        return s;
      });

      // Dynamically fetch registered auto consultants / storefronts
      let consultantsList = [];
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.reecomm.online/api/v1/website";
        const cleanApiUrl = apiUrl.replace(/\/$/, "");
        const consultRes = await fetch(`${cleanApiUrl}/homefeed/consultations/seo?pageNo=1&size=100`);
        if (consultRes.ok) {
          const consultData = await consultRes.json();
          if (consultData?.data && Array.isArray(consultData.data)) {
            consultantsList = consultData.data.map((store) => ({
              id: `consult-${store.id}`,
              label: store.consultationName || store.username || "",
              username: store.username || "",
              type: "consultant",
              link: `/auto-consultant/${store.username}`,
            })).filter((c) => c.label && c.username);
          }
        }
      } catch (err) {
        console.error("Failed to load storefront/consultants list in suggestions", err);
      }

      setSuggestionsData([...loadedSuggestions, ...consultantsList]);

      const rawBrands = loadedSuggestions.reduce((acc, s) => {
        const originalLabel = s.rawLabel || s.label;
        if (s.type === "brand") acc.push(originalLabel);
        if (s.brand) acc.push(s.brand);
        if (s.makerId && MAKER_NAME_MAPPING[s.makerId])
          acc.push(MAKER_NAME_MAPPING[s.makerId]);
        return acc;
      }, []);

      const bMap = new Map();
      rawBrands.forEach((b) => {
        const normalized = b.toLowerCase();
        if (normalized === "kia") bMap.set("kia", "Kia");
        else if (normalized === "mercedes benz" || normalized === "mercedes")
          bMap.set("mercedes", "Mercedes Benz");
        else if (!bMap.has(normalized)) bMap.set(normalized, b);
      });

      setBrandsList(Array.from(bMap.values()).sort());

      // Fetch brands from API for logos
      try {
        const makersRes = await getAndSearchMakers({ page: 1, limit: 100 });
        if (makersRes?.data && Array.isArray(makersRes.data)) {
          // Sort alphabetically by makeDisplay
          const sortedMakers = makersRes.data.sort((a, b) =>
            (a.makeDisplay || a.makeName || "").localeCompare(b.makeDisplay || b.makeName || "")
          );
          setApiBrandsList(sortedMakers);
        }
      } catch (err) {
        console.error("Failed to load makers API", err);
      }

      setIsSuggestionsLoaded(true);
    } catch (e) {
      console.error("Failed to load search suggestions", e);
    }
  };

  // Preload gracefully in the background after initial paint
  useEffect(() => {
    const timer = setTimeout(() => {
      loadSuggestions();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const [scrollY, setScrollY] = useState(0);

  /* ================= SCROLL DETECTION ================= */
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);
      setAtTop(currentY === 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= BANNER TRANSFORM ================= */
  // Logic removed to fix forced reflows.

  /* ================= SEARCH OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= SIGNUP POPUP LISTENER ================= */
  useEffect(() => {
    const handler = () => {
      setAccountOpen(false);
      setPersisAccountOpen(false);
    };
    document.addEventListener("signuppopup:open", handler);
    return () => document.removeEventListener("signuppopup:open", handler);
  }, []);

  /* ================= PREFERENCES POPUP LISTENER ================= */
  useEffect(() => {
    const handler = () => {
      setOpen(true);
    };
    document.addEventListener("preferencespopup:open", handler);
    return () => document.removeEventListener("preferencespopup:open", handler);
  }, []);

  /* ================= SUGGESTIONS LOGIC ================= */
  useEffect(() => {
    let baseSuggestions = suggestionsData;

    // Filter by brand if a brand is selected
    if (selectedBrand !== "All") {
      baseSuggestions = suggestionsData.filter((s) => {
        const brandMatch =
          s.brand && s.brand.toLowerCase() === selectedBrand.toLowerCase();
        const makerIdMatch =
          s.makerId &&
          MAKER_NAME_MAPPING[s.makerId] &&
          MAKER_NAME_MAPPING[s.makerId].toLowerCase() ===
          selectedBrand.toLowerCase();
        const originalLabel = s.rawLabel || s.label;
        // If it's a model of the selected brand, or the brand itself
        return (
          brandMatch ||
          makerIdMatch ||
          (s.type === "brand" &&
            originalLabel.toLowerCase() === selectedBrand.toLowerCase())
        );
      });
    }

    if (!searchQuery.trim()) {
      setFilteredSuggestions(baseSuggestions.slice(0, 10)); // Show popular items
      return;
    }

    const query = searchQuery.toLowerCase().trim();

    // 1. Direct matches from JSON (matches label or consultant username, sorts priorities, and shows up to 10 results)
    const directMatches = baseSuggestions
      .filter((s) => {
        const labelMatch = s.label.toLowerCase().includes(query);
        const usernameMatch = s.username && s.username.toLowerCase().includes(query);
        return labelMatch || usernameMatch;
      })
      .sort((a, b) => {
        const getTypePriority = (type) => {
          if (type === "brand" || type === "model") return 0;
          if (type === "consultant") return 1;
          return 2;
        };
        return getTypePriority(a.type) - getTypePriority(b.type);
      })
      .slice(0, 10);

    // 2. Generate Dynamic Related Searches
    const dynamicRelated = [];
    // Improved matching logic: handles typos and word order better
    const matchedItem = baseSuggestions.find((s) => {
      if (s.type !== "brand" && s.type !== "model") return false;
      const label = s.label.toLowerCase();
      const qWords = query.split(/\s+/).filter((w) => w.length > 1);
      const lWords = label.split(/\s+/).filter((w) => w.length > 1);

      // Direct match or substring
      if (query.includes(label) || label.includes(query)) return true;

      // Word-based fuzzy match (handles "tata nexton" matching "tata nexon")
      const matches = lWords.filter((lw) =>
        qWords.some(
          (qw) =>
            qw.includes(lw) ||
            lw.includes(qw) ||
            // Handle one character difference (simple typo)
            (qw.length > 3 &&
              lw.length > 3 &&
              (qw.slice(0, -2) === lw.slice(0, -2) ||
                qw.slice(2) === lw.slice(2))),
        ),
      );
      return matches.length >= lWords.length;
    });

    if (matchedItem && query.length >= 2) {
      const baseLabel = matchedItem.label;
      const q = query.toLowerCase();

      // Intent detection
      const isLocationIntent =
        q.includes(" in") || q.includes(" near") || q.includes(" at");
      const isBudgetIntent =
        q.includes(" under") ||
        q.includes(" below") ||
        q.includes(" price") ||
        q.includes(" budget");
      const isFuelIntent =
        q.includes(" diesel") ||
        q.includes(" petrol") ||
        q.includes(" ev") ||
        q.includes(" cng");
      const isFeatureIntent =
        q.includes(" auto") ||
        q.includes(" sunroof") ||
        q.includes(" 7 seater");

      const brandParam =
        matchedItem.brand ||
        (matchedItem.makerId
          ? MAKER_NAME_MAPPING[matchedItem.makerId]
          : baseLabel);
      const modelIdParam =
        matchedItem.modelId ||
        (matchedItem.type === "model"
          ? matchedItem.id.replace("m_", "")
          : null);
      const modelNameParam =
        matchedItem.model || (matchedItem.type === "model" ? baseLabel : "");
      const modelQueryParam = modelIdParam
        ? `&modelId=${modelIdParam}&model=${encodeURIComponent(modelNameParam)}`
        : "";

      // 1. Location Suggestion
      if (!isBudgetIntent && !isFuelIntent && !isFeatureIntent) {
        dynamicRelated.push({
          id: `rel-loc-ah-${query}`,
          label: `${baseLabel} in Ahmedabad`,
          type: "related",
          link: `/search?location=Ahmedabad&brand=${brandParam}${modelQueryParam}`,
        });
        dynamicRelated.push({
          id: `rel-loc-mu-${query}`,
          label: `${baseLabel} in Mumbai`,
          type: "related",
          link: `/search?location=Mumbai&brand=${brandParam}${modelQueryParam}`,
        });
      }

      // 2. Budget Suggestion
      if (
        isBudgetIntent ||
        (!isLocationIntent && !isFuelIntent && !isFeatureIntent)
      ) {
        dynamicRelated.push({
          id: `rel-p2-${query}`,
          label: `${brandParam} under 10 Lakh`,
          type: "related",
          link: `/search?budget=0-10&brand=${brandParam}${modelQueryParam}`,
        });
        dynamicRelated.push({
          id: `rel-p1-${query}`,
          label: `${brandParam} under 5 Lakh`,
          type: "related",
          link: `/search?budget=0-5&brand=${brandParam}${modelQueryParam}`,
        });
      }

      // 3. Fuel/Feature Suggestion
      if (
        isFuelIntent ||
        isFeatureIntent ||
        (!isLocationIntent && !isBudgetIntent)
      ) {
        dynamicRelated.push({
          id: `rel-fuel-${query}`,
          label: `Diesel ${brandParam}`,
          type: "related",
          link: `/search?fuelType=Diesel&brand=${brandParam}${modelQueryParam}`,
        });
        dynamicRelated.push({
          id: `rel-auto-${query}`,
          label: `Automatic ${brandParam}`,
          type: "related",
          link: `/search?transmission=Automatic&brand=${brandParam}${modelQueryParam}`,
        });
      }
    }

    // Combine and remove duplicates by label
    const combined = [...directMatches];
    const unique = Array.from(
      new Map(
        combined.map((item) => [item.label.toLowerCase(), item]),
      ).values(),
    );

    setFilteredSuggestions(unique);
  }, [searchQuery, selectedBrand, suggestionsData]);

  /* ================= CLICK OUTSIDE CLOSE ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
        setPersisAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= PHONE APP MODE ================= */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsComeFromPhone(sessionStorage.getItem("isComeFromPhone") === "true");
  }, []);

  const isStorefrontPage = pathname?.startsWith("/consult/dashboard/storefront");

  if (isComeFromPhone && isStorefrontPage) return null;

  return (
    <>
      {/* Background Overlay for Search */}
      {showDropdown && (
        <div
          className="fixed inset-0 bg-black/60 z-1090 transition-opacity"
          onClick={() => setShowDropdown(false)}
        />
      )}
      <div
        className="fixed top-0 inset-x-0 z-1100 transition-transform duration-300 pointer-events-none"
      // style={{ transform: `translateY(${transformY}px)` }}
      >
        {isMobileBannerVisible && !isMobileBannerTempHidden && atTop && (
          <div className="pointer-events-auto">
            <MobileAppDownloadBanner onClose={hideMobileBanner} />
          </div>
        )}

        <nav
          className={`pointer-events-auto transition-all duration-300 relative w-full
          ${heroMode
              ? scrolled
                ? "bg-white text-black shadow-xl backdrop-blur-lg h-16"
                : "bg-transparent text-secondary h-20 md:h-24"
              : "bg-primary text-secondary h-16"
            }`}
        >
          <div className="relative w-full px-4 md:px-8 mx-auto h-full flex items-center justify-between">
            {/* LEFT */}
            <Link
              href="/"
              onClick={insideDrawer ? onClose : undefined}
              className={`flex items-center px-4 md:px-5 gap-3 transition-all duration-500 ease-in-out ${heroMode && !scrolled
                ? "h-11 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl rounded-full border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.3)] text-primary"
                : "h-10 md:h-11 bg-secondary rounded-full text-primary"
                }`}
            >
              {!insideDrawer && (
                <>
                  {menuOpen ? (
                    <X
                      className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setMenuOpen(false);
                      }}
                    />
                  ) : (
                    <Menu
                      className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setMenuOpen(true);
                      }}
                    />
                  )}
                  <div className="w-px h-5 bg-current opacity-30" />
                </>
              )}
              <Image
                src="/logo/logo.webp"
                alt="Reecomm Logo"
                width={120}
                height={24}
                className="h-6 md:h-6 w-auto object-contain block"
              />
            </Link>

            {/* ================= CENTER SEARCH ================= */}
            {(!heroMode || scrolled) && (
              <div
                ref={searchRef}
                className="absolute left-1/2 -translate-x-1/2 hidden lg:flex z-50"
              >
                {/* Search Bar Container */}
                <div className="relative flex items-center h-[52px] w-[600px] rounded-full bg-gray-100 border border-gray-200/80 focus-within:border-gray-300 focus-within:shadow-sm transition-all duration-300 group">

                  {/* Search Input */}
                  <div className="flex-1 flex items-center h-full relative pl-2">
                    <Search className="w-4 h-4 ml-4 mr-2 text-gray-400 shrink-0" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onMouseEnter={loadSuggestions}
                      onFocus={() => {
                        loadSuggestions();
                        setShowDropdown(true);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setSelectedIndex((prev) =>
                            prev < combinedItems.length - 1 ? prev + 1 : prev,
                          );
                        } else if (e.key === "ArrowUp") {
                          e.preventDefault();
                          setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
                        } else if (e.key === "Enter") {
                          if (
                            selectedIndex >= 0 &&
                            combinedItems[selectedIndex]
                          ) {
                            const selected = combinedItems[selectedIndex];
                            setIsSearching(true);
                            if (selected.link) {
                              push(selected.link);
                              setSearchQuery(selected.label);
                            } else if (selected.username) {
                              push(`/auto-consultant/${selected.username}`);
                            }
                            setShowDropdown(false);
                            setSelectedIndex(-1);
                          } else if (searchQuery.trim()) {
                            setIsSearching(true);
                            const brandParam =
                              selectedBrand !== "All"
                                ? `&brand=${encodeURIComponent(selectedBrand)}`
                                : "";
                            push(
                              `/search?q=${encodeURIComponent(searchQuery)}${brandParam}`,
                            );
                            setShowDropdown(false);
                          } else if (selectedBrand !== "All") {
                            setIsSearching(true);
                            push(
                              `/search?brand=${encodeURIComponent(selectedBrand)}`,
                            );
                            setShowDropdown(false);
                          }
                        } else if (e.key === "Escape") {
                          setShowDropdown(false);
                        }
                      }}
                      className="w-full h-full bg-transparent focus:outline-none text-gray-800 placeholder:text-gray-400 text-[14px] font-medium"
                      placeholder="Search for vehicles or consultants..."
                    />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedIndex(-1);
                        }}
                        className="mr-2 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors absolute right-0 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Search Button */}
                  <div
                    onClick={() => {
                      if (searchQuery.trim()) {
                        setIsSearching(true);
                        const brandParam =
                          selectedBrand !== "All"
                            ? `&brand=${encodeURIComponent(selectedBrand)}`
                            : "";
                        push(
                          `/search?q=${encodeURIComponent(searchQuery)}${brandParam}`,
                        );
                        setShowDropdown(false);
                      } else if (selectedBrand !== "All") {
                        setIsSearching(true);
                        push(
                          `/search?brand=${encodeURIComponent(selectedBrand)}`,
                        );
                        setShowDropdown(false);
                      }
                    }}
                    className="ml-auto mr-1.5 w-[40px] h-[40px] rounded-full bg-fourth text-white flex items-center justify-center cursor-pointer hover:bg-fourth/90 hover:shadow-md transition-all shrink-0"
                  >
                    {isSearching ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Search size={16} />}
                  </div>

                  {/* Search Mega Menu Dropdown */}
                  <div
                    className={`absolute top-[120%] left-1/2 -translate-x-1/2 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-gray-100 rounded-3xl overflow-hidden
                    transition-all duration-300 origin-top
                    ${showDropdown ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"}
                    ${!searchQuery ? "h-[480px]" : "max-h-[400px]"}
                    `}
                    style={{ width: !searchQuery ? '1000px' : '600px', maxWidth: '95vw' }}
                  >
                    {!searchQuery ? (
                      /* Mega Menu Layout for Empty State (NEW DESIGN) */
                      <div className="flex flex-col md:flex-row w-full h-full bg-white">
                        {/* Left Side - Brands */}
                        <div className="flex-[2.2] border-r border-gray-100 flex flex-col overflow-hidden shrink-0">
                          <div className="p-5 pb-0 flex-1 overflow-y-auto scrollbar-hide relative">
                            {/* Popular Brands Header */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2 text-fourth font-bold">
                                <Flame className="w-4 h-4 text-fourth" />
                                <span className="text-[13px]">Popular Brands</span>
                              </div>

                            </div>

                            {/* Popular Brands Grid */}
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                              {apiBrandsList.slice(0, 6).map((brand, idx) => (
                                <div
                                  key={`popular-${idx}`}
                                  onClick={() => {
                                    push(`/search?brand=${encodeURIComponent(brand.makeName)}`);
                                    setShowDropdown(false);
                                  }}
                                  className="flex flex-col items-center justify-center gap-1 p-1.5 rounded-xl border border-gray-100 cursor-pointer hover:border-fourth hover:shadow-sm transition-all group"
                                >
                                  {brand.logo ? (
                                    <div className="h-9 w-12 flex items-center justify-center">
                                      <img src={brand.logo} alt={brand.makeDisplay} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform" />
                                    </div>
                                  ) : (
                                    <div className="h-9 w-12 flex items-center justify-center bg-gray-50 rounded text-gray-400">
                                      <CarFront className="w-4 h-4" />
                                    </div>
                                  )}
                                  <span className="text-[10px] font-bold text-gray-900 text-center leading-tight transition-colors">{brand.makeDisplay}</span>
                                </div>
                              ))}
                            </div>

                            {/* All Brands Header */}
                            <div className="flex items-center gap-2 text-fourth font-bold mb-2">
                              <CarFront className="w-4 h-4 text-fourth" />
                              <span className="text-[13px]">All Brands</span>
                            </div>

                            {/* All Brands List */}
                            <div className="flex flex-col pb-2">
                              {apiBrandsList.map((brand, idx) => {
                                const currentLetter = (brand.makeDisplay || brand.makeName || "A").charAt(0).toUpperCase();
                                const prevLetter = idx > 0 ? (apiBrandsList[idx - 1].makeDisplay || apiBrandsList[idx - 1].makeName || "A").charAt(0).toUpperCase() : "";
                                const showLetter = currentLetter !== prevLetter;

                                return (
                                  <div
                                    key={`all-${idx}`}
                                    onClick={() => {
                                      push(`/search?brand=${encodeURIComponent(brand.makeName)}`);
                                      setShowDropdown(false);
                                    }}
                                    className="flex items-center justify-between py-1 px-2 border-b border-gray-50 hover:bg-fourth/5 cursor-pointer group transition-colors"
                                  >
                                    <div className="flex items-center gap-3 flex-1">
                                      {/* Letter indicator */}
                                      <div className={`w-6 h-6 flex items-center justify-center text-[11px] font-bold rounded ${showLetter ? "bg-gray-100 text-gray-600" : "opacity-0"}`}>
                                        {currentLetter}
                                      </div>

                                      {/* Brand Logo */}
                                      {brand.logo ? (
                                        <div className="w-9 h-9 flex items-center justify-center bg-white rounded-full border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-1.5 shrink-0 group-hover:border-gray-300 transition-colors">
                                          <img src={brand.logo} alt={brand.makeDisplay} className="max-w-full max-h-full object-contain" />
                                        </div>
                                      ) : (
                                        <div className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-full text-gray-400 shrink-0">
                                          <CarFront className="w-4 h-4" />
                                        </div>
                                      )}

                                      {/* Brand Name */}
                                      <span className="font-semibold text-gray-900 text-[13px] transition-colors">{brand.makeDisplay || brand.makeName}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <span className="text-[11px] text-gray-400 font-medium group-hover:text-gray-600 transition-colors">Explore</span>
                                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-600 transition-colors" />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Right Side - Recent & Trending */}
                        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide relative border-l border-gray-100/50">
                          <div className="p-5 space-y-5 flex-1">
                            {/* Recent Searches */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 text-fourth font-bold">
                                  <History className="w-4 h-4 text-fourth" />
                                  <span className="text-[12px]">Recent Searches</span>
                                </div>
                                <button className="text-fourth text-[10px] font-semibold hover:text-fourth/80 cursor-pointer">Clear all</button>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                {['BMW', 'Hyundai', 'Tata Nexon', 'Maruti Swift', 'Mahindra Thar'].map((term, idx) => (
                                  <div key={`recent-${idx}`} className="flex items-center gap-2 p-1.5 hover:bg-gray-50  cursor-pointer rounded-lg transition-all text-[11px] font-semibold text-gray-700">
                                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                                    <span className="flex-1 truncate">{term}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Trending Brands */}
                            <div>
                              <div className="flex items-center gap-2 text-fourth font-bold mb-2">
                                <TrendingUp className="w-4 h-4 text-fourth" />
                                <span className="text-[12px]">Trending Brands</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                {apiBrandsList.slice(0, 5).map((brand, idx) => (
                                  <div key={`trending-${idx}`} onClick={() => { push(`/search?brand=${encodeURIComponent(brand.makeName)}`); setShowDropdown(false); }} className="flex items-center justify-between p-1.5 hover:bg-gray-50  cursor-pointer rounded-lg transition-all group">
                                    <div className="flex items-center gap-3">
                                      {brand.logo ? (
                                        <div className="w-8 h-8 flex items-center justify-center p-1.5 bg-white rounded-full border border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.03)] shrink-0 group-hover:border-gray-200 transition-colors">
                                          <img src={brand.logo} alt={brand.makeDisplay} className="max-w-full max-h-full object-contain" />
                                        </div>
                                      ) : (
                                        <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-400 shrink-0">
                                          <CarFront className="w-4 h-4" />
                                        </div>
                                      )}
                                      <span className="font-semibold text-gray-900 text-[12px] transition-colors">{brand.makeDisplay}</span>
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-medium group-hover:text-gray-600 transition-colors">Explore</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Suggestions Section for Active Search */
                      <div className="w-full bg-white overflow-y-auto max-h-[350px] p-4 scrollbar-hide h-full">
                        {filteredSuggestions.length > 0 && (
                          <div className="mb-2">
                            <div className="px-3 py-2 flex items-center justify-between">
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                {searchQuery ? "Suggestions" : "Trending Searches"}
                              </span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              {filteredSuggestions.map((s, idx) => (
                                <div
                                  key={s.id}
                                  onClick={() => {
                                    push(s.link);
                                    setShowDropdown(false);
                                    setSearchQuery(s.label);
                                  }}
                                  className={`group flex items-center justify-between py-1 px-2 cursor-pointer transition-colors border-b border-gray-50
                                    ${selectedIndex === idx ? "bg-fourth/5 border-l-2 border-fourth" : "hover:bg-fourth/5"}`}
                                >
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center transition-colors shadow-sm">
                                      {(() => {
                                        if (s.type === "related") return <Search className="w-3.5 h-3.5 text-gray-400" />;
                                        if (s.type === "price") return <Tag className="w-3.5 h-3.5 text-gray-400" />;
                                        if (s.type === "location") return <MapPin className="w-3.5 h-3.5 text-gray-400" />;
                                        if (s.type === "brand" || s.type === "model") return <Car className="w-3.5 h-3.5 text-gray-400" />;
                                        if (s.type === "fuel") return <Fuel className="w-3.5 h-3.5 text-gray-400" />;
                                        if (s.type === "feature" || s.type === "bodyType") return <Zap className="w-3.5 h-3.5 text-gray-400" />;
                                        if (s.type === "popular") return <Star className="w-3.5 h-3.5 text-gray-400" />;
                                        if (s.type === "consultant") return <User className="w-3.5 h-3.5 text-gray-400" />;
                                        return <Search className="w-3.5 h-3.5 text-gray-400" />;
                                      })()}
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-gray-900 text-[13px] transition-colors">
                                        {s.label}
                                      </span>
                                      {s.type === "related" && <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">Related Search</span>}
                                      {s.type === "consultant" && <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">Auto Consultant</span>}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] text-gray-400 font-medium group-hover:text-gray-600 transition-colors">Explore</span>
                                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-600 transition-colors" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {filteredSuggestions.length === 0 && searchQuery && (
                          <div className="p-6 text-center text-gray-400">
                            <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
                            <p className="text-[12px] font-medium">
                              No results found for &quot;{searchQuery}&quot;
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-2 md:gap-4">
              {insideDrawer ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                  className="text-2xl cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-current" />
                </button>
              ) : (
                <>
                  {(() => {
                    const userRole = user?.userRole;
                    const isConsultant = [
                      "CONSULTATION",
                      "CONSULTANT_APPLICANT",
                    ].includes(userRole);
                    const isUserSeller = userRole === "USER_SELLER";

                    const getCTA = () => {
                      if (!isLoggedIn) {
                        return {
                          label: "Join reecomm",
                          href: "/become-seller",
                        };
                      }

                      const messages = profileStrength?.messages || [];

                      if (isConsultant) {
                        const isSubscribed = userRole === "CONSULTATION";

                        // 1. Storefront Priority
                        const storefrontMsg = messages.find((m) =>
                          ["CREATE_STOREFRONT", "FIX_STOREFRONT"].includes(m.type),
                        );
                        if (storefrontMsg) {
                          return {
                            label: "Create StoreFront",
                            href: isSubscribed
                              ? "/consult/dashboard/storefront"
                              : "/consult/subscription?redirect=%2Fconsult%2Fdashboard%2Fstorefront",
                          };
                        }

                        // 2. Inventory Priority
                        const inventoryMsg = messages.find(
                          (m) => m.type === "LIST_VEHICLE",
                        );
                        if (inventoryMsg) {
                          return {
                            label: "List Vehicles",
                            href: isSubscribed
                              ? "/consult/dashboard/inventory"
                              : "/consult/subscription?redirect=%2Fconsult%2Fdashboard%2Finventory",
                          };
                        }

                        // 3. KYC Priority
                        const kycMsg = messages.find((m) =>
                          [
                            "ADD_GST",
                            "UPLOAD_AADHAAR",
                            "UPLOAD_PAN_CARD",
                            "COMPLETE_REGISTRATION",
                          ].includes(m.type),
                        );
                        if (kycMsg) {
                          let labelText = "Upload Documents";
                          if (kycMsg.type === "COMPLETE_REGISTRATION") {
                            labelText = "Complete KYC";
                          }
                          return {
                            label: labelText,
                            href: isSubscribed
                              ? "/consult/dashboard/overview"
                              : "/consult/subscription",
                          };
                        }

                        return {
                          label: "Go to Dashboard",
                          href: isSubscribed
                            ? "/consult/dashboard/overview"
                            : "/consult/subscription?redirect=%2Fconsult%2Fdashboard%2Foverview",
                        };
                      }

                      if (isUserSeller) {
                        const inventoryMsg = messages.find(
                          (m) => m.type === "LIST_VEHICLE",
                        );
                        if (inventoryMsg) {
                          return {
                            label: "List Vehicles",
                            href: "/user/details/myvehicle",
                          };
                        }
                        return {
                          label: "My Activity",
                          href: "/user/details/myprofile",
                        };
                      }

                      return {
                        label: "Join reecomm",
                        href: "/become-seller",
                      };
                    };

                    const cta = getCTA();

                    if (
                      pathname?.includes("/dashboard") &&
                      cta.label === "Go to Dashboard"
                    ) {
                      return null;
                    }

                    return (
                      <div className="relative" ref={sellDropdownRef}>
                        <Button
                          onClick={() => {
                            if (cta.label === "Join reecomm") {
                              setSellDropdownOpen(!sellDropdownOpen);
                            } else {
                              push(cta.href);
                            }
                          }}
                          size="sm"
                          className={`hidden md:block text-xs md:text-sm whitespace-nowrap transition-all duration-500 ease-in-out ${heroMode && !scrolled
                            ? "bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl rounded-full border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.3)] text-primary hover:bg-transparent hover:text-primary hover:border-white/30"
                            : "text-primary border border-primary hover:bg-primary hover:text-secondary"
                            }`}
                        >
                          {cta.label}
                        </Button>

                        {cta.label === "Join reecomm" && (
                          <div
                            className={`absolute top-[calc(100%+8px)] right-0 min-w-[320px] bg-secondary text-primary shadow-[0_20px_40px_rgba(0,0,0,0.45)] border border-white/10 rounded-xl overflow-hidden z-[9999] flex flex-col transition-all duration-300 origin-top-right ${sellDropdownOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                              }`}
                          >
                            <Link
                              href="/become-seller"
                              onClick={() => setSellDropdownOpen(false)}
                              className="px-4 py-4 flex items-center justify-between gap-4 group hover:bg-white/5 transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                <CarFront className="w-5 h-5 text-third shrink-0 mt-0.5" />
                                <div className="flex flex-col">
                                  <span className="text-[14px] font-semibold text-primary group-hover:text-third transition-colors whitespace-nowrap">Sell Your Vehicle</span>
                                  <span className="text-[11px] text-primary/60 font-medium whitespace-nowrap mt-0.5">Get the best price from real buyers</span>
                                </div>
                              </div>
                              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-third transition-all shrink-0" />
                            </Link>

                            <Link
                              href="/consult"
                              onClick={() => setSellDropdownOpen(false)}
                              className="px-4 py-4 flex items-center justify-between gap-4 group hover:bg-white/5 transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                <Store className="w-5 h-5 text-third shrink-0 mt-0.5" />
                                <div className="flex flex-col">
                                  <span className="text-[14px] font-semibold text-primary group-hover:text-third transition-colors whitespace-nowrap">List as a Consultant</span>
                                  <span className="text-[11px] text-primary/60 font-medium whitespace-nowrap mt-0.5">Bring your dealership online</span>
                                </div>
                              </div>
                              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-third transition-all shrink-0" />
                            </Link>

                            <Link
                              href="/download"
                              onClick={() => setSellDropdownOpen(false)}
                              className="px-4 py-3 flex items-center justify-between gap-4 group bg-fourth hover:bg-fourth/90 transition-colors mt-1"
                            >
                              <div className="flex items-center gap-3">
                                <Smartphone className="w-5 h-5 text-white shrink-0" />
                                <span className="text-[13px] font-semibold text-white whitespace-nowrap">
                                  Prefer the app? Get the Reecomm App
                                </span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-white opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* ACCOUNT */}
                  <div
                    ref={accountRef}
                    className="relative z-110"
                    onMouseEnter={() => {
                      if (accountTimeoutRef.current) clearTimeout(accountTimeoutRef.current);
                      setAccountOpen(true);
                    }}
                    onMouseLeave={() => {
                      accountTimeoutRef.current = setTimeout(() => {
                        if (!persisAccountOpen) setAccountOpen(false);
                      }, 250);
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextPersis = !persisAccountOpen;
                        setPersisAccountOpen(nextPersis);
                        setAccountOpen(nextPersis);
                      }}
                      className={`flex cursor-pointer items-center gap-1 px-3 py-1 rounded-full transition-all outline outline-2 outline-transparent text-xs md:text-sm
                    ${heroMode && !scrolled
                          ? `text-white hover:outline-white/40 ${accountOpen ? "!outline-white/40" : ""}`
                          : `text-black hover:outline-black/20 ${accountOpen ? "!outline-black/20" : ""}`
                        }`}
                    >
                      {!isLoggedIn ? (
                        <FaUserCircle className="w-5 h-5 md:w-7 md:h-7 shrink-0" />
                      ) : user?.userRole === "CONSULTATION" && user?.logoUrl ? (
                        <img
                          src={user.logoUrl}
                          alt="Profile"
                          className="w-6 h-6 md:w-7 md:h-7 rounded-full object-cover shrink-0 bg-white"
                        />
                      ) : (
                        <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-fourth text-white flex items-center justify-center text-[10px] md:text-xs font-semibold shrink-0">
                          {user?.firstname?.charAt(0)?.toUpperCase() || ""}
                          {user?.lastname?.charAt(0)?.toUpperCase() || ""}
                        </div>
                      )}

                      <span className="block text-left">
                        <span className="block text-[10px] opacity-60">
                          {!isLoggedIn ? (
                            <span className="font-bold">Sign in</span>
                          ) : (
                            <span className="font-bold">
                              Hello, {user?.consultationName || user?.firstname}
                            </span>
                          )}
                        </span>
                        <span className="font-semibold">
                          {isLoggedIn && ["CONSULTATION", "CONSULTANT_APPLICANT"].includes(user?.userRole)
                            ? "Consultant"
                            : isLoggedIn && user?.userRole === "USER_SELLER"
                              ? "Seller"
                              : "Account"}
                        </span>
                      </span>
                    </button>

                    <AccountPopup
                      open={accountOpen}
                      onClosePopup={() => {
                        setAccountOpen(false);
                        setPersisAccountOpen(false);
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>

      {!insideDrawer && (
        <HamburgerDrawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      )}

      <PreferencesPopup isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
