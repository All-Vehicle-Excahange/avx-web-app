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
}) {
  const [selected, setSelected] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState(""); // ⭐ NEW

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

  // ⭐ Filter items based on search
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  // ⭐ Apply limit logic AFTER filtering
  const visibleItems =
    showMore && !expanded ? filteredItems.slice(0, limit) : filteredItems;

  return (
    <div className="flex flex-col mb-2">
      {/* Title */}
      <h3 className="text-md font-semibold text-primary mb-2">{title}</h3>

      {/* ⭐ Search Input */}
      {searchable && (
        <div className="mb-4">
          <InputField
            variant="colored"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

        {/* When no results */}
        {visibleItems.length === 0 && (
          <p className="text-xs text-gray-400 mt-1">No results found</p>
        )}
      </div>

      {/* View More Toggle */}
      {/* ✅ Normal View More Toggle (Local Expand) */}
      {showMore && !serverPagination && filteredItems.length > limit && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-third font-medium text-sm underline hover:text-primary/70 self-end"
        >
          {expanded ? "View Less" : "View More"}
        </button>
      )}

      {/* ✅ Server Pagination View More Button */}
      {serverPagination && hasMore && (
        <button
          onClick={onLoadMore}
          className="mt-3 text-third font-medium text-sm underline hover:text-primary/70 self-end"
        >
          View More
        </button>
      )}
    </div>
  );
}
