"use client";

import React, { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getOtp, login, googleVerify, googleSignupVerify } from "@/services/auth.service";
import { useForm } from "react-hook-form";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm();

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [googleToken, setGoogleToken] = useState(null);
  const [isGoogleSignupFlow, setIsGoogleSignupFlow] = useState(false);
  const otpRefs = useRef([]);

  // Check for active block on mount
  useEffect(() => {
    const blockUntil = localStorage.getItem("otpBlockUntil");
    if (blockUntil) {
      const remaining = Math.ceil((Number(blockUntil) - Date.now()) / 1000);
      if (remaining > 0) {
        setCountdown(remaining);
      } else {
        localStorage.removeItem("otpBlockUntil");
      }
    }
  }, []);

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
          push("/consult/subscription");
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
      setLoading(true);
      const phone = getValues("phoneNumber");
      const res = await getOtp({
        phoneNumber: phone,
        countryCode: "+91",
        requestType: isGoogleSignupFlow ? "SIGNUP" : "LOGIN",
      });

      if (res?.success || res?.status) {
        setOtpSent(true);
        const blockTime = Date.now() + 60 * 1000;
        localStorage.setItem("otpBlockUntil", String(blockTime));
        setCountdown(60);
        setTimeout(() => otpRefs.current[0]?.focus(), 200);
      }
    } catch (err) {
      const api = err?.response?.data;
      const msg = api?.message || "Failed to send OTP";

      if (msg.toLowerCase().includes("otp already sent")) {
        setOtpSent(true);
        const blockTime = Date.now() + 60 * 1000;
        localStorage.setItem("otpBlockUntil", String(blockTime));
        setCountdown(60);
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
      setLoading(false);
    }
  };

  const onValidateOtp = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      setOtpError("OTP must be 6 digits");
      return;
    }

    try {
      setLoading(true);
      const phone = getValues("phoneNumber");
      
      let res;
      if (isGoogleSignupFlow) {
        res = await googleSignupVerify({
          googleIdToken: googleToken,
          phoneNumber: phone,
          countryCode: "+91",
          otp: finalOtp,
          isApplyForConsultation: false,
        });
      } else {
        res = await login({
          phoneNumber: phone,
          countryCode: "+91",
          otp: finalOtp,
        });
      }

      if (res?.success || res?.status) {
        push("/consult/subscription");
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
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (!otpSent) {
          handleSubmit(onSendOtp)();
        } else {
          onValidateOtp();
        }
      }}
    >
      {errors.root?.message && (
        <p className="text-red-500 text-sm mb-4 text-center">
          {errors.root.message}
        </p>
      )}

      {!otpSent && !isGoogleSignupFlow && (
        <div className="mb-4">
          <Button
            type="button"
            className="w-full h-11 text-sm font-bold flex items-center justify-center gap-2 border border-accent-gray bg-transparent text-primary hover:border-accent-gray hover:text-primary hover:shadow-md transition-all"
            onClick={handleGoogleSignIn}
            disabled={loading || isGoogleLoading}
            loading={isGoogleLoading}
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </Button>
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-accent-gray/30"></div>
            <span className="px-3 text-xs text-primary/50">or login with mobile</span>
            <div className="flex-1 border-t border-accent-gray/30"></div>
          </div>
        </div>
      )}

      {isGoogleSignupFlow && !otpSent && (
        <div className="mb-4 text-center">
          <p className="text-sm text-primary/70 mb-2">Almost there! Please verify mobile number to complete sign-in.</p>
        </div>
      )}

      <h1 className="text-4xl font-bold mb-6">
        {isGoogleSignupFlow ? (
          <>Verify mobile number</>
        ) : (
          <>Log in to <br /> continue</>
        )}
      </h1>

      {!otpSent ? (
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
            onClick={() => setOtpSent(false)}
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
              disabled={countdown > 0 || loading}
              onClick={onSendOtp}
              className={`font-semibold text-primary hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
            </button>
          </div>
          {otpError && (
            <p className="text-red-500 text-xs text-center mb-4">
              {otpError}
            </p>
          )}
        </>
      )}

      {/* BUTTON */}
      {!otpSent ? (
        <Button
          type="submit"
          variant="ghost"
          className="w-full h-11 text-sm font-bold"
          loading={loading}
          disabled={countdown > 0}
        >
          {countdown > 0 ? `GET OTP (${countdown}s)` : "GET OTP"}
        </Button>
      ) : (
        <Button
          type="submit"
          variant="ghost"
          className="w-full h-11 text-sm font-bold"
          loading={loading}
        >
          Validate OTP
        </Button>
      )}

      {/* TERMS */}
      <div className="text-[10px] text-primary/50 mt-6 text-center">
        By logging in, you agree to Reecomms Privacy Policy & Terms
      </div>
    </form>
  );
}

export default Login;
