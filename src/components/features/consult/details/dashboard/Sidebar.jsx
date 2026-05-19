import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
  Ticket,
} from "lucide-react";

import { getSellerTierTitle } from "@/lib/helper";
import { getSellerTier } from "@/services/Seller.service";

const menu = [
  { label: "Overview", icon: LayoutGrid, href: "/consult/dashboard/overview" },
  { label: "Storefront", icon: Store, href: "/consult/dashboard/storefront" },
  { label: "Inventory", icon: Box, href: "/consult/dashboard/inventory" },
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
  {
    label: "Help Center",
    icon: Ticket,
    href: "/consult/dashboard/help-center",
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const router = useRouter();

  useEffect(() => {
    const initializeTier = async () => {
      const tier = getSellerTierTitle();
      if (!tier) {
        try {
          await getSellerTier();
        } catch (error) {
          console.error("Error fetching seller tier on sidebar load:", error);
        }
      }
    };
    initializeTier();
  }, []);
  return (
    <aside
      className={`
        fixed md:sticky top-16 h-[calc(100vh-64px)] z-40
        w-64 md:w-16 md:hover:w-64 bg-secondary md:bg-transparent
        transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        border-r border-third/30 p-3 md:p-2 space-y-2.5 overflow-y-auto overflow-x-hidden custom-scrollbar
        group
      `}
    >
      {/* <h1 className="text-xl font-bold mt-4 mb-4">Reecomm Dashboard</h1> */}

      {menu.map((m, i) => {
        const isActive =
          router.pathname === m.href ||
          router.pathname.startsWith(m.href + "/") ||
          (m.href === "/consult/dashboard/ppc" && router.pathname.startsWith("/consult/dashboard/ads")) ||
          (router.pathname === "/consult/dashboard" &&
            m.href === "/consult/dashboard/overview");

        return (
          <Link
            key={i}
            href={m.href}
            onClick={onClose}
            className={`flex items-center p-3 md:p-2 rounded-lg transition-all duration-300
        ${isActive
                ? "bg-primary text-secondary shadow-lg"
                : "hover:bg-primary/10 text-primary"
              }`}
          >
            <div className="flex-shrink-0 flex items-center justify-center w-6 h-6">
              <m.icon size={18} />
            </div>
            <span className="ml-3 md:ml-0 md:group-hover:ml-3 md:opacity-0 md:group-hover:opacity-100 max-w-full md:max-w-0 md:group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden">
              {m.label}
            </span>
          </Link>
        );
      })}
    </aside>
  );
}
