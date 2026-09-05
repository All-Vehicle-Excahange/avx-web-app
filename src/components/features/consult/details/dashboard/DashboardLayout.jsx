import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "@/components/layout/Navbar";
import { LayoutDashboard } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import SuspendedAccount from "./SuspendedAccount";
import NoActivePlan from "./NoActivePlan";
import ProtectedRoute from "./ProtectedRoute";

import { useQuery } from "@tanstack/react-query";

import getIsAccountSuspendedQuery from "@/queries/consualt.queries";
import { getSellerTierQuery } from "@/queries/Seller.queries";
import { useAuthStore } from "@/stores/useAuthStore";
import { trackSellerPanelAccessed } from "@/lib/amplitude";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isComeFromPhone, setIsComeFromPhone] = useState(false);

  const router = useRouter();
  const { isLoggedIn, token, user } = useAuthStore();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsComeFromPhone(sessionStorage.getItem("isComeFromPhone") === "true");
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    trackSellerPanelAccessed({
      path: router.pathname,
      user_role: user?.userRole || user?.role,
    });
  }, [isLoggedIn, router.pathname, user?.userRole, user?.role]);

  const isStorefrontPage = router.pathname?.startsWith("/consult/dashboard/storefront");
  const hideHeaders = isComeFromPhone && isStorefrontPage;

  // REACT QUERY - SUSPENSION STATUS
  const { data, isPending, error } = useQuery({
    ...getIsAccountSuspendedQuery(),
    enabled: !!(isLoggedIn && token),
  });

  // REACT QUERY - SELLER TIER STATUS
  const { data: tierData, isPending: isTierPending } = useQuery({
    ...getSellerTierQuery(),
    enabled: !!(isLoggedIn && token),
  });

  // SUSPENSION LOGIC
  const isSuspended =
    data
      ? typeof data === "object"
        ? data.isSuspended
        : data === true
      : false;

  const suspensionData = isSuspended ? data : null;

  // CHECK IF USER HAS NO TIER
  const hasNoTier =
    !isTierPending &&
    !tierData &&
    (typeof window !== "undefined"
      ? !localStorage.getItem("sellerTier")
      : true);

  // PAGE TITLE
  const pathParts = router.pathname.split("/");

  const currentPath =
    pathParts[pathParts.length - 1] || "Dashboard";

  const pageTitle =
    currentPath.charAt(0).toUpperCase() +
    currentPath.slice(1).replace(/-/g, " ");

  return (
    <ProtectedRoute>
      <>
        <Head>
          <title>
            {isSuspended
              ? "Account Suspended"
              : hasNoTier
                ? "No Active Plan"
                : pageTitle}{" "}
            | Reecomm Dashboard
          </title>
        </Head>

        <Navbar heroMode scrolled={true} />

        <div className={`h-screen flex flex-col md:flex-row text-primary relative overflow-hidden ${hideHeaders ? '' : 'pt-16'}`}>
          {/* MOBILE HEADER */}
          {!hideHeaders && (
            <div className="md:hidden z-20 flex items-center justify-between p-4 border-b border-third/30 bg-[#2B2A2A] relative">
              <span className="font-bold">
                Dashboard Menu
              </span>

              <button
                onClick={() =>
                  setIsSidebarOpen(!isSidebarOpen)
                }
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              >
                <LayoutDashboard className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* SIDEBAR */}
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* MOBILE OVERLAY */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* MAIN CONTENT */}
          <main className="flex-1 p-3 md:p-5 overflow-y-auto">
            {isPending || isTierPending ? (
              <div className="space-y-6 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-48 bg-third/10 rounded-lg" />

                  <div className="h-10 w-32 bg-third/10 rounded-lg" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="h-32 bg-third/5 rounded-2xl border border-third/10" />

                  <div className="h-32 bg-third/5 rounded-2xl border border-third/10" />

                  <div className="h-32 bg-third/5 rounded-2xl border border-third/10" />
                </div>

                <div className="h-96 bg-third/5 rounded-2xl border border-third/10" />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-red-500">
                  Failed to load account status
                </p>
              </div>
            ) : isSuspended ? (
              <div className="min-h-[70vh] flex items-center justify-center">
                <SuspendedAccount data={suspensionData} />
              </div>
            ) : hasNoTier ? (
              <NoActivePlan />
            ) : (
              children
            )}
          </main>
        </div>
      </>
    </ProtectedRoute>
  );
}