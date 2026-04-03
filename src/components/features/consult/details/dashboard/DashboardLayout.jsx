import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "@/components/layout/Navbar";
import { LayoutDashboard } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  // Extract page name from URL path (e.g., /consult/dashboard/overview -> Overview)
  const pathParts = router.pathname.split("/");
  const currentPath = pathParts[pathParts.length - 1] || "Dashboard";
  const pageTitle = currentPath.charAt(0).toUpperCase() + currentPath.slice(1).replace(/-/g, " ");

  return (
    <>
      <Head>
        <title>{pageTitle} | Reecomm Dashboard</title>
      </Head>
      <Navbar heroMode scrolled={true} />
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

        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* OVERLAY FOR MOBILE */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </>
  );
}
