import SkeletonBox from "./SkeletonBox";
import SkeletonText from "./SkeletonText";

export default function SkeletonCard({ className = "" }) {
  return (
    <div className={`rounded-2xl border-2 border-third/20 overflow-hidden ${className}`}>
      {/* Image */}
      <SkeletonBox className="w-full h-48" rounded="rounded-none" />

      {/* Content */}
      <div className="p-4 space-y-3">
        <SkeletonText lines={2} />
        <SkeletonBox className="h-5 w-24" rounded="rounded-md" />
        <SkeletonBox className="h-9 w-28" rounded="rounded-lg" />
      </div>
    </div>
  );
}
