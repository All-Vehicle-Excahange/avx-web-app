import SkeletonBox from "./SkeletonBox";
import StatCardSkeleton from "./StatCardSkeleton";

export default function AnalyticsSkeleton({ isBasic }) {
  return (
    <div className="space-y-6">
      {/* Top Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(4)].map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Traffic & Conversion Skeleton */}
      <div className="border border-third/20 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <SkeletonBox className="h-5 w-32" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <SkeletonBox className="h-3 w-24" />
                <SkeletonBox className="h-3 w-8" />
              </div>
              <SkeletonBox className="h-2 w-full" rounded="rounded-full" />
            </div>
          ))}
        </div>
        <SkeletonBox className="h-48 w-full rounded-xl" />
      </div>

      {/* Performance Overview Skeleton */}
      <div className="border border-third/20 rounded-xl p-6 space-y-6">
        <SkeletonBox className="h-5 w-40" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <SkeletonBox className="h-3 w-12" />
              <SkeletonBox className="flex-1 h-3" rounded="rounded-full" />
              <SkeletonBox className="h-3 w-20" />
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-third/20">
          <SkeletonBox className="h-3 w-full" />
        </div>
      </div>

      {/* Demand Grid Skeleton */}
      <div className={`grid gap-6 ${isBasic ? "grid-cols-1" : "md:grid-cols-2"}`}>
        <div className="border border-third/20 rounded-xl p-6 space-y-6">
          <SkeletonBox className="h-5 w-36" />
          <div className="space-y-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <SkeletonBox className="h-3 w-20" />
                  <SkeletonBox className="h-3 w-10" />
                </div>
                <SkeletonBox className="h-2 w-full" rounded="rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {!isBasic && (
          <div className="border border-third/20 rounded-xl p-6 space-y-6">
            <SkeletonBox className="h-5 w-36" />
            <div className="space-y-5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <SkeletonBox className="h-3 w-20" />
                    <SkeletonBox className="h-3 w-10" />
                  </div>
                  <SkeletonBox className="h-2 w-full" rounded="rounded-full" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Key Insights Skeleton */}
      <div className="border border-primary/20 rounded-xl p-7 space-y-6">
        <SkeletonBox className="h-6 w-32" />
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <SkeletonBox className="h-5 w-5 shrink-0" rounded="rounded-md" />
              <div className="flex-1 space-y-2">
                <SkeletonBox className="h-3 w-full" />
                <SkeletonBox className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
