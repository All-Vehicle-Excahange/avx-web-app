"use client";

import { useState } from "react";
import Chip from "./chip";
import InputField from "@/components/ui/inputField";

export default function ChipGroup({
  title,
  items = [],
  variant = "outline",
  allowMultiple = true,
  showMore = false,
  searchable = false,
  limit = 6,
  serverPagination = false,
  hasMore = false,
  onLoadMore,
  onChange,
  searchValue, // ← new prop from parent
  onSearchChange, // ← new prop from parent
  isLoading = false,
  customEmptyMessage, // optional for variant error message
}) {
  const [selected, setSelected] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState(""); // local fallback

  const toggleSelect = (val) => {
    let updated;

    if (allowMultiple) {
      updated = selected.includes(val)
        ? selected.filter((i) => i !== val)
        : [...selected, val];
    } else {
      updated = selected.includes(val) ? [] : [val];
    }

    setSelected(updated);
    if (onChange) onChange(updated);
  };

  // Use parent's search value if provided, else local
  const currentSearch = searchValue ?? search;

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(currentSearch.toLowerCase()),
  );

  const visibleItems =
    showMore && !expanded ? filteredItems.slice(0, limit) : filteredItems;

  return (
    <div className="flex flex-col mb-2">
      {/* Title */}
      <h3 className="text-md font-semibold text-primary mb-2">{title}</h3>

      {/* Search Input - now controlled by parent */}
      {searchable && (
        <div className="mb-4">
          <InputField
            variant="colored"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={currentSearch}
            onChange={(e) => {
              const newVal = e.target.value;
              if (onSearchChange) {
                onSearchChange(newVal); // ← This calls setBrandSearch / setModelSearch etc.
              } else {
                setSearch(newVal);
              }
            }}
          />
        </div>
      )}

      {/* Chips */}
      <div className="flex flex-wrap gap-3">
        {visibleItems.map((item) => (
          <Chip
            key={item.value}
            label={item.label}
            selected={selected.includes(item.value)}
            variant={variant}
            onClick={() => toggleSelect(item.value)}
          />
        ))}

        {/* No results / loading / custom message */}
        {visibleItems.length === 0 && (
          <p className="text-xs text-gray-400 mt-1">
            {isLoading
              ? "Loading..."
              : customEmptyMessage || "No results found"}
          </p>
        )}
      </div>

      {/* View More Toggle */}
      {showMore && !serverPagination && filteredItems.length > limit && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-third font-medium text-sm underline hover:text-primary/70 self-end"
        >
          {expanded ? "View Less" : "View More"}
        </button>
      )}

      {/* Server Pagination View More */}
      {serverPagination && hasMore && (
        <button
          onClick={onLoadMore}
          disabled={isLoading}
          className="mt-3 text-third font-medium text-sm underline hover:text-primary/70 self-end disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "View More"}
        </button>
      )}
    </div>
  );
}
