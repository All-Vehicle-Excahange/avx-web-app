"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Step1Business from "../components/Step1Business";
import Step2Address from "../components/Step2Address";
import Step3KYC from "../components/Step3KYC";
import { Briefcase, MapPin, FileText, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

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

export default function PreviewAndEdite({
  existing,
  onBack,
  onSuccess,
  hasMadeAnyUpdate,
  setHasMadeAnyUpdate,
}) {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const isChangesRequested =
    existing?.business?.verificationStatus === "REQUEST_CHANGES";
  const canEdit = !existing?.business?.isSubmitted || isChangesRequested;

  const [editMode, setEditMode] = useState({
    business: canEdit,
    address: canEdit,
    kyc: canEdit,
  });

  const [loadingStates, setLoadingStates] = useState({
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

  const [localChanged, setLocalChanged] = useState({
    business: false,
    address: false,
    kyc: false,
  });

  const handleBusinessChange = useCallback((d, isChanged) => {
    setForm((p) => ({ ...p, business: d }));
    setLocalChanged((p) => ({ ...p, business: isChanged }));
  }, []);

  const handleAddressChange = useCallback((d, isChanged) => {
    setForm((p) => ({ ...p, address: d }));
    setLocalChanged((p) => ({ ...p, address: isChanged }));
  }, []);

  const handleKycChange = useCallback((d, isChanged) => {
    setForm((p) => ({ ...p, kyc: d }));
    setLocalChanged((p) => ({ ...p, kyc: isChanged }));
  }, []);

  // ==========================================
  // FINAL SUBMIT
  // ==========================================
  const handleSubmit = async () => {
    try {
      setLoadingStates((p) => ({ ...p, submit: true }));
      let updateMade = false;

      // Update Business
      if (form.business && localChanged.business) {
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
        updateMade = true;
      }

      // Update Address
      if (form.address && localChanged.address) {
        const a = form.address;
        const payload = {
          address: a.address || "",
          stateId: a.stateId,
          cityId: a.cityId,
          townId: a.townId,
          countryId: a.countryId || 101,
          latitude: a.latitude || 22.2587,
          longitude: a.longitude || 71.1924,
        };
        if (a?.mapUrl) payload.mapUrl = a.mapUrl;
        await updateAddressDetials(payload);
        updateMade = true;
      }

      // Update KYC
      if (form.kyc && localChanged.kyc) {
        const payload = new FormData();
        const k = form.kyc;
        if (k.gstNumber) payload.append("gstNumber", k.gstNumber);
        if (k.panNumber) payload.append("panCardNumber", k.panNumber);
        if (k.aadharNumber) payload.append("aadharCardNumber", k.aadharNumber);
        if (k.gstPhoto instanceof File)
          payload.append("gstCertificateImage", k.gstPhoto);
        if (k.panPhoto instanceof File)
          payload.append("panCardFrontImage", k.panPhoto);
        if (k.aadharFront instanceof File)
          payload.append("aadharCardFrontImage", k.aadharFront);
        if (k.aadharBack instanceof File)
          payload.append("aadharCardBackImage", k.aadharBack);
        await updateKycDetials(payload);
        updateMade = true;
      }

      if (updateMade) {
        setHasMadeAnyUpdate(true);
      }

      const res = await finalSubmit();

      if (res?.success || res?.data) {
        if (onSuccess) onSuccess();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setLoadingStates((p) => ({ ...p, submit: false }));
    }
  };

  // Framer Motion staggered animations configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10 max-w-5xl mx-auto"
    >
      {/* ================= BUSINESS ================= */}
      <motion.div
        variants={itemVariants}
        className="bg-white/2 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-2xl relative z-10 hover:border-white/6 transition-all duration-300"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
            <Briefcase size={16} className="text-primary/70" />
            Preview Your Details
          </h3>

          <div className="flex items-center gap-3">
            {existing?.business?.isSubmitted && (
              <Button
                variant="outlineSecondary"
                onClick={onBack}
                className="flex items-center gap-2 text-xs"
              >
                <LayoutDashboard className="mr-2" size={14} />
                Application Status
              </Button>
            )}
          </div>
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
      </motion.div>

      {/* ================= ADDRESS ================= */}
      <motion.div
        variants={itemVariants}
        className="bg-white/2 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-2xl relative z-10 hover:border-white/6 transition-all duration-300"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
            <MapPin size={16} className="text-primary/70" />
            Address Details
          </h3>


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
      </motion.div>

      {/* ================= KYC ================= */}
      <motion.div
        variants={itemVariants}
        className="bg-white/2 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-2xl relative z-10 hover:border-white/6 transition-all duration-300"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
            <FileText size={16} className="text-primary/70" />
            KYC Details
          </h3>


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
      </motion.div>

      {/* ================= FINAL SUBMIT ================= */}
      {canEdit && (
        <motion.div variants={itemVariants} className="flex justify-end">
          <Button
            variant="ghost"
            onClick={handleSubmit}
            loading={loadingStates.submit}
            disabled={
              existing.business?.verificationStatus === "REQUEST_CHANGES" &&
              !hasMadeAnyUpdate && !localChanged.business && !localChanged.address && !localChanged.kyc
            }
          >
            Final Submit
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
