/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/stores/useAuthStore";

export default function ProtectedRoute({ children }) {
  const { replace } = useRouter();

  const { user, token, isLoggedIn, authInitialized, initializeAuth, openLoginPopup } =
    useAuthStore();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    if (!authInitialized) return;

    //  ONLY CHECK LOGIN HERE
    const hasAccess = isLoggedIn && token && user;

    // ❌ NOT LOGGED IN
    if (!hasAccess) {
      try {
        sessionStorage.setItem("triggerLoginPopup", "true");
      } catch (e) { }
      replace("/consult");
      return;
    }

    //  USER EXISTS
    setChecking(false);
  }, [authInitialized, isLoggedIn, token, user]);

  if (checking) {
    return children;
  }

  return children;
}
