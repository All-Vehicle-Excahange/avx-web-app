import SkeletonBox from "./SkeletonBox";

/**
 * CompareSkeleton — matches VehicleComparePopup.jsx inner content
 * Shows shimmer placeholders for the two vehicle selection boxes + VS badge
 */

function VehicleBoxSkeleton() {
  return (
    <div className="border border-primary/20 rounded-xl p-2 sm:p-4 flex flex-col h-full bg-secondary/50 min-h-[220px] sm:min-h-[300px]">
      {/* Image */}
      <SkeletonBox className="w-full h-20 sm:h-40 mb-2 sm:mb-4 shrink-0" rounded="rounded-lg" />

      {/* Title */}
      <div className="min-h-[32px] sm:min-h-[48px] mb-1 sm:mb-2 space-y-1.5">
        <SkeletonBox className="h-3 sm:h-4 w-[80%]" rounded="rounded-md" />
        <SkeletonBox className="h-3 sm:h-4 w-[55%]" rounded="rounded-md" />
      </div>

      {/* Price */}
      <SkeletonBox className="h-4 sm:h-6 w-28 mb-2 sm:mb-4" rounded="rounded-md" />

      {/* Specs */}
      <div className="space-y-1 sm:space-y-3 mt-auto pt-2 sm:pt-4 border-t border-primary/10">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between">
            <SkeletonBox className="h-2.5 sm:h-3.5 w-12" rounded="rounded-md" />
            <SkeletonBox className="h-2.5 sm:h-3.5 w-16" rounded="rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CompareSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-6 relative mb-4 sm:mb-6">
      <VehicleBoxSkeleton />

      {/* VS Badge */}
      <div className="absolute left-1/2 top-[40%] sm:top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-10 sm:h-10 bg-primary/20 rounded-full flex items-center justify-center z-10 border-2 sm:border-[3px] border-secondary">
        <SkeletonBox className="w-3 h-2 sm:w-5 sm:h-3" rounded="rounded-sm" />
      </div>

      <VehicleBoxSkeleton />
    </div>
  );
}
