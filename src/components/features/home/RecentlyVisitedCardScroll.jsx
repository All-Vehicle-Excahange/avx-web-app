"use client";

export default function RecentlyVisitedCard({ data }) {
  return (
    <div
      className="
        relative
        bg-primary/10
        rounded-lg
        shadow-sm
        transition-all duration-300
        overflow-hidden
        border border-primary/20
        flex-shrink-0
        w-[220px]
      "
    >
      {/* IMAGE */}
      <div className="relative h-38 overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="
            w-full h-full object-cover
            transition-transform duration-500 hover:scale-110
          "
        />
      </div>

      {/* CONTENT */}
      <div className="p-2">
        <h3 className="text-xs md:text-[15px] font-bold leading-tight tracking-wide line-clamp-2 mb-1">
          {data.title}
        </h3>

        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-primary">
            ₹{data.price}
          </div>
          
          
        </div>
      </div>

      {/* HOVER OVERLAY */}
      <div className="absolute inset-0 bg-blue-600/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
