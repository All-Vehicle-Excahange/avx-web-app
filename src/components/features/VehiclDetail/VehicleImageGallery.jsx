"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

/* ===== DATA ===== */
const photos = ["/cd.png", "/small_car.jpg", "/cd.png", "/small_car.jpg"];

const videos = ["/sample-video.mp4", "/sample-video-2.mp4"];

export default function VehicleImageGallery() {
  const [mode, setMode] = useState("photos"); // photos | videos
  const [active, setActive] = useState(0);

  const items = mode === "photos" ? photos : videos;
  const isPhotoMode = mode === "photos";

  const prev = () => setActive((p) => (p === 0 ? items.length - 1 : p - 1));

  const next = () => setActive((p) => (p + 1) % items.length);

  return (
    <section className="w-full bg-primary/80 rounded-xl p-4 shadow border border-third">
      {/* ===== MAIN PREVIEW ===== */}
      <div className="relative w-full aspect-video bg-black/5 rounded-lg overflow-hidden">
        {isPhotoMode ? (
          <Image
            src={items[active]}
            alt="Vehicle"
            fill
            className="object-contain"
          />
        ) : (
          <video
            src={items[active]}
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

        {/* ===== TOGGLE (BOTTOM RIGHT) ===== */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-2 rounded-xl border border-third/40 bg-secondary/90">
          <span className="text-sm text-primary font-semibold">
            {isPhotoMode ? "Photos" : "Videos"}
          </span>

          <button
            onClick={() => {
              setMode(isPhotoMode ? "videos" : "photos");
              setActive(0);
            }}
            className={`relative w-9 h-5 rounded-full transition ${
              isPhotoMode ? "bg-white/30" : "bg-primary"
            }`}
          >
            <span
              className={`absolute top-1 left-1 h-3 w-3 rounded-full bg-secondary transition-transform ${
                !isPhotoMode ? "translate-x-4" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ===== THUMBNAILS ===== */}
      <div className="flex gap-3 mt-4 overflow-x-auto">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`shrink-0 border rounded-md overflow-hidden transition
              ${active === idx ? "border-secondary" : "border-third/40"}
            `}
          >
            <div className="w-20 h-14 sm:w-24 sm:h-16 bg-black/5 flex items-center justify-center">
              {isPhotoMode ? (
                <Image
                  src={item}
                  width={100}
                  height={100}
                  alt={`thumb-${idx}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-primary font-medium">
                  Video {idx + 1}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
