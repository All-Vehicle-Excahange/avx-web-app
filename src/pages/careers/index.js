import FooterLink from "@/components/layout/FooterLink";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CareersComponent from "@/components/features/careers/CareersComponent";
import Head from "next/head";
import React from "react";
import Layout from "@/components/layout/Layout";

function index() {
  return (
    <>
      <Head>
        <title>Careers | Reecomm</title>
        <meta
          name="description"
          content="Build the platform that organizes India's used vehicle market. View our open roles and join the team at Reecomm."
        />
        <link
          key="canonical"
          rel="canonical"
          href="https://www.reecomm.com/careers"
        />
      </Head>
      <Navbar scrolled={true} />

      <Layout>
        <CareersComponent />
      </Layout>

      <FooterLink />
      <Footer />
    </>
  );
}
index.fullWidth = true;
export default index;
