import FooterLink from "@/components/layout/FooterLink";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import Head from "next/head";
import React from "react";
import FullPricing from "@/components/features/consult/pricing/FullPricing";
import NoCommissionModel from "@/components/features/consult/pricing/NoCommissionModel";
import FAQ from "@/components/features/consult/pricing/Faq";
import TierCta from "@/components/features/consult/pricing/TierCta";

function index() {
    return (
        <>
            <Head>
                <title>Pricing Plans | Reecomm</title>
                <meta name="description" content="Join Reecomm as a consultant and earn through vehicle inspections while growing your business with our advanced tools." />
            </Head>
            <Navbar />

            <FullPricing />
            <Layout>
                <NoCommissionModel />
                <FAQ />
                <TierCta />
                <FooterLink />
            </Layout>
            <Footer />
        </>
    );
}

export default index;

export function getStaticProps() {
    return {
        props: { fullWidth: true },
    };
}
