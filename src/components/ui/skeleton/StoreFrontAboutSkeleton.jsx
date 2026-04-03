import SkeletonBox from "./SkeletonBox";

/**
 * StoreFrontAboutSkeleton — matches the themed About Us / Why Buy Here sections
 * Generic section skeleton with hero image, heading, description blocks, and stats
 */
export default function StoreFrontAboutSkeleton() {
  return (
    <section className="w-full container rounded-2xl p-6 space-y-8">
      {/* Hero image block */}
      <SkeletonBox className="w-full h-48 sm:h-64" rounded="rounded-xl" />

      {/* About Us heading + text */}
      <div className="space-y-4">
        <SkeletonBox className="h-6 w-48" rounded="rounded-md" />
        <div className="space-y-2">
          <SkeletonBox className="h-3.5 w-full" rounded="rounded-md" />
          <SkeletonBox className="h-3.5 w-[90%]" rounded="rounded-md" />
          <SkeletonBox className="h-3.5 w-[75%]" rounded="rounded-md" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border border-third/10 rounded-xl p-4 space-y-2 text-center">
            <SkeletonBox className="h-8 w-16 mx-auto" rounded="rounded-md" />
            <SkeletonBox className="h-3 w-20 mx-auto" rounded="rounded-md" />
          </div>
        ))}
      </div>

      {/* Mission / Vision blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <SkeletonBox className="h-5 w-28" rounded="rounded-md" />
          <SkeletonBox className="h-3.5 w-full" rounded="rounded-md" />
          <SkeletonBox className="h-3.5 w-[85%]" rounded="rounded-md" />
          <SkeletonBox className="h-3.5 w-[70%]" rounded="rounded-md" />
        </div>
        <SkeletonBox className="h-44" rounded="rounded-xl" />
      </div>

      {/* Services tags */}
      <div className="space-y-3">
        <SkeletonBox className="h-5 w-24" rounded="rounded-md" />
        <div className="flex flex-wrap gap-3">
          {[...Array(5)].map((_, i) => (
            <SkeletonBox key={i} className="h-8 w-24" rounded="rounded-full" />
          ))}
        </div>
      </div>
    </section>
  );
}
