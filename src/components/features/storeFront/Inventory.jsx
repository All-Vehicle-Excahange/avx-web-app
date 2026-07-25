"use client";

import { useState } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Select, { components } from "react-select";
import { useRouter } from "next/router";
import Button from "@/components/ui/button";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getStoreFrontInventoryInfiniteQuery } from "@/queries/user.queries";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export default function Inventory() {
    const router = useRouter();
    const id = router.query?.id;

    const [activeType, setActiveType] = useState("all");

    const vehicleTypes = [
        { id: "all", label: "All" },
        { id: "TWO_WHEELER", label: "Two Wheelers" },
        { id: "FOUR_WHEELER", label: "Four Wheels" },
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
    } = useInfiniteQuery(
        getStoreFrontInventoryInfiniteQuery({
            id,
            sortBy: selectedSort.value.sortBy,
            direction: selectedSort.value.direction,
            vehicleType: activeType === "all" ? null : activeType,
            size: 4,
        })
    );

    const vehicles =
        inventoryInfiniteData?.pages?.flatMap((page) => page?.data || []) || [];


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

                <div className="w-56 z-999">
                    <Select
                        instanceId="inventory-sort"
                        options={sortOptions}
                        value={selectedSort}
                        onChange={(option) => {
                            setSelectedSort(option);
                        }}
                        isSearchable={false}
                        className="text-sm"
                        components={{
                            SingleValue: (props) => (
                                <components.SingleValue {...props}>
                                    <div className="flex items-center gap-2">
                                        <ArrowUpDown size={14} className="text-[#aaaaaa]" />
                                        <span>{props.data.label}</span>
                                    </div>
                                </components.SingleValue>
                            )
                        }}
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                backgroundColor: "#111111",
                                borderColor: state.isFocused ? "#444" : "#2f2e2e",
                                borderRadius: "12px",
                                padding: "2px 6px",
                                boxShadow: "none",
                                cursor: "pointer",
                                "&:hover": {
                                    borderColor: "#555",
                                },
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: "#ffffff",
                            }),
                            placeholder: (base) => ({
                                ...base,
                                color: "#aaaaaa",
                            }),
                            menu: (base) => ({
                                ...base,
                                backgroundColor: "#111111",
                                borderRadius: "12px",
                                overflow: "hidden",
                                marginTop: "6px",
                            }),
                            option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused
                                    ? "#1f1f1f"
                                    : state.isSelected
                                        ? "#2a2a2a"
                                        : "#111111",
                                color: "#ffffff",
                                cursor: "pointer",
                                padding: "10px 14px",
                            }),
                            dropdownIndicator: (base) => ({
                                ...base,
                                color: "#ffffff",
                                "&:hover": {
                                    color: "#cccccc",
                                },
                            }),
                            indicatorSeparator: () => ({
                                display: "none",
                            }),
                        }}
                    />
                </div>
            </div>

            <div className={`grid ${(!loading && vehicles.length === 0) ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"} gap-4`}>
                {loading
                    ? [...Array(4)].map((_, i) => <VehicleCardSkeleton key={`skel-${i}`} />)
                    : vehicles.length > 0 ? (
                        vehicles.map((car, index) => (
                            <VehicleCard key={`${car.id}-${index}`} data={car} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 sm:py-15 text-center w-full">
                            <div className="relative w-32 h-32 mb-2 opacity-60">
                                <Image
                                    src="/empty2.svg"
                                    alt="Empty State"
                                    fill
                                    className="object-contain"
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
            {hasNextPage && (
                <div className="mt-8 flex justify-end">
                    <Button
                        variant="outline"
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? "Loading..." : "View More"}
                    </Button>
                </div>
            )}
        </section>
    );
}
