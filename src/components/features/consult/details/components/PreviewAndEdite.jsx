"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import Step1Business from "../components/Step1Business";
import Step2Address from "../components/Step2Address";
import Step3KYC from "../components/Step3KYC";

import {
  getBaiscDetails,
  getAddressDetails,
  getKycDocs,
  updatebasicDetials,
  updateAddressDetials,
  updateKycDetials,
  finalSubmit,
} from "@/services/consult.service";

import Button from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { showBackendError } from "@/lib/axiosInstance";

export default function PreviewAndEdite({ existing, onBack, onSuccess }) {
  const router = useRouter();

  // ===== EDIT MODES =====
  const [editMode, setEditMode] = useState({
    business: false,
    address: false,
    kyc: false,
  });

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    business: existing?.business,
    address: existing?.address,
    kyc: existing?.kyc,
  });

  const [form, setForm] = useState({
    business: null,
    address: null,
    kyc: null,
  });

  const handleBusinessChange = useCallback((d) => {
    setForm((p) => ({ ...p, business: d }));
  }, []);

  const handleAddressChange = useCallback((d) => {
    setForm((p) => ({ ...p, address: d }));
  }, []);

  const handleKycChange = useCallback((d) => {
    setForm((p) => ({ ...p, kyc: d }));
  }, []);

  const updateBusiness = async () => {
    try {
      setLoading(true);

      await updatebasicDetials(form.business);

      toast.success("Business updated");
      setEditMode((p) => ({ ...p, business: false }));

      const b = await getBaiscDetails();
      setData((p) => ({ ...p, business: b?.data }));
    } catch (e) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async () => {
    try {
      setLoading(true);

      await updateAddressDetials(form.address);

      toast.success("Address updated");
      setEditMode((p) => ({ ...p, address: false }));

      const a = await getAddressDetails();
      setData((p) => ({ ...p, address: a?.data }));
    } catch (e) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const updateKyc = async () => {
    try {
      setLoading(true);

      await updateKycDetials(form.kyc);

      toast.success("KYC updated");
      setEditMode((p) => ({ ...p, kyc: false }));

      const k = await getKycDocs();
      setData((p) => ({ ...p, kyc: k?.data }));
    } catch (e) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FINAL SUBMIT
  // ==========================================
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await finalSubmit();

      if (res?.success || res?.data) {
        toast.success(res?.message || "Profile submitted successfully");
        if (onSuccess) onSuccess();
        return;
      }

      toast.error("Something went wrong");
    } catch (error) {
      showBackendError(error); // 👈 better than plain toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="space-y-10 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-primary">
          Preview Your Details
        </h2>

        {/* ================= BUSINESS ================= */}
        <div className="border border-primary/30 rounded-xl p-6 bg-third/10">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Business Details</h3>

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
                  onClick={() =>
                    setEditMode((p) => ({ ...p, business: false }))
                  }
                >
                  Cancel
                </Button>

                <Button
                  variant="ghost"
                  onClick={updateBusiness}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </Button>
              </div>
            )}
          </div>

          <div
            className={`transition-opacity duration-300 ${!editMode.business ? "pointer-events-none opacity-60" : ""}`}
          >
            <Step1Business
              initialData={data.business}
              onChange={handleBusinessChange}
              readOnly={!editMode.business}
            />
          </div>
        </div>

        {/* ================= ADDRESS ================= */}
        <div className="border rounded-xl p-6 bg-third/10">
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
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </Button>
              </div>
            )}
          </div>

          <div
            className={`transition-opacity duration-300 ${!editMode.address ? "pointer-events-none opacity-60" : ""}`}
          >
            <Step2Address
              initialData={data.address}
              onChange={handleAddressChange}
              readOnly={!editMode.address}
            />
          </div>
        </div>

        {/* ================= KYC ================= */}
        <div className="border rounded-xl p-6 bg-third/10">
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

                <Button variant="ghost" onClick={updateKyc} disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </Button>
              </div>
            )}
          </div>

          <div
            className={`transition-opacity duration-300 ${!editMode.kyc ? "pointer-events-none opacity-60" : ""}`}
          >
            <Step3KYC
              initialData={data.kyc}
              onChange={handleKycChange}
              readOnly={!editMode.kyc}
            />
          </div>
        </div>

        {/* ================= FINAL SUBMIT ================= */}
        <div className="flex justify-end">
          <Button variant="ghost" onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Final Submit"}
          </Button>
        </div>
      </div>
    </>
  );
}
