/**
 * Target keywords for GSC / Semrush Position Tracking (Gujarat GEO fasttrack).
 * Prefer inventoriable long-tail over Cars24 national head terms.
 * Sync Semrush Position Tracking to this list (30–50 winnable queries).
 */
export const SEO_KPI_TARGETS = {
  periodDays: 90,
  baseline: {
    organicSessions: 570,
    organicNewUsers: 100,
    viewSearchResults: 3,
    inquiries: 49,
    page404Views: 95,
    referringDomains: 58,
    authorityScore: 7,
  },
  goals: {
    organicSessions: 1500,
    organicNewUsers: 400,
    organicNewUserPct: 10,
    viewSearchResults: 500,
    organicInquiries: 50,
    page404Views: 20,
    indexedQualityPages: 200,
    blogOrganicMonthly: 100,
    referringDomains: 80,
    midTailPage1Or2Wins: 5,
  },
};

/** Acceptance / Gemini smoke tests */
export const SEO_ACCEPTANCE_KEYWORDS = [
  {
    keyword: "used creta in palanpur",
    scope: "Palanpur",
    page: "/search/buy-used-hyundai-creta-cars-palanpur",
    page1Goal: "Top 3",
    horizonMonths: 3,
    aiRetest: true,
  },
  {
    keyword: "used creta near me",
    scope: "Local / Palanpur intent",
    page: "/search/buy-used-hyundai-creta-cars-palanpur",
    page1Goal: "Top 10",
    horizonMonths: 6,
    aiRetest: true,
  },
];

/**
 * Winnable Gujarat GEO matrix — track these in Semrush Position Tracking.
 * Do NOT judge success by Cars24 Keyword Gap national wins.
 */
export const SEO_TARGET_KEYWORDS = [
  ...SEO_ACCEPTANCE_KEYWORDS,

  // City hubs (focus cities)
  {
    keyword: "used car in palanpur",
    scope: "Palanpur",
    page: "/search/buy-used-cars-palanpur",
    page1Goal: "Top 5",
    horizonMonths: 3,
  },
  {
    keyword: "used cars palanpur",
    scope: "Palanpur",
    page: "/search/buy-used-cars-palanpur",
    page1Goal: "Top 5",
    horizonMonths: 3,
  },
  {
    keyword: "used cars in siddhpur",
    scope: "Siddhpur",
    page: "/search/buy-used-cars-siddhpur",
    page1Goal: "Top 10",
    horizonMonths: 4,
  },
  {
    keyword: "used cars in kanodar",
    scope: "Kanodar",
    page: "/search/buy-used-cars-kanodar",
    page1Goal: "Top 10",
    horizonMonths: 4,
  },
  {
    keyword: "used cars in visnagar",
    scope: "Visnagar",
    page: "/search/buy-used-cars-visnagar",
    page1Goal: "Top 10",
    horizonMonths: 4,
  },
  {
    keyword: "used cars",
    scope: "Ahmedabad",
    page: "/search/buy-used-cars-ahmedabad",
    page1Goal: "Top 10",
    horizonMonths: 12,
  },
  {
    keyword: "used cars in surat",
    scope: "Surat",
    page: "/search/buy-used-cars-surat",
    page1Goal: "Top 15",
    horizonMonths: 12,
  },

  // Model × city (inventory-backed)
  {
    keyword: "used hyundai creta palanpur",
    scope: "Palanpur",
    page: "/search/buy-used-hyundai-creta-cars-palanpur",
    page1Goal: "Top 3",
    horizonMonths: 3,
    aiRetest: true,
  },
  {
    keyword: "used creta kanodar",
    scope: "Kanodar",
    page: "/search/buy-used-hyundai-creta-cars-kanodar",
    page1Goal: "Top 10",
    horizonMonths: 4,
  },
  {
    keyword: "used ertiga visnagar",
    scope: "Visnagar",
    page: "/search/buy-used-maruti-suzuki-ertiga-cars-visnagar",
    page1Goal: "Top 10",
    horizonMonths: 4,
  },
  {
    keyword: "used santro xing siddhpur",
    scope: "Siddhpur",
    page: "/search/buy-used-hyundai-santro-xing-cars-siddhpur",
    page1Goal: "Top 10",
    horizonMonths: 4,
  },
  {
    keyword: "used wagon r palanpur",
    scope: "Palanpur",
    page: "/search/buy-used-maruti-suzuki-wagon-r-10-cars-palanpur",
    page1Goal: "Top 10",
    horizonMonths: 4,
  },
  {
    keyword: "used celerio siddhpur",
    scope: "Siddhpur",
    page: "/search/buy-used-maruti-suzuki-celerio-cars-siddhpur",
    page1Goal: "Top 10",
    horizonMonths: 4,
  },
  {
    keyword: "used alto k10 siddhpur",
    scope: "Siddhpur",
    page: "/search/buy-used-maruti-suzuki-alto-k10-cars-siddhpur",
    page1Goal: "Top 10",
    horizonMonths: 4,
  },
  {
    keyword: "used swift in ahmedabad",
    scope: "Ahmedabad",
    page: "/search/buy-used-maruti-suzuki-swift-cars-ahmedabad",
    page1Goal: "Top 10",
    horizonMonths: 6,
    aiRetest: true,
  },
  {
    keyword: "used honda city in surat",
    scope: "Surat",
    page: "/search/buy-used-honda-city-cars-surat",
    page1Goal: "Top 10",
    horizonMonths: 6,
    aiRetest: true,
  },
  {
    keyword: "used honda amaze palanpur",
    scope: "Palanpur",
    page: "/search/buy-used-honda-amaze-cars-palanpur",
    page1Goal: "Top 5",
    horizonMonths: 6,
  },
  {
    keyword: "used toyota cars",
    scope: "Gujarat",
    page: "/search/buy-used-toyota-cars",
    page1Goal: "Top 5",
    horizonMonths: 6,
  },

  // Two-wheelers
  {
    keyword: "used bikes",
    scope: "Ahmedabad",
    page: "/search/buy-used-two-wheelers-ahmedabad",
    page1Goal: "Top 5",
    horizonMonths: 6,
  },
  {
    keyword: "used bike",
    scope: "India",
    page: "/search/buy-used-two-wheelers",
    page1Goal: "Top 5",
    horizonMonths: 6,
  },

  // Storefront / consultant
  {
    keyword: "auto consultant palanpur",
    scope: "Palanpur storefronts",
    page: "/auto-consultant/aabadmotors",
    page1Goal: "Top 10",
    horizonMonths: 6,
    aiRetest: true,
  },
  {
    keyword: "aabad motors palanpur",
    scope: "Palanpur",
    page: "/auto-consultant/aabadmotors",
    page1Goal: "Top 5",
    horizonMonths: 4,
    aiRetest: true,
  },

  // Long-horizon national benchmarks only (expect Cars24 to keep winning)
  {
    keyword: "used cars",
    scope: "National",
    page: "/search/buy-used-cars",
    page1Goal: "Top 20",
    horizonMonths: 12,
    longHorizon: true,
  },
  {
    keyword: "second hand cars",
    scope: "India",
    page: "/",
    page1Goal: "Top 15",
    horizonMonths: 12,
    longHorizon: true,
  },
  {
    keyword: "buy used car",
    scope: "National",
    page: "/search/buy-used-cars",
    page1Goal: "Top 30",
    horizonMonths: 18,
    longHorizon: true,
  },
];

/** Query classes for GSC filters */
export const SEO_QUERY_CLASSES = [
  "used {model} {city}",
  "used {brand} {city}",
  "used {model} near me",
  "used {brand} near {city}",
  "second hand {model} {city}",
  "auto consultant {city}",
  "{consultant name} used cars",
];

/** Gujarat focus cities for Semrush + ops */
export const SEO_FOCUS_CITIES = [
  "Palanpur",
  "Ahmedabad",
  "Surat",
  "Siddhpur",
  "Visnagar",
  "Kanodar",
];
