import Button from "@/components/ui/button";
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  Star,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/consult/account");
    console.log('====================================');
    console.log("DDSDS");
    console.log('====================================');
  };

  return (
    <section className="w-full bg-secondary text-primary">
      <div className=" mx-auto px-6 md:px-12 py-14">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 backdrop-blur-md flex items-center justify-center text-primary border border-third/30">
            <Briefcase size={36} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">
            Become a Consultant
          </h1>

          <p className="text-third leading-relaxed text-sm md:text-base">
            Join our elite network of consultants and unlock new opportunities.
            Share your expertise, set your own rates, and work with clients
            worldwide.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<DollarSign size={22} />}
            title="Flexible Pricing"
            text="Set your own hourly rates and choose projects that match your expertise"
          />
          <FeatureCard
            icon={<TrendingUp size={22} />}
            title="Grow Your Business"
            text="Access powerful tools and analytics to scale your consulting business"
          />
          <FeatureCard
            icon={<Star size={22} />}
            title="Premium Clients"
            text="Connect with verified clients looking for top-tier consultants"
          />
        </div>

        {/* CTA */}
        <div className="mt-20 text-center space-y-6">
          <Button onClick={handleClick} variant="ghost" size="md" showIcon={true}>
            Get Started
          </Button>

          <p className="text-sm text-third">
            Already a consultant?{" "}
            <span className="text-primary underline cursor-pointer">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* CARD */
function FeatureCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl bg-primary/5 backdrop-blur-md border border-third/20 p-8 text-center space-y-4 hover:border-primary/40 hover:shadow-2xl transition">
      <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-third/30">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-third leading-relaxed">{text}</p>
    </div>
  );
}
