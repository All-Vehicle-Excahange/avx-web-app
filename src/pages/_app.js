// /* eslint-disable react-hooks/set-state-in-effect */

// import { useEffect, useState } from "react";
// import Router from "next/router";

// import Layout from "@/components/layout/Layout";
// import "@/styles/globals.css";

// import { useAuthStore } from "@/stores/useAuthStore";
// import useGuestSetup from "@/hooks/useGuestSetup";
// import LoginPopup from "@/components/auth/LoginPopup";
// import GlobalLoader from "@/components/ui/GlobalLoader";
// import SplashScreen from "@/components/ui/SplashScreen";

// export default function App({ Component, pageProps }) {
//     const hasFullWidth = pageProps?.fullWidth;

//     const initializeAuth = useAuthStore((state) => state.initializeAuth);
//     const isLoginPopupOpen = useAuthStore((state) => state.isLoginPopupOpen);
//     const closeLoginPopup = useAuthStore((state) => state.closeLoginPopup);

//     const [loading, setLoading] = useState(false);
//     const [showSplash, setShowSplash] = useState(true); // start true

//     // TEMP: Commented out session check so splash shows every time during dev
//     // Uncomment these lines for production (splash only once per session)
//     useEffect(() => {
//         const splashShown = sessionStorage.getItem("splashShown");
//         if (splashShown) {
//             setShowSplash(false);
//         }
//     }, []);

//     const handleSplashComplete = () => {
//         sessionStorage.setItem("splashShown", "true");
//         setShowSplash(false);
//     };

//     //  APIs WILL RUN (important)
//     useEffect(() => {
//         initializeAuth();
//     }, [initializeAuth]);

//     useGuestSetup();

//     // Loader
//     useEffect(() => {
//         const handleStart = () => setLoading(true);
//         const handleStop = () => setLoading(false);

//         Router.events.on("routeChangeStart", handleStart);
//         Router.events.on("routeChangeComplete", handleStop);
//         Router.events.on("routeChangeError", handleStop);

//         return () => {
//             Router.events.off("routeChangeStart", handleStart);
//             Router.events.off("routeChangeComplete", handleStop);
//             Router.events.off("routeChangeError", handleStop);
//         };
//     }, []);

//     return (
//         <>
//             {/*  APP ALWAYS RENDERS — splash covers via z-index */}
//             <GlobalLoader isLoading={loading} />

//             {hasFullWidth ? (
//                 <Component {...pageProps} />
//             ) : (
//                 <Layout>
//                     <Component {...pageProps} />
//                 </Layout>
//             )}

//             <LoginPopup
//                 isOpen={isLoginPopupOpen && !showSplash}
//                 onClose={closeLoginPopup}
//             />

//             {/*  SPLASH ON TOP */}
//             {showSplash && (
//                 <SplashScreen onComplete={handleSplashComplete} />
//             )}
//         </>
//     );
// }

// /* eslint-disable react-hooks/set-state-in-effect */

// import { useEffect, useState } from "react";
// import Router from "next/router";

// import Layout from "@/components/layout/Layout";
// import "@/styles/globals.css";

// import { useAuthStore } from "@/stores/useAuthStore";
// import useGuestSetup from "@/hooks/useGuestSetup";
// import LoginPopup from "@/components/auth/LoginPopup";
// import GlobalLoader from "@/components/ui/GlobalLoader";
// import SplashScreen from "@/components/ui/SplashScreen";

// export default function App({ Component, pageProps }) {
//     const hasFullWidth = pageProps?.fullWidth;

//     const initializeAuth = useAuthStore((state) => state.initializeAuth);
//     const isLoginPopupOpen = useAuthStore((state) => state.isLoginPopupOpen);
//     const closeLoginPopup = useAuthStore((state) => state.closeLoginPopup);

//     const [loading, setLoading] = useState(false);
//     const [showSplash, setShowSplash] = useState(true); // start true

//     // TEMP: Commented out session check so splash shows every time during dev
//     // Uncomment these lines for production (splash only once per session)
//     useEffect(() => {
//         const splashShown = sessionStorage.getItem("splashShown");
//         if (splashShown) {
//             setShowSplash(false);
//         }
//     }, []);

//     const handleSplashComplete = () => {
//         sessionStorage.setItem("splashShown", "true");
//         setShowSplash(false);
//     };

//     //  APIs WILL RUN (important)
//     useEffect(() => {
//         initializeAuth();
//     }, [initializeAuth]);

//     useGuestSetup();

//     // Loader
//     useEffect(() => {
//         const handleStart = () => setLoading(true);
//         const handleStop = () => setLoading(false);

//         Router.events.on("routeChangeStart", handleStart);
//         Router.events.on("routeChangeComplete", handleStop);
//         Router.events.on("routeChangeError", handleStop);

//         return () => {
//             Router.events.off("routeChangeStart", handleStart);
//             Router.events.off("routeChangeComplete", handleStop);
//             Router.events.off("routeChangeError", handleStop);
//         };
//     }, []);

//     return (
//         <>
//             {/*  APP ALWAYS RENDERS — splash covers via z-index */}
//             <GlobalLoader isLoading={loading} />

//             {hasFullWidth ? (
//                 <Component {...pageProps} />
//             ) : (
//                 <Layout>
//                     <Component {...pageProps} />
//                 </Layout>
//             )}

//             <LoginPopup
//                 isOpen={isLoginPopupOpen && !showSplash}
//                 onClose={closeLoginPopup}
//             />

//             {/*  SPLASH ON TOP */}
//             {showSplash && (
//                 <SplashScreen onComplete={handleSplashComplete} />
//             )}
//         </>
//     );
// }


/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";

import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";

import { useAuthStore } from "@/stores/useAuthStore";
import useGuestSetup from "@/hooks/useGuestSetup";
import LoginPopup from "@/components/auth/LoginPopup";
import GlobalLoader from "@/components/ui/GlobalLoader";
import SplashScreen from "@/components/ui/SplashScreen";

export default function App({ Component, pageProps }) {
    const hasFullWidth = pageProps?.fullWidth;

    const initializeAuth = useAuthStore((state) => state.initializeAuth);
    const isLoginPopupOpen = useAuthStore((state) => state.isLoginPopupOpen);
    const closeLoginPopup = useAuthStore((state) => state.closeLoginPopup);

    const [loading, setLoading] = useState(false);
    const [showSplash, setShowSplash] = useState(true);

    // HANDLE FIRST LOAD (localStorage + sessionStorage)
    useEffect(() => {
        try {
            const hasSeenSplash = localStorage.getItem("splashSeen");
            const sessionSeen = sessionStorage.getItem("splashSession");

            if (hasSeenSplash || sessionSeen) {
                setShowSplash(false);
            }
        } catch (e) {
            setShowSplash(false);
        }
    }, []);

    // CROSS-TAB SYNC (BroadcastChannel)
    useEffect(() => {
        const channel = new BroadcastChannel("splash_channel");

        channel.onmessage = (event) => {
            if (event.data === "SPLASH_DONE") {
                setShowSplash(false);
            }
        };

        return () => channel.close();
    }, []);

    // WHEN SPLASH FINISHES
    const handleSplashComplete = () => {
        try {
            localStorage.setItem("splashSeen", "true");     // permanent
            sessionStorage.setItem("splashSession", "true"); // current tab
        } catch (e) { }

        // notify other tabs instantly
        const channel = new BroadcastChannel("splash_channel");
        channel.postMessage("SPLASH_DONE");
        channel.close();

        setShowSplash(false);
    };

    //  INIT AUTH
    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    useGuestSetup();

    //  ROUTE LOADER
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

    return (
        <>
            <Head>
                {/* PREVENT FLICKER BEFORE REACT LOADS */}
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
            <GlobalLoader isLoading={loading} />

            {/* MAIN APP */}
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
            />

            {/* SPLASH SCREEN */}
            {showSplash && (
                <div style={{ display: "var(--splash-display, contents)" }}>
                    <SplashScreen onComplete={handleSplashComplete} />
                </div>
            )}
        </>
    );
}