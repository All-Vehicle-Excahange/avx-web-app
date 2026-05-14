import React from "react";
import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import AvxProcess from "@/components/features/VehiclDetail/AvxProcess";
import VehiclDetail from "@/components/features/VehiclDetail/VehiclDetail";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { useRouter } from "next/router";

function Index({ seo, seoVehicle }) {
  const vehicle = seoVehicle || {};

  // Construct Schema.org Vehicle data
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

  // Construct Breadcrumb schema
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

  return (
    <>
      <Head>
        <title>{seo?.title || "Vehicle Details | Reecomm"}</title>
        <meta
          name="description"
          content={
            seo?.description ||
            "View detailed vehicle information, specs, price, and more."
          }
        />

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
        <meta
          property="og:title"
          content={seo?.ogTitle || seo?.title || "Vehicle Details | Reecomm"}
        />
        <meta
          property="og:description"
          content={
            seo?.ogDescription ||
            seo?.description ||
            "View detailed vehicle information, specs, price, and more."
          }
        />
        <meta property="og:type" content="product" />
        {seo?.url && <meta property="og:url" content={seo.url} />}
        {seo?.image && <meta property="og:image" content={seo.image} />}

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={seo?.ogTitle || seo?.title || "Vehicle Details | Reecomm"}
        />
        <meta
          name="twitter:description"
          content={
            seo?.ogDescription ||
            seo?.description ||
            "View detailed vehicle information, specs, price, and more."
          }
        />
        {seo?.image && <meta name="twitter:image" content={seo.image} />}
      </Head>
      <Layout>
        <VehiclDetail
          initialOverview={null}
          initialSummary={null}
        />
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

export async function getServerSideProps(context) {
  const { req, params } = context;
  const { title, id } = params || {};

  // Construct the full current URL dynamically
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host || "www.reecomm.com";
  const currentUrl = `${protocol}://${host}${req.url}`;

  let vehicleImageUrl = "";
  let finalTitle = "Vehicle Details | Reecomm";
  let finalDescription =
    "View detailed vehicle information, specs, price, and more.";
  let ogTitle = "";
  let ogDescription = "";
  let seoVehicle = null;

  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://api.reecomm.com/api/v1";

    // 1. Fetch Vehicle Overview
    const response = await fetch(`${apiUrl}/vehicle/detail-page/${id}`);

    if (response.ok) {
      const json = await response.json();
      const vehicle = json?.data || {};

      seoVehicle = {
        id: vehicle.id || null,
        yearOfMfg: vehicle.yearOfMfg || vehicle.year || "",
        makerName: vehicle.makerName || "",
        modelName: vehicle.modelName || "",
        variantName: vehicle.variantName || "",
        fuelType: vehicle.fuelType || vehicle.fuel || "",
        kmDriven: vehicle.kmDriven || 0,
        transmissionType: vehicle.transmissionType || vehicle.transmission || "",
        ownership: vehicle.ownership || "",
        thumbnailUrl: vehicle.thumbnailUrl || vehicle.imageUrls?.[0] || "",
        price: vehicle.price || "",
      };

      // Helper to format price to "L" (Lakhs) if needed
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

      const year = vehicle.yearOfMfg || vehicle.year || "";
      const make = vehicle.makerName || "";
      const model = vehicle.modelName || "";
      const variant = vehicle.variantName || "";
      const city = vehicle.address?.city || vehicle.location || "India";

      const formattedPrice = formatPrice(vehicle.price);
      const kms = vehicle.kmDriven
        ? Number(vehicle.kmDriven).toLocaleString("en-IN")
        : "0";

      const formatText = (text) =>
        text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";
      const fuel = formatText(vehicle.fuelType || vehicle.fuel || "");
      const transmission = formatText(
        vehicle.transmissionType || vehicle.transmission || "",
      );
      const inspectionText = vehicle.avxInspectionRating
        ? "Reecomm Inspected"
        : "Seller listed";

      vehicleImageUrl = vehicle.thumbnailUrl || vehicle.imageUrls?.[0] || "";

      // Dynamic Title: [Year] [Make] [Model] [Variant] for Sale in [City] — ₹[Price] | Reecomm
      finalTitle =
        `${year} ${make} ${model} ${variant} for Sale in ${city} — ₹${formattedPrice} | Reecomm`
          .replace(/\s+/g, " ")
          .trim();

      // Dynamic Description: Buy this [Year] [Make] [Model] in [City] for ₹[Price]. [X] km driven · [Fuel] · [Transmission]. [Reecomm Inspected / Seller listed]. View full specs, photos, and contact the seller on Reecomm.
      finalDescription =
        `Buy this ${year} ${make} ${model} in ${city} for ₹${formattedPrice}. ${kms} km driven · ${fuel} · ${transmission}. ${inspectionText}. View full specs, photos, and contact the seller on Reecomm.`
          .replace(/\s+/g, " ")
          .trim();

      // OG Title: [Year] [Make] [Model] · ₹[Price] · [City]
      ogTitle = `${year} ${make} ${model} · ₹${formattedPrice} · ${city}`
        .replace(/\s+/g, " ")
        .trim();

      // OG Description: [X] km · [Fuel] · [Transmission] · [Inspected badge if applicable]
      ogDescription =
        `${kms} km · ${fuel} · ${transmission} ${vehicle.avxInspectionRating ? "· ✓ Reecomm Inspected" : ""}`
          .replace(/\s+/g, " ")
          .trim();
    }
  } catch (e) {
    console.error("Failed to fetch vehicle data for SEO tags:", e.message);
  }

  // Fallback title if API fails
  if (finalTitle === "Vehicle Details | Reecomm" && title) {
    const slug = title
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    finalTitle = `${slug} | Reecomm`;
  }

  if (!vehicleImageUrl) {
    vehicleImageUrl = `${protocol}://${host}/logo/logo.webp`;
  }

  return {
    props: {
      seoVehicle,
      seo: {
        title: finalTitle,
        description: finalDescription,
        ogTitle: ogTitle,
        ogDescription: ogDescription,
        image: vehicleImageUrl,
        url: currentUrl,
      },
    },
  };
}

Index.fullWidth = true;

export default Index;
