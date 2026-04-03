import SkeletonBox from "./SkeletonBox";
import VehicleCardSkeleton from "./VehicleCardSkeleton";

/**
 * StoreFrontInventorySkeleton — matches Inventory.jsx layout
 * Filter chips + sort dropdown + 4-column vehicle card grid
 */
export default function StoreFrontInventorySkeleton() {
  return (
    <section className="w-full container mt-2! rounded-2xl p-6 space-y-6">
      {/* Filter bar + Sort */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {["w-14", "w-28", "w-24"].map((w, i) => (
            <SkeletonBox key={i} className={`h-9 ${w}`} rounded="rounded-full" />
          ))}
        </div>
        <SkeletonBox className="h-10 w-56" rounded="rounded-xl" />
      </div>

      {/* Vehicle Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <VehicleCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
