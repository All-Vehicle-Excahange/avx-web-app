import SkeletonBox from "./SkeletonBox";

export default function UserVehicleCardSkeleton() {
  return (
    <div className="group/card relative flex flex-row md:flex-col rounded-2xl overflow-hidden text-primary w-full border-2 border-third/60">
      
      {/* STATUS PILL SKELETON */}
      <div className="absolute top-2 left-2 z-30">
        <SkeletonBox className="h-5 w-12" rounded="rounded-full" />
      </div>

      <div className="relative z-10 flex flex-row md:flex-col w-full h-full">
        {/* IMAGE SKELETON */}
        <div className="relative w-40 sm:w-48 h-auto min-h-[160px] md:h-56 md:w-full shrink-0 p-2">
          <SkeletonBox className="w-full h-full" rounded="rounded-xl" />
        </div>

        {/* CONTENT SKELETON */}
        <div className="flex flex-col flex-1 p-3 md:p-4 space-y-3 justify-between">
          <div className="space-y-3">
            {/* TITLE + WISHLIST */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 space-y-1.5">
                <SkeletonBox className="h-4 w-full" rounded="rounded-md" />
                <SkeletonBox className="h-3 w-2/3" rounded="rounded-md" />
              </div>
              <SkeletonBox className="w-8 h-8" rounded="rounded-full" />
            </div>

            {/* SPECS */}
            <div className="flex flex-wrap gap-2">
              <SkeletonBox className="h-3 w-10" rounded="rounded-md" />
              <SkeletonBox className="h-3 w-16" rounded="rounded-md" />
              <SkeletonBox className="h-3 w-14" rounded="rounded-md" />
              <SkeletonBox className="h-3 w-12" rounded="rounded-md" />
            </div>

            {/* Verification Status */}
            <SkeletonBox className="h-4 w-20" rounded="rounded-full" />

            {/* Inquiries */}
            <div className="flex gap-4">
              <SkeletonBox className="h-3 w-16" rounded="rounded-md" />
              <SkeletonBox className="h-3 w-16" rounded="rounded-md" />
            </div>
          </div>

          {/* BOTTOM — price + actions */}
          <div className="mt-auto space-y-2 pt-2 border-t border-white/5">
            <div className="flex items-center justify-between">
              <SkeletonBox className="h-6 w-24" rounded="rounded-md" />
              <SkeletonBox className="h-8 w-8" rounded="rounded-md" />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <SkeletonBox className="h-8 flex-1" rounded="rounded-lg" />
              <SkeletonBox className="h-8 flex-1" rounded="rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
