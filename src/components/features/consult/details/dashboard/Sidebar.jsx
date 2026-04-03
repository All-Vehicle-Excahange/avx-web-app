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
        w-64 bg-secondary md:bg-transparent
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        border-r border-third/30 p-3 space-y-2.5 overflow-y-auto custom-scrollbar
      `}
    >
      <h1 className="text-xl font-bold mt-4 mb-4">Reecomm Dashboard</h1>

      {menu.map((m, i) => {
        const isActive =
          router.pathname === m.href ||
          (router.pathname === "/consult/dashboard" &&
            m.href === "/consult/dashboard/overview");

        return (
          <Link
            key={i}
            href={m.href}
            onClick={onClose}
            className={`flex items-center gap-3 p-3 rounded-lg transition
        ${isActive
                ? "bg-primary text-secondary shadow-lg"
                : "hover:bg-primary/10 text-primary"
              }`}
          >
            <m.icon size={18} />
            {m.label}
          </Link>
        );
      })}
    </aside>
  );
}
