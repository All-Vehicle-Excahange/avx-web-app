"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ShieldCheck, Ghost } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";

function ConsualtPopup({ onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter();

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      if (onClose) onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleGoToDashboard = () => {
    router.push("/consult/subscription");
    handleClose();
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      {/* Popup Box */}
      <div
        className="relative flex w-full max-w-[900px] overflow-hidden rounded-2xl shadow-2xl bg-secondary"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.25s ease-in forwards"
            : "modalCardIn 0.3s ease-out",
        }}
      >
        {/* CLOSE */}
        <button
          onClick={handleClose}
          className="absolute bg-white cursor-pointer top-4 right-4 z-20 p-1 rounded-full hover:opacity-70 text-secondary"
        >
          <X size={20} />
        </button>

        {/* LEFT IMAGE */}
        <div className="hidden md:block w-5/12 relative min-h-[400px]">
          <Image src="/cs.png" alt="Consultant" fill className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 pr-4">
            <h2 className="text-3xl font-bold text-primary leading-tight">
              Manage your
              <br />
              business
            </h2>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-7/12 p-8 md:p-12 bg-secondary flex flex-col justify-center min-h-[400px]">
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            {/* Status Icon */}
            <div className="flex items-center justify-center animate-in zoom-in duration-500">
              <ShieldCheck className="text-emerald-500 w-20 h-20" />
            </div>

            {/* Headlines */}
            <div className="space-y-1 text-center">
              <h3 className="text-3xl font-bold text-primary tracking-tight">
                You are Already a Consultant!
              </h3>
              <p className="text-third max-w-sm mt-2 mx-auto">
                Your consultant account is active and ready to go.
              </p>
            </div>

            {/* Details Box */}
            <div className="text-center space-y-4 mt-4 max-w-sm w-full mx-auto">
              <p className="text-third text-sm leading-relaxed">
                Head over to your dashboard to manage your inquiries, inspect
                vehicles, and track your performance.
              </p>

              <div className="pt-2">
                <Button onClick={handleGoToDashboard} full variant="ghost">
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

export default ConsualtPopup;
