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
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { getAllTier } from "@/services/user.service";
import { getSellerTier } from "@/services/Seller.service";
import PricingHero from "./PricingHero";
import Button from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSellerTierQuery } from "@/queries/Seller.queries";
import {
  upgradeSubscription,
  createSubscription,
} from "@/services/subscription.service";

const staticTierDetails = {
  BASIC: {
    name: "Basic",
    tagline: "Start building your presence on Reecomm.",
    color: "#6b7280",
    bestFor: "Small consultants & entry-level sellers",
    cta: "Get Started",
    ctaStyle: "border border-[#d1d5db] text-[#111827] hover:bg-[#f9fafb]",
    highlight: false,
  },
  PRO: {
    name: "Pro",
    tagline: "Everything you need to grow and compete.",
    color: "#2563eb",
    bestFor: "Growing dealerships",
    cta: "Get Started",
    ctaStyle: "bg-[#2563eb] text-white hover:bg-[#1d4ed8]",
    highlight: true,
  },
  PREMIUM: {
    name: "Premium",
    tagline: "Maximum authority across the marketplace.",
    color: "#6b7280",
    bestFor: "Large inventory dealers & brands",
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

  const { user, isLoggedIn, openLoginPopup } = useAuthStore();
  const queryClient = useQueryClient();
  const pendingTier = useRef(null);
  let userRole = user?.userRole || user?.role;
  if (!userRole && typeof window !== "undefined") {
    try {
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      userRole = savedUser?.userRole || savedUser?.role;
    } catch (e) {}
  }

  const {
    data: sellerTierData,
    error: tierError,
    isLoading: isSellerTierLoading,
  } = useQuery({
    ...getSellerTierQuery(),
    enabled: !!isLoggedIn,
  });

  const isTier404 =
    tierError?.response?.status === 404 || tierError?.status === 404;

  const currentTier = isLoggedIn
    ? (
        sellerTierData?.tierTitle ||
        user?.sellerTier ||
        (typeof window !== "undefined"
          ? localStorage.getItem("sellerTier")
          : null) ||
        ""
      ).toUpperCase()
    : "";

  useEffect(() => {
    // Wait until router query params are available AND the seller tier query settled
    if (!router.isReady) return;
    if (isSellerTierLoading) return;
    if (!isLoggedIn) return;

    const tierStatus = sellerTierData?.userTierStatus;
    const hasTier = !!currentTier;
    const redirect = router.query?.redirect;

    // Case 1: Fully active CONSULTATION consultant landed here
    // (e.g. via wrapConsultAuth from AccountPopup)
    // → send them straight to the ?redirect destination or dashboard
    // if (userRole === "CONSULTATION" && hasTier && tierStatus === "ACTIVE") {
    //   router.replace(
    //     redirect ? decodeURIComponent(redirect) : "/consult/dashboard/overview",
    //   );
    //   return;
    // }

    // Case 2: CONSULTANT_APPLICANT who already has an ACTIVE subscription
    // → send them to KYC (with redirect preserved so they end up in the right place after)
    if (userRole !== "CONSULTATION" && hasTier && tierStatus === "ACTIVE") {
      router.replace(
        redirect ? `/consult/kyc?redirect=${redirect}` : "/consult/kyc",
      );
      return;
    }

    // All other cases (no tier, INACTIVE tier, non-consultant, upgrade flows)
    // → stay on the page and let the user choose / upgrade a plan
  }, [
    userRole,
    currentTier,
    sellerTierData,
    isSellerTierLoading,
    isLoggedIn,
    router,
  ]);

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
      // Store which tier the user wanted, then show login popup
      pendingTier.current = tier;
      openLoginPopup();
      return;
    }

    const currentKey = (tier.title || "").toUpperCase();
    if (currentTier === currentKey) {
      const redirect = router.query?.redirect;
      if (userRole !== "CONSULTATION") {
        router.push(
          redirect ? `/consult/kyc?redirect=${redirect}` : "/consult/kyc",
        );
      } else {
        router.push(
          redirect
            ? decodeURIComponent(redirect)
            : "/consult/dashboard/overview",
        );
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
          prefillName =
            `${storeUser.firstname || ""} ${storeUser.lastname || ""}`.trim();
        } else {
          prefillName =
            storeUser.name || storeUser.fullName || storeUser.firstName || "";
        }
      }
      let prefillEmail = storeUser?.email || "";
      let prefillContact =
        storeUser?.phoneNumber || storeUser?.phone || storeUser?.mobile || "";

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
                  prefillName =
                    `${userObj.firstname || ""} ${userObj.lastname || ""}`.trim();
                } else {
                  prefillName =
                    userObj.name || userObj.fullName || userObj.firstName || "";
                }
              }
              if (!prefillEmail) prefillEmail = userObj.email || "";
              if (!prefillContact)
                prefillContact =
                  userObj.phoneNumber || userObj.phone || userObj.mobile || "";
            }
          }
        } catch (e) {
          console.error("Error parsing user from localStorage for prefill", e);
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
          // Fetch fresh tier data and persist it so UI shows "Active" correctly
          try {
            const tierRes = await getSellerTier();
            const tierData = tierRes?.data;
            if (tierData) {
              if (typeof window !== "undefined") {
                localStorage.setItem(
                  "sellerTierData",
                  JSON.stringify(tierData),
                );
                localStorage.setItem("sellerTier", tierData.tierTitle || "");
              }
              // Update the React Query cache immediately
              queryClient.setQueryData(["seller-tier"], tierData);
            }
          } catch (e) {
            // Non-blocking — still navigate even if this fails
            console.error("Could not refresh tier after payment:", e);
          } finally {
            // Invalidate so it refetches fresh in the background
            queryClient.invalidateQueries({ queryKey: ["seller-tier"] });
          }

          if (userRole !== "CONSULTATION") {
            const redirect = router.query?.redirect;
            router.push(
              redirect ? `/consult/kyc?redirect=${redirect}` : "/consult/kyc",
            );
          } else if (router.query?.redirect) {
            router.push(router.query.redirect);
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
      alert(
        "Error initiating payment: " +
          (error?.response?.data?.message ||
            error?.message ||
            "Something went wrong"),
      );
    } finally {
      setPaymentLoading(false);
      setUpgradingTierId(null);
    }
  };

  // After login: resume the pending upgrade automatically
  useEffect(() => {
    if (isLoggedIn && pendingTier.current) {
      const tier = pendingTier.current;
      pendingTier.current = null;
      handleUpgrade(tier);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
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

                  const monthlyVal = Number(tier.monthlyPrice) || 0;
                  const yearlyVal = Number(tier.yearlyPrice) || 0;
                  const totalMonthlyCostForYear = monthlyVal * 12;
                  let savingsPercent = 0;
                  if (
                    totalMonthlyCostForYear > 0 &&
                    yearlyVal < totalMonthlyCostForYear
                  ) {
                    savingsPercent = Math.round(
                      ((totalMonthlyCostForYear - yearlyVal) /
                        totalMonthlyCostForYear) *
                        100,
                    );
                  }

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

                  const isButtonDisabled =
                    (isTierDisabled && !isCurrentTier) ||
                    (paymentLoading && upgradingTierId === tier.id);

                  let buttonText = staticDetails.cta;
                  if (paymentLoading && upgradingTierId === tier.id) {
                    buttonText = "Processing...";
                  } else if (isCurrentTier) {
                    if (userRole !== "CONSULTATION") {
                      buttonText = "Complete KYC";
                    } else {
                      buttonText = "Go to Dashboard";
                    }
                  } else if (isTierDisabled) {
                    buttonText = "Get Started";
                  }

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="group/card relative flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 border border-primary/10"
                      style={{ background: "transparent" }}
                    >
                      <div className="relative p-8 sm:p-10 flex flex-col flex-1 pt-12">
                        {/* Plan name and pills */}
                        <div className="flex items-center gap-3 mb-5">
                          <h3 className="text-[24px] font-bold text-primary tracking-tight">
                            {staticDetails.name}
                          </h3>
                          {isCurrentTier && (
                            <span className="border border-emerald-500/30 text-emerald-500 text-[10px] font-bold tracking-widest uppercase px-3 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>

                        {/* Price */}
                        <div className="mb-2">
                          <div className="flex items-baseline gap-1">
                            <span className="text-[32px] font-bold text-primary tracking-tight leading-none">
                              {formattedPrice}
                            </span>
                            <span className="text-[13px] font-medium text-primary/40">
                              / {yearly ? "year" : "month"}
                            </span>
                          </div>

                          {!yearly && savingsPercent > 0 && (
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-[15px] font-medium text-primary/40 ">
                                {formatPrice(tier.yearlyPrice)} / yr
                              </span>
                              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/25 text-emerald-500 bg-emerald-500/5">
                                Save {savingsPercent}%
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-[13px] mb-6 mt-3 text-primary/60 leading-relaxed min-h-10">
                          {tier.description || staticDetails.tagline}
                        </p>

                        <div className="h-px bg-primary/10 mb-6" />

                        {/* Features */}
                        <ul className="flex-1 flex flex-col">
                          {features.map((f, idx) => (
                            <div key={idx}>
                              <li className="flex items-start gap-3 py-3">
                                <FiCheck
                                  className={`text-[14px] mt-0.5 shrink-0 ${
                                    staticDetails.highlight
                                      ? "text-primary/40"
                                      : "text-primary/40"
                                  }`}
                                />
                                <span className="text-[13px] text-primary/70 leading-relaxed">
                                  {f}
                                </span>
                              </li>
                              {idx < features.length - 1 && (
                                <div className="h-px bg-primary/5 ml-6" />
                              )}
                            </div>
                          ))}
                        </ul>

                        {/* Note */}
                        {staticDetails.note && (
                          <p className="text-[12px] mt-6 mb-2 text-primary/40 text-left">
                            {staticDetails.note}
                          </p>
                        )}

                        {/* Button */}
                        <div className="mt-6 pt-2 flex justify-start">
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={isButtonDisabled}
                            loading={
                              paymentLoading && upgradingTierId === tier.id
                            }
                            onClick={() => handleUpgrade(tier)}
                          >
                            {buttonText}
                          </Button>
                        </div>
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
