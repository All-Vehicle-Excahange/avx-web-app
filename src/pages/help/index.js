import CategoryPage from "@/components/features/help/CategoryPage";
import FAQSections from "@/components/features/help/FAQSection";
import HelpBanner from "@/components/features/help/HelpBanner";
import HelpHero from "@/components/features/help/HelpHero";
import PopularTopicsGrid from "@/components/features/help/PopularTopics";
import SupportBridge from "@/components/features/help/SupportBridge";
import FooterLink from "@/components/layout/FooterLink";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import React from "react";
import Head from "next/head";

function index() {
  return (
    <>
      <Head>
        <title>Help Center | Reecomm</title>
        <meta
          name="description"
          content="Get help with Reecomm – solutions for vehicle inspections, consultant earnings, and business growth tools."
        />
      </Head>
      <Navbar />
      <HelpHero />
      <PopularTopicsGrid />
      <CategoryPage />
      <HelpBanner />
      <FAQSections />
      <SupportBridge />
      <FooterLink />
      <Footer />
    </>
  );
}

index.fullWidth = true;

export default index;
