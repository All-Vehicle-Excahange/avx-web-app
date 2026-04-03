import SkeletonBox from "./SkeletonBox";

export default function SkeletonAvatar({ size = "w-10 h-10", className = "" }) {
  return <SkeletonBox className={`${size} ${className}`} rounded="rounded-full" />;
}
