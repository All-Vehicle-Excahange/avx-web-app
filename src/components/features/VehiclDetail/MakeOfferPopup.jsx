"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, CarFront } from "lucide-react";
import Button from "@/components/ui/button";
import { sendInquary } from "@/services/vehicle.service";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/useAuthStore";
import LoginPopup from "@/components/auth/LoginPopup";
import SignupPopup from "@/components/auth/SignupPopup";

export default function MakeOfferPopup({ isOpen, onClose, vehicle, onSuccess }) {
  const queryClient = useQueryClient();
  const [offerPrice, setOfferPrice] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const pendingAction = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsLoading(false);
      setMessage("");

      // Initialize with middle offer option
      if (vehicle?.price) {
        const midOffer = Math.round((vehicle.price * 0.93) / 5000) * 5000;
        setOfferPrice(midOffer.toString());
      }
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, vehicle]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  }, [onClose]);


  const listedPrice = vehicle?.price || 0;

  // Format to Lakhs (e.g. 3.40L)
  const toLakhs = (num) => {
    if (!num) return "₹0";
    return "₹" + (num / 100000).toFixed(2) + "L";
  };

  const option1 = Math.round((listedPrice * 0.90) / 5000) * 5000;
  const option2 = Math.round((listedPrice * 0.93) / 5000) * 5000;
  const option3 = Math.round((listedPrice * 0.96) / 5000) * 5000;

  const currentOffer = Number(offerPrice) || 0;
  const isOfferTooHigh = currentOffer > listedPrice;
  const displayValue = offerPrice ? currentOffer.toLocaleString("en-IN") : "";

  const inputRef = useRef(null);

  const handlePriceChange = (e) => {
    const target = e.target;
    const cursor = target.selectionStart;
    const oldVal = target.value;
    
    // Count how many digits were before the cursor
    let digitsBeforeCursor = 0;
    for (let i = 0; i < cursor; i++) {
      if (/\d/.test(oldVal[i])) digitsBeforeCursor++;
    }

    const rawVal = oldVal.replace(/\D/g, "");
    setOfferPrice(rawVal);

    // Restore cursor position after the component re-renders with the formatted value
    window.requestAnimationFrame(() => {
      if (inputRef.current) {
        const newVal = inputRef.current.value;
        let newCursor = 0;
        let digitsCounted = 0;
        for (let i = 0; i < newVal.length; i++) {
          if (digitsCounted === digitsBeforeCursor) break;
          if (/\d/.test(newVal[i])) {
            digitsCounted++;
          }
          newCursor = i + 1;
        }
        inputRef.current.setSelectionRange(newCursor, newCursor);
      }
    });
  };

  // Calculate progress bar percentage
  const minSlider = option1;
  const maxSlider = listedPrice;

  const handleAuthSuccess = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
    if (pendingAction.current === "send_offer") {
      pendingAction.current = null;
      handleSendOffer();
    }
  };

  useEffect(() => {
    if (isLoggedIn && pendingAction.current === "send_offer") {
      pendingAction.current = null;
      handleSendOffer();
    }
  }, [isLoggedIn]);

  const handleSendOffer = async () => {
    if (!isLoggedIn) {
      pendingAction.current = "send_offer";
      setIsLoginOpen(true);
      return;
    }

    const vehicleId = vehicle?._id || vehicle?.id;
    if (!currentOffer || currentOffer <= 0 || !vehicleId) return;
    try {
      setIsLoading(true);
      const payload = {
        inquiryTitle: `Offer: ₹${currentOffer.toLocaleString("en-IN")}`,
        inquiryDescription: message.trim() || `I would like to make an offer of ₹${currentOffer.toLocaleString("en-IN")} for this vehicle.`,
      };
      await sendInquary(vehicleId, payload);

      // Invalidate queries to reflect the new inquiry
      queryClient.invalidateQueries({
        queryKey: ["inquiry-eligibility", vehicleId],
      });
      queryClient.invalidateQueries({
        queryKey: ["vehicle-overview", vehicleId],
      });

      if (onSuccess) onSuccess();
      handleClose();
    } catch (error) {
      console.error("Failed to send offer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen && !isClosing) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleClose}
      style={{ animation: isClosing ? "modalBackdropOut 0.25s ease-in forwards" : "modalBackdropIn 0.25s ease-out" }}
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] bg-secondary border border-third/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: isClosing ? "modalCardOut 0.25s ease-in forwards" : "modalCardIn 0.3s ease-out" }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-1 rounded-full bg-primary text-secondary hover:bg-primary/90 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="p-4 md:p-5 flex-1 overflow-y-auto custom-scrollbar text-primary">
          {/* VEHICLE INFO */}
          <div className="flex items-center gap-4 border-b border-third/10 pb-4 mb-4">
            <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-secondary/50 flex items-center justify-center">
              {vehicle?.thumbnailUrl || vehicle?.image ? (
                <Image
                  src={vehicle?.thumbnailUrl || vehicle?.image}
                  alt="Vehicle"
                  fill
                  className="object-cover"
                />
              ) : (
                <CarFront className="w-6 h-6 text-third" />
              )}
            </div>
            <div className="pr-12">
              <h3 className="font-bold text-[15px] leading-tight text-primary">
                {vehicle?.makerName} {vehicle?.modelName} {vehicle?.variantName} {vehicle?.yearOfMfg || vehicle?.year}
              </h3>
              <p className="text-primary/60 text-xs mt-1">
                {vehicle?.location || "India"} · Used vehicle
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-primary/60 text-xs mb-1">Seller's listed price</p>
            <p className="text-2xl font-bold text-primary">₹{listedPrice.toLocaleString("en-IN")}</p>
          </div>

          <div className="mb-4">
            <p className="text-primary/60 text-xs mb-2">Your offer price</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 font-medium">₹</span>
              <input
                ref={inputRef}
                type="text"
                value={displayValue}
                onChange={handlePriceChange}
                className={`w-full bg-transparent border rounded-xl py-3 pl-8 pr-4 text-primary font-bold outline-none transition-colors ${
                  isOfferTooHigh 
                    ? "border-red-500 focus:border-red-500 bg-red-500/5" 
                    : "border-third/20 focus:border-fourth"
                }`}
                placeholder="Enter offer amount"
              />
            </div>
            {isOfferTooHigh && (
              <p className="text-red-500 text-xs mt-2 font-medium ml-1">
                Offer price cannot exceed the listed price.
              </p>
            )}

            {/* QUICK OPTIONS */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[option1, option2, option3].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setOfferPrice(opt.toString())}
                  className={`py-2 rounded-lg border text-sm font-medium cursor-pointer transition-colors ${Number(offerPrice) === opt ? "bg-third/10 border-third/50 text-primary" : "bg-transparent border-third/20 text-primary/70 hover:bg-third/5"}`}
                >
                  {toLakhs(opt)}
                </button>
              ))}
            </div>
          </div>



          {/* MESSAGE FIELD */}
          <div className="mb-4">
            <p className="text-primary/60 text-xs mb-2">Message <span className="opacity-70">(Optional)</span></p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-transparent border border-third/20 rounded-xl py-3 px-4 text-primary text-sm outline-none focus:border-fourth transition-colors resize-none custom-scrollbar"
              placeholder="I'm interested in this vehicle..."
              rows={2}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-2 mt-auto">
            <Button
              showIcon={false}
              variant="outlineSecondary"
              onClick={handleClose}
              disabled={isLoading}
              size="sm"
            >
              Cancel
            </Button>
            <Button
              showIcon={false}
              variant="ghost"
              onClick={handleSendOffer}
              loading={isLoading}
              locked={!currentOffer || currentOffer <= 0 || isOfferTooHigh}
              size="sm"
            >
              Send Offer
            </Button>
          </div>
        </div>
      </div>

      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleAuthSuccess}
        onSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />
      <SignupPopup
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSuccess={handleAuthSuccess}
        onLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes modalBackdropIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalBackdropOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes modalCardIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes modalCardOut { from { opacity: 1; transform: scale(1) translateY(0); } to { opacity: 0; transform: scale(0.95) translateY(10px); } }
      `}} />
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
}
