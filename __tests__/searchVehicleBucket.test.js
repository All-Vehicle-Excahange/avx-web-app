import {
  pickPrimaryVehicleBucket,
  resolveDisplayTotalElements,
} from "@/lib/searchVehicleBucket";

describe("pickPrimaryVehicleBucket", () => {
  test("prefers priceMatch when it has vehicles", () => {
    const bucket = pickPrimaryVehicleBucket({
      priceMatchVehicles: {
        vehicles: [{ id: "a" }],
        pageResponse: { totalElements: 1 },
      },
      topPicksVehicles: {
        vehicles: [{ id: "b" }, { id: "c" }],
        pageResponse: { totalElements: 2 },
      },
    });
    expect(bucket.source).toBe("priceMatch");
    expect(bucket.vehicles).toHaveLength(1);
    expect(bucket.pageResponse.totalElements).toBe(1);
  });

  test("falls through empty priceMatch array to topPicks", () => {
    const bucket = pickPrimaryVehicleBucket({
      priceMatchVehicles: {
        vehicles: [],
        pageResponse: { totalElements: 0 },
      },
      topPicksVehicles: {
        vehicles: [{ id: "b" }, { id: "c" }],
        pageResponse: { totalElements: 40 },
      },
    });
    expect(bucket.source).toBe("topPicks");
    expect(bucket.vehicles).toHaveLength(2);
    expect(bucket.pageResponse.totalElements).toBe(40);
  });

  test("uses topPicks when priceMatch total is 0 but topPicks has count", () => {
    const bucket = pickPrimaryVehicleBucket({
      priceMatchVehicles: {
        vehicles: [],
        pageResponse: { totalElements: 0 },
      },
      topPicksVehicles: {
        vehicles: [],
        pageResponse: { totalElements: 12 },
      },
    });
    expect(bucket.source).toBe("topPicks");
    expect(bucket.pageResponse.totalElements).toBe(12);
  });
});

describe("resolveDisplayTotalElements", () => {
  test("never under-reports vs shown vehicles", () => {
    expect(resolveDisplayTotalElements({ totalElements: 0 }, [{}, {}])).toBe(2);
    expect(resolveDisplayTotalElements({ totalElements: 40 }, [{}, {}])).toBe(40);
  });
});
