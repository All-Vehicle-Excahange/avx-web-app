"use client";

import React, { useState, useCallback } from "react";
import UserVehicleCard from "@/components/features/user/UserVehicleCard";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";

function InventorySnapShotListPopup({ open, onClose, vehicles, title, hasMore, onLoadMore, loading }) {
  const [isClosing, setIsClosing] = useState(false);

  const triggerClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  }, [onClose]);

  if (!open && !isClosing) return null;

  const handleClose = triggerClose;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" 
      onClick={handleClose}
      style={{ animation: isClosing ? 'modalBackdropOut 0.25s ease-in forwards' : 'modalBackdropIn 0.25s ease-out' }}
    >
      {/* ✅ Blur Background */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* ✅ Popup Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative z-10 w-[95%] max-w-7xl
          rounded-2xl border border-third/30
          bg-secondary p-6
          shadow-2xl
        "
        style={{ animation: isClosing ? 'modalCardOut 0.25s ease-in forwards' : 'modalCardIn 0.3s ease-out' }}
      >
        {/* ✅ Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{title}</h2>

          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition hover:opacity-70"
          >
            ✕
          </button>
        </div>

        {/* ✅ Scrollable Cards Section */}
        <div className="max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
          {!loading && vehicles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border-2 border-dashed border-third/20 bg-third/5">
              <h3 className="text-xl font-bold mb-2">No vehicles found.</h3>
              <p className="text-third">
                There are currently no vehicles in this category.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles.map((car) => (
                  <VehicleCard
                    key={car.id}
                    data={car}
                  />
                ))}
              </div>

              {/* ✅ View More Button */}
              {hasMore && (
                <div className="flex justify-end mt-6">
                  <Button
                    onClick={onLoadMore}
                    variant="ghost"
                    size="sm"
                    showIcon={false}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "View More"}
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Loading state for initial load */}
          {loading && vehicles.length === 0 && (
            <div className="flex items-center justify-center py-16">
              <div className="loader"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InventorySnapShotListPopup;
