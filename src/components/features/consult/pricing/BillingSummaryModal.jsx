"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Receipt, Tag } from "lucide-react";
import Button from "@/components/ui/button";

export default function BillingSummaryModal({
  isOpen,
  onClose,
  onConfirm,
  tier,
  yearly = false,
  isLoading = false,
  appliedPromo = null,
}) {
  const [agreed, setAgreed] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);

  const triggerClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setAgreed(false);
      onClose();
    }, 250);
  }, [onClose]);

  // Prevent background scroll without hiding the scrollbar (keeps sidebar scrollbar visible)
  useEffect(() => {
    if (!isOpen) return;

    const preventBackgroundScroll = (e) => {
      let target = e.target;
      let canScroll = false;

      while (target && target !== document.body && target !== document.documentElement) {
        if (modalRef.current && modalRef.current.contains(target)) {
          const style = window.getComputedStyle(target);
          const hasScrollableOverflow =
            (style.overflowY === "auto" || style.overflowY === "scroll") &&
            target.scrollHeight > target.clientHeight;

          if (hasScrollableOverflow) {
            const isScrollingUp = e.deltaY < 0;
            const isScrollingDown = e.deltaY > 0;
            const isAtTop = target.scrollTop <= 0;
            const isAtBottom =
              target.scrollTop + target.clientHeight >= target.scrollHeight - 1;

            if ((isScrollingUp && !isAtTop) || (isScrollingDown && !isAtBottom)) {
              canScroll = true;
            }
            break;
          }
        }
        target = target.parentElement;
      }

      if (!canScroll && e.cancelable) {
        e.preventDefault();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      let target = e.target;
      let canScroll = false;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;

      while (target && target !== document.body && target !== document.documentElement) {
        if (modalRef.current && modalRef.current.contains(target)) {
          const style = window.getComputedStyle(target);
          const hasScrollableOverflow =
            (style.overflowY === "auto" || style.overflowY === "scroll") &&
            target.scrollHeight > target.clientHeight;

          if (hasScrollableOverflow) {
            const isScrollingUp = deltaY < 0;
            const isScrollingDown = deltaY > 0;
            const isAtTop = target.scrollTop <= 0;
            const isAtBottom =
              target.scrollTop + target.clientHeight >= target.scrollHeight - 1;

            if ((isScrollingUp && !isAtTop) || (isScrollingDown && !isAtBottom)) {
              canScroll = true;
            }
            break;
          }
        }
        target = target.parentElement;
      }

      if (!canScroll && e.cancelable) {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        triggerClose();
        return;
      }
      const scrollKeys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (scrollKeys.includes(e.key)) {
        const isInput = ["INPUT", "TEXTAREA", "SELECT"].includes(e.target?.tagName);
        if (!isInput && e.cancelable) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener("wheel", preventBackgroundScroll, { passive: false, capture: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });
    document.addEventListener("wheel", preventBackgroundScroll, { passive: false, capture: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", preventBackgroundScroll, { capture: true });
      window.removeEventListener("touchstart", handleTouchStart, { capture: true });
      window.removeEventListener("touchmove", handleTouchMove, { capture: true });
      document.removeEventListener("wheel", preventBackgroundScroll, { capture: true });
      document.removeEventListener("touchmove", handleTouchMove, { capture: true });
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, triggerClose]);

  if (!isOpen && !isClosing) return null;

  const handleClose = triggerClose;

  const rawTotal = Number(yearly ? tier?.yearlyPrice : tier?.monthlyPrice) || 0;
  let basePrice = Number((rawTotal / 1.18).toFixed(2));
  if (Math.round(basePrice) > 0 && Math.round(basePrice) % 10 === 8) {
    basePrice = Math.round(basePrice) + 1;
  }

  const discountAmount = appliedPromo
    ? Number((basePrice * (appliedPromo.discountPercent / 100)).toFixed(2))
    : 0;
  const finalBasePrice = Math.max(0, basePrice - discountAmount);
  const gstAmount = Number((finalBasePrice * 0.18).toFixed(2));
  const totalPayable = Number((finalBasePrice + gstAmount).toFixed(2));

  const formatIN = (num) =>
    num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 font-secondary overscroll-contain"
      onClick={handleClose}
      onWheel={(e) => {
        e.preventDefault();
      }}
      onTouchMove={(e) => {
        e.preventDefault();
      }}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      <div
        ref={modalRef}
        className="relative flex flex-col w-full max-w-[500px] overflow-hidden rounded-2xl shadow-2xl bg-[#121212] text-white border border-white/10 overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => {
          // Prevent wheel inside non-scrollable modal from bubbling to background
          let target = e.target;
          let canScroll = false;
          while (target && target !== modalRef.current) {
            const style = window.getComputedStyle(target);
            if (
              (style.overflowY === "auto" || style.overflowY === "scroll") &&
              target.scrollHeight > target.clientHeight
            ) {
              const isUp = e.deltaY < 0;
              const isDown = e.deltaY > 0;
              const atTop = target.scrollTop <= 0;
              const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 1;
              if ((isUp && !atTop) || (isDown && !atBottom)) {
                canScroll = true;
              }
              break;
            }
            target = target.parentElement;
          }
          if (!canScroll) {
            e.stopPropagation();
            if (e.cancelable) e.preventDefault();
          }
        }}
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
              <span className={`font-semibold ${discountAmount > 0 ? "line-through text-zinc-500 text-xs" : "text-zinc-200"}`}>
                ₹{formatIN(basePrice)}
              </span>
            </div>

            {/* PROMO DISCOUNT ROW */}
            {appliedPromo && discountAmount > 0 && (
              <div className="flex items-center justify-between text-sm text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <Tag size={13} className="text-emerald-400" />
                  <span>Promo ({appliedPromo.code} -{appliedPromo.discountPercent}%)</span>
                </span>
                <span className="font-bold">
                  -₹{formatIN(discountAmount)}
                </span>
              </div>
            )}

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
            onClick={() => onConfirm(tier, appliedPromo)}
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

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
