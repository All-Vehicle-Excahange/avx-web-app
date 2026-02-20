"use client";

import LoginPopup from "@/components/auth/LoginPopup";
import SignupPopup from "@/components/auth/SignupPopup";
import Button from "@/components/ui/button";
import {useState} from "react";
import {useRouter} from "next/navigation";

import {useAuthStore} from "@/stores/useAuthStore";
import {logoutUser} from "@/services/auth.service";

export default function AccountPopup({open, onClosePopup}) {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const role = "BUYER"; // Change dynamically later BUYER/CONSULTANT

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const user = useAuthStore((state) => state.user);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const logout = useAuthStore((state) => state.logout);

    const router = useRouter();

    const navigate = (path) => {
        router.push(path);
        onClosePopup();
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (err) {
            console.log("Logout API failed, clearing state anyway...");
        }

        logout();
        setShowLogoutConfirm(false);
    };

    return (
        <>
            <div
                className={`fixed top-[70px] right-6 w-[380px]
        bg-secondary text-primary
        rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.45)]
        border border-white/10
        transition-all duration-150 ease-out z-50
        ${
                    open
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible translate-y-1"
                }`}
            >
                <div
                    className="absolute -top-2 right-10 w-4 h-4 rotate-45 bg-secondary border-l border-t border-white/10"/>

                {/* HEADER */}
                <div className="p-4 border-b border-white/10 text-center">
                    {!isLoggedIn ? (
                        <>
                            <Button
                                variant="ghost"
                                full
                                size="sm"
                                onClick={() => {
                                    setIsLoginOpen(true);
                                    onClosePopup();
                                }}
                            >
                                Sign in
                            </Button>

                            <p className="mt-2 text-xs text-primary/60">
                                New customer?{" "}
                                <span
                                    onClick={() => {
                                        setIsSignupOpen(true);
                                        setIsLoginOpen(false);
                                        onClosePopup();
                                    }}
                                    className="text-third hover:underline cursor-pointer"
                                >
                  Start here.
                </span>
                            </p>
                        </>
                    ) : (
                        <p className="text-lg font-bold text-primary">
                            Hello, {user?.firstname} {user?.lastname}
                        </p>
                    )}
                </div>

                {/* ================= CONTENT ================= */}

                {/* NOT LOGGED IN */}
                {!isLoggedIn && (
                    <div className="px-5 py-4 text-[13px] leading-7 grid grid-cols-2 gap-6">
                        <Section title="Buyer Tools">
                            <Item onClick={() => {
                                setIsLoginOpen(true);
                                onClosePopup();
                            }}>Saved Vehicles</Item>
                            <Item onClick={() => {
                                setIsLoginOpen(true);
                                onClosePopup();
                            }}>Compare Vehicles</Item>
                            <Item onClick={() => navigate("/")}>Recently Viewed</Item>
                            <Item onClick={() => {
                                setIsLoginOpen(true);
                                onClosePopup();
                            }}  >My Inquiries</Item>
                        </Section>

                        <Section title="Sell & Earn">
                            <Item onClick={() => {
                                setIsLoginOpen(true);
                                onClosePopup();
                            }}>Sell Your Vehicle</Item>
                            <Item onClick={() => {
                                setIsLoginOpen(true);
                                onClosePopup();
                            }} >Track Your Listing</Item>
                            <Item onClick={() => {
                                setIsLoginOpen(true);
                                onClosePopup();
                            }} >Request AVX Inspection</Item>
                        </Section>

                        <Section title="Business">
                            <Item onClick={() => navigate("/consult")}>Become a Consultant</Item>
                            <Item onClick={() => navigate("/consult")}>Consultant Pricing</Item>
                        </Section>

                        <Section title="Support">
                            <Item onClick={() => navigate("/help")}>Help Center</Item>
                            <Item onClick={() => navigate("/contact")}>Contact AVX</Item>
                        </Section>
                    </div>
                )}

                {/* LOGGED IN */}
                {isLoggedIn && (
                    <div className="px-5 py-4 text-[13px] leading-7 grid grid-cols-2 gap-6">
                        {role === "BUYER" && (
                            <>
                                <Section title="Your Activity">
                                    <Item onClick={() => navigate("/user/details/wishlist")}>Saved Vehicles</Item>
                                    {/*<Item onClick={() => navigate("/")}>Recently Viewed</Item>*/}
                                    <Item onClick={() => navigate("/compare")}>Compare List</Item>
                                    <Item onClick={() => navigate("/user/details/inquaries")}>My Inquiries</Item>
                                    <Item onClick={() => navigate("/user/details/inspections")}>Inspection
                                        Requests</Item>
                                </Section>

                                <Section title="Buying Tools">
                                    <Item onClick={() => navigate("/inspection-request")}>Request AVX Inspection</Item>
                                    <Item onClick={() => navigate("/track-bookings")}>Track Bookings</Item>
                                </Section>

                                <Section title="Selling">
                                    <Item onClick={() => navigate("/user/details/myvehicle")}>Sell Your Vehicle (MY
                                        Garage)</Item>
                                    <Item onClick={() => navigate("/user/details/myvehicle")}>My Listing</Item>
                                </Section>

                                <Section title="Subscriptions">
                                    <Item onClick={() => navigate("/user/details/wishlist")}>Followed Consultants</Item>
                                </Section>

                                <Section title="Support">
                                    <Item onClick={() => navigate("/help")}>Help Center</Item>
                                    <Item onClick={() => navigate("/contact")}>Contact AVX</Item>
                                </Section>
                            </>
                        )}

                        {role === "CONSULTANT" && (
                            <>
                                <Section title="Dashboard">
                                    <Item onClick={() => navigate("/consult/dashboard")}>Overview</Item>
                                    <Item onClick={() => navigate("/consult/dashboard/inventory")}>Inventory</Item>
                                    <Item onClick={() => navigate("/consult/dashboard/inquiries")}>Inquiries</Item>
                                    <Item onClick={() => navigate("/consult/dashboard/inspections")}>Inspections</Item>
                                    <Item onClick={() => navigate("/consult/dashboard/analytics")}>Analytics</Item>
                                    <Item onClick={() => navigate("/consult/dashboard/ppt")}>PPC & Boost</Item>
                                </Section>

                                <Section title="Storefront">
                                    <Item onClick={() => navigate("/store-front")}>View Storefront</Item>
                                    <Item onClick={() => navigate("/consult/dashboard/storefront")}>Edit
                                        Storefront</Item>
                                    <Item onClick={() => navigate("/consult/dashboard/storefront")}>Theme
                                        Settings</Item>
                                </Section>

                                <Section title="Billing">
                                    <Item onClick={() => navigate("/consult/dashboard/billing")}>Wallet</Item>
                                    <Item onClick={() => navigate("/consult/dashboard/billing")}>Subscription
                                        Plan</Item>
                                    <Item onClick={() => navigate("/consult/dashboard/billing")}>Transaction
                                        History</Item>
                                </Section>

                                {/*<Section title="Performance">*/}
                                {/*  <Item onClick={() => navigate("/ranking-insights")}>Ranking Insights</Item>*/}
                                {/*  <Item onClick={() => navigate("/profile-strength")}>Profile Strength</Item>*/}
                                {/*</Section>*/}

                                <Section title="Support">
                                    <Item onClick={() => navigate("/consultant-help")}>Consultant Help</Item>
                                    <Item onClick={() => navigate("/raise-ticket")}>Raise Ticket</Item>
                                </Section>
                            </>
                        )}
                    </div>
                )}

                {/* Logout */}
                {isLoggedIn && (
                    <div className="p-4 border-t border-white/10">
                        <Button
                            variant="ghost"
                            full
                            size="sm"
                            onClick={() => setShowLogoutConfirm(true)}
                            className="text-red-500 font-semibold hover:bg-red-500/10"
                        >
                            Logout
                        </Button>
                    </div>
                )}
            </div>

            {/* Logout Confirmation */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-999 flex items-center justify-center bg-secondary/50 backdrop-blur-sm">
                    <div
                        className="w-[440px] rounded-xl bg-secondary border border-white/10 shadow-2xl p-6 text-center">
                        <h2 className="text-lg font-bold text-primary mb-2">
                            Confirm Logout
                        </h2>

                        <p className="text-sm text-primary/70 mb-6">
                            Are you sure you want to logout?
                        </p>

                        <div className="flex gap-3">
                            <Button
                                variant="default"
                                full
                                size="sm"
                                onClick={() => setShowLogoutConfirm(false)}
                                className="border border-white/10"
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="ghost"
                                full
                                size="sm"
                                onClick={handleLogout}
                                className="text-red-500 font-semibold hover:bg-red-500/10"
                            >
                                Yes, Logout
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <LoginPopup
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSignup={() => {
                    setIsSignupOpen(true);
                    setIsLoginOpen(false);
                }}
            />

            <SignupPopup
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
                onLogin={() => {
                    setIsLoginOpen(true);
                    setIsSignupOpen(false);
                }}
            />
        </>
    );
}

/* ================= SMALL REUSABLE COMPONENTS ================= */

function Section({title, children}) {
    return (
        <div>
            <p className="font-bold mb-2 text-primary">{title}</p>
            <ul className="space-y-1 text-primary/70">{children}</ul>
        </div>
    );
}

function Item({children, onClick}) {
    return (
        <li
            onClick={onClick}
            className="hover:text-third cursor-pointer hover:underline"
        >
            {children}
        </li>
    );
}
