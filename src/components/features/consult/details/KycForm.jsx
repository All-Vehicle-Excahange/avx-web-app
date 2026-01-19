"use client";

import React, { useState } from "react";
import Step1Business from "./components/Step1Business";
import Step2Address from "./components/Step2Address";
import Step3KYC from "./components/Step3KYC";
import Step4Verification from "./components/Step4Verification";
import Button from "@/components/ui/button";
import { postbasicDetials } from "@/services/consult.service";
import toast, { Toaster } from "react-hot-toast";
import { showBackendError } from "@/lib/axiosInstance";

const steps = [1, 2, 3, 4];

export default function KycForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    business: null,
    address: null,
    kyc: null,
  });
  const [loading, setLoading] = useState(false);

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  const handleNext = async () => {
    try {
      setLoading(true);

      if (step === 1) {
        try {
          const res = await postbasicDetials(form.business);
          if (res.data) {
            toast.success("Details submitted successfully");
            setStep(step + 1);
            return;
          }
        } catch (error) {
          showBackendError(error);
          return;
        }
      }

      if (step === 2) {
      }

      if (step === 3) {
      }

      setStep(step + 1);
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

            {step === 1 && (
              <Step1Business
                onChange={(data) => setForm((p) => ({ ...p, business: data }))}
              />
            )}

            {step === 2 && (
              <Step2Address
                onChange={(data) => setForm((p) => ({ ...p, address: data }))}
              />
            )}

            {step === 3 && (
              <Step3KYC
                onChange={(data) => setForm((p) => ({ ...p, kyc: data }))}
              />
            )}

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

              {step < 4 && (
                <Button
                  variant="ghost"
                  showIcon={false}
                  onClick={handleNext}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Next"}
                </Button>
              )}

              {step === 4 && (
                <Button variant="ghost" showIcon={false}>
                  Go to Dashboard
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
