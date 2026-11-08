import { needsOrientationFix } from "@/lib/orientedImageSrc";

describe("needsOrientationFix", () => {
  // Client blob path is unused once /cdn-image + sharp.rotate() is live;
  // keep helper for any absolute CDN URLs still passed to OrientedImage.
  test("flags absolute image.reecomm.com URLs", () => {
    expect(
      needsOrientationFix(
        "https://image.reecomm.com/vehicle-image/x/y.jpg?tr=w-400,q-75,f-auto",
      ),
    ).toBe(true);
  });

  test("/cdn-image paths are already oriented by API — no client fix", () => {
    expect(needsOrientationFix("/cdn-image/vehicle-image/x/y.jpg")).toBe(false);
  });

  test("skips local, blob, and data URLs", () => {
    expect(needsOrientationFix("/big_card_car.jpg")).toBe(false);
    expect(needsOrientationFix("blob:https://www.reecomm.com/abc")).toBe(false);
    expect(needsOrientationFix("data:image/jpeg;base64,xx")).toBe(false);
  });
});
