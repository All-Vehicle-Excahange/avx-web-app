import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "@/components/layout/Navbar";
import { LayoutDashboard, Loader2 } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { checkIsAccountSuspended } from "@/services/consult.service";
import SuspendedAccount from "./SuspendedAccount";
import ProtectedRoute from "./ProtectedRoute";

// Cache variables outside the component to persist across route changes (remounts)
let cachedSuspension = null;
let suspensionPromise = null;

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);
  const [suspensionData, setSuspensionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSuspension = async () => {
      try {
        // If we already have the result cached, use it and skip API call
        if (cachedSuspension) {
          if (cachedSuspension.isSuspended) {
            setIsSuspended(true);
            setSuspensionData(cachedSuspension.data);
          }
          setIsLoading(false);
          return;
        }

        // If a request is already in progress, wait for it
        if (!suspensionPromise) {
          suspensionPromise = checkIsAccountSuspended();
        }

        const res = await suspensionPromise;

        let suspended = false;
        let data = null;

        if (res?.success && res?.data) {
          suspended =
            typeof res.data === "object"
              ? res.data.isSuspended
              : res.data === true;

          if (suspended) {
            data = res.data;
          }
        }

        // Cache the result so future renders don't need to call the API
        cachedSuspension = { isSuspended: suspended, data };

        if (suspended) {
          setIsSuspended(true);
          setSuspensionData(data);
        }
      } catch (error) {
        console.error("Failed to check suspension status:", error);
        suspensionPromise = null; // Reset promise to allow retrying
      } finally {
        setIsLoading(false);
      }
    };

    checkSuspension();
  }, []);

  // Extract page name from URL path (e.g., /consult/dashboard/overview -> Overview)
  const pathParts = router.pathname.split("/");
  const currentPath = pathParts[pathParts.length - 1] || "Dashboard";
  const pageTitle =
    currentPath.charAt(0).toUpperCase() +
    currentPath.slice(1).replace(/-/g, " ");

  return (
    <ProtectedRoute>
      <>
        <Head>
          <title>
            {isSuspended ? "Account Suspended" : pageTitle} | Reecomm Dashboard
          </title>
        </Head>
        <Navbar heroMode scrolled={true} />

        <div className="h-screen pt-16 flex flex-col md:flex-row text-primary relative overflow-hidden">
          <div className="md:hidden z-20 flex items-center justify-between p-4 border-b border-third/30 bg-[#2B2A2A] relative ">
            <span className="font-bold ">Dashboard Menu</span>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
            >
              <LayoutDashboard className="w-6 h-6" />
            </button>
          </div>

          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* OVERLAY FOR MOBILE */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {isLoading ? (
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
            ) : isSuspended ? (
              <div className="min-h-[70vh] flex items-center justify-center">
                <SuspendedAccount data={suspensionData} />
              </div>
            ) : (
              children
            )}
          </main>
        </div>
      </>
    </ProtectedRoute>
  );
}
