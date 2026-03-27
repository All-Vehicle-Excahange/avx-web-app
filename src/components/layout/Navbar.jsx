"use client";
import { Menu, Search, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Button from "../ui/button";
import HamburgerDrawer from "../features/home/HamburgerDrawer";
import AccountPopup from "../features/home/AccountPopup";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import PreferencesPopup from "../features/user/PreferencesPopup";
import { getGlobalSearch } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/stores/useUIStore";
import MobileAppDownloadBanner from "../ui/MobileAppDownloadBanner";

export default function Navbar({ heroMode = false, scrolled = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);

  const { user, isLoggedIn } = useAuthStore();
  const router = useRouter();

  /* ================= SEARCH STATES ================= */
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  /* ================= BANNER STATES ================= */
  const { isMobileBannerVisible, hideMobileBanner, isMobileBannerTempHidden } = useUIStore();
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
      if (bannerRef.current && isMobileBannerVisible && !isMobileBannerTempHidden) {
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

  /* ================= SIGNUP POPUP LISTENER ================= */
  useEffect(() => {
    const handler = () => setAccountOpen(false);
    document.addEventListener("signuppopup:open", handler);
    return () => document.removeEventListener("signuppopup:open", handler);
  }, []);

  /* ================= DEBOUNCED SEARCH ================= */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowDropdown(false);
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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div
        className="fixed top-0 inset-x-0 z-[1100] transition-transform duration-300 pointer-events-none"
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
              <img src="/logo/logo.webp" alt="Reecomm Logo" className="h-6 md:h-6 w-auto object-contain block" />
            </Link>

            {/* ================= CENTER SEARCH ================= */}
            {heroMode && scrolled && (
              <div
                ref={searchRef}
                className="absolute left-1/2 -translate-x-1/2 hidden lg:flex"
              >
                <div className="relative flex items-center h-12 w-[420px] xl:w-[520px] rounded-full px-6 bg-secondary/10 border border-gray-200">
                  <Search className="w-4 h-4 mr-3 text-gray-600" />

                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowDropdown(true)}
                    className="w-full bg-transparent focus:outline-none text-black placeholder:text-gray-400 text-sm"
                    placeholder="Search vehicles, brands..."
                  />

                  <div className="ml-auto p-2 rounded-full bg-primary text-secondary">
                    <Search size={14} />
                  </div>

                  {showDropdown && (
                    <div className="absolute top-14 left-0 w-full bg-white shadow-2xl rounded-xl border max-h-80 overflow-y-auto z-50">
                      {results.map((item, index) => (
                        <div
                          key={item.id || index}
                          className="p-3 hover:bg-gray-100 cursor-pointer text-xs transition border-b"
                        >
                          <pre className="whitespace-pre-wrap break-all">
                            {JSON.stringify(item, null, 2)}
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-2 md:gap-4">
              <Button
                onClick={() => setOpen(true)}
                size="sm"
                className="text-xs md:text-sm text-primary border border-primary hover:bg-primary hover:text-secondary"
              >
                Sell Your Vehicle
              </Button>

              {/* ACCOUNT */}
              <div
                className="relative z-[110]"
                onMouseEnter={() => setAccountOpen(true)}
                onMouseLeave={() => setAccountOpen(false)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAccountOpen(!accountOpen);
                  }}
                  className={`flex cursor-pointer items-center gap-1 px-2 py-1 rounded transition text-xs md:text-sm
                ${heroMode && !scrolled
                      ? "text-white hover:outline hover:outline-2 hover:outline-white/40"
                      : "text-black hover:outline hover:outline-2 hover:outline-black/20"
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
                  onClosePopup={() => setAccountOpen(false)}
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