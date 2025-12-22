"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import Button from "../ui/button";
import LoginPopup from "@/components/auth/LoginPopup";
import SignupPopup from "@/components/auth/SignupPopup";
import { useRouter } from "next/router";

export default function NavbarDark() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* FULL WIDTH BACKGROUND */}
      <nav className="absolute top-0 left-0 right-0 z-50 w-full bg-secondary">
        {/* CENTERED CONTENT (AMAZON STYLE) */}
        <div className="mx-auto flex items-center justify-between px-6 py-4 md:px-8 max-w-screen-2xl">
          {/* LEFT — Logo */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-4 cursor-pointer"
          >
            <div className="bg-primary px-3 py-1.5 rounded shadow-md flex items-center gap-3 border border-third/40">
              <Menu className="w-5 h-5 text-secondary" />
              <span className="font-black text-xl italic tracking-tight text-secondary">
                AVX
              </span>
            </div>
          </div>

          {/* RIGHT — CTA */}
          <Button
            onClick={() => setIsLoginOpen(true)}
            size="sm"
            variant="ghost"
            showIcon={false}
          >
            Sell Your Vehicle
          </Button>
        </div>
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
