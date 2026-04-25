import {
  Star,
  MessageSquare,
  ThumbsUp,
  MapPin,
  Calendar,
  Clock,
  User,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Button from "@/components/ui/button";
import CustomSelect from "@/components/ui/custom-select";
const mockSummary = {
  averageRating: 4.5,
  totalReviews: 1320,
  distribution: [
    { star: 5, count: 210, color: "bg-emerald-500" },
    { star: 4, count: 70, color: "bg-blue-500" },
    { star: 3, count: 25, color: "bg-orange-500" },
    { star: 2, count: 15, color: "bg-rose-800" },
    { star: 1, count: 8, color: "bg-rose-500" },
  ],
};

const mockReviews = [
  {
    id: 1,
    userName: "Rajesh Kumar",
    rating: 5,
    date: "24 April, 2026",
    comment:
      "Excellent service! The consultant was very knowledgeable and helped me find the perfect car within my budget. Highly recommended for anyone looking for professional advice.",
    helpfulCount: 12,
    location: "Ahmedabad",
    tag: "Verified Purchase",
  },
  {
    id: 2,
    userName: "Sneha Patel",
    rating: 4,
    date: "20 April, 2026",
    comment:
      "Very helpful guidance. The inspection report was detailed and gave me confidence in my purchase. Minor delay in response once, but otherwise great.",
    helpfulCount: 8,
    location: "Mumbai",
    tag: "Verified Purchase",
  },
  {
    id: 3,
    userName: "Amit Shah",
    rating: 5,
    date: "15 April, 2026",
    comment:
      "The best consultation experience I've had. They really care about the customer's needs and don't just push for a sale.",
    helpfulCount: 15,
    location: "Surat",
    tag: "Verified Purchase",
  },
];

function ReviewComponent() {
  const [range, setRange] = useState("7");
  const rangeOptions = [
    { label: "Last 7 days", value: "7" },
    { label: "Last 30 days", value: "30" },
    { label: "Last 90 days", value: "90" },
  ];

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState({});

  const handleReplySubmit = (reviewId) => {
    if (!replyText.trim()) return;
    setReplies({
      ...replies,
      [reviewId]: {
        text: replyText,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      },
    });
    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Customer Reviews
          </h1>
          <p className="text-third text-sm mt-1">
            Manage and respond to your client feedback
          </p>
        </div>
        <div className="w-48">
          <CustomSelect
            value={range}
            onChange={setRange}
            options={rangeOptions}
            placeholder="Select range"
            variant="transparent"
          />
        </div>
      </div>

      {/* RATING SUMMARY CARD */}
      <div className="border border-white/10 rounded-3xl p-6 md:p-8">
        <h3 className="text-xl font-bold mb-6 text-white">Customer reviews</h3>

        <div className="space-y-6">
          {/* Top Score Info */}
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= 3.5 ? "fill-white text-white" : "text-white/20"
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-white/90">
                {mockSummary.averageRating} out of 5
              </span>
            </div>
            <p className="text-sm text-white/40">
              {mockSummary.totalReviews.toLocaleString()} global ratings
            </p>
          </div>

          {/* Distribution Bars */}
          <div className="space-y-3 max-w-xl">
            {[
              { label: "5 star", percent: 65 },
              { label: "4 star", percent: 22 },
              { label: "3 star", percent: 8 },
              { label: "2 star", percent: 4 },
              { label: "1 star", percent: 1 },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 group">
                <span className="text-sm font-medium text-white/90 w-12">
                  {item.label}
                </span>

                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-1000 ease-out"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>

                <span className="text-sm font-medium text-white/90 w-10 text-right">
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REVIEWS LIST */}
      <div className="space-y-6">
        <div className="grid gap-6">
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="border border-third/30 rounded-3xl p-6 hover:border-third/50 transition-all duration-300 group"
            >
              {/* USER INFO */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-medium text-sm border border-white/10">
                  {review.userName[0]}
                </div>
                <h4 className="font-semibold text-white text-base">
                  {review.userName}
                </h4>
              </div>

              {/* RATING & STATUS */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={
                        star <= review.rating
                          ? "fill-white text-white"
                          : "text-white/20"
                      }
                    />
                  ))}
                </div>
                <span className="text-white/80 text-xs font-medium ml-1">
                  Outstanding
                </span>
              </div>

              {/* DATE */}
              <p className="text-white/40 text-[11px] mb-4">
                Reviewed on {review.date}
              </p>

              {/* COMMENT */}
              <div className="mb-6">
                <p className="text-white/90 text-sm leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {/* MEDIA */}
              {review.id === 1 && (
                <div className="mb-6">
                  <div
                    onClick={() => setSelectedImage("/logo/logo.webp")}
                    className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1 overflow-hidden relative group/media cursor-pointer hover:border-white/20 transition shadow-lg"
                  >
                    <Image
                      src="/logo/logo.webp"
                      alt="Review Upload"
                      fill
                      className="object-contain p-4 opacity-50 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                        View
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* EXISTING REPLY */}
              {replies[review.id] && (
                <div className="mt-6 flex justify-start">
                  <div className="flex gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden w-full group/reply">
                 
                    {/* Consultant Avatar */}
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                      <User size={14} />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white tracking-wide">
                            Official Response
                          </span>
                          <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[8px] font-black uppercase rounded border border-primary/20">
                            Consultant
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-white/30 font-medium">
                            {replies[review.id].date}
                          </span>
                          <button
                            onClick={() => {
                              setReplyingTo(review.id);
                              setReplyText(replies[review.id]?.text || "");
                            }}
                            className="opacity-0 border border-primary rounded-full px-6 py-2.5 group-hover/reply:opacity-100 text-sm font-bold  hover:bg-primary hover:text-secondary transition-all duration-300"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed italic font-serif">
                        {replies[review.id].text}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ACTIONS */}
              <div className="pt-6 border-t border-white/5 mt-6">
                {replyingTo === review.id ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <textarea
                        autoFocus
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your professional response here..."
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all min-h-[120px] resize-none leading-relaxed shadow-inner"
                      />
                      <div className="absolute bottom-4 right-4 text-[10px] text-white/20 font-medium">
                        {replyText.length} characters
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                      <Button
                        variant="outlineSecondary"
                        className="px-8 py-3 text-sm font-bold"
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyText("");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="ghost"
                        className="px-8 py-3 text-sm font-black bg-primary text-secondary hover:bg-primary/90"
                        onClick={() => handleReplySubmit(review.id)}
                      >
                        Publish Response
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    {!replies[review.id] ? (
                      <button
                        onClick={() => {
                          setReplyingTo(review.id);
                          setReplyText("");
                        }}
                        className="text-xs font-bold text-white/30 hover:text-primary transition flex items-center gap-2 group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition">
                          <MessageSquare size={14} />
                        </div>
                        Write a public response
                      </button>
                    ) : (
                      <div />
                    )}

                    <button className="text-[10px] font-bold text-white/20 hover:text-white/60 transition uppercase tracking-widest">
                      Mark as helpful
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl h-[80vh] rounded-3xl overflow-hidden bg-[#111111] border border-white/10 shadow-2xl"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
              ✕
            </button>

            <div className="relative w-full h-full p-8">
              <Image
                src={selectedImage}
                alt="Review Preview"
                fill
                className="object-contain p-4"
              />
            </div>

            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40 font-medium">
              Click anywhere outside to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewComponent;
