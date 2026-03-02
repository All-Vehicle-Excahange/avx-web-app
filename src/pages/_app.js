import { useEffect, useLayoutEffect, useState } from "react";
import Router from "next/router";

import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";

import { useAuthStore } from "@/stores/useAuthStore";
import useGuestSetup from "@/hooks/useGuestSetup";
import LoginPopup from "@/components/auth/LoginPopup";
import GlobalLoader from "@/components/ui/GlobalLoader";

export default function App({ Component, pageProps }) {
    const hasFullWidth = pageProps?.fullWidth;

    const initializeAuth = useAuthStore((state) => state.initializeAuth);
    const isLoginPopupOpen = useAuthStore((state) => state.isLoginPopupOpen);
    const closeLoginPopup = useAuthStore((state) => state.closeLoginPopup);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    useGuestSetup();


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

    // ---- scroll position restoration on refresh/back ----
    useLayoutEffect(() => {
        if (typeof window === "undefined") return;

        // store scroll position before unload
        const save = () => {
            sessionStorage.setItem("scrollPos", String(window.scrollY));
        };

        const restore = () => {
            const pos = sessionStorage.getItem("scrollPos");
            if (pos !== null) {
                window.scrollTo(0, Number(pos) || 0);
                sessionStorage.removeItem("scrollPos");
            }
        };

        window.addEventListener("beforeunload", save);
        Router.events.on("routeChangeStart", save);
        Router.events.on("routeChangeComplete", restore);

        restore();

        return () => {
            window.removeEventListener("beforeunload", save);
            Router.events.off("routeChangeStart", save);
            Router.events.off("routeChangeComplete", restore);
        };
    }, []);

    return (
        <>
            <GlobalLoader isLoading={loading} />

            {hasFullWidth ? (
                <Component {...pageProps} />
            ) : (
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            )}

            <LoginPopup isOpen={isLoginPopupOpen} onClose={closeLoginPopup} />
        </>
    );
}
