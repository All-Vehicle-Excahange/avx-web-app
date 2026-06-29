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

function Index({ seo }) {
  const router = useRouter();
  const { id } = router.query || {};

  const { data: vehicleOverview } = useQuery({
    ...getVehicleOverviewQuery(id),
    enabled: !!id,
  });

  const vehicle = vehicleOverview || {};

  // ─── JSON-LD: Car Schema (uses @type: Car — more specific than Vehicle) ──
  const vehicleSchema = vehicle.id
    ? {
        "@context": "https://schema.org",
        "@type": "Car",
        name: `${vehicle.yearOfMfg || ""} ${vehicle.makerName || ""} ${vehicle.modelName || ""} ${vehicle.variantName || ""}`.trim(),
        brand: { "@type": "Brand", name: vehicle.makerName },
        model: vehicle.modelName,
        vehicleModelDate: String(vehicle.yearOfMfg || ""),
        fuelType: formatTextCap(vehicle.fuelType),
        vehicleTransmission: formatTextCap(vehicle.transmissionType),
        mileageFromOdometer: {
          "@type": "QuantitativeValue",
          value: vehicle.kmDriven,
          unitCode: "KMT",
        },
        numberOfPreviousOwners: vehicle.ownership,
        image: vehicle.thumbnailUrl || vehicle.imageUrls?.[0],
        description: seo?.description,
        url: seo?.url,
        vehicleConfiguration: vehicle.variantName,
        offers: {
          "@type": "Offer",
          price: vehicle.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/UsedCondition",
          seller: { "@type": "Organization", name: "Reecomm" },
        },
      }
    : null;

  // ─── JSON-LD: Breadcrumb Schema ─────────────────────────────────────
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.reecomm.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Used Cars",
        item: "https://www.reecomm.com/search",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: vehicle.makerName || "Brands",
        item: `https://www.reecomm.com/search?brand=${encodeURIComponent(vehicle.makerName || "")}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${vehicle.yearOfMfg || ""} ${vehicle.makerName || ""} ${vehicle.modelName || ""}`.trim(),
      },
    ],
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
    const year = vehicleOverview.yearOfMfg || vehicleOverview.year || "";
    const make = vehicleOverview.makerName || "";
    const model = vehicleOverview.modelName || "";
    const variant = vehicleOverview.variantName || "";
    const city =
      vehicleOverview.address?.city || vehicleOverview.location || "India";

    const formattedPrice = formatPrice(vehicleOverview.price);
    const kms = vehicleOverview.kmDriven
      ? Number(vehicleOverview.kmDriven).toLocaleString("en-IN")
      : "0";

    const fuel = formatTextCap(
      vehicleOverview.fuelType || vehicleOverview.fuel || "",
    );
    const transmission = formatTextCap(
      vehicleOverview.transmissionType || vehicleOverview.transmission || "",
    );
    const inspectionText = vehicleOverview.avxInspectionRating
      ? "Reecomm Inspected"
      : "Seller listed";

    vehicleImageUrl =
      vehicleOverview.thumbnailUrl || vehicleOverview.imageUrls?.[0] || "";

    displayTitle =
      `${year} ${make} ${model} ${variant} for Sale in ${city} — ₹${formattedPrice} | Reecomm`
        .replace(/\s+/g, " ")
        .trim();
    displayDescription =
      `Buy this ${year} ${make} ${model} in ${city} for ₹${formattedPrice}. ${kms} km driven · ${fuel} · ${transmission}. ${inspectionText}. View full specs, photos, and contact the seller on Reecomm.`
        .replace(/\s+/g, " ")
        .trim();
    ogTitle = `${year} ${make} ${model} · ₹${formattedPrice} · ${city}`
      .replace(/\s+/g, " ")
      .trim();
    ogDescription =
      `${kms} km · ${fuel} · ${transmission} ${vehicleOverview.avxInspectionRating ? "· ✓ Reecomm Inspected" : ""}`
        .replace(/\s+/g, " ")
        .trim();
  }

  return (
    <>
      <Head>
        <title>{displayTitle}</title>
        <meta name="description" content={displayDescription} />
        <meta name="robots" content="index, follow" />

        {/* Canonical URL */}
        {seo?.canonical && <link rel="canonical" href={seo.canonical} />}

        {/* JSON-LD Structured Data: Car */}
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
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="Reecomm" />
        {seo?.url && <meta property="og:url" content={seo.url} />}
        {vehicleImageUrl && (
          <meta property="og:image" content={vehicleImageUrl} />
        )}
        {vehicleImageUrl && (
          <meta property="og:image:alt" content={displayTitle} />
        )}

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        {vehicleImageUrl && (
          <meta name="twitter:image" content={vehicleImageUrl} />
        )}
      </Head>
      <Layout>
        <VehiclDetail initialOverview={null} initialSummary={null} />
      </Layout>
      <Layout>
        <AvxProcess />
      </Layout>
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

// ─── Server-Side Props (slug-based SEO — no API call needed) ────────────────

export async function getStaticPaths() {
  return {
    // Generate pages on-demand rather than at build time
    paths: [], 
    // 'blocking' will wait for the HTML to be generated on the first request 
    // before sending it to the browser, ensuring perfect SEO for the first hit
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { title, id } = params || {};

  // Construct the full current URL dynamically using params
  // Since 'req' is not available in getStaticProps, we build it directly
  const protocol = process.env.NEXT_PUBLIC_API_URL?.includes("localhost") ? "http" : "https";
  const host = process.env.NEXT_PUBLIC_DOMAIN || "www.reecomm.com";
  const canonicalUrl = `${protocol}://${host}/vehicle/details/${title}/${id}`;
  const currentUrl = canonicalUrl;

  // Simple, fast conversion from slug title to clean words
  const cleanTitle = title
    ? title
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "Vehicle Details";

  let finalTitle = `${cleanTitle} | Reecomm`;
  let finalDescription = `Buy ${cleanTitle} at Reecomm. View detailed vehicle information, specs, price, and more.`;
  let finalImageUrl = `${protocol}://${host}/logo/logo.webp`;

  try {
    if (id) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (apiUrl) {
        const response = await fetch(`${apiUrl}/vehicle/detail-page/${id}`);
        if (response.ok) {
          const resJson = await response.json();
          const vehicle = resJson?.data;
          if (vehicle) {
            finalImageUrl = vehicle.thumbnailUrl || vehicle.imageUrls?.[0] || finalImageUrl;
            
            const year = vehicle.yearOfMfg || vehicle.year || "";
            const make = vehicle.makerName || "";
            const model = vehicle.modelName || "";
            const variant = vehicle.variantName || "";
            const city = vehicle.address?.city || vehicle.location || "India";
            
            if (make || model) {
              finalTitle = `${year} ${make} ${model} ${variant} for Sale in ${city} | Reecomm`.replace(/\s+/g, " ").trim();
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch vehicle SEO data:", error);
  }

  return {
    props: {
      seo: {
        title: finalTitle,
        description: finalDescription,
        ogTitle: finalTitle,
        ogDescription: finalDescription,
        image: finalImageUrl,
        url: currentUrl,
        canonical: canonicalUrl,
      },
    },
    // Next.js will attempt to re-generate the page in the background:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: 60,
  };
}

Index.fullWidth = true;

export default Index;
