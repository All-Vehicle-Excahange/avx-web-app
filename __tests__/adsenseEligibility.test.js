import {
  ADSENSE_LOADER_PREFIXES,
  MIN_ADSENSE_LISTINGS,
  MIN_BLOG_AD_CONTENT_CHARS,
  isAdSenseLoaderPath,
  isBlogAdEligible,
  isSearchLandingAdEligible,
} from "../src/lib/adsenseEligibility";

describe("adsenseEligibility", () => {
  test("MIN_ADSENSE_LISTINGS is 5", () => {
    expect(MIN_ADSENSE_LISTINGS).toBe(5);
  });

  test("loader prefixes exclude auto-consultant and include blog", () => {
    expect(ADSENSE_LOADER_PREFIXES).not.toContain("/auto-consultant");
    expect(ADSENSE_LOADER_PREFIXES).toContain("/blog");
    expect(isAdSenseLoaderPath("/auto-consultant/aabadmotors")).toBe(false);
    expect(isAdSenseLoaderPath("/")).toBe(true);
    expect(isAdSenseLoaderPath("/search/buy-used-cars")).toBe(true);
    expect(isAdSenseLoaderPath("/vehicle/details/foo/1")).toBe(true);
    expect(isAdSenseLoaderPath("/blog")).toBe(true);
    expect(isAdSenseLoaderPath("/blog/how-to-buy-used-car-safely-india")).toBe(
      true,
    );
  });

  test("ads require stocked non-noindex pages at min listings", () => {
    expect(
      isSearchLandingAdEligible({
        noindex: false,
        totalCount: 4,
        minListings: MIN_ADSENSE_LISTINGS,
      }),
    ).toBe(false);
    expect(
      isSearchLandingAdEligible({
        noindex: false,
        totalCount: 5,
        minListings: MIN_ADSENSE_LISTINGS,
      }),
    ).toBe(true);
    expect(
      isSearchLandingAdEligible({
        noindex: true,
        totalCount: 20,
        minListings: MIN_ADSENSE_LISTINGS,
      }),
    ).toBe(false);
  });

  test("blog ads require substantial content length", () => {
    expect(MIN_BLOG_AD_CONTENT_CHARS).toBe(1200);
    expect(isBlogAdEligible(null)).toBe(false);
    expect(isBlogAdEligible({ content: "short stub" })).toBe(false);
    expect(
      isBlogAdEligible({ content: "x".repeat(MIN_BLOG_AD_CONTENT_CHARS) }),
    ).toBe(true);
    expect(
      isBlogAdEligible({ content: "x".repeat(500) }, { minChars: 400 }),
    ).toBe(true);
  });
});
