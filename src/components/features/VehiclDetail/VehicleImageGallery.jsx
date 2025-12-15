"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const images = [
  "/cd.png",
  "/small_car.jpg",
  "/cd.png",
  "/small_car.jpg",
  "/cd.png",
];

export default function VehicleImageGallery() {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full bg-white rounded-xl p-4 shadow border border-third ">
      <div className="relative w-full aspect-video bg-black/5 rounded-lg overflow-hidden">
        <Image
          src={images[active]}
          alt="Vehicle"
          fill
          className="w-full h-full object-contain"
        />

        <button
          onClick={() =>
            setActive((prev) => (prev === 0 ? images.length - 1 : prev - 1))
          }
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-secondary text-primary p-2 rounded-full hover:scale-105 transition"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => setActive((prev) => (prev + 1) % images.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-secondary text-primary p-2 rounded-full hover:scale-105 transition"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="flex gap-3 mt-4 overflow-x-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`
              shrink-0
              border rounded-md overflow-hidden
              transition
              ${active === idx ? "border-secondary" : "border-third/40"}
            `}
          >
            <div className="w-20 h-14 sm:w-24 sm:h-16 bg-black/5">
              <Image
                src={img}
                width={100}
                height={100}
                alt={`thumb-${idx}`}
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
