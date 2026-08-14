import React from "react";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getVehicleOverviewQuery } from "@/queries/vehicle.queries";
import ConsualtVehicleDetails from "@/components/features/consult/vehicleDetails/ConsualtVehicleDetails";

function Index({ seo, consultantSlug, vehicleId }) {
  const router = useRouter();
  const { slug } = router.query || {};

  // Extract ID from catch-all array if client-side fallback is needed
  const resolvedId =
    vehicleId ||
    (Array.isArray(slug) && slug.length > 0 ? slug[slug.length - 1] : null);

  const { data: vehicleOverview } = useQuery({
    ...getVehicleOverviewQuery(resolvedId),
    enabled: !!resolvedId,
  });

  const vehicle = vehicleOverview || {};

  const consultantNameClean = consultantSlug
    ? consultantSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "";

  // Construct Schema.org Vehicle & Seller data dynamically
  const vehicleSchema = vehicle.id
    ? {
        "@context": "https://schema.org",
        "@type": "Vehicle",
        name: `${vehicle.yearOfMfg || ""} ${vehicle.makerName || ""} ${vehicle.modelName || ""} ${vehicle.variantName || ""}`.trim(),
        brand: { "@type": "Brand", name: vehicle.makerName },
        model: vehicle.modelName,
        vehicleModelDate: vehicle.yearOfMfg,
        fuelType: vehicle.fuelType,
        mileageFromOdometer: { value: vehicle.kmDriven, unitCode: "KMT" },
        vehicleTransmission: vehicle.transmissionType,
        numberOfPreviousOwners: vehicle.ownership,
        image: vehicle.thumbnailUrl || vehicle.imageUrls?.[0],
        description: seo?.description,
        offers: {
          "@type": "Offer",
          price: vehicle.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          seller: consultantSlug
            ? {
                "@type": "AutoDealer",
                name: vehicle.consultantName || consultantNameClean,
                url: `https://www.reecomm.com/auto-consultant/${consultantSlug}`,
              }
            : {
                "@type": "Organization",
                name: "Reecomm",
              },
        },
      }
    : null;

  // Construct Breadcrumb schema dynamically
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
      name: "Auto Consultants",
      item: "https://www.reecomm.com/search",
    },
  ];

  if (consultantSlug) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: vehicle.consultantName || consultantNameClean,
      item: `https://www.reecomm.com/auto-consultant/${consultantSlug}`,
    });
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 4,
      name: `${vehicle.yearOfMfg || ""} ${vehicle.makerName || ""} ${vehicle.modelName || ""}`.trim(),
    });
  } else {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: `${vehicle.yearOfMfg || ""} ${vehicle.makerName || ""} ${vehicle.modelName || ""}`.trim(),
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  // Dynamic SEO calculation on client-side data resolution
  let displayTitle = seo?.title || `Vehicle Details | Reecomm`;
  let displayDescription =
    seo?.description ||
    `View vehicle specs, price, and condition on Reecomm.`;
  let ogTitle = seo?.ogTitle || displayTitle;
  let ogDescription = seo?.ogDescription || displayDescription;
  let vehicleImageUrl = seo?.image || "";

  if (vehicleOverview) {
    const formatPrice = (num) => {
      if (!num) return "N/A";
      if (typeof num === "string" && num.toUpperCase().includes("L"))
        return num;
      const val = Number(num);
      if (isNaN(val)) return num;
      if (val >= 100000) {
        return (val / 100000).toFixed(2).replace(/\.00$/, "") + "L";
      }
      return val.toLocaleString("en-IN");
    };

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

    const formatText = (text) =>
      text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";
    const fuel = formatText(
      vehicleOverview.fuelType || vehicleOverview.fuel || "",
    );
    const transmission = formatText(
      vehicleOverview.transmissionType || vehicleOverview.transmission || "",
    );
    const consultantName = vehicleOverview.consultantName || consultantNameClean;

    vehicleImageUrl =
      vehicleOverview.thumbnailUrl || vehicleOverview.imageUrls?.[0] || "";

    if (consultantName) {
      displayTitle =
        `Buy Used ${year} ${make} ${model} ${variant} from ${consultantName} in ${city} — ₹${formattedPrice} | Reecomm`
          .replace(/\s+/g, " ")
          .trim();
      displayDescription =
        `Buy this ${year} ${make} ${model} in ${city} for ₹${formattedPrice} from ${consultantName}. ${kms} km driven · ${fuel} · ${transmission}. View photos & specs on Reecomm.`
          .replace(/\s+/g, " ")
          .trim();
      ogTitle = `${year} ${make} ${model} · ₹${formattedPrice} · ${consultantName}`
        .replace(/\s+/g, " ")
        .trim();
    } else {
      displayTitle =
        `${year} ${make} ${model} ${variant} for Sale in ${city} — ₹${formattedPrice} | Reecomm`
          .replace(/\s+/g, " ")
          .trim();
      displayDescription =
        `Buy this ${year} ${make} ${model} in ${city} for ₹${formattedPrice}. ${kms} km driven · ${fuel} · ${transmission}. View full specs, photos, and contact the seller on Reecomm.`
          .replace(/\s+/g, " ")
          .trim();
      ogTitle = `${year} ${make} ${model} · ₹${formattedPrice} · ${city}`
        .replace(/\s+/g, " ")
        .trim();
    }

    ogDescription =
      `${kms} km · ${fuel} · ${transmission}${consultantName ? ` · Sold by ${consultantName}` : ""}`
        .replace(/\s+/g, " ")
        .trim();
  }

  return (
    <>
      <Head>
        <title>{displayTitle}</title>
        <meta name="description" content={displayDescription} />

        {/* JSON-LD Structured Data */}
        {vehicleSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        {/* OpenGraph Tags */}
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:type" content="product" />
        {seo?.url && <meta property="og:url" content={seo.url} />}
        {vehicleImageUrl && (
          <meta property="og:image" content={vehicleImageUrl} />
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
        <ConsualtVehicleDetails initialOverview={null} initialSummary={null} />
      </Layout>
      <FooterLink />
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, params } = context;
  const slugParts = params?.slug || [];

  let consultantSlug = "";
  let vehicleSlug = "";
  let vehicleId = "";

  if (slugParts.length >= 3) {
    // Format: /vehicle/details/[consultantSlug]/[title]/[id]
    if (slugParts[0] !== "consualt") {
      consultantSlug = slugParts[0];
    }
    vehicleSlug = slugParts[1];
    vehicleId = slugParts[2];
  } else if (slugParts.length === 2) {
    // Format: /vehicle/details/[title]/[id]
    vehicleSlug = slugParts[0];
    vehicleId = slugParts[1];
  } else if (slugParts.length === 1) {
    // Format: /vehicle/details/[id]
    vehicleId = slugParts[0];
  }

  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host || "www.reecomm.com";
  const currentUrl = `${protocol}://${host}${req.url}`;

  const cleanConsultant = consultantSlug
    ? consultantSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "";

  const cleanTitle = vehicleSlug
    ? vehicleSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Vehicle Details";

  const finalTitle = cleanConsultant
    ? `${cleanTitle} from ${cleanConsultant} | Reecomm`
    : `${cleanTitle} | Reecomm`;
  const finalDescription = cleanConsultant
    ? `Buy ${cleanTitle} from ${cleanConsultant} on Reecomm. View detailed specs, pricing, and condition report.`
    : `Buy ${cleanTitle} at Reecomm. View detailed vehicle information, specs, price, and more.`;

  return {
    props: {
      consultantSlug,
      vehicleId,
      seo: {
        title: finalTitle,
        description: finalDescription,
        ogTitle: finalTitle,
        ogDescription: finalDescription,
        image: `${protocol}://${host}/logo/logo.webp`,
        url: currentUrl,
      },
    },
  };
}

Index.fullWidth = true;

export default Index;
