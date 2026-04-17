import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "@/components/layout/Navbar";
import { LayoutDashboard, Loader2 } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { checkIsAccountSuspended } from "@/services/consult.service";
import SuspendedAccount from "./SuspendedAccount";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);
  const [suspensionData, setSuspensionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSuspension = async () => {
      try {
        const res = await checkIsAccountSuspended();
        // Assuming res.data is true or an object with suspension details
        if (res.success && res.data) {
          // If the API returns true directly or an object that is truthy
          // We check if it's explicitly true or an object with isSuspended: true
          const suspended =
            typeof res.data === "object"
              ? res.data.isSuspended
              : res.data === true;

          if (suspended) {
            setIsSuspended(true);
            setSuspensionData(res.data);
          }
        }
      } catch (error) {
        console.error("Failed to check suspension status:", error);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-primary font-bold text-xl tracking-tight">
              Accessing Dashboard
            </h3>
            <p className="text-third text-sm animate-pulse">
              Verifying account status...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {isSuspended ? "Account Suspended" : pageTitle} | Reecomm Dashboard
        </title>
      </Head>
      <Navbar heroMode scrolled={true} />

      {isSuspended ? (
        <div className="min-h-screen pt-16 flex items-center justify-center">
          <SuspendedAccount data={suspensionData} />
        </div>
      ) : (
        <div className="min-h-screen pt-16 flex flex-col md:flex-row text-primary relative">
          {/* MOBILE HEADER FOR SIDEBAR TOGGLE */}
          <div className="md:hidden z-999 flex items-center justify-between p-4 border-b border-third/30 bg-[#2B2A2A] sticky top-16 z-30">
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

          <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
        </div>
      )}
    </>
  );
}
