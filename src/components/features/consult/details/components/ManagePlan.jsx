import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Check, Wallet, ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/router";
import Button from "@/components/ui/button";
import Image from "next/image";

export default function ManagePlan({ isOpen, onClose, currentPlan = "BASIC" }) {
  const { push } = useRouter();
  const [isClosing, setIsClosing] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Normalize currentPlan to title case (e.g. Basic, Pro, Premium)
  const formatPlanName = (plan) => {
    if (!plan) return "Basic";
    const lower = plan.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const currentPlanName = formatPlanName(currentPlan);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpgradeClick = () => {
    push("/consult/pricing");
    onClose();
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      onClick={handleClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      <div
        className="relative flex w-full max-w-[850px] overflow-hidden rounded-2xl shadow-2xl bg-[#141416] border border-[#23262F]/80 text-white"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.25s ease-in forwards"
            : "modalCardIn 0.3s ease-out",
        }}
      >
        {/* LEFT IMAGE SIDE */}
        <div className="hidden md:block w-5/12 relative min-h-[460px]">
          <Image
            src="/cs.webp"
            priority
            alt="Boost Visibility"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#141416] via-[#141416]/40 to-transparent" />
          <div className="absolute bottom-8 left-8 right-6 space-y-2 text-left">
            
            <h2 className="text-2xl font-extrabold text-white leading-tight">
              Unlock
              <br />
              Full Potential
            </h2>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Get promotional wallet credits, higher search priority, storefront customization, and PPC campaigns access.
            </p>
          </div>
        </div>

        {/* RIGHT CONTENT SIDE */}
        <div className="w-full md:w-7/12 p-6 md:p-8 bg-[#141416] flex flex-col justify-center text-left relative">
          {/* CLOSE BUTTON */}
          <button
            onClick={handleClose}
            className="absolute cursor-pointer top-4 right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/85 transition"
          >
            <X size={20} />
          </button>

          {/* CROWN / DECORATIVE ICON */}
          <div className="mr-auto mb-4 flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
            <ShieldCheck className="w-7 h-7 text-yellow-500" />
          </div>

          {/* HEADER */}
          <div className="mb-4 text-left">
            <h3 className="text-xl font-bold tracking-tight text-white">
              Upgrade to Premium Consultant
            </h3>
            <p className="text-gray-400 text-xs mt-1.5 font-medium leading-relaxed">
              Your current <span className="text-white font-semibold">{currentPlanName}</span> subscription has 15 days remaining.
            </p>
          </div>

          {/* WALLET CREDIT INFO */}
          <div className="rounded-xl border border-dashed border-yellow-500/30 bg-yellow-500/5 p-4 mb-4">
            <div className="flex items-start gap-2.5">
              <Wallet className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-yellow-500 leading-snug">
                  ₹500 equivalent value will be credited to your Reecomm Promotional Wallet.
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-yellow-500/10">
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-2">
                These credits can be used for:
              </p>
              <ul className="space-y-1.5 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <span>PPC campaigns</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <span>listing boosts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <span>inspections</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <span>premium visibility tools</span>
                </li>
              </ul>
            </div>
          </div>

          {/* NOT-REFUNDABLE NOTICE */}
          <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-400 mb-4 select-none hover:text-white transition">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="rounded border-[#23262F] bg-transparent text-primary focus:ring-primary w-4 h-4 cursor-pointer"
            />
            <span>Credits are non-refundable and valid for 30 days.</span>
          </label>

          {/* ACTION BUTTON */}
          <Button
            onClick={handleUpgradeClick}
            full={true}
            variant="ghost"
            disabled={!acceptedTerms}
          >
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}