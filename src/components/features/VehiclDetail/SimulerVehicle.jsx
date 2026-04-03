import React, { useEffect, useState } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import { getSimularVehicles } from "@/services/user.service";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";
import { useParams, useRouter } from "next/navigation";

function SimulerVehicle({ vehicleOverview }) {

    const [vehicle, setVehicle] = useState([])
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    useEffect(() => {
        const fetchVehicles = async () => {
            setLoading(true);
            try {
                const data = {
                    pageNo: 1, size: 8, id: id
                }
                const res = await getSimularVehicles(data)
                setVehicle(res.data)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchVehicles();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [id]);

    const handleViewMore = () => {
        const queryParams = new URLSearchParams();
        if (vehicleOverview?.makerId || vehicleOverview?.makeId) {
            queryParams.set("makerId", vehicleOverview.makerId || vehicleOverview.makeId);
        }
        if (vehicleOverview?.makerName) queryParams.set("brand", vehicleOverview.makerName);
        if (vehicleOverview?.modelId) queryParams.set("modelId", vehicleOverview.modelId);
        if (vehicleOverview?.variantId) queryParams.set("variantId", vehicleOverview.variantId);
        if (vehicleOverview?.variantName) queryParams.set("variant", vehicleOverview.variantName);

        if (vehicleOverview?.price) {
            // "this min and max is 20 - main price + 20 for max"
            // Wait, maybe price - 20% and + 20%
            const minPriceLakhs = Math.max(0, (vehicleOverview.price * 0.8) / 100000).toFixed(2);
            const maxPriceLakhs = ((vehicleOverview.price * 1.2) / 100000).toFixed(2);
            queryParams.set("budget", `${minPriceLakhs}-${maxPriceLakhs}`);
        }

        router.push(`/search?${queryParams.toString()}`);
    };

    return (
        <div className="w-full">
            {/* Header (title only) */}
            <div className="flex flex-col items-start gap-2">
                <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
                    Similar
                    <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-linear-to-r from-neutral-100 to-transparent" />
                </p>

                <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
                    <span className="text-fourth"> Similar </span>  Vehicle
                </h2>

                <p className="text-third">
                    Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur..
                </p>
            </div>

            {/* Cards Grid */}
            <div
                className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
                {loading ? (
                    [...Array(4)].map((_, i) => (
                        <VehicleCardSkeleton key={`skel-${i}`} />
                    ))
                ) : (
                    vehicle.map((car) => (
                        <VehicleCard key={car.id} data={car} />
                    ))
                )}
            </div>

            {/* Bottom Right Button */}
            <div className="mt-6 flex justify-end">
                <Button size="sm" variant="outlineAnimated" onClick={handleViewMore}>View More</Button>
            </div>
        </div>
    );
}

export default SimulerVehicle;
