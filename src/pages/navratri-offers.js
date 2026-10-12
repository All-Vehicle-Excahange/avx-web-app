import React from "react";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import FooterLink from "@/components/layout/FooterLink";
import Footer from "@/components/layout/Footer";
import NavratriSectionExplore from "@/components/features/navratri-offers/NavratriSectionExplore";

function NavratriOffersPage() {
  return (
    <>
      <Head>
        <title>Navratri Mega Offers - Reecomm</title>
        <meta name="description" content="Explore exclusive Navratri offers on used cars and bikes. Big discounts and exchange bonuses." />
      </Head>

      <Navbar heroMode scrolled />

      <Layout>
        <NavratriSectionExplore />
      </Layout>

      <FooterLink />
      <Footer />
    </>
  );
}

NavratriOffersPage.fullWidth = true;

export default NavratriOffersPage;
