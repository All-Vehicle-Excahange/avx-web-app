"use client";

import React, { useEffect, useState } from "react";
import {
    MapPin,
    MessageCircle,
    Star,
    Users,
    Briefcase,
    Car,
    CheckCircle,
    IndianRupee,
    CornerUpRight,
    ExternalLink,
} from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/router";
import { followConsultant, getStoreFrontByUsername, unFollowConsultant } from "@/services/user.service";
import LoginPopup from "@/components/auth/LoginPopup";
import { useAuthStore } from "@/stores/useAuthStore";
import SignupPopup from "@/components/auth/SignupPopup";
import DownloadAppPopup from "@/components/ui/DownloadAppPopup";
import SharePopup from "@/components/ui/SharePopup";
import StoreFrontHeroSkeleton from "@/components/ui/skeleton/StoreFrontHeroSkeleton";


export default function StoreFrontHeroSection() {
    const router = useRouter();
    const { id } = router.query;

    const [comsultDetails, setComsultDetails] = useState(null);
    const [isFollower, setIsFollower] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isDownloadAppOpen, setIsDownloadAppOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);


    useEffect(() => {
        const fetchStoreFront = async () => {
            try {
                const res = await getStoreFrontByUsername(id);

                if (res?.data) {
                    setComsultDetails(res.data);
                    setIsFollower(res.data.isFollower || false);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (id) fetchStoreFront();
    }, [id]);

    if (!comsultDetails) return <StoreFrontHeroSkeleton />;

    const formatServiceName = (service) =>
        service
            ?.toLowerCase()
            ?.split("_")
            ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            ?.join(" ");

    const formattedPrice =
        comsultDetails.minVehiclePrice &&
            comsultDetails.maxVehiclePrice
            ? `₹${Number(
                comsultDetails.minVehiclePrice
            ).toLocaleString()} - ₹${Number(
                comsultDetails.maxVehiclePrice
            ).toLocaleString()}`
            : "-";

    const formatFollowerCount = (count) => {
        if (!count) return "0";
        if (count >= 1000) {
            // Using toFixed(1) means 1100 -> 1.1, 1000 -> 1.0
            // We can replace ".0" with nothing so 1000 -> 1K
            return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K";
        }
        return count.toString();
    };

    const handleFollowToggle = async () => {
        if (!comsultDetails?.id) return;

        if (!isLoggedIn) {
            setIsLoginOpen(true);
            return;
        }


        const previousState = isFollower;

        try {
            // Optimistic update
            setIsFollower(!previousState);
            setComsultDetails((prev) => ({
                ...prev,
                followersCount: previousState
                    ? (prev.followersCount || 1) - 1
                    : (prev.followersCount || 0) + 1,
            }));

            if (previousState) {
                // Currently following → Unfollow
                await unFollowConsultant(comsultDetails.id);
            } else {
                // Currently not following → Follow
                await followConsultant(comsultDetails.id);
            }
        } catch (error) {
            console.log("Follow/Unfollow error:", error);

            // Revert if API fails
            setIsFollower(previousState);
            setComsultDetails((prev) => ({
                ...prev,
                followersCount: previousState
                    ? (prev.followersCount || 0) + 1
                    : (prev.followersCount || 1) - 1,
            }));
        }
    };


    return (
        <>
            <section
                className="w-full max-w-[1480px] mt-10 mx-auto border border-third/40 rounded-[1rem]  md:rounded-[2.5rem] overflow-hidden shadow-sm">

                {/* ================= BANNER ================= */}
                <div
                    className="w-full h-54 md:h-80 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${comsultDetails.bannerUrl})`,
                    }}
                />

                {/* ================= CONTENT AREA ================= */}
                <div className="px-6 md:px-10 py-4 relative">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* LEFT COLUMN */}
                        <div className="flex flex-col items-center -mt-20 z-30 w-full lg:w-48 shrink-0">

                            <div
                                className="relative w-42 h-42 rounded-full overflow-hidden bg-primary border-4 border-white shadow-xl">
                                <Image
                                    src={comsultDetails.logoUrl}
                                    alt="Consultant Logo"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* subscribe btn */}
                            <div className="mt-6 w-full">
                                <button
                                    onClick={handleFollowToggle}
                                    type="button"
                                    className={`group w-full rounded-full px-4 py-2 border flex items-center justify-center gap-2 font-medium cursor-pointer transition-all duration-300 ease-in-out ${isFollower
                                        ? "bg-fourth text-primary border-fourth hover:bg-transparent hover:text-fourth"
                                        : "bg-primary text-secondary border-primary hover:bg-transparent hover:text-primary"
                                        }`}
                                >
                                    <span className="transition-colors duration-300">
                                        {isFollower ? "Unsubscribe" : "Subscribe"}
                                    </span>

                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all duration-300 ${isFollower
                                            ? "bg-primary/10 text-primary group-hover:bg-fourth/10 group-hover:text-primary"
                                            : "bg-secondary/10 text-secondary group-hover:bg-primary/10 group-hover:text-primary"
                                            }`}
                                    >
                                        {formatFollowerCount(comsultDetails.followersCount)}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* CENTER COLUMN */}
                        <div className="flex-1 space-y-4 pt-2">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-3xl font-semibold text-primary leading-tight">
                                        {comsultDetails.consultationName}
                                    </h1>

                                    <Button
                                        onClick={() => setIsShareOpen(true)}
                                        size="sm"
                                        className="flex h-9 w-9 items-center justify-center rounded-full p-0 text-primary/80 hover:text-primary !bg-transparent"
                                    >
                                        <ExternalLink className="h-5 w-5" />
                                    </Button>
                                </div>

                                <p className="flex items-center gap-1.5 text-third mt-1">
                                    <MapPin className="w-4 h-4 shrink-0" />
                                    <span className="text-sm">
                                        {[
                                            comsultDetails?.address?.address,
                                            comsultDetails?.address?.city,
                                            comsultDetails?.address?.state,
                                        ]
                                            .filter(Boolean)
                                            .join(", ") || "N/A"}
                                    </span>
                                </p>
                            </div>

                            {/* STATS GRID */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-y-5 gap-x-6 py-4">
                                {[
                                    {
                                        label: "Rating",
                                        value: comsultDetails.averageRating ?? 0,
                                        icon: Star,
                                    },
                                    {
                                        label: "Available Vehicles",
                                        value: comsultDetails.availableVehicles ?? 0,
                                        icon: Car,
                                    },
                                    {
                                        label: "Sold Vehicles",
                                        value: comsultDetails.soldVehiclesCount ?? 0,
                                        icon: CheckCircle,
                                    },
                                    {
                                        label: "Price Range",
                                        value: formattedPrice,
                                        icon: IndianRupee,
                                    },
                                    {
                                        label: "Since",
                                        value: comsultDetails.establishmentYear || "N/A",
                                        icon: Briefcase,
                                    },
                                ].map(({ label, value, icon: Icon }) => (
                                    <div key={label} className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/5 rounded-lg border border-primary/10">
                                            <Icon className="w-4 h-4 text-third" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase text-third font-semibold leading-none mb-1">
                                                {label}
                                            </p>
                                            <p className="text-sm font-semibold text-primary leading-none">
                                                {value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="w-full lg:w-80 space-y-6 pt-2">

                            <div className="space-y-3">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-third">
                                    Services Provided
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {comsultDetails?.services?.length > 0 ? (
                                        comsultDetails.services.map((service) => (
                                            <span
                                                key={service}
                                                className="px-3 py-1.5 text-[11px] font-medium border border-third rounded-full text-primary hover:bg-primary/5 transition-colors cursor-default"
                                            >
                                                {formatServiceName(service)}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-xs text-third italic">
                                            No services listed
                                        </span>
                                    )}
                                </div>

                            </div>

                            <div className="flex gap-3 pt-15">
                                <Button size="sm" variant="ghost" onClick={() => setIsDownloadAppOpen(true)}>
                                    Start Chat
                                    <MessageCircle className="ml-2 w-4 h-4" />
                                </Button>

                                <Button size="sm" variant="ghost">
                                    Get Directions
                                    <CornerUpRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <LoginPopup
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSignup={() => {
                    setIsLoginOpen(false);
                    setIsSignupOpen(true);
                }}
            />
            <SignupPopup
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
                onLogin={() => {
                    setIsSignupOpen(false);
                    setIsLoginOpen(true);
                }}
            />
            <DownloadAppPopup
                isOpen={isDownloadAppOpen}
                onClose={() => setIsDownloadAppOpen(false)}
            />
            <SharePopup
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                shareUrl={currentUrl}
                title={comsultDetails?.consultationName || "Check this store"}
            />
        </>
    );
}
