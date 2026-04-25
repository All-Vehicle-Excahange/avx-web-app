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
  const hasDraft = raw && Object.keys(raw).length > 0;

  // Start with a merge of defaults and raw data
  const data = {
    ...defaults,
    ...Object.fromEntries(
      Object.entries(raw || {}).filter(
        ([, v]) => v !== undefined && v !== null,
      ),
    ),
  };

  if (!hasDraft) return data;

  /* ================= HERO ================= */
  if (raw.heroTitle && !raw.whyBuyHeroTitle)
    data.whyBuyHeroTitle = raw.heroTitle;
  if (raw.heroDescription && !raw.whyBuyHeroDescription)
    data.whyBuyHeroDescription = raw.heroDescription;

  data.customWhyBuyHero1 =
    raw.customWhyBuyHeroUrl1 || raw.customHeroImageUrl1 || raw.customWhyBuyHero1;
  data.customWhyBuyHero2 = raw.customWhyBuyHeroUrl2 || raw.customWhyBuyHero2;
  data.customWhyBuyHero3 = raw.customWhyBuyHeroUrl3 || raw.customWhyBuyHero3;

  /* ================= STORY ================= */
  if (raw.aboutUsTitle && !raw.storyTitle) data.storyTitle = raw.aboutUsTitle;
  if (raw.aboutUsDescription && !raw.storyDescription)
    data.storyDescription = raw.aboutUsDescription;

  data.customWhyBuyStory1 = raw.customStoryUrl1 || raw.customWhyBuyStory1;
  data.customWhyBuyStory2 = raw.customStoryUrl2 || raw.customWhyBuyStory2;
  data.customWhyBuyStory3 = raw.customStoryUrl3 || raw.customWhyBuyStory3;

  /* ================= VEHICLE ================= */
  data.customWhyBuyVehicleSelection1 =
    raw.customVehicleSelectionUrl1 || raw.customWhyBuyVehicleSelection1;
  data.customWhyBuyVehicleSelection2 =
    raw.customVehicleSelectionUrl2 || raw.customWhyBuyVehicleSelection2;

  /* ================= PROCESS ================= */
  if (raw.processes && Array.isArray(raw.processes)) {
    data.processSteps = raw.processes.map((p) => ({
      title: p.title || "",
      description: p.desc || p.description || "",
      icon: p.icon || "",
    }));
  }

  /* ================= INSPECTION ================= */
  if (raw.inspectionDescription && !raw.inspectionText)
    data.inspectionText = raw.inspectionDescription;

  data.customWhyBuyInspection1 =
    raw.customInspectionUrl1 || raw.customWhyBuyInspection1;
  data.customWhyBuyInspection2 =
    raw.customInspectionUrl2 || raw.customWhyBuyInspection2;
  data.customWhyBuyInspection3 =
    raw.customInspectionUrl3 || raw.customWhyBuyInspection3;

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

  /* ================= GALLERY ================= */
  data.customGallery1 = raw.customGalleryUrl1 || raw.customWhyBuyGallery1 || raw.customGallery1;
  data.customGallery2 = raw.customGalleryUrl2 || raw.customWhyBuyGallery2 || raw.customGallery2;
  data.customGallery3 = raw.customGalleryUrl3 || raw.customWhyBuyGallery3 || raw.customGallery3;
  data.customGallery4 = raw.customGalleryUrl4 || raw.customWhyBuyGallery4 || raw.customGallery4;
  data.customGallery5 = raw.customGalleryUrl5 || raw.customWhyBuyGallery5 || raw.customGallery5;

  return data;
};
