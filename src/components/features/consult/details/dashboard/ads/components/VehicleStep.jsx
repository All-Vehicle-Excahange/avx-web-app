import React, { useState } from "react";
import { Search, Car } from "lucide-react";

const vehicles = [
  {
    id: "v1",
    name: "BMW X1 — 2023 xDrive20d",
    meta: "12,400 km · Petrol · Auto",
    price: "₹42,00,000",
    displayPrice: "₹42.0L",
    status: "Active",
  },
  {
    id: "v2",
    name: "Mercedes C-Class — 2022 C200",
    meta: "8,200 km · Petrol · Auto",
    price: "₹52,00,000",
    displayPrice: "₹52.0L",
    status: "Active",
  },
  {
    id: "v3",
    name: "Audi A4 — 2021 40 TFSI",
    meta: "18,700 km · Petrol · Auto",
    price: "₹38,00,000",
    displayPrice: "₹38.0L",
    status: "Active",
  },
  {
    id: "v4",
    name: "Toyota Fortuner — 2022 Legender",
    meta: "22,100 km · Diesel · Auto",
    price: "₹35,00,000",
    displayPrice: "₹35.0L",
    status: "Active",
  },
  {
    id: "v5",
    name: "Honda City — 2023 ZX CVT",
    meta: "5,600 km · Petrol · CVT",
    price: "₹14,50,000",
    displayPrice: "₹14.5L",
    status: "Active",
  },
];

export default function VehicleStep({ selected, onChange }) {
  const [search, setSearch] = useState("");

  const filteredVehicles = vehicles.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

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
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => {
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
                  className={`w-12 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
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

                <div className="text-right flex-shrink-0">
                  <span className="text-primary font-bold text-sm block">
                    {vehicle.displayPrice}
                  </span>
                  <span className="mt-1 px-2 py-0.5 inline-block text-[10px] font-bold bg-[#1D9E75]/10 text-[#1D9E75] rounded">
                    {vehicle.status}
                  </span>
                </div>
              </button>
            );
          })
        ) : (
          <div className="py-8 text-center text-third text-sm">
            No matching vehicles found in inventory.
          </div>
        )}
      </div>
    </div>
  );
}
