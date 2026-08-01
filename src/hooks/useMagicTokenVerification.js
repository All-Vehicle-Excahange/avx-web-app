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
    const tokenFromUrl = router.query?.magicToken || router.query?.token;
    if (!tokenFromUrl || router.pathname === "/link-expired") return;

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
            useAuthStore.setState({ isLoginPopupOpen: false });
            const errorMsg =
              res.message ||
              "The verification link is invalid or has expired.";
            router.replace(
              `/link-expired?message=${encodeURIComponent(errorMsg)}&redirect=${encodeURIComponent(targetRedirect)}`
            );
          }
        })
        .catch((err) => {
          useAuthStore.setState({ isLoginPopupOpen: false });
          const errorMsg =
            err?.response?.data?.message ||
            err?.message ||
            "The verification link is invalid or has expired.";
          router.replace(
            `/link-expired?message=${encodeURIComponent(errorMsg)}&redirect=${encodeURIComponent(targetRedirect)}`
          );
        })
        .finally(() => {
          setVerifyingMagicToken(false);
        });
    });
  }, [router.isReady, router.query?.magicToken, router.query?.token]);

  return { verifyingMagicToken };
}
