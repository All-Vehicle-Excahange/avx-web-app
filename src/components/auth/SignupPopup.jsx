"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/button";
import { getOtp, signup, googleVerify, googleSignupVerify } from "@/services/auth.service";
import { useForm } from "react-hook-form";
import { X, Loader2, User, UserCheck } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import { FcGoogle } from "react-icons/fc";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useAuthStore } from "@/stores/useAuthStore";

export default function SignupPopup({ isOpen, onClose, onLogin = () => { }, onSuccess = () => { } }) {
  const prefilledPhoneNumber = useAuthStore((state) => state.prefilledPhoneNumber);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const { push } = useRouter();

  const [accountType, setAccountType] = useState("personal");

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const otpRefs = useRef([]);
  const [isClosing, setIsClosing] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [googleToken, setGoogleToken] = useState(null);
  const [isGoogleSignupFlow, setIsGoogleSignupFlow] = useState(false);

  // Check for active block on mount or when popup opens
  useEffect(() => {
    if (isOpen) {
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

  useEffect(() => {
    if (isOpen) {
      document.dispatchEvent(new Event("signuppopup:open"));
    }
  }, [isOpen]);

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

  if (!isOpen && !isClosing) return null;

  const handleClosePopup = () => {
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
      useAuthStore.setState({ prefilledPhoneNumber: "" });
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
          await onSuccess();
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
        email,
        countryCode: "+91",
        requestType: "SIGNUP",
      });

      // Check error flag first, then success
      if (!res?.error && (res?.success || res?.status)) {
        setOtpSent(true);
        const blockTime = Date.now() + 60 * 1000;
        localStorage.setItem("otpBlockUntil", String(blockTime));
        setCountdown(60);
        setTimeout(() => otpRefs.current[0]?.focus(), 200);
      } else if (res?.error) {
        // Handle API errors returned in response
        const msg = res?.message?.toLowerCase();
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

  const onValidateOtp = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setError("root", { type: "manual", message: "OTP must be 6 digits" });
      return;
    }

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
          email: values.email,
          phoneNumber: values.phone,
          countryCode: "+91",
          isApplyForConsultation: accountType === "consultant",
          otp: finalOtp,
        });
      }

      if (!res?.error && (res?.success || res?.status)) {
        localStorage.removeItem("otpBlockUntil");
        setCountdown(0);
        
        // Wait for onSuccess to complete (which might open CompleteProfilePopup)
        await onSuccess();
        
        handleClosePopup();
      } else if (res?.error) {
        const msg = res?.message?.toLowerCase();
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
        setError("email", { type: "server", message: api.message });
      } else if (msg?.includes("phone")) {
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

  const modalContent = (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={handleClosePopup} style={{ animation: isClosing ? 'modalBackdropOut 0.25s ease-in forwards' : 'modalBackdropIn 0.25s ease-out' }}>
      <div className="relative flex w-full max-w-[900px] overflow-hidden rounded-2xl shadow-2xl bg-primary-white" onClick={(e) => e.stopPropagation()} style={{ animation: isClosing ? 'modalCardOut 0.25s ease-in forwards' : 'modalCardIn 0.3s ease-out' }}>

        <button
          onClick={handleClosePopup}
          className="absolute bg-white cursor-pointer top-4 right-4 z-20 p-1 rounded-full hover:opacity-70 text-secondary"
        >
          <X size={20} />
        </button>

        {/* LEFT IMAGE SLIDER */}
        <div className="hidden md:block w-5/12 relative bg-black">
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            effect="fade"
            loop={true}
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
          </Swiper>
        </div>

        {/* RIGHT FORM */}
        <form
          className="w-full md:w-7/12 p-8 md:p-12 bg-secondary flex flex-col justify-center"
          onSubmit={(e) => {
            e.preventDefault();
            if (!otpSent) {
              handleSubmit(onSendOtp)();
            } else {
              onValidateOtp();
            }
          }}
        >
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

          {/* Google Sign In moved below */}

          {isGoogleSignupFlow && !otpSent && (
            <div className="mb-4 text-center">
              <p className="text-sm text-primary/70 mb-2">Almost there! Please verify mobile number to complete sign-in.</p>
            </div>
          )}

          {/* FORM FIELDS */}
          {!isGoogleSignupFlow && (
            <>
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                  message: "Email must be in lowercase only",
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
              locked={!acceptedTerms || isLoading || countdown > 0}
              disabled={!acceptedTerms || countdown > 0}
              className={`text-secondary w-full h-11 text-sm font-bold flex items-center justify-center gap-2 ${
                !acceptedTerms ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : countdown > 0 ? (
                `GET OTP (${countdown}s)`
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

              <Button
                type="submit"
                variant="ghost"
                locked={isLoading}
                className="text-secondary w-full h-11 text-sm font-bold flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  "VALIDATE OTP"
                )}
              </Button>
            </>
          )}

          {/* ✅ GOOGLE SIGNUP BELOW */}
          {!otpSent && !isGoogleSignupFlow && (
            <div className="mt-4">
              <div className="flex items-center mb-4">
                <div className="flex-1 border-t border-accent-gray/30"></div>
                <span className="px-3 text-xs text-primary/50">or register with Google</span>
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
