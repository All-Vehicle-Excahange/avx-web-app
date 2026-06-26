"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getVehicleSpecificationQuery } from "@/queries/vehicle.queries";

export default function SpecificationPopup({ open, onClose, variantId }) {
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

    // Cleanup (important!)
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

  const { data, isLoading } = useQuery({
    ...getVehicleSpecificationQuery(variantId),
    enabled: open && !!variantId,
  });

  const specData = data?.specifications || {};
  const categories = Object.keys(specData);

  useEffect(() => {
    if (categories.length > 0 && (!activeTab || !categories.includes(activeTab))) {
      setActiveTab(categories[0]);
    }
  }, [categories, activeTab]);

  if (!open && !isClosing) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={handleClose}
      style={{ animation: isClosing ? 'modalBackdropOut 0.25s ease-in forwards' : 'modalBackdropIn 0.25s ease-out' }}
    >
      {/* MODAL */}
      <div
        ref={popupRef}
        className="w-full max-w-5xl h-[75vh] bg-secondary rounded-2xl shadow-2xl overflow-hidden flex border border-third/30"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: isClosing ? 'modalCardOut 0.25s ease-in forwards' : 'modalCardIn 0.3s ease-out' }}
      >
        {/* LEFT TABS */}
        <div className="w-52 border-r border-primary/20 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="text-sm text-primary/60 p-2">Loading...</div>
          ) : categories.length === 0 ? (
            <div className="text-sm text-primary/60 p-2">No specifications found</div>
          ) : (
            categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left cursor-pointer px-3 py-2 rounded-md text-sm transition ${activeTab === tab
                  ? "bg-primary/10 text-primary border-l-4 border-primary font-medium"
                  : "text-primary/70 hover:bg-primary/5"
                  }`}
              >
                {tab}
              </button>
            ))
          )}
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 p-5 overflow-y-auto">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-primary">
              {activeTab}
            </h2>

            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-primary/10 hover:text-primary cursor-pointer bg-primary transition-all duration-300 ease-in-out  text-secondary"
            >
              <X size={18} className=" cursor-pointer" />
            </button>
          </div>

          {/* FEATURES */}
          <ul className="space-y-3">
            {specData[activeTab] &&
              Object.entries(specData[activeTab]).map(([key, value], index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 border-b border-primary/10 pb-3"
                >
                  <span className="flex h-5 w-5 mt-0.5 items-center justify-center rounded-full bg-primary/10 shrink-0">
                    <Check size={12} className="text-primary/80" />
                  </span>
                  <div className="flex flex-col text-sm text-primary flex-1">
                    <span className="font-semibold text-primary/80">{key}</span>
                    <span className="text-primary mt-0.5">{value}</span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
