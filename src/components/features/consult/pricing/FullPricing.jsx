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
import Link from "next/link";
import { getAllTier } from "@/services/user.service";
import { getSellerTier, getLatestExpiredTier } from "@/services/Seller.service";
import PricingHero from "./PricingHero";
import Button from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSellerTierQuery } from "@/queries/Seller.queries";
import {
  upgradeSubscription,
  createSubscription,
} from "@/services/subscription.service";
import DowngradeModal from "./DowngradeModal";
import BillingSummaryModal from "./BillingSummaryModal";
import PromoCodeModal from "./PromoCodeModal";
import PaymentLoadingModal from "./PaymentLoadingModal";
import { event } from "@/lib/fpixel";
import {
  trackPlanSelected,
  trackSubscriptionPaymentSuccess,
} from "@/lib/amplitude";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { Tag } from "lucide-react";
import toast from "react-hot-toast";
import { getSubscriptionState, getTierRank } from "@/lib/subscriptionHelper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const staticTierDetails = {
  FREE: {
    name: "Free",
    tagline: "Explore Reecomm with essential entry tools.",
    color: "#6b7280",
    bestFor: "Individual consultants starting out",
    cta: "Get Started",
    ctaStyle: "border border-[#d1d5db] text-[#111827] hover:bg-[#f9fafb]",
    highlight: false,
  },
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
  const [downgradeModalOpen, setDowngradeModalOpen] = useState(false);
  const [downgradeData, setDowngradeData] = useState(null);
  const [billingModalOpen, setBillingModalOpen] = useState(false);
  const [billingTier, setBillingTier] = useState(null);
  const [billingIs404, setBillingIs404] = useState(false);
  const [promoModalOpen, setPromoModalOpen] = useState(false);
  const [paymentInitializing, setPaymentInitializing] = useState(false);
  const [activationConfig, setActivationConfig] = useState(null);

  const { user, isLoggedIn, openLoginPopup } = useAuthStore();
  const queryClient = useQueryClient();
  const pendingTier = useRef(null);
  const pendingPromoModal = useRef(false);
  let userRole = user?.userRole || user?.role;
  if (!userRole && typeof window !== "undefined") {
    try {
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      userRole = savedUser?.userRole || savedUser?.role;
    } catch (e) { }
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
    tierError?.response?.status === 404 ||
    tierError?.status === 404 ||
    sellerTierData?.statusCode === 404 ||
    !sellerTierData;

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

  const subState = getSubscriptionState(sellerTierData);
  const queryMode = String(router.query?.mode || "").toLowerCase();
  const isRenewMode =
    queryMode === "renew" ||
    (queryMode !== "upgrade" && (subState === "GRACE_PERIOD" || subState === "EXPIRED" || isTier404));

  useEffect(() => {
    // Wait until router query params are available AND the seller tier query settled
    if (!router.isReady) return;
    if (isSellerTierLoading) return;
    if (!isLoggedIn) return;

    // If payment or activation loading modal is currently active, do NOT trigger
    // background auto-redirects which would compete with the modal and flash the page
    if (paymentInitializing) return;

    const tierStatus = sellerTierData?.userTierStatus;
    const hasTier = !!currentTier;
    const redirect = router.query?.redirect;

    // Case 2: CONSULTANT_APPLICANT who already has an ACTIVE subscription
    // → send them to KYC (with redirect preserved so they end up in the right place after)
    if (userRole !== "CONSULTATION" && hasTier && tierStatus === "ACTIVE" && !isRenewMode && queryMode !== "upgrade") {
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
    isRenewMode,
    queryMode,
    paymentInitializing,
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

  const executePayment = async (tier, is404) => {
    try {
      setPaymentLoading(true);
      setUpgradingTierId(tier.id);
      setPaymentInitializing(true);

      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        setPaymentInitializing(false);
        toast.error("Razorpay SDK failed to load. Please check your connection.");
        return;
      }

      const payload = {
        planId: tier.id,
        billingCycle: yearly ? "YEARLY" : "MONTHLY",
      };

      let response;
      if (is404 || isRenewMode) {
        response = await createSubscription(payload);
      } else {
        try {
          response = await upgradeSubscription(payload);
        } catch (upgradeErr) {
          if (
            upgradeErr?.response?.status === 404 ||
            upgradeErr?.status === 404 ||
            upgradeErr?.response?.data?.statusCode === 404
          ) {
            response = await createSubscription(payload);
          } else {
            throw upgradeErr;
          }
        }
      }

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to process subscription order.",
        );
      }

      const { razorpaySubscriptionId, shortUrl } = response.data;

      const planValue = yearly
        ? Number(tier.yearlyPrice) || 0
        : Number(tier.monthlyPrice) || 0;

      event("InitiateCheckout", {
        value: planValue,
        currency: "INR",
        content_name: tier.title || "Consultant Plan",
        content_ids: tier.id ? [tier.id] : [],
        content_type: "consultant_subscription",
        num_items: 1,
      });

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
        description: `Subscription for ${tier.title} plan`,
        prefill: {
          name: prefillName,
          email: prefillEmail,
          contact: prefillContact,
        },
        handler: async function (paymentResponse) {
          event("Subscribe", {
            value: planValue,
            currency: "INR",
            predicted_ltv: planValue,
            content_name: tier.title || "Consultant Plan",
            content_ids: tier.id ? [tier.id] : [],
            billing_cycle: yearly ? "YEARLY" : "MONTHLY",
          });

          trackSubscriptionPaymentSuccess({
            plan_id: tier.id,
            plan_name: tier.title,
            billing_cycle: yearly ? "YEARLY" : "MONTHLY",
            value: planValue,
            currency: "INR",
          });

          toast.success("Subscription processed successfully!");

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
              queryClient.setQueryData(["seller-tier"], tierData);
            }
          } catch (e) {
            console.error("Could not refresh tier after payment:", e);
          } finally {
            queryClient.invalidateQueries({ queryKey: ["seller-tier"] });
            queryClient.invalidateQueries({ queryKey: ["active-subscription"] });
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
        modal: {
          ondismiss: function () {
            setPaymentLoading(false);
            setUpgradingTierId(null);
            setPaymentInitializing(false);
          },
        },
        theme: {
          color: "#007bff",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (failResponse) {
        setPaymentInitializing(false);
        toast.error("Payment failed: " + failResponse.error.description);
      });
      rzp.open();

      // Keep animated loading modal visible until Razorpay checkout modal is rendered in DOM
      let checkCount = 0;
      const rzpCheckInterval = setInterval(() => {
        checkCount++;
        const rzpContainer =
          document.querySelector(".razorpay-checkout-frame") ||
          document.querySelector(".razorpay-container") ||
          document.querySelector("iframe[src*='razorpay']");

        if (rzpContainer || checkCount >= 30) {
          clearInterval(rzpCheckInterval);
          setTimeout(() => {
            setPaymentInitializing(false);
          }, 350);
        }
      }, 100);
    } catch (error) {
      setPaymentInitializing(false);
      console.error("Payment error:", error);
      toast.error(
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

  const handleUpgrade = async (tier) => {
    if (paymentLoading) return;
    if (!isLoggedIn) {
      // Store which tier the user wanted, then show login popup
      pendingTier.current = tier;
      openLoginPopup({
        entry_context: "become_consultant",
        trigger_action: "consultant_signup",
        user_role_intent: "consultant",
      });
      return;
    }

    if (!tier?.id) return;

    const targetKey = (tier.title || "").toUpperCase();
    const isFreePlan =
      targetKey.includes("FREE") ||
      (Number(tier.monthlyPrice) === 0 && Number(tier.yearlyPrice) === 0);

    if (isFreePlan) {
      if (subState === "ACTIVE" && !isRenewMode) {
        toast.error("You already have an active subscription.");
        return;
      }
      setPromoModalOpen(true);
      return;
    }

    trackPlanSelected({
      plan_id: tier.id,
      plan_name: tier.title,
      billing_cycle: yearly ? "YEARLY" : "MONTHLY",
    });

    try {
      setPaymentLoading(true);
      setUpgradingTierId(tier.id);

      let is404 = !currentTier || isTier404;
      try {
        const tierRes = await getSellerTier();
        if (
          !tierRes ||
          !tierRes.success ||
          tierRes.statusCode === 404 ||
          !tierRes.data
        ) {
          is404 = true;
        } else {
          is404 = false;
        }
      } catch (err) {
        if (err?.response?.status === 404 || err?.status === 404) {
          is404 = true;
        }
      }

      const targetKey = (tier.title || "").toUpperCase();
      const currentRank = getTierRank(currentTier);
      const targetRank = getTierRank(targetKey);

      if (isRenewMode) {
        setBillingTier(tier);
        setBillingIs404(is404);
        setBillingModalOpen(true);
      } else if (!is404 && currentRank > targetRank) {
        setDowngradeData({
          fromTier: currentTier,
          toTier: targetKey,
          targetTierObj: tier,
          is404NoActive: is404,
        });
        setDowngradeModalOpen(true);
      } else {
        setBillingTier(tier);
        setBillingIs404(is404);
        setBillingModalOpen(true);
      }

      setPaymentLoading(false);
      setUpgradingTierId(null);
    } catch (error) {
      console.error("Payment setup error:", error);
      toast.error(error?.message || "Failed to setup plan payment");
      setPaymentLoading(false);
      setUpgradingTierId(null);
    }
  };

  const handleConfirmDowngrade = async () => {
    if (!downgradeData?.targetTierObj) return;
    const { targetTierObj, is404NoActive } = downgradeData;
    setActivationConfig(null);
    setBillingTier(targetTierObj);
    setDowngradeModalOpen(false);
    setPaymentInitializing(true);
    await executePayment(targetTierObj, is404NoActive);
  };

  const handleConfirmBilling = async (tierToPay) => {
    const target = tierToPay || billingTier;
    if (!target) return;
    setActivationConfig(null);
    setBillingTier(target);
    setBillingModalOpen(false);
    setPaymentInitializing(true);
    await executePayment(target, billingIs404);
  };

  const handleRedeemSuccess = () => {
    setActivationConfig({
      title: "Activating Free Tier",
      subtitle: "Configuring your free subscription and setting up your consultation features...",
      tierName: "Free",
      isActivation: true,
    });
    setPaymentInitializing(true);
    setPromoModalOpen(false);

    const redirect = router.query?.redirect;
    const targetUrl = redirect ? `/consult/kyc?redirect=${redirect}` : "/consult/kyc";

    // Prefetch the KYC route in advance so page transition is fast and seamless
    try {
      router.prefetch(targetUrl);
    } catch (e) { }

    // Keep fully animated activation modal visible for 2 seconds for high-tech feedback,
    // then navigate directly into the KYC form.
    // CRITICAL: DO NOT set paymentInitializing to false before router.push!
    // Keeping it true ensures PaymentLoadingModal stays open continuously over the screen
    // until Next.js loads /consult/kyc and unmounts FullPricing cleanly.
    setTimeout(async () => {
      try {
        await router.push(targetUrl);
      } catch (err) {
        console.error("Navigation error to KYC:", err);
        setPaymentInitializing(false);
        setActivationConfig(null);
      }
    }, 2000);
  };

  const handleOpenPromoModal = () => {
    if (!isLoggedIn) {
      pendingPromoModal.current = true;
      openLoginPopup({
        entry_context: "redeem_code",
        trigger_action: "claim_redeem_code",
        user_role_intent: "consultant",
      });
      return;
    }
    setPromoModalOpen(true);
  };

  // After login: resume the pending action automatically
  useEffect(() => {
    if (isLoggedIn) {
      if (pendingTier.current) {
        const tier = pendingTier.current;
        pendingTier.current = null;
        handleUpgrade(tier);
      } else if (pendingPromoModal.current) {
        pendingPromoModal.current = false;
        setPromoModalOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        const res = await getAllTier();
        if (res?.data) {
          const order = ["FREE", "BASIC", "PRO", "PREMIUM"];
          const filtered = res.data.filter(
            (tier) => tier.title?.toUpperCase() !== "TEST",
          );
          const sorted = [...filtered].sort((a, b) => {
            const aTitle = a.title?.toUpperCase() || "";
            const bTitle = b.title?.toUpperCase() || "";
            const aIdx = order.findIndex((o) => aTitle.includes(o));
            const bIdx = order.findIndex((o) => bTitle.includes(o));
            return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
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

  const calculateBaseWithoutGst = (val) => {
    const num = Number(val) || 0;
    const base = num / 1.18;
    const rounded = Math.round(base);
    if (rounded > 0 && rounded % 10 === 8) {
      return rounded + 1;
    }
    return rounded;
  };

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

  const renderSkeletonCard = (key) => (
    <div
      key={key}
      className="animate-pulse flex flex-col rounded-2xl overflow-hidden border border-primary/10 bg-secondary/5 h-auto min-h-[440px] w-full"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
      }}
    >
      <div className="p-5 sm:p-7 flex flex-col flex-1 space-y-5">
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
  );

  const renderTierCard = (tier, i) => {
    const key = (tier.title || "").toUpperCase();
    const staticDetails = staticTierDetails[key] || {
      name: tier.title,
      tagline: tier.description || "Start competing in our marketplace.",
      color: "#6b7280",
      bestFor: "Consultants & Sellers",
      note: "",
      cta: "Get Started",
      ctaStyle: "border border-[#d1d5db] text-[#111827] hover:bg-[#f9fafb]",
      highlight: false,
    };

    const isCurrentTier = currentTier === key;

    const rawPrice =
      Number(yearly ? tier.yearlyPrice : tier.monthlyPrice) || 0;
    const basePriceOnCard = calculateBaseWithoutGst(rawPrice);
    const formattedPrice = formatPrice(basePriceOnCard);



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
        100
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

    const isButtonDisabled = paymentLoading;

    let buttonText = staticDetails.cta;
    const currentRank = getTierRank(currentTier);
    const targetRank = getTierRank(key);

    if (isRenewMode) {
      if (isCurrentTier) {
        buttonText = "Renew";
      } else {
        buttonText = "Get Started";
      }
    } else if (isCurrentTier) {
      if (userRole !== "CONSULTATION") {
        buttonText = "Complete KYC";
      } else {
        buttonText = "Go to Dashboard";
      }
    } else if (currentRank > targetRank) {
      buttonText = "Downgrade Plan";
    } else if (key.includes("FREE") || (Number(tier.monthlyPrice) === 0 && Number(tier.yearlyPrice) === 0)) {
      buttonText = "Claim with Code";
    }

    let loadingLabel = "Getting Started...";
    if (buttonText === "Renew") loadingLabel = "Renewing...";
    else if (buttonText === "Downgrade Plan") loadingLabel = "Downgrading...";
    else if (buttonText === "Claim with Code") loadingLabel = "Claiming...";
    else if (buttonText === "Get Started") loadingLabel = "Getting Started...";
    else loadingLabel = `${buttonText}...`;

    return (
      <div
        key={i}
        className="group/card relative flex flex-col h-full w-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 border border-primary/10"
        style={{ background: "transparent" }}
      >
        <div className="relative p-5 sm:p-6 lg:p-5 xl:p-6 flex flex-col flex-1">
          {/* Plan name and pills */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <h3 className="text-[20px] sm:text-[22px] xl:text-[24px] font-bold text-primary tracking-tight">
              {staticDetails.name}
            </h3>
            {isCurrentTier && (
              <span className={`border text-[10px] font-bold tracking-widest uppercase px-3 py-0.5 rounded-full ${isRenewMode ? "border-yellow-500/40 text-yellow-400 bg-yellow-500/10" : "border-emerald-500/30 text-emerald-500"
                }`}>
                {isRenewMode ? (subState === "GRACE_PERIOD" ? "Grace Period" : "Expired") : "Active"}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mb-2">
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] sm:text-[32px] font-bold text-primary tracking-tight leading-none">
                {formattedPrice}
              </span>
              <span className="text-[13px] font-medium text-primary/40">
                / {yearly ? "year" : "month"}
              </span>
              <span className="text-[11px] font-semibold text-primary/50 ml-1">
                (+18% GST)
              </span>
            </div>

            {!yearly && savingsPercent > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[15px] font-medium text-primary/40 ">
                  {formatPrice(calculateBaseWithoutGst(tier.yearlyPrice))} / yr
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/25 text-emerald-500 bg-emerald-500/5">
                  Save {savingsPercent}%
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-[13px] mb-4 mt-2 text-primary/60 leading-relaxed min-h-8">
            {tier.description || staticDetails.tagline}
          </p>

          <div className="h-px bg-primary/10 mb-4" />

          {/* Features */}
          <ul className="flex-1 flex flex-col">
            {features.map((f, idx) => (
              <div key={idx}>
                <li className="flex items-start gap-2.5 sm:gap-3 py-2 sm:py-2.5">
                  <FiCheck
                    className={`text-[14px] mt-0.5 shrink-0 ${staticDetails.highlight
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
            <p className="text-[12px] mt-4 mb-2 text-primary/40 text-left">
              {staticDetails.note}
            </p>
          )}

          {/* Button */}
          <div className="mt-auto pt-4 sm:pt-6 flex justify-start">
            {isCurrentTier && !isRenewMode ? (
              <Link href={userRole !== "CONSULTATION" ? "/consult/kyc" : "/consult/dashboard"}>
                <Button variant="ghost" size="sm" disabled={isButtonDisabled}>
                  {buttonText}
                </Button>
              </Link>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className={isCurrentTier && isRenewMode ? "border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 font-bold" : ""}
                disabled={isButtonDisabled}
                loading={paymentLoading && upgradingTierId === tier.id}
                loadingText={loadingLabel}
                onClick={() => handleUpgrade(tier)}
              >
                {buttonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* HERO */}
      <PricingHero
        yearly={yearly}
        setYearly={setYearly}
      />

      {/* CARDS — div NOT section, inline style beats global CSS */}
      <div
        id="pricing-table"
        className="relative z-10 mt-0 mb-0"
      // style={{ background: "#ffffff" }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-8 pt-0">
          {/* DESKTOP GRID */}
          <div
            className={`hidden lg:grid gap-4 sm:gap-5 xl:gap-6 items-stretch w-full ${tiers.length >= 4
              ? "lg:grid-cols-4"
              : tiers.length === 2
                ? "lg:grid-cols-2 max-w-4xl mx-auto"
                : "lg:grid-cols-3"
              }`}
          >
            {loading
              ? Array.from({ length: tiers.length || 3 }).map((_, i) => renderSkeletonCard(i))
              : tiers.map((tier, i) => renderTierCard(tier, i))}
          </div>

          {/* MOBILE & TABLET SWIPER */}
          <div className="block lg:hidden w-full">
            {loading ? (
              <Swiper
                modules={[FreeMode, Pagination]}
                spaceBetween={20}
                slidesPerView={"auto"}
                pagination={{ clickable: true }}
                className="w-full !pb-12"
              >
                {Array.from({ length: 3 }).map((_, i) => (
                  <SwiperSlide
                    key={i}
                    className="!w-[88%] sm:!w-[380px] md:!w-[420px] !h-auto flex"
                  >
                    {renderSkeletonCard(i)}
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Swiper
                modules={[FreeMode, Pagination]}
                spaceBetween={20}
                slidesPerView={"auto"}
                pagination={{ clickable: true }}
                className="w-full !pb-12"
              >
                {tiers.map((tier, i) => (
                  <SwiperSlide
                    key={i}
                    className="!w-[88%] sm:!w-[380px] md:!w-[420px] !h-auto flex"
                  >
                    {renderTierCard(tier, i)}
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* HAVE A PROMO CODE TRIGGER — CENTERED BELOW TIERS */}
          <div className="mt-8 sm:mt-10 flex items-center justify-center">
            <button
              type="button"
              disabled={paymentLoading}
              onClick={handleOpenPromoModal}
              className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-all group ${
                paymentLoading
                  ? "opacity-50 cursor-not-allowed text-fourth/50"
                  : "text-fourth hover:text-fourth/80 cursor-pointer"
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-fourth transition-transform group-hover:rotate-12" />
              <span className="underline underline-offset-4 decoration-fourth/40 hover:decoration-fourth">
                Have a promo code?
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ADD-ONS — div NOT section, inline style white */}
      <div>
        <div className=" pb-10 pt-4">
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

      <DowngradeModal
        isOpen={downgradeModalOpen}
        onClose={() => setDowngradeModalOpen(false)}
        onConfirm={handleConfirmDowngrade}
        fromTier={downgradeData?.fromTier}
        toTier={downgradeData?.toTier}
        fromTierObj={downgradeData?.fromTierObj}
        toTierObj={downgradeData?.targetTierObj}
        allTiers={tiers}
        yearly={yearly}
        isLoading={paymentLoading}
      />

      <BillingSummaryModal
        isOpen={billingModalOpen}
        onClose={() => setBillingModalOpen(false)}
        onConfirm={handleConfirmBilling}
        tier={billingTier}
        yearly={yearly}
        isLoading={paymentLoading}
      />

      <PromoCodeModal
        isOpen={promoModalOpen}
        onClose={() => setPromoModalOpen(false)}
        onRedeemSuccess={handleRedeemSuccess}
      />

      <PaymentLoadingModal
        isOpen={paymentInitializing}
        title={activationConfig?.title || "Connecting to Secure Gateway"}
        subtitle={
          activationConfig?.subtitle ||
          "Please wait while we initialize your Razorpay checkout. Do not refresh or close this page."
        }
        tierName={activationConfig?.tierName || billingTier?.title}
        planPrice={
          activationConfig
            ? null
            : billingTier
              ? yearly
                ? billingTier.yearlyPrice
                : billingTier.monthlyPrice
              : null
        }
        yearly={yearly}
        isActivation={activationConfig?.isActivation || false}
      />
    </div>
  );
}
