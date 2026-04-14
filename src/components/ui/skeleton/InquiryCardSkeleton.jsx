import SkeletonBox from "./SkeletonBox";

export default function InquiryCardSkeleton() {
  return (
    <div className="rounded-xl border border-third/40 p-4 lg:px-6 lg:py-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6 shadow-sm">
      <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-5 w-full">
        {/* IMAGE SKELETON */}
        <div className="w-full lg:w-48 h-48 lg:h-42 rounded-xl border border-third/30 bg-primary/5 shrink-0">
          <SkeletonBox className="w-full h-full" rounded="rounded-xl" />
        </div>

        {/* CONTENT SKELETON */}
        <div className="space-y-3 w-full flex-1">
          <div className="space-y-2">
            <SkeletonBox className="h-4 w-[40%]" rounded="rounded-md" />
            <SkeletonBox className="h-4 w-[60%]" rounded="rounded-md" />
            <SkeletonBox className="h-4 w-[50%]" rounded="rounded-md" />
            <SkeletonBox className="h-4 w-[30%]" rounded="rounded-md" />
            <SkeletonBox className="h-3 w-[20%]" rounded="rounded-md" />
          </div>
          
          <div className="flex gap-3 pt-2">
             <SkeletonBox className="h-9 w-24" rounded="rounded-lg" />
             <SkeletonBox className="h-9 w-24" rounded="rounded-lg" />
          </div>
        </div>
      </div>
      
      {/* STATUS PILL SKELETON */}
      <div className="hidden lg:flex items-center shrink-0">
        <SkeletonBox className="h-6 w-20" rounded="rounded-full" />
      </div>
    </div>
  );
}
