"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Crown } from "lucide-react";
import Image from "next/image";
import { FiArrowRight, FiAlertTriangle } from "react-icons/fi";
import Button from "@/components/ui/button";

export default function DowngradeModal({
  isOpen,
  onClose,
  onConfirm,
  fromTier = "PREMIUM",
  toTier = "PRO",
  fromTierObj = null,
  toTierObj = null,
  allTiers = [],
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

  const currentTierUpper = (fromTier || "").toUpperCase();
  const selectedTierUpper = (toTier || "").toUpperCase();

  // Find exact tier objects if not passed directly
  const activeFromObj =
    fromTierObj ||
    allTiers.find(
      (t) => (t.title || "").toUpperCase() === currentTierUpper
    );
  const activeToObj =
    toTierObj ||
    allTiers.find(
      (t) => (t.title || "").toUpperCase() === selectedTierUpper
    );

  // Helper to extract feature strings from tier object
  const extractFeatures = (tierObj) => {
    if (!tierObj) return [];
    const list =
      (yearly ? tierObj.yearlyFeatures : tierObj.monthlyFeatures) ||
      tierObj.features ||
      [];
    return list
      .map((f) => {
        const titleVal =
          typeof f === "string"
            ? f
            : f?.title || f?.featureName || f?.name || "";
        const descVal =
          typeof f === "string"
            ? ""
            : f?.description || f?.featureDescription || "";
        return descVal ? `${titleVal} (${descVal})` : titleVal;
      })
      .filter(Boolean);
  };

  const fromFeatures = extractFeatures(activeFromObj);
  const toFeatures = extractFeatures(activeToObj);

  // Find features in fromTier that are missing in toTier
  const lostPageFeatures = fromFeatures.filter((ff) => {
    const norm = ff.toLowerCase().trim();
    return !toFeatures.some(
      (tf) =>
        tf.toLowerCase().trim().includes(norm) ||
        norm.includes(tf.toLowerCase().trim())
    );
  });

  // Base structural impacts between tier levels
  const getBaseImpacts = () => {
    if (currentTierUpper === "PREMIUM" && selectedTierUpper === "PRO") {
      return [
        "Active Listings will reduce from Unlimited → 15",
        "Listings exceeding 15 will become inactive immediately.",
        "Premium Storefront theme will no longer be available.",
        "Video Banner will be removed.",
        "Gallery limit will reduce from 25 → 10 images.",
        "PPC Wallet Credits will reduce from 500 → 200/month.",
        "Free Inspection benefits will no longer apply.",
        "Premium analytics and growth insights will be unavailable.",
      ];
    } else if (currentTierUpper === "PREMIUM" && selectedTierUpper === "BASIC") {
      return [
        "Active Listings will reduce from Unlimited → 5",
        "Listings exceeding 5 will become inactive immediately.",
        "Premium & Pro Storefront themes will no longer be available.",
        "Video Banner will be removed.",
        "Gallery limit will reduce from 25 → 5 images.",
        "PPC Wallet Credits will reduce from 500 → 0/month.",
        "Free Inspection benefits will no longer apply.",
        "Analytics and growth insights will be unavailable.",
      ];
    } else if (currentTierUpper === "PRO" && selectedTierUpper === "BASIC") {
      return [
        "Active Listings will reduce from 15 → 5",
        "Listings exceeding 5 will become inactive immediately.",
        "Pro Storefront theme will no longer be available.",
        "Gallery limit will reduce from 10 → 5 images.",
        "PPC Wallet Credits will reduce from 200 → 0/month.",
        "Pro analytics will be unavailable.",
      ];
    }
    return [
      `Active Listings will reduce to ${toTier} plan limits.`,
      `Listings exceeding ${toTier} limit will become inactive immediately.`,
      `Storefront features of ${fromTier} will no longer be available.`,
      "Analytics and growth insights will be reduced.",
    ];
  };

  const baseImpacts = getBaseImpacts();

  // Include any extra unique features listed on the pricing page from the API
  const additionalLostItems = lostPageFeatures
    .filter((feat) => {
      const lower = feat.toLowerCase();
      return !baseImpacts.some((bi) => bi.toLowerCase().includes(lower));
    })
    .map((feat) => `${feat} will no longer be available.`);

  const impactList = [...baseImpacts, ...additionalLostItems];

  const modalContent = (
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
        className="relative flex flex-col md:flex-row w-full max-w-[720px] min-h-[400px] md:min-h-[460px] md:h-[460px] overflow-hidden rounded-2xl shadow-2xl bg-[#121212] text-white border border-white/10"
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

        {/* LEFT COLUMN: VISUAL IMAGE SPLIT (MD AND UP ONLY) */}
        <div className="hidden md:block w-5/12 h-full relative bg-black overflow-hidden shrink-0 border-r border-white/10">
          <Image
            src="/auth-image-2.webp"
            priority
            alt="Subscription Plan Info"
            fill
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/20 to-black/70" />

          {/* Banner content */}
          <div className="absolute bottom-8 left-6 right-6 z-10 flex flex-col">
            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/35 rounded-xl flex items-center justify-center mb-3">
              <Crown className="text-amber-400 w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider">
              Subscription
            </h4>
            <p className="text-zinc-300 text-xs mt-1.5 leading-relaxed">
              Review your downgrade checklist before continuing to the Pro features.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: DOWNGRADE CONTENT */}
        <div className="w-full md:w-7/12 flex flex-col justify-between h-full md:h-[460px] bg-[#121212] text-white overflow-hidden">
          {/* HEADER (MOBILE ONLY) */}
          <div className="md:hidden p-4 text-center border-b border-white/10 bg-white/[0.02] shrink-0">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-1.5 mx-auto">
              <Crown size={16} className="text-amber-400" />
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Downgrading Your Plan
            </h3>
            <p className="mt-0.5 text-[10px] text-zinc-400">
              Switching to {toTier} will reduce your listing limits immediately.
            </p>
          </div>

          {/* SCROLLABLE DETAILS */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 custom-scrollbar">
            {/* COMPARISON PILLS */}
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-center sm:text-left flex-1">
                <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 block mb-0.5">
                  Current Plan
                </span>
                <span className="text-xs font-bold text-amber-400 uppercase">
                  {fromTier}
                </span>
              </div>

              <div className="w-6 h-6 rounded-full bg-white/10 border border-white/10 text-zinc-300 flex items-center justify-center shrink-0">
                <FiArrowRight className="text-[10px]" />
              </div>

              <div className="text-center sm:text-right flex-1">
                <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 block mb-0.5">
                  Selected Plan
                </span>
                <span className="text-xs font-bold text-[#007bff] uppercase">
                  {toTier}
                </span>
              </div>
            </div>

            {/* DOWNGRADE CHECKLIST */}
            <div className="rounded-xl bg-white/[0.02] border border-white/10 p-3 space-y-1.5">
              <h4 className="text-[11px] font-semibold text-zinc-200">
                After switching to <span className="underline font-bold text-[#007bff]">{toTier}</span>, the following changes will happen:
              </h4>

              <ul className="space-y-1.5 pt-0.5">
                {impactList.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-1.5 text-[11px] text-zinc-300 leading-snug"
                  >
                    <div className="w-3 h-3 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <FiAlertTriangle className="text-[8px]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RECOMMENDATION BOX */}
            <div className="p-2.5 rounded-lg bg-[#007bff]/10 border border-[#007bff]/20 text-[11px]">
              <span className="text-[9px] font-bold text-[#007bff] uppercase tracking-wider block mb-0.5">
                Recommended for your business
              </span>
              <p className="text-zinc-300 text-[11px] leading-relaxed">
                Based on your current inventory and usage, <span className="font-semibold text-amber-400">{fromTier}</span> is still the best plan for you. Downgrading may reduce your visibility.
              </p>
            </div>

            {/* INTERACTIVE AGREEMENT */}
            <label className="flex items-start gap-2 pt-0.5 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-3.5 h-3.5 mt-0.5 rounded border-zinc-700 bg-zinc-900 text-[#007bff] focus:ring-[#007bff] shrink-0 cursor-pointer"
              />
              <span className="text-[11px] font-medium text-zinc-300 group-hover:text-white transition-colors leading-snug">
                I understand that the above changes will take effect immediately.
              </span>
            </label>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="p-3 border-t border-white/10 flex items-center justify-end gap-3 shrink-0 bg-[#121212]">
            <Button
              type="button"
              onClick={handleClose}
              variant="outlineSecondary"
              size="sm"
              className="w-full sm:w-auto text-xs py-1.5 px-4"
            >
              Keep {fromTier}
            </Button>
            <Button
              type="button"
              disabled={!agreed || isLoading}
              loading={isLoading}
              onClick={onConfirm}
              variant="ghost"
              size="sm"
              className="w-full sm:w-auto text-xs font-bold py-1.5 px-4"
            >
              Continue with {toTier}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
