import SkeletonBox from "./SkeletonBox";

/**
 * StoreFrontReviewSkeleton — matches Review.jsx layout
 * Left: rating summary + write-review form skeleton
 * Right: review cards skeleton
 */
export default function StoreFrontReviewSkeleton() {
  return (
    <section className="container mt-4 text-primary py-6 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 lg:gap-12">

        {/* LEFT — Rating Summary + Write Review */}
        <div className="space-y-6 lg:sticky lg:top-24 h-fit">
          {/* Rating Summary */}
          <div className="border border-third/20 rounded-2xl p-4 sm:p-6 space-y-4">
            <SkeletonBox className="h-5 w-36" rounded="rounded-md" />

            {/* Stars row */}
            <div className="flex items-center gap-2 mb-1">
              {[...Array(5)].map((_, i) => (
                <SkeletonBox key={i} className="w-4 h-4" rounded="rounded-sm" />
              ))}
              <SkeletonBox className="h-3.5 w-24" rounded="rounded-md" />
            </div>

            <SkeletonBox className="h-3 w-28" rounded="rounded-md" />

            {/* Bar chart rows */}
            <div className="space-y-2.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <SkeletonBox className="h-3 w-12" rounded="rounded-md" />
                  <SkeletonBox className="h-3 flex-1" rounded="rounded-full" />
                  <SkeletonBox className="h-3 w-10" rounded="rounded-md" />
                </div>
              ))}
            </div>
          </div>

          {/* Write Review */}
          <div className="border border-third/20 rounded-2xl p-4 sm:p-6 space-y-4">
            <SkeletonBox className="h-5 w-32" rounded="rounded-md" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <SkeletonBox key={i} className="w-6 h-6" rounded="rounded-sm" />
              ))}
            </div>
            <SkeletonBox className="h-28 w-full" rounded="rounded-xl" />
            <SkeletonBox className="h-10 w-full" rounded="rounded-xl" />
            <SkeletonBox className="h-10 w-full" rounded="rounded-xl" />
          </div>
        </div>

        {/* RIGHT — Review Cards */}
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-third/20 rounded-2xl p-4 sm:p-6 space-y-4">
              {/* User header */}
              <div className="flex items-center gap-3">
                <SkeletonBox className="w-10 h-10" rounded="rounded-full" />
                <SkeletonBox className="h-4 w-28" rounded="rounded-md" />
              </div>

              {/* Stars + title */}
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, j) => (
                  <SkeletonBox key={j} className="w-4 h-4" rounded="rounded-sm" />
                ))}
                <SkeletonBox className="h-3.5 w-32" rounded="rounded-md" />
              </div>

              {/* Date */}
              <SkeletonBox className="h-3 w-40" rounded="rounded-md" />

              {/* Review text */}
              <div className="space-y-2">
                <SkeletonBox className="h-3 w-full" rounded="rounded-md" />
                <SkeletonBox className="h-3 w-[85%]" rounded="rounded-md" />
                <SkeletonBox className="h-3 w-[65%]" rounded="rounded-md" />
              </div>

              {/* Images */}
              <div className="flex gap-3 pt-2">
                {[...Array(2)].map((_, j) => (
                  <SkeletonBox key={j} className="w-20 h-20 sm:w-28 sm:h-28" rounded="rounded-xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
