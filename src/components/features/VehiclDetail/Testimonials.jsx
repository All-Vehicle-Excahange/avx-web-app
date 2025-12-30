"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    text: `Lorem ipsum dolor sit amet consectetur. Gravida lacus volutpat orci vitae sed urna egestas. Eget sit adipiscing eleifend odio at libero ullamcorper non. Platea neque.`,
    rating: 5,
  },
  {
    text: `Excellent service and smooth experience. The dealer was very transparent and helpful throughout the process.`,
    rating: 4,
  },
  {
    text: `Car condition was exactly as promised. Home test drive was a big plus.`,
    rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  const next = () => setActive((p) => (p + 1) % testimonials.length);

  return (
    <div className="w-full bg-primary rounded-xl p-5 space-y-4">
      {/* HEADER */}
      <h3 className="text-lg font-semibold text-secondary">Testimonials</h3>

      {/* REVIEW TEXT */}
      <p className="text-sm text-secondary/80 leading-relaxed">
        {testimonials[active].text}
      </p>

      {/* ⭐ STARS (AFTER REVIEW) */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={16}
            className={
              i <= testimonials[active].rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-secondary/30"
            }
          />
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between pt-2">
        {/* DOTS */}
        <div className="flex items-center gap-1">
          {testimonials.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setActive(idx)}
              className={`h-2 w-2 rounded-full cursor-pointer transition ${
                active === idx ? "bg-secondary" : "bg-secondary/30"
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
