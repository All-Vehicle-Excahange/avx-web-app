"use client";

import { useState, useEffect } from "react";
import { Zap, Crown, Rocket, Check, Loader2 } from "lucide-react";
import Button from "@/components/ui/button";
import PlanCard from "./components/PlanCard";
import { useRouter } from "next/router";
import { getSellerTier } from "@/services/Seller.service";
import { SkeletonBox } from "@/components/ui/skeleton";
import { getAllTier } from "@/services/user.service";

export default function Subscription() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tiers, setTiers] = useState([]);

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
          if (router.query?.redirect) {
            router.push(
              `/consult/kyc?redirect=${encodeURIComponent(router.query.redirect)}`,
            );
          } else {
            router.push("/consult/kyc");
          }
          return;
        }

        // Handle tier data
        if (tierRes.status === "fulfilled" && tierRes.value?.data) {
          setTiers(tierRes.value.data);
        }
      } catch (error) {
        console.error("Error initializing subscription data:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [router]);

  const handleClick = () => {
    if (router.query?.redirect) {
      router.push(
        `/consult/kyc?redirect=${encodeURIComponent(router.query.redirect)}`,
      );
    } else {
      router.push("/consult/kyc");
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
    <section className="w-full text-primary mt-20">
      {/* HEADER */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-third max-w-xl mx-auto text-sm">
          Select the tier that best fits your consulting business needs. You can
          upgrade or downgrade at any time.
        </p>
      </div>

      {/* PLANS */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <PlanCard
            key={tier.id}
            popular={tier.title === "PRO"}
            icon={
              <img
                src={tier.tierBadgeUrl}
                alt={tier.title}
                className="w-10 h-10 object-contain"
              />
            }
            title={tier.title}
            monthlyPrice={tier.monthlyPrice}
            yearlyPrice={tier.yearlyPrice}
            features={
              tier.features?.map((f) => (
                <span key={f.id}>
                  {f.featureName}
                  {f.featureDescription && (
                    <span className="text-[11px] opacity-60 ml-1 font-normal">
                      ({f.featureDescription})
                    </span>
                  )}
                </span>
              )) || []
            }
          />
        ))}

        {/* Fallback if no tiers loaded */}
        {tiers.length === 0 && (
          <div className="col-span-full text-center py-20 text-third font-medium">
            No subscription plans available at the moment.
          </div>
        )}
      </div>


      {/* CTA */}
      <div className="mt-16 text-center">
        <Button
          onClick={handleClick}
          variant="outlineAnimated"
          size="md"
          className="px-10 "
        >
          Continue to Payment
        </Button>
      </div>
    </section>
  );
}
