"use client";

import Button from "@/components/ui/button";
import InputField from "@/components/ui/inputField";
import {
  checkIsMetaExist,
  createUserMeta,
  getBecameSeller,
  getCities,
  getState,
  getuserProfile,
  getuserProfileMeta,
  getUserSellerSuspend,
  updateuserProfile,
  updateuserProfileMeta,
} from "@/services/user.service";
import {
  ChevronDown,
  Lock,
  Clock,
  CheckCircle2,
  AlertCircle,
  Ban,
} from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { ProfileSkeleton } from "@/components/ui/skeleton";
import DetailsFromPopup from "../userSeller/DetailsFromPopup";

function MyProfile() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingMeta, setIsEditingMeta] = useState(false);
  const [isMetaExist, setIsMetaExist] = useState(false);
  const [isCreatingMeta, setIsCreatingMeta] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sellerData, setSellerData] = useState(null);
  const [suspendData, setSuspendData] = useState(null);
  const [isSellerPopupOpen, setIsSellerPopupOpen] = useState(false);

  const [profile, setProfile] = useState({});
  const [profileForm, setProfileForm] = useState({});

  const [profileMetaData, setProfileMetaData] = useState({});
  const [metaForm, setMetaForm] = useState({});

  const [profileError, setProfileError] = useState("");
  const [metaError, setMetaError] = useState("");

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);

  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const genderRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (stateRef.current && !stateRef.current.contains(e.target))
        setStateOpen(false);
      if (cityRef.current && !cityRef.current.contains(e.target))
        setCityOpen(false);
      // Add this gender check
      if (genderRef.current && !genderRef.current.contains(e.target))
        setGenderOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Check if meta exists
        const metaExistsRes = await checkIsMetaExist();
        const metaExists =
          metaExistsRes.data?.exists || metaExistsRes.data === true;
        setIsMetaExist(metaExists);

        // Load profile
        const profileRes = await getuserProfile();
        const userData = {
          firstName: profileRes.data.firstname,
          lastName: profileRes.data.lastname,
          email: profileRes.data.email,
          phoneNumber: profileRes.data.phoneNumber,
          countryCode: profileRes.data.countryCode,
          role: profileRes.data.userRole,
        };
        setProfile(userData);
        setProfileForm(userData);

        //  Sync localStorage role with the latest role from API
        const apiRole = profileRes.data.userRole;
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          if (parsedUser.userRole !== apiRole) {
            const updatedUser = { ...parsedUser, userRole: apiRole };
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }
        }

        // Load meta only if exists
        if (metaExists) {
          const metaRes = await getuserProfileMeta();
          console.log("Meta Data:", metaRes.data);
          setProfileMetaData(metaRes.data);

          setMetaForm({
            ...metaRes.data,
            stateId: metaRes.data.state?.id,
            cityId: metaRes.data.city?.id,
            stateName: metaRes.data.state?.name,
            cityName: metaRes.data.city?.name,
          });
        } else {
          // Initialize empty form for creation
          setMetaForm({
            age: "",
            gender: "",
            profession: "",
            address: "",
            stateId: null,
            cityId: null,
            stateName: "",
            cityName: "",
          });
        }
        // Check suspension status
        const suspendRes = await getUserSellerSuspend();
        if (suspendRes.success) {
          setSuspendData(suspendRes.data);
        }
      } catch (error) {
        console.log("Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      const res = await getState();
      setStates(
        res.data.map((s) => ({
          label: s.name,
          value: s.id,
        })),
      );
    };
    fetchStates();
  }, []);

  const fetchSellerStatus = useCallback(async () => {
    try {
      const res = await getBecameSeller();
      if (res.success) {
        setSellerData(res.data);
      }
    } catch (error) {
      console.error("Fetch Seller Status Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchSellerStatus();
  }, [fetchSellerStatus]);

  useEffect(() => {
    const fetchCities = async () => {
      if (!metaForm.stateId) return;
      const res = await getCities(metaForm.stateId);

      setCities(
        res.data.map((c) => ({
          label: c.name,
          value: c.id,
        })),
      );
    };
    fetchCities();
  }, [metaForm.stateId]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (stateRef.current && !stateRef.current.contains(e.target))
        setStateOpen(false);
      if (cityRef.current && !cityRef.current.contains(e.target))
        setCityOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    setProfileError("");
    setIsEditingProfile(true);
    setIsEditingMeta(false);
  };

  const handleEditMeta = () => {
    setMetaForm({
      ...profileMetaData,
      stateId: profileMetaData.state?.id,
      cityId: profileMetaData.city?.id,
      stateName: profileMetaData.state?.name,
      cityName: profileMetaData.city?.name,
    });

    setMetaError("");
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
      stateName: "",
      cityName: "",
    });

    setMetaError("");
    setIsCreatingMeta(true);
    setIsEditingMeta(false);
    setIsEditingProfile(false);
  };

  const isProfileFormValid =
    profileForm.firstName?.trim() &&
    profileForm.lastName?.trim() &&
    profileForm.email?.trim();

  const isMetaFormValid =
    metaForm.age &&
    metaForm.gender?.trim() &&
    metaForm.profession?.trim() &&
    metaForm.address?.trim() &&
    metaForm.stateId &&
    metaForm.cityId;

  const handleSaveProfile = async () => {
    try {
      setProfileError("");

      const payload = {
        firstname: profileForm.firstName,
        lastname: profileForm.lastName,
        email: profileForm.email,
      };

      await updateuserProfile(payload);

      setProfile(profileForm);
      setIsEditingProfile(false);
    } catch (error) {
      setProfileError(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleSaveMeta = async () => {
    try {
      setMetaError("");

      const payload = {
        age: Number(metaForm.age),
        gender: metaForm.gender,
        profession: metaForm.profession,
        address: metaForm.address,
        cityId: metaForm.cityId,
        stateId: metaForm.stateId,
        countryId: metaForm.country?.id || 101,
        latitude: metaForm.latitude || 12.12,
        longitude: metaForm.longitude || 12.12,
      };

      // Call create or update based on isCreatingMeta
      if (isCreatingMeta) {
        await createUserMeta(payload);
        setIsMetaExist(true);
      } else {
        await updateuserProfileMeta(payload);
      }

      const metaRes = await getuserProfileMeta();
      setProfileMetaData(metaRes.data);

      setMetaForm({
        ...metaRes.data,
        stateId: metaRes.data.state?.id,
        cityId: metaRes.data.city?.id,
        stateName: metaRes.data.state?.name,
        cityName: metaRes.data.city?.name,
      });

      setIsEditingMeta(false);
      setIsCreatingMeta(false);
    } catch (error) {
      const message = error?.response?.data?.message || "Meta save failed";

      setMetaError(message);
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
                      Your access to the AVX platform has been temporarily or
                      permanently limited.
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
                    href="mailto:support@avx.com"
                    className="text-primary font-bold hover:underline ml-1"
                  >
                    support@avx.com
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
              ${
                sellerData.verificationStatus === "REQUEST_CHANGES"
                  ? "bg-amber-500/5 border border-amber-500/20"
                  : "bg-red-500/5 border border-red-500/20"
              }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                  ${
                    sellerData.verificationStatus === "REQUEST_CHANGES"
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
                        ? "The AVX verification team has requested some changes to your application."
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
                      onClick={() => setIsSellerPopupOpen(true)}
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                    >
                      Edit & Re-submit
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
                  ${
                    sellerData.verificationStatus === "REQUEST_CHANGES"
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
                      label: "AVX Admin Review",
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
                          ${
                            step.isDone
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
                          ${
                            step.isDone
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
                  <div className="pt-6 border-t border-third/10 flex items-center justify-between text-sm">
                    <span className="text-third font-medium tracking-tight">
                      Estimated Review Time
                    </span>
                    <span className="text-primary font-black uppercase text-lg">
                      24 – 48 Hours
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      {/*  PROFILE INFO SECTION */}
      <div className="rounded-2xl border border-third/40 px-6 pb-6">
        <div className="flex justify-between py-6">
          <h2 className="text-lg font-semibold">Profile Info</h2>

          {!isEditingProfile && profile.role !== "USER_SELLER_APPLICANT" && (
            <Button variant="ghost" onClick={handleEditProfile}>
              Edit
            </Button>
          )}
        </div>

        {!isEditingProfile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <ProfileItem label="First Name" value={profile.firstName} />
            <ProfileItem label="Last Name" value={profile.lastName} />
            <ProfileItem label="Email" value={profile.email} />
            <ProfileItem
              label="Phone"
              value={profile.countryCode + " " + profile.phoneNumber}
            />
            <ProfileItem label="Role" value={formatRole(profile.role)} />
          </div>
        )}

        {isEditingProfile && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="First Name"
                variant="colored"
                value={profileForm.firstName || ""}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    firstName: e.target.value,
                  })
                }
              />

              <InputField
                label="Last Name"
                variant="colored"
                value={profileForm.lastName || ""}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    lastName: e.target.value,
                  })
                }
              />

              <InputField
                label="Email"
                variant="colored"
                value={profileForm.email || ""}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    email: e.target.value,
                  })
                }
              />
            </div>

            {profileError && (
              <p className="text-red-500 text-sm mt-4">{profileError}</p>
            )}

            <div className="flex justify-end gap-4 mt-8">
              <Button
                variant="outlineSecondary"
                onClick={() => setIsEditingProfile(false)}
              >
                Cancel
              </Button>

              <button
                disabled={!isProfileFormValid}
                onClick={handleSaveProfile}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl font-medium transition
                  ${
                    !isProfileFormValid
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-primary text-secondary hover:opacity-90"
                  }`}
              >
                {!isProfileFormValid ? (
                  <>
                    <Lock size={16} />
                    Locked
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* ✅ PROFILE META SECTION */}
      <div className="relative overflow-visible rounded-2xl border border-third/40 px-6 pb-6">
        <div className="flex justify-between py-6">
          <h2 className="text-lg font-semibold">Profile Meta</h2>

          {!isEditingMeta &&
            !isCreatingMeta &&
            profile.role !== "USER_SELLER_APPLICANT" && (
              <Button
                variant="ghost"
                onClick={isMetaExist ? handleEditMeta : handleCreateMeta}
              >
                {isMetaExist ? "Edit" : "Create"}
              </Button>
            )}
        </div>

        {/* Meta View */}
        {!isEditingMeta && !isCreatingMeta && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <ProfileItem label="Age" value={profileMetaData.age} />
            <ProfileItem label="Gender" value={profileMetaData.gender} />
            <ProfileItem label="City" value={profileMetaData.city?.name} />
            <ProfileItem label="State" value={profileMetaData.state?.name} />
            <ProfileItem label="Address" value={profileMetaData.address} />
          </div>
        )}

        {/* Meta Edit/Create Form */}
        {(isEditingMeta || isCreatingMeta) && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Age"
                variant="colored"
                value={metaForm.age || ""}
                onChange={(e) =>
                  setMetaForm({ ...metaForm, age: e.target.value })
                }
              />

              {/* ✅ GENDER DROPDOWN */}
              <div ref={genderRef} className="relative">
                <label className="text-xs text-third">Gender</label>

                <div
                  onClick={() => setGenderOpen(!genderOpen)}
                  className="h-10 px-3 flex items-center justify-between rounded-md border border-primary bg-secondary text-primary cursor-pointer"
                >
                  <span>{metaForm.gender || "Select Gender"}</span>
                  <ChevronDown size={16} />
                </div>

                {genderOpen && (
                  <div className="absolute z-9999 mt-1 w-full border border-primary rounded-md bg-secondary text-primary shadow-lg overflow-hidden">
                    {["MALE", "FEMALE"].map((genderOption) => (
                      <div
                        key={genderOption}
                        onClick={() => {
                          setMetaForm((prev) => ({
                            ...prev,
                            gender: genderOption,
                          }));
                          setGenderOpen(false);
                        }}
                        className="px-3 py-2 hover:bg-primary/20 cursor-pointer"
                      >
                        {genderOption}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <InputField
                label="Profession"
                variant="colored"
                value={metaForm.profession || ""}
                onChange={(e) =>
                  setMetaForm({ ...metaForm, profession: e.target.value })
                }
              />

              <InputField
                label="Address"
                variant="colored"
                value={metaForm.address || ""}
                onChange={(e) =>
                  setMetaForm({ ...metaForm, address: e.target.value })
                }
              />

              {/* ✅ STATE DROPDOWN */}
              <div ref={stateRef} className="relative">
                <label className="text-xs text-third">State</label>

                <div className="h-10 px-3 flex items-center justify-between rounded-md border border-primary bg-secondary text-primary cursor-pointer relative">
                  {stateOpen ? (
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search state..."
                      value={stateSearch}
                      onChange={(e) => setStateSearch(e.target.value)}
                      className="w-full bg-transparent outline-none h-full text-sm placeholder:text-primary/40"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span
                      onClick={() => {
                        setStateOpen(true);
                        setCityOpen(false);
                        setGenderOpen(false);
                      }}
                      className="flex-1 h-full flex items-center"
                    >
                      {metaForm.stateName || "Select State"}
                    </span>
                  )}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${stateOpen ? "rotate-180" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setStateOpen(!stateOpen);
                    }}
                  />
                </div>

                {stateOpen && (
                  <div className="absolute z-9999 mt-1 w-full border border-primary rounded-md bg-secondary text-primary shadow-lg shadow-black/20 overflow-hidden flex flex-col">
                    <div className="max-h-40 overflow-y-auto custom-scrollbar">
                      {states
                        .filter((s) =>
                          s.label
                            .toLowerCase()
                            .includes(stateSearch.toLowerCase()),
                        )
                        .map((s) => (
                          <div
                            key={s.value}
                            onClick={() => {
                              setMetaForm((p) => ({
                                ...p,
                                stateId: s.value,
                                stateName: s.label,
                                cityId: null,
                                cityName: "",
                              }));
                              setStateOpen(false);
                              setStateSearch("");
                            }}
                            className="px-3 py-2 hover:bg-primary/20 cursor-pointer text-sm"
                          >
                            {s.label}
                          </div>
                        ))}
                      {states.filter((s) =>
                        s.label
                          .toLowerCase()
                          .includes(stateSearch.toLowerCase()),
                      ).length === 0 && (
                        <div className="px-3 py-4 text-center text-xs text-third italic border-t border-primary/10">
                          No states found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ✅ CITY DROPDOWN */}
              <div ref={cityRef} className="relative">
                <label className="text-xs text-third">City</label>

                <div
                  className={`h-10 px-3 flex items-center justify-between rounded-md border border-primary bg-secondary text-primary ${
                    !metaForm.stateId
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {cityOpen ? (
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search city..."
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      className="w-full bg-transparent outline-none h-full text-sm placeholder:text-primary/40"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span
                      onClick={() => {
                        if (metaForm.stateId) {
                          setCityOpen(true);
                          setStateOpen(false);
                          setGenderOpen(false);
                        }
                      }}
                      className="flex-1 h-full flex items-center"
                    >
                      {metaForm.cityName ||
                        (metaForm.stateId
                          ? "Select City"
                          : "Select state first")}
                    </span>
                  )}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${cityOpen ? "rotate-180" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (metaForm.stateId) setCityOpen(!cityOpen);
                    }}
                  />
                </div>

                {cityOpen && (
                  <div className="absolute z-9999 mt-1 w-full border border-primary rounded-md bg-secondary text-primary shadow-lg shadow-black/20 overflow-hidden flex flex-col">
                    <div className="max-h-40 overflow-y-auto custom-scrollbar">
                      {cities
                        .filter((c) =>
                          c.label
                            .toLowerCase()
                            .includes(citySearch.toLowerCase()),
                        )
                        .map((c) => (
                          <div
                            key={c.value}
                            onClick={() => {
                              setMetaForm((p) => ({
                                ...p,
                                cityId: c.value,
                                cityName: c.label,
                              }));
                              setCityOpen(false);
                              setCitySearch("");
                            }}
                            className="px-3 py-2 hover:bg-primary/20 cursor-pointer text-sm"
                          >
                            {c.label}
                          </div>
                        ))}
                      {cities.filter((c) =>
                        c.label
                          .toLowerCase()
                          .includes(citySearch.toLowerCase()),
                      ).length === 0 && (
                        <div className="px-3 py-4 text-center text-xs text-third italic border-t border-primary/10">
                          No cities found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {metaError && (
              <p className="text-red-500 text-sm mt-4">{metaError}</p>
            )}

            <div className="flex justify-end gap-4 mt-8">
              <Button
                variant="outlineSecondary"
                onClick={() => {
                  setIsEditingMeta(false);
                  setIsCreatingMeta(false);
                }}
              >
                Cancel
              </Button>

              <button
                disabled={!isMetaFormValid}
                onClick={handleSaveMeta}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl font-medium transition-all
    ${
      !isMetaFormValid
        ? "bg-gray-400 cursor-not-allowed text-secondary"
        : "bg-primary text-secondary hover:opacity-90"
    }`}
              >
                {!isMetaFormValid ? (
                  <>
                    <Lock size={16} />
                    Locked
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </>
        )}
      </div>
      <DetailsFromPopup
        isOpen={isSellerPopupOpen}
        onClose={() => {
          setIsSellerPopupOpen(false);
          fetchSellerStatus();
        }}
        existing={sellerData}
      />
    </section>
  );
}

export default MyProfile;

function ProfileItem({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-third">{label}</span>
      <span className="font-medium">{value || "N/A"}</span>
    </div>
  );
}
