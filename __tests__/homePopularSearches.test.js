import {
  resolvePlaceKey,
  buildLocationPopularSearches,
  slugifyPlace,
  CITY_ALIASES,
} from "@/lib/homePopularSearches";

describe("homePopularSearches", () => {
  const placeLinks = {
    palanpur: [
      { label: "Used cars in Palanpur", href: "/search/buy-used-cars-palanpur" },
      { label: "Used Creta in Palanpur", href: "/search/buy-used-hyundai-creta-cars-palanpur" },
    ],
    ahmedabad: [
      { label: "Used cars in Ahmedabad", href: "/search/buy-used-cars-ahmedabad" },
    ],
    visnagar: [
      { label: "Used cars in Visnagar", href: "/search/buy-used-cars-visnagar" },
    ],
  };

  test("slugifyPlace strips state suffix", () => {
    expect(slugifyPlace("Palanpur, Gujarat")).toBe("palanpur");
  });

  test("aliases map chhapi and deesa to palanpur", () => {
    expect(CITY_ALIASES.chhapi).toBe("palanpur");
    expect(CITY_ALIASES.deesa).toBe("palanpur");
    expect(resolvePlaceKey("Chhapi", placeLinks)).toBe("palanpur");
    expect(resolvePlaceKey("Deesa", placeLinks)).toBe("palanpur");
  });

  test("resolves ahmedabad and visnagar directly", () => {
    expect(resolvePlaceKey("Ahmedabad", placeLinks)).toBe("ahmedabad");
    expect(resolvePlaceKey("Visnagar, Gujarat", placeLinks)).toBe("visnagar");
  });

  test("buildLocationPopularSearches prefixes national hubs", () => {
    const links = buildLocationPopularSearches("palanpur", placeLinks);
    expect(links[0].href).toBe("/search/buy-used-cars");
    expect(links.some((l) => l.href.includes("palanpur"))).toBe(true);
  });
});
