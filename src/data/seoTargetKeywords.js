/**
 * Target keywords for GSC rank tracking and SEO / GEO KPI dashboard.
 * Rolling matrix: head terms + brand×model×city + near-me + storefronts.
 * Track weekly in Google Search Console → Performance → Search results.
 */
export const SEO_KPI_TARGETS = {
  periodDays: 90,
  baseline: {
    organicSessions: 570,
    organicNewUsers: 100,
    viewSearchResults: 3,
    inquiries: 49,
    page404Views: 95,
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
  },
};

/** Acceptance / hero queries (Creta × Palanpur remains the Gemini smoke test). */
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
 * Static seed matrix. Expand monthly from `seo_popular_links.json` /
 * search_index inventory counts (top models × cities + top storefronts).
 */
export const SEO_TARGET_KEYWORDS = [
  ...SEO_ACCEPTANCE_KEYWORDS,
  {
    keyword: "used car in palanpur",
    scope: "Palanpur",
    page: "/search/buy-used-cars-palanpur",
    page1Goal: "Top 5",
    horizonMonths: 3,
  },
  {
    keyword: "used cars",
    scope: "Ahmedabad",
    page: "/search/buy-used-cars-ahmedabad",
    page1Goal: "Top 10",
    horizonMonths: 12,
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
    keyword: "used toyota cars",
    scope: "Gujarat",
    page: "/search/buy-used-toyota-cars",
    page1Goal: "Top 5",
    horizonMonths: 6,
  },
  {
    keyword: "used honda amaze",
    scope: "Palanpur",
    page: "/search/buy-used-honda-amaze-cars-palanpur",
    page1Goal: "Top 5",
    horizonMonths: 6,
  },
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
  {
    keyword: "used cars",
    scope: "National",
    page: "/search/buy-used-cars",
    page1Goal: "Top 20",
    horizonMonths: 12,
  },
  {
    keyword: "second hand cars",
    scope: "India",
    page: "/",
    page1Goal: "Top 15",
    horizonMonths: 12,
  },
  {
    keyword: "auto consultant palanpur",
    scope: "Palanpur storefronts",
    page: "/auto-consultant/aabadmotors",
    page1Goal: "Top 10",
    horizonMonths: 6,
    aiRetest: true,
  },
];

/** Query classes to sample from GSC (filter / regex). */
export const SEO_QUERY_CLASSES = [
  "used {model} {city}",
  "used {brand} {city}",
  "used {model} near me",
  "used {brand} near {city}",
  "second hand {model} {city}",
  "auto consultant {city}",
  "{consultant name} used cars",
];
