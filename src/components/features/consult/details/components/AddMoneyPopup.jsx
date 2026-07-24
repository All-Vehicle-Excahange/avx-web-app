"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Wallet, IndianRupee, AlertCircle } from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";

export default function AddMoneyPopup({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}) {
  const [amount, setAmount] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [error, setError] = useState("");

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
      setAmount("");
      setError("");
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAmountChange = (val) => {
    // Remove non-digits
    const digitsOnly = val.replace(/\D/g, "");

    // Limit to max 7 digits (length)
    if (digitsOnly.length > 7) return;

    setAmount(digitsOnly);

    if (digitsOnly === "") {
      setError("");
      return;
    }

    const numVal = parseInt(digitsOnly, 10);
    if (numVal < 200) {
      setError("Minimum amount required is ₹200");
    } else {
      setError("");
    }
  };

  const handleQuickSelect = (val) => {
    setAmount(val.toString());
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) {
      setError("Please enter an amount");
      return;
    }
    const numVal = parseInt(amount, 10);
    if (numVal < 200) {
      setError("Minimum amount required is ₹200");
      return;
    }
    if (amount.length > 7) {
      setError("Maximum 7 digits allowed");
      return;
    }

    if (onConfirm) {
      onConfirm(numVal);
    }
  };

  const quickAmounts = [200, 500, 1000, 2000, 5000];

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
        className="relative flex w-full max-w-[780px] overflow-hidden rounded-2xl shadow-2xl bg-[#141416] border border-[#23262F]/80 text-white"
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
            alt="Reecomm Wallet Topup"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#141416] via-[#141416]/40 to-transparent" />
          <div className="absolute bottom-8 left-8 right-6 space-y-2 text-left">
            <h2 className="text-2xl font-extrabold text-white leading-tight">
              Top up
              <br />
              Your Wallet
            </h2>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Keep your campaigns, boosts, and featured listings running
              smoothly with instant balance top-ups.
            </p>
          </div>
        </div>

        {/* RIGHT CONTENT FORM SIDE */}
        <div className="w-full md:w-7/12 p-6 md:p-8 bg-[#141416] flex flex-col justify-center text-left relative">
          {/* CLOSE BUTTON */}
          <button
            onClick={handleClose}
            className="absolute cursor-pointer top-4 right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/85 transition"
          >
            <X size={20} />
          </button>

          {/* WALLET ICON DECORATIVE */}
          <div className="mr-auto mb-4 flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-850 text-zinc-300">
            <Wallet className="w-6 h-6 text-yellow-500" />
          </div>

          {/* HEADER */}
          <div className="mb-6">
            <h3 className="text-xl font-bold tracking-tight text-white font-primary">
              Add Money to Wallet
            </h3>
            <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">
              Top up your wallet to continue seamless campaigns and payments.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block ml-0.5">
                Enter Amount
              </label>
              <div className="relative flex items-center bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-xl focus-within:border-white transition-all duration-200">
                <span className="absolute left-4 text-white/40 flex items-center justify-center font-bold">
                  <IndianRupee size={20} />
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent pl-12 pr-4 py-4 text-white text-xl outline-none font-extrabold placeholder:text-white/10"
                  autoFocus
                />
              </div>

              {/* Validation / Helper Text */}
              {error ? (
                <p className="text-red-400 text-xs flex items-center gap-1.5 font-medium mt-1 ml-0.5">
                  <AlertCircle size={14} className="shrink-0" />
                  {error}
                </p>
              ) : (
                <p className="text-zinc-500 text-[10px] font-medium mt-1 ml-0.5">
                  Minimum: ₹200 | Maximum: 7 digits
                </p>
              )}
            </div>

            {/* QUICK SUGGESTIONS */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block ml-0.5">
                Quick Selection
              </label>
              <div className="grid grid-cols-5 gap-2">
                {quickAmounts.map((amt) => {
                  const isSelected = amount === amt.toString();
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleQuickSelect(amt)}
                      className={`py-3 rounded-xl text-[11px] font-bold border transition-all duration-300 cursor-pointer text-center relative overflow-hidden ${isSelected
                          ? "bg-white border-white text-[#121214] font-extrabold shadow-[0_4px_20px_rgba(255,255,255,0.25)] scale-[1.03]"
                          : "bg-white/[0.02] border-white/5 text-zinc-300 hover:bg-white/[0.06] hover:border-white/15 hover:text-white"
                        }`}
                    >
                      ₹{amt.toLocaleString("en-IN")}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="button"
                variant="outlineSecondary"
                full={true}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="ghost"
                full={true}
                disabled={
                  loading ||
                  !amount ||
                  parseInt(amount, 10) < 200 ||
                  amount.length > 7
                }
                loading={loading}
              >
                Proceed to Pay
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
