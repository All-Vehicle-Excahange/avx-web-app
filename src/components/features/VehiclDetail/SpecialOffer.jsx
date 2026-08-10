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
          h-[260px]
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
        <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-4 sm:px-6 py-4 sm:py-5 max-w-[60%] sm:max-w-[320px] lg:max-w-[260px] xl:max-w-[320px]">
          {/* Title */}
          <h6 className="text-[10px] sm:text-[12px] font-primary tracking-[0.1em] sm:tracking-[0.2em] uppercase font-bold text-white mb-3 sm:mb-4 leading-snug">
            Buy With Confidence
          </h6>

          {/* Features */}
          <ul className="flex flex-col gap-2.5 sm:gap-3 mb-2 sm:mb-5">
            {features.map((f, i) => (
              <li key={i} className="flex items-start sm:items-center gap-2 sm:gap-2.5">
                <div className="mt-0.5 sm:mt-0 shrink-0">{f.icon}</div>
                <span className="text-[11px] sm:text-[13px] text-white sm:text-white/70 leading-[1.3] sm:leading-snug">
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
