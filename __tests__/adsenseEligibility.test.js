import {
  ADSENSE_LOADER_PREFIXES,
  MIN_ADSENSE_LISTINGS,
  isAdSenseLoaderPath,
  isSearchLandingAdEligible,
} from "@/lib/adsenseEligibility";

describe("adsenseEligibility", () => {
  test("MIN_ADSENSE_LISTINGS is 5", () => {
    expect(MIN_ADSENSE_LISTINGS).toBe(5);
  });

  test("loader prefixes exclude auto-consultant", () => {
    expect(ADSENSE_LOADER_PREFIXES).not.toContain("/auto-consultant");
    expect(isAdSenseLoaderPath("/auto-consultant/aabadmotors")).toBe(false);
    expect(isAdSenseLoaderPath("/")).toBe(true);
    expect(isAdSenseLoaderPath("/search/buy-used-cars")).toBe(true);
    expect(isAdSenseLoaderPath("/vehicle/details/foo/1")).toBe(true);
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
});
