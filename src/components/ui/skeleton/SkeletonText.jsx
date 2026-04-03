import SkeletonBox from "./SkeletonBox";

const widthMap = [
  "w-full",
  "w-[85%]",
  "w-[70%]",
  "w-[60%]",
  "w-[90%]",
  "w-[75%]",
];

export default function SkeletonText({ lines = 3, className = "" }) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBox
          key={i}
          className={`h-3.5 ${widthMap[i % widthMap.length]}`}
          rounded="rounded-md"
        />
      ))}
    </div>
  );
}
