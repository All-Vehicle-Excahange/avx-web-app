import React from "react";
import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import VehiclDetail from "@/components/features/VehiclDetail/VehiclDetail";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getVehicleOverviewQuery } from "@/queries/vehicle.queries";
import {
  generateDynamicPageTitle,
  generateDynamicMetaDescription,
  generateVehicleSlug,
} from "@/lib/helper";
import { getClientType } from "@/lib/clientType";
import { getCdnImageUrl } from "@/lib/cdnImage";

function toCdnAbsolute(src, preset = "detail") {
  if (!src || typeof src !== "string") return "";
  const url = getCdnImageUrl(src, { preset }) || src;
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `https://www.reecomm.com${url}`;
  return url;
}

function collectVehicleCdnImages(vehicle) {
  if (!vehicle || typeof vehicle !== "object") return [];
  const raw = [
    vehicle.thumbnailUrl,
    ...(Array.isArray(vehicle.imageUrls) ? vehicle.imageUrls : []),
    ...(Array.isArray(vehicle.vehicleImages)
      ? vehicle.vehicleImages.map((item) => item?.imageUrl)
      : []),
    ...(Array.isArray(vehicle.vehiclePhotos)
      ? vehicle.vehiclePhotos.map((p) =>
          typeof p === "string" ? p : p?.url || p?.photoUrl
        )
      : []),
    vehicle.imageUrl,
  ].filter((u) => typeof u === "string" && u.trim());

  return Array.from(
    new Set(raw.map((u) => toCdnAbsolute(u.trim(), "detail")).filter(Boolean))
  );
}

function slugifyPart(value) {
  return String(value || "")
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

function Index({ seo, initialOverview = null }) {
  const router = useRouter();
  const { id } = router.query || {};

  const { data: vehicleOverview } = useQuery({
    ...getVehicleOverviewQuery(id),
    initialData: initialOverview || undefined,
    enabled: !!id,
  });

  // Prefer live query data; fall back to SSR prop so bots always see schema
  const vehicle = vehicleOverview || initialOverview || {};

  const isConsultant =
    vehicle.sellerType === "CONSULTANT" ||
    !!vehicle.consultantName ||
    !!vehicle.consultantUsername;
  const sellerSchema = isConsultant
    ? {
        "@type": "AutoDealer",
        name:
          vehicle.consultantName ||
          vehicle.consultantUsername ||
          "Certified Auto Consultant",
        ...(vehicle.consultantLogo && {
          logo: toCdnAbsolute(vehicle.consultantLogo, "thumb"),
        }),
      }
    : {
        "@type": "Person",
        name: "Verified Individual Owner",
      };

  const isTwoWheeler = (vehicle.vehicleType || "")
    .toUpperCase()
    .includes("TWO");
  const vehicleSchemaType = isTwoWheeler ? "Motorcycle" : "Car";
  const kindSlug = isTwoWheeler ? "two-wheelers" : "cars";
  const kindLabel = isTwoWheeler ? "Two Wheelers" : "Cars";

  const images = collectVehicleCdnImages(vehicle);
  const priceNum = Number(vehicle.price);
  const kmNum = Number(vehicle.kmDriven);

  const cityDisplay = (
    vehicle.cityName ||
    vehicle.vehicleAddress?.city ||
    vehicle.address?.city ||
    ""
  )
    .split(",")[0]
    .trim();

  const displayTitle = seo?.title || "Vehicle Details | Reecomm";
  const displayDescription =
    seo?.description ||
    "View detailed vehicle information, specs, price, and more.";
  const ogTitle = seo?.ogTitle || seo?.title || displayTitle;
  const ogDescription =
    seo?.ogDescription || seo?.description || displayDescription;

  // Authoritative SSR image — do not let client overwrite with a different asset
  let vehicleImageUrl =
    seo?.image ||
    images[0] ||
    "https://www.reecomm.com/logo/logo1.webp";
  if (
    vehicleImageUrl &&
    !vehicleImageUrl.startsWith("http") &&
    vehicleImageUrl !== "https://www.reecomm.com/logo/logo1.webp"
  ) {
    vehicleImageUrl =
      toCdnAbsolute(vehicleImageUrl, "detail") || vehicleImageUrl;
  }

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
          ? {
              numberOfPreviousOwners:
                Number(vehicle.ownership) || vehicle.ownership,
            }
          : {}),
        ...(images.length ? { image: images } : {}),
        ...(displayDescription ? { description: displayDescription } : {}),
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

  const brandSlug = slugifyPart(vehicle.makerName);
  const citySlug = slugifyPart(cityDisplay);

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
      name: isTwoWheeler ? "Used Two Wheelers" : "Used Cars",
      item: `https://www.reecomm.com/search/buy-used-${kindSlug}`,
    },
  ];

  if (vehicle.makerName) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: `Used ${vehicle.makerName} ${kindLabel}`,
      item: brandSearchUrl,
    });
  }

  if (citySlug && vehicle.makerName) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: breadcrumbItems.length + 1,
      name: `Used ${vehicle.makerName} ${kindLabel} in ${cityDisplay}`,
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

  const ogImageAlt =
    `${vehicle.yearOfMfg || ""} ${vehicle.makerName || ""} ${vehicle.modelName || ""} ${vehicle.variantName || ""}${cityDisplay ? ` in ${cityDisplay}` : ""}`.trim() ||
    displayTitle;

  return (
    <>
      <Head>
        <title>{displayTitle}</title>
        <meta name="description" content={displayDescription} />
        <meta name="robots" content="index, follow" />

        {seo?.canonical && (
          <link key="canonical" rel="canonical" href={seo.canonical} />
        )}

        {vehicleSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }}
          />
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />

        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta key="og:type" property="og:type" content="product" />
        <meta property="og:site_name" content="Reecomm" />
        {seo?.url && <meta property="og:url" content={seo.url} />}
        <meta key="og:image" property="og:image" content={vehicleImageUrl} />
        <meta
          key="og:image:alt"
          property="og:image:alt"
          content={ogImageAlt}
        />
        <link key="image_src" rel="image_src" href={vehicleImageUrl} />
        {vehicle.price && (
          <meta
            property="product:price:amount"
            content={String(vehicle.price)}
          />
        )}
        <meta property="product:price:currency" content="INR" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta
          key="twitter:image"
          name="twitter:image"
          content={vehicleImageUrl}
        />
      </Head>
      <Layout>
        <VehiclDetail
          initialOverview={initialOverview}
          initialSummary={null}
        />
      </Layout>
      <DownloadAppSection fullWidth />

      <FooterLink />
      <Footer />
    </>
  );
}

function formatTextCap(text) {
  if (!text) return "";
  return String(text).replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function getStaticPaths() {
  return {
    paths: [],
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

  let finalTitle = "Vehicle Details | Reecomm";
  let finalDescription =
    "Reecomm | Buy used vehicles. View detailed specs, photos, price, and contact information.";
  let finalImageUrl = `${protocol}://${host}/logo/logo1.webp`;
  let canonicalSlug = title || "vehicle";
  let initialOverview = null;

  if (title) {
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

  if (id) {
    try {
      const backendUrl =
        process.env.BACKEND_URL || "https://api.reecomm.online";
      const res = await fetch(
        `${backendUrl}/api/v1/website/vehicle/detail-page/${id}`,
        {
          headers: {
            Accept: "application/json",
            "X-Client-Type": getClientType(
              context?.req?.headers?.["user-agent"]
            ),
          },
          signal: AbortSignal.timeout(4000),
        }
      );

      if (res.ok) {
        const json = await res.json();
        const v = json?.data;

        if (v) {
          const generatedSlug = generateVehicleSlug(v);
          if (generatedSlug) {
            canonicalSlug = generatedSlug;
            if (title && title !== generatedSlug) {
              return {
                redirect: {
                  destination: `/vehicle/details/${generatedSlug}/${id}`,
                  permanent: true,
                },
              };
            }
          }

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
              [v.vehicleOwner?.firstname || "", v.vehicleOwner?.lastname || ""]
                .join(" ")
                .trim(),
          };

          initialOverview = JSON.parse(JSON.stringify(vehicleForSeo));

          const thumbnail =
            v.thumbnailUrl ||
            v.imageUrls?.[0] ||
            v.vehicleImages?.[0]?.imageUrl ||
            v.imageUrl ||
            "";

          if (thumbnail) {
            finalImageUrl =
              toCdnAbsolute(thumbnail, "detail") ||
              getCdnImageUrl(thumbnail, { preset: "detail" }) ||
              thumbnail;
          }

          if (v.makerName && v.modelName) {
            finalTitle = generateDynamicPageTitle(vehicleForSeo);
            finalDescription = generateDynamicMetaDescription(vehicleForSeo);
          }
        }
      }
    } catch {
      // API unavailable — slug-derived fallbacks remain active
    }
  }

  const canonicalUrl = `${protocol}://${host}/vehicle/details/${canonicalSlug}/${id}`;

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
      initialOverview,
    },
    revalidate: 60,
  };
}

Index.fullWidth = true;

export default Index;
