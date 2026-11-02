import React, { useEffect, useState, useMemo, useRef } from "react";
import DiwaliVehicleCard from "@/components/ui/const/DiwaliVehicleCard";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";
import { getOfferVehicles } from "@/services/vehicle.service";
import DiwaliFirecrackerCanvas from "@/components/features/home/DiwaliFirecrackerCanvas";
import {
  Sparkles,
  Flame,
  Search,
  Filter,
  Car,
  Bike,
  Layers,
  ArrowUpDown,
  RotateCcw,
  Check,
} from "lucide-react";

const BUDGET_RANGES = [
  { id: "all", label: "All Budgets", min: 0, max: Infinity },
  { id: "under-3", label: "Under ₹3 Lakh", min: 0, max: 300000 },
  { id: "3-6", label: "₹3L - ₹6 Lakh", min: 300000, max: 600000 },
  { id: "6-10", label: "₹6L - ₹10 Lakh", min: 600000, max: 1000000 },
  { id: "above-10", label: "₹10 Lakh+", min: 1000000, max: Infinity },
];

const SORT_OPTIONS = [
  { id: "default", label: "Featured Deals" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "year-desc", label: "Year: Newest First" },
];

const DiwaliOffersExplore = () => {
  const [allFetchedVehicles, setAllFetchedVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalElements, setTotalElements] = useState(0);

  // Filters state
  const [selectedType, setSelectedType] = useState("ALL"); // ALL | FOUR_WHEELER | TWO_WHEELER
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  const cardsContainerRef = useRef(null);

  // Fetch offer vehicles
  const fetchVehicles = async (page) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const res = await getOfferVehicles({ pageNo: page, size: 16 });

      const list = Array.isArray(res?.data?.vehicles)
        ? res.data.vehicles
        : Array.isArray(res?.data?.content)
          ? res.data.content
          : Array.isArray(res?.data)
            ? res.data
            : [];

      const total = res?.pageResponse?.totalElements || res?.pagination?.total || list.length;
      const totalPages = res?.pageResponse?.totalPages || 1;

      setTotalElements(total);
      setHasMore(page < totalPages && list.length > 0);

      setAllFetchedVehicles((prev) => (page === 1 ? list : [...prev, ...list]));
    } catch (error) {
      console.error("Error fetching Diwali offers:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchVehicles(1);
  }, []);

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    const nextPage = pageNo + 1;
    setPageNo(nextPage);
    fetchVehicles(nextPage);
  };

  const handleResetFilters = () => {
    setSelectedType("ALL");
    setSelectedBudget("all");
    setSortBy("default");
    setSearchQuery("");
  };

  // Filter & sort logic
  const filteredVehicles = useMemo(() => {
    let result = [...allFetchedVehicles];

    // 1. Vehicle Type filter
    if (selectedType !== "ALL") {
      result = result.filter((item) => {
        const vt = String(item.vehicleType || "").toUpperCase();
        return vt === selectedType;
      });
    }

    // 2. Budget filter
    const budgetConfig = BUDGET_RANGES.find((b) => b.id === selectedBudget);
    if (budgetConfig && budgetConfig.id !== "all") {
      result = result.filter((item) => {
        const price = Number(item.price || item.displayPrice || 0);
        return price >= budgetConfig.min && price <= budgetConfig.max;
      });
    }

    // 3. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((item) => {
        const maker = String(item.makerName || "").toLowerCase();
        const model = String(item.modelName || "").toLowerCase();
        const variant = String(item.variantName || "").toLowerCase();
        const city = String(item.address?.city || "").toLowerCase();
        return maker.includes(q) || model.includes(q) || variant.includes(q) || city.includes(q);
      });
    }

    // 4. Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    } else if (sortBy === "year-desc") {
      result.sort((a, b) => Number(b.yearOfMfg || 0) - Number(a.yearOfMfg || 0));
    }

    return result;
  }, [allFetchedVehicles, selectedType, selectedBudget, searchQuery, sortBy]);

  const activeFiltersCount =
    (selectedType !== "ALL" ? 1 : 0) +
    (selectedBudget !== "all" ? 1 : 0) +
    (sortBy !== "default" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="w-full relative min-h-screen pt-20 sm:pt-24 md:pt-28 pb-16">
      
      {/* --- HERO BANNER SECTION --- */}
      <div className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#140F0A] via-[#0E0B09] to-[#0A0908] border border-[#F59E0B]/35 shadow-[0_12px_40px_rgba(245,158,11,0.12),0_4px_20px_rgba(0,0,0,0.8)] mb-8 md:mb-12">
        {/* Real-time Simultaneous Firecracker Canvas Animation */}
        <DiwaliFirecrackerCanvas className="z-15" />

        {/* Festive Hanging String Lights & Lanterns Across Top */}
        <div className="absolute top-0 left-0 right-0 h-[260px] sm:h-[320px] md:h-[380px] pointer-events-none z-0 overflow-hidden select-none">
          <img
            src="/images/diwali/diwali-festive-frame.jpg"
            alt="Diwali Decorative Lights and Lanterns"
            className="w-full h-full object-cover object-top mix-blend-screen filter brightness-115 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0908]/95" />
        </div>

        {/* Festive Rangoli & Golden Embers Background Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20 select-none">
          <img
            src="/images/diwali/diwali-overlay-bg.jpg"
            alt="Diwali Decorative Background Pattern"
            className="w-full h-full object-cover mix-blend-screen"
          />
        </div>

        {/* Radiant Golden Light Flare Burst Ambient Accent */}
        <div className="absolute top-6 left-1/3 w-56 h-56 pointer-events-none z-0 overflow-hidden opacity-35 select-none mix-blend-screen">
          <img
            src="/images/diwali/diwali-light-burst.jpg"
            alt="Festive Golden Glow"
            className="w-full h-full object-contain animate-pulse"
          />
        </div>

        {/* Ambient Warm Golden & Amber Glow Orbs */}
        <div className="absolute top-1/4 -left-16 w-80 h-80 bg-[#FB923C]/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-16 w-96 h-96 bg-[#FDE047]/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 pt-8 sm:pt-12 pb-8 sm:pb-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          
          {/* Left Column: Heading and Tagline */}
          <div className="flex-1 flex flex-col items-start gap-2.5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-[#FB923C]/40 backdrop-blur-md shadow-[0_0_12px_rgba(251,146,60,0.2)]">
              <Flame className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#FDE047]">
                DIWALI DHAMAKA OFFERS 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Shubh Deepawali,{" "}
              <span className="bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#FB923C] bg-clip-text text-transparent">
                Shubh Muhurat Deals
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 max-w-xl font-normal leading-relaxed">
              Bring home your dream car or bike this auspicious festive season. Handpicked verified inventory with festive exchange bonuses and immediate paperwork.
            </p>

            {/* Live Count Pill */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/60 border border-[#FB923C]/30 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#FDE047] animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-[#FDE047]">
                  {totalElements > 0 ? `${totalElements} Festive Deals Available` : "Exclusive Festive Deals"}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/60 border border-[#FB923C]/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs sm:text-sm font-semibold text-zinc-200">
                  100% Inspected &amp; Verified
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Festive Artwork Showcase Card */}
          <div className="w-full md:w-[420px] lg:w-[480px] shrink-0 relative rounded-2xl overflow-hidden border border-[#FB923C]/35 shadow-[0_8px_30px_rgba(251,146,60,0.15)] group">
            <div className="relative w-full h-[200px] sm:h-[240px] md:h-[260px] overflow-hidden">
              <img
                src="/images/diwali/diwali-hero-banner.jpg"
                alt="Diwali Festive Cars & Bikes"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Bottom badge overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-black/75 backdrop-blur-md border border-[#FB923C]/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FB923C]/15 border border-[#FB923C]/30 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B] animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Special Festive Pricing</p>
                    <p className="text-[10px] text-[#FDE047]">Valid for limited festive stock</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FB923C] text-zinc-950 uppercase tracking-wider">
                  Live
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- FILTER & CONTROLS TOOLBAR --- */}
      <div className="sticky top-16 md:top-20 z-30 mb-8 rounded-2xl bg-[#120E0A]/95 backdrop-blur-xl border border-[#FB923C]/30 p-3 sm:p-4 shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
          
          {/* 1. Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-zinc-800 self-start sm:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedType("ALL")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                selectedType === "ALL"
                  ? "bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#FB923C] text-zinc-950 shadow-md font-semibold"
                  : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Deals</span>
            </button>
            <button
              onClick={() => setSelectedType("FOUR_WHEELER")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                selectedType === "FOUR_WHEELER"
                  ? "bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#FB923C] text-zinc-950 shadow-md font-semibold"
                  : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Cars Only</span>
            </button>
            <button
              onClick={() => setSelectedType("TWO_WHEELER")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                selectedType === "TWO_WHEELER"
                  ? "bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#FB923C] text-zinc-950 shadow-md font-semibold"
                  : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Bikes Only</span>
            </button>
          </div>

          {/* 2. Budget Pills (Horizontal scroll on mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {BUDGET_RANGES.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBudget(b.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                  selectedBudget === b.id
                    ? "bg-[#FB923C]/20 border-[#FB923C] text-[#FDE047] shadow-[0_0_10px_rgba(251,146,60,0.2)]"
                    : "bg-black/50 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* 3. Search & Sort Row */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-56 min-w-[160px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search maker, model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-black/60 border border-zinc-800 focus:border-[#F59E0B] focus:outline-none text-xs sm:text-sm text-white placeholder-zinc-500 transition-colors"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort vehicles"
                className="appearance-none pl-3 pr-8 py-1.5 rounded-xl bg-black/60 border border-zinc-800 text-xs sm:text-sm text-zinc-200 font-medium focus:border-[#F59E0B] focus:outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-zinc-900 text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
              <ArrowUpDown className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>

            {/* Clear Filters Button if any active */}
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                title="Reset all filters"
                className="p-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* --- RESULTS HEADER --- */}
      <div className="flex items-center justify-between mb-5 px-1">
        <p className="text-xs sm:text-sm text-zinc-400">
          Showing{" "}
          <span className="font-bold text-[#FDE047]">{filteredVehicles.length}</span> of{" "}
          <span className="font-bold text-white">{totalElements}</span> Diwali Deals
        </p>

        {activeFiltersCount > 0 && (
          <button
            onClick={handleResetFilters}
            className="text-xs font-semibold text-[#F59E0B] hover:text-[#FDE047] underline underline-offset-2 transition-colors cursor-pointer"
          >
            Clear all filters ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* --- VEHICLE GRID --- */}
      <div
        ref={cardsContainerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
      >
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div key={`explore-skel-${i}`} className="w-full">
                <VehicleCardSkeleton />
              </div>
            ))
          : filteredVehicles.map((car) => (
              <DiwaliVehicleCard
                key={car.id}
                data={car}
                source="diwali-explore"
              />
            ))}
      </div>

      {/* --- EMPTY STATE --- */}
      {!loading && filteredVehicles.length === 0 && (
        <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center rounded-2xl border border-zinc-800 bg-[#120E0A]/60 my-6">
          <div className="w-14 h-14 rounded-full bg-[#FB923C]/15 border border-[#FB923C]/30 flex items-center justify-center mb-4">
            <Flame className="w-7 h-7 text-[#FB923C]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1.5">No Festive Deals Found</h3>
          <p className="text-sm text-zinc-400 max-w-md mb-5">
            We couldn't find any vehicles matching your current filter selection. Try clearing or widening your filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-zinc-950 bg-gradient-to-r from-[#FDE047] via-[#FBBF24] to-[#FB923C] hover:brightness-105 shadow-md transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* --- LOAD MORE BUTTON --- */}
      {!loading && hasMore && filteredVehicles.length > 0 && (
        <div className="mt-10 sm:mt-12 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#1E1711] via-[#2A1F16] to-[#1E1711] hover:from-[#2A1F16] hover:to-[#38281B] border border-[#F59E0B]/40 hover:border-[#F59E0B] shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {loadingMore ? (
              <>
                <span className="w-4 h-4 border-2 border-[#FDE047] border-t-transparent rounded-full animate-spin" />
                <span>Loading More Deals...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#FDE047]" />
                <span>Load More Diwali Offers</span>
              </>
            )}
          </button>
        </div>
      )}

    </div>
  );
};

export default DiwaliOffersExplore;
