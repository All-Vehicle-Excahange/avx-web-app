import React from "react";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getVehicleOverviewQuery } from "@/queries/vehicle.queries";
import ConsualtVehicleDetails from "@/components/features/consult/vehicleDetails/ConsualtVehicleDetails";

function Index({ seo }) {
  const router = useRouter();
  const { id } = router.query || {};

  const { data: vehicleOverview } = useQuery({
    ...getVehicleOverviewQuery(id),
    enabled: !!id,
  });

  const vehicle = vehicleOverview || {};

  // Construct Schema.org Vehicle data dynamically
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
          seller: { "@type": "Organization", name: "Reecomm" },
        },
      }
    : null;

  // Construct Breadcrumb schema dynamically
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://reecomm.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Used Cars",
        item: "https://reecomm.com/search",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: vehicle.makerName || "Brands",
        item: `https://reecomm.com/search?brand=${encodeURIComponent(vehicle.makerName || "")}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${vehicle.yearOfMfg || ""} ${vehicle.makerName || ""} ${vehicle.modelName || ""}`.trim(),
      },
    ],
  };

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

        {/* OpenGraph Tags for WhatsApp, Facebook, LinkedIn sharing */}
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
  const { title } = params || {};

  // Construct the full current URL dynamically
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host || "www.reecomm.com";
  const currentUrl = `${protocol}://${host}${req.url}`;

  // Simple, fast conversion from slug title to clean words
  const cleanTitle = title
    ? title.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Vehicle Details";

  const finalTitle = `${cleanTitle} | Reecomm`;
  const finalDescription = `Buy ${cleanTitle} at Reecomm. View detailed vehicle information, specs, price, and more.`;

  return {
    props: {
      seo: {
        title: finalTitle,
        description: finalDescription,
        ogTitle: finalTitle,
        ogDescription: finalDescription,
        image: `${protocol}://${host}/logo/logo1.webp`,
        url: currentUrl,
      },
    },
  };
}

Index.fullWidth = true;

export default Index;
