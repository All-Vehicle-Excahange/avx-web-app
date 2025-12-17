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
          3xl:h-[340px]
          rounded-xl
          overflow-hidden
        "
      >
        {/* Background Image */}
        <Image
          src="/banner_Car.png"
          alt="Special Offer"
          fill
          priority
          className="object-cover object-right"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-secondary/85" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div
            className="
              px-6 sm:px-10 lg:px-14
              text-primary
              w-full
              max-w-[520px]
              xl:max-w-none
              xl:text-left
            "
          >
            {/* Discount */}
            <p className="text-xs tracking-widest uppercase opacity-80 mb-4">
              Discount 50%
            </p>

            {/* Heading */}
            <h2
              className="
                font-light leading-tight
                text-3xl
                sm:text-4xl
                lg:text-2xl
                xl:text-4xl
               
              "
            >
              Special Offers{" "}
              <span className="">
                For <span className="font-bold">Black</span>
              </span>
              <span className="font-bold">Friday.</span>
            </h2>

            {/* Price */}
            <div className="mt-6 xl:mt-8">
              <p className="text-sm uppercase tracking-wide opacity-80">
                Now Price
              </p>
              <p
                className="
                  font-bold
                  text-3xl
                  sm:text-4xl
                  lg:text-2xl
                  xl:text-4xl
                  
                "
              >
                ₹50.15 Lakh
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialOffer;
