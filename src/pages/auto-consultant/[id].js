import StoreFront from "@/components/features/storeFront/StoreFront";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getStoreFrontByUsernameQuery } from "@/queries/user.queries";
import StoreFrontHeroSkeleton from "@/components/ui/skeleton/StoreFrontHeroSkeleton";
import axios from "axios";

async function fetchStoreFrontServer(username) {
  const envUrl =
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "";
  let base = "https://api.reecomm.online/api/v1/website";
  if (envUrl.startsWith("http")) {
    base = envUrl.endsWith("/api/v1/website")
      ? envUrl
      : `${envUrl.replace(/\/$/, "")}/api/v1/website`;
  }
  try {
    const res = await axios.get(
      `${base}/consultation/detail-page/by-username/${encodeURIComponent(username)}`,
      { timeout: 12000, headers: { Accept: "application/json" } }
    );
    return res.data?.data || res.data || null;
  } catch (e) {
    console.warn("[auto-consultant SSR] fetch failed:", e.message);
    return null;
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
  let displayImage = seo?.image || "";

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

        {seo?.canonical && (
          <link key="canonical" rel="canonical" href={seo.canonical} />
        )}

        <meta property="og:title" content={displayTitle} />
        <meta property="og:description" content={displayDescription} />
        {displayImage && <meta property="og:image" content={displayImage} />}
        {seo?.canonical && <meta property="og:url" content={seo.canonical} />}
        <meta property="og:type" content="profile" />

        <meta name="twitter:card" content="summary_large_image" />
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
      ? consultationName
          .split(" ")
          .filter(Boolean)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
      : "StoreFront Details";

  const currentUsername = store.username || id;
  const currentUrl = `${canonicalBase}/${currentUsername}`;
  const storefrontImageUrl =
    store.logoUrl || `https://${host}/logo/logo.webp`;

  return {
    props: {
      seo: {
        title: `${displayName} | Reecomm`,
        description: `View the ${displayName} storefront, certified inventory, and customer reviews on Reecomm.`,
        image: storefrontImageUrl,
        url: currentUrl,
        canonical: currentUrl,
      },
    },
    revalidate: 60,
  };
}
