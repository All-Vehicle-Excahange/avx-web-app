import StoreFront from "@/components/features/storeFront/StoreFront";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function StoreFrontPage() {
  const router = useRouter();
  const { id } = router.query;
  
  // Format the title from slug/id if title is not available
  const formattedTitle = id
    ? id.toString()
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "StoreFront Details";

  return (
    <>
      <Head>
        <title>{formattedTitle} | Reecomm</title>
        <meta name="description" content={`View ${formattedTitle} storefront, inventory, and reviews.`} />
      </Head>
      <StoreFront />
    </>
  );
}

export default StoreFrontPage;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
