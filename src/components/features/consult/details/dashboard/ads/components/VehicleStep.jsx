import React, { useState } from "react";
import { Search, Car } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSellerInventoryInfiniteQuery } from "@/queries/user.queries";
import Button from "@/components/ui/button";

export default function VehicleStep({ selected, onChange }) {
  const [search, setSearch] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...getSellerInventoryInfiniteQuery({
      size: 10,
      listingStatus: "LIVE",
    }),
  });

  const vehicles = data?.pages?.flatMap((page) => page?.data || []) || [];

  const mappedVehicles = vehicles.map((v) => ({
    id: v.id,
    name: `${v.makerName || "-"} ${v.modelName || "-"} ${v.variantName || ""}`,
    meta: `${v.yearOfMfg || "-"} · ${v.fuelType || "-"} · ${v.transmissionType || "-"}`,
    price: v.price ? new Intl.NumberFormat("en-IN").format(v.price) : "-",
    displayPrice: v.price ? `₹${(v.price / 100000).toFixed(1)}L` : "-",
    status: v.listingStatus?.toLowerCase() || "draft",
    raw: v,
  }));

  const filteredVehicles = mappedVehicles.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedVehicles = React.useMemo(() => {
    if (!selected?.id) return filteredVehicles;
    return [...filteredVehicles].sort((a, b) => {
      const aSelected = selected.id === a.id;
      const bSelected = selected.id === b.id;
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return 0;
    });
  }, [filteredVehicles, selected]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-primary">Which vehicle do you want to boost?</h3>
        <p className="text-third text-sm mt-1">
          Select one vehicle from your active inventory.
        </p>
      </div>

      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-third">
          <Search size={18} />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search inventory by brand, model or year..."
          className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-third/30 rounded-xl text-primary placeholder-zinc-500 text-sm focus:outline-none focus:border-fourth focus:ring-1 focus:ring-fourth transition-all"
        />
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
        {isLoading ? (
          <div className="py-8 text-center text-third text-sm">
            Loading your active inventory...
          </div>
        ) : sortedVehicles.length > 0 ? (
          <>
            {sortedVehicles.map((vehicle) => {
              const isSelected = selected?.id === vehicle.id;

              return (
                <button
                  key={vehicle.id}
                  onClick={() => onChange(vehicle)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-fourth bg-fourth/10 shadow-[0_0_15px_rgba(0,123,255,0.15)]"
                      : "border-third/30 bg-transparent hover:border-third/50 hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`w-12 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? "bg-fourth text-white" : "bg-white/5 text-third"
                    }`}
                  >
                    <Car size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold text-sm truncate transition-colors ${isSelected ? "text-fourth" : "text-primary"}`}>
                      {vehicle.name}
                    </h4>
                    <p className="text-third text-xs mt-1 truncate">
                      {vehicle.meta}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-primary font-bold text-sm block">
                      {vehicle.displayPrice}
                    </span>
                    <span className="mt-1 px-2 py-0.5 inline-block text-[10px] font-bold bg-[#1D9E75]/10 text-[#1D9E75] rounded">
                      {vehicle.status}
                    </span>
                  </div>
                </button>
              );
            })}

            {hasNextPage && (
              <div className="flex justify-center pt-2">
                <Button
                  variant="outlineSecondary"
                  size="sm"
                  loading={isFetchingNextPage}
                  onClick={() => fetchNextPage()}
                  className="px-6 py-1.5 rounded-xl text-xs font-semibold"
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="py-8 text-center text-third text-sm">
            No matching vehicles found in inventory.
          </div>
        )}
      </div>
    </div>
  );
}
