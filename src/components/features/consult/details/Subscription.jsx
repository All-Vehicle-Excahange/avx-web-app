"use client";

import { useState, useEffect } from "react";
import { Zap, Crown, Rocket, Check, Loader2 } from "lucide-react";
import Button from "@/components/ui/button";
import PlanCard from "./components/PlanCard";
import { useRouter } from "next/router";
import { getSellerTier } from "@/services/Seller.service";
import { SkeletonBox } from "@/components/ui/skeleton";
import { getAllTier } from "@/services/user.service";
import {
  createSubscription,
  getActiveSubscription,
} from "@/services/subscription.service";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Subscription() {
  const { push, query } = useRouter();
  const [loading, setLoading] = useState(true);
  const [tiers, setTiers] = useState([]);
  const [selectedTierId, setSelectedTierId] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState("MONTHLY");

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Start both fetches in parallel
        const [subRes, tierRes] = await Promise.allSettled([
          getSellerTier(),
          getAllTier(),
        ]);

        // Handle subscription check redirect
        if (
          subRes.status === "fulfilled" &&
          subRes.value?.data &&
          subRes.value.data.userTierStatus === "ACTIVE"
        ) {
          if (query?.redirect) {
            push(
              `/consult/kyc?redirect=${encodeURIComponent(query.redirect)}`,
            );
          } else {
            push("/consult/kyc");
          }
          return;
        }

        // Handle tier data
        if (tierRes.status === "fulfilled" && tierRes.value?.data) {
          const filteredTiers = tierRes.value.data.filter(
            (tier) => tier.title?.toUpperCase() !== "TEST"
          );
          setTiers(filteredTiers);
        }
      } catch (error) {
        console.error("Error initializing subscription data:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [push, query]);

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

  const handleClick = async (tierId) => {
    const activeTierId = tierId || selectedTierId;
    if (!activeTierId) return;

    try {
      setPaymentLoading(true);

      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert("Razorpay SDK failed to load. Please check your connection.");
        setPaymentLoading(false);
        return;
      }

      const selectedTier = tiers.find((t) => t.id === activeTierId);

      // Create subscription in the backend
      let response;
      try {
        response = await createSubscription({
          planId: activeTierId,
          billingCycle: billingCycle,
        });
      } catch (err) {
        if (err.response?.status === 409 || err.status === 409) {
          const activeRes = await getActiveSubscription();
          if (activeRes && activeRes.success && activeRes.data) {
            response = activeRes;
          } else {
            throw err;
          }
        } else {
          throw err;
        }
      }

      if (!response.success) {
        throw new Error(
          response.message || "Failed to create subscription order.",
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
          "AVX Subscription Payment",
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
        description: `Subscription for ${selectedTier.title} plan`,
        prefill: {
          name: prefillName,
          email: prefillEmail,
          contact: prefillContact,
        },
        handler: async function (paymentResponse) {
          if (query?.redirect) {
            push(
              `/consult/kyc?redirect=${encodeURIComponent(query.redirect)}`,
            );
          } else {
            push("/consult/kyc");
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
      alert("Error initiating payment: " + error.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="w-full ">
        {/* HEADER SKELETON */}
        <div className="text-center space-y-3">
          <SkeletonBox className="w-64 h-10 mx-auto rounded-lg" />
          <SkeletonBox className="w-full max-w-xl h-4 mx-auto rounded-md" />
        </div>

        {/* PLANS SKELETON */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-third/10 p-8 space-y-6"
            >
              <SkeletonBox className="w-14 h-14 rounded-full" />
              <div className="space-y-3">
                <SkeletonBox className="w-32 h-6 rounded-md" />
                <SkeletonBox className="w-24 h-4 rounded-md" />
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((j) => (
                  <SkeletonBox
                    key={j}
                    className="w-full h-3 rounded-sm opacity-50"
                  />
                ))}
              </div>
              <SkeletonBox className="w-full h-11 rounded-lg mt-4" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full text-primary mt-28 px-4 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-primary">
          Chose your plans
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base">
          Choose the professional tier that best fits your consulting business
          needs.
        </p>
      </div>

      {/* BILLING TOGGLE & COMPARISON LINK */}
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-5xl mx-auto mt-12 mb-8 gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-bold tracking-wider uppercase transition-colors duration-300 ${billingCycle === "MONTHLY" ? "text-white" : "text-white/40"}`}
          >
            Monthly
          </span>
          <button
            type="button"
            onClick={() =>
              setBillingCycle((prev) =>
                prev === "MONTHLY" ? "YEARLY" : "MONTHLY",
              )
            }
            className={`relative w-11 h-6 rounded-full transition-all duration-300 p-0.5 cursor-pointer ${
              billingCycle === "YEARLY" ? "bg-fourth" : "bg-white/10"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-sm ${
                billingCycle === "YEARLY" ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span
            className={`text-xs font-bold tracking-wider uppercase transition-colors duration-300 ${billingCycle === "YEARLY" ? "text-primary" : "text-white/40"}`}
          >
            Yearly
          </span>
        </div>
      </div>

      {/* PLANS GRID */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {tiers.slice(0, 3).map((tier) => (
          <PlanCard
            key={tier.id}
            popular={tier.title === "PRO"}
            selected={selectedTierId === tier.id}
            onSelect={() => setSelectedTierId(tier.id)}
            title={tier.title}
            description={tier.description}
            monthlyPrice={tier.monthlyPrice}
            yearlyPrice={tier.yearlyPrice}
            billingCycle={billingCycle}
            onSubscribe={() => handleClick(tier.id)}
            paymentLoading={paymentLoading}
            features={
              ((billingCycle === "MONTHLY" ? tier.monthlyFeatures : tier.yearlyFeatures) || tier.features)?.map((f) => {
                const titleVal = typeof f === "string" ? f : (f?.title || f?.featureName || f?.name || "");
                const descVal = typeof f === "string" ? "" : (f?.description || f?.featureDescription || "");
                return descVal ? `${titleVal} (${descVal})` : titleVal;
              }) || []
            }
          />
        ))}

        {/* Fallback if no tiers loaded */}
        {tiers.length === 0 && (
          <div className="col-span-full text-center py-20 text-zinc-500 font-medium">
            No subscription plans available at the moment.
          </div>
        )}
      </div>
    </section>
  );
}
