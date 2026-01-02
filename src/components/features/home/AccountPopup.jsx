"use client";
import LoginPopup from "@/components/auth/LoginPopup";
import SignupPopup from "@/components/auth/SignupPopup";
import Button from "@/components/ui/button";
import { useState } from "react";

export default function AccountPopup({ open }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <>
      <div
        className={`absolute right-0 mt-2 w-[380px]
        bg-secondary text-primary
        rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.45)]
        border border-white/10
        transition-all duration-150 ease-out z-50
        ${
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-1"
        }
        `}
      >
        {/* Amazon Arrow */}
        <div className="absolute -top-2 right-10 w-4 h-4 rotate-45 bg-secondary border-l border-t border-white/10" />

        {/* Sign in bar */}
        <div className="p-4 border-b border-white/10 text-center">
          <Button
            variant="ghost"
            full
            size="sm"
            onClick={() => setIsLoginOpen(true)}
          >
            Sign in
          </Button>
          <p className="mt-2 text-xs text-primary/60">
            New customer?{" "}
            <span className="text-third hover:underline cursor-pointer">
              Start here.
            </span>
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-2 gap-6 px-5 py-4 text-[13px] leading-7">
          <div>
            <p className="font-bold mb-2 text-primary">Your Lists</p>
            <ul className="space-y-1 text-primary/70">
              <li className="hover:text-third cursor-pointer">
                Create a Wish List
              </li>
              <li className="hover:text-third cursor-pointer">
                Wish from Any Website
              </li>
              <li className="hover:text-third cursor-pointer">Baby Wishlist</li>
              <li className="hover:text-third cursor-pointer">
                Discover Your Style
              </li>
              <li className="hover:text-third cursor-pointer">
                Explore Showroom
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold mb-2 text-primary">Your Account</p>
            <ul className="space-y-1 text-primary/70">
              <li className="hover:text-third cursor-pointer">Your Account</li>
              <li className="hover:text-third cursor-pointer">Your Orders</li>
              <li className="hover:text-third cursor-pointer">
                Your Wish List
              </li>
              <li className="hover:text-third cursor-pointer">
                Recommendations
              </li>
              <li className="hover:text-third cursor-pointer">
                Prime Membership
              </li>
              <li className="hover:text-third cursor-pointer">Prime Video</li>
              <li className="hover:text-third cursor-pointer">
                Subscribe & Save
              </li>
              <li className="hover:text-third cursor-pointer">
                Seller Account
              </li>
              <li className="hover:text-third cursor-pointer">
                Manage Devices
              </li>
              <li className="hover:text-third cursor-pointer">
                Register Business Account
              </li>
            </ul>
          </div>
        </div>
      </div>
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSignup={() => {
          setIsSignupOpen(true);
          setIsLoginOpen(false);
        }}
      />
      {/* SIGNUP POPUP */}{" "}
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
