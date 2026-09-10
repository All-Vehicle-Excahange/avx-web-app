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
        <title>Sell Your Car on Reecomm — Faster, Trusted</title>
        <meta
          name="description"
          content="Sell your car faster on India's trusted platform Reecomm. List free, reach verified buyers, inquire securely."
        />
        <meta
          name="keywords"
          content="sell used car online India, become car seller Reecomm, zero commission car listing, verified buyer vehicle marketplace"
        />
        <link rel="canonical" href="https://www.reecomm.com/become-seller" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.reecomm.com/become-seller" />
        <meta
          property="og:title"
          content="Sell Your Car on Reecomm — Faster, Trusted"
        />
        <meta
          property="og:description"
          content="Sell your car faster on India's trusted platform Reecomm. List free, reach verified buyers, inquire securely."
        />
        <meta property="og:image" content="https://www.reecomm.com/logo/logo1.webp" />
        <meta
          property="og:image:alt"
          content="Reecomm — India's trusted used vehicle marketplace become a seller guide"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@reecomm" />
        <meta
          name="twitter:title"
          content="Sell Your Car on Reecomm — Faster, Trusted"
        />
        <meta
          name="twitter:description"
          content="Sell your car faster on India's trusted platform Reecomm. List free, reach verified buyers, inquire securely."
        />
        <meta name="twitter:image" content="https://www.reecomm.com/logo/logo1.webp" />
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


