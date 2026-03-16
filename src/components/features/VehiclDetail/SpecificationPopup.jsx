"use client";
import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Check } from "lucide-react";

const DATA = {
  Safety: ["Airbags (6)", "ABS", "ESP", "Traction Control"],

  Comfort: ["Climate Control", "Cruise Control", "Sunroof", "Ventilated Seats"],

  Technology: [
    "Android Auto",
    "Apple CarPlay",
    "Reverse Camera",
    "Parking Sensors",
  ],

  Entertainment: ["Bluetooth", "USB", "Radio", "CD Player"],

  Interior: ["Leather seats", "Ambient lighting", "Adjustable headrests"],

  Exterior: ["Alloy wheels", "LED headlamps", "Fog lamps"],
};

export default function SpecificationPopup({ open, onClose }) {
  const [activeTab, setActiveTab] = useState("Safety");
  const [isClosing, setIsClosing] = useState(false);

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

  if (!open && !isClosing) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-secondary/40 backdrop-blur-md"
      onClick={handleClose}
      style={{ animation: isClosing ? 'modalBackdropOut 0.25s ease-in forwards' : 'modalBackdropIn 0.25s ease-out' }}
    >
      {/* MODAL */}
      <div
        className="w-4xl max-w-4xl h-[65vh] bg-secondary rounded-2xl shadow-2xl overflow-hidden flex border-2 border-primary/40"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: isClosing ? 'modalCardOut 0.25s ease-in forwards' : 'modalCardIn 0.3s ease-out' }}
      >
        {/* LEFT TABS */}
        <div className="w-52 border-r border-primary/20 p-4 space-y-1">
          {Object.keys(DATA).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left cursor-pointer px-3 py-2 rounded-md text-sm transition ${activeTab === tab
                ? "bg-primary/10 text-primary border-l-4 border-primary"
                : "text-primary/70 hover:bg-primary/5"
                }`}
            >
              {tab}
            </button>
          ))}
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
            {DATA[activeTab].map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-3 border-b border-primary/20 pb-2"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                  <Check size={14} className="text-primary" />
                </span>
                <span className="text-sm text-primary">{feature}</span>
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
