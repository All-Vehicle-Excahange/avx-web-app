"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Receipt } from "lucide-react";
import Button from "@/components/ui/button";

export default function BillingSummaryModal({
  isOpen,
  onClose,
  onConfirm,
  tier,
  yearly = false,
  isLoading = false,
}) {
  const [agreed, setAgreed] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const triggerClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setAgreed(false);
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setAgreed(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const handleClose = triggerClose;

  const totalPayable = Number(yearly ? tier?.yearlyPrice : tier?.monthlyPrice) || 0;
  let basePrice = Number((totalPayable / 1.18).toFixed(2));
  if (Math.round(basePrice) > 0 && Math.round(basePrice) % 10 === 8) {
    basePrice = Math.round(basePrice) + 1;
  }
  const gstAmount = Number((totalPayable - basePrice).toFixed(2));

  const formatIN = (num) =>
    num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 font-secondary"
      onClick={handleClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      <div
        className="relative flex flex-col w-full max-w-[500px] overflow-hidden rounded-2xl shadow-2xl bg-[#121212] text-white border border-white/10"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.25s ease-in forwards"
            : "modalCardIn 0.3s ease-out",
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute bg-white/10 hover:bg-white/20 p-1.5 rounded-full text-white cursor-pointer top-4 right-4 z-30 transition-colors border border-white/15"
        >
          <X size={16} />
        </button>

        {/* HEADER */}
        <div className="p-6 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#007bff]/10 border border-[#007bff]/20 text-[#007bff] flex items-center justify-center shrink-0">
              <Receipt size={20} className="text-[#007bff]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Billing Summary
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Review your subscription details and GST breakdown
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-5">
          {/* BREAKDOWN TABLE */}
          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-5 space-y-3.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Plan</span>
              <span className="font-bold text-white uppercase tracking-wide">
                {tier?.title || "Plan"}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Billing Cycle</span>
              <span className="font-semibold text-zinc-200">
                {yearly ? "Yearly" : "Monthly"}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Base Subscription</span>
              <span className="font-semibold text-zinc-200">
                ₹{formatIN(basePrice)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">GST (18%)</span>
              <span className="font-semibold text-zinc-300">
                ₹{formatIN(gstAmount)}
              </span>
            </div>

            <div className="h-px bg-white/10 my-1" />

            <div className="flex items-center justify-between text-base pt-1">
              <span className="font-bold text-white">Total Payable</span>
              <span className="font-bold text-xl text-[#007bff]">
                ₹{formatIN(totalPayable)}
              </span>
            </div>
          </div>

          {/* INTERACTIVE AGREEMENT CHECKBOX */}
          <label className="flex items-center gap-2.5 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-[#007bff] focus:ring-[#007bff] shrink-0 cursor-pointer"
            />
            <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors leading-snug">
              I agree to the Terms &amp; Conditions
            </span>
          </label>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-4 sm:p-5 border-t border-white/10 flex items-center justify-end gap-2.5 sm:gap-3 bg-white/[0.01]">
          <Button
            type="button"
            onClick={handleClose}
            variant="outlineSecondary"
            size="sm"
            className="w-auto text-[11px] sm:text-xs py-2 px-3.5 sm:px-5 shrink-0 whitespace-nowrap"
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!agreed || isLoading}
            loading={isLoading}
            onClick={() => onConfirm(tier)}
            variant="ghost"
            size="sm"
            className="w-auto text-[11px] sm:text-xs font-bold py-2 px-3.5 sm:px-6 shrink-0 whitespace-nowrap"
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
