"use client";

import { Fragment } from "react";

import Item from "@/components/ui/Item";
import {
  Calendar,
  CalendarDays,
  Fuel,
  Gauge,
  Settings,
  MapPin,
  Users,
  ShieldX,
  Key,
  BadgeCheck,
  FileText,
  Truck,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import Image from "next/image";
import SkeletonBox from "@/components/ui/skeleton/SkeletonBox";

export default function VehicleOverview({ vehicle }) {
  if (!vehicle?.id) {
    return (
      <section className="relative rounded-2xl overflow-hidden text-primary border border-third/60 p-6">
        <SkeletonBox className="h-6 w-40 mb-6" rounded="rounded-md" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <SkeletonBox className="h-3 w-16" rounded="rounded-md" />
              <SkeletonBox className="h-4 w-24" rounded="rounded-md" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  const isInsuranceActive = vehicle?.vehicleDocument?.insurance ?? false;
  const hasSpareKey = vehicle?.spareKey ?? false;

  const formatInsuranceType = (type) => {
    if (!type) return "NA";

    return type
      .toLowerCase()
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const speedometerImage =
    vehicle?.vehicleImages?.find(
      (img) => img.imageKey?.toLowerCase() === "speedometer",
    )?.imageUrl || "";

  return (
    <section className="relative rounded-2xl overflow-hidden text-primary border border-third/60">
      {/* Reduced padding on mobile (p-4) and normal on desktop (md:p-6) */}
      <div className="relative z-10 p-4 md:p-6 space-y-4 md:space-y-6">
        <h3 className="text-lg md:text-xl font-semibold">Vehicle Overview</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4 md:gap-x-8 md:gap-y-6 text-xs md:text-sm">
          {[
            {
              icon: <Calendar />,
              label: "Reg. Date",
              value: vehicle?.vehicleDocument?.regDate
                ? new Date(vehicle.vehicleDocument.regDate)
                  .toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(" ", "-")
                : "-",
            },
            {
              custom: (
                <div className="relative group" key="km-driven">
                  <div className="relative">
                    <Item
                      icon={<Gauge />}
                      label={
                        <span className="flex items-center gap-2">
                          KM driven
                          <Info
                            size={14}
                            className="text-third hover:text-primary cursor-pointer"
                          />
                        </span>
                      }
                      value={
                        vehicle?.kmDriven
                          ? `${vehicle.kmDriven.toLocaleString("en-IN")} km`
                          : "-"
                      }
                    />
                  </div>
                  {speedometerImage?.trim() && (
                    <div className="absolute right-0 top-8 z-50 hidden group-hover:block">
                      <div className="rounded-lg border bg-background shadow-lg p-2 w-40">
                        <div className="relative w-full h-24">
                          <Image
                            src={speedometerImage}
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
                  )}
                </div>
              ),
            },
            {
              icon: <Fuel />,
              label: "Fuel",
              value: (() => {
                let res =
                  vehicle?.isCngFitted && vehicle?.fuelType
                    ? `${vehicle.fuelType} + CNG`
                    : vehicle?.fuelType || "CNG";

                res = res.replace(/_/g, " ");
                let base = res.replace(/plus\s+cng/i, "").replace(/\+\s*cng/i, "").trim();
                let capitalizedBase = base.charAt(0).toUpperCase() + base.slice(1).toLowerCase();

                if (vehicle?.isCngFitted || vehicle?.fuelType?.toLowerCase().includes("cng")) {
                  if (!capitalizedBase || capitalizedBase.toUpperCase() === "CNG") {
                    return "CNG";
                  }
                  return `${capitalizedBase} + CNG`;
                }

                return capitalizedBase || "CNG";
              })(),
            },
            {
              icon: <Users />,
              label: "Ownership",
              value: vehicle?.ownership || "1st",
            },
            {
              icon: <Settings />,
              label: "Transmission",
              value: vehicle?.transmissionType || "NA",
            },
            {
              icon: <BadgeCheck />,
              label: "Reg number",
              value:
                vehicle?.fuelType === "ELECTRIC" ||
                  vehicle?.fuelType === "EV" ? (
                  <span className="text-green-600 dark:text-green-400 font-semibold  ">
                    {vehicle?.vehicleDocument?.regNumber || "NA"}
                  </span>
                ) : vehicle?.isCommercialVehicle ? (
                  <span className="text-yellow-600 dark:text-yellow-400 font-semibold  ">
                    {vehicle?.vehicleDocument?.regNumber || "NA"}
                  </span>
                ) : (
                  vehicle?.vehicleDocument?.regNumber || "NA"
                ),
            },
            {
              icon: isInsuranceActive ? <ShieldCheck /> : <ShieldX />,
              label: "Insurance Status",
              value: isInsuranceActive ? "Active" : "Expired",
            },
            {
              icon: <FileText />,
              label: "Insurance Type",
              value: formatInsuranceType(
                vehicle?.vehicleDocument?.typeOfInsurance,
              ),
            },
            isInsuranceActive && {
              icon: <CalendarDays />,
              label: "Insurance Expiry",
              value: vehicle?.vehicleDocument?.insuranceExpiryDate
                ? new Date(vehicle.vehicleDocument.insuranceExpiryDate)
                  .toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(" ", "-")
                : "-",
            },
            {
              icon: <MapPin />,
              label: "Registered State",
              value: vehicle?.vehicleDocument?.regState || "-",
            },
            {
              icon: <Key />,
              label: "Spare key",
              value: hasSpareKey ? "Available" : "Not Available",
            },
            {
              icon:
                vehicle?.challanStatus === "Clear" ? (
                  <CheckCircle />
                ) : (
                  <AlertCircle />
                ),
              label: "Challan Status",
              value: vehicle?.challanStatus || "Clear",
            },
            {
              icon: <Truck />,
              label: "Commercial Vehicle",
              value: vehicle?.isCommercialVehicle ? "Yes" : "No",
            },
            vehicle?.isCommercialVehicle && {
              icon: <CalendarDays />,
              label: "Permit Expiry",
              value: vehicle?.vehicleDocument?.permitExpiryDate
                ? new Date(vehicle.vehicleDocument.permitExpiryDate)
                  .toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(" ", "-")
                : "-",
            },
            vehicle?.vehicleDocument?.puc && {
              icon: <CalendarDays />,
              label: "PUC Expiry",
              value: vehicle?.vehicleDocument?.pucExpiryDate
                ? new Date(vehicle.vehicleDocument.pucExpiryDate)
                  .toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(" ", "-")
                : "-",
            },
            vehicle?.isCngFitted && {
              icon: <Fuel />,
              label: "CNG Type",
              value: vehicle?.cngType || "-",
            },
          ]
            .filter(Boolean)
            .map((item, index, arr) => {
              // Add a divider after every 4 items, except after the last item
              const isLastInRow =
                (index + 1) % 4 === 0 && index !== arr.length - 1;
              return (
                <Fragment key={index}>
                  {item.custom ? (
                    item.custom
                  ) : (
                    <Item
                      icon={item.icon}
                      label={item.label}
                      value={item.value}
                    />
                  )}
                  {isLastInRow && <Divider />}
                </Fragment>
              );
            })}
        </div>
      </div>
    </section>
  );
}

// Added col-span-2 for mobile so the line stretches across both columns
function Divider() {
  return <div className="col-span-2 md:col-span-4 border border-third/40" />;
}