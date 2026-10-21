/**
 * Search Intent Parser & SEO URL Resolver for Reecomm Global Search
 * Provides normalized token matching, partial-word matching, intent detection,
 * and canonical SEO landing-page URL resolution.
 */

import { generateSeoSlug } from "./seo.js";
import { resolveSearchSlugRedirect } from "./searchLandingSeo.js";
import { MAKER_NAME_MAPPING } from "../data/makers.js";

export const TWO_WHEELER_MAKERS = {
  15005: "Bajaj",
  15010: "Hero",
  15017: "OLA",
  15019: "Royal Enfield",
  15021: "TVS",
  15024: "Yamaha",
};

export const ALL_MAKERS = { ...MAKER_NAME_MAPPING, ...TWO_WHEELER_MAKERS };

export const KNOWN_CITIES = [
  "Ahmedabad", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
  "Pune", "Jaipur", "Surat", "Rajkot", "Vadodara", "Palanpur", "Lucknow", "Indore",
  "Chandigarh", "Gandhinagar", "Visnagar", "Kanodar", "Siddhpur", "Mehsana",
  "Chhota Udepur", "Nashik", "Bhopal", "Patna", "Ludhiana", "Nagpur", "Coimbatore",
  "Latur", "Hansi", "Agra", "Himatnagar", "Unjha", "Tharad", "Deesa", "Patan",
  "Bhavnagar", "Jamnagar", "Junagadh", "Anand", "Nadiad", "Bharuch", "Navsari",
  "Valsad", "Vapi", "Bhuj", "Gandhidham", "Mundra", "Morbi", "Surendranagar",
  "Amreli", "Porbandar", "Godhra", "Dahod", "Kalol", "Kadi", "Kheralu", "Vadnagar",
];

export const CITY_ALIASES = {
  palan: "Palanpur",
  palanp: "Palanpur",
  palanpu: "Palanpur",
  palanpur: "Palanpur",
  sidh: "Siddhpur",
  sidhp: "Siddhpur",
  siddh: "Siddhpur",
  siddhp: "Siddhpur",
  siddhpur: "Siddhpur",
  mehs: "Mehsana",
  mehsan: "Mehsana",
  mehsana: "Mehsana",
  visna: "Visnagar",
  visnag: "Visnagar",
  visnagar: "Visnagar",
  kanod: "Kanodar",
  kanoda: "Kanodar",
  kanodar: "Kanodar",
  ahmed: "Ahmedabad",
  ahmd: "Ahmedabad",
  amd: "Ahmedabad",
  ahmedabad: "Ahmedabad",
  gandhi: "Gandhinagar",
  gandhin: "Gandhinagar",
  gandhinagar: "Gandhinagar",
  rajk: "Rajkot",
  rajko: "Rajkot",
  rajkot: "Rajkot",
  sura: "Surat",
  surat: "Surat",
  vado: "Vadodara",
  vadod: "Vadodara",
  vadodara: "Vadodara",
  baroda: "Vadodara",
  dees: "Deesa",
  deesa: "Deesa",
  patn: "Patan",
  patan: "Patan",
  himat: "Himatnagar",
  himmat: "Himatnagar",
  himatnagar: "Himatnagar",
  himmatnagar: "Himatnagar",
  kalo: "Kalol",
  kalol: "Kalol",
  unjh: "Unjha",
  unjha: "Unjha",
};

export const MODEL_CANONICAL_SLUGS = {
  swift: "maruti-suzuki-swift",
  baleno: "maruti-suzuki-baleno",
  brezza: "maruti-suzuki-brezza",
  celerio: "maruti-suzuki-celerio",
  alto: "maruti-suzuki-alto",
  eeco: "maruti-suzuki-eeco",
  wagonr: "maruti-suzuki-wagon-r",
  "wagon r": "maruti-suzuki-wagon-r",
  dzire: "maruti-suzuki-dzire",
  ertiga: "maruti-suzuki-ertiga",
  ignis: "maruti-suzuki-ignis",
  ciaz: "maruti-suzuki-ciaz",
  creta: "hyundai-creta",
  venue: "hyundai-venue",
  i20: "hyundai-i20",
  i10: "hyundai-i10",
  "grand i10": "hyundai-grand-i10",
  santro: "hyundai-santro",
  verna: "hyundai-verna",
  city: "honda-city",
  amaze: "honda-amaze",
  civic: "honda-civic",
  nexon: "tata-nexon",
  punch: "tata-punch",
  harrier: "tata-harrier",
  safari: "tata-safari",
  tiago: "tata-tiago",
  altroz: "tata-altroz",
  thar: "mahindra-thar",
  scorpio: "mahindra-scorpio",
  xuv700: "mahindra-xuv700",
  xuv300: "mahindra-xuv300",
  bolero: "mahindra-bolero",
  innova: "toyota-innova",
  fortuner: "toyota-fortuner",
  camry: "toyota-camry",
  corolla: "toyota-corolla",
  etios: "toyota-etios",
  glanza: "toyota-glanza",
  hycross: "toyota-innova-hycross",
  seltos: "kia-seltos",
  sonet: "kia-sonet",
  carens: "kia-carens",
  activa: "honda-activa",
  shine: "honda-shine",
  splendor: "hero-splendor",
  pulsar: "bajaj-pulsar",
  classic: "royal-enfield-classic",
  "classic 350": "royal-enfield-classic-350",
  bullet: "royal-enfield-bullet",
  jupiter: "tvs-jupiter",
};

/**
 * Match a city name or alias from query string
 */
export function matchKnownCity(inputText) {
  if (!inputText) return null;
  const clean = String(inputText).toLowerCase().trim();

  // 1. Explicit pattern: "in <candidate>", "at <candidate>", "near <candidate>"
  const inMatch = clean.match(/\b(?:in|at|near)\s+([a-z0-9_-]+)/i);
  if (inMatch && inMatch[1]) {
    const candidate = inMatch[1].trim();
    if (CITY_ALIASES[candidate]) return CITY_ALIASES[candidate];
    if (candidate.length >= 3) {
      const city = KNOWN_CITIES.find((c) =>
        c.toLowerCase().startsWith(candidate)
      );
      if (city) return city;
    }
  }

  // 2. Exact match of known city name anywhere in string
  for (const c of KNOWN_CITIES) {
    const cLower = c.toLowerCase();
    if (new RegExp(`\\b${cLower}\\b`, "i").test(clean)) return c;
  }

  // 3. Word token matching with alias or prefix (min 3 chars)
  const words = clean.split(/[^a-z0-9]+/i).filter(Boolean);
  const STOP_WORDS = new Set([
    "used", "second", "hand", "buy", "car", "cars", "bike", "bikes",
    "two", "wheeler", "wheelers", "in", "at", "near", "for", "sale",
    "all", "auto", "vehicle", "vehicles", "model", "price", "best", "good",
    "diesel", "die", "petrol", "pet", "cng", "electric", "ev", "suv", "sedan",
    "under", "lakh", "lakhs",
  ]);

  for (const word of words) {
    if (STOP_WORDS.has(word)) continue;
    if (CITY_ALIASES[word]) return CITY_ALIASES[word];
    if (word.length >= 3) {
      const city = KNOWN_CITIES.find((c) =>
        c.toLowerCase().startsWith(word)
      );
      if (city) return city;
    }
  }

  return null;
}

/**
 * Parse and normalize Indian budget expressions:
 * - "under 10 lakh", "below 10 lakhs", "cars under 5 lakh", "car below 10 lakhs"
 * - "bike under 50k", "under 30k", "budget 5 lakh", "used cars under 10 lakh"
 * Returns normalized numeric price, budget parameter (0-X), label, and slug.
 */
export function parseBudgetExpression(text) {
  if (!text) return null;
  const clean = String(text).toLowerCase().trim();

  // Pattern 1: Keywords like under, below, budget, within, upto, up to, less than, <, <=
  const prefixMatch = clean.match(
    /\b(?:under|below|budget(?:\s*of|\s*:)?|within|upto|up\s*to|less\s*than|<|<=)\s*₹?\s*(\d+(?:\.\d+)?)\s*(lakhs?|lacs?|lac|l|k|thousand|thousands?|crores?|cr)?\b/i
  );

  // Pattern 2: Suffix: e.g. "5 lakh budget", "10 lakh under", "30k budget"
  const suffixMatch = clean.match(
    /\b₹?\s*(\d+(?:\.\d+)?)\s*(lakhs?|lacs?|lac|l|k|thousand|thousands?|crores?|cr)\s*(?:budget|under|below|or\s*less)\b/i
  );

  // Pattern 3: Explicit Lakh/Crore in query: e.g. "cars 5 lakh", "10 lakh car"
  const explicitMatch = clean.match(
    /\b(?:under|below|budget|within|upto|up\s*to)?\s*₹?\s*(\d+(?:\.\d+)?)\s*(lakhs?|lacs?|lac|crores?|cr)\b/i
  );

  // Pattern 4: "30k", "50k"
  const kMatch = clean.match(
    /\b(?:under|below|budget)?\s*₹?\s*(\d+(?:\.\d+)?)\s*k\b/i
  );

  const match = prefixMatch || suffixMatch || explicitMatch || kMatch;
  if (!match) return null;

  const rawNum = parseFloat(match[1]);
  if (isNaN(rawNum) || rawNum <= 0) return null;

  const unitStr = (match[2] || (match === kMatch ? "k" : "")).toLowerCase();

  let numericPrice = 0; // in exact Rupees (e.g. 1000000, 500000, 30000)
  let lakhValue = 0;    // in Lakhs (e.g. 10, 5, 0.3)
  let budgetSlug = "";  // e.g. "under-10-lakhs", "under-5-lakhs", "under-30k"
  let budgetLabel = ""; // e.g. "Under ₹10 Lakhs", "Under ₹30k"

  if (/^(k|thousand|thousands?)$/.test(unitStr) || match === kMatch) {
    numericPrice = Math.round(rawNum * 1000);
    lakhValue = rawNum / 100;
    budgetSlug = `under-${rawNum}k`;
    budgetLabel = `Under ₹${rawNum}k`;
  } else if (/^(crores?|cr)$/.test(unitStr)) {
    numericPrice = Math.round(rawNum * 10000000);
    lakhValue = rawNum * 100;
    budgetSlug = `under-${lakhValue}-lakhs`;
    budgetLabel = `Under ₹${rawNum} Crore${rawNum > 1 ? "s" : ""}`;
  } else {
    // Default unit is Lakhs (e.g. "10 lakh" = ₹10,00,000, "5 lakh" = ₹5,00,000)
    numericPrice = Math.round(rawNum * 100000);
    lakhValue = rawNum;
    if (rawNum === 1) {
      budgetSlug = "under-1-lakh";
      budgetLabel = "Under ₹1 Lakh";
    } else if (rawNum < 1) {
      const kVal = Math.round(rawNum * 100);
      budgetSlug = `under-${kVal}k`;
      budgetLabel = `Under ₹${kVal}k`;
    } else {
      budgetSlug = `under-${rawNum}-lakhs`;
      budgetLabel = `Under ₹${rawNum} Lakh${rawNum > 1 ? "s" : ""}`;
    }
  }

  return {
    rawNum,
    unit: unitStr,
    numericPrice,
    lakhValue,
    budgetParam: `0-${lakhValue}`,
    budgetSlug,
    budgetLabel,
  };
}

/**
 * Parse structured search intent from free text query
 */
export function parseSearchIntent(queryStr) {
  const rawQuery = String(queryStr || "").trim();
  if (!rawQuery) {
    return {
      rawQuery: "",
      cleanQuery: "",
      vehicleType: "cars",
      isTwoWheeler: false,
      cityName: null,
      citySlug: null,
      brandName: null,
      brandSlug: null,
      modelName: null,
      modelSlug: null,
      fuelType: null,
      bodyType: null,
      budget: null,
      budgetLabel: null,
      numericPrice: null,
      budgetSlug: null,
      hasIntent: false,
    };
  }

  const clean = rawQuery.toLowerCase();
  const cleanNoUsed = clean
    .replace(/\bused\b/g, "")
    .replace(/\bsecond\s*hand\b/g, "")
    .trim();

  // 1. Budget Detection
  const budgetInfo = parseBudgetExpression(clean);
  const budget = budgetInfo ? budgetInfo.budgetParam : null;
  const budgetLabel = budgetInfo ? budgetInfo.budgetLabel : null;
  const numericPrice = budgetInfo ? budgetInfo.numericPrice : null;
  const budgetSlug = budgetInfo ? budgetInfo.budgetSlug : null;

  // 2. Vehicle Type
  const hasBikeWord = /\b(bike|bikes|two[- ]?wheelers?|motorcycles?|scooters?)\b/i.test(clean);
  const hasCarWord = /\b(car|cars|four[- ]?wheelers?|suv|sedan|hatchback)\b/i.test(clean);
  const isBikeByBudget = Boolean(budgetInfo && budgetInfo.numericPrice <= 80000 && !hasCarWord);
  const isTwoWheeler = hasBikeWord || isBikeByBudget;
  const vehicleType = isTwoWheeler ? "two-wheelers" : "cars";

  // 3. City
  const cityName = matchKnownCity(clean) || matchKnownCity(cleanNoUsed);
  const citySlug = cityName ? cityName.toLowerCase().replace(/\s+/g, "-") : null;

  // 4. Brand
  let brandName = null;
  let brandSlug = null;
  for (const [id, bName] of Object.entries(ALL_MAKERS)) {
    const bLower = bName.toLowerCase();
    if (bLower === "maruti suzuki") {
      if (/\bmaruti(?:\s+suzuki)?\b/i.test(cleanNoUsed)) {
        brandName = bName;
        brandSlug = "maruti-suzuki";
        break;
      }
    } else if (bLower === "volkswagen") {
      if (/\b(?:volkswagen|vw)\b/i.test(cleanNoUsed)) {
        brandName = bName;
        brandSlug = "volkswagen";
        break;
      }
    } else if (new RegExp(`\\b${bLower}\\b`, "i").test(cleanNoUsed)) {
      brandName = bName;
      brandSlug = bName.toLowerCase().replace(/\s+/g, "-");
      break;
    }
  }

  // 5. Model
  let modelName = null;
  let modelSlug = null;
  const modelKeys = Object.keys(MODEL_CANONICAL_SLUGS).sort((a, b) => b.length - a.length);
  for (const mKey of modelKeys) {
    if (new RegExp(`\\b${mKey}\\b`, "i").test(cleanNoUsed)) {
      modelSlug = MODEL_CANONICAL_SLUGS[mKey];
      modelName = mKey
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      break;
    }
  }

  // 6. Fuel Type (supports partial word like 'die' -> Diesel)
  let fuelType = null;
  if (/\b(?:die|dies|diesel|dsl)\b/i.test(clean)) {
    fuelType = "Diesel";
  } else if (/\b(?:pet|petr|petrol)\b/i.test(clean)) {
    fuelType = "Petrol";
  } else if (/\b(?:cng)\b/i.test(clean)) {
    fuelType = "CNG";
  } else if (/\b(?:elec|elect|electric|ev)\b/i.test(clean)) {
    fuelType = "Electric";
  } else if (/\b(?:hybrid)\b/i.test(clean)) {
    fuelType = "Hybrid";
  }

  // 7. Body Type
  let bodyType = null;
  if (/\b(?:suv)\b/i.test(clean)) {
    bodyType = "SUV";
  } else if (/\b(?:sedan)\b/i.test(clean)) {
    bodyType = "Sedan";
  } else if (/\b(?:hatchback|hatch)\b/i.test(clean)) {
    bodyType = "Hatchback";
  } else if (/\b(?:muv|mpv)\b/i.test(clean)) {
    bodyType = "MUV";
  } else if (/\b(?:scooter|scooters)\b/i.test(clean)) {
    bodyType = "Scooter";
  }

  const hasIntent = Boolean(
    cityName || brandName || modelName || fuelType || bodyType || budget
  );

  return {
    rawQuery,
    cleanQuery: cleanNoUsed,
    vehicleType,
    isTwoWheeler,
    cityName,
    citySlug,
    brandName,
    brandSlug,
    modelName,
    modelSlug,
    fuelType,
    bodyType,
    budget,
    budgetLabel,
    numericPrice,
    budgetSlug,
    hasIntent,
  };
}

/**
 * Resolve canonical SEO Landing URL or filter URL from intent
 */
export function resolveIntentUrl(intent) {
  if (!intent || !intent.hasIntent) {
    return "/search/buy-used-cars";
  }

  // Try standard canonical SEO landing page generation
  const rawSlug = generateSeoSlug({
    brandName: intent.brandName,
    modelName: intent.modelSlug || intent.modelName,
    cityName: intent.cityName,
    budget: intent.budget,
    vehicleType: intent.vehicleType,
    fuelType: intent.fuelType,
    bodyType: intent.bodyType,
  });

  const canonicalRedirect = resolveSearchSlugRedirect(rawSlug);
  const resolvedSlug = canonicalRedirect || rawSlug;

  if (resolvedSlug) {
    return `/search/${resolvedSlug}`;
  }

  // Fallback to query parameters on /search preserving all recognized filters
  const params = new URLSearchParams();
  if (intent.vehicleType === "two-wheelers") params.set("vehicleType", "TWO_WHEELER");
  if (intent.brandName) params.set("brand", intent.brandName);
  if (intent.modelName) params.set("model", intent.modelName);
  if (intent.cityName) params.set("cityName", intent.cityName);
  if (intent.fuelType) params.set("fuelType", intent.fuelType.toUpperCase());
  if (intent.bodyType) params.set("bodyType", intent.bodyType.toUpperCase());
  if (intent.budget) params.set("budget", intent.budget);
  if (intent.numericPrice) params.set("maxPrice", String(intent.numericPrice));

  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search/buy-used-cars";
}

/**
 * Synthesize high-relevance intent suggestions for Left Column
 */
export function synthesizeIntentSuggestions(intent) {
  if (!intent || !intent.hasIntent) return [];

  const items = [];
  const vehicleLabel = intent.isTwoWheeler ? "Bikes" : "Cars";

  // 1. Primary combination
  const primaryUrl = resolveIntentUrl(intent);

  let primaryLabel = "";
  if (intent.brandName && intent.modelName && intent.cityName) {
    primaryLabel = `Used ${intent.brandName} ${intent.modelName} in ${intent.cityName}`;
  } else if (intent.brandName && intent.fuelType && intent.cityName) {
    primaryLabel = `Used ${intent.fuelType} ${intent.brandName} ${vehicleLabel} in ${intent.cityName}`;
  } else if (intent.brandName && intent.fuelType) {
    primaryLabel = `Used ${intent.fuelType} ${intent.brandName} ${vehicleLabel}`;
  } else if (intent.modelName && intent.cityName) {
    primaryLabel = `Used ${intent.modelName} in ${intent.cityName}`;
  } else if (intent.brandName && intent.cityName) {
    primaryLabel = `Used ${intent.brandName} ${vehicleLabel} in ${intent.cityName}`;
  } else if (intent.bodyType && intent.budgetLabel) {
    primaryLabel = `Used ${intent.bodyType}s ${intent.budgetLabel}`;
  } else if (intent.brandName && intent.budgetLabel) {
    primaryLabel = `Used ${intent.brandName} ${vehicleLabel} ${intent.budgetLabel}`;
  } else if (intent.cityName && intent.budgetLabel) {
    primaryLabel = `Used ${vehicleLabel} in ${intent.cityName} ${intent.budgetLabel}`;
  } else if (intent.budgetLabel) {
    primaryLabel = `Used ${vehicleLabel} ${intent.budgetLabel}`;
  } else if (intent.cityName) {
    primaryLabel = `Used ${vehicleLabel} in ${intent.cityName}`;
  } else if (intent.brandName) {
    primaryLabel = `Used ${intent.brandName} ${vehicleLabel}`;
  } else if (intent.fuelType) {
    primaryLabel = `Used ${intent.fuelType} ${vehicleLabel}`;
  }

  if (primaryLabel && primaryUrl) {
    items.push({
      id: `intent_primary_${primaryUrl.replace(/[^a-z0-9]/gi, "_")}`,
      label: primaryLabel,
      type: intent.cityName ? "location" : intent.modelName ? "model" : intent.brandName ? "brand" : "popular",
      link: primaryUrl,
      params: {
        budget: intent.budget,
        maxPrice: intent.numericPrice,
        vehicleType: intent.isTwoWheeler ? "TWO_WHEELER" : "FOUR_WHEELER",
      },
    });
  }

  // 2. Dynamic alternative budget suggestions when budget is present
  if (intent.budget && intent.budgetLabel) {
    if (intent.isTwoWheeler) {
      const altBudgets = [
        { label: "Used Bikes Under ₹50k", slug: "buy-used-two-wheelers-under-50k", budget: "0-0.5", maxPrice: 50000 },
        { label: "Used Scooters Under ₹50k", slug: "buy-used-scooter-two-wheelers-under-50k", budget: "0-0.5", maxPrice: 50000 },
        { label: "Used Bikes Under ₹30k", slug: "buy-used-two-wheelers-under-30k", budget: "0-0.3", maxPrice: 30000 },
      ];
      for (const alt of altBudgets) {
        const altUrl = `/search/${alt.slug}`;
        if (altUrl !== primaryUrl && !items.some((it) => it.link === altUrl)) {
          items.push({
            id: `intent_budget_alt_${alt.slug}`,
            label: alt.label,
            type: "popular",
            link: altUrl,
            params: { budget: alt.budget, maxPrice: alt.maxPrice, vehicleType: "TWO_WHEELER" },
          });
        }
      }
    } else {
      const altBudgets = [
        { label: "Used Cars Under ₹5 Lakhs", slug: "buy-used-cars-under-5-lakhs", budget: "0-5", maxPrice: 500000 },
        { label: "Used Cars Under ₹10 Lakhs", slug: "buy-used-cars-under-10-lakhs", budget: "0-10", maxPrice: 1000000 },
        { label: "Used SUVs Under ₹10 Lakhs", slug: "buy-used-suv-cars-under-10-lakhs", budget: "0-10", maxPrice: 1000000 },
      ];
      for (const alt of altBudgets) {
        const altUrl = `/search/${alt.slug}`;
        if (altUrl !== primaryUrl && !items.some((it) => it.link === altUrl)) {
          items.push({
            id: `intent_budget_alt_${alt.slug}`,
            label: alt.label,
            type: "popular",
            link: altUrl,
            params: { budget: alt.budget, maxPrice: alt.maxPrice, vehicleType: "FOUR_WHEELER" },
          });
        }
      }
    }
  }

  // 3. Brand landing page if brand was recognized
  if (intent.brandName && intent.brandSlug) {
    const brandUrl = `/search/buy-used-${intent.brandSlug}-${intent.vehicleType}`;
    if (brandUrl !== primaryUrl) {
      items.push({
        id: `intent_brand_${intent.brandSlug}`,
        label: `Used ${intent.brandName} ${vehicleLabel}`,
        type: "brand",
        link: brandUrl,
      });
    }
  }

  // 4. Body type fallback
  if (intent.bodyType && !intent.budget) {
    const bodyUrl = `/search/buy-used-${intent.bodyType.toLowerCase()}-${intent.vehicleType}`;
    if (bodyUrl !== primaryUrl) {
      items.push({
        id: `intent_body_${intent.bodyType.toLowerCase()}`,
        label: `Used ${intent.bodyType}s`,
        type: "popular",
        link: bodyUrl,
      });
    }
  }

  return items;
}
