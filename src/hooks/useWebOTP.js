/**
 * useWebOTP - Automatic OTP detection for mobile web browsers
 *
 * Strategy:
 *  1. WebOTP API (Android Chrome >= 84): navigator.credentials.get({ otp: { transport: ["sms"] } })
 *  2. autocomplete="one-time-code" on the first OTP input (handled in JSX)
 *
 * Call startWebOTP() after the OTP SMS is dispatched.
 * Call abortWebOTP() on cleanup / flow reset.
 */

import { useRef, useCallback } from "react";

function isWebOTPSupported() {
  return (
    typeof window !== "undefined" &&
    "OTPCredential" in window &&
    typeof navigator?.credentials?.get === "function"
  );
}

export function useWebOTP({ onOTPReceived }) {
  const abortControllerRef = useRef(null);

  const startWebOTP = useCallback(async () => {
    if (!isWebOTPSupported()) return false;

    abortControllerRef.current?.abort();
    const ac = new AbortController();
    abortControllerRef.current = ac;

    try {
      const credential = await navigator.credentials.get({
        otp: { transport: ["sms"] },
        signal: ac.signal,
      });

      if (credential?.code) {
        const digits = credential.code.replace(/\D/g, "").slice(0, 6);
        if (digits.length === 6) {
          onOTPReceived(digits);
          return true;
        }
      }
    } catch (err) {
      if (err?.name !== "AbortError") {
        console.warn("[useWebOTP] credential.get failed:", err?.message || err);
      }
    }
    return false;
  }, [onOTPReceived]);

  const abortWebOTP = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  }, []);

  return {
    webOtpSupported: isWebOTPSupported(),
    startWebOTP,
    abortWebOTP,
  };
}
