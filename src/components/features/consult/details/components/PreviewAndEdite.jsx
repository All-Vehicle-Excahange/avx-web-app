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

export default function PreviewAndEdite({ existing, onBack, onSuccess }) {
  const router = useRouter();

  // ===== EDIT MODES =====
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
      if (!form.business) {
        setEditMode((p) => ({ ...p, business: false }));
        return;
      }
      setLoadingStates((p) => ({ ...p, business: true }));

      const payload = new FormData();
      const b = form.business;
      if (b.logo instanceof File) payload.append("logo", b.logo);
      if (b.banner instanceof File) payload.append("banner", b.banner);
      payload.append("consultationName", b.consultationName || "");
      payload.append("ownerName", b.ownerName || "");
      payload.append("companyEmail", b.companyEmail || "");
      payload.append("establishmentYear", b.establishmentYear || "");
      if (Array.isArray(b.vehicleTypes)) {
        b.vehicleTypes.forEach((v, i) =>
          payload.append(`vehicleTypes[${i}]`, v),
        );
      }
      if (Array.isArray(b.services)) {
        b.services.forEach((s, i) => payload.append(`services[${i}]`, s));
      }

      await updatebasicDetials(payload);
      setEditMode((p) => ({ ...p, business: false }));

      const bRes = await getBaiscDetails();
      setData((p) => ({ ...p, business: bRes?.data }));
    } catch (e) {
      console.error("Update failed", e);
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

      const a = form.address;
      const payload = {
        address: a.address || "",
        stateId: a.stateId,
        cityId: a.cityId,
        countryId: a.countryId || 101,
        latitude: a.latitude || 12.12,
        longitude: a.longitude || 12.12,
      };

      await updateAddressDetials(payload);
      setEditMode((p) => ({ ...p, address: false }));

      const aRes = await getAddressDetails();
      setData((p) => ({ ...p, address: aRes?.data }));
    } catch (e) {
      console.error("Update failed", e);
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

      const payload = new FormData();
      const k = form.kyc;
      payload.append("gstNumber", k.gstNumber || "");
      payload.append("panCardNumber", k.panNumber || "");
      payload.append("aadharCardNumber", k.aadharNumber || "");
      if (k.gstPhoto instanceof File)
        payload.append("gstCertificateImage", k.gstPhoto);
      if (k.panPhoto instanceof File)
        payload.append("panCardFrontImage", k.panPhoto);
      if (k.aadharFront instanceof File)
        payload.append("aadharCardFrontImage", k.aadharFront);
      if (k.aadharBack instanceof File)
        payload.append("aadharCardBackImage", k.aadharBack);

      await updateKycDetials(payload);
      setEditMode((p) => ({ ...p, kyc: false }));

      const kRes = await getKycDocs();
      setData((p) => ({ ...p, kyc: kRes?.data }));
    } catch (e) {
      console.error("Update failed", e);
    } finally {
      setLoadingStates((p) => ({ ...p, kyc: false }));
    }
  };

  // ==========================================
  // FINAL SUBMIT
  // ==========================================
  const handleSubmit = async () => {
    try {
      setLoadingStates((p) => ({ ...p, submit: true }));
      const res = await finalSubmit();

      if (res?.success || res?.data) {
        if (onSuccess) onSuccess();
        return;
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setLoadingStates((p) => ({ ...p, submit: false }));
    }
  };

  return (
    <>
      <div className="space-y-10 max-w-5xl mx-auto">
        {/* <h2 className="text-2xl font-semibold text-primary">
          Preview Your Details
        </h2> */}

        {/* ================= BUSINESS ================= */}
        <div className="border border-primary/30 rounded-xl p-6 ">
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
                  onClick={() =>
                    setEditMode((p) => ({ ...p, business: false }))
                  }
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
        <div className="border border-primary/30 rounded-xl p-6 ">
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
        <div className="border border-primary/30 rounded-xl p-6 ">
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
          <Button 
            variant="ghost" 
            onClick={handleSubmit} 
            loading={loadingStates.submit}
          >
            Final Submit
          </Button>
        </div>
      </div>
    </>
  );
}
