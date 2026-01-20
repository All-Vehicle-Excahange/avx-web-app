"use client";

import React, { useEffect, useState } from "react";
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
} from "@/services/consult.service";

import toast, { Toaster } from "react-hot-toast";
import { showBackendError } from "@/lib/axiosInstance";
import Step4Verification from "./components/Step4Verification";

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

  const [showPreview, setShowPreview] = useState(false);

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  useEffect(() => {
    const check = async () => {
      try {
        let bData = null;
        let aData = null;
        let kData = null;

        // ----- STEP 1 -----
        try {
          const basic = await getBaiscDetails();
          if (basic?.data) {
            bData = basic.data;
          }
        } catch (err) {
          if (err?.response?.status !== 404) throw err;
        }

        // ----- STEP 2 -----
        try {
          const address = await getAddressDetails();
          if (address?.data) {
            aData = address.data;
          }
        } catch (err) {
          if (err?.response?.status !== 404) throw err;
        }

        // ----- STEP 3 -----
        try {
          const kyc = await getKycDocs();
          if (kyc?.data) {
            kData = kyc.data;
          }
        } catch (err) {
          if (err?.response?.status !== 404) throw err;
        }

        // Save to state
        setExisting({
          business: bData,
          address: aData,
          kyc: kData,
        });

        // ===================== STEP DECISION =====================

        // 🔥 PRIORITY 1 → IF VERIFICATION REQUESTED
        if (bData?.verificationStatus === "REQUESTED") {
          setStep(4);
          return;
        }

        // 🔥 PRIORITY 2 → ALL DATA COMPLETE
        if (bData && aData && kData) {
          setStep(4);
          return;
        }

        // 🔥 NORMAL FLOW
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
      } catch (e) {
        console.log("Real error", e);
        setStep(1);
      }
    };

    check();
  }, []);

  // ======================================================
  // NEXT HANDLER (CREATE / UPDATE)
  // ======================================================
  const handleNext = async () => {
    try {
      setLoading(true);

      // ===== STEP 1 =====
      if (step === 1) {
        if (existing.business) {
          if (!changed.business) {
            setStep(2);
            return;
          }

          const res = await updatebasicDetials(form.business);

          if (res.data) {
            toast.success("Details updated successfully");
            setStep(2);
          }
          return;
        }

        const res = await postbasicDetials(form.business);

        if (res.data) {
          toast.success("Details submitted successfully");
          setStep(2);
        }
        return;
      }

      // ===== STEP 2 =====
      if (step === 2) {
        if (existing.address) {
          if (!changed.address) {
            setStep(3);
            return;
          }

          const res = await updateAddressDetials(form.address);

          if (res.data) {
            toast.success("Address updated successfully");
            setStep(3);
          }
          return;
        }

        const res = await postAddressDetials(form.address);

        if (res.data) {
          toast.success("Address submitted successfully");
          setStep(3);
        }
        return;
      }

      // ===== STEP 3 =====
      if (step === 3) {
        if (existing.kyc) {
          if (!changed.kyc) {
            setStep(4);
            return;
          }

          const res = await updateKycDetials(form.kyc);

          if (res.data) {
            toast.success("KYC updated successfully");
            setStep(4);
          }
          return;
        }

        const res = await postKycDetials(form.kyc);

        if (res.data) {
          toast.success("KYC submitted successfully");
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

  return (
    <>
      <Toaster position="top-right" />

      <section className="w-full text-primary">
        <div className="bg-third/10 border rounded-2xl border-third/30 w-3xl mx-auto py-6">
          <div className="w-2xl mx-auto">
            {/* ===== PROGRESS BAR ===== */}
            <div className="mb-12">
              <div className="relative flex items-center justify-between">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-third/40" />
                <div
                  className="absolute top-1/2 left-0 h-0.5 bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />

                {steps.map((num) => (
                  <div
                    key={num}
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                    ${
                      step >= num
                        ? "bg-primary text-secondary border border-primary"
                        : "bg-secondary border border-third text-third"
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>

            {/* ===== STEPS ===== */}

            {step === 1 && (
              <Step1Business
                initialData={existing.business}
                onChange={(data, isChanged) => {
                  setForm((p) => ({ ...p, business: data }));
                  setChanged((p) => ({ ...p, business: isChanged }));
                }}
              />
            )}

            {step === 2 && (
              <Step2Address
                initialData={existing.address}
                onChange={(data, isChanged) => {
                  setForm((p) => ({ ...p, address: data }));
                  setChanged((p) => ({ ...p, address: isChanged }));
                }}
              />
            )}

            {step === 3 && (
              <Step3KYC
                initialData={existing.kyc}
                onChange={(data, isChanged) => {
                  setForm((p) => ({ ...p, kyc: data }));
                  setChanged((p) => ({ ...p, kyc: isChanged }));
                }}
              />
            )}

            {/* ===== STEP 4 LOGIC ===== */}
            {step === 4 && !showPreview && (
              <Step4Verification
                existing={existing}
                onEdit={() => setShowPreview(true)}
              />
            )}

            {step === 4 && showPreview && (
              <PreviewAndEdite
                existing={existing}
                onBack={() => setShowPreview(false)}
              />
            )}

            {/* ===== ACTIONS ===== */}
            {step < 4 && (
              <div className="flex justify-between mt-12">
                {step > 1 && (
                  <Button
                    variant="ghost"
                    showIcon={false}
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}

                <Button
                  variant="ghost"
                  showIcon={false}
                  onClick={handleNext}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Next"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
