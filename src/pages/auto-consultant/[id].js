import StoreFront from "@/components/features/storeFront/StoreFront";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getStoreFrontByUsernameQuery } from "@/queries/user.queries";
import StoreFrontHeroSkeleton from "@/components/ui/skeleton/StoreFrontHeroSkeleton";
import axios from "axios";
import {
  buildStorefrontSeo,
  buildStorefrontFaq,
  buildStorefrontDealerSchema,
  buildStorefrontItemListSchema,
  formatStorefrontDisplayName,
} from "@/lib/storefrontSeo";
import { buildStorefrontOgImageUrl } from "@/lib/storefrontOgImage";

function apiBase() {
  const envUrl =
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "";
  let base = "https://api.reecomm.online/api/v1/website";
  if (envUrl.startsWith("http")) {
    base = envUrl.endsWith("/api/v1/website")
      ? envUrl
      : `${envUrl.replace(/\/$/, "")}/api/v1/website`;
  }
  return base;
}

async function fetchStoreFrontServer(username) {
  try {
    const res = await axios.get(
      `${apiBase()}/consultation/detail-page/by-username/${encodeURIComponent(username)}`,
      { timeout: 12000, headers: { Accept: "application/json" } },
    );
    return res.data?.data || res.data || null;
  } catch (e) {
    console.warn("[auto-consultant SSR] fetch failed:", e.message);
    return null;
  }
}

async function fetchStorefrontInventoryServer(username) {
  try {
    const res = await axios.get(
      `${apiBase()}/consultation/detail-page/inventory/${encodeURIComponent(username)}`,
      {
        timeout: 12000,
        headers: { Accept: "application/json" },
        params: {
          pageNo: 1,
          size: 10,
          sortBy: "listingDate",
          direction: "desc",
        },
      },
    );
    const body = res.data?.data || res.data || {};
    return Array.isArray(body) ? body : body?.data || [];
  } catch (e) {
    console.warn("[auto-consultant SSR] inventory fetch failed:", e.message);
    return [];
  }
}

function StoreFrontPage({ seo }) {
  const router = useRouter();

  if (router.isFallback) {
    return <StoreFrontHeroSkeleton />;
  }

  const { id } = router.query || {};

  const { data: storeDetails } = useQuery({
    ...getStoreFrontByUsernameQuery(id),
    enabled: !!id,
  });

  let displayTitle = seo?.title || "StoreFront Details | Reecomm";
  let displayDescription =
    seo?.description || "View storefront, inventory, and reviews.";
  // Prefer composed 1200×630 OG card for SERP thumbnails — never swap to raw logo
  const displayImage = seo?.ogImage || seo?.image || "";
  let displayNameForAlt = seo?.displayName || "Auto Consultant";

  if (storeDetails) {
    const fetchedStoreName = storeDetails.consultationName || "";
    const city =
      storeDetails?.address?.city || storeDetails?.cityName || seo?.city || "";
    const state =
      storeDetails?.address?.state ||
      storeDetails?.stateName ||
      storeDetails?.state ||
      seo?.state ||
      "";
    if (fetchedStoreName && !seo?.title) {
      displayNameForAlt = formatStorefrontDisplayName(fetchedStoreName);
      const built = buildStorefrontSeo({
        displayName: fetchedStoreName,
        city,
        state,
        availableVehicles:
          storeDetails.availableVehicles ?? seo?.availableVehicles ?? 0,
      });
      displayTitle = built.title;
      displayDescription = built.description;
    } else if (fetchedStoreName) {
      displayNameForAlt = formatStorefrontDisplayName(fetchedStoreName);
    }
  }

  const ogImageAlt = `${displayNameForAlt} on Reecomm`;

  return (
    <>
      <Head>
        <title>{displayTitle}</title>
        <meta name="description" content={displayDescription} />
        <meta name="robots" content="index, follow" />

        {seo?.canonical && (
          <link key="canonical" rel="canonical" href={seo.canonical} />
        )}

        <meta property="og:title" content={displayTitle} />
        <meta property="og:description" content={displayDescription} />
        {displayImage && (
          <>
            <meta key="og:image" property="og:image" content={displayImage} />
            <meta property="og:image:secure_url" content={displayImage} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={ogImageAlt} />
          </>
        )}
        {seo?.canonical && <meta property="og:url" content={seo.canonical} />}
        <meta property="og:type" content="profile" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={displayTitle} />
        <meta name="twitter:description" content={displayDescription} />
        {displayImage && (
          <meta key="twitter:image" name="twitter:image" content={displayImage} />
        )}

        {seo?.dealerSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(seo.dealerSchema),
            }}
          />
        )}
        {seo?.faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(seo.faqSchema),
            }}
          />
        )}
        {seo?.itemListSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(seo.itemListSchema),
            }}
          />
        )}
        {seo?.webpageSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(seo.webpageSchema),
            }}
          />
        )}
      </Head>
      {/* First body copy for crawlers (Google often ignores meta when app banner wins) */}
      <p className="sr-only">{displayDescription}</p>
      <StoreFront />
    </>
  );
}

StoreFrontPage.fullWidth = true;

export default StoreFrontPage;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params || {};
  const host = process.env.NEXT_PUBLIC_DOMAIN || "www.reecomm.com";
  const canonicalBase = `https://${host}/auto-consultant`;

  if (!id) {
    return { notFound: true, revalidate: 60 };
  }

  let store = await fetchStoreFrontServer(id);

  // Digit / stale slug: API may 404 if previousUsername wasn't saved — try clean base
  if (!store) {
    const cleanBase = String(id).replace(/\d+$/, "");
    if (
      cleanBase &&
      cleanBase.toLowerCase() !== String(id).toLowerCase() &&
      /\d{4,}$/.test(String(id))
    ) {
      const byClean = await fetchStoreFrontServer(cleanBase);
      if (byClean?.username) {
        return {
          redirect: {
            destination: `/auto-consultant/${byClean.username}`,
            permanent: true,
          },
        };
      }
    }
    return { notFound: true, revalidate: 60 };
  }

  // previousUsername / digit slug → 301 to current clean username
  if (
    store.username &&
    String(store.username).toLowerCase() !== String(id).toLowerCase()
  ) {
    return {
      redirect: {
        destination: `/auto-consultant/${store.username}`,
        permanent: true,
      },
    };
  }

  const consultationName =
    store.consultationName ||
    String(id)
      .replace(/\d+$/, "")
      .replace(/[-_]+/g, " ")
      .trim();

  const displayName =
    consultationName && consultationName.length > 1
      ? formatStorefrontDisplayName(consultationName)
      : "StoreFront Details";

  const currentUsername = store.username || id;
  const currentUrl = `${canonicalBase}/${currentUsername}`;
  const ogFallback = `https://${host}/logo/logo1.webp`;

  const city =
    store?.address?.city || store?.cityName || store?.city || "";
  const state =
    store?.address?.state || store?.stateName || store?.state || "";
  const streetAddress =
    store?.address?.address || store?.address?.town || "";
  const postalCode = store?.address?.pincode || store?.address?.postalCode || "";
  const telephone =
    store?.phone || store?.mobile || store?.contactNumber || "";
  const availableVehicles = Number(store.availableVehicles) || 0;
  const averageRating = store.averageRating ?? null;
  const reviewCount =
    store.totalReviews ?? store.reviewCount ?? store.reviewsCount ?? null;

  const vehicles = await fetchStorefrontInventoryServer(currentUsername);

  const bikeCount = vehicles.filter((v) => {
    const t = String(v?.vehicleType || v?.category || v?.type || "").toUpperCase();
    return (
      t.includes("TWO") ||
      t.includes("BIKE") ||
      t.includes("SCOOTER") ||
      t.includes("MOTORCYCLE")
    );
  }).length;
  const vehicleWord =
    vehicles.length > 0 && bikeCount > vehicles.length / 2 ? "bikes" : "cars";

  const firstWithImage = vehicles.find((v) => v?.thumbnailUrl || v?.imageUrl);
  const firstInventoryImage =
    firstWithImage?.thumbnailUrl || firstWithImage?.imageUrl || "";

  const logoUrl = store.logoUrl || firstInventoryImage || null;
  const storefrontImageUrl = logoUrl || ogFallback;

  const prices = vehicles
    .map((v) => Number(v?.price))
    .filter((n) => Number.isFinite(n) && n > 0);
  const minPrice = prices.length ? Math.min(...prices) : null;
  const maxPrice = prices.length ? Math.max(...prices) : null;

  const seoBuilt = buildStorefrontSeo({
    displayName,
    city,
    state,
    availableVehicles,
    username: currentUsername,
    vehicleWord,
    minPrice,
    maxPrice,
  });

  const ogImage = buildStorefrontOgImageUrl({
    username: currentUsername,
    name: seoBuilt.displayName || displayName,
    city,
    state,
    logo: logoUrl || "",
  });

  const { schema: faqSchema } = buildStorefrontFaq({
    displayName,
    city,
    state,
    availableVehicles,
  });

  const dealerSchema = buildStorefrontDealerSchema({
    displayName,
    canonical: currentUrl,
    logoUrl: logoUrl || null,
    city,
    state,
    streetAddress,
    postalCode,
    telephone,
    averageRating,
    reviewCount,
    availableVehicles,
  });

  // Prefer SERP thumbnail image as primary image; keep raw logo as logo
  if (ogImage) {
    dealerSchema.image = [ogImage, ...(logoUrl ? [logoUrl] : [])];
  }

  const itemListSchema = buildStorefrontItemListSchema({
    displayName,
    canonical: currentUrl,
    vehicles,
  });

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: seoBuilt.title,
    description: seoBuilt.description,
    url: currentUrl,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImage,
      width: 1200,
      height: 630,
      caption: `${seoBuilt.displayName || displayName} on Reecomm`,
    },
    image: ogImage,
    mainEntity: {
      "@type": "AutoDealer",
      name: `${seoBuilt.displayName || displayName} on Reecomm`,
      url: currentUrl,
      ...(logoUrl ? { logo: logoUrl } : {}),
    },
  };

  // Cross-link city hub for crawlers via description enrichment
  const citySlug = city
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  return {
    props: {
      seo: {
        title: seoBuilt.title,
        description: seoBuilt.description,
        h1: seoBuilt.h1,
        image: storefrontImageUrl,
        ogImage,
        displayName,
        url: currentUrl,
        canonical: currentUrl,
        city,
        state,
        availableVehicles,
        cityHubHref: citySlug
          ? `/search/buy-used-${vehicleWord === "bikes" ? "two-wheelers" : "cars"}-${citySlug}`
          : null,
        dealerSchema,
        faqSchema,
        itemListSchema: itemListSchema || null,
        webpageSchema,
      },
    },
    revalidate: 60,
  };
}
