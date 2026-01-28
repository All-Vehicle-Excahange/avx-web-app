"use client";
import { Menu, Search, Car, Bike, User2, User } from "lucide-react";
import { useState } from "react";
import Button from "../ui/button";
import HamburgerDrawer from "../features/home/HamburgerDrawer";
import AccountPopup from "../features/home/AccountPopup";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Navbar({ heroMode = false, scrolled = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const userRole = "guest";
  const [accountOpen, setAccountOpen] = useState(false);

  const { user, isLoggedIn } = useAuthStore();

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-10 transition-all duration-300
  3xl:max-w-[1480px] 3xl:mx-auto
  ${
    heroMode
      ? scrolled
        ? "bg-white text-black shadow-xl backdrop-blur-lg h-16"
        : "bg-transparent text-secondary h-24"
      : "bg-primary text-secondary h-16"
  }`}
      >
        <div className="relative w-full px-8 mx-auto h-full flex items-center justify-between">
          {/* LEFT */}
          <Link
            href="/"
            className="flex items-center h-10 px-4 gap-3 bg-secondary text-primary cursor-pointer"
          >
            <Menu
              className="w-5 h-5"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(true);
              }}
            />
            <span className="font-black italic">AVX</span>
          </Link>

          {/* TRUE CENTER */}
          {heroMode && (
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex">
              {scrolled && (
                <div className="relative flex items-center h-12 w-[520px] rounded-full px-6 ml-10 bg-secondary/10 border border-gray-200">
                  <Search className="w-4 h-4 mr-3 text-gray-600" />
                  <input
                    className="w-full bg-transparent focus:outline-none text-black placeholder:text-gray-400"
                    placeholder="Search destination"
                  />
                  <div className="ml-auto p-2 rounded-full bg-primary text-secondary">
                    <Search size={14} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            <Button size="sm">Sell Your Vehicle</Button>

            <div
              className="relative z-[110]"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-2 py-1 rounded transition
  ${
    heroMode && !scrolled
      ? "text-white hover:outline hover:outline-2 hover:outline-white/40"
      : "text-black hover:outline hover:outline-2 hover:outline-black/20"
  }`}
              >
                <User className="w-6 h-6" />
                <span className="text-xs leading-none text-left">
                  <span className="block text-[10px] opacity-60">
                    {!isLoggedIn ? (
                      <>
                        <p
                          className={`font-bold ${
                            heroMode && !scrolled ? "text-white" : "text-black"
                          }`}
                        >
                          sign in
                        </p>
                      </>
                    ) : (
                      <>
                        <p
                          className={`font-bold ${
                            heroMode && !scrolled ? "text-white" : "text-black"
                          }`}
                        >
                          Hello, {user?.firstname} {user?.lastname}
                        </p>
                      </>
                    )}
                  </span>
                  <span className="font-semibold">Account & Lists</span>
                </span>
              </button>

              <AccountPopup
                open={accountOpen}
                onClosePopup={() => setAccountOpen(false)}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* {accountOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-0 pointer-events-none" />
      )} */}

      <HamburgerDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        role={userRole}
      />
    </>
  );
}
