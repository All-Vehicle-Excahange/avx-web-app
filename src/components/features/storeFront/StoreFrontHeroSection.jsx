import React from "react";
import Button from "@/components/ui/button";
import { Navigation2 } from "lucide-react";

export default function StoreFrontHeroSection({
  backgroundImage = "./sfBg.png",
}) {
  return (
    <section className="w-full bg-secondary">
      {/* COVER */}
      <div
        className="relative w-full h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <div className="w-full bg-secondary border-b border-third/30">
        <div className="px-4 md:px-10 lg:px-14">
          <div className="flex items-start py-4">
            {/* LOGO */}
            <div className="relative z-10">
              <div className="relative w-56 h-56 rounded-full mt-4 ml-10 bg-primary flex items-center justify-center text-secondary font-black text-2xl">
                AVX
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex-1 ml-16 space-y-3">
              {/* TITLE */}
              <h1 className="text-2xl font-semibold text-primary">
                Adarsh Vehicles Consultants
              </h1>

              {/* LOCATION */}
              <p className="flex items-center gap-1 text-sm text-third">
                <Navigation2 className="w-4 h-4 shrink-0" />
                Chaapi, Gujarat
              </p>

              {/* STATS */}
              <div className="flex gap-6 text-sm flex-wrap">
                {[
                  ["Rating", "4.5"],
                  ["Subscribers", "100+"],
                  ["Experience", "10 Yrs"],
                  ["Vehicle Available", "66"],
                  ["Sold Vehicle", "174"],
                  ["Price Range", "1.5l-2.5l"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center gap-1">
                    <span className="text-third">{label}:</span>
                    <span className="text-primary font-semibold">{value}</span>
                  </div>
                ))}
              </div>

              {/* SERVICES */}
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-wide text-third">
                  Services
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Test Drive", "Financing", "Exchange", "Warranty"].map(
                    (item) => (
                      <span
                        key={item}
                        className="px-3 py-1 text-xs border border-third rounded-full text-primary"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* VARIANTS */}
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-wide text-third">
                  Available Variants
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Petrol", "Diesel", "Automatic", "Manual"].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 text-xs border border-third rounded-full text-primary bg-transparent"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 pt-1">
                <Button size="sm" variant="outlineSecondary">
                  Contact
                </Button>
                <Button size="sm" variant="outlineSecondary">
                  Direction
                </Button>
              </div>
            </div>

            {/* SUBSCRIBE (ORIGINAL – UNTOUCHED) */}
            <div className="flex items-center mt-1 ml-8">
              <Button size="sm" variant="outline" showIcon={false}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
