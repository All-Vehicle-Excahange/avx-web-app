import StoreFront from "@/components/features/storeFront/StoreFront";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function StoreFrontPage({ seo }) {
  return (
    <>
      <Head>
        <title>{seo?.title || "StoreFront Details | Reecomm"}</title>
        <meta name="description" content={seo?.description || "View storefront, inventory, and reviews."} />
        
        {/* OpenGraph Tags for Social Sharing */}
        <meta property="og:title" content={seo?.title || "StoreFront Details | Reecomm"} />
        <meta property="og:description" content={seo?.description || "View storefront, inventory, and reviews."} />
        <meta property="og:type" content="website" />
        {seo?.url && <meta property="og:url" content={seo.url} />}
        {seo?.image && <meta property="og:image" content={seo.image} />}

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo?.title || "StoreFront Details | Reecomm"} />
        <meta name="twitter:description" content={seo?.description || "View storefront, inventory, and reviews."} />
        {seo?.image && <meta name="twitter:image" content={seo.image} />}
      </Head>
      <StoreFront />
    </>
  );
}

export default StoreFrontPage;

export async function getServerSideProps(context) {
  const { req, params } = context;
  const { id } = params || {};

  // Construct the full current URL dynamically
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host || 'www.reecomm.com';
  const currentUrl = `${protocol}://${host}${req.url}`;

  let storefrontImageUrl = "";
  let fetchedStoreName = "";

  // --------------------------------------------------------------------------
  // TODO: Fetch the specific storefront's data using the 'id' (username)
  // --------------------------------------------------------------------------
  try {
    // UNCOMMENT and UPDATE this with your actual API endpoint for getting a storefront
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store-front/${id}`);
    // const data = await response.json();
    // storefrontImageUrl = data?.store?.logoUrl || ""; 
    // fetchedStoreName = data?.store?.name || ""; // Extract the actual name from your API
  } catch (e) {
    console.error("Failed to fetch storefront data for OG tags", e);
  }

  // Use the exact name from the API if available.
  // If the API isn't hooked up yet or fails, fallback to formatting the username slug.
  const finalTitle = fetchedStoreName || (id
    ? id.toString()
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "StoreFront Details");

  // Fallback image if none found or API not hooked up yet
  if (!storefrontImageUrl) {
    // Defaulting to the Reecomm logo if no storefront image is provided
    storefrontImageUrl = `${protocol}://${host}/logo/logo.webp`; 
  }

  return {
    props: {
      fullWidth: true,
      seo: {
        title: `${finalTitle} | Reecomm`,
        description: `View the ${finalTitle} storefront, certified inventory, and customer reviews on Reecomm.`,
        image: storefrontImageUrl,
        url: currentUrl,
      },
    },
  };
}
