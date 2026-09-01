/**
 * Target keywords for GSC rank tracking and 90-day SEO KPI dashboard.
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

export const SEO_TARGET_KEYWORDS = [
  {
    keyword: "used cars",
    scope: "Ahmedabad",
    page: "/search/buy-used-cars-ahmedabad",
    page1Goal: "Top 10",
    horizonMonths: 12,
  },
  {
    keyword: "used car in palanpur",
    scope: "Palanpur",
    page: "/search/buy-used-cars-palanpur",
    page1Goal: "Top 5",
    horizonMonths: 3,
  },
  {
    keyword: "used creta",
    scope: "Palanpur, Ahmedabad",
    page: "/search/buy-used-hyundai-creta-cars-palanpur",
    page1Goal: "Top 3",
    horizonMonths: 3,
  },
  {
    keyword: "used toyota cars",
    scope: "Gujarat",
    page: "/search/buy-used-toyota-cars",
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
    keyword: "used honda amaze",
    scope: "Palanpur",
    page: "/search/buy-used-honda-amaze-cars-palanpur",
    page1Goal: "Top 5",
    horizonMonths: 6,
  },
];
