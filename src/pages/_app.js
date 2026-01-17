import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import { useAuthStore } from "@/stores/useAuthStore";


export default function App({ Component, pageProps }) {
  const hasFullWidth = pageProps?.fullWidth;
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (hasFullWidth) return <Component {...pageProps} />;

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}