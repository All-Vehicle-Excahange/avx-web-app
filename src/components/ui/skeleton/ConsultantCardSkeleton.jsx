import SkeletonBox from "./SkeletonBox";

/**
 * ConsultantCardSkeleton — matches ConsultCard.jsx structure
 */
export default function ConsultantCardSkeleton() {
  return (
    <div className="rounded-2xl border border-third/20 overflow-hidden">
      {/* Banner Image */}
      <SkeletonBox className="w-full h-36 sm:h-44" rounded="rounded-none" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Logo + Name */}
        <div className="flex items-center gap-3 -mt-10 relative z-10">
          <SkeletonBox className="w-14 h-14 border-2 border-secondary shrink-0" rounded="rounded-full" />
          <div className="flex-1 pt-6 space-y-1.5">
            <SkeletonBox className="h-4 w-[70%]" rounded="rounded-md" />
            <SkeletonBox className="h-3 w-[50%]" rounded="rounded-md" />
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4">
          <SkeletonBox className="h-3.5 w-16" rounded="rounded-md" />
          <SkeletonBox className="h-3.5 w-20" rounded="rounded-md" />
          <SkeletonBox className="h-3.5 w-14" rounded="rounded-md" />
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          <SkeletonBox className="h-6 w-16" rounded="rounded-full" />
          <SkeletonBox className="h-6 w-20" rounded="rounded-full" />
          <SkeletonBox className="h-6 w-14" rounded="rounded-full" />
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between pt-2 border-t border-third/10">
          <SkeletonBox className="h-4 w-28" rounded="rounded-md" />
          <SkeletonBox className="h-9 w-24" rounded="rounded-lg" />
        </div>
      </div>
    </div>
  );
}
