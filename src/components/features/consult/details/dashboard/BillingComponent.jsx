"use client";

import React, { useState } from "react";
import Button from "@/components/ui/button";
import {
  Crown,
  Check,
  CreditCard,
  Download,
  TrendingUp,
  IndianRupee,
  Info,
} from "lucide-react";
import CustomSelect from "@/components/ui/custom-select";
import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { getSellerTierQuery } from "@/queries/Seller.queries";
import {
  getWalletBalanceQuery,
  getPaymentHistoryInfiniteQuery,
} from "@/queries/waller.queries";
import ManagePlan from "@/components/features/consult/details/components/ManagePlan";
import AddMoneyPopup from "@/components/features/consult/details/components/AddMoneyPopup";
import toast from "react-hot-toast";
import { addTopUpPaymemt } from "@/services/waller.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { getActiveSubscription } from "@/services/subscription.service";
import { SkeletonBox } from "@/components/ui/skeleton";
import Pagination from "@/components/ui/Pagination";

export default function BillingComponent() {
  const queryClient = useQueryClient();
  const [range, setRange] = useState("30");
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  // Payment History Pagination & Querying
  const [historyPage, setHistoryPage] = useState(1);

  const {
    data: paymentHistoryData,
    isLoading: isHistoryLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    getPaymentHistoryInfiniteQuery({
      pageSize: 10,
    }),
  );

  const handlePageChange = async (newPage) => {
    if (newPage > (paymentHistoryData?.pages?.length || 0) && hasNextPage) {
      await fetchNextPage();
    }
    setHistoryPage(newPage);
  };

  const historyTotalPages =
    paymentHistoryData?.pages?.[0]?.pageResponse?.totalPages || 1;
  const currentHistoryPageData =
    paymentHistoryData?.pages?.[historyPage - 1]?.data || [];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  const getStatusBadge = (status) => {
    const s = (status || "").toUpperCase();
    if (s === "CAPTURED" || s === "SUCCESS" || s === "PAID") {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-400">
          Paid
        </span>
      );
    }
    if (s === "PENDING") {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-400">
          Pending
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-500/20 text-red-400">
        {status || "Failed"}
      </span>
    );
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleConfirmAddMoney = async (amount) => {
    setIsPaying(true);
    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error(
          "Razorpay SDK failed to load. Please check your connection.",
        );
        return;
      }

      const payload = { amount: Number(amount) };
      const response = await addTopUpPaymemt(payload);

      if (response && response.success && response.data) {
        const orderData = response.data;

        const storeUser = useAuthStore.getState().user;
        let prefillName = "";
        if (storeUser) {
          if (storeUser.firstname || storeUser.lastname) {
            prefillName =
              `${storeUser.firstname || ""} ${storeUser.lastname || ""}`.trim();
          } else {
            prefillName =
              storeUser.name || storeUser.fullName || storeUser.firstName || "";
          }
        }
        let prefillEmail = storeUser?.email || "";
        let prefillContact =
          storeUser?.phoneNumber || storeUser?.phone || storeUser?.mobile || "";

        if (
          typeof window !== "undefined" &&
          (!prefillName || !prefillEmail || !prefillContact)
        ) {
          try {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
              const userObj = JSON.parse(savedUser);
              if (userObj) {
                if (!prefillName) {
                  if (userObj.firstname || userObj.lastname) {
                    prefillName =
                      `${userObj.firstname || ""} ${userObj.lastname || ""}`.trim();
                  } else {
                    prefillName =
                      userObj.name ||
                      userObj.fullName ||
                      userObj.firstName ||
                      "";
                  }
                }
                if (!prefillEmail) prefillEmail = userObj.email || "";
                if (!prefillContact)
                  prefillContact =
                    userObj.phoneNumber ||
                    userObj.phone ||
                    userObj.mobile ||
                    "";
              }
            }
          } catch (e) {
            console.error(
              "Error parsing user from localStorage for prefill",
              e,
            );
          }
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || orderData.keyId,
          amount: Math.round(orderData.amount * 100),
          currency: orderData.currency || "INR",
          name: "Reecomm",
          description: "Wallet Top-up Payment",
          order_id: orderData.razorpayOrderId,
          prefill: {
            name: prefillName,
            email: prefillEmail,
            contact: prefillContact,
          },
          handler: async function (paymentResponse) {
            toast.success(
              `Successfully added ₹${amount.toLocaleString("en-IN")} to wallet!`,
            );
            setIsAddMoneyOpen(false);
            queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
          },
          theme: {
            color: "#007bff",
          },
          modal: {
            ondismiss: function () {
              toast.error("Payment cancelled.");
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (failResponse) {
          toast.error("Payment failed: " + failResponse.error.description);
        });
        rzp.open();
      } else {
        toast.error(response?.message || "Failed to initiate payment.");
      }
    } catch (error) {
      console.error("Payment topup error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setIsPaying(false);
    }
  };

  const rangeOptions = [
    { label: "Last 7 days", value: "7" },
    { label: "Last 30 days", value: "30" },
    { label: "Last 60 days", value: "60" },
    { label: "Last 90 days", value: "90" },
  ];

  const { data: sellerTierData } = useQuery(getSellerTierQuery());
  const tier =
    sellerTierData?.tierTitle ||
    (typeof window !== "undefined"
      ? localStorage.getItem("sellerTier")
      : null) ||
    "BASIC";
  const isProOrPremium = tier === "PRO" || tier === "PREMIUM";
  const isBasic = tier === "BASIC";

  const { data: walletData } = useQuery({
    ...getWalletBalanceQuery(),
  });
  const balance = walletData?.balance ?? 0;

  const { data: activeSubData, isLoading: isActiveSubLoading } = useQuery({
    queryKey: ["active-subscription"],
    queryFn: async () => {
      try {
        const res = await getActiveSubscription();
        return res?.success ? res.data : null;
      } catch (error) {
        console.error("Error fetching active subscription:", error);
        return null;
      }
    },
  });

  const planTitle = activeSubData?.planTitle || tier;
  const subStatus = (
    activeSubData?.status ||
    activeSubData?.userTierStatus ||
    activeSubData?.subscriptionStatus ||
    ""
  ).toUpperCase();
  const isSubActive =
    sellerTierData?.userTierStatus?.toUpperCase() === "ACTIVE" ||
    (activeSubData
      ? subStatus === "ACTIVE" || subStatus === "AUTHENTICATED"
      : !isBasic);

  const displayTitle = planTitle
    ? `${planTitle.charAt(0).toUpperCase() + planTitle.slice(1).toLowerCase()} Consultant`
    : "Premium Consultant";

  const billingCycleText = activeSubData?.billingCycle
    ? `${activeSubData.billingCycle.charAt(0) + activeSubData.billingCycle.slice(1).toLowerCase()} Subscription`
    : isBasic
      ? "Free Tier"
      : "Annual Subscription";

  const priceText =
    activeSubData?.price !== undefined
      ? `₹${activeSubData.price.toLocaleString("en-IN")} / ${activeSubData.billingCycle === "MONTHLY" ? "month" : "year"}`
      : isBasic
        ? "Free"
        : "₹9,999 / year";

  const nextBillingDateText = activeSubData?.nextBillingDate
    ? new Date(activeSubData.nextBillingDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : isBasic
      ? "Never"
      : "12 Oct 2024";

  return (
    <section className="w-full space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Subscription & Billing</h1>
        <p className="text-third text-sm">
          Control your balance, subscriptions, and payments in one place
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        {/* PREMIUM PLAN (Always Visible) */}
        {isActiveSubLoading ? (
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 backdrop-blur-xl p-8 shadow-sm flex flex-col space-y-6 animate-pulse w-full">
            {/* Top Skeleton */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <SkeletonBox className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                  <SkeletonBox className="w-24 h-4 rounded" />
                  <SkeletonBox className="w-32 h-5 rounded" />
                </div>
              </div>
              <SkeletonBox className="w-16 h-6 rounded-full" />
            </div>

            {/* Middle Skeleton */}
            <div className="grid md:grid-cols-2 gap-6">
              <SkeletonBox className="w-full h-20 rounded-xl" />
              <SkeletonBox className="w-full h-20 rounded-xl" />
            </div>

            {/* Bottom Skeleton */}
            <div className="flex justify-between items-center pt-4">
              <SkeletonBox className="w-32 h-4 rounded" />
              <SkeletonBox className="w-24 h-8 rounded-full" />
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 backdrop-blur-xl p-8 shadow-sm flex flex-col transition-colors duration-200 hover:border-primary/40">
            {/* Top */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Crown className="text-yellow-300" />
                <div>
                  <p className="text-xs uppercase tracking-wider">
                    {displayTitle}
                  </p>
                  <p className="text-lg font-semibold">{billingCycleText}</p>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  isSubActive
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {isSubActive ? "Active" : "Inactive"}
              </span>
            </div>

            {/* Middle */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-xs opacity-70">Plan Value</p>
                <p className="font-semibold">{priceText}</p>
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-xs opacity-70">Next Renewal</p>
                <p className="font-semibold">{nextBillingDateText}</p>
              </div>
            </div>

            {/* Bottom */}
            <div className="flex justify-between items-center mt-auto pt-6">
              <span className="text-xs opacity-90"></span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsManageOpen(true)}
                >
                  Upgrade Subscription
                </Button>
                {activeSubData?.shortUrl && (
                  <Button
                    variant="outlineSecondary"
                    size="sm"
                    onClick={() =>
                      window.open(activeSubData.shortUrl, "_blank")
                    }
                  >
                    Manage Subscription
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ✅ WALLET */}
        <div className="relative rounded-2xl border border-third/20  p-6 overflow-hidden shadow-sm transition-colors duration-200 hover:border-third/40">
          {/* Status Pill */}
          <div className="absolute top-4 right-4">
            <span className="px-4 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium backdrop-blur-md">
              Active
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <CreditCard size={16} />
              Reecomm Wallet
            </div>

            <p className="text-xs text-third">Available Balance</p>
            <p className="text-3xl font-bold">
              ₹{" "}
              {balance.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsAddMoneyOpen(true)}
            >
              + Add Money
            </Button>
          </div>
        </div>
      </div>

      {/* BENEFITS */}
      <div className="rounded-2xl border border-third/20  p-6 space-y-4 shadow-sm transition-colors duration-200 hover:border-third/40">
        <h2 className="font-semibold">Benefits Active</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex gap-3 rounded-xl border border-third/30  p-4">
            <Check className="text-primary" />
            <div>
              <p className="font-medium">Featured eligibility</p>
              <p className="text-xs text-third">
                Premium placement in search results
              </p>
            </div>
          </div>

          <div className="flex gap-3 rounded-xl border border-third/30  p-4">
            <Check className="text-primary" />
            <div>
              <p className="font-medium">Storefront boosts</p>
              <p className="text-xs text-third">Enhanced brand visibility</p>
            </div>
          </div>

          <div className="flex gap-3 rounded-xl border border-third/30  p-4">
            <Check className="text-primary" />
            <div>
              <p className="font-medium">Advanced analytics</p>
              <p className="text-xs text-third">
                Deep insights into performance
              </p>
            </div>
          </div>

          <div className="flex gap-3 rounded-xl border border-third/30  p-4">
            <Check className="text-primary" />
            <div>
              <p className="font-medium">Priority inquiries</p>
              <p className="text-xs text-third">
                First access to high intent buyers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WALLET USAGE */}
      <div className="rounded-2xl border border-third/20  p-6 space-y-4 shadow-sm transition-colors duration-200 hover:border-third/40">
        <div className="flex items-center gap-2 font-semibold">
          <TrendingUp size={16} />
          Wallet Usage (Last 30 Days)
        </div>

        <div className="divide-y divide-third/30 text-sm">
          <div className="flex justify-between py-3">
            <span className="text-third">PPC Campaigns</span>
            <span>₹ 1,820</span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-third">Boosts</span>
            <span>₹ 740</span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-third">Inspections</span>
            <span>₹ 360</span>
          </div>

          <div className="flex justify-between py-3">
            <span className="text-third">Refunds / Credits</span>
            <span className="text-green-400">₹ 80</span>
          </div>
        </div>

        <div className="flex justify-between border-t border-third/40 pt-4 font-semibold">
          <span>Total Spent</span>
          <span>₹ 2,840</span>
        </div>
      </div>

      {/* TRANSACTION HISTORY */}
      <div className="rounded-2xl border border-third/20  p-6 space-y-4 shadow-sm transition-colors duration-200 hover:border-third/40">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <IndianRupee size={16} />
            Transaction History
          </div>

          <div className="flex items-center gap-3">
            <CustomSelect
              value={range}
              onChange={setRange}
              options={rangeOptions}
              placeholder="Select range"
              variant="transparent"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto custom-scrollbar pb-2">
          <table className="w-full text-sm min-w-[500px]">
            <thead className="border-b border-third/30 text-third">
              <tr>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Type</th>
                <th className="text-left py-2">Reference</th>
                <th className="text-right py-2">Amount</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-third/20">
              <tr>
                <td className="py-3">12 Oct</td>
                <td>PPC Spend</td>
                <td className="text-primary">BMW X1 Boost</td>
                <td className="text-right">₹120</td>
              </tr>

              <tr>
                <td className="py-3">11 Oct</td>
                <td>Inspection</td>
                <td className="text-primary">REC-INS-2381</td>
                <td className="text-right">₹360</td>
              </tr>

              <tr>
                <td className="py-3">10 Oct</td>
                <td>Wallet Top-up</td>
                <td className="text-primary">Razorpay</td>
                <td className="text-right text-green-400">+₹2,000</td>
              </tr>

              <tr>
                <td className="py-3">08 Oct</td>
                <td>Refund</td>
                <td className="text-primary">Failed Campaign</td>
                <td className="text-right text-green-400">+₹80</td>
              </tr>

              <tr>
                <td className="py-3">07 Oct</td>
                <td>Boost</td>
                <td className="text-primary">Audi A4 Premium</td>
                <td className="text-right">₹200</td>
              </tr>

              <tr>
                <td className="py-3">05 Oct</td>
                <td>PPC Spend</td>
                <td className="text-primary">Mercedes Campaign</td>
                <td className="text-right">₹450</td>
              </tr>

              <tr>
                <td className="py-3">04 Oct</td>
                <td>Boost</td>
                <td className="text-primary">Tesla Model 3</td>
                <td className="text-right">₹540</td>
              </tr>

              <tr>
                <td className="py-3">03 Oct</td>
                <td>PPC Spend</td>
                <td className="text-primary">Luxury Cars Ad</td>
                <td className="text-right">₹250</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PAYMENT HISTORY */}
      <div className="rounded-2xl border border-third/20  p-6 space-y-4 shadow-sm transition-colors duration-200 hover:border-third/40">
        <h2 className="font-semibold">Payment History</h2>

        <div className="overflow-x-auto custom-scrollbar pb-2">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="text-third border-b border-third/30">
              <tr>
                <th className="text-left py-2 font-medium">Date</th>
                <th className="text-left py-2 font-medium">Plan</th>
                <th className="text-left py-2 font-medium">Amount</th>
                <th className="text-left py-2 font-medium">Status</th>
                <th className="text-left py-2 font-medium">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-third/20">
              {isHistoryLoading ||
              (isFetchingNextPage && currentHistoryPageData.length === 0) ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td className="py-4">
                      <SkeletonBox className="h-4 w-24 opacity-20" />
                    </td>
                    <td className="py-4">
                      <SkeletonBox className="h-4 w-28 opacity-20" />
                    </td>
                    <td className="py-4">
                      <SkeletonBox className="h-4 w-16 opacity-20" />
                    </td>
                    <td className="py-4">
                      <SkeletonBox className="h-6 w-16 rounded-full opacity-20" />
                    </td>
                    <td className="py-4">
                      <SkeletonBox className="h-4 w-28 opacity-20" />
                    </td>
                  </tr>
                ))
              ) : currentHistoryPageData.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-third text-sm"
                  >
                    No payment history found.
                  </td>
                </tr>
              ) : (
                currentHistoryPageData.map((item) => (
                  <tr key={item.id}>
                    <td className="py-4">{formatDate(item.createdAt)}</td>
                    <td className="py-4">
                      {item.tierPlanName ||
                        (item.paymentType === "WALLET_TOPUP"
                          ? "Wallet Top-up"
                          : item.paymentType === "SUBSCRIPTION"
                            ? "Subscription"
                            : "N/A")}
                    </td>
                    <td className="py-4 font-medium">
                      {item.currency === "INR" ? "₹" : item.currency || "₹"}{" "}
                      {Number(item.amount).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-4">
                      {getStatusBadge(item.paymentStatus)}
                    </td>
                    <td className="py-4">
                      {item.invoiceId && item.invoiceUrl ? (
                        <a
                          href={item.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:underline w-fit"
                        >
                          <Download size={14} /> {item.invoiceId}
                        </a>
                      ) : item.invoiceId ? (
                        <span className="text-third text-sm">
                          {item.invoiceId}
                        </span>
                      ) : (
                        <span className="text-third text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {!isHistoryLoading && historyTotalPages > 1 && (
          <div className="pt-4 border-t border-third/10">
            <Pagination
              currentPage={historyPage}
              totalPages={historyTotalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <ManagePlan
        isOpen={isManageOpen}
        onClose={() => setIsManageOpen(false)}
        currentPlan={tier}
      />

      <AddMoneyPopup
        isOpen={isAddMoneyOpen}
        onClose={() => setIsAddMoneyOpen(false)}
        onConfirm={handleConfirmAddMoney}
        loading={isPaying}
      />
    </section>
  );
}
