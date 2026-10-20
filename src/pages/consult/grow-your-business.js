import React from "react";
import Head from "next/head";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FooterLink from "@/components/layout/FooterLink";
import GrowYourBusinessMain from "@/components/features/consult/grow/GrowYourBusinessMain";

function GrowYourBusinessPage() {
  return (
    <>
      <Head>
        <title>Get More Inquiries — Consultant Growth Guide | Reecomm</title>
        <meta
          name="description"
          content="Actionable growth guide for Reecomm automotive consultants. Learn how to price fairly, complete vehicle listings, respond faster, and generate more verified buyer inquiries."
        />
        <meta
          name="keywords"
          content="get more car inquiries, auto consultant growth tips, Reecomm consultant guide, automotive marketing Palanpur, car dealer leads"
        />
        <link rel="canonical" href="https://www.reecomm.com/consult/grow-your-business" />
      </Head>

      <Navbar scrolled={true} />

      <main className="min-h-screen text-primary overflow-x-hidden pt-20 pb-20">
        <GrowYourBusinessMain />
      </main>

      <FooterLink />
      <Footer />
    </>
  );
}

GrowYourBusinessPage.fullWidth = true;

export default GrowYourBusinessPage;
