"use client";

import Button from "@/components/ui/button";
import {
  addNewReview,
  checkIsEligibleToCreateReview,
  getAllReview,
} from "@/services/user.service";
import { Star, Camera, Info, Lock, Plus, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import StoreFrontReviewSkeleton from "@/components/ui/skeleton/StoreFrontReviewSkeleton";

export default function Review() {
  const id = useParams()?.id;

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");

  const [isEligibleToCreateReview, setIsEligibleToCreateReview] =
    useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewSummary, setReviewSummary] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [media, setMedia] = useState([{ file: null }]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    const checkEligibility = async () => {
      const isEligible = await checkIsEligibleToCreateReview(id);
      setIsEligibleToCreateReview(isEligible.data);
    };
    checkEligibility();
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchReviews = async () => {
      try {
        const res = await getAllReview(id, {
          pageNo: 1,
          size: 10,
        });

        const apiData = res?.data;

        setReviews(apiData?.reviews || []);
        setReviewSummary(apiData?.reviewSummary || null);
      } catch (error) {
        console.log("Review Fetch Error:", error);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [selectedImage]);

  const hasContent = reviewText.trim() || reviewTitle.trim() || name.trim();
  const canSubmit = rating > 0 && !!hasContent;

  const handleMediaUpload = (index, file) => {
    const updated = [...media];
    updated[index].file = file;
    setMedia(updated);
  };

  const addMoreImageInput = () => {
    setMedia((prev) => [...prev, { file: null }]);
  };

  const createReviewPayload = () => {
    const formData = new FormData();

    formData.append("rating", rating);
    formData.append("reviewTitle", reviewTitle);
    formData.append("reviewText", reviewText);

    media.forEach((item, index) => {
      if (item.file) {
        formData.append(`images[${index}].image`, item.file);
        formData.append(`images[${index}].displayOrder`, index + 1);
      }
    });

    return formData;
  };

  const handleSubmitReview = async () => {
    try {
      const payload = createReviewPayload();

      await addNewReview(id, payload);
    } catch (error) {
      console.log("❌ Submit Error:", error);
    }
  };

  if (reviewsLoading) return <StoreFrontReviewSkeleton />;

  return (
    <section className="container mt-4 text-primary py-6 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 lg:gap-12">
        {/* ================= LEFT ================= */}
        <div className="space-y-6 lg:sticky lg:top-24 h-fit">
          {/* ⭐ RATING SUMMARY */}
          <div className="border border-third/40 rounded-2xl p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-3">Customer reviews</h2>

            {reviewSummary ? (
              <>
                {/* ✅ Average Rating */}
                <div className="flex items-center gap-2 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i <= Math.round(reviewSummary.averageRating)
                        ? "fill-primary text-primary"
                        : "text-third"
                        }`}
                    />
                  ))}

                  <span className="text-sm text-third">
                    {reviewSummary.averageRating.toFixed(1)} out of 5
                  </span>
                </div>

                <p className="text-sm text-third mb-4">
                  {reviewSummary.totalReviews} global ratings
                </p>

                <div className="space-y-2">
                  {[
                    {
                      label: "5 star",
                      percent: reviewSummary.fiveStarPercentage,
                    },
                    {
                      label: "4 star",
                      percent: reviewSummary.fourStarPercentage,
                    },
                    {
                      label: "3 star",
                      percent: reviewSummary.threeStarPercentage,
                    },
                    {
                      label: "2 star",
                      percent: reviewSummary.twoStarPercentage,
                    },
                    {
                      label: "1 star",
                      percent: reviewSummary.oneStarPercentage,
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="text-sm text-third w-12">
                        {item.label}
                      </span>

                      <div className="flex-1 h-3 rounded-full bg-third/30 overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>

                      <span className="text-sm text-third w-10">
                        {item.percent.toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-third">Loading summary...</p>
            )}
          </div>

          {/* ✍️ WRITE REVIEW */}
          <div className="border border-third/40 rounded-2xl p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">Write a review</h3>

            {isEligibleToCreateReview ? (
              <>
                {/* ⭐ RATING INPUT */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      onClick={() => setRating(i)}
                      className={`w-6 h-6 cursor-pointer transition ${i <= rating ? "fill-primary text-primary" : "text-third"
                        }`}
                    />
                  ))}
                </div>

                {/* 📝 REVIEW TEXT */}
                <textarea
                  placeholder="What should other customers know?"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full min-h-[120px] border border-third/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
                />

                {/* 🏷️ TITLE */}
                <input
                  placeholder="What's most important to know?"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full mt-3  border border-third/40 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary"
                />

                {/* 📷 MULTI IMAGE INPUTS (OLD DESIGN STYLE) */}
                <div className="mt-4 space-y-3">
                  <label className="block text-sm font-medium mb-2">
                    Share a video or photo (optional)
                  </label>

                  {/* ✅ Multiple Upload Boxes */}
                  {media.map((item, index) => (
                    <label
                      key={index}
                      className="flex items-center justify-center gap-2 border border-dashed border-third/50 rounded-xl h-20 cursor-pointer hover:border-primary transition"
                    >
                      <Camera className="w-5 h-5 text-third" />

                      <span className="text-sm text-third">
                        {item.file ? item.file.name : `Upload Image ${index + 1}`}
                      </span>

                      {/* ✅ Hidden Input */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleMediaUpload(index, e.target.files?.[0])
                        }
                        className="hidden"
                      />
                    </label>
                  ))}

                  {/* ✅ Add More Button */}
                  <Button
                    type="button"
                    variant="outlineSecondary"
                    onClick={addMoreImageInput}
                    className="text-sm text-primary font-medium"
                  >
                    <Plus className="w-4 mr-1 h-4" /> Add Media
                  </Button>
                </div>

                <div className="relative mt-5">
                  {/* ✅ SUBMIT BUTTON */}
                  <Button
                    onClick={handleSubmitReview}
                    className="w-full rounded-xl py-2 font-medium flex items-center justify-center gap-2"
                    full
                    variant="ghost"
                  >
                    Submit Review
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-3 rounded-xl border border-third/40 px-4 py-4 bg-third/5">
                  <Info size={18} className="text-primary shrink-0 mt-0.5" />

                  <p className="text-sm leading-relaxed text-third">
                    We apologize but this account has not met the minimum
                    eligibility requirements to write a review. If you would like
                    to learn more about our eligibility requirements, please see
                    our{" "}
                    <a
                      href="/terms-and-conditions"
                      target="_blank"
                      className="text-primary font-medium hover:underline"
                    >
                      community guidelines
                    </a>
                    .
                  </p>
                </div>

                <div className="relative mt-5">
                  <Button
                    disabled
                    className="w-full rounded-xl py-2 font-medium flex items-center justify-center gap-2 opacity-60 cursor-not-allowed"
                    full
                    variant="ghost"
                  >
                    <Lock size={16} />
                    Not Eligible to Review
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6 border-2 border-dashed border-third/40 rounded-2xl text-center">
              <div className="w-16 h-16 bg-third/10 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-third" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">No reviews yet</h3>
              <p className="text-sm text-third max-w-sm mx-auto">
                Be the first to review this item. Share your experience to help others make better choices.
              </p>
            </div>
          ) : (
            reviews.map((review) => {
              const user = review.reviewedBy;

              return (
                <div
                  key={review.id}
                  className="border border-third/40 rounded-2xl p-4 sm:p-6 space-y-4"
                >
                  {/* ✅ USER HEADER */}
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-third/40 flex items-center justify-center font-semibold">
                      {user?.firstname?.[0] || "U"}
                    </div>

                    {/* Name */}
                    <span className="font-medium">
                      {user?.firstname} {user?.lastname}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i <= review.rating
                          ? "fill-primary text-primary"
                          : "text-third"
                          }`}
                      />
                    ))}

                    <span className="text-sm text-third font-medium">
                      {review.reviewTitle}
                    </span>
                  </div>

                  <p className="text-xs text-third">
                    Reviewed on{" "}
                    {new Date(review.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    {review.isEdited && (
                      <span className="ml-2 text-primary font-medium">
                        (Edited)
                      </span>
                    )}
                  </p>

                  <p className="text-sm leading-relaxed">{review.reviewText}</p>

                  {review.images?.length > 0 && (
                    <div className="flex gap-3 pt-3 flex-wrap">
                      {review.images.map((img) => (
                        <div
                          key={img.id}
                          onClick={() => setSelectedImage(img.imageUrl)}
                          className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-third/20 cursor-pointer hover:scale-105 transition shadow-sm"
                        >
                          <Image
                            src={img.imageUrl}
                            alt="Review Upload"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4
               bg-black/30 backdrop-blur-sm"
          >
            {/* ✅ Popup Box */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[85vh] sm:h-[80vh]
                 rounded-2xl overflow-hidden 
                 bg-secondary/90 backdrop-blur-xl shadow-2xl border border-white/10"
            >
              {/* ✅ Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 z-50 
                   flex items-center justify-center 
                   w-9 h-9 rounded-full 
                   bg-black/40 text-white 
                   hover:bg-black/70 transition"
              >
                ✕
              </button>

              <Image
                src={selectedImage}
                alt="Review Preview"
                fill
                className="object-contain p-4"
              />

              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] text-black/60">
                Press <span className="font-semibold">ESC</span> to close
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
