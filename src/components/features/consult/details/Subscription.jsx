"use client";

import { useState, useEffect } from "react";
import { Zap, Crown, Rocket, Check, Loader2 } from "lucide-react";
import Button from "@/components/ui/button";
import PlanCard from "./components/PlanCard";
import { useRouter } from "next/router";
import { getSellerTier } from "@/services/Seller.service";
import { SkeletonBox } from "@/components/ui/skeleton";

export default function Subscription() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const res = await getSellerTier();
        // If user already has an active tier, skip this page and go to KYC
        if (res?.data && res.data.userTierStatus === "ACTIVE") {
          if (router.query?.redirect) {
            router.push(`/consult/kyc?redirect=${encodeURIComponent(router.query.redirect)}`);
          } else {
            router.push("/consult/kyc");
          }
        } else {
          // No active tier found, let them choose a plan
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
        // On error or no data, we stay on this page so they can subscribe
        setLoading(false);
      }
    };
    checkSubscription();
  }, [router]);

  const handleClick = () => {
    if (router.query?.redirect) {
      router.push(`/consult/kyc?redirect=${encodeURIComponent(router.query.redirect)}`);
    } else {
      router.push("/consult/kyc");
    }
  };

  if (loading) {
    return (
      <section className="w-full">
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
    <section className="w-full text-primary">
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
        <PlanCard
          icon={<Zap />}
          title="Starter"
          price="$29"
          features={[
            "Up to 5 active projects",
            "Basic analytics",
            "Email support",
            "5% platform fee",
            "Profile listing",
            "Client messaging",
          ]}
        />

        <PlanCard
          popular
          icon={<Crown />}
          title="Professional"
          price="$79"
          features={[
            "Unlimited projects",
            "Advanced analytics",
            "Priority support",
            "3% platform fee",
            "Featured profile",
            "Video consultations",
            "Custom branding",
            "API access",
          ]}
        />

        <PlanCard
          icon={<Rocket />}
          title="Enterprise"
          price="$199"
          features={[
            "Everything in Professional",
            "Dedicated account manager",
            "24/7 phone support",
            "1% platform fee",
            "Premium placement",
            "White-label options",
            "Team collaboration",
            "Custom integrations",
          ]}
        />
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
