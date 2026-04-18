import Button from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";

export default function PlanCard({
  icon,
  title,
  monthlyPrice,
  yearlyPrice,
  features,
  popular,
}) {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div
      className={`relative rounded-2xl border backdrop-blur-md p-8 flex flex-col justify-between transition-all duration-300
      ${popular ? "border-primary shadow-2xl" : "border-third/30 "}`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-secondary text-xs px-4 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <div className="space-y-5">
        <div className="flex justify-between items-start">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            {icon}
          </div>

          {/* LOCAL TOGGLE */}
          <div className="flex flex-col items-end gap-1">
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none p-0.5 ${
                isAnnual ? "bg-fourth" : "bg-third/30"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full transition-all duration-300 shadow-sm ${
                  isAnnual
                    ? "translate-x-5 bg-primary"
                    : "translate-x-0 bg-white"
                }`}
              />
            </button>
            <span
              className={`text-[9px] font-bold tracking-tighter ${
                isAnnual ? "text-primary" : "text-third"
              }`}
            >
              YEARLY
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-third">
            <span className="text-2xl text-primary font-bold">
              ₹{isAnnual ? yearlyPrice : monthlyPrice}
            </span>
            /{isAnnual ? "year" : "month"}
          </p>
        </div>

        <ul className="space-y-2 text-sm">
          {features.map((f, i) => (
            <li key={i} className="flex gap-2 items-start text-third">
              <Check className="text-primary mt-1" size={16} /> {f}
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant="outline"
        full
        className={`mt-6  ${popular ? "" : " text-primary border-primary/20 hover:bg-primary/30"}`}
      >
        {popular ? "Selected" : "Select Plan"}
      </Button>
    </div>
  );
}
