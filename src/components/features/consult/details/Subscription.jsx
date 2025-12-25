import { Zap, Crown, Rocket, Check } from "lucide-react";
import Button from "@/components/ui/button";
import PlanCard from "./components/PlanCard";
import { useRouter } from "next/router";

export default function Subscription() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/consult/kyc");
  };

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
