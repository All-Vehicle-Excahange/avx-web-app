"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

export default function Testimonials({ summary }) {
  const reviews = summary?.reviews || [];

  const [active, setActive] = useState(0);

  // Ensure active index is always valid
  const safeActive =
      reviews.length === 0
          ? 0
          : active >= reviews.length
              ? 0
              : active;

  const prev = () =>
      setActive((p) =>
          reviews.length === 0
              ? 0
              : p === 0
                  ? reviews.length - 1
                  : p - 1
      );

  const next = () =>
      setActive((p) =>
          reviews.length === 0
              ? 0
              : (p + 1) % reviews.length
      );

  if (!reviews.length) return null;

  const current = reviews[safeActive];

  return (
      <div className="w-full bg-primary rounded-xl p-5 space-y-4">
        {/* HEADER */}
        <h3 className="text-lg font-semibold text-secondary">
          Testimonials
        </h3>

        {/* REVIEW TEXT */}
        <p className="text-sm text-secondary/80 leading-relaxed">
          {current.reviewText}
        </p>

        {/* ⭐ STARS */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
              <Star
                  key={i}
                  size={16}
                  className={
                    i <= current.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-secondary/30"
                  }
              />
          ))}
        </div>

        {/* 👤 REVIEWER NAME */}
        <p className="text-xs text-secondary/60">
          — {current.reviewedBy}
        </p>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-2">
          {/* DOTS */}
          <div className="flex items-center gap-1">
            {reviews.map((_, idx) => (
                <span
                    key={idx}
                    onClick={() => setActive(idx)}
                    className={`h-2 w-2 rounded-full cursor-pointer transition ${
                        safeActive === idx
                            ? "bg-secondary"
                            : "bg-secondary/30"
                    }`}
                />
            ))}
          </div>

          {/* ARROWS */}
          <div className="flex items-center gap-2">
            <button
                onClick={prev}
                className="p-1.5 rounded-full bg-secondary/10 hover:bg-secondary/20 transition"
            >
              <ChevronLeft size={16} />
            </button>

            <button
                onClick={next}
                className="p-1.5 rounded-full bg-secondary/10 hover:bg-secondary/20 transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
  );
}
