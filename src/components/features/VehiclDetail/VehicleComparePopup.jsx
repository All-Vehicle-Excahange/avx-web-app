"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Search, Loader2 } from "lucide-react";
import Button from "@/components/ui/button";
import { getWishList } from "@/services/user.service";
import { getVehicleOverview } from "@/services/vehicle.service";

export default function VehicleComparePopup({
    isOpen,
    onClose,
    selectedVehicle
}) {
    const [isClosing, setIsClosing] = useState(false);
    const [search, setSearch] = useState("");
    const [vehicle2, setVehicle2] = useState(null);
    const [isComparing, setIsComparing] = useState(false);

    // API State
    const [wishlistCars, setWishlistCars] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Full Compare API State
    const [isFetchingComparison, setIsFetchingComparison] = useState(false);
    const [fullCompareData, setFullCompareData] = useState(null);
    const compareSectionRef = useRef(null);

    const searchResults = search
        ? wishlistCars.filter(c => `${c.makerName} ${c.modelName}`.toLowerCase().includes(search.toLowerCase()))
        : wishlistCars;

    useEffect(() => {
        if (isOpen) {
            setVehicle2(null);
            setSearch("");
            setIsClosing(false);
            setIsComparing(false); // reset comparison state when reopened
            setFullCompareData(null);

            const fetchWishlist = async () => {
                setIsLoading(true);
                try {
                    // Fetch up to 50 wishlist vehicles for client-side search in popup
                    const res = await getWishList({ pageNo: 1, size: 50 });
                    if (res?.success && res?.data) {
                        // Map API properties to UI-expected format
                        const formattedCars = res.data.map(car => ({
                            ...car,
                            registrationYear: car.yearOfMfg,
                            transmission: car.transmissionType,
                            owner: car.ownership ? `${car.ownership} Owner` : "1st Owner"
                        }));
                        setWishlistCars(formattedCars);
                    } else {
                        setWishlistCars([]);
                    }
                } catch (error) {
                    console.error("Failed to fetch compare wishlist:", error);
                    setWishlistCars([]);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchWishlist();
        }
    }, [isOpen]);

    const triggerClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 250);
    }, [onClose]);

    const handleCompareNow = async () => {
        if (!selectedVehicle?.id || !vehicle2?.id) return;

        setIsFetchingComparison(true);
        try {
            const [res1, res2] = await Promise.all([
                getVehicleOverview(selectedVehicle.id),
                getVehicleOverview(vehicle2.id)
            ]);

            if (res1?.data && res2?.data) {
                setFullCompareData({ v1: res1.data, v2: res2.data });
                setIsComparing(true);

                // Fast transition scroll
                setTimeout(() => {
                    compareSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        } catch (error) {
            console.error("Failed to fetch detailed comparison specs", error);
        } finally {
            setIsFetchingComparison(false);
        }
    };

    if (!isOpen && !isClosing) return null;

    const renderVehicleBox = (vehicle, isSearchBox) => {
        if (isSearchBox && !vehicle) {
            return (
                <div className="border border-dashed border-primary/30 rounded-xl p-2 sm:p-4 flex flex-col h-full bg-primary/5 min-h-[220px] sm:min-h-[300px]">
                    {/* Search Field */}
                    <div className="flex items-center border rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 bg-secondary mb-3 border-primary/20">
                        <Search size={14} className="text-primary/60 shrink-0" />
                        <input
                            placeholder="Wishlist..."
                            className="bg-transparent outline-none ml-1 sm:ml-2 text-primary w-full text-[10px] sm:text-sm placeholder:text-primary/40 truncate"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {/* Search Results List */}
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[225px] sm:max-h-[350px] custom-scrollbar">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-full text-primary/60 py-4 sm:py-6">
                                <Loader2 className="animate-spin mb-1 sm:mb-2" size={18} />
                                <span className="text-[10px] sm:text-xs">Loading...</span>
                            </div>
                        ) : searchResults.length > 0 ? (
                            searchResults.map((v, i) => (
                                <div
                                    key={i}
                                    onClick={() => setVehicle2(v)}
                                    className="p-1.5 sm:p-3 bg-secondary rounded-lg border border-primary/10 cursor-pointer hover:border-primary/40 focus:bg-primary/5 transition-colors flex items-center gap-2 sm:gap-3"
                                >
                                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-primary/5 rounded-md overflow-hidden relative shrink-0 flex items-center justify-center">
                                        {v.thumbnailUrl ? (
                                            <img src={v.thumbnailUrl} alt="car" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-[8px] sm:text-[10px] text-primary/40 font-medium">No Img</span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[10px] sm:text-sm font-semibold text-primary truncate leading-tight">
                                            {v.makerName} {v.modelName}
                                        </div>
                                        <div className="text-[9px] sm:text-xs text-primary/60 mt-0.5">
                                            ₹{v.price?.toLocaleString("en-IN") || "NA"}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-primary/50 text-[10px] sm:text-sm mt-2 sm:mt-4 px-1">
                                {search ? "Not found" : "Empty wishlist"}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        if (!vehicle) return null;

        const name = [vehicle.makerName, vehicle.modelName, vehicle.variantName].filter(Boolean).join(" ");

        return (
            <div className="border border-primary/20 rounded-xl p-2 sm:p-4 flex flex-col h-full bg-secondary shadow-sm relative group transition-all duration-300">
                {/* Vehicle Image */}
                <div className="w-full h-20 sm:h-40 bg-primary/5 rounded-lg mb-2 sm:mb-4 relative overflow-hidden flex items-center justify-center shrink-0">
                    {vehicle.thumbnailUrl ? (
                        <img src={vehicle.thumbnailUrl} alt={name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-primary/30 text-[10px] sm:text-sm font-medium">No Image</span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-base font-bold text-primary line-clamp-2 min-h-[32px] sm:min-h-[48px] mb-1 sm:mb-2 leading-tight">
                    {name || "Vehicle Info"}
                </h3>

                {/* Price */}
                <div className="text-sm sm:text-xl font-bold text-primary mb-2 sm:mb-4 truncate">
                    {vehicle.price ? `₹${vehicle.price.toLocaleString("en-IN")}` : "Price TBA"}
                </div>

                {/* Specs Grid */}
                <div className="space-y-1 sm:space-y-3 mt-auto pt-2 sm:pt-4 border-t border-primary/10">
                    <div className="flex flex-col xl:flex-row justify-between text-[9px] sm:text-sm leading-tight gap-0.5">
                        <span className="text-primary/60">Year</span>
                        <span className="font-medium text-primary xl:text-right truncate">{vehicle.registrationYear || "-"}</span>
                    </div>
                    <div className="flex flex-col xl:flex-row justify-between text-[9px] sm:text-sm leading-tight gap-0.5">
                        <span className="text-primary/60">Fuel</span>
                        <span className="font-medium text-primary xl:text-right truncate">{vehicle.fuelType || "-"}</span>
                    </div>
                    <div className="flex flex-col xl:flex-row justify-between text-[9px] sm:text-sm leading-tight gap-0.5">
                        <span className="text-primary/60 xl:hidden">Trans.</span>
                        <span className="text-primary/60 hidden xl:inline">Transmission</span>
                        <span className="font-medium text-primary xl:text-right truncate">{vehicle.transmission || "-"}</span>
                    </div>
                    <div className="flex flex-col xl:flex-row justify-between text-[9px] sm:text-sm leading-tight gap-0.5">
                        <span className="text-primary/60">Driven</span>
                        <span className="font-medium text-primary xl:text-right truncate">{vehicle.kmDriven ? `${vehicle.kmDriven.toLocaleString("en-IN")} km` : "-"}</span>
                    </div>
                </div>

                {/* Remove Button for Vehicle 2 */}
                {isSearchBox && !isComparing && (
                    <button
                        onClick={(e) => { e.stopPropagation(); setVehicle2(null); }}
                        className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-white/80 backdrop-blur-md p-1 sm:p-1.5 rounded-full text-red-500 cursor-pointer hover:bg-white shadow-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                    >
                        <X size={12} className="sm:w-4 sm:h-4" />
                    </button>
                )}
            </div>
        );
    };

    // Helper for detailed compare row
    const renderCompareSection = (title, fields) => (
        <div className="mb-6">
            <h4 className="font-semibold text-primary mb-3 bg-primary/5 px-3 py-2 rounded-md uppercase tracking-wider text-xs sm:text-sm text-center">{title}</h4>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm px-1 sm:px-2">
                <div className="space-y-1 sm:space-y-2">
                    {fields.map((f, i) => (
                        <div key={i} className="flex flex-col xl:flex-row justify-between border-b border-primary/10 pb-1.5 pt-1">
                            <span className="text-primary/60 block xl:inline">{f.label}</span>
                            <span className="font-medium text-primary text-left xl:text-right">{f.val1}</span>
                        </div>
                    ))}
                </div>
                <div className="space-y-1 sm:space-y-2">
                    {fields.map((f, i) => (
                        <div key={i} className="flex flex-col xl:flex-row justify-between border-b border-primary/10 pb-1.5 pt-1">
                            <span className="text-primary/60 block xl:inline">{f.label}</span>
                            <span className="font-medium text-primary text-left xl:text-right">{f.val2}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Prepare robust table data strictly driven by the API payload result
    const v1 = fullCompareData?.v1;
    const v2 = fullCompareData?.v2;

    const overviewFields = isComparing && fullCompareData ? [
        { label: "Make", val1: v1?.makerName || "-", val2: v2?.makerName || "-" },
        { label: "Model", val1: v1?.modelName || "-", val2: v2?.modelName || "-" },
        { label: "Variant", val1: v1?.variantName || "-", val2: v2?.variantName || "-" },
        { label: "Registration Year", val1: v1?.yearOfMfg || "-", val2: v2?.yearOfMfg || "-" },
        { label: "Price", val1: v1?.price ? `₹${v1.price.toLocaleString("en-IN")}` : "-", val2: v2?.price ? `₹${v2.price.toLocaleString("en-IN")}` : "-" },
        { label: "Colour", val1: v1?.colour || "-", val2: v2?.colour || "-" },
    ] : [];

    const specFields = isComparing && fullCompareData ? [
        { label: "Fuel Type", val1: v1?.fuelType || "-", val2: v2?.fuelType || "-" },
        { label: "Transmission", val1: v1?.transmissionType || "-", val2: v2?.transmissionType || "-" },
        { label: "Kilometers", val1: v1?.kmDriven ? `${v1.kmDriven.toLocaleString()} km` : "-", val2: v2?.kmDriven ? `${v2.kmDriven.toLocaleString()} km` : "-" },
        { label: "Ownership", val1: v1?.ownership ? `${v1.ownership} Owner` : "1st Owner", val2: v2?.ownership ? `${v2.ownership} Owner` : "1st Owner" },
        { label: "CNG Fitted", val1: v1?.isCngFitted ? "Yes" : "No", val2: v2?.isCngFitted ? "Yes" : "No" },
    ] : [];

    const conditionFields = isComparing && fullCompareData ? [
        { label: "Inspection Rating", val1: v1?.avxInspectionRating || "Good", val2: v2?.avxInspectionRating || "Good" },
        { label: "Spare Key", val1: v1?.spareKey ? "Available" : "No", val2: v2?.spareKey ? "Available" : "No" },
        { label: "Spare Wheel", val1: v1?.spareWheel ? "Available" : "No", val2: v2?.spareWheel ? "Available" : "No" },
        { label: "Test Drive", val1: v1?.testDriveAvl ? "Available" : "Not Available", val2: v2?.testDriveAvl ? "Available" : "Not Available" },
    ] : [];

    const inspectFields = isComparing && fullCompareData ? [
        { label: "RTO Passing", val1: v1?.vehicleDocument?.rtoPassing || "-", val2: v2?.vehicleDocument?.rtoPassing || "-" },
        { label: "Insurance Status", val1: v1?.vehicleDocument?.insurance ? "Valid" : "Expired/NA", val2: v2?.vehicleDocument?.insurance ? "Valid" : "Expired/NA" },
        { label: "PUC Status", val1: v1?.vehicleDocument?.puc ? "Valid" : "Expired/NA", val2: v2?.vehicleDocument?.puc ? "Valid" : "Expired/NA" },
    ] : [];

    const modalContent = (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 overflow-hidden py-6 sm:py-8"
            onClick={triggerClose}
            style={{ animation: isClosing ? 'modalBackdropOut 0.25s ease-in forwards' : 'modalBackdropIn 0.25s ease-out' }}
        >
            <div
                className="w-full max-w-[850px] max-h-[95vh] sm:max-h-[90vh] rounded-xl sm:rounded-2xl bg-secondary shadow-2xl relative flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: isClosing ? 'modalCardOut 0.25s ease-in forwards' : 'modalCardIn 0.3s ease-out' }}
            >
                {/* STATIC HEADER (Structurally outside the scroll area) */}
                <div className="bg-secondary px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between border-b border-primary/10 shadow-sm shrink-0 z-20 relative">
                    <h2 className="text-lg sm:text-2xl font-bold text-primary m-0">
                        Compare Vehicles
                    </h2>
                    <button
                        onClick={triggerClose}
                        className="bg-white cursor-pointer p-1 rounded-full hover:opacity-70 text-secondary shadow-md"
                    >
                        <X size={18} className="text-black sm:w-5 sm:h-5" />
                    </button>
                </div>

                {/* SCROLLABLE BODY */}
                <div className="overflow-y-auto custom-scrollbar flex-1 p-3 sm:p-5 md:p-6 flex flex-col">

                    {/* CONTENT AREA */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-6 relative mb-4 sm:mb-6 shrink-0">
                        {/* Box 1 (Auto-selected current vehicle) */}
                        <div>
                            {renderVehicleBox(selectedVehicle, false)}
                        </div>

                        {/* VS Badge */}
                        <div className="absolute left-1/2 top-[40%] sm:top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-10 sm:h-10 bg-primary text-secondary rounded-full flex items-center justify-center font-bold text-[8px] sm:text-sm shadow-md z-10 border-[2px] sm:border-[3px] border-secondary">
                            VS
                        </div>

                        {/* Box 2 (Search or Target vehicle) */}
                        <div>
                            {renderVehicleBox(vehicle2, true)}
                        </div>
                    </div>

                    {/* ACTION BUTTON */}
                    {!isComparing && (
                        <div className="flex justify-end w-full mb-2">
                            <Button
                                variant="outlineSecondary"
                                disabled={!selectedVehicle || !vehicle2 || isFetchingComparison}
                                className="py-2 w-[160px] sm:w-[180px] text-sm flex items-center justify-center gap-2 transition-all"
                                onClick={handleCompareNow}
                            >
                                {isFetchingComparison ? (
                                    <>
                                        <Loader2 className="animate-spin" size={16} />
                                        <span>Fetching...</span>
                                    </>
                                ) : (
                                    "Compare Now"
                                )}
                            </Button>
                        </div>
                    )}

                    {/* DETAILED COMPARISON TABLE (SCROLLS INTO VIEW) */}
                    {isComparing && fullCompareData && (
                        <div ref={compareSectionRef} className="mt-2 sm:mt-4 border-t border-primary/20 pt-6 animate-fade-in transition-all scroll-m-4">
                            <h3 className="text-lg sm:text-xl font-bold text-primary mb-6 text-center">Detailed Comparison</h3>

                            <div className="space-y-2">
                                {renderCompareSection("Overview", overviewFields)}
                                {renderCompareSection("Specifications", specFields)}
                                {renderCompareSection("Condition", conditionFields)}
                                {renderCompareSection("Inspection", inspectFields)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    // render via portal
    return typeof document !== "undefined"
        ? createPortal(modalContent, document.body)
        : null;
}