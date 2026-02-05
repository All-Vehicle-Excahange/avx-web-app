import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";

import { useAuthStore } from "@/stores/useAuthStore";
import useGuestSetup from "@/hooks/useGuestSetup";

import LoginPopup from "@/components/auth/LoginPopup"; 

export default function App({ Component, pageProps }) {
  const hasFullWidth = pageProps?.fullWidth;

  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  const isLoginPopupOpen = useAuthStore((state) => state.isLoginPopupOpen);
  const closeLoginPopup = useAuthStore((state) => state.closeLoginPopup);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useGuestSetup();

  if (hasFullWidth)
    return (
      <>
        <Component {...pageProps} />

        <LoginPopup isOpen={isLoginPopupOpen} onClose={closeLoginPopup} />
      </>
    );

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>

      <LoginPopup isOpen={isLoginPopupOpen} onClose={closeLoginPopup} />
    </>
  );
}
