import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { AlertTriangle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuthStore } from "@/stores/useAuthStore";

export default function LinkExpiredView() {
  const router = useRouter();
  const { isLoggedIn, openLoginPopup } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      useAuthStore.setState({ isLoginPopupOpen: false });
      let target = router.query.redirect || "/consult/dashboard";
      // Safety check: if the target is a raw Next.js template (e.g. /[title]/[id]), fallback safely.
      if (target.includes("[") && target.includes("]")) {
        target = "/consult/dashboard";
      }
      router.replace(target);
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <Layout>
        <div className="min-h-[75vh] flex flex-col items-center justify-center px-5 sm:px-6 py-16 text-center select-none">
          <div className="mb-6 sm:mb-8 text-primary/90 flex items-center justify-center">
            <AlertTriangle className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 stroke-[1.25]" />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-primary text-primary mb-4 tracking-tight">
            Oops! This link has expired.
          </h1>
          <p className="text-third mb-8 max-w-md mx-auto text-sm sm:text-base">
            For your security, magic links expire after a short period of time or once they have already been used.
          </p>

          <button
            onClick={() => openLoginPopup()}
            className="text-base sm:text-lg text-primary/80 hover:text-primary font-medium underline underline-offset-4 transition-colors cursor-pointer"
          >
            Please log in to continue.
          </button>
        </div>
      </Layout>
    </>
  );
}
