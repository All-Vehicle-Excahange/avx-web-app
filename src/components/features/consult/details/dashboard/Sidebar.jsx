import Link from "next/link";
import { useRouter } from "next/router";
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

const menu = [
  { label: "Overview", icon: LayoutGrid, href: "/consult/dashboard/overview" },
  { label: "Storefront", icon: Store, href: "/consult/dashboard/storefront" },
  { label: "Inventory", icon: Box, href: "/consult/dashboard/inventory" },
  { label: "Inspection", icon: InspectIcon, href: "/consult/dashboard/inspection" },
  {
    label: "Inquiries",
    icon: MessageSquare,
    href: "/consult/dashboard/inquiries",
  },
  { label: "Analytics", icon: BarChart3, href: "/consult/dashboard/analytics" },
  { label: "PPC & Boost", icon: Zap, href: "/consult/dashboard/ppc" },
  { label: "Profile", icon: User, href: "/consult/dashboard/profile" },
  { label: "Billing", icon: CreditCard, href: "/consult/dashboard/billing" },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-62 min-h-fit bg-primary/6 border-r border-third/30 p-5 space-y-4">
      <h1 className="text-xl font-bold mt-4 mb-4">AVX Dashboard</h1>

      {menu.map((m, i) => {
        const isActive =
          router.pathname === m.href ||
          (router.pathname === "/consult/dashboard" &&
            m.href === "/consult/dashboard/overview");

        return (
          <Link
            key={i}
            href={m.href}
            className={`flex items-center gap-3 p-3 rounded-xl transition
        ${
          isActive
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
