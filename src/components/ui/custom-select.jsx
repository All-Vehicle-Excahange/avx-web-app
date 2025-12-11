"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const baseStyles =
  "w-full h-10 px-3 flex items-center justify-between rounded-md text-sm transition-all cursor-text";

const variants = {
  default: "bg-primary border border-third/40 hover:bg-third/10 text-secondary",
  transparent:
    "bg-white/10 border border-white/20 text-primary backdrop-blur-md hover:bg-white/20",
};

export default function CustomSelect({
  value,
  onChange,
  placeholder = "Select",
  options = [],
  variant = "default",
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const wrapperRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Sync displayed text when value changes
  useEffect(() => {
    const selected = options.find((o) => o.value === value);
    if (selected && search !== selected.label) {
      setSearch(selected.label);
    } 
  }, [value, options]);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {/* Main Input */}
      <div
        className={cn(baseStyles, variants[variant])}
        onClick={() => setOpen(true)}
      >
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          placeholder={placeholder}
          className={cn(
            "bg-transparent outline-none w-full text-sm",
            variant === "transparent"
              ? "text-primary placeholder:text-primary/60"
              : "text-secondary placeholder:text-secondary/60"
          )}
        />
        <ChevronDown className="w-4 h-4" />
      </div>

      {/* Dropdown List */}
      {open && (
        <div className="absolute left-0 right-0 mt-1 z-30">
          <div
            className={cn(
              "rounded-md shadow-xl max-h-40 overflow-y-auto",
              variant === "transparent"
                ? "bg-white/10 border border-white/20 backdrop-blur-lg"
                : "bg-primary border border-third/40"
            )}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setSearch(opt.label);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm",
                    variant === "transparent"
                      ? "text-primary hover:bg-white/20"
                      : "text-secondary hover:bg-third/20"
                  )}
                >
                  {opt.label}
                </button>
              ))
            ) : (
              <div
                className={cn(
                  "px-3 py-2 text-sm",
                  variant === "transparent" ? "text-primary" : "text-third"
                )}
              >
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
