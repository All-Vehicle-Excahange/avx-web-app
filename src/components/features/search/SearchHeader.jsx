"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

/* ================= SORT OPTIONS ================= */
const sortOptions = [
  { sortBy: "", direction: "", label: "Recommended" },
  { sortBy: "price", direction: "asc", label: "Price Low → High" },
  { sortBy: "price", direction: "desc", label: "Price High → Low" },
  { sortBy: "listingDate", direction: "desc", label: "Newest Listed" },
  { sortBy: "totalInquiryCount", direction: "desc", label: "Most Inquired" },
];

export default function SearchHeader({ pageResponse = {}, activeFilters = [] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(sortOptions[0]);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const vehicleType = searchParams.get("vehicleType");
  const bodyType = searchParams.get("bodyType");
  const fuelType = searchParams.get("fuelType");
  const brandParam = searchParams.get("brand");
  const makerId = searchParams.get("makerId");
  const budget = searchParams.get("budget");
  const sort = searchParams.get("sort");
  const location = searchParams.get("location");


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
            <div className="flex items-center gap-2 flex-wrap text-primary  text-sm md:text-base">
              {/* Show URL query params only when no filters are selected */}
              {activeFilters.length === 0 && (
                <span>
                  {vehicleType} {bodyType} {fuelType} {brandParam}
                  {budget && ` ${budget}`}
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
                • {pageResponse.totalElements ?? 0} Total Results
                {pageResponse.totalPages > 0 && (
                  <> • Page {pageResponse.currentPage ?? 1} of {pageResponse.totalPages}</>
                )}
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
      w-[52px] sm:w-auto
      cursor-pointer
      text-[12px]
      font-medium
      text-secondary
      hover:border-secondary/50
    "
              >
                {/* Left Content */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown size={14} className="text-secondary/70" />

                  {/* Match first code behavior (hidden on mobile, visible on lg) */}
                  <span className="hidden lg:inline-block">
                    {selected.label}
                  </span>
                </div>

                {/* Match dual-chevron behavior */}
                <ChevronDown
                  size={14}
                  className={`sm:hidden transition-transform ${open ? "rotate-180" : ""
                    }`}
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
                      key={option.label}
                      onClick={() => {
                        setSelected(option);
                        setOpen(false);

                        const params = new URLSearchParams(
                          searchParams.toString(),
                        );

                        if (option.sortBy) {
                          params.set("sortBy", option.sortBy);
                          params.set("direction", option.direction);
                        } else {
                          params.delete("sortBy");
                          params.delete("direction");
                        }
                        params.delete("sort");

                        router.push(`?${params.toString()}`);
                      }}
                      className={`
            w-full text-left px-3 py-2
            text-[12px] cursor-pointer
            hover:bg-secondary/10
            ${selected.label === option.label
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
