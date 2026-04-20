"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/ui/button";
import { X } from "lucide-react";

function MarkSoldPopup({ onClose, onConfirm, loading = false }) {
  const [closingPrice, setClosingPrice] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const triggerClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  }, [onClose]);

  const handleSubmit = () => {
    onConfirm(closingPrice || null);
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={triggerClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-secondary border border-third/30 p-6 shadow-lg space-y-6"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.25s ease-in forwards"
            : "modalCardIn 0.3s ease-out",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary">Mark as Sold</h2>
          <button
            onClick={triggerClose}
            className="bg-white/10 cursor-pointer p-1.5 rounded-full hover:bg-white/20 text-primary transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-sm text-third font-medium leading-relaxed">
            Are you sure you want to mark this vehicle as sold? You can optionally enter the final closing price below.
          </p>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-third/70">
              Closing Price (Optional)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-third font-bold">₹</span>
              <input
                type="number"
                value={closingPrice}
                onChange={(e) => setClosingPrice(e.target.value)}
                placeholder="Enter final price..."
                className="w-full rounded-xl bg-primary/5 border border-third/30 pl-8 pr-4 py-3 text-primary outline-none focus:border-primary transition font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <Button showIcon={false} variant="outlineSecondary" onClick={triggerClose} className="px-6">
            Cancel
          </Button>
          <Button 
            showIcon={false} 
            variant="ghost" 
            onClick={handleSubmit}
            loading={loading}
            className="px-8"
          >
            Confirm Sale
          </Button>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

export default MarkSoldPopup;
