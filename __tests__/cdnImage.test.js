import {
  CDN_BASE,
  IMAGE_PRESETS,
  extractObjectKey,
  getCdnImageUrl,
} from "../src/lib/cdnImage";

const KEY =
  "vehicle-image/b5664bac-1e2e-477f-8c31-099d99d1d924/1793249664630_front_2831_0.jpg";

describe("getCdnImageUrl", () => {
  test("null / undefined / empty → empty string", () => {
    expect(getCdnImageUrl(null)).toBe("");
    expect(getCdnImageUrl(undefined)).toBe("");
    expect(getCdnImageUrl("")).toBe("");
    expect(getCdnImageUrl("   ")).toBe("");
  });

  test("S3 key → AWS CDN URL with tr params", () => {
    const url = getCdnImageUrl(KEY, { width: 600, quality: 75 });
    expect(url).toBe(`${CDN_BASE}/${KEY}?tr=w-600,q-75,f-auto`);
  });

  test("known S3 URL → AWS CDN URL", () => {
    const s3 = `https://my-avx-bucket.s3.ap-south-1.amazonaws.com/${KEY}`;
    const url = getCdnImageUrl(s3, { width: 400, quality: 70 });
    expect(url).toBe(`${CDN_BASE}/${KEY}?tr=w-400,q-70,f-auto`);
  });

  test("existing AWS CDN URL → no nested CDN prefix", () => {
    const existing = `${CDN_BASE}/${KEY}?tr=w-320,q-70,f-auto`;
    const url = getCdnImageUrl(existing, { width: 1080, quality: 80 });
    expect(url).toBe(`${CDN_BASE}/${KEY}?tr=w-1080,q-80,f-auto`);
    expect(url.match(/image\.reecomm\.com/g)).toHaveLength(1);
  });

  test("legacy ImageKit URL → CDN with object key only", () => {
    const ik = `https://ik.imagekit.io/reecommKit/${KEY}?tr=w-640,q-75,f-auto`;
    const url = getCdnImageUrl(ik, { width: 600, quality: 75 });
    expect(url).toBe(`${CDN_BASE}/${KEY}?tr=w-600,q-75,f-auto`);
    expect(url).not.toContain("imagekit");
  });

  test("external URL → unchanged", () => {
    const ext = "https://images.unsplash.com/photo-123?w=400";
    expect(getCdnImageUrl(ext, { width: 400 })).toBe(ext);
  });

  test("local public path → unchanged", () => {
    expect(getCdnImageUrl("/big_card_car.jpg", { width: 400 })).toBe(
      "/big_card_car.jpg",
    );
  });

  test("object key with spaces → encoded without double encoding", () => {
    const key = "vehicle-image/folder/my photo.jpg";
    const url = getCdnImageUrl(key, { width: 400, quality: 70 });
    expect(url).toBe(
      `${CDN_BASE}/vehicle-image/folder/my%20photo.jpg?tr=w-400,q-70,f-auto`,
    );
    expect(url).not.toContain("%2520");
  });

  test("preset card applies width/quality", () => {
    const url = getCdnImageUrl(KEY, { preset: "card" });
    expect(url).toBe(
      `${CDN_BASE}/${KEY}?tr=w-${IMAGE_PRESETS.card.width},q-${IMAGE_PRESETS.card.quality},f-auto`,
    );
  });

  test("invalid width/quality fall back safely", () => {
    const url = getCdnImageUrl(KEY, { width: -1, quality: 0 });
    expect(url).toBe(`${CDN_BASE}/${KEY}?tr=w-640,q-75,f-auto`);
  });

  test("width snaps up to nearest bucket", () => {
    const url = getCdnImageUrl(KEY, { width: 350, quality: 70 });
    expect(url).toContain("tr=w-400,q-70,f-auto");
  });

  test("no duplicate transformation parameters", () => {
    const url = getCdnImageUrl(`${CDN_BASE}/${KEY}?foo=1&tr=w-100,q-50,f-auto`, {
      width: 600,
      quality: 75,
    });
    expect(url.match(/tr=/g)).toHaveLength(1);
    expect(url).toContain("tr=w-600,q-75,f-auto");
  });
});

describe("extractObjectKey", () => {
  test("strips S3 host", () => {
    expect(
      extractObjectKey(
        `https://my-avx-bucket.s3.ap-south-1.amazonaws.com/${KEY}?x=1`,
      ),
    ).toBe(KEY);
  });

  test("strips /cdn-image prefix", () => {
    expect(extractObjectKey(`/cdn-image/${KEY}`)).toBe(KEY);
  });
});
