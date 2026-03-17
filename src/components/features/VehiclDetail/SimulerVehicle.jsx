import React, { useEffect, useState } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import { getSimularVehicles } from "@/services/user.service";
import { useParams } from "next/navigation";

function SimulerVehicle() {

    const [vehicle, setVehicle] = useState([])
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = {
                    pageNo: 1, size: 8, id: id
                }
                const res = await getSimularVehicles(data)
                setVehicle(res.data)
            } catch (error) {
                console.log(error);
            }
        }

        if (id) {
            fetchVehicles();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [id]);

    return (
        <div className="w-full">
            {/* Header (title only) */}
            <div className="flex items-start gap-4">
                {/* VERTICAL ACCENT LINE */}
                <span className="w-2 h-[52px] rounded-full bg-linear-to-b from-blue-500 to-white-400" />

                {/* TEXT */}
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
                        Similar Vehicle                        </h2>

                    <p className="text-third mt-1 mb-4">
                        Lorem ipsum dolor sit amet consectetur dolor sit amet
                        consectetur..
                    </p>
                </div>
            </div>

            {/* Cards Grid */}
            <div
                className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
        "
            >
                {vehicle.map((car) => (
                    <VehicleCard key={car.id} data={car} />
                ))}
            </div>

            {/* Bottom Right Button */}
            <div className="mt-6 flex justify-end">
                <Button size="sm" variant="outlineAnimated">View More</Button>
            </div>
        </div>
    );
}

export default SimulerVehicle;
