/**
 * Search-landing title / meta / H1 builders, slug aliases, intro copy, and FAQ schema.
 */

import { getCdnImageUrl } from "./cdnImage";

const BASE_URL = "https://www.reecomm.com";

function toCdnCardUrl(src) {
  if (!src || typeof src !== "string") return null;
  const url = getCdnImageUrl(src, { preset: "card" }) || src;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${BASE_URL}${url}`;
  return url;
}

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

/**
 * Model-only slugs people type → brand+model segment.
 * Longest key first so wagon-r wins over any shorter overlap.
 */
const MODEL_CANONICAL = {
  "wagon-r": "maruti-suzuki-wagon-r",
  "grand-i10": "hyundai-grand-i10",
  brezza: "maruti-suzuki-brezza",
  baleno: "maruti-suzuki-baleno",
  swift: "maruti-suzuki-swift",
  venue: "hyundai-venue",
  nexon: "tata-nexon",
  punch: "tata-punch",
  thar: "mahindra-thar",
  scorpio: "mahindra-scorpio",
  innova: "toyota-innova",
  fortuner: "toyota-fortuner",
  amaze: "honda-amaze",
  seltos: "kia-seltos",
  creta: "hyundai-creta",
  city: "honda-city",
  i20: "hyundai-i20",
};

const MODEL_CANONICAL_KEYS = Object.keys(MODEL_CANONICAL).sort(
  (a, b) => b.length - a.length,
);

function resolveModelShortcut(slug) {
  for (const key of MODEL_CANONICAL_KEYS) {
    const match = slug.match(
      new RegExp(`^buy-used-${key}-cars(?:-(.+))?$`),
    );
    if (!match) continue;
    const canonical = MODEL_CANONICAL[key];
    if (slug.includes(canonical)) continue;
    const place = match[1] ? `-${match[1]}` : "";
    return `buy-used-${canonical}-cars${place}`;
  }
  return null;
}

const SHORT_BRAND_NAMES = {
  "maruti suzuki": "Maruti",
  "mercedes benz": "Mercedes",
};

export function searchPhraseName(brand = "", model = "") {
  const brandT = String(brand || "").trim();
  const modelT = String(model || "").trim();
  const short = SHORT_BRAND_NAMES[brandT.toLowerCase()] || brandT;
  return cleanJoin([short, modelT]);
}

/**
 * SERP document-title lead (Head / og only — not used for visible H1).
 * Full brand names. Example: "12 Used Maruti Suzuki Cars In Palanpur, Second Hand"
 */
export function formatInventoryLead({
  count = 0,
  brand = "",
  model = "",
  place = "",
  isTwoWheeler = false,
} = {}) {
  const brandT = String(brand || "").trim();
  const modelT = String(model || "").trim();
  if (!brandT && !modelT) return "";
  const n = Number(count) || 0;
  const unit = isTwoWheeler ? "Bikes" : "Cars";
  const subject = modelT
    ? cleanJoin([brandT, modelT])
    : cleanJoin([brandT, unit]);
  const where = place ? ` In ${place}` : "";
  const prefix = n > 0 ? `${n} Used` : "Used";
  return `${prefix} ${subject}${where}, Second Hand`.replace(/\s+/g, " ").trim();
}

export function formatOfficialHeading({
  count = 0,
  brand = "",
  model = "",
  place = "",
  vehicleWord = "Cars",
  isTwoWheeler = false,
} = {}) {
  const n = Number(count) || 0;
  const brandT = String(brand || "").trim();
  const modelT = String(model || "").trim();
  const vw = isTwoWheeler ? "Bikes" : vehicleWord || "Cars";
  const subject = modelT
    ? cleanJoin([brandT, modelT])
    : cleanJoin([brandT, vw]);
  const where = place ? ` in ${place}` : "";
  const prefix = "Used";
  return `${prefix} ${subject}${where}`.replace(/\s+/g, " ").trim();
}

function capitalizeLead(lead) {
  if (!lead) return "";
  return lead.charAt(0).toUpperCase() + lead.slice(1);
}

function formatSampleClause(vehicles = []) {
  const bits = (vehicles || [])
    .slice(0, 3)
    .map((v) => {
      const year = v?.yearOfMfg || v?.year || "";
      const modelName = v?.modelName || "";
      const fuel = formatFuelLabel(v?.fuelType).toLowerCase();
      return cleanJoin([year, modelName, fuel]);
    })
    .filter(Boolean);
  if (!bits.length) return "";
  if (bits.length === 1) return `a ${bits[0]}`;
  if (bits.length === 2) return `a ${bits[0]} and a ${bits[1]}`;
  return `a ${bits[0]}, a ${bits[1]}, and a ${bits[2]}`;
}

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

/**
 * Minimum listings required to index non-hub landing pages.
 * Empty / thin non-hubs get noindex,follow — intentional (AdSense + GSC thin crawl).
 * Hubs stay indexable; AdSense uses a higher bar (MIN_ADSENSE_LISTINGS).
 */
export const MIN_INDEXABLE_LISTINGS = 3;

function placeKey(city = "") {
  return String(city || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

/**
 * City-specific buyer notes for money hubs — not a token-swap of the same sentence.
 * Returned as structured paragraphs for SSR SEO body.
 */
const CITY_BUYING_NOTES = {
  ahmedabad: {
    title: "Buying used vehicles in Ahmedabad",
    cars: [
      "Ahmedabad has deep used-car demand across SG Highway, Nikol, Naroda, and satellite towns. Compare year, kilometres, and fuel type carefully — petrol and CNG hatchbacks move fastest for city use, while SUVs sell on weekend highway needs.",
      "Prefer listings with clear exterior and engine photos, then verify RC match and challans on Vahan before paying. For RTO transfer, budget time for local agent paperwork and confirm hypothecation is cleared if the car was financed.",
      "Reecomm consultants in and around Ahmedabad can share inspection reports on eligible stock so you shortlist online, then visit only serious matches.",
    ],
    bikes: [
      "Ahmedabad two-wheeler buyers usually shortlist by commute distance and budget for insurance renewal. Check tyre life, chain/sprocket wear, and cold-start behaviour before negotiating.",
      "Confirm RC ownership and valid insurance on every used bike. Prefer verified consultant listings over informal classifieds when possible.",
    ],
  },
  palanpur: {
    title: "Buying used vehicles in Palanpur",
    cars: [
      "Palanpur and nearby Banaskantha buyers often balance city and highway use on the Ahmedabad–Palanpur corridor. Fair prices depend on year, ownership count, and whether service history is available.",
      "Ask for RC, insurance, and PUC before a test drive. Many local deals involve consultant yards — use Reecomm storefronts to see live stock and inquire without chasing WhatsApp-only ads.",
      "Request an inspection when offered: engine health, structure, and OBD checks reduce surprises after payment. Complete transfer at the relevant Banaskantha RTO after agreement.",
    ],
    bikes: [
      "Used bikes in Palanpur sell well for daily town and village commuting. Prioritise clear ownership papers and recent service before negotiating.",
    ],
  },
  visnagar: {
    title: "Buying used vehicles in Visnagar",
    cars: [
      "Visnagar family buyers often look at MPVs and hatchbacks for school and highway runs toward Mehsana or Ahmedabad. Check clutch feel, underbody rust, and third-row wear on people-carriers like the Ertiga.",
      "Compare at least two similar year/km cars before locking a price. Verify seller name against RC and clear any finance hypothecation in writing.",
      "Reecomm listings for Visnagar help you compare photos and prices first, then inquire with the consultant managing the vehicle.",
    ],
    bikes: [
      "For Visnagar two-wheelers, inspect brakes, frame welds, and tyre remaining life. Keep budget room for insurance and a basic service after purchase.",
    ],
  },
  siddhpur: {
    title: "Buying used vehicles in Siddhpur",
    cars: [
      "Siddhpur buyers often shortlist value hatchbacks and compact SUVs for town plus pilgrim-route travel. Older cars can be fair deals if structure and engine are sound — do not skip a thorough inspection.",
      "Match documents carefully: RC, insurance, and challan status. Prefer consultants who can show service records or previous owner details.",
      "Use Reecomm to compare Siddhpur and nearby Palanpur/Mehsana stock so you are not limited to a single yard.",
    ],
    bikes: [
      "Used bikes around Siddhpur should have matching RC and a clean frame. Test ride on mixed roads before you agree on price.",
    ],
  },
  kanodar: {
    title: "Buying used vehicles in Kanodar",
    cars: [
      "Kanodar sits close to Palanpur inventory — many buyers compare both towns. Focus on ownership history and accident-free structure rather than cosmetic polish alone.",
      "Confirm insurance validity and ask for a short highway test drive toward Palanpur before finalising.",
    ],
    bikes: [
      "Shortlist Kanodar bikes with clear photos and RC match, then inquire through Reecomm instead of cash-only roadside deals.",
    ],
  },
  surat: {
    title: "Buying used vehicles in Surat",
    cars: [
      "Surat’s used market moves quickly for sedans and compact SUVs used for city and industrial-area commuting. Service history and flood/water-damage checks matter in monsoon-prone years.",
      "Compare Honda City, Creta-class SUVs, and hatchbacks by year and variant, then verify RC and challans before payment.",
    ],
    bikes: [
      "Surat two-wheeler buyers should check chain stretch, tyre age, and ABS function on newer bikes. Keep insurance renewal in the budget.",
    ],
  },
  mehsana: {
    title: "Buying used vehicles in Mehsana",
    cars: [
      "Mehsana buyers often bridge Visnagar, Unjha, and Ahmedabad stock. Cross-check prices across nearby cities so you do not overpay for similar year/km cars.",
      "Insist on document match and a proper inspection before negotiating the final amount.",
    ],
    bikes: [
      "For Mehsana bikes, prioritise commuting comfort and paper clarity over cosmetic accessories.",
    ],
  },
  gandhinagar: {
    title: "Buying used vehicles in Gandhinagar",
    cars: [
      "Gandhinagar buyers frequently compare capital-region stock with Ahmedabad yards. Factor commute patterns and parking needs when choosing body type.",
      "Use verified listings, request inspection where available, and complete RC transfer with correct RTO jurisdiction.",
    ],
    bikes: [
      "Gandhinagar two-wheeler deals should include a cold-start test and tyre/brake check before you pay.",
    ],
  },
};

/**
 * Structured local buying tips for stocked city landings (AdSense unique-value signal).
 */
export function buildCityBuyingNotes(
  city = "",
  { isTwoWheeler = false, brand = "", model = "" } = {},
) {
  const key = placeKey(city);
  if (!key) return null;
  const entry = CITY_BUYING_NOTES[key];
  const subject = cleanJoin([brand, model]) || (isTwoWheeler ? "bikes" : "cars");
  if (!entry) {
    const label = String(city).trim();
    if (!label) return null;
    return {
      title: `Buying used ${subject} in ${label}`,
      paragraphs: [
        `When buying used ${subject} in ${label}, shortlist verified consultant listings with clear photos and prices, then confirm RC ownership, insurance, and challan status before payment.`,
        `Compare at least two similar year and kilometre options, request an inspection when available on Reecomm, and only negotiate after you have seen the vehicle in person.`,
      ],
    };
  }
  const paragraphs = isTwoWheeler
    ? entry.bikes?.length
      ? entry.bikes
      : entry.cars
    : entry.cars;
  return {
    title: entry.title,
    paragraphs: paragraphs || [],
  };
}

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

  const marutiShortcut = slug.match(/^buy-used-maruti(?!-suzuki)(.*)$/);
  if (marutiShortcut) {
    return `buy-used-maruti-suzuki${marutiShortcut[1]}`;
  }

  const modelShortcut = resolveModelShortcut(slug);
  if (modelShortcut) return modelShortcut;

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
  minPrice = null,
} = {}) {
  const count =
    typeof totalCount === "number" && totalCount > 0 ? totalCount : 0;
  const minPriceNum = Number(minPrice);
  const hasMinPrice = Number.isFinite(minPriceNum) && minPriceNum > 0;
  const startingFromBit = hasMinPrice
    ? minPriceNum >= 100000
      ? ` starting from ₹${(minPriceNum / 100000).toFixed(2).replace(/\.00$/, "")}L`
      : ` starting from ₹${minPriceNum.toLocaleString("en-IN")}`
    : "";
  const brandT = (brand || "").trim();
  const modelT = (model || "").trim();
  const cityT = (city || "").trim();
  const typeT = (typePart || "").trim();
  const budgetT = (budgetPart || "").trim();
  const isTwoWheeler = vehicleWord === "Two Wheelers";
  const vw = displayVehicleLabel(vehicleWord, isTwoWheeler);
  const vwLower = isTwoWheeler ? "bikes" : (vehicleWord || "Cars").toLowerCase();
  const countBit = count > 0 ? `${count}+ ` : "";

  /** Document title only — prefer keeping count + city when shortening. */
  const withBrand = (core) => {
    let title = `${core} | Reecomm`;
    if (title.length <= 65) return title;
    let shortCore = core
      .replace(/, Second Hand$/i, "")
      .replace(/\s+/g, " ")
      .trim();
    title = `${shortCore} | Reecomm`;
    if (title.length <= 65) return title;
    shortCore = shortCore
      .replace(` ${vw}`, "")
      .replace(/\s+/g, " ")
      .trim();
    return `${shortCore} | Reecomm`;
  };

  if (isHub && !brandT && !modelT && !cityT && !typeT && !budgetT) {
    const hubTitle = isTwoWheeler
      ? count > 0
        ? `${count} Used Bikes For Sale, Second Hand | Reecomm`
        : "Buy Used Bikes, Second Hand | Reecomm"
      : count > 0
        ? `${count} Used Cars For Sale, Second Hand | Reecomm`
        : "Buy Used Cars, Second Hand | Reecomm";
    const hubH1 = isTwoWheeler ? "Buy Used Bikes" : "Buy Used Cars";
    const hubDescription = isTwoWheeler
      ? `Buy second hand bikes on Reecomm. Browse ${countBit}verified two-wheelers with prices, photos, and inspection reports before you buy.`
      : `Buy second hand cars across India on Reecomm. Browse ${countBit}verified listings with prices, photos, and inspection reports before you buy.`;
    return {
      title: hubTitle,
      h1: hubH1,
      description: truncateMeta(hubDescription),
      totalCount: count,
    };
  }

  // Brand-only (no city) — title/meta only; H1 stays via formatOfficialHeading
  if (brandT && !modelT && !cityT && !typeT && !budgetT) {
    const lead = formatInventoryLead({
      count,
      brand: brandT,
      isTwoWheeler,
    });
    const samples = formatSampleClause(sampleVehicles);
    const description = lead
      ? samples
        ? `${lead}. Includes ${samples}. Compare second hand ${vwLower} photos, prices & inspection on Reecomm.`
        : `${lead}. Compare second hand ${brandT} ${vwLower} — photos, prices, fuel type & inspection on Reecomm.`
      : `Browse verified second hand ${brandT} ${vwLower} for sale on Reecomm. Compare prices, photos, ownership, fuel type, and inspection reports.`;
    return {
      title: withBrand(lead || `Used ${brandT} ${vw}, Second Hand`),
      h1: formatOfficialHeading({
        count,
        brand: brandT,
        vehicleWord: vw,
        isTwoWheeler,
      }),
      description: truncateMeta(description),
      totalCount: count,
    };
  }

  // Visible H1 stays legacy phrasing (no UI change)
  let h1 = "";
  let titleCore = "";

  if (cityT && brandT && modelT) {
    h1 = `Used ${brandT} ${modelT} in ${cityT}`;
    titleCore = formatInventoryLead({
      count,
      brand: brandT,
      model: modelT,
      place: cityT,
      isTwoWheeler,
    });
  } else if (cityT && brandT && !modelT) {
    h1 = `Used ${brandT} ${vw} in ${cityT}`;
    titleCore = formatInventoryLead({
      count,
      brand: brandT,
      place: cityT,
      isTwoWheeler,
    });
  } else if (cityT && !brandT && !modelT && !budgetT) {
    h1 = `Buy Used ${vw} in ${cityT}`;
    titleCore =
      count > 0
        ? `${count} Used ${vw} In ${cityT}, Second Hand`
        : `Used ${vw} In ${cityT}, Second Hand`;
  } else if (brandT && modelT && !cityT) {
    h1 = `Used ${brandT} ${modelT}`;
    titleCore = formatInventoryLead({
      count,
      brand: brandT,
      model: modelT,
      isTwoWheeler,
    });
  } else {
    h1 = cleanJoin([
      "Used",
      typeT,
      brandT,
      modelT,
      vw,
      budgetT,
      cityT ? `in ${cityT}` : "",
    ]);
    titleCore = cleanJoin([
      count > 0 ? `${count} Used` : "Used",
      typeT,
      brandT,
      modelT,
      vw,
      budgetT,
      cityT ? `In ${cityT}` : "",
      "Second Hand",
    ]).replace(/\s+,/g, ",");
    if (!/, Second Hand$/i.test(titleCore)) {
      titleCore = `${titleCore.replace(/\s+Second Hand$/i, "")}, Second Hand`;
    }
  }

  let title = withBrand(titleCore || h1);

  const subject = cleanJoin([
    brandT.toLowerCase(),
    modelT.toLowerCase(),
    vwLower,
    cityT ? `in ${cityT}` : "",
  ]);

  let description = `Browse ${countBit}verified second hand ${subject} on Reecomm. Compare prices, photos, ownership & inspection reports before you buy.`;

  if (count > 0 && (brandT || modelT) && !typeT && !budgetT) {
    const lead = formatInventoryLead({
      count,
      brand: brandT,
      model: modelT,
      place: cityT,
      isTwoWheeler,
    });
    if (lead) {
      title = withBrand(lead);
      // Do not overwrite h1 — visible heading stays unchanged
      const samples = formatSampleClause(sampleVehicles);
      // CarWale-style: count hub + starting price when inventory has a real min
      const priceClause = startingFromBit
        ? `${count} used ${cleanJoin([
            brandT,
            modelT,
            vwLower,
          ])}${cityT ? ` in ${cityT}` : ""} for sale${startingFromBit}`
        : "";
      if (priceClause && samples) {
        description = `${priceClause} — includes ${samples}. 100% verified second hand listings with photos & inspection on Reecomm.`;
      } else if (priceClause) {
        description = `${priceClause} — 100% verified second hand listings with photos & inspection on Reecomm.`;
      } else if (samples) {
        description = `${lead}. Includes ${samples}. Compare photos, prices & inspection on Reecomm.`;
      } else {
        description = `${lead}. Compare second hand photos, prices, fuel & inspection reports on Reecomm.`;
      }
    }
  }

  const samples = (sampleVehicles || []).slice(0, 3);
  const usedInventoryLead =
    count > 0 && (brandT || modelT) && !typeT && !budgetT;
  if (!usedInventoryLead && samples.length) {
    const bits = samples.map((v) => {
      const year = v.yearOfMfg || v.year || "";
      const modelName = v.modelName || "";
      const fuel = formatFuelLabel(v.fuelType);
      const owner = formatOwnerLabel(v.ownership);
      const price = formatShortPrice(v.price);
      return [year, modelName, fuel, owner, price].filter(Boolean).join(", ");
    });
    description = `Browse ${countBit}second hand ${subject} on Reecomm — ${bits[0]}${bits[1] ? `; ${bits[1]}` : ""}. Compare photos, fuel, ownership & inspection.`;
  } else if (!usedInventoryLead) {
    const modelSnippet = formatModelList(topModels);
    if (cityT && modelSnippet) {
      description = `Browse ${countBit}verified second hand ${vwLower} in ${cityT} on Reecomm — ${modelSnippet} and more. Compare prices, photos & inspection reports.`;
    } else if (cityT) {
      description = `Browse ${countBit}verified second hand ${vwLower} in ${cityT} on Reecomm. Compare prices, photos, fuel, ownership & inspection before you buy.`;
    }
  }

  return {
    title,
    h1,
    description: truncateMeta(description),
    totalCount: count,
  };
}

function truncateMeta(text) {
  if (!text) return "";
  return text.length > 160 ? `${text.slice(0, 157).trim()}...` : text;
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
  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];
  const prices = safeVehicles
    .map((v) => Number(v?.price))
    .filter((n) => Number.isFinite(n) && n > 0);
  const years = safeVehicles
    .map((v) => Number(v?.yearOfMfg || v?.year))
    .filter((n) => Number.isFinite(n) && n > 1990);
  const fuels = [
    ...new Set(
      safeVehicles
        .map((v) => String(v?.fuelType || "").replace(/_/g, " ").trim())
        .filter(Boolean),
    ),
  ].slice(0, 3);

  return {
    totalCount: totalCount > 0 ? totalCount : safeVehicles.length || 0,
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
  const countLead = formatInventoryLead({
    count: stats.totalCount,
    brand: brandT,
    model: modelT,
    place: cityT,
    isTwoWheeler,
  });
  const countLine = countLead
    ? `${capitalizeLead(countLead)} on Reecomm.`
    : count
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

  const howReecomm =
    count && cityT
      ? ` Reecomm is a used-vehicle marketplace for verified automotive consultants — browse live ${vw} stock in ${cityT}, compare photos and prices, then inquire securely instead of relying on unverified classifieds.`
      : count
        ? ` Reecomm is a used-vehicle marketplace for verified automotive consultants — compare photos, prices, and optional inspection reports, then inquire securely.`
        : "";

  return `${countLine}${priceBand}${yearBand}${fuelLine}${localLine}${trustLine}${howReecomm}`;
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
  const phrase = searchPhraseName(brandT, modelT) || subject;
  const whereLabel = cityT ? `${phrase} in ${cityT}` : phrase;
  const singularLead = formatInventoryLead({
    count: 1,
    brand: brandT,
    model: modelT,
    place: cityT,
    isTwoWheeler,
  });
  const buyTarget = singularLead
    ? singularLead.replace(/\bcars\b/gi, "car").replace(/\bbikes\b/gi, "bike")
    : "";
  const buyQuestion = buyTarget
    ? `Where can I buy a ${buyTarget}?`
    : cityT
      ? `Where can I buy used ${whereLabel}?`
      : `Where can I buy used ${subject} on Reecomm?`;

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
      question: buyQuestion,
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

    const cityNotes = buildCityBuyingNotes(cityT, {
      isTwoWheeler,
      brand: brandT,
      model: modelT,
    });
    const tip =
      cityNotes?.paragraphs?.[0] ||
      `In ${cityT}, compare similar year and kilometre ${vw}, confirm RC match, and inspect before you pay.`;
    items.push({
      question: `What should ${cityT} buyers verify before paying for a used ${subject}?`,
      answer: `${tip} Always match the seller name to the RC, check insurance and challans, and use a Reecomm inquiry so the conversation stays on a structured listing.`,
    });
  } else {
    items.push({
      question: `Why buy used ${vw} on Reecomm instead of open classifieds?`,
      answer:
        "Reecomm focuses on verified consultants and structured listings with optional inspection reports — reducing the risk of misleading ads. Always verify documents and inspect before payment.",
    });
  }

  const safeItems = Array.isArray(items) ? items : [];
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: safeItems.map((item) => ({
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
      streetAddress:
        "First Floor, Loriya Complex, Part B/D, Survey No 268/2, Chhapi, Palanpur Ahmedabad Highway",
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
  isTwoWheeler = false,
}) {
  const vehicleSchemaType = isTwoWheeler ? "Motorcycle" : "Car";
  const fallbackHub = isTwoWheeler
    ? `${BASE_URL}/search/buy-used-two-wheelers`
    : `${BASE_URL}/search/buy-used-cars`;

  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];
  const itemListElement = safeVehicles.slice(0, 10).map((v, index) => {
    const name =
      `${v.yearOfMfg || v.year || ""} ${v.makerName || v.makeName || ""} ${v.modelName || ""}`.trim() ||
      "Used Vehicle";
    const slug = v.slug || v.id;
    const url = v.id
      ? `${BASE_URL}/vehicle/details/${slug}/${v.id}`
      : canonical;
    const rawImage =
      v.thumbnailUrl ||
      v.imageUrl ||
      (Array.isArray(v.vehiclePhotos) ? v.vehiclePhotos[0]?.url : null) ||
      null;
    const image = rawImage ? toCdnCardUrl(rawImage) : null;
    const price = v.price != null ? Number(v.price) : null;

    const vehicleItem = {
      "@type": vehicleSchemaType,
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
      item: vehicleItem,
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
    url: canonical || fallbackHub,
    numberOfItems: count,
    itemListElement,
  };
}

export { BASE_URL as SEO_BASE_URL };
