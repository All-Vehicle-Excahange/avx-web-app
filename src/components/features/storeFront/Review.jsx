"use client";

import { Star } from "lucide-react";

const ratingData = [
  { label: "5 star", value: 60 },
  { label: "4 star", value: 21 },
  { label: "3 star", value: 4 },
  { label: "2 star", value: 1 },
  { label: "1 star", value: 14 },
];

const reviews = [
  {
    id: 1,
    name: "Nihal ",
    rating: 4,
    date: "Reviewed in India on 22 June 2025",
    verified: true,
    text: "Although touch screen is not available but speed good and sufficient for my work.",
    media: ["/review1.jpg", "/review2.jpg"],
    helpful: 6,
  },
  {
    id: 1,
    name: "Karam",
    rating: 4,
    date: "Reviewed in India on 22 June 2025",
    verified: true,
    text: "Although touch screen is not available but speed good and sufficient for my work.",
    media: ["/review1.jpg", "/review2.jpg"],
    helpful: 6,
  },
  {
    id: 1,
    name: "Karam",
    rating: 4,
    date: "Reviewed in India on 22 June 2025",
    verified: true,
    text: "Although touch screen is not available but speed good and sufficient for my work.",
    media: ["/review1.jpg", "/review2.jpg"],
    helpful: 6,
  },
];

export default function Review() {
  return (
    <section className="w-full bg-secondary text-primary">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_2.1fr] gap-10">
        {/* ================= LEFT : RATING SUMMARY ================= */}
        <div className="sticky top-24 border border-third/40 rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-3">Customer reviews</h2>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 fill-primary text-primary" />
            ))}
            <span className="text-sm text-third">4.1 out of 5</span>
          </div>

          <p className="text-sm text-third mb-4">119 global ratings</p>

          {/* Bars */}
          <div className="space-y-2">
            {ratingData.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-sm text-third w-12">{item.label}</span>

                <div className="flex-1 h-3 rounded-full bg-third/30 overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${item.value}%` }}
                  />
                </div>

                <span className="text-sm text-third w-10">{item.value}%</span>
              </div>
            ))}
          </div>

          <button className="mt-4 text-sm text-primary underline">
            How are ratings calculated?
          </button>
        </div>

        {/* ================= RIGHT : REVIEWS ================= */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-third/40 rounded-2xl p-6 space-y-4"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-third/40 flex items-center justify-center text-sm font-semibold">
                  {review.name[0]}
                </div>
                <span className="font-medium">{review.name}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i <= review.rating
                        ? "fill-primary text-primary"
                        : "text-third"
                    }`}
                  />
                ))}
                <span className="text-sm text-third">Good in this budget</span>
              </div>

              {/* Meta */}
              <p className="text-xs text-third">
                {review.date}{" "}
                {review.verified && (
                  <span className="text-primary font-medium ml-1">
                    • Verified Purchase
                  </span>
                )}
              </p>

              {/* Review Text */}
              <p className="text-sm text-primary leading-relaxed">
                {review.text}
              </p>

              {/* Media */}
              <div className="flex gap-3">
                {review.media.map((img, i) => (
                  <div
                    key={i}
                    className="w-24 h-24 bg-third/30 rounded-lg flex items-center justify-center text-xs text-third"
                  >
                    Image
                  </div>
                ))}
              </div>

              {/* Footer */}
              <p className="text-xs text-third">
                {review.helpful} people found this helpful
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
