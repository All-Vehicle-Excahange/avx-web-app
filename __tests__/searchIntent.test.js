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

  describe("Model + Location Search Resolution", () => {
    test("'creta in palan' auto-detects Hyundai brand and Palanpur city", () => {
      const intent = parseSearchIntent("creta in palan");
      expect(intent.brandName).toBe("Hyundai");
      expect(intent.modelName).toBe("Creta");
      expect(intent.cityName).toBe("Palanpur");

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-hyundai-creta-cars-palanpur");

      const suggestions = synthesizeIntentSuggestions(intent);
      expect(suggestions[0].label).toBe("Used Hyundai Creta in Palanpur");
      expect(suggestions[0].link).toBe("/search/buy-used-hyundai-creta-cars-palanpur");
    });

    test("'creta in palanpur' resolves to Used Hyundai Creta in Palanpur", () => {
      const intent = parseSearchIntent("creta in palanpur");
      expect(intent.brandName).toBe("Hyundai");
      expect(intent.modelName).toBe("Creta");
      expect(intent.cityName).toBe("Palanpur");

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-hyundai-creta-cars-palanpur");
    });

    test("'used car in palanpur' resolves to /search/buy-used-cars-palanpur", () => {
      const intent = parseSearchIntent("used car in palanpur");
      expect(intent.cityName).toBe("Palanpur");
      expect(intent.vehicleType).toBe("cars");

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-cars-palanpur");
    });

    test("'scorpio in ahmedabad' auto-detects Mahindra and Ahmedabad", () => {
      const intent = parseSearchIntent("scorpio in ahmedabad");
      expect(intent.brandName).toBe("Mahindra");
      expect(intent.modelName).toBe("Scorpio");
      expect(intent.cityName).toBe("Ahmedabad");

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-mahindra-scorpio-cars-ahmedabad");
    });

    test("'thar in ahmedabad' auto-detects Mahindra Thar and Ahmedabad", () => {
      const intent = parseSearchIntent("thar in ahmedabad");
      expect(intent.brandName).toBe("Mahindra");
      expect(intent.modelName).toBe("Thar");
      expect(intent.cityName).toBe("Ahmedabad");

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-mahindra-thar-cars-ahmedabad");
    });

    test("'thar roxx in ahmedabad' auto-detects Mahindra Thar Roxx and Ahmedabad", () => {
      const intent = parseSearchIntent("thar roxx in ahmedabad");
      expect(intent.brandName).toBe("Mahindra");
      expect(intent.modelName).toBe("Thar Roxx");
      expect(intent.cityName).toBe("Ahmedabad");

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-mahindra-thar-roxx-cars-ahmedabad");
    });

    test("'thar' search resolves ONLY to Mahindra Thar and NEVER falsely applies Tharad city filter", () => {
      const intent = parseSearchIntent("thar");
      expect(intent.brandName).toBe("Mahindra");
      expect(intent.modelName).toBe("Thar");
      expect(intent.cityName).toBeNull();

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-mahindra-thar-cars");

      const suggestions = synthesizeIntentSuggestions(intent);
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions[0].label).toBe("Used Mahindra Thar");
      expect(suggestions[0].link).toBe("/search/buy-used-mahindra-thar-cars");
      // Must not contain Tharad anywhere
      expect(suggestions.some((s) => /tharad/i.test(s.label) || /tharad/i.test(s.link))).toBe(false);
    });

    test("'tharad' alone resolves to Tharad city landing page without vehicle model", () => {
      const intent = parseSearchIntent("tharad");
      expect(intent.cityName).toBe("Tharad");
      expect(intent.modelName).toBeNull();

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-cars-tharad");
    });

    test("'thar in tharad' resolves to Mahindra Thar in Tharad when explicitly requested", () => {
      const intent = parseSearchIntent("thar in tharad");
      expect(intent.brandName).toBe("Mahindra");
      expect(intent.modelName).toBe("Thar");
      expect(intent.cityName).toBe("Tharad");

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-mahindra-thar-cars-tharad");
    });
  });

  describe("Two-Wheeler Intent & Strict Four-Wheeler Isolation", () => {
    test("'activa' resolves to Honda Activa two-wheelers with makerId 15011", () => {
      const intent = parseSearchIntent("activa");
      expect(intent.isTwoWheeler).toBe(true);
      expect(intent.vehicleType).toBe("two-wheelers");
      expect(intent.brandName).toBe("Honda");
      expect(intent.makerId).toBe(15011);
      expect(intent.modelName).toBe("Activa");

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-honda-activa-two-wheelers");

      const suggestions = synthesizeIntentSuggestions(intent);
      expect(suggestions[0].label).toBe("Used Honda Activa");
      expect(suggestions[0].link).toBe("/search/buy-used-honda-activa-two-wheelers");
    });

    test("'shine' resolves to Honda Shine two-wheelers with makerId 15011", () => {
      const intent = parseSearchIntent("shine");
      expect(intent.isTwoWheeler).toBe(true);
      expect(intent.vehicleType).toBe("two-wheelers");
      expect(intent.brandName).toBe("Honda");
      expect(intent.makerId).toBe(15011);
      expect(intent.modelName).toBe("Shine");

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-honda-shine-two-wheelers");
    });

    test("'access 125' resolves to Suzuki Access 125 two-wheelers with makerId 15020", () => {
      const intent = parseSearchIntent("access 125");
      expect(intent.isTwoWheeler).toBe(true);
      expect(intent.vehicleType).toBe("two-wheelers");
      expect(intent.brandName).toBe("Suzuki");
      expect(intent.makerId).toBe(15020);

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-suzuki-access-125-two-wheelers");
    });

    test("'jupiter' resolves to TVS Jupiter two-wheelers with makerId 15021", () => {
      const intent = parseSearchIntent("jupiter");
      expect(intent.isTwoWheeler).toBe(true);
      expect(intent.vehicleType).toBe("two-wheelers");
      expect(intent.brandName).toBe("TVS");
      expect(intent.makerId).toBe(15021);

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-tvs-jupiter-two-wheelers");
    });

    test("'pulsar' resolves to Bajaj Pulsar two-wheelers with makerId 15005", () => {
      const intent = parseSearchIntent("pulsar");
      expect(intent.isTwoWheeler).toBe(true);
      expect(intent.vehicleType).toBe("two-wheelers");
      expect(intent.brandName).toBe("Bajaj");
      expect(intent.makerId).toBe(15005);

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-bajaj-pulsar-two-wheelers");
    });

    test("'splendor' resolves to Hero Splendor two-wheelers with makerId 15010", () => {
      const intent = parseSearchIntent("splendor");
      expect(intent.isTwoWheeler).toBe(true);
      expect(intent.vehicleType).toBe("two-wheelers");
      expect(intent.brandName).toBe("Hero");
      expect(intent.makerId).toBe(15010);

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-hero-splendor-two-wheelers");
    });

    test("'r15' resolves to Yamaha R15 two-wheelers with makerId 15024", () => {
      const intent = parseSearchIntent("r15");
      expect(intent.isTwoWheeler).toBe(true);
      expect(intent.vehicleType).toBe("two-wheelers");
      expect(intent.brandName).toBe("Yamaha");
      expect(intent.makerId).toBe(15024);

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-yamaha-r15-two-wheelers");
    });

    test("Four-Wheeler Honda regression check: 'honda city' stays Cars with makerId 14", () => {
      const intent = parseSearchIntent("honda city");
      expect(intent.isTwoWheeler).toBe(false);
      expect(intent.vehicleType).toBe("cars");
      expect(intent.brandName).toBe("Honda");
      expect(intent.makerId).toBe(14);
      expect(intent.modelName).toBe("City");

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-honda-city-cars");
    });

    test("Four-Wheeler Creta regression check: 'creta' stays Cars with makerId 15", () => {
      const intent = parseSearchIntent("creta");
      expect(intent.isTwoWheeler).toBe(false);
      expect(intent.vehicleType).toBe("cars");
      expect(intent.brandName).toBe("Hyundai");
      expect(intent.makerId).toBe(15);
      expect(intent.modelName).toBe("Creta");

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-hyundai-creta-cars");
    });

    test("Two-Wheeler Pure Brand: 'hero' resolves to Hero two-wheelers with makerId 15010 and 'Used Hero Bikes'", () => {
      const intent = parseSearchIntent("hero");
      expect(intent.isTwoWheeler).toBe(true);
      expect(intent.vehicleType).toBe("two-wheelers");
      expect(intent.brandName).toBe("Hero");
      expect(intent.makerId).toBe(15010);

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-hero-two-wheelers");

      const suggestions = synthesizeIntentSuggestions(intent);
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions[0].label).toBe("Used Hero Bikes");
      expect(suggestions[0].link).toBe("/search/buy-used-hero-two-wheelers");
    });

    test("Two-Wheeler Pure Brand: 'ktm' resolves to KTM two-wheelers with makerId 15014", () => {
      const intent = parseSearchIntent("ktm");
      expect(intent.isTwoWheeler).toBe(true);
      expect(intent.vehicleType).toBe("two-wheelers");
      expect(intent.brandName).toBe("KTM");
      expect(intent.makerId).toBe(15014);

      const url = resolveIntentUrl(intent);
      expect(url).toBe("/search/buy-used-ktm-two-wheelers");

      const suggestions = synthesizeIntentSuggestions(intent);
      expect(suggestions[0].label).toBe("Used KTM Bikes");
    });

    test("Two-Wheeler Pure Brands: 'tvs', 'bajaj', 'royal enfield', 'yamaha' resolve to two-wheelers", () => {
      const tvs = parseSearchIntent("tvs");
      expect(tvs.isTwoWheeler).toBe(true);
      expect(tvs.brandName).toBe("TVS");
      expect(tvs.makerId).toBe(15021);
      expect(resolveIntentUrl(tvs)).toBe("/search/buy-used-tvs-two-wheelers");

      const bajaj = parseSearchIntent("bajaj");
      expect(bajaj.isTwoWheeler).toBe(true);
      expect(bajaj.brandName).toBe("Bajaj");
      expect(bajaj.makerId).toBe(15005);
      expect(resolveIntentUrl(bajaj)).toBe("/search/buy-used-bajaj-two-wheelers");

      const re = parseSearchIntent("royal enfield");
      expect(re.isTwoWheeler).toBe(true);
      expect(re.brandName).toBe("Royal Enfield");
      expect(re.makerId).toBe(15019);
      expect(resolveIntentUrl(re)).toBe("/search/buy-used-royal-enfield-two-wheelers");

      const yamaha = parseSearchIntent("yamaha");
      expect(yamaha.isTwoWheeler).toBe(true);
      expect(yamaha.brandName).toBe("Yamaha");
      expect(yamaha.makerId).toBe(15024);
      expect(resolveIntentUrl(yamaha)).toBe("/search/buy-used-yamaha-two-wheelers");
    });

    test("SEO redirect: 'buy-used-hero-cars' and 'buy-used-ktm-cars' redirect to -two-wheelers", () => {
      const { resolveSearchSlugRedirect } = require("../src/lib/searchLandingSeo");
      expect(resolveSearchSlugRedirect("buy-used-hero-cars")).toBe("buy-used-hero-two-wheelers");
      expect(resolveSearchSlugRedirect("buy-used-hero-cars-ahmedabad")).toBe("buy-used-hero-two-wheelers-ahmedabad");
      expect(resolveSearchSlugRedirect("buy-used-ktm-cars")).toBe("buy-used-ktm-two-wheelers");
      expect(resolveSearchSlugRedirect("buy-used-bajaj-cars")).toBe("buy-used-bajaj-two-wheelers");
      expect(resolveSearchSlugRedirect("buy-used-royal-enfield-cars")).toBe("buy-used-royal-enfield-two-wheelers");
    });
  });
});
