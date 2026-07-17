"use client";
import Image from "next/image";

import React, { useEffect, useState, useCallback } from "react";
import Step1Business from "../../components/Step1Business";
import Step2Address from "../../components/Step2Address";
import Step3KYC from "../../components/Step3KYC";
import Button from "@/components/ui/button";

import {
  getBaiscDetails,
  getAddressDetails,
  getKycDocs,
} from "@/services/consult.service";

import {
  createUpdateRequest,
  finalSubmit,
  updateAddressDetails,
  updateBasicDetails,
  updateKycDocuments,
  getActiveAddressUpdate,
  getActiveKycUpdate,
  getBaiscDetails as getPendingUpdate,
  checkIsUserNameAvailbale,
} from "@/services/consult.profile.service";

import { useRouter } from "next/router";
import Navbar from "@/components/layout/Navbar";
import { SkeletonBox } from "@/components/ui/skeleton";
import { Clock, AlertCircle, XCircle } from "lucide-react";

export default function UpdateProfile() {
  const { push } = useRouter();
  const [initialLoading, setInitialLoading] = useState(true);

  const [data, setData] = useState({
    business: null,
    address: null,
    kyc: null,
  });

  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = sessionStorage.getItem("consult_update_id");
      if (storedId) setUpdateId(storedId);
    }
  }, []);

  const saveUpdateId = (id) => {
    setUpdateId(id);
    sessionStorage.setItem("consult_update_id", id);
  };

  const [loadingStates, setLoadingStates] = useState({
    kyc: false,
    submit: false,
  });

  const [errors, setErrors] = useState({
    business: "",
    address: "",
    kyc: "",
    submit: "",
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
          // Handle cases where data might be nested or direct
          const actualData = res.data || res;
          if (actualData?.errorCode || actualData?.statusCode === 404)
            return null;
          return actualData;
        };

        const is404Err = (err) => {
          return (
            err?.response?.status === 404 ||
            err?.statusCode === 404 ||
            err?.status === "NOT_FOUND" ||
            err?.response?.data?.statusCode === 404 ||
            err?.data?.statusCode === 404
          );
        };

        // 1. Fetch Original Base Data
        let baseBusiness = null;
        let baseAddress = null;
        let baseKyc = null;

        try {
          const [bRes, aRes, kRes] = await Promise.all([
            getBaiscDetails().catch(() => null),
            getAddressDetails().catch(() => null),
            getKycDocs().catch(() => null),
          ]);
          baseBusiness = parseResponse(bRes);
          baseAddress = parseResponse(aRes);
          baseKyc = parseResponse(kRes);
        } catch (err) {
          console.error("Error fetching base data:", err);
        }

        // 2. Check for Active/Pending Update Request
        let pendingUpdate = null;
        let activeAddress = null;
        let activeKyc = null;

        try {
          const pRes = await getPendingUpdate();
          pendingUpdate = parseResponse(pRes);

          if (pendingUpdate) {
            // Save Update ID for further updates
            const currentUpdateId = pendingUpdate.id || pendingUpdate._id;
            saveUpdateId(currentUpdateId);

            // Fetch active address and kyc updates if a request exists
            const [activeARes, activeKRes] = await Promise.all([
              getActiveAddressUpdate().catch(() => null),
              getActiveKycUpdate().catch(() => null),
            ]);

            activeAddress = parseResponse(activeARes);
            activeKyc = parseResponse(activeKRes);
          }
        } catch (err) {
          if (!is404Err(err))
            console.error("Error checking pending updates:", err);
        }

        // 3. Merge Data: Pending/Active > Base
        // We only overwrite base values if the update has a valid (non-null/non-empty) value
        const mergeUpdate = (base, update) => {
          if (!update) return base;
          if (!base) return update;
          const merged = { ...base };
          Object.keys(update).forEach((key) => {
            const val = update[key];
            if (val !== null && val !== undefined && val !== "") {
              // For arrays, only merge if they aren't empty
              if (Array.isArray(val) && val.length === 0) return;
              merged[key] = val;
            }
          });
          return merged;
        };

        setData({
          business: mergeUpdate(baseBusiness, pendingUpdate),
          address: mergeUpdate(baseAddress, activeAddress),
          kyc: mergeUpdate(baseKyc, activeKyc),
        });
      } catch (e) {
        console.error("Error in data initialization", e);
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

  // ===== UPDATE HANDLERS =====
  const handleSubmit = async () => {
    try {
      setErrors((p) => ({ ...p, submit: "" }));
      setLoadingStates((p) => ({ ...p, submit: true }));

      let currentId = updateId;

      const b = form.business || {};
      const origB = data.business || {};
      let bChanged = false;
      if (b.logo instanceof File || b.banner instanceof File || b.consultationName !== (origB.consultationName || "") || b.username !== (origB.username || "") || b.ownerName !== (origB.ownerName || "") || b.companyEmail !== (origB.companyEmail || "") || String(b.establishmentYear || "") !== String(origB.establishmentYear || "") || JSON.stringify(origB.vehicleTypes || []) !== JSON.stringify(origB.vehicleTypes || []) || JSON.stringify(origB.services || []) !== JSON.stringify(origB.services || [])) bChanged = true;
      if (JSON.stringify(origB.vehicleTypes || []) !== JSON.stringify(b.vehicleTypes || []) || JSON.stringify(origB.services || []) !== JSON.stringify(b.services || [])) bChanged = true;

      const a = form.address || {};
      const origA = data.address || {};
      let aChanged = false;
      if (a.address !== (origA.address || "") || String(a.stateId || "") !== String(origA.state?.id || origA.stateId || "") || String(a.cityId || "") !== String(origA.city?.id || origA.cityId || "") || String(a.townId || "") !== String(origA.town?.id || origA.townId || "") || a.mapUrl !== (origA.mapUrl || "")) aChanged = true;

      const k = form.kyc || {};
      const origK = data.kyc || {};
      let kChanged = false;
      if (k.gstNumber !== (origK.gstNumber || "") || k.panNumber !== (origK.panCardNumber || "") || k.aadharNumber !== (origK.aadharCardNumber || "") || k.gstPhoto instanceof File || k.panPhoto instanceof File || k.aadharFront instanceof File || k.aadharBack instanceof File) kChanged = true;

      if (!bChanged && !aChanged && !kChanged && !currentId) {
        setErrors((p) => ({ ...p, submit: "No changes detected to update." }));
        setLoadingStates((p) => ({ ...p, submit: false }));
        return;
      }

      if ((bChanged || aChanged || kChanged) && !currentId) {
        const createRes = await createUpdateRequest(new FormData());
        if (createRes.success && (createRes.data?._id || createRes.data?.id)) {
          currentId = createRes.data?._id || createRes.data?.id;
          saveUpdateId(currentId);
        } else {
          setErrors((p) => ({ ...p, submit: createRes.message || "Failed to initiate update request" }));
          setLoadingStates((p) => ({ ...p, submit: false }));
          return;
        }
      }

      if (bChanged) {
        const payload = new FormData();
        if (b.logo instanceof File) payload.append("logo", b.logo);
        if (b.banner instanceof File) payload.append("banner", b.banner);
        payload.append("consultationName", b.consultationName || "");
        payload.append("username", b.username || "");
        payload.append("ownerName", b.ownerName || "");
        payload.append("companyEmail", b.companyEmail || "");
        payload.append("establishmentYear", b.establishmentYear || "");
        (b.vehicleTypes || []).forEach((v, i) => payload.append(`vehicleTypes[${i}]`, v));
        (b.services || []).forEach((s, i) => payload.append(`services[${i}]`, s));

        const res = await updateBasicDetails(payload, currentId);
        if (!res.success) {
          setErrors((p) => ({ ...p, submit: res.message || "Failed to update business details" }));
          setLoadingStates((p) => ({ ...p, submit: false }));
          return;
        }
      }

      if (aChanged) {
        const payload = new FormData();
        payload.append("address", a.address || "");
        payload.append("stateId", a.stateId || "");
        payload.append("cityId", a.cityId || "");
        if (a.townId) payload.append("townId", a.townId);
        if (a.mapUrl) payload.append("mapUrl", a.mapUrl);

        const res = await updateAddressDetails(payload, currentId);
        if (!res.success) {
          setErrors((p) => ({ ...p, submit: res.message || "Failed to update address details" }));
          setLoadingStates((p) => ({ ...p, submit: false }));
          return;
        }
      }

      if (kChanged) {
        const payload = new FormData();
        payload.append("gstNumber", k.gstNumber || "");
        payload.append("panCardNumber", k.panNumber || "");
        payload.append("aadharCardNumber", k.aadharNumber || "");
        if (k.gstPhoto instanceof File) payload.append("gstCertificateImage", k.gstPhoto);
        if (k.panPhoto instanceof File) payload.append("panCardFrontImage", k.panPhoto);
        if (k.aadharFront instanceof File) payload.append("aadharCardFrontImage", k.aadharFront);
        if (k.aadharBack instanceof File) payload.append("aadharCardBackImage", k.aadharBack);

        const res = await updateKycDocuments(payload, currentId);
        if (!res.success) {
          setErrors((p) => ({ ...p, submit: res.message || "Failed to update KYC documents" }));
          setLoadingStates((p) => ({ ...p, submit: false }));
          return;
        }
      }

      const res = await finalSubmit(currentId);

      if (res?.success || res?.data) {
        setErrors((p) => ({ ...p, submit: "" }));
        sessionStorage.removeItem("consult_update_id");
        push("/consult/dashboard/profile");
        return;
      } else {
        setErrors((p) => ({ ...p, submit: res.message || "Submission failed" }));
      }
    } catch (error) {
      console.error("Submission failed", error);
      setErrors((p) => ({ ...p, submit: "Submission failed" }));
    } finally {
      setLoadingStates((p) => ({ ...p, submit: false }));
    }
  };

  const verificationStatus = data.business?.verificationStatus;
  const isSubmitted = data.business?.isSubmitted;
  const isRequested = isSubmitted === true && verificationStatus === "REQUESTED";
  const isChangesRequested = verificationStatus === "REQUEST_CHANGES";
  const isRejected = verificationStatus === "REJECTED";
  const adminRemark = data.business?.adminRemark;

  return (
    <>
      <Navbar />

      <section className="w-full pt-[66px]">
        <div className="w-full flex items-start">
          {/* LEFT PANEL */}
          <div className="hidden lg:flex w-[30%] sticky top-[66px] h-[calc(100vh-66px)]  flex-col justify-between text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image src="/homeBanner.jpg" loading="lazy" alt="Partner Program" width={800} height={500} className="w-full h-full object-cover object-center" />
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
            <div className="flex-1 px-3 py-6 sm:px-8 lg:px-16 lg:py-10 relative">
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

                    {isRequested && (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5 flex items-start gap-4 mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="bg-yellow-500/20 p-2 rounded-lg">
                          <Clock className="text-yellow-400" size={20} />
                        </div>
                        <div>
                          <p className="text-yellow-400 font-bold tracking-tight">
                            Your changes are in Review
                          </p>
                          <p className="text-third text-sm mt-1">
                            Your profile update request is currently being
                            reviewed by our admin team. You cannot make further
                            changes until the review is complete.
                          </p>
                        </div>
                      </div>
                    )}

                    {isChangesRequested && (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 space-y-3 mb-10 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center gap-3 text-yellow-600 font-bold">
                          <AlertCircle size={20} />
                          <span>Action Required: Changes Requested</span>
                        </div>
                        <p className="text-primary/80 text-sm font-medium">
                          Admin Feedback:
                        </p>
                        <p className="text-primary/70 text-sm italic bg-orange-500/5 p-3 rounded-lg border border-orange-500/10">
                          {adminRemark || "-"}
                        </p>
                      </div>
                    )}

                    {isRejected && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 space-y-3 mb-10 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center gap-3 text-red-600 font-bold">
                          <XCircle size={20} />
                          <span>Update Request Rejected</span>
                        </div>
                        <p className="text-primary/80 text-sm font-medium">
                          Reason for Rejection:
                        </p>
                        <p className="text-primary/70 text-sm italic bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                          {adminRemark ||
                            "Your update request has been rejected by the administrator. Please contact support for more details."}
                        </p>
                      </div>
                    )}

                    {/* BUSINESS SECTION */}
                    <div className="border-0 sm:border border-primary/30 rounded-xl px-0 py-6 sm:p-6">
                      <div className="flex justify-between mb-4">
                        <h3 className="font-semibold">Preview Your Details</h3>
                      </div>
                      <div
                        className={`${isRequested || isRejected ? "pointer-events-none opacity-60" : ""}`}
                      >
                        <Step1Business
                          initialData={data.business}
                          onChange={handleBusinessChange}
                          readOnly={isRequested || isRejected}
                          isUpdateMode={true}
                        />
                      </div>
                      {errors.business && (
                        <p className="text-red-500 text-[10px] mt-4 ml-1 animate-in fade-in slide-in-from-top-1">
                          {errors.business}
                        </p>
                      )}
                    </div>

                    {/* ADDRESS SECTION */}
                    <div className="border-0 sm:border border-primary/30 rounded-xl px-0 py-6 sm:p-6">
                      <div className="flex justify-between mb-4">
                        <h3 className="font-semibold">Address Details</h3>
                      </div>
                      <div
                        className={`${isRequested || isRejected ? "pointer-events-none opacity-60" : ""}`}
                      >
                        <Step2Address
                          initialData={data.address}
                          onChange={handleAddressChange}
                          readOnly={isRequested || isRejected}
                        />
                      </div>
                      {errors.address && (
                        <p className="text-red-500 text-[10px] mt-4 ml-1 animate-in fade-in slide-in-from-top-1">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {/* KYC SECTION */}
                    <div className="border-0 sm:border border-primary/30 rounded-xl px-0 py-6 sm:p-6">
                      <div className="flex justify-between mb-4">
                        <h3 className="font-semibold">KYC Details</h3>
                      </div>
                      <div
                        className={`${isRequested || isRejected ? "pointer-events-none opacity-60" : ""}`}
                      >
                        <Step3KYC
                          initialData={data.kyc}
                          onChange={handleKycChange}
                          readOnly={isRequested || isRejected}
                        />
                      </div>
                      {errors.kyc && (
                        <p className="text-red-500 text-[10px] mt-4 ml-1 animate-in fade-in slide-in-from-top-1">
                          {errors.kyc}
                        </p>
                      )}
                    </div>

                    {/* FINAL SUBMIT */}
                    {!isRequested && !isRejected && (
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
                    )}
                    {errors.submit && (
                      <p className="text-red-500 text-[10px] text-right mt-2 mr-1 animate-in fade-in slide-in-from-top-1">
                        {errors.submit}
                      </p>
                    )}
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
