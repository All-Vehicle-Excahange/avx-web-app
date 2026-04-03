import SkeletonBox from "./SkeletonBox";

/**
 * VehicleCardSkeleton — pixel-perfect match of VehicleCard.jsx
 * Mobile: horizontal (image left, content right)
 * Desktop: vertical (image top, content bottom)
 */
export default function VehicleCardSkeleton() {
  return (
    <div
      className="
        group/card relative flex flex-row md:flex-col
        rounded-2xl overflow-hidden
        text-primary
        md:max-w-sm w-full sm:w-[392px]
        border-2 border-third/20
        h-full md:h-[500px]"
    >
      <div className="relative z-10 flex flex-row md:flex-col w-full h-full">
        {/* IMAGE SKELETON */}
        <div className="relative w-42 sm:w-40 min-h-45 md:min-h-0 md:h-62 md:w-full shrink-0 p-2">
          <SkeletonBox className="w-full h-full" rounded="rounded-xl" />
        </div>

        {/* CONTENT SKELETON */}
        <div className="flex flex-col flex-1 p-2.5 md:p-4 space-y-2 md:space-y-4 justify-between h-full relative">
          {/* TITLE + META */}
          <div className="flex flex-col gap-2">
            <div className="min-h-[40px] md:min-h-[56px] flex flex-col gap-1.5">
              <SkeletonBox className="h-4 md:h-5 w-[90%]" rounded="rounded-md" />
              <SkeletonBox className="h-4 md:h-5 w-[65%]" rounded="rounded-md" />
            </div>

            {/* USER */}
            <div className="flex items-center gap-1.5 mt-1">
              <SkeletonBox className="w-3.5 h-3.5" rounded="rounded-full" />
              <SkeletonBox className="h-3 w-28" rounded="rounded-md" />
            </div>

            {/* LOCATION */}
            <div className="flex items-center gap-1.5 mt-1">
              <SkeletonBox className="w-3.5 h-3.5" rounded="rounded-full" />
              <SkeletonBox className="h-3 w-24" rounded="rounded-md" />
            </div>
          </div>

          {/* SPECS */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-2 md:gap-x-4 gap-y-1.5">
            <SkeletonBox className="h-3.5 w-12" rounded="rounded-md" />
            <SkeletonBox className="h-3.5 w-20" rounded="rounded-md" />
            <SkeletonBox className="h-3.5 w-16" rounded="rounded-md" />
            <SkeletonBox className="h-3.5 w-14" rounded="rounded-md" />
            <SkeletonBox className="h-3.5 w-10" rounded="rounded-md" />
          </div>

          {/* PRICE + BUTTON */}
          <div className="flex items-center justify-end md:justify-between gap-2 mt-auto">
            <SkeletonBox className="h-5 md:h-6 w-24" rounded="rounded-md" />
            <div className="hidden md:block">
              <SkeletonBox className="h-9 w-28" rounded="rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
