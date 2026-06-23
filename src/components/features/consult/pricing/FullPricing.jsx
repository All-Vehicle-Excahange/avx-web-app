"use client";

import { motion } from "framer-motion";
import {
  FiCheck,
  FiSearch,
  FiZap,
  FiStar,
  FiTarget,
  FiVideo,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAllTier } from "@/services/user.service";
import { getSellerTier } from "@/services/Seller.service";
import PricingHero from "./PricingHero";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getSellerTierQuery } from "@/queries/Seller.queries";
import { upgradeSubscription, createSubscription } from "@/services/subscription.service";

const staticTierDetails = {
  BASIC: {
    name: "Basic",
    tagline: "Start building your presence on AVX.",
    color: "#6b7280",
    bestFor: "Small consultants & entry-level sellers",
    note: "No customization. No featured priority.",
    cta: "Get Started",
    ctaStyle: "border border-[#d1d5db] text-[#111827] hover:bg-[#f9fafb]",
    highlight: false,
  },
  PRO: {
    name: "Pro",
    tagline: "Everything you need to grow and compete.",
    color: "#2563eb",
    bestFor: "Growing dealerships",
    note: "Designed for growth-focused consultants.",
    cta: "Get Started",
    ctaStyle: "bg-[#2563eb] text-white hover:bg-[#1d4ed8]",
    highlight: true,
  },
  PREMIUM: {
    name: "Premium",
    tagline: "Maximum authority across the marketplace.",
    color: "#6b7280",
    bestFor: "Large inventory dealers & brands",
    note: "Premium visibility & authority positioning.",
    cta: "Get Started",
    ctaStyle: "border border-[#d1d5db] text-[#111827] hover:bg-[#f9fafb]",
    highlight: false,
  },
};

const addons = [
  {
    title: "Reecomm Inspection Fees",
    desc: "Professional third-party inspections to increase buyer confidence.",
    icon: <FiSearch />,
  },
  {
    title: "Sponsored Vehicle Boost",
    desc: "Promote selected listings to gain higher visibility in search.",
    icon: <FiZap />,
  },
  {
    title: "Featured Consultant Slot",
    desc: "Appear in premium consultant placements across the marketplace.",
    icon: <FiStar />,
  },
  {
    title: "Category Dominance Campaign",
    desc: "Own visibility in your segment with targeted exposure campaigns.",
    icon: <FiTarget />,
  },
  {
    title: "Video Inspection Add-on",
    desc: "Offer video walk-through inspections to increase buyer trust.",
    icon: <FiVideo />,
  },
];

export default function FullPricing() {
  const router = useRouter();
  const [yearly, setYearly] = useState(false);
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [upgradingTierId, setUpgradingTierId] = useState(null);

  const { user, isLoggedIn } = useAuthStore();
  let userRole = user?.userRole || user?.role;
  if (!userRole && typeof window !== "undefined") {
    try {
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      userRole = savedUser?.userRole || savedUser?.role;
    } catch (e) {}
  }

  const { data: sellerTierData, error: tierError } = useQuery({
    ...getSellerTierQuery(),
    enabled: !!isLoggedIn,
  });

  const isTier404 = tierError?.response?.status === 404 || tierError?.status === 404;

  const currentTier = isLoggedIn
    ? (sellerTierData?.tierTitle || user?.sellerTier || (typeof window !== "undefined" ? localStorage.getItem("sellerTier") : null) || "").toUpperCase()
    : "";

  useEffect(() => {
    console.log("FullPricing Debug Nav:", { userRole, currentTier, sellerTierData });
    if (userRole?.includes("CONSULTANT_APPLICANT") && currentTier) {
      console.log("FullPricing Debug: Executing redirect to /consult/kyc");
      router.push("/consult/kyc");
    }
  }, [userRole, currentTier, router, sellerTierData]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleUpgrade = async (tier) => {
    if (!isLoggedIn) {
      router.push("/consult/subscription");
      return;
    }

    const currentKey = (tier.title || "").toUpperCase();
    if (currentTier === currentKey) {
      if (userRole?.includes("CONSULTANT_APPLICANT")) {
        router.push("/consult/kyc");
      } else {
        router.push("/consult/dashboard");
      }
      return;
    }

    if (!tier?.id) return;

    try {
      setPaymentLoading(true);
      setUpgradingTierId(tier.id);

      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert("Razorpay SDK failed to load. Please check your connection.");
        return;
      }

      let is404 = isTier404;
      try {
        await getSellerTier();
      } catch (err) {
        if (err?.response?.status === 404 || err?.status === 404) {
          is404 = true;
        }
      }

      const payload = {
        planId: tier.id,
        billingCycle: yearly ? "YEARLY" : "MONTHLY",
      };

      const response = is404 
        ? await createSubscription(payload) 
        : await upgradeSubscription(payload);

      if (!response.success) {
        throw new Error(
          response.message || "Failed to upgrade subscription order.",
        );
      }

      const { razorpaySubscriptionId, shortUrl } = response.data;

      // If SDK subscription ID is not available but shortUrl is, open hosted checkout in a popup window
      if (!razorpaySubscriptionId && shortUrl) {
        const width = 500;
        const height = 700;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
        window.open(
          shortUrl,
          "Reecomm Subscription Payment",
          `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`,
        );
        return;
      }

      const storeUser = useAuthStore.getState().user;
      let prefillName = "";
      if (storeUser) {
        if (storeUser.firstname || storeUser.lastname) {
          prefillName = `${storeUser.firstname || ""} ${storeUser.lastname || ""}`.trim();
        } else {
          prefillName = storeUser.name || storeUser.fullName || storeUser.firstName || "";
        }
      }
      let prefillEmail = storeUser?.email || "";
      let prefillContact =
        storeUser?.phoneNumber ||
        storeUser?.phone ||
        storeUser?.mobile ||
        "";

      if (
        typeof window !== "undefined" &&
        (!prefillName || !prefillEmail || !prefillContact)
      ) {
        try {
          const savedUser = localStorage.getItem("user");
          if (savedUser) {
            const userObj = JSON.parse(savedUser);
            if (userObj) {
              if (!prefillName) {
                if (userObj.firstname || userObj.lastname) {
                  prefillName = `${userObj.firstname || ""} ${userObj.lastname || ""}`.trim();
                } else {
                  prefillName = userObj.name || userObj.fullName || userObj.firstName || "";
                }
              }
              if (!prefillEmail) prefillEmail = userObj.email || "";
              if (!prefillContact)
                prefillContact =
                  userObj.phoneNumber ||
                  userObj.phone ||
                  userObj.mobile ||
                  "";
            }
          }
        } catch (e) {
          console.error(
            "Error parsing user from localStorage for prefill",
            e,
          );
        }
      }

      // Open Razorpay subscription checkout modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: razorpaySubscriptionId,
        name: "Reecomm",
        description: `Upgrade to ${tier.title} plan`,
        prefill: {
          name: prefillName,
          email: prefillEmail,
          contact: prefillContact,
        },
        handler: async function (paymentResponse) {
          if (router.query?.redirect) {
            router.push(router.query.redirect);
          } else if (userRole?.includes("CONSULTANT_APPLICANT")) {
            router.push("/consult/kyc");
          } else {
            router.push("/consult/dashboard");
          }
        },
        theme: {
          color: "#007bff",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (failResponse) {
        alert("Payment failed: " + failResponse.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error initiating payment: " + (error?.response?.data?.message || error?.message || "Something went wrong"));
    } finally {
      setPaymentLoading(false);
      setUpgradingTierId(null);
    }
  };




  useEffect(() => {
    const fetchTiers = async () => {
      try {
        const res = await getAllTier();
        if (res?.data) {
          const order = ["BASIC", "PRO", "PREMIUM"];
          const filtered = res.data.filter(
            (tier) => tier.title?.toUpperCase() !== "TEST",
          );
          const sorted = [...filtered].sort((a, b) => {
            const aTitle = a.title?.toUpperCase();
            const bTitle = b.title?.toUpperCase();
            return order.indexOf(aTitle) - order.indexOf(bTitle);
          });
          setTiers(sorted);
        }
      } catch (err) {
        console.error("Error fetching tiers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTiers();
  }, []);

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "";
    if (typeof price === "number") {
      return `₹${price.toLocaleString("en-IN")}`;
    }
    if (typeof price === "string" && !price.startsWith("₹")) {
      return `₹${price}`;
    }
    return price;
  };

  return (
    <div>
      {/* HERO */}
      <PricingHero yearly={yearly} setYearly={setYearly} />

      {/* CARDS — div NOT section, inline style beats global CSS */}
      <div
        id="pricing-table"
        className="relative z-10 -mt-64 mb-0"
        // style={{ background: "#ffffff" }}
      >
        <div className=" relative -top-40 max-w-7xl mx-auto px-5 sm:px-6 pt-0">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
            {loading
              ? // SKELETON CARDS
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse flex flex-col rounded-2xl overflow-hidden border border-primary/10 bg-secondary/5 h-[550px]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                    }}
                  >
                    <div className="p-7 flex flex-col flex-1 space-y-6">
                      <div className="space-y-2">
                        <div className="h-6 bg-primary/10 rounded w-1/3" />
                        <div className="h-4 bg-primary/10 rounded w-2/3" />
                      </div>
                      <div className="h-10 bg-primary/10 rounded w-1/2" />
                      <div className="h-1px bg-primary/10" />
                      <div className="space-y-3 flex-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <div key={j} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-primary/10 shrink-0" />
                            <div className="h-4 bg-primary/10 rounded w-full" />
                          </div>
                        ))}
                      </div>
                      <div className="h-11 bg-primary/10 rounded-full w-full" />
                    </div>
                  </div>
                ))
              : tiers.map((tier, i) => {
                  const key = (tier.title || "").toUpperCase();
                  const staticDetails = staticTierDetails[key] || {
                    name: tier.title,
                    tagline:
                      tier.description || "Start competing in our marketplace.",
                    color: "#6b7280",
                    bestFor: "Consultants & Sellers",
                    note: "",
                    cta: "Get Started",
                    ctaStyle:
                      "border border-[#d1d5db] text-[#111827] hover:bg-[#f9fafb]",
                    highlight: false,
                  };

                  const isCurrentTier = currentTier === key;
                  let isTierDisabled = false;
                  if (currentTier === "PREMIUM") {
                    isTierDisabled = true;
                  } else if (currentTier === "PRO") {
                    isTierDisabled = key === "BASIC" || key === "PRO";
                  } else if (currentTier === "BASIC") {
                    isTierDisabled = key === "BASIC";
                  }

                  const price = yearly ? tier.yearlyPrice : tier.monthlyPrice;
                  const formattedPrice = formatPrice(price);

                  const features = (
                    (yearly ? tier.yearlyFeatures : tier.monthlyFeatures) ||
                    tier.features ||
                    []
                  ).map((f) => {
                    const titleVal =
                      typeof f === "string"
                        ? f
                        : f?.title || f?.featureName || f?.name || "";
                    const descVal =
                      typeof f === "string"
                        ? ""
                        : f?.description || f?.featureDescription || "";
                    return descVal ? `${titleVal} (${descVal})` : titleVal;
                  });

                  const isButtonDisabled = (isTierDisabled && !isCurrentTier) || (paymentLoading && upgradingTierId === tier.id);

                  let buttonText = staticDetails.cta;
                  if (paymentLoading && upgradingTierId === tier.id) {
                    buttonText = "Processing...";
                  } else if (isCurrentTier) {
                    if (userRole?.includes("CONSULTANT_APPLICANT")) {
                      buttonText = "Complete KYC";
                    } else {
                      buttonText = "Go to Dashboard";
                    }
                  } else if (isTierDisabled) {
                    buttonText = "Unavailable";
                  }

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className={`relative flex flex-col rounded-2xl overflow-hidden ${
                        staticDetails.highlight ? "lg:-translate-y-4" : ""
                      }`}
                      style={{
                        background: staticDetails.highlight
                          ? "linear-gradient(180deg, #0069e0 0%, #0055b8 100%)"
                          : "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
                        border: staticDetails.highlight
                          ? "1px solid rgba(255,255,255,0.30)"
                          : "1px solid rgba(0,0,0,0.08)",
                        boxShadow: staticDetails.highlight
                          ? "0 20px 60px rgba(0,60,180,0.35)"
                          : "0 8px 30px rgba(0,0,0,0.08)",
                      }}
                    >
                      {/* soft glow ring for highlight */}
                      {staticDetails.highlight && (
                        <div className="absolute -inset-0.5 rounded-2xl bg-white/10 blur-xl opacity-40 pointer-events-none" />
                      )}

                      {staticDetails.highlight && (
                        <div className="text-white text-[10px] font-bold tracking-[0.2em] uppercase text-center py-2.5 bg-white/15 backdrop-blur-sm">
                          Recommended
                        </div>
                      )}

                      {isCurrentTier && (
                        <div className="absolute top-10 right-4 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
                          Active
                        </div>
                      )}

                      <div className="relative p-7 flex flex-col flex-1">
                        <h3
                          className={`text-[20px] font-bold mb-1 ${
                            staticDetails.highlight
                              ? "text-white"
                              : "text-[#111827]"
                          }`}
                        >
                          {staticDetails.name}
                        </h3>

                        <p
                          className={`text-[13px] mb-5 ${
                            staticDetails.highlight
                              ? "text-white/60"
                              : "text-[#6b7280]"
                          }`}
                        >
                          {tier.description || staticDetails.tagline}
                        </p>

                        <div className="mb-1">
                          <span
                            className={`text-[26px] font-black ${
                              staticDetails.highlight
                                ? "text-white"
                                : "text-[#111827]"
                            }`}
                          >
                            {formattedPrice}
                          </span>
                          <span
                            className={`text-[12px] ml-1 ${
                              staticDetails.highlight
                                ? "text-white/50"
                                : "text-[#9ca3af]"
                            }`}
                          >
                            / {yearly ? "year" : "month"}
                          </span>
                        </div>

                        <p
                          className={`text-[11px] mb-5 ${
                            staticDetails.highlight
                              ? "text-white/50"
                              : "text-[#9ca3af]"
                          }`}
                        >
                          Best for: {staticDetails.bestFor}
                        </p>

                        <div
                          className={`h-px mb-5 ${
                            staticDetails.highlight
                              ? "bg-white/10"
                              : "bg-[#eef2f7]"
                          }`}
                        />

                        {/* FEATURES */}
                        <ul className="space-y-3 flex-1">
                          {features.map((f, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                                style={{
                                  background: staticDetails.highlight
                                    ? "rgba(255,255,255,0.20)"
                                    : "rgba(0,0,0,0.05)",
                                }}
                              >
                                <FiCheck
                                  className="text-[10px]"
                                  style={{
                                    color: staticDetails.highlight
                                      ? "#fff"
                                      : "#6b7280",
                                  }}
                                />
                              </div>
                              <span
                                className={`text-[13px] ${
                                  staticDetails.highlight
                                    ? "text-white/80"
                                    : "text-[#374151]"
                                }`}
                              >
                                {f}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <p
                          className={`text-[11px] mt-5 italic ${
                            staticDetails.highlight
                              ? "text-white/40"
                              : "text-[#9ca3af]"
                          }`}
                        >
                          {staticDetails.note}
                        </p>

                        {/* BUTTON */}
                        <button
                          disabled={isButtonDisabled}
                          onClick={() => handleUpgrade(tier)}
                          className={`w-full py-3 rounded-full text-[14px] font-semibold transition-all duration-300 mt-8 ${
                            isButtonDisabled
                              ? "opacity-50 cursor-not-allowed pointer-events-none"
                              : "hover:cursor-pointer hover:opacity-90"
                          }`}
                          style={{
                            background: isButtonDisabled
                              ? "#4b5563"
                              : staticDetails.highlight
                              ? "#fff"
                              : "linear-gradient(90deg, #313131 0%, #1a1919 45%, #000000 100%)",
                            color: isButtonDisabled
                              ? "#9ca3af"
                              : staticDetails.highlight
                              ? "#1f1f1f"
                              : "#fff",
                            boxShadow: isButtonDisabled
                              ? "none"
                              : staticDetails.highlight
                              ? "0 6px 20px rgba(255,255,255,0.2)"
                              : "0 6px 20px rgba(0,0,0,0.25)",
                          }}
                        >
                          {buttonText}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
          </div>
        </div>
      </div>

      {/* ADD-ONS — div NOT section, inline style white */}
      <div>
        <div className=" pb-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="text-center mb-12">
              <p className="inline-block px-3 py-1 rounded-full text-[10px] tracking-[0.25em] uppercase text-fourth border border-fourth/20 bg-fourth/5 mt-8 mb-4">
                Optional Add-ons
              </p>
              <h3 className="text-[26px] sm:text-[32px] font-semibold">
                Extend Your Growth{" "}
                <span className="text-fourth">Capabilities</span>
              </h3>
              <p className="text-[14px] mt-3 max-w-xl mx-auto text-third">
                Add specialized visibility and performance tools without
                changing your core plan.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {addons.map((addon, i) => (
                <div
                  key={i}
                  className="group relative flex flex-col sm:flex-row sm:items-center gap-6 p-6 sm:p-7 rounded-2xl bg-transparent border border-primary/15 hover:border-primary/20 transition-all duration-300 hover:bg-primary/5"
                >
                  {/* ICON */}
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-fourth/10 border border-fourth/20 flex items-center justify-center text-2xl text-fourth group-hover:scale-110 group-hover:bg-fourth/20 transition-all duration-300">
                      {addon.icon}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">
                    <h4 className="text-[17px] font-bold text-white group-hover:text-fourth transition-colors duration-300">
                      {addon.title}
                    </h4>
                    <p className="text-[14px] text-white/60 mt-1 leading-relaxed max-w-2xl">
                      {addon.desc}
                    </p>
                  </div>

                  {/* BADGE */}
                  <div className="shrink-0 mt-3 sm:mt-0">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-fourth border border-fourth/20 bg-fourth/10 px-4 py-1.5 rounded-full whitespace-nowrap">
                      Optional
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
