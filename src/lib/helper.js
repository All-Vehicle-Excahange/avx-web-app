export const getSellerTierTitle = () => {
  try {
    const tier = localStorage.getItem("sellerTier");

    if (!tier) return null;

    return tier;
  } catch (error) {
    console.error("Error getting seller tier:", error);
    return null;
  }
};

export const formatResponseTime = (minutes) => {
  if (!minutes || minutes <= 0) return "0 min";

  const totalMinutes = Math.floor(minutes);

  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const mins = totalMinutes % 60;

  let result = [];

  if (days) result.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours) result.push(`${hours} hr`);
  if (mins) result.push(`${mins} min`);

  return result.join(" ");
};

export const getResponseStatus = (minutes) => {
  if (!minutes || minutes <= 0)
    return { label: "No Data", color: "text-gray-500" };

  if (minutes <= 15) {
    return { label: "Good", color: "text-green-600" };
  }

  if (minutes <= 120) {
    // 2 hours
    return { label: "Medium", color: "text-yellow-600" };
  }

  return { label: "Bad", color: "text-red-600" };
};

export const createSlug = (text = "") => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and") // replace &
    .replace(/[^\w\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces → -
    .replace(/--+/g, "-"); // remove multiple -
};

export const normalizeWhyBuyData = (raw = {}, defaults = {}) => {
  // Check if the API response has any real content beyond metadata
  const metaOnlyKeys = new Set([
    "id", "consultationId", "themePrimaryId", "themeId",
    "verificationStatus", "isSubmitted", "createdAt", "updatedAt",
    "featuredReviews",
  ]);
  const hasRealContent = raw && Object.entries(raw).some(
    ([key, value]) =>
      !metaOnlyKeys.has(key) &&
      value !== null &&
      value !== undefined &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0),
  );

  // Build empty shell from defaults (preserving array shapes but zeroing values)
  const getEmptyData = (defaultData) => {
    const empty = {};
    Object.entries(defaultData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        empty[key] = value.map((item) => {
          if (typeof item === "string") return "";
          const emptyItem = {};
          Object.keys(item).forEach((k) => (emptyItem[k] = ""));
          return emptyItem;
        });
      } else if (value !== null && typeof value === "object") {
        empty[key] = {};
      } else {
        empty[key] = "";
      }
    });
    return empty;
  };

  // Start from empty shell — never from dummy defaults
  const data = getEmptyData(defaults);

  if (!hasRealContent) return data;

  // Override with API data (filter out null/undefined)
  Object.entries(raw).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      data[key] = value;
    }
  });

  /* ================= HERO ================= */
  if (raw.heroTitle && !raw.whyBuyHeroTitle)
    data.whyBuyHeroTitle = raw.heroTitle;
  if (raw.heroDescription && !raw.whyBuyHeroDescription)
    data.whyBuyHeroDescription = raw.heroDescription;

  data.customWhyBuyHero1 =
    raw.customWhyBuyHero1 ||
    raw.customWhyBuyHeroUrl1 ||
    raw.customHeroImageUrl1;
  data.customWhyBuyHero2 = raw.customWhyBuyHero2 || raw.customWhyBuyHeroUrl2;
  data.customWhyBuyHero3 = raw.customWhyBuyHero3 || raw.customWhyBuyHeroUrl3;

  /* ================= STORY ================= */
  if (raw.aboutUsTitle && !raw.storyTitle) data.storyTitle = raw.aboutUsTitle;
  if (raw.aboutUsDescription && !raw.storyDescription)
    data.storyDescription = raw.aboutUsDescription;

  data.customWhyBuyStory1 = raw.customWhyBuyStory1 || raw.customStoryUrl1;
  data.customWhyBuyStory2 = raw.customWhyBuyStory2 || raw.customStoryUrl2;
  data.customWhyBuyStory3 = raw.customWhyBuyStory3 || raw.customStoryUrl3;

  // Map storyTemplate objects — already handled by the raw overlay above
  // (explicit re-assignment removed to prevent overwriting user edits)

  /* ================= VEHICLE ================= */
  data.customWhyBuyVehicleSelection1 =
    raw.customWhyBuyVehicleSelection1 || raw.customVehicleSelectionUrl1;
  data.customWhyBuyVehicleSelection2 =
    raw.customWhyBuyVehicleSelection2 || raw.customVehicleSelectionUrl2;

  // vehicleSelectionTemplate objects already handled by the raw overlay above

  /* ================= PROCESS ================= */
  if (raw.processes && Array.isArray(raw.processes) && !raw.processSteps?.length) {
    data.processSteps = raw.processes.map((p) => ({
      title: p.title || "",
      description: p.desc || p.description || "",
      icon: p.icon || "",
    }));
  }

  /* ================= INSPECTION ================= */
  // Map both inspectionText and inspectionDescription for compatibility
  if (raw.inspectionDescription) {
    data.inspectionText = raw.inspectionDescription;
    data.inspectionDescription = raw.inspectionDescription;
  }

  data.customWhyBuyInspection1 =
    raw.customWhyBuyInspection1 || raw.customInspectionUrl1;
  data.customWhyBuyInspection2 =
    raw.customWhyBuyInspection2 || raw.customInspectionUrl2;
  data.customWhyBuyInspection3 =
    raw.customWhyBuyInspection3 || raw.customInspectionUrl3;

  // Map inspectionTemplate objects — already handled by the raw overlay above
  // (explicit re-assignment removed to prevent overwriting user edits)

  /* ================= COMMITMENT ================= */
  data.customWhyBuyCustomerCommitment1 =
    raw.customWhyBuyCustomerCommitment1 || raw.customCustomerCommitmentUrl1;
  data.customWhyBuyCustomerCommitment2 =
    raw.customWhyBuyCustomerCommitment2 || raw.customCustomerCommitmentUrl2;
  data.customWhyBuyCustomerCommitment3 =
    raw.customWhyBuyCustomerCommitment3 || raw.customCustomerCommitmentUrl3;
  data.customWhyBuyCustomerCommitment4 =
    raw.customWhyBuyCustomerCommitment4 || raw.customCustomerCommitmentUrl4;
  data.customWhyBuyCustomerCommitment5 =
    raw.customWhyBuyCustomerCommitment5 || raw.customCustomerCommitmentUrl5;

  // Map customerCommitmentTemplate objects — already handled by the raw overlay above
  // (explicit re-assignment removed to prevent overwriting user edits)

  /* ================= GALLERY ================= */
  data.customGallery1 =
    raw.customGallery1 || raw.customWhyBuyGallery1 || raw.customGalleryUrl1;
  data.customGallery2 =
    raw.customGallery2 || raw.customWhyBuyGallery2 || raw.customGalleryUrl2;
  data.customGallery3 =
    raw.customGallery3 || raw.customWhyBuyGallery3 || raw.customGalleryUrl3;
  data.customGallery4 =
    raw.customGallery4 || raw.customWhyBuyGallery4 || raw.customGalleryUrl4;
  data.customGallery5 =
    raw.customGallery5 || raw.customWhyBuyGallery5 || raw.customGalleryUrl5;

  // Map galleryTemplate objects — already handled by the raw overlay above
  // (explicit re-assignment removed to prevent overwriting user edits)

  return data;
};
