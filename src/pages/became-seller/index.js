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
         <title>Become a Seller | Reecomm</title>
         <meta name="description" content="Join Reecomm as a seller and reach thousands of verified buyers with no commission." />
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

export default index;

export function getServerSideProps() {
  return {
    props: { fullWidth: true },
  };
}
