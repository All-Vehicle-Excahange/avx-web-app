"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import {ArrowUpDown, ChevronDown} from "lucide-react";

/* ================= SORT OPTIONS ================= */
const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price_low_high", label: "Price Low → High" },
  { value: "price_high_low", label: "Price High → Low" },
  { value: "newest", label: "Newest Listed" },
  { value: "most_inquired", label: "Most Inquired" },
  { value: "best_rated", label: "Best Rated Seller" },
];

export default function SearchHeader() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(sortOptions[0]);
  const dropdownRef = useRef(null);

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
      <section className="w-full h-[106px] bg-fourth flex items-center pt-16">
        <div className="max-w-screen-2xl w-full mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* LEFT */}
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-primary text-base md:text-lg ">
                Diesel SUVs in Ahmedabad
              </h2>
              <span className="text-primary/80 text-sm">
                • 82 Results • 37 AVX Inspected • Updated Today
              </span>
            </div>

            <div ref={dropdownRef} className="relative z-100">
              <button
                onClick={() => setOpen((p) => !p)}
                className="
                  flex items-center justify-between gap-2
                  bg-white
                  border border-primary/25
                  rounded-lg
                  px-3
                  h-[30px]
                  min-w-[180px]
                  text-[12px]
                  font-medium
                  text-secondary
                  hover:border-secondary/50
                "
              >
                <div className="flex items-center gap-2">
                  <ArrowUpDown size={14} className="text-secondary/70" />
                  <span>{selected.label}</span>
                </div>

                <ChevronDown
                  size={14}
                  className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>

              {/* DROPDOWN */}
              {open && (
                <div
                  className="
                    absolute right-0 mt-2
                    w-full
                    bg-white
                    text-secondary
                    border border-primary/20
                    rounded-lg
                    shadow-lg
                    overflow-hidden
                  "
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelected(option);
                        setOpen(false);
                      }}
                      className={`
                        w-full text-left px-3 py-2
                        text-[12px]
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
      </section>
    </>
  );
}
