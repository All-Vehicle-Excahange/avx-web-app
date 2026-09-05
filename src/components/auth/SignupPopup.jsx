"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useWebOTP } from "@/hooks/useWebOTP";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";
import { getOtp, signup, googleVerify, googleSignupVerify } from "@/services/auth.service";
import { useForm } from "react-hook-form";
import { X, Loader2, User, UserCheck } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import { FcGoogle } from "react-icons/fc";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useAuthStore } from "@/stores/useAuthStore";
import { trackSignupCompleted } from "@/lib/amplitude";

export default function SignupPopup({ isOpen, onClose, onLogin = () => { }, onSuccess = () => { } }) {
  const prefilledPhoneNumber = useAuthStore((state) => state.prefilledPhoneNumber);
  const defaultTab = useAuthStore((state) => state.authPopupDefaultTab);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const { push } = useRouter();

  const [accountType, setAccountType] = useState(defaultTab || "personal");

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const otpRefs = useRef([]);
  const [isClosing, setIsClosing] = useState(false);
  const hiddenInputRef = useRef(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [googleToken, setGoogleToken] = useState(null);
  const [isGoogleSignupFlow, setIsGoogleSignupFlow] = useState(false);

  // ── WebOTP auto-fill (TEMPORARILY DISABLED) ──────────────────────────────
  const autoVerifyRef = useRef(null);
  /*
  const { startWebOTP, abortWebOTP } = useWebOTP({
    onOTPReceived: (digits) => {
      // Simply fill the OTP boxes — the useEffect below handles auto-verify
      setOtp(digits.split(""));
    },
  });
  */
  const startWebOTP = () => {};
  const abortWebOTP = () => {};

  // ── Auto-verify when all 6 digits are present ─────────────────────────────
  // Covers BOTH manual typing (last digit fills) and WebOTP autofill (setOtp fills all at once).
  // Placed before the early return so it is always called, satisfying Rules of Hooks.
  useEffect(() => {
    if (!otpSent) return;
    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) return;
    // Small debounce: cancels if digits change before 150ms (rapid corrections)
    const timer = setTimeout(() => {
      autoVerifyRef.current?.(fullOtp);
    }, 150);
    return () => clearTimeout(timer);
  }, [otp, otpSent]);

  // Check for active block on mount or when popup opens
  useEffect(() => {
    if (isOpen) {
      reset();
      setOtp(Array(6).fill(""));
      setOtpSent(false);
      setAcceptedTerms(false);
      setIsLoading(false);
      setIsGoogleLoading(false);
      setAccountType(defaultTab || "personal");

      const blockUntil = localStorage.getItem("otpBlockUntil");
      if (blockUntil) {
        const remaining = Math.ceil((Number(blockUntil) - Date.now()) / 1000);
        if (remaining > 0) {
          setCountdown(remaining);
        } else {
          localStorage.removeItem("otpBlockUntil");
        }
      }
    }
  }, [isOpen, reset, defaultTab]);

  // Focus the first OTP input securely when OTP is sent
  useEffect(() => {
    if (otpSent) {
      // Small delay ensures the DOM has painted the conditional OTP inputs
      const timer = setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [otpSent]);

  // Countdown timer effect
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          localStorage.removeItem("otpBlockUntil");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (isOpen) {
      document.dispatchEvent(new Event("signuppopup:open"));
    }
  }, [isOpen]);

  // Abort any pending WebOTP request when the popup closes or unmounts
  useEffect(() => {
    if (!isOpen) abortWebOTP();
  }, [isOpen, abortWebOTP]);

  useEffect(() => {
    return () => abortWebOTP();
  }, [abortWebOTP]);

  useEffect(() => {
    if (isOpen && prefilledPhoneNumber) {
      setValue("phone", prefilledPhoneNumber);
    }
  }, [isOpen, prefilledPhoneNumber, setValue]);

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

  const handleClosePopup = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      reset();
      setOtp(Array(6).fill(""));
      setOtpSent(false);
      setAccountType("personal");
      setCountdown(0);
      setGoogleToken(null);
      setIsGoogleSignupFlow(false);
      setIsGoogleLoading(false);
      localStorage.removeItem("otpBlockUntil");
      useAuthStore.setState({ prefilledPhoneNumber: "", isSignupPopupOpen: false });
      onClose();
    }, 250);
  }, [onClose, reset]);

  if (!isOpen && !isClosing) return null;

  const handleOtpChange = (index, value) => {
    // Handle OTP paste or Android SMS autofill
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, "").slice(0, 6);
      if (pasted.length === 6) {
        setOtp(pasted.split(""));
        otpRefs.current[5]?.focus();
      }
      return;
    }

    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
    // Auto-verify is handled by the useEffect watching otp state
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      otpRefs.current[index - 1]?.focus();
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const res = await googleVerify({ googleIdToken: idToken });

      if (res?.success || res?.status) {
        if (res.data?.requiresPhoneVerification) {
          setGoogleToken(idToken);
          setIsGoogleSignupFlow(true);
        } else {
          localStorage.removeItem("otpBlockUntil");
          setCountdown(0);
          const currentUser = useAuthStore.getState().user;
          const isConsultantUser =
            accountType === "consultant" ||
            currentUser?.accountType === "consultant" ||
            ["CONSULTATION", "CONSULTANT_APPLICANT"].includes(
              currentUser?.userRole || currentUser?.role
            );
          if (!isConsultantUser) {
            await onSuccess();
          } else {
            if (
              !window.location.pathname.startsWith("/consult") &&
              !window.location.pathname.startsWith("/become-consultant")
            ) {
              push("/become-consultant");
            }
          }
          trackSignupCompleted({ method: "google" });
          handleClosePopup();
        }
      } else if (res?.error) {
        setError("root", { type: "server", message: res.message || "Google sign-in failed" });
      }
    } catch (err) {
      console.error(err);
      const apiMsg = err?.response?.data?.message;
      if (err?.code !== 'auth/popup-closed-by-user') {
        setError("root", { type: "server", message: apiMsg || "Google sign-in failed" });
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const onSendOtp = async () => {
    try {
      setIsLoading(true);
      const phone = getValues("phone");
      const email = getValues("email");

      const res = await getOtp({
        phoneNumber: phone,
        email: email || undefined,
        countryCode: "+91",
        requestType: "SIGNUP",
      });

      // Check error flag first, then success
      if (!res?.error && (res?.success || res?.status)) {
        setOtpSent(true);
        const blockTime = Date.now() + 30 * 1000;
        localStorage.setItem("otpBlockUntil", String(blockTime));
        setCountdown(30);
        // Start WebOTP listener immediately after OTP is dispatched
        startWebOTP();
      } else if (res?.error) {
        // Handle API errors returned in response
        const msg = res?.message?.toLowerCase();

        if (msg?.includes("otp already sent")) {
          setOtpSent(true);
          const blockTime = Date.now() + 30 * 1000;
          localStorage.setItem("otpBlockUntil", String(blockTime));
          setCountdown(30);
          return;
        }

        if (
          msg?.includes("blocked") ||
          msg?.includes("too many attempts") ||
          msg?.includes("2 minutes")
        ) {
          const blockTime = Date.now() + 120 * 1000;
          localStorage.setItem("otpBlockUntil", String(blockTime));
          setCountdown(120);
        }

        if (msg?.includes("first name") || msg?.includes("firstname")) {
          setError("firstName", { type: "server", message: res.message });
        } else if (msg?.includes("last name") || msg?.includes("lastname")) {
          setError("lastName", { type: "server", message: res.message });
        } else if (msg?.includes("email")) {
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

      if (msg?.includes("otp already sent")) {
        setOtpSent(true);
        const blockTime = Date.now() + 30 * 1000;
        localStorage.setItem("otpBlockUntil", String(blockTime));
        setCountdown(30);
        setTimeout(() => otpRefs.current[0]?.focus(), 200);
        return;
      }

      if (
        msg?.includes("blocked") ||
        msg?.includes("too many attempts") ||
        msg?.includes("2 minutes")
      ) {
        const blockTime = Date.now() + 120 * 1000;
        localStorage.setItem("otpBlockUntil", String(blockTime));
        setCountdown(120);
      }

      if (msg?.includes("first name") || msg?.includes("firstname")) {
        setError("firstName", { type: "server", message: api.message });
      } else if (msg?.includes("last name") || msg?.includes("lastname")) {
        setError("lastName", { type: "server", message: api.message });
      } else if (msg?.includes("email")) {
        setError("email", { type: "server", message: api.message });
      } else if (msg?.includes("phone")) {
        setError("phone", { type: "server", message: api.message });
      } else {
        setError("root", {
          type: "server",
          message: api?.message || "Failed to send OTP",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onValidateOtp = async (overrideOtp) => {
    const finalOtp = typeof overrideOtp === "string" ? overrideOtp : otp.join("");

    if (finalOtp.length !== 6) {
      setError("root", { type: "manual", message: "OTP must be 6 digits" });
      return;
    }

    // Stop any pending WebOTP request once user confirms
    abortWebOTP();

    try {
      setIsLoading(true);
      const values = getValues();

      let res;
      if (isGoogleSignupFlow) {
        res = await googleSignupVerify({
          googleIdToken: googleToken,
          phoneNumber: values.phone,
          countryCode: "+91",
          otp: finalOtp,
          isApplyForConsultation: accountType === "consultant",
        });
      } else {
        res = await signup({
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email || undefined,
          phoneNumber: values.phone,
          countryCode: "+91",
          isApplyForConsultation: accountType === "consultant",
          otp: finalOtp,
        });
      }

      if (!res?.error && (res?.success || res?.status)) {
        localStorage.removeItem("otpBlockUntil");
        setCountdown(0);

        trackSignupCompleted({
          method: isGoogleSignupFlow ? "google_otp" : "otp",
        });

        // Close popup immediately before calling onSuccess to prevent reopening
        useAuthStore.setState({ isSignupPopupOpen: false, prefilledPhoneNumber: "" });
        onClose();
        reset();
        setOtp(Array(6).fill(""));
        setOtpSent(false);
        setIsLoading(false);

        const currentUser = useAuthStore.getState().user;
        const isConsultantUser =
          accountType === "consultant" ||
          currentUser?.accountType === "consultant" ||
          ["CONSULTATION", "CONSULTANT_APPLICANT"].includes(
            currentUser?.userRole || currentUser?.role
          );

        if (!isConsultantUser) {
          // Wait for onSuccess to complete (which might open CompleteProfilePopup)
          await onSuccess();
        } else {
          // For consultants, redirect to /consult only if not already in the consult section
          // (e.g. /consult/pricing, /consult/kyc — don't navigate away from those)
          if (
            !window.location.pathname.startsWith("/consult") &&
            !window.location.pathname.startsWith("/become-consultant")
          ) {
            push("/become-consultant");
          }
        }
      } else if (res?.error) {
        const msg = res?.message?.toLowerCase();

        if (res?.data?.validationErrors) {
          setOtpSent(false);
          const errors = res.data.validationErrors;
          const fieldMap = { firstname: "firstName", lastname: "lastName", phonenumber: "phone", mobile: "phone" };
          Object.entries(errors).forEach(([field, message]) => {
            const formField = fieldMap[field.toLowerCase()] || field;
            setError(formField, { type: "server", message });
          });
          if (Object.keys(errors).length > 0) {
            setIsLoading(false);
            return;
          }
        }

        if (
          msg?.includes("blocked") ||
          msg?.includes("too many attempts") ||
          msg?.includes("2 minutes")
        ) {
          const blockTime = Date.now() + 120 * 1000;
          localStorage.setItem("otpBlockUntil", String(blockTime));
          setCountdown(120);
        }

        if (msg?.includes("email")) {
          setOtpSent(false);
          setError("email", { type: "server", message: res.message });
        } else if (msg?.includes("phone")) {
          setOtpSent(false);
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

      if (api?.data?.validationErrors) {
        setOtpSent(false);
        const errors = api.data.validationErrors;
        const fieldMap = { firstname: "firstName", lastname: "lastName", phonenumber: "phone", mobile: "phone" };
        Object.entries(errors).forEach(([field, message]) => {
          const formField = fieldMap[field.toLowerCase()] || field;
          setError(formField, { type: "server", message });
        });
        if (Object.keys(errors).length > 0) {
          setIsLoading(false);
          return;
        }
      }

      if (
        msg?.includes("blocked") ||
        msg?.includes("too many attempts") ||
        msg?.includes("2 minutes")
      ) {
        const blockTime = Date.now() + 120 * 1000;
        localStorage.setItem("otpBlockUntil", String(blockTime));
        setCountdown(120);
      }

      if (msg?.includes("email")) {
        setOtpSent(false);
        setError("email", { type: "server", message: api.message });
      } else if (msg?.includes("phone")) {
        setOtpSent(false);
        setError("phone", { type: "server", message: api.message });
      } else {
        setError("root", {
          type: "server",
          message: api?.message || "Signup failed",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Keep autoVerifyRef current with each render's closure — plain assignment, not a hook
  autoVerifyRef.current = onValidateOtp;

  const modalContent = (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={handleClosePopup} style={{ animation: isClosing ? 'modalBackdropOut 0.25s ease-in forwards' : 'modalBackdropIn 0.25s ease-out' }}>
      <div className="relative flex w-full max-w-[900px] max-h-[95vh] overflow-hidden rounded-2xl shadow-2xl bg-primary-white" onClick={(e) => e.stopPropagation()} style={{ animation: isClosing ? 'modalCardOut 0.25s ease-in forwards' : 'modalCardIn 0.3s ease-out' }}>

        <button
          onClick={handleClosePopup}
          className="absolute bg-white cursor-pointer top-4 right-4 z-20 p-1 rounded-full hover:opacity-70 text-secondary"
        >
          <X size={20} />
        </button>

        {/* LEFT IMAGE SLIDER */}
        <div className="hidden md:block w-5/12 relative bg-black">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            speed={800}
            grabCursor={true}
            rewind={true}
            initialSlide={defaultTab === "consultant" ? 1 : 0}
            className="w-full h-full auth-swiper"
          >
            {/* Slide 1 - Buyer */}
            <SwiperSlide>
              <div className="relative w-full h-full">
                <Image
                  src="/auth-image-1.webp"
                  priority
                  alt="Buyer"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/80" />

                <div className="absolute bottom-12 right-8 z-10 flex flex-col items-end text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-10 h-10 bg-fourth rounded-full flex items-center justify-center">
                      <User className="text-white" size={20} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Buyer</h3>
                  </div>
                  <p className="text-white/90 text-[13px] max-w-[180px] mb-3 leading-snug">
                    Find the right vehicle with confidence.
                  </p>
                  <div className="w-8 h-[3px] bg-fourth rounded-full"></div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 - Consultant */}
            <SwiperSlide>
              <div className="relative w-full h-full">
                <Image
                  src="/auth-image-2.webp"
                  priority
                  alt="Consultant"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/80" />

                <div className="absolute bottom-12 right-8 z-10 flex flex-col items-end text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-10 h-10 bg-fourth rounded-full flex items-center justify-center">
                      <UserCheck className="text-white" size={20} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Consultant</h3>
                  </div>
                  <p className="text-white/90 text-[13px] max-w-[220px] mb-3 leading-snug">
                    Connect with qualified buyers and close more deals.
                  </p>
                  <div className="w-8 h-[3px] bg-fourth rounded-full"></div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 - Private Seller */}
            <SwiperSlide>
              <div className="relative w-full h-full">
                <Image
                  src="/auth-image-2.webp"
                  priority
                  alt="Private Seller"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/80" />

                <div className="absolute bottom-12 right-8 z-10 flex flex-col items-end text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-10 h-10 bg-fourth rounded-full flex items-center justify-center">
                      <User className="text-white" size={20} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Private Seller</h3>
                  </div>
                  <p className="text-white/90 text-[13px] max-w-[220px] mb-3 leading-snug">
                    Sell your personal vehicle directly to buyers with ease.
                  </p>
                  <div className="w-8 h-[3px] bg-fourth rounded-full"></div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* RIGHT FORM */}
        <form
          className="w-full md:w-7/12 p-8 md:p-12 bg-secondary flex flex-col overflow-y-auto custom-scrollbar"
          onSubmit={(e) => {
            e.preventDefault();
            clearErrors("root");
            if (!otpSent) {
              handleSubmit(onSendOtp)();
            } else {
              onValidateOtp();
            }
          }}
        >
          {/* Hidden input to hold iOS keyboard focus during async API calls */}
          <input ref={hiddenInputRef} type="tel" className="opacity-0 absolute -z-10 w-0 h-0 pointer-events-none" />

          <div className="mb-6">
            <h3 className="text-3xl font-extrabold text-primary tracking-tight font-primary">
              {isGoogleSignupFlow ? "Verify Mobile" : "Create Account"}
            </h3>
            <p className="text-sm text-third mt-1.5 leading-snug">
              {isGoogleSignupFlow
                ? "Enter your mobile number to complete verification."
                : "Register today and explore verified vehicles."}
            </p>
          </div>

          <div className="flex justify-center gap-10 mb-8 border-b border-accent-gray/20">
            <button
              type="button"
              onClick={() => {
                setAccountType("personal");
                clearErrors("email");
              }}
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
              onClick={() => {
                setAccountType("consultant");
                clearErrors("email");
              }}
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

          {/* Google Sign In moved below */}

          {isGoogleSignupFlow && !otpSent && (
            <div className="mb-4 text-center">
              <p className="text-sm text-primary/70 mb-2">Almost there! Please verify mobile number to complete sign-in.</p>
            </div>
          )}

          {/* FORM FIELDS */}
          {!otpSent ? (
            <>
              {!isGoogleSignupFlow && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <input
                        placeholder="First Name"
                        {...register("firstName", {
                          required: "First Name is required",
                          minLength: { value: 3, message: "First name must be between 3 and 35 characters" },
                          maxLength: { value: 35, message: "First name must be between 3 and 35 characters" },
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Cannot contain digits (0-9) or special characters (@, #, %, &, etc.)",
                          },
                        })}
                        onInput={(e) => {
                          const cleaned = e.target.value.replace(/[^A-Za-z\s]/g, "");
                          e.target.value = cleaned;
                          setValue("firstName", cleaned, { shouldValidate: true });
                        }}
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
                        {...register("lastName", {
                          required: "Last Name is required",
                          minLength: { value: 3, message: "Last name must be between 3 and 35 characters" },
                          maxLength: { value: 35, message: "Last name must be between 3 and 35 characters" },
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Cannot contain digits (0-9) or special characters (@, #, %, &, etc.)",
                          },
                        })}
                        onInput={(e) => {
                          const cleaned = e.target.value.replace(/[^A-Za-z\s]/g, "");
                          e.target.value = cleaned;
                          setValue("lastName", cleaned, { shouldValidate: true });
                        }}
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
                      placeholder={
                        accountType === "personal"
                          ? "Email address (Optional)"
                          : "Email address *"
                      }
                      {...register("email", {
                        required:
                          accountType === "personal"
                            ? false
                            : "Email is required",
                        validate: (value) => {
                          if (!value && accountType === "personal") return true;
                          if (!value && accountType !== "personal")
                            return "Email is required";
                          if (
                            !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)
                          ) {
                            return "Email must be in lowercase only";
                          }
                          return true;
                        },
                      })}
                      className="w-full text-primary py-3 px-4 border rounded-md border-accent-gray bg-transparent outline-none"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              <div className="mb-4">
                <div className="flex items-center text-primary border rounded-md border-accent-gray">
                  <span className="pl-4 pr-2 text-text-black/60">+91-</span>
                  <input
                    maxLength={10}
                    placeholder="9999999999"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, "");
                    }}
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
                  <Link href="/terms-and-conditions" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </>
          ) : (
            <div className="mb-4 flex items-center justify-between bg-primary/5 border border-primary/10 rounded-lg p-3.5">
              <div>
                {!isGoogleSignupFlow && (
                  <p className="text-sm font-semibold text-primary mb-1">
                    {getValues("firstName")} {getValues("lastName")}
                  </p>
                )}
                <p className="text-xs text-third">OTP sent to</p>
                <p className="text-sm font-semibold text-primary">
                  +91 {getValues("phone")}
                </p>
                {!isGoogleSignupFlow && getValues("email") && (
                  <p className="text-xs text-third mt-0.5">
                    {getValues("email")}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setCountdown(0);
                  localStorage.removeItem("otpBlockUntil");
                }}
                className="text-xs font-semibold text-primary hover:underline cursor-pointer bg-transparent border-none outline-none self-center"
              >
                Change
              </button>
            </div>
          )}

          {/* OTP SEND BUTTON */}
          {!otpSent && (
            <Button
              type="submit"
              variant="ghost"
              onClick={() => hiddenInputRef.current?.focus()}
              locked={!acceptedTerms || isLoading || countdown > 0}
              disabled={!acceptedTerms || countdown > 0}
              className={`text-secondary w-full h-11 shrink-0 text-sm font-bold flex items-center justify-center gap-2 ${!acceptedTerms ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "GET OTP"
              )}
            </Button>
          )}

          {/* OTP BOX */}
          {otpSent && (
            <>
              <p className="text-sm text-text-black/70 mt-6 mb-3">
                Enter OTP sent to +91 {getValues("phone")}
              </p>

              <div className="flex justify-center gap-2 sm:gap-4 mb-6 shrink-0">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    autoFocus={index === 0}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-center text-primary text-xl font-bold border rounded-lg border-accent-primary/20 outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all p-0 shrink-0"
                  />
                ))}
              </div>

              {/* Resend OTP */}
              <div className="text-center text-xs text-primary/70 mb-4 mt-2 shrink-0">
                Didn&apos;t receive OTP?{" "}
                <button
                  type="button"
                  disabled={countdown > 0 || isLoading}
                  onClick={onSendOtp}
                  className={`font-semibold text-primary hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                </button>
              </div>

              <Button
                type="submit"
                variant="ghost"
                locked={isLoading}
                className="text-secondary w-full h-11 shrink-0 text-sm font-bold flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span className="text-xs opacity-70">Verifying…</span>
                  </>
                ) : (
                  "VALIDATE OTP"
                )}
              </Button>
            </>
          )}

          {/* ✅ GOOGLE SIGNUP BELOW */}
          {!otpSent && !isGoogleSignupFlow && (
            <div className="mt-4 shrink-0">
              <div className="flex items-center mb-4">
                <div className="flex-1 border-t border-accent-gray/30"></div>
                <span className="px-3 text-xs text-primary/50">or register with Google</span>
                <div className="flex-1 border-t border-accent-gray/30"></div>
              </div>
              <Button
                type="button"
                className="w-full h-11 shrink-0 text-sm font-bold flex items-center justify-center gap-2 border border-accent-gray bg-transparent text-primary hover:border-accent-gray hover:text-primary hover:shadow-md transition-all"
                onClick={handleGoogleSignIn}
                disabled={isLoading || isGoogleLoading}
                loading={isGoogleLoading}
              >
                <FcGoogle className="text-xl" /> Continue with Google
              </Button>
            </div>
          )}

          {/* LOGIN LINK */}
          {!isGoogleSignupFlow && (
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
          )}

          {/* REMOVED OLD TERMS TEXT */}
        </form>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
