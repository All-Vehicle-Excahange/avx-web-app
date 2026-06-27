import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";

import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";

import { useAuthStore } from "@/stores/useAuthStore";
import useGuestSetup from "@/hooks/useGuestSetup";
import LoginPopup from "@/components/auth/LoginPopup";
import SignupPopup from "@/components/auth/SignupPopup";
import CompleteProfilePopup from "@/components/auth/CompleteProfilePopup";
import GlobalLoader from "@/components/ui/GlobalLoader";
import SplashScreen from "@/components/ui/SplashScreen";
import GlobalCompareButton from "@/components/ui/GlobalCompareButton";

import * as gtag from "@/lib/gtag";

import {
  exo,
  inter,
  lexendDeca,
  montserrat,
  poppins,
  raleway,
  roboto,
} from "@/lib/fonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { checkIsMetaExist } from "@/services/user.service";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const hasFullWidth = Component.fullWidth;

  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  const isLoginPopupOpen = useAuthStore((state) => state.isLoginPopupOpen);
  const closeLoginPopup = useAuthStore((state) => state.closeLoginPopup);
  const openLoginPopup = useAuthStore((state) => state.openLoginPopup);
  const isSignupPopupOpen = useAuthStore((state) => state.isSignupPopupOpen);
  const openSignupPopup = useAuthStore((state) => state.openSignupPopup);
  const closeSignupPopup = useAuthStore((state) => state.closeSignupPopup);

  const isCompleteProfilePopupOpen = useAuthStore((state) => state.isCompleteProfilePopupOpen);
  const openCompleteProfilePopup = useAuthStore((state) => state.openCompleteProfilePopup);
  const closeCompleteProfilePopup = useAuthStore((state) => state.closeCompleteProfilePopup);

  const [loading, setLoading] = useState(false);

  // Splash Screen State
  const [showSplash, setShowSplash] = useState(false);

  // INITIAL SETUP
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

  // CROSS TAB SPLASH SYNC
  useEffect(() => {
    const channel = new BroadcastChannel("splash_channel");

    channel.onmessage = (event) => {
      if (event.data === "SPLASH_DONE") {
        setShowSplash(false);
      }
    };

    return () => channel.close();
  }, []);

  // SPLASH COMPLETE
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

  // ROUTE LOADER + GOOGLE ANALYTICS
  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleStop = (url) => {
      setLoading(false);

      // Track page views
      gtag.pageview(url);
    };

    Router.events.on("routeChangeStart", handleStart);

    Router.events.on("routeChangeComplete", handleStop);

    Router.events.on("routeChangeError", handleStop);

    return () => {
      Router.events.off("routeChangeStart", handleStart);

      Router.events.off("routeChangeComplete", handleStop);

      Router.events.off("routeChangeError", handleStop);
    };
  }, []);

  // Handle cross-page login popup triggering
  useEffect(() => {
    if (typeof window !== "undefined") {
      const trigger = sessionStorage.getItem("triggerLoginPopup");
      if (trigger === "true") {
        sessionStorage.removeItem("triggerLoginPopup");
        setTimeout(() => {
          openLoginPopup();
        }, 150);
      }
    }
  }, [router.asPath, openLoginPopup]);

  // Prevent hydration flashing
  if (showSplash === null) {
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div
          className={`${exo.variable} ${inter.variable} ${lexendDeca.variable} ${montserrat.variable} ${poppins.variable} ${raleway.variable} ${roboto.variable} font-sans`}
        >
          <Head>
            {/* Global canonical — strips query params so Google picks the right URL */}
            <link
              rel="canonical"
              href={`https://www.reecomm.com${router.asPath.split("?")[0]}`}
            />
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

          {/* GOOGLE ANALYTICS */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />

          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];

          function gtag(){dataLayer.push(arguments);}

          gtag('js', new Date());

          gtag('config', '${gtag.GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
          </Script>

          {/* GLOBAL LOADER */}
          {loading && <GlobalLoader />}

          {/* PAGE RENDER */}
          {hasFullWidth ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}

          {/* LOGIN POPUP */}
          <LoginPopup
            isOpen={isLoginPopupOpen && !showSplash}
            onClose={closeLoginPopup}
            onSignup={openSignupPopup}
            onSuccess={async () => {
              try {
                const res = await checkIsMetaExist();
                const exists = res?.data?.exists === true || res?.data === true;
                if (!exists) {
                  openCompleteProfilePopup();
                }
              } catch (err) {
                console.error("Error checking meta (assuming profile incomplete):", err);
              }
            }}
          />

          {/* SIGNUP POPUP */}
          <SignupPopup
            isOpen={isSignupPopupOpen && !showSplash}
            onClose={closeSignupPopup}
            onLogin={openLoginPopup}
            onSuccess={() => {
              openCompleteProfilePopup();
            }}
          />

          {/* COMPLETE PROFILE POPUP */}
          <CompleteProfilePopup
            isOpen={isCompleteProfilePopupOpen && !showSplash}
            onClose={closeCompleteProfilePopup}
            onSuccess={closeCompleteProfilePopup}
          />

          {/* SPLASH SCREEN */}
          {showSplash && (
            <div style={{ display: "var(--splash-display, contents)" }}>
              <SplashScreen onComplete={handleSplashComplete} />
            </div>
          )}

          {/* GLOBAL COMPARE BUTTON */}
          {!showSplash &&
            !router.asPath.startsWith("/consult/dashboard/") &&
            !router.asPath.startsWith("/consult/kyc") && (
              <GlobalCompareButton />
            )}
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
