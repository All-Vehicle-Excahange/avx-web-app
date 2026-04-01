import React from "react";
import DownloadAppSection from "@/components/features/home/DownloadAppSection";
import AvxProcess from "@/components/features/VehiclDetail/AvxProcess";
import VehiclDetail from "@/components/features/VehiclDetail/VehiclDetail";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { useRouter } from "next/router";

function index() {
  const router = useRouter();
  const { title } = router.query;
  const slug = title
    ? title.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
    : "Vehicle Details";
  return (
    <>
      <Head>
        <title>{slug} | Reecomm</title>
        <meta name="description" content="View detailed vehicle information, specs, price, and more." />
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

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}

export default index;
