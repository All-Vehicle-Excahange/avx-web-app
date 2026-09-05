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
  // Siddhpur spelling aliases (sidhpur → siddhpur)
  "buy-used-cars-sidhpur": "buy-used-cars-siddhpur",
  "buy-used-two-wheelers-sidhpur": "buy-used-two-wheelers-siddhpur",
  "buy-used-bikes-sidhpur": "buy-used-two-wheelers-siddhpur",
  // Model-only shortcuts → brand+model
  "buy-used-santro-cars": "buy-used-hyundai-santro-xing-cars",
  "buy-used-santro-cars-siddhpur": "buy-used-hyundai-santro-xing-cars-siddhpur",
  "buy-used-santro-xing-cars": "buy-used-hyundai-santro-xing-cars",
  "buy-used-santro-xing-cars-siddhpur":
    "buy-used-hyundai-santro-xing-cars-siddhpur",
  "buy-used-create-cars": "buy-used-hyundai-creta-cars",
};

/** Common misspellings → canonical slug segment. */
export const MODEL_SLUG_SYNONYMS = {
  creata: "creta",
  creatta: "creta",
  create: "creta",
  // NOTE: do NOT map santro → santro-xing here.
  // That expansion loops on already-canonical slugs (…-santro-xing-… keeps matching "santro").
  // Use SEARCH_SLUG_REDIRECTS / santroCity patterns instead.
};

/** City spelling aliases → canonical city slug segment. */
export const CITY_SLUG_SYNONYMS = {
  sidhpur: "siddhpur",
};

/** Tier-1 cities for enriched local copy (GA4 + inventory focus). */
export const TIER1_CITIES = [
  "Ahmedabad",
  "Palanpur",
  "Gandhinagar",
  "Visnagar",
  "Kanodar",
  "Siddhpur",
  "Mehsana",
  "Chhota Udepur",
];

/** Minimum listings required to index non-hub landing pages. */
export const MIN_INDEXABLE_LISTINGS = 1;

/**
 * Resolve slug to a canonical redirect target, or null.
 */
export function resolveSearchSlugRedirect(slug) {
  if (!slug || typeof slug !== "string") return null;

  // Collapse accidental synonym expansion loops (e.g. santro-xing-xing-xing…)
  const collapsed = collapseRepeatedSlugSegments(slug);
  if (collapsed && collapsed !== slug) {
    return collapsed;
  }

  if (SEARCH_SLUG_REDIRECTS[slug]) {
    return SEARCH_SLUG_REDIRECTS[slug];
  }

  const cretaCity = slug.match(/^buy-used-creta-cars-(.+)$/);
  if (cretaCity) {
    return `buy-used-hyundai-creta-cars-${cretaCity[1]}`;
  }

  // Only bare "santro" / "santro-xing" (no brand prefix) → hyundai-santro-xing
  const santroOnly = slug.match(
    /^buy-used-santro(?:-xing)?-cars(?:-(.+))?$/
  );
  if (santroOnly) {
    const cityPart = santroOnly[1] ? `-${santroOnly[1]}` : "";
    return `buy-used-hyundai-santro-xing-cars${cityPart}`;
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
 * Collapse duplicated hyphen segments: santro-xing-xing-xing → santro-xing
 */
function collapseRepeatedSlugSegments(slug) {
  if (!slug || typeof slug !== "string") return null;
  let next = slug;
  let prev = "";
  while (next !== prev) {
    prev = next;
    next = next.replace(/(-[a-z0-9]+)\1+/gi, "$1");
  }
  return next !== slug ? next : null;
}

/**
 * If slug contains a known misspelling, return canonical slug; else null.
 */
export function canonicalizeSearchSlug(slug) {
  if (!slug || typeof slug !== "string") return null;
  let next = slug;
  let changed = false;
  for (const [from, to] of Object.entries({
    ...MODEL_SLUG_SYNONYMS,
    ...CITY_SLUG_SYNONYMS,
  })) {
    if (from.toLowerCase() === to.toLowerCase()) continue;

    const escapedFrom = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedTo = to.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // If "to" already contains "from" (santro → santro-xing), skip when
    // the expanded form is already present to avoid infinite redirects.
    if (to.toLowerCase().includes(from.toLowerCase())) {
      const alreadyExpanded = new RegExp(
        `(^|-)${escapedTo}(-|$)`,
        "i"
      );
      if (alreadyExpanded.test(next)) continue;
    }

    const re = new RegExp(`(^|-)${escapedFrom}(-|$)`, "i");
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
  sampleVehicles = [],
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
  const secondHand = isTwoWheeler ? "Second Hand Bikes" : "Second Hand Cars";

  if (isHub && !brandT && !modelT && !cityT && !typeT && !budgetT) {
    const hubTitle = isTwoWheeler
      ? "Used Bikes - Buy & Sell Second Hand Bikes on Reecomm"
      : "Used Cars - Buy & Sell Second Hand Cars on Reecomm";
    const hubDescription = isTwoWheeler
      ? "Browse verified used bikes and two-wheelers for sale on Reecomm. Compare prices, photos, and inspection reports before you buy."
      : "Browse verified used cars for sale across India on Reecomm. Compare prices, photos, and inspection reports before you buy.";
    return {
      title: hubTitle,
      h1: isTwoWheeler
        ? "Used Bikes - Buy & Sell Second Hand Bikes"
        : "Used Cars - Buy & Sell Second Hand Cars",
      description: hubDescription,
      totalCount: count,
    };
  }

  // Brand-only (no city): Used Toyota Cars - Buy & Sell Second Hand Cars on Reecomm
  if (brandT && !modelT && !cityT && !typeT && !budgetT) {
    const title = `Used ${brandT} ${vw} - Buy & Sell ${secondHand} on Reecomm`;
    return {
      title: title.length > 70 ? `${title.slice(0, 67).trim()}...` : title,
      h1: `Used ${brandT} ${vw}`,
      description: `Browse verified used ${brandT.toLowerCase()} ${vwLower} for sale on Reecomm. Compare prices, photos, ownership, fuel type, and inspection reports.`,
      totalCount: count,
    };
  }

  let title = "";
  let h1 = "";

  // Brand + model + city: Used Hyundai Santro Xing in Siddhpur - Buy Second Hand Cars
  if (cityT && brandT && modelT) {
    title = `${countPrefix}Used ${brandT} ${modelT} in ${cityT} - Buy ${secondHand}`;
    h1 = `${countPrefix}Used ${brandT} ${modelT} in ${cityT}`;
  } else if (cityT && brandT && !modelT) {
    title = `${countPrefix}Used ${brandT} ${vw} in ${cityT} - Buy ${secondHand}`;
    h1 = `${countPrefix}Used ${brandT} ${vw} in ${cityT}`;
  } else if (cityT && !brandT && !modelT && !budgetT) {
    title = `${countPrefix}Used ${vw} in ${cityT} - Buy ${secondHand}`;
    h1 = `${countPrefix}Used ${vw} in ${cityT}`;
  } else if (brandT && modelT && !cityT) {
    title = `${countPrefix}Used ${brandT} ${modelT} ${vw} - Buy ${secondHand}`;
    h1 = `${countPrefix}Used ${brandT} ${modelT} ${vw}`;
  } else {
    const core = cleanJoin([
      "Used",
      typeT,
      brandT,
      modelT,
      vw,
      budgetT,
      cityT ? `in ${cityT}` : "",
    ]);
    title = `${countPrefix}${core}`.trim();
    h1 = title;
    if (title.length <= 50) title = `${title} | Reecomm`;
  }

  let description = `Browse verified used ${cleanJoin([
    brandT.toLowerCase(),
    modelT.toLowerCase(),
    vwLower,
    cityT ? `in ${cityT}` : "",
  ])} on Reecomm. Compare prices, photos, and inspection reports before you buy.`;

  const samples = (sampleVehicles || []).slice(0, 3);
  if (samples.length) {
    const bits = samples.map((v) => {
      const year = v.yearOfMfg || v.year || "";
      const modelName = v.modelName || "";
      const fuel = formatFuelLabel(v.fuelType);
      const owner = formatOwnerLabel(v.ownership);
      const price = formatShortPrice(v.price);
      return [year, modelName, fuel, owner, price].filter(Boolean).join(", ");
    });
    const head = cleanJoin([
      brandT || modelT ? `Used ${brandT} ${modelT}`.trim() : `Used ${vwLower}`,
      cityT ? `in ${cityT}` : "",
      "on Reecomm",
    ]);
    description = `${head} — ${bits[0]}${bits[1] ? `; ${bits[1]}` : ""}. Compare photos, fuel, ownership & inspection.`;
  } else {
    const modelSnippet = formatModelList(topModels);
    if (cityT && modelSnippet) {
      description = `Browse ${count > 0 ? `${count}+ ` : ""}verified used ${vwLower} in ${cityT} on Reecomm — ${modelSnippet} and more. Compare prices, photos, fuel, ownership & inspection reports.`;
    } else if (cityT) {
      description = `Browse ${count > 0 ? `${count}+ ` : ""}verified used ${vwLower} in ${cityT} on Reecomm. Compare prices, photos, fuel, ownership & inspection reports before you buy.`;
    }
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

function formatFuelLabel(fuel) {
  if (!fuel) return "";
  return String(fuel)
    .replace(/_PLUS_/gi, "+")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\s*\+\s*/g, "+");
}

function formatOwnerLabel(ownership) {
  if (ownership == null || ownership === "") return "";
  const n = Number(ownership);
  if (Number.isNaN(n)) return String(ownership);
  const suffix = n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
  return `${n}${suffix} Owner`;
}

function formatShortPrice(price) {
  if (price == null || price === "") return "";
  const num = Number(price);
  if (Number.isNaN(num)) return String(price);
  if (num >= 100000) {
    return `from ₹${(num / 100000).toFixed(2).replace(/\.00$/, "")}L`;
  }
  return `from ₹${num.toLocaleString("en-IN")}`;
}

/**
 * Human-readable line for one listing (links + crawlable lists).
 */
export function formatVehicleListingLine(v = {}) {
  const name =
    `${v.yearOfMfg || v.year || ""} ${v.makerName || v.makeName || ""} ${v.modelName || ""}`.trim() ||
    "Used Vehicle";
  const owner = formatOwnerLabel(v.ownership);
  const fuel = formatFuelLabel(v.fuelType);
  const price = (() => {
    if (v.price == null || v.price === "") return "";
    const num = Number(v.price);
    if (Number.isNaN(num)) return String(v.price);
    if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2).replace(/\.00$/, "")}L`;
    }
    return `₹${num.toLocaleString("en-IN")}`;
  })();
  const specs = [owner, fuel, price].filter(Boolean).join(" · ");
  return specs ? `${name} — ${specs}` : name;
}

/**
 * Derive listing stats from sample vehicles for quotable SEO copy.
 */
export function deriveListingStats(vehicles = [], totalCount = 0) {
  const prices = vehicles
    .map((v) => Number(v.price))
    .filter((n) => Number.isFinite(n) && n > 0);
  const years = vehicles
    .map((v) => Number(v.yearOfMfg || v.year))
    .filter((n) => Number.isFinite(n) && n > 1990);
  const fuels = [
    ...new Set(
      vehicles
        .map((v) => String(v.fuelType || "").replace(/_/g, " ").trim())
        .filter(Boolean),
    ),
  ].slice(0, 3);

  return {
    totalCount: totalCount > 0 ? totalCount : vehicles.length || 0,
    minPrice: prices.length ? Math.min(...prices) : null,
    maxPrice: prices.length ? Math.max(...prices) : null,
    minYear: years.length ? Math.min(...years) : null,
    maxYear: years.length ? Math.max(...years) : null,
    fuels,
  };
}

function formatInr(n) {
  if (n == null || Number.isNaN(Number(n))) return null;
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

/**
 * Unique intro copy for landing pages (SEO body content) — stats-driven for all brands/cities.
 */
export function buildSearchLandingIntro({
  brand = "",
  model = "",
  city = "",
  vehicleWord = "Cars",
  budgetPart = "",
  totalCount = 0,
  isHub = false,
  sampleVehicles = [],
} = {}) {
  const isTwoWheeler = vehicleWord === "Two Wheelers";
  const vw = displayVehicleLabel(vehicleWord, isTwoWheeler).toLowerCase();
  const brandT = (brand || "").trim();
  const modelT = (model || "").trim();
  const cityT = (city || "").trim();
  const stats = deriveListingStats(sampleVehicles, totalCount);
  const count = stats.totalCount > 0 ? stats.totalCount : null;

  if (isHub && !brandT && !modelT && !cityT) {
    return isTwoWheeler
      ? "Find verified used bikes, scooters, and motorcycles listed by trusted consultants across India. Every listing on Reecomm can include inspection details, transparent pricing, and direct seller contact — so you buy with confidence, not guesswork."
      : "Find verified used cars listed by trusted automotive consultants across India. Reecomm helps you compare second-hand cars with real photos, fair prices, and optional inspection reports — a safer way to buy than unverified classifieds.";
  }

  const subject = cleanJoin([
    brandT,
    modelT,
    vw,
    budgetPart,
    cityT ? `in ${cityT}` : "",
  ]);
  const countLine = count
    ? `Browse ${count}+ used ${subject} on Reecomm.`
    : `Browse used ${subject} on Reecomm.`;

  const priceBand =
    stats.minPrice != null && stats.maxPrice != null
      ? stats.minPrice === stats.maxPrice
        ? ` Listed prices around ${formatInr(stats.minPrice)}.`
        : ` Current listings range from about ${formatInr(stats.minPrice)} to ${formatInr(stats.maxPrice)}.`
      : "";

  const yearBand =
    stats.minYear != null && stats.maxYear != null
      ? stats.minYear === stats.maxYear
        ? ` Available model years include ${stats.minYear}.`
        : ` Available model years span ${stats.minYear}–${stats.maxYear}.`
      : "";

  const fuelLine =
    stats.fuels.length > 0
      ? ` Common fuel options on this page: ${stats.fuels.join(", ")}.`
      : "";

  const localLine = cityT
    ? ` Compare verified pre-owned ${vw} in ${cityT} from automotive consultants and sellers — with photos, transparent pricing, and optional inspection reports.`
    : ` Compare verified listings with photos, transparent pricing, and optional inspection reports.`;

  const trustLine =
    " Send an inquiry directly from the listing and verify RC, insurance, and condition before you decide.";

  return `${countLine}${priceBand}${yearBand}${fuelLine}${localLine}${trustLine}`;
}

/**
 * Contextual FAQ items + FAQPage schema — parameterized for every brand/model/city.
 */
export function buildSearchLandingFaq({
  brand = "",
  model = "",
  city = "",
  vehicleWord = "Cars",
  isHub = false,
  sampleVehicles = [],
  totalCount = 0,
} = {}) {
  const isTwoWheeler = vehicleWord === "Two Wheelers";
  const vw = displayVehicleLabel(vehicleWord, isTwoWheeler).toLowerCase();
  const brandT = (brand || "").trim();
  const modelT = (model || "").trim();
  const cityT = (city || "").trim();
  const stats = deriveListingStats(sampleVehicles, totalCount);
  const subject = cleanJoin([brandT, modelT]) || vw;
  const whereLabel = cityT ? `${subject} in ${cityT}` : subject;

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
        ? `Where can I buy used ${whereLabel}?`
        : `Where can I buy used ${subject} on Reecomm?`,
      answer: cityT
        ? `On Reecomm you can browse used ${whereLabel} from verified consultants and sellers. Open a listing to review photos and price, request inspection if available, and send an inquiry — a structured alternative to unverified classified ads.`
        : `Search used ${subject} on Reecomm, review photos and price details, request an inspection if available, and send an inquiry to the verified seller.`,
    });
  }

  const priceAnswer =
    stats.minPrice != null && stats.maxPrice != null
      ? cityT
        ? `On Reecomm, recent used ${subject} listings${cityT ? ` in ${cityT}` : ""} typically range from about ${formatInr(stats.minPrice)} to ${formatInr(stats.maxPrice)}, depending on year, variant, kilometres, and condition. Always compare similar listings and inspection findings before negotiating.`
        : `Recent used ${subject} listings on Reecomm typically range from about ${formatInr(stats.minPrice)} to ${formatInr(stats.maxPrice)}. Year, variant, kilometres, and condition drive the final price.`
      : `Used ${subject} prices depend on year, variant, kilometres driven, and city. Compare similar Reecomm listings and factor in inspection findings when negotiating.`;

  items.push({
    question: cityT
      ? `What is the used ${subject} price range in ${cityT}?`
      : `What affects the price of a used ${subject}?`,
    answer: priceAnswer,
  });

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

  if (cityT) {
    items.push({
      question: `Is Reecomm a safer way to buy used ${vw} near ${cityT}?`,
      answer: `Reecomm focuses on verified consultants and structured listings with optional inspection reports — helping reduce the risk of misleading ads. For buyers near ${cityT}, you can shortlist ${subject} online, inquire securely, and verify documents before payment.`,
    });
  } else {
    items.push({
      question: `Why buy used ${vw} on Reecomm instead of open classifieds?`,
      answer:
        "Reecomm focuses on verified consultants and structured listings with optional inspection reports — reducing the risk of misleading ads. Always verify documents and inspect before payment.",
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
 * Marketplace Organization / areaServed JSON-LD for search landings.
 */
export function buildSearchLandingOrgSchema({
  city = "",
  brand = "",
  model = "",
  canonical = "",
} = {}) {
  const cityT = (city || "").trim();
  const nameParts = ["Reecomm"];
  if (brand || model || cityT) {
    nameParts.push("Used");
    if (brand) nameParts.push(brand);
    if (model) nameParts.push(model);
    nameParts.push("Marketplace");
    if (cityT) nameParts.push(`— ${cityT}`);
  }

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Reecomm",
    url: "https://www.reecomm.com",
    logo: "https://www.reecomm.com/logo/logo1.webp",
    description:
      "Verified used cars and bikes marketplace with consultant storefronts and optional inspection reports.",
    telephone: "+91-84601-60697",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chhapi",
      addressLocality: "Palanpur",
      addressRegion: "Gujarat",
      postalCode: "385210",
      addressCountry: "IN",
    },
    ...(cityT
      ? {
          areaServed: {
            "@type": "City",
            name: cityT,
          },
        }
      : {
          areaServed: [
            { "@type": "Country", name: "India" },
            { "@type": "State", name: "Gujarat" },
          ],
        }),
    ...(canonical ? { mainEntityOfPage: canonical } : {}),
  };
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
      ...(v.yearOfMfg || v.year
        ? { vehicleModelDate: String(v.yearOfMfg || v.year) }
        : {}),
      ...(v.fuelType ? { fuelType: String(v.fuelType).replace(/_/g, " ") } : {}),
      ...(v.ownership != null && v.ownership !== ""
        ? { numberOfPreviousOwners: Number(v.ownership) || v.ownership }
        : {}),
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
