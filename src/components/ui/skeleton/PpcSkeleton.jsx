import SkeletonBox from "./SkeletonBox";
import StatCardSkeleton from "./StatCardSkeleton";

export default function PpcSkeleton() {
  return (
    <section className="w-full space-y-8 relative animate-pulse">
      {/* HEADER SKELETON */}
      <div className="flex flex-col lg:flex-row items-start gap-5 justify-between">
        <div className="space-y-2">
          <SkeletonBox className="h-7 w-56" rounded="rounded-md" />
          <SkeletonBox className="h-4 w-40" rounded="rounded-md" />
        </div>
        <SkeletonBox className="h-9 w-40" rounded="rounded-lg" />
      </div>

      {/* AD SUMMARY SKELETON */}
      <div className="rounded-xl bg-primary/5 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <SkeletonBox className="h-5 w-44" rounded="rounded-md" />
            <SkeletonBox className="h-3.5 w-60" rounded="rounded-md" />
          </div>
          <div className="w-full sm:w-72">
            <SkeletonBox className="h-10 w-full" rounded="rounded-lg" />
          </div>
        </div>

        {/* STAT CARDS SKELETON */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* RECENT ADS SKELETON */}
      <div className="rounded-xl bg-primary/5 p-6 space-y-6">
        {/* Filter Controls Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <SkeletonBox className="h-6 w-28" rounded="rounded-md" />
          <div className="flex gap-2 overflow-x-auto py-1">
            {[...Array(6)].map((_, i) => (
              <SkeletonBox key={i} className="h-8 w-20 shrink-0" rounded="rounded-full" />
            ))}
          </div>
        </div>

        {/* Desktop Table View Skeleton */}
        <div className="hidden md:block overflow-x-auto border border-white/10 rounded-2xl bg-secondary/30 backdrop-blur-sm p-4 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <SkeletonBox className="h-4 w-8" />
            <SkeletonBox className="h-4 w-28" />
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-4 w-16" />
            <SkeletonBox className="h-4 w-20" />
            <SkeletonBox className="h-4 w-20" />
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-4 w-16" />
            <SkeletonBox className="h-4 w-16" />
            <SkeletonBox className="h-4 w-16" />
          </div>
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
              <SkeletonBox className="h-5 w-9" rounded="rounded-full" />
              <SkeletonBox className="h-4 w-36" rounded="rounded-md" />
              <SkeletonBox className="h-4 w-24" rounded="rounded-full" />
              <SkeletonBox className="h-6 w-16" rounded="rounded-md" />
              <SkeletonBox className="h-4 w-16" rounded="rounded-md" />
              <SkeletonBox className="h-4 w-20" rounded="rounded-md" />
              <SkeletonBox className="h-4 w-12" rounded="rounded-md" />
              <SkeletonBox className="h-4 w-10" rounded="rounded-md" />
              <SkeletonBox className="h-4 w-10" rounded="rounded-md" />
              <SkeletonBox className="h-6 w-16" rounded="rounded-md" />
            </div>
          ))}
        </div>

        {/* Mobile Card Grid Skeleton */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="bg-primary/5 border border-third/15 rounded-xl p-4 space-y-4"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-2 flex-1">
                  <SkeletonBox className="h-4 w-3/4" rounded="rounded-md" />
                  <div className="flex gap-2">
                    <SkeletonBox className="h-3 w-14" rounded="rounded-full" />
                    <SkeletonBox className="h-3 w-16" rounded="rounded-full" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <SkeletonBox className="h-5 w-9" rounded="rounded-full" />
                  <SkeletonBox className="h-5 w-14" rounded="rounded-md" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 bg-white/2 rounded-lg p-2.5 text-center">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-1.5">
                    <SkeletonBox className="h-2.5 w-12 mx-auto" rounded="rounded-md" />
                    <SkeletonBox className="h-3.5 w-8 mx-auto" rounded="rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
