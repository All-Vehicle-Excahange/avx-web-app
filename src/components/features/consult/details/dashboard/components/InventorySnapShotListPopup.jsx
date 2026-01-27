"use client";

import React from "react";
import UserVehicleCard from "@/components/features/user/UserVehicleCard";

function InventorySnapShotListPopup({ open, onClose, vehicles, title }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* ✅ Blur Background */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* ✅ Popup Box */}
      <div
        className="
          relative z-10 w-[95%] max-w-7xl
          rounded-2xl border border-third/30
          bg-secondary p-6
          shadow-2xl
        "
      >
        {/* ✅ Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{title}</h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* ✅ Scrollable Cards Section */}
        <div className="max-h-[75vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {vehicles.map((car) => (
              <UserVehicleCard
                key={car.id}
                data={car}
                status={car.status}
                avxInspected={car.avxInspected}
                inquiries={car.inquiries}
                chats={car.chats}
                soldDate={car.soldDate}
                showBoostButton={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventorySnapShotListPopup;
