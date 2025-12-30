import React from "react";
import Button from "@/components/ui/button";
import { MessageCircle, Navigation2 } from "lucide-react";
import {
  Star,
  Users,
  Briefcase,
  Car,
  CheckCircle,
  IndianRupee,
  CornerUpRight,
} from "lucide-react";

export default function StoreFrontHeroSection({
  backgroundImage = "./sfBg.png",
}) {
  return (
    <section className="w-full bg-secondary 3xl:max-w-[1480px] 3xl:mx-auto">
      {/* COVER */}
      <div
        className="relative w-full h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* HERO CONTENT WRAPPER */}
      <div className="relative 3xl:container border-b border-third/30 overflow-hidden">
        {/* 🔥 BLURRED BACKGROUND (same as aside) */}
        <div className="absolute z-10 inset-0 bg-[url('/bg_blur.jpg')] bg-cover opacity-40 blur-lg " />

        {/* CONTENT */}
        <div className="relative z-10 bg-transparent">
          <div className="px-4 md:px-10 lg:px-14">
            <div className="flex items-start py-4">
              {/* LOGO */}
              <div className="relative z-10">
                <div className="relative w-50 h-50 rounded-full mt-4 ml-10 bg-primary flex items-center justify-center text-secondary font-black text-2xl">
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
                    { label: "Rating", value: "4.5", icon: Star },
                    { label: "Subscribers", value: "100+", icon: Users },
                    { label: "Experience", value: "10 Yrs", icon: Briefcase },
                    { label: "Vehicle Available", value: "66", icon: Car },
                    { label: "Sold Vehicle", value: "174", icon: CheckCircle },
                    {
                      label: "Price Range",
                      value: "1.5l-2.5l",
                      icon: IndianRupee,
                    },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-third" />
                      <span className="text-third">{label}:</span>
                      <span className="text-primary font-semibold">
                        {value}
                      </span>
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
                      ),
                    )}
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3 pt-1">
                  <Button size="sm" showIcon={false} variant="ghost">
                    Chat <MessageCircle className="w-5 h-5 ml-2" />
                  </Button>
                  <Button size="sm" showIcon={false} variant="ghost">
                    Direction
                    <CornerUpRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>

              {/* SUBSCRIBE */}
              <div className="flex items-center mt-1 ml-8">
                <Button size="sm" variant="outline" showIcon={false}>
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
