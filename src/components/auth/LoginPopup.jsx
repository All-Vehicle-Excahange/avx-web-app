"use client";

import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/button";

function LoginPopup({
  isOpen,
  onClose,
  onSignup = () => {}, // ✅ SAFE DEFAULT
}) {
  const [accountType, setAccountType] = useState("personal");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const otpRefs = useRef([]);

  if (!isOpen) return null;

  const handleSendOtp = () => {
    if (mobile.length !== 10) return;
    setOtpSent(true);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleValidateOtp = () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) return;

    console.log("Account Type:", accountType);
    console.log("Mobile:", mobile);
    console.log("OTP:", finalOtp);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative flex w-full max-w-[900px] overflow-hidden rounded-2xl shadow-2xl bg-primary-white">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full hover:opacity-70 text-primary"
        >
          <X size={20} />
        </button>

        {/* LEFT IMAGE */}
        <div className="hidden md:block w-5/12 relative">
          <Image src="/cs.png" alt="Cars" fill className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h2 className="text-4xl font-bold text-primary leading-tight">
              A whole new
              <br />
              world of Cars
            </h2>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-7/12 p-8 md:p-12 bg-secondary">
          {/* ACCOUNT TYPE */}
          <div className="flex border rounded-lg p-1 mb-8 w-fit border-accent-primary">
            <button
              onClick={() => setAccountType("personal")}
              className={`px-6 py-2 text-sm font-semibold rounded-md ${
                accountType === "personal"
                  ? "bg-primary text-secondary"
                  : "text-primary"
              }`}
            >
              PERSONAL ACCOUNT
            </button>
            <button
              onClick={() => setAccountType("consultant")}
              className={`px-6 py-2 text-sm font-semibold rounded-md ${
                accountType === "consultant"
                  ? "bg-primary text-secondary"
                  : "text-primary"
              }`}
            >
              CONSULTANT ACCOUNT
            </button>
          </div>

          <h3 className="text-2xl font-bold mb-6 text-primary">
            Log in to <br /> continue
          </h3>

          {/* MOBILE INPUT (ALWAYS VISIBLE) */}
          <div className="mb-4">
            <label className="block text-sm mb-2 text-primary/70">
              Mobile number
            </label>
            <div className="flex items-center border rounded-md border-accent-primary">
              <span className="pl-4 pr-2 text-primary/60">+91-</span>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value.replace(/\D/g, ""))
                }
                placeholder="9999999999"
                className="w-full text-primary py-3 px-2 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* OTP BOXES */}
          {otpSent && (
            <>
              <p className="text-sm text-primary/70 mb-3">
                Enter the 6-digit OTP
              </p>

              <div className="flex justify-center gap-4 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(index, e.target.value)
                    }
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-primary text-lg font-bold border rounded-md border-accent-gray outline-none focus:border-primary"
                  />
                ))}
              </div>
            </>
          )}

          {/* BUTTON */}
          {!otpSent ? (
            <Button
              variant="ghost"
              className="w-full h-11 text-sm font-bold"
              onClick={handleSendOtp}
            >
              GET OTP
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="w-full h-11 text-sm font-bold"
              onClick={handleValidateOtp}
            >
              Validate OTP
            </Button>
          )}

          {/* SIGNUP SWITCH */}
          <div className="mt-4 text-center text-sm text-primary/70">
            Don’t have an account?{" "}
            <button
              onClick={() => {
                onClose();
                setTimeout(() => onSignup(), 100);
              }}
              className="font-semibold text-primary hover:underline"
            >
              Create
            </button>
          </div>

          {/* TERMS */}
          <div className="text-[10px] text-primary/50 mt-6 text-center">
            By logging in, you agree to AVXs Privacy Policy & Terms
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
