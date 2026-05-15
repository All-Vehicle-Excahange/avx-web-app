import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";

import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";

import { useAuthStore } from "@/stores/useAuthStore";
import useGuestSetup from "@/hooks/useGuestSetup";
import LoginPopup from "@/components/auth/LoginPopup";
import GlobalLoader from "@/components/ui/GlobalLoader";
import SplashScreen from "@/components/ui/SplashScreen";
import GlobalCompareButton from "@/components/ui/GlobalCompareButton";
import {
  exo,
  inter,
  lexendDeca,
  montserrat,
  poppins,
  raleway,
  roboto,
} from "@/lib/fonts";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const hasFullWidth = Component.fullWidth;
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isLoginPopupOpen = useAuthStore((state) => state.isLoginPopupOpen);
  const closeLoginPopup = useAuthStore((state) => state.closeLoginPopup);

  const [loading, setLoading] = useState(false);

  // 1. Start with 'null' or a neutral state to avoid the cascading render warning
  const [showSplash, setShowSplash] = useState(null);

  // HANDLE INITIAL MOUNT AND SPLASH LOGIC
  useEffect(() => {
    const checkSplash = () => {
      try {
        const hasSeenSplash = localStorage.getItem("splashSeen");
        const sessionSeen = sessionStorage.getItem("splashSession");

        if (hasSeenSplash || sessionSeen) {
          setShowSplash(false);
        } else {
          setShowSplash(true);
        }
      } catch (e) {
        setShowSplash(false);
      }
    };

    checkSplash();
    initializeAuth();
  }, [initializeAuth]);

  // CROSS-TAB SYNC
  useEffect(() => {
    const channel = new BroadcastChannel("splash_channel");
    channel.onmessage = (event) => {
      if (event.data === "SPLASH_DONE") setShowSplash(false);
    };
    return () => channel.close();
  }, []);

  const handleSplashComplete = () => {
    try {
      localStorage.setItem("splashSeen", "true");
      sessionStorage.setItem("splashSession", "true");
    } catch (e) {}

    const channel = new BroadcastChannel("splash_channel");
    channel.postMessage("SPLASH_DONE");
    channel.close();
    setShowSplash(false);
  };

  useGuestSetup();

  // ROUTE LOADER
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleStop);
    Router.events.on("routeChangeError", handleStop);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleStop);
      Router.events.off("routeChangeError", handleStop);
    };
  }, []);

  // 2. While showSplash is null, we render a shell or nothing.
  // This prevents the "cascading render" because we aren't changing from true to false instantly.
  if (showSplash === null) {
    return null; // Or a simple loading spinner
  }

  return (
    <div
      className={`${exo.variable} ${inter.variable} ${lexendDeca.variable} ${montserrat.variable} ${poppins.variable} ${raleway.variable} ${roboto.variable} font-sans`}
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const hasSeen = localStorage.getItem('splashSeen');
                const sessionSeen = sessionStorage.getItem('splashSession');
                if (hasSeen || sessionSeen) {
                  document.documentElement.style.setProperty('--splash-display', 'none');
                }
              } catch (e) {}
            `,
          }}
        />
      </Head>

      {hasFullWidth ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}

      <LoginPopup
        isOpen={isLoginPopupOpen && !showSplash}
        onClose={closeLoginPopup}
      />

      {showSplash && (
        <div style={{ display: "var(--splash-display, contents)" }}>
          <SplashScreen onComplete={handleSplashComplete} />
        </div>
      )}

      {!showSplash &&
        !router.asPath.startsWith("/consult/dashboard/") &&
        !router.asPath.startsWith("/consult/kyc") && <GlobalCompareButton />}
    </div>
  );
}
