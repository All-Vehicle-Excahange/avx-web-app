"use client";
import { Menu, Search, Car, Bike, User2 } from "lucide-react";
import { useState } from "react";
import Button from "../ui/button";
import HamburgerDrawer from "../features/home/HamburgerDrawer";

const CATEGORIES = [
  { label: "Vehicles", icon: Car },
  { label: "Consult", icon: User2 },
];

export default function Navbar({ heroMode = false, scrolled = false }) {
  const [active, setActive] = useState("Vehicles");
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = true; // later from auth
  const userRole = "guest"; // "guest" | "buyer" | "consultant"

  return (
    <>
      <nav
        className={`
         w-full transition-all duration-300  3xl:max-w-[1480px] 3xl:mx-auto
        ${
          heroMode
            ? scrolled
              ? "bg-white text-black shadow-xl backdrop-blur-lg h-16"
              : "bg-primary text-secondary h-24"
            : "bg-primary text-secondary h-16"
        }
      `}
      >
        <div className="w-full px-8 mx-auto h-full flex items-center justify-between">
          {/* LEFT */}
          <div
            className="flex items-center h-10 px-4 gap-3 bg-secondary text-primary"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
            <span className="font-black italic">AVX</span>
          </div>

          {/* CENTER */}
          {heroMode && (
            <div className="hidden md:flex flex-1 justify-center">
              {/* ONLY CATEGORIES WHEN NOT SCROLLED */}
              {!scrolled && (
                <div className="flex gap-14">
                  {CATEGORIES.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      onClick={() => setActive(label)}
                      className="relative flex flex-col items-center text-secondary hover:text-third transition"
                    >
                      <Icon size={18} />
                      <span className="mt-1 text-xs">{label}</span>

                      {/* ACTIVE UNDERLINE */}
                      {active === label && (
                        <span className="absolute -bottom-3 h-[2px] w-full bg-third rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* YOUR SEARCH (unchanged) */}
              {scrolled && (
                <div
                  className={`relative flex items-center h-12 w-[520px] rounded-full px-6 ml-10 transition-all duration-300
                  ${
                    scrolled
                      ? "bg-secondary/10 border border-gray-200"
                      : "bg-secondary/5 backdrop-blur-lg border border-white/20"
                  }
                `}
                >
                  <Search
                    className={`w-4 h-4 mr-3 ${scrolled ? "text-gray-600" : "text-third"}`}
                  />
                  <input
                    type="text"
                    placeholder="Search destination"
                    className={`w-full bg-transparent placeholder:text-sm focus:outline-none
                    ${scrolled ? "text-black placeholder:text-gray-400" : "text-white placeholder:text-third"}
                  `}
                  />
                  <div
                    className={`ml-auto p-2 rounded-full transition
                    ${scrolled ? "bg-primary text-secondary" : "bg-white/20 text-secondary"}
                  `}
                  >
                    <Search size={14} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* RIGHT CTA */}
          <Button size="sm">Sell Your Vehicle</Button>
        </div>
      </nav>

      <HamburgerDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        role={userRole}
      />
    </>
  );
}
