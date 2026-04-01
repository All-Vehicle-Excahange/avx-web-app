import StoreFront from "@/components/features/storeFront/StoreFront";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function StoreFrontPage() {
  const router = useRouter();
  const { title } = router.query;
  
  // Format the title from slug: fleetcare-solutions -> Fleetcare Solutions
  const formattedTitle = title
    ? title.toString()
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
