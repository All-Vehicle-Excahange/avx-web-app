"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, CarFront, CheckCircle2, Loader2 } from "lucide-react";
import Button from "@/components/ui/button";
import { sendInquary } from "@/services/vehicle.service";
import { useQueryClient } from "@tanstack/react-query";

export default function MakeOfferPopup({ isOpen, onClose, vehicle, onSuccess }) {
  const queryClient = useQueryClient();
  const [offerPrice, setOfferPrice] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

  if (!isOpen && !isClosing) return null;

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

  // Calculate progress bar percentage
  const minSlider = option1;
  const maxSlider = listedPrice;

  const handleSendOffer = async () => {
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
          className="absolute top-4 right-4 z-20 p-1.5 rounded-full hover:bg-third/10 text-primary transition-colors cursor-pointer"
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
            <div>
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
                    type="number"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    onWheel={(e) => e.target.blur()}
                    className="w-full bg-transparent border border-third/20 rounded-xl py-3 pl-8 pr-4 text-primary font-bold outline-none focus:border-fourth transition-colors [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Enter offer amount"
                  />
                </div>
                
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

              {/* SUGGESTION BOX & SLIDER */}
              <div className="bg-third/10 border border-third/20 rounded-xl p-4 mb-4">
                <div className="relative pt-1 mb-2">
                  <input
                    type="range"
                    min={minSlider}
                    max={maxSlider}
                    step={1000}
                    value={Math.max(minSlider, Math.min(maxSlider, currentOffer))}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    className="w-full h-1.5 bg-third/20 rounded-full appearance-none cursor-pointer accent-blue-500 outline-none"
                  />
                  <div className="flex justify-between items-center mt-1.5 text-[11px] text-primary/50">
                    <span>{toLakhs(minSlider)}</span>
                    <span>Listed {toLakhs(maxSlider)}</span>
                  </div>
                </div>
                
                <p className="text-xs text-primary/60 leading-relaxed pt-2 border-t border-third/10">
                  A reasonable starting point based on the listed price. The seller can accept, decline, or counter your offer.
                </p>
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
                  locked={!currentOffer || currentOffer <= 0}
                  size="sm"
                >
                  Send Offer
                </Button>
              </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes modalBackdropIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalBackdropOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes modalCardIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes modalCardOut { from { opacity: 1; transform: scale(1) translateY(0); } to { opacity: 0; transform: scale(0.95) translateY(10px); } }
      `}} />
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
}
