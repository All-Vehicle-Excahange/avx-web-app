"use client";

import React, { useState } from "react";
import { Menu, Search } from "lucide-react";
import Button from "../ui/button";
import LoginPopup from "@/components/auth/LoginPopup";

export default function NavbarDark() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-secondary ">
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

   

        {/* RIGHT — CTA Button using YOUR BUTTON COMPONENT */}
        <Button
          onClick={() => setIsLoginOpen(true)}
          size="sm"
          variant="ghost"
          showIcon={false}
        >
          Sell Your Vehicle
        </Button>
      </nav>

      {/* LOGIN POPUP */}
      <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
