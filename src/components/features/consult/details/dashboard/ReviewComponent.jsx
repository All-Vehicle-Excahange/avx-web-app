import {
  Star,
  MessageSquare,
  ThumbsUp,
  MapPin,
  Calendar,
  Clock,
  User,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/button";
import CustomSelect from "@/components/ui/custom-select";
import {
  getConsultationReviewSummary,
  getAllConsultationReviews,
  replyToReview,
  updateReviewReply,
  deleteReviewReply,
} from "@/services/consult-review.service";
import { toast } from "react-toastify";
import { SkeletonBox } from "@/components/ui/skeleton";

function ReviewComponent() {
  const [range, setRange] = useState("7");
  const rangeOptions = [
    { label: "7 days", value: "7" },
    { label: "30 days", value: "30" },
    { label: "90 days", value: "90" },
  ];

  // API STATE
  const [summary, setSummary] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  // Fetch Summary
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setIsLoadingSummary(true);
        const daysMap = {
          7: "LAST_7_DAYS",
          30: "LAST_30_DAYS",
          90: "LAST_90_DAYS",
        };
        const response = await getConsultationReviewSummary(daysMap[range]);
        setSummary(response.data);
      } catch (error) {
        toast.error("Failed to fetch review summary");
      } finally {
        setIsLoadingSummary(false);
      }
    };
    fetchSummary();
  }, [range]);

  // Reset page when range changes to fetch fresh data for the new period
  useEffect(() => {
    setPage(0);
  }, [range]);

  // Fetch Reviews (Paginated)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (page === 0) setIsLoadingReviews(true);
        const daysMap = {
          7: "LAST_7_DAYS",
          30: "LAST_30_DAYS",
          90: "LAST_90_DAYS",
        };
        const response = await getAllConsultationReviews({
          pageNo: page,
          size: 3,
          daysRange: daysMap[range],
        });

        // The API returns { data: [...], pageResponse: { totalPages: X, ... } }
        const reviewsData = response.data || [];
        const pageInfo = response.pageResponse || {};

        if (page === 0) {
          setReviews(reviewsData);
        } else {
          setReviews((prev) => [...prev, ...reviewsData]);
        }

        setIsLastPage(
          (pageInfo.currentPage || 0) >= (pageInfo.totalPages || 0),
        );
      } catch (error) {
        toast.error("Failed to fetch reviews");
      } finally {
        setIsLoadingReviews(false);
      }
    };
    fetchReviews();
  }, [page, range]);

  const handleReplySubmit = async (review) => {
    if (!replyText.trim()) return;
    try {
      setIsSubmittingReply(true);
      const isEdit = !!review.consultReply;

      if (isEdit) {
        await updateReviewReply(review.id, replyText);
        toast.success("Reply updated successfully");
      } else {
        await replyToReview(review.id, replyText);
        toast.success("Reply posted successfully");
      }

      // Update the review in local state so UI reflects immediately
      setReviews((prev) =>
        prev.map((r) =>
          r.id === review.id
            ? { ...r, consultReply: replyText, isConsultReplyEdited: isEdit }
            : r,
        ),
      );
      setReplyText("");
      setReplyingTo(null);
    } catch (error) {
      toast.error("Failed to submit reply");
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleDeleteReply = async (reviewId) => {
    try {
      await deleteReviewReply(reviewId);
      toast.success("Reply removed successfully");
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId
            ? { ...r, consultReply: null, isConsultReplyEdited: false }
            : r,
        ),
      );
    } catch (error) {
      toast.error("Failed to remove reply");
    }
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

        {isLoadingSummary ? (
          <div className="space-y-8 animate-pulse">
            <div className="space-y-2">
              <SkeletonBox className="h-8 w-40" />
              <SkeletonBox className="h-4 w-32" />
            </div>
            
            <div className="space-y-4 max-w-xl">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <SkeletonBox className="h-4 w-12" />
                  <SkeletonBox className="h-2 flex-1" rounded="rounded-full" />
                  <SkeletonBox className="h-4 w-10" />
                </div>
              ))}
            </div>
          </div>
        ) : (
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
                        star <= Math.round(summary?.averageRating || 0)
                          ? "fill-white text-white"
                          : "text-white/20"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-white/90">
                  {summary?.averageRating?.toFixed(1) || "0.0"} out of 5
                </span>
              </div>
              <p className="text-sm text-white/40">
                {(summary?.totalReviews || 0).toLocaleString()} global ratings
              </p>
            </div>

            {/* Distribution Bars */}
            <div className="space-y-3 max-w-xl">
              {[
                { label: "5 star", percent: summary?.fiveStarPercentage || 0 },
                { label: "4 star", percent: summary?.fourStarPercentage || 0 },
                { label: "3 star", percent: summary?.threeStarPercentage || 0 },
                { label: "2 star", percent: summary?.twoStarPercentage || 0 },
                { label: "1 star", percent: summary?.oneStarPercentage || 0 },
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
                    {Math.round(item.percent)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* REVIEWS LIST */}
      <div className="space-y-6">
        <div className="grid gap-6">
          {isLoadingReviews && page === 0 ? (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-white/5 rounded-3xl p-6 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <SkeletonBox className="w-10 h-10" rounded="rounded-full" />
                  <SkeletonBox className="h-4 w-32" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <SkeletonBox className="h-4 w-24" />
                    <SkeletonBox className="h-4 w-20" />
                  </div>
                  <SkeletonBox className="h-3 w-40" />
                  <SkeletonBox className="h-5 w-48 mt-2" />
                  <div className="space-y-2">
                    <SkeletonBox className="h-3 w-full" />
                    <SkeletonBox className="h-3 w-[90%]" />
                    <SkeletonBox className="h-3 w-[70%]" />
                  </div>
                </div>
              </div>
            ))
          ) : reviews.length === 0 ? (
            <div className="text-center py-20 border border-white/10 rounded-3xl">
              <MessageSquare className="mx-auto text-white/20 mb-4" size={48} />
              <p className="text-third">No reviews found for the last {range} days.</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="border border-third/30 rounded-3xl p-6 hover:border-third/50 transition-all duration-300 group"
              >
                {/* USER INFO */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-medium text-sm border border-white/10">
                    {review.reviewedBy?.firstname?.[0] || <User size={16} />}
                  </div>
                  <h4 className="font-semibold text-white text-base">
                    {review.reviewedBy?.firstname} {review.reviewedBy?.lastname}
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
                    {review.rating >= 4 ? "Outstanding" : "Good"}
                  </span>
                </div>

                {/* DATE */}
                <p className="text-white/40 text-[11px] mb-4">
                  Reviewed on{" "}
                  {new Date(review.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                {/* COMMENT */}
                <div className="mb-6">
                  <p className="text-white/90 text-sm leading-relaxed">
                    {review.reviewText}
                  </p>
                </div>

                {/* MEDIA */}
                {review.images && review.images.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-4">
                    {review.images.map((img) => (
                      <div
                        key={img.id}
                        onClick={() => setSelectedImage(img.imageUrl)}
                        className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1 overflow-hidden relative group/media cursor-pointer hover:border-white/20 transition shadow-lg"
                      >
                        <Image
                          src={img.imageUrl}
                          alt="Review Upload"
                          fill
                          className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                            View
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* EXISTING REPLY */}
                {review.consultReply && (
                  <div className="mt-6 flex justify-start">
                    <div className="flex gap-4 p-5 bg-white/2 border border-white/5 rounded-2xl relative overflow-hidden w-full group/reply">
                      {/* Consultant Avatar */}
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm border border-primary/20 shrink-0">
                        <User size={16} />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white tracking-wide">
                              Your Response
                            </span>
                            {review.isConsultReplyEdited && (
                              <span className="text-[9px] text-white/30">(edited)</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover/reply:opacity-100 transition-all duration-300">
                            <button
                              onClick={() => {
                                setReplyingTo(review.id);
                                setReplyText(review.consultReply);
                              }}
                              className="border border-primary rounded-full px-6 py-2 text-sm font-bold hover:bg-primary hover:text-secondary transition-all duration-300"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteReply(review.id)}
                              className="w-9 h-9 rounded-full border border-rose-500/40 flex items-center justify-center text-rose-400 hover:bg-rose-500 hover:text-white transition-all duration-300"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed italic font-serif">
                          {review.consultReply}
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
                          className="w-full bg-white/2 border border-white/10 rounded-2xl p-5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all min-h-[120px] resize-none leading-relaxed shadow-inner"
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
                          className=""
                          disabled={isSubmittingReply}
                          onClick={() => handleReplySubmit(review)}
                        >
                          {isSubmittingReply
                            ? "Submitting..."
                            : review.consultReply
                              ? "Update Response"
                              : "Publish Response"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      {!review.consultReply && (
                        <button
                          onClick={() => {
                            setReplyingTo(review.id);
                            setReplyText("");
                          }}
                          className="text-xs font-bold text-white/30 hover:text-primary transition flex items-center gap-2 group cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition">
                            <MessageSquare size={14} />
                          </div>
                          Write a public response
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* LOAD MORE BUTTON */}
        {!isLastPage && reviews.length > 0 && (
          <div className="flex justify-end mt-4">
            <Button
              variant="outlineSecondary"
              className="text-xs font-bold border-white/10"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Load More Reviews
            </Button>
          </div>
        )}
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-1200 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
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
