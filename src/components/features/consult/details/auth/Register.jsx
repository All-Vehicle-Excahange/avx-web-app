"use client";

import React, { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getOtp, signup } from "@/services/auth.service";
import { useForm } from "react-hook-form";

function Register() {
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
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const otpRefs = useRef([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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
      setLoading(true);
      const phone = getValues("phone");
      const email = getValues("email");

      const res = await getOtp({
        phoneNumber: phone,
        email,
        countryCode: "+91",
        requestType: "SIGNUP",
      });

      if (!res?.error && (res?.success || res?.status)) {
        setOtpSent(true);
        const blockTime = Date.now() + 60 * 1000;
        localStorage.setItem("otpBlockUntil", String(blockTime));
        setCountdown(60);
        setTimeout(() => otpRefs.current[0]?.focus(), 200);
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
      setLoading(false);
    }
  };

  const onValidateOtp = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setError("root", { type: "manual", message: "OTP must be 6 digits" });
      return;
    }

    try {
      setLoading(true);
      const values = getValues();

      const res = await signup({
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        phoneNumber: values.phone,
        countryCode: "+91",
        isApplyForConsultation: true,
        otp: finalOtp,
      });

      if (!res?.error && (res?.success || res?.status)) {
        push("/consult/subscription");
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
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center text-primary border rounded-md border-accent-gray">
          <span className="pl-4 pr-2 text-primary/60">+91-</span>
          <input
            maxLength={10}
            placeholder="9999999999"
            {...register("phone", {
              required: "Phone is required",
              minLength: {
                value: 10,
                message: "Valid 10 digit number required",
              },
            })}
            className="w-full text-primary py-3 px-2 outline-none bg-transparent"
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div className="flex items-start gap-2 mb-4">
        <input
          type="checkbox"
          id="termsCheckbox"
          className="mt-1 shrink-0 cursor-pointer"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
        />
        <label
          htmlFor="termsCheckbox"
          className="text-sm text-primary/60 cursor-pointer"
        >
          I agree to the{" "}
          <a
            href="/terms"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </label>
      </div>

      {/* OTP SEND BUTTON */}
      {!otpSent && (
        <Button
          type="submit"
          variant="ghost"
          disabled={!acceptedTerms || loading || countdown > 0}
          loading={loading}
          className={`w-full h-11 text-sm font-bold ${!acceptedTerms ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {countdown > 0 ? `GET OTP (${countdown}s)` : "GET OTP"}
        </Button>
      )}

      {/* OTP BOX */}
      {otpSent && (
        <>
          <p className="text-sm text-primary/70 mt-4 mb-3">
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
              disabled={countdown > 0 || loading}
              onClick={onSendOtp}
              className={`font-semibold text-primary hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
            </button>
          </div>

          <Button
            type="submit"
            variant="ghost"
            className="w-full h-11 text-sm font-bold"
            loading={loading}
          >
            VALIDATE OTP
          </Button>
        </>
      )}
    </form>
  );
}

export default Register;
