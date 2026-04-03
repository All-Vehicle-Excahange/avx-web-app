export default function SkeletonBox({ className = "", rounded = "rounded-lg" }) {
  return (
    <div
      className={`skeleton-shimmer ${rounded} ${className}`}
    />
  );
}
