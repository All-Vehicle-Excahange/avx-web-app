
import React, { useEffect, useState } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import { getWhereYouLeftOff } from "@/services/user.service";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";

const ShowcaseSection = () => {
  const [vehicle, setVehicle] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = {
          pageNo: 1,
          size: 4,
        };

        const res = await getWhereYouLeftOff(data);

        // Ensure state always receives an array
        setVehicle(res?.data || []);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setVehicle([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Safe check before accessing .length
  if (!loading && (!Array.isArray(vehicle) || vehicle.length === 0)) return null;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">

        <div className="flex flex-col items-start gap-2">
          <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
            Continue
            <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-gradient-to-r from-neutral-100 to-transparent" />
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
            <span className="text-fourth">Continue </span> Where you Left Off
          </h2>
          <p className="text-third ">
            Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur..
          </p>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="flex-1 min-h-0 grid sm:items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading
          ? [...Array(4)].map((_, i) => <VehicleCardSkeleton key={`skel-${i}`} />)
          : vehicle.map((car) => (
              <VehicleCard data={car} key={car.id} source="home" />
            ))
        }
      </div>

      {/* Button */}
      <div className="mt-4 flex justify-end">
        <Button href="/search" variant="outlineAnimated" size="md">
          Explore All Vehicles
        </Button>
      </div>
    </div>
  );
};

export default ShowcaseSection;

