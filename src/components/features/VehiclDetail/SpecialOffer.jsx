import Image from "next/image";
import React from "react";
import { ShieldCheck, ClipboardList, Globe, Star } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-4 h-4 text-white/80 shrink-0" />,
    label: "Verified Consultant",
  },
  {
    icon: <ClipboardList className="w-4 h-4 text-white/80 shrink-0" />,
    label: (
      <>
        Optional 210+ Point <br /> Inspection
      </>
    ),
  },
  {
    icon: <Globe className="w-4 h-4 text-white/80 shrink-0" />,
    label: "Transparent Vehicle Details",
  },
  {
    icon: <Star className="w-4 h-4 text-yellow-400 shrink-0 fill-yellow-400" />,
    label: "Trusted by Thousands of Buyers",
  },
];

function SpecialOffer() {
  return (
    <div className="w-full">
      <div
        className="
          relative
          w-full
          h-80
          sm:h-[360px]
          lg:h-[220px]
          xl:h-[300px]
          rounded-xl
          overflow-hidden
          border
          border-third/60
         "
      >
        {/* Background Image */}
        <Image
          src="/vdp-banner.webp"
          alt="Special Offer"
          fill
          priority
          className="object-cover"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 " />

        {/* Left-side content */}
        <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-6 py-5 max-w-[320px] lg:max-w-[260px] xl:max-w-[320px]">
          {/* Title */}
          <h6 className="text-[12px] font-primary tracking-[0.2em] uppercase font-bold text-white mb-4">
            Buy With Confidence
          </h6>

          {/* Features */}
          <ul className="flex flex-col gap-3 mb-5">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-2.5">
                {f.icon}
                <span className="text-[13px]  text-white/70 leading-snug">
                  {f.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SpecialOffer;
