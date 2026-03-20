"use client";

import React, { useEffect, useState } from "react";
import ConsultantCard from "@/components/ui/const/ConsultCard";
import Button from "@/components/ui/button";
import { getHomeFeedConsult } from "@/services/user.service";

const mapConsultant = (item) => ({
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
});

export default function AutoConsualt({ limit, data }) {
    const safeLimit = typeof limit === "number" ? limit : 4;

    const [consultants, setConsultants] = useState([]);
    const [loading, setLoading] = useState(true);

    // Sync when parent passes filter-based consultant data
    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            setConsultants(data.map(mapConsultant));
            setLoading(false);
        }
    }, [data]);

    // Fallback: fetch from home feed when no filter data is given
    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) return; // parent data takes priority

        let mounted = true;
        const fetchConsultants = async () => {
            try {
                const res = await getHomeFeedConsult({ pageNo: 1, size: safeLimit });
                if (mounted && Array.isArray(res?.data) && res.data.length > 0) {
                    setConsultants(res.data.map(mapConsultant));
                }
            } catch (err) {
                console.error("Consultant fetch failed:", err);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchConsultants();
        return () => (mounted = false);
    }, [safeLimit, data]);

    return (
        <div className="w-full py-10 ">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
                <span className="w-2 h-[52px] rounded-full bg-linear-to-b from-blue-500 to-white-400" />

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
                        Consultants Specializing in Diesel SUVs
                    </h2>
                    <p className="text-third mt-1">
                        Discover trusted consultants curated for you.
                    </p>
                </div>
            </div>

            {loading && (
                <p className="text-sm text-third mb-4">Loading consultants...</p>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {consultants.length === 0 ? (
                    <div className="col-span-full flex justify-center py-16">
                        <h3 className="text-lg font-semibold text-primary/40">
                            No consultants found
                        </h3>
                    </div>
                ) : (
                    consultants
                        .slice(0, safeLimit)
                        .map((consultant) => (
                            <ConsultantCard key={consultant.id} {...consultant} />
                        ))
                )}
            </div>

            <div className="mt-8 flex justify-end">
                <Button href="/consult/discovery" variant="outlineAnimated">
                    See All
                </Button>
            </div>
        </div>
    );
}
