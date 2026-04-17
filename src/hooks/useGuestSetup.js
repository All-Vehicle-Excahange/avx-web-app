"use client";

import { useEffect } from "react";
import { setupGuestUser } from "@/lib/guest.util";
import { getGuestId } from "@/lib/indexdb/guest.db";
import { useAuthStore } from "@/stores/useAuthStore";

export default function useGuestSetup() {
  const { isLoggedIn, authInitialized, openLoginPopup } = useAuthStore();

  useEffect(() => {
    if (!authInitialized) return;

    if (!isLoggedIn) {
      (async () => {
        const existingId = await getGuestId();
        if (!existingId) {
          openLoginPopup();
        }
        setupGuestUser();
      })();
    }
  }, [isLoggedIn, authInitialized, openLoginPopup]);
}
