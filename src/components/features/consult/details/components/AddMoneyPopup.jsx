"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Wallet, IndianRupee, AlertCircle } from "lucide-react";
import Button from "@/components/ui/button";
import { addTopUpPaymemt } from "@/services/waller.service";

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
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      onClick={handleClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      <div
        className="relative flex flex-col w-full max-w-[440px] overflow-hidden rounded-2xl shadow-2xl bg-[#121214] border border-zinc-800/80 text-white p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.25s ease-in forwards"
            : "modalCardIn 0.3s ease-out",
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={handleClose}
          className="absolute cursor-pointer top-4 right-4 z-20 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-150"
        >
          <X size={16} />
        </button>

        {/* WALLET ICON DECORATIVE */}
        <div className="mx-auto mb-4 flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
          <Wallet className="w-5 h-5" />
        </div>

        {/* HEADER */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold tracking-tight text-white font-primary">
            Add Money to Wallet
          </h3>
          <p className="text-zinc-400 text-xs mt-1.5 max-w-xs mx-auto leading-relaxed">
            Top up your wallet to continue seamless campaigns and payments.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Enter Amount
            </label>
            <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded-xl focus-within:border-white focus-within:ring-1 focus-within:ring-white/20 transition-all duration-150">
              <span className="absolute left-4 text-zinc-400 flex items-center justify-center font-bold">
                <IndianRupee size={18} />
              </span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0.00"
                className="w-full bg-transparent pl-11 pr-4 py-3.5 text-white text-lg outline-none font-bold placeholder:text-zinc-600"
                autoFocus
              />
            </div>
            
            {/* Validation / Helper Text */}
            {error ? (
              <p className="text-red-400 text-xs flex items-center gap-1.5 font-medium mt-1">
                <AlertCircle size={14} className="shrink-0" />
                {error}
              </p>
            ) : (
              <p className="text-zinc-500 text-xs font-medium mt-1">
                Minimum: ₹200 | Maximum: 7 digits
              </p>
            )}
          </div>

          {/* QUICK SUGGESTIONS */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Quick Selection
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {quickAmounts.map((amt) => {
                const isSelected = amount === amt.toString();
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleQuickSelect(amt)}
                    className={`py-2 rounded-lg text-[11px] font-bold border transition duration-150 cursor-pointer text-center ${
                      isSelected
                        ? "bg-white border-white text-black shadow-[0_2px_8px_rgba(255,255,255,0.1)]"
                        : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
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
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
