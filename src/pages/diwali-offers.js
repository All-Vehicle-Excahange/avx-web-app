import React from "react";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import FooterLink from "@/components/layout/FooterLink";
import Footer from "@/components/layout/Footer";
import DiwaliOffersExplore from "@/components/features/diwali-offers/DiwaliOffersExplore";

function DiwaliOffersPage() {
  return (
    <>
      <Head>
        <title>Diwali Mega Offers 2026 — Buy Used Cars &amp; Bikes | Reecomm</title>
        <meta
          name="description"
          content="Explore exclusive Diwali Dhamaka offers on verified used cars and bikes. Celebrate with festive discounts, verified inspection reports, and easy ownership transfer."
        />
        <meta
          name="keywords"
          content="Diwali car offers, Diwali bike offers, used cars Diwali discount, buy second hand car festive offers, Reecomm Diwali"
        />
        <link rel="canonical" href="https://www.reecomm.com/diwali-offers" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.reecomm.com/diwali-offers" />
        <meta
          property="og:title"
          content="Diwali Mega Offers 2026 — Buy Used Cars & Bikes | Reecomm"
        />
        <meta
          property="og:description"
          content="Celebrate this Diwali with certified pre-owned cars and bikes at exclusive festive pricing."
        />
        <meta property="og:image" content="https://www.reecomm.com/images/diwali/diwali-hero-banner.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Diwali Mega Offers 2026 — Buy Used Cars & Bikes | Reecomm"
        />
        <meta
          name="twitter:description"
          content="Celebrate this Diwali with certified pre-owned cars and bikes at exclusive festive pricing."
        />
        <meta name="twitter:image" content="https://www.reecomm.com/images/diwali/diwali-hero-banner.jpg" />
      </Head>

      <Navbar heroMode scrolled />

      <Layout>
        <DiwaliOffersExplore />
      </Layout>

      <FooterLink />
      <Footer />
    </>
  );
}

DiwaliOffersPage.fullWidth = true;

export default DiwaliOffersPage;
