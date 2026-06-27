"use client";

import { CheckCircle2, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import Navbar from "@/components/layout/Navbar";

export default function HamburgerDrawer({ open, onClose }) {
  const { isLoggedIn, user, openLoginPopup, openSignupPopup, logout } =
    useAuthStore();

  const [hoveredTab, setHoveredTab] = useState(null);

  // close on Esc key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Determine user role details
  const isConsultant =
    isLoggedIn &&
    ["CONSULTATION", "CONSULTANT_APPLICANT"].includes(user?.userRole);
  const isUserSeller = isLoggedIn && user?.userRole === "USER_SELLER";

  const welcomeName = isLoggedIn
    ? user?.consultationName || user?.firstname || "User"
    : "Guest";

  const getSellVehicleLink = () => {
    if (!isLoggedIn) return "/became-seller";
    if (isConsultant) return "/consult/dashboard/inventory";
    return "/user/details/myvehicle";
  };

  const handleSignInClick = () => {
    onClose();
    openLoginPopup();
  };

  const handleRegisterClick = () => {
    onClose();
    openSignupPopup();
  };

  const handleLogoutClick = () => {
    logout();
    onClose();
  };

  return (
    <div
      aria-hidden={!open}
      className={`
        fixed inset-0 z-[1090] bg-secondary text-primary
        transform transition-all duration-500 ease-out 3xl:max-w-full 3xl:mx-auto
        ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}
      `}
    >
      {/* DRAWER SCROLL CONTAINER */}
      <div className="h-[calc(100vh-64px)] mt-16 overflow-y-auto no-scrollbar custom-scrollbar">
        {/* 5-COLUMN MEGA MENU CONTENT */}
        <div className="w-full px-8 md:px-12 pt-16 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10 min-h-[450px]">
            {/* 1. LEFT MENU (3 cols) */}
            <div className="lg:col-span-3 border-r border-white/10 pr-4 lg:pr-8 flex flex-col gap-8 text-left">
              {/* DISCOVER */}
              <div>
                <span className="text-[11px] uppercase font-black tracking-widest text-primary/50 mb-3.5 block">
                  DISCOVER
                </span>
                <div className="space-y-2 flex flex-col">
                  <TabItem
                    id="browse"
                    label="Browse Vehicles"
                    hoveredTab={hoveredTab}
                    setHoveredTab={setHoveredTab}
                    href="/search/buy-used-cars"
                    onClose={onClose}
                  />
                  <TabItem
                    id="trending"
                    label="Trending Vehicles"
                    hoveredTab={hoveredTab}
                    setHoveredTab={setHoveredTab}
                    href="/search/buy-used-cars?sort=trending"
                    onClose={onClose}
                  />
                  <TabItem
                    id="picks"
                    label="Top Picks For You"
                    hoveredTab={hoveredTab}
                    setHoveredTab={setHoveredTab}
                    href="/search/buy-used-cars?sort=recommended"
                    onClose={onClose}
                  />
                </div>
              </div>

              {/* BUYER TOOLS */}
              <div>
                <span className="text-[11px] uppercase font-black tracking-widest text-primary/50 mb-3.5 block">
                  BUYER TOOLS
                </span>
                <div className="space-y-2 flex flex-col">
                  <TabItem
                    id="compare"
                    label="Compare Vehicles"
                    hoveredTab={hoveredTab}
                    setHoveredTab={setHoveredTab}
                    href="/compare"
                    onClose={onClose}
                  />
                  <TabItem
                    id="wishlist"
                    label="Wishlist (Login Required)"
                    hoveredTab={hoveredTab}
                    setHoveredTab={setHoveredTab}
                    href="/user/details/wishlist"
                    onClose={onClose}
                  />
                </div>
              </div>

              {/* SELL */}
              <div>
                <span className="text-[11px] uppercase font-black tracking-widest text-primary/50 mb-3.5 block">
                  SELL
                </span>
                <div className="space-y-2 flex flex-col">
                  <TabItem
                    id="sell"
                    label="Sell Your Vehicle"
                    hoveredTab={hoveredTab}
                    setHoveredTab={setHoveredTab}
                    href={getSellVehicleLink()}
                    onClose={onClose}
                  />
                  <TabItem
                    id="inspect"
                    label="Get Vehicle Inspected"
                    hoveredTab={hoveredTab}
                    setHoveredTab={setHoveredTab}
                    href="/inspection-request"
                    onClose={onClose}
                  />
                  <TabItem
                    id="consult"
                    label="Become a Consultant"
                    hoveredTab={hoveredTab}
                    setHoveredTab={setHoveredTab}
                    href="/consult"
                    onClose={onClose}
                  />
                </div>
              </div>
            </div>

            {/* 2. MIDDLE DYNAMIC CONTENT (5 cols) */}
            <div className="lg:col-span-5 border-r border-white/10 px-0 lg:px-4 pr-4 lg:pr-8">
              {hoveredTab === "browse" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 fade-in-fast">
                  <div className="space-y-8">
                    <div>
                      <span className="text-[11px] uppercase font-black tracking-widest text-primary mb-3.5 block">
                        Browse Vehicles
                      </span>
                      <div className="space-y-2 flex flex-col">
                        <MenuLink
                          href="/search/buy-used-cars"
                          onClick={onClose}
                        >
                          Used Cars
                        </MenuLink>
                        <MenuLink
                          href="/search?vehicleType=2 Wheeler"
                          onClick={onClose}
                        >
                          Used Bikes
                        </MenuLink>
                        <MenuLink
                          href="/search?vehicleType=4 Wheeler&bodyType=truck"
                          onClick={onClose}
                        >
                          Used Trucks
                        </MenuLink>
                        <MenuLink
                          href="/search/buy-used-cars?fuelType=Electric"
                          onClick={onClose}
                        >
                          Used EVs
                        </MenuLink>
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase font-black tracking-widest text-primary mb-3.5 block">
                        Browse by Brand
                      </span>
                      <div className="space-y-2 flex flex-col">
                        <MenuLink
                          href="/search/buy-used-maruti-suzuki-cars"
                          onClick={onClose}
                        >
                          Maruti Suzuki
                        </MenuLink>
                        <MenuLink
                          href="/search/buy-used-hyundai-cars"
                          onClick={onClose}
                        >
                          Hyundai
                        </MenuLink>
                        <MenuLink
                          href="/search/buy-used-tata-cars"
                          onClick={onClose}
                        >
                          Tata
                        </MenuLink>
                        <MenuLink
                          href="/search/buy-used-mahindra-cars"
                          onClick={onClose}
                        >
                          Mahindra
                        </MenuLink>
                        <MenuLink
                          href="/search/buy-used-honda-cars"
                          onClick={onClose}
                        >
                          Honda
                        </MenuLink>
                        <MenuLink
                          href="/search/buy-used-toyota-cars"
                          onClick={onClose}
                        >
                          Toyota
                        </MenuLink>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <span className="text-[11px] uppercase font-black tracking-widest text-primary mb-3.5 block">
                        Browse by Budget
                      </span>
                      <div className="space-y-2 flex flex-col">
                        <MenuLink
                          href="/search/buy-used-cars?budget=0-3"
                          onClick={onClose}
                        >
                          Under ₹3L
                        </MenuLink>
                        <MenuLink
                          href="/search/buy-used-cars?budget=0-5"
                          onClick={onClose}
                        >
                          Under ₹5L
                        </MenuLink>
                        <MenuLink
                          href="/search/buy-used-cars?budget=0-10"
                          onClick={onClose}
                        >
                          Under ₹10L
                        </MenuLink>
                        <MenuLink
                          href="/search/buy-used-cars?budget=50-200"
                          onClick={onClose}
                        >
                          Luxury Cars
                        </MenuLink>
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase font-black tracking-widest text-primary mb-3.5 block">
                        Browse by Fuel
                      </span>
                      <div className="space-y-2 flex flex-col">
                        <MenuLink
                          href="/search/buy-used-cars?fuelType=Petrol"
                          onClick={onClose}
                        >
                          Petrol
                        </MenuLink>
                        <MenuLink
                          href="/search/buy-used-cars?fuelType=Diesel"
                          onClick={onClose}
                        >
                          Diesel
                        </MenuLink>
                        <MenuLink
                          href="/search/buy-used-cars?fuelType=Electric"
                          onClick={onClose}
                        >
                          Electric
                        </MenuLink>
                        <MenuLink
                          href="/search/buy-used-cars?fuelType=Hybrid"
                          onClick={onClose}
                        >
                          Hybrid
                        </MenuLink>
                        <MenuLink
                          href="/search/buy-used-cars?fuelType=CNG"
                          onClick={onClose}
                        >
                          CNG
                        </MenuLink>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {hoveredTab === "consult" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 fade-in-fast">
                  <div className="space-y-8">
                    <div>
                      <span className="text-[11px] uppercase font-black tracking-widest text-primary mb-3.5 block">
                        Find Consultants
                      </span>
                      <div className="space-y-2 flex flex-col">
                        <MenuLink href="/consult/discovery" onClick={onClose}>
                          All Consultants
                        </MenuLink>
                        <MenuLink
                          href="/consult/discovery?sort=recommended"
                          onClick={onClose}
                        >
                          Premium Consultants
                        </MenuLink>
                        <MenuLink
                          href="/consult/discovery?sort=subscribers_high_low"
                          onClick={onClose}
                        >
                          Verified Consultants
                        </MenuLink>
                        <MenuLink
                          href="/consult/discovery?service=AVX_Inspected_Specialists"
                          onClick={onClose}
                        >
                          Reecomm Inspected Specialists
                        </MenuLink>
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase font-black tracking-widest text-primary mb-3.5 block">
                        Browse by City
                      </span>
                      <div className="space-y-2 flex flex-col">
                        <MenuLink
                          href="/consult/discovery?location=Ahmedabad"
                          onClick={onClose}
                        >
                          Ahmedabad Consultants
                        </MenuLink>
                        <MenuLink
                          href="/consult/discovery?location=Surat"
                          onClick={onClose}
                        >
                          Surat Consultants
                        </MenuLink>
                        <MenuLink
                          href="/consult/discovery?location=Vadodara"
                          onClick={onClose}
                        >
                          Vadodara Consultants
                        </MenuLink>
                        <MenuLink
                          href="/consult/discovery?location=Mumbai"
                          onClick={onClose}
                        >
                          Mumbai Consultants
                        </MenuLink>
                        <MenuLink
                          href="/consult/discovery?location=Delhi"
                          onClick={onClose}
                        >
                          Delhi Consultants
                        </MenuLink>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <span className="text-[11px] uppercase font-black tracking-widest text-primary mb-3.5 block">
                        Browse by Category
                      </span>
                      <div className="space-y-2 flex flex-col">
                        <MenuLink
                          href="/consult/discovery?service=SUV_Specialists"
                          onClick={onClose}
                        >
                          SUV Specialists
                        </MenuLink>
                        <MenuLink
                          href="/consult/discovery?service=Luxury_Car_Specialists"
                          onClick={onClose}
                        >
                          Luxury Car Specialists
                        </MenuLink>
                        <MenuLink
                          href="/consult/discovery?service=Commercial_Vehicle_Specialists"
                          onClick={onClose}
                        >
                          Commercial Vehicle Specialists
                        </MenuLink>
                        <MenuLink
                          href="/consult/discovery?service=EV_Specialists"
                          onClick={onClose}
                        >
                          EV Specialists
                        </MenuLink>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {hoveredTab === "sell" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 fade-in-fast">
                  <div className="space-y-8">
                    <div>
                      <span className="text-[11px] uppercase font-black tracking-widest text-primary mb-3.5 block">
                        Sell With Reecomm
                      </span>
                      <div className="space-y-2 flex flex-col">
                        <MenuLink href={getSellVehicleLink()} onClick={onClose}>
                          Sell Your Vehicle
                        </MenuLink>
                        <MenuLink href="/inspection-request" onClick={onClose}>
                          Get Vehicle Inspection
                        </MenuLink>
                        <MenuLink href="/consult" onClick={onClose}>
                          Become Consultant
                        </MenuLink>
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase font-black tracking-widest text-primary mb-3.5 block">
                        Consultant Program
                      </span>
                      <div className="space-y-2 flex flex-col">
                        <MenuLink href="/consult/pricing" onClick={onClose}>
                          Pricing Plans
                        </MenuLink>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <span className="text-[11px] uppercase font-black tracking-widest text-primary mb-3.5 block">
                        Why Sell With Reecomm
                      </span>
                      <div className="space-y-3.5 mt-2">
                        <ValuePropItem
                          text="Verified Marketplace"
                          href="/why-chose-us"
                          onClick={onClose}
                        />
                        <ValuePropItem
                          text="Inspection Support"
                          href="/inspection-process"
                          onClick={onClose}
                        />
                        <ValuePropItem
                          text="High Intent Buyers"
                          href="/aboutus"
                          onClick={onClose}
                        />
                        <ValuePropItem
                          text="Premium Visibility"
                          href="/why-chose-us"
                          onClick={onClose}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Default view when nothing specific is hovered */}
              {(!hoveredTab ||
                !["browse", "consult", "sell"].includes(hoveredTab)) && (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-4 fade-in-fast">
                  <h3 className="text-xl md:text-2xl font-medium text-primary">
                    Trusted by 10,000+ Dealers
                  </h3>
                  <p className="text-sm text-third max-w-md">
                    Reecomm is India's fastest growing verified automotive
                    marketplace.
                  </p>
                </div>
              )}
            </div>

            {/* 3. RIGHT FIXED COLUMNS (4 cols) */}
            <div className="lg:col-span-4 pl-0 lg:pl-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* RESOURCES */}
              <div>
                <span className="text-[11px] uppercase font-black tracking-widest text-primary mb-3.5 block">
                  Resources
                </span>
                <div className="space-y-2 flex flex-col">
                  <MenuLink href="/aboutus" onClick={onClose}>
                    About Reecomm
                  </MenuLink>
                  <MenuLink href="/reecomm-works" onClick={onClose}>
                    How Reecomm Works
                  </MenuLink>
                  <MenuLink href="/why-chose-us" onClick={onClose}>
                    Why Choose Reecomm
                  </MenuLink>
                  <MenuLink href="/inspection-process" onClick={onClose}>
                    Inspection Process
                  </MenuLink>
                  <MenuLink href="/safety-transparency" onClick={onClose}>
                    Safety & Transparency
                  </MenuLink>
                  <MenuLink href="/help" onClick={onClose}>
                    Help Center
                  </MenuLink>
                  <MenuLink href="/contactus" onClick={onClose}>
                    Contact Us
                  </MenuLink>
                  <MenuLink href="/blog" onClick={onClose}>
                    Blog
                  </MenuLink>
                </div>
              </div>

              {/* MY ACCOUNT */}
              <div>
                <span className="text-[11px] uppercase font-black tracking-widest text-primary mb-3.5 block">
                  My Account
                </span>
                <div className="space-y-2 flex flex-col">
                  {!isLoggedIn ? (
                    <>
                      <button
                        onClick={handleSignInClick}
                        className="block text-left text-sm text-third hover:text-primary transition-all duration-200 transform hover:translate-x-1 py-1"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={handleRegisterClick}
                        className="block text-left text-sm text-third hover:text-primary transition-all duration-200 transform hover:translate-x-1 py-1"
                      >
                        Register
                      </button>
                      <MenuLink href="/became-seller" onClick={onClose}>
                        Sell Vehicle
                      </MenuLink>
                      <MenuLink href="/consult" onClick={onClose}>
                        Become Consultant
                      </MenuLink>
                    </>
                  ) : isConsultant ? (
                    <>
                      <MenuLink
                        href="/consult/dashboard/overview"
                        onClick={onClose}
                      >
                        Dashboard
                      </MenuLink>
                      <MenuLink
                        href="/consult/dashboard/inventory"
                        onClick={onClose}
                      >
                        Inventory
                      </MenuLink>
                      <MenuLink
                        href="/consult/dashboard/inquiries"
                        onClick={onClose}
                      >
                        Inquiries
                      </MenuLink>
                      <MenuLink
                        href="/consult/dashboard/storefront"
                        onClick={onClose}
                      >
                        Storefront
                      </MenuLink>
                      <MenuLink
                        href="/consult/dashboard/analytics"
                        onClick={onClose}
                      >
                        Analytics
                      </MenuLink>
                      <MenuLink
                        href="/consult/dashboard/billing"
                        onClick={onClose}
                      >
                        Billing
                      </MenuLink>
                    </>
                  ) : (
                    <>
                      <MenuLink
                        href="/user/details/myprofile"
                        onClick={onClose}
                      >
                        My Activity
                      </MenuLink>
                      <MenuLink href="/user/details/wishlist" onClick={onClose}>
                        Saved Vehicles
                      </MenuLink>
                      <MenuLink href="/compare" onClick={onClose}>
                        Compare Vehicles
                      </MenuLink>
                      <MenuLink
                        href="/user/details/inquaries"
                        onClick={onClose}
                      >
                        Inquiries
                      </MenuLink>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM SEO STRIP */}
          <div className="mt-12 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <span>Popular Searches</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span>Trending Brands</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span>Quick Actions</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10">
              {/* Popular Searches */}
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary mb-3 block">
                  Popular Searches
                </span>
                <div className="space-y-1.5 flex flex-col">
                  <MenuLink
                    href="/search/buy-used-cars-ahmedabad"
                    onClick={onClose}
                    compact
                  >
                    Used Cars in Ahmedabad
                  </MenuLink>
                  <MenuLink
                    href="/search/buy-used-cars-surat"
                    onClick={onClose}
                    compact
                  >
                    Used Cars in Surat
                  </MenuLink>
                  <MenuLink
                    href="/search/buy-used-cars-vadodara"
                    onClick={onClose}
                    compact
                  >
                    Used Cars in Vadodara
                  </MenuLink>
                  <MenuLink
                    href="/search/buy-used-cars-ahmedabad?bodyType=suv"
                    onClick={onClose}
                    compact
                  >
                    Used SUVs in Ahmedabad
                  </MenuLink>
                  <MenuLink
                    href="/search/buy-used-cars-ahmedabad?budget=50-200"
                    onClick={onClose}
                    compact
                  >
                    Used Luxury Cars in Ahmedabad
                  </MenuLink>
                </div>
              </div>

              {/* Popular Brands */}
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary mb-3 block">
                  Popular Brands
                </span>
                <div className="space-y-1.5 flex flex-col">
                  <MenuLink
                    href="/search/buy-used-tata-cars"
                    onClick={onClose}
                    compact
                  >
                    Used Tata Cars
                  </MenuLink>
                  <MenuLink
                    href="/search/buy-used-hyundai-cars"
                    onClick={onClose}
                    compact
                  >
                    Used Hyundai Cars
                  </MenuLink>
                  <MenuLink
                    href="/search/buy-used-mahindra-cars"
                    onClick={onClose}
                    compact
                  >
                    Used Mahindra Cars
                  </MenuLink>
                  <MenuLink
                    href="/search/buy-used-toyota-cars"
                    onClick={onClose}
                    compact
                  >
                    Used Toyota Cars
                  </MenuLink>
                  <MenuLink
                    href="/search/buy-used-bmw-cars"
                    onClick={onClose}
                    compact
                  >
                    Used BMW Cars
                  </MenuLink>
                </div>
              </div>

              {/* Popular Categories */}
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary mb-3 block">
                  Popular Categories
                </span>
                <div className="space-y-1.5 flex flex-col">
                  <MenuLink
                    href="/search?bodyType=suv"
                    onClick={onClose}
                    compact
                  >
                    SUVs
                  </MenuLink>
                  <MenuLink
                    href="/search?bodyType=sedan"
                    onClick={onClose}
                    compact
                  >
                    Sedans
                  </MenuLink>
                  <MenuLink
                    href="/search?bodyType=hatchback"
                    onClick={onClose}
                    compact
                  >
                    Hatchbacks
                  </MenuLink>
                  <MenuLink
                    href="/search?budget=50-200"
                    onClick={onClose}
                    compact
                  >
                    Luxury Cars
                  </MenuLink>
                  <MenuLink
                    href="/search?fuelType=Electric"
                    onClick={onClose}
                    compact
                  >
                    Electric Cars
                  </MenuLink>
                </div>
              </div>
            </div>
          </div>

          {/* EXPLORE VEHICLES BY CITY (MOST IMPORTANT SEO BLOCK) */}
          <div className="mt-8 space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary block">
              Explore Vehicles by City
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {EXPLORE_CITIES.map((city, idx) => (
                <div key={idx} className="flex items-center">
                  <Link
                    href={city.href}
                    onClick={onClose}
                    className="text-xs text-third hover:text-primary transition-colors font-medium flex items-center gap-1.5 group"
                  >
                    <span>{city.label}</span>
                    <ChevronRight
                      size={10}
                      className="text-third/30 group-hover:text-primary transition-colors"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* SUBCOMPONENTS / HELPERS */

const MenuLink = ({ href, children, onClick, compact }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block text-left text-third hover:text-primary transition-all duration-200 transform hover:translate-x-1 ${
        compact ? "text-xs py-0.5" : "text-sm py-1"
      }`}
    >
      {children}
    </Link>
  );
};

const TabItem = ({ id, label, hoveredTab, setHoveredTab, href, onClose }) => {
  return (
    <Link
      href={href}
      onClick={onClose}
      onMouseEnter={() => setHoveredTab(id)}
      className={`block text-left transition-all duration-200 transform py-1 text-sm ${
        hoveredTab === id
          ? "text-primary translate-x-1 font-medium"
          : "text-third hover:text-primary hover:translate-x-1"
      }`}
    >
      {label}
    </Link>
  );
};

const ValuePropItem = ({ text, href, onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2 group cursor-pointer"
    >
      <CheckCircle2 className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary transition-colors shrink-0" />
      <span className="text-xs text-third group-hover:text-primary transition-colors">
        {text}
      </span>
    </Link>
  );
};

const EXPLORE_CITIES = [
  { label: "Ahmedabad", href: "/search/buy-used-cars-ahmedabad" },
  { label: "Surat", href: "/search/buy-used-cars-surat" },
  { label: "Vadodara", href: "/search/buy-used-cars-vadodara" },
  { label: "Rajkot", href: "/search/buy-used-cars-rajkot" },
  { label: "Mumbai", href: "/search/buy-used-cars-mumbai" },
  { label: "Delhi", href: "/search/buy-used-cars-delhi" },
  { label: "Pune", href: "/search/buy-used-cars-pune" },
  { label: "Bangalore", href: "/search/buy-used-cars-bangalore" },
  { label: "Hyderabad", href: "/search/buy-used-cars-hyderabad" },
  { label: "Chennai", href: "/search/buy-used-cars-chennai" },
];
