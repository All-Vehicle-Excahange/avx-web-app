/* eslint-disable react-hooks/set-state-in-effect */
import Image from "next/image";
import {
    MessageSquare,
    Calendar,
    IndianRupee,
    MoreVertical,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { getSellerTierTitle } from "@/lib/helper";
import { useRouter } from "next/router";

export default function TopPerformingCard({ vehicle, rank }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!vehicle) return null;
    
    const router = useRouter();
    const vehicleTitle = `${vehicle.makerName} ${vehicle.modelName} ${vehicle.variantName}`;
    const isShowInspectionBtn = vehicle?.inspectionStatus === "NOT_INSPECTED";
    const vehicleImage = vehicle.thumbnailUrl || "/big_card_car.jpg";

    const listingDate = vehicle.listingDate
        ? new Date(vehicle.listingDate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        : "N/A";

    const formattedPrice = vehicle.price
        ? `₹ ${Number(vehicle.price).toLocaleString("en-IN")}`
        : "N/A";

    const tier = getSellerTierTitle()

    return (
        <div className="relative rounded-2xl border border-third/40 p-4 lg:px-5 lg:py-4 flex flex-col sm:flex-row items-start gap-4 shadow-sm hover:shadow-md transition">

            {/* 3 DOT MENU */}
            <div className="absolute top-3 right-3 " ref={menuRef}>
                <button
                    onClick={() => setOpen(!open)}
                    className="p-1.5 rounded-full hover:bg-primary/10 transition cursor-pointer"
                >
                    <MoreVertical size={18} className="text-primary" />
                </button>
                {open && (
                    <div className="absolute  bg-secondary/10 backdrop-blur-2xl right-0 mt-2 w-44 rounded-xl border border-third/20 shadow-lg z-50 overflow-hidden">

                        {/* Always visible */}
                        <Link
                            href={`/vehicle/details/${vehicle.id}`}
                            className="block px-4 py-2 text-sm hover:bg-primary/5 text-primary"
                        >
                            View Listing
                        </Link>
                        {tier !== "BASIC" && (
                            <>
                                <button
                                    className="w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-primary/5 text-primary"
                                    onClick={() => {
                                        setOpen(false);
                                        console.log("Boost listing", vehicle.id);
                                    }}
                                >
                                    Boost Listing
                                </button>

                                <button
                                    className="w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-primary/5 text-primary"
                                    onClick={() => {
                                        setOpen(false);
                                        console.log("Improve listing", vehicle.id);
                                    }}
                                >
                                    Improve Listing
                                </button>
                            </>
                        )}
                        {vehicle?.inspectionStatus === "NOT_INSPECTED" && (
                            <button
                                className="w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-primary/5 text-primary"
                                onClick={() => {
                                    setOpen(false);
                                    console.log("Request Inspection", vehicle.id);
                                }}
                            >
                                Request Inspection
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* IMAGE */}
            <div className="relative w-full   sm:w-36 h-26 rounded-xl overflow-hidden border border-third/30 bg-primary/5 shrink-0">
                <Image
                    src={vehicleImage}
                    alt={vehicleTitle}
                    fill
                    onClick={() => router.push(`/vehicle/details/${vehicle.id}`)}
                    className="object-cover cursor-pointer"

                />
                {rank && (
                    <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-primary text-secondary text-xs font-bold flex items-center justify-center shadow-md">
                        #{rank}
                    </div>
                )}
            </div>

            {/* CONTENT */}
            <div className="flex-1 space-y-2 w-full pr-6">
                <h4 className="text-sm md:text-base font-bold text-primary line-clamp-1">
                    {vehicleTitle}
                </h4>

                <p className="flex items-center gap-1.5 text-sm font-semibold text-third">
                    <IndianRupee size={13} />
                    {formattedPrice}
                </p>

                <p className="flex items-center gap-1.5 text-xs text-third/80">
                    <Calendar size={13} />
                    Listed:{" "}
                    <span className="text-primary font-semibold">{listingDate}</span>
                </p>

                <p className="flex items-center gap-1.5 text-xs text-third/80">
                    <MessageSquare size={13} />
                    Inquiries:{" "}
                    <span className="text-primary font-semibold">
                        {vehicle.totalInquiries ?? 0}
                    </span>
                </p>
            </div>
        </div>
    );
}