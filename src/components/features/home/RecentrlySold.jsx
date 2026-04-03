import { useState, useEffect } from "react";
import VehicleCard from "@/components/ui/const/VehicleCard";
import Button from "@/components/ui/button";
import { getRecentlySold } from "@/services/user.service";
import VehicleCardSkeleton from "@/components/ui/skeleton/VehicleCardSkeleton";


const RecentrlySold = () => {
  const [vehicle, setVehicle] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = {
          pageNo: 1, size: 4
        }
        const res = await getRecentlySold(data)
        setVehicle(res.data)
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles()
  }, [])

  if (!loading && !vehicle.length) return null;

  return (
    <div className="w-full py-10">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div className="flex flex-col items-start gap-2">
          <p className="mb-2 inline-block text-sm tracking-[0.4em] uppercase text-third font-semibold relative">
            Recently
            <span className="absolute left-0 -bottom-2 h-0.5 w-16 bg-gradient-to-r from-neutral-100 to-transparent" />
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-primary tracking-tight text-primary">
            <span className="text-fourth">Recently</span>   Sold on Reecomm
          </h2>
          <p className="text-third ">
            Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur..
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid sm:items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading
          ? [...Array(4)].map((_, i) => <VehicleCardSkeleton key={`skel-${i}`} />)
          : vehicle.map((car) => (
            <VehicleCard data={car} key={car.id} source="home" />
          ))
        }
      </div>
      <div className="mt-4 flex justify-end">
        <Button href="/search" variant="outlineAnimated" size="md">
          Explore All Vehicles
        </Button>
      </div>
    </div>
  );
};

export default RecentrlySold;
