import SkeletonBox from "./SkeletonBox";

/**
 * VehicleDetailsSkeleton — mirrors VehiclDetail.jsx layout
 * Shows while vehicleOverview & vehicleSummary are being fetched.
 */
export default function VehicleDetailsSkeleton() {
  return (
    <>
      {/* HEADER SKELETON */}
      <section className="relative">
        <div className="lg:sticky top-16 md:pb-4 z-40">
          <header className="-mx-4 sm:mx-0 mt-4 sm:mt-0 pt-5 pb-3 sm:pt-4 sm:pb-4 mb-4 sm:mb-0 bg-[linear-gradient(90deg,#313131_0%,#1a1919_45%,#000000_100%)] flex flex-col gap-1.5 shadow-sm">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 sm:gap-1.5 flex-wrap px-4 sm:px-0">
              <SkeletonBox className="h-2.5 w-8 sm:w-10" rounded="rounded-md" />
              <SkeletonBox className="h-2.5 w-2" rounded="rounded-full" />
              <SkeletonBox className="h-2.5 w-12 sm:w-14" rounded="rounded-md" />
              <SkeletonBox className="h-2.5 w-2" rounded="rounded-full" />
              <SkeletonBox className="h-2.5 w-20 sm:w-24" rounded="rounded-md" />
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-1 px-4 sm:px-0">
              {/* LEFT SIDE: Title & Badges */}
              <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                <div className="block w-full">
                  {/* Mobile Share */}
                  <div className="sm:hidden float-right ml-3 mb-1 mt-0.5">
                    <SkeletonBox className="h-8 w-8 border border-third/20 shadow-sm" rounded="rounded-full" />
                  </div>
                  {/* Title */}
                  <SkeletonBox className="h-6 sm:h-8 w-[85%] sm:w-[70%] inline-block align-top mt-1" rounded="rounded-md" />
                </div>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2.5 mt-0.5">
                  <SkeletonBox className="h-7 w-40 border border-third/10" rounded="rounded-md" />
                  <SkeletonBox className="h-7 w-12" rounded="rounded-md" />
                </div>
              </div>

              {/* RIGHT SIDE: Price & Share */}
              <div className="hidden sm:flex items-center justify-end gap-5">
                <div className="hidden lg:flex flex-col items-end justify-center text-right pl-4">
                  <div className="relative flex flex-col items-end bg-gradient-to-b from-white/5 to-transparent border border-third/20 rounded-xl px-4 py-2.5 shadow-lg">
                    <div className="flex flex-col items-end gap-1">
                      <SkeletonBox className="h-8 sm:h-10 w-32 sm:w-40" rounded="rounded-md" />
                    </div>
                  </div>
                </div>
                {/* Desktop Share */}
                <SkeletonBox className="h-10 w-10 border border-third/20 shadow-sm shrink-0" rounded="rounded-full" />
              </div>
            </div>
          </header>
        </div>

        {/* MAIN GRID */}
        <section className="grid grid-cols-1 xl:grid-cols-[2.2fr_1fr] gap-6 items-start">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6 min-w-0">
            {/* Image Gallery */}
            <section className="w-full rounded-xl p-4 border border-third/20">
              <SkeletonBox className="w-full aspect-video" rounded="rounded-lg" />
              {/* Thumbnails */}
              <div className="mt-4 flex gap-3 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <SkeletonBox key={i} className="w-20 h-14 sm:w-24 sm:h-16 shrink-0" rounded="rounded-md" />
                ))}
              </div>
            </section>

            {/* Tabs (Sticky on mobile) */}
            <div className="sticky top-[64px] lg:relative lg:top-0 lg:z-auto z-40 bg-transparent backdrop-blur-lg border-b border-third/40">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-6 px-2 min-w-max">
                  {["w-16", "w-24", "w-18", "w-20"].map((w, i) => (
                    <SkeletonBox key={i} className={`h-4 ${w} my-4`} rounded="rounded-md" />
                  ))}
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <div className="space-y-4 p-2">
              <SkeletonBox className="h-5 w-36" rounded="rounded-md" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2 p-3 rounded-lg border border-third/10">
                    <SkeletonBox className="h-3 w-16" rounded="rounded-md" />
                    <SkeletonBox className="h-4 w-24" rounded="rounded-md" />
                  </div>
                ))}
              </div>
            </div>

            {/* Specification Section */}
            <div className="space-y-3 p-2">
              <SkeletonBox className="h-5 w-40" rounded="rounded-md" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-third/10">
                  <SkeletonBox className="h-3.5 w-28" rounded="rounded-md" />
                  <SkeletonBox className="h-3.5 w-20" rounded="rounded-md" />
                </div>
              ))}
            </div>

            {/* Condition Section */}
            <div className="space-y-3 p-2">
              <SkeletonBox className="h-5 w-32" rounded="rounded-md" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-third/10">
                  <SkeletonBox className="h-3.5 w-24" rounded="rounded-md" />
                  <SkeletonBox className="h-3.5 w-16" rounded="rounded-md" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-[102px] h-fit">
            {/* Summary Card */}
            <div className="rounded-xl border border-third/20 p-5 space-y-4">
              <SkeletonBox className="h-6 w-32" rounded="rounded-md" />
              <SkeletonBox className="h-8 w-40" rounded="rounded-md" />
              <div className="space-y-3 pt-3 border-t border-third/10">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <SkeletonBox className="h-3.5 w-20" rounded="rounded-md" />
                    <SkeletonBox className="h-3.5 w-24" rounded="rounded-md" />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-3">
                <SkeletonBox className="h-10 flex-1" rounded="rounded-lg" />
                <SkeletonBox className="h-10 flex-1" rounded="rounded-lg" />
              </div>
            </div>

            {/* Testimonials Card */}
            <div className="rounded-xl border border-third/20 p-5 space-y-3">
              <SkeletonBox className="h-5 w-28" rounded="rounded-md" />
              {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-2 p-3 rounded-lg border border-third/10">
                  <div className="flex items-center gap-2">
                    <SkeletonBox className="w-8 h-8" rounded="rounded-full" />
                    <SkeletonBox className="h-3.5 w-24" rounded="rounded-md" />
                  </div>
                  <SkeletonBox className="h-3 w-full" rounded="rounded-md" />
                  <SkeletonBox className="h-3 w-[80%]" rounded="rounded-md" />
                </div>
              ))}
            </div>

            {/* Special Offer */}
            <SkeletonBox className="h-28 w-full" rounded="rounded-xl" />
          </aside>
        </section>
      </section>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-secondary border-t border-third/20 p-3 px-4 flex items-center justify-between lg:hidden backdrop-blur-md bg-secondary/95 shadow-[0_-10px_25px_rgba(0,0,0,0.15)]">
        <div className="flex flex-col gap-1.5">
          <SkeletonBox className="h-2 w-8" rounded="rounded-full" />
          <SkeletonBox className="h-5 w-24" rounded="rounded-md" />
        </div>

        <div className="flex gap-2">
          <SkeletonBox className="h-9 w-28" rounded="rounded-lg" />
          <SkeletonBox className="h-9 w-16" rounded="rounded-lg" />
        </div>
      </div>
    </>
  );
}
