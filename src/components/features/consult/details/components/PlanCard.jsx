import { useRef } from "react";
import { Info, Check, Loader2 } from "lucide-react";
import Button from "@/components/ui/button";

export default function PlanCard({
  title,
  description,
  monthlyPrice,
  yearlyPrice,
  features,
  popular,
  selected,
  onSelect,
  billingCycle = "MONTHLY",
  onSubscribe,
  paymentLoading,
}) {
  const isAnnual = billingCycle === "YEARLY";
  const displayPrice = isAnnual ? yearlyPrice : monthlyPrice;

  // Dynamic descriptions for each tier using third (grey) or fourth (blue)
  const getDescription = () => {
    switch (title?.toUpperCase()) {
      case "BASIC":
        return "For solo consultants";
      case "PREMIUM":
        return "For small teams & growing businesses";
      case "PRO":
        return "For high-volume consulting firms";
      default:
        return "For professional consultants";
    }
  };

  const lastClickTimeRef = useRef(0);

  const handleAction = (e) => {
    e.stopPropagation();
    if (paymentLoading) return;

    const now = Date.now();
    if (now - lastClickTimeRef.current < 1000) {
      return; // Ignore double clicks within 1000ms
    }
    lastClickTimeRef.current = now;

    onSelect();
    onSubscribe();
  };

  return (
    <div
      onClick={onSelect}
      className={`relative rounded-2xl bg-transparent p-7 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] transform border cursor-pointer group
        ${
          popular
            ? "border-white/10 shadow-lg"
            : "border-white/5 hover:border-white/15"
        }`}
    >
      {/* POPULAR BADGE */}
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary border border-fourth/30 text-fourth text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full whitespace-nowrap">
          Most Popular
        </span>
      )}

      <div className="space-y-6">
        {/* HEADER SECTION */}
        <div className="flex justify-between items-baseline">
          <div>
            <h3 className="text-xl font-bold font-primary tracking-tight text-primary transition-colors">
              {title}
            </h3>
            <p className="text-fourth/90 text-xs font-medium mt-1">
              {description || getDescription()}
            </p>
          </div>
          <div className="text-right">
            <div className="text-xl font-extrabold text-primary font-primary">
              ₹{displayPrice?.toLocaleString()}
            </div>
            <span className="text-[10px] text-third/60 font-medium">
              /{isAnnual ? "year" : "month"}
            </span>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleAction}
          variant="ghost"
          full
          loading={selected && paymentLoading}
          className="text-xs uppercase tracking-wider font-semibold cursor-pointer"
        >
          Continue
        </Button>

        {/* FEATURES LIST */}
        <ul className="space-y-0 text-xs border-t border-white/5 pt-2">
          {features.map((f, i) => (
            <li
              key={i}
              className="py-3 border-b border-white/5 text-third/95 flex justify-between items-start gap-3 last:border-b-0"
            >
              <div className="flex gap-2.5 items-start">
                <Check className="text-fourth shrink-0 mt-0.5" size={14} />
                <span className="leading-relaxed">{f}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
