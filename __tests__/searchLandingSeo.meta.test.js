import {
  buildSearchLandingSeo,
  buildSearchItemListSchema,
  buildCityBuyingNotes,
  MIN_INDEXABLE_LISTINGS,
} from "@/lib/searchLandingSeo";

describe("buildSearchLandingSeo brand×city", () => {
  test("includes count lead and starting-from price in description", () => {
    const seo = buildSearchLandingSeo({
      brand: "Toyota",
      city: "Ahmedabad",
      vehicleWord: "Cars",
      totalCount: 11,
      minPrice: 890000,
      sampleVehicles: [
        {
          yearOfMfg: 2021,
          modelName: "Innova Crysta",
          fuelType: "DIESEL",
          price: 1200000,
        },
      ],
    });

    expect(seo.title).toMatch(/11 Used Toyota Cars In Ahmedabad/i);
    expect(seo.description.toLowerCase()).toContain("starting from");
    expect(seo.description).toMatch(/11 used toyota cars in ahmedabad/i);
  });
});

describe("index and city notes", () => {
  test("MIN_INDEXABLE_LISTINGS is 3", () => {
    expect(MIN_INDEXABLE_LISTINGS).toBe(3);
  });

  test("Ahmedabad notes are distinct from Palanpur", () => {
    const a = buildCityBuyingNotes("Ahmedabad");
    const p = buildCityBuyingNotes("Palanpur");
    expect(a?.paragraphs?.[0]).toBeTruthy();
    expect(p?.paragraphs?.[0]).toBeTruthy();
    expect(a.paragraphs[0]).not.toEqual(p.paragraphs[0]);
    expect(a.title.toLowerCase()).toContain("ahmedabad");
  });
});

describe("buildSearchItemListSchema images", () => {
  test("rewrites S3 thumbnail to CDN for ItemList image", () => {
    const schema = buildSearchItemListSchema({
      title: "Used Toyota Cars",
      canonical: "https://www.reecomm.com/search/buy-used-toyota-cars-ahmedabad",
      totalCount: 2,
      vehicles: [
        {
          id: "abc",
          slug: "buy-used-toyota-fortuner-2025-cars-ahmedabad",
          yearOfMfg: 2025,
          makerName: "Toyota",
          modelName: "Fortuner",
          price: 3790000,
          thumbnailUrl:
            "https://my-avx-bucket.s3.ap-south-1.amazonaws.com/vehicle-image/abc/cover.jpg",
        },
      ],
    });

    const image = schema.itemListElement[0]?.item?.image;
    expect(image).toContain("image.reecomm.com");
    expect(image).toContain("vehicle-image/abc/cover.jpg");
    expect(image).not.toContain("s3.ap-south-1.amazonaws.com");
  });
});
