import SkeletonBox from "./SkeletonBox";

export default function TopPerformingCardSkeleton() {
  return (
    <div className="relative rounded-2xl border border-third/40 p-4 lg:px-5 lg:py-4 flex flex-col sm:flex-row items-start gap-4 shadow-sm">
      {/* IMAGE SKELETON */}
      <div className="relative w-full sm:w-36 h-26 rounded-xl overflow-hidden border border-third/30 bg-primary/5 shrink-0">
        <SkeletonBox className="w-full h-full" rounded="rounded-xl" />
      </div>

      {/* CONTENT SKELETON */}
      <div className="flex-1 space-y-3 w-full pr-6">
        <SkeletonBox className="h-4 w-3/4" rounded="rounded-md" />
        <SkeletonBox className="h-3 w-1/2" rounded="rounded-md" />
        <SkeletonBox className="h-3 w-1/3" rounded="rounded-md" />
        <SkeletonBox className="h-3 w-1/4" rounded="rounded-md" />
      </div>
    </div>
  );
}
