import Image from "next/image";
import React from "react";

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
      </div>
    </div>
  );
}

export default SpecialOffer;

