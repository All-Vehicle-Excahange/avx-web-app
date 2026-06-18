import React, { useState, useEffect } from "react";
import { X, Check, Minus, Plus } from "lucide-react";
import Button from "@/components/ui/button";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getListingCreditPriceQuery } from "@/queries/Seller.queries";
import { getWalletBalanceQuery } from "@/queries/waller.queries";
import {
  purchaseListingCreditWallet,
  purchaseListingCreditRazorpay,
} from "@/services/Seller.service";
import { addTopUpPaymemt } from "@/services/waller.service";
import AddMoneyPopup from "@/components/features/consult/details/components/AddMoneyPopup";
import { useAuthStore } from "@/stores/useAuthStore";
import toast from "react-hot-toast";

export default function AddSlotPopup({ isOpen, onClose }) {
  const queryClient = useQueryClient();
  const [animate, setAnimate] = useState(false);
  const [slots, setSlots] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("WALLET");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  // Queries
  const { data: priceData, isLoading: isLoadingPrice, isError: isErrorPrice } = useQuery({
    ...getListingCreditPriceQuery(),
    enabled: isOpen,
  });
  const { data: walletData } = useQuery({
    ...getWalletBalanceQuery(),
    enabled: isOpen,
  });

  const pricePerSlot = priceData?.pricePerCredit ?? 0;
  const discountPrice = slots * pricePerSlot;
  const walletBalance = walletData?.balance ?? 0;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      if (onClose) onClose();
      setSlots(1);
      setPaymentMethod("WALLET");
    }, 300);
  };

  const handleIncrement = () => {
    if (slots < 10) setSlots((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (slots > 1) setSlots((prev) => prev - 1);
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

  // Wallet Top-up Handler
  const handleConfirmAddMoney = async (amount) => {
    setIsPaying(true);
    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Razorpay SDK failed to load. Please check your connection.");
        return;
      }

      const payload = { amount: Number(amount) };
      const response = await addTopUpPaymemt(payload);

      if (response?.success && response?.data) {
        const orderData = response.data;

        const storeUser = useAuthStore.getState().user;
        let prefillName = "";
        if (storeUser) {
          if (storeUser.firstname || storeUser.lastname) {
            prefillName = `${storeUser.firstname || ""} ${storeUser.lastname || ""}`.trim();
          } else {
            prefillName = storeUser.name || storeUser.fullName || storeUser.firstName || "";
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
                    prefillName = `${userObj.firstname || ""} ${userObj.lastname || ""}`.trim();
                  } else {
                    prefillName = userObj.name || userObj.fullName || userObj.firstName || "";
                  }
                }
                if (!prefillEmail) prefillEmail = userObj.email || "";
                if (!prefillContact)
                  prefillContact =
                    userObj.phoneNumber || userObj.phone || userObj.mobile || "";
              }
            }
          } catch (e) {
            console.error("Error parsing user from localStorage for prefill", e);
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
            toast.success(`Successfully added ₹${amount.toLocaleString("en-IN")} to wallet!`);
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

  // Confirm Purchase Payment (either Wallet or Razorpay Checkout)
  const handleConfirmPayment = async () => {
    setIsSubmitting(true);
    try {
      if (paymentMethod === "WALLET") {
        if (walletBalance < discountPrice) {
          setIsAddMoneyOpen(true);
          setIsSubmitting(false);
          return;
        }

        const res = await purchaseListingCreditWallet(slots);
        if (res?.success) {
          toast.success(res.message || `Successfully purchased ${slots} slots!`);
          queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
          queryClient.invalidateQueries({ queryKey: ["seller-inventory-vehicles"] });
          queryClient.invalidateQueries({ queryKey: ["seller-inventory-vehicles-infinite"] });
          queryClient.invalidateQueries({ queryKey: ["seller-tier"] });
          handleClose();
        } else {
          toast.error(res?.message || "Failed to purchase listing slots.");
        }
      } else if (paymentMethod === "RAZORPAY") {
        const isScriptLoaded = await loadRazorpayScript();
        if (!isScriptLoaded) {
          toast.error("Razorpay SDK failed to load. Please check your connection.");
          setIsSubmitting(false);
          return;
        }

        const res = await purchaseListingCreditRazorpay(slots);
        if (res?.success && res?.data) {
          const orderData = res.data;

          const storeUser = useAuthStore.getState().user;
          let prefillName = "";
          if (storeUser) {
            if (storeUser.firstname || storeUser.lastname) {
              prefillName = `${storeUser.firstname || ""} ${storeUser.lastname || ""}`.trim();
            } else {
              prefillName = storeUser.name || storeUser.fullName || storeUser.firstName || "";
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
                      prefillName = `${userObj.firstname || ""} ${userObj.lastname || ""}`.trim();
                    } else {
                      prefillName = userObj.name || userObj.fullName || userObj.firstName || "";
                    }
                  }
                  if (!prefillEmail) prefillEmail = userObj.email || "";
                  if (!prefillContact)
                    prefillContact =
                      userObj.phoneNumber || userObj.phone || userObj.mobile || "";
                }
              }
            } catch (e) {
              console.error("Error parsing user from localStorage for prefill", e);
            }
          }

          const options = {
            key: orderData.razorpayKeyId,
            amount: orderData.amountInPaise,
            currency: orderData.currency || "INR",
            name: "Vehicle Marketplace",
            description: `${slots} Listing Credits`,
            order_id: orderData.razorpayOrderId,
            prefill: {
              name: prefillName,
              email: prefillEmail,
              contact: prefillContact,
            },
            handler: async function (paymentResponse) {
              toast.success("Payment successful! Credits will be updated shortly.");
              queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
              queryClient.invalidateQueries({ queryKey: ["seller-inventory-vehicles"] });
              queryClient.invalidateQueries({ queryKey: ["seller-inventory-vehicles-infinite"] });
              queryClient.invalidateQueries({ queryKey: ["seller-tier"] });
              handleClose();
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
          toast.error(res?.message || "Failed to initiate Razorpay payment.");
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error(err?.response?.data?.message || err?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`
          absolute inset-0 bg-black/60 backdrop-blur-sm
          transition-opacity duration-300
          ${animate ? "opacity-100" : "opacity-0"}
        `}
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div
        className={`
          relative z-50 mx-3
          w-full md:w-[85%] lg:w-[70%]  
          max-w-md md:max-w-none
          h-[70vh] md:h-auto  
          md:max-h-[62%]
          flex md:flex
          rounded-2xl md:rounded-2xl
          bg-secondary overflow-hidden text-primary
          border border-third/50 shadow-2xl
          transition-all duration-300 ease-out
          ${
            animate
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          }
        `}
      >
        {/* CLOSE */}
        <div
          className="absolute right-3 top-3 cursor-pointer bg-primary text-secondary md:bg-secondary md:text-primary w-8 h-8 rounded-full flex items-center justify-center z-10"
          onClick={handleClose}
        >
          <X size={20} />
        </div>

        {/* CONTENT */}
        <div className="p-4 md:p-6 space-y-5 w-full md:w-[50%] overflow-y-auto custom-scrollbar">
          <h2 className="text-xl font-semibold">Top-up Listing Slots</h2>
          <div className="border-t border-third/40" />

          <div className="text-sm space-y-2">
            <p className="font-medium text-third text-xs sm:text-sm">
              Purchase additional slots to increase your vehicle listing limit on Reecomm.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {/* Slot Counter */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-primary bg-primary/5">
              <div>
                <p className="text-sm font-semibold">Number of Slots</p>
                <p className="text-xs text-third mt-0.5">
                  {isLoadingPrice
                    ? "Fetching price..."
                    : isErrorPrice || !priceData
                    ? "Pricing unavailable"
                    : `₹${pricePerSlot} per slot`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDecrement}
                  disabled={isSubmitting}
                  className="w-8 h-8 rounded-full bg-third/20 flex items-center justify-center hover:bg-third/30 transition-colors disabled:opacity-50"
                >
                  <Minus size={14} />
                </button>
                <span className="font-bold text-lg w-4 text-center">{slots}</span>
                <button
                  onClick={handleIncrement}
                  disabled={isSubmitting}
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-secondary hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="flex justify-between items-center text-lg font-bold px-1 py-2">
              <span>Total Amount</span>
              <span className="text-primary">
                {isLoadingPrice
                  ? "Fetching..."
                  : isErrorPrice || !priceData
                  ? "—"
                  : `₹${discountPrice.toLocaleString("en-IN")}`}
              </span>
            </div>

            {/* Payment Method */}
            <div className="border-t border-third/30 pt-4" />
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-third uppercase tracking-wider block">
                Select Payment Method
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {/* Pay with Wallet */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("WALLET")}
                  disabled={isSubmitting}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all text-left cursor-pointer disabled:opacity-50
                    ${
                      paymentMethod === "WALLET"
                        ? "bg-primary/5 border-primary text-primary"
                        : "bg-transparent border-third/20 text-third hover:border-third/40"
                    }`}
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">Reecomm Wallet</p>
                    <p className="text-xs text-zinc-400">
                      Balance: ₹
                      {walletBalance.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    {walletBalance < discountPrice && (
                      <p className="text-[10px] text-red-400 font-medium animate-pulse">
                        Insufficient balance. Click to top-up.
                      </p>
                    )}
                  </div>
                  {paymentMethod === "WALLET" && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-secondary">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </button>

                {/* Pay with Razorpay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("RAZORPAY")}
                  disabled={isSubmitting}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all text-left cursor-pointer disabled:opacity-50
                    ${
                      paymentMethod === "RAZORPAY"
                        ? "bg-primary/5 border-primary text-primary"
                        : "bg-transparent border-third/20 text-third hover:border-third/40"
                    }`}
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">Razorpay</p>
                    <p className="text-xs text-zinc-400 font-normal">
                      UPI, Card, Netbanking
                    </p>
                  </div>
                  {paymentMethod === "RAZORPAY" && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-secondary">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button
              variant="ghost"
              size="md"
              onClick={handleClose}
              disabled={isSubmitting}
              showIcon={false}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={handleConfirmPayment}
              loading={isSubmitting}
              disabled={isSubmitting || isLoadingPrice || isErrorPrice || !priceData}
              showIcon={false}
            >
              {isLoadingPrice
                ? "Loading..."
                : isErrorPrice || !priceData
                ? "Pricing Unavailable"
                : paymentMethod === "WALLET" && walletBalance < discountPrice
                ? "Top-up Wallet"
                : "Confirm Payment"}
            </Button>
          </div>
        </div>

        {/* IMAGE */}
        <div className="hidden md:block md:w-[50%]">
          <Image
            width={500}
            height={500}
            src="/bg.jpg"
            alt="Add Slot Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {isAddMoneyOpen && (
        <AddMoneyPopup
          isOpen={isAddMoneyOpen}
          onClose={() => setIsAddMoneyOpen(false)}
          onConfirm={handleConfirmAddMoney}
          loading={isPaying}
        />
      )}
    </div>
  );
}
