"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, User, UserCheck } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { getOtp, login, googleVerify, googleSignupVerify } from "@/services/auth.service";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/stores/useAuthStore";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import { FcGoogle } from "react-icons/fc";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function LoginPopup({
  isOpen,
  onClose,
  onSignup = () => { },
  onSuccess = () => { },
}) {
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
  const [countdown, setCountdown] = useState(0);

  const otpRefs = useRef([]);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleToken, setGoogleToken] = useState(null);
  const [isGoogleSignupFlow, setIsGoogleSignupFlow] = useState(false);
  const [accountType, setAccountType] = useState("personal");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Check for active block on mount or when popup opens
  useEffect(() => {
    if (isOpen) {
      reset();
      setOtp(Array(6).fill(""));
      setOtpSent(false);
      setOtpError("");
      setIsLoading(false);
      setIsGoogleLoading(false);
      setAccountType("personal");
      setAcceptedTerms(false);

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
  }, [isOpen]);

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

  const triggerClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      reset();
      setOtp(Array(6).fill(""));
      setOtpSent(false);
      setOtpError("");
      setCountdown(0);
      setGoogleToken(null);
      setIsGoogleSignupFlow(false);
      setIsGoogleLoading(false);
      setAccountType("personal");
      setAcceptedTerms(false);
      localStorage.removeItem("otpBlockUntil");
      onClose();
    }, 250);
  }, [onClose, reset]);

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

  const handleClose = triggerClose;

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
          onSuccess();
          handleClose();
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
      const phone = getValues("phoneNumber");

      const res = await getOtp({
        phoneNumber: phone,
        countryCode: "+91",
        requestType: isGoogleSignupFlow ? "SIGNUP" : "LOGIN",
      });

      if (res?.success || res?.status) {
        setOtpSent(true);
        const blockTime = Date.now() + 30 * 1000;
        localStorage.setItem("otpBlockUntil", String(blockTime));
        setCountdown(30);
        setTimeout(() => otpRefs.current[0]?.focus(), 200);
      }
    } catch (err) {
      const status = err?.response?.status;
      const api = err?.response?.data;
      let msg = api?.message || "Failed to send OTP";

      if (status === 404) {
        msg = "This number isn't registered. Create your account.";
      }

      if (msg.toLowerCase().includes("otp already sent")) {
        setOtpSent(true);
        const blockTime = Date.now() + 30 * 1000;
        localStorage.setItem("otpBlockUntil", String(blockTime));
        setCountdown(30);
        setTimeout(() => otpRefs.current[0]?.focus(), 200);
        return;
      }

      if (
        msg.toLowerCase().includes("blocked") ||
        msg.toLowerCase().includes("too many attempts") ||
        msg.toLowerCase().includes("2 minutes")
      ) {
        const blockTime = Date.now() + 120 * 1000;
        localStorage.setItem("otpBlockUntil", String(blockTime));
        setCountdown(120);
      }

      setError("phoneNumber", {
        type: "server",
        message: msg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onValidateOtp = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setOtpError("OTP must be 6 digits");
      return;
    }

    try {
      setIsLoading(true);
      const phone = getValues("phoneNumber");

      let res;
      if (isGoogleSignupFlow) {
        res = await googleSignupVerify({
          googleIdToken: googleToken,
          phoneNumber: phone,
          countryCode: "+91",
          otp: finalOtp,
          isApplyForConsultation: accountType === "consultant",
        });
      } else {
        res = await login({
          phoneNumber: phone,
          countryCode: "+91",
          otp: finalOtp,
        });
      }

      if (res?.success || res?.status) {
        localStorage.removeItem("otpBlockUntil");
        setCountdown(0);

        const currentUser = useAuthStore.getState().user;
        const currentAccountType = currentUser?.accountType;

        if (currentAccountType !== "consultant") {
          await onSuccess();
        }
        handleClose();
      }
    } catch (err) {
      const api = err?.response?.data;
      const msg = api?.message || "Invalid or expired OTP";

      if (
        msg.toLowerCase().includes("blocked") ||
        msg.toLowerCase().includes("too many attempts") ||
        msg.toLowerCase().includes("2 minutes")
      ) {
        const blockTime = Date.now() + 120 * 1000;
        localStorage.setItem("otpBlockUntil", String(blockTime));
        setCountdown(120);
      }

      setOtpError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleClose}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      <div
        className="relative flex w-full max-w-[900px] min-h-[400px] md:min-h-[460px] overflow-hidden rounded-2xl shadow-2xl bg-primary-white"
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

        {/* LEFT IMAGE SLIDER */}
        <div className="hidden md:block w-5/12 relative bg-black">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            speed={800}
            grabCursor={true}
            rewind={true}
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
          className="w-full md:w-7/12 p-8 md:p-12 bg-secondary flex flex-col justify-center"
          onSubmit={handleSubmit(otpSent ? onValidateOtp : onSendOtp)}
        >
          <div className="mb-6">
            <h3 className="text-3xl font-extrabold text-primary tracking-tight font-primary">
              {isGoogleSignupFlow ? "Verify Mobile" : "Welcome Back"}
            </h3>
            <p className="text-sm text-third mt-1.5 leading-snug">
              {isGoogleSignupFlow
                ? "Enter your mobile number to complete verification."
                : "Log in to continue your journey with Reecomm."}
            </p>
          </div>

          {errors.root?.message && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {errors.root.message}
            </p>
          )}

          {/* Google Sign In moved below */}

          {isGoogleSignupFlow && !otpSent && (
            <>
              <div className="flex justify-center gap-10 mb-8 ">
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


            </>
          )}

          {/* ✅ MOBILE INPUT */}
          {!otpSent ? (
            <>
              <div className="mb-4">
                {!isGoogleSignupFlow && (
                  <label className="block text-sm mb-2 text-primary/70">
                    Mobile Number
                  </label>
                )}

                <div className={`flex items-center border rounded-md ${isGoogleSignupFlow ? "border-accent-gray text-primary" : "border-accent-primary"}`}>
                  <span className={`pl-4 pr-2 ${isGoogleSignupFlow ? "text-text-black/60" : "text-primary/60"}`}>+91-</span>

                  <input
                    maxLength={10}
                    placeholder="9999999999"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, "");
                    }}
                    {...register("phoneNumber", {
                      required: "Mobile number is required",
                      minLength: {
                        value: 10,
                        message: "Mobile must be 10 digits",
                      },
                    })}
                    className={`w-full text-primary py-3 px-2 outline-none bg-transparent ${isGoogleSignupFlow ? "border-l border-accent-gray" : ""}`}
                  />
                </div>

                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {isGoogleSignupFlow && (
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
                    <a href="/terms-and-conditions" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      Privacy Policy
                    </a>
                  </label>
                </div>
              )}
            </>
          ) : (
            <div className="mb-4 flex items-center justify-between bg-primary/5 border border-primary/10 rounded-lg p-3">
              <div>
                <p className="text-xs text-third">OTP sent to</p>
                <p className="text-sm font-semibold text-primary">
                  +91 {getValues("phoneNumber")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setCountdown(0);
                  localStorage.removeItem("otpBlockUntil");
                }}
                className="text-xs font-semibold text-primary hover:underline cursor-pointer bg-transparent border-none outline-none"
              >
                Change
              </button>
            </div>
          )}

          {otpSent && (
            <>
              <p className="text-sm text-primary/70 mb-3">
                Enter the 6-digit OTP
              </p>

              <div className="flex justify-center gap-2 sm:gap-4 mb-6 mt-2">
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

              {/* Resend OTP */}
              <div className="text-center text-xs text-primary/70 mb-4 mt-2">
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
              type="submit"
              variant="ghost"
              locked={isLoading || countdown > 0 || (isGoogleSignupFlow && !acceptedTerms)}
              disabled={countdown > 0 || (isGoogleSignupFlow && !acceptedTerms)}
              className={`w-full h-11 text-sm font-bold flex items-center justify-center gap-2 ${isGoogleSignupFlow && !acceptedTerms ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "GET OTP"
              )}
            </Button>
          ) : (
            <Button
              type="submit"
              variant="ghost"
              locked={isLoading}
              className="w-full h-11 text-sm font-bold flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Validate OTP"
              )}
            </Button>
          )}

          {/* ✅ GOOGLE LOGIN BELOW */}
          {!otpSent && !isGoogleSignupFlow && (
            <div className="mt-4">
              <div className="flex items-center mb-4">
                <div className="flex-1 border-t border-accent-gray/30"></div>
                <span className="px-3 text-xs text-primary/50">or login with Google</span>
                <div className="flex-1 border-t border-accent-gray/30"></div>
              </div>
              <Button
                type="button"
                className="w-full h-11 text-sm font-bold flex items-center justify-center gap-2 border border-accent-gray bg-transparent text-primary hover:border-accent-gray hover:text-primary hover:shadow-md transition-all"
                onClick={handleGoogleSignIn}
                disabled={isLoading || isGoogleLoading}
                loading={isGoogleLoading}
              >
                <FcGoogle className="text-xl" /> Continue with Google
              </Button>
            </div>
          )}

          {!isGoogleSignupFlow && (
            <>
              {/* REGISTER LINK */}
              <div className="mt-4 text-primary/60 text-center text-sm">
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    const typedPhone = getValues("phoneNumber");
                    if (typedPhone) {
                      useAuthStore.setState({ prefilledPhoneNumber: typedPhone });
                    }
                    handleClose();
                    setTimeout(() => onSignup(typedPhone), 100);
                  }}
                  className="font-semibold text-primary hover:underline cursor-pointer"
                >
                  Create
                </button>
              </div>

              {/* TERMS */}
              <div className="text-[10px] text-primary/50 mt-6 text-center">
                By logging in, you agree to Reecomm&apos;s{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary transition-colors font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  Privacy Policy
                </a>{" "}
                &amp;{" "}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary transition-colors font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  Terms
                </a>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );

  // render via portal to ensure fixed positioning is relative to viewport
  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

export default LoginPopup;
