"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Button from "@/components/ui/button";
import CustomSelect from "@/components/ui/custom-select";
import { useForm } from "react-hook-form";
import { X, User, Loader2 } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStatesQuery, getCitiesQuery } from "@/queries/user.queries";
import { createUserMeta, getAllTown } from "@/services/user.service";
import { showBackendError } from "@/lib/axiosInstance";

export default function CompleteProfilePopup({ isOpen, onClose, onSuccess = () => {} }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      age: "",
      gender: "",
      profession: "",
      stateId: "",
      cityId: "",
      townId: "",
      address: "",
    }
  });

  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const ageValue = watch("age");
  const stateIdValue = watch("stateId");
  const cityIdValue = watch("cityId");
  const genderValue = watch("gender");
  const townIdValue = watch("townId");

  const [towns, setTowns] = useState([]);

  const { data: statesRes } = useQuery(getStatesQuery());
  const states = statesRes?.data?.map(s => ({ label: s.name, value: s.id })) || [];

  const { data: citiesRes } = useQuery({
    ...getCitiesQuery(stateIdValue),
    enabled: !!stateIdValue,
  });
  const cities = citiesRes?.data?.map(c => ({ label: c.name, value: c.id })) || [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchTowns = async () => {
      if (!cityIdValue) {
        setTowns([]);
        return;
      }
      try {
        const res = await getAllTown(cityIdValue);
        const options = (res.data || []).map((t) => ({
          label: t.name,
          value: t.id,
        }));
        setTowns(options);
      } catch (err) {
        console.error("Error fetching towns:", err);
      }
    };
    fetchTowns();
  }, [cityIdValue]);

  if (!isOpen && !isClosing) return null;

  const handleClosePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      reset();
      onClose();
    }, 250);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      
      const payload = {
        age: Number(data.age),
        gender: data.gender,
        profession: data.profession?.trim() ? data.profession : null,
        cityId: data.cityId,
        stateId: data.stateId,
        countryId: 101, // Default to India
        address: data.address?.trim() ? data.address : null,
        latitude: 22.2587,
        longitude: 71.1924,
      };

      if (data.townId && String(data.townId).trim() !== "") {
        payload.townId = Number(data.townId);
      } else {
        payload.townId = null;
      }

      try {
        await createUserMeta(payload);
        
        // Refresh user profile meta
        queryClient.invalidateQueries({ queryKey: ["user-meta-exists"] });
        queryClient.invalidateQueries({ queryKey: ["user-profile-meta"] });
        queryClient.invalidateQueries({ queryKey: ["user-profile-strength"] });

        onSuccess();
        handleClosePopup();
      } catch (err) {
        console.error("Error creating user meta:", err);
        showBackendError(err);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };



  const modalContent = (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={handleClosePopup} style={{ animation: isClosing ? 'modalBackdropOut 0.25s ease-in forwards' : 'modalBackdropIn 0.25s ease-out' }}>
      <div className="relative flex w-full max-w-[900px] overflow-hidden rounded-2xl shadow-2xl bg-primary-white" onClick={(e) => e.stopPropagation()} style={{ animation: isClosing ? 'modalCardOut 0.25s ease-in forwards' : 'modalCardIn 0.3s ease-out' }}>

        <button
          onClick={handleClosePopup}
          className="absolute bg-white cursor-pointer top-4 right-4 z-20 p-1 rounded-full hover:opacity-70 text-secondary"
        >
          <X size={20} />
        </button>

        {/* LEFT IMAGE */}
        <div className="hidden md:block w-5/12 relative bg-black">
          <div className="relative w-full h-full">
            <Image
              src="/auth-image-1.webp"
              priority
              alt="Buyer"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/80" />
            
            <div className="absolute bottom-12 right-8 z-10 flex flex-col items-end text-right">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-10 h-10 bg-fourth rounded-full flex items-center justify-center">
                  <User className="text-white" size={20} />
                </div>
                <h3 className="text-2xl font-bold text-white">Buyer</h3>
              </div>
              <p className="text-white/90 text-[13px] max-w-[180px] mb-3 leading-snug">
                Find the right vehicle with confidence.
              </p>
              <div className="w-8 h-[3px] bg-fourth rounded-full"></div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-7/12 bg-secondary flex flex-col max-h-[90vh]">
          
          {/* Header - Sticky */}
          <div className="p-8 pb-4 md:p-12 md:pb-6 flex-shrink-0">
            <h3 className="text-2xl font-bold mb-2 text-primary">
              Complete Profile
            </h3>
            <p className="text-sm text-primary/70">
              Help us personalize your experience.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
            
            {/* Scrollable Fields Container */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-8 md:px-12 pb-4 flex flex-col gap-4">
              
              {/* Age & Gender Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Age */}
              <div>
                <label className="block text-sm mb-1 text-primary/80">Age *</label>
                <input
                  type="text"
                  placeholder="e.g. 24"
                  {...register("age", { 
                    required: "Age is required",
                    pattern: { value: /^[0-9]+$/, message: "Please enter a valid age" },
                    maxLength: { value: 3, message: "Invalid age" }
                  })}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                  className="w-full text-primary py-[13px] px-4 border rounded-md border-white/20 bg-transparent outline-none focus:border-white/60 transition-colors"
                />
                {errors.age && (
                  <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm mb-1 text-primary/80">Gender *</label>
                <CustomSelect
                  value={genderValue}
                  onChange={(val) => setValue("gender", val, { shouldValidate: true })}
                  options={[
                    { label: "Male", value: "MALE" },
                    { label: "Female", value: "FEMALE" }
                  ]}
                  placeholder="Select Gender"
                  variant="transparent"
                  className="!bg-transparent !border-white/20 !text-primary !h-[50px]"
                />
                <input
                  type="hidden"
                  {...register("gender", { required: "Gender is required" })}
                />
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
                )}
              </div>
            </div>

            {/* Profession */}
            <div>
              <label className="block text-sm mb-1 text-primary/80">Profession (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Developer"
                {...register("profession")}
                className="w-full text-primary py-[13px] px-4 border rounded-md border-white/20 bg-transparent outline-none focus:border-white/60 transition-colors"
              />
            </div>

            {/* State & City Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-primary/80">State *</label>
                <CustomSelect
                  value={stateIdValue}
                  onChange={(val) => {
                    setValue("stateId", val, { shouldValidate: true });
                    setValue("cityId", ""); // Reset city when state changes
                    setValue("townId", ""); // Reset town when state changes
                  }}
                  options={states}
                  placeholder="Select State"
                  variant="transparent"
                  className="!bg-transparent !border-white/20 !text-primary !h-[50px]"
                />
                <input
                  type="hidden"
                  {...register("stateId", { required: "State is required" })}
                />
                {errors.stateId && (
                  <p className="text-red-500 text-xs mt-1">{errors.stateId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1 text-primary/80">City *</label>
                <CustomSelect
                  value={cityIdValue}
                  onChange={(val) => {
                    setValue("cityId", val, { shouldValidate: true });
                    setValue("townId", ""); // Reset town when city changes
                  }}
                  options={cities}
                  placeholder="Select City"
                  variant="transparent"
                  className="!bg-transparent !border-white/20 !text-primary !h-[50px]"
                  disabled={!stateIdValue || cities.length === 0}
                />
                <input
                  type="hidden"
                  {...register("cityId", { required: "City is required" })}
                />
                {errors.cityId && (
                  <p className="text-red-500 text-xs mt-1">{errors.cityId.message}</p>
                )}
              </div>
            </div>

            {/* Town */}
            <div>
              <label className="block text-sm mb-1 text-primary/80">Town (Optional)</label>
              <CustomSelect
                value={townIdValue}
                onChange={(val) => setValue("townId", val)}
                options={towns}
                placeholder="Select Town"
                variant="transparent"
                className="!bg-transparent !border-white/20 !text-primary !h-[50px]"
                disabled={!cityIdValue || towns.length === 0}
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm mb-1 text-primary/80">Address (Optional)</label>
              <textarea
                placeholder="Enter your address"
                rows={2}
                {...register("address")}
                className="w-full text-primary py-3 px-4 border rounded-md border-white/20 bg-transparent outline-none focus:border-white/60 transition-colors resize-none"
              />
            </div>

            </div>

            {/* ACTION BUTTONS - Sticky Footer */}
            <div className="p-4 md:p-6 flex gap-4 flex-shrink-0">
              <Button
                type="submit"
                variant="ghost"
                locked={isLoading}
                className="w-full h-11 text-sm font-bold flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  "Continue"
                )}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
