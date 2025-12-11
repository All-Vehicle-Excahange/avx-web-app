"use client";

import React, { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/button"; // ✅ your button

function LoginPopup({ isOpen, onClose }) {
  const [accountType, setAccountType] = useState("personal");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* MAIN CARD */}
      <div className="relative flex w-full max-w-[900px] overflow-hidden rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300 bg-primary-white">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full transition hover:opacity-70 text-text-black"
        >
          <X size={20} />
        </button>

        {/* LEFT IMAGE SIDE */}
        <div className="hidden md:block w-5/12 relative">
          <Image src="/cs.png" alt="Luxury Car" fill className="object-cover" />

          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>

          <div className="absolute bottom-8 left-8 pr-4">
            <h2 className="text-4xl font-bold leading-tight text-primary">
              A whole new
              <br />
              world of Cars
            </h2>
          </div>
        </div>

        {/* RIGHT FORM SIDE */}
        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-primary">
          {/* TOGGLE SWITCH */}
          <div className="flex border rounded-lg p-1 mb-8 w-fit mx-auto md:mx-0 border-accent-gray">
            <button
              onClick={() => setAccountType("personal")}
              className={`px-6 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                accountType === "personal"
                  ? "bg-secondary text-primary shadow-sm"
                  : "text-text-black"
              }`}
            >
              PERSONAL ACCOUNT
            </button>

            <button
              onClick={() => setAccountType("consultant")}
              className={`px-6 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                accountType === "consultant"
                  ? "bg-secondary text-primary shadow-sm"
                  : "text-text-black"
              }`}
            >
              CONSULTANT ACCOUNT
            </button>
          </div>

          {/* TITLE */}
          <h3 className="text-2xl font-bold mb-6 text-text-black">
            Log in to <br /> continue
          </h3>

          {/* MOBILE INPUT */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-text-black/70">
              Mobile number
            </label>

            <div className="flex items-center border rounded-md overflow-hidden border-accent-gray focus-within:ring-1 focus-within:ring-secondary-black">
              <span className="pl-4 pr-2 font-medium bg-transparent text-text-black/60">
                +91-
              </span>
              <input
                type="tel"
                placeholder="999 999 9999"
                className="w-full py-3 px-2 outline-none bg-transparent font-medium text-text-black placeholder:text-gray-400 caret-secondary-black"
              />
            </div>
          </div>

          {/* ✅ YOUR CUSTOM BUTTON HERE */}
          <Button className="w-full h-11 text-sm font-bold tracking-wide">
            GET OTP
          </Button>

          {/* TERMS */}
          <div className="text-[10px] leading-tight text-text-black/50 mt-6">
            <p className="mb-1">By logging in, you agree to AVXs</p>
            <p>
              <span className="underline cursor-pointer hover:text-text-black">
                Privacy Policy
              </span>{" "}
              and{" "}
              <span className="underline cursor-pointer hover:text-text-black">
                Terms & Conditions
              </span>
            </p>
            <p>
              <span className="underline cursor-pointer hover:text-text-black">
                AVX NBFCs Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="underline cursor-pointer hover:text-text-black">
                TU CIBIL Terms of Use
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
