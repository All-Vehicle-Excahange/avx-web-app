"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Button from "@/components/ui/button";
import { X, Star, Loader2, Plus, Camera, User } from "lucide-react";
import { addNewReview } from "@/services/user.service";

export default function FeedbackPopup({
  isOpen,
  onClose,
  targetId,
  isReview = true,
  isWritten = true,
  reviewData = null,
  isEligible = true,
}) {
  const mockReview = {
    reviewedBy: { firstname: "Demo", lastname: "User" },
    createdAt: new Date("2026-06-26").toISOString(),
    rating: 5,
    reviewTitle: "Excellent service!",
    reviewText:
      "The overall experience was fantastic. The team was very professional and everything was handled smoothly.",
    images: [
      { imageUrl: "/auth-image-1.webp" },
      { imageUrl: "/auth-image-1.webp" },
    ],
  };

  const dataToShow = reviewData || mockReview;
  const [isClosing, setIsClosing] = useState(false);
  const [rating, setRating] = useState(0);
  const [media, setMedia] = useState([{ file: null }]);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleMediaUpload = (index, file) => {
    if (!file) return;
    const updated = [...media];
    updated[index].file = file;
    updated[index].preview = URL.createObjectURL(file);
    setMedia(updated);
  };

  const addMoreImageInput = () => {
    setMedia((prev) => [...prev, { file: null }]);
  };

  const handleSubmitReview = async () => {
    if (!targetId || submitting) return;
    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("rating", rating);
      formData.append("reviewTitle", reviewTitle);
      formData.append("reviewText", reviewText);

      let imageIndex = 0;
      media.forEach((item) => {
        if (item.file) {
          formData.append(`images[${imageIndex}].image`, item.file);
          formData.append(`images[${imageIndex}].displayOrder`, imageIndex + 1);
          imageIndex++;
        }
      });

      await addNewReview(targetId, formData);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const handleClosePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleClosePopup}
      style={{
        animation: isClosing
          ? "modalBackdropOut 0.25s ease-in forwards"
          : "modalBackdropIn 0.25s ease-out",
      }}
    >
      <div
        className="relative flex w-full max-w-[900px] overflow-hidden rounded-2xl shadow-2xl bg-primary-white"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "modalCardOut 0.25s ease-in forwards"
            : "modalCardIn 0.3s ease-out",
        }}
      >
        <button
          onClick={handleClosePopup}
          className="absolute bg-white cursor-pointer top-4 right-4 z-20 p-1 rounded-full hover:opacity-70 text-secondary"
        >
          <X size={20} />
        </button>

        {/* LEFT IMAGE */}
        <div className="hidden md:block w-5/12 relative bg-black">
          <div className="relative w-full h-full">
            <Image
              src="/auth-image-1.webp"
              priority
              alt="Feedback"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/80" />

            <div className="absolute bottom-12 right-8 z-10 flex flex-col items-end text-right">
              <h3 className="text-2xl font-bold text-white mb-2">
                {isReview
                  ? "Review"
                  : "Your review helps the next buyer decide."}
              </h3>
              <p className="text-white/90 text-[13px] max-w-[180px] mb-3 leading-snug">
                {isReview
                  ? "Share your experience with us."
                  : "HAll reviews are verified and publicly visible on the consultant's storefront."}
              </p>
              <div className="w-8 h-[3px] bg-fourth rounded-full"></div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-7/12 bg-secondary flex flex-col max-h-[90vh]">
          {!isEligible && !isWritten ? (
            <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar flex-1 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <X size={32} className="text-white/40" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Not Eligible
              </h3>
              <p className="text-white/60 text-sm max-w-sm">
                You are not eligible to write a review at this time.
              </p>
            </div>
          ) : isWritten ? (
            <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar flex-1 flex flex-col justify-center">
              <div className="bg-primary-black/20 border border-white/5 rounded-3xl p-8">
                {/* User Info */}
                <div className="flex flex-col gap-1 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-medium text-sm border border-white/10 shrink-0">
                      {dataToShow?.reviewedBy?.firstname?.[0] || (
                        <User size={16} />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-base">
                        {dataToShow?.reviewedBy?.firstname || "User"}{" "}
                        {dataToShow?.reviewedBy?.lastname || ""}
                      </h4>
                      <p className="text-white/40 text-[11px] mt-0.5">
                        Reviewed on{" "}
                        {new Date(
                          dataToShow?.createdAt || Date.now(),
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className={
                        star <= (dataToShow?.rating || 5)
                          ? "fill-primary text-primary"
                          : "text-third/40"
                      }
                    />
                  ))}
                </div>

                {/* Title & Comment */}
                <div className="mb-6 space-y-3">
                  {dataToShow?.reviewTitle && (
                    <h5 className="text-white text-base font-bold">
                      {dataToShow.reviewTitle}
                    </h5>
                  )}
                  <p className="text-white/90 text-sm leading-relaxed">
                    {dataToShow?.reviewText}
                  </p>
                </div>

                {/* Images */}
                {dataToShow?.images && dataToShow.images.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-6">
                    {dataToShow.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10 shrink-0"
                      >
                        <Image
                          src={img.imageUrl || img}
                          loading="lazy"
                          alt="review image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Header - Sticky */}
              <div className="p-8 pb-4 md:p-12 md:pb-6 flex-shrink-0">
                <h3 className="text-2xl font-bold mb-2 text-primary">
                  {isReview ? "Write a review" : "Rate your experience"}
                </h3>
                {isReview && (
                  <div className="flex items-center gap-1 mt-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={28}
                        className={`cursor-pointer transition-colors ${
                          rating >= star ? "fill-primary/90" : "text-third/40"
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <form
                className="flex flex-col flex-1 overflow-hidden"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* Scrollable Fields Container */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-8 md:px-12 pb-4 flex flex-col gap-6">
                  {/* Review Fields */}
                  <>
                    <div>
                      <label className="block text-sm mb-1 text-primary/80">
                        What's most important to know?
                      </label>
                      <textarea
                        placeholder="Enter your response"
                        rows={2}
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        className="w-full text-primary py-3 px-4 border rounded-md border-white/20 bg-transparent outline-none focus:border-white/60 transition-colors resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1 text-primary/80">
                        What should other customers know?
                      </label>
                      <textarea
                        placeholder="Enter your response"
                        rows={4}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full text-primary py-3 px-4 border rounded-md border-white/20 bg-transparent outline-none focus:border-white/60 transition-colors resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2 text-primary/80">
                        Share a video or photo (optional)
                      </label>
                      <div className="flex flex-col gap-4">
                        <div className="space-y-3">
                          {media.map((item, index) => (
                            <label
                              key={index}
                              className="relative flex flex-col items-center justify-center gap-1 border border-dashed border-third/50 rounded-xl h-24 sm:h-28 cursor-pointer hover:border-primary transition overflow-hidden group"
                            >
                              {item.preview ? (
                                <>
                                  <Image
                                    src={item.preview}
                                    alt="preview"
                                    fill
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Camera className="w-6 h-6 text-white" />
                                  </div>
                                </>
                              ) : (
                                <>
                                  <Camera className="w-5 h-5 text-third" />
                                  <span className="text-xs text-third px-2 text-center">
                                    {`Upload Image ${index + 1}`}
                                  </span>
                                </>
                              )}

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

                          {media.length < 4 && (
                            <div className="flex mt-2">
                              <Button
                                type="button"
                                variant="outlineSecondary"
                                className="text-sm text-primary font-medium"
                                onClick={addMoreImageInput}
                              >
                                <Plus className="w-4 mr-1 h-4" /> Add Media
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                </div>

                {/* ACTION BUTTONS - Sticky Footer */}
                <div className="p-4 md:p-6 flex gap-4 flex-shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    loading={submitting}
                    locked={
                      isReview
                        ? rating === 0 ||
                          (!reviewTitle.trim() && !reviewText.trim())
                        : !reviewText.trim()
                    }
                    className="w-full h-11 text-sm font-bold flex items-center justify-center gap-2"
                    onClick={handleSubmitReview}
                  >
                    {isReview ? "Submit Review" : "Submit Feedback"}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
