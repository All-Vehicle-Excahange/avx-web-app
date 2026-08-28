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
      const target = router.query.redirect || "/consult/dashboard";
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

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 tracking-tight">
            That link is expired.
          </h1>

          {/* Debug Info */}
          {(router.query.message || router.query.token || router.query.clickedLink) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-left w-full max-w-lg text-sm text-red-800 break-words">
              <h3 className="font-bold mb-2">Debug Information (Temporary):</h3>
              {router.query.clickedLink && (
                <p className="mb-2">
                  <strong>Clicked Link:</strong>{" "}
                  <a href={router.query.clickedLink} className="underline text-blue-600 hover:text-blue-800 break-all">
                    {router.query.clickedLink}
                  </a>
                </p>
              )}
              {router.query.message && <p><strong>Backend Error:</strong> {router.query.message}</p>}
              {router.query.token && <p className="mt-2"><strong>Magic Token:</strong> {router.query.token}</p>}
            </div>
          )}

          <button
            onClick={() => openLoginPopup()}
            className="text-base sm:text-lg text-primary/80 hover:text-primary font-medium underline underline-offset-4 transition-colors cursor-pointer"
          >
            Please try again.
          </button>
        </div>
      </Layout>
    </>
  );
}
