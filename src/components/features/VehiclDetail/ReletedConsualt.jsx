/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import ConsultantCard from "@/components/ui/const/ConsultCard";
import Button from "@/components/ui/button";
import { getHomeFeedConsult } from "@/services/user.service";
import { getFilterConsualt } from "@/services/filter";
import { useRouter } from "next/navigation";

export default function ReletedConsualt(props) {
    // ✅ HARD SAFE DEFAULT
    const safeLimit = typeof props.limit === "number" ? props.limit : 4;
    const router = useRouter();

    const [consultants, setConsultants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const fetchConsultants = async () => {
            try {
                // Build payload dynamically
                const payload = {};
                if (props.vehicleSummary?.address?.cityId) {
                    payload.cityId = props.vehicleSummary.address.cityId;
                }
                if (props.vehicleSummary?.address?.stateId) {
                    payload.stateId = props.vehicleSummary.address.stateId;
                }
                if (props.vehicleOverview?.makerId) {
                    payload.makerIds = [props.vehicleOverview.makerId];
                }
                if (props.vehicleOverview?.modelId) {
                    payload.modelIds = [props.vehicleOverview.modelId];
                }
                if (props.vehicleOverview?.vehicleSubType) {
                    payload.vehicleSubTypes = [props.vehicleOverview.vehicleSubType.toUpperCase()];
                }
                if (props.vehicleOverview?.price) {
                    payload.minPrice = props.vehicleOverview.price;
                    payload.maxPrice = props.vehicleOverview.price;
                }

                // If we have filters, use getFilterConsualt, otherwise fallback to home feed
                const res = Object.keys(payload).length > 0
                    ? await getFilterConsualt(payload)
                    : await getHomeFeedConsult({ pageNo: 1, size: safeLimit });

                if (mounted && Array.isArray(res?.data) && res.data.length > 0) {
                    setConsultants(
                        res.data.map((item) => ({
                            id: item.id,
                            username: item.username,
                            name: item.consultationName || "-",
                            image: item.bannerUrl || "/cs.png",
                            logo: item.logoUrl || "/cs.png",
                            rating: item.averageRating ?? 0,
                            reviews: item.totalReviews ?? 0,
                            vehicleCount: item.availableVehicles ?? 0,
                            services: item.services || [],
                            vehicleTypes: item.vehicleTypes || [],
                            location:
                                item.address?.city && item.address?.country
                                    ? `${item.address.city}, ${item.address.country}`
                                    : "-",
                            priceRange:
                                item.minVehiclePrice && item.maxVehiclePrice
                                    ? `${(item.minVehiclePrice / 100000).toFixed(1)}L - ${(item.maxVehiclePrice / 100000).toFixed(1)}L`
                                    : "-",
                            isSponsored: item.isActiveTier || false,
                        }))
                    );
                }
            } catch (err) {
                console.error("Consultant fetch failed:", err);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        if (props.vehicleOverview && Object.keys(props.vehicleOverview).length > 0) {
            fetchConsultants();
        }

        return () => (mounted = false);
    }, [safeLimit, props.vehicleOverview, props.vehicleSummary]);

    const finalConsultants = consultants;

    const handleViewMore = (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams();

        // 1. Vehicle Type
        const cat = props.vehicleOverview?.vehicleCategory;
        const vType = props.vehicleOverview?.vehicleType;
        if (cat === "TWO_WHEELER" || vType === "Two Wheeler" || vType === "2 Wheeler") {
            queryParams.set("vehicleType", "2 Wheeler");
        } else if (cat === "FOUR_WHEELER" || vType === "Four Wheeler" || vType === "4 Wheeler" || cat === "CAR" || cat === "FOUR_WHEELER ") {
            queryParams.set("vehicleType", "4 Wheeler");
        } else if (props.vehicleOverview) {
            // Safe fallback if category is unknown but we have a valid vehicle
            queryParams.set("vehicleType", "4 Wheeler");
        }

        // 2. City & State (Location)
        if (props.vehicleSummary?.address?.cityId) {
            queryParams.set("cityId", props.vehicleSummary.address.cityId);
        }
        if (props.vehicleSummary?.address?.stateId) {
            queryParams.set("stateId", props.vehicleSummary.address.stateId);
        }
        if (props.vehicleSummary?.address?.city && props.vehicleSummary?.address?.state) {
            queryParams.set("location", `${props.vehicleSummary.address.city}, ${props.vehicleSummary.address.state}`);
        }

        // 3. Min/Max Price (+/- 20% of main price)
        if (props.vehicleOverview?.price) {
            const minPriceLakhs = Math.max(0, (props.vehicleOverview.price * 0.8) / 100000).toFixed(2);
            const maxPriceLakhs = ((props.vehicleOverview.price * 1.2) / 100000).toFixed(2);
            queryParams.set("priceRange", `${minPriceLakhs}L-${maxPriceLakhs}L`);
        }

        router.push(`/consult/discovery?${queryParams.toString()}`);
    };

    return (
        <div className="w-full py-10 ">
            {/* Header */}
            <div className="flex flex-col items-start gap-2">
                <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
                    Top Picks
                    <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-gradient-to-r from-neutral-100 to-transparent" />
                </p>

                <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
                    Top <span className="text-fourth">Auto Consultants</span> Picks For You
                </h2>
                <p className="text-third ">
                    Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur..
                </p>
            </div>

            {loading && (
                <p className="text-sm text-third mb-4">Loading consultants...</p>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {finalConsultants.length === 0 ? (
                    <div className="col-span-full flex justify-center py-16">
                        <h3 className="text-lg font-semibold text-primary/40">
                            No auto consult found
                        </h3>
                    </div>
                ) : (
                    finalConsultants
                        .slice(0, safeLimit)
                        .map((consultant) => (
                            <ConsultantCard key={consultant.id} {...consultant} />
                        ))
                )}
            </div>

            <div className="mt-8 flex justify-end">
                <Button onClick={handleViewMore} variant="outlineAnimated">
                    Explore All
                </Button>
            </div>
        </div>
    );
}
