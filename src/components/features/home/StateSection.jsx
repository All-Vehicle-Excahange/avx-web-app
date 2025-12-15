import { ArrowUpRight, Star, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function StatsSection() {
  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h3 className="text-third font-bold text-2xl md:text-3xl mb-2">
            Our focus is simple
          </h3>
          <h2 className="text-secondary font-bold text-4xl md:text-5xl tracking-tight">
            Design to Convert
          </h2>
        </div>

        <div className="max-w-sm text-secondary text-right md:text-right text-sm md:text-base leading-relaxed">
          We promise to deliver beyond your expectations for your business.
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-auto lg:h-[400px]">
        {/* Column 1 */}
        <div className="flex flex-col gap-4 h-full">
          {/* Partners Card */}
          <div className="bg-primary border border-third/40 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            {/* Avatars */}
            <div className="flex items-center -space-x-2">
              {[1, 2, 3].map((i) => (
                <div className="h-8 w-8 rounded-full overflow-hidden" key={i}>
                  <Image
                    src="/dp.jpg"
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Text */}
            <span className="text-third font-semibold text-xs uppercase tracking-wide">
              20+ Partners
            </span>
          </div>

          {/* Vehicles Listed */}
          <div className="bg-primary border border-third/40 rounded-2xl p-6 shadow-sm flex-1 flex flex-col justify-between min-h-40">
            <span className="text-secondary font-medium">Vehicles Listed</span>

            <div>
              <div className="text-5xl font-bold text-secondary mb-1">10K+</div>
              <div className="text-third text-sm">
                Return on investment (ROI)
              </div>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4 h-full">
          {/* Revenue Card */}
          <div className="bg-primary border border-third/40 rounded-2xl p-6 shadow-sm flex-1 flex flex-col justify-between min-h-40">
            <span className="text-secondary font-medium">
              Consultants & Vendors
            </span>

            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-secondary">₹2.5</span>
                <span className="text-3xl font-bold text-third">+</span>
              </div>
              <div className="text-third text-sm">Revenue generated</div>
            </div>
          </div>

          {/* Available Card */}
          <div className="bg-primary border border-third/40 rounded-2xl p-4 flex items-center gap-3 shadow-sm h-16">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-third font-semibold text-xs uppercase tracking-wide">
              AVAILABLE FOR ANY TIME
            </span>
          </div>
        </div>

        {/* Column 3 - Dark App Downloads */}
        <div className="  p-6 relative overflow-hidden flex flex-col justify-between min-h-[250px] ">
          <span className="text-third font-medium relative z-10">
            App Downloads
          </span>

          {/* Decorational Chart Line */}
          <div className="absolute z-10 inset-0 flex items-center justify-center opacity-20">
            <TrendingUp className="w-56 h-56 md:w-66 md:h-66  xl:w-74 xl:h-74 xl:bottom-6 relative 2xl:w-120 2xl:h-120   text-third" />
          </div>

          <div className="absolute bottom-0 right-0 p-4 md:p-2 lg:p-4  z-10">
            <div className="bg-third  text-secondary font-bold rounded-full w-18 h-18 md:w-22 md:h-22 lg:h-30 lg:w-30 flex items-center justify-center text-xl shadow-lg">
              999+
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 p-6 ">
            <div
              class="inverted 
            h-[400px] w-[400px]
            md:h-[420px] md:w-[420px]
            lg:h-[640px] lg:w-[640px]
            2xl:h-[640px] xl:w-[640px]"
            ></div>
          </div>
        </div>

        {/* Column 4 — Trusted By */}
        <div className="bg-secondary rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[250px] shadow-sm">
          <p className="text-third text-sm leading-relaxed max-w-[80%] relative z-10">
            We delivered 50+ projects worldwide, helping service-based companies
            secure more clients
          </p>

          <ArrowUpRight className="absolute top-1/2 right-4  text-third/20 -translate-y-1/2   w-56 h-56 md:w-66 md:h-66  xl:w-74 xl:h-74 xl:bottom-6  2xl:w-120 2xl:h-120" />

          <div className="relative z-10">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-500 fill-yellow-500"
                />
              ))}
            </div>

            <div className="text-primary font-bold text-xs uppercase tracking-widest opacity-80">
              TRUSTED BY
            </div>
            <div className="text-primary font-bold text-xs uppercase tracking-widest opacity-80">
              CLIENTS WORLDWIDE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
