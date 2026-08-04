"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { ArrowUpDown, ChevronDown, FilterIcon, X, MapPin } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

/* ================= SORT OPTIONS ================= */
const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price_low_high", label: "Price Low → High" },
  { value: "price_high_low", label: "Price High → Low" },
  { value: "subscribers_low_high", label: "Subscribers Low → High" },
  { value: "subscribers_high_low", label: "Subscribers High → Low" },
];

export default function SearchWithHeader({
  activeFilters = [],
  pageResponse = {},
  onRemoveFilter,
  onClearAll,
}) {
  const [open, setOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAllChips, setShowAllChips] = useState(false);
  const [selected, setSelected] = useState(sortOptions[0]);
  const dropdownRef = useRef(null);
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  /* Close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const vehicleTypeParam = searchParams.get("vehicleType");
  const serviceParam = searchParams.get("service");
  const availabilityParam = searchParams.get("availability");
  const priceRangeParam = searchParams.get("priceRange");
  const location = searchParams.get("location");

  const getRemoveFilterHref = (filter) => {
    const params = new URLSearchParams(searchParams.toString());
    const lowerFilter = filter.toLowerCase();

    if (
      lowerFilter.includes("₹") ||
      lowerFilter.includes("l–") ||
      lowerFilter.includes("price") ||
      (priceRangeParam && lowerFilter.includes(priceRangeParam.toLowerCase()))
    ) {
      params.delete("priceRange");
      params.delete("minPrice");
      params.delete("maxPrice");
    } else if (lowerFilter.includes("⭐") || lowerFilter.includes("rating")) {
      params.delete("rating");
    } else if (
      lowerFilter.includes("km") ||
      lowerFilter.includes("≤") ||
      lowerFilter.includes("distance")
    ) {
      params.delete("distance");
      params.delete("km");
    } else if (
      (location && lowerFilter.includes(location.toLowerCase())) ||
      lowerFilter.includes(",") ||
      searchParams.get("stateName")?.toLowerCase() === lowerFilter ||
      searchParams.get("cityName")?.toLowerCase() === lowerFilter ||
      searchParams.get("townName")?.toLowerCase() === lowerFilter
    ) {
      params.delete("location");
      params.delete("stateId");
      params.delete("stateName");
      params.delete("cityId");
      params.delete("cityName");
      params.delete("townId");
      params.delete("townName");
    } else {
      if (searchParams.get("vehicleType")?.toLowerCase() === lowerFilter) {
        params.delete("vehicleType");
      } else if (searchParams.get("service")?.toLowerCase() === lowerFilter) {
        params.delete("service");
      } else if (
        searchParams.get("availability")?.toLowerCase() === lowerFilter
      ) {
        params.delete("availability");
      }
    }

    const queryString = params.toString();
    return queryString
      ? `${pathname || "/consult/discovery"}?${queryString}`
      : pathname || "/consult/discovery";
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-0 inset-x-0 z-1000">
        <Navbar heroMode scrolled />
      </div>

      {/* HEADER */}
      <section className="w-full bg-fourth transition-all duration-300 shadow-sm border-b border-primary/10 pt-20 pb-4 sm:pt-20 sm:pb-4">
        <div className="max-w-screen-2xl w-full mx-auto px-4 md:px-8">
          {/* TOP ROW: Title, Location, Results Count & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* LEFT: Title, Location Badge, Result Count */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-primary flex items-center gap-1.5">
                <span>
                  {serviceParam || vehicleTypeParam || "Auto Consultants"}
                </span>
              </h1>

              {location && (
                <span className="inline-flex items-center gap-1 bg-white/10 border border-primary/20 rounded-full px-2.5 py-0.5 text-xs text-primary/90 font-medium">
                  <MapPin size={12} />
                  {location}
                </span>
              )}

              <span className="text-xs sm:text-sm text-primary/70 font-medium">
                • {pageResponse.totalElements ?? 0} Results
              </span>
            </div>

            {/* RIGHT: Filters Toggle Button & Sort By Dropdown */}
            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              {/* Toggle Filters Panel Button */}
              {activeFilters.length > 0 && (
                <button
                  onClick={() => setShowFilters((prev) => !prev)}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-primary/25 rounded-full px-3 py-1 text-xs font-semibold text-primary shadow-sm transition-all cursor-pointer"
                >
                  <span>
                    {activeFilters.length} Filter{activeFilters.length > 1 ? "s" : ""} Applied
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      showFilters ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}

              {/* Sort By Dropdown */}
              <div ref={dropdownRef} className="relative z-100">
                <button
                  onClick={() => setOpen((p) => !p)}
                  className="
                    flex items-center justify-between gap-2
                    bg-white
                    border border-primary/25
                    rounded-lg
                    px-2.5 py-1 sm:px-3
                    h-[30px]
                    cursor-pointer
                    text-[12px]
                    font-medium
                    text-secondary
                    hover:border-secondary/50
                    shadow-sm
                  "
                >
                  <div className="flex items-center gap-1.5">
                    <ArrowUpDown size={14} className="text-secondary/70" />
                    <span>{selected.label}</span>
                  </div>

                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {/* DROPDOWN */}
                {open && (
                  <div
                    className="
                      absolute left-0 sm:left-auto sm:right-0 mt-2
                      w-48 max-w-[90vw]
                      bg-white 
                      text-secondary
                      border border-primary/20
                      rounded-lg
                      shadow-xl
                      z-[9999]
                    "
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelected(option);
                          setOpen(false);

                          const params = new URLSearchParams(
                            searchParams.toString(),
                          );
                          params.set("sort", option.value);

                          push(`?${params.toString()}`);
                        }}
                        className={`
                          w-full text-left px-3 py-2
                          text-[12px] cursor-pointer
                          hover:bg-secondary/10
                          ${
                            selected.value === option.value
                              ? "bg-primary/10 font-semibold"
                              : ""
                          }
                        `}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EXPANDABLE FILTER SUMMARY PANEL */}
          {showFilters && activeFilters.length > 0 && (
            <div className="mt-3 pt-3 border-t border-primary/10 flex flex-wrap items-center gap-2 animate-fadeIn">
              {activeFilters
                .slice(0, showAllChips ? activeFilters.length : 6)
                .map((filter, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-primary/20 rounded-full px-3 py-1 text-xs font-medium text-primary shadow-sm transition-all"
                  >
                    <span>{filter}</span>
                    {onRemoveFilter ? (
                      <button
                        type="button"
                        onClick={() => onRemoveFilter(filter)}
                        className="hover:opacity-70 cursor-pointer ml-0.5 inline-flex items-center"
                      >
                        <X size={12} />
                      </button>
                    ) : (
                      <Link
                        href={getRemoveFilterHref(filter)}
                        className="hover:opacity-70 cursor-pointer ml-0.5 inline-flex items-center"
                      >
                        <X size={12} />
                      </Link>
                    )}
                  </span>
                ))}

              {activeFilters.length > 6 && !showAllChips && (
                <button
                  onClick={() => setShowAllChips(true)}
                  className="inline-flex items-center bg-white text-fourth hover:bg-white/90 border border-primary/20 rounded-full px-3 py-1 text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  +{activeFilters.length - 6} More
                </button>
              )}

              {showAllChips && activeFilters.length > 6 && (
                <button
                  onClick={() => setShowAllChips(false)}
                  className="inline-flex items-center bg-white text-fourth hover:bg-white/90 border border-primary/20 rounded-full px-3 py-1 text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  Show Less
                </button>
              )}

              {onClearAll ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowFilters(false);
                    onClearAll();
                  }}
                  className="text-xs font-semibold underline text-primary/80 hover:text-primary transition-colors cursor-pointer ml-1"
                >
                  Clear All
                </button>
              ) : (
                <Link
                  href={pathname || "/consult/discovery"}
                  onClick={() => setShowFilters(false)}
                  className="text-xs font-semibold underline text-primary/80 hover:text-primary transition-colors cursor-pointer ml-1"
                >
                  Clear All
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
