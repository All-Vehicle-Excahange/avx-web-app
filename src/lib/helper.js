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
    raw.customWhyBuyHeroUrl1 ||
    raw.customHeroImageUrl1 ||
    raw.customWhyBuyHero1;
  data.customWhyBuyHero2 = raw.customWhyBuyHeroUrl2 || raw.customWhyBuyHero2;
  data.customWhyBuyHero3 = raw.customWhyBuyHeroUrl3 || raw.customWhyBuyHero3;

  /* ================= STORY ================= */
  if (raw.aboutUsTitle && !raw.storyTitle) data.storyTitle = raw.aboutUsTitle;
  if (raw.aboutUsDescription && !raw.storyDescription)
    data.storyDescription = raw.aboutUsDescription;

  data.customWhyBuyStory1 = raw.customStoryUrl1 || raw.customWhyBuyStory1;
  data.customWhyBuyStory2 = raw.customStoryUrl2 || raw.customWhyBuyStory2;
  data.customWhyBuyStory3 = raw.customStoryUrl3 || raw.customWhyBuyStory3;

  // Map storyTemplate objects if they exist in API
  if (raw.storyTemplate1) {
    data.storyTemplate1 = raw.storyTemplate1;
  }
  if (raw.storyTemplate2) {
    data.storyTemplate2 = raw.storyTemplate2;
  }
  if (raw.storyTemplate3) {
    data.storyTemplate3 = raw.storyTemplate3;
  }

  /* ================= VEHICLE ================= */
  data.customWhyBuyVehicleSelection1 =
    raw.customVehicleSelectionUrl1 || raw.customWhyBuyVehicleSelection1;
  data.customWhyBuyVehicleSelection2 =
    raw.customVehicleSelectionUrl2 || raw.customWhyBuyVehicleSelection2;

  // Map vehicleSelectionTemplate objects if they exist in API
  if (raw.vehicleSelectionTemplate1) {
    data.vehicleSelectionTemplate1 = raw.vehicleSelectionTemplate1;
  }
  if (raw.vehicleSelectionTemplate2) {
    data.vehicleSelectionTemplate2 = raw.vehicleSelectionTemplate2;
  }

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
    raw.customInspectionUrl1 || raw.customWhyBuyInspection1;
  data.customWhyBuyInspection2 =
    raw.customInspectionUrl2 || raw.customWhyBuyInspection2;
  data.customWhyBuyInspection3 =
    raw.customInspectionUrl3 || raw.customWhyBuyInspection3;

  // Map inspectionTemplate objects if they exist in API
  if (raw.inspectionTemplate1) {
    data.inspectionTemplate1 = raw.inspectionTemplate1;
  }
  if (raw.inspectionTemplate2) {
    data.inspectionTemplate2 = raw.inspectionTemplate2;
  }
  if (raw.inspectionTemplate3) {
    data.inspectionTemplate3 = raw.inspectionTemplate3;
  }
  if (raw.inspectionTemplate4) {
    data.inspectionTemplate4 = raw.inspectionTemplate4;
  }

  /* ================= COMMITMENT ================= */
  data.customWhyBuyCustomerCommitment1 =
    raw.customCustomerCommitmentUrl1 || raw.customWhyBuyCustomerCommitment1;
  data.customWhyBuyCustomerCommitment2 =
    raw.customCustomerCommitmentUrl2 || raw.customWhyBuyCustomerCommitment2;
  data.customWhyBuyCustomerCommitment3 =
    raw.customCustomerCommitmentUrl3 || raw.customWhyBuyCustomerCommitment3;
  data.customWhyBuyCustomerCommitment4 =
    raw.customCustomerCommitmentUrl4 || raw.customWhyBuyCustomerCommitment4;
  data.customWhyBuyCustomerCommitment5 =
    raw.customCustomerCommitmentUrl5 || raw.customWhyBuyCustomerCommitment5;

  // Map customerCommitmentTemplate objects if they exist in API
  if (raw.customerCommitmentTemplate1) {
    data.customerCommitmentTemplate1 = raw.customerCommitmentTemplate1;
  }
  if (raw.customerCommitmentTemplate2) {
    data.customerCommitmentTemplate2 = raw.customerCommitmentTemplate2;
  }
  if (raw.customerCommitmentTemplate3) {
    data.customerCommitmentTemplate3 = raw.customerCommitmentTemplate3;
  }
  if (raw.customerCommitmentTemplate4) {
    data.customerCommitmentTemplate4 = raw.customerCommitmentTemplate4;
  }
  if (raw.customerCommitmentTemplate5) {
    data.customerCommitmentTemplate5 = raw.customerCommitmentTemplate5;
  }

  /* ================= GALLERY ================= */
  data.customGallery1 =
    raw.customGalleryUrl1 || raw.customWhyBuyGallery1 || raw.customGallery1;
  data.customGallery2 =
    raw.customGalleryUrl2 || raw.customWhyBuyGallery2 || raw.customGallery2;
  data.customGallery3 =
    raw.customGalleryUrl3 || raw.customWhyBuyGallery3 || raw.customGallery3;
  data.customGallery4 =
    raw.customGalleryUrl4 || raw.customWhyBuyGallery4 || raw.customGallery4;
  data.customGallery5 =
    raw.customGalleryUrl5 || raw.customWhyBuyGallery5 || raw.customGallery5;

  // Map galleryTemplate objects if they exist in API
  if (raw.galleryTemplate1) {
    data.galleryTemplate1 = raw.galleryTemplate1;
  }
  if (raw.galleryTemplate2) {
    data.galleryTemplate2 = raw.galleryTemplate2;
  }
  if (raw.galleryTemplate3) {
    data.galleryTemplate3 = raw.galleryTemplate3;
  }
  if (raw.galleryTemplate4) {
    data.galleryTemplate4 = raw.galleryTemplate4;
  }
  if (raw.galleryTemplate5) {
    data.galleryTemplate5 = raw.galleryTemplate5;
  }

  return data;
};
