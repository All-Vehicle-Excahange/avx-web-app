"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import InputField from "@/components/ui/inputField";
import ChipGroup from "@/components/ui/chipGroup";
import { Camera } from "lucide-react";

export default function Step1Business() {
  const logoRef = useRef();
  const [logo, setLogo] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="relative">
          <div
            onClick={() => logoRef.current.click()}
            className="relative w-32 h-32 rounded-full border-4 border-primary/60 bg-primary/10 overflow-hidden cursor-pointer flex items-center justify-center"
          >
            {!logo ? (
              <span className="text-third text-xs text-center px-3">
                Upload Logo
              </span>
            ) : (
              <Image
                src={URL.createObjectURL(logo)}
                alt="Logo"
                fill
                className="object-cover"
                unoptimized
              />
            )}
          </div>

          {/* CAMERA ICON */}
          <div className="absolute bottom-1 right-1 bg-secondary p-2 rounded-full border border-secondary cursor-pointer">
            <Camera />
          </div>

          <input
            ref={logoRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setLogo(e.target.files[0])}
          />
        </div>
      </div>

      {/* OTHER FIELDS */}
      <InputField label="Consultation Name" variant="colored" />
      <InputField label="Owner Name" variant="colored" />
      <InputField label="Company Email" type="email" variant="colored" />
      <InputField label="Establishment Year" variant="colored" />

      <ChipGroup
        title="Vehicle Types"
        variant="outline"
        items={[
          { label: "Cars", value: "cars" },
          { label: "Bikes", value: "bikes" },
          { label: "SUV", value: "suv" },
          { label: "Trucks", value: "trucks" },
        ]}
      />

      <ChipGroup
        title="Services"
        variant="outline"
        items={[
          { label: "Buy", value: "buy" },
          { label: "Sell", value: "sell" },
          { label: "Exchange", value: "exchange" },
          { label: "Finance", value: "finance" },
          { label: "Other", value: "other" },
        ]}
      />
    </div>
  );
}
