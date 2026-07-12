import React from "react";
import Head from "next/head";
import Navbar from "@/components/layout/Navbar";
import FooterLink from "@/components/layout/FooterLink";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/features/userSeller/Hero";
import HowAvxWorks from "@/components/features/userSeller/HowAvxWorks";
import DocumentRequired from "@/components/features/userSeller/DocumentRequired";
import Layout from "@/components/layout/Layout";
import InspectionAdvantage from "@/components/features/userSeller/InspectionAdvantage";
import WhoCanSell from "@/components/features/userSeller/WhoCanSell";
import Faq from "@/components/features/userSeller/Faq";
import WhySellOnAvx from "@/components/features/userSeller/WhySellOnAvx";

function index() {
  return (
    <>
      <Head>
        <title>Sell Your Used Vehicle Online — Become a Seller on Reecomm</title>
        <meta
          name="description"
          content="List your pre-owned car or bike on Reecomm. Verify your identity, create a listing, reach thousands of verified buyers directly, and pay zero commission."
        />
        <meta
          name="keywords"
          content="sell used car online India, become car seller Reecomm, zero commission car listing, verified buyer vehicle marketplace"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reecomm.com/become-seller" />
        <meta property="og:title" content="Become a Reecomm Seller — Sell Your Used Vehicle with Zero Commission" />
        <meta
          property="og:description"
          content="Reecomm is the marketplace built for serious vehicle owners. List your car, reach verified buyers directly, track real inquiries, and sell with absolute confidence."
        />
        <meta property="og:image" content="https://reecomm.com/logo/logo.webp" />
        <meta
          property="og:image:alt"
          content="Reecomm — India's trusted used vehicle marketplace become a seller guide"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reecomm" />
        <meta name="twitter:title" content="Become a Reecomm Seller — Sell Your Used Vehicle with Zero Commission" />
        <meta
          name="twitter:description"
          content="No dealers, no middleman. Verify your ownership, create a listing, get qualified buyer inquiries, and pay zero commission."
        />
        <meta name="twitter:image" content="https://reecomm.com/logo/logo.webp" />
        <meta name="twitter:image:alt" content="Reecomm — India's trusted used vehicle marketplace" />
      </Head>
      <Navbar heroMod scrolled />
      <Hero />
      <Layout>
        <WhySellOnAvx />
        <HowAvxWorks />
        <InspectionAdvantage />
        <WhoCanSell />
        <DocumentRequired />
        <Faq />
      </Layout>
      <FooterLink />
      <Footer />
    </>
  );
}
index.fullWidth = true;

export default index;


