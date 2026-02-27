import CategoryPage from "@/components/features/help/CategoryPage";
import FAQSections from "@/components/features/help/FAQSection";
import HelpHero from "@/components/features/help/HelpHero";
import PopularTopicsGrid from "@/components/features/help/PopularTopics";
import SupportBridge from "@/components/features/help/SupportBridge";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import React from "react";

function index() {
  return (
    <>
      <Navbar />
      <HelpHero />
      <PopularTopicsGrid />
      <CategoryPage />
      <FAQSections />
      <SupportBridge />
      <Footer />
    </>
  );
}

export default index;
