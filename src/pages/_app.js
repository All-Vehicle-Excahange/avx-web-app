import { useEffect, useState } from "react";
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
