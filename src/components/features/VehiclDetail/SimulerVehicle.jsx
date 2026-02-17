import React, {useEffect, useState} from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import {getSimularVehicles} from "@/services/user.service";
import {useParams} from "next/navigation";

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
        fetchVehicles();
    }, []);

    const vehicles = Array.from({length: 8}, (_, i) => ({
        id: i + 1,
        title: "BMW 8-serie 2-door",
        subtitle: "35 D6 Powerful lorem isump",
        year: "2022",
        transmission: "Manual",
        fuel: "Diesel",
        seats: "5",
        drivetrain: "Front Wheel Drive",
        rating: "4.3",
        price: "6,75,998",
        image: "/big_card_car.jpg",
        sponsored: i < 2,
    }));

    return (
        <div className="w-full">
            {/* Header (title only) */}
            <div className="mb-5">
                <h2 className="text-3xl font-bold text-primary">Similar Vehicle</h2>
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
                    <VehicleCard key={car.id} data={car}/>
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
