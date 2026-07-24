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
  className,
  dropdownClassName,
  onSearch,
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
    [value, options],
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
          opt.label.toLowerCase().includes(search.toLowerCase()),
        );

  const [prevSelectedOption, setPrevSelectedOption] = useState(selectedOption);
  const [prevSearch, setPrevSearch] = useState(search);
  const [prevOpen, setPrevOpen] = useState(open);

  if (
    selectedOption !== prevSelectedOption ||
    search !== prevSearch ||
    open !== prevOpen
  ) {
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
          prev < filteredOptions.length - 1 ? prev + 1 : prev,
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
        } else if (onCreateNew && search.trim() && !isCreating) {
          const exactMatch = options.find((o) =>
            isMatch(o.label, search.trim()),
          );
          if (!exactMatch) {
            onCreateNew(search.trim());
          } else {
            onChange(exactMatch.value);
          }
          setOpen(false);
        }
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  };

  return (
    <div className={cn("relative w-full", open && "z-50")} ref={wrapperRef}>
      {/* Input */}
      <div
        className={cn(
          baseStyles,
          variants[variant],
          disabled && "opacity-60 cursor-not-allowed",
          readOnly && "cursor-default",
          className,
        )}
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
            if (onSearch) onSearch(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          readOnly={readOnly || disabled}
          placeholder={placeholder}
          className={cn(
            "bg-transparent outline-none w-full text-sm",
            disabled ? "cursor-not-allowed" : readOnly ? "cursor-default" : "",
            variant === "transparent" || variant === "colored"
              ? "text-primary placeholder:text-primary/60"
              : "text-secondary placeholder:text-secondary/60",
          )}
        />
        <ChevronDown 
          className={cn(
            "w-4 h-4 cursor-pointer transition-transform duration-200",
            open && "rotate-180"
          )}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled && !readOnly) {
              setOpen(!open);
            }
          }}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 mt-1 z-50">
          <div
            ref={listRef}
            className={cn(
              "rounded-xl shadow-xl max-h-40 overflow-y-auto custom-scrollbar border",
              variant === "transparent" || variant === "colored"
                ? "bg-neutral-950 border-white/10 backdrop-blur-xl"
                : "bg-primary border border-third/40",
              dropdownClassName,
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
                        : "bg-third/20"),
                  )}
                >
                  {opt.label}
                </button>
              ))
            ) : (
              <div>
                <button
                  type="button"
                  disabled={isCreating}
                  onClick={() => {
                    if (onCreateNew && search.trim() && !isCreating) {
                      onCreateNew(search.trim());
                      setOpen(false);
                    }
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm",
                    onCreateNew && search.trim()
                      ? "cursor-pointer"
                      : "cursor-default",
                    variant === "transparent" || variant === "colored"
                      ? onCreateNew && search.trim() && !isCreating
                        ? "text-primary hover:bg-white/10"
                        : "text-primary/60"
                      : onCreateNew && search.trim() && !isCreating
                        ? "text-secondary hover:bg-third/10"
                        : "text-third",
                  )}
                >
                  {isCreating ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Creating...
                    </div>
                  ) : onCreateNew && search.trim() ? (
                    `${search.trim()}`
                  ) : (
                    "No results found"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
