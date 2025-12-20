import { MessageCircle, Navigation, Star, Navigation2 } from "lucide-react";
import Button from "@/components/ui/button";

export default function StoreSummaryAside() {
  const services = ["Test Drive", "Financing", "Exchange", "Warranty"];

  const highlights = [
    ["Experience", "10"],
    ["Vehicle Available", "66"],
    ["Sold Vehicle", "174"],
  ];

  return (
    <div className="bg-primary/10 p-6 space-y-6 rounded-2xl">
      {/* STORE INFO */}
      <div className="space-y-3">
        <div className="pt-2 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-third">
            Categories
          </p>

          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <span
                key={service}
                className="px-2 py-1 rounded-full border border-third/40 text-xs text-primary hover:bg-primary/20 transition"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
        <div className="pt-2 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-third">
            Services
          </p>

          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <span
                key={service}
                className="px-2 py-1 rounded-full border border-third/40 text-xs text-primary hover:bg-primary/20 transition"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button full variant="outlineSecondary" showIcon={false}>
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat Now
        </Button>

        <Button full variant="outlineSecondary" showIcon={false}>
          <Navigation className="w-4 h-4 mr-2" />
          Direction
        </Button>
      </div>
    </div>
  );
}
