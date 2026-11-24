import { pickPrimaryVehicleBucket, resolveDisplayTotalElements } from "@/lib/searchVehicleBucket";

describe("Search Sorting & Pagination Unit Tests", () => {
  test("picks priceMatchVehicles when sorted by price asc", () => {
    const page1Data = {
      priceMatchVehicles: {
        vehicles: [
          { id: 1, price: 75000, make: "Maruti" },
          { id: 2, price: 175000, make: "Hyundai" },
          { id: 3, price: 185000, make: "Tata" },
        ],
        pageResponse: {
          currentElements: 3,
          totalElements: 166,
          currentPage: 1,
          totalPages: 19,
        },
      },
      similarVehicles: [{ id: 99, price: 500000 }],
      searchSessionId: "session-123",
    };

    const bucket1 = pickPrimaryVehicleBucket(page1Data);
    expect(bucket1.source).toBe("priceMatch");
    expect(bucket1.vehicles).toHaveLength(3);
    expect(bucket1.vehicles[0].price).toBe(75000);
    expect(bucket1.pageResponse.currentPage).toBe(1);
    expect(bucket1.pageResponse.totalElements).toBe(166);

    const displayTotal = resolveDisplayTotalElements(bucket1.pageResponse, bucket1.vehicles);
    expect(displayTotal).toBe(166);
  });

  test("handles page 2 sorted by price asc seamlessly", () => {
    const page2Data = {
      priceMatchVehicles: {
        vehicles: [
          { id: 4, price: 245000, make: "Honda" },
          { id: 5, price: 250000, make: "Mahindra" },
          { id: 6, price: 255000, make: "Kia" },
        ],
        pageResponse: {
          currentElements: 3,
          totalElements: 166,
          currentPage: 2,
          totalPages: 19,
        },
      },
      similarVehicles: [],
      searchSessionId: "session-123",
    };

    const bucket2 = pickPrimaryVehicleBucket(page2Data);
    expect(bucket2.source).toBe("priceMatch");
    expect(bucket2.vehicles).toHaveLength(3);
    expect(bucket2.vehicles[0].price).toBe(245000);
    expect(bucket2.pageResponse.currentPage).toBe(2);

    // Accumulated accumulation logic verification
    const page1Vehicles = [
      { id: 1, price: 75000 },
      { id: 2, price: 175000 },
      { id: 3, price: 185000 },
    ];
    const seen = new Set(page1Vehicles.map((v) => v.id));
    const nonDuplicates = bucket2.vehicles.filter((v) => !seen.has(v.id));
    const accumulated = [...page1Vehicles, ...nonDuplicates];

    expect(accumulated).toHaveLength(6);
    expect(accumulated.map((v) => v.price)).toEqual([
      75000, 175000, 185000, 245000, 250000, 255000,
    ]);
  });

  test("handles price desc sorting (High to Low)", () => {
    const highToLowData = {
      priceMatchVehicles: {
        vehicles: [
          { id: 10, price: 3790000, make: "BMW" },
          { id: 11, price: 3230000, make: "Audi" },
          { id: 12, price: 2990000, make: "Mercedes" },
        ],
        pageResponse: {
          currentElements: 3,
          totalElements: 166,
          currentPage: 1,
          totalPages: 19,
        },
      },
      searchSessionId: "session-456",
    };

    const bucket = pickPrimaryVehicleBucket(highToLowData);
    expect(bucket.source).toBe("priceMatch");
    expect(bucket.vehicles[0].price).toBe(3790000);
    expect(bucket.vehicles[2].price).toBe(2990000);
  });
});
