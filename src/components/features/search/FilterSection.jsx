import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FilterSection({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-third/30 pb-3">
      {/* HEADER */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="text-sm font-semibold text-primary">{title}</h3>

        <ChevronDown
          className={`h-4 w-4 text-primary transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* CONTENT */}
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}
