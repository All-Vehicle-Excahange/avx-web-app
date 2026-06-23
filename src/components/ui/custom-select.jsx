"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const baseStyles =
  "w-full h-10 px-3 flex items-center justify-between rounded-md text-sm transition-all cursor-text cursor-pointer";

const variants = {
  default: "bg-primary border border-third/40 hover:bg-third/10 text-secondary",
  transparent:
    "bg-white/10 border border-white/20 text-primary backdrop-blur-md hover:bg-white/20",
  colored:
    "border border-primary bg-primary/10 text-primary hover:bg-primary/20",
};

export default function CustomSelect({
  value,
  onChange,
  placeholder = "Select",
  options = [],
  variant = "default",
  disabled = false,
  readOnly = false,
  onCreateNew = null,
  isCreating = false,
}) {
  const isMatch = (optValue, val) => {
    if (optValue === val) return true;
    if (optValue == null || val == null) return false;
    return String(optValue) === String(val);
  };

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(() => {
    const selected = options.find((o) => isMatch(o.value, value));
    return selected ? selected.label : "";
  });
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const wrapperRef = useRef(null);
  const listRef = useRef(null);

  // 🔹 Find selected option (derived state)
  const selectedOption = useMemo(
    () => options.find((o) => isMatch(o.value, value)),
    [value, options]
  );



  // 🔹 Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredOptions =
    selectedOption && search === selectedOption.label
      ? options
      : options.filter((opt) =>
          opt.label.toLowerCase().includes(search.toLowerCase())
        );

  const [prevSelectedOption, setPrevSelectedOption] = useState(selectedOption);
  const [prevSearch, setPrevSearch] = useState(search);
  const [prevOpen, setPrevOpen] = useState(open);

  if (selectedOption !== prevSelectedOption || search !== prevSearch || open !== prevOpen) {
    setPrevSelectedOption(selectedOption);
    setPrevSearch(search);
    setPrevOpen(open);

    if (search !== prevSearch || open !== prevOpen) {
      setFocusedIndex(-1);
    }

    if (selectedOption !== prevSelectedOption || open !== prevOpen) {
      if (!open) {
        setSearch(selectedOption ? selectedOption.label : "");
      }
    }
  }

  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
      const el = listRef.current.children[focusedIndex];
      if (el) {
        el.scrollIntoView({ block: "nearest" });
      }
    }
  }, [focusedIndex]);

  const handleKeyDown = (e) => {
    if (disabled || readOnly) return;
    if (!open) {
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === "ArrowUp") {
        setOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          onChange(filteredOptions[focusedIndex].value);
          setOpen(false);
        }
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {/* Input */}
      <div
        className={cn(baseStyles, variants[variant], disabled && "opacity-60 cursor-not-allowed", readOnly && "cursor-default")}
        onClick={() => {
          if (!disabled && !readOnly) setOpen(true);
        }}
      >
        <input
          value={search}
          onChange={(e) => {
            if (disabled || readOnly) return;
            setSearch(e.target.value);
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          readOnly={readOnly || disabled}
          placeholder={placeholder}
          className={cn(
            "bg-transparent outline-none w-full text-sm",
            disabled ? "cursor-not-allowed" : readOnly ? "cursor-default" : "",
            variant === "transparent" || variant === "colored"
              ? "text-primary placeholder:text-primary/60"
              : "text-secondary placeholder:text-secondary/60"
          )}
        />
        <ChevronDown className="w-4 h-4" />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 mt-1 z-30">
          <div
            ref={listRef}
            className={cn(
              "rounded-md shadow-xl max-h-40 overflow-y-auto",
              variant === "transparent" || variant === "colored"
                ? "bg-white/10 border border-white/20 backdrop-blur-lg"
                : "bg-primary border border-third/40"
            )}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, index) => (
                <button
                  key={opt.value}
                  type="button"
                  onMouseEnter={() => setFocusedIndex(index)}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm cursor-pointer",
                    variant === "transparent" || variant === "colored"
                      ? "text-primary hover:bg-white/20"
                      : "text-secondary hover:bg-third/20",
                    focusedIndex === index &&
                      (variant === "transparent" || variant === "colored"
                        ? "bg-white/20"
                        : "bg-third/20")
                  )}
                >
                  {opt.label}
                </button>
              ))
            ) : (
              <div>
                <div
                  className={cn(
                    "px-3 py-2 text-sm",
                    variant === "transparent" || variant === "colored"
                      ? "text-primary/60"
                      : "text-third"
                  )}
                >
                  No results found
                </div>
                {onCreateNew && search.trim() && (
                  <button
                    type="button"
                    disabled={isCreating}
                    onClick={() => {
                      if (!isCreating) {
                        onCreateNew(search.trim());
                        setOpen(false);
                      }
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm font-medium border-t flex items-center gap-1.5 transition-colors",
                      variant === "transparent" || variant === "colored"
                        ? "border-white/10 text-emerald-400 hover:bg-white/10"
                        : "border-third/20 text-emerald-500 hover:bg-third/10",
                      isCreating && "opacity-60 cursor-not-allowed"
                    )}
                  >
                    {isCreating ? (
                      <>
                        <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Creating...
                      </>
                    ) : (
                      <>
                        <span className="text-base leading-none">+</span>
                        Create &quot;{search.trim()}&quot;
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
