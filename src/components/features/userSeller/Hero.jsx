import Image from "next/image";
import { useState, useEffect } from "react";
import Button from "@/components/ui/button";
import DetailsFromPopup from "@/components/features/userSeller/DetailsFromPopup";
import { useAuthStore } from "@/stores/useAuthStore";
import LoginPopup from "@/components/auth/LoginPopup";
import SignupPopup from "@/components/auth/SignupPopup";

const TRUST_BADGES = [
  { value: "4,300+", label: "Verified Listings" },
  { value: "97%", label: "Buyer Verification Rate" },
  { value: "₹0", label: "Commission on Sale" },
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
  const [open, setOpen] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [loginPopup, setLoginPopup] = useState(false);
  const [signupPopup, setSignupPopup] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleStartSelling = () => {
    if (!isLoggedIn) {
      setLoginPopup(true);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <section className="relative w-full  mt-16 overflow-hidden flex flex-col">

        {/* ── FULL BLEED BACKGROUND IMAGE ── */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90"
            alt="AVX Premium Vehicle"
            fill
            className="object-cover object-center scale-105"
            priority
          />
          {/* Multi-layer cinematic darkening */}
          <div className="absolute inset-0 bg-secondary/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-secondary/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-transparent to-secondary/50" />
        </div>

       

        {/* ── MAIN CONTENT — CENTERED ── */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">

          {/* Eyebrow */}
          <div
            className={`flex items-center gap-3 mb-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
            <span className="text-fourth/80"> Sellers.
            </span>
          </h2>

          {/* Descriptor */}
          <p
            className={`font-[Poppins] text-sm text-third leading-relaxed max-w-md mb-12 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            AVX connects pre-owned vehicle sellers with verified buyers and
            certified consultants. Structured deals.{" "}
            <span className="text-primary font-medium">No commission. Ever.</span>
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-center gap-4 mb-12 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            <Button
              variant="ghost"
              onClick={handleStartSelling}
              className={" font-[Montserrat] font-extrabold text-[10px] tracking-[0.3em] px-10 py-4  hover:-translate-y-0.5 transition-transform duration-200 "}
            >
              START SELLING
            </Button>
            <Button
              variant="ghost"
              className="border border-primary/20 text-secondary font-[Montserrat] font-extrabold text-[10px] tracking-[0.3em] px-8 py-4 rounded-none hover:border-primary/50 hover:text-primary transition-all duration-200"
            >
              EXPLORE MARKET →
            </Button>
          </div>

          {/* ── TRUST BADGES ── */}
          <div
            className={`flex flex-col sm:flex-row items-center gap-0 border border-primary/10 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            {TRUST_BADGES.map((badge, i) => (
              <div
                key={i}
                className={`px-10 py-5 flex flex-col items-center gap-1 ${i !== TRUST_BADGES.length - 1
                    ? "border-b sm:border-b-0 sm:border-r border-primary/10"
                    : ""
                  }`}
              >
                <span className="font-[Montserrat] font-black text-2xl text-primary leading-none">
                  {badge.value}
                </span>
                <span className="font-[Poppins] text-[9px] tracking-[0.2em] uppercase text-third/40">
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
      />
      <SignupPopup
        isOpen={signupPopup}
        onClose={() => setSignupPopup(false)}
        onLogin={() => {
          setSignupPopup(false);
          setLoginPopup(true);
        }}
      />
    </>
  );
}

export default Hero;