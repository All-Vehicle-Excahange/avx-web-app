/**
 * Search-landing title / meta / H1 builders, slug aliases, intro copy, and FAQ schema.
 */

const BASE_URL = "https://www.reecomm.com";

function cleanJoin(parts) {
  return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

/** Exact slug → canonical slug (301 redirects). */
export const SEARCH_SLUG_REDIRECTS = {
  "buy-used-bikes": "buy-used-two-wheelers",
  "buy-used-bike": "buy-used-two-wheelers",
  "buy-used-motorcycles": "buy-used-two-wheelers",
  "buy-used-motorcycle": "buy-used-two-wheelers",
  "buy-used-scooters": "buy-used-scooter-two-wheelers",
  "buy-used-creta-cars": "buy-used-hyundai-creta-cars",
  "buy-used-toyota": "buy-used-toyota-cars",
};

/** Common misspellings → canonical slug segment. */
export const MODEL_SLUG_SYNONYMS = {
  creata: "creta",
  creatta: "creta",
};

/** Tier-1 cities for enriched local copy (GA4 + inventory focus). */
export const TIER1_CITIES = [
  "Ahmedabad",
  "Palanpur",
  "Gandhinagar",
  "Visnagar",
  "Kanodar",
];

/** Minimum listings required to index non-hub landing pages. */
export const MIN_INDEXABLE_LISTINGS = 1;

/**
 * Resolve slug to a canonical redirect target, or null.
 */
export function resolveSearchSlugRedirect(slug) {
  if (!slug || typeof slug !== "string") return null;

  if (SEARCH_SLUG_REDIRECTS[slug]) {
    return SEARCH_SLUG_REDIRECTS[slug];
  }

  const bikeCity = slug.match(/^buy-used-bikes?-(.+)$/);
  if (bikeCity) {
    return `buy-used-two-wheelers-${bikeCity[1]}`;
  }

  const motoCity = slug.match(/^buy-used-motorcycles?-(.+)$/);
  if (motoCity) {
    return `buy-used-two-wheelers-${motoCity[1]}`;
  }

  return canonicalizeSearchSlug(slug);
}

/**
 * If slug contains a known misspelling, return canonical slug; else null.
 */
export function canonicalizeSearchSlug(slug) {
  if (!slug || typeof slug !== "string") return null;
  let next = slug;
  let changed = false;
  for (const [from, to] of Object.entries(MODEL_SLUG_SYNONYMS)) {
    if (from.toLowerCase() === to.toLowerCase()) continue;
    const re = new RegExp(`(^|-)${from}(-|$)`, "i");
    if (re.test(next)) {
      next = next.replace(re, `$1${to}$2`);
      changed = true;
    }
  }
  return changed && next !== slug ? next : null;
}

function displayVehicleLabel(vehicleWord, isTwoWheeler) {
  if (isTwoWheeler) return "Bikes";
  return vehicleWord || "Cars";
}

/**
 * Extract unique top model names from prefetched vehicles for meta descriptions.
 */
export function extractTopModels(vehicles = [], limit = 4) {
  const seen = new Set();
  const models = [];
  for (const v of vehicles) {
    const maker = (v.makerName || v.makeName || "").trim();
    const model = (v.modelName || "").trim();
    if (!model) continue;
    const label = maker ? `${maker} ${model}` : model;
    const key = label.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    models.push(label);
    if (models.length >= limit) break;
  }
  return models;
}

function formatModelList(models = []) {
  if (!models.length) return "";
  if (models.length === 1) return models[0];
  if (models.length === 2) return `${models[0]} and ${models[1]}`;
  return `${models.slice(0, -1).join(", ")}, and ${models[models.length - 1]}`;
}

/**
 * @param {object} opts
 */
export function buildSearchLandingSeo({
  brand = "",
  model = "",
  city = "",
  vehicleWord = "Cars",
  typePart = "",
  budgetPart = "",
  totalCount = 0,
  isHub = false,
  topModels = [],
} = {}) {
  const count =
    typeof totalCount === "number" && totalCount > 0 ? totalCount : 0;
  const countPrefix = count > 0 ? `${count}+ ` : "";
  const brandT = (brand || "").trim();
  const modelT = (model || "").trim();
  const cityT = (city || "").trim();
  const typeT = (typePart || "").trim();
  const budgetT = (budgetPart || "").trim();
  const isTwoWheeler = vehicleWord === "Two Wheelers";
  const vw = displayVehicleLabel(vehicleWord, isTwoWheeler);
  const vwLower = isTwoWheeler ? "bikes" : (vehicleWord || "Cars").toLowerCase();

  if (isHub && !brandT && !modelT && !cityT && !typeT && !budgetT) {
    const hubTitle = isTwoWheeler
      ? "Used Bikes for Sale in India | Reecomm"
      : "Used Cars for Sale in India | Reecomm";
    const hubDescription = isTwoWheeler
      ? "Browse verified used bikes and two-wheelers for sale on Reecomm. Compare prices, photos, and inspection reports before you buy."
      : "Browse verified used cars for sale across India on Reecomm. Compare prices, photos, and inspection reports before you buy.";
    return {
      title: hubTitle,
      h1: isTwoWheeler ? "Used Bikes for Sale in India" : "Used Cars for Sale in India",
      description: hubDescription,
      totalCount: count,
    };
  }

  const core = cleanJoin([
    "Used",
    typeT,
    brandT,
    modelT,
    vw,
    budgetT,
    cityT ? `in ${cityT}` : "",
  ]);

  let title = `${countPrefix}${core}`.trim();
  let h1 = title;

  // OLX-style title for city landing pages: "21+ Used Cars in Palanpur - Buy Second Hand Cars"
  if (cityT && !brandT && !modelT && !budgetT) {
    const unit = isTwoWheeler ? "Bikes" : "Cars";
    const secondHand = isTwoWheeler ? "Second Hand Bikes" : "Second Hand Cars";
    title = `${countPrefix}Used ${unit} in ${cityT} - Buy ${secondHand}`;
    h1 = `${countPrefix}Used ${unit} in ${cityT}`;
  } else if (cityT && (brandT || modelT)) {
    title = `${countPrefix}${core} - Buy Second Hand ${isTwoWheeler ? "Bikes" : "Cars"}`;
    h1 = `${countPrefix}${core}`.trim();
  } else if (title.length <= 50) {
    title = `${title} | Reecomm`;
  }

  const browseWhat = cleanJoin([
    count > 0 ? `${count}+` : "",
    "verified used",
    typeT.toLowerCase(),
    brandT,
    modelT,
    vwLower,
    budgetT,
    cityT ? `in ${cityT}` : "",
  ]);

  let description = `Browse ${browseWhat} on Reecomm. Compare prices, photos, and inspection reports before you buy.`.replace(
    /\s+/g,
    " "
  );

  const modelSnippet = formatModelList(topModels);
  if (cityT && modelSnippet) {
    description = `Browse ${count > 0 ? `${count}+ ` : ""}verified used ${vwLower} in ${cityT} on Reecomm — ${modelSnippet} and more. Compare prices, photos, and inspection reports.`;
  } else if (cityT) {
    description = `Browse ${count > 0 ? `${count}+ ` : ""}verified used ${vwLower} in ${cityT} on Reecomm. Compare prices, photos, and inspection reports before you buy.`;
  }

  return {
    title: title.length > 70 ? `${title.slice(0, 67).trim()}...` : title,
    h1,
    description:
      description.length > 165
        ? `${description.slice(0, 162).trim()}...`
        : description,
    totalCount: count,
  };
}

/**
 * Unique intro copy for landing pages (SEO body content).
 */
export function buildSearchLandingIntro({
  brand = "",
  model = "",
  city = "",
  vehicleWord = "Cars",
  budgetPart = "",
  totalCount = 0,
  isHub = false,
} = {}) {
  const isTwoWheeler = vehicleWord === "Two Wheelers";
  const vw = displayVehicleLabel(vehicleWord, isTwoWheeler).toLowerCase();
  const brandT = (brand || "").trim();
  const modelT = (model || "").trim();
  const cityT = (city || "").trim();
  const count = totalCount > 0 ? totalCount : null;
  const isTier1 = TIER1_CITIES.some(
    (c) => c.toLowerCase() === cityT.toLowerCase()
  );

  if (isHub && !brandT && !modelT && !cityT) {
    return isTwoWheeler
      ? "Find verified used bikes, scooters, and motorcycles listed by trusted consultants across India. Every listing on Reecomm can include inspection details, transparent pricing, and direct seller contact — so you buy with confidence, not guesswork."
      : "Find verified used cars listed by trusted automotive consultants across India. Reecomm helps you compare second-hand cars with real photos, fair prices, and optional inspection reports — a safer way to buy than unverified classifieds.";
  }

  const subject = cleanJoin([brandT, modelT, vw, budgetPart, cityT ? `in ${cityT}` : ""]);
  const countLine = count
    ? `There are currently ${count}+ ${subject} available on Reecomm.`
    : `Browse ${subject} on Reecomm.`;

  const localLine = isTier1
    ? ` ${cityT} is a key market for verified pre-owned vehicles on Reecomm, with local consultants offering inspection support and faster inquiry response.`
    : cityT
      ? ` Explore listings in ${cityT} from verified sellers and automotive consultants.`
      : "";

  const trustLine =
    " Each vehicle can include inspection details, RC verification guidance, and direct inquiry — helping you avoid common risks when buying used vehicles online.";

  if (brandT.toLowerCase() === "toyota" && !modelT) {
    return `${countLine} Popular Toyota models include Innova, Fortuner, Corolla, and Etios. Reecomm lists verified used Toyota cars with transparent pricing and consultant support.${localLine}${trustLine}`;
  }

  if (modelT.toLowerCase().includes("creta")) {
    return `${countLine} The Hyundai Creta is one of India's most searched used SUVs. Check variant, diesel/petrol option, service history, and inspection report before you shortlist.${localLine}${trustLine}`;
  }

  return `${countLine}${localLine}${trustLine}`;
}

/**
 * Contextual FAQ items + FAQPage schema payload.
 */
export function buildSearchLandingFaq({
  brand = "",
  model = "",
  city = "",
  vehicleWord = "Cars",
  isHub = false,
} = {}) {
  const isTwoWheeler = vehicleWord === "Two Wheelers";
  const vw = displayVehicleLabel(vehicleWord, isTwoWheeler).toLowerCase();
  const brandT = (brand || "").trim();
  const modelT = (model || "").trim();
  const cityT = (city || "").trim();

  const items = [];

  if (isHub) {
    items.push({
      question: isTwoWheeler
        ? "Where can I buy verified used bikes in India?"
        : "Where can I buy verified used cars in India?",
      answer: isTwoWheeler
        ? "Reecomm lists verified used bikes, scooters, and motorcycles from trusted consultants across India. You can filter by brand, city, and budget, then send an inquiry directly from the listing."
        : "Reecomm lists verified used cars from trusted automotive consultants across India. Browse by brand, city, fuel type, and budget, then contact the seller through a secure inquiry.",
    });
  } else {
    items.push({
      question: cityT
        ? `How do I buy used ${brandT || modelT || vw} in ${cityT}?`
        : `How do I buy used ${cleanJoin([brandT, modelT, vw])} on Reecomm?`,
      answer: `Search listings on Reecomm, review photos and price details, request an inspection if available, and send an inquiry to the verified seller. You can compare multiple ${vw} before deciding.`,
    });
  }

  items.push({
    question: "Are vehicles on Reecomm inspected?",
    answer:
      "Many listings include Reecomm inspection reports covering engine health, structural checks, OBD diagnostics, and tyre condition. Look for the inspection badge on the vehicle detail page before you inquire.",
  });

  items.push({
    question: isTwoWheeler
      ? "What documents should I check when buying a used bike?"
      : "What documents should I check when buying a used car?",
    answer: isTwoWheeler
      ? "Verify the RC, valid insurance, PUC, and that the seller name matches the RC. For bikes, also confirm there are no pending challans or finance hypothecation before payment."
      : "Verify the RC, insurance, PUC, service records, and that the seller name matches the RC. Check challan and loan status on the Vahan portal before making payment.",
  });

  if (brandT.toLowerCase() === "toyota" || modelT.toLowerCase().includes("creta")) {
    items.push({
      question: modelT.toLowerCase().includes("creta")
        ? "What is a fair price for a used Hyundai Creta?"
        : "Which used Toyota cars hold value best?",
      answer: modelT.toLowerCase().includes("creta")
        ? "Used Creta prices depend on year, variant (SX, SX+, diesel/petrol), km driven, and city. Compare similar listings on Reecomm and factor in inspection findings when negotiating."
        : "Toyota Innova, Fortuner, and Corolla Altis typically hold resale value well. Compare year, km driven, and service history across listings on Reecomm before shortlisting.",
    });
  } else {
    items.push({
      question: "Is Reecomm safer than classifieds like OLX?",
      answer:
        "Reecomm focuses on verified consultants and structured listings with optional inspection reports — reducing the risk of misleading ads common on open classifieds. Always verify documents and inspect before payment.",
    });
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return { items, schema };
}

/**
 * Build ItemList schema with vehicle entries for rich results.
 */
export function buildSearchItemListSchema({
  title,
  description,
  canonical,
  vehicles = [],
  totalCount = 0,
}) {
  const itemListElement = vehicles.slice(0, 10).map((v, index) => {
    const name =
      `${v.yearOfMfg || v.year || ""} ${v.makerName || v.makeName || ""} ${v.modelName || ""}`.trim() ||
      "Used Vehicle";
    const slug = v.slug || v.id;
    const url = v.id
      ? `${BASE_URL}/vehicle/details/${slug}/${v.id}`
      : canonical;
    const image =
      v.thumbnailUrl ||
      v.imageUrl ||
      (Array.isArray(v.vehiclePhotos) ? v.vehiclePhotos[0]?.url : null) ||
      null;
    const price = v.price != null ? Number(v.price) : null;

    const carItem = {
      "@type": "Car",
      name,
      url,
      ...(image ? { image } : {}),
      ...(price && !Number.isNaN(price)
        ? {
            offers: {
              "@type": "Offer",
              price: String(price),
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              itemCondition: "https://schema.org/UsedCondition",
            },
          }
        : {}),
    };

    return {
      "@type": "ListItem",
      position: index + 1,
      url,
      name,
      item: carItem,
    };
  });

  const count =
    typeof totalCount === "number" && totalCount > 0
      ? totalCount
      : vehicles.length;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title || "Used Vehicles on Reecomm",
    description: description || "Browse verified used vehicles for sale.",
    url: canonical || `${BASE_URL}/search/buy-used-cars`,
    numberOfItems: count,
    itemListElement,
  };
}

export { BASE_URL as SEO_BASE_URL };
