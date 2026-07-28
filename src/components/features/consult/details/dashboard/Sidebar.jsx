import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  LayoutGrid,
  Store,
  Box,
  MessageSquare,
  BarChart3,
  Zap,
  User,
  CreditCard,
  InspectIcon,
  Star,
  HelpCircle,
  Car,
  Bell,
} from "lucide-react";

import { getSellerTierTitle } from "@/lib/helper";
import { getSellerTier } from "@/services/Seller.service";
import NotificationsComponent from "./NotificationsComponent";
import { useNotifications } from "@/hooks/useNotifications";

const menu = [
  { label: "Overview", icon: LayoutGrid, href: "/consult/dashboard/overview" },
  { label: "Storefront", icon: Store, href: "/consult/dashboard/storefront" },
  { label: "Inventory", icon: Car, href: "/consult/dashboard/inventory" },
  {
    label: "Inspection",
    icon: InspectIcon,
    href: "/consult/dashboard/inspection",
  },
  {
    label: "Inquiries",
    icon: MessageSquare,
    href: "/consult/dashboard/inquiries",
  },
  {
    label: "Reviews",
    icon: Star,
    href: "/consult/dashboard/review",
  },
  { label: "Analytics", icon: BarChart3, href: "/consult/dashboard/analytics" },
  { label: "PPC & Boost", icon: Zap, href: "/consult/dashboard/ppc" },
  { label: "Profile", icon: User, href: "/consult/dashboard/profile" },
  {
    label: "Wallet & Billing",
    icon: CreditCard,
    href: "/consult/dashboard/billing",
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const router = useRouter();
  const [isComeFromPhone, setIsComeFromPhone] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { unreadCount, markAsRead, markAllAsRead, isConnected } =
    useNotifications();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsComeFromPhone(sessionStorage.getItem("isComeFromPhone") === "true");
  }, []);

  const isStorefrontPage = router.pathname?.startsWith(
    "/consult/dashboard/storefront",
  );

  useEffect(() => {
    const initializeTier = async () => {
      try {
        const res = await getSellerTier();
        if (!res?.success || !res?.data) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("sellerTier");
            localStorage.removeItem("sellerTierData");
          }
        }
      } catch (error) {
        console.error("Error fetching seller tier on sidebar load:", error);
        if (typeof window !== "undefined") {
          localStorage.removeItem("sellerTier");
          localStorage.removeItem("sellerTierData");
        }
      }
    };
    initializeTier();
  }, []);

  if (isComeFromPhone && isStorefrontPage) return null;

  return (
    <>
      <aside
        className={`
        fixed md:sticky h-[calc(100vh-64px)] z-50
        w-64 md:w-16 bg-secondary md:bg-transparent
        ${!isNotificationsOpen ? "md:hover:w-64 group" : ""}
        transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        border-r border-third/30 p-3 md:p-2 flex flex-col justify-between overflow-hidden
      `}
      >
        {/* <h1 className="text-xl font-bold mt-4 mb-4">Reecomm Dashboard</h1> */}

        <div className="flex-1 space-y-2.5 overflow-y-auto overflow-x-hidden custom-scrollbar pr-1 py-1.5">
          {menu.map((m, i) => {
            const isActive =
              !isNotificationsOpen &&
              (router.pathname === m.href ||
                router.pathname.startsWith(m.href + "/") ||
                (m.href === "/consult/dashboard/ppc" &&
                  router.pathname.startsWith("/consult/dashboard/ads")) ||
                (router.pathname === "/consult/dashboard" &&
                  m.href === "/consult/dashboard/overview"));

            return (
              <Link
                key={i}
                href={m.href}
                onClick={() => {
                  setIsNotificationsOpen(false);
                  onClose && onClose();
                }}
                className={`flex items-center p-3 md:p-2 rounded-lg transition-all duration-300
          ${isActive
                    ? "bg-primary text-secondary shadow-lg"
                    : "hover:bg-primary/10 text-primary"
                  }`}
              >
                <div className="shrink-0 flex items-center justify-center w-6 h-6">
                  <m.icon size={18} />
                </div>
                <span className="ml-3 md:ml-0 md:group-hover:ml-3 md:opacity-0 md:group-hover:opacity-100 max-w-full md:max-w-0 md:group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden">
                  {m.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="pt-2 border-t border-third/30 space-y-1">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`flex cursor-pointer items-center w-full text-left p-3 md:p-2 rounded-lg transition-all duration-300
          ${isNotificationsOpen
                ? "bg-primary text-secondary shadow-lg"
                : "hover:bg-primary/10 text-primary"
              }`}
          >
            <div className="relative shrink-0 flex items-center justify-center w-6 h-6">
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-fourth text-[10px] font-bold text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </div>
            <span className="ml-3 md:ml-0 md:group-hover:ml-3 md:opacity-0 md:group-hover:opacity-100 max-w-full md:max-w-0 md:group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden">
              Notifications
            </span>
          </button>

          <Link
            href="/help"
            onClick={onClose}
            className="flex items-center p-3 md:p-2 rounded-lg transition-all duration-300 hover:bg-primary/10 text-primary"
            title="Help Center"
          >
            <div className="shrink-0 flex items-center justify-center w-6 h-6">
              <HelpCircle size={18} />
            </div>
            <span className="ml-3 md:ml-0 md:group-hover:ml-3 md:opacity-0 md:group-hover:opacity-100 max-w-full md:max-w-0 md:group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden">
              Help
            </span>
          </Link>
        </div>
      </aside>
      <NotificationsComponent
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        unreadCount={unreadCount}
        markAsRead={markAsRead}
        markAllAsRead={markAllAsRead}
        isConnected={isConnected}
      />
    </>
  );
}
