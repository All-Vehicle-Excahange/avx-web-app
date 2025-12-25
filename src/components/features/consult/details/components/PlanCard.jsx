import Button from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PlanCard({ icon, title, price, features, popular }) {
  return (
    <div
      className={`relative rounded-2xl border backdrop-blur-md p-8 flex flex-col justify-between
      ${
        popular ? "border-primary shadow-2xl" : "border-third/30 bg-primary/5"
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-secondary text-xs px-4 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <div className="space-y-5">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>

        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-third">
            <span className="text-2xl text-primary font-bold">{price}</span>
            /month
          </p>
        </div>

        <ul className="space-y-2 text-sm">
          {features.map((f, i) => (
            <li key={i} className="flex gap-2 items-start text-third">
              <Check className="text-primary" size={16} /> {f}
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant="outline"
        full
        className={`mt-6  ${popular ? "" : "bg-primary/60 text-primary"}`}
      >
        {popular ? "Selected" : "Select Plan"}
      </Button>
    </div>
  );
}
