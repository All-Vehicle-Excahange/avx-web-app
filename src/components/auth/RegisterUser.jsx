"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import CustomSelect from "@/components/ui/custom-select";
import { Camera } from "lucide-react";
import NavbarDark from "@/components/layout/NavbarDark";
import InputField from "../ui/inputField";

export default function RegisterUser() {
  const [gender, setGender] = useState("");

  const ref = useRef(null);
  const text = "Log in to continue your seamless car-selling  experience.";

  useEffect(() => {
    if (!ref.current) return;

    // keep for accessibility (screen readers)
    ref.current.setAttribute("aria-label", text);

    ref.current.innerHTML = ""; // clear

    text.split("").forEach((char, i) => {
      const span = document.createElement("span");

      // preserve visible space using non-breaking space
      if (char === " ") {
        span.textContent = "\u00A0";
      } else {
        span.textContent = char;
      }

      // animation delay for stagger
      span.style.animationDelay = `${i * 0.04}s`;

      // optional: add a classname if you want to tweak per-letter styles
      span.className = "animated-letter";

      ref.current.appendChild(span);
    });
  }, [text]);

  return (
    <div className="relative w-full min-h-screen font-sans bg-secondary flex flex-col">
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.jpg"
          alt="Background"
          fill
          className="object-cover blur-md opacity-40"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* NAVBAR */}
      <div className="relative z-10">
        <NavbarDark />
      </div>

      <div className="relative mt-12 z-10 flex items-center justify-center flex-1 px-4 py-10">
        {/* CARD */}
        <div
          className="
          w-full max-w-[1000px] 
          bg-primary rounded-2xl shadow-2xl overflow-hidden
          grid grid-cols-1 lg:grid-cols-2
        "
        >
          {/* LEFT SECTION */}
          <div className="relative hidden lg:block h-[650px]">
            <Image
              src="/left-side.jpg"
              alt="Car"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-62 left-10 right-10">
              <p
                ref={ref}
                className="text-white text-3xl font-semibold leading-snug drop-shadow-lg animated-letters"
              >
                Log in to continue your seamless car-selling experience.
              </p>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="w-full bg-primary-white flex items-center">
            <div className="w-full px-8 py-8 md:px-10 max-w-lg mx-auto">
              {/* PROFILE IMAGE */}
              <div className="flex justify-center mb-2">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-third overflow-hidden shadow-md">
                    <Image
                      src="/user.png"
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <button
                    className="
                    absolute bottom-0 right-0 bg-black text-white p-2 rounded-full 
                    border-2 border-white hover:bg-gray-800 transition
                  "
                  >
                    <Camera size={16} />
                  </button>
                </div>
              </div>

              {/* FORM FIELDS */}
              <div className="flex flex-col gap-2">
                {/* Name */}
                <InputField
                  label="Name"
                  required
                  placeholder="Enter your name"
                />

                {/* Mobile */}
                <div>
                  <label className="text-sm font-semibold text-text-black mb-1.5 ml-1">
                    Mobile number<span className="text-red-500">*</span>
                  </label>

                  <div
                    className="
                    w-full h-11 flex items-center 
                    border border-third/30 rounded-lg bg-white 
                    overflow-hidden transition-all
                    focus-within:border-third focus-within:ring-1 focus-within:ring-third
                  "
                  >
                    <span className="px-4 font-medium text-text-black bg-gray-100 border-r">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="123 456 7890"
                      className="w-full h-full px-3 outline-none bg-transparent text-text-black placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Address */}
                <InputField label="Address" placeholder="Enter full address" />

                {/* Email */}
                <InputField
                  label="Email"
                  required
                  placeholder="name@gmail.com"
                  type="email"
                />

                {/* Gender + DOB */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-text-black mb-1.5 ml-1">
                      Gender
                    </label>
                    <CustomSelect
                      variant="default"
                      value={gender}
                      onChange={setGender}
                      options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                      ]}
                    />
                  </div>

                  <InputField label="DOB" type="date" />
                </div>

                {/* BUTTONS */}
                <div className="mt-4 space-y-3">
                  <Button size="md" full showIcon={false}>
                    Save Profile
                  </Button>

                  <Button variant="outlineSecondary" full showIcon={false}>
                    Log out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
