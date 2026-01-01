"use client";
import Button from "@/components/ui/button";
import { CheckCircle2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

const TIERS = [
  {
    id: "basic",
    name: "Tier 1",
    label: "Basic",
    features: ["1 Banner", "Basic About Section", "Single Image"],
  },
  {
    id: "pro",
    name: "Tier 2",
    label: "Pro",
    features: [
      "Custom Banner",
      "All Sections",
      "Multiple Images",
      "Priority Listing",
    ],
  },
  {
    id: "advance",
    name: "Tier 3",
    label: "Advance",
    features: [
      "Everything in Pro",
      "Featured Store",
      "Homepage Slot",
      "Analytics",
    ],
  },
];

// 🔐 Backend will send this later
const USER_TIER = "basic";

export default function CreateStoreFront() {
  const router = useRouter();

  const handleClick = () => {
    router.push(`storefront/theme`);
  };

  return (
    <section className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Your Storefront Plan</h1>
        <p className="text-third text-sm">
          Your subscription defines your storefront capabilities
        </p>
      </div>

      {/* TIERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TIERS.map((tier) => {
          const isAllowed = USER_TIER === tier.id;

          return (
            <div
              key={tier.id}
              className={`rounded-3xl border p-5 flex flex-col h-[300px]
              ${
                isAllowed
                  ? "border-primary ring-2 ring-primary"
                  : "border-third/30 opacity-60"
              }`}
            >
              {/* Top */}
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {tier.name}{" "}
                    <span className="text-third">({tier.label})</span>
                  </h3>
                  {isAllowed ? (
                    <CheckCircle2 className="text-primary" size={18} />
                  ) : (
                    <Lock size={16} className="text-third" />
                  )}
                </div>

                {/* FEATURES */}
                <ul className="text-sm text-third space-y-3 leading-relaxed">
                  {tier.features.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>

              {/* Bottom fixed */}
              <div className="mt-auto pt-4">
                {isAllowed ? (
                  <Button
                    onClick={handleClick}
                    variant="ghost"
                    full
                    showIcon={true}
                  >
                    Use {tier.label} Storefront
                  </Button>
                ) : (
                  <Button full disabled variant="ghost">
                    Locked <Lock className="ml-3" size={16} />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* WHY STOREFRONT MATTERS */}
      <div className="bg-secondary border border-third/30 rounded-3xl p-8 space-y-6">
        <h2 className="text-xl font-semibold">Why your Storefront matters</h2>

        <p className="text-third text-sm leading-relaxed max-w-4xl">
          Your Storefront is your public brand page on AVX. This is what buyers
          see when they click your profile, listings, and ads. A well-designed
          storefront builds instant trust, improves conversions, and positions
          your dealership as a verified premium seller.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="border border-third/20 rounded-2xl p-5 space-y-2">
            <h4 className="font-semibold">Higher Buyer Trust</h4>
            <p className="text-sm text-third">
              Professional branding increases buyer confidence and reduces
              hesitation.
            </p>
          </div>

          <div className="border border-third/20 rounded-2xl p-5 space-y-2">
            <h4 className="font-semibold">More Leads</h4>
            <p className="text-sm text-third">
              Verified storefronts receive up to 3× more buyer inquiries.
            </p>
          </div>

          <div className="border border-third/20 rounded-2xl p-5 space-y-2">
            <h4 className="font-semibold">Featured Visibility</h4>
            <p className="text-sm text-third">
              Higher tiers unlock homepage slots and premium discovery sections.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
