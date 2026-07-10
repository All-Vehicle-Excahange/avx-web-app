/* eslint-disable react-hooks/set-state-in-effect */
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@/components/ui/button";
import DetailsFromPopup from "@/components/features/userSeller/DetailsFromPopup";
import { useAuthStore } from "@/stores/useAuthStore";
import LoginPopup from "@/components/auth/LoginPopup";
import SignupPopup from "@/components/auth/SignupPopup";

const TRUST_BADGES = [
  { value: "4,300+", label: "Active Listings" },
  { value: "97%", label: "Verified Buyer Inquiries" },
  { value: "40", label: "Avg. Days to Sell" },
];

const MARQUEE_ITEMS = [
  "VERIFIED MARKETPLACE",
  "ZERO COMMISSION",
  "STRUCTURED DEALS",
  "LIVE BUYERS",
  "CERTIFIED CONSULTANTS",
  "TRANSPARENT PRICING",
];

function Hero() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const [loginPopup, setLoginPopup] = useState(false);
  const [signupPopup, setSignupPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          setRole(parsed?.userRole || null);
        } else {
          setRole(null);
        }
      } catch (err) {
        console.error("Failed to read user role from localStorage:", err);
        setRole(null);
      }
    }
  }, [isLoggedIn, user]);

  const handleStartSelling = () => {
    if (!isLoggedIn) {
      setLoginPopup(true);
      return;
    }

    // Go to localStorage to check what is the role
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
      // Hide the button or do nothing (normally hidden)
      return;
    }

    if (finalRole === "USER_SELLER") {
      router.push("/user/details/inventory");
    } else if (finalRole === "USER_SELLER_APPLICANT") {
      router.push("/user/details/myprofile");
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
    } else if (finalRole === "USER_SELLER_APPLICANT") {
      router.push("/user/details/myprofile");
    } else if (finalRole === "CONSULTATION") {
      // Consultant - button will disappear, no popup
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <section className="relative w-full min-h-screen mt-16 overflow-hidden flex flex-col">
        {/* ── FULL BLEED BACKGROUND IMAGE ── */}
        <div className="absolute inset-0 z-0">
          <Image
            src="./hero-section-image.webp"
            alt="Reecomm Premium Vehicle"
            fill
            className="object-cover object-center scale-105"
            priority
          />
          {/* Multi-layer cinematic darkening */}
          {/* <div className="absolute inset-0 bg-secondary/70" /> */}
          <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/10 to-secondary/80" />
          <div className="absolute inset-0 bg-linear-to-r from-secondary/80 via-transparent to-secondary/50" />
        </div>

        {/* ── MAIN CONTENT — CENTERED ── */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
          {/* Eyebrow */}
          <div
            className={`flex items-center gap-3 mb-10 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-sm tracking-[0.4em] uppercase text-third font-semibold">
              Premium Vehicle Exchange
            </span>
          </div>

          {/* Main Headline */}

          <h2
            className="
             text-3xl sm:text-4xl lg:text-5xl
              font-semibold
              leading-[1.05]
              text-primary
              font-[Montserrat]
            "
          >
            The Market For Serious
            <br />
            <span className="text-fourth/80"> Sellers.</span>
          </h2>

          {/* Descriptor */}
          <p
            className={`font-[Poppins] text-sm text-third leading-relaxed max-w-xl mb-12 transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Reecomm is the only place where individual sellers list vehicles
            alongside verified consultants — with the same structure, the same
            visibility, and the same buyer trust. Reach real buyers. Sell with
            confidence. Move forward.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-center gap-4 mb-12 transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {!(mounted && isLoggedIn && role === "CONSULTATION") && (
              <Button variant="ghost" size="md" onClick={handleStartSelling}>
                START SELLING
              </Button>
            )}
            <Button variant="ghost" size="md">
              EXPLORE MARKET
            </Button>
          </div>

          {/* ── TRUST BADGES ── */}
          <div
            className={`flex flex-col sm:flex-row items-center gap-0 border border-primary/10 transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {TRUST_BADGES.map((badge, i) => (
              <div
                key={i}
                className={`px-10 py-5 flex flex-col items-center gap-1 ${
                  i !== TRUST_BADGES.length - 1
                    ? "border-b sm:border-b-0 sm:border-r border-primary/10"
                    : ""
                }`}
              >
                <span className="font-[Montserrat] font-black text-2xl text-primary leading-none">
                  {badge.value}
                </span>
                <span className="font-[Poppins] text-[9px] tracking-[0.2em] uppercase text-third">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

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
    </>
  );
}

export default Hero;
