"use client";

import { useState } from "react";
import InputField from "@/components/ui/inputField";

export default function CheckListPanel({
  title,
  items = [],
  searchPlaceholder = "Search...",
  onChange,
}) {
  const [search, setSearch] = useState("");

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleCheck = (value) => {
    if (onChange) onChange(value);
  };

  return (
    <div className="flex flex-col gap-3 pb-4 border-b border-white/20">
      {/* Title */}
      <h3 className="text-lg font-semibold text-primary">{title}</h3>

      {/* Search Input */}
      <InputField
        variant="search"
        placeholder={searchPlaceholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p className="text-xs text-white/70 mt-1">Result</p>

      {/* Checkbox list */}
      <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
        {filtered.map((item) => (
          <label
            key={item.value}
            className="flex items-center gap-2 text-white cursor-pointer border border-white/40 "
          >
            <input
              type="checkbox"
              className="accent-primary w-4 h-4"
              onChange={() => handleCheck(item.value)}
            />
            <span className="text-sm">{item.label}</span>
          </label>
        ))}

        {filtered.length === 0 && (
          <p className="text-xs text-white/50">No results</p>
        )}
      </div>
    </div>
  );
}
