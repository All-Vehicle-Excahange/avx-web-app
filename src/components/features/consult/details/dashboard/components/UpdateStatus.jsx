
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layout/Navbar";
import { SkeletonBox } from "@/components/ui/skeleton";
import Button from "@/components/ui/button";
import { toast, Toaster } from "react-hot-toast";
import {
  getActiveBasicUpdate,
  getActiveAddressUpdate,
  getActiveKycUpdate,
  updateBasicDetails,
  updateAddressDetails,
  updateKycDocuments,
  finalSubmit,
} from "@/services/consult.profile.service";
import Step1Business from "../../components/Step1Business";
import Step2Address from "../../components/Step2Address";
import Step3KYC from "../../components/Step3KYC";
import { Clock, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

export default function UpdateStatus() {
  const router = useRouter();
  const [updateId, setUpdateId] = useState(null);
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
    initial: true,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [basic, address, kyc] = await Promise.all([
          getActiveBasicUpdate(),
          getActiveAddressUpdate(),
          getActiveKycUpdate(),
        ]);

        if (basic.success && basic.data) {
          setUpdateId(basic.data.id || basic.data._id);
        }

        setData({
          business: basic.success ? basic.data : null,
          address: address.success ? address.data : null,
          kyc: kyc.success ? kyc.data : null,
        });
      } catch (err) {
        console.error("Error fetching update status:", err);
      } finally {
        setLoadingStates((p) => ({ ...p, initial: false }));
      }
    };
    fetchData();
  }, []);

  const verificationStatus = data.business?.verificationStatus || "PENDING";
  const isRequested = verificationStatus === "REQUESTED";
  const isChangesRequested = verificationStatus === "REQUEST_CHANGES";
  const adminRemark = data.business?.adminRemark;

  const handleBusinessChange = (d) => {
    setForm((p) => ({ ...p, business: d }));
  };

  const handleAddressChange = (d) => {
    setForm((p) => ({ ...p, address: d }));
  };

  const handleKycChange = (d) => {
    setForm((p) => ({ ...p, kyc: d }));
  };

  const updateBusiness = async () => {
    try {
      if (!form.business) {
        setEditMode((p) => ({ ...p, business: false }));
        return;
      }
      setLoadingStates((p) => ({ ...p, business: true }));

      // Build DELTA payload — only send what changed
      const payload = new FormData();
      const b = form.business;
      const orig = data.business || {};
      let hasChanges = false;

      if (b.logo instanceof File) {
        payload.append("logo", b.logo);
        hasChanges = true;
      }
      if (b.banner instanceof File) {
        payload.append("banner", b.banner);
        hasChanges = true;
      }
      if (b.consultationName !== (orig.consultationName || "")) {
        payload.append("consultationName", b.consultationName || "");
        hasChanges = true;
      }
      if (b.ownerName !== (orig.ownerName || "")) {
        payload.append("ownerName", b.ownerName || "");
        hasChanges = true;
      }
      if (b.companyEmail !== (orig.companyEmail || "")) {
        payload.append("companyEmail", b.companyEmail || "");
        hasChanges = true;
      }
      if (
        String(b.establishmentYear || "") !==
        String(orig.establishmentYear || "")
      ) {
        payload.append("establishmentYear", b.establishmentYear || "");
        hasChanges = true;
      }
      if (
        JSON.stringify(b.vehicleTypes || []) !==
        JSON.stringify(orig.vehicleTypes || [])
      ) {
        (b.vehicleTypes || []).forEach((v, i) =>
          payload.append(`vehicleTypes[${i}]`, v),
        );
        hasChanges = true;
      }
      if (
        JSON.stringify(b.services || []) !== JSON.stringify(orig.services || [])
      ) {
        (b.services || []).forEach((s, i) =>
          payload.append(`services[${i}]`, s),
        );
        hasChanges = true;
      }

      if (!hasChanges) {
        toast("No changes detected.");
        setEditMode((p) => ({ ...p, business: false }));
        return;
      }

      const res = await updateBasicDetails(payload, updateId);
      if (res.success) {
        toast.success("Business details updated");
        setEditMode((p) => ({ ...p, business: false }));
        setData((p) => ({ ...p, business: { ...p.business, ...b } }));
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (e) {
      toast.error("An error occurred");
    } finally {
      setLoadingStates((p) => ({ ...p, business: false }));
    }
  };

  const updateAddress = async () => {
    try {
      if (!form.address) {
        setEditMode((p) => ({ ...p, address: false }));
        return;
      }
      setLoadingStates((p) => ({ ...p, address: true }));

      // Build DELTA payload — only send what changed
      const payload = new FormData();
      const a = form.address;
      const orig = data.address || {};
      let hasChanges = false;

      if (a.address !== (orig.address || "")) {
        payload.append("address", a.address || "");
        hasChanges = true;
      }
      if (
        String(a.stateId || "") !== String(orig.state?.id || orig.stateId || "")
      ) {
        payload.append("stateId", a.stateId || "");
        hasChanges = true;
      }
      if (
        String(a.cityId || "") !== String(orig.city?.id || orig.cityId || "")
      ) {
        payload.append("cityId", a.cityId || "");
        hasChanges = true;
      }

      if (!hasChanges) {
        toast("No changes detected.");
        setEditMode((p) => ({ ...p, address: false }));
        return;
      }

      const res = await updateAddressDetails(payload, updateId);
      if (res.success) {
        toast.success("Address updated");
        setEditMode((p) => ({ ...p, address: false }));
        setData((p) => ({
          ...p,
          address: {
            ...p.address,
            address: a.address,
            state: { ...p.address?.state, id: a.stateId, name: a.stateName },
            city: { ...p.address?.city, id: a.cityId, name: a.cityName },
          },
        }));
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (e) {
      toast.error("An error occurred");
    } finally {
      setLoadingStates((p) => ({ ...p, address: false }));
    }
  };

  const updateKyc = async () => {
    try {
      if (!form.kyc) {
        setEditMode((p) => ({ ...p, kyc: false }));
        return;
      }
      setLoadingStates((p) => ({ ...p, kyc: true }));

      // Build DELTA payload — only send what changed
      const payload = new FormData();
      const k = form.kyc;
      const orig = data.kyc || {};
      let hasChanges = false;

      if (k.gstNumber !== (orig.gstNumber || "")) {
        payload.append("gstNumber", k.gstNumber || "");
        hasChanges = true;
      }
      if (k.panNumber !== (orig.panCardNumber || "")) {
        payload.append("panCardNumber", k.panNumber || "");
        hasChanges = true;
      }
      if (k.aadharNumber !== (orig.aadharCardNumber || "")) {
        payload.append("aadharCardNumber", k.aadharNumber || "");
        hasChanges = true;
      }
      if (k.gstPhoto instanceof File) {
        payload.append("gstCertificateImage", k.gstPhoto);
        hasChanges = true;
      }
      if (k.panPhoto instanceof File) {
        payload.append("panCardFrontImage", k.panPhoto);
        hasChanges = true;
      }
      if (k.aadharFront instanceof File) {
        payload.append("aadharCardFrontImage", k.aadharFront);
        hasChanges = true;
      }
      if (k.aadharBack instanceof File) {
        payload.append("aadharCardBackImage", k.aadharBack);
        hasChanges = true;
      }

      if (!hasChanges) {
        toast("No changes detected.");
        setEditMode((p) => ({ ...p, kyc: false }));
        return;
      }

      const res = await updateKycDocuments(payload, updateId);
      if (res.success) {
        toast.success("KYC documents updated");
        setEditMode((p) => ({ ...p, kyc: false }));
        setData((p) => ({
          ...p,
          kyc: {
            ...p.kyc,
            gstNumber: k.gstNumber,
            panCardNumber: k.panNumber,
            aadharCardNumber: k.aadharNumber,
          },
        }));
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (e) {
      toast.error("An error occurred");
    } finally {
      setLoadingStates((p) => ({ ...p, kyc: false }));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoadingStates((p) => ({ ...p, submit: true }));
      const res = await finalSubmit(updateId);
      if (res.success || res.data) {
        toast.success("Profile re-submitted successfully");
        router.push("/consult/dashboard/overview");
      } else {
        toast.error(res.message || "Submission failed");
      }
    } catch (e) {
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
                alt="Update Tracker"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 space-y-10 p-12">
              <div>
                <h2 className="text-3xl font-bold mb-4 tracking-tight">
                  Track Your Profile Update
                </h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  We are currently reviewing your recent changes. Most updates
                  are processed within 24-48 hours.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Clock, text: "Under review by our team" },
                  { icon: ShieldCheck, text: "Secure verification process" },
                  { icon: CheckCircle2, text: "Live updates once approved" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full lg:w-[70%] flex flex-col relative min-h-[calc(100vh-66px)]">
            <div className="flex-1 px-6 py-8 lg:px-16 lg:py-10 relative text-black">
              <div className="max-w-3xl mx-auto w-full">
                {loadingStates.initial ? (
                  <div className="space-y-10 animate-pulse">
                    <SkeletonBox className="w-1/3 h-8 rounded-lg" />
                    <SkeletonBox className="w-full h-40 rounded-xl" />
                    <SkeletonBox className="w-full h-40 rounded-xl" />
                  </div>
                ) : (
                  <div className="space-y-10">
                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-2">
                        Update Status Dashboard
                      </h2>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                            isRequested
                              ? "bg-yellow-500/10 text-yellow-600"
                              : "bg-orange-500/10 text-orange-500"
                          }`}
                        >
                          {verificationStatus === "REQUESTED" ? "PENDING" : verificationStatus}
                        </span>
                        {isRequested && (
                          <span className="text-yellow-600 text-[10px] font-bold animate-pulse">
                            (Currently being reviewed by admin)
                          </span>
                        )}
                      </div>
                    </div>

                    {isChangesRequested && adminRemark && (
                      <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 space-y-3">
                        <div className="flex items-center gap-3 text-orange-600 font-bold">
                          <AlertCircle size={20} />
                          <span>Updates Needed</span>
                        </div>
                        <p className="text-primary/70 text-sm italic">
                          "{adminRemark}"
                        </p>
                      </div>
                    )}

                    {/* BUSINESS SECTION */}
                    {data.business && (
                      <div className="border border-primary/30 rounded-xl p-6">
                        <div className="flex justify-between mb-4">
                          <h3 className="font-semibold text-primary">
                            Business Details
                          </h3>
                          {isChangesRequested && (
                            <SectionControls
                              editMode={editMode.business}
                              setEditMode={(val) =>
                                setEditMode((p) => ({ ...p, business: val }))
                              }
                              onUpdate={updateBusiness}
                              loading={loadingStates.business}
                            />
                          )}
                        </div>
                        <div
                          className={`${!editMode.business ? "pointer-events-none opacity-60" : ""}`}
                        >
                          <Step1Business
                            initialData={data.business}
                            readOnly={!editMode.business}
                            onChange={handleBusinessChange}
                          />
                        </div>
                      </div>
                    )}

                    {/* ADDRESS SECTION */}
                    {data.address && (
                      <div className="border border-primary/30 rounded-xl p-6">
                        <div className="flex justify-between mb-4">
                          <h3 className="font-semibold text-primary">
                            Location Information
                          </h3>
                          {isChangesRequested && (
                            <SectionControls
                              editMode={editMode.address}
                              setEditMode={(val) =>
                                setEditMode((p) => ({ ...p, address: val }))
                              }
                              onUpdate={updateAddress}
                              loading={loadingStates.address}
                            />
                          )}
                        </div>
                        <div
                          className={`${!editMode.address ? "pointer-events-none opacity-60" : ""}`}
                        >
                          <Step2Address
                            initialData={data.address}
                            readOnly={!editMode.address}
                            onChange={handleAddressChange}
                          />
                        </div>
                      </div>
                    )}

                    {/* KYC SECTION */}
                    {data.kyc && (
                      <div className="border border-primary/30 rounded-xl p-6">
                        <div className="flex justify-between mb-4">
                          <h3 className="font-semibold text-primary">
                            KYC Documents
                          </h3>
                          {isChangesRequested && (
                            <SectionControls
                              editMode={editMode.kyc}
                              setEditMode={(val) =>
                                setEditMode((p) => ({ ...p, kyc: val }))
                              }
                              onUpdate={updateKyc}
                              loading={loadingStates.kyc}
                            />
                          )}
                        </div>
                        <div
                          className={`${!editMode.kyc ? "pointer-events-none opacity-60" : ""}`}
                        >
                          <Step3KYC
                            initialData={data.kyc}
                            readOnly={!editMode.kyc}
                            onChange={handleKycChange}
                          />
                        </div>
                      </div>
                    )}

                    {isChangesRequested && (
                      <div className="pt-10">
                        <Button
                          className="w-full py-6 rounded-2xl text-lg font-black tracking-widest uppercase shadow-2xl shadow-primary/20"
                          onClick={handleSubmit}
                          loading={loadingStates.submit}
                        >
                          Submit Revised Application
                        </Button>
                      </div>
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

const SectionControls = ({ editMode, setEditMode, onUpdate, loading }) => {
  if (!editMode) {
    return (
      <Button variant="ghost" onClick={() => setEditMode(true)}>
        Edit
      </Button>
    );
  }

  return (
    <div className="flex gap-3">
      <Button variant="outlineSecondary" onClick={() => setEditMode(false)}>
        Cancel
      </Button>
      <Button variant="ghost" onClick={onUpdate} loading={loading}>
        Update
      </Button>
    </div>
  );
};
