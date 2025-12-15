"use client";

import Image from "next/image";

export default function PromoCard({
  image,
  badge = "Special Offer For Today!",
  title,
  description,
}) {
  return (
    <div
      className="relative min-w-[180px] md:min-w-[320px] h-26 md:h-[140px] 2xl:min-w-[600px] 2xl:h-40
                 rounded-xl overflow-hidden group cursor-pointer"
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="absolute inset-0 w-full h-full object-cover
                   transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-secondary/55" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-5">
        <span className=" text-[10px] sm:text-xs text-primary/80 mb-1">
          {badge}
        </span>

        <h3 className="text-primary text-sm md:text-xl font-bold leading-tight">
          {title}
        </h3>

        {description && (
          <p className="text-primary/80 text-[12px] sm:text-sm mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
