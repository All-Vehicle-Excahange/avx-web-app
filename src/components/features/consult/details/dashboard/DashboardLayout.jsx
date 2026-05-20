import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "@/components/layout/Navbar";
import { LayoutDashboard } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import SuspendedAccount from "./SuspendedAccount";
import ProtectedRoute from "./ProtectedRoute";

import { useQuery } from "@tanstack/react-query";

import getIsAccountSuspendedQuery from "@/queries/consualt.queries";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const router = useRouter();

  // REACT QUERY
  const { data, isPending, error } = useQuery(
    getIsAccountSuspendedQuery()
  );

  // SUSPENSION LOGIC
  const isSuspended =
    data?.success && data?.data
      ? typeof data.data === "object"
        ? data.data.isSuspended
        : data.data === true
      : false;

  const suspensionData = isSuspended ? data?.data : null;

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
              : pageTitle}{" "}
            | Reecomm Dashboard
          </title>
        </Head>

        <Navbar heroMode scrolled={true} />

        <div className="h-screen pt-16 flex flex-col md:flex-row text-primary relative overflow-hidden">
          {/* MOBILE HEADER */}
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
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {isPending ? (
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
            ) : (
              children
            )}
          </main>
        </div>
      </>
    </ProtectedRoute>
  );
}