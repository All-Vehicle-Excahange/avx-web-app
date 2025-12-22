"use client";

import React, { useState } from "react";
import { Menu, Search } from "lucide-react";
import Button from "../ui/button";
import LoginPopup from "@/components/auth/LoginPopup";
import SignupPopup from "@/components/auth/SignupPopup";
import DownloadAppPopup from "../ui/DownloadAppPopup";

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12">
        {/* LEFT — Logo Box */}
        <div className="flex items-center gap-4">
          <div className="bg-primary px-3 py-1.5 rounded shadow-md flex items-center gap-4 border border-third/40">
            <div className="font-black text-xl tracking-tighter italic text-secondary cursor-pointer">
              <Menu className="w-5 h-5" />
            </div>
            <div className="font-black text-xl tracking-tighter italic text-secondary">
              AVX
            </div>
          </div>
        </div>

        {/* CENTER — Search Bar (Desktop only) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            {/* Search Icon */}
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-third" />
            </div>

            <input
              type="text"
              placeholder="Search..."
              className="
                w-full bg-secondary/20 
                backdrop-blur-md 
                border border-third/40 
                rounded-md py-2 pl-10 pr-4
                text-primary placeholder:text-third
                focus:outline-none focus:ring-2 focus:ring-third/40 
                transition-all
              "
            />
          </div>
        </div>

        {/* RIGHT — CTA Button using YOUR BUTTON COMPONENT */}
        <Button
          onClick={() => setIsLoginOpen(true)}
          size="sm"
          variant="ghost"
          showIcon={false}
        >
          Sell Your Vehicle
        </Button>
        {/* <Button
          onClick={() => setIsDownloadOpen(true)}
          size="sm"
          variant="ghost"
          showIcon={false}
        >
          Download App
        </Button> */}
      </nav>

      {/* LOGIN POPUP */}
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSignup={() => {
          setIsSignupOpen(true);
          setIsLoginOpen(false);
        }}
      />

      <DownloadAppPopup
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />

      {/* SIGNUP POPUP */}
      <SignupPopup
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onLogin={() => {
          setIsLoginOpen(true);
          setIsSignupOpen(false);
        }}
      />
    </>
  );
}
