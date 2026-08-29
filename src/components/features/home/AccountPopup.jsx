"use client";

import LoginPopup from "@/components/auth/LoginPopup";
import SignupPopup from "@/components/auth/SignupPopup";
import Button from "@/components/ui/button";
import { createPortal } from "react-dom";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2, Crown } from "lucide-react";

import { useAuthStore } from "@/stores/useAuthStore";
import { logoutUser } from "@/services/auth.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfileStrengthQuery } from "@/queries/user.queries";
import { getSellerTierQuery } from "@/queries/Seller.queries";
import Link from "next/link";

export default function AccountPopup({ open, onClosePopup }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLogoutClosing, setIsLogoutClosing] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pathname = usePathname();

  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  // Auto-close EVERYTHING when login happens
  const prevLoggedIn = useRef(isLoggedIn);
  useEffect(() => {
    if (isLoggedIn && !prevLoggedIn.current) {
      onClosePopup();
      setIsLoginOpen(false);
      setIsSignupOpen(false);
    }
    prevLoggedIn.current = isLoggedIn;
  }, [isLoggedIn, onClosePopup]);

  const handleCloseLogout = () => {
    setIsLogoutClosing(true);
    setTimeout(() => {
      setIsLogoutClosing(false);
      setShowLogoutConfirm(false);
    }, 250);
  };

  const handleCancelLogout = () => {
    setIsLogoutClosing(true);
    setTimeout(() => {
      setIsLogoutClosing(false);
      setShowLogoutConfirm(false);
      onClosePopup(); // Close the main AccountPopup as requested
    }, 250);
  };

  const isConsultant = ["CONSULTATION", "CONSULTANT_APPLICANT"].includes(
    user?.userRole,
  );
  const isUserSeller = user?.userRole === "USER_SELLER";

  const profileHref = user?.userRole === "CONSULTATION"
    ? "/consult/dashboard/profile"
    : "/user/details/myprofile";

  const isCurrentPage = pathname === profileHref || (profileHref === "/user/details/myprofile" && pathname?.includes("/user/details"));

  const { data: strengthRes, isLoading: isLoadingStrength } = useQuery({
    ...getUserProfileStrengthQuery(),
    enabled: !!(open && isLoggedIn),
  });
  const profileStrength = strengthRes?.data || null;

  const { data: sellerTier } = useQuery({
    ...getSellerTierQuery(),
    enabled: !!(open && isLoggedIn && isConsultant),
  });

  const getCTA = () => {
    if (!isLoggedIn) return null;

    const messages = profileStrength?.messages || [];

    if (isConsultant) {
      if (user?.userRole === "CONSULTATION") {
        return {
          label: "Go to Dashboard",
          href: "/consult/dashboard/overview",
        };
      }
      // Priority 1: KYC / Verification
      if (
        messages.some((m) =>
          ["ADD_GST", "UPLOAD_AADHAAR", "UPLOAD_PAN_CARD"].includes(m.type),
        )
      ) {
        return {
          label: "Complete Verification",
          href: "/consult/subscription",
        };
      }
      // Priority 2: Create Storefront
      if (messages.some((m) => m.type === "CREATE_STOREFRONT")) {
        return {
          label: "Create Storefront",
          href: "/consult/subscription?redirect=%2Fconsult%2Fdashboard%2FstoreFront",
        };
      }
      // Priority 3: List Vehicle
      if (messages.some((m) => m.type === "LIST_VEHICLE")) {
        return {
          label: "List Vehicle",
          href: "/consult/subscription?redirect=%2Fconsult%2Fdashboard%2Finventory",
        };
      }
      // Default for consultant
      return { label: "Go to Dashboard", href: "/consult/dashboard/overview" };
    }

    if (isUserSeller) {
      if (messages.some((m) => m.type === "LIST_VEHICLE")) {
        return { label: "List Vehicle", href: "/user/details/inventory" };
      }
      return { label: "My Activity", href: "/user/details/activity" };
    }

    // Normal User
    return { label: "My Activity", href: "/user/details/activity" };
  };

  const cta = getCTA();

  const { push } = useRouter();

  const navigate = (path) => {
    push(path);
    onClosePopup();
  };

  const wrapConsultAuth = (path) => {
    if (user?.userRole === "CONSULTATION") {
      return path;
    }
    return `/consult/subscription?redirect=${encodeURIComponent(path)}`;
  };

  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUser();
    } catch (err) {
    } finally {
      setIsLoggingOut(false);
      queryClient.clear();
      queryClient.invalidateQueries();

      // Both conditions preserved: Dashboard goes to /consult, others to /
      if (pathname?.includes("/consult/dashboard")) {
        push("/consult");
      } else {
        push("/");
      }

      logout();
      handleCloseLogout();
    }
  };

  return (
    <>
      <div
        className={`fixed top-[68px] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 w-[95vw] sm:w-[380px]
        max-h-[calc(100vh-80px)] flex flex-col
        bg-secondary text-primary
        rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.45)]
        border border-white/10
        transition-all duration-150 ease-out z-50
        ${open && !isLoginOpen && !isSignupOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-1"
          }`}
      >
        <div className="hidden sm:block absolute -top-2 right-10 w-4 h-4 rotate-45 bg-secondary border-l border-t border-white/10" />

        {/* HEADER */}
        <div className="p-4 border-b border-white/10 text-center shrink-0">
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
            <div className="space-y-4">
              {isConsultant ? (
                <div className="flex flex-col items-center justify-center gap-1.5 pt-1">
                  <Link
                    href={isCurrentPage ? "#" : profileHref}
                    onClick={(e) => {
                      if (isCurrentPage) {
                        e.preventDefault();
                      }
                      onClosePopup();
                    }}
                    className="text-lg font-bold text-primary hover:text-third transition-colors block text-center capitalize"
                  >
                    Hello,{" "}
                    {user?.consultationName ||
                      `${user?.firstname} ${user?.lastname}`}
                  </Link>
                  {(() => {
                    if (!isLoggedIn) return null;
                    const tierTitle = sellerTier?.tierTitle || "CONSULTANT";
                    const badgeText =
                      tierTitle === "CONSULTANT"
                        ? "CONSULTANT"
                        : `${tierTitle} CONSULTANT`;
                    let badgeClasses = "";

                    if (tierTitle === "PRO" || tierTitle === "PREMIUM") {
                      badgeClasses =
                        "bg-amber-400/15 text-amber-400 border border-amber-500/30 shadow-[0_2px_12px_rgba(245,158,11,0.1)]";
                    } else {
                      badgeClasses =
                        "bg-blue-500/15 text-blue-400 border border-blue-500/30";
                    }

                    return (
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${badgeClasses}`}
                      >
                        <Crown size={11} className="fill-current" />
                        {badgeText}
                      </span>
                    );
                  })()}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Link
                    href={isCurrentPage ? "#" : profileHref}
                    onClick={(e) => {
                      if (isCurrentPage) {
                        e.preventDefault();
                      }
                      onClosePopup();
                    }}
                    className="text-lg font-bold text-primary hover:text-third transition-colors inline-flex items-center gap-2"
                  >
                    <span className="capitalize">
                      Hello,{" "}
                      {user?.consultationName ||
                        `${user?.firstname} ${user?.lastname}`}
                    </span>
                    {(() => {
                      if (!isLoggedIn) return null;
                      let badgeText = isUserSeller ? "SELLER" : "USER";
                      let badgeClasses = isUserSeller
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-zinc-700/35 text-zinc-400 border border-zinc-700/50";

                      return (
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${badgeClasses}`}
                        >
                          {badgeText}
                        </span>
                      );
                    })()}
                  </Link>
                </div>
              )}

              {/* PROGRESS INDICATOR - Only for Consultants */}
              {isConsultant && (
                <div className="space-y-4 px-2 pt-2 text-left">
                  {/* Single Profile Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-third/60">
                      <span>Profile Mastery</span>
                      <span className="text-secondary bg-primary px-2 py-0.5 rounded-full text-[9px]">
                        {Math.round(profileStrength?.profileStrength || 0)}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(var(--primary-rgb),0.4)]"
                        style={{
                          width: `${profileStrength?.profileStrength || 0}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Compact Suggestion Text */}
                  {profileStrength?.messages?.[0] && (
                    <div className="bg-primary/5 px-4 py-2 rounded-xl border border-white/5 text-[11px] text-primary/70">
                      <span className="text-primary font-bold mr-1.5 uppercase tracking-wider">
                        Next Step:
                      </span>
                      {profileStrength.messages[0].text}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= CONTENT ================= */}
        <div className="overflow-y-auto custom-scrollbar">
          {/* NOT LOGGED IN */}
          {!isLoggedIn && (
            <div className="px-4 sm:px-5 py-4 text-[13px] leading-7 grid grid-cols-2 gap-4 sm:gap-6">
              <Section title="Buyer Tools">
                <Item
                  onClick={() => {
                    setIsLoginOpen(true);
                    onClosePopup();
                  }}
                >
                  Saved Vehicles
                </Item>
                <Item
                  onClick={() => {
                    setIsLoginOpen(true);
                    onClosePopup();
                  }}
                >
                  Compare Vehicles
                </Item>
                <Item href="/" onClick={onClosePopup}>
                  Recently Viewed
                </Item>
                <Item
                  onClick={() => {
                    setIsLoginOpen(true);
                    onClosePopup();
                  }}
                >
                  My Inquiries
                </Item>
              </Section>

              <Section title="Sell & Earn">
                <Item
                  onClick={() => {
                    setIsLoginOpen(true);
                    onClosePopup();
                  }}
                >
                  Sell Your Vehicle
                </Item>
                <Item
                  onClick={() => {
                    setIsLoginOpen(true);
                    onClosePopup();
                  }}
                >
                  Track Your Listing
                </Item>
                <Item
                  onClick={() => {
                    setIsLoginOpen(true);
                    onClosePopup();
                  }}
                >
                  Request Reecomm Inspection
                </Item>
              </Section>

              <Section title="Business">
                <Item href="/become-consultant" onClick={onClosePopup}>
                  Become a Consultant
                </Item>
                <Item href="/consult/pricing" onClick={onClosePopup}>
                  Consultant Pricing
                </Item>
              </Section>

              <Section title="Support">
                <Item href="/help" onClick={onClosePopup}>
                  Help Center
                </Item>
                <Item href="/contactus" onClick={onClosePopup}>
                  Contact Reecomm
                </Item>
              </Section>
            </div>
          )}

          {/* LOGGED IN */}
          {isLoggedIn && (
            <div className="px-4 sm:px-5 py-4 text-[13px] leading-7 grid grid-cols-2 gap-4 sm:gap-6">
              {!isConsultant && (
                <>
                  <Section title="Your Activity">
                    <Item href="/user/details/wishlist" onClick={onClosePopup}>
                      Saved Vehicles
                    </Item>
                    {/*<Item href="/" onClick={onClosePopup}>Recently Viewed</Item>*/}
                    <Item
                      href={
                        ["USER_SELLER", "USER_SELLER_APPLICANT"].includes(user?.userRole)
                          ? "/user/details/received-inquiries"
                          : "/user/details/sent-inquiries"
                      }
                      onClick={onClosePopup}
                    >
                      My Inquiries
                    </Item>
                    <Item
                      href="/user/details/inspections"
                      onClick={onClosePopup}
                    >
                      Inspection Requests
                    </Item>
                  </Section>

                  <Section title="Buying Tools">
                    <Item href="/inspection-process" onClick={onClosePopup}>
                      How reecomm inspection work
                    </Item>
                    <Item href="/user/details/inspections" onClick={onClosePopup}>
                      Track Inspection
                    </Item>
                    {["USER_SELLER", "USER_SELLER_APPLICANT"].includes(user?.userRole) && (
                      <Item href="/user/details/inspections?tab=received" onClick={onClosePopup}>
                        Inspection Requests
                      </Item>
                    )}
                  </Section>

                  <Section title="Selling">
                    <Item href="/become-seller" onClick={onClosePopup}>
                      Sell your personal vehicle
                    </Item>
                    <Item href="/user/details/myvehicle" onClick={onClosePopup}>
                      My Vehicle
                    </Item>
                  </Section>

                  <Section title="Subscriptions">
                    <Item href="/user/details/wishlist?tab=subscribed" onClick={onClosePopup}>
                      Followed Consultants
                    </Item>
                  </Section>

                  <Section title="Support">
                    <Item href="/help" onClick={onClosePopup}>
                      Help Center
                    </Item>
                    <Item href="/contactus" onClick={onClosePopup}>
                      Contact Reecomm
                    </Item>
                  </Section>
                </>
              )}

              {isConsultant && (
                <>
                  <Section title="Dashboard">
                    <Item
                      href={wrapConsultAuth("/consult/dashboard/overview")}
                      onClick={onClosePopup}
                    >
                      Overview
                    </Item>
                    <Item
                      href={wrapConsultAuth("/consult/dashboard/inventory")}
                      onClick={onClosePopup}
                    >
                      Inventory
                    </Item>
                    <Item
                      href={wrapConsultAuth("/consult/dashboard/inquiries")}
                      onClick={onClosePopup}
                    >
                      Inquiries
                    </Item>
                    <Item
                      href={wrapConsultAuth("/consult/dashboard/inspection")}
                      onClick={onClosePopup}
                    >
                      Inspections
                    </Item>
                    <Item
                      href={wrapConsultAuth("/consult/dashboard/analytics")}
                      onClick={onClosePopup}
                    >
                      Analytics
                    </Item>
                    <Item
                      href={wrapConsultAuth("/consult/dashboard/ppc")}
                      onClick={onClosePopup}
                    >
                      PPC & Boost
                    </Item>
                  </Section>

                  <div className="space-y-4">
                    <Section title="Storefront">
                      <Item href={wrapConsultAuth("/consult/dashboard/storefront")} onClick={onClosePopup}>
                        View Storefront
                      </Item>
                      <Item
                        href={wrapConsultAuth("/consult/dashboard/storefront")}
                        onClick={onClosePopup}
                      >
                        Edit Storefront
                      </Item>
                      <Item
                        href={wrapConsultAuth("/consult/dashboard/storefront")}
                        onClick={onClosePopup}
                      >
                        Theme Settings
                      </Item>
                    </Section>

                    <Section title="Buyer">
                      <Item
                        href="/user/details/sent-inquiries"
                        onClick={onClosePopup}
                      >
                        My Activity
                      </Item>
                    </Section>
                  </div>

                  <Section title="Billing">
                    <Item
                      href={wrapConsultAuth("/consult/dashboard/billing")}
                      onClick={onClosePopup}
                    >
                      Wallet
                    </Item>
                    <Item
                      href={wrapConsultAuth("/consult/dashboard/billing")}
                      onClick={onClosePopup}
                    >
                      Subscription Plan
                    </Item>
                    <Item
                      href={wrapConsultAuth("/consult/dashboard/billing")}
                      onClick={onClosePopup}
                    >
                      Transaction History
                    </Item>
                  </Section>

                  {/*<Section title="Performance">*/}
                  {/*  <Item onClick={() => navigate("/ranking-insights")}>Ranking Insights</Item>*/}
                  {/*  <Item onClick={() => navigate("/profile-strength")}>Profile Strength</Item>*/}
                  {/*</Section>*/}

                  <Section title="Support">
                    <Item
                      href={wrapConsultAuth("/consult/dashboard/help-center")}
                      onClick={onClosePopup}
                    >
                      Consultant Help
                    </Item>
                    <Item
                      href={wrapConsultAuth(
                        "/consult/dashboard/help-center?view=create",
                      )}
                      onClick={onClosePopup}
                    >
                      Raise Ticket
                    </Item>
                  </Section>
                </>
              )}
            </div>
          )}
        </div>

        {/* Logout */}
        {isLoggedIn && (
          <div className="p-4 border-t border-white/10 shrink-0">
            <Button
              variant="ghost"
              full
              size="sm"
              onClick={() => setShowLogoutConfirm(true)}
            >
              Logout
            </Button>
          </div>
        )}
      </div>

      {/* Logout Confirmation */}
      {(showLogoutConfirm || isLogoutClosing) &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={handleCancelLogout}
            style={{
              animation: isLogoutClosing
                ? "modalBackdropOut 0.25s ease-in forwards"
                : "modalBackdropIn 0.25s ease-out",
            }}
          >
            <div
              className="w-[90%] max-w-[440px] rounded-xl bg-secondary border border-white/10 shadow-2xl p-6 text-center"
              onClick={(e) => e.stopPropagation()}
              style={{
                animation: isLogoutClosing
                  ? "modalCardOut 0.25s ease-in forwards"
                  : "modalCardIn 0.3s ease-out",
              }}
            >
              <h2 className="text-lg font-bold text-primary mb-2">
                Confirm Logout
              </h2>

              <p className="text-sm text-primary/70 mb-6">
                Are you sure you want to logout?
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outlineSecondary"
                  full
                  size="sm"
                  onClick={handleCancelLogout}
                  disabled={isLoggingOut}
                >
                  Cancel
                </Button>

                <Button
                  variant="ghost"
                  full
                  size="sm"
                  onClick={handleLogout}
                  locked={isLoggingOut}
                  className="flex items-center justify-center gap-2"
                >
                  {isLoggingOut ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Yes, Logout"
                  )}
                </Button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false);
          // onClosePopup();
        }}
        onSuccess={() => {
          setIsLoginOpen(false);
          onClosePopup();
        }}
        onSignup={() => {
          setIsSignupOpen(true);
          setIsLoginOpen(false);
        }}
      />

      <SignupPopup
        isOpen={isSignupOpen}
        onClose={() => {
          setIsSignupOpen(false);
          // onClosePopup();
        }}
        onSuccess={() => {
          setIsSignupOpen(false);
          onClosePopup();
        }}
        onLogin={() => {
          setIsLoginOpen(true);
          setIsSignupOpen(false);
        }}
      />
    </>
  );
}

/* ================= SMALL REUSABLE COMPONENTS ================= */

function Section({ title, children }) {
  return (
    <div>
      <p className="font-bold mb-2 text-primary">{title}</p>
      <ul className="space-y-2.5 text-primary/70">{children}</ul>
    </div>
  );
}

function Item({ children, onClick, href }) {
  if (href) {
    return (
      <li className="hover:text-third cursor-pointer hover:underline leading-tight py-0.5">
        <Link href={href} onClick={onClick}>
          {children}
        </Link>
      </li>
    );
  }
  return (
    <li
      onClick={onClick}
      className="hover:text-third cursor-pointer hover:underline leading-tight py-0.5"
    >
      {children}
    </li>
  );
}
