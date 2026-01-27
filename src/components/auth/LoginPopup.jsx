"use client";

import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { getOtp, login } from "@/services/auth.service";
import { useForm } from "react-hook-form";

function LoginPopup({ isOpen, onClose, onSignup = () => {} }) {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);

  const [otpError, setOtpError] = useState("");

  const otpRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    setOtp(Array(6).fill(""));
    setOtpSent(false);
    setOtpError("");
    onClose();
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    setOtpError("");

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

  const onSendOtp = async () => {
    try {
      const phone = getValues("phoneNumber");

      const res = await getOtp({
        phoneNumber: phone,
        countryCode: "+91",
        requestType: "LOGIN",
      });

      if (res?.success || res?.status) {
        setOtpSent(true);
        setTimeout(() => otpRefs.current[0]?.focus(), 200);
      }
    } catch (err) {
      const api = err?.response?.data;
      const msg = api?.message || "Failed to send OTP";

      setError("phoneNumber", {
        type: "server",
        message: msg,
      });
    }
  };

  const onValidateOtp = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setOtpError("OTP must be 6 digits");
      return;
    }

    try {
      const phone = getValues("phoneNumber");

      const res = await login({
        phoneNumber: phone,
        countryCode: "+91",
        otp: finalOtp,
      });

      if (res?.success || res?.status) {
        handleClose();
      }
    } catch (err) {
      const api = err?.response?.data;
      const msg = api?.message || "Invalid or expired OTP";

      
      setOtpError(msg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative flex w-full max-w-[900px] overflow-hidden rounded-2xl shadow-2xl bg-primary-white">
        {/* CLOSE */}
        <button
          onClick={handleClose}
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
          <h3 className="text-2xl font-bold mb-6 text-primary">
            Log in to <br /> continue
          </h3>

          {/* ✅ MOBILE INPUT */}
          <div className="mb-4">
            <label className="block text-sm mb-2 text-primary/70">
              Mobile number
            </label>

            <div className="flex items-center border rounded-md border-accent-primary">
              <span className="pl-4 pr-2 text-primary/60">+91-</span>

              <input
                maxLength={10}
                placeholder="9999999999"
                {...register("phoneNumber", {
                  required: "Mobile number is required",
                  minLength: {
                    value: 10,
                    message: "Mobile must be 10 digits",
                  },
                })}
                className="w-full text-primary py-3 px-2 outline-none bg-transparent"
              />
            </div>

            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {otpSent && (
            <>
              <p className="text-sm text-primary/70 mb-3">
                Enter the 6-digit OTP
              </p>

              <div className="flex justify-center gap-4 mb-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-primary text-lg font-bold border rounded-md border-accent-gray outline-none focus:border-primary"
                  />
                ))}
              </div>

              {/* ✅ OTP Error Below Boxes */}
              {otpError && (
                <p className="text-red-500 text-xs text-center mb-4">
                  {otpError}
                </p>
              )}
            </>
          )}

          {/* ✅ BUTTON */}
          {!otpSent ? (
            <Button
              variant="ghost"
              className="w-full h-11 text-sm font-bold"
              onClick={() => handleSubmit(onSendOtp)()} // ✅ FIXED
            >
              GET OTP
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="w-full h-11 text-sm font-bold"
              onClick={onValidateOtp}
            >
              Validate OTP
            </Button>
          )}

          {/* ✅ SIGNUP SWITCH */}
          <div className="mt-4 text-center text-sm text-primary/70">
            Don’t have an account?{" "}
            <button
              onClick={() => {
                handleClose();
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
