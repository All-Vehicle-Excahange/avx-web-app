"use client";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Check,
  Search,
  Cpu,
  Fuel,
  Sliders,
  Maximize2,
  Armchair,
  CarFront,
  ShieldCheck,
  Radio,
  Wrench,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  getVehicleSpecificationQuery,
  getVehicleExtraDetailsQuery,
} from "@/queries/vehicle.queries";

// Helper function to resolve icon based on category name
const getCategoryIcon = (categoryName = "") => {
  const name = categoryName.toLowerCase();
  if (name.includes("engine") || name.includes("transmission")) return Cpu;
  if (name.includes("fuel") || name.includes("performance") || name.includes("mileage")) return Fuel;
  if (name.includes("suspension") || name.includes("steering") || name.includes("brake")) return Sliders;
  if (name.includes("dimension") || name.includes("capacity") || name.includes("size")) return Maximize2;
  if (name.includes("comfort") || name.includes("convenience")) return Armchair;
  if (name.includes("interior")) return Sliders;
  if (name.includes("exterior")) return CarFront;
  if (name.includes("safety") || name.includes("security")) return ShieldCheck;
  if (name.includes("entertainment") || name.includes("communication") || name.includes("infotainment")) return Radio;
  if (name.includes("modification") || name.includes("extra")) return Wrench;
  return Layers;
};  

export default function SpecificationPopup({ open, onClose, variantId, vehicleId }) {
  const [activeTab, setActiveTab] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const popupRef = useRef(null);
  const contentRef = useRef(null);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 150);
  }, [onClose]);

  // Prevent parent scroll while open
  useEffect(() => {
    const preventScroll = (e) => {
      if (popupRef.current && popupRef.current.contains(e.target)) {
        return;
      }
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    if (open) {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    }

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [open]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleClose]);

  const { data, isLoading: isSpecLoading } = useQuery({
    ...getVehicleSpecificationQuery(variantId),
    enabled: open && !!variantId,
  });

  const { data: extraData } = useQuery({
    ...getVehicleExtraDetailsQuery(vehicleId),
    enabled: open && !!vehicleId,
  });

  const isLoading = isSpecLoading;

  const transformedExtra = useMemo(() => {
    const res = {};
    if (Array.isArray(extraData) && extraData.length > 0) {
      extraData.forEach((item) => {
        if (item.detailKey && Array.isArray(item.detailValues)) {
          res[item.detailKey] = item.detailValues.join(", ");
        }
      });
    }
    return res;
  }, [extraData]);

  const specData = useMemo(() => {
    const base = { ...(data?.specifications || {}) };
    if (Object.keys(transformedExtra).length > 0) {
      base["Modifications"] = transformedExtra;
    }
    return base;
  }, [data?.specifications, transformedExtra]);

  const categories = useMemo(() => Object.keys(specData), [specData]);

  useEffect(() => {
    if (categories.length > 0 && (!activeTab || !categories.includes(activeTab))) {
      setActiveTab(categories[0]);
    }
  }, [categories, activeTab]);

  // Reset scroll right pane to top when activeTab changes
  const handleTabChange = (category) => {
    setActiveTab(category);
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  // Get specifications for active category
  const filteredSpecs = useMemo(() => {
    if (!activeTab || !specData[activeTab]) return [];
    return Object.entries(specData[activeTab]);
  }, [specData, activeTab]);

  if (!open && !isClosing) return null;

  const ActiveIcon = getCategoryIcon(activeTab);

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overscroll-contain"
      onClick={handleClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.15s ease-in forwards"
          : "modalBackdropIn 0.15s ease-out",
      }}
    >
      {/* MODAL CONTAINER */}
      <div
        ref={popupRef}
        className="w-full h-[85vh] md:h-[76vh] max-w-5xl bg-secondary rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10 overscroll-contain text-white"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.15s ease-in forwards"
            : "modalCardIn 0.15s ease-out",
        }}
      >
        {/* LEFT SIDEBAR - CATEGORIES */}
        <div className="w-full md:w-[290px] lg:w-[310px] shrink-0 bg-secondary border-b md:border-b-0 md:border-r border-white/5 flex flex-col overflow-hidden">
          {/* Sidebar Header */}
          <div className="px-4 py-3 md:py-3.5 border-b border-white/5 hidden md:flex items-center justify-between shrink-0">
            <span className="text-[11px] font-semibold text-white/50 tracking-wider uppercase">
              Specification Categories
            </span>
            {categories.length > 0 && (
              <span className="bg-white/10 text-white/70 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                {categories.length}
              </span>
            )}
          </div>

          {/* Categories Navigation */}
          <div className="overflow-x-auto md:overflow-y-auto flex flex-row md:flex-col p-2.5 md:p-3 gap-1 md:gap-1.5 custom-scrollbar overscroll-contain whitespace-nowrap flex-1">
            {isLoading ? (
              <div className="space-y-2 p-1 w-full">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-9 md:h-10 bg-white/5 animate-pulse rounded-xl w-full"
                  />
                ))}
              </div>
            ) : categories.length === 0 ? (
              <div className="p-4 text-xs text-white/50 text-center">
                No categories found
              </div>
            ) : (
              categories.map((category) => {
                const IconComponent = getCategoryIcon(category);
                const isActive = activeTab === category;
                const itemCount = Object.keys(specData[category] || {}).length;

                return (
                  <button
                    key={category}
                    onClick={() => handleTabChange(category)}
                    className={`cursor-pointer px-3 md:px-3.5 py-2 md:py-2.5 text-xs md:text-sm rounded-xl font-medium shrink-0 flex items-center justify-between gap-2.5 transition-all text-left group ${
                      isActive
                        ? "bg-white/10 text-primary font-semibold"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <IconComponent
                        size={15}
                        className={`shrink-0 transition-colors ${
                          isActive ? "text-primary" : "text-white/40 group-hover:text-white/70"
                        }`}
                      />
                      <span className="whitespace-nowrap font-medium">{category}</span>
                    </div>
                    {itemCount > 0 && (
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md shrink-0 hidden md:inline-block ${
                          isActive
                            ? "bg-white/15 text-primary"
                            : "bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/60"
                        }`}
                      >
                        {itemCount}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT CONTENT PANE */}
        <div className="flex-1 flex flex-col overflow-hidden bg-secondary">
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/5 shrink-0 gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 md:p-2 rounded-xl bg-white/10 text-primary shrink-0">
                <ActiveIcon size={18} />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm md:text-base font-bold text-white truncate">
                  {activeTab || "Vehicle Specifications"}
                </h2>
                {specData[activeTab] && (
                  <p className="text-[11px] text-white/50 hidden sm:block">
                    {Object.keys(specData[activeTab]).length} items in this section
                  </p>
                )}
              </div>
            </div>

            {/* Header Actions: Search + Close */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Search Bar - Removed */}

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="rounded-full p-1.5 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white cursor-pointer transition-all shrink-0 border border-white/10"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* SPECIFICATIONS GRID CONTENT */}
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto custom-scrollbar overscroll-contain p-4 md:p-6"
          >
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="h-12 bg-white/5 animate-pulse rounded-lg"
                  />
                ))}
              </div>
            ) : categories.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 text-white/50 space-y-2">
                <Layers size={36} className="text-white/20" />
                <p className="text-xs md:text-sm font-medium">No specifications available</p>
              </div>
            ) : filteredSpecs.length > 0 ? (
              <div
                key={activeTab}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 animate-in fade-in duration-200"
              >
                {filteredSpecs.map(([key, value], index) => (
                  <div
                    key={index}
                    className="flex flex-col pb-3 border-b border-white/5 last:border-0 sm:last:border-b"
                  >
                    <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-0.5">
                      {key}
                    </span>
                    <span className="text-xs md:text-sm font-semibold text-white break-words">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 text-white/50 space-y-2">
                <Search size={32} className="text-white/20" />
                <p className="text-xs md:text-sm font-medium">No matching specifications found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

