"use client";

import Image from "next/image";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/inputField";
import {
  createUserMeta,
  updateuserProfile,
  updateuserProfileMeta,
  getAllTown,
  deleteUserProfile,
} from "@/services/user.service";
import {
  ChevronDown,
  Lock,
  Clock,
  CheckCircle2,
  AlertCircle,
  Ban,
  User,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  MapPin,
  Map,
  SquarePen,
  Plus,
  CreditCard,
  Fingerprint,
  Briefcase,
  Trash2,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ProfileSkeleton } from "@/components/ui/skeleton";
import DetailsFromPopup from "../userSeller/DetailsFromPopup";
import DeleteProfilePopup from "./DeleteProfilePopup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CustomSelect from "@/components/ui/custom-select";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  getUserProfileQuery,
  checkIsMetaExistQuery,
  getUserProfileMetaQuery,
  getUserSellerSuspendQuery,
  getBecameSellerQuery,
  getStatesQuery,
  getCitiesQuery,
} from "@/queries/user.queries";

function MyProfile() {
  const queryClient = useQueryClient();

  const invalidateAllUserQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    queryClient.invalidateQueries({ queryKey: ["user-profile-meta"] });
    queryClient.invalidateQueries({ queryKey: ["user-profile-strength"] });
    queryClient.invalidateQueries({ queryKey: ["user-meta-exists"] });
    queryClient.invalidateQueries({ queryKey: ["user-became-seller"] });
    queryClient.invalidateQueries({ queryKey: ["user-seller-suspend"] });
    queryClient.invalidateQueries({ queryKey: ["user-wishlist-infinite"] });
    queryClient.invalidateQueries({ queryKey: ["user-followed-consultants-infinite"] });
    queryClient.invalidateQueries({ queryKey: ["user-preferences"] });
    queryClient.invalidateQueries({ queryKey: ["my-inquiries-infinite"] });
    queryClient.invalidateQueries({ queryKey: ["inquiries-infinite"] });
    queryClient.invalidateQueries({ queryKey: ["seller-inventory-infinite"] });
    queryClient.invalidateQueries({ queryKey: ["seller-suspended-vehicles-infinite"] });
    queryClient.invalidateQueries({ queryKey: ["all-requested-inspection-infinite"] });
    queryClient.invalidateQueries({ queryKey: ["all-inspection-request-infinite"] });
  };

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingMeta, setIsEditingMeta] = useState(false);
  const [isCreatingMeta, setIsCreatingMeta] = useState(false);
  const [isSellerPopupOpen, setIsSellerPopupOpen] = useState(false);
  const [isSellerPopupViewOnly, setIsSellerPopupViewOnly] = useState(false);
  const [isDeleteProfileOpen, setIsDeleteProfileOpen] = useState(false);
  const [isDeletingProfile, setIsDeletingProfile] = useState(false);

  const [profileForm, setProfileForm] = useState({});
  const [metaForm, setMetaForm] = useState({});
  const [towns, setTowns] = useState([]);

  const [profileErrors, setProfileErrors] = useState({});
  const [metaErrors, setMetaErrors] = useState({});

  const [genderOpen, setGenderOpen] = useState(false);

  const genderRef = useRef(null);

  // TanStack Queries
  const { data: profileRes, isLoading: isLoadingProfile } = useQuery(
    getUserProfileQuery(),
  );
  const { data: metaExistsRes, isLoading: isLoadingMetaExists } = useQuery(
    checkIsMetaExistQuery(),
  );

  const metaExists =
    metaExistsRes?.data?.exists || metaExistsRes?.data === true;

  const { data: metaRes, isLoading: isLoadingMeta } = useQuery({
    ...getUserProfileMetaQuery(),
    enabled: !!metaExists,
  });

  const { data: suspendRes, isLoading: isLoadingSuspend } = useQuery(
    getUserSellerSuspendQuery(),
  );
  const userRole = profileRes?.data?.userRole;
  const isSellerOrApplicant = userRole === "USER_SELLER" || userRole === "USER_SELLER_APPLICANT";

  const { data: sellerRes, isLoading: isLoadingSeller } = useQuery({
    ...getBecameSellerQuery(),
    enabled: !!userRole && isSellerOrApplicant,
  });
  const { data: statesRes, isLoading: isLoadingStates } =
    useQuery(getStatesQuery());

  const { data: citiesRes, isLoading: isLoadingCities } = useQuery({
    ...getCitiesQuery(metaForm.stateId),
    enabled: !!metaForm.stateId,
  });

  const isLoading =
    isLoadingProfile ||
    isLoadingMetaExists ||
    (metaExists && isLoadingMeta) ||
    isLoadingSuspend ||
    isLoadingSeller ||
    isLoadingStates;

  // Derived values / Computed states
  const profile = React.useMemo(() => {
    if (!profileRes?.data) return {};
    return {
      firstName: profileRes.data.firstname,
      lastName: profileRes.data.lastname,
      email: profileRes.data.email,
      phoneNumber: profileRes.data.phoneNumber,
      countryCode: profileRes.data.countryCode,
      role: profileRes.data.userRole,
    };
  }, [profileRes]);

  const profileMetaData = React.useMemo(() => {
    return metaRes?.data || {};
  }, [metaRes]);

  const states = React.useMemo(() => {
    return (
      statesRes?.data?.map((s) => ({
        label: s.name,
        value: s.id,
      })) || []
    );
  }, [statesRes]);

  const cities = React.useMemo(() => {
    return (
      citiesRes?.data?.map((c) => ({
        label: c.name,
        value: c.id,
      })) || []
    );
  }, [citiesRes]);

  const suspendData = suspendRes?.data || null;
  const sellerData = sellerRes?.data || null;
  const isMetaExist = metaExists;

  // Sync user role to localStorage
  useEffect(() => {
    if (profileRes?.data) {
      const apiRole = profileRes.data.userRole;
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser.userRole !== apiRole) {
          const updatedUser = { ...parsedUser, userRole: apiRole };
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      }
    }
  }, [profileRes]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (genderRef.current && !genderRef.current.contains(e.target))
        setGenderOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch Towns when City changes
  useEffect(() => {
    const fetchTowns = async () => {
      if (!metaForm.cityId) {
        setTowns([]);
        return;
      }
      try {
        const res = await getAllTown(metaForm.cityId);
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
  }, [metaForm.cityId]);

  const formatRole = (role) => {
    switch (role) {
      case "USER":
        return "User";
      case "USER_SELLER_APPLICANT":
        return "User (Applied for Seller)";
      case "USER_SELLER":
        return "Seller";
      case "CONSULTANT_APPLICANT":
        return "User (Applied for Consultant)";
      case "CONSULTATION":
        return "Consultant";
      default:
        return "Unknown";
    }
  };

  const handleEditProfile = () => {
    setProfileForm(profile);
    setProfileErrors({});
    setIsEditingProfile(true);
    setIsEditingMeta(false);
  };

  const handleEditMeta = () => {
    setMetaForm({
      ...profileMetaData,
      stateId: profileMetaData.state?.id || profileMetaData.stateId,
      cityId: profileMetaData.city?.id || profileMetaData.cityId,
      townId: profileMetaData.town?.id || profileMetaData.townId,
      stateName: profileMetaData.state?.name || profileMetaData.stateName,
      cityName: profileMetaData.city?.name || profileMetaData.cityName,
      townName: profileMetaData.town?.name || profileMetaData.townName,
    });

    setMetaErrors({});
    setIsEditingMeta(true);
    setIsCreatingMeta(false);
    setIsEditingProfile(false);
  };

  const handleCreateMeta = () => {
    setMetaForm({
      age: "",
      gender: "",
      profession: "",
      address: "",
      stateId: null,
      cityId: null,
      townId: null,
      stateName: "",
      cityName: "",
      townName: "",
    });

    setMetaErrors({});
    setIsCreatingMeta(true);
    setIsEditingMeta(false);
    setIsEditingProfile(false);
  };

  const isProfileFormValid =
    profileForm.firstName?.trim() &&
    profileForm.lastName?.trim() &&
    profileForm.email?.trim();

  const isMetaFormValid = !!(
    metaForm.age ||
    metaForm.gender?.trim() ||
    metaForm.profession?.trim() ||
    metaForm.address?.trim() ||
    metaForm.stateId ||
    metaForm.cityId ||
    metaForm.townId
  );

  const handleDeleteProfile = async (reason) => {
    if (!reason.trim()) return;
    try {
      setIsDeletingProfile(true);
      await deleteUserProfile(reason.trim());
      setIsDeleteProfileOpen(false);

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to delete profile:", error);
    } finally {
      setIsDeletingProfile(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setProfileErrors({});
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(profileForm.firstName || "")) {
        setProfileErrors((prev) => ({ ...prev, firstName: "Cannot contain digits (0-9) or special characters (@, #, %, &, etc.)" }));
        return;
      }
      if (!nameRegex.test(profileForm.lastName || "")) {
        setProfileErrors((prev) => ({ ...prev, lastName: "Cannot contain digits (0-9) or special characters (@, #, %, &, etc.)" }));
        return;
      }

      const payload = {
        firstname: profileForm.firstName,
        lastname: profileForm.lastName,
        email: profileForm.email,
      };

      await updateuserProfile(payload);

      const storedUser = useAuthStore.getState().user || {};
      const updatedUser = {
        ...storedUser,
        firstname: profileForm.firstName,
        lastname: profileForm.lastName,
        email: profileForm.email,
      };
      useAuthStore.setState({ user: updatedUser });
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      invalidateAllUserQueries();

      setIsEditingProfile(false);
    } catch (error) {
      let errorsMap = {};
      if (error?.response?.data) {
        const api = error.response.data;
        if (api.data?.validationErrors) {
          errorsMap = api.data.validationErrors;
        } else if (api.validationErrors) {
          errorsMap = api.validationErrors;
        } else if (api.errors) {
          errorsMap = api.errors;
        } else if (Array.isArray(api.message)) {
          api.message.forEach((msg) => {
            const lowMsg = msg.toLowerCase();
            if (lowMsg.includes("first")) errorsMap.firstName = msg;
            else if (lowMsg.includes("last")) errorsMap.lastName = msg;
            else if (lowMsg.includes("email")) errorsMap.email = msg;
            else errorsMap.general = msg;
          });
        } else {
          errorsMap.general = api.message || "Something went wrong";
        }
      } else {
        errorsMap.general = error?.message || "Something went wrong";
      }

      setProfileErrors(errorsMap);
    }
  };

  const handleSaveMeta = async () => {
    try {
      setMetaErrors({});

      if (metaForm.profession && /[0-9]/.test(metaForm.profession)) {
        setMetaErrors({ profession: "Profession cannot contain numbers." });
        return;
      }

      const payload = {};

      const addIfChanged = (key, newValue, oldValue) => {
        if (newValue !== oldValue && newValue !== undefined) {
          payload[key] = newValue;
        }
      };

      // Number comparison for age
      const newAge = metaForm.age ? Number(metaForm.age) : null;
      const oldAge = profileMetaData.age ? Number(profileMetaData.age) : null;
      if (newAge !== oldAge) {
        payload.age = newAge;
      }

      addIfChanged("gender", metaForm.gender, profileMetaData.gender);
      addIfChanged("profession", metaForm.profession, profileMetaData.profession);
      addIfChanged("address", metaForm.address, profileMetaData.address);
      addIfChanged("cityId", metaForm.cityId, profileMetaData.city?.id || profileMetaData.cityId);
      addIfChanged("stateId", metaForm.stateId, profileMetaData.state?.id || profileMetaData.stateId);
      addIfChanged("townId", metaForm.townId, profileMetaData.town?.id || profileMetaData.townId);

      const newCountryId = metaForm.country?.id || 101;
      const oldCountryId = profileMetaData.country?.id || 101;
      if (newCountryId !== oldCountryId) {
        payload.countryId = newCountryId;
      }

      const newLat = metaForm.latitude || 22.2587;
      const oldLat = profileMetaData.latitude || 22.2587;
      if (newLat !== oldLat) {
        payload.latitude = newLat;
      }

      const newLong = metaForm.longitude || 71.1924;
      const oldLong = profileMetaData.longitude || 71.1924;
      if (newLong !== oldLong) {
        payload.longitude = newLong;
      }

      // If nothing has changed, just close editing without API call
      if (Object.keys(payload).length === 0) {
        setIsEditingMeta(false);
        setIsCreatingMeta(false);
        return;
      }

      // Call create or update based on isCreatingMeta
      if (isCreatingMeta) {
        await createUserMeta(payload);
      } else {
        await updateuserProfileMeta(payload);
      }
      invalidateAllUserQueries();

      setIsEditingMeta(false);
      setIsCreatingMeta(false);
    } catch (error) {
      let errorsMap = {};
      if (error?.response?.data) {
        const api = error.response.data;
        if (api.data?.validationErrors) {
          errorsMap = api.data.validationErrors;
        } else if (api.validationErrors) {
          errorsMap = api.validationErrors;
        } else if (api.errors) {
          errorsMap = api.errors;
        } else if (Array.isArray(api.message)) {
          api.message.forEach((msg) => {
            const lowMsg = msg.toLowerCase();
            if (lowMsg.includes("profession")) errorsMap.profession = msg;
            else if (lowMsg.includes("address")) errorsMap.address = msg;
            else if (lowMsg.includes("age")) errorsMap.age = msg;
            else if (lowMsg.includes("gender")) errorsMap.gender = msg;
            else if (lowMsg.includes("state")) errorsMap.stateId = msg;
            else if (lowMsg.includes("city")) errorsMap.cityId = msg;
            else if (lowMsg.includes("town")) errorsMap.townId = msg;
            else errorsMap.general = msg;
          });
        } else {
          errorsMap.general = api.message || "Meta save failed";
        }
      } else {
        errorsMap.general = error?.message || "Meta save failed";
      }

      setMetaErrors(errorsMap);
    }
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <ProfileSkeleton />
      </div>
    );
  }

  return (
    <section className="w-full py-12 rounded-2xl  space-y-10">
      {/* SUSPENSION STATUS BOARD */}
      {suspendData?.isSuspended && (
        <div className="mx-auto max-w-2xl mb-12">
          <div className="bg-red-800/10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-third/20 overflow-hidden relative">
            <div className="p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left border-b border-third/10 pb-8">
                <div className="w-16 h-16 shrink-0 bg-transparent rounded-full flex items-center justify-center border border-primary/40 shadow-sm">
                  <Ban className="w-8 h-8 text-red-500" />
                </div>

                <div className="space-y-3 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-primary tracking-tight">
                      Account Restricted
                    </h2>
                    <p className="text-sm text-third mt-1">
                      Your access to the Reecomm platform has been temporarily
                      or permanently limited.
                    </p>
                  </div>
                  <div className="inline-flex px-4 py-1.5 bg-transparent border border-primary/40 rounded-full text-[11px] font-bold text-primary/70 tracking-widest shadow-sm">
                    {(
                      suspendData.consultSuspenseType ||
                      suspendData.suspendType ||
                      "TEMPORARY"
                    ).toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {(suspendData.reason || suspendData.suspendReason) && (
                  <div className="bg-third/5 rounded-2xl border border-third/10 p-5 md:p-6 transition hover:bg-third/10">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <h3 className="text-sm font-bold text-primary">
                        Reason for Enforcement
                      </h3>
                    </div>
                    <p className="text-sm text-third leading-relaxed">
                      {suspendData.reason || suspendData.suspendReason}
                    </p>
                  </div>
                )}

                {suspendData.adminRemark && (
                  <div className="bg-third/5 rounded-2xl border border-third/10 p-5 md:p-6 transition hover:bg-third/10">
                    <h3 className="text-[11px] font-bold text-third uppercase tracking-wider mb-2">
                      Admin Remark
                    </h3>
                    <p className="text-sm text-primary font-medium italic">
                      &quot;{suspendData.adminRemark}&quot;
                    </p>
                  </div>
                )}

                {(suspendData.suspendUntil || suspendData.expiryDate) &&
                  (suspendData.consultSuspenseType ||
                    suspendData.suspendType) !== "PERMANENT" && (
                    <div className="flex items-center gap-4 bg-orange-50 rounded-2xl border border-orange-100 p-5 md:p-6 shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-orange-500 uppercase tracking-wider">
                          Restoration Date
                        </p>
                        <p className="text-sm text-orange-900 mt-0.5">
                          Suspension expires on{" "}
                          <span className="font-bold">
                            {new Date(
                              suspendData.suspendUntil ||
                              suspendData.expiryDate,
                            ).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
              </div>

              <div className="mt-8 pt-6 border-t border-third/10">
                <p className="text-[13px] text-third text-center sm:text-left leading-relaxed">
                  If you believe this enforcement is an error or wish to appeal
                  the decision, please contact our support team at{" "}
                  <a
                    href="mailto:info@reecomm.com"
                    className="text-primary font-bold hover:underline ml-1"
                  >
                    info@reecomm.com
                  </a>

                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* APPLICATION STATUS BOARD */}
      {sellerData &&
        !suspendData?.isSuspended &&
        sellerData.verificationStatus !== "VERIFIED" && (
          <div className="mx-auto max-w-2xl space-y-6 mb-10">
            {/* Admin Remark Box for REQUEST_CHANGES or REJECTED */}
            {(sellerData.verificationStatus === "REQUEST_CHANGES" ||
              sellerData.verificationStatus === "REJECTED") && (
                <div
                  className={`rounded-2xl p-6 space-y-4 shadow-sm
              ${sellerData.verificationStatus === "REQUEST_CHANGES"
                      ? "bg-amber-500/5 border border-amber-500/20"
                      : "bg-red-500/5 border border-red-500/20"
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                  ${sellerData.verificationStatus === "REQUEST_CHANGES"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-red-500/10 text-red-500"
                        }`}
                    >
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg tracking-tight text-primary">
                        {sellerData.verificationStatus === "REQUEST_CHANGES"
                          ? "Updates Needed"
                          : "Reason for Rejection"}
                      </h3>
                      <p className="text-third text-xs leading-relaxed">
                        {sellerData.verificationStatus === "REQUEST_CHANGES"
                          ? "The Reecomm verification team has requested some changes to your application."
                          : "Your application was not approved for the following reason:"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-xl border border-primary/5 p-4 mx-0 md:ml-13">
                    <p className="text-sm font-medium leading-relaxed text-primary">
                      <span className="font-bold">Remark:</span>{" "}
                      {sellerData.adminRemark || "No specific remark provided."}
                    </p>
                  </div>

                  {sellerData.verificationStatus === "REQUEST_CHANGES" && (
                    <div className="flex justify-end pt-2">
                      <Button
                        onClick={() => {
                          setIsSellerPopupViewOnly(false);
                          setIsSellerPopupOpen(true);
                        }}
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                      >
                        Edit & Re-submit
                      </Button>
                    </div>
                  )}

                  {sellerData.verificationStatus === "REJECTED" && (
                    <div className="flex justify-end pt-2">
                      <Button
                        onClick={() => {
                          setIsSellerPopupViewOnly(true);
                          setIsSellerPopupOpen(true);
                        }}
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                      >
                        View Application
                      </Button>
                    </div>
                  )}
                </div>
              )}

            {/* Header & Main Status */}
            <div className="border border-primary/30 rounded-2xl overflow-hidden bg-primary/5">
              <div className="p-5 md:p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center
                  ${sellerData.verificationStatus === "REQUEST_CHANGES"
                        ? "bg-amber-500/10 text-amber-500"
                        : sellerData.verificationStatus === "REJECTED"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-primary/10 text-primary"
                      }`}
                  >
                    {sellerData.verificationStatus === "REJECTED" ? (
                      <AlertCircle className="w-6 h-6" />
                    ) : (
                      <Clock className="w-6 h-6" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <h2 className="text-xl font-bold text-primary tracking-tight">
                      {sellerData.verificationStatus === "REQUEST_CHANGES"
                        ? "Action Required"
                        : sellerData.verificationStatus === "REJECTED"
                          ? "Application Rejected"
                          : "Seller Application Status"}
                    </h2>
                    <p className="text-xs text-third">
                      {sellerData.verificationStatus === "REQUEST_CHANGES"
                        ? "We found some issues with your submission."
                        : sellerData.verificationStatus === "REJECTED"
                          ? "We regret to inform you that your application was not approved."
                          : "Your request is currently being processed by our team"}
                    </p>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-4">
                  {[
                    {
                      id: "reg",
                      label: "Account Registration",
                      status: "Completed",
                      info: "Done",
                      isDone: true,
                    },
                    {
                      id: "doc",
                      label: "Document Submission",
                      status: "Completed",
                      info: "PAN & Aadhaar Received",
                      isDone: true,
                    },
                    {
                      id: "rev",
                      label: "Reecomm Admin Review",
                      status:
                        sellerData.verificationStatus === "REQUEST_CHANGES"
                          ? "Request Changes"
                          : sellerData.verificationStatus === "REJECTED"
                            ? "Rejected"
                            : "In Progress",
                      info:
                        sellerData.verificationStatus === "REQUEST_CHANGES"
                          ? "Fix issues"
                          : sellerData.verificationStatus === "REJECTED"
                            ? "Verification failed"
                            : "Verifying documents...",
                      isWarning:
                        sellerData.verificationStatus === "REQUESTED" ||
                        sellerData.verificationStatus === "REQUEST_CHANGES",
                      isError: sellerData.verificationStatus === "REJECTED",
                    },
                  ].map((step, index, arr) => (
                    <div
                      key={step.id}
                      className="relative flex items-start group"
                    >
                      {index !== arr.length - 1 && (
                        <div className="absolute left-[17px] top-9 w-[1.5px] h-full bg-primary/10 transition-colors" />
                      )}

                      <div className="flex items-center justify-between w-full pb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform relative z-10
                          ${step.isDone
                                ? "bg-green-500/20 text-green-500"
                                : step.isWarning
                                  ? "bg-amber-500/20 text-amber-500"
                                  : step.isError
                                    ? "bg-red-500/20 text-red-500"
                                    : "bg-primary/20 text-primary"
                              }`}
                          >
                            {step.isDone ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : step.isWarning || step.isError ? (
                              <AlertCircle className="w-5 h-5" />
                            ) : (
                              <Clock className="w-5 h-5" />
                            )}
                          </div>
                          <span className="font-semibold text-sm text-primary/90">
                            {step.label}
                          </span>
                        </div>

                        <div className="flex flex-col items-end">
                          <span
                            className={`text-xs font-bold
                          ${step.isDone
                                ? "text-green-500"
                                : step.isWarning
                                  ? "text-yellow-500"
                                  : step.isError
                                    ? "text-red-500"
                                    : "text-primary"
                              }`}
                          >
                            {step.status}
                          </span>
                          <span className="text-[10px] text-third/40 font-medium">
                            {step.info}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                {sellerData.verificationStatus !== "REJECTED" && (
                  <div className="pt-6 border-t border-third/10 flex items-center justify-between text-sm flex-wrap gap-4">
                    <div className="flex flex-col">
                      <span className="text-third font-medium tracking-tight text-xs">
                        Estimated Review Time
                      </span>
                      <span className="text-primary font-black uppercase text-lg mt-0.5">
                        24 – 48 Hours
                      </span>
                    </div>

                    {sellerData.verificationStatus === "REQUESTED" && (
                      <Button
                        onClick={() => {
                          setIsSellerPopupViewOnly(true);
                          setIsSellerPopupOpen(true);
                        }}
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                      >
                        View Application
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-6">
        {/*  PROFILE INFO SECTION */}
        <div className="bg-third/5 rounded-3xl border border-white/10 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.37)] text-white/60 transition-all duration-300 relative group overflow-hidden">

          <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10">
                <User size={20} />
              </div>
              <h2 className="text-xl font-bold text-primary tracking-tight">Profile Info</h2>
            </div>

            {!isEditingProfile && profile.role !== "USER_SELLER_APPLICANT" && (
              <div className="flex items-center gap-2">
                <button onClick={handleEditProfile} className="text-third hover:text-white transition-colors p-2 rounded-full hover:bg-white/5 cursor-pointer" title="Edit Profile">
                  <SquarePen size={18} />
                </button>
                <button onClick={() => setIsDeleteProfileOpen(true)} className="text-red-500/80 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-500/10 cursor-pointer" title="Delete Profile">
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>

          {!isEditingProfile && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <ProfileItem label="First Name" value={profile.firstName} icon={User} />
              <ProfileItem label="Last Name" value={profile.lastName} icon={User} />
              <ProfileItem label="Email" value={profile.email} icon={Mail} />
              <ProfileItem
                label="Phone"
                value={
                  profile.phoneNumber
                    ? `${profile.countryCode || "+91"} ${profile.phoneNumber}`
                    : null
                }
                icon={Phone}
              />
              <ProfileItem label="Role" value={formatRole(profile.role)} icon={ShieldCheck} className="sm:col-span-2" />
            </div>
          )}

          {isEditingProfile && (
            <>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <InputField
                      label="First Name"
                      variant="colored"
                      value={profileForm.firstName || ""}
                      onChange={(e) => {
                        const cleaned = e.target.value.replace(/[^A-Za-z\s]/g, "");
                        setProfileForm({
                          ...profileForm,
                          firstName: cleaned,
                        });
                        if (profileErrors.firstName) {
                          setProfileErrors((prev) => ({ ...prev, firstName: "" }));
                        }
                      }}
                    />
                    {profileErrors.firstName && (
                      <p className="text-red-500 text-xs mt-1 ml-1">{profileErrors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <InputField
                      label="Last Name"
                      variant="colored"
                      value={profileForm.lastName || ""}
                      onChange={(e) => {
                        const cleaned = e.target.value.replace(/[^A-Za-z\s]/g, "");
                        setProfileForm({
                          ...profileForm,
                          lastName: cleaned,
                        });
                        if (profileErrors.lastName) {
                          setProfileErrors((prev) => ({ ...prev, lastName: "" }));
                        }
                      }}
                    />
                    {profileErrors.lastName && (
                      <p className="text-red-500 text-xs mt-1 ml-1">{profileErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <InputField
                    label="Email"
                    variant="colored"
                    value={profileForm.email || ""}
                    onChange={(e) => {
                      setProfileForm({
                        ...profileForm,
                        email: e.target.value,
                      });
                      if (profileErrors.email) {
                        setProfileErrors((prev) => ({ ...prev, email: "" }));
                      }
                    }}
                  />
                  {profileErrors.email && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{profileErrors.email}</p>
                  )}
                </div>
              </div>

              {profileErrors.general && (
                <p className="text-red-500 text-sm mt-4">{profileErrors.general}</p>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  size="sm"
                  variant="outlineSecondary"
                  className="!text-sm font-normal"
                  onClick={() => {
                    setIsEditingProfile(false);
                    setProfileErrors({});
                  }}
                >
                  Cancel
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  className="!text-sm font-normal"
                  disabled={!isProfileFormValid}
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </Button>
              </div>
            </>
          )}
        </div>

        {/* ✅ PROFILE META SECTION */}
        <div className="relative overflow-visible bg-third/5 rounded-3xl border border-white/10 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.37)] text-white/60 transition-all duration-300 group">

          <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10">
                <MapPin size={20} />
              </div>
              <h2 className="text-xl font-bold text-primary tracking-tight">Profile Meta</h2>
            </div>

            {!isEditingMeta &&
              !isCreatingMeta &&
              profile.role !== "USER_SELLER_APPLICANT" && (
                <button
                  onClick={isMetaExist ? handleEditMeta : handleCreateMeta}
                  className="text-third hover:text-white transition-colors p-2 rounded-full hover:bg-white/5 cursor-pointer"
                  title={isMetaExist ? "Edit Meta" : "Create Meta"}
                >
                  {isMetaExist ? <SquarePen size={18} /> : <Plus size={18} />}
                </button>
              )}
          </div>

          {/* Meta View */}
          {!isEditingMeta && !isCreatingMeta && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <ProfileItem label="Age" value={profileMetaData.age} icon={Calendar} />
              <ProfileItem label="Gender" value={profileMetaData.gender} icon={User} />
              <ProfileItem label="Profession" value={profileMetaData.profession} icon={Briefcase} />
              <ProfileItem label="City" value={profileMetaData.city?.name} icon={MapPin} />
              <ProfileItem label="State" value={profileMetaData.state?.name} icon={Map} />
              <ProfileItem label="Town" value={profileMetaData.town?.name} icon={MapPin} />
              <ProfileItem label="Address" value={profileMetaData.address} icon={MapPin} className="sm:col-span-2" />
            </div>
          )}

          {/* Meta Edit/Create Form */}
          {(isEditingMeta || isCreatingMeta) && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputField
                    label="Age"
                    variant="colored"
                    value={metaForm.age || ""}
                    onChange={(e) => {
                      setMetaForm({ ...metaForm, age: e.target.value });
                      if (metaErrors.age) {
                        setMetaErrors((prev) => ({ ...prev, age: "" }));
                      }
                    }}
                  />
                  {metaErrors.age && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{metaErrors.age}</p>
                  )}
                </div>

                {/* ✅ GENDER DROPDOWN */}
                <div ref={genderRef} className="relative">
                  <label className="text-xs text-third mb-1.5 block">Gender</label>

                  <div
                    onClick={() => setGenderOpen(!genderOpen)}
                    className="h-10 px-3 flex items-center justify-between rounded-lg border border-primary/20 bg-transparent text-primary hover:border-primary/40 cursor-pointer transition-all duration-200"
                  >
                    <span>{metaForm.gender || "Select Gender"}</span>
                    <ChevronDown size={16} className={`text-third transition-transform duration-200 ${genderOpen ? "rotate-180" : ""}`} />
                  </div>

                  {genderOpen && (
                    <div className="absolute z-50 mt-1 w-full border border-primary/20 rounded-lg bg-[#1a1a1a] text-primary shadow-2xl overflow-hidden backdrop-blur-md">
                      {["MALE", "FEMALE"].map((genderOption) => (
                        <div
                          key={genderOption}
                          onClick={() => {
                            setMetaForm((prev) => ({
                              ...prev,
                              gender: genderOption,
                            }));
                            setGenderOpen(false);
                            if (metaErrors.gender) {
                              setMetaErrors((prev) => ({ ...prev, gender: "" }));
                            }
                          }}
                          className="px-3 py-2.5 hover:bg-white/10 cursor-pointer text-sm font-medium transition-colors"
                        >
                          {genderOption}
                        </div>
                      ))}
                    </div>
                  )}
                  {metaErrors.gender && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{metaErrors.gender}</p>
                  )}
                </div>

                <div>
                  <InputField
                    label="Profession"
                    variant="colored"
                    value={metaForm.profession || ""}
                    onChange={(e) => {
                      const cleanVal = e.target.value.replace(/[0-9]/g, "");
                      setMetaForm({ ...metaForm, profession: cleanVal });
                      if (metaErrors.profession) {
                        setMetaErrors((prev) => ({ ...prev, profession: "" }));
                      }
                    }}
                  />
                  {metaErrors.profession && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{metaErrors.profession}</p>
                  )}
                </div>

                <div>
                  <InputField
                    label="Address"
                    variant="colored"
                    value={metaForm.address || ""}
                    onChange={(e) => {
                      setMetaForm({ ...metaForm, address: e.target.value });
                      if (metaErrors.address) {
                        setMetaErrors((prev) => ({ ...prev, address: "" }));
                      }
                    }}
                  />
                  {metaErrors.address && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{metaErrors.address}</p>
                  )}
                </div>

                {/* ✅ STATE DROPDOWN */}
                <div>
                  <label className="text-xs text-third mb-1.5 block">State</label>
                  <CustomSelect
                    value={metaForm.stateId}
                    options={states}
                    placeholder="Search state..."
                    variant="colored"
                    onChange={(val) => {
                      const s = states.find((st) => st.value === val);
                      setMetaForm((p) => ({
                        ...p,
                        stateId: val,
                        stateName: s ? s.label : "",
                        cityId: null,
                        cityName: "",
                        townId: null,
                        townName: "",
                      }));
                      if (metaErrors.stateId) {
                        setMetaErrors((prev) => ({ ...prev, stateId: "", cityId: "", townId: "" }));
                      }
                    }}
                  />
                  {metaErrors.stateId && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{metaErrors.stateId}</p>
                  )}
                </div>

                {/* ✅ CITY DROPDOWN */}
                <div>
                  <label className="text-xs text-third mb-1.5 block">City</label>
                  <CustomSelect
                    value={metaForm.cityId}
                    options={cities}
                    placeholder={
                      metaForm.stateId ? "Search city..." : "Select state first"
                    }
                    variant="colored"
                    disabled={!metaForm.stateId}
                    onChange={(val) => {
                      const c = cities.find((ct) => ct.value === val);
                      setMetaForm((p) => ({
                        ...p,
                        cityId: val,
                        cityName: c ? c.label : "",
                        townId: null,
                        townName: "",
                      }));
                      if (metaErrors.cityId) {
                        setMetaErrors((prev) => ({ ...prev, cityId: "", townId: "" }));
                      }
                    }}
                  />
                  {metaErrors.cityId && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{metaErrors.cityId}</p>
                  )}
                </div>

                {/* ✅ TOWN DROPDOWN */}
                <div>
                  <label className="text-xs text-third mb-1.5 block">Town</label>
                  <CustomSelect
                    value={metaForm.townId}
                    options={towns}
                    placeholder={
                      metaForm.cityId ? "Search town..." : "Select city first"
                    }
                    variant="colored"
                    disabled={!metaForm.cityId}
                    onChange={(val) => {
                      const t = towns.find((tn) => tn.value === val);
                      setMetaForm((p) => ({
                        ...p,
                        townId: val,
                        townName: t ? t.label : "",
                      }));
                      if (metaErrors.townId) {
                        setMetaErrors((prev) => ({ ...prev, townId: "" }));
                      }
                    }}
                  />
                  {metaErrors.townId && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{metaErrors.townId}</p>
                  )}
                </div>
              </div>

              {metaErrors.general && (
                <p className="text-red-500 text-sm mt-4">{metaErrors.general}</p>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  size="sm"
                  variant="outlineSecondary"
                  className="!text-sm font-normal"
                  onClick={() => {
                    setIsEditingMeta(false);
                    setIsCreatingMeta(false);
                    setMetaErrors({});
                  }}
                >
                  Cancel
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  className="!text-sm font-normal"
                  disabled={!isMetaFormValid}
                  onClick={handleSaveMeta}
                >
                  {isCreatingMeta ? "Complete Profile" : "Save Changes"}
                </Button>
              </div>
            </>
          )}
        </div>

        {sellerData && sellerData.verificationStatus === "VERIFIED" && (
          <div className="lg:col-span-2 bg-third/5 rounded-3xl border border-white/10 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.37)] text-white/60 transition-all duration-300 relative group overflow-hidden">
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10">
                  <ShieldCheck size={20} className="text-emerald-500" />
                </div>
                <h2 className="text-xl font-bold text-primary tracking-tight">Seller Verification Documents</h2>
              </div>
              <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold rounded-full">
                VERIFIED SELLER
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              {/* PAN Card Section */}
              {sellerData.panCardNumber && (
                <div className="space-y-4 border-r border-white/5 pr-0 md:pr-8">
                  <h3 className="font-bold text-primary text-base flex items-center gap-2">
                    <CreditCard size={18} className="text-third" />
                    PAN Card Details
                  </h3>
                  <div className="flex flex-col gap-1 py-2 px-1">
                    <span className="text-xs text-third font-medium capitalize tracking-wide">PAN Card Number</span>
                    <span className="font-semibold text-primary text-[15px] break-all">{sellerData.panCardNumber}</span>
                  </div>
                  {sellerData.panCardFrontUrl && (
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-third font-medium capitalize tracking-wide">PAN Front Photo</span>
                      <div className="relative w-full max-w-sm h-48 rounded-lg overflow-hidden bg-black/5 border border-white/5">
                        <Image
                          src={sellerData.panCardFrontUrl}
                          alt="PAN Card Front"
                          fill
                          className="object-contain p-2"
                          unoptimized
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Aadhaar Card Section */}
              {sellerData.aadharCardNumber && (
                <div className="space-y-4">
                  <h3 className="font-bold text-primary text-base flex items-center gap-2">
                    <Fingerprint size={18} className="text-third" />
                    Aadhaar Card Details
                  </h3>
                  <div className="flex flex-col gap-1 py-2 px-1">
                    <span className="text-xs text-third font-medium capitalize tracking-wide">Aadhaar Card Number</span>
                    <span className="font-semibold text-primary text-[15px] break-all">
                      {sellerData.aadharCardNumber.replace(/(\d{4})(?=\d)/g, "$1-")}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sellerData.aadharCardFrontUrl && (
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-third font-medium capitalize tracking-wide">Aadhaar Front Photo</span>
                        <div className="relative w-full h-36 rounded-lg overflow-hidden bg-black/5 border border-white/5">
                          <Image
                            src={sellerData.aadharCardFrontUrl}
                            alt="Aadhaar Front"
                            fill
                            className="object-contain p-2"
                            unoptimized
                          />
                        </div>
                      </div>
                    )}
                    {sellerData.aadharCardBackUrl && (
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-third font-medium capitalize tracking-wide">Aadhaar Back Photo</span>
                        <div className="relative w-full h-36 rounded-lg overflow-hidden bg-black/5 border border-white/5">
                          <Image
                            src={sellerData.aadharCardBackUrl}
                            alt="Aadhaar Back"
                            fill
                            className="object-contain p-2"
                            unoptimized
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <DetailsFromPopup
        isOpen={isSellerPopupOpen}
        onClose={() => {
          setIsSellerPopupOpen(false);
          setIsSellerPopupViewOnly(false);
          invalidateAllUserQueries();
        }}
        existing={sellerData}
        viewOnly={isSellerPopupViewOnly}
      />
      {/* Delete Profile Popup */}
      <DeleteProfilePopup
        isOpen={isDeleteProfileOpen}
        onClose={() => setIsDeleteProfileOpen(false)}
        onSubmit={handleDeleteProfile}
        loading={isDeletingProfile}
      />
    </section>
  );
}

export default MyProfile;

function ProfileItem({ label, value, icon: Icon, className = "" }) {
  return (
    <div className={`flex items-center gap-4 py-2 px-1 ${className}`}>
      {Icon && (
        <Icon size={20} className="text-white shrink-0" />
      )}
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-third font-medium capitalize tracking-wide">{label}</span>
        <span className="font-semibold text-primary text-[15px] break-all">{value || "—"}</span>
      </div>
    </div>
  );
}