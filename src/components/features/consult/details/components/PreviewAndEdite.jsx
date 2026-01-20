"use client";

import React, { useEffect, useState } from "react";
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

export default function PreviewAndEdite({ existing }) {
  const router = useRouter();

  // ===== EDIT MODES =====
  const [editMode, setEditMode] = useState({
    business: false,
    address: false,
    kyc: false,
  });

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    business: null,
    address: null,
    kyc: null,
  });

  const [form, setForm] = useState({
    business: null,
    address: null,
    kyc: null,
  });

  useEffect(() => {
    const load = async () => {
      // 1. Set normal data
      setData({
        business: existing.business,
        address: existing.address,
        kyc: existing.kyc,
      });

      // 2. CHECK SUBMITTED STATUS 🔥
      // if (existing?.business?.isSubmitted === true) {
      //   router.push("/consult/dashboard");
      //   return;
      // }
    };

    load();
  }, [existing]);

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
      const res = await finalSubmit();

      if (res?.success || res?.data) {
        toast.success(res?.message || "Profile submitted successfully");
        return;
      }

      toast.error("Something went wrong");
    } catch (error) {
      showBackendError(error); // 👈 better than plain toast
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
        <div className="border rounded-xl p-6 bg-third/10">
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
                  variant="ghost"
                  onClick={() =>
                    setEditMode((p) => ({ ...p, business: false }))
                  }
                >
                  Cancel
                </Button>

                <Button onClick={updateBusiness} disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </Button>
              </div>
            )}
          </div>

          <Step1Business
            initialData={data.business}
            onChange={(d) => setForm((p) => ({ ...p, business: d }))}
            readOnly={!editMode.business}
          />
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
                  variant="ghost"
                  onClick={() => setEditMode((p) => ({ ...p, address: false }))}
                >
                  Cancel
                </Button>

                <Button onClick={updateAddress} disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </Button>
              </div>
            )}
          </div>

          <Step2Address
            initialData={data.address}
            onChange={(d) => setForm((p) => ({ ...p, address: d }))}
            readOnly={!editMode.address}
          />
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
                  variant="ghost"
                  onClick={() => setEditMode((p) => ({ ...p, kyc: false }))}
                >
                  Cancel
                </Button>

                <Button onClick={updateKyc} disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </Button>
              </div>
            )}
          </div>

          <Step3KYC
            initialData={data.kyc}
            onChange={(d) => setForm((p) => ({ ...p, kyc: d }))}
            readOnly={!editMode.kyc}
          />
        </div>

        {/* ================= FINAL SUBMIT ================= */}
        <div className="flex justify-end">
          <Button variant="ghost" onClick={handleSubmit}>
            Final Submit
          </Button>
        </div>
      </div>
    </>
  );
}
