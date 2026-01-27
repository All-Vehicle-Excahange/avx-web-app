"use client";

import LoginPopup from "@/components/auth/LoginPopup";
import SignupPopup from "@/components/auth/SignupPopup";
import Button from "@/components/ui/button";
import { useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import { logoutUser } from "@/services/auth.service";

export default function AccountPopup({ open }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  // ✅ Logout Confirmation Popup State
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  // ✅ Logout Handler (Confirmed)
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.log("Logout API failed, clearing state anyway...");
    }

    logout();
    setShowLogoutConfirm(false);
  };

  return (
    <>
      {/* ✅ MAIN ACCOUNT POPUP */}
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

        {/* ✅ HEADER */}
        <div className="p-4 border-b border-white/10 text-center">
          {!isLoggedIn ? (
            <>
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
                <span
                  onClick={() => {
                    setIsSignupOpen(true);
                    setIsLoginOpen(false);
                  }}
                  className="text-third hover:underline cursor-pointer"
                >
                  Start here.
                </span>
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-primary">
              Hello, {user?.firstname} {user?.lastname}
            </p>
          )}
        </div>

        {/* ✅ CONTENT */}
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

        {/* ✅ LOGOUT BUTTON */}
        {isLoggedIn && (
          <div className="p-4 border-t border-white/10">
            <Button
              variant="ghost"
              full
              size="sm"
              onClick={() => setShowLogoutConfirm(true)} // ✅ Open Confirm Popup
              className="text-red-500 font-semibold hover:bg-red-500/10"
            >
              Logout
            </Button>
          </div>
        )}
      </div>

      {/* ✅ LOGOUT CONFIRMATION DIALOG */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-secondary/50 backdrop-blur-sm">
          <div className="w-[440px] rounded-xl bg-secondary border border-white/10 shadow-2xl p-6 text-center">
            <h2 className="text-lg font-bold text-primary mb-2">
              Confirm Logout
            </h2>

            <p className="text-sm text-primary/70 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex gap-3">
              {/* Cancel */}
              <Button
                variant="default"
                full
                size="sm"
                onClick={() => setShowLogoutConfirm(false)}
                className="border border-white/10"
              >
                Cancel
              </Button>

              {/* Confirm */}
              <Button
                variant="ghost"
                full
                size="sm"
                onClick={handleLogout}
                className="text-red-500 font-semibold hover:bg-red-500/10"
              >
                Yes, Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ LOGIN POPUP */}
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSignup={() => {
          setIsSignupOpen(true);
          setIsLoginOpen(false);
        }}
      />

      {/* ✅ SIGNUP POPUP */}
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
