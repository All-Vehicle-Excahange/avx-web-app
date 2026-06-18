"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/stores/useAuthStore";
import DetailsFromPopup from "@/components/features/userSeller/DetailsFromPopup";
import LoginPopup from "@/components/auth/LoginPopup";
import SignupPopup from "@/components/auth/SignupPopup";

const sellers = [
  {
    title: "Individual Vehicle Owners",
    description: "Own a car, bike, or commercial vehicle? List it directly — no middleman, no consultant fee.",
    details: [
      { key: "Eligibility", val: "Any individual with valid ownership documents." },
      { key: "Active listings allowed", val: "1 at a time." },
    ],
  },
  {
    title: "First-Time Sellers",
    description: "Never sold a vehicle online before? Reecomm walks you through every step of the process — from photos to final handover.",
    details: [
      { key: "Eligibility", val: "All first-time sellers are welcome." },
      { key: "Support", val: "In-platform step-by-step guidance throughout." },
    ],
  },
  {
    title: "Buyers Selling Their Own Car",
    description: "Bought a car through Reecomm and now ready to move on? List it back on the same platform your buyers trust.",
    details: [
      { key: "Eligibility", val: "Any Reecomm buyer reselling their own vehicle." },
      { key: "Advantage", val: "Existing inspection history can be referenced in your new listing." },
    ],
  },
];

function WhoCanSell() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const [loginPopup, setLoginPopup] = useState(false);
  const [signupPopup, setSignupPopup] = useState(false);

  const handleStartSelling = () => {
    if (!isLoggedIn) {
      setLoginPopup(true);
      return;
    }

    let currentRole = null;
    if (typeof window !== "undefined") {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          currentRole = parsed?.userRole;
        }
      } catch (err) {
        console.error("Failed to parse user role on button click:", err);
      }
    }

    const finalRole = currentRole || user?.userRole;

    if (finalRole === "CONSULTATION") {
      return;
    }

    if (finalRole === "USER_SELLER") {
      router.push("/user/details/inventory");
    } else {
      setOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    let currentRole = null;
    if (typeof window !== "undefined") {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          currentRole = parsed?.userRole;
        }
      } catch (err) {
        console.error(err);
      }
    }

    const finalRole = currentRole || user?.userRole;

    if (finalRole === "USER_SELLER") {
      router.push("/user/details/inventory");
    } else if (finalRole === "CONSULTATION") {
      // no popup for consultant
    } else {
      setOpen(true);
    }
  };

  return (
    <section className="py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto  flex flex-col gap-16">

        {/* ── Header — centered ─────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <p className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Eligibility
            </p>
          </div>
          <h2 className="   text-3xl sm:text-4xl lg:text-5xl
              font-semibold
              leading-[1.05]
              text-primary
              font-[Montserrat]">
            Who Can Sell
            <br />
            <span className="text-fourth/80">on Reecomm?</span>
          </h2>
          <p className="text-third/70 text-lg font-[Poppins] leading-relaxed max-w-xl">
            Reecomm is built for real people selling their own vehicles — not dealers or aggregators.
          </p>
        </div>


        {/* ── 3 seller types — horizontal pills ────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {sellers.map((seller, i) => (
            <div
              key={i}
              className="group flex flex-col gap-4 p-8 hover:border-primary/40 transition-all duration-300 border border-third/10 rounded-2xl bg-primary/2"
            >
              {/* Number */}
              <span className="text-[13px] font-bold tracking-[2px] text-third font-[Montserrat]">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Check + Title */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-third/15 border border-third/30 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-third" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary font-[Montserrat] leading-snug">
                  {seller.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-third/65 text-sm leading-[1.7] font-[Poppins] mb-4">
                {seller.description}
              </p>

              {/* Details list */}
              <div className="mt-auto space-y-2 pt-4 border-t border-primary/10">
                {seller.details.map((detail, idx) => (
                  <p key={idx} className="text-xs leading-relaxed font-[Poppins] text-third/80">
                    <strong className="text-primary font-medium">{detail.key}:</strong> {detail.val}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Important note — full width dark strip ────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6 border rounded-xl border-primary/10 bg-primary/2">
          <div className="flex items-center gap-4">
            <svg className="w-5 h-5 text-third shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-third/75 text-sm font-[Poppins] leading-relaxed">
              Individual sellers can list <span className="text-primary font-semibold">1 active vehicle at a time.</span> You can sell up to <span className="text-primary font-semibold">3 vehicles total</span> on Reecomm. Once sold, your slot reopens immediately.
            </p>
          </div>
          <button
            onClick={handleStartSelling}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 border rounded-md border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition text-sm font-semibold text-primary font-[Poppins] whitespace-nowrap"
          >
            Become a Seller →
          </button>
        </div>

      </div>

      {/* Popups */}
      <DetailsFromPopup isOpen={open} onClose={() => setOpen(false)} />
      <LoginPopup
        isOpen={loginPopup}
        onClose={() => setLoginPopup(false)}
        onSignup={() => {
          setLoginPopup(false);
          setSignupPopup(true);
        }}
        onSuccess={handleLoginSuccess}
      />
      <SignupPopup
        isOpen={signupPopup}
        onClose={() => setSignupPopup(false)}
        onLogin={() => {
          setSignupPopup(false);
          setLoginPopup(true);
        }}
        onSuccess={handleLoginSuccess}
      />
    </section>
  );
}

export default WhoCanSell;