"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { ArrowUpDown, ChevronDown, X, MapPin } from "lucide-react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

/* ================= SORT OPTIONS ================= */
const sortOptions = [
  { sortBy: "", direction: "", label: "Recommended" },
  { sortBy: "price", direction: "asc", label: "Price Low → High" },
  { sortBy: "price", direction: "desc", label: "Price High → Low" },
  { sortBy: "listingDate", direction: "desc", label: "Newest Listed" },
  { sortBy: "totalInquiryCount", direction: "desc", label: "Most Inquired" },
];

export default function SearchHeader({
  pageResponse = {},
  activeFilters = [],
  onRemoveFilter,
}) {
  const [open, setOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAllChips, setShowAllChips] = useState(false);
  const [selected, setSelected] = useState(sortOptions[0]);
  const dropdownRef = useRef(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const vehicleType = searchParams.get("vehicleType");
  const bodyType = searchParams.get("bodyType");
  const fuelType = searchParams.get("fuelType");
  const brandParam = searchParams.get("brand");
  const budget = searchParams.get("budget");
  const location = searchParams.get("location");

  /* Close sort dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const removeQueryValue = (params, paramName, valueToRemove) => {
    const val = params.get(paramName);
    if (!val) return;
    const items = val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const filtered = items.filter(
      (item) => item.toLowerCase() !== valueToRemove.toLowerCase(),
    );
    if (filtered.length > 0) {
      params.set(paramName, filtered.join(","));
    } else {
      params.delete(paramName);
    }
  };

  const getRemoveFilterHref = (filter) => {
    const params = new URLSearchParams(searchParams.toString());
    const lowerFilter = filter.toLowerCase();

    // 1. Price / Budget (contains '₹', 'under', 'l–', etc.)
    if (
      lowerFilter.includes("₹") ||
      lowerFilter.includes("under") ||
      (budget && lowerFilter.includes(budget.toLowerCase()))
    ) {
      params.delete("budget");
      params.delete("minPrice");
      params.delete("maxPrice");
      params.delete("price");
    }
    // 2. Rating (contains '⭐' or 'rating')
    else if (lowerFilter.includes("⭐") || lowerFilter.includes("rating")) {
      params.delete("rating");
    }
    // 3. KM Distance (contains 'km' or '≤')
    else if (lowerFilter.includes("km") || lowerFilter.includes("≤")) {
      params.delete("kmDistance");
      params.delete("km");
    }
    // 4. Seller Type
    else if (lowerFilter === "consultant" || lowerFilter === "individual") {
      params.delete("sellerType");
    }
    // 5. Fuel Type
    else if (
      ["petrol", "diesel", "cng", "electric", "hybrid", "lpg"].some((f) =>
        lowerFilter.includes(f),
      )
    ) {
      removeQueryValue(params, "fuelType", filter);
    }
    // 6. Transmission
    else if (["automatic", "manual"].some((t) => lowerFilter.includes(t))) {
      removeQueryValue(params, "transmission", filter);
      removeQueryValue(params, "transmissionType", filter);
    }
    // 7. Body Type
    else if (
      [
        "suv",
        "sedan",
        "hatchback",
        "coupe",
        "convertible",
        "wagon",
        "van",
        "truck",
        "muv",
      ].some((b) => lowerFilter.includes(b)) ||
      (bodyType && lowerFilter.includes(bodyType.toLowerCase()))
    ) {
      removeQueryValue(params, "bodyType", filter);
    }
    // 8. Year
    else if (/\b(19|20)\d{2}\b/.test(filter)) {
      params.delete("year");
      params.delete("minYear");
      params.delete("maxYear");
    }
    // 9. Location (state, city, town, or comma separated)
    else if (
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
    }
    // 10. Brand / Maker / Model / Variant (default)
    else {
      if (
        searchParams.get("model")?.toLowerCase() === lowerFilter ||
        searchParams.get("modelName")?.toLowerCase() === lowerFilter
      ) {
        removeQueryValue(params, "model", filter);
        removeQueryValue(params, "modelId", filter);
        removeQueryValue(params, "modelName", filter);
      } else if (
        searchParams.get("variant")?.toLowerCase() === lowerFilter ||
        searchParams.get("variantName")?.toLowerCase() === lowerFilter
      ) {
        removeQueryValue(params, "variant", filter);
        removeQueryValue(params, "variantId", filter);
        removeQueryValue(params, "variantName", filter);
      } else {
        removeQueryValue(params, "brand", filter);
        removeQueryValue(params, "brandName", filter);
        removeQueryValue(params, "makerId", filter);
      }
    }

    const queryString = params.toString();
    return queryString
      ? `${pathname || "/search"}?${queryString}`
      : pathname || "/search";
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
            {/* LEFT: Premium Title, Location Badge, Result Count */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-primary flex items-center gap-1.5">
                <span>
                  {h1Title || `Used ${brandParam ? `${brandParam} ` : ""}${bodyType ? `${bodyType}s` : vehicleType || "Vehicles"}`}
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

                {/* SORT DROPDOWN MENU */}
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
                      z-9999
                      overflow-hidden
                    "
                  >
                    {sortOptions.map((option) => {
                      const params = new URLSearchParams(
                        searchParams.toString()
                      );

                      if (option.sortBy) {
                        params.set("sortBy", option.sortBy);
                        params.set("direction", option.direction);
                      } else {
                        params.delete("sortBy");
                        params.delete("direction");
                      }
                      params.delete("sort");

                      const queryString = params.toString();
                      const targetUrl = queryString
                        ? `${pathname || "/search"}?${queryString}`
                        : (pathname || "/search");

                      return (
                        <Link
                          key={option.label}
                          href={targetUrl}
                          onClick={() => {
                            setSelected(option);
                            setOpen(false);
                          }}
                          className={`
                            block w-full text-left px-3 py-2
                            text-[12px] cursor-pointer
                            hover:bg-secondary/10 transition-colors
                            ${
                              selected.label === option.label
                                ? "bg-primary/10 font-semibold"
                                : ""
                            }
                          `}
                        >
                          {option.label}
                        </Link>
                      );
                    })}
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

              <Link
                href="/search"
                onClick={() => setShowFilters(false)}
                className="text-xs font-semibold underline text-primary/80 hover:text-primary transition-colors cursor-pointer ml-1"
              >
                Clear All
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
