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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TIERS.map((tier) => {
          const isAllowed = USER_TIER === tier.id;

          return (
            <div
              key={tier.id}
              className={`rounded-xl border p-6 flex flex-col min-h-[320px] md:h-auto lg:h-[340px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]
              ${isAllowed
                  ? "border-primary ring-2 ring-primary/50 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  : "border-third/30 opacity-60 hover:opacity-100 hover:border-third/60"
                }`}
            >
              {/* Top */}
              <div className="space-y-6 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold leading-tight">
                    {tier.name}
                    <div className="text-sm text-third font-normal mt-1">{tier.label} Listing</div>
                  </h3>
                  {isAllowed ? (
                    <CheckCircle2 className="text-primary mt-1" size={20} />
                  ) : (
                    <Lock size={18} className="text-third mt-1" />
                  )}
                </div>

                {/* FEATURES */}
                <ul className="text-sm text-third space-y-3 leading-relaxed">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary">•</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom fixed */}
              <div className="mt-6 pt-4 border-t border-third/10">
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
      <div className="border border-third/30 rounded-xl p-8 space-y-6 transition-all duration-300 hover:border-third/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:-translate-y-1">
        <h2 className="text-xl font-semibold">Why your Storefront matters</h2>

        <p className="text-third text-sm leading-relaxed max-w-4xl">
          Your Storefront is your public brand page on AVX. This is what buyers
          see when they click your profile, listings, and ads. A well-designed
          storefront builds instant trust, improves conversions, and positions
          your dealership as a verified premium seller.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          <div className="border border-third/20 rounded-xl p-5 space-y-2">
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
