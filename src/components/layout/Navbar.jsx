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
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Button from "../ui/button";
import HamburgerDrawer from "../features/home/HamburgerDrawer";
import AccountPopup from "../features/home/AccountPopup";
import CitySelector from "./CitySelector";
import NavbarSearch from "./NavbarSearch";
import useEscapeKey from "@/hooks/useEscapeKey";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/stores/useAuthStore";
import PreferencesPopup from "../features/user/PreferencesPopup";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useUIStore } from "@/stores/useUIStore";
import MobileAppDownloadBanner, { checkIsFlutterApp } from "../ui/MobileAppDownloadBanner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserProfileStrengthQuery } from "@/queries/user.queries";
import { event as metaEvent } from "@/lib/fpixel";
import { trackSearchResults } from "@/lib/gtag";
import { trackSearchSubmitted } from "@/lib/amplitude";
import { resolveSearchSlugRedirect } from "@/lib/searchLandingSeo";

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

const isProductSearchLink = (link) =>
  typeof link === "string" &&
  (link.startsWith("/search") || link.includes("/search?")) &&
  !link.includes("/auto-consultant");

const TWO_WHEELER_MAKERS = {
  15005: "Bajaj",
  15010: "Hero",
  15017: "OLA",
  15019: "Royal Enfield",
  15021: "TVS",
  15024: "Yamaha",
};

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

// Global cache to prevent multiple API calls across remounts
let globalSuggestionsData = [];
let globalBrandsList = [];
let globalApiBrandsList = [];
let isGlobalSuggestionsLoaded = false;
let globalLoadPromise = null;

export default function Navbar({ heroMode = false, scrolled = false, insideDrawer = false, onClose = () => { } }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isComeFromPhone, setIsComeFromPhone] = useState(false);
  const [sellDropdownOpen, setSellDropdownOpen] = useState(false);

  const { user, isLoggedIn, openLoginPopup } = useAuthStore();
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHomePage = pathname === "/" || pathname === "" || pathname === null;
  const isAutoConsultantPage = pathname?.startsWith("/auto-consultant");

  const [inFlutterApp, setInFlutterApp] = useState(false);

  useEffect(() => {
    if (checkIsFlutterApp()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInFlutterApp(true);
    }
  }, [pathname, searchParams]);

  /* ================= BANNER STATES & UI STATES ================= */
  const { isMobileBannerVisible, hideMobileBanner, isMobileBannerTempHidden, setIsSearchDropdownOpen, setIsAccountPopupOpen } =
    useUIStore();

  // Sync account popup state
  useEffect(() => {
    if (setIsAccountPopupOpen) {
      setIsAccountPopupOpen(accountOpen);
    }
  }, [accountOpen, setIsAccountPopupOpen]);

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

  /* ================= SIGNUP POPUP LISTENER ================= */
  useEffect(() => {
    const handler = () => {
      setAccountOpen(false);
      setPersisAccountOpen(false);
    };

  }, []);

  /* ================= PREFERENCES POPUP LISTENER ================= */
  useEffect(() => {
    const handler = () => {
      setOpen(true);
    };
    document.addEventListener("preferencespopup:open", handler);
    return () => document.removeEventListener("preferencespopup:open", handler);
  }, []);

  /* ================= CLICK OUTSIDE CLOSE ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {

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
      <div
        className="fixed top-0 inset-x-0 z-[1100] transition-transform duration-300 pointer-events-none"
      // style={{ transform: `translateY(${transformY}px)` }}
      >
        {!inFlutterApp &&
          isMobileBannerVisible &&
          !isMobileBannerTempHidden &&
          atTop &&
          !isAutoConsultantPage && (
            <div className="pointer-events-auto">
              <MobileAppDownloadBanner onClose={hideMobileBanner} />
            </div>
          )}

        {/* ================= TOP MINI BAR (CITY SELECTOR - HOME ONLY) ================= */}
        {!insideDrawer && isHomePage && !menuOpen && (
          <div className={`pointer-events-auto w-full transition-all duration-300 ${heroMode && !scrolled
              ? 'bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl border-b border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.3)] text-white'
              : 'bg-secondary/95 backdrop-blur-md text-primary border-b border-white/10 shadow-xs'
            }`}>
            <div className="w-full px-2.5 sm:px-4 md:px-6 lg:px-8 mx-auto h-7 sm:h-8 flex items-center justify-between">
              <div className="flex items-center">
                <CitySelector heroMode={heroMode} scrolled={scrolled} />
              </div>
            </div>
          </div>
        )}

        <nav
          className={`pointer-events-auto transition-all duration-300 relative w-full
          ${menuOpen
              ? "bg-secondary text-primary border-b border-white/10 shadow-xs h-16"
              : heroMode
                ? scrolled
                  ? "bg-white text-black shadow-xl backdrop-blur-lg h-16"
                  : "bg-transparent text-secondary h-20 md:h-24"
                : "bg-primary text-secondary h-16"
            }`}
        >
          <div className="relative w-full px-2.5 sm:px-4 md:px-6 lg:px-8 mx-auto h-full flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center">
              <Link
                href="/"
                onClick={insideDrawer ? onClose : (menuOpen ? () => setMenuOpen(false) : undefined)}
                className={`flex items-center px-2.5 sm:px-4 md:px-5 gap-2 sm:gap-3 transition-all duration-500 ease-in-out ${menuOpen
                    ? "h-10 md:h-11 bg-white/10 rounded-full text-white border border-white/20"
                    : heroMode && !scrolled
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
                <div className="flex flex-col items-start justify-center">
                  <Image
                    src="/logo/logo.webp"
                    alt="Reecomm Logo"
                    width={120}
                    height={24}
                    className="h-5 md:h-6 w-auto object-contain block"
                  />
                  <span className="text-[7px] font-medium opacity-60 uppercase tracking-wider pl-0.5 mt-0.5">
                    Product by Quba Infotech
                  </span>
                </div>
              </Link>
            </div>

            {/* ================= CENTER SEARCH ================= */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 z-50 ${menuOpen ? "hidden" : "hidden lg:flex"}`}
            >
              <NavbarSearch heroMode={heroMode} scrolled={scrolled} />
            </div>

            {/* RIGHT SIDE */}
            <div className={`flex items-center gap-2 md:gap-4 ${menuOpen ? "hidden" : ""}`}>
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
                            "UPLOAD_DRIVING_LICENSE",
                            "UPLOAD_VOTER_ID",
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
                          className={`hidden md:block text-xs xl:text-sm whitespace-nowrap transition-all duration-500 ease-in-out ${heroMode && !scrolled
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
                              href="/become-consultant"
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

                            {!isLoggedIn && (
                              <button
                                onClick={() => {
                                  setSellDropdownOpen(false);
                                  openLoginPopup({
                                    entry_context: "home",
                                    trigger_action: "login_click",
                                    user_role_intent: "buyer",
                                  });
                                }}
                                className="px-4 py-4 flex items-center justify-between gap-4 group hover:bg-white/5 transition-colors w-full text-left cursor-pointer"
                              >
                                <div className="flex items-start gap-3">
                                  <User className="w-5 h-5 text-third shrink-0 mt-0.5" />
                                  <div className="flex flex-col">
                                    <span className="text-[14px] font-semibold text-primary group-hover:text-third transition-colors whitespace-nowrap">
                                      Continue as Buyer
                                    </span>
                                    <span className="text-[11px] text-primary/60 font-medium whitespace-nowrap mt-0.5">
                                      Login to buy your next car
                                    </span>
                                  </div>
                                </div>
                                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-third transition-all shrink-0" />
                              </button>
                            )}

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
                      className={`flex cursor-pointer items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-full transition-all outline outline-2 outline-transparent text-xs xl:text-sm
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
                          {user?.firstname && /^\d/.test(user.firstname.charAt(0)) ? (
                            <User className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          ) : (
                            <>
                              {user?.firstname?.charAt(0)?.toUpperCase() || ""}
                              {user?.lastname?.charAt(0)?.toUpperCase() || ""}
                            </>
                          )}
                        </div>
                      )}

                      <span className="block text-left">
                        <span className="block text-[10px] opacity-60">
                          {!isLoggedIn ? (
                            <span className="font-bold">Sign in</span>
                          ) : (
                            <span className="font-bold block truncate max-w-[115px] sm:max-w-[130px] lg:max-w-[95px] capitalize">
                              Hello, {user?.consultationName || (user?.firstname && /^\d/.test(user.firstname.charAt(0)) ? "User" : user?.firstname)}
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
