import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";

import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";

import { useAuthStore } from "@/stores/useAuthStore";
import useGuestSetup from "@/hooks/useGuestSetup";
import useMagicTokenVerification from "@/hooks/useMagicTokenVerification";
import useSplash from "@/hooks/useSplash";
import LoginPopup from "@/components/auth/LoginPopup";
import SignupPopup from "@/components/auth/SignupPopup";
import CompleteProfilePopup from "@/components/auth/CompleteProfilePopup";
import GlobalLoader from "@/components/ui/GlobalLoader";
import SplashScreen from "@/components/ui/SplashScreen";
import GlobalCompareButton from "@/components/ui/GlobalCompareButton";

import * as gtag from "@/lib/gtag";
import { sendDeviceInfo } from "@/lib/device.util";

import {
  exo,
  inter,
  lexendDeca,
  montserrat,
  poppins,
  raleway,
  roboto,
} from "@/lib/fonts";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { checkIsMetaExist } from "@/services/user.service";
import { queryClient } from "@/lib/queryClient";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const hasFullWidth = Component.fullWidth;

  // Global Auth & Popup Store Actions
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isLoginPopupOpen = useAuthStore((state) => state.isLoginPopupOpen);
  const closeLoginPopup = useAuthStore((state) => state.closeLoginPopup);
  const openLoginPopup = useAuthStore((state) => state.openLoginPopup);
  const isSignupPopupOpen = useAuthStore((state) => state.isSignupPopupOpen);
  const openSignupPopup = useAuthStore((state) => state.openSignupPopup);
  const closeSignupPopup = useAuthStore((state) => state.closeSignupPopup);
  const isCompleteProfilePopupOpen = useAuthStore(
    (state) => state.isCompleteProfilePopupOpen,
  );
  const openCompleteProfilePopup = useAuthStore(
    (state) => state.openCompleteProfilePopup,
  );
  const closeCompleteProfilePopup = useAuthStore(
    (state) => state.closeCompleteProfilePopup,
  );

  // Global Loader State
  const [loading, setLoading] = useState(false);

  // Custom Hooks for Modularized Functionality
  const { showSplash, handleSplashComplete } = useSplash();
  const { verifyingMagicToken } = useMagicTokenVerification();
  useGuestSetup();

  // INITIAL SETUP: Initialize Auth & Send Device Info
  useEffect(() => {
    initializeAuth();
    sendDeviceInfo();
  }, [initializeAuth]);

  // ROUTE LOADER + GOOGLE ANALYTICS TRACKING
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = (url) => {
      setLoading(false);
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

  // CROSS-PAGE LOGIN POPUP TRIGGER
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasTokenInUrl =
        window.location.search?.includes("magicToken=") ||
        window.location.search?.includes("token=") ||
        new URLSearchParams(window.location.search).has("magicToken") ||
        new URLSearchParams(window.location.search).has("token");

      const trigger = sessionStorage.getItem("triggerLoginPopup");
      if (trigger === "true") {
        sessionStorage.removeItem("triggerLoginPopup");
        if (!hasTokenInUrl) {
          setTimeout(() => {
             openLoginPopup();
          }, 150);
        }
      }
    }
  }, [router.asPath, openLoginPopup]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div
          className={`${exo.variable} ${inter.variable} ${lexendDeca.variable} ${montserrat.variable} ${poppins.variable} ${raleway.variable} ${roboto.variable} font-secondary`}
        >
          <Head>
            {/* Global canonical — strips query params so Google picks the right URL */}
            <link
              key="canonical"
              rel="canonical"
              href={`https://www.reecomm.com${router.asPath.split("?")[0]}`}
            />

            {/* Global Open Graph Defaults */}
            <meta key="og:type" property="og:type" content="website" />
            <meta key="og:image" property="og:image" content="https://www.reecomm.com/logo/logo1.webp" />
            <meta key="og:image:width" property="og:image:width" content="1200" />
            <meta key="og:image:height" property="og:image:height" content="630" />
            <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
            <meta key="twitter:image" name="twitter:image" content="https://www.reecomm.com/logo/logo1.webp" />

            {/* Google Tag (gtag.js) */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID || "G-F3BG6WGRJK"}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gtag.GA_TRACKING_ID || "G-F3BG6WGRJK"}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
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

          {/* GLOBAL LOADER */}
          {(loading || verifyingMagicToken) && <GlobalLoader />}

          {/* PAGE RENDER */}
          {!verifyingMagicToken && (
            hasFullWidth ? (
              <Component {...pageProps} />
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )
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
                console.error(
                  "Error checking meta (assuming profile incomplete):",
                  err,
                );
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
            !router.asPath.includes("link-expired") &&
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