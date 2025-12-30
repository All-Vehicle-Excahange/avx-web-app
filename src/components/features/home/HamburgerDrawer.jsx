"use client";

import { useEffect } from "react";

export default function HamburgerDrawer({ open, onClose, role }) {
  // close on Esc key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      aria-hidden={!open}
      className={`
        fixed inset-0 z-[999] bg-secondary text-primary
        transform transition-all duration-500 ease-out 3xl:max-w-[1480px] 3xl:mx-auto
        ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}
      `}
    >
      {/* HEADER */}
      <div className="h-20 flex items-center px-8 border-b border-white/10">
        <button onClick={onClose} className="text-2xl mr-6 cursor-pointer">
          ✕
        </button>
        <span className="font-black italic text-2xl">AVX</span>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-[calc(100%-80px)]">
        {/* LEFT COLUMN */}
        <div
          className={`
            overflow-y-auto px-10 py-10 space-y-10 border-r border-white/10
            transform transition-all duration-700 ease-out delay-100
            ${open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}
          `}
        >
          {/* Always visible */}
          <MenuGroup title="DISCOVER">
            <MenuItem>Browse Vehicles</MenuItem>
            <MenuItem>Trending Vehicles</MenuItem>
            <MenuItem>Top Picks For You</MenuItem>
          </MenuGroup>

          {/* Buyer tools */}
          <MenuGroup title="BUYER TOOLS">
            <MenuItem>Compare Vehicles</MenuItem>

            {role !== "guest" && <MenuItem>Wishlist</MenuItem>}
            {role !== "guest" && <MenuItem>Price Drop Alerts</MenuItem>}

            {role === "guest" && (
              <MenuItem disabled>Wishlist (Login Required)</MenuItem>
            )}
          </MenuGroup>

          {/* Sell */}
          <MenuGroup title="SELL">
            <MenuItem>Sell Your Vehicle</MenuItem>
            <MenuItem>Get Vehicle Inspected</MenuItem>

            {role === "guest" && <MenuItem>Become a Consultant</MenuItem>}
          </MenuGroup>

          {/* Consultant only */}
          {role === "consultant" && (
            <MenuGroup title="CONSULTANT">
              <MenuItem>Dashboard</MenuItem>
              <MenuItem>My Inventory</MenuItem>
              <MenuItem>PPC & Boost</MenuItem>
              <MenuItem>Wallet & Billing</MenuItem>
            </MenuGroup>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="hidden md:flex flex-col justify-center items-center text-center text-third">
          <p className="text-xl mb-2">Trusted by 10,000+ Dealers</p>
          <p className="text-sm max-w-md">
            AVX is India’s fastest growing verified automotive marketplace.
          </p>
        </div>
      </div>
    </div>
  );
}

/* HELPERS */

const MenuGroup = ({ title, children }) => (
  <div>
    <p className="text-xs tracking-widest text-third mb-4">{title}</p>
    <div className="space-y-4">{children}</div>
  </div>
);

const MenuItem = ({ children, disabled }) => (
  <button
    disabled={disabled}
    className={`block text-left w-full transition ${
      disabled ? "text-third cursor-not-allowed" : "hover:text-third"
    }`}
  >
    {children}
  </button>
);
