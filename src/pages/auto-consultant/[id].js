import StoreFront from "@/components/features/storeFront/StoreFront";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getStoreFrontByUsernameQuery } from "@/queries/user.queries";
import { getStoreFrontByUsername } from "@/services/user.service";
import StoreFrontHeroSkeleton from "@/components/ui/skeleton/StoreFrontHeroSkeleton";

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
        {seo?.canonical && <link key="canonical" rel="canonical" href={seo.canonical} />}

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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params || {};

  // Construct the full current URL dynamically using params
  const protocol = process.env.NEXT_PUBLIC_API_URL?.includes("localhost") ? "http" : "https";
  const host = process.env.NEXT_PUBLIC_DOMAIN || "www.reecomm.com";
  const currentUrl = `${protocol}://${host}/auto-consultant/${id}`;

  // Fallback slug formatting (fast and synchronous)
  let finalTitle = id
    ? id
        .toString()
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "StoreFront Details";

  let storefrontImageUrl = `${protocol}://${host}/logo/logo1.webp`;

  try {
    if (id) {
      const apiUrl = `${process.env.BACKEND_URL}/api/v1/website/consultation/detail-page/by-username/${id}`;
      const res = await fetch(apiUrl);
      if (res.ok) {
        const response = await res.json();
        if (response && response.data) {
          const storeDetails = response.data;
          if (storeDetails.consultationName) {
            finalTitle = storeDetails.consultationName;
          }
          if (storeDetails.logoUrl) {
            storefrontImageUrl = storeDetails.logoUrl;
          } else if (storeDetails.bannerUrl) {
            storefrontImageUrl = storeDetails.bannerUrl;
          }
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch storefront details for SEO:", error);
  }

  return {
    props: {
      seo: {
        title: `${finalTitle} | Reecomm`,
        description: `View the ${finalTitle} storefront, certified inventory, and customer reviews on Reecomm.`,
        image: storefrontImageUrl,
        url: currentUrl,
        canonical: `https://www.reecomm.com/auto-consultant/${id}`,
      },
    },
    revalidate: 60,
  };
}
