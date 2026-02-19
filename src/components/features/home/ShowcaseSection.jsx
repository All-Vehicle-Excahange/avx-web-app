import React, {useEffect, useState} from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import {getWhereYouLeftOff} from "@/services/user.service";



const ShowcaseSection = () => {

    const [vehicle, setVehicle] = useState([])

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = {
                    pageNo: 1, size: 4
                }
                const res = await getWhereYouLeftOff(data)
                setVehicle(res.data)
            } catch (error) {
                throw error;
            }
        }
        fetchVehicles()
    }, [])

    if (!vehicle.length) return null;

    return (
        <div className="w-full ">
            {/* Header */}
            <div className="flex justify-between items-end mb-6">
                <div className="flex items-start gap-4">
                    {/* VERTICAL ACCENT LINE */}
                    <span className="w-2 h-[52px] rounded-full bg-linear-to-b from-blue-500 to-white-400"/>

                    {/* TEXT */}
                    <div>
                        <h2 className="text-3xl font-bold font-primary tracking-tight text-primary">
                            Continue Where you Left Off
                        </h2>

                        <p className="text-third mt-1">
                            Lorem ipsum dolor sit amet consectetur dolor sit amet
                            consectetur..
                        </p>
                    </div>
                </div>
            </div>

            <div className=" flex-1 min-h-0 grid sm:items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {vehicle.map((car) => (
                    <VehicleCard data={car} key={car.id}/>
                ))}
            </div>
            <div className="mt-4 flex justify-end">
                <Button href="/search" variant="outlineAnimated" size="md">
                    Explore All Vehicles
                </Button>
            </div>
        </div>
    );
};

export default ShowcaseSection;
