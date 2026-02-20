"use client";
import { Menu, Search, User } from "lucide-react";
import { useState, useEffect } from "react";
import Button from "../ui/button";
import HamburgerDrawer from "../features/home/HamburgerDrawer";
import AccountPopup from "../features/home/AccountPopup";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import PreferencesPopup from "../features/user/PreferencesPopup";

export default function Navbar({ heroMode = false, scrolled = false }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const userRole = "guest";
    const [accountOpen, setAccountOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const { user, isLoggedIn } = useAuthStore();

    useEffect(() => {
        const handler = () => setAccountOpen(false);
        document.addEventListener("signuppopup:open", handler);
        return () => document.removeEventListener("signuppopup:open", handler);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
        ${
                    heroMode
                        ? scrolled
                            ? "bg-white text-black shadow-xl backdrop-blur-lg h-16"
                            : "bg-transparent text-secondary h-20 md:h-24"
                        : "bg-primary text-secondary h-16"
                }`}
            >
                <div className="relative w-full px-4 md:px-8 mx-auto h-full flex items-center justify-between">

                    {/* LEFT */}
                    <Link
                        href="/"
                        className="flex items-center h-10 px-3 md:px-4 gap-2 md:gap-3 bg-secondary text-primary"
                    >
                        <Menu
                            className="w-5 h-5"
                            onClick={(e) => {
                                e.preventDefault();
                                setMenuOpen(true);
                            }}
                        />
                        <span className="font-black italic text-sm md:text-base">AVX</span>
                    </Link>

                    {/* CENTER SEARCH (Desktop Only) */}
                    {heroMode && scrolled && (
                        <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex">
                            <div className="relative flex items-center h-12 w-[420px] xl:w-[520px] rounded-full px-6 bg-secondary/10 border border-gray-200">
                                <Search className="w-4 h-4 mr-3 text-gray-600" />
                                <input
                                    className="w-full bg-transparent focus:outline-none text-black placeholder:text-gray-400 text-sm"
                                    placeholder="Search destination"
                                />
                                <div className="ml-auto p-2 rounded-full bg-primary text-secondary">
                                    <Search size={14} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-2 md:gap-4  hidden md:flex">

                        {/* 🔥 Hide on mobile */}
                        <Button
                            onClick={() => setOpen(true)}
                            size="sm"
                            className="hidden md:inline-flex"
                        >
                            Sell Your Vehicle
                        </Button>

                        {/* ACCOUNT */}
                        <div
                            className="relative z-[110]"
                            onMouseEnter={() => setAccountOpen(true)}
                            onMouseLeave={() => setAccountOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-1 px-2 py-1 rounded transition text-xs md:text-sm
                ${
                                    heroMode && !scrolled
                                        ? "text-white hover:outline hover:outline-2 hover:outline-white/40"
                                        : "text-black hover:outline hover:outline-2 hover:outline-black/20"
                                }`}
                            >
                                <User className="w-5 h-5 md:w-6 md:h-6" />

                                {/* Hide long text on small screens */}
                                <span className="hidden sm:block text-left">
                  <span className="block text-[10px] opacity-60">
                    {!isLoggedIn ? (
                        <span className="font-bold">Sign in</span>
                    ) : (
                        <span className="font-bold">
                        Hello, {user?.firstname}
                      </span>
                    )}
                  </span>
                  <span className="font-semibold">Account</span>
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

            <HamburgerDrawer
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                role={userRole}
            />

            <PreferencesPopup isOpen={open} onClose={() => setOpen(false)} />
        </>
    );
}
