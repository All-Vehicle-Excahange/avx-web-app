"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { ArrowUpDown, ChevronDown, FilterIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
/* ================= SORT OPTIONS ================= */
const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price_low_high", label: "Price Low → High" },
  { value: "price_high_low", label: "Price High → Low" },
  { value: "subscribers_low_high", label: "Subscribers Low → High" },
  { value: "subscribers_high_low", label: "Subscribers High → Low" },
];

export default function SearchWithHeader({ activeFilters = [], pageResponse = {} }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(sortOptions[0]);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();

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

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-0 inset-x-0 z-1000">
        <Navbar heroMode scrolled />
      </div>

      {/* HEADER */}
      <section className="w-full h-[145px] bg-fourth flex items-center pt-16">
        <div className="max-w-screen-2xl w-full mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* LEFT */}
            <div className="flex items-center gap-2 flex-wrap text-primary text-sm md:text-base">
              {/* Show URL query params only when no filters are selected */}
              {activeFilters.length === 0 && (
                <span>
                  {vehicleTypeParam} {serviceParam} {availabilityParam}
                  {priceRangeParam && ` ${priceRangeParam}`}
                  {location && ` ${location}`}
                </span>
              )}

              {/* Active Filters as plain text */}
              {activeFilters.length > 0 && (
                <span className="text-primary font-bold">
                  {activeFilters.join(" • ")}
                </span>
              )}

              {/* Pagination */}
              <span className="text-primary/70">
                • {pageResponse.totalElements ?? 0} Results
                • Page {pageResponse.currentPage ?? 1} of {pageResponse.totalPages ?? 0}
              </span>
            </div>

            <div ref={dropdownRef} className="relative z-100">
              <button
                onClick={() => setOpen((p) => !p)}
                className="
    flex items-center justify-center sm:justify-between gap-2
    bg-white
    border border-primary/25
    rounded-lg
    px-2 sm:px-3
    h-[30px]

    w-[52px] sm:w-auto   /* slightly smaller */
    cursor-pointer
    text-[12px]
    font-medium
    text-secondary
    hover:border-secondary/50
  "
              >
                {/* Left Content */}
                <div className="flex items-center gap-2">

                  {/* Always show icon */}
                  <ArrowUpDown size={14} className="text-secondary/70" />

                  {/* Hide text on mobile */}
                  <span className="hidden lg:inline-block">
                    {selected.label}
                  </span>
                </div>

                {/* Dropdown Arrow */}
                <ChevronDown
                  size={14}
                  className={`sm:hidden transition-transform ${open ? "rotate-180" : ""}`}
                />

                <ChevronDown
                  size={14}
                  className={`hidden sm:block transition-transform ${open ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* DROPDOWN */}
              {open && (
                <div
                  className="
      absolute right-0 left-auto mt-2
      w-48 max-w-[90vw]
      bg-white 
      text-secondary
      border border-primary/20
      rounded-lg
      shadow-lg
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

                        router.push(`?${params.toString()}`);
                      }}
                      className={`
          w-full text-left px-3 py-2
          text-[12px] cursor-pointer
          hover:bg-secondary/10
          ${selected.value === option.value
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
      </section>
    </>
  );
}
