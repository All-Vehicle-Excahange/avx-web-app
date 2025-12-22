"use client";

import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/button";

export default function SignupPopup({
  isOpen,
  onClose,
  onLogin = () => {}, // ✅ SAFE DEFAULT
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const otpRefs = useRef([]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    form.firstName && form.lastName && form.email && form.phone.length === 10;

  const handleSendOtp = () => {
    if (!isFormValid) return;
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

    // 🔥 API CALL HERE
    console.log("Signup Data:", form);
    console.log("OTP:", finalOtp);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative flex w-full max-w-[900px] overflow-hidden rounded-2xl shadow-2xl bg-primary-white">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full hover:opacity-70 text-text-black"
        >
          <X size={20} />
        </button>

        {/* LEFT IMAGE */}
        <div className="hidden md:block w-5/12 relative">
          <Image src="/cs.png" alt="Cars" fill className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h2 className="text-4xl font-bold text-primary leading-tight">
              Join the
              <br />
              future of Cars
            </h2>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-7/12 p-8 md:p-12 bg-secondary">
          <h3 className="text-2xl font-bold mb-6 text-text-black">
            Create your <br /> account
          </h3>

          {/* FORM */}
          {!otpSent && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full py-3 px-4 border rounded-md border-accent-gray bg-transparent outline-none"
                />
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full py-3 px-4 border rounded-md border-accent-gray bg-transparent outline-none"
                />
              </div>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full py-3 px-4 border rounded-md border-accent-gray bg-transparent outline-none mb-4"
              />

              <div className="flex items-center border rounded-md border-accent-gray mb-6">
                <span className="pl-4 pr-2 text-text-black/60">+91-</span>
                <input
                  name="phone"
                  type="tel"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      phone: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  placeholder="9999999999"
                  className="w-full py-3 px-2 outline-none bg-transparent"
                />
              </div>
            </>
          )}

          {/* OTP BOXES */}
          {otpSent && (
            <>
              <p className="text-sm text-text-black/70 mb-4">
                Enter the 6-digit OTP sent to +91 {form.phone}
              </p>

              <div className="flex justify-between gap-3 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-bold border rounded-md border-accent-gray bg-transparent outline-none focus:border-primary"
                  />
                ))}
              </div>
            </>
          )}

          {/* BUTTON */}
          {!otpSent ? (
            <Button
              variant="ghost"
              disabled={!isFormValid}
              onClick={handleSendOtp}
              className="w-full h-11 text-sm font-bold disabled:opacity-40"
            >
              GET OTP
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={handleValidateOtp}
              className="w-full h-11 text-sm font-bold"
            >
              VALIDATE OTP
            </Button>
          )}

          {/* SWITCH TO LOGIN */}
          <div className="mt-4 text-center text-sm text-text-black/70">
            Already have an account?{" "}
            <button
              onClick={() => {
                onClose();
                setTimeout(() => onLogin(), 100); // ✅ SAFE CALL
              }}
              className="font-semibold text-primary hover:underline"
            >
              Login
            </button>
          </div>

          {/* TERMS */}
          <div className="text-[10px] text-text-black/50 mt-6 leading-tight text-center">
            By signing up, you agree to AVXs Privacy Policy & Terms
          </div>
        </div>
      </div>
    </div>
  );
}
