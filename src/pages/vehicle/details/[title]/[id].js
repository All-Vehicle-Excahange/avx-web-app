import React from "react";
import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import AvxProcess from "@/components/features/VehiclDetail/AvxProcess";
import VehiclDetail from "@/components/features/VehiclDetail/VehiclDetail";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { useRouter } from "next/router";

function Index({ seo }) {
  return (
    <>
      <Head>
        <title>{seo?.title || "Vehicle Details | Reecomm"}</title>
        <meta name="description" content={seo?.description || "View detailed vehicle information, specs, price, and more."} />

        {/* OpenGraph Tags for WhatsApp, Facebook, LinkedIn sharing */}
        <meta property="og:title" content={seo?.title || "Vehicle Details | Reecomm"} />
        <meta property="og:description" content={seo?.description || "View detailed vehicle information, specs, price, and more."} />
        <meta property="og:type" content="website" />
        {seo?.url && <meta property="og:url" content={seo.url} />}
        {seo?.image && <meta property="og:image" content={seo.image} />}

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo?.title || "Vehicle Details | Reecomm"} />
        <meta name="twitter:description" content={seo?.description || "View detailed vehicle information, specs, price, and more."} />
        {seo?.image && <meta name="twitter:image" content={seo.image} />}
      </Head>
      <Layout>
        <VehiclDetail />
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
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host || 'www.reecomm.com';
  const currentUrl = `${protocol}://${host}${req.url}`;

  const slug = title
    ? title.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
    : "Vehicle Details";

  let vehicleImageUrl = "";

  // --------------------------------------------------------------------------
  // TODO: Fetch the specific vehicle's image using the 'id'
  // --------------------------------------------------------------------------
  try {
    // UNCOMMENT and UPDATE this with your actual API endpoint for getting a single vehicle
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/${id}`);
    // const data = await response.json();
    // vehicleImageUrl = data?.vehicle?.imageUrl || ""; 
  } catch (e) {
    console.error("Failed to fetch vehicle image for OG tags", e);
  }

  // Fallback image if none found or API not hooked up yet
  if (!vehicleImageUrl) {
    // Defaulting to the Reecomm logo if no vehicle image is provided
    vehicleImageUrl = `${protocol}://${host}/logo/logo.webp`;
  }

  return {
    props: {
      fullWidth: true,
      seo: {
        title: `${slug} | Reecomm`,
        description: `View detailed information, specs, and price for ${slug} on Reecomm. Certified and inspected used vehicles.`,
        image: vehicleImageUrl,
        url: currentUrl,
      },
    },
  };
}

export default Index;
