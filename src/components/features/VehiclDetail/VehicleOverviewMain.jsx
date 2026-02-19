"use client";

import Item from "@/components/ui/Item";
import {
  Calendar,
  Fuel,
  Gauge,
  Settings,
  MapPin,
  Users,
  ShieldX,
  Key,
  BadgeCheck,
  FileText,
  Receipt,
  Truck,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import Image from "next/image";
import {useParams} from "next/navigation";
import {getVehicleOverview} from "@/services/vehicle.service";
import {useEffect, useState} from "react";


export default function VehicleOverview({ vehicle }) {
  const params = useParams();
  const id = params.id;
  const [vehicleOverview, setVehicleOverview] = useState({});

  useEffect(() => {
    const  fetchOverview = async () => {
      try {
        const  res = await  getVehicleOverview(id)
        setVehicleOverview(res.data)
      }catch (error) {
        console.log(error);
      }
    }
    fetchOverview();
  }, [id])

  const isInsuranceActive =
      vehicleOverview.vehicleDocument?.insurance ?? false;
  const hasSpareKey = vehicleOverview?.spareKey ?? false;

  return (
    <section className="relative rounded-2xl overflow-hidden  text-primary border border-third/60">

      <div className="relative z-10 p-6 space-y-6">

        <h3 className="text-xl font-semibold">Vehicle Overview</h3>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 text-sm">
          {/* ROW 1 */}
          <Item
            icon={<Calendar />}
            label="Reg. year"
            value={
              vehicleOverview.vehicleDocument?.regDate
                  ? new Date(vehicleOverview.vehicleDocument.regDate)
                      .toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                      .replace(" ", "-")
                  : "-"
            }

          />

          <div className="relative group">
            {/* KM Driven Item */}
            <Item
              icon={<Gauge />}
              label="KM driven"
              value={`${vehicleOverview?.kmDriven || "25,125"} km`}
            />

            {/* Info Icon */}
            <div className="absolute top-1 right-44 text-muted-foreground hover:text-primary cursor-pointer">
              <Info size={12} />
            </div>

            {/* Hover Image Preview */}
            <div className="absolute right-0 top-8 z-50 hidden group-hover:block">
              <div className="rounded-lg border bg-background shadow-lg p-2 w-40">
                <div className="relative w-full h-24">
                  <Image
                    src="https://images.pexels.com/photos/6730469/pexels-photo-6730469.jpeg"
                    alt="Odometer preview"
                    fill
                    className="rounded-md object-cover"
                  />
                </div>

                <p className="mt-1 text-xs text-muted-foreground text-center">
                  Odometer reading
                </p>
              </div>
            </div>
          </div>

          <Item
            icon={<Fuel />}
            label="Fuel"
            value={vehicleOverview?.fuelType || "CNG"}
          />
          <Divider />

          {/* ROW 2 */}
          <Item
            icon={<Users />}
            label="Ownership"
            value={vehicleOverview?.ownership || "1st"}
          />
          <Item
            icon={<Settings />}
            label="Transmission"
            value={vehicleOverview?.transmissionType || "NA"}
          />
          <Item
            icon={<BadgeCheck />}
            label="Reg number"
            value={vehicleOverview.vehicleDocument?.regNumber || "NA"}
          />

          <Divider />

          {/* ROW 3 */}
          <Item
              icon={isInsuranceActive ? <ShieldCheck /> : <ShieldX />}
              label="Insurance Status"
              value={isInsuranceActive ? "Active" : "Expired"}
          />
          <Item
            icon={<FileText />}
            label="Insurance Type"
            value={vehicleOverview.vehicleDocument?.typeOfInsurance || "NA"}
          />
          <Item
            icon={<MapPin />}
            label="Registered State"
            value={vehicleOverview.vehicleDocument?.regState || "-"}
          />

          <Divider />

          {/* ROW 4 */}

          <Item
              icon={<Key />}
              label="Spare key"
              value={hasSpareKey ? "Available" : "Not Available"}
          />

          <Item
            icon={
              vehicle?.challanStatus === "Clear" ? (
                <CheckCircle />
              ) : (
                <AlertCircle />
              )
            }
            label="Challan Status"
            value={vehicle?.challanStatus || "Clear"}
          />

          <Item
            icon={<Truck />}
            label="Commercial Vehicle"
            value={vehicleOverview?.isCommercialVehicle ? "Yes" : "No"}
          />
        </div>
      </div>
    </section>
  );
}

function Divider() {
  return <div className="md:col-span-3 border border-third/40" />;
}
