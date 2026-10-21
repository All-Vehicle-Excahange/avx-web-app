import {
  parseSearchIntent,
  resolveIntentUrl,
  synthesizeIntentSuggestions,
} from "../src/lib/searchIntent";

describe("Search Intent & SEO URL Resolution", () => {
  test("Scenario 1: 'car in palan' resolves to Cars in Palanpur canonical landing page", () => {
    const intent = parseSearchIntent("car in palan");
    expect(intent.cityName).toBe("Palanpur");
    expect(intent.vehicleType).toBe("cars");
    expect(intent.isTwoWheeler).toBe(false);

    const url = resolveIntentUrl(intent);
    expect(url).toBe("/search/buy-used-cars-palanpur");

    const suggestions = synthesizeIntentSuggestions(intent);
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions[0].label).toBe("Used Cars in Palanpur");
    expect(suggestions[0].link).toBe("/search/buy-used-cars-palanpur");
  });

  test("Scenario 2: 'toyota die' resolves to Toyota Diesel canonical landing page", () => {
    const intent = parseSearchIntent("toyota die");
    expect(intent.brandName).toBe("Toyota");
    expect(intent.fuelType).toBe("Diesel");

    const url = resolveIntentUrl(intent);
    expect(url).toBe("/search/buy-used-diesel-toyota-cars");

    const suggestions = synthesizeIntentSuggestions(intent);
    expect(suggestions.some((s) => s.link === "/search/buy-used-diesel-toyota-cars")).toBe(true);
  });

  test("Scenario 3: 'toyota diesel' resolves to Toyota Diesel canonical landing page", () => {
    const intent = parseSearchIntent("toyota diesel");
    expect(intent.brandName).toBe("Toyota");
    expect(intent.fuelType).toBe("Diesel");

    const url = resolveIntentUrl(intent);
    expect(url).toBe("/search/buy-used-diesel-toyota-cars");
  });

  test("Scenario 4: 'honda city in ahmedabad' resolves to Honda City in Ahmedabad", () => {
    const intent = parseSearchIntent("honda city in ahmedabad");
    expect(intent.brandName).toBe("Honda");
    expect(intent.modelName).toBe("City");
    expect(intent.cityName).toBe("Ahmedabad");

    const url = resolveIntentUrl(intent);
    expect(url).toBe("/search/buy-used-honda-city-cars-ahmedabad");
  });

  test("Scenario 5: 'suv under 5 lakh' resolves to SUVs under 5 Lakh", () => {
    const intent = parseSearchIntent("suv under 5 lakh");
    expect(intent.bodyType).toBe("SUV");
    expect(intent.budget).toBe("0-5");

    const url = resolveIntentUrl(intent);
    expect(url).toBe("/search/buy-used-suv-cars-under-5-lakhs");
  });

  test("Scenario 6: 'toyota diesel in palanpur' multi-filter resolves correctly", () => {
    const intent = parseSearchIntent("toyota diesel in palanpur");
    expect(intent.brandName).toBe("Toyota");
    expect(intent.fuelType).toBe("Diesel");
    expect(intent.cityName).toBe("Palanpur");

    const url = resolveIntentUrl(intent);
    expect(url).toBe("/search/buy-used-diesel-toyota-cars-palanpur");
  });

  test("Scenario 7: 'bikes in palanpur' resolves to two-wheelers in Palanpur", () => {
    const intent = parseSearchIntent("bikes in palanpur");
    expect(intent.isTwoWheeler).toBe(true);
    expect(intent.vehicleType).toBe("two-wheelers");
    expect(intent.cityName).toBe("Palanpur");

    const url = resolveIntentUrl(intent);
    expect(url).toBe("/search/buy-used-two-wheelers-palanpur");
  });

  describe("Indian Budget Queries Normalization & Landing Page Resolution", () => {
    test("'under 10 lakh' normalizes to ₹10,00,000 and resolves to /search/buy-used-cars-under-10-lakhs", () => {
      const intent = parseSearchIntent("under 10 lakh");
      expect(intent.numericPrice).toBe(1000000);
      expect(intent.budget).toBe("0-10");
      expect(intent.budgetLabel).toBe("Under ₹10 Lakhs");
      expect(resolveIntentUrl(intent)).toBe("/search/buy-used-cars-under-10-lakhs");

      const suggestions = synthesizeIntentSuggestions(intent);
      expect(suggestions[0].label).toBe("Used Cars Under ₹10 Lakhs");
      expect(suggestions[0].link).toBe("/search/buy-used-cars-under-10-lakhs");
    });

    test("'under 30k' normalizes to ₹30,000, infers two-wheelers, and resolves to /search/buy-used-two-wheelers-under-30k", () => {
      const intent = parseSearchIntent("under 30k");
      expect(intent.numericPrice).toBe(30000);
      expect(intent.budget).toBe("0-0.3");
      expect(intent.isTwoWheeler).toBe(true);
      expect(resolveIntentUrl(intent)).toBe("/search/buy-used-two-wheelers-under-30k");

      const suggestions = synthesizeIntentSuggestions(intent);
      expect(suggestions[0].label).toBe("Used Bikes Under ₹30k");
      expect(suggestions[0].link).toBe("/search/buy-used-two-wheelers-under-30k");
    });

    test("'cars under 5 lakh' normalizes to ₹5,00,000 and resolves to /search/buy-used-cars-under-5-lakhs", () => {
      const intent = parseSearchIntent("cars under 5 lakh");
      expect(intent.numericPrice).toBe(500000);
      expect(intent.budget).toBe("0-5");
      expect(intent.vehicleType).toBe("cars");
      expect(resolveIntentUrl(intent)).toBe("/search/buy-used-cars-under-5-lakhs");

      const suggestions = synthesizeIntentSuggestions(intent);
      expect(suggestions[0].label).toBe("Used Cars Under ₹5 Lakhs");
      expect(suggestions[0].link).toBe("/search/buy-used-cars-under-5-lakhs");
    });

    test("'car below 10 lakhs' normalizes to ₹10,00,000 and resolves to /search/buy-used-cars-under-10-lakhs", () => {
      const intent = parseSearchIntent("car below 10 lakhs");
      expect(intent.numericPrice).toBe(1000000);
      expect(intent.budget).toBe("0-10");
      expect(intent.vehicleType).toBe("cars");
      expect(resolveIntentUrl(intent)).toBe("/search/buy-used-cars-under-10-lakhs");
    });

    test("'bike under 50k' normalizes to ₹50,000 and resolves to /search/buy-used-two-wheelers-under-50k", () => {
      const intent = parseSearchIntent("bike under 50k");
      expect(intent.numericPrice).toBe(50000);
      expect(intent.budget).toBe("0-0.5");
      expect(intent.isTwoWheeler).toBe(true);
      expect(resolveIntentUrl(intent)).toBe("/search/buy-used-two-wheelers-under-50k");

      const suggestions = synthesizeIntentSuggestions(intent);
      expect(suggestions[0].label).toBe("Used Bikes Under ₹50k");
      expect(suggestions[0].link).toBe("/search/buy-used-two-wheelers-under-50k");
    });

    test("'budget 5 lakh' normalizes to ₹5,00,000 and resolves to /search/buy-used-cars-under-5-lakhs", () => {
      const intent = parseSearchIntent("budget 5 lakh");
      expect(intent.numericPrice).toBe(500000);
      expect(intent.budget).toBe("0-5");
      expect(resolveIntentUrl(intent)).toBe("/search/buy-used-cars-under-5-lakhs");
    });

    test("'used cars under 10 lakh' normalizes to ₹10,00,000 and resolves to /search/buy-used-cars-under-10-lakhs", () => {
      const intent = parseSearchIntent("used cars under 10 lakh");
      expect(intent.numericPrice).toBe(1000000);
      expect(intent.budget).toBe("0-10");
      expect(intent.vehicleType).toBe("cars");
      expect(resolveIntentUrl(intent)).toBe("/search/buy-used-cars-under-10-lakhs");
    });
  });
});
