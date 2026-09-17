/**
 * Build absolute OG/SERP preview image URL for auto-consultant storefronts.
 * Used only in meta tags / schema / sitemap — not rendered in page UI.
 */

const SITE = "https://www.reecomm.com";

const ALLOWED_LOGO_HOSTS = [
  "my-avx-bucket.s3.ap-south-1.amazonaws.com",
  "s3.ap-south-1.amazonaws.com",
  "www.reecomm.com",
  "reecomm.com",
  "ik.imagekit.io",
  "image.reecomm.com",
];

export function isAllowedStorefrontLogoUrl(url = "") {
  try {
    const u = new URL(String(url));
    if (u.protocol !== "https:") return false;
    const host = u.hostname.toLowerCase();
    if (host.endsWith(".amazonaws.com")) return true;
    return ALLOWED_LOGO_HOSTS.some(
      (allowed) => host === allowed || host.endsWith(`.${allowed}`),
    );
  } catch {
    return false;
  }
}

/**
 * @param {{ username?: string, name?: string, city?: string, state?: string, logo?: string }} opts
 */
export function buildStorefrontOgImageUrl({
  username = "",
  name = "",
  city = "",
  state = "",
  logo = "",
} = {}) {
  const params = new URLSearchParams();
  if (username) params.set("u", String(username).slice(0, 80));
  if (name) params.set("n", String(name).slice(0, 80));
  if (city) params.set("c", String(city).slice(0, 60));
  if (state) params.set("s", String(state).slice(0, 60));
  if (logo && isAllowedStorefrontLogoUrl(logo)) {
    params.set("logo", logo);
  }
  return `${SITE}/api/og/storefront?${params.toString()}`;
}
