import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FilterSection({ title, defaultOpen = false, selectedCount = 0, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-third/30 pb-3">
      {/* HEADER */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full cursor-pointer flex items-center justify-between text-left"
      >
        <h3 className="text-sm font-semibold text-primary">{title}</h3>

        <div className="flex items-center gap-2">
          {selectedCount > 0 && (
            <span className="flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-primary text-secondary text-[10px] font-bold leading-none">
              {selectedCount}
            </span>
          )}
          <ChevronDown
            className={`h-4 w-4 text-primary transition-transform ${open ? "rotate-180" : ""
              }`}
          />
        </div>
      </button>

      {/* CONTENT */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-3 pb-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
