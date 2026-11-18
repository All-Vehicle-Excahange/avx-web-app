import {
  PRESS_CATEGORIES,
  INITIAL_MEDIA_ENTRIES,
  RECOGNISED_PUBLICATIONS,
  SOCIAL_UPDATES,
  getPublishedArticles,
  getFeaturedArticle,
  getRegularArticles,
} from "@/data/pressMediaData";

describe("Press & Media Data Layer", () => {
  test("defines all 6 canonical press categories", () => {
    expect(PRESS_CATEGORIES).toEqual([
      "All",
      "Founder Stories",
      "Brand Features",
      "Interviews",
      "Press Releases",
      "Videos & Podcasts",
    ]);
  });

  test("contains published entries for Startup Times and INC91", () => {
    const published = getPublishedArticles(INITIAL_MEDIA_ENTRIES);
    expect(published.length).toBeGreaterThanOrEqual(2);

    const startupTimes = published.find(
      (item) => item.id === "startup-times-anas-loriya"
    );
    expect(startupTimes).toBeDefined();
    expect(startupTimes.publicationName).toBe("Startup Times");
    expect(startupTimes.category).toBe("Founder Stories");
    expect(startupTimes.featured).toBe(true);
    expect(startupTimes.externalUrl).toContain("startuptimes.net");

    const inc91 = published.find(
      (item) => item.id === "inc91-reecomm-digital-marketplace"
    );
    expect(inc91).toBeDefined();
    expect(inc91.publicationName).toBe("INC91");
    expect(inc91.category).toBe("Brand Features");
    expect(inc91.featured).toBe(false);
    expect(inc91.externalUrl).toContain("inc91.com");
  });

  test("getFeaturedArticle returns Startup Times founder story as primary", () => {
    const featured = getFeaturedArticle(INITIAL_MEDIA_ENTRIES);
    expect(featured).toBeDefined();
    expect(featured.id).toBe("startup-times-anas-loriya");
    expect(featured.featured).toBe(true);
  });

  test("getRegularArticles excludes the featured article to prevent duplication", () => {
    const featured = getFeaturedArticle(INITIAL_MEDIA_ENTRIES);
    const regular = getRegularArticles(INITIAL_MEDIA_ENTRIES, featured.id);

    expect(regular.some((item) => item.id === featured.id)).toBe(false);
    expect(regular.length).toBe(INITIAL_MEDIA_ENTRIES.length - 1);
    expect(regular[0].id).toBe("inc91-reecomm-digital-marketplace");
  });

  test("contains verified publications and social channels", () => {
    expect(RECOGNISED_PUBLICATIONS.length).toBe(2);
    expect(RECOGNISED_PUBLICATIONS[0].name).toBe("Startup Times");
    expect(RECOGNISED_PUBLICATIONS[1].name).toBe("INC91");

    const linkedin = SOCIAL_UPDATES.find((item) => item.platform === "LinkedIn");
    expect(linkedin).toBeDefined();
    expect(linkedin.url).toContain("linkedin.com/company/reecomm");
  });
});
