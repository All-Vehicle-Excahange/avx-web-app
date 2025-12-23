"use client";

import Button from "@/components/ui/button";
import { Star, Camera } from "lucide-react";
import { useEffect, useState } from "react";

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
    name: "Nihal",
    rating: 4,
    date: "Reviewed in India on 22 June 2025",
    verified: true,
    text: "Although touch screen is not available but speed good and sufficient for my work.",
    helpful: 6,
  },
  {
    id: 1,
    name: "Nihal",
    rating: 4,
    date: "Reviewed in India on 22 June 2025",
    verified: true,
    text: "Although touch screen is not available but speed good and sufficient for my work.",
    helpful: 6,
  },
  {
    id: 1,
    name: "Nihal",
    rating: 4,
    date: "Reviewed in India on 22 June 2025",
    verified: true,
    text: "Although touch screen is not available but speed good and sufficient for my work.",
    helpful: 6,
  },
  {
    id: 1,
    name: "Nihal",
    rating: 4,
    date: "Reviewed in India on 22 June 2025",
    verified: true,
    text: "Although touch screen is not available but speed good and sufficient for my work.",
    helpful: 6,
  },
  {
    id: 1,
    name: "Nihal",
    rating: 4,
    date: "Reviewed in India on 22 June 2025",
    verified: true,
    text: "Although touch screen is not available but speed good and sufficient for my work.",
    helpful: 6,
  },
  {
    id: 1,
    name: "Nihal",
    rating: 4,
    date: "Reviewed in India on 22 June 2025",
    verified: true,
    text: "Although touch screen is not available but speed good and sufficient for my work.",
    helpful: 6,
  },
];

export default function Review() {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [name, setName] = useState("Nihu Chaudhary");
  const [media, setMedia] = useState([]);

  /* ✅ ENABLE SUBMIT BUTTON */
  const hasContent = reviewText.trim() || reviewTitle.trim() || name.trim();
  const canSubmit = rating > 0 && !!hasContent;

  /* 📷 MEDIA UPLOAD HANDLER */
  const handleMediaUpload = (e) => {
    if (!e.target.files) return;
    setMedia(Array.from(e.target.files));
  };

  return (
    <section className="container bg-secondary text-primary py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_2.1fr] gap-10">
        {/* ================= LEFT ================= */}
        <div className="space-y-6 sticky top-24 h-fit">
          {/* ⭐ RATING SUMMARY */}
          <div className="border border-third/40 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">Customer reviews</h2>

            <div className="flex items-center gap-2 mb-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
              <span className="text-sm text-third">4.1 out of 5</span>
            </div>

            <p className="text-sm text-third mb-4">119 global ratings</p>

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
          </div>

          {/* ✍️ WRITE REVIEW */}
          <div className="border border-third/40 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Write a review</h3>

            {/* ⭐ RATING INPUT */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  onClick={() => setRating(i)}
                  className={`w-6 h-6 cursor-pointer transition ${
                    i <= rating ? "fill-primary text-primary" : "text-third"
                  }`}
                />
              ))}
            </div>

            {/* 📝 REVIEW TEXT */}
            <textarea
              placeholder="What should other customers know?"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full min-h-[120px] bg-secondary border border-third/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />

            {/* 🏷️ TITLE */}
            <input
              placeholder="What's most important to know?"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              className="w-full mt-3 bg-secondary border border-third/40 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary"
            />

            {/* 👤 NAME */}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-3 bg-secondary border border-third/40 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary"
            />

            {/* 📷 PHOTO / VIDEO (OPTIONAL) */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">
                Share a video or photo (optional)
              </label>

              <label className="flex items-center justify-center gap-2 border border-dashed border-third/50 rounded-xl h-28 cursor-pointer hover:border-primary transition">
                <Camera className="w-5 h-5 text-third" />
                <span className="text-sm text-third">
                  {media.length
                    ? `${media.length} file(s) selected`
                    : "Upload photos or videos"}
                </span>

                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* 🚀 SUBMIT */}
            <Button
              disabled={!canSubmit}
              className="w-full mt-5 rounded-xl py-2 font-medium transition disabled:opacity-50 disabled:pointer-events-none"
              full
              variant="ghost"
            >
              Submit Review
            </Button>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-third/40 rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-third/40 flex items-center justify-center font-semibold">
                  {review.name[0]}
                </div>
                <span>{review.name}</span>
              </div>

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

              <p className="text-xs text-third">
                {review.date}
                {review.verified && (
                  <span className="text-primary font-medium ml-1">
                    • Verified Purchase
                  </span>
                )}
              </p>

              <p className="text-sm leading-relaxed">{review.text}</p>

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
