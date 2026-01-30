"use client";

import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

/* ===== DATA ===== */
const media = [
  { type: "image", src: "/cd.png" },
  { type: "image", src: "/small_car.jpg" },
  { type: "video", src: "/sample-video.mp4" },
  { type: "video", src: "/sample-video-2.mp4" },
];

export default function VehicleImageGallery() {
  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((p) => (p === 0 ? media.length - 1 : p - 1));

  const next = () =>
    setActive((p) => (p + 1) % media.length);

  const current = media[active];
  return (
    <section className="w-full bg-primary/80 rounded-xl p-4 shadow border border-third">
      {/* ===== MAIN PREVIEW ===== */}
      <div className="relative w-full aspect-video bg-black/5 rounded-lg overflow-hidden">
        {current.type === "image" ? (
          <Image
            src={current.src}
            alt="Vehicle"
            fill
            className="object-contain"
          />
        ) : (
          <video
            src={current.src}
            controls
            className="w-full h-full object-contain bg-black"
          />
        )}
        {/* NAV BUTTONS */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-secondary text-primary p-2 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-secondary text-primary p-2 rounded-full hover:scale-105 transition duration-300 cursor-pointer"
        >
          <ChevronRight />
        </button>

      </div>

      {/* ===== THUMBNAILS ===== */}
      <div className="flex gap-3 mt-4 overflow-x-auto">
        {media.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`
              relative shrink-0 border rounded-md overflow-hidden transition cursor-pointer
              ${active === idx ? "border-secondary" : "border-third/40"}
            `}
          >
            <div className="w-20 h-14 sm:w-24 sm:h-16 bg-black/5 flex items-center justify-center">
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  width={100}
                  height={100}
                  alt={`thumb-${idx}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-black/30" />
                  <Play
                    size={18}
                    className="absolute text-white"
                  />
                </>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
