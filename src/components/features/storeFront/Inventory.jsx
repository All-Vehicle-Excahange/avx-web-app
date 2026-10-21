"use client";

import { useState, useRef, useEffect } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import { useRouter } from "next/router";
import Button from "@/components/ui/button";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getStoreFrontInventoryInfiniteQuery, getStoreFrontByUsernameQuery } from "@/queries/user.queries";
import { ArrowUpDown, RefreshCw, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Inventory({ id: propId, isActiveTier: propIsActiveTier }) {
    const router = useRouter();
    const id = propId || router.query?.id;

    const { data: storeDetails } = useQuery(getStoreFrontByUsernameQuery(id));
    const isActiveTier = propIsActiveTier !== undefined ? propIsActiveTier : (storeDetails?.isActiveTier !== false);

    const [activeType, setActiveType] = useState("all");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target)) {
                setIsSortOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const vehicleTypes = [
        { id: "all", label: "All" },
        { id: "FOUR_WHEELER", label: "Four Wheelers" },
        { id: "TWO_WHEELER", label: "Two Wheelers" },
    ];

    const sortOptions = [
        { value: { sortBy: "listingDate", direction: "desc" }, label: "Newest" },
        { value: { sortBy: "listingDate", direction: "asc" }, label: "Oldest" },
        { value: { sortBy: "price", direction: "asc" }, label: "Price: Low to High" },
        { value: { sortBy: "price", direction: "desc" }, label: "Price: High to Low" },
        { value: { sortBy: "avxInspectionRating", direction: "desc" }, label: "Rating: High to Low" },
    ];

    const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

    // TanStack Query for storefront inventory (Infinite scroll / pagination)
    const {
        data: inventoryInfiniteData,
        isLoading: loading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        ...getStoreFrontInventoryInfiniteQuery({
            id,
            sortBy: selectedSort.value.sortBy,
            direction: selectedSort.value.direction,
            vehicleType: activeType === "all" ? null : activeType,
            size: 12,
        }),
        enabled: Boolean(id),
    });

    const vehicles =
        inventoryInfiniteData?.pages?.flatMap((page) => page?.data || []) || [];

    const totalElements =
        inventoryInfiniteData?.pages?.[0]?.pageResponse?.totalElements ??
        inventoryInfiniteData?.pages?.[0]?.pagination?.totalElements ??
        inventoryInfiniteData?.pages?.[0]?.pagination?.totalRecords ??
        inventoryInfiniteData?.pages?.[0]?.pagination?.totalItems ??
        inventoryInfiniteData?.pages?.[0]?.pagination?.total ??
        vehicles.length;

    return (
        <section className="w-full container mt-2! border-0  rounded-none sm:rounded-2xl pl-0! pr-0 py-4 sm:pt-6 sm:pb-6 sm:pr-6 sm:pl-0! space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-1 sm:px-0">
                <div className="flex flex-wrap gap-2">
                    {vehicleTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => {
                                setActiveType(type.id);
                            }}
                            className={`cursor-pointer px-4 border border-third/50 py-2 rounded-full text-sm font-medium transition
                ${activeType === type.id
                                    ? "bg-primary text-secondary"
                                    : "bg-third/10 text-primary hover:bg-third/20"
                                }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>

                {/* Custom Sort Dropdown */}
                <div className="relative w-56 z-50" ref={sortDropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsSortOpen((prev) => !prev)}
                        className="w-full flex items-center justify-between bg-[#111111] border border-[#2f2e2e] hover:border-[#555] rounded-xl px-3.5 py-2.5 text-sm text-white cursor-pointer transition-colors shadow-sm select-none"
                    >
                        <div className="flex items-center gap-2 min-w-0">
                            <ArrowUpDown size={14} className="text-[#aaaaaa] shrink-0" />
                            <span className="font-medium truncate">{selectedSort.label}</span>
                        </div>
                        <ChevronDown
                            size={16}
                            className={`text-[#aaaaaa] transition-transform duration-200 shrink-0 ml-1 ${
                                isSortOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {isSortOpen && (
                        <div className="absolute right-0 top-full mt-1.5 w-full bg-[#111111] border border-[#2f2e2e] rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                            {sortOptions.map((option) => {
                                const isSelected = selectedSort.label === option.label;
                                return (
                                    <div
                                        key={option.label}
                                        onClick={() => {
                                            setSelectedSort(option);
                                            setIsSortOpen(false);
                                        }}
                                        className={`px-3.5 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between ${
                                            isSelected
                                                ? "bg-[#2a2a2a] text-white font-medium"
                                                : "text-gray-300 hover:bg-[#1f1f1f] hover:text-white"
                                        }`}
                                    >
                                        <span>{option.label}</span>
                                        {isSelected && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <div className={`grid ${(!loading && vehicles.length === 0) ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"} gap-4`}>
                {loading
                    ? [...Array(12)].map((_, i) => <VehicleCardSkeleton key={`skel-${i}`} />)
                    : vehicles.length > 0 ? (
                        vehicles.map((car, index) => (
                            <VehicleCard key={`${car.id}-${index}`} data={car} isTierActive={isActiveTier} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 sm:py-15 text-center w-full">
                            <div className="relative w-32 h-32 mb-2 opacity-60">
                                <Image
                                    src="/empty2.svg"
                                    alt="Empty State"
                                    fill
                                    className="object-contain"
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-primary">
                                No {activeType === "all" ? "" : vehicleTypes.find(t => t.id === activeType)?.label} vehicles found
                            </h3>
                            <p className="text-third max-w-sm px-4">
                                We couldnt find any {activeType === "all" ? "vehicles" : vehicleTypes.find(t => t.id === activeType)?.label.toLowerCase()} in this store at the moment.
                            </p>
                        </div>
                    )
                }
            </div>

            {/* Load More Button & Stats */}
            {!loading && totalElements > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 mb-4 pt-4 border-t border-third/20">
                    <div className="text-sm text-third">
                        Showing <span className="font-semibold text-primary">{vehicles.length}</span> of <span className="font-semibold text-primary">{totalElements}</span> {activeType === "TWO_WHEELER" ? "bikes" : activeType === "FOUR_WHEELER" ? "cars" : "vehicles"}
                    </div>
                    {hasNextPage && (
                        <Button
                            variant="ghost"
                            className="flex items-center gap-2 px-6 rounded-full"
                            showIcon={false}
                            size="sm"
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                        >
                            <RefreshCw className={`w-4 h-4 ${isFetchingNextPage ? 'animate-spin' : ''}`} />
                            {isFetchingNextPage ? "Loading..." : "Load More"}
                        </Button>
                    )}
                </div>
            )}
        </section>
    );
}
