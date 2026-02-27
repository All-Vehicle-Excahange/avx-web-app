"use client";

import Button from "@/components/ui/button";
import InputField from "@/components/ui/inputField";
import {
  checkIsMetaExist,
  createUserMeta,
  getCities,
  getState,
  getuserProfile,
  getuserProfileMeta,
  updateuserProfile,
  updateuserProfileMeta,
} from "@/services/user.service";
import { ChevronDown, Lock } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

function MyProfile() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingMeta, setIsEditingMeta] = useState(false);
  const [isMetaExist, setIsMetaExist] = useState(false);
  const [isCreatingMeta, setIsCreatingMeta] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        console.log("Meta Exists Response:", metaExistsRes);
        const metaExists = metaExistsRes.data?.exists || metaExistsRes.data === true;
        console.log("Meta Exists:", metaExists);
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

  return (
    <section className="w-full py-12 rounded-2xl  space-y-10">
      {/* ✅ PROFILE INFO SECTION */}
      <div className="rounded-2xl border border-third/40 px-6 pb-6">
        <div className="flex justify-between py-6">
          <h2 className="text-lg font-semibold">Profile Info</h2>

          {!isEditingProfile && (
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
                      : "bg-primary text-white hover:opacity-90"
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

          {!isEditingMeta && !isCreatingMeta && (
            <Button
              variant="ghost"
              onClick={isMetaExist ? handleEditMeta : handleCreateMeta}
            >
              {isMetaExist ? "Edit" : "Create"}
            </Button>
          )}
        </div>

        {/* Meta View */}
        {!isEditingMeta && !isCreatingMeta && isMetaExist && (
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
                                setMetaForm((prev) => ({ ...prev, gender: genderOption }));
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

                <div
                  onClick={() => setStateOpen(!stateOpen)}
                  className="h-10 px-3 flex items-center justify-between rounded-md border border-primary bg-secondary text-primary cursor-pointer"
                >
                  <span>{metaForm.stateName || "Select State"}</span>
                  <ChevronDown size={16} />
                </div>

                {stateOpen && (
                  <div className="absolute z-9999 mt-1 w-full border border-primary rounded-md bg-secondary text-primary shadow-lg max-h-40 overflow-y-auto">
                    {states.map((s) => (
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
                        }}
                        className="px-3 py-2 hover:bg-primary/20 cursor-pointer"
                      >
                        {s.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ✅ CITY DROPDOWN */}
              <div ref={cityRef} className="relative">
                <label className="text-xs text-third">City</label>

                <div
                  onClick={() => metaForm.stateId && setCityOpen(!cityOpen)}
                  className={`h-10 px-3 flex items-center justify-between rounded-md border border-primary bg-secondary text-primary ${
                    !metaForm.stateId
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <span>
                    {metaForm.cityName ||
                      (metaForm.stateId ? "Select City" : "Select state first")}
                  </span>
                  <ChevronDown size={16} />
                </div>

                {cityOpen && (
                  <div className="absolute z-9999 mt-1 w-full border border-primary rounded-md bg-secondary text-primary shadow-lg max-h-40 overflow-y-auto">
                    {cities.map((c) => (
                      <div
                        key={c.value}
                        onClick={() => {
                          setMetaForm((p) => ({
                            ...p,
                            cityId: c.value,
                            cityName: c.label,
                          }));
                          setCityOpen(false);
                        }}
                        className="px-3 py-2 hover:bg-primary/20 cursor-pointer"
                      >
                        {c.label}
                      </div>
                    ))}
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
    </section>
  );
}

export default MyProfile;

function ProfileItem({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-third">{label}</span>
      <span className="font-medium">{value || "--"}</span>
    </div>
  );
}
