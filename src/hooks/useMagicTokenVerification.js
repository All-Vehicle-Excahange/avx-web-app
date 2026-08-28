import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/stores/useAuthStore";
import { queryClient } from "@/lib/queryClient";
import { verifyOwnerSignupEmail } from "@/services/consult.service";
import { logoutUser } from "@/services/auth.service";

export default function useMagicTokenVerification() {
  const router = useRouter();
  const [verifyingMagicToken, setVerifyingMagicToken] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    let tokenFromUrl = router.query?.magicToken || router.query?.token;
    if (!tokenFromUrl && typeof window !== "undefined") {
      const match = window.location.search.match(/[?&](magicToken|token)=([^&]+)/);
      if (match) {
        tokenFromUrl = match[2];
      }
    }
    if (!tokenFromUrl || router.pathname === "/link-expired") return;
    const clickedLink = router.asPath;

    console.log("[MagicTokenVerification] Starting verification for token:", tokenFromUrl);
    useAuthStore.setState({ isLoginPopupOpen: false });
    setVerifyingMagicToken(true);

    const targetRedirect =
      router.pathname && !router.pathname.includes("link-expired")
        ? router.pathname
        : "/consult/dashboard";

    logoutUser()
      .catch(() => {})
      .finally(() => {
      useAuthStore.getState().logout();
      useAuthStore.setState({ isLoginPopupOpen: false });

      verifyOwnerSignupEmail(tokenFromUrl)
        .then(async (res) => {
          console.log("[MagicTokenVerification] verify API response:", res);
          if (res.success) {
            if (res.data?.accessToken || res.data?.token) {
              const tokenVal = res.data.accessToken || res.data.token;
              const userMaster =
                res.data.userMaster || res.data.user || res.data;
              useAuthStore.getState().login(userMaster, tokenVal);
            } else {
              await useAuthStore.getState().initializeAuth(true);
            }
            queryClient.invalidateQueries({ queryKey: ["seller-tier"] });
            queryClient.invalidateQueries({ queryKey: ["user"] });
            const {
              magicToken: _m,
              token: _t,
              ...restQuery
            } = router.query;
            router.replace(
              { pathname: router.pathname, query: restQuery },
              undefined,
              { shallow: true }
            );
          } else {
            console.error("[MagicTokenVerification] API returned success false. Response:", res);
            useAuthStore.setState({ isLoginPopupOpen: false });
            const errorMsg =
              res.message ||
              "The verification link is invalid or has expired.";
            router.replace(
              `/link-expired?message=${encodeURIComponent(errorMsg)}&token=${encodeURIComponent(tokenFromUrl)}&clickedLink=${encodeURIComponent(clickedLink)}&redirect=${encodeURIComponent(targetRedirect)}`
            );
          }
        })
        .catch((err) => {
          console.error("[MagicTokenVerification] API call failed with error:", err);
          console.error("[MagicTokenVerification] Error Response Data:", err?.response?.data);
          useAuthStore.setState({ isLoginPopupOpen: false });
          const errorMsg =
            err?.response?.data?.message ||
            err?.message ||
            "The verification link is invalid or has expired.";
          router.replace(
            `/link-expired?message=${encodeURIComponent(errorMsg)}&token=${encodeURIComponent(tokenFromUrl)}&clickedLink=${encodeURIComponent(clickedLink)}&redirect=${encodeURIComponent(targetRedirect)}`
          );
        })
        .finally(() => {
          setVerifyingMagicToken(false);
        });
    });
  }, [router.isReady, router.query?.magicToken, router.query?.token]);

  return { verifyingMagicToken };
}
