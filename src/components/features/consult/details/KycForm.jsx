"use client";

import React, { useEffect, useState, useCallback } from "react";
import Step1Business from "./components/Step1Business";
import Step2Address from "./components/Step2Address";
import Step3KYC from "./components/Step3KYC";
import PreviewAndEdite from "./components/PreviewAndEdite";
import Button from "@/components/ui/button";

import {
  postbasicDetials,
  getBaiscDetails,
  postAddressDetials,
  getAddressDetails,
  getKycDocs,
  postKycDetials,
  updateAddressDetials,
  updateKycDetials,
  updatebasicDetials,
  checkIsAccountSuspended,
} from "@/services/consult.service";

import toast, { Toaster } from "react-hot-toast";
import { showBackendError } from "@/lib/axiosInstance";
import Step4Verification from "./components/Step4Verification";
import Navbar from "@/components/layout/Navbar";

const steps = [1, 2, 3, 4];

export default function KycForm() {
  const [step, setStep] = useState(1);

  const [existing, setExisting] = useState({
    business: null,
    address: null,
    kyc: null,
  });

  const [changed, setChanged] = useState({
    business: false,
    address: false,
    kyc: false,
  });

  const [form, setForm] = useState({
    business: null,
    address: null,
    kyc: null,
  });

  const [loading, setLoading] = useState(false);
  const [backLoading, setBackLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // ===== VERSION COUNTERS — incrementing forces child remount with fresh initialData =====
  const [dataVersion, setDataVersion] = useState({ 1: 0, 2: 0, 3: 0 });

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  // ===== MEMOIZED HANDLERS TO PREVENT INFINITE LOOPS =====
  const handleBusinessChange = useCallback((data, isChanged) => {
    setForm((p) => ({ ...p, business: data }));
    setChanged((p) => ({ ...p, business: isChanged }));
  }, []);

  const handleAddressChange = useCallback((data, isChanged) => {
    setForm((p) => ({ ...p, address: data }));
    setChanged((p) => ({ ...p, address: isChanged }));
  }, []);

  const handleKycChange = useCallback((data, isChanged) => {
    setForm((p) => ({ ...p, kyc: data }));
    setChanged((p) => ({ ...p, kyc: isChanged }));
  }, []);

  useEffect(() => {
    const check = async () => {
      try {
        const parseResponse = (res) => {
          if (!res) return null;
          if (res.error || res.statusCode === 404 || res.status === "NOT_FOUND")
            return null;
          if (
            res.data &&
            (res.data.error ||
              res.data.statusCode === 404 ||
              res.data.errorCode)
          )
            return null;
          return res.data ? res.data : null;
        };

        const is404Err = (err) => {
          return (
            err?.response?.status === 404 ||
            err?.statusCode === 404 ||
            err?.status === "NOT_FOUND" ||
            err?.response?.data?.statusCode === 404
          );
        };

        let bData = null;
        let aData = null;
        let kData = null;

        try {
          const basic = await getBaiscDetails();
          bData = parseResponse(basic);
        } catch (err) {
          if (!is404Err(err)) throw err;
        }

        try {
          const address = await getAddressDetails();
          aData = parseResponse(address);
        } catch (err) {
          if (!is404Err(err)) throw err;
        }

        try {
          const kyc = await getKycDocs();
          kData = parseResponse(kyc);
        } catch (err) {
          if (!is404Err(err)) throw err;
        }

        setExisting({
          business: bData,
          address: aData,
          kyc: kData,
        });

        if (!bData) {
          setStep(1);
          return;
        }
        if (!aData) {
          setStep(2);
          return;
        }
        if (!kData) {
          setStep(3);
          return;
        }

        if (bData?.verificationStatus === "REQUESTED") {
          setStep(4);
          return;
        }

        if (bData && aData && kData) {
          // If changes are requested, we show Step 4 (Verification) instead of Preview
          if (
            bData.isSubmitted === false &&
            bData.verificationStatus !== "REQUEST_CHANGES"
          ) {
            setShowPreview(true);
          }
          setStep(4);
          return;
        }
      } catch (e) {
        console.log("Real error", e);
        setStep(1);
      }
    };

    check();
  }, []);

  const handleNext = async () => {
    try {
      setLoading(true);

      if (step === 1) {
        if (existing.business) {
          if (!changed.business) {
            setStep(2);
            return;
          }
          const res = await updatebasicDetials(form.business);
          if (res.data) {
            // Refresh existing.business so future back-navigation knows to PUT
            setExisting((p) => ({ ...p, business: res.data }));
            toast.success("Details updated");
            setStep(2);
          }
          return;
        }
        const res = await postbasicDetials(form.business);
        if (res.data) {
          // Store saved data so back-navigation can refill and will call PUT next time
          setExisting((p) => ({ ...p, business: res.data }));
          toast.success("Details submitted");
          setStep(2);
        }
        return;
      }

      if (step === 2) {
        if (existing.address) {
          if (!changed.address) {
            setStep(3);
            return;
          }
          const res = await updateAddressDetials(form.address);
          if (res.data) {
            setExisting((p) => ({ ...p, address: res.data }));
            toast.success("Address updated");
            setStep(3);
          }
          return;
        }
        const res = await postAddressDetials(form.address);
        if (res.data) {
          setExisting((p) => ({ ...p, address: res.data }));
          toast.success("Address submitted");
          setStep(3);
        }
        return;
      }

      if (step === 3) {
        if (existing.kyc) {
          if (!changed.kyc) {
            if (existing.business?.isSubmitted === false) setShowPreview(true);
            setStep(4);
            return;
          }
          const res = await updateKycDetials(form.kyc);
          if (res.data) {
            setExisting((p) => ({ ...p, kyc: res.data }));
            toast.success("KYC updated");
            if (existing.business?.isSubmitted === false) setShowPreview(true);
            setStep(4);
          }
          return;
        }
        const res = await postKycDetials(form.kyc);
        if (res.data) {
          setExisting((p) => ({ ...p, kyc: res.data }));
          toast.success("KYC submitted");
          setShowPreview(true);
          setStep(4);
        }
        return;
      }
    } catch (error) {
      showBackendError(error);
    } finally {
      setLoading(false);
    }
  };

  // ===== BACK HANDLER — re-fetches data for the previous step so the form is pre-filled =====
  const handleBack = async () => {
    const prevStep = step - 1;
    try {
      setBackLoading(true);

      if (prevStep === 1) {
        try {
          const res = await getBaiscDetails();
          if (res?.data) {
            setExisting((p) => ({ ...p, business: res.data }));
          }
        } catch (err) {
          if (err?.response?.status !== 404) showBackendError(err);
        }
      }

      if (prevStep === 2) {
        try {
          const res = await getAddressDetails();
          if (res?.data) {
            setExisting((p) => ({ ...p, address: res.data }));
          }
        } catch (err) {
          if (err?.response?.status !== 404) showBackendError(err);
        }
      }

      // Bump the version so the child with that step remounts with fresh initialData
      setDataVersion((p) => ({ ...p, [prevStep]: p[prevStep] + 1 }));
      setStep(prevStep);
    } catch (error) {
      showBackendError(error);
    } finally {
      setBackLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />

      <section className="w-full pt-[66px]">
        <div className="w-full flex items-start">
          <div className="hidden lg:flex w-[30%] sticky top-[66px] h-[calc(100vh-66px)] relative flex-col justify-between text-white overflow-hidden">
            {/* Background Image Setup */}
            <div className="absolute inset-0 z-0">
              <img
                src="/homeBanner.jpg"
                alt="Partner Program"
                className="w-full h-full object-cover object-center"
              />
              {/* Dark Overlay for text readability */}
              <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 space-y-10 p-12">
              <div>
                <h2 className="text-3xl font-bold mb-4 tracking-tight">
                  Start selling your vehicle and services
                </h2>
                <p className="text-white/80 text-lg">
                  Join our network of elite partners and reach thousands of
                  interested customers.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  "Your own storefront",
                  "Secure payments",
                  "Transparent commission",
                  "No upfront cost",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative background effects (removed since background is an image now) */}
          </div>

          {/* Right Panel: Scrollable Form Area */}
          <div className="w-full lg:w-[70%] flex flex-col relative">
            {/* Form body naturally pushes height */}
            <div className="flex-1 px-6 py-8 lg:px-16 lg:py-10 relative">
              <div className="max-w-3xl mx-auto w-full">
                {/* Headers */}
                <h2 className="text-2xl font-bold text-primary mb-2">
                  Create your account
                </h2>
                <p className="text-third text-sm mb-10">
                  Enter your details to get started
                </p>

                {/* ===== NEW PROGRESS BAR (MATCHING SCREENSHOT) ===== */}
                <div className="mb-16 flex items-center justify-between">
                    {[
                      { num: 1, label: "Business" },
                      { num: 2, label: "Address" },
                      { num: 3, label: "Documents" },
                      { num: 4, label: "Verification" },
                    ].map((item, i, arr) => (
                      <React.Fragment key={item.num}>
                        <div className="flex flex-col items-center relative gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative shrink-0
                          ${
                            step > item.num
                              ? "bg-primary text-secondary"
                              : step === item.num
                                ? "bg-primary text-secondary ring-8 ring-primary/10"
                                : "bg-secondary border-2 border-third/10 text-third/40"
                          }`}
                          >
                            {step > item.num ? (
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3.5"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <span className="text-sm font-bold">
                                {item.num}
                              </span>
                            )}
                          </div>
                          <span
                            className={`text-xs font-bold transition-colors duration-300 absolute top-full mt-3 whitespace-nowrap
                          ${step >= item.num ? "text-primary" : "text-third/40"}`}
                          >
                            {item.label}
                          </span>
                        </div>
                        {/* Connecting Line */}
                        {i < arr.length - 1 && (
                          <div className="flex-1 h-[1.5px] bg-third/30 mx-4 relative">
                            <div
                              className="absolute inset-0 bg-primary transition-all duration-500"
                              style={{ width: step > item.num ? "100%" : "0%" }}
                            />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                {/* ===== STEPS WITH KEYS TO TRIGGER RE-MOUNT ON DATA LOAD ===== */}
                <div className="min-h-[350px]">
                  {step === 1 && (
                    <Step1Business
                      key={`biz-v${dataVersion[1]}-${existing.business ? "exist" : "new"}`}
                      initialData={existing.business}
                      onChange={handleBusinessChange}
                    />
                  )}

                  {step === 2 && (
                    <Step2Address
                      key={`addr-v${dataVersion[2]}-${existing.address ? "exist" : "new"}`}
                      initialData={existing.address}
                      onChange={handleAddressChange}
                    />
                  )}

                  {step === 3 && (
                    <Step3KYC
                      key={`kyc-v${dataVersion[3]}-${existing.kyc ? "exist" : "new"}`}
                      initialData={existing.kyc}
                      onChange={handleKycChange}
                    />
                  )}

                  {step === 4 &&
                    (existing?.business?.isSubmitted !== false ||
                      existing?.business?.verificationStatus ===
                        "REQUEST_CHANGES") &&
                    !showPreview && (
                      <Step4Verification
                        existing={existing}
                        onEdit={() => setShowPreview(true)}
                      />
                    )}

                  {step === 4 &&
                    ((existing?.business?.isSubmitted === false &&
                      existing?.business?.verificationStatus !==
                        "REQUEST_CHANGES") ||
                      showPreview) && (
                      <PreviewAndEdite
                        existing={existing}
                        onBack={() => {
                          if (existing?.business?.isSubmitted === false) {
                            setStep(3);
                            setShowPreview(false);
                          } else {
                            setShowPreview(false);
                          }
                        }}
                        onSuccess={() => {
                          setExisting((p) => ({
                            ...p,
                            business: {
                              ...p.business,
                              isSubmitted: true,
                              verificationStatus: "REQUESTED",
                            },
                          }));
                          setShowPreview(false);
                        }}
                      />
                    )}
                </div>

                {/* ===== ACTIONS: placed inside form flow, not pinned at bottom ===== */}
                {step < 4 && (
                  <div className="mt-6 pt-5  flex justify-between items-center">
                    <div className="w-24">
                      {step > 1 && (
                        <Button
                          variant="ghost"
                          showIcon={false}
                          onClick={handleBack}
                          disabled={backLoading || loading}
                        >
                          {backLoading ? "Loading..." : "Previous"}
                        </Button>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      showIcon={false}
                      onClick={handleNext}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Continue"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <FooterLink /> */}
    </>
  );
}
