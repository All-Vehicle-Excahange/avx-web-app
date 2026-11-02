"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import {
  X,
  LogIn,
  Loader2,
  Percent,
  AlertCircle,
  PartyPopper,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { claimRedeemCode } from "@/services/subscription.service";

// Backend contract validation error messages
const REDEEM_ERROR_MESSAGES = {
  USER_NOT_FOUND: "User account not found or is currently inactive.",
  REDEEM_CODE_NOT_FOUND: "Invalid redeem code. Please check and try again.",
  REDEEM_CODE_EXPIRED: "This redeem code has expired.",
  REDEEM_CODE_FULLY_REDEEMED: "This redeem code has reached its maximum usage limit.",
  REDEEM_CODE_ALREADY_CLAIMED: "You have already claimed this redeem code.",
  USER_ALREADY_HAS_ACTIVE_SUBSCRIPTION: "You already have an active subscription (Free or Paid).",
  FREE_TIER_PLAN_NOT_CONFIGURED: "Free tier plan is currently not configured in the system.",
};

export default function PromoCodeModal({
  isOpen,
  onClose,
  onRedeemSuccess,
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isLoggedIn, openLoginPopup } = useAuthStore();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [successInfo, setSuccessInfo] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);

  const triggerClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setError("");
      setSuccessInfo(null);
      setCode("");
      onClose();
    }, 250);
  }, [onClose]);

  // Keep sidebar scrollbar visible while preventing background page scrolling
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

  const handleApply = async () => {
    const targetCode = code.trim().toUpperCase();

    if (!targetCode) {
      setError("Please enter a redeem code.");
      return;
    }

    setError("");
    setSuccessInfo(null);
    setIsSubmitting(true);

    // If not logged in, prompt user to log in first
    if (!isLoggedIn) {
      setIsSubmitting(false);
      setError("Authentication required: Please log in to claim this code.");
      openLoginPopup({
        entry_context: "redeem_code",
        trigger_action: "claim_redeem_code",
        user_role_intent: "consultant",
      });
      return;
    }

    try {
      // Call Claim Redeem Code API (POST /api/v1/website/subscription/redeem)
      const res = await claimRedeemCode(targetCode, user?.id || user?.userId);

      // Successful redemption (201 CREATED)
      const subData = res?.data || res;
      setSuccessInfo({
        code: targetCode,
        message: "Redeem code claimed successfully! Redirecting to KYC...",
      });

      // Update client state & refresh queries
      if (typeof window !== "undefined") {
        localStorage.setItem("sellerTier", "FREE");
        if (subData) {
          localStorage.setItem("sellerTierData", JSON.stringify(subData));
        }
      }

      queryClient.invalidateQueries({ queryKey: ["seller-tier"] });
      toast.success("Free Tier Activated!");

      // Immediately close PromoCodeModal so PaymentLoadingModal displays seamlessly without animation delays
      setIsClosing(false);
      setError("");
      setSuccessInfo(null);
      setCode("");
      onClose();
      onRedeemSuccess?.(subData);
    } catch (err) {
      const errCode = err?.code || err?.message;

      // Map backend error message to user-friendly text
      const friendlyMessage =
        REDEEM_ERROR_MESSAGES[errCode] ||
        err?.message ||
        "Invalid redeem code. Please check and try again.";

      setError(friendlyMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overscroll-contain"
      onClick={triggerClose}
      onWheel={(e) => {
        e.preventDefault();
      }}
      onTouchMove={(e) => {
        e.preventDefault();
      }}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.15s ease-in forwards"
          : "modalBackdropIn 0.15s ease-out",
      }}
    >
      <div
        ref={modalRef}
        className="relative flex flex-col w-full max-w-[430px] overflow-hidden rounded-2xl shadow-2xl bg-secondary border border-primary/10 text-primary overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => {
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
            ? "modalCardOut 0.15s ease-in forwards"
            : "modalCardIn 0.15s ease-out",
        }}
      >
        {/* CLOSE BUTTON - EXACT LOGIN POPUP DESIGN */}
        <button
          type="button"
          onClick={triggerClose}
          className="absolute bg-white cursor-pointer top-4 right-4 z-20 p-1.5 rounded-full hover:opacity-80 text-secondary shadow-md transition-opacity"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* HEADER - LOGIN POPUP STYLING */}
        <div className="p-5 sm:p-6 pb-4 border-b border-primary/10 pr-12">
          <h3 className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight font-primary">
            Claim Redeem Code
          </h3>
          <p className="text-xs sm:text-sm text-third mt-1 leading-snug font-secondary">
            Enter your redeem code to activate your Free subscription tier.
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* SUCCESS BANNER */}
          {successInfo && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-start gap-2.5 animate-in fade-in zoom-in-95 duration-200">
              <PartyPopper size={18} className="shrink-0 text-emerald-400 mt-0.5" />
              <div>
                <p className="font-bold text-xs sm:text-sm text-primary">Free Tier Activated!</p>
                <p className="text-[11px] sm:text-xs text-emerald-300 mt-0.5 leading-relaxed">
                  Redeem code <strong>{successInfo.code}</strong> claimed successfully. Redirecting to KYC...
                </p>
              </div>
            </div>
          )}

          {/* SINGLE INPUT FORM WITH INLINE ACTION BUTTON */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-primary/70">
                Redeem Code
              </label>
              {!isLoggedIn && (
                <button
                  type="button"
                  onClick={() =>
                    openLoginPopup({
                      entry_context: "redeem_code",
                      trigger_action: "login_button",
                      user_role_intent: "consultant",
                    })
                  }
                  className="text-xs text-fourth hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  <LogIn size={11} />
                  <span>Log in first</span>
                </button>
              )}
            </div>

            <div className="relative flex items-center border border-primary/20 bg-primary/5 hover:border-primary/40 focus-within:border-fourth rounded-xl transition-all duration-200 overflow-hidden">
              <span className="absolute left-3.5 text-primary/50 pointer-events-none flex items-center justify-center">
                <Percent size={15} />
              </span>
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  if (error) setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleApply();
                  }
                }}
                placeholder="e.g. FREE2026"
                autoFocus
                disabled={isSubmitting}
                className="w-full bg-transparent pl-10 pr-28 py-3 text-primary text-sm font-mono uppercase tracking-wider placeholder:normal-case placeholder:font-sans placeholder:tracking-normal placeholder:text-primary/30 outline-none"
              />
              <button
                type="button"
                onClick={handleApply}
                disabled={!code.trim() || isSubmitting}
                className={`absolute right-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  code.trim() && !isSubmitting
                    ? "bg-primary text-secondary hover:bg-primary/90 shadow-sm"
                    : "bg-primary/10 text-primary/30 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    <span>Claiming...</span>
                  </>
                ) : (
                  <span>Claim Code</span>
                )}
              </button>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="flex items-start gap-2 mt-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span className="leading-snug">{error}</span>
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
