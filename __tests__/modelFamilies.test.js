import {
  MODEL_FAMILIES,
  findModelFamily,
  findModelFamilyBySlugSegment,
  detectFamilyFromSelection,
  isModelFamilySelection,
} from "../src/data/modelFamilies";

describe("Model Families: Common Name vs Particular Name Resolution", () => {
  describe("Thar vs Thar Roxx", () => {
    test("Common name 'thar' selects Mahindra and ALL Thar models (Thar & Thar Roxx)", () => {
      const family = findModelFamily("thar");
      expect(family).not.toBeNull();
      expect(family.brandName).toBe("Mahindra");
      expect(family.key).toBe("thar");

      const modelIds = family.models.map((m) => m.modelId);
      expect(modelIds).toEqual(expect.arrayContaining([128, 714]));
      expect(modelIds).toHaveLength(2);
    });

    test("Particular name 'thar roxx' selects ONLY Thar Roxx (714) and NOT base Thar (128)", () => {
      const family = findModelFamily("thar roxx");
      expect(family).not.toBeNull();
      expect(family.key).toBe("thar-roxx");
      expect(family.familyName).toBe("Thar Roxx");
      expect(family.targetUrl).toBe("/search/buy-used-mahindra-thar-roxx-cars");

      const modelIds = family.models.map((m) => m.modelId);
      expect(modelIds).toEqual([714]);
      expect(modelIds).not.toContain(128);
    });

    test("Particular alias 'roxx' selects ONLY Thar Roxx (714)", () => {
      const family = findModelFamily("roxx");
      expect(family).not.toBeNull();
      expect(family.key).toBe("thar-roxx");
      expect(family.models.map((m) => m.modelId)).toEqual([714]);
    });
  });

  describe("i10 vs Grand i10 / i10 Grand", () => {
    test("Common name 'i10' selects Hyundai and ALL i10 models (Base, Grand, Nios, Prime)", () => {
      const family = findModelFamily("i10");
      expect(family).not.toBeNull();
      expect(family.brandName).toBe("Hyundai");
      expect(family.key).toBe("i10");

      const modelIds = family.models.map((m) => m.modelId);
      expect(modelIds).toEqual(expect.arrayContaining([95, 94, 487, 470]));
      expect(modelIds).toHaveLength(4);
    });

    test("Particular name 'grand i10' selects Grand i10 models and NOT base i10 (95)", () => {
      const family = findModelFamily("grand i10");
      expect(family).not.toBeNull();
      expect(family.key).toBe("grand-i10");
      expect(family.familyName).toBe("Grand i10");

      const modelIds = family.models.map((m) => m.modelId);
      expect(modelIds).toEqual(expect.arrayContaining([94, 487, 470]));
      expect(modelIds).not.toContain(95);
    });

    test("Particular name 'i10 grand' selects Grand i10 models and NOT base i10 (95)", () => {
      const family = findModelFamily("i10 grand");
      expect(family).not.toBeNull();
      expect(family.key).toBe("grand-i10");

      const modelIds = family.models.map((m) => m.modelId);
      expect(modelIds).toEqual(expect.arrayContaining([94, 487, 470]));
      expect(modelIds).not.toContain(95);
    });

    test("Specific 'grand i10 nios' selects ONLY Grand i10 Nios (487)", () => {
      const family = findModelFamily("grand i10 nios");
      expect(family).not.toBeNull();
      expect(family.key).toBe("grand-i10-nios");
      expect(family.models.map((m) => m.modelId)).toEqual([487]);
    });
  });

  describe("Scorpio vs Scorpio Classic vs Scorpio-N", () => {
    test("Common name 'scorpio' selects Mahindra and ALL Scorpio models", () => {
      const family = findModelFamily("scorpio");
      expect(family).not.toBeNull();
      expect(family.key).toBe("scorpio");

      const modelIds = family.models.map((m) => m.modelId);
      expect(modelIds).toEqual(expect.arrayContaining([127, 638, 642]));
    });

    test("Particular name 'scorpio classic' selects ONLY Scorpio Classic (638)", () => {
      const family = findModelFamily("scorpio classic");
      expect(family).not.toBeNull();
      expect(family.key).toBe("scorpio-classic");

      const modelIds = family.models.map((m) => m.modelId);
      expect(modelIds).toEqual([638]);
      expect(modelIds).not.toContain(127);
      expect(modelIds).not.toContain(642);
    });

    test("Particular name 'scorpio n' selects ONLY Scorpio-N (642)", () => {
      const family = findModelFamily("scorpio n");
      expect(family).not.toBeNull();
      expect(family.key).toBe("scorpio-n");

      const modelIds = family.models.map((m) => m.modelId);
      expect(modelIds).toEqual([642]);
      expect(modelIds).not.toContain(127);
      expect(modelIds).not.toContain(638);
    });
  });

  describe("Innova vs Innova Crysta vs Innova Hycross", () => {
    test("Common name 'innova' selects Toyota and ALL Innova models", () => {
      const family = findModelFamily("innova");
      expect(family).not.toBeNull();
      expect(family.key).toBe("innova");

      const modelIds = family.models.map((m) => m.modelId);
      expect(modelIds).toEqual(expect.arrayContaining([244, 339, 647]));
    });

    test("Particular name 'innova crysta' selects ONLY Innova Crysta (339)", () => {
      const family = findModelFamily("innova crysta");
      expect(family).not.toBeNull();
      expect(family.key).toBe("innova-crysta");
      expect(family.models.map((m) => m.modelId)).toEqual([339]);
    });

    test("Particular name 'innova hycross' selects ONLY Innova Hycross (647)", () => {
      const family = findModelFamily("innova hycross");
      expect(family).not.toBeNull();
      expect(family.key).toBe("innova-hycross");
      expect(family.models.map((m) => m.modelId)).toEqual([647]);
    });
  });

  describe("Swift vs Dzire", () => {
    test("Common name 'swift' selects Swift, Swift Dzire, and Dzire", () => {
      const family = findModelFamily("swift");
      expect(family).not.toBeNull();
      expect(family.key).toBe("swift");

      const modelIds = family.models.map((m) => m.modelId);
      expect(modelIds).toEqual(expect.arrayContaining([146, 147, 348]));
    });

    test("Particular name 'dzire' selects Dzire models and NOT base Swift (146)", () => {
      const family = findModelFamily("dzire");
      expect(family).not.toBeNull();
      expect(family.key).toBe("dzire");

      const modelIds = family.models.map((m) => m.modelId);
      expect(modelIds).toEqual(expect.arrayContaining([348, 147]));
      expect(modelIds).not.toContain(146);
    });
  });

  describe("Slug Matching & Detection", () => {
    test("SEO slug matching distinguishes sub-models from base family", () => {
      expect(findModelFamilyBySlugSegment("buy-used-mahindra-thar-roxx-cars")?.key).toBe("thar-roxx");
      expect(findModelFamilyBySlugSegment("buy-used-mahindra-thar-cars")?.key).toBe("thar");

      expect(findModelFamilyBySlugSegment("buy-used-hyundai-grand-i10-cars")?.key).toBe("grand-i10");
      expect(findModelFamilyBySlugSegment("buy-used-hyundai-i10-cars")?.key).toBe("i10");

      expect(findModelFamilyBySlugSegment("buy-used-mahindra-scorpio-classic-cars")?.key).toBe("scorpio-classic");
      expect(findModelFamilyBySlugSegment("buy-used-mahindra-scorpio-cars")?.key).toBe("scorpio");

      expect(findModelFamilyBySlugSegment("buy-used-toyota-innova-crysta-cars")?.key).toBe("innova-crysta");
      expect(findModelFamilyBySlugSegment("buy-used-toyota-innova-cars")?.key).toBe("innova");
    });

    test("detectFamilyFromSelection prefers specific sub-model when only sub-model is selected", () => {
      expect(detectFamilyFromSelection(["714"], "20")?.key).toBe("thar-roxx");
      expect(detectFamilyFromSelection(["128", "714"], "20")?.key).toBe("thar");

      expect(detectFamilyFromSelection(["638"], "20")?.key).toBe("scorpio-classic");
      expect(detectFamilyFromSelection(["127", "638", "642"], "20")?.key).toBe("scorpio");

      expect(detectFamilyFromSelection(["339"], "35")?.key).toBe("innova-crysta");
      expect(detectFamilyFromSelection(["244", "339", "647"], "35")?.key).toBe("innova");
    });
  });
});

