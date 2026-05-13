/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/stores/useAuthStore";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  const { user, token, isLoggedIn, authInitialized, initializeAuth } =
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
      router.replace("/consult/account");
      return;
    }

    //  USER EXISTS
    setChecking(false);
  }, [authInitialized, isLoggedIn, token, user]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return children;
}
