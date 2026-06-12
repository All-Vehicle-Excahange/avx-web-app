import StoreFront from "@/components/features/storeFront/StoreFront";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getStoreFrontByUsernameQuery } from "@/queries/user.queries";

function StoreFrontPage({ seo }) {
  const router = useRouter();
  const { id } = router.query || {};

  const { data: storeDetails } = useQuery({
    ...getStoreFrontByUsernameQuery(id),
    enabled: !!id,
  });

  // Start with server-rendered/fallback values
  let displayTitle = seo?.title || "StoreFront Details | Reecomm";
  let displayDescription = seo?.description || "View storefront, inventory, and reviews.";
  let displayImage = seo?.image || "";

  // If client-side query loads the storefront data, update the SEO tags dynamically
  if (storeDetails) {
    const fetchedStoreName = storeDetails.consultationName || "";
    if (fetchedStoreName) {
      displayTitle = `${fetchedStoreName} | Reecomm`;
      displayDescription = `View the ${fetchedStoreName} storefront, certified inventory, and customer reviews on Reecomm.`;
    }
    if (storeDetails.logoUrl) {
      displayImage = storeDetails.logoUrl;
    }
  }

  return (
    <>
      <Head>
        <title>{displayTitle}</title>
        <meta name="description" content={displayDescription} />

        {/* Canonical */}
        {seo?.canonical && <link rel="canonical" href={seo.canonical} />}

        {/* OpenGraph Tags for Social Sharing */}
        <meta property="og:site_name" content="Reecomm" />
        <meta property="og:title" content={displayTitle} />
        <meta property="og:description" content={displayDescription} />
        <meta property="og:type" content="website" />
        {seo?.url && <meta property="og:url" content={seo.url} />}
        {seo?.canonical && <meta property="og:url" content={seo.canonical} />}
        {displayImage && <meta property="og:image" content={displayImage} />}

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reecomm" />
        <meta name="twitter:title" content={displayTitle} />
        <meta name="twitter:description" content={displayDescription} />
        {displayImage && <meta name="twitter:image" content={displayImage} />}
      </Head>
      <StoreFront />
    </>
  );
}

StoreFrontPage.fullWidth = true;

export default StoreFrontPage;

export async function getServerSideProps(context) {
  const { req, params } = context;
  const { id } = params || {};

  // Construct the full current URL dynamically
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host || "www.reecomm.com";
  const currentUrl = `${protocol}://${host}${req.url}`;

  // Fallback slug formatting (fast and synchronous)
  const finalTitle = id
    ? id
        .toString()
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "StoreFront Details";

  const storefrontImageUrl = `${protocol}://${host}/logo/logo.webp`;

  return {
    props: {
      seo: {
        title: `${finalTitle} | Reecomm`,
        description: `View the ${finalTitle} storefront, certified inventory, and customer reviews on Reecomm.`,
        image: storefrontImageUrl,
        url: currentUrl,
        canonical: `https://www.reecomm.com/store-front/${id}`,
      },
    },
  };
}
