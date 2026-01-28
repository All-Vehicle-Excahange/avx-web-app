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

  const handleClosePopup = () => {
    reset();
    setOtp(Array(6).fill(""));
    setOtpSent(false);
    setAccountType("personal");
    onClose();
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      otpRefs.current[index - 1]?.focus();
  };

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

      // Check error flag first, then success
      if (!res?.error && (res?.success || res?.status)) {
        setOtpSent(true);
        setTimeout(() => otpRefs.current[0]?.focus(), 200);
      } else if (res?.error) {
        // Handle API errors returned in response
        const msg = res?.message?.toLowerCase();
        if (msg?.includes("email")) {
          setError("email", { type: "server", message: res.message });
        } else if (msg?.includes("phone")) {
          setError("phone", { type: "server", message: res.message });
        } else {
          setError("root", {
            type: "server",
            message: res?.message || "Failed to send OTP",
          });
        }
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

      if (!res?.error && (res?.success || res?.status)) {
        setTimeout(() => handleClosePopup(), 500);
      } else if (res?.error) {
        const msg = res?.message?.toLowerCase();
        if (msg?.includes("email")) {
          setError("email", { type: "server", message: res.message });
        } else if (msg?.includes("phone")) {
          setError("phone", { type: "server", message: res.message });
        } else {
          setError("root", {
            type: "server",
            message: res?.message || "Signup failed",
          });
        }
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
          className="absolute top-4 right-4 z-60 flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white transition"
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

          <div className="flex justify-center gap-10 mb-8 border-b border-accent-gray/20">
            <button
              type="button"
              onClick={() => setAccountType("personal")}
              className={`flex items-center gap-2 pb-3 transition-all relative ${
                accountType === "personal"
                  ? "text-primary font-bold"
                  : "text-primary/40 hover:text-primary/70"
              }`}
            >
              <span className="text-sm uppercase tracking-wide">Personal</span>
              {accountType === "personal" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setAccountType("consultant")}
              className={`flex items-center gap-2 pb-3 transition-all relative ${
                accountType === "consultant"
                  ? "text-primary font-bold"
                  : "text-primary/40 hover:text-primary/70"
              }`}
            >
              <span className="text-sm uppercase tracking-wide">
                Consultant
              </span>
              {accountType === "consultant" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </button>
          </div>

          {errors.root?.message && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {errors.root.message}
            </p>
          )}

          {/* FORM FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            <div>
              <input
                placeholder="Last Name"
                {...register("lastName", { required: "Last Name is required" })}
                className="w-full text-primary py-3 px-4 border rounded-md border-accent-gray bg-transparent outline-none"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

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
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
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
