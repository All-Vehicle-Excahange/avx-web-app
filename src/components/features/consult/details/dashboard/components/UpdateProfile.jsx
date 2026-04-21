"use client";

import React, { useEffect, useState, useCallback } from "react";
import Step1Business from "../../components/Step1Business";
import Step2Address from "../../components/Step2Address";
import Step3KYC from "../../components/Step3KYC";
import Button from "@/components/ui/button";

import {
  getBaiscDetails,
  getAddressDetails,
  getKycDocs,
  finalSubmit,
//   updateAddressDetials,
//   updateKycDetials,
//   updatebasicDetials,
} from "@/services/consult.service";

import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import { SkeletonBox } from "@/components/ui/skeleton";

export default function UpdateProfile() {
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(true);

  const [data, setData] = useState({
    business: null,
    address: null,
    kyc: null,
  });

  const [editMode, setEditMode] = useState({
    business: false,
    address: false,
    kyc: false,
  });

  const [loadingStates, setLoadingStates] = useState({
    business: false,
    address: false,
    kyc: false,
    submit: false,
  });

  const [form, setForm] = useState({
    business: null,
    address: null,
    kyc: null,
  });

  // ===== DATA FETCHING =====
  useEffect(() => {
    const check = async () => {
      setInitialLoading(true);
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

        setData({
          business: bData,
          address: aData,
          kyc: kData,
        });
      } catch (e) {
        console.error("Error fetching data", e);
      } finally {
        setInitialLoading(false);
      }
    };

    check();
  }, []);

  const handleBusinessChange = useCallback((d) => {
    setForm((p) => ({ ...p, business: d }));
  }, []);

  const handleAddressChange = useCallback((d) => {
    setForm((p) => ({ ...p, address: d }));
  }, []);

  const handleKycChange = useCallback((d) => {
    setForm((p) => ({ ...p, kyc: d }));
  }, []);

  // ===== UPDATE HANDLERS (STUBBED AS GUESSED) =====
  const updateBusiness = async () => {
    // try {
    //   setLoadingStates((p) => ({ ...p, business: true }));
    //   await updatebasicDetials(form.business);
    //   setEditMode((p) => ({ ...p, business: false }));
    //   const b = await getBaiscDetails();
    //   setData((p) => ({ ...p, business: b?.data }));
    //   toast.success("Business details updated locally");
    // } catch (e) {
    //   console.error("Update failed", e);
    // } finally {
    //   setLoadingStates((p) => ({ ...p, business: false }));
    // }
    toast.success("Update API removed for now");
    setEditMode((p) => ({ ...p, business: false }));
  };

  const updateAddress = async () => {
    // try {
    //   setLoadingStates((p) => ({ ...p, address: true }));
    //   await updateAddressDetials(form.address);
    //   setEditMode((p) => ({ ...p, address: false }));
    //   const a = await getAddressDetails();
    //   setData((p) => ({ ...p, address: a?.data }));
    // } catch (e) {
    //   console.error("Update failed", e);
    // } finally {
    //   setLoadingStates((p) => ({ ...p, address: false }));
    // }
    toast.success("Update API removed for now");
    setEditMode((p) => ({ ...p, address: false }));
  };

  const updateKyc = async () => {
    // try {
    //   setLoadingStates((p) => ({ ...p, kyc: true }));
    //   await updateKycDetials(form.kyc);
    //   setEditMode((p) => ({ ...p, kyc: false }));
    //   const k = await getKycDocs();
    //   setData((p) => ({ ...p, kyc: k?.data }));
    // } catch (e) {
    //   console.error("Update failed", e);
    // } finally {
    //   setLoadingStates((p) => ({ ...p, kyc: false }));
    // }
    toast.success("Update API removed for now");
    setEditMode((p) => ({ ...p, kyc: false }));
  };

  const handleSubmit = async () => {
    try {
      setLoadingStates((p) => ({ ...p, submit: true }));
      const res = await finalSubmit();

      if (res?.success || res?.data) {
        toast.success("Profile submitted for verification");
        router.push("/consult/dashboard/overview");
        return;
      }
    } catch (error) {
      console.error("Submission failed", error);
      toast.error("Submission failed");
    } finally {
      setLoadingStates((p) => ({ ...p, submit: false }));
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />

      <section className="w-full pt-[66px]">
        <div className="w-full flex items-start">
          {/* LEFT PANEL */}
          <div className="hidden lg:flex w-[30%] sticky top-[66px] h-[calc(100vh-66px)] relative flex-col justify-between text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="/homeBanner.jpg"
                alt="Partner Program"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 space-y-10 p-12">
              <div>
                <h2 className="text-3xl font-bold mb-4 tracking-tight">
                  Update your consultant profile
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
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full lg:w-[70%] flex flex-col relative">
            <div className="flex-1 px-6 py-8 lg:px-16 lg:py-10 relative">
              <div className="max-w-3xl mx-auto w-full">
                {initialLoading ? (
                  <div className="space-y-10 animate-pulse">
                    <SkeletonBox className="w-1/3 h-8 rounded-lg" />
                    <SkeletonBox className="w-full h-40 rounded-xl" />
                    <SkeletonBox className="w-full h-40 rounded-xl" />
                    <SkeletonBox className="w-full h-40 rounded-xl" />
                  </div>
                ) : (
                  <div className="space-y-10">
                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-2">
                        Preview & Update Profile
                      </h2>
                      <p className="text-third text-sm mb-10">
                        Review and manage your business details.
                      </p>
                    </div>

                    {/* BUSINESS SECTION */}
                    <div className="border border-primary/30 rounded-xl p-6">
                      <div className="flex justify-between mb-4">
                        <h3 className="font-semibold">Preview Your Details</h3>
                        {!editMode.business ? (
                          <Button
                            variant="ghost"
                            onClick={() => setEditMode((p) => ({ ...p, business: true }))}
                          >
                            Edit
                          </Button>
                        ) : (
                          <div className="flex gap-3">
                            <Button
                              variant="outlineSecondary"
                              onClick={() => setEditMode((p) => ({ ...p, business: false }))}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={updateBusiness}
                              loading={loadingStates.business}
                            >
                              Update
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className={`${!editMode.business ? "pointer-events-none opacity-60" : ""}`}>
                        <Step1Business
                          initialData={data.business}
                          onChange={handleBusinessChange}
                          readOnly={!editMode.business}
                        />
                      </div>
                    </div>

                    {/* ADDRESS SECTION */}
                    <div className="border border-primary/30 rounded-xl p-6">
                      <div className="flex justify-between mb-4">
                        <h3 className="font-semibold">Address Details</h3>
                        {!editMode.address ? (
                          <Button
                            variant="ghost"
                            onClick={() => setEditMode((p) => ({ ...p, address: true }))}
                          >
                            Edit
                          </Button>
                        ) : (
                          <div className="flex gap-3">
                            <Button
                              variant="outlineSecondary"
                              onClick={() => setEditMode((p) => ({ ...p, address: false }))}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={updateAddress}
                              loading={loadingStates.address}
                            >
                              Update
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className={`${!editMode.address ? "pointer-events-none opacity-60" : ""}`}>
                        <Step2Address
                          initialData={data.address}
                          onChange={handleAddressChange}
                          readOnly={!editMode.address}
                        />
                      </div>
                    </div>

                    {/* KYC SECTION */}
                    <div className="border border-primary/30 rounded-xl p-6">
                      <div className="flex justify-between mb-4">
                        <h3 className="font-semibold">KYC Details</h3>
                        {!editMode.kyc ? (
                          <Button
                            variant="ghost"
                            onClick={() => setEditMode((p) => ({ ...p, kyc: true }))}
                          >
                            Edit
                          </Button>
                        ) : (
                          <div className="flex gap-3">
                            <Button
                              variant="outlineSecondary"
                              onClick={() => setEditMode((p) => ({ ...p, kyc: false }))}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={updateKyc}
                              loading={loadingStates.kyc}
                            >
                              Update
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className={`${!editMode.kyc ? "pointer-events-none opacity-60" : ""}`}>
                        <Step3KYC
                          initialData={data.kyc}
                          onChange={handleKycChange}
                          readOnly={!editMode.kyc}
                        />
                      </div>
                    </div>

                    {/* FINAL SUBMIT */}
                    <div className="flex justify-end pt-6">
                      <Button
                        variant="ghost"
                        onClick={handleSubmit}
                        loading={loadingStates.submit}
                        className="px-10"
                      >
                        Final Submit
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}