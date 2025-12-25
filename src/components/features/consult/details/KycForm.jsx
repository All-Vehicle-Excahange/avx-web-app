"use client";

import React, { useState } from "react";
import Step1Business from "./components/Step1Business";
import Step2Address from "./components/Step2Address";
import Step3KYC from "./components/Step3KYC";
import Step4Verification from "./components/Step4Verification";
import Button from "@/components/ui/button";

const steps = [1, 2, 3, 4];

export default function KycForm() {
  const [step, setStep] = useState(1);

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <section className="w-full text-primary">
      <div className="bg-third/10 border rounded-2xl border-third/30 w-3xl mx-auto py-6">
        <div className="w-2xl mx-auto">
          {/* STEPPER */}
          <div className="mb-12">
            <div className="relative flex items-center justify-between">
              {/* BACK LINE */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-third/40" />

              {/* ACTIVE LINE */}
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />

              {/* STEPS */}
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

          {/* FORM BODY */}
          {step === 1 && <Step1Business />}
          {step === 2 && <Step2Address />}
          {step === 3 && <Step3KYC />}
          {step === 4 && <Step4Verification />}

          {/* CONTROLS */}
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
                onClick={() => setStep(step + 1)}
              >
                Next
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
  );
}
