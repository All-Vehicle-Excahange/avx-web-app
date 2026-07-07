"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getVehicleSpecificationQuery, getVehicleExtraDetailsQuery } from "@/queries/vehicle.queries";

export default function SpecificationPopup({ open, onClose, variantId, vehicleId }) {
  const [activeTab, setActiveTab] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const popupRef = useRef(null);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

  const transformedExtra = {};
  if (Array.isArray(extraData) && extraData.length > 0) {
    extraData.forEach((item) => {
      if (item.detailKey && Array.isArray(item.detailValues)) {
        transformedExtra[item.detailKey] = item.detailValues.join(", ");
      }
    });
  }

  const specData = {
    ...(data?.specifications || {}),
  };

  if (Object.keys(transformedExtra).length > 0) {
    specData["Modifications"] = transformedExtra;
  }
  const categories = Object.keys(specData);

  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0]);
    }
  }, [categories, activeTab]);

  if (!open && !isClosing) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={handleClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      {/* MODAL */}
      <div
        ref={popupRef}
        className="w-full max-w-4xl h-[80vh] md:h-[70vh] bg-secondary rounded-2xl shadow-2xl overflow-hidden flex flex-row border border-third/30"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.25s ease-in forwards"
            : "modalCardIn 0.3s ease-out",
        }}
      >
        {/* LEFT SIDEBAR - CATEGORIES */}
        <div className="w-[220px] shrink-0 border-r border-white/5 overflow-y-auto custom-scrollbar flex flex-col py-2">
          {isLoading ? (
            <div className="p-4 text-sm text-primary/60">Loading...</div>
          ) : categories.length === 0 ? (
            <div className="p-4 text-sm text-primary/60">No data found</div>
          ) : (
            categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`text-left px-5 py-3 text-sm font-medium transition-all ${
                  activeTab === category
                    ? "bg-white/10 text-primary"
                    : "text-primary/60 hover:bg-white/5 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))
          )}
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* HEADER */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 shrink-0">
            <h2 className="text-lg font-bold text-primary">
              {activeTab || "Vehicle Specifications"}
            </h2>
            <button
              onClick={handleClose}
              className="rounded-full p-2 bg-primary text-secondary hover:bg-primary/90 cursor-pointer transition-all"
            >
              <X size={16} />
            </button>
          </div>

          {/* LIST */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-4">
            {categories.length === 0 && !isLoading ? (
              <div className="flex items-center justify-center h-full text-sm text-primary/60">
                No data found
              </div>
            ) : activeTab && specData[activeTab] ? (
              <ul className="flex flex-col">
                {Object.entries(specData[activeTab]).map(
                  ([key, value], index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 py-4 border-b border-white/5 last:border-0"
                    >
                      <span className="flex h-[18px] w-[18px] mt-0.5 items-center justify-center rounded-full bg-white/10 shrink-0">
                        <Check size={10} className="text-white/80" />
                      </span>
                      <div className="flex flex-col text-sm text-primary">
                        <span className="font-semibold text-primary/90 mb-1">
                          {key}
                        </span>
                        <span className="text-primary/80">{value}</span>
                      </div>
                    </li>
                  ),
                )}
              </ul>
            ) : (
              !isLoading && (
                <div className="text-sm text-primary/60">
                  No details available.
                </div>
              )
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
