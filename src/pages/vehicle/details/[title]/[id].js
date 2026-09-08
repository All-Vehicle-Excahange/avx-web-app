import React from "react";
import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import AvxProcess from "@/components/features/VehiclDetail/AvxProcess";
import VehiclDetail from "@/components/features/VehiclDetail/VehiclDetail";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getVehicleOverviewQuery } from "@/queries/vehicle.queries";
import { generateDynamicPageTitle, generateDynamicMetaDescription } from "@/lib/helper";

function Index({ seo }) {
  const router = useRouter();
  const { id } = router.query || {};

  const { data: vehicleOverview } = useQuery({
    ...getVehicleOverviewQuery(id),
    enabled: !!id,
  });

  const vehicle = vehicleOverview || {};

  // ─── Determine E-E-A-T Seller Type (AutoDealer vs Person) ──────────
  const isConsultant =
    vehicle.sellerType === "CONSULTANT" ||
    !!vehicle.consultantName ||
    !!vehicle.consultantUsername;
  const sellerSchema = isConsultant
    ? {
        "@type": "AutoDealer",
        name: vehicle.consultantName || vehicle.consultantUsername || "Certified Auto Consultant",
        ...(vehicle.consultantLogo && { logo: vehicle.consultantLogo }),
      }
    : {
        "@type": "Person",
        name: "Verified Individual Owner",
      };

  const isTwoWheeler = (vehicle.vehicleType || "")
    .toUpperCase()
    .includes("TWO");
  const vehicleSchemaType = isTwoWheeler ? "Motorcycle" : "Car";

  // ─── JSON-LD: Car / Motorcycle Schema ──
  const images = Array.from(
    new Set(
      [
        vehicle.thumbnailUrl,
        ...(Array.isArray(vehicle.imageUrls) ? vehicle.imageUrls : []),
        ...(Array.isArray(vehicle.vehiclePhotos)
          ? vehicle.vehiclePhotos.map((p) =>
              typeof p === "string" ? p : p?.url || p?.photoUrl
            )
          : []),
      ].filter(Boolean)
    )
  );
  const priceNum = Number(vehicle.price);
  const kmNum = Number(vehicle.kmDriven);
  const vehicleSchema = vehicle.id
    ? {
        "@context": "https://schema.org",
        "@type": vehicleSchemaType,
        name: `${vehicle.yearOfMfg || ""} ${vehicle.makerName || ""} ${vehicle.modelName || ""} ${vehicle.variantName || ""}`.trim(),
        ...(vehicle.makerName
          ? { brand: { "@type": "Brand", name: vehicle.makerName } }
          : {}),
        ...(vehicle.modelName ? { model: vehicle.modelName } : {}),
        ...(vehicle.yearOfMfg
          ? { vehicleModelDate: String(vehicle.yearOfMfg) }
          : {}),
        ...(vehicle.fuelType
          ? { fuelType: formatTextCap(vehicle.fuelType) }
          : {}),
        ...(vehicle.transmissionType
          ? { vehicleTransmission: formatTextCap(vehicle.transmissionType) }
          : {}),
        ...(Number.isFinite(kmNum) && kmNum >= 0
          ? {
              mileageFromOdometer: {
                "@type": "QuantitativeValue",
                value: kmNum,
                unitCode: "KMT",
              },
            }
          : {}),
        ...(vehicle.ownership != null && vehicle.ownership !== ""
          ? { numberOfPreviousOwners: Number(vehicle.ownership) || vehicle.ownership }
          : {}),
        ...(images.length ? { image: images } : {}),
        ...(seo?.description ? { description: seo.description } : {}),
        ...(seo?.url ? { url: seo.url } : {}),
        ...(vehicle.variantName
          ? { vehicleConfiguration: vehicle.variantName }
          : {}),
        ...(Number.isFinite(priceNum) && priceNum > 0
          ? {
              offers: {
                "@type": "Offer",
                price: String(priceNum),
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
                itemCondition: "https://schema.org/UsedCondition",
                seller: sellerSchema,
              },
            }
          : {}),
      }
    : null;

  // ─── JSON-LD: Canonical Breadcrumb Schema ───────────────────────────
  const brandSlug = (vehicle.makerName || "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
  const citySlug = (vehicle.cityName || vehicle.address?.city || "")
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
  const kindSlug = (vehicle.vehicleType || "")
    .toUpperCase()
    .includes("TWO")
    ? "two-wheelers"
    : "cars";

  const brandSearchUrl = brandSlug
    ? `https://www.reecomm.com/search/buy-used-${brandSlug}-${kindSlug}`
    : `https://www.reecomm.com/search/buy-used-${kindSlug}`;

  const cityBrandSearchUrl =
    brandSlug && citySlug
      ? `https://www.reecomm.com/search/buy-used-${brandSlug}-${kindSlug}-${citySlug}`
      : brandSearchUrl;

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.reecomm.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: kindSlug === "two-wheelers" ? "Used Two Wheelers" : "Used Cars",
      item: `https://www.reecomm.com/search/buy-used-${kindSlug}`,
    },
  ];

  if (vehicle.makerName) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: `Used ${vehicle.makerName} ${kindSlug === "two-wheelers" ? "Two Wheelers" : "Cars"}`,
      item: brandSearchUrl,
    });
  }

  if (citySlug) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: breadcrumbItems.length + 1,
      name: `Used ${vehicle.makerName || ""} ${kindSlug === "two-wheelers" ? "Two Wheelers" : "Cars"} in ${vehicle.cityName || vehicle.address?.city || ""}`.trim(),
      item: cityBrandSearchUrl,
    });
  }

  breadcrumbItems.push({
    "@type": "ListItem",
    position: breadcrumbItems.length + 1,
    name: `${vehicle.yearOfMfg || ""} ${vehicle.makerName || ""} ${vehicle.modelName || ""} ${vehicle.variantName || ""}`.trim(),
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  // ─── Display SEO Values ─────────────────────────────────────────────
  // 1. Start with server-provided SEO defaults (or clean title from URL slug)
  let displayTitle = seo?.title || "Vehicle Details | Reecomm";
  let displayDescription =
    seo?.description ||
    "View detailed vehicle information, specs, price, and more.";
  let ogTitle = seo?.ogTitle || seo?.title || "Vehicle Details | Reecomm";
  let ogDescription =
    seo?.ogDescription ||
    seo?.description ||
    "View detailed vehicle information, specs, price, and more.";
  let vehicleImageUrl = seo?.image || "";

  // 2. If client-side query loads vehicle data, update SEO values dynamically!
  if (vehicleOverview) {
    const clientImage =
      vehicleOverview.thumbnailUrl ||
      vehicleOverview.imageUrls?.[0] ||
      vehicleOverview.vehicleImages?.[0]?.imageUrl ||
      vehicleOverview.vehiclePhotos?.[0]?.url ||
      vehicleOverview.vehiclePhotos?.[0]?.photoUrl ||
      "";
    vehicleImageUrl = clientImage || seo?.image || vehicleImageUrl;

    displayTitle = generateDynamicPageTitle(vehicleOverview);
    displayDescription = generateDynamicMetaDescription(vehicleOverview);
    ogTitle = displayTitle;
    ogDescription = displayDescription;
  }

  // Never leave SERP without an image; prefer vehicle photo over logo
  if (!vehicleImageUrl) {
    vehicleImageUrl = "https://www.reecomm.com/logo/logo1.webp";
  }

  return (
    <>
      <Head>
        <title>{displayTitle}</title>
        <meta name="description" content={displayDescription} />
        <meta name="robots" content="index, follow" />

        {/* Canonical URL */}
        {seo?.canonical && (
          <link key="canonical" rel="canonical" href={seo.canonical} />
        )}

        {/* JSON-LD Structured Data: Vehicle Schema */}
        {vehicleSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }}
          />
        )}

        {/* JSON-LD Structured Data: Breadcrumb */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        {/* OpenGraph Tags for WhatsApp, Facebook, LinkedIn sharing */}
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta key="og:type" property="og:type" content="product" />
        <meta property="og:site_name" content="Reecomm" />
        {seo?.url && <meta property="og:url" content={seo.url} />}
        <meta key="og:image" property="og:image" content={vehicleImageUrl} />
        <meta key="og:image:width" property="og:image:width" content="1200" />
        <meta key="og:image:height" property="og:image:height" content="630" />
        <meta
          key="og:image:alt"
          property="og:image:alt"
          content={displayTitle}
        />
        {vehicle.price && (
          <meta property="product:price:amount" content={String(vehicle.price)} />
        )}
        <meta property="product:price:currency" content="INR" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta key="twitter:image" name="twitter:image" content={vehicleImageUrl} />
      </Head>
      <Layout>
        <VehiclDetail initialOverview={null} initialSummary={null} />
      </Layout>
      {/* <Layout>
        <AvxProcess />
      </Layout> */}
      <DownloadAppSection fullWidth />

      <FooterLink />
      <Footer />
    </>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatTextCap(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function formatPrice(num) {
  if (!num) return "N/A";
  if (typeof num === "string" && num.toUpperCase().includes("L")) return num;
  const val = Number(num);
  if (isNaN(val)) return num;
  if (val >= 100000) {
    return (val / 100000).toFixed(2).replace(/\.00$/, "") + "L";
  }
  return val.toLocaleString("en-IN");
}

// ─── Server-Side Props (slug-based SEO + live thumbnail fetch) ──────────────

export async function getStaticPaths() {
  return {
    // Generate pages on-demand rather than at build time
    paths: [],
    // 'blocking' will wait for the HTML to be generated on the first request
    // before sending it to the browser, ensuring perfect SEO for the first hit
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { title, id } = params || {};

  const protocol = process.env.NEXT_PUBLIC_API_URL?.includes("localhost")
    ? "http"
    : "https";
  const host = process.env.NEXT_PUBLIC_DOMAIN || "www.reecomm.com";
  const canonicalUrl = `${protocol}://${host}/vehicle/details/${title}/${id}`;

  // ── Fallback SEO from slug ──────────────────────────────────────────────
  let finalTitle = "Vehicle Details | Reecomm";
  let finalDescription =
    "Reecomm | Buy used vehicles. View detailed specs, photos, price, and contact information.";
  let finalImageUrl = `${protocol}://${host}/logo/logo1.webp`;

  if (title) {
    // Regex matches slugs like: buy-used-[brand-model]-[year]-[type]-[city]
    const pattern =
      /^buy-used-(.+?)-(\d{4})-(?:cars|two-wheelers|vehicles)-(.+)$/i;
    const match = title.match(pattern);

    if (match) {
      const brandModel = match[1]
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      const year = match[2];
      const city = match[3]
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      finalTitle = `Used ${year} ${brandModel} for Sale in ${city} | Reecomm`;
      finalDescription = `Reecomm | Buy used ${year} ${brandModel} in ${city}. View detailed specs, inspection report, photos, and price details.`;
    } else {
      const cleanTitle = title
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      finalTitle = `${cleanTitle} | Reecomm`;
      finalDescription = `Reecomm | Buy ${cleanTitle}. View specs, photos, price, and contact details.`;
    }
  }

  // ── Live API fetch: get real vehicle thumbnail for og:image ────────────
  // WhatsApp / Telegram crawl the initial SSR HTML — client-side updates are
  // invisible to them, so we MUST resolve the image server-side.
  if (id) {
    try {
      const backendUrl =
        process.env.BACKEND_URL || "https://api.reecomm.online";
      const res = await fetch(
        `${backendUrl}/api/v1/website/vehicle/detail-page/${id}`,
        {
          headers: { Accept: "application/json" },
          // 4-second timeout — if the API is slow, fall back gracefully
          signal: AbortSignal.timeout(4000),
        },
      );

      if (res.ok) {
        const json = await res.json();
        const v = json?.data;

        if (v) {
          // Real thumbnail from the vehicle record
          const thumbnail =
            v.thumbnailUrl ||
            v.imageUrls?.[0] ||
            v.vehicleImages?.[0]?.imageUrl ||
            v.imageUrl ||
            "";

          if (thumbnail) finalImageUrl = thumbnail;

          // Normalize fields expected by SEO helpers
          const vehicleForSeo = {
            ...v,
            cityName:
              v.cityName ||
              v.vehicleAddress?.city ||
              v.address?.city ||
              "",
            ownership: v.ownership ?? v.ownerCount ?? v.numberOfOwners,
            consultantName:
              v.consultantName ||
              v.consultationName ||
              [
                v.vehicleOwner?.firstname || "",
                v.vehicleOwner?.lastname || "",
              ]
                .join(" ")
                .trim(),
          };

          const apiTitle = generateDynamicPageTitle(vehicleForSeo);
          const apiDescription = generateDynamicMetaDescription(vehicleForSeo);

          // Only override slug-derived text if we got real data
          if (v.makerName && v.modelName) {
            finalTitle = apiTitle;
            finalDescription = apiDescription;
          }
        }
      }
    } catch {
      // API unavailable — slug-derived fallbacks remain active
    }
  }

  return {
    props: {
      seo: {
        title: finalTitle,
        description: finalDescription,
        ogTitle: finalTitle,
        ogDescription: finalDescription,
        image: finalImageUrl,
        url: canonicalUrl,
        canonical: canonicalUrl,
      },
    },
    // ISR: re-generate at most once per 60 s on incoming requests
    revalidate: 60,
  };
}

Index.fullWidth = true;

export default Index;
