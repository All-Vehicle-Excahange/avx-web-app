"use client";

import {useEffect, useState} from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Select from "react-select";
import {getConsualtInventory} from "@/services/user.service";
import {useParams} from "next/navigation";
import Button from "@/components/ui/button";

export default function Inventory() {
    const id = useParams()?.id;

    const [activeType, setActiveType] = useState("all");
    const [vehicles, setVehicles] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageInfo, setPageInfo] = useState(null);


    const vehicleTypes = [
        {id: "all", label: "All"},
        {id: "two_wheelers", label: "Two Wheelers"},
        {id: "four_wheelers", label: "Four Wheels"},
    ];

    const sortOptions = [
        {value: {sortBy: "listingDate", direction: "desc"}, label: "Sort : Newest"},
        {value: {sortBy: "listingDate", direction: "asc"}, label: "Sort : Oldest"},
        {value: {sortBy: "price", direction: "asc"}, label: "Price: Low to High"},
        {value: {sortBy: "price", direction: "desc"}, label: "Price: High to Low"},
        {value: {sortBy: "avxInspectionRating", direction: "desc"}, label: "Rating: High to Low"},
    ];

    const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const data = {
                    pageNo: pageNo,
                    size: 4,
                    sortBy: selectedSort.value.sortBy,
                    direction: selectedSort.value.direction,
                    id: id,
                };

                const res = await getConsualtInventory(data);
                if (pageNo === 1) {
                    setVehicles(res.data);
                } else {
                    setVehicles((prev) => [...prev, ...res.data]);
                }
                setPageInfo(res.pagination);
            } catch (error) {
                console.error("Error fetching inventory:", error);
            }
        };

        if (id) {
            fetchInventory();
        }
    }, [selectedSort, id, pageNo]);



    return (
        <section className="w-full container rounded-2xl p-6 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                    {vehicleTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setActiveType(type.id)}
                            className={`px-4 border border-third/50 py-2 rounded-full text-sm font-medium transition
                ${
                                activeType === type.id
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
                            setPageNo(1);
                        }}
                        isSearchable={false}
                        className="text-sm"
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                backgroundColor: "#111111",
                                borderColor: state.isFocused ? "#444" : "#2f2e2e",
                                borderRadius: "12px",
                                padding: "2px 6px",
                                boxShadow: "none",
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

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {vehicles.map((car, index) => (
                    <VehicleCard key={`${car.id}-${index}`} data={car}/>
                ))}
            </div>
            <div className="mt-8 flex justify-end">
                <Button
                    variant="outline"
                    onClick={() => {
                        if (pageInfo && pageNo < pageInfo.totalPages) {
                            setPageNo((prev) => prev + 1);
                        }
                    }}
                    disabled={pageInfo && pageNo >= pageInfo.totalPages}
                >
                    View More
                </Button>


            </div>
        </section>
    );
}
