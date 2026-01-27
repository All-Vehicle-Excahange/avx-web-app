"use client";

import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { getOtp, signup } from "@/services/auth.service";
import { useForm } from "react-hook-form";

export default function SignupPopup({ isOpen, onClose, onLogin = () => {} }) {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Account Type State
  const [accountType, setAccountType] = useState("personal");

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
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

  // ✅ Proper Close Popup + Reset Everything
  const handleClosePopup = () => {
    reset(); // ✅ Clear form fields
    setOtp(Array(6).fill("")); // ✅ Clear OTP
    setOtpSent(false); // ✅ Reset OTP screen
    setAccountType("personal"); // ✅ Reset account type
    onClose(); // ✅ Close popup
  };

  // ✅ OTP Change
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  // ✅ OTP Backspace
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      otpRefs.current[index - 1]?.focus();
  };

  // ✅ SEND OTP
  const onSendOtp = async () => {
    try {
      const phone = getValues("phone");
      const email = getValues("email");

      const res = await getOtp({
        phoneNumber: phone,
        email,
        countryCode: "+91",
        requestType: "SIGNUP",
      });

      if (res?.success || res?.status) {
        setOtpSent(true);
        setTimeout(() => otpRefs.current[0]?.focus(), 200);
      }
    } catch (err) {
      const api = err?.response?.data;
      const msg = api?.message?.toLowerCase();

      if (msg?.includes("email")) {
        setError("email", { type: "server", message: api.message });
      } else if (msg?.includes("phone")) {
        setError("phone", { type: "server", message: api.message });
      } else {
        setError("root", {
          type: "server",
          message: api?.message || "Failed to send OTP",
        });
      }
    }
  };

  // ✅ VALIDATE OTP + SIGNUP
  const onValidateOtp = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setError("root", { type: "manual", message: "OTP must be 6 digits" });
      return;
    }

    try {
      const values = getValues();

      const res = await signup({
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        phoneNumber: values.phone,
        countryCode: "+91",
        isApplyForConsultation: accountType === "consultant",
        otp: finalOtp,
      });

      if (res?.success || res?.status) {
        setTimeout(() => handleClosePopup(), 500); // ✅ Close + Reset
      }
    } catch (err) {
      const api = err?.response?.data;
      const msg = api?.message?.toLowerCase();

      if (msg?.includes("email")) {
        setError("email", { type: "server", message: api.message });
      } else if (msg?.includes("phone")) {
        setError("phone", { type: "server", message: api.message });
      } else {
        setError("root", {
          type: "server",
          message: api?.message || "Signup failed",
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative flex w-full max-w-[900px] overflow-hidden rounded-2xl shadow-2xl bg-primary-white">
        <button
          onClick={handleClosePopup}
          className="
    absolute top-4 right-4 z-999
    flex items-center justify-center
    w-10 h-10
    rounded-full
    bg-black/30 hover:bg-black/50
    text-white
    transition
  "
        >
          <X size={20} />
        </button>

        {/* LEFT IMAGE */}
        <div className="hidden md:block w-5/12 relative">
          <Image src="/cs.png" alt="Cars" fill className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-7/12 p-8 md:p-12 bg-secondary">
          <h3 className="text-2xl font-bold mb-6 text-primary">
            Create your <br /> account
          </h3>

          {/* GENERAL ERROR */}
          {errors.root?.message && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {errors.root.message}
            </p>
          )}

          {/* FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* First Name */}
            <div>
              <input
                placeholder="First Name"
                {...register("firstName", {
                  required: "First Name is required",
                })}
                className="w-full text-primary py-3 px-4 border rounded-md border-accent-gray bg-transparent outline-none"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <input
                placeholder="Last Name"
                {...register("lastName", {
                  required: "Last Name is required",
                })}
                className="w-full text-primary py-3 px-4 border rounded-md border-accent-gray bg-transparent outline-none"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              {...register("email", { required: "Email is required" })}
              className="w-full text-primary py-3 px-4 border rounded-md border-accent-gray bg-transparent outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <div className="flex items-center text-primary border rounded-md border-accent-gray">
              <span className="pl-4 pr-2 text-text-black/60">+91-</span>
              <input
                maxLength={10}
                placeholder="9999999999"
                {...register("phone", { required: "Phone is required" })}
                className="w-full text-primary border py-3 px-2 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* ACCOUNT TYPE RADIO */}
          <div className="flex items-center gap-8 mb-6 text-sm text-primary">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={accountType === "personal"}
                onChange={() => setAccountType("personal")}
                className="w-4 h-4 accent-primary"
              />
              Personal Account
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={accountType === "consultant"}
                onChange={() => setAccountType("consultant")}
                className="w-4 h-4 accent-primary"
              />
              Consultant Account
            </label>
          </div>

          {/* OTP SEND BUTTON */}
          {!otpSent && (
            <Button
              variant="ghost"
              onClick={() => handleSubmit(onSendOtp)()}
              className="text-primary w-full h-11 text-sm font-bold"
            >
              GET OTP
            </Button>
          )}

          {/* OTP BOX */}
          {otpSent && (
            <>
              <p className="text-sm text-text-black/70 mt-6 mb-3">
                Enter OTP sent to +91 {getValues("phone")}
              </p>

              <div className="flex justify-between gap-3 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-bold border rounded-md border-accent-gray bg-transparent outline-none focus:border-primary text-primary"
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                onClick={onValidateOtp}
                className="text-primary w-full h-11 text-sm font-bold"
              >
                VALIDATE OTP
              </Button>
            </>
          )}

          {/* LOGIN LINK */}
          <div className="mt-4 text-primary text-center text-sm text-text-black/70">
            Already have an account?{" "}
            <button
              onClick={() => {
                handleClosePopup();
                setTimeout(() => onLogin(), 100);
              }}
              className="font-semibold text-primary hover:underline"
            >
              Login
            </button>
          </div>

          {/* TERMS */}
          <div className="text-[10px] text-primary mt-6 leading-tight text-center">
            By signing up, you agree to AVXs Privacy Policy & Terms
          </div>
        </div>
      </div>
    </div>
  );
}
