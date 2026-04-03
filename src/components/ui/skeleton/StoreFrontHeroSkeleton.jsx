import SkeletonBox from "./SkeletonBox";

/**
 * StoreFrontHeroSkeleton — matches StoreFrontHeroSection.jsx layout
 * Banner + avatar + name + stats grid + services + buttons
 */
export default function StoreFrontHeroSkeleton() {
  return (
    <section className="w-full max-w-[1480px] mt-10 mx-auto border border-third/40 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-sm">
      {/* Banner */}
      <SkeletonBox className="w-full h-54 md:h-80" rounded="rounded-none" />

      {/* Content Area */}
      <div className="px-6 md:px-10 py-4 relative">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT COLUMN — Avatar + Subscribe */}
          <div className="flex flex-col items-center -mt-20 z-30 w-full lg:w-48 shrink-0">
            <SkeletonBox className="w-42 h-42 border-4 border-secondary" rounded="rounded-full" />
            <div className="mt-6 w-full">
              <SkeletonBox className="h-10 w-full" rounded="rounded-full" />
            </div>
          </div>

          {/* CENTER COLUMN — Name + Location + Stats */}
          <div className="flex-1 space-y-4 pt-2">
            <div>
              <SkeletonBox className="h-8 w-[60%]" rounded="rounded-md" />
              <div className="flex items-center gap-1.5 mt-3">
                <SkeletonBox className="w-4 h-4" rounded="rounded-full" />
                <SkeletonBox className="h-3.5 w-48" rounded="rounded-md" />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-y-5 gap-x-6 py-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <SkeletonBox className="w-9 h-9" rounded="rounded-lg" />
                  <div className="space-y-1.5">
                    <SkeletonBox className="h-2.5 w-16" rounded="rounded-md" />
                    <SkeletonBox className="h-3.5 w-12" rounded="rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — Services + Actions */}
          <div className="w-full lg:w-80 space-y-6 pt-2">
            <div className="space-y-3">
              <SkeletonBox className="h-3 w-28" rounded="rounded-md" />
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <SkeletonBox key={i} className="h-7 w-20" rounded="rounded-full" />
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-15">
              <SkeletonBox className="h-9 w-28" rounded="rounded-lg" />
              <SkeletonBox className="h-9 w-32" rounded="rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
