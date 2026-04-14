import SkeletonBox from "./SkeletonBox";

export default function StatCardSkeleton() {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-third/30 p-3 sm:p-4 transition min-w-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 border border-primary/20">
          <SkeletonBox className="w-full h-full" rounded="rounded-lg" />
        </div>

        <div className="flex flex-col gap-1.5 min-w-0">
          <SkeletonBox className="h-2.5 w-16" rounded="rounded-md" />
          <SkeletonBox className="h-4 w-12" rounded="rounded-md" />
        </div>
      </div>
    </div>
  );
}
