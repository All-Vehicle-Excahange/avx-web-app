/**
 * Location-aware popular search chips for the homepage.
 * Prefer seo_place_links.json for the customer's city; fall back to Gujarat mix.
 */

export const LOCATION_STORAGE_KEY = "avx_selected_location";
export const LOCATION_EVENT = "avx:location-changed";

/** Towns without their own place-links bucket → nearest stocked hub */
export const CITY_ALIASES = {
  chhapi: "palanpur",
  majadar: "palanpur",
  gola: "palanpur",
  bharkawada: "palanpur",
  deesa: "palanpur",
  dessa: "palanpur",
  disa: "palanpur",
  banaskantha: "banas-kantha",
  "banas kantha": "banas-kantha",
  "sg highway": "ahmedabad",
  gota: "ahmedabad",
  bopal: "ahmedabad",
  satellite: "ahmedabad",
  thaltej: "ahmedabad",
  chandkheda: "ahmedabad",
  mehsana: "unjha",
  mahesana: "unjha",
};

/** Multi-city default (Googlebot + users with no location yet) */
export const GUJARAT_FALLBACK_SEARCHES = [
  { label: "Used Cars for Sale", href: "/search/buy-used-cars" },
  { label: "Used Bikes for Sale", href: "/search/buy-used-two-wheelers" },
  { label: "Used Cars in Ahmedabad", href: "/search/buy-used-cars-ahmedabad" },
  { label: "Used Cars in Palanpur", href: "/search/buy-used-cars-palanpur" },
  { label: "Used Cars in Surat", href: "/search/buy-used-cars-surat" },
  { label: "Used Cars in Vadodara", href: "/search/buy-used-cars-vadodara" },
  { label: "Used Cars in Rajkot", href: "/search/buy-used-cars-rajkot" },
  { label: "Used Cars in Visnagar", href: "/search/buy-used-cars-visnagar" },
  { label: "Used Cars in Siddhpur", href: "/search/buy-used-cars-siddhpur" },
  {
    label: "Used Toyota Cars in Ahmedabad",
    href: "/search/buy-used-toyota-cars-ahmedabad",
  },
  {
    label: "Used Hyundai Creta in Palanpur",
    href: "/search/buy-used-hyundai-creta-cars-palanpur",
  },
  {
    label: "Used Bikes in Ahmedabad",
    href: "/search/buy-used-two-wheelers-ahmedabad",
  },
];

export function slugifyPlace(value = "") {
  return String(value)
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Resolve a user-entered city/town to a seo_place_links.json key.
 */
export function resolvePlaceKey(cityName, placeLinks = {}) {
  const raw = slugifyPlace(cityName);
  if (!raw) return null;
  if (placeLinks[raw]?.length) return raw;
  const alias = CITY_ALIASES[raw] || CITY_ALIASES[raw.replace(/-/g, " ")];
  if (alias && placeLinks[alias]?.length) return alias;
  // Partial: "palanpur-gujarat" → palanpur
  for (const key of Object.keys(placeLinks)) {
    if (raw === key || raw.startsWith(`${key}-`) || raw.endsWith(`-${key}`)) {
      return key;
    }
  }
  return null;
}

export function normalizeSearchLinks(items = [], limit = 12) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    if (!item?.href || !item?.label) continue;
    if (seen.has(item.href)) continue;
    seen.add(item.href);
    out.push({ label: String(item.label), href: String(item.href) });
    if (out.length >= limit) break;
  }
  return out;
}

/**
 * Build chips: national anchors + place-specific links from seo_place_links.
 */
export function buildLocationPopularSearches(placeKey, placeLinks = {}) {
  const national = [
    { label: "Used Cars for Sale", href: "/search/buy-used-cars" },
    { label: "Used Bikes for Sale", href: "/search/buy-used-two-wheelers" },
  ];
  const local = Array.isArray(placeLinks[placeKey]) ? placeLinks[placeKey] : [];
  return normalizeSearchLinks([...national, ...local], 14);
}

export function readStoredLocation() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const city = parsed?.city || parsed?.cityName || "";
    if (!city) return null;
    return {
      city: String(city).split(",")[0].trim(),
      state: parsed?.state ? String(parsed.state).trim() : "",
      cityId: parsed?.cityId ?? null,
      stateId: parsed?.stateId ?? null,
    };
  } catch {
    return null;
  }
}

export function persistSelectedLocation({
  city,
  state = "",
  cityId = null,
  stateId = null,
} = {}) {
  if (typeof window === "undefined") return;
  const cityClean = String(city || "")
    .split(",")[0]
    .trim();
  if (!cityClean) return;
  const payload = {
    city: cityClean,
    state: String(state || "").trim(),
    cityId: cityId ?? null,
    stateId: stateId ?? null,
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(payload));
    window.dispatchEvent(
      new CustomEvent(LOCATION_EVENT, { detail: payload }),
    );
  } catch {
    // ignore quota / private mode
  }
}
