import React from "react";
import Image from "next/image";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  className = "",
  imageSrc = "/empty2.svg",
}) {
  return (
    <div
      className={`col-span-full py-12 text-center  rounded-xl my-4 px-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05),_0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center ${className}`}
    >
      {Icon ? (
        <Icon
          className="w-20 h-20 text-primary opacity-40 mb-4"
          strokeWidth={1.5}
        />
      ) : (
        <div className="relative w-32 h-32 mb-2 opacity-60">
          <Image
            src={imageSrc}
            alt="Empty State"
            fill
            className="object-contain"
          />
        </div>
      )}
      {title && (
        <h3 className="text-lg md:text-xl font-bold text-primary drop-shadow-sm">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-third mt-2 max-w-md mx-auto drop-shadow-sm">
          {description}
        </p>
      )}
    </div>
  );
}
