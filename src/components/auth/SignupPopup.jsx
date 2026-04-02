"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Button from "@/components/ui/button";
import { getOtp, signup } from "@/services/auth.service";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

export default function SignupPopup({ isOpen, onClose, onLogin = () => { }, onSuccess = () => { } }) {
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
  const [isClosing, setIsClosing] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.dispatchEvent(new Event("signuppopup:open"));
    }
  }, [isOpen]);

  // Auto-lock body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const handleClosePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      reset();
      setOtp(Array(6).fill(""));
      setOtpSent(false);
      setAccountType("personal");
      onClose();
    }, 250);
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
        onSuccess();
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

  const modalContent = (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={handleClosePopup} style={{ animation: isClosing ? 'modalBackdropOut 0.25s ease-in forwards' : 'modalBackdropIn 0.25s ease-out' }}>
      <div className="relative flex w-full max-w-[900px] overflow-hidden rounded-2xl shadow-2xl bg-primary-white" onClick={(e) => e.stopPropagation()} style={{ animation: isClosing ? 'modalCardOut 0.25s ease-in forwards' : 'modalCardIn 0.3s ease-out' }}>

        <button
          onClick={handleClosePopup}
          className="absolute bg-white cursor-pointer top-4 right-4 z-20 p-1 rounded-full hover:opacity-70 text-secondary"
        >
          <X size={20} />
        </button>

        {/* LEFT IMAGE */}
        <div className="hidden md:block w-5/12 relative">
          <Image src="/cs.png" alt="Cars" fill className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
        </div>

        {/* RIGHT FORM */}
        <form
          className="w-full md:w-7/12 p-8 md:p-12 bg-secondary"
          onSubmit={(e) => {
            e.preventDefault();
            if (!otpSent) {
              handleSubmit(onSendOtp)();
            } else {
              onValidateOtp();
            }
          }}
        >
          <h3 className="text-2xl font-bold mb-6 text-primary">
            Create your <br /> account
          </h3>

          <div className="flex justify-center gap-10 mb-8 border-b border-accent-gray/20">
            <button
              type="button"
              onClick={() => setAccountType("personal")}
              className={`flex cursor-pointer items-center gap-2 pb-3 transition-all relative ${accountType === "personal"
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
              className={`flex cursor-pointer items-center gap-2 pb-3 transition-all relative ${accountType === "consultant"
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
              {...register("email")}
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

          <div className="flex items-start gap-2 mb-4">
            <input
              type="checkbox"
              id="termsCheckbox"
              className="mt-1 cursor-pointer"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <label htmlFor="termsCheckbox" className="text-sm text-primary/60 cursor-pointer">
              I agree to the{" "}
              <a href="/terms" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                Privacy Policy
              </a>
            </label>
          </div>

          {/* OTP SEND BUTTON */}
          {!otpSent && (
            <Button
              type="submit"
              variant="ghost"
              disabled={!acceptedTerms}
              className={`text-secondary w-full h-11 text-sm font-bold ${!acceptedTerms ? 'opacity-50 cursor-not-allowed' : ''}`}
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

              <div className="flex justify-center gap-2 sm:gap-4 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-center text-primary text-xl font-bold border rounded-lg border-accent-primary/20 outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all p-0"
                  />
                ))}
              </div>

              <Button
                type="submit"
                variant="ghost"
                className="text-secondary w-full h-11 text-sm font-bold"
              >
                VALIDATE OTP
              </Button>
            </>
          )}

          {/* LOGIN LINK */}
          <div className="mt-4 text-primary/60 text-center text-sm text-text-black/70">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                handleClosePopup();
                setTimeout(() => onLogin(), 100);
              }}
              className="font-semibold cursor-pointer text-primary hover:underline"
            >
              Login
            </button>
          </div>

          {/* REMOVED OLD TERMS TEXT */}
        </form>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
