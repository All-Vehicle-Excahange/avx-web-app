"use client";

import { useEffect } from "react";
import { setupGuestUser } from "@/lib/guest.util";
import { useAuthStore } from "@/stores/useAuthStore";

export default function useGuestSetup() {
  const { isLoggedIn, authInitialized } = useAuthStore();

  useEffect(() => {
    if (!authInitialized) return;

    const hasTokenInUrl =
      typeof window !== "undefined" &&
      (window.location.search?.includes("magicToken=") ||
        window.location.search?.includes("token=") ||
        new URLSearchParams(window.location.search).has("magicToken") ||
        new URLSearchParams(window.location.search).has("token"));

    if (!isLoggedIn && !hasTokenInUrl) {
      setupGuestUser();
    }
  }, [isLoggedIn, authInitialized]);
}
