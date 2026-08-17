export const getSellerTierTitle = () => {
  try {
    if (typeof window === "undefined") {
      return null;
    }

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

export const generateVehicleSlug = (data) => {
  if (!data) return "vehicle";

  const brandPart = (data.makerName || data.makeName || "")
    .toLowerCase()
    .replace(/\s+/g, "-");
  const modelPart = (data.modelName || "").toLowerCase().replace(/\s+/g, "-");
  const yearPart = data.yearOfMfg || data.year || "";
  const cityPart = (
    data.cityName ||
    data.city ||
    data.address?.city ||
    data.location ||
    ""
  )
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

  return `buy-used-${brandPart}-${modelPart}-${yearPart}-cars-${cityPart}`
    .replace(/-+/g, "-")
    .replace(/-$/, "")
    .replace(/^-/, "");
};

export const generateVehicleUrl = (vehicle) => {
  if (!vehicle || !vehicle.id) return "/search";

  const slug = generateVehicleSlug(vehicle);
  const consultantUsername =
    vehicle.consultantUsername ||
    vehicle.consultantSlug ||
    vehicle.vehicleOwner?.username ||
    vehicle.username ||
    (vehicle.consultantName
      ? vehicle.consultantName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
      : null);

  if (consultantUsername) {
    return `/vehicle/details/${consultantUsername}/${slug}/${vehicle.id}`;
  }
  return `/vehicle/details/${slug}/${vehicle.id}`;
};

export const generateDynamicPageTitle = (vehicle) => {
  if (!vehicle) return "Vehicle Details | Reecomm";

  const year = vehicle.yearOfMfg || "";
  const make = vehicle.makerName || vehicle.makeName || "";
  const model = vehicle.modelName || "";
  const variant = vehicle.variantName || "";
  const baseName = [year, make, model, variant].filter(Boolean).join(" ");

  const city = (
    vehicle.cityName ||
    vehicle.city ||
    vehicle.address?.city ||
    vehicle.vehicleAddress?.city ||
    ""
  ).split(",")[0].trim();

  const formattedPrice = vehicle.price
    ? typeof vehicle.price === "number"
      ? vehicle.price >= 100000
        ? `${(vehicle.price / 100000).toFixed(2).replace(/\.00$/, "")}L`
        : vehicle.price.toLocaleString("en-IN")
      : vehicle.price
    : "";

  const locationPart = city ? ` for Sale in ${city}` : "";
  const pricePart = formattedPrice ? ` | ₹${formattedPrice}` : "";

  return `Used ${baseName}${locationPart}${pricePart} | Reecomm`;
};

export const generateDynamicMetaDescription = (vehicle, summary = {}) => {
  if (!vehicle) return "Buy verified used vehicles on Reecomm. View detailed specs, photos, price, and contact information.";

  const year = vehicle.yearOfMfg || "";
  const make = vehicle.makerName || vehicle.makeName || "";
  const model = vehicle.modelName || "";
  const variant = vehicle.variantName || "";
  const baseName = [year, make, model, variant].filter(Boolean).join(" ");

  const city = (
    vehicle.cityName ||
    vehicle.city ||
    vehicle.address?.city ||
    vehicle.vehicleAddress?.city ||
    summary?.address?.city ||
    ""
  ).split(",")[0].trim();

  const formattedPrice = vehicle.price
    ? typeof vehicle.price === "number"
      ? vehicle.price >= 100000
        ? `${(vehicle.price / 100000).toFixed(2).replace(/\.00$/, "")} Lakh`
        : `₹${vehicle.price.toLocaleString("en-IN")}`
      : vehicle.price
    : "";

  const km = vehicle.kmDriven
    ? typeof vehicle.kmDriven === "number"
      ? `${vehicle.kmDriven.toLocaleString("en-IN")} km`
      : vehicle.kmDriven
    : "";

  const ownership = vehicle.ownership
    ? `${vehicle.ownership}${typeof vehicle.ownership === "number" ? (vehicle.ownership === 1 ? "st" : vehicle.ownership === 2 ? "nd" : "rd") : ""} Owner`
    : "";

  const fuel = vehicle.fuelType || "";
  const transmission = vehicle.transmissionType || "";
  const rating = vehicle.avxInspectionRating ? `AVX Inspected (Rating: ${vehicle.avxInspectionRating}/10)` : "Reecomm Inspected";

  const sellerName = summary?.consultationName || vehicle.consultantName || (vehicle.vehicleOwner ? `${vehicle.vehicleOwner.firstname || ""} ${vehicle.vehicleOwner.lastname || ""}`.trim() : null);

  const specsList = [km, ownership, fuel, transmission].filter(Boolean).join(", ");
  const locationText = city ? ` in ${city}` : "";
  const priceText = formattedPrice ? ` for ${formattedPrice}` : "";
  const sellerText = sellerName ? `. Listed by ${sellerName}` : "";

  return `Buy certified used ${baseName}${locationText}${priceText}. ${specsList ? `${specsList}. ` : ""}${rating} with verified report${sellerText}. View HD photos, specs & book test drive on Reecomm.`;
};

export const normalizeWhyBuyData = (raw = {}, defaults = {}) => {
  // Check if the API response has any real content beyond metadata
  const metaOnlyKeys = new Set([
    "id",
    "consultationId",
    "themePrimaryId",
    "themeId",
    "verificationStatus",
    "isSubmitted",
    "createdAt",
    "updatedAt",
    "featuredReviews",
  ]);
  const hasRealContent =
    raw &&
    Object.entries(raw).some(
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

  data.customWhyBuyStory1 =
    raw.customWhyBuyStory1 || raw.customStoryUrl1 || raw.customStory1;
  data.customWhyBuyStory2 =
    raw.customWhyBuyStory2 || raw.customStoryUrl2 || raw.customStory2;
  data.customWhyBuyStory3 =
    raw.customWhyBuyStory3 || raw.customStoryUrl3 || raw.customStory3;

  // Map storyTemplate objects — already handled by the raw overlay above
  // (explicit re-assignment removed to prevent overwriting user edits)

  /* ================= VEHICLE ================= */
  data.customWhyBuyVehicleSelection1 =
    raw.customWhyBuyVehicleSelection1 ||
    raw.customVehicleSelectionUrl1 ||
    raw.customVehicleSelection1;
  data.customWhyBuyVehicleSelection2 =
    raw.customWhyBuyVehicleSelection2 ||
    raw.customVehicleSelectionUrl2 ||
    raw.customVehicleSelection2;

  // vehicleSelectionTemplate objects already handled by the raw overlay above

  /* ================= PROCESS ================= */
  const isProcessStepsEmpty =
    !raw.processSteps ||
    !raw.processSteps.length ||
    (Array.isArray(raw.processSteps) &&
      raw.processSteps.every(
        (p) => !p.title && !p.description && !p.desc && !p.icon
      ));

  if (
    isProcessStepsEmpty &&
    raw.processes &&
    Array.isArray(raw.processes) &&
    raw.processes.length > 0
  ) {
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
    raw.customWhyBuyInspection1 ||
    raw.customInspectionUrl1 ||
    raw.customInspection1;
  data.customWhyBuyInspection2 =
    raw.customWhyBuyInspection2 ||
    raw.customInspectionUrl2 ||
    raw.customInspection2;
  data.customWhyBuyInspection3 =
    raw.customWhyBuyInspection3 ||
    raw.customInspectionUrl3 ||
    raw.customInspection3;

  // Map inspectionTemplate objects — already handled by the raw overlay above
  // (explicit re-assignment removed to prevent overwriting user edits)

  /* ================= COMMITMENT ================= */
  data.customWhyBuyCustomerCommitment1 =
    raw.customWhyBuyCustomerCommitment1 ||
    raw.customCustomerCommitmentUrl1 ||
    raw.customCustomerCommitment1;
  data.customWhyBuyCustomerCommitment2 =
    raw.customWhyBuyCustomerCommitment2 ||
    raw.customCustomerCommitmentUrl2 ||
    raw.customCustomerCommitment2;
  data.customWhyBuyCustomerCommitment3 =
    raw.customWhyBuyCustomerCommitment3 ||
    raw.customCustomerCommitmentUrl3 ||
    raw.customCustomerCommitment3;
  data.customWhyBuyCustomerCommitment4 =
    raw.customWhyBuyCustomerCommitment4 ||
    raw.customCustomerCommitmentUrl4 ||
    raw.customCustomerCommitment4;
  data.customWhyBuyCustomerCommitment5 =
    raw.customWhyBuyCustomerCommitment5 ||
    raw.customCustomerCommitmentUrl5 ||
    raw.customCustomerCommitment5;

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

  /* ================= CLEANUP ALIAS KEYS ================= */
  // The raw overlay (Object.entries(raw)) copies ALL API keys into data,
  // including alias variants (e.g. customWhyBuyHeroUrl2, customStoryUrl2).
  // These must be removed so only canonical keys remain. Otherwise, onChange
  // handlers that delete the canonical key leave the alias behind, causing
  // stale images to persist in the editor UI.
  const aliasKeys = [];
  for (let i = 1; i <= 5; i++) {
    // Hero aliases (slots 1-3)
    if (i <= 3) {
      aliasKeys.push(`customWhyBuyHeroUrl${i}`, `customHeroImageUrl${i}`);
    }
    // Story aliases (slots 1-4)
    if (i <= 4) {
      aliasKeys.push(`customStoryUrl${i}`, `customStory${i}`);
    }
    // Vehicle aliases (slots 1-2)
    if (i <= 2) {
      aliasKeys.push(
        `customVehicleSelectionUrl${i}`,
        `customVehicleSelection${i}`,
      );
    }
    // Inspection aliases (slots 1-4)
    if (i <= 4) {
      aliasKeys.push(`customInspectionUrl${i}`, `customInspection${i}`);
    }
    // Commitment aliases (slots 1-5)
    aliasKeys.push(
      `customCustomerCommitmentUrl${i}`,
      `customCustomerCommitment${i}`,
    );
    // Gallery aliases (slots 1-5)
    aliasKeys.push(`customWhyBuyGallery${i}`, `customGalleryUrl${i}`);
  }
  aliasKeys.forEach((key) => delete data[key]);

  return data;
};
