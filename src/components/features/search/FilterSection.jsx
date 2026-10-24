import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FilterSection({
  title,
  defaultOpen = false,
  selectedCount = 0,
  onClear,
  children,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-third/30 pb-3">
      {/* HEADER */}
      <div className="w-full flex items-center justify-between py-1">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex-1 cursor-pointer flex items-center text-left"
        >
          <h3 className="text-sm font-semibold text-primary">{title}</h3>
        </button>

        <div className="flex items-center gap-2">
          {onClear && selectedCount > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="text-xs font-normal text-third hover:text-primary transition-colors cursor-pointer px-1 py-0.5"
            >
              Clear all
            </button>
          )}

          {selectedCount > 0 && (
            <span className="flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-primary text-secondary text-[10px] font-bold leading-none">
              {selectedCount}
            </span>
          )}

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="cursor-pointer p-0.5 text-primary"
            aria-label={open ? "Collapse" : "Expand"}
          >
            <ChevronDown
              className={`h-4 w-4 text-primary transition-transform ${open ? "rotate-180" : ""
                }`}
            />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <div className="mt-3 pb-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
