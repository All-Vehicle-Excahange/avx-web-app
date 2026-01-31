"use client";

import { useEffect } from "react";
import { setupGuestUser } from "@/lib/guest.util";
import { useAuthStore } from "@/stores/useAuthStore";

export default function useGuestSetup() {
  const { isLoggedIn, authInitialized } = useAuthStore();

  useEffect(() => {
    if (!authInitialized) return;

    if (!isLoggedIn) {
      setupGuestUser();
    }
  }, [isLoggedIn, authInitialized]);
}
