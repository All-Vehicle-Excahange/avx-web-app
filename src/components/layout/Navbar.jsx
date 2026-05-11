"use client";
import { Menu, Search, User, Settings, MapPin, ChevronRight, Tag, Car, Fuel, Zap, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Button from "../ui/button";
import HamburgerDrawer from "../features/home/HamburgerDrawer";
import AccountPopup from "../features/home/AccountPopup";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import PreferencesPopup from "../features/user/PreferencesPopup";
import { getGlobalSearch, getUserProfileStrength } from "@/services/user.service";
import { useRouter, usePathname } from "next/navigation";
import { useUIStore } from "@/stores/useUIStore";
import MobileAppDownloadBanner from "../ui/MobileAppDownloadBanner";
import suggestionsData from "@/data/searchSuggestions.json";

const MAKER_NAME_MAPPING = {
  1: 'Ashok Leyland', 2: 'Aston Martin', 3: 'Audi', 4: 'Bentley', 5: 'BMW',
  6: 'Bugatti', 7: 'Chevrolet', 8: 'Datsun', 9: 'Ferrari', 10: 'Fiat',
  11: 'Force Motors', 12: 'Ford', 13: 'Hindustan Motors', 14: 'Honda',
  15: 'Hyundai', 16: 'ICML', 17: 'Jaguar', 18: 'Lamborghini', 19: 'Land Rover',
  20: 'Mahindra', 21: 'Maruti Suzuki', 22: 'Maserati', 23: 'Maybach',
  24: 'Mercedes Benz', 25: 'Mitsubishi', 26: 'Nissan', 27: 'Porsche',
  28: 'Premier', 29: 'Renault', 30: 'Rolls Royce', 31: 'San', 32: 'Skoda',
  33: 'Ssangyong', 34: 'Tata', 35: 'Toyota', 36: 'Volkswagen', 37: 'Volvo',
  38: 'Mahindra Renault', 39: 'Opel', 40: 'Daewoo', 41: 'Jeep', 42: 'ISUZU',
  43: 'DC', 44: 'Subaru', 49: 'CRYSLER', 50: 'MG', 51: 'KIA', 52: 'BAJAJ',
  53: 'EICHER', 55: 'CADILLAC', 57: 'SMPIL', 58: 'HUMMER', 59: 'WILLYS',
  60: 'ROVAR', 61: 'CITROEN', 62: 'BYD', 64: 'PMV'
};

const rawBrands = suggestionsData.reduce((acc, s) => {
  if (s.type === "brand") acc.push(s.label);
  if (s.brand) acc.push(s.brand);
  if (s.makerId && MAKER_NAME_MAPPING[s.makerId]) acc.push(MAKER_NAME_MAPPING[s.makerId]);
  return acc;
}, []);

const brandMap = new Map();
rawBrands.forEach(b => {
  const normalized = b.toLowerCase();
  if (normalized === 'kia') brandMap.set('kia', 'Kia');
  else if (normalized === 'mercedes benz' || normalized === 'mercedes') brandMap.set('mercedes', 'Mercedes Benz');
  else if (!brandMap.has(normalized)) brandMap.set(normalized, b);
});

const BRANDS_LIST = Array.from(brandMap.values()).sort();

export default function Navbar({ heroMode = false, scrolled = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);

  const { user, isLoggedIn } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  /* ================= SEARCH STATES ================= */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchRef = useRef(null);
  const accountRef = useRef(null);
  const [persisAccountOpen, setPersisAccountOpen] = useState(false);
  const [profileStrength, setProfileStrength] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchStrength = async () => {
        try {
          const res = await getUserProfileStrength();
          if (res?.data) {
            setProfileStrength(res.data);
          }
        } catch (error) {
          console.error("Failed to fetch profile strength in Navbar", error);
        }
      };
      fetchStrength();
    }
  }, [isLoggedIn]);

  /* ================= BANNER STATES ================= */
  const { isMobileBannerVisible, hideMobileBanner, isMobileBannerTempHidden } =
    useUIStore();
  const [scrollY, setScrollY] = useState(0);
  const [bannerHeight, setBannerHeight] = useState(0);
  const bannerRef = useRef(null);

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

  /* ================= BANNER HEIGHT ================= */
  useEffect(() => {
    const updateHeight = () => {
      if (
        bannerRef.current &&
        isMobileBannerVisible &&
        !isMobileBannerTempHidden
      ) {
        setBannerHeight(bannerRef.current.offsetHeight);
      } else {
        setBannerHeight(0);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [isMobileBannerVisible, isMobileBannerTempHidden]);

  /* ================= BANNER TRANSFORM ================= */
  // const transformY =
  //   isMobileBannerVisible && atTop ? 0 : -bannerHeight;

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
      baseSuggestions = suggestionsData.filter(s => {
        const brandMatch = s.brand && s.brand.toLowerCase() === selectedBrand.toLowerCase();
        const makerIdMatch = s.makerId && MAKER_NAME_MAPPING[s.makerId] && MAKER_NAME_MAPPING[s.makerId].toLowerCase() === selectedBrand.toLowerCase();
        // If it's a model of the selected brand, or the brand itself
        return brandMatch || makerIdMatch || (s.type === "brand" && s.label.toLowerCase() === selectedBrand.toLowerCase());
      });
    }

    if (!searchQuery.trim()) {
      setFilteredSuggestions(baseSuggestions.slice(0, 10)); // Show popular items
      return;
    }

    const query = searchQuery.toLowerCase().trim();

    // 1. Direct matches from JSON
    const directMatches = baseSuggestions.filter((s) =>
      s.label.toLowerCase().includes(query)
    ).slice(0, 5);

    // 2. Generate Dynamic Related Searches
    const dynamicRelated = [];
    // Improved matching logic: handles typos and word order better
    const matchedItem = baseSuggestions.find(s => {
      if (s.type !== "brand" && s.type !== "model") return false;
      const label = s.label.toLowerCase();
      const qWords = query.split(/\s+/).filter(w => w.length > 1);
      const lWords = label.split(/\s+/).filter(w => w.length > 1);

      // Direct match or substring
      if (query.includes(label) || label.includes(query)) return true;

      // Word-based fuzzy match (handles "tata nexton" matching "tata nexon")
      const matches = lWords.filter(lw =>
        qWords.some(qw =>
          qw.includes(lw) || lw.includes(qw) ||
          // Handle one character difference (simple typo)
          (qw.length > 3 && lw.length > 3 && (qw.slice(0, -2) === lw.slice(0, -2) || qw.slice(2) === lw.slice(2)))
        )
      );
      return matches.length >= lWords.length;
    });

    if (matchedItem && query.length >= 2) {
      const baseLabel = matchedItem.label;
      const q = query.toLowerCase();

      // Intent detection
      const isLocationIntent = q.includes(" in") || q.includes(" near") || q.includes(" at");
      const isBudgetIntent = q.includes(" under") || q.includes(" below") || q.includes(" price") || q.includes(" budget");
      const isFuelIntent = q.includes(" diesel") || q.includes(" petrol") || q.includes(" ev") || q.includes(" cng");
      const isFeatureIntent = q.includes(" auto") || q.includes(" sunroof") || q.includes(" 7 seater");

      const brandParam = matchedItem.brand || (matchedItem.makerId ? MAKER_NAME_MAPPING[matchedItem.makerId] : baseLabel);
      const modelIdParam = matchedItem.modelId || (matchedItem.type === "model" ? matchedItem.id.replace('m_', '') : null);
      const modelNameParam = matchedItem.model || (matchedItem.type === "model" ? baseLabel : "");
      const modelQueryParam = modelIdParam ? `&modelId=${modelIdParam}&model=${encodeURIComponent(modelNameParam)}` : "";

      // 1. Location Suggestion
      if (!isBudgetIntent && !isFuelIntent && !isFeatureIntent) {
        dynamicRelated.push({
          id: `rel-loc-ah-${query}`,
          label: `${baseLabel} in Ahmedabad`,
          type: "related",
          link: `/search?location=Ahmedabad&brand=${brandParam}${modelQueryParam}`
        });
        dynamicRelated.push({
          id: `rel-loc-mu-${query}`,
          label: `${baseLabel} in Mumbai`,
          type: "related",
          link: `/search?location=Mumbai&brand=${brandParam}${modelQueryParam}`
        });
      }

      // 2. Budget Suggestion
      if (isBudgetIntent || (!isLocationIntent && !isFuelIntent && !isFeatureIntent)) {
        dynamicRelated.push({
          id: `rel-p2-${query}`,
          label: `${brandParam} under 10 Lakh`,
          type: "related",
          link: `/search?budget=0-10&brand=${brandParam}${modelQueryParam}`
        });
        dynamicRelated.push({
          id: `rel-p1-${query}`,
          label: `${brandParam} under 5 Lakh`,
          type: "related",
          link: `/search?budget=0-5&brand=${brandParam}${modelQueryParam}`
        });
      }

      // 3. Fuel/Feature Suggestion
      if (isFuelIntent || isFeatureIntent || (!isLocationIntent && !isBudgetIntent)) {
        dynamicRelated.push({
          id: `rel-fuel-${query}`,
          label: `Diesel ${brandParam}`,
          type: "related",
          link: `/search?fuelType=Diesel&brand=${brandParam}${modelQueryParam}`
        });
        dynamicRelated.push({
          id: `rel-auto-${query}`,
          label: `Automatic ${brandParam}`,
          type: "related",
          link: `/search?transmission=Automatic&brand=${brandParam}${modelQueryParam}`
        });
      }
    }

    // Combine and remove duplicates by label
    const combined = [...directMatches, ...dynamicRelated];
    const unique = Array.from(new Map(combined.map(item => [item.label.toLowerCase(), item])).values());

    setFilteredSuggestions(unique);
  }, [searchQuery, selectedBrand]);

  /* ================= DEBOUNCED SEARCH ================= */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      // setShowDropdown(false); // Don't hide if suggestions are visible
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await getGlobalSearch(searchQuery);
        setResults(res?.data || []);
        setShowDropdown(true);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

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

  return (
    <>
      {/* Background Overlay for Search */}
      {showDropdown && (
        <div
          className="fixed inset-0 bg-black/60 z-[1090] transition-opacity"
          onClick={() => setShowDropdown(false)}
        />
      )}
      <div
        className="fixed top-0 inset-x-0 z-1100 transition-transform duration-300 pointer-events-none"
      // style={{ transform: `translateY(${transformY}px)` }}
      >
        {isMobileBannerVisible && !isMobileBannerTempHidden && atTop && (
          <div ref={bannerRef} className="pointer-events-auto">
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
              className="flex items-center h-10 px-3 md:px-4 gap-2 md:gap-3 bg-secondary text-primary"
            >
              <Menu
                className="w-5 h-5"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(true);
                }}
              />
              <img
                src="/logo/logo.webp"
                alt="Reecomm Logo"
                className="h-6 md:h-6 w-auto object-contain block"
              />
            </Link>

            {/* ================= CENTER SEARCH ================= */}
            {heroMode && scrolled && (
              <div
                ref={searchRef}
                className="absolute left-1/2 -translate-x-1/2 hidden lg:flex"
              >
                <div className="relative flex items-center h-12 w-[420px] xl:w-[520px] rounded-full bg-secondary/10 border border-gray-200">
                  <div className="relative h-full flex items-center bg-gray-100/50 rounded-l-full border-r border-gray-200 hover:bg-gray-200/50 transition-colors">
                    <select
                      value={selectedBrand}
                      onChange={(e) => {
                        setSelectedBrand(e.target.value);
                        setShowDropdown(true);
                      }}
                      className="h-full w-full bg-transparent text-sm text-gray-700 font-medium pl-4 pr-6 cursor-pointer focus:outline-none appearance-none z-10"
                    >
                      <option value="All">All</option>
                      {BRANDS_LIST.map((brand, idx) => (
                        <option key={idx} value={brand}>{brand}</option>
                      ))}
                    </select>
                    <ChevronRight className="w-3 h-3 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                  </div>
                  
                  <Search className="w-4 h-4 ml-3 mr-2 text-gray-600 shrink-0" />

                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (searchQuery.trim()) {
                          const brandParam = selectedBrand !== "All" ? `&brand=${encodeURIComponent(selectedBrand)}` : "";
                          router.push(`/search?q=${encodeURIComponent(searchQuery)}${brandParam}`);
                          setShowDropdown(false);
                        } else if (selectedBrand !== "All") {
                          router.push(`/search?brand=${encodeURIComponent(selectedBrand)}`);
                          setShowDropdown(false);
                        }
                      }
                    }}
                    className="w-full bg-transparent focus:outline-none text-black placeholder:text-gray-400 text-sm"
                    placeholder="Search vehicles, brands..."
                  />

                  <div
                    onClick={() => {
                      if (searchQuery.trim()) {
                        const brandParam = selectedBrand !== "All" ? `&brand=${encodeURIComponent(selectedBrand)}` : "";
                        router.push(`/search?q=${encodeURIComponent(searchQuery)}${brandParam}`);
                        setShowDropdown(false);
                      } else if (selectedBrand !== "All") {
                        router.push(`/search?brand=${encodeURIComponent(selectedBrand)}`);
                        setShowDropdown(false);
                      }
                    }}
                    className="ml-auto p-2 mr-1 rounded-full bg-primary text-secondary cursor-pointer hover:bg-primary/90 transition-colors shrink-0"
                  >
                    <Search size={14} />
                  </div>

                  {showDropdown && (
                    <div className="absolute top-14 left-0 w-full bg-[#e8e8e8] shadow-2xl  border border-gray-100 max-h-[350px] overflow-y-auto z-50 p-2 scrollbar-hide">
                      {/* Suggestions Section */}
                      {filteredSuggestions.length > 0 && (
                        <div className="mb-3">
                          <div className="px-3 py-2 flex items-center justify-between">
                            <span className="text-[12px] font-bold text-gray-600 ">
                              {searchQuery ? "Matching & Related Searches" : "Trending Searches"}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 gap-0.5">
                            {filteredSuggestions.map((s) => (
                              <div
                                key={s.id}
                                onClick={() => {
                                  router.push(s.link);
                                  setShowDropdown(false);
                                  setSearchQuery(s.label);
                                }}
                                className="group flex items-center gap-3 p-1 hover:bg-fourth/5 cursor-pointer text-sm transition-all duration-200 rounded-sm"
                              >
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-fourth/10 transition-colors">
                                  {(() => {
                                    if (s.type === "related") return <Search className="w-3.5 h-3.5 text-fourth" />;
                                    if (s.type === "price") return <Tag className="w-3.5 h-3.5 text-gray-400 group-hover:text-fourth" />;
                                    if (s.type === "location") return <MapPin className="w-3.5 h-3.5 text-gray-400 group-hover:text-fourth" />;
                                    if (s.type === "brand" || s.type === "model") return <Car className="w-3.5 h-3.5 text-gray-400 group-hover:text-fourth" />;
                                    if (s.type === "fuel") return <Fuel className="w-3.5 h-3.5 text-gray-400 group-hover:text-fourth" />;
                                    if (s.type === "feature" || s.type === "bodyType") return <Zap className="w-3.5 h-3.5 text-gray-400 group-hover:text-fourth" />;
                                    if (s.type === "popular") return <Star className="w-3.5 h-3.5 text-gray-400 group-hover:text-fourth" />;
                                    return <Search className="w-3.5 h-3.5 text-gray-400 group-hover:text-fourth" />;
                                  })()}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-gray-900 group-hover:text-fourth font-medium transition-colors">
                                    {s.label}
                                  </span>
                                  {s.type === "related" && (
                                    <span className="text-[10px] text-fourth/80 font-bold uppercase tracking-wider">
                                      Related Search
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Results Section */}
                      {results.length > 0 && (
                        <div>
                          <div className="px-3 py-2 border-t border-gray-50 mt-2 pt-4">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              Consultants & Stores
                            </span>
                          </div>
                          <div className="grid grid-cols-1 gap-1">
                            {results.map((item, index) => (
                              <div
                                key={item.id || index}
                                onClick={() => {
                                  if (item.username) {
                                    router.push(`/store-front/${item.username}`);
                                  }
                                  setShowDropdown(false);
                                }}
                                className="flex items-center gap-4 p-3 hover:bg-fourth/5 cursor-pointer transition-all duration-200 rounded-sm group"
                              >
                                <div className="relative">
                                  <img
                                    src={
                                      item.profilePicture ||
                                      "/images/default-avatar.png"
                                    }
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                    alt={item.fullName || "User"}
                                  />
                                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-gray-900 truncate group-hover:text-primary transition-colors">
                                    {item.fullName || item.name}
                                  </div>
                                  <div className="text-xs text-gray-500 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {item.city}, {item.state}
                                  </div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                                  <ChevronRight className="w-4 h-4 text-fourth" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {loading && results.length === 0 && searchQuery && (
                        <div className="p-8 text-center">
                          <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-fourth border-t-transparent mb-2"></div>
                          <div className="text-gray-400 text-sm font-medium">
                            Searching for &quot;{searchQuery}&quot;...
                          </div>
                        </div>
                      )}

                      {!loading &&
                        results.length === 0 &&
                        filteredSuggestions.length === 0 &&
                        searchQuery && (
                          <div className="p-8 text-center text-gray-400">
                            <Search className="w-10 h-10 mx-auto mb-3 opacity-20" />
                            <p className="text-sm">No results found for &quot;{searchQuery}&quot;</p>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-2 md:gap-4">

              {(() => {
                const userRole = user?.userRole;
                const isConsultant = [
                  "CONSULTATION",
                  "CONSULTANT_APPLICANT",
                ].includes(userRole);
                const isUserSeller = userRole === "USER_SELLER";

                const getCTA = () => {
                  if (!isLoggedIn) {
                    return { label: "Sell Your Vehicle", href: "/became-seller" };
                  }

                  const messages = profileStrength?.messages || [];

                  if (isConsultant) {
                    // 1. Storefront Priority
                    const storefrontMsg = messages.find((m) =>
                      ["CREATE_STOREFRONT", "FIX_STOREFRONT"].includes(m.type),
                    );
                    if (storefrontMsg) {
                      return {
                        label: "Create StoreFront",
                        href: "/consult/subscription?redirect=%2Fconsult%2Fdashboard%2Fstorefront",
                      };
                    }

                    // 2. Inventory Priority
                    const inventoryMsg = messages.find(
                      (m) => m.type === "LIST_VEHICLE",
                    );
                    if (inventoryMsg) {
                      return {
                        label: "List Vehicles",
                        href: "/consult/subscription?redirect=%2Fconsult%2Fdashboard%2Finventory",
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
                        href: "/consult/subscription",
                      };
                    }

                    return {
                      label: "Go to Dashboard",
                      href: "/consult/subscription?redirect=%2Fconsult%2Fdashboard%2Foverview",
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
                    label: "My Activity",
                    href: "/user/details/myprofile",
                  };
                };

                const cta = getCTA();

                if (pathname?.includes("/dashboard") && cta.label === "Go to Dashboard") {
                  return null;
                }

                return (
                  <Button
                    onClick={() => router.push(cta.href)}
                    size="sm"
                    className="hidden md:block text-xs md:text-sm text-primary border border-primary hover:bg-primary hover:text-secondary whitespace-nowrap"
                  >
                    {cta.label}
                  </Button>
                );
              })()}

              {/* ACCOUNT */}
              <div
                ref={accountRef}
                className="relative z-110"
                onMouseEnter={() => setAccountOpen(true)}
                onMouseLeave={() => {
                  if (!persisAccountOpen) setAccountOpen(false);
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const nextPersis = !persisAccountOpen;
                    setPersisAccountOpen(nextPersis);
                    setAccountOpen(nextPersis);
                  }}
                  className={`flex cursor-pointer items-center gap-1 px-2 py-1 rounded transition text-xs md:text-sm
                ${heroMode && !scrolled
                      ? "text-white  hover:outline-2 hover:outline-white/40"
                      : "text-black  hover:outline-2 hover:outline-black/20"
                    }`}
                >
                  <User className="w-5 h-5 md:w-6 md:h-6" />

                  <span className="hidden sm:block text-left">
                    <span className="block text-[10px] opacity-60">
                      {!isLoggedIn ? (
                        <span className="font-bold">Sign in</span>
                      ) : (
                        <span className="font-bold">
                          Hello, {user?.firstname}
                        </span>
                      )}
                    </span>
                    <span className="font-semibold">Account</span>
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
            </div>
          </div>
        </nav>
      </div>

      <HamburgerDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        role="guest"
      />

      <PreferencesPopup isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
