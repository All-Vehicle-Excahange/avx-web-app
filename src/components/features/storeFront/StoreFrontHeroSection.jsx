import React from "react";
import Button from "@/components/ui/button";
import { Navigation2 } from "lucide-react";

export default function StoreFrontHeroSection({
  backgroundImage = "./sfBg.png",
}) {
  return (
    <section className="w-full bg-secondary">
      <div
        className="relative w-full h-[220px] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <div className="w-full bg-secondary border-b border-third/30">
        <div className="px-4 md:px-10 lg:px-14">
          <div className="flex items-start py-4">
            <div className="relative z-10">
              <div className="relative w-36 h-36 rounded-full -mt-20 ml-10 bg-primary flex items-center justify-center text-secondary font-black text-2xl">
                AVX
              </div>
            </div>

            <div className="flex-1 ml-16 space-y-1 w-fit">
              <h1 className="text-2xl font-semibold text-primary">
                Adarsh Vehicles Consultants
              </h1>

              <p className="flex items-center gap-1 text-sm text-third">
                <Navigation2 className="w-4 h-4 shrink-0" />
                Chaapi, Gujarat
              </p>

              <div className="flex gap-8 text-sm flex-wrap">
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
            </div>

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
